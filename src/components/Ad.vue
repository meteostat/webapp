<template>
  <ins
    class="adsbygoogle bg-light rounded"
    data-ad-client="ca-pub-6830849181977374"
    :data-ad-slot="slot"
    data-ad-format="auto"
    data-full-width-responsive="true"
  />
</template>

<script>
import { defineComponent } from 'vue'
import { useSettingsStore } from '~/stores/settings'

export default defineComponent({
  name: 'Ad',

  props: {
    slot: String
  },

  setup() {
    const settings = useSettingsStore()

    return { settings }
  },

  mounted() {
    window.adsbygoogle = window.adsbygoogle || []
    if (this.settings.personalizedAds === true) {
      window.adsbygoogle.requestNonPersonalizedAds = 0
    }
    else {
      window.adsbygoogle.requestNonPersonalizedAds = 1
    }
    window.adsbygoogle.push({})
  }
})
</script>

<style lang="scss" scoped>
ins.adsbygoogle {
  display: block;

  &[data-ad-status="unfilled"] {
    display: none !important;
  }
}
</style>