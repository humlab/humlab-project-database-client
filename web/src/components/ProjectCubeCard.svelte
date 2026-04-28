<script>
  import { createEventDispatcher } from 'svelte';
  import { shortText } from '../lib/normalize.js';

  export let project;
  export let index = 0;

  const dispatch = createEventDispatcher();

  function openDetails() {
    dispatch('open', project);
  }
</script>

<div class="cube-wrapper" style={`--stagger:${index};`}>
  <button type="button" class="cube-action" on:click={openDetails} aria-label="Open {project.title}">
    <p class="cube-title">{project.title}</p>
    <div class="scene">
      <div class="cube">
        <!-- Front face: cover image -->
        <div class="face face--front">
          {#if project?.coverImage?.url}
            <img src={project.coverImage.url} alt={project.coverImage.alt || project.title} loading="lazy" />
          {:else}
            <div class="media-fallback">No image</div>
          {/if}
        </div>
        <!-- Right face: title + description (revealed on hover) -->
        <div class="face face--right">
          <div class="face-right-content">
            <h3>{project.title}</h3>
            {#if project.description}
              <p>{shortText(project.description, 120)}</p>
            {:else if project.subtitle}
              <p>{project.subtitle}</p>
            {/if}
            <div class="face-chips">
              <span>{project.people.length} people</span>
              <span>{(project.images?.length || 0) + (project.videos?.length || 0)} media</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </button>
</div>

<style>
  .cube-wrapper {
    animation: rise 580ms both;
    animation-delay: calc(var(--stagger, 0) * 40ms);
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .cube-action {
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .cube-title {
    margin: 0 0 0.5em 0;
    font-size: 1.05rem;
    color: var(--text-strong);
    max-width: 300px;
    width: 300px;
    text-align: left;
    font-family: 'Instrument Serif', Georgia, serif;
    line-height: 1.15;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  /* 1) The 3D viewing area */
  .scene {
    width: 300px;
    height: 300px;
    perspective: 800px;
  }

  /* 2) The cube */
  .cube {
    width: 300px;
    height: 300px;
    position: relative;
    transform-style: preserve-3d;
    transition: transform 0.35s ease;
    transform: translateZ(-150px);
  }

  /* 3) Rotate on hover to reveal right face */
  .scene:hover .cube {
    transform: translateZ(-150px) rotateY(-90deg);
  }

  /* 4) All faces share these base styles */
  .face {
    position: absolute;
    width: 300px;
    height: 300px;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    backface-visibility: hidden;
    border-radius: 1em;
    overflow: hidden;
  }

  /* 5) Front face: cover image */
  .face--front {
    background: var(--card-media-bg);
    transform: rotateY(0deg) translateZ(150px);
    border: 1px solid var(--border-soft);
    box-shadow: 0 0 28px 8px rgba(46, 168, 165, 0.25);
  }

  .face--front img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .media-fallback {
    display: grid;
    place-content: center;
    height: 100%;
    width: 100%;
    color: var(--text-muted);
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    font-size: 0.75rem;
  }

  /* 6) Right face: description */
  .face--right {
    background: var(--card-bg);
    transform: rotateY(90deg) translateZ(150px);
    padding: 1.5em;
    border: 1px solid var(--border-soft);
    box-shadow: 0 0 28px 8px rgba(46, 168, 165, 0.25);
    align-items: flex-start;
  }

  .face-right-content {
    display: flex;
    flex-direction: column;
    gap: 0.75em;
    width: 100%;
  }

  .face-right-content h3 {
    margin: 0;
    font-family: 'Instrument Serif', Georgia, serif;
    font-size: 1.45rem;
    line-height: 1.1;
    color: var(--text-strong);
  }

  .face-right-content p {
    margin: 0;
    font-size: 0.88rem;
    line-height: 1.5;
    color: var(--text-body);
  }

  .face-chips {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
    margin-top: auto;
  }

  .face-chips span {
    border-radius: 999px;
    padding: 0.22rem 0.56rem;
    background: var(--surface-chip);
    font-size: 0.72rem;
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
