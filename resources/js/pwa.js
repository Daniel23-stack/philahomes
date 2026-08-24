import { registerSW } from 'virtual:pwa-register';

registerSW({
  immediate: true,
  onOfflineReady() {
    console.info('[PWA] App ready to work offline.');
  },
  onNeedRefresh() {
    console.info('[PWA] New content available; refresh to update.');
  },
});
