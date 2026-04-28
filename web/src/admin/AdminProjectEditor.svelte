<script>
  import { createEventDispatcher } from 'svelte';
  import { createAdminProject, updateAdminProject } from '../lib/adminApi.js';

  const dispatch = createEventDispatcher();

  export let project = null; // null = create mode, otherwise edit mode

  const isCreate = !project;

  // Deep-clone initial state so edits don't mutate the original
  let form = project
    ? JSON.parse(JSON.stringify(project))
    : {
        id: '',
        title: '',
        subtitle: '',
        description: '',
        pullQuote: '',
        longText: '',
        visible: true,
        order: 0,
        startYear: '',
        endYear: '',
        images: [],
        videos: [],
        links: [],
        people: [],
        cooperation_partners: [],
        infrastructures: [],
        financier: []
      };

  // Remove internal MongoDB _id from form
  delete form._id;

  let saving = false;
  let saveError = '';

  // --- Generic array helpers ---
  function addItem(arr, template) {
    return [...arr, { ...template }];
  }

  function removeItem(arr, index) {
    return arr.filter((_, i) => i !== index);
  }

  // Specific add helpers
  function addImage() { form.images = addItem(form.images, { url: '', alt: '', caption: '', cover: false }); }
  function removeImage(i) { form.images = removeItem(form.images, i); }

  function addVideo() { form.videos = addItem(form.videos, { url: '', alt: '', caption: '' }); }
  function removeVideo(i) { form.videos = removeItem(form.videos, i); }

  function addLink() { form.links = addItem(form.links, { label: '', url: '' }); }
  function removeLink(i) { form.links = removeItem(form.links, i); }

  function addPerson() { form.people = addItem(form.people, { name: '', association: '', link: '', profileImage: '' }); }
  function removePerson(i) { form.people = removeItem(form.people, i); }

  function addPartner(field) { form[field] = addItem(form[field], { name: '', logo: '', link: '' }); }
  function removePartner(field, i) { form[field] = removeItem(form[field], i); }

  async function handleSubmit(event) {
    event.preventDefault();
    saving = true;
    saveError = '';
    try {
      if (isCreate) {
        const created = await createAdminProject(form);
        dispatch('saved', { project: created, created: true });
      } else {
        const updated = await updateAdminProject(form.id, form);
        dispatch('saved', { project: updated, created: false });
      }
    } catch (err) {
      saveError = err.message;
    } finally {
      saving = false;
    }
  }
</script>

<div class="editor">
  <div class="editor-header">
    <button class="btn-back" on:click={() => dispatch('cancel')}>← Back</button>
    <h2>{isCreate ? 'New project' : `Edit: ${project.title || project.id}`}</h2>
  </div>

  <form on:submit={handleSubmit}>

    <!-- Basic info -->
    <section class="section">
      <h3>Basic info</h3>
      <div class="grid-2">
        <label>
          ID <span class="required">*</span>
          <input type="text" bind:value={form.id} required disabled={!isCreate} placeholder="unique-slug" />
          {#if !isCreate}<small class="hint">ID cannot be changed after creation.</small>{/if}
        </label>
        <label>
          Order
          <input type="number" bind:value={form.order} />
        </label>
      </div>
      <div class="grid-2">
        <label>
          Start year
          <input type="number" bind:value={form.startYear} placeholder="e.g. 2021" min="1900" max="2100" />
        </label>
        <label>
          End year
          <input type="number" bind:value={form.endYear} placeholder="e.g. 2024 (leave blank if ongoing)" min="1900" max="2100" />
        </label>
      </div>
      <label>
        Title
        <input type="text" bind:value={form.title} placeholder="Project title" />
      </label>
      <label>
        Subtitle
        <input type="text" bind:value={form.subtitle} placeholder="Short subtitle" />
      </label>
      <label>
        Description
        <textarea bind:value={form.description} rows="3" placeholder="Short description shown in project list"></textarea>
      </label>
      <label>
        Pull quote
        <input type="text" bind:value={form.pullQuote} placeholder="Featured pull quote" />
      </label>
      <label>
        Long text
        <textarea bind:value={form.longText} rows="6" placeholder="Full project description (supports plain text)"></textarea>
      </label>
      <label class="checkbox-label">
        <input type="checkbox" bind:checked={form.visible} />
        Visible (show in public listing)
      </label>
    </section>

    <!-- Images -->
    <section class="section">
      <div class="section-header">
        <h3>Images</h3>
        <button type="button" class="btn-add" on:click={addImage}>+ Add image</button>
      </div>
      {#each form.images as img, i}
        <div class="array-item">
          <div class="array-item-header">
            <span>Image {i + 1}</span>
            <button type="button" class="btn-remove" on:click={() => removeImage(i)}>Remove</button>
          </div>
          <div class="grid-2">
            <label>URL<input type="text" bind:value={img.url} placeholder="https://…" /></label>
            <label>Alt text<input type="text" bind:value={img.alt} placeholder="Descriptive alt text" /></label>
          </div>
          <label>Caption<input type="text" bind:value={img.caption} /></label>
          <label class="checkbox-label">
            <input type="checkbox" bind:checked={img.cover} />
            Cover image
          </label>
        </div>
      {/each}
    </section>

    <!-- Videos -->
    <section class="section">
      <div class="section-header">
        <h3>Videos</h3>
        <button type="button" class="btn-add" on:click={addVideo}>+ Add video</button>
      </div>
      {#each form.videos as vid, i}
        <div class="array-item">
          <div class="array-item-header">
            <span>Video {i + 1}</span>
            <button type="button" class="btn-remove" on:click={() => removeVideo(i)}>Remove</button>
          </div>
          <div class="grid-2">
            <label>URL<input type="text" bind:value={vid.url} placeholder="YouTube/Vimeo URL or direct file" /></label>
            <label>Alt text<input type="text" bind:value={vid.alt} /></label>
          </div>
          <label>Caption<input type="text" bind:value={vid.caption} /></label>
        </div>
      {/each}
    </section>

    <!-- Links -->
    <section class="section">
      <div class="section-header">
        <h3>Links</h3>
        <button type="button" class="btn-add" on:click={addLink}>+ Add link</button>
      </div>
      {#each form.links as link, i}
        <div class="array-item">
          <div class="array-item-header">
            <span>Link {i + 1}</span>
            <button type="button" class="btn-remove" on:click={() => removeLink(i)}>Remove</button>
          </div>
          <div class="grid-2">
            <label>Label<input type="text" bind:value={link.label} placeholder="Visit website" /></label>
            <label>URL<input type="text" bind:value={link.url} placeholder="https://…" /></label>
          </div>
        </div>
      {/each}
    </section>

    <!-- People -->
    <section class="section">
      <div class="section-header">
        <h3>People</h3>
        <button type="button" class="btn-add" on:click={addPerson}>+ Add person</button>
      </div>
      {#each form.people as person, i}
        <div class="array-item">
          <div class="array-item-header">
            <span>Person {i + 1}</span>
            <button type="button" class="btn-remove" on:click={() => removePerson(i)}>Remove</button>
          </div>
          <div class="grid-2">
            <label>Name<input type="text" bind:value={person.name} /></label>
            <label>Association<input type="text" bind:value={person.association} /></label>
          </div>
          <div class="grid-2">
            <label>Link<input type="text" bind:value={person.link} placeholder="https://…" /></label>
            <label>Profile image URL<input type="text" bind:value={person.profileImage} placeholder="https://…" /></label>
          </div>
        </div>
      {/each}
    </section>

    <!-- Cooperation partners -->
    <section class="section">
      <div class="section-header">
        <h3>Cooperation partners</h3>
        <button type="button" class="btn-add" on:click={() => addPartner('cooperation_partners')}>+ Add partner</button>
      </div>
      {#each form.cooperation_partners as partner, i}
        <div class="array-item">
          <div class="array-item-header">
            <span>Partner {i + 1}</span>
            <button type="button" class="btn-remove" on:click={() => removePartner('cooperation_partners', i)}>Remove</button>
          </div>
          <div class="grid-2">
            <label>Name<input type="text" bind:value={partner.name} /></label>
            <label>Link<input type="text" bind:value={partner.link} placeholder="https://…" /></label>
          </div>
          <label>Logo URL<input type="text" bind:value={partner.logo} placeholder="https://…" /></label>
        </div>
      {/each}
    </section>

    <!-- Infrastructures -->
    <section class="section">
      <div class="section-header">
        <h3>Infrastructures</h3>
        <button type="button" class="btn-add" on:click={() => addPartner('infrastructures')}>+ Add infrastructure</button>
      </div>
      {#each form.infrastructures as item, i}
        <div class="array-item">
          <div class="array-item-header">
            <span>Infrastructure {i + 1}</span>
            <button type="button" class="btn-remove" on:click={() => removePartner('infrastructures', i)}>Remove</button>
          </div>
          <div class="grid-2">
            <label>Name<input type="text" bind:value={item.name} /></label>
            <label>Link<input type="text" bind:value={item.link} placeholder="https://…" /></label>
          </div>
          <label>Logo URL<input type="text" bind:value={item.logo} placeholder="https://…" /></label>
        </div>
      {/each}
    </section>

    <!-- Financiers -->
    <section class="section">
      <div class="section-header">
        <h3>Financiers</h3>
        <button type="button" class="btn-add" on:click={() => addPartner('financier')}>+ Add financier</button>
      </div>
      {#each form.financier as item, i}
        <div class="array-item">
          <div class="array-item-header">
            <span>Financier {i + 1}</span>
            <button type="button" class="btn-remove" on:click={() => removePartner('financier', i)}>Remove</button>
          </div>
          <div class="grid-2">
            <label>Name<input type="text" bind:value={item.name} /></label>
            <label>Link<input type="text" bind:value={item.link} placeholder="https://…" /></label>
          </div>
          <label>Logo URL<input type="text" bind:value={item.logo} placeholder="https://…" /></label>
        </div>
      {/each}
    </section>

    <!-- Save -->
    <div class="save-bar">
      {#if saveError}
        <p class="save-error">{saveError}</p>
      {/if}
      <button type="button" class="btn-cancel" on:click={() => dispatch('cancel')}>Cancel</button>
      <button type="submit" class="btn-save" disabled={saving}>
        {saving ? 'Saving…' : isCreate ? 'Create project' : 'Save changes'}
      </button>
    </div>
  </form>
</div>

<style>
  .editor {
    padding: 2rem;
    max-width: 860px;
    margin: 0 auto;
  }

  .editor-header {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 2rem;
  }

  h2 {
    margin: 0;
    font-size: 1.4rem;
    color: var(--admin-text, #f0f5f7);
  }

  .section {
    background: var(--admin-section-bg, rgba(255,255,255,0.03));
    border: 1px solid var(--admin-border-soft, rgba(255,255,255,0.07));
    border-radius: 10px;
    padding: 1.25rem 1.5rem;
    margin-bottom: 1.25rem;
  }

  .section h3 {
    margin: 0 0 1rem;
    font-size: 0.95rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: var(--admin-muted, rgba(240,245,247,0.55));
  }

  .section-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1rem;
  }

  .section-header h3 {
    margin: 0;
  }

  .grid-2 {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.75rem;
  }

  label {
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
    font-size: 0.82rem;
    font-weight: 600;
    color: var(--admin-label, rgba(240,245,247,0.65));
    margin-bottom: 0.65rem;
  }

  .checkbox-label {
    flex-direction: row;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.88rem;
  }

  .checkbox-label input {
    width: auto;
  }

  input[type="text"],
  input[type="number"],
  textarea {
    padding: 0.5rem 0.65rem;
    border-radius: 6px;
    border: 1px solid var(--admin-border, rgba(255,255,255,0.12));
    background: var(--admin-input-bg, rgba(255,255,255,0.05));
    color: var(--admin-text, #f0f5f7);
    font-size: 0.88rem;
    font-family: inherit;
    outline: none;
    transition: border-color 0.15s;
    resize: vertical;
    width: 100%;
  }

  input:focus,
  textarea:focus {
    border-color: var(--admin-accent, #2ea8a5);
  }

  input:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }

  .hint {
    font-size: 0.75rem;
    color: var(--admin-muted, rgba(240,245,247,0.45));
    font-weight: 400;
  }

  .required {
    color: #f87171;
  }

  .array-item {
    background: var(--admin-input-bg, rgba(255,255,255,0.04));
    border: 1px solid var(--admin-border-soft, rgba(255,255,255,0.07));
    border-radius: 8px;
    padding: 1rem;
    margin-bottom: 0.75rem;
  }

  .array-item-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.75rem;
    font-size: 0.8rem;
    font-weight: 600;
    color: var(--admin-muted, rgba(240,245,247,0.5));
  }

  .btn-back,
  .btn-add,
  .btn-remove,
  .btn-cancel,
  .btn-save {
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 0.85rem;
    font-weight: 600;
    transition: opacity 0.15s;
    padding: 0.4rem 0.85rem;
  }

  .btn-back {
    background: transparent;
    color: var(--admin-accent, #2ea8a5);
    padding: 0.4rem 0;
    font-size: 0.9rem;
  }

  .btn-add {
    background: rgba(46, 168, 165, 0.15);
    color: #2ea8a5;
    font-size: 0.8rem;
  }

  .btn-remove {
    background: rgba(248,113,113,0.12);
    color: #f87171;
    font-size: 0.78rem;
    padding: 0.25rem 0.6rem;
  }

  .btn-cancel {
    background: rgba(255,255,255,0.08);
    color: var(--admin-text, #f0f5f7);
  }

  .btn-save {
    background: var(--admin-accent, #2ea8a5);
    color: #fff;
    padding: 0.5rem 1.25rem;
  }

  .btn-back:hover,
  .btn-add:hover,
  .btn-remove:hover,
  .btn-cancel:hover,
  .btn-save:hover:not(:disabled) {
    opacity: 0.8;
  }

  .btn-save:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .save-bar {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 0.75rem;
    padding: 1.25rem 0 0.5rem;
    border-top: 1px solid var(--admin-border-soft, rgba(255,255,255,0.08));
    margin-top: 0.5rem;
  }

  .save-error {
    margin: 0 auto 0 0;
    color: #f87171;
    font-size: 0.85rem;
  }
</style>
