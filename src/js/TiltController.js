/**
 * Controller class for managing the tilt effect on cube elements
 */
export class TiltController {
  constructor(enabled = false) {
    this.enabled = enabled;
    this.updateTiltBound = null;
    this.resizeTimeout = null;
  }

  /**
   * Start the tilt effect
   * @param {HTMLElement} grid - The grid element containing cube containers
   */
  start(grid) {
    if (!this.enabled || !grid) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const cubeContainers = Array.from(grid.querySelectorAll(".cube-container"));

    this.updateTiltBound = () => this.updateTilt(cubeContainers);

    this.updateTilt(cubeContainers);
    window.addEventListener("scroll", this.updateTiltBound, { passive: true });

    window.addEventListener("resize", () => {
      clearTimeout(this.resizeTimeout);
      this.resizeTimeout = setTimeout(this.updateTiltBound, 100);
    });
  }

  /**
   * Update the tilt effect for all cube containers
   * @private
   * @param {Array<HTMLElement>} cubeContainers - Array of cube container elements
   */
  updateTilt(cubeContainers) {
    const viewportCenterY = window.innerHeight / 2;
    const viewportCenterX = window.innerWidth / 2;

    cubeContainers.forEach((container) => {
      const rect = container.getBoundingClientRect();
      const cubeCenterY = rect.top + rect.height / 2;
      const cubeCenterX = rect.left + rect.width / 2;

      const offsetY = (cubeCenterY - viewportCenterY) / viewportCenterY;
      const offsetX = (cubeCenterX - viewportCenterX) / viewportCenterX;

      const tiltX = -offsetY * 1;
      const tiltY = offsetX * 1;

      const cube = container.querySelector(".cube");
      if (cube) {
        cube.style.setProperty("--tilt-x", `${tiltX}deg`);
        cube.style.setProperty("--tilt-y", `${tiltY}deg`);
      }
    });
  }

  /**
   * Stop the tilt effect and clean up event listeners
   */
  stop() {
    if (this.updateTiltBound) {
      window.removeEventListener("scroll", this.updateTiltBound);
      this.updateTiltBound = null;
    }
    if (this.resizeTimeout) {
      clearTimeout(this.resizeTimeout);
      this.resizeTimeout = null;
    }
  }
}
