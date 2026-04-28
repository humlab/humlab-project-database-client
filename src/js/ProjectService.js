import { Config } from './Config.js';

/**
 * Service class for fetching project data from the API
 */
export class ProjectService {
  constructor() {
    this.projectDetailsCache = new Map();
  }

  /**
   * Fetch all projects from the API
   * @returns {Promise<Array>} Array of project objects
   * @throws {Error} If the fetch fails or returns invalid data
   */
  async fetchProjects() {
    try {
      const response = await fetch(Config.getProjectsEndpoint());
      if (!response.ok) {
        throw new Error(`Failed to load projects: ${response.status}`);
      }
      const projects = await response.json();
      
      if (!Array.isArray(projects)) {
        throw new Error("Unexpected projects payload format");
      }
      
      return projects;
    } catch (error) {
      console.error("Unable to load projects from API.", error);
      throw error;
    }
  }

  /**
   * Fetch project details by slug, with caching
   * @param {string} slug - The project slug
   * @returns {Promise<Object>} The project details object
   * @throws {Error} If the fetch fails
   */
  async fetchProjectDetails(slug) {
    if (this.projectDetailsCache.has(slug)) {
      return this.projectDetailsCache.get(slug);
    }

    const detailsUrl = Config.getProjectDetailsUrl(slug);
    if (!detailsUrl) {
      throw new Error(`Invalid slug: ${slug}`);
    }

    try {
      const response = await fetch(detailsUrl);
      if (!response.ok) {
        throw new Error(`Failed to load project: ${response.status}`);
      }
      const data = await response.json();
      this.projectDetailsCache.set(slug, data);
      return data;
    } catch (error) {
      console.error("Unable to load project details.", error);
      throw error;
    }
  }
}
