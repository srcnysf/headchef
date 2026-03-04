import { defineConfig } from 'vitest/config';
import { readFileSync } from 'fs';
import type { Plugin } from 'vite';

function rawMdPlugin(): Plugin {
  return {
    name: 'raw-md',
    transform(_code: string, id: string) {
      if (id.endsWith('.md')) {
        const content = readFileSync(id, 'utf-8');
        return { code: `export default ${JSON.stringify(content)};`, map: null };
      }
    },
  };
}

export default defineConfig({
  plugins: [rawMdPlugin()],
  test: {
    globals: true,
    environment: 'node',
  },
});
