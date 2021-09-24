<template>
  <div class="container px-4 py-5 text-center">
    <img
      src="https://media.meteostat.net/assets/illustration-404.svg"
      class="img-fluid"
      alt="404"
      width="400"
      loading="lazy"
    >
    <p class="lead mt-5">
      <strong>{{ t('error') }} 404</strong>.
      <span class="text-muted">{{ t('description') }}</span>
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useContext } from 'vitedge'
import { useI18n } from 'vue-i18n'
import { useHead } from '@vueuse/head'

export default defineComponent({
  name: 'NotFound',

  setup(): Record<string, any> {
    if (import.meta.env.SSR) {
      const { writeResponse } = useContext()
      writeResponse({ status: 404 })
    }
    
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

<i18n>
{
  "en": {
    "$meta": {
      "title": "Page Not Found",
      "description": "Sorry. We could not find this page."
    },
    "error": "Error",
    "description": "We could not find this page."
  },
}
</i18n>