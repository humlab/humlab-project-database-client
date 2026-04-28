/**
 * Utility functions for the project database application
 */
export class Utils {
  /**
   * Resolve an asset URL to an absolute URL
   * @param {string} path - The asset path
   * @returns {string|null} The resolved URL or null
   */
  static resolveAssetUrl(path) {
    if (!path) return null;
    if (/^https?:\/\//i.test(path)) return path;
    try {
      return new URL(path, `${window.location.origin}/`).toString();
    } catch (error) {
      return path;
    }
  }

  /**
   * Get a short description from a description object or string
   * @param {string|Object} description - The description
   * @returns {string} A short description (first sentence)
   */
  static getShortDescription(description) {
    if (!description) return "";
    const raw =
      typeof description === "string"
        ? description
        : description.en_text || description.sv_text || description.text || "";
    const normalized = raw.replace(/\s+/g, " ").trim();
    if (!normalized) return "";
    const sentenceMatch = normalized.match(/^[^.!?]+[.!?]/);
    return (sentenceMatch ? sentenceMatch[0] : normalized).trim();
  }

  /**
   * Create paragraph elements from text with double newlines
   * @param {string} text - The text to convert to paragraphs
   * @returns {DocumentFragment} A fragment containing paragraph elements
   */
  static createParagraphs(text) {
    const fragment = document.createDocumentFragment();
    if (!text) return fragment;
    const chunks = String(text).split(/\n{2,}/);
    chunks.forEach((chunk) => {
      const content = chunk.trim();
      if (!content) return;
      const paragraph = document.createElement("p");
      paragraph.textContent = content;
      fragment.appendChild(paragraph);
    });
    return fragment;
  }
}
