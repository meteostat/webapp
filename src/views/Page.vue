<template>
  <div class="container py-4 markdown">
    <div v-html="body" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useHead } from '@vueuse/head'

export default defineComponent({
  name: 'Content',

  props: {
    updated: {
      type: String,
      default: null
    },
    title: {
      type: String,
      default: null
    },
    body: {
      type: String,
      default: null
    }
  },

  setup(props: Record<string, any>): Record<string, any> { 
    const { t } = useI18n()

    useHead({
      title: `${props.title} | Meteostat`
    })

    return { t }
  }
})
</script>

<style lang="scss">
@import '~/style/typography';
@import "../node_modules/bootstrap/scss/functions";
@import "../node_modules/bootstrap/scss/variables";
@import "../node_modules/bootstrap/scss/mixins";

.container {
  max-width: 900px;
}

.markdown {
  h1 {
    @extend .heading-main;
    margin-bottom: map-get($spacers, 4);
  }

  h2 {
    margin-top: map-get($spacers, 4);
    margin-bottom: map-get($spacers, 3);
  }
}
</style>