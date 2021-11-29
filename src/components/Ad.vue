<template>
  <template v-if="display">
    <ins
      class="adsbygoogle"
      data-ad-client="ca-pub-6830849181977374"
      :data-ad-slot="slot"
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  </template>
  <template v-else>
    <ins
      class="adsbygoogle"
      data-ad-format="fluid"
      data-ad-layout-key="-fb+5w+4e-db+86"
      data-ad-client="ca-pub-6830849181977374"
      :data-ad-slot="slot"
    />
  </template>
</template>

<script>
import { defineComponent } from 'vue'
import { useSettingsStore } from '~/stores/settings'

export default defineComponent({
  name: 'Ad',

  props: {
    slot: String,
    display: {
      type: Boolean,
      default: false
    }
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