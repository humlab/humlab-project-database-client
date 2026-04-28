import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';

export default defineConfig({
  plugins: [svelte()],
  build: {
    // Use '_app' so Vite's built JS/CSS don't collide with the project image
    // assets volume-mounted at /usr/share/nginx/html/assets in the prod container.
    assetsDir: '_app',
  },
  server: {
    historyApiFallback: true,
    allowedHosts: 'showcase.betty.humlab.umu.se',
  }
});
