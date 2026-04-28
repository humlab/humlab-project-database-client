/**
 * Renderer class for creating 3D cube elements representing projects
 */
export class CubeRenderer {
  /**
   * Build a cube element for a project
   * @param {Object} options - Cube configuration
   * @param {string} options.slug - The project slug
   * @param {string} options.title - The project title
   * @param {string} options.description - Short description for the cube
   * @param {string} options.frontImage - URL for the front face image
   * @param {string} options.sideImage - URL for the side face image (placeholder)
   * @param {string} [options.videoUrl] - Direct video URL for the right face (optional)
   * @returns {HTMLElement} The cube container element
   */
  static buildCube({ slug, title, description, frontImage, sideImage, videoUrl }) {
    const container = document.createElement("a");
    container.className = "cube-container";
    container.href = "#";
    container.setAttribute(
      "aria-label",
      description ? `${title} — ${description}` : title
    );
    container.dataset.slug = slug;
    container.dataset.title = title;

    if (frontImage) {
      container.style.setProperty("--front-image", `url("${frontImage}")`);
    }

    if (sideImage) {
      container.style.setProperty("--side-image", `url("${sideImage}")`);
    }

    const cube = document.createElement("div");
    cube.className = "cube";

    const front = document.createElement("div");
    front.className = "cube-face front";
    const label = document.createElement("div");
    label.className = "cube-title";
    label.textContent = title;
    front.appendChild(label);

    const right = document.createElement("div");
    right.className = "cube-face right";
    if (description) {
      const sideDescription = document.createElement("div");
      sideDescription.className = "cube-side-description";
      sideDescription.textContent = description;
      right.appendChild(sideDescription);
    }

    // If there is a playable video URL, wire up lazy loading on first hover/focus.
    // The side-image CSS background stays visible as a placeholder until the
    // video is ready, then it fades in smoothly over the top.
    const playableUrl = CubeRenderer._toPlayableVideoUrl(videoUrl);
    if (playableUrl) {
      const loadVideo = () => {
        // Guard against double-loading
        if (right.querySelector('.cube-face-video')) return;

        const video = document.createElement('video');
        video.className = 'cube-face-video';
        video.src = playableUrl;
        video.muted = true;
        video.loop = true;
        video.playsInline = true;
        video.preload = 'auto';

        // Fade in once the video has enough data to play
        const onReady = () => {
          video.classList.add('cube-face-video--ready');
          video.play().catch(() => {/* autoplay blocked — still show poster frame */});
        };
        video.addEventListener('canplay', onReady, { once: true });

        right.appendChild(video);
      };

      // Load on first hover or keyboard focus — whichever comes first
      container.addEventListener('mouseenter', loadVideo, { once: true });
      container.addEventListener('focusin', loadVideo, { once: true });
    }

    const back = document.createElement("div");
    back.className = "cube-face back";

    const left = document.createElement("div");
    left.className = "cube-face left";

    const top = document.createElement("div");
    top.className = "cube-face top";

    const bottom = document.createElement("div");
    bottom.className = "cube-face bottom";

    cube.append(front, right, back, left, top, bottom);
    container.appendChild(cube);
    return container;
  }

  /**
   * Returns the URL only if it points to a directly playable video file.
   * Rejects embed/iframe URLs (Kaltura, YouTube, Vimeo, etc.).
   * @param {string|null|undefined} url
   * @returns {string|null}
   */
  static _toPlayableVideoUrl(url) {
    if (!url) return null;
    return /\.(mp4|webm|ogg|mov)(\?.*)?$/i.test(url) ? url : null;
  }
}
