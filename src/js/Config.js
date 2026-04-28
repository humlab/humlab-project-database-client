/**
 * Configuration class for managing application settings and endpoints
 */
export class Config {
  /**
   * Get the projects endpoint URL from dataset or default
   * @returns {string} The projects endpoint URL
   */
  static getProjectsEndpoint() {
    const fromDataset = document.body?.dataset?.projectsEndpoint;
    if (fromDataset) {
      try {
        return new URL(fromDataset, window.location.href).toString();
      } catch (error) {
        return fromDataset;
      }
    }
    return "http://localhost:3100/projects";
  }

  /**
   * Get the project details base URL derived from the projects endpoint
   * @returns {string} The project details base URL
   */
  static getProjectDetailsBase() {
    try {
      const url = new URL(this.getProjectsEndpoint(), window.location.href);
      if (/\/projects\/?$/i.test(url.pathname)) {
        url.pathname = url.pathname.replace(/\/projects\/?$/i, "/project/");
      } else {
        url.pathname = `${url.pathname.replace(/\/?$/, "/")}project/`;
      }
      return url.toString();
    } catch (error) {
      return "/project/";
    }
  }

  /**
   * Get the full URL for a project's details page
   * @param {string} slug - The project slug
   * @returns {string|null} The project details URL
   */
  static getProjectDetailsUrl(slug) {
    if (!slug) return null;
    return `${this.getProjectDetailsBase()}${encodeURIComponent(slug)}`;
  }
}
