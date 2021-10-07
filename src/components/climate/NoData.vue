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
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { Store } from 'pinia'
import { useSettingsStore } from '~/stores/settings'

export default defineComponent({
  name: 'NoDataAlert',

  setup(): Record<string, Store|any> {
    const { t } = useI18n()
    const settings = useSettingsStore()

    return { t, settings }
  }
})
</script>

<i18n>
{
  "en": {
    "$title": "No Data",
    "$description": "Unfortunately, no climate data was found for this location. Perhaps you would like to try a nearby place or weather station?"
  },
  "de": {
    "$title": "Keine Daten",
    "$description": "Leider wurden für diesen Ort keine Klimadaten gefunden. Vielleicht möchten Sie einen nahegelegenen Ort oder eine Wetterstation ausprobieren?"
  },
  "it": {
    "$title": "Nessun Dato",
    "$description": "Purtroppo non sono stati trovati dati climatici per questa località. Forse vorresti provare un luogo o una stazione meteorologica nelle vicinanze?"
  },
  "es": {
    "$title": "No Hay Datos",
    "$description": "Lamentablemente, no se han encontrado datos climáticos para este lugar. Tal vez quiera probar con un lugar o estación meteorológica cercana"
  },
  "nl": {
    "$title": "Geen Gegevens",
    "$description": "Helaas zijn er geen klimaatgegevens gevonden voor deze locatie. Misschien wilt u een nabijgelegen plaats of weerstation proberen?"
  },
  "fr": {
    "$title" : "Pas de Données",
    "$description" : "Malheureusement, aucune donnée climatique n'a été trouvée pour cet endroit. Peut-être souhaitez-vous essayer un lieu ou une station météorologique proche?"
  },
  "pt": {
    "$title": "Sem Dados",
    "$description": "Infelizmente, não foram encontrados dados climáticos para este local. Talvez queira experimentar um local próximo ou uma estação meteorológica?"
  },
  "ru": {
    "$title": "Нет данных",
    "$description": "К сожалению, для этого места не было найдено климатических данных. Возможно, вы хотите попробовать поискать в соседнем месте или на метеостанции?"  
  }
}
</i18n>