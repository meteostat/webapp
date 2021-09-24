<template>
  <div class="container py-4">
    <div class="p-5 mb-4 text-white bg-header rounded-3">
      <div class="container-fluid">
        <h1 class="display-5 fw-bold">
          {{ t('$title') }}
        </h1>
        <p class="col-md-8 fs-4">
          {{ t('$description') }}
        </p>
      </div>
    </div>

    <div class="row row-cols-1 row-cols-md-3 g-4">
      <div
        v-for="(insight, key) in insights"
        :key="key"
        class="col cursor-pointer"
        @click="open(insight)"
      >
        <div
          class="card h-100"
        >
          <img
            :src="insight.cover"
            class="card-img rounded-3 insight-img"
            :alt="insight.title"
            loading="lazy"
          >
          <div class="card-img-overlay d-flex flex-column justify-content-end">
            <p class="card-text mb-auto text-end">
              <span
                v-if="insight.lang !== $locale"
                class="badge border border-white text-white fw-bold text-uppercase me-2"
              >{{ insight.lang }}</span>
              <span class="badge bg-primary border border-primary fw-bold text-uppercase">{{ insight.topic }}</span>
            </p>
            <h5 class="card-title fw-bold text-white">
              {{ insight.title }}
            </h5>
            <p class="card-text fw-light text-white">
              {{ insight.teaser }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useHead } from '@vueuse/head'

export default defineComponent({
  name: 'Insights',

  props: {
    insights: {
      type: Array,
      default: null
    }
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
  },

  methods: {
    open(insight: any) {
      // Get year & month
      const year = insight.date.substr(0, 4)
      const month = insight.date.substr(5, 2)
      // Navigate
      if (insight.lang === this.$locale) {
        this.$router.push({
          path: `/insights/${year}/${month}/${insight.slug}`
        })
      } else {
        window.location.href = `${window.origin}/${insight.lang}/insights/${year}/${month}/${insight.slug}`
      }
    }
  }
})
</script>

<style lang="scss" scoped>
.bg-header {
  background: linear-gradient(to right, #0678be, #2eabf8);
}

.cursor-pointer {
  cursor: pointer;
}

.insight-img {
  max-height: 300px;
  object-fit: cover;
}

.card-img-overlay {
  background: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3));
}
</style>

<i18n>
{
  "en": {
    "$meta": {
      "title": "Insights",
      "description": "Gain insights into the stories behind our data and learn more about weather, climate and Meteostat."
    },
    "$title": "Meteostat Insights",
    "$description": "Gain insights into the stories behind our data and learn more about weather, climate and Meteostat."
  },
}
</i18n>