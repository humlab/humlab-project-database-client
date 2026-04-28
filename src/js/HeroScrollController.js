/**
 * Controller for the hero → cube-grid scroll transition.
 * Drives layout via the CSS custom-property --scroll-progress (0 → 1).
 * No external dependencies — wheel, touch and keyboard events only.
 *
 * Smooth motion: wheel events accumulate into `targetProgress`; a
 * requestAnimationFrame loop lerps `currentProgress` toward it each frame,
 * giving a fluid ease-out feel instead of discrete ticks.
 */
export class HeroScrollController {
  // Progress threshold at which the hero gets its compact background.
  // Lower than the dock threshold (1.0) so the style change happens early.
  static HERO_SCROLLED_THRESHOLD = 0.35;

  constructor() {
    this.targetProgress = 0;   // where we want to be
    this.currentProgress = 0;  // where we visually are (lerped)
    this.isDocked = false;
    this.page = null;
    this.cubeStage = null;
    this._rafId = null;

    // Lerp factor per frame (0–1): higher = snappier, lower = more floaty
    this._lerpFactor = 0.1;

    this._onWheel = this._onWheel.bind(this);
    this._onKeyDown = this._onKeyDown.bind(this);
    this._onTouchStart = this._onTouchStart.bind(this);
    this._onTouchMove = this._onTouchMove.bind(this);
    this._tick = this._tick.bind(this);
    this._touchStartY = 0;
  }

  /**
   * Wire up event listeners and start the animation loop.
   */
  initialize() {
    this.page = document.querySelector('.page');
    this.cubeStage = document.querySelector('.cube-stage');
    if (!this.page || !this.cubeStage) return;

    this._applyProgress(0);
    this._rafId = requestAnimationFrame(this._tick);

    document.addEventListener('wheel', this._onWheel, { passive: false });
    document.addEventListener('keydown', this._onKeyDown);
    document.addEventListener('touchstart', this._onTouchStart, { passive: true });
    document.addEventListener('touchmove', this._onTouchMove, { passive: false });
  }

  /* ---------- RAF loop ---------- */

  _tick() {
    this._rafId = requestAnimationFrame(this._tick);

    const diff = this.targetProgress - this.currentProgress;

    // Skip if close enough to avoid floating-point drift
    if (Math.abs(diff) < 0.0005) {
      if (this.currentProgress !== this.targetProgress) {
        this.currentProgress = this.targetProgress;
        this._applyProgress(this.currentProgress);
        this._checkDock();
      }
      return;
    }

    this.currentProgress += diff * this._lerpFactor;
    this._applyProgress(this.currentProgress);
    this._checkDock();
  }

  /* Check dock/hero-scrolled thresholds after each frame update */
  _checkDock() {
    const p = this.currentProgress;
    // Visual compact state
    if (p >= HeroScrollController.HERO_SCROLLED_THRESHOLD) {
      this.page.classList.add('hero-scrolled');
    } else {
      this.page.classList.remove('hero-scrolled');
    }
    // Functional dock (enables scrolling inside cube-stage)
    if (!this.isDocked && p >= 0.999) {
      this._dock();
    }
  }

  /* ---------- state helpers ---------- */

  _applyProgress(v) {
    this.page.style.setProperty('--scroll-progress', v);
  }

  _dock() {
    if (this.isDocked) return;
    this.isDocked = true;
    this.targetProgress = 1;
    this.currentProgress = 1;
    this._applyProgress(1);
    this.page.classList.remove('undocking');
    this.page.classList.add('docked', 'hero-scrolled');
  }

  _undock() {
    if (!this.isDocked) return;
    this.isDocked = false;
    this.page.classList.remove('docked');
    this.page.classList.add('undocking');
    this.targetProgress = 0;
    // currentProgress intentionally left at 1 so the lerp animates back to 0
    this.cubeStage.scrollTop = 0;

    // Remove the transition-helper class once CSS transitions settle
    const onEnd = () => {
      this.page.classList.remove('undocking');
      this.page.removeEventListener('transitionend', onEnd);
    };
    this.page.addEventListener('transitionend', onEnd);
    setTimeout(() => this.page.classList.remove('undocking'), 900);
  }

  /* ---------- normalise wheel delta ---------- */

  _normaliseDelta(e) {
    let d = e.deltaY;
    if (e.deltaMode === 1) d *= 40;
    else if (e.deltaMode === 2) d *= window.innerHeight;
    return d;
  }

  /* ---------- event handlers ---------- */

  _onWheel(e) {
    // ── Modal guard ───────────────────────────────────────────────────────────
    // When a modal is open the browser's scroll hit-testing can fall through
    // the fixed-position overlay and scroll .cube-stage in the background.
    // We intercept here: allow natural scrolling inside the modal content, but
    // absorb any overscroll at the boundaries so it never reaches the cube-stage.
    if (document.body.classList.contains('modal-open')) {
      const modalContent = document.querySelector(
        '.project-modal.is-open .project-modal__content'
      );
      if (modalContent && modalContent.contains(e.target)) {
        const delta = this._normaliseDelta(e);
        const atBottom =
          modalContent.scrollHeight - modalContent.scrollTop <=
          modalContent.clientHeight + 1;
        const atTop = modalContent.scrollTop <= 0;
        if ((delta > 0 && atBottom) || (delta < 0 && atTop)) {
          e.preventDefault(); // absorb boundary overscroll
        }
        // otherwise: fall through — browser scrolls the modal content naturally
      } else {
        e.preventDefault(); // wheel outside modal panel content → block everything
      }
      return; // never touch cube-stage while a modal is open
    }
    // ─────────────────────────────────────────────────────────────────────────

    if (this.page.classList.contains('undocking') && e.deltaY > 0) {
      this.page.classList.remove('undocking');
    }

    const delta = this._normaliseDelta(e);

    if (!this.isDocked) {
      e.preventDefault();
      this.targetProgress = Math.min(1, Math.max(0, this.targetProgress + delta / 500));
    } else if (this.cubeStage.scrollTop < 1 && delta < 0) {
      e.preventDefault();
      this._undock();
    }
  }

  _onTouchStart(e) {
    this._touchStartY = e.touches[0].clientY;
  }

  _onTouchMove(e) {
    const dy = this._touchStartY - e.touches[0].clientY;

    if (!this.isDocked && dy > 20) {
      e.preventDefault();
      this.targetProgress = 1;
    } else if (this.isDocked && this.cubeStage.scrollTop < 1 && dy < -30) {
      e.preventDefault();
      this._undock();
    }
  }

  _onKeyDown(e) {
    const downKeys = ['ArrowDown', 'PageDown', ' '];
    const upKeys = ['ArrowUp', 'PageUp'];

    if (!this.isDocked && downKeys.includes(e.key)) {
      e.preventDefault();
      this.targetProgress = 1;
    } else if (this.isDocked && this.cubeStage.scrollTop < 1 && upKeys.includes(e.key)) {
      e.preventDefault();
      this._undock();
    }
  }

  /**
   * Remove all event listeners and cancel the animation loop.
   */
  destroy() {
    if (this._rafId) cancelAnimationFrame(this._rafId);
    document.removeEventListener('wheel', this._onWheel);
    document.removeEventListener('keydown', this._onKeyDown);
    document.removeEventListener('touchstart', this._onTouchStart);
    document.removeEventListener('touchmove', this._onTouchMove);
  }
}
