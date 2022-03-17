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
      <span class="text-muted">{{ t('$description') }}</span>
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
    "$description": "We could not find this page."
  },
  "de": {
    "$meta": {
      "title": "Seite Nicht Gefunden",
      "description": "Leider konnten wir diese Seite nicht finden."
    },
    "error": "Fehler",
    "$description": "Wir konnten diese Seite nicht finden."
  },
  "it": {
    "$meta": {
      "title": "Pagina Non Trovata",
      "description": "Spiacente. Non abbiamo trovato questa pagina."
    },
    "error": "Errore",
    "$description": "Non siamo riusciti a trovare questa pagina."
  },
  "es": {
    "$meta": {
      "title": "Página No Encontrada",
      "description": "Lo sentimos. No hemos podido encontrar esta página."
    },
    "error": "Error",
    "$description": "No hemos podido encontrar esta página."
  },
  "nl": {
    "$meta": {
      "title": "Pagina Niet Gevonden",
      "description": "Sorry. We konden deze pagina niet vinden."
    },
    "error": "Error",
    "$description": "We konden deze pagina niet vinden."
  },
  "fr": {
    "$meta" : {
      "title" : "Page Non Trouvée",
      "description" : "Désolé. Nous n'avons pas pu trouver cette page."
    },
    "error" : "Error",
    "$description" : "Nous n'avons pas pu trouver cette page."
  },
  "pt": {
    "$meta": {
      "title": "Página Não Encontrada",
      "description": "Desculpe. Não conseguimos encontrar esta página."
    },
    "error": "Erro",
    "$description": "Não conseguimos encontrar esta página."
  },
  "ru": {
    "$meta": {
      "title": "Страница не найдена",
      "description": "Извините. Мы не смогли найти эту страницу."
    },
    "error": "Error",
    "$description": "Мы не смогли найти эту страницу."    
  },
  "zh": {
    "$meta": {
      "title": "页面不存在",
      "description": "抱歉，我们找不到这个页面。"
    },
    "error": "错误",
    "$description": "找不到此页面。"
  }
}
</i18n>
