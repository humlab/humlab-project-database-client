import App from './App.svelte';
import AdminApp from './admin/AdminApp.svelte';
import './app.css';

const isAdmin = typeof window !== 'undefined' && window.location.pathname.startsWith('/admin');

const app = isAdmin
  ? new AdminApp({ target: document.getElementById('app') })
  : new App({ target: document.getElementById('app') });

export default app;
