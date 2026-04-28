<script>
  import { onMount } from 'svelte';
  import AdminLogin from './AdminLogin.svelte';
  import AdminProjectList from './AdminProjectList.svelte';
  import AdminProjectEditor from './AdminProjectEditor.svelte';
  import AdminSettings from './AdminSettings.svelte';
  import { getToken, adminLogout, fetchAdminProjects } from '../lib/adminApi.js';

  // view: 'login' | 'list' | 'edit' | 'create' | 'settings'
  let view = 'login';
  let projects = [];
  let selectedProject = null;
  let loadingProjects = false;
  let loadError = '';

  async function loadProjects() {
    loadingProjects = true;
    loadError = '';
    try {
      projects = await fetchAdminProjects();
    } catch (err) {
      if (err.message === 'Unauthorized') {
        view = 'login';
      } else {
        loadError = err.message;
      }
    } finally {
      loadingProjects = false;
    }
  }

  function handleLoggedIn() {
    view = 'list';
    loadProjects();
  }

  function handleLogout() {
    adminLogout();
    projects = [];
    view = 'login';
  }

  function handleEdit(event) {
    selectedProject = event.detail.project;
    view = 'edit';
  }

  function handleCreate() {
    selectedProject = null;
    view = 'create';
  }

  function handleDeleted(event) {
    projects = projects.filter((p) => p.id !== event.detail.id);
  }

  function handleSaved(event) {
    const { project, created } = event.detail;
    if (created) {
      projects = [...projects, project];
    } else {
      projects = projects.map((p) => (p.id === project.id ? project : p));
    }
    view = 'list';
    selectedProject = null;
  }

  function handleCancel() {
    view = 'list';
    selectedProject = null;
  }

  onMount(() => {
    if (getToken()) {
      view = 'list';
      loadProjects();
    } else {
      view = 'login';
    }
  });
</script>

<div class="admin-app">
  {#if view !== 'login'}
    <header class="admin-header">
      <span class="brand">Humlab Admin</span>
      <nav class="admin-nav">
        <button
          class="nav-btn"
          class:active={view === 'list' || view === 'edit' || view === 'create'}
          on:click={() => { view = 'list'; selectedProject = null; }}
        >Projects</button>
        <button
          class="nav-btn"
          class:active={view === 'settings'}
          on:click={() => { view = 'settings'; }}
        >Settings</button>
      </nav>
      <button class="btn-logout" on:click={handleLogout}>Log out</button>
    </header>
  {/if}

  <div class="admin-body">
    {#if view === 'login'}
      <AdminLogin on:loggedin={handleLoggedIn} />
    {:else if view === 'list'}
      <AdminProjectList
        {projects}
        loading={loadingProjects}
        error={loadError}
        on:edit={handleEdit}
        on:create={handleCreate}
        on:deleted={handleDeleted}
      />
    {:else if view === 'edit'}
      <AdminProjectEditor
        project={selectedProject}
        on:saved={handleSaved}
        on:cancel={handleCancel}
      />
    {:else if view === 'create'}
      <AdminProjectEditor
        project={null}
        on:saved={handleSaved}
        on:cancel={handleCancel}
      />
    {:else if view === 'settings'}
      <AdminSettings />
    {/if}
  </div>
</div>

<style>
  :global(body) {
    margin: 0;
    background: #0f1923;
    font-family: 'Sora', 'Avenir Next', 'Segoe UI', sans-serif;
    color: #f0f5f7;

    /* Admin CSS variables */
    --admin-bg: #0f1923;
    --admin-card-bg: #1a2733;
    --admin-section-bg: rgba(255,255,255,0.025);
    --admin-input-bg: rgba(255,255,255,0.05);
    --admin-border: rgba(255,255,255,0.12);
    --admin-border-soft: rgba(255,255,255,0.07);
    --admin-text: #f0f5f7;
    --admin-muted: rgba(240,245,247,0.55);
    --admin-label: rgba(240,245,247,0.65);
    --admin-accent: #2ea8a5;
  }

  .admin-app {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    background: var(--admin-bg, #0f1923);
  }

  .admin-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.75rem 2rem;
    border-bottom: 1px solid var(--admin-border, rgba(255,255,255,0.1));
    background: rgba(15, 25, 35, 0.95);
    position: sticky;
    top: 0;
    z-index: 10;
  }

  .brand {
    font-weight: 700;
    font-size: 1rem;
    letter-spacing: 0.03em;
    color: var(--admin-text, #f0f5f7);
  }

  .admin-nav {
    display: flex;
    gap: 0.25rem;
  }

  .nav-btn {
    background: transparent;
    border: none;
    color: var(--admin-muted, rgba(240,245,247,0.6));
    font-size: 0.88rem;
    font-weight: 600;
    padding: 0.35rem 0.85rem;
    border-radius: 6px;
    cursor: pointer;
    transition: color 0.15s, background 0.15s;
  }

  .nav-btn:hover {
    color: var(--admin-text, #f0f5f7);
    background: rgba(255,255,255,0.06);
  }

  .nav-btn.active {
    color: var(--admin-accent, #2ea8a5);
    background: rgba(46,168,165,0.1);
  }

  .btn-logout {
    background: transparent;
    border: 1px solid var(--admin-border, rgba(255,255,255,0.15));
    color: var(--admin-muted, rgba(240,245,247,0.6));
    border-radius: 6px;
    padding: 0.35rem 0.8rem;
    font-size: 0.82rem;
    cursor: pointer;
    transition: color 0.15s, border-color 0.15s;
  }

  .btn-logout:hover {
    color: var(--admin-text, #f0f5f7);
    border-color: rgba(255,255,255,0.3);
  }

  .admin-body {
    flex: 1;
    overflow-y: auto;
  }
</style>
