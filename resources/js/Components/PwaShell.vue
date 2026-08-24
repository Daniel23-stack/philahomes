<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';

const visible = ref(false);
const iosHint = ref(false);
const offline = ref(!navigator.onLine);

let deferredPrompt = null;

function isIos() {
  return /iphone|ipad|ipod/i.test(navigator.userAgent);
}

function isStandalone() {
  return window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
}

function dismiss() {
  visible.value = false;
  iosHint.value = false;
  sessionStorage.setItem('pwa-install-dismissed', '1');
}

async function install() {
  if (!deferredPrompt) return;

  deferredPrompt.prompt();
  await deferredPrompt.userChoice;
  deferredPrompt = null;
  visible.value = false;
}

function onBeforeInstallPrompt(event) {
  event.preventDefault();
  deferredPrompt = event;

  if (sessionStorage.getItem('pwa-install-dismissed')) return;
  if (window.matchMedia('(display-mode: standalone)').matches) return;

  visible.value = true;
}

function onOnline() {
  offline.value = false;
}

function onOffline() {
  offline.value = true;
}

onMounted(() => {
  window.addEventListener('beforeinstallprompt', onBeforeInstallPrompt);
  window.addEventListener('online', onOnline);
  window.addEventListener('offline', onOffline);

  if (!sessionStorage.getItem('pwa-install-dismissed') && isIos() && !isStandalone()) {
    iosHint.value = true;
  }
});

onBeforeUnmount(() => {
  window.removeEventListener('beforeinstallprompt', onBeforeInstallPrompt);
  window.removeEventListener('online', onOnline);
  window.removeEventListener('offline', onOffline);
});
</script>

<template>
  <div class="pwa-ui" aria-live="polite">
    <div v-if="offline" class="pwa-offline">
      <i class="fas fa-wifi" aria-hidden="true" />
      You are offline. Some features may be unavailable.
    </div>

    <div v-if="visible" class="pwa-install">
      <div class="pwa-install__content">
        <p class="pwa-install__title">Install Okuhle Homes</p>
        <p class="pwa-install__text">Add to your home screen for quick access on mobile.</p>
      </div>
      <div class="pwa-install__actions">
        <button type="button" class="pwa-install__btn pwa-install__btn--primary" @click="install">
          Install
        </button>
        <button type="button" class="pwa-install__btn" @click="dismiss">Not now</button>
      </div>
    </div>

    <div v-else-if="iosHint" class="pwa-install">
      <div class="pwa-install__content">
        <p class="pwa-install__title">Install on iPhone</p>
        <p class="pwa-install__text">Tap Share, then “Add to Home Screen” to install this app.</p>
      </div>
      <div class="pwa-install__actions">
        <button type="button" class="pwa-install__btn" @click="dismiss">Got it</button>
      </div>
    </div>
  </div>
</template>
