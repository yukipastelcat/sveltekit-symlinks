import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import useModule from './src/modules/useModule.plugin';

export default defineConfig(() => ({
	plugins: [
		useModule('./src/modules/users', {
			routePrefix: 'users'
		}),
		sveltekit()
	]
}));
