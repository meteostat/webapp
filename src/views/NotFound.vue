<template>
  <div class="container px-4 py-5 text-center">
    <img
      src="https://media.meteostat.net/assets/illustration-404.svg"
      class="img-fluid"
      alt="404"
      width="400"
      loading="lazy"
    />
    <p class="lead mt-5">
      <strong>{{ t('error') }} 404</strong>.
      <span class="text-muted">{{ t('$description') }}</span>
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useI18n } from 'vue-i18n';
import { useHead } from '@unhead/vue';

export default defineComponent({
  name: 'NotFound',

  setup(): Record<string, any> {
    const { t } = useI18n();

    useHead({
      title: `${t('$meta.title')} | Meteostat`,
      meta: [
        {
          name: 'description',
          content: t('$meta.description')
        },
        {
          // SPA cannot send a 404 status, so keep error pages out of the index
          name: 'robots',
          content: 'noindex'
        }
      ]
    });

    return { t };
  }
});
</script>

<i18n>
{
  "en": {
    "$meta": {
      "title": "Page Not Found",
      "description": "Sorry, we could not find this page."
    },
    "error": "Error",
    "$description": "We could not find this page."
  },
  "de": {
    "$meta": {
      "title": "Seite nicht gefunden",
      "description": "Leider konnten wir diese Seite nicht finden."
    },
    "error": "Fehler",
    "$description": "Wir konnten diese Seite nicht finden."
  },
  "it": {
    "$meta": {
      "title": "Pagina non trovata",
      "description": "Spiacenti, non abbiamo trovato questa pagina."
    },
    "error": "Errore",
    "$description": "Non siamo riusciti a trovare questa pagina."
  },
  "es": {
    "$meta": {
      "title": "Página no encontrada",
      "description": "Lo sentimos, no hemos podido encontrar esta página."
    },
    "error": "Error",
    "$description": "No hemos podido encontrar esta página."
  },
  "nl": {
    "$meta": {
      "title": "Pagina niet gevonden",
      "description": "Sorry, we konden deze pagina niet vinden."
    },
    "error": "Fout",
    "$description": "We konden deze pagina niet vinden."
  },
  "fr": {
    "$meta": {
      "title": "Page introuvable",
      "description": "Désolé, nous n'avons pas trouvé cette page."
    },
    "error": "Erreur",
    "$description": "Nous n'avons pas trouvé cette page."
  },
  "pt": {
    "$meta": {
      "title": "Página não encontrada",
      "description": "Lamentamos, mas não encontrámos esta página."
    },
    "error": "Erro",
    "$description": "Não encontrámos esta página."
  },
  "ru": {
    "$meta": {
      "title": "Страница не найдена",
      "description": "Извините, мы не смогли найти эту страницу."
    },
    "error": "Ошибка",
    "$description": "Мы не смогли найти эту страницу."
  }
}
</i18n>
