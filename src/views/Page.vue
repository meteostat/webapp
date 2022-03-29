<template>
  <div v-if="item?.title" class="container py-4 markdown">
    <div v-html="decodeURIComponent(item.body)" />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useHead } from '@vueuse/head';

export default defineComponent({
  name: 'Page',

  props: {
    page: {
      type: Object,
      default: null
    }
  },

  setup(props: Record<string, any>): Record<string, any> {
    const { t } = useI18n();

    const pageTitle = ref(props.page?.title || '');

    useHead({
      title: computed(() => `${pageTitle.value} | Meteostat`)
    });

    return { t, pageTitle };
  },

  data() {
    return {
      item: this.page || null
    };
  },

  mounted() {
    if (!this.item) {
      // Fetch page
      this.fetchItem();
    }
  },

  methods: {
    /**
     * Fetch item
     */
    async fetchItem(): Promise<void> {
      await fetch(`${this.$api}/cms/pages/page?lang=${this.$locale}&slug=${String(this.$route.name)?.toLowerCase()}`)
        .then((response) => response.json())
        .then((data) => {
          this.item = data.data;
          this.pageTitle = this.item.title;
        });
    }
  }
});
</script>

<style lang="scss" scoped>
.container {
  max-width: 900px;
}
</style>

<style lang="scss">
@import '~/style/typography';
@import '../node_modules/bootstrap/scss/functions';
@import '../node_modules/bootstrap/scss/variables';
@import '../node_modules/bootstrap/scss/mixins';

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
