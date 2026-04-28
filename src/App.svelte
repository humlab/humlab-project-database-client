<script>
  import { onDestroy, onMount } from 'svelte';
  import ProjectCard from './components/ProjectCard.svelte';
  import ProjectCubeCard from './components/ProjectCubeCard.svelte';
  import ProjectModal from './components/ProjectModal.svelte';
  import { fetchProjectsWithDetails } from './lib/api.js';
  import { fetchSettings } from './lib/adminApi.js';

  let loading = true;
  let error = '';
  let projects = [];
  let selectedProject = null;

  let query = '';
  let sortBy = 'featured';
  let theme = 'dark';
  let viewMode = 'box'; // default until settings are loaded

  let pendingProjectId = null; // project id parsed from URL on initial load

  const skeletonCards = Array.from({ length: 6 }, (_, index) => index);
  const THEME_STORAGE_KEY = 'humlab-web-theme';

  async function load() {
    loading = true;
    error = '';

    try {
      projects = await fetchProjectsWithDetails();

      if (pendingProjectId) {
        const match = projects.find((p) => p.id === pendingProjectId);
        if (match) {
          selectedProject = match;
        }
        pendingProjectId = null;
      }
    } catch (loadError) {
      console.error(loadError);
      error = 'Could not load project data from the API.';
    } finally {
      loading = false;
    }
  }

  async function loadSettings() {
    try {
      const settings = await fetchSettings();
      viewMode = settings.viewMode || 'box';
      // Only apply default theme if the user has no saved preference
      if (typeof window !== 'undefined' && !window.localStorage.getItem(THEME_STORAGE_KEY)) {
        applyTheme(settings.defaultTheme === 'light' ? 'light' : 'dark');
      }
    } catch {
      // Fall back to defaults if settings unavailable
    }
  }

  function openProject(event) {
    selectedProject = event.detail;
    if (typeof window !== 'undefined') {
      history.pushState({ projectId: selectedProject.id }, '', `/${selectedProject.id}`);
    }
  }

  function closeProject() {
    selectedProject = null;
    if (typeof window !== 'undefined') {
      history.pushState({}, '', '/');
    }
  }

  function handlePopState(event) {
    const id = event.state?.projectId;
    if (id) {
      const match = projects.find((p) => p.id === id);
      selectedProject = match || null;
    } else {
      selectedProject = null;
    }
  }

  function applyTheme(nextTheme) {
    theme = nextTheme === 'light' ? 'light' : 'dark';

    if (typeof document !== 'undefined') {
      document.documentElement.dataset.theme = theme;
    }

    if (typeof window !== 'undefined') {
      window.localStorage.setItem(THEME_STORAGE_KEY, theme);
    }
  }

  function initializeTheme() {
    if (typeof window === 'undefined') {
      return;
    }

    const saved = window.localStorage.getItem(THEME_STORAGE_KEY);

    if (saved === 'dark' || saved === 'light') {
      applyTheme(saved);
      return;
    }

    applyTheme(window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
  }

  function handleViewModeToggle(event) {
    viewMode = event.currentTarget.checked ? 'cube' : 'box';

    if (typeof window !== 'undefined') {
      window.localStorage.setItem(VIEW_MODE_KEY, viewMode);
    }
  }

  function handleThemeToggle(event) {
    applyTheme(event.currentTarget.checked ? 'light' : 'dark');
  }

  function mediaCount(project) {
    return (project.images.length || 0) + (project.videos.length || 0);
  }

  function searchableText(project) {
    return [
      project.title,
      project.subtitle,
      project.description,
      project.longText,
      project.id,
      ...project.people.map((person) => person.name),
      ...project.financiers.map((item) => item.name),
      ...project.infrastructures.map((item) => item.name),
      ...project.cooperationPartners.map((item) => item.name)
    ]
      .join(' ')
      .toLowerCase();
  }

  $: normalizedQuery = query.trim().toLowerCase();
  $: isLight = theme === 'light';

  $: filteredProjects = [...projects]
    .filter((project) => {
      if (!normalizedQuery) {
        return true;
      }

      return searchableText(project).includes(normalizedQuery);
    })
    .sort((left, right) => {
      if (sortBy === 'a-z') {
        return left.title.localeCompare(right.title);
      }

      if (sortBy === 'media') {
        return mediaCount(right) - mediaCount(left);
      }

      return left.order - right.order;
    });

  $: {
    if (typeof document !== 'undefined') {
      document.body.style.overflow = selectedProject ? 'hidden' : '';
    }
  }

  onMount(() => {
    initializeTheme();
    loadSettings();

    if (typeof window !== 'undefined') {
      const pathId = window.location.pathname.replace(/^\//, '').split('/')[0];
      if (pathId) {
        pendingProjectId = pathId;
      }
      window.addEventListener('popstate', handlePopState);
    }

    load();
  });

  onDestroy(() => {
    if (typeof document !== 'undefined') {
      document.body.style.overflow = '';
    }
    if (typeof window !== 'undefined') {
      window.removeEventListener('popstate', handlePopState);
    }
  });
</script>

<main class="page">
  <div class="ambient ambient-left"></div>
  <div class="ambient ambient-right"></div>

  <section class="hero">
    <p class="kicker">Humlab Project Atlas</p>
    <h1>Humlab Research projects across the years - teams, media, and partner networks.</h1>
    <p class="lede">
      Browse the collection, search by topic or person,
      and inspect each project's full content profile by clicking on it.
    </p>
  </section>

  <section class="controls" aria-label="Project controls">
    <label>
      <span>Search</span>
      <input type="search" bind:value={query} placeholder="Search project, topic, person, or partner..." />
    </label>

    <label>
      <span>Sort</span>
      <select bind:value={sortBy}>
        <option value="featured">Featured order</option>
        <option value="a-z">A to Z</option>
        <option value="media">Most media</option>
      </select>
    </label>

    <label class="theme-control">
      <span>Theme</span>
      <span class="theme-switch">
        <input type="checkbox" checked={isLight} on:change={handleThemeToggle} aria-label="Enable light mode" />
        <span class="track" aria-hidden="true"><span class="thumb"></span></span>
        <strong>{isLight ? 'Light' : 'Dark'}</strong>
      </span>
    </label>
  </section>

  <section class="grid" class:cube-grid={viewMode === 'cube'} aria-live="polite">
    {#if loading}
      {#each skeletonCards as index}
        <article class="skeleton" style={`--stagger:${index};`} aria-hidden="true"></article>
      {/each}
    {:else if error}
      <article class="state-card">
        <h2>Data unavailable</h2>
        <p>{error}</p>
        <button type="button" on:click={load}>Retry</button>
      </article>
    {:else if filteredProjects.length === 0}
      <article class="state-card">
        <h2>No matches</h2>
        <p>Adjust search terms or filters to see more projects.</p>
      </article>
    {:else}
      {#each filteredProjects as project, index (project.id)}
        {#if viewMode === 'cube'}
          <ProjectCubeCard {project} {index} on:open={openProject} />
        {:else}
          <ProjectCard {project} {index} on:open={openProject} />
        {/if}
      {/each}
    {/if}
  </section>

  <ProjectModal project={selectedProject} on:close={closeProject} />
</main>

<style>
  .page {
    position: relative;
    max-width: 1280px;
    margin: 0 auto;
    padding: clamp(1rem, 2.8vw, 2rem);
    display: grid;
    gap: 1.1rem;
  }

  .ambient {
    position: fixed;
    pointer-events: none;
    border-radius: 50%;
    filter: blur(80px);
    z-index: -1;
    opacity: 0.35;
  }

  .ambient-left {
    width: 34rem;
    height: 34rem;
    left: -10rem;
    top: -8rem;
    background: var(--ambient-left);
  }

  .ambient-right {
    width: 30rem;
    height: 30rem;
    right: -9rem;
    top: 16rem;
    background: var(--ambient-right);
  }

  .hero {
    border: 1px solid var(--border-mid);
    border-radius: 28px;
    padding: clamp(1rem, 2.9vw, 2.1rem);
    background: var(--surface-hero);
    box-shadow: var(--shadow-hero);
  }

  .kicker {
    margin: 0;
    text-transform: uppercase;
    letter-spacing: 0.16em;
    font-size: 0.73rem;
    color: var(--text-muted);
  }

  h1 {
    margin: 0.55rem 0 0;
    max-width: 20ch;
    font-family: 'Instrument Serif', Georgia, serif;
    font-size: clamp(2rem, 6vw, 4rem);
    line-height: 0.95;
    color: var(--text-strong);
  }

  .lede {
    margin: 0.85rem 0 0;
    max-width: 72ch;
    color: var(--text-body);
    line-height: 1.5;
  }

  .controls {
    display: grid;
    grid-template-columns: 1.4fr minmax(180px, 0.55fr) auto;
    gap: 0.6rem;
    align-items: end;
  }

  .controls label {
    display: grid;
    gap: 0.3rem;
  }

  .controls span {
    font-size: 0.74rem;
    text-transform: uppercase;
    letter-spacing: 0.09em;
    color: var(--text-muted);
  }

  input,
  select {
    border-radius: 12px;
    border: 1px solid var(--border-strong);
    background: var(--surface-input);
    color: var(--text-soft);
    padding: 0.62rem 0.75rem;
    font: inherit;
  }

  .theme-control {
    display: grid;
    gap: 0.3rem;
  }

  .theme-switch {
    position: relative;
    display: inline-flex;
    align-items: center;
    gap: 0.55rem;
    min-height: 42px;
    padding: 0 0.08rem;
  }

  .theme-switch input {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
    opacity: 0;
  }

  .track {
    width: 48px;
    height: 28px;
    border-radius: 999px;
    border: 1px solid var(--border-strong);
    background: var(--surface-input);
    position: relative;
    display: inline-flex;
    align-items: center;
    transition: background 180ms ease, border-color 180ms ease;
  }

  .thumb {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: var(--text-soft);
    position: absolute;
    left: 3px;
    transition: transform 180ms ease, background 180ms ease;
  }

  .theme-switch input:checked + .track {
    background: rgba(46, 168, 165, 0.27);
    border-color: rgba(46, 168, 165, 0.62);
  }

  .theme-switch input:checked + .track .thumb {
    transform: translateX(19px);
    background: rgb(96, 229, 219);
  }

  .theme-switch input:focus-visible + .track {
    outline: 2px solid var(--accent-link);
    outline-offset: 2px;
  }

  .theme-switch strong {
    color: var(--text-soft);
    font-size: 0.85rem;
    letter-spacing: 0.02em;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    gap: 0.7rem;
    min-height: 240px;
  }

  .cube-grid {
    grid-template-columns: repeat(auto-fill, minmax(320px, 320px));
    justify-content: center;
    row-gap: 5rem;
    column-gap: 2rem;
  }

  .skeleton {
    border-radius: 24px;
    min-height: 320px;
    border: 1px solid var(--border-soft);
    background: var(--surface-skeleton);
    background-size: 180% 100%;
    animation: shimmer 1300ms linear infinite;
  }

  .state-card {
    border-radius: 18px;
    border: 1px solid var(--border-soft);
    background: var(--surface-state);
    padding: 1rem;
    color: var(--text-soft);
  }

  .state-card h2 {
    margin: 0;
    font-family: 'Instrument Serif', Georgia, serif;
    font-size: 1.7rem;
  }

  .state-card button {
    margin-top: 0.5rem;
    border-radius: 10px;
    border: 1px solid var(--border-strong);
    background: var(--surface-chip);
    color: var(--text-soft);
    padding: 0.45rem 0.8rem;
    cursor: pointer;
  }

  @keyframes shimmer {
    0% {
      background-position: 180% 0;
    }

    100% {
      background-position: -180% 0;
    }
  }

  @media (max-width: 900px) {
    .controls {
      grid-template-columns: 1fr;
      align-items: stretch;
    }
  }
</style>
