<template>
  <div class="d-flex flex-column h-100">
    <!-- Navbar -->
    <Navbar />

    <!-- Router View -->
    <main class="flex-shrink-0">
      <router-view :key="$route.path" />
    </main>

    <!-- Footer -->
    <Footer />

    <!-- Loading Animation -->
    <div class="loading-overlay d-none align-items-center justify-content-center">
      <svg
        width="120"
        height="30"
        viewBox="0 0 120 30"
        xmlns="http://www.w3.org/2000/svg"
        fill="#0678BE"
      >
        <circle
          cx="15"
          cy="15"
          r="15"
        >
          <animate
            attributeName="r"
            from="15"
            to="15"
            begin="0s"
            dur="0.8s"
            values="15;9;15"
            calcMode="linear"
            repeatCount="indefinite"
          />
          <animate
            attributeName="fill-opacity"
            from="1"
            to="1"
            begin="0s"
            dur="0.8s"
            values="1;.5;1"
            calcMode="linear"
            repeatCount="indefinite"
          />
        </circle>
        <circle
          cx="60"
          cy="15"
          r="9"
          fill-opacity="0.3"
        >
          <animate
            attributeName="r"
            from="9"
            to="9"
            begin="0s"
            dur="0.8s"
            values="9;15;9"
            calcMode="linear"
            repeatCount="indefinite"
          />
          <animate
            attributeName="fill-opacity"
            from="0.5"
            to="0.5"
            begin="0s"
            dur="0.8s"
            values=".5;1;.5"
            calcMode="linear"
            repeatCount="indefinite"
          />
        </circle>
        <circle
          cx="105"
          cy="15"
          r="15"
        >
          <animate
            attributeName="r"
            from="15"
            to="15"
            begin="0s"
            dur="0.8s"
            values="15;9;15"
            calcMode="linear"
            repeatCount="indefinite"
          />
          <animate
            attributeName="fill-opacity"
            from="1"
            to="1"
            begin="0s"
            dur="0.8s"
            values="1;.5;1"
            calcMode="linear"
            repeatCount="indefinite"
          />
        </circle>
      </svg>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useHead } from '@vueuse/head'
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'

export default defineComponent({
  name: 'App',

  components: {
    Navbar,
    Footer
  },

  setup(): Record<string, any> {
    const { t } = useI18n()

    useHead({
      title: `${t('$meta.title')} | Meteostat`,
      meta: [
        {
          name: 'description',
          content: t('$meta.description') 
        }
      ],
    })

    return { t }
  }
})
</script>

<style lang="scss" scoped>
body {
  &.loading {
    .loading-overlay {
      display: flex !important;
      width: 100vw;
      height: 100vh;
      position: fixed;
      left: 0;
      top: 0;
      z-index: 99999;
    }
  }
}
</style>

<i18n>
{
  "en": {
    "$meta": {
      "title": "The Weather's Record Keeper",
      "description": "Weather and climate database providing detailed weather data for thousands of weather stations and places worldwide."
    }
  }
}
</i18n>