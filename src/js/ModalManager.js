import { ProjectDetailsRenderer } from './ProjectDetailsRenderer.js';

/**
 * Manager class for handling the project details modal
 */
export class ModalManager {
  constructor(projectService) {
    this.projectService = projectService;
    this.modalRoot = null;
    this.modalPanel = null;
    this.modalContent = null;
    this.closeButton = null;
    this.isOpen = false;
    this.lastActiveElement = null;
    this.activeSlug = null;
    this.activeRequest = 0;
  }

  /**
   * Initialize the modal manager and set up event listeners
   * @param {HTMLElement} grid - The grid element containing cube containers
   */
  initialize(grid) {
    if (!grid) return;

    grid.addEventListener("click", (event) => {
      const container = event.target.closest(".cube-container");
      if (!container) return;
      event.preventDefault();
      this.open(container);
    });

    window.addEventListener("resize", () => {
      if (!this.isOpen || !this.modalPanel) return;
      this.setPanelTarget();
    });
  }

  /**
   * Ensure the modal DOM elements exist
   * @private
   */
  ensureModal() {
    if (this.modalRoot) return;

    this.modalRoot = document.createElement("div");
    this.modalRoot.className = "project-modal";
    this.modalRoot.setAttribute("aria-hidden", "true");

    const backdrop = document.createElement("div");
    backdrop.className = "project-modal__backdrop";

    this.modalPanel = document.createElement("div");
    this.modalPanel.className = "project-modal__panel";
    this.modalPanel.setAttribute("role", "dialog");
    this.modalPanel.setAttribute("aria-modal", "true");
    this.modalPanel.setAttribute("aria-label", "Project details");

    this.closeButton = document.createElement("button");
    this.closeButton.type = "button";
    this.closeButton.className = "project-modal__close";
    this.closeButton.textContent = "Close";

    const content = document.createElement("div");
    content.className = "project-modal__content";
    this.modalContent = content;

    this.modalPanel.append(this.closeButton, content);
    this.modalRoot.append(backdrop, this.modalPanel);
    document.body.appendChild(this.modalRoot);

    backdrop.addEventListener("click", () => this.close());
    this.closeButton.addEventListener("click", () => this.close());
    document.addEventListener("keydown", (event) => {
      if (!this.isOpen) return;
      if (event.key === "Escape") this.close();
    });
  }

  /**
   * Calculate and set the modal panel target position and size
   * @private
   * @returns {Object} Target dimensions
   */
  setPanelTarget() {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const targetWidth = Math.round(viewportWidth * 0.9);
    const targetHeight = Math.round(viewportHeight * 0.9);
    const targetLeft = Math.round((viewportWidth - targetWidth) / 2);
    const targetTop = Math.round((viewportHeight - targetHeight) / 2);

    this.modalPanel.style.setProperty("--panel-left", `${targetLeft}px`);
    this.modalPanel.style.setProperty("--panel-top", `${targetTop}px`);
    this.modalPanel.style.setProperty("--panel-width", `${targetWidth}px`);
    this.modalPanel.style.setProperty("--panel-height", `${targetHeight}px`);

    return { targetLeft, targetTop, targetWidth, targetHeight };
  }

  /**
   * Open the modal and load project details
   * @param {HTMLElement} cubeContainer - The cube container element that was clicked
   */
  open(cubeContainer) {
    if (this.isOpen) return;
    this.ensureModal();

    const slug = cubeContainer.dataset.slug;
    this.activeSlug = slug;
    this.activeRequest += 1;
    const requestId = this.activeRequest;

    const rect = cubeContainer.getBoundingClientRect();
    const { targetLeft, targetTop, targetWidth, targetHeight } = this.setPanelTarget();

    this.modalPanel.style.setProperty("--start-x", `${rect.left - targetLeft}px`);
    this.modalPanel.style.setProperty("--start-y", `${rect.top - targetTop}px`);
    this.modalPanel.style.setProperty("--start-scale-x", `${rect.width / targetWidth}`);
    this.modalPanel.style.setProperty("--start-scale-y", `${rect.height / targetHeight}`);

    this.lastActiveElement = document.activeElement;
    this.modalRoot.style.display = "block";
    this.modalRoot.classList.remove("is-open");
    this.modalRoot.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");

    this.modalPanel.getBoundingClientRect();
    requestAnimationFrame(() => {
      this.modalRoot.classList.add("is-open");
      this.closeButton.focus();
    });

    this.isOpen = true;

    // Show loading state
    if (this.modalContent) {
      this.modalContent.innerHTML = "";
      const loading = document.createElement("div");
      loading.className = "project-detail__loading";
      loading.textContent = "Loading project details...";
      this.modalContent.appendChild(loading);
    }

    // Load project details
    this.projectService
      .fetchProjectDetails(slug)
      .then((data) => {
        if (!this.isOpen || this.activeSlug !== slug || requestId !== this.activeRequest) {
          return;
        }
        if (!this.modalContent) return;
        
        ProjectDetailsRenderer.render(this.modalContent, data || {});
        this.modalPanel?.setAttribute(
          "aria-label",
          data?.title ? `${data.title} details` : "Project details"
        );
      })
      .catch((error) => {
        console.error("Unable to load project details.", error);
        if (!this.isOpen || this.activeSlug !== slug || requestId !== this.activeRequest) {
          return;
        }
        if (!this.modalContent) return;
        
        this.modalContent.innerHTML = "";
        const message = document.createElement("p");
        message.className = "project-detail__error";
        message.textContent = "Unable to load project details right now.";
        this.modalContent.appendChild(message);
      });
  }

  /**
   * Close the modal
   */
  close() {
    if (!this.isOpen || !this.modalRoot) return;
    
    this.modalRoot.classList.remove("is-open");
    document.body.classList.remove("modal-open");
    this.modalRoot.setAttribute("aria-hidden", "true");

    const handleTransitionEnd = (event) => {
      if (event.propertyName !== "transform") return;
      this.modalRoot.style.display = "none";
      this.modalPanel.removeEventListener("transitionend", handleTransitionEnd);
    };

    this.modalPanel.addEventListener("transitionend", handleTransitionEnd);
    this.isOpen = false;
    this.activeSlug = null;

    if (this.lastActiveElement instanceof HTMLElement) {
      this.lastActiveElement.focus();
    }
  }
}
