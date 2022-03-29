<template>
  <div v-if="post.lang !== $locale" class="ribbon ribbon-lang">
    <span class="fw-bold d-flex justify-content-center align-items-center text-white">{{ post.lang }}</span>
  </div>
  <div v-if="!imgLoaded" class="story-img placeholder mb-3 bg-dark" />
  <img :src="post.img" class="story-img img-fluid mb-3" v-show="imgLoaded" @load="imgLoaded = true" />
  <h5 class="text-dark">
    {{ post.title }}
  </h5>
  <p class="text-muted mb-0">
    {{ post.excerpt }}
  </p>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'BlogPostCard',

  props: {
    post: Object
  },

  setup() {
    const imgLoaded = ref(false);

    return { imgLoaded };
  }
});
</script>

<style lang="scss" scoped>
@import '~/style/variables';
@import '../node_modules/bootstrap/scss/functions';
@import '../node_modules/bootstrap/scss/variables';
@import '../node_modules/bootstrap/scss/mixins';

.story-img {
  height: 180px;
  width: 100%;
  object-fit: cover;
}

.ribbon {
  position: absolute;
  top: 0px;
  right: 0px;
  text-align: right;
  z-index: 1;
  overflow: hidden;
  width: 75px;
  height: 75px;

  span {
    font-size: 80%;
    transform: rotate(45deg);
    background: $primary;
    top: 16px;
    right: -22px;
    text-transform: uppercase;
    width: 100px;
    position: absolute;
    padding: 2px 0;
  }
}
</style>
