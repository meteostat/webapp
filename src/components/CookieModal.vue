<template>
  <div id="cookieModal" class="modal" tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false">
    <Modal :title="t('$title')">
      <template v-slot:body>
        {{ t('$description') }}
      </template>
      <template v-slot:footer>
        <a :href="t('$privacyLink')">
          {{ t('privacyPolicy') }}
        </a>
        <button type="button" class="btn btn-light ms-auto" data-bs-dismiss="modal" @click="dismiss">
          {{ t('reject') }}
        </button>
        <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="accept">
          {{ t('accept') }}
        </button>
      </template>
    </Modal>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useI18n } from 'vue-i18n';
import { useSettingsStore } from '../stores/settings';
import Modal from './Modal.vue';

export default defineComponent({
  name: 'CookieModal',

  components: {
    Modal
  },

  setup() {
    const { t } = useI18n();
    const settings = useSettingsStore();

    return { t, settings };
  },

  mounted() {
    this.$bs.Modal.default.getOrCreateInstance(document.getElementById('cookieModal')).show();
  },

  methods: {
    dismiss() {
      this.settings.returning = true;
    },
    accept() {
      this.settings.personalizedAds = true;
      this.dismiss();
    }
  }
});
</script>

<i18n>
{
  "en": {
    "$title": "Privacy Notice",
    "$privacyLink": "/en/privacy",
    "privacyPolicy": "Privacy Policy",
    "$description": "To provide the best possible experience on this website, Meteostat would like to use cookies to store and access personal data on your device, such as browsing patterns and unique identifiers. You can always decline, but personalized content and advertising will not be available.",
    "reject": "Reject",
    "accept": "Accept"
  },
  "de": {
    "$title": "Datenschutzhinweis",
    "$privacyLink": "/de/privacy",
    "privacyPolicy": "Datenschutzerklärung",
    "$description": "Um Ihnen die bestmögliche Nutzererfahrung zu bieten, möchte Meteostat Cookies verwenden, um personenbezogene Daten auf Ihrem Gerät zu speichern und darauf zuzugreifen, z. B. Surfverhalten und eindeutige Kennungen. Sie können jederzeit ablehnen, dann sind jedoch personalisierte Inhalte und Werbung nicht verfügbar.",
    "reject": "Ablehnen",
    "accept": "Akzeptieren"
  },
  "it": {
    "$title": "Informativa sulla privacy",
    "$privacyLink": "/en/privacy",
    "privacyPolicy": "Informativa sulla privacy",
    "$description": "Per offrirti la migliore esperienza possibile su questo sito, Meteostat vorrebbe utilizzare i cookie per memorizzare e accedere a dati personali sul tuo dispositivo, come abitudini di navigazione e identificatori univoci. Puoi sempre rifiutare, ma in tal caso contenuti e pubblicità personalizzati non saranno disponibili.",
    "reject": "Rifiuta",
    "accept": "Accetta"
  },
  "es": {
    "$title": "Aviso de privacidad",
    "$privacyLink": "/en/privacy",
    "privacyPolicy": "Política de privacidad",
    "$description": "Para ofrecerte la mejor experiencia posible en este sitio web, Meteostat quiere utilizar cookies para almacenar y acceder a datos personales en tu dispositivo, como hábitos de navegación e identificadores únicos. Puedes rechazarlas en cualquier momento, pero entonces no habrá contenido ni publicidad personalizados.",
    "reject": "Rechazar",
    "accept": "Aceptar"
  },
  "nl": {
    "$title": "Privacyverklaring",
    "$privacyLink": "/en/privacy",
    "privacyPolicy": "Privacybeleid",
    "$description": "Om je de best mogelijke ervaring op deze website te bieden, wil Meteostat cookies gebruiken om persoonsgegevens op je apparaat op te slaan en te raadplegen, zoals surfgedrag en unieke identificatoren. Je kunt altijd weigeren, maar dan zijn gepersonaliseerde inhoud en advertenties niet beschikbaar.",
    "reject": "Weigeren",
    "accept": "Accepteren"
  },
  "fr": {
    "$title": "Avis de confidentialité",
    "$privacyLink": "/en/privacy",
    "privacyPolicy": "Politique de confidentialité",
    "$description": "Afin de vous offrir la meilleure expérience possible sur ce site, Meteostat souhaite utiliser des cookies pour stocker et consulter des données personnelles sur votre appareil, comme vos habitudes de navigation et des identifiants uniques. Vous pouvez toujours refuser, mais les contenus et publicités personnalisés ne seront alors pas disponibles.",
    "reject": "Refuser",
    "accept": "Accepter"
  },
  "pt": {
    "$title": "Aviso de privacidade",
    "$privacyLink": "/en/privacy",
    "privacyPolicy": "Política de privacidade",
    "$description": "Para lhe proporcionar a melhor experiência possível neste website, o Meteostat gostaria de utilizar cookies para armazenar e aceder a dados pessoais no seu dispositivo, como padrões de navegação e identificadores únicos. Pode sempre recusar, mas nesse caso os conteúdos e a publicidade personalizados não estarão disponíveis.",
    "reject": "Recusar",
    "accept": "Aceitar"
  },
  "ru": {
    "$title": "Уведомление о конфиденциальности",
    "$privacyLink": "/en/privacy",
    "privacyPolicy": "Политика конфиденциальности",
    "$description": "Чтобы сделать работу с сайтом максимально удобной, Meteostat хотел бы использовать файлы cookie для хранения и получения персональных данных на вашем устройстве, например истории просмотров и уникальных идентификаторов. Вы всегда можете отказаться, но тогда персонализированный контент и реклама будут недоступны.",
    "reject": "Отклонить",
    "accept": "Принять"
  }
}
</i18n>
