import { createApp, h } from 'vue';
import { createInertiaApp, Link, Head } from '@inertiajs/vue3';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import PwaShell from '@/Components/PwaShell.vue';
import './pwa';

createInertiaApp({
  title: (title) => (title ? `${title} | Okuhle Homes` : 'Okuhle Homes'),
  resolve: (name) =>
    resolvePageComponent(`./Pages/${name}.vue`, import.meta.glob('./Pages/**/*.vue')),
  setup({ el, App, props, plugin }) {
    createApp({
      render: () => [h(App, props), h(PwaShell)],
    })
      .use(plugin)
      .component('Link', Link)
      .component('Head', Head)
      .mount(el);
  },
  progress: { color: '#e85d04' },
});
