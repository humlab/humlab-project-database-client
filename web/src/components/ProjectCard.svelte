<script>
  import { createEventDispatcher } from 'svelte';
  import { shortText } from '../lib/normalize.js';

  export let project;
  export let index = 0;

  const dispatch = createEventDispatcher();

  $: mediaCount = (project?.images?.length || 0) + (project?.videos?.length || 0);

  function openDetails() {
    dispatch('open', project);
  }
</script>

<article class="project-card" style={`--stagger:${index};`}>
  <button type="button" class="card-action" on:click={openDetails}>
    <div class="media-wrap">
      {#if project?.coverImage?.url}
        <img src={project.coverImage.url} alt={project.coverImage.alt || project.title} loading="lazy" />
      {:else}
        <div class="media-fallback">No image</div>
      {/if}
    </div>

    <div class="card-body">
      <p class="eyebrow">{project.id}</p>
      <h3>{project.title}</h3>

      {#if project.subtitle}
        <p class="subtitle">{project.subtitle}</p>
      {/if}

      <p class="description">{shortText(project.description, 165)}</p>

      <div class="chips">
        <span>{project.people.length} people</span>
        <span>{project.links.length} links</span>
        <span>{mediaCount} media</span>
      </div>
    </div>
  </button>
</article>

<style>
  .project-card {
    animation: rise 580ms both;
    animation-delay: calc(var(--stagger, 0) * 40ms);
  }

  .card-action {
    border: 1px solid var(--border-soft);
    background: var(--card-bg);
    border-radius: 24px;
    overflow: hidden;
    cursor: pointer;
    width: 100%;
    text-align: left;
    color: inherit;
    transition: transform 180ms ease, border-color 180ms ease, box-shadow 180ms ease;
  }

  .card-action:hover {
    transform: translateY(-4px);
    border-color: var(--accent-border);
    box-shadow: var(--shadow-card-hover);
  }

  .media-wrap {
    aspect-ratio: 16/10;
    background: var(--card-media-bg);
  }

  .media-wrap img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .media-fallback {
    display: grid;
    place-content: center;
    height: 100%;
    color: var(--text-muted);
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    font-size: 0.75rem;
  }

  .card-body {
    padding: 1rem 1rem 1.1rem;
    display: grid;
    gap: 0.6rem;
  }

  .eyebrow {
    margin: 0;
    text-transform: uppercase;
    letter-spacing: 0.14em;
    font-size: 0.69rem;
    color: var(--text-muted);
  }

  h3 {
    margin: 0;
    font-family: 'Instrument Serif', Georgia, serif;
    font-size: clamp(1.3rem, 2.2vw, 1.65rem);
    line-height: 1.05;
    color: var(--text-strong);
  }

  .subtitle {
    margin: 0;
    font-size: 0.85rem;
    color: var(--text-muted);
    font-weight: 600;
  }

  .description {
    margin: 0;
    color: var(--text-body);
    font-size: 0.91rem;
    line-height: 1.4;
  }

  .chips {
    display: flex;
    flex-wrap: wrap;
    gap: 0.45rem;
  }

  .chips span {
    border-radius: 999px;
    padding: 0.26rem 0.62rem;
    background: var(--surface-chip);
    font-size: 0.74rem;
    color: var(--text-soft);
  }

  @keyframes rise {
    from {
      opacity: 0;
      transform: translateY(8px);
    }

    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
</style>
