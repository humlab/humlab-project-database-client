<script>
  import { onMount } from 'svelte';
  import { fetchSettings, updateAdminSettings } from '../lib/adminApi.js';

  let viewMode = 'box';
  let defaultTheme = 'dark';
  let loading = true;
  let saving = false;
  let loadError = '';
  let saveError = '';
  let savedOk = false;

  onMount(async () => {
    try {
      const settings = await fetchSettings();
      viewMode = settings.viewMode || 'box';
      defaultTheme = settings.defaultTheme || 'dark';
    } catch (err) {
      loadError = err.message;
    } finally {
      loading = false;
    }
  });

  async function handleSave() {
    saving = true;
    saveError = '';
    savedOk = false;
    try {
      const result = await updateAdminSettings({ viewMode, defaultTheme });
      viewMode = result.viewMode || viewMode;
      defaultTheme = result.defaultTheme || defaultTheme;
      savedOk = true;
      setTimeout(() => { savedOk = false; }, 2500);
    } catch (err) {
      saveError = err.message;
    } finally {
      saving = false;
    }
  }
</script>

<div class="settings-page">
  <h2>Settings</h2>

  {#if loading}
    <p class="state-msg">Loading…</p>
  {:else if loadError}
    <p class="state-msg error">{loadError}</p>
  {:else}
    <section class="section">
      <h3>Display</h3>

      <fieldset>
        <legend>Default project view mode</legend>
        <p class="hint">Sets how projects are displayed for all visitors by default.</p>

        <div class="radio-group">
          <label class="radio-option" class:selected={viewMode === 'box'}>
            <input type="radio" bind:group={viewMode} value="box" />
            <span class="radio-icon">▦</span>
            <span class="radio-label">Box</span>
            <span class="radio-desc">Standard card grid</span>
          </label>

          <label class="radio-option" class:selected={viewMode === 'cube'}>
            <input type="radio" bind:group={viewMode} value="cube" />
            <span class="radio-icon">⬛</span>
            <span class="radio-label">Cube</span>
            <span class="radio-desc">3D cube card grid</span>
          </label>
        </div>
      </fieldset>

      <fieldset style="margin-top:1.25rem">
        <legend>Default theme for new visitors</legend>
        <p class="hint">Applied when a visitor has no saved preference. They can still toggle it themselves.</p>

        <div class="radio-group">
          <label class="radio-option" class:selected={defaultTheme === 'dark'}>
            <input type="radio" bind:group={defaultTheme} value="dark" />
            <span class="radio-icon">🌙</span>
            <span class="radio-label">Dark</span>
            <span class="radio-desc">Dark background</span>
          </label>

          <label class="radio-option" class:selected={defaultTheme === 'light'}>
            <input type="radio" bind:group={defaultTheme} value="light" />
            <span class="radio-icon">☀️</span>
            <span class="radio-label">Light</span>
            <span class="radio-desc">Light background</span>
          </label>
        </div>
      </fieldset>
    </section>

    <div class="save-bar">
      {#if saveError}
        <p class="save-error">{saveError}</p>
      {/if}
      {#if savedOk}
        <p class="save-ok">Saved!</p>
      {/if}
      <button class="btn-save" disabled={saving} on:click={handleSave}>
        {saving ? 'Saving…' : 'Save settings'}
      </button>
    </div>
  {/if}
</div>

<style>
  .settings-page {
    padding: 2rem;
    max-width: 600px;
    margin: 0 auto;
  }

  h2 {
    margin: 0 0 1.5rem;
    font-size: 1.5rem;
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

  fieldset {
    border: none;
    padding: 0;
    margin: 0;
  }

  legend {
    font-size: 0.9rem;
    font-weight: 600;
    color: var(--admin-text, #f0f5f7);
    margin-bottom: 0.35rem;
  }

  .hint {
    margin: 0 0 1rem;
    font-size: 0.8rem;
    color: var(--admin-muted, rgba(240,245,247,0.5));
  }

  .radio-group {
    display: flex;
    gap: 0.75rem;
  }

  .radio-option {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.3rem;
    padding: 1rem;
    border-radius: 8px;
    border: 1px solid var(--admin-border, rgba(255,255,255,0.1));
    cursor: pointer;
    transition: border-color 0.15s, background 0.15s;
    background: var(--admin-input-bg, rgba(255,255,255,0.04));
  }

  .radio-option.selected {
    border-color: var(--admin-accent, #2ea8a5);
    background: rgba(46,168,165,0.1);
  }

  .radio-option input {
    position: absolute;
    opacity: 0;
    width: 0;
    height: 0;
  }

  .radio-icon {
    font-size: 1.5rem;
  }

  .radio-label {
    font-size: 0.9rem;
    font-weight: 700;
    color: var(--admin-text, #f0f5f7);
  }

  .radio-desc {
    font-size: 0.75rem;
    color: var(--admin-muted, rgba(240,245,247,0.5));
  }

  .state-msg {
    color: var(--admin-muted, rgba(240,245,247,0.6));
  }

  .state-msg.error {
    color: #f87171;
  }

  .save-bar {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 0.75rem;
    padding-top: 0.5rem;
  }

  .save-error {
    margin: 0 auto 0 0;
    color: #f87171;
    font-size: 0.85rem;
  }

  .save-ok {
    margin: 0 auto 0 0;
    color: #2ea8a5;
    font-size: 0.85rem;
  }

  .btn-save {
    background: var(--admin-accent, #2ea8a5);
    color: #fff;
    border: none;
    border-radius: 6px;
    padding: 0.5rem 1.25rem;
    font-size: 0.9rem;
    font-weight: 600;
    cursor: pointer;
    transition: opacity 0.15s;
  }

  .btn-save:hover:not(:disabled) {
    opacity: 0.8;
  }

  .btn-save:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
</style>
