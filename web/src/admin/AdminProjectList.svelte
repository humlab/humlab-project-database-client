<script>
  import { createEventDispatcher } from 'svelte';
  import { fetchAdminProjects, deleteAdminProject } from '../lib/adminApi.js';

  const dispatch = createEventDispatcher();

  export let projects = [];
  export let loading = false;
  export let error = '';

  let deleting = null;
  let deleteError = '';

  async function handleDelete(project) {
    if (!confirm(`Delete project "${project.title || project.id}"? This cannot be undone.`)) return;
    deleting = project.id;
    deleteError = '';
    try {
      await deleteAdminProject(project.id);
      dispatch('deleted', { id: project.id });
    } catch (err) {
      deleteError = err.message;
    } finally {
      deleting = null;
    }
  }
</script>

<div class="project-list">
  <div class="list-header">
    <h2>Projects</h2>
    <button class="btn-primary" on:click={() => dispatch('create')}>+ New project</button>
  </div>

  {#if loading}
    <p class="state-msg">Loading projects…</p>
  {:else if error}
    <p class="state-msg error">{error}</p>
  {:else if projects.length === 0}
    <p class="state-msg">No projects yet.</p>
  {:else}
    {#if deleteError}
      <p class="state-msg error">{deleteError}</p>
    {/if}
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>Visible</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {#each projects as project (project.id)}
          <tr>
            <td class="id-cell">{project.id}</td>
            <td>{project.title || '—'}</td>
            <td class="center">
              <span class="badge {project.visible === false ? 'badge-hidden' : 'badge-visible'}">
                {project.visible === false ? 'Hidden' : 'Visible'}
              </span>
            </td>
            <td class="actions-cell">
              <button class="btn-edit" on:click={() => dispatch('edit', { project })}>Edit</button>
              <button
                class="btn-delete"
                disabled={deleting === project.id}
                on:click={() => handleDelete(project)}
              >
                {deleting === project.id ? '…' : 'Delete'}
              </button>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  {/if}
</div>

<style>
  .project-list {
    padding: 2rem;
    max-width: 960px;
    margin: 0 auto;
  }

  .list-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1.5rem;
    gap: 1rem;
  }

  h2 {
    margin: 0;
    font-size: 1.5rem;
    color: var(--admin-text, #f0f5f7);
  }

  .state-msg {
    color: var(--admin-muted, rgba(240,245,247,0.6));
    font-size: 0.95rem;
  }

  .state-msg.error {
    color: #f87171;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.9rem;
  }

  th {
    text-align: left;
    padding: 0.6rem 0.75rem;
    border-bottom: 1px solid var(--admin-border, rgba(255,255,255,0.12));
    color: var(--admin-muted, rgba(240,245,247,0.6));
    font-weight: 600;
    font-size: 0.8rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  td {
    padding: 0.65rem 0.75rem;
    border-bottom: 1px solid var(--admin-border-soft, rgba(255,255,255,0.06));
    color: var(--admin-text, #f0f5f7);
    vertical-align: middle;
  }

  .id-cell {
    font-family: monospace;
    font-size: 0.82rem;
    color: var(--admin-muted, rgba(240,245,247,0.6));
    white-space: nowrap;
  }

  .center {
    text-align: center;
  }

  .badge {
    display: inline-block;
    padding: 0.2em 0.6em;
    border-radius: 4px;
    font-size: 0.75rem;
    font-weight: 600;
  }

  .badge-visible {
    background: rgba(46, 168, 165, 0.2);
    color: #2ea8a5;
  }

  .badge-hidden {
    background: rgba(248, 113, 113, 0.15);
    color: #f87171;
  }

  .actions-cell {
    display: flex;
    gap: 0.5rem;
    align-items: center;
  }

  .btn-primary,
  .btn-edit,
  .btn-delete {
    padding: 0.4rem 0.85rem;
    border-radius: 6px;
    border: none;
    font-size: 0.85rem;
    font-weight: 600;
    cursor: pointer;
    transition: opacity 0.15s;
  }

  .btn-primary {
    background: var(--admin-accent, #2ea8a5);
    color: #fff;
    padding: 0.5rem 1rem;
  }

  .btn-edit {
    background: rgba(255,255,255,0.1);
    color: var(--admin-text, #f0f5f7);
  }

  .btn-delete {
    background: rgba(248,113,113,0.15);
    color: #f87171;
  }

  .btn-primary:hover:not(:disabled),
  .btn-edit:hover:not(:disabled),
  .btn-delete:hover:not(:disabled) {
    opacity: 0.8;
  }

  button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
</style>
