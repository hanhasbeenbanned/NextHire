// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';

// // https://vitejs.dev/config/
// export default defineConfig({
//   envDir: './env',
//   plugins: [react()],
// });

import { defineConfig } from 'vite';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  define: {
    'process.env': process.env,
  },
  server: {
    host: '0.0.0.0', 
    port: 5173,     
  },
  preview: {
    host: '0.0.0.0',
    port: 4173,
    allowedHosts: ['nexthire-jk2b.onrender.com'],
  },
});
