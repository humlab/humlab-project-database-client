<script>
  import { createEventDispatcher } from 'svelte';
  import { adminLogin } from '../lib/adminApi.js';

  const dispatch = createEventDispatcher();

  let username = '';
  let password = '';
  let error = '';
  let loading = false;

  async function handleSubmit(event) {
    event.preventDefault();
    error = '';
    loading = true;
    try {
      await adminLogin(username, password);
      dispatch('loggedin');
    } catch (err) {
      error = err.message === 'Unauthorized' ? 'Invalid username or password.' : err.message;
    } finally {
      loading = false;
    }
  }
</script>

<div class="login-wrapper">
  <div class="login-card">
    <h1>Admin Login</h1>
    <p class="subtitle">Humlab Project Database</p>
    <form on:submit={handleSubmit}>
      <label>
        Username
        <input
          type="text"
          bind:value={username}
          autocomplete="username"
          required
          disabled={loading}
        />
      </label>
      <label>
        Password
        <input
          type="password"
          bind:value={password}
          autocomplete="current-password"
          required
          disabled={loading}
        />
      </label>
      {#if error}
        <p class="error">{error}</p>
      {/if}
      <button type="submit" disabled={loading}>
        {loading ? 'Signing in…' : 'Sign in'}
      </button>
    </form>
  </div>
</div>

<style>
  .login-wrapper {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--admin-bg, #0f1923);
  }

  .login-card {
    background: var(--admin-card-bg, #1a2733);
    border: 1px solid var(--admin-border, rgba(255,255,255,0.1));
    border-radius: 12px;
    padding: 2.5rem 2rem;
    width: 100%;
    max-width: 380px;
    box-shadow: 0 24px 60px rgba(0,0,0,0.4);
  }

  h1 {
    margin: 0 0 0.25rem;
    font-size: 1.6rem;
    font-weight: 700;
    color: var(--admin-text, #f0f5f7);
  }

  .subtitle {
    margin: 0 0 2rem;
    font-size: 0.85rem;
    color: var(--admin-muted, rgba(240,245,247,0.5));
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  label {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    font-size: 0.85rem;
    font-weight: 600;
    color: var(--admin-label, rgba(240,245,247,0.75));
  }

  input {
    padding: 0.6rem 0.75rem;
    border-radius: 6px;
    border: 1px solid var(--admin-border, rgba(255,255,255,0.15));
    background: var(--admin-input-bg, rgba(255,255,255,0.05));
    color: var(--admin-text, #f0f5f7);
    font-size: 0.95rem;
    outline: none;
    transition: border-color 0.15s;
  }

  input:focus {
    border-color: var(--admin-accent, #2ea8a5);
  }

  input:disabled {
    opacity: 0.5;
  }

  .error {
    margin: 0;
    font-size: 0.85rem;
    color: #f87171;
  }

  button {
    margin-top: 0.5rem;
    padding: 0.7rem 1rem;
    border-radius: 6px;
    border: none;
    background: var(--admin-accent, #2ea8a5);
    color: #fff;
    font-size: 0.95rem;
    font-weight: 600;
    cursor: pointer;
    transition: opacity 0.15s;
  }

  button:hover:not(:disabled) {
    opacity: 0.85;
  }

  button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
</style>
