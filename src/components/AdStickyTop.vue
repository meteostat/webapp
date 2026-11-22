<template>
  <div class="my-3 sticky-top">
    <Ad slot-id="3216865845" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Ad from './Ad.vue';

export default defineComponent({
  name: 'AdStickyTop',

  components: {
    Ad
  }
});
</script>

<style lang="scss" scoped>
@import '~/style/variables';
@import 'bootstrap/scss/functions';
@import 'bootstrap/scss/variables';
@import 'bootstrap/scss/mixins';

@include media-breakpoint-up(lg) {
  .sticky-top {
    top: 55px;
  }
}
</style>
