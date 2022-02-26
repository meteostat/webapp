<template>
  <nav id="location-navbar" class="navbar navbar-expand-lg navbar-light bg-light py-0 sticky-top">
    <div class="container-fluid">
      <!-- Location Name -->
      <div class="navbar-brand d-flex align-items-center overflow-hidden" @click="scrollTop()">
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
      >
        <span class="navbar-toggler-icon" />
      </button>
      <!-- Menu -->
      <div
        id="subnav"
        ref="subnav"
        class="collapse navbar-collapse ms-1 mt-2 mt-sm-0"
      >
        <ul class="navbar-nav w-100">
          <li
            v-for="item in items"
            :key="item.id"
            class="nav-item"
            :class="{ 'nav-item-end': ['details', 'maps', 'climate'].includes(item.id) }"
          >
            <a
              class="nav-link"
              :href="`#${item.id}`"
              @click="scrollTo(item.id, $event)"
            >
              {{ item.title }}
            </a>
          </li>
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
  },

  data(): Record<string, any> {
    return {
      items: [],
      scrollspy: null
    }
  },

  methods: {
    scrollTo(id: string, event?: Event): void {
      if (event) {
        event.preventDefault();
        event.stopPropagation();
      }
      const el = document.getElementById(id)
      if (el) {
        const top = (el.getBoundingClientRect().top + window.pageYOffset) - 78
        window.scrollTo({
          top: top,
          behavior: 'smooth'
        })
      }
    },

    updateItems(): void {
      // Clear sections list
      this.items = []
      // Populate sections list
      const sections = document.getElementsByTagName('section')
      Array.from(sections).forEach(section => {
        if (section.offsetParent !== null) {
          const heading = section.querySelector('h2')
          this.items.push({
            id: section.id,
            title: heading?.innerText || section.dataset.sectionTitle
          })
        }
      })
      // Scrollspy
      this.scrollspy?.dispose()
      this.scrollspy = new this.$bs.ScrollSpy.default(document.body, {
        target: '#location-navbar',
        offset: 80
      })
    },

    scrollTop(): void {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }
  }
})
</script>

<style lang="scss" scoped>
@import "~/style/variables";
@import "../node_modules/bootstrap/scss/functions";
@import "../node_modules/bootstrap/scss/variables";
@import "../node_modules/bootstrap/scss/mixins";

@include media-breakpoint-up(lg) {
  .nav-item-end {
    margin-left: auto;
  }

  .nav-item-end ~.nav-item-end {
    margin-left: 0;
  }  
}

.navbar {
  .navbar-brand {
    cursor: pointer;

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

  .nav-link.active {
    @include media-breakpoint-down(md) {
      margin-left: -1rem;
      padding-left: calc(1rem - 2px);
      border-left: 2px solid $primary;
    }

    @include media-breakpoint-up(lg) {
      padding-bottom: calc(0.5rem - 2px);
      border-bottom: 2px solid $primary;
    }
  }

  .navbar-toggler-icon {
    background-image: url('data:image/svg+xml,%3Csvg id="i-ellipsis-horizontal" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="rgba(0, 0, 0, 0.55)" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"%3E%3Ccircle cx="7" cy="16" r="2" /%3E%3Ccircle cx="16" cy="16" r="2" /%3E%3Ccircle cx="25" cy="16" r="2" /%3E%3C/svg%3E');
  }
}
</style>