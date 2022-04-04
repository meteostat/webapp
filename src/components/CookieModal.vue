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
import { defineComponent, watch } from 'vue';
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

    watch(
      () => settings.$state,
      (state) => {
        window.localStorage.setItem('settings', JSON.stringify(state));
      },
      { deep: true }
    );

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
    "$description": "To create the best possible user experience on this website, Meteostat would like to use cookies to store and access personal data on your device. This can include information like browsing patterns and unique identifiers. You can always choose not to consent, but personalization of content and advertising will not be available if you do so.",
    "reject": "Reject",
    "accept": "Accept"
  },
  "de": {
    "$title": "Datenschutz",
    "$privacyLink": "/de/privacy",
    "privacyPolicy": "Datenschutzerklärung",
    "$description": "Um die bestmögliche Nutzererfahrung auf dieser Website zu bieten, würden wir gerne Cookies verwenden, um persönliche Daten auf Ihrem Gerät zu speichern und darauf zuzugreifen. Dies kann Informationen wie Browsing-Muster und eindeutige Identifikatoren beinhalten. Sie können sich jederzeit entscheiden, Ihre Zustimmung zu verweigern, aber die Personalisierung von Inhalten und Werbung wird dann nicht möglich sein.",
    "reject": "Ablehnen",
    "accept": "Akzeptieren"
  },
  "it": {
    "$title": "Avviso Sulla Privacy",
    "$privacyLink": "/en/privacy",
    "privacyPolicy": "Privacy",
    "$description": "Per creare la migliore esperienza utente possibile su questo sito web, Meteostat desidera utilizzare i cookie per memorizzare e accedere ai dati personali sul tuo dispositivo. Questo può includere informazioni come modelli di navigazione e identificatori unici. Puoi sempre scegliere di non acconsentire, ma la personalizzazione dei contenuti e della pubblicità non sarà disponibile se lo fai.",
    "reject": "Rifiuta",
    "accept": "Accetta"
  },
  "es": {
    "$title": "Aviso de Privacidad",
    "$privacyLink": "/en/privacy",
    "privacyPolicy": "Política de Privacidad",
    "$description": "Para crear la mejor experiencia de usuario posible en este sitio web, Meteostat desea utilizar cookies para almacenar y acceder a datos personales en su dispositivo. Esto puede incluir información como patrones de navegación e identificadores únicos. Siempre puede optar por no dar su consentimiento, pero la personalización del contenido y la publicidad no estará disponible si lo hace.",
    "reject": "Rechazar",
    "accept": "Aceptar"
  },
  "nl": {
    "$title": "Privacyverklaring",
    "$privacyLink": "/en/privacy",
    "privacyPolicy": "Privacybeleid",
    "$description": "Om de best mogelijke gebruikerservaring op deze website te creëren, wil Meteostat graag cookies gebruiken om persoonlijke gegevens op uw apparaat op te slaan en te raadplegen. Dit kan informatie bevatten zoals browsingpatronen en unieke identificatoren. U kunt er altijd voor kiezen om geen toestemming te geven, maar personalisatie van inhoud en advertenties zal niet beschikbaar zijn als u dat doet.",
    "reject": "Weigeren",
    "accept": "Accepteren"
  },
  "fr": {
    "$title" : "Avis de Confidentialité",
    "$privacyLink" : "/en/privacy",
    "privacyPolicy" : "Politique de Confidentialité",
    "$description" : "Pour créer la meilleure expérience utilisateur possible sur ce site Web, Meteostat souhaite utiliser des cookies pour stocker et accéder à des données personnelles sur votre appareil. Il peut s'agir d'informations telles que des modèles de navigation et des identifiants uniques. Vous pouvez toujours choisir de ne pas consentir, mais la personnalisation du contenu et de la publicité ne sera pas disponible si vous le faites.",
    "reject" : "Reject",
    "accept" : "Accepter"
  },
  "pt": {
    "$title": "Aviso de Privacidade",
    "$privacyLink": "/en/privacy",
    "privacyPolicy": "Política de Privacidade",
    "$description": "Para criar a melhor experiência de utilizador possível neste website, o Meteostat gostaria de utilizar cookies para armazenar e aceder a dados pessoais no seu dispositivo. Isto pode incluir informações como padrões de navegação e identificadores únicos. Pode sempre optar por não consentir, mas a personalização do conteúdo e publicidade não estará disponível se o fizer.",
    "reject": "Rejeitar",
    "accept": "Aceitar"
  },
  "ru": {
    "$title": "Уведомление о конфиденциальности",
    "$privacyLink": "/en/privacy",
    "privacyPolicy": "Политика конфиденциальности",
    "$description": "Для создания наилучшего пользовательского опыта на этом сайте, Meteostat использует файлы cookie для хранения и доступа к персональным данным на вашем устройстве. Это может включать такую информацию, как шаблоны просмотра и уникальные идентификаторы. Вы всегда можете не давать согласия, но персонализация контента и рекламы будет недоступна, если вы это сделаете.",
    "reject": "отклонить",
    "accept": "Принять"
  }
}
</i18n>
