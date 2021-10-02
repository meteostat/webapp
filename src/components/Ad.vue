<template>
  <ins
    class="adsbygoogle"
    data-ad-client="ca-pub-6830849181977374"
    data-ad-slot="3216865845"
    data-ad-format="auto"
    data-full-width-responsive="true"
  />
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Ad',

  mounted() {
    (window.adsbygoogle = window.adsbygoogle || []).push({})
  }
})
</script>

<style lang="scss" scoped>
.adsbygoogle {
  display: block;
}
</style>