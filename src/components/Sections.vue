<template>
  <div class="dropdown">
    <button
      class="btn btn-light"
      type="button"
      data-bs-toggle="dropdown"
      aria-expanded="false"
    >
      <icon :icon="['fas', 'list-ul']" />
      <span class="ms-2">{{ t('sections') }}</span>
    </button>
    <ul class="dropdown-menu">
      <li
        v-for="item in sections"
        :key="item.id"
        :class="{ 'pt-1 mt-1 border-top': item.id === 'details' }"
      >
        <a
          class="dropdown-item"
          @click="scrollTo(item.id)"
        >{{ item.title }}</a>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'Sections',

  setup(): Record<string, any> {
    const { t } = useI18n()

    return { t }
  },

  data(): Record<string, Array<Record<string, string>>> {
    return {
      sections: []
    }
  },

  methods: {
    scrollTo(id: string): void {
      const el = document.getElementById(id)
      if (el) {
        const top = (el.getBoundingClientRect().top + window.pageYOffset) - 80
        window.scrollTo({
          top: top,
          behavior: 'smooth'
        })
      }
    },
    
    update(): void {
      // Clear sections list
      this.sections = []
      // Populate sections list
      const sections = document.getElementsByTagName('section')
      Array.from(sections).forEach(section => {
        if (section.offsetParent !== null) {
          const heading = section.querySelector('h2')
          this.sections.push({
            id: section.id,
            title: heading?.innerText
          })
        }
      })
      // Handle anchor
      const hash = window.location.hash.substr(1)
      if (hash.length === 4 || hash.length === 7) {
        this.scrollTo(hash)
      }
    }
  }
})
</script>

<i18n>
{
  "en": {
    "sections": "Sections"
  },
  "de": {
    "sections": "Menü"
  },
  "it": {
    "sections": "Sezioni"
  },
  "es": {
    "sections": "Secciones"
  },
  "nl": {
    "sections": "Secties"
  },
  "fr": {
    "sections": "Sections"
  },
  "pt": {
    "sections": "Secções"
  },
  "ru": {
    "sections": "Разделы" 
  }
}
</i18n>