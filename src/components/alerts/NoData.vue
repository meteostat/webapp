<template>
  <div class="alert alert-danger" role="alert">
    <h5 class="alert-heading mb-3">
      <icon :icon="['fas', 'exclamation-circle']" class="me-1 text-danger" />
      {{ t('$title') }}
    </h5>
    <p class="mb-0">
      {{ t('$description') }}
    </p>
    <template v-if="!settings.model">
      <hr class="mt-3" />
      <p>{{ t('$tipModel') }}</p>
      <button class="btn btn-primary" data-bs-toggle="offcanvas" data-bs-target="#settingsSidebar">
        {{ t('enableModel') }}
      </button>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useI18n } from 'vue-i18n';
import { Store } from 'pinia';
import { useSettingsStore } from '../../stores/settings';

export default defineComponent({
  name: 'NoData',

  setup(): Record<string, Store | any> {
    const { t } = useI18n();
    const settings = useSettingsStore();

    return { t, settings };
  }
});
</script>

<i18n>
{
  "en": {
    "$title": "No Data",
    "$description": "Unfortunately, no data was found for the selected period. Try a different period or a nearby location. Please note that, for technical reasons, observations and statistics are always published with a delay, so missing data may become available within a few hours or days.",
    "$tipModel": "You're currently using Meteostat without model data. Enabling model data can fill gaps in the time series.",
    "enableModel": "Enable Model Data"
  },
  "de": {
    "$title": "Keine Daten",
    "$description": "Für den ausgewählten Zeitraum wurden leider keine Daten gefunden. Versuchen Sie es mit einem anderen Zeitraum oder einem Ort in der Nähe. Bitte beachten Sie, dass Beobachtungsdaten und Statistiken aus technischen Gründen immer mit Verzögerung bereitgestellt werden. Fehlende Daten können also schon in wenigen Stunden oder Tagen verfügbar sein.",
    "$tipModel": "Sie verwenden Meteostat derzeit ohne Modelldaten. Wenn Sie Modelldaten aktivieren, können Lücken in den Zeitreihen gefüllt werden.",
    "enableModel": "Modelldaten aktivieren"
  },
  "it": {
    "$title": "Nessun dato",
    "$description": "Purtroppo non sono stati trovati dati per il periodo selezionato. Prova un periodo diverso o una località vicina. Tieni presente che, per motivi tecnici, osservazioni e statistiche vengono sempre pubblicate con un certo ritardo: i dati mancanti potrebbero quindi essere disponibili entro poche ore o giorni.",
    "$tipModel": "Stai usando Meteostat senza dati del modello. Attivandoli puoi riempire le lacune nelle serie temporali.",
    "enableModel": "Attiva dati del modello"
  },
  "es": {
    "$title": "No hay datos",
    "$description": "Lamentablemente, no se han encontrado datos para el periodo seleccionado. Prueba con otro periodo o con un lugar cercano. Ten en cuenta que, por motivos técnicos, las observaciones y estadísticas siempre se publican con cierto retraso, por lo que es posible que los datos que faltan estén disponibles en unas horas o días.",
    "$tipModel": "Estás usando Meteostat sin datos del modelo. Si los activas, se pueden rellenar los huecos en las series temporales.",
    "enableModel": "Activar datos del modelo"
  },
  "nl": {
    "$title": "Geen gegevens",
    "$description": "Helaas zijn er geen gegevens gevonden voor de geselecteerde periode. Probeer een andere periode of een locatie in de buurt. Houd er rekening mee dat waarnemingen en statistieken om technische redenen altijd met vertraging worden gepubliceerd. Ontbrekende gegevens kunnen dus binnen enkele uren of dagen beschikbaar komen.",
    "$tipModel": "Je gebruikt Meteostat momenteel zonder modelgegevens. Door modelgegevens in te schakelen kunnen gaten in de tijdreeksen worden opgevuld.",
    "enableModel": "Modelgegevens inschakelen"
  },
  "fr": {
    "$title": "Aucune donnée",
    "$description": "Malheureusement, aucune donnée n'a été trouvée pour la période sélectionnée. Essayez une autre période ou un lieu à proximité. Veuillez noter que, pour des raisons techniques, les observations et statistiques sont toujours publiées avec un certain délai : les données manquantes pourraient donc être disponibles d'ici quelques heures ou quelques jours.",
    "$tipModel": "Vous utilisez actuellement Meteostat sans données de modèle. En les activant, vous pouvez combler les lacunes des séries temporelles.",
    "enableModel": "Activer les données de modèle"
  },
  "pt": {
    "$title": "Sem dados",
    "enableModel": "Ativar dados de modelo",
    "$description": "Infelizmente, não foram encontrados dados para o período selecionado. Experimente outro período ou um local próximo. Tenha em atenção que, por razões técnicas, as observações e estatísticas são sempre publicadas com algum atraso, pelo que os dados em falta poderão ficar disponíveis dentro de algumas horas ou dias.",
    "$tipModel": "Está atualmente a utilizar o Meteostat sem dados de modelo. Ao ativá-los, é possível preencher lacunas nas séries temporais."
  },
  "ru": {
    "$title": "Нет данных",
    "$description": "К сожалению, за выбранный период данные не найдены. Попробуйте выбрать другой период или ближайшее место. Обратите внимание, что по техническим причинам наблюдения и статистика всегда публикуются с задержкой, поэтому недостающие данные могут появиться в течение нескольких часов или дней.",
    "$tipModel": "Сейчас вы используете Meteostat без модельных данных. Включив их, можно заполнить пробелы во временных рядах.",
    "enableModel": "Включить модельные данные"
  }
}
</i18n>
