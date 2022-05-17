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
      (state) => {
        window.localStorage.setItem('settings', JSON.stringify(state));
        emit('change');
      },
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
    "imperialUnitsText": "Use imperial units (Fahrenheit, Inches) for meteorological data. Meteostat uses the metric system by default.",
    "modelData": "Model Data",
    "modelDataText": "Replace missing observations with (less accurate) model data to fill gaps in time series.",
    "localTimeZone": "Local Time Zone",
    "localTimeZoneText": "Displays hourly weather data in the local time zone of the respective weather station or place. Otherwise, hourly data is displayed in Coordinated Universal Time (UTC).",
    "personalizedAds": "Personalized Ads",
    "personalizedAdsText": "Allow Meteostat to personalize content to show more relevant advertising.",
    "reset": "Reset"
  },
  "de": {
    "imperialUnits": "Imperiale Einheiten",
    "imperialUnitsText": "Verwenden Sie imperiale Einheiten (Fahrenheit, Inches) für meteorologische Daten. Meteostat verwendet standardmäßig das metrische System.",
    "modelData": "Modelldaten",
    "modelDataText": "Ersetzt fehlende Beobachtungen durch (weniger genaue) Modelldaten, um Lücken in Zeitreihen zu füllen.",
    "localTimeZone": "Lokale Zeitzone",
    "localTimeZoneText": "Zeigt stündliche Wetterdaten in der lokalen Zeitzone der jeweiligen Wetterstation oder des Ortes an. Ansonsten werden die stündlichen Daten in koordinierter Weltzeit (UTC) angezeigt.",
    "personalizedAds": "Personalisierte Anzeigen",
    "personalizedAdsText": "Erlauben Sie Meteostat, Inhalte zu personalisieren, um relevantere Werbung anzuzeigen.",
    "reset": "Zurücksetzen"
  },
  "it": {
    "imperialUnits": "Unità Imperiali",
    "imperialUnitsText": "Usa unità imperiali (Fahrenheit, Pollici) per i dati meteorologici. Meteostat utilizza il sistema metrico per impostazione predefinita.",
    "modelData": "Dati del Modello",
    "modelDataText": "Sostituisci le osservazioni mancanti con i dati del modello (meno accurati) per riempire i vuoti nelle serie temporali.",
    "localTimeZone": "Fuso Orario Locale",
    "localTimeZoneText": "Visualizza i dati meteo orari nel fuso orario locale della rispettiva stazione meteo o luogo. Altrimenti, i dati orari vengono visualizzati nel tempo universale coordinato (UTC).",
    "personalizedAds": "Annunci Personalizzati",
    "personalizedAdsText": "Consenti a Meteostat di personalizzare i contenuti per mostrare pubblicità più pertinenti.",
    "reset": "Resettare"
  },
  "es": {
    "imperialUnits": "Unidades Imperiales",
    "imperialUnitsText": "Utilizar unidades imperiales (Fahrenheit, pulgadas) para los datos meteorológicos. Meteostat utiliza el sistema métrico por defecto.",
    "modelData": "Datos del Modelo",
    "modelDataText": "Reemplaza las observaciones que faltan con datos del modelo (menos precisos) para rellenar los huecos en las series temporales.",
    "localTimeZone": "Zona Horaria Local",
    "localTimeZoneText": "Muestra los datos meteorológicos horarios en la zona horaria local de la estación meteorológica o lugar correspondiente. De lo contrario, los datos horarios se muestran en Tiempo Universal Coordinado (UTC).",
    "personalizedAds": "Anuncios Personalizados",
    "personalizedAdsText": "Permitir que Meteostat personalice el contenido para mostrar publicidad más relevante.",
    "reset": "Reiniciar"
  },
  "nl": {
    "imperialUnits": "Imperiale Eenheden",
    "imperialUnitsText": "Gebruik imperiale eenheden (Fahrenheit, Inches) voor meteorologische gegevens. Meteostat gebruikt standaard het metrische systeem.",
    "modelData": "Modelgegevens",
    "modelDataText": "Vervang ontbrekende waarnemingen door (minder nauwkeurige) modelgegevens om gaten in tijdreeksen op te vullen.",
    "localTimeZone": "Lokale Tijdzone",
    "localTimeZoneText": "Geeft uurlijkse weergegevens weer in de lokale tijdzone van het betreffende weerstation of de plaats. Anders worden de uurgegevens weergegeven in de gecoördineerde universele tijd (UTC).",
    "personalizedAds": "Gepersonaliseerde Advertenties",
    "personalizedAdsText": "Sta Meteostat toe om content te personaliseren om relevantere advertenties te tonen.",
    "reset": "Reset"
  },
  "fr": {
    "imperialUnits" : "Unités Impériales",
    "imperialUnitsText" : "Utilisez les unités impériales (Fahrenheit, Inches) pour les données météorologiques. Meteostat utilise le système métrique par défaut.",
    "modelData" : "Données du Modèle",
    "modelDataText" : "Remplacer les observations manquantes par des données de modèle (moins précises) pour combler les lacunes des séries chronologiques.",
    "localTimeZone" : "Fuseau Horaire Local",
    "localTimeZoneText" : "Affiche les données météorologiques horaires dans le fuseau horaire local de la station ou du lieu météorologique respectif. Sinon, les données horaires sont affichées en temps universel coordonné (UTC).",
    "personalizedAds" : "Annonces Personnalisées",
    "personalizedAdsText" : "Permettre à Meteostat de personnaliser le contenu pour afficher des publicités plus pertinentes.",
    "reset" : "Réinitialisation"
  },
  "pt": {
    "imperialUnits": "Unidades Imperiais",
    "imperialUnitsText": "Use unidades imperiais (Fahrenheit, Inches) para dados meteorológicos. O Meteostat utiliza o sistema métrico por defeito.",
    "modelData": "Dados do Modelo",
    "modelDataText": "Substituir observações em falta por dados de modelo (menos precisos) para preencher lacunas nas séries cronológicas.",
    "localTimeZone": "Fuso Horário Local",
    "localTimeZoneText": "Apresenta dados meteorológicos horários no fuso horário local da respectiva estação meteorológica ou local. Caso contrário, os dados horários são exibidos em Tempo Universal Coordenado (UTC).",
    "Personalização de Anúncios": "Anúncios Personalizados",
    "CustomAdsText": "Permitir ao Meteostat personalizar o conteúdo para mostrar publicidade mais relevante.",
    "reset": "Reinicialização"
  },
  "ru": {
    "imperialUnits": "Имперские единицы",
    "imperialUnitsText": "Использовать имперские единицы (Фаренгейт, дюймы) для метеорологических данных. По умолчанию Meteostat использует метрическую систему.",
    "modelData": "Данные модели",
    "modelDataText": "Замена отсутствующих наблюдений (менее точными) модельными данными для заполнения пробелов во временном ряду.",
    "localTimeZone": "Местный часовой пояс",
    "localTimeZoneText": "Отображает почасовые данные о погоде в местном часовом поясе соответствующей метеостанции или места. В противном случае почасовые данные отображаются по всемирному координированному времени (UTC).",
    "personalizedAds": "Персонализированные объявления",
    "personalizedAdsText": "Разрешить Meteostat персонализировать контент для показа более релевантной рекламы.",
    "reset": "Сброс" 
  }
}
</i18n>
