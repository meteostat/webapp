<template>
  <ins
    class="adsbygoogle"
    data-ad-client="ca-pub-6830849181977374"
    :data-ad-slot="slotId"
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
    slotId: String
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
    background: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MDAgMzAwIiB4bWxuczp2PSJodHRwczovL3ZlY3RhLmlvL25hbm8iPjxwYXRoIGQ9Ik0wIDBoNTAwdjMwMEgweiIgZmlsbD0iI2ZhZmJmYyIvPjxwYXRoIGQ9Ik0yNjcuNTEgMTU4LjVoLTM0LjUyYy0xLjY1IDAtMi45OS0xLjM0LTIuOTktMi45OXYtMTEuNTJjMC0xLjY1IDEuMzQtMi45OSAyLjk5LTIuOTloMzQuNTJjMS42NSAwIDIuOTkgMS4zNCAyLjk5IDIuOTl2MTEuNTJjMCAxLjY1LTEuMzQgMi45OS0yLjk5IDIuOTl6IiBmaWxsPSJub25lIiBzdHJva2U9IiNiM2IzYjMiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIvPjxwYXRoIGQ9Ik0yNDIuMDkgMTU0LjFsMy4wNy04aDEuNzZsMi45NCA4aC0xLjY5bC0yLjYyLTcuNDUuNzItLjA3LTIuNiA3LjUyaC0xLjU4em0xLjYyLTEuOTVsLjQtMS4yNWgzLjcybC4xNCAxLjI1aC00LjI2em03LjIzIDEuOTV2LThoMy4wMWMxLjMzIDAgMi4zMS4zNCAyLjk1IDEuMDFzLjk1IDEuNjcuOTUgMi45OS0uMzIgMi4zMi0uOTUgMi45OWMtLjY0LjY4LTEuNjIgMS4wMS0yLjk1IDEuMDFoLTMuMDF6bTEuNjQtMS4zMWgxLjJjLjgxIDAgMS40MS0uMjIgMS44MS0uNjVzLjYtMS4xMi42LTIuMDVjMC0uOTQtLjItMS42Mi0uNi0yLjA1cy0xLS42NS0xLjgxLS42NWgtMS4ydjUuNHoiIGZpbGw9IiM2NjYiLz48L3N2Zz4=") center center;
    background-size: cover;
  }
}
</style>