<template>
  <div role="alert">
    <p>
      {{ t('$description') }}
    </p>
    <button class="btn btn-primary" @click="$emit('enable')">{{ t('enable') }}</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useI18n } from 'vue-i18n';

export default defineComponent({
  name: 'DisabledContent',

  emits: ['enable'],

  setup(): Record<string, any> {
    const { t } = useI18n();

    return { t };
  }
});
</script>

<i18n>
{
  "en": {
    "$description": "This content is disabled by default to improve Meteostat's performance. Please click the following button if you want to enable it.",
    "enable": "Enable"
  },
  "de": {
    "$description": "Dieser Inhalt ist standardmäßig deaktiviert, um die Nutzungserfahrung von Meteostat zu verbessern. Bitte klicken Sie auf den folgenden Button, um ihn anzuzeigen.",
    "enable": "Anzeigen"
  },
  "it": {
    "$description": "Questo contenuto è disabilitato di default per migliorare le prestazioni di Meteostat. Per favore, clicca il seguente pulsante se vuoi abilitarlo.",
    "enable": "Abilita"
  },
  "es": {
    "$description": "Este contenido está desactivado por defecto para mejorar el rendimiento de Meteostat. Por favor, haga clic en el siguiente botón si desea habilitarlo.",
    "enable": "Activar"
  },
  "nl": {
    "$description": "Deze inhoud is standaard uitgeschakeld om de prestaties van Meteostat te verbeteren. Klik op de volgende knop als u deze wilt inschakelen.",
    "enable": "Activeer"
  },
  "fr": {
    "$description" : "Ce contenu est désactivé par défaut pour améliorer les performances de Meteostat. Veuillez cliquer sur le bouton suivant si vous souhaitez l'activer.",
    "enable": "Activer"
  },
  "pt": {
    "$description": "Este conteúdo é desactivado por defeito para melhorar o desempenho do Meteostat. Por favor, clique no botão seguinte se o quiser activar.",
    "enable": "Activar"
  },
  "ru": {
    "$description": "Это содержимое отключено по умолчанию для улучшения работы Meteostat. Пожалуйста, нажмите следующую кнопку, если вы хотите включить его.",
    "enable": "Включить"
  }
}
</i18n>
