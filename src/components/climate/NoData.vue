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
  }
})
</script>

<i18n>
{
  "en": {
    "$title": "No Data",
    "$description": "Unfortunately, no climate data was found for this location. Perhaps you would like to try a nearby place or weather station?"
  }
}
</i18n>