<script>
  import { createEventDispatcher, onDestroy, tick } from 'svelte';
  import { splitParagraphs } from '../lib/normalize.js';

  export let project = null;

  const dispatch = createEventDispatcher();
  let lightboxImage = null;
  let overlayElement = null;
  let lightboxTopOffset = 0;
  let galleryCanExpand = {};
  let galleryImageElements = [];
  let bodyScrollWasLocked = false;
  let previousBodyOverflow = '';

  $: paragraphs = splitParagraphs(project?.longText || '');
  $: galleryImages = (project?.images || []).filter((image) => image.url && image.url !== project?.coverImage?.url);
  $: gallerySignature = galleryImages.map((image, index) => `${index}:${image.url}`).join('|');
  $: infrastructures = project?.infrastructures || [];
  $: cooperationPartners = project?.cooperationPartners || [];
  $: financiers = project?.financiers || [];
  $: if (!project) {
    lightboxImage = null;
    galleryCanExpand = {};
    galleryImageElements = [];
  }
  $: if (gallerySignature) {
    refreshGalleryExpandability();
  }
  $: if (lightboxImage) {
    lockBodyScroll();
  } else {
    unlockBodyScroll();
  }

  onDestroy(() => {
    unlockBodyScroll();
  });

  function close() {
    lightboxImage = null;
    dispatch('close');
  }

  function openLightbox(image, index) {
    if (!galleryCanExpand[index]) {
      return;
    }

    lightboxTopOffset = overlayElement?.scrollTop || 0;
    lightboxImage = image;
  }

  function closeLightbox() {
    lightboxImage = null;
  }

  function handleKeydown(event) {
    if (!project) {
      return;
    }

    if (event.key === 'Escape') {
      if (lightboxImage) {
        closeLightbox();
        return;
      }

      close();
    }
  }

  function lockBodyScroll() {
    if (typeof document === 'undefined' || bodyScrollWasLocked) {
      return;
    }

    previousBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    bodyScrollWasLocked = true;
  }

  function unlockBodyScroll() {
    if (typeof document === 'undefined' || !bodyScrollWasLocked) {
      return;
    }

    document.body.style.overflow = previousBodyOverflow;
    bodyScrollWasLocked = false;
  }

  function imageCanExpand(index) {
    const image = galleryImageElements[index];
    if (!image) {
      return false;
    }

    return image.naturalWidth > image.clientWidth + 1 || image.naturalHeight > image.clientHeight + 1;
  }

  function updateGalleryExpandability() {
    const next = {};
    galleryImages.forEach((_, index) => {
      next[index] = imageCanExpand(index);
    });
    galleryCanExpand = next;
  }

  async function refreshGalleryExpandability() {
    await tick();
    updateGalleryExpandability();
  }

  function handleGalleryImageLoad(index) {
    galleryCanExpand = {
      ...galleryCanExpand,
      [index]: imageCanExpand(index)
    };
  }

  function registerGalleryImage(node, index) {
    let currentIndex = index;
    galleryImageElements[currentIndex] = node;

    return {
      update(nextIndex) {
        if (nextIndex === currentIndex) {
          return;
        }

        delete galleryImageElements[currentIndex];
        currentIndex = nextIndex;
        galleryImageElements[currentIndex] = node;
      },
      destroy() {
        delete galleryImageElements[currentIndex];
      }
    };
  }
</script>

<svelte:window on:keydown={handleKeydown} on:resize={updateGalleryExpandability} />

{#if project}
  <div
    class="overlay"
    class:overlay-locked={Boolean(lightboxImage)}
    role="dialog"
    aria-modal="true"
    aria-label={`${project.title} details`}
    bind:this={overlayElement}
  >
    <button class="backdrop-close" type="button" on:click={close} aria-label="Close project details"></button>
    <article class="panel">
      <button class="close" type="button" on:click={close} aria-label="Close project details">Close</button>

      <header class="header">
        <p class="eyebrow">{project.id}</p>
        <h2>{project.title}</h2>
        {#if project.subtitle}
          <p class="subtitle">{project.subtitle}</p>
        {/if}
        {#if project.description}
          <p class="summary">{project.description}</p>
        {/if}
      </header>

      {#if project.coverImage?.url}
        <figure class="hero-image">
          <img src={project.coverImage.url} alt={project.coverImage.alt || project.title} loading="lazy" />
          {#if project.coverImage.caption}
            <figcaption>{project.coverImage.caption}</figcaption>
          {/if}
        </figure>
      {/if}

      {#if project.pullQuote}
        <blockquote>{project.pullQuote}</blockquote>
      {/if}

      {#if paragraphs.length}
        <section>
          <h3>Overview</h3>
          {#each paragraphs as paragraph}
            <p>{paragraph}</p>
          {/each}
        </section>
      {/if}

      {#if galleryImages.length}
        <section>
          <h3>Image Gallery</h3>
          <div class="gallery">
            {#each galleryImages as image, index (`${index}:${image.url}`)}
              <figure class="gallery-item">
                <button
                  type="button"
                  class="gallery-open"
                  class:is-expandable={galleryCanExpand[index]}
                  disabled={!galleryCanExpand[index]}
                  aria-label={galleryCanExpand[index]
                    ? `Open larger image: ${image.alt || image.caption || project.title}`
                    : `Image already shown at maximum size: ${image.alt || image.caption || project.title}`}
                  on:click={() => openLightbox(image, index)}
                >
                  <img
                    src={image.url}
                    alt={image.alt || project.title}
                    loading="lazy"
                    use:registerGalleryImage={index}
                    on:load={() => handleGalleryImageLoad(index)}
                  />
                </button>
                {#if image.caption}
                  <figcaption>{image.caption}</figcaption>
                {/if}
              </figure>
            {/each}
          </div>
        </section>
      {/if}

      {#if project.videos.length}
        <section>
          <h3>Videos</h3>
          <div class="video-grid">
            {#each project.videos as video}
              <article class="video-card">
                {#if video.mode === 'video'}
                  <!-- svelte-ignore a11y-media-has-caption -->
                  <video controls preload="metadata" src={video.url}></video>
                {:else if video.mode === 'iframe'}
                  <iframe
                    src={video.url}
                    title={video.alt || `${project.title} video`}
                    loading="lazy"
                    referrerpolicy="strict-origin-when-cross-origin"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowfullscreen
                  ></iframe>
                {:else}
                  <a href={video.url} target="_blank" rel="noreferrer noopener">Open video</a>
                {/if}

                {#if video.caption}
                  <p>{video.caption}</p>
                {/if}
              </article>
            {/each}
          </div>
        </section>
      {/if}

      {#if project.links.length}
        <section>
          <h3>Links</h3>
          <ul class="link-list">
            {#each project.links as link}
              <li>
                <a href={link.url} target="_blank" rel="noreferrer noopener">{link.label}</a>
              </li>
            {/each}
          </ul>
        </section>
      {/if}

      {#if infrastructures.length}
        <section>
          <h3>Infrastructures</h3>
          <div class="partners-grid">
            {#each infrastructures as item}
              <article>
                {#if item.logo}
                  <img src={item.logo} alt={item.name} loading="lazy" />
                {/if}
                <h4>{item.name}</h4>
                {#if item.type}
                  <p>{item.type}</p>
                {/if}
                {#if item.link}
                  <a href={item.link} target="_blank" rel="noreferrer noopener">Visit</a>
                {/if}
              </article>
            {/each}
          </div>
        </section>
      {/if}

      {#if project.people.length || cooperationPartners.length || financiers.length}
        <div class="info-sections-row">
          {#if project.people.length}
            <section class="info-pane">
              <h3>Whom To Blame</h3>
              <div class="people-grid">
                {#each project.people as person}
                  {#if person.link}
                    <a class="person-link" href={person.link} target="_blank" rel="noreferrer noopener" aria-label={person.name}>
                      <article class="person-card person-card-clickable">
                        {#if person.profileImage}
                          <img src={person.profileImage} alt={person.name} loading="lazy" />
                        {:else}
                          <div class="person-avatar-placeholder" aria-hidden="true">
                            <i class="fa fa-user-circle"></i>
                          </div>
                        {/if}
                        <div>
                          <h4>{person.name}</h4>
                        </div>
                      </article>
                    </a>
                  {:else}
                    <article class="person-card">
                      {#if person.profileImage}
                        <img src={person.profileImage} alt={person.name} loading="lazy" />
                      {:else}
                        <div class="person-avatar-placeholder" aria-hidden="true">
                          <i class="fa fa-user-circle"></i>
                        </div>
                      {/if}
                      <div>
                        <h4>{person.name}</h4>
                      </div>
                    </article>
                  {/if}
                {/each}
              </div>
            </section>
          {/if}

          {#if cooperationPartners.length}
            <section class="info-pane org-section">
              <h3>In Cooperation With</h3>
              <div class="org-list">
                {#each cooperationPartners as item}
                  {#if item.link}
                    <a class="org-link" href={item.link} target="_blank" rel="noreferrer noopener" aria-label={item.name}>
                      <div class="org-container">
                        <div class="org-image-container">
                          {#if item.logo}
                            <img src={item.logo} alt={item.name} class="org-image" loading="lazy" />
                          {:else}
                            <span class="org-name">{item.name}</span>
                          {/if}
                        </div>
                      </div>
                    </a>
                  {:else}
                    <div class="org-link">
                      <div class="org-container">
                        <div class="org-image-container">
                          {#if item.logo}
                            <img src={item.logo} alt={item.name} class="org-image" loading="lazy" />
                          {:else}
                            <span class="org-name">{item.name}</span>
                          {/if}
                        </div>
                      </div>
                    </div>
                  {/if}
                {/each}
              </div>
            </section>
          {/if}

          {#if financiers.length}
            <section class="info-pane org-section">
              <h3>Financiers</h3>
              <div class="org-list">
                {#each financiers as item}
                  {#if item.link}
                    <a class="org-link" href={item.link} target="_blank" rel="noreferrer noopener" aria-label={item.name}>
                      <div class="org-container">
                        <div class="org-image-container">
                          {#if item.logo}
                            <img src={item.logo} alt={item.name} class="org-image" loading="lazy" />
                          {:else}
                            <span class="org-name">{item.name}</span>
                          {/if}
                        </div>
                      </div>
                    </a>
                  {:else}
                    <div class="org-link">
                      <div class="org-container">
                        <div class="org-image-container">
                          {#if item.logo}
                            <img src={item.logo} alt={item.name} class="org-image" loading="lazy" />
                          {:else}
                            <span class="org-name">{item.name}</span>
                          {/if}
                        </div>
                      </div>
                    </div>
                  {/if}
                {/each}
              </div>
            </section>
          {/if}
        </div>
      {/if}
    </article>

    {#if lightboxImage}
      <div
        class="lightbox"
        style={`--lightbox-top-offset: ${lightboxTopOffset}px;`}
        role="dialog"
        aria-modal="true"
        aria-label="Expanded image view"
      >
        <button
          type="button"
          class="lightbox-backdrop"
          on:click={closeLightbox}
          aria-label="Close expanded image"
        ></button>
        <figure class="lightbox-panel">
          <button type="button" class="lightbox-close" on:click={closeLightbox} aria-label="Close expanded image">
            Close image
          </button>
          <img src={lightboxImage.url} alt={lightboxImage.alt || project.title} />
          {#if lightboxImage.caption}
            <figcaption>{lightboxImage.caption}</figcaption>
          {/if}
        </figure>
      </div>
    {/if}
  </div>
{/if}

<style>
  .overlay {
    position: fixed;
    inset: 0;
    z-index: 80;
    display: grid;
    align-items: start;
    background: var(--overlay-bg);
    backdrop-filter: blur(5px);
    padding: clamp(0.75rem, 2vw, 1.25rem);
    overflow: auto;
  }

  .overlay.overlay-locked {
    overflow: hidden;
    overscroll-behavior: contain;
    touch-action: none;
  }

  .backdrop-close {
    position: fixed;
    inset: 0;
    border: 0;
    background: transparent;
    padding: 0;
    margin: 0;
    cursor: pointer;
  }

  .panel {
    position: relative;
    z-index: 1;
    max-width: 1040px;
    margin: 0 auto;
    padding: clamp(1rem, 3vw, 2rem);
    border-radius: 28px;
    border: 1px solid var(--border-mid);
    background: var(--modal-panel-bg);
    box-shadow: var(--shadow-modal);
    display: grid;
    gap: 1.2rem;
  }

  .close {
    position: sticky;
    top: 0;
    justify-self: end;
    border-radius: 999px;
    border: 1px solid var(--border-strong);
    background: var(--modal-close-bg);
    color: var(--text-soft);
    padding: 0.45rem 0.9rem;
    font-weight: 700;
    cursor: pointer;
    z-index: 2;
  }

  .eyebrow {
    margin: 0;
    text-transform: uppercase;
    letter-spacing: 0.14em;
    font-size: 0.72rem;
    color: var(--text-muted);
  }

  h2 {
    margin: 0;
    font-family: 'Instrument Serif', Georgia, serif;
    font-size: clamp(2rem, 4vw, 3.1rem);
    line-height: 1;
  }

  .subtitle {
    margin: 0.2rem 0 0;
    color: var(--text-muted);
    font-weight: 600;
  }

  .summary {
    margin: 0.6rem 0 0;
    color: var(--text-body);
    max-width: 72ch;
  }

  .hero-image,
  .gallery figure {
    margin: 0;
    border-radius: 16px;
    overflow: hidden;
    border: 1px solid var(--border-soft);
    background: var(--media-bg);
  }

  .hero-image img,
  .gallery img {
    width: 100%;
    display: block;
    object-fit: cover;
  }

  .hero-image figcaption,
  .gallery figcaption {
    padding: 0.55rem 0.7rem 0.7rem;
    color: var(--text-muted);
    font-size: 0.82rem;
  }

  blockquote {
    margin: 0;
    padding: 1rem;
    border-radius: 14px;
    border-left: 4px solid var(--quote-border);
    background: var(--quote-bg);
    font-family: 'Instrument Serif', Georgia, serif;
    font-size: 1.25rem;
    line-height: 1.35;
    color: var(--text-strong);
  }

  h3 {
    margin: 0 0 0.5rem;
    font-size: 0.92rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--text-muted);
  }

  section p {
    color: var(--text-body);
    line-height: 1.6;
    margin: 0.4rem 0;
  }

  .gallery {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 0.8rem;
  }

  .gallery-item {
    display: grid;
    gap: 0;
  }

  .gallery-open {
    border: 0;
    background: transparent;
    padding: 0;
    margin: 0;
    width: 100%;
    cursor: default;
  }

  .gallery-open.is-expandable {
    cursor: zoom-in;
  }

  .gallery-open:disabled {
    opacity: 1;
  }

  .video-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 0.8rem;
  }

  .video-card {
    border-radius: 14px;
    border: 1px solid var(--border-soft);
    background: var(--modal-section-bg);
    padding: 0.65rem;
    display: grid;
    gap: 0.5rem;
  }

  video,
  iframe {
    width: 100%;
    aspect-ratio: 16 / 9;
    border: 0;
    border-radius: 8px;
    background: #000;
  }

  .link-list {
    margin: 0;
    padding-left: 1.1rem;
    display: grid;
    gap: 0.42rem;
  }

  .people-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 0.65rem;
  }

  .info-sections-row {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 0.8rem;
    align-items: start;
  }

  .info-pane {
    border: 1px solid var(--border-soft);
    border-radius: 14px;
    background: var(--modal-section-bg-2);
    padding: 0.7rem;
    min-height: 240px;
    display: grid;
    align-content: start;
    gap: 0.45rem;
  }

  .info-pane > h3 {
    margin-bottom: 0.2rem;
  }

  .info-pane .people-grid {
    grid-template-columns: 1fr;
  }

  .person-card {
    border-radius: 14px;
    border: 1px solid var(--border-soft);
    background: var(--modal-section-bg);
    padding: 0.7rem;
    display: grid;
    grid-template-columns: 56px 1fr;
    gap: 0.65rem;
    align-items: center;
  }

  .person-card > div {
    min-height: 56px;
    display: flex;
    align-items: center;
  }

  .person-link {
    display: block;
    text-decoration: none;
    color: inherit;
  }

  .person-card-clickable {
    transition: box-shadow 160ms ease, background 160ms ease;
  }

  .person-link:hover .person-card-clickable {
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
    background: var(--modal-section-bg-2);
    cursor: pointer;
  }

  .person-card img {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    object-fit: cover;
    border: 1px solid var(--border-strong);
  }

  .person-avatar-placeholder {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    border: 1px solid var(--border-strong);
    display: flex;
    justify-content: center;
    align-items: center;
    background: var(--media-bg);
    color: rgba(145, 149, 157, 0.95);
    font-size: 2.2rem;
    line-height: 1;
  }

  .person-card h4 {
    margin: 0;
    font-size: 1.05rem;
    color: #2244cf;
    font-weight: 500;
  }

  .partners-grid h4 {
    margin: 0;
    font-size: 0.95rem;
    color: var(--text-strong);
  }

  .partners-grid p,
  .video-card p {
    margin: 0.3rem 0 0;
    font-size: 0.84rem;
    color: var(--text-body);
  }

  a {
    color: var(--accent-link);
    text-decoration-thickness: 2px;
    text-underline-offset: 2px;
  }

  .org-section {
    display: grid;
    gap: 0.35rem;
  }

  .org-list {
    display: flex;
    flex-wrap: wrap;
    align-items: stretch;
    justify-content: center;
    gap: 0.55rem;
  }

  .org-link {
    display: flex;
    flex: 0 1 280px;
    max-width: 280px;
    width: 100%;
    text-decoration: none;
    color: inherit;
  }

  .org-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 100px;
    padding: 0.75rem;
    border: 1px solid var(--border-strong);
    border-radius: 0.6rem;
    background: var(--modal-section-bg);
    transition: box-shadow 160ms ease, background 160ms ease;
  }

  .org-link:hover .org-container {
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
    background: var(--modal-section-bg-2);
  }

  .org-image-container {
    width: calc(100% - 0.5rem);
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .org-image {
    min-width: 220px;
    min-height: 60px;
    max-height: 90px;
    width: 100%;
    height: auto;
    object-fit: contain;
  }

  .org-name {
    font-size: 0.9rem;
    color: var(--text-body);
    text-align: center;
    line-height: 1.35;
  }

  .partners-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(190px, 1fr));
    gap: 0.6rem;
  }

  .partners-grid article {
    border-radius: 14px;
    border: 1px solid var(--border-soft);
    background: var(--modal-section-bg-2);
    padding: 0.7rem;
    display: grid;
    gap: 0.45rem;
  }

  .partners-grid img {
    width: 100%;
    max-height: 52px;
    object-fit: contain;
    justify-self: start;
  }

  .lightbox {
    position: absolute;
    left: 0;
    right: 0;
    top: var(--lightbox-top-offset, 0px);
    height: 100dvh;
    z-index: 120;
    display: grid;
    place-items: center;
    padding: clamp(0.75rem, 2.4vw, 1.5rem);
  }

  .lightbox-backdrop {
    position: absolute;
    inset: 0;
    border: 0;
    background: rgba(2, 6, 10, 0.82);
    cursor: zoom-out;
  }

  .lightbox-panel {
    position: relative;
    z-index: 1;
    margin: 0;
    max-width: min(92vw, 1200px);
    max-height: 90vh;
    display: grid;
    gap: 0.5rem;
    border-radius: 14px;
    border: 1px solid var(--border-mid);
    padding: 0.55rem;
    background: var(--modal-panel-bg);
    box-shadow: var(--shadow-modal);
  }

  .lightbox-panel img {
    width: 100%;
    height: auto;
    max-height: calc(90vh - 3.5rem);
    object-fit: contain;
    border-radius: 8px;
    background: #000;
  }

  .lightbox-panel figcaption {
    padding: 0 0.4rem 0.2rem;
    font-size: 0.84rem;
    color: var(--text-muted);
  }

  .lightbox-close {
    justify-self: end;
    border-radius: 999px;
    border: 1px solid var(--border-strong);
    background: var(--modal-close-bg);
    color: var(--text-soft);
    padding: 0.38rem 0.82rem;
    cursor: pointer;
    font-weight: 700;
  }

  @media (max-width: 640px) {
    .info-sections-row {
      grid-template-columns: 1fr;
    }

    .person-card {
      grid-template-columns: 1fr;
    }

    .person-card img {
      width: 72px;
      height: 72px;
    }
  }
</style>
