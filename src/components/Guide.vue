<template>
  <div
    v-if="!settings.dismiss.guide[id]"
    class="alert alert-primary alert-dismissible fade show"
    role="alert"
  >
    <template v-if="expanded">
      {{ text }}
    </template>
    <template v-else>
      {{ text.substr(0, 60) }}...
      <a
        class="link-primary"
        @click="expanded = true"
      >
        {{ t('$phrases.showMore') }}
      </a>
    </template>
    <button
      type="button"
      class="btn-close"
      data-bs-dismiss="alert"
      :aria-label="t('close')"
      @click="settings.dismiss.guide[id] = true"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { Store } from 'pinia'
import { useSettingsStore } from '~/stores/settings'

export default defineComponent({
  name: 'Guide',

  props: {
    id: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: true
    }
  },

  setup(): Record<string, (Store|Array<string>|any)> {
    const { t } = useI18n()
    const settings = useSettingsStore()

    watch(
      () => settings.$state,
      (state) => {
        window.localStorage.setItem('settings', JSON.stringify(state))
      },
      { deep: true }
    )

    return {
      t,
      settings
    }
  },

  data() {
    return {
      expanded: false
    }
  }
})
</script>