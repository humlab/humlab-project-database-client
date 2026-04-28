/**
 * Controller for the live search/filter box in the collapsed hero.
 * Filters cube-container elements by matching the query against
 * the project title (data-title) and slug (data-slug).
 */
export class SearchController {
  constructor() {
    this.input = null;
    this.grid = null;
    this._onInput = this._onInput.bind(this);
  }

  /**
   * @param {HTMLElement} input - The search <input> element
   * @param {HTMLElement} grid  - The #cube-grid element
   */
  initialize(input, grid) {
    this.input = input;
    this.grid = grid;
    if (!input || !grid) return;
    input.addEventListener('input', this._onInput);
  }

  _onInput() {
    const query = this.input.value.trim().toLowerCase();
    const cubes = this.grid.querySelectorAll('.cube-container');

    cubes.forEach(cube => {
      if (!query) {
        cube.hidden = false;
        return;
      }
      const title = (cube.dataset.title || '').toLowerCase();
      const slug  = (cube.dataset.slug  || '').toLowerCase();
      cube.hidden = !title.includes(query) && !slug.includes(query);
    });
  }

  /** Clear the filter and restore all cubes */
  clear() {
    if (this.input) this.input.value = '';
    this._onInput();
  }

  destroy() {
    if (this.input) this.input.removeEventListener('input', this._onInput);
  }
}
