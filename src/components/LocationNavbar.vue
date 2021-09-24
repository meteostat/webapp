<template>
  <nav class="navbar navbar-expand-sm navbar-light bg-light py-1">
    <div class="container">
      <!-- Location Name -->
      <div class="navbar-brand d-flex align-items-center overflow-hidden">
        <img
          :src="`https://media.meteostat.net/assets/flags/4x3/${country.toLowerCase()}.svg`"
          class="country-flag me-2"
        >
        <h1 class="d-inline-block text-truncate h5 mb-0">
          {{ name }}
        </h1>
      </div>
      <button
        class="navbar-toggler ms-2 px-1 border-0"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#subnav"
        aria-controls="subnav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon" />
      </button>
      <!-- Menu -->
      <div
        id="subnav"
        ref="subnav"
        class="collapse navbar-collapse justify-content-end ms-1 mt-2 mt-sm-0"
      >
        <ul class="navbar-nav">
          <router-link
            class="nav-item"
            :to="`/${type}/${id}`"
          >
            <span
              class="nav-link"
            >
              {{ t('history') }}
            </span>
          </router-link>
          <router-link
            class="nav-item"
            :to="`/${type}/${id}/climate`"
          >
            <span
              class="nav-link"
            >
              {{ t('climate') }}
            </span>
          </router-link>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'Subnav',

  props: {
    type: {
      type: String,
      required: true
    },
    id: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    country: {
      type: String,
      required: true
    }
  },

  setup(): Record<string, any> {
    const { t } = useI18n()

    return { t }
  }
})
</script>

<style lang="scss" scoped>
@import "~/style/variables";
@import "../node_modules/bootstrap/scss/functions";
@import "../node_modules/bootstrap/scss/variables";
@import "../node_modules/bootstrap/scss/mixins";

.navbar {
  .navbar-brand {
    @include media-breakpoint-down(md) {
      flex: 1;
    }

    .country-flag {
      width: 24px;
    }

    h1 {
      @include media-breakpoint-only(lg) {
        max-width: 220px;
      }
    }
  }

  .nav-item.router-link-active {
    @include media-breakpoint-only(xs) {
      margin-left: -1rem;
      padding-left: 1rem;
      border-left: 2px solid $primary;
    }

    @include media-breakpoint-up(sm) {
      margin-bottom: -.25rem;
      border-bottom: 2px solid $primary;
    }
  }

  .navbar-toggler-icon {
    background-image: url('data:image/svg+xml,%3Csvg id="i-ellipsis-horizontal" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="rgba(0, 0, 0, 0.55)" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"%3E%3Ccircle cx="7" cy="16" r="2" /%3E%3Ccircle cx="16" cy="16" r="2" /%3E%3Ccircle cx="25" cy="16" r="2" /%3E%3C/svg%3E');
  }
}
</style>