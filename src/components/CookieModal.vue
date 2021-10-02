<template>
  <div
    id="cookieModal"
    class="modal"
    tabindex="-1"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">
            {{ t('$title') }}
          </h5>
        </div>
        <div class="modal-body">
          {{ t('$description') }}
        </div>
        <div class="modal-footer">
          <a
            :href="t('$privacyLink')"
          >
            {{ t('privacyPolicy') }}
          </a>
          <button
            type="button"
            class="btn btn-light ms-auto"
            data-bs-dismiss="modal"
            @click="dismiss"
          >
            {{ t('refuse') }}
          </button>
          <button
            type="button"
            class="btn btn-primary"
            data-bs-dismiss="modal"
            @click="accept"
          >
            {{ t('accept') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useSettingsStore } from '../stores/settings'

export default defineComponent({
  name: 'CookieModal',

  setup() {
    const { t } = useI18n()
    const settings = useSettingsStore()

    watch(
      () => settings.$state,
      (state) => {
        window.localStorage.setItem('settings', JSON.stringify(state))
      },
      { deep: true }
    )

    return { t, settings }
  },

  mounted() {
    this.$bs.Modal.getOrCreateInstance(document.getElementById('cookieModal')).show()
  },

  methods: {
    dismiss() {
      this.settings.returning = true
    },
    accept() {
      this.settings.personCookies = true
      this.dismiss()
    }
  }
})
</script>

<i18n>
{
  "en": {
    "$title": "Privacy Notice",
    "$privacyLink": "/en/privacy",
    "privacyPolicy": "Privacy Policy",
    "$description": "To create the best possible user experience on this website, Meteostat would like to use cookies to store and access personal data on your device. This can include information like browsing patterns and unique identifiers. You can always choose not to consent, but personalization of content and advertising will not be available if you do so.",
    "refuse": "Refuse",
    "accept": "Accept"
  }
}
</i18n>