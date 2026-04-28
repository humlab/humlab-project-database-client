import { getApiBaseUrl } from './api.js';

const TOKEN_KEY = 'humlab-admin-token';

export function getToken() {
  return typeof window !== 'undefined' ? window.localStorage.getItem(TOKEN_KEY) : null;
}

export function setToken(token) {
  window.localStorage.setItem(TOKEN_KEY, token);
}

export function clearToken() {
  window.localStorage.removeItem(TOKEN_KEY);
}

async function adminRequest(path, options = {}) {
  const token = getToken();
  const response = await fetch(`${getApiBaseUrl()}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers
    }
  });

  if (response.status === 401) {
    clearToken();
    throw new Error('Unauthorized');
  }

  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    throw new Error(body.message || `Request failed: ${response.status}`);
  }

  return response.json();
}

export async function adminLogin(username, password) {
  const data = await adminRequest('/admin/login', {
    method: 'POST',
    body: JSON.stringify({ username, password })
  });
  setToken(data.token);
  return data;
}

export function adminLogout() {
  clearToken();
}

export async function fetchAdminProjects() {
  return adminRequest('/admin/projects');
}

export async function fetchAdminProject(id) {
  return adminRequest(`/admin/project/${encodeURIComponent(id)}`);
}

export async function createAdminProject(project) {
  return adminRequest('/admin/projects', {
    method: 'POST',
    body: JSON.stringify(project)
  });
}

export async function updateAdminProject(id, project) {
  return adminRequest(`/admin/project/${encodeURIComponent(id)}`, {
    method: 'PUT',
    body: JSON.stringify(project)
  });
}

export async function deleteAdminProject(id) {
  return adminRequest(`/admin/project/${encodeURIComponent(id)}`, {
    method: 'DELETE'
  });
}

export async function fetchSettings() {
  const response = await fetch(`${getApiBaseUrl()}/settings`);
  if (!response.ok) throw new Error(`Failed to fetch settings: ${response.status}`);
  return response.json();
}

export async function updateAdminSettings(settings) {
  return adminRequest('/admin/settings', {
    method: 'PUT',
    body: JSON.stringify(settings)
  });
}
