<template>
  <div class="my-3 sticky-top">
    <Ad slot-id="3216865845" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Ad from './Ad.vue'

export default defineComponent({
  name: 'AdStickyTop',

  components: {
    Ad
  }
})
</script>

<style lang="scss" scoped>
@import "~/style/variables";
@import "../node_modules/bootstrap/scss/functions";
@import "../node_modules/bootstrap/scss/variables";
@import "../node_modules/bootstrap/scss/mixins";

@include media-breakpoint-up(lg) {
  .sticky-top {
    top: 55px;
  } 
}
</style>