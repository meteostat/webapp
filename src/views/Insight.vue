<template>
  <div
    v-if="item?.title"
    class="container py-4"
  >
    <header class="mb-4">
      <p class="mb-3">
        <span class="header-topic pb-2 pe-3 fs-5 text-primary text-uppercase">{{ item.topic }}</span>
      </p>
      <h1 class="display-5 fw-bold">
        {{ item.title }}
      </h1>
      <div class="d-flex flex-column-reverse flex-sm-row align-items-center-sm mt-4">
        <div class="d-flex align-items-center mt-3 mt-sm-0">
          <span>{{ item.author }}</span>
          <span class="mx-2">·</span>
          <span>{{ item.date }}</span>
        </div>
        <div class="d-flex align-items-center ms-md-auto">
          <button
            class="btn btn-light btn-circle me-2"
            @click="share(socialLinks.twitter)"
          >
            <icon :icon="['fab', 'twitter']" />
          </button>
          <button
            class="btn btn-light btn-circle me-2"
            @click="share(socialLinks.facebook)"
          >
            <icon :icon="['fab', 'facebook-f']" />
          </button>
          <button
            class="btn btn-light btn-circle"
            @click="share(socialLinks.linkedin)"
          >
            <icon :icon="['fab', 'linkedin-in']" />
          </button>
        </div>
      </div>
    </header>
    <div class="markdown" v-html="item.body" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useHead } from '@vueuse/head'
import Prism from 'prismjs'
import 'prismjs/components/prism-python'

export default defineComponent({
  name: 'Insight',

  props: {
    insight: {
      type: Object,
      default: null
    }
  },

  setup(props: Record<string, any>): Record<string, any> { 
    const { t } = useI18n()

    if (props.insight?.title) {
      useHead({
        title: `${props.insight.title} | Meteostat`,
        meta: [
          {
            name: 'description',
            content: props.insight.teaser
          }
        ],
      })
    }

    return { t }
  },

  data() {
    return {
      item: this.insight || null,
      socialLinks: {
        twitter(link: string) {
          return `https://twitter.com/intent/tweet?url=${link}`
        },
        facebook(link: string) {
          return `https://www.facebook.com/sharer/sharer.php?u=${link}`
        },
        linkedin(link: string) {
          return `https://www.linkedin.com/sharing/share-offsite/?url=${link}`
        }
      }
    }
  },

  async mounted() {
    if (!this.item) {
      // Fetch insights article
      await this.fetchItem()
    }
    Prism.highlightAll()
  },

  methods: {
    /**
     * Fetch item
     */
    async fetchItem(): Promise<void> {
      await fetch(`${this.$api}/cms/insights/single?lang=${this.$locale}&year=${this.$route.params.year}&month=${this.$route.params.month}&slug=${this.$route.params.slug}`)
        .then(response => response.json())
        .then(data => this.item = data.data)
    },
    share(socialLink: any) {
      window?.open(socialLink(window.location), '_blank')?.focus()
    }
  }
})
</script>

<style lang="scss" scoped>
@import '~/style/variables';
@import "../node_modules/bootstrap/scss/functions";
@import "../node_modules/bootstrap/scss/variables";
@import "../node_modules/bootstrap/scss/mixins";

.container {
  max-width: 900px;
}

.header-topic {
  border-bottom: 3px solid $primary;
}

.btn.btn-circle {
  width: 30px;
  height: 30px;
  padding: 4px 0px;
  border-radius: 15px;
  text-align: center;
  font-size: 13px;
  background: $gray-200;
  line-height: 1.42857;
}

.cover-img {
  max-height: 300px;
  object-fit: cover;
}

.card-img-overlay {
  background: rgba(0, 0, 0, 0.3);
}
</style>

<style lang="scss">
@import '~/style/variables';
@import "../node_modules/bootstrap/scss/functions";
@import "../node_modules/bootstrap/scss/variables";
@import "../node_modules/bootstrap/scss/mixins";
@import "../node_modules/prismjs/themes/prism";

.markdown {
  h2 {
    border-bottom: 1px solid $gray-300;
    padding-bottom: map-get($spacers, 2);
  }

  img {
    max-width: 100%;
    height: 100%;
  }

  blockquote {
    background: $white;
    color: $dark;
    padding: $spacer;
    border-top: 1px solid $gray-200;
    border-right: 1px solid $gray-200;
    border-bottom: 1px solid $gray-200;
    border-left: 2px solid $primary;
    border-radius: $border-radius;

    & > p {
      margin: 0;
    }
  }

  code {
    background-color: $light;
    border-radius: $border-radius;
    font-size: $font-size-sm;
  }

  & > p {
    font-family: charter, Georgia, Cambria, "Times New Roman", Times, serif;
    font-size: $font-size-lg;

    & > code {
      padding: map-get($spacers, 1) map-get($spacers, 2);
      color: $dark;
    }
  }

  pre {
    background-color: $light;
    border-radius: $border-radius;
    padding: $spacer;
    margin: map-get($spacers, 4) 0;
  }
}
</style>