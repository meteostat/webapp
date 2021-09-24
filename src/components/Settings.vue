<template>
  <div class="offcanvas-header">
    <h5
      id="offcanvasExampleLabel"
      class="offcanvas-title"
    >
      {{ t('settings') }}
    </h5>
    <button
      type="button"
      class="btn-close text-reset"
      data-bs-dismiss="offcanvas"
      aria-label="Close"
    />
  </div>
  <div class="offcanvas-body">
    <div class="form-check form-switch">
      <input
        id="imperial"
        v-model="settings.imperial"
        class="form-check-input"
        type="checkbox"
      >
      <label for="imperial">{{ t('imperialUnits') }}</label>
      <div class="form-text">
        {{ t('imperialUnitsText') }}
      </div>
    </div>
    <div class="form-check form-switch mt-4">
      <input
        id="imperial"
        v-model="settings.model"
        class="form-check-input"
        type="checkbox"
      >
      <label for="imperial">{{ t('modelData') }}</label>
      <div class="form-text">
        {{ t('modelDataText') }}
      </div>
    </div>
    <div class="form-check form-switch mt-4">
      <input
        id="imperial"
        v-model="settings.timezone"
        class="form-check-input"
        type="checkbox"
      >
      <label for="imperial">{{ t('localTimeZone') }}</label>
      <div class="form-text">
        {{ t('localTimeZoneText') }}
      </div>
    </div>
    <div class="d-grid mt-4">
      <button
        class="btn btn-light"
        type="button"
        @click="resetSettings()"
      >
        <icon
          :icon="['fas', 'trash']"
          class="me-1"
        />
        {{ t('reset') }}
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useSettingsStore } from '../stores/settings'

export default defineComponent({
  name: 'Settings',

  emits: ['change'],

  setup(props, { emit }): Record<string, any> {
    const { t } = useI18n()
    const settings = useSettingsStore()

    watch(
      () => settings.$state,
      (state) => {
        window.localStorage.setItem('settings', JSON.stringify(state))
        emit('change')
      },
      { deep: true }
    )

    return { t, settings }
  },

  methods: {
    resetSettings(): void {
      window.localStorage.removeItem('settings')
      this.$router.go(0)
    }
  }
})
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
    "reset": "Reset"
  },
  "de": {
    "donation": "Spenden",
    "donationText": "Unterstützen Sie Meteostat bei dem Vorhaben, Wetter- und Klimadaten für jedermann frei zugänglich zu machen. Ihre Spende hilft auch zahlreichen Projekten aus Bildung und Forschung, die Meteostat-Daten für ihre Arbeit verwenden.",
    "online": "Online",
    "bankTransfer": "Überweisung",
    "recipient": "Empfänger",
    "iban": "IBAN",
    "bic": "BIC"
  }
}
</i18n>