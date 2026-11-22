<template>
  <div class="d-flex flex-column h-100">
    <!-- Loading Animation -->
    <div class="loading-overlay d-none">
      <div class="spinner-border text-primary" role="status" />
    </div>

    <!-- Navbar -->
    <Navbar />

    <!-- Router View -->
    <main class="flex-shrink-0">
      <router-view :key="$route.path" />
    </main>

    <!-- Footer -->
    <Footer />
  </div>

  <!-- Cookie Modal -->
    <CookieModal v-if="!settings.returning" />
</template>

<script lang="ts">
import { defineComponent, defineAsyncComponent } from 'vue';
import { useI18n } from 'vue-i18n';
import { useHead } from '@unhead/vue';
import { useSettingsStore } from '~/stores/settings';
import { appTitle, appDescription } from '~/seo/meta';
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';

/**
 * Async Components
 */
const CookieModal = defineAsyncComponent(() => import('~/components/CookieModal.vue'));

export default defineComponent({
  name: 'App',

  components: {
    Navbar,
    Footer,
    CookieModal
  },

  setup(): Record<string, any> {
    const { t, locale } = useI18n();
    const settings = useSettingsStore();

    // Persist settings app-wide. Components that change settings may be unmounted
    // in the same tick (e.g. the cookie modal), so their own watchers can't be relied on.
    settings.$subscribe((_mutation, state) => {
      window.localStorage.setItem('settings', JSON.stringify(state));
    });

    useHead({
      title: appTitle(locale.value),
      meta: [
        {
          name: 'description',
          content: appDescription(locale.value)
        }
      ],
      htmlAttrs: {
        lang: locale
      }
    });

    return { t, settings };
  },

  mounted() {
    this.$nextTick(() => {
      document.body.removeAttribute('style');
      this.$loaded();
    });
  }
});
</script>
