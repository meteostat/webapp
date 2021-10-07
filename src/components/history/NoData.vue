<template>
  <div
    class="alert alert-danger"
    role="alert"
  >
    <h5 class="alert-heading mb-3">
      <icon
        :icon="['fas', 'exclamation-circle']"
        class="me-1 text-danger"
      />
      {{ t('$title') }}
    </h5>
    <p class="mb-0">
      {{ t('$description') }}
    </p>
    <template v-if="!settings.model">
      <hr class="mt-3">
      <p>{{ t('$tipModel') }}</p>
      <button
        class="btn btn-primary"
        @click="enableModel"
      >
        {{ t('enableModel') }}
      </button>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { Store } from 'pinia'
import { useSettingsStore } from '../../stores/settings'

export default defineComponent({
  name: 'NoDataAlert',

  setup(): Record<string, Store|any> {
    const { t } = useI18n()
    const settings = useSettingsStore()

    return { t, settings }
  },

  methods: {
    enableModel(): void {
      this.settings.model = true
      this.$router.go(0)
    }
  }
})
</script>

<i18n>
{
  "en": {
    "$title": "No Data",
    "$description": "Unfortunately, no data was found for the selected period. Perhaps you would like to try a different time period or a nearby location? Please note that for technical reasons observation data and statistics are always provided with a time delay. So it is quite possible that missing data will be available in a few hours or days.",
    "$tipModel": "You are currently using Meteostat without model data. You might want to try enabling model data to fill gaps in Meteostat's time series data.",
    "enableModel": "Enable Model"
  },
  "de": {
    "$title": "Keine Daten",
    "$description": "Für den ausgewählten Zeitraum wurden leider keine Daten gefunden. Vielleicht möchten Sie es mit einem anderen Zeitraum oder einem nahegelegenen Standort versuchen? Bitte beachten Sie, dass aus technischen Gründen Observationsdaten und Statistiken stets mit einem zeitlichen Verzug bereitgestellt werden. Es kann also durchaus sein, dass fehlende Daten bereits in einigen Stunden oder Tagen verfügbar sind.",
    "$tipModel": "Sie verwenden Meteostat derzeit ohne Modelldaten. Vielleicht möchten Sie versuchen, Modelldaten zu aktivieren, um Lücken in den Zeitreihen von Meteostat zu füllen.",
    "enableModel": "Modelldaten Aktivieren"
  },
  "it": {
    "$title": "Nessun Dato",
    "$description": "Purtroppo non sono stati trovati dati per il periodo selezionato. Forse vorresti provare un periodo diverso o una località vicina? Si prega di notare che per ragioni tecniche i dati di osservazione e le statistiche sono sempre forniti con un ritardo temporale. Quindi è molto probabile che i dati mancanti siano disponibili tra qualche ora o qualche giorno.",
    "$tipModel": "Attualmente stai usando Meteostat senza i dati del modello. Potresti provare ad abilitare i dati del modello per riempire le lacune nei dati delle serie temporali di Meteostat.",
    "enableModel": "Abilita Modello"
  },
  "es": {
    "$title": "No Hay Datos",
    "$description": "Lamentablemente, no se han encontrado datos para el periodo seleccionado. ¿Quizás le gustaría probar con otro periodo de tiempo o con una localización cercana? Tenga en cuenta que, por razones técnicas, los datos de observación y las estadísticas se proporcionan siempre con un retraso. Así que es muy posible que los datos que faltan estén disponibles en unas horas o días",
    "$tipModel": "Actualmente está utilizando Meteostat sin datos del modelo. Es posible que desee intentar habilitar los datos del modelo para rellenar las lagunas en los datos de las series temporales de Meteostat.",
    "enableModel": "Activar el Modelo"
  },
  "nl": {
    "$title": "Geen Gegevens",
    "$description": "Helaas zijn er geen gegevens gevonden voor de geselecteerde periode. Misschien wilt u een andere periode of een nabijgelegen locatie proberen? Merk op dat om technische redenen observatiegegevens en statistieken altijd met een vertraging worden geleverd. Het is dus goed mogelijk dat ontbrekende gegevens pas over enkele uren of dagen beschikbaar zijn.",
    "$tipModel": "U gebruikt momenteel Meteostat zonder modelgegevens. Je zou kunnen proberen modelgegevens in te schakelen om gaten in de tijdreeksgegevens van Meteostat op te vullen.",
    "enableModel": "Schakel Model In"
  },
  "fr": {
    "$title" : "Pas de Données",
    "$description" : "Malheureusement, aucune donnée n'a été trouvée pour la période sélectionnée. Peut-être souhaitez-vous essayer une autre période ou un lieu proche ? Veuillez noter que pour des raisons techniques, les données d'observation et les statistiques sont toujours fournies avec un décalage dans le temps. Il est donc tout à fait possible que les données manquantes soient disponibles dans quelques heures ou quelques jours.",
    "$tipModel" : "Vous utilisez actuellement Meteostat sans données de modèle. Vous pouvez essayer d'activer les données du modèle pour combler les lacunes dans les données des séries chronologiques de Meteostat.",
    "enableModel" : "Activer le Modèle"
  },
  "pt": {
    "$title": "Sem Dados",
    "$descrição": "Infelizmente, não foram encontrados dados para o período seleccionado. Talvez queira tentar um período de tempo diferente ou um local próximo? Note que, por razões técnicas, os dados de observação e as estatísticas são sempre fornecidos com um atraso de tempo. Portanto, é bem possível que os dados em falta estejam disponíveis dentro de algumas horas ou dias.",
    "Modelo $tipModel": "Está actualmente a utilizar o Meteostat sem dados de modelo. Poderá querer tentar permitir que os dados do modelo preencham lacunas nos dados das séries cronológicas do Meteostat.",
    "enableModel": "Activar Modelo"
  },
  "ru": {
    "$title": "Нет данных",
    "$description": "К сожалению, для выбранного периода данных не найдено. Возможно, вы хотите попробовать другой период времени или соседнее место? Обратите внимание, что по техническим причинам данные наблюдений и статистика всегда предоставляются с временной задержкой. Поэтому вполне возможно, что недостающие данные будут доступны через несколько часов или дней.",
    "$tipModel": "В настоящее время вы используете Meteostat без модельных данных. Возможно, вы захотите попробовать включить модельные данные, чтобы заполнить пробелы в данных временных рядов Меteostat.",
    "enableModel": "Включить модель"    
  }
}
</i18n>