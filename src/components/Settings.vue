<template>
  <div class="offcanvas-header">
    <h5 class="offcanvas-title">
      {{ t('settings') }}
    </h5>
    <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" :aria-label="t('close')" />
  </div>
  <div class="offcanvas-body">
    <div class="form-check form-switch">
      <input id="imperial" v-model="settings.imperial" class="form-check-input" type="checkbox" />
      <label for="imperial">{{ t('imperialUnits') }}</label>
      <div class="form-text">
        {{ t('imperialUnitsText') }}
      </div>
    </div>
    <div class="form-check form-switch mt-4">
      <input id="model" v-model="settings.model" class="form-check-input" type="checkbox" />
      <label for="model">{{ t('modelData') }}</label>
      <div class="form-text">
        {{ t('modelDataText') }}
      </div>
    </div>
    <div class="form-check form-switch mt-4">
      <input id="timezone" v-model="settings.timezone" class="form-check-input" type="checkbox" />
      <label for="timezone">{{ t('localTimeZone') }}</label>
      <div class="form-text">
        {{ t('localTimeZoneText') }}
      </div>
    </div>
    <div class="form-check form-switch mt-4">
      <input id="personalizedAds" v-model="settings.personalizedAds" class="form-check-input" type="checkbox" />
      <label for="personalizedAds">
        {{ t('personalizedAds') }}
      </label>
      <div class="form-text">
        {{ t('personalizedAdsText') }}
      </div>
    </div>
    <div class="d-grid mt-4">
      <button class="btn btn-light" type="button" @click="resetSettings()">
        <icon :icon="['fas', 'trash']" class="me-1" />
        {{ t('reset') }}
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useSettingsStore } from '../stores/settings';

export default defineComponent({
  name: 'Settings',

  emits: ['change'],

  setup(_, { emit }): Record<string, any> {
    const { t } = useI18n();
    const settings = useSettingsStore();

    watch(
      () => settings.$state,
      () => emit('change'),
      { deep: true }
    );

    return { t, settings };
  },

  methods: {
    resetSettings(): void {
      window.localStorage.removeItem('settings');
      this.$router.go(0);
    }
  }
});
</script>

<i18n>
{
  "en": {
    "imperialUnits": "Imperial Units",
    "imperialUnitsText": "Use imperial units (Fahrenheit, inches) for weather data. Meteostat uses the metric system by default.",
    "modelData": "Model Data",
    "modelDataText": "Fill gaps in time series by replacing missing observations with (less accurate) model data.",
    "localTimeZone": "Local Time Zone",
    "localTimeZoneText": "Show hourly weather data in the local time zone of the respective weather station or place. Otherwise, hourly data is shown in Coordinated Universal Time (UTC).",
    "personalizedAds": "Personalized Ads",
    "personalizedAdsText": "Allow Meteostat to personalize content and show more relevant ads.",
    "reset": "Reset"
  },
  "de": {
    "imperialUnits": "Imperiale Einheiten",
    "imperialUnitsText": "Imperiale Einheiten (Fahrenheit, Zoll) für Wetterdaten verwenden. Meteostat verwendet standardmäßig das metrische System.",
    "modelData": "Modelldaten",
    "modelDataText": "Lücken in Zeitreihen füllen, indem fehlende Beobachtungen durch (weniger genaue) Modelldaten ersetzt werden.",
    "localTimeZone": "Lokale Zeitzone",
    "localTimeZoneText": "Stündliche Wetterdaten in der lokalen Zeitzone der jeweiligen Wetterstation bzw. des Ortes anzeigen. Andernfalls werden stündliche Daten in koordinierter Weltzeit (UTC) angezeigt.",
    "personalizedAds": "Personalisierte Anzeigen",
    "personalizedAdsText": "Meteostat erlauben, Inhalte zu personalisieren und relevantere Werbung anzuzeigen.",
    "reset": "Zurücksetzen"
  },
  "it": {
    "imperialUnits": "Unità imperiali",
    "imperialUnitsText": "Usa le unità imperiali (Fahrenheit, pollici) per i dati meteo. Meteostat utilizza il sistema metrico per impostazione predefinita.",
    "modelData": "Dati del modello",
    "modelDataText": "Riempi le lacune nelle serie temporali sostituendo le osservazioni mancanti con dati del modello (meno precisi).",
    "localTimeZone": "Fuso orario locale",
    "localTimeZoneText": "Mostra i dati meteo orari nel fuso orario locale della stazione meteo o del luogo. Altrimenti, i dati orari vengono mostrati nel tempo coordinato universale (UTC).",
    "personalizedAds": "Annunci personalizzati",
    "personalizedAdsText": "Consenti a Meteostat di personalizzare i contenuti e mostrare annunci più pertinenti.",
    "reset": "Ripristina"
  },
  "es": {
    "imperialUnits": "Unidades imperiales",
    "imperialUnitsText": "Usa unidades imperiales (Fahrenheit, pulgadas) para los datos meteorológicos. Meteostat utiliza el sistema métrico por defecto.",
    "modelData": "Datos del modelo",
    "modelDataText": "Rellena los huecos en las series temporales sustituyendo las observaciones que faltan por datos del modelo (menos precisos).",
    "localTimeZone": "Zona horaria local",
    "localTimeZoneText": "Muestra los datos meteorológicos horarios en la zona horaria local de la estación meteorológica o del lugar. De lo contrario, los datos horarios se muestran en tiempo universal coordinado (UTC).",
    "personalizedAds": "Anuncios personalizados",
    "personalizedAdsText": "Permite que Meteostat personalice el contenido y muestre anuncios más relevantes.",
    "reset": "Restablecer"
  },
  "nl": {
    "imperialUnits": "Imperiale eenheden",
    "imperialUnitsText": "Gebruik imperiale eenheden (Fahrenheit, inch) voor weergegevens. Meteostat gebruikt standaard het metrische stelsel.",
    "modelData": "Modelgegevens",
    "modelDataText": "Vul gaten in tijdreeksen op door ontbrekende waarnemingen te vervangen door (minder nauwkeurige) modelgegevens.",
    "localTimeZone": "Lokale tijdzone",
    "localTimeZoneText": "Toon uurgegevens in de lokale tijdzone van het betreffende weerstation of de plaats. Anders worden uurgegevens weergegeven in gecoördineerde wereldtijd (UTC).",
    "personalizedAds": "Gepersonaliseerde advertenties",
    "personalizedAdsText": "Sta Meteostat toe om inhoud te personaliseren en relevantere advertenties te tonen.",
    "reset": "Herstellen"
  },
  "fr": {
    "imperialUnits": "Unités impériales",
    "imperialUnitsText": "Utiliser les unités impériales (Fahrenheit, pouces) pour les données météo. Meteostat utilise le système métrique par défaut.",
    "modelData": "Données de modèle",
    "modelDataText": "Combler les lacunes des séries temporelles en remplaçant les observations manquantes par des données de modèle (moins précises).",
    "localTimeZone": "Fuseau horaire local",
    "localTimeZoneText": "Afficher les données météo horaires dans le fuseau horaire local de la station météo ou du lieu concerné. Sinon, les données horaires sont affichées en temps universel coordonné (UTC).",
    "personalizedAds": "Publicités personnalisées",
    "personalizedAdsText": "Autoriser Meteostat à personnaliser le contenu et à afficher des publicités plus pertinentes.",
    "reset": "Réinitialiser"
  },
  "pt": {
    "imperialUnits": "Unidades imperiais",
    "imperialUnitsText": "Utilizar unidades imperiais (Fahrenheit, polegadas) para os dados meteorológicos. O Meteostat utiliza o sistema métrico por predefinição.",
    "modelData": "Dados de modelo",
    "modelDataText": "Preencher lacunas nas séries temporais substituindo observações em falta por dados de modelo (menos precisos).",
    "localTimeZone": "Fuso horário local",
    "localTimeZoneText": "Mostrar os dados meteorológicos horários no fuso horário local da respetiva estação meteorológica ou local. Caso contrário, os dados horários são apresentados em Tempo Universal Coordenado (UTC).",
    "reset": "Repor",
    "personalizedAds": "Anúncios personalizados",
    "personalizedAdsText": "Permitir que o Meteostat personalize o conteúdo e mostre anúncios mais relevantes."
  },
  "ru": {
    "imperialUnits": "Имперские единицы",
    "imperialUnitsText": "Использовать имперские единицы (градусы Фаренгейта, дюймы) для метеоданных. По умолчанию Meteostat использует метрическую систему.",
    "modelData": "Модельные данные",
    "modelDataText": "Заполнять пробелы во временных рядах, заменяя отсутствующие наблюдения (менее точными) модельными данными.",
    "localTimeZone": "Местный часовой пояс",
    "localTimeZoneText": "Показывать почасовые данные в местном часовом поясе соответствующей метеостанции или места. В противном случае почасовые данные отображаются во всемирном координированном времени (UTC).",
    "personalizedAds": "Персонализированная реклама",
    "personalizedAdsText": "Разрешить Meteostat персонализировать контент и показывать более релевантную рекламу.",
    "reset": "Сброс"
  }
}
</i18n>
