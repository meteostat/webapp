<template>
  <div
    class="alert alert-custom"
    role="alert"
  >
    <h5 class="alert-heading mb-3">
      <icon
        :icon="['fas', 'exclamation-circle']"
        class="me-1 text-danger"
      />
      {{ t('title') }}
    </h5>
    <p class="mb-0">
      {{ t('description') }}
    </p>
    <template v-if="!settings.model">
      <hr class="mt-3">
      <p>{{ t('tipModel') }}</p>
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

<style lang="scss" scoped>
@import "../node_modules/bootstrap/scss/functions";
@import "../node_modules/bootstrap/scss/variables";
@import "../node_modules/bootstrap/scss/mixins";
@import "../../style/variables";

.alert-custom {
  border-left: 3px solid $danger;
  border-top: 1px solid $gray-200;
  border-right: 1px solid $gray-200;
  border-bottom: 1px solid $gray-200;
}
</style>

<i18n>
{
  "en": {
    "title": "No Data",
    "description": "Unfortunately, no data was found for the selected period. Perhaps you would like to try a different time period or a nearby location? Please note that for technical reasons observation data and statistics are always provided with a time delay. So it is quite possible that missing data will be available in a few hours or days.",
    "tipModel": "You are currently using Meteostat without model data. You might want to try enabling model data to fill gaps in Meteostat's time series data.",
    "enableModel": "Enable Moel"
  },
  "de": {
    "title": "Keine Daten",
    "description": "Für den ausgewählten Zeitraum wurden leider keine Daten gefunden. Vielleicht möchten Sie es mit einem anderen Zeitraum oder einem nahegelegenen Standort versuchen? Bitte beachten Sie, dass aus technischen Gründen Observationsdaten und Statistiken stets mit einem zeitlichen Verzug bereitgestellt werden. Es kann also durchaus sein, dass fehlende Daten bereits in einigen Stunden oder Tagen verfügbar sind."
  }
}
</i18n>