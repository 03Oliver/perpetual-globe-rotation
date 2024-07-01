import { defineConfig } from 'vite';

export default defineConfig({
  // Other Vite configurations...
  server: {
    historyApiFallback: true,
  },
});
