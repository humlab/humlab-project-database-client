import { ProjectService } from './ProjectService.js';
import { CubeRenderer } from './CubeRenderer.js';
import { ModalManager } from './ModalManager.js';
import { TiltController } from './TiltController.js';
import { HeroScrollController } from './HeroScrollController.js';
import { SearchController } from './SearchController.js';
import { Utils } from './Utils.js';

/**
 * Main application class that orchestrates all components
 */
export class Application {
  constructor() {
    this.grid = document.querySelector(".cube-grid");
    this.projectService = new ProjectService();
    this.modalManager = new ModalManager(this.projectService);
    this.tiltController = new TiltController(false); // disabled by default
    this.heroScrollController = new HeroScrollController();
    this.searchController = new SearchController();
  }

  /**
   * Initialize and start the application
   */
  async initialize() {
    if (!this.grid) {
      console.error("Cube grid not found");
      return;
    }

    // Set up modal interactions
    this.modalManager.initialize(this.grid);

    // Initialize hero scroll animations
    this.heroScrollController.initialize();

    // Initialize search/filter
    const searchInput = document.querySelector('.hero-search__input');
    this.searchController.initialize(searchInput, this.grid);

    // Render projects
    await this.renderProjects();

    // Start tilt effect (if enabled)
    this.tiltController.start(this.grid);
  }

  /**
   * Fetch and render all projects as cubes
   * @private
   */
  async renderProjects() {
    if (!this.grid) return;

    const fragment = document.createDocumentFragment();

    try {
      const projects = await this.projectService.fetchProjects();

      projects.forEach((project, index) => {
        if (!project) return;
        
        const slug = project.id || project.slug || project.title || `project-${index + 1}`;
        const title = project.title || slug;
        const description = Utils.getShortDescription(project.description);
        const coverUrl = Utils.resolveAssetUrl(project.cover_image?.url);
        const frontImage = coverUrl;
        const sideImage = Utils.resolveAssetUrl(project.side_image?.url);
        // side_video is a dedicated field in the list response for the cube's right face
        const videoUrl = Utils.resolveAssetUrl(project.side_video?.url);

        fragment.appendChild(
          CubeRenderer.buildCube({ slug, title, description, frontImage, sideImage, videoUrl })
        );
      });

      this.grid.appendChild(fragment);
    } catch (error) {
      console.error("Failed to render projects:", error);
    }
  }

  /**
   * Clean up the application and remove event listeners
   */
  destroy() {
    this.tiltController.stop();
    this.heroScrollController.destroy();
    this.searchController.destroy();
  }
}
