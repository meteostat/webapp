<template>
  <div v-if="post.slug" class="container py-5">
    <div class="row">
      <div class="col-12 col-md-9">
        <h1 class="post-title mb-4">
          {{ post.title }}
        </h1>
        <div class="post-content" v-html="post.content" />
      </div>
      <div class="col-12 col-md-3">
        <div class="sticky-top py-3 px-2">
          <div class="d-flex align-items-center mb-2">
            <img :src="post.author?.avatar" class="rounded-circle me-2" width="28" height="28" />
            <strong>{{ post.author?.name }}</strong>
          </div>
          <p class="text-muted">{{ post.author?.description }}</p>
          <p class="text-muted mb-4">
            <icon
              :icon="['fas', 'calendar-alt']"
              class="me-2"
            />
            {{ post.date }}
          </p>
          <div class="d-flex align-items-center mb-4">
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
          <div class="post-tags d-flex flex-wrap">
            <router-link
              :to="`/blog/tag/${tag.slug}`"
              v-for="tag in post.tags"
              :key="tag.slug"
              class="badge"
            >{{ tag.name }}</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, computed } from 'vue'
import { useContext } from 'vitedge'
import { useI18n } from 'vue-i18n'
import { useHead } from '@vueuse/head'

export default defineComponent({
  name: 'BlogPost',

  props: {
    _post: {
      type: Object,
      default: null
    }
  },

  setup(props: Record<string, any>): Record<string, any> { 
    const { t } = useI18n()

    const post = reactive(props._post || {})

    if (!post.slug && import.meta.env.SSR) {
      const { writeResponse } = useContext()
      writeResponse({ status: 404 })
    }

    useHead({
      title: computed(() => `${post.title || ''} | Meteostat`),
      meta: [
        {
          name: 'description',
          content: computed(() => post.excerpt || null)
        },
        {
          name: 'author',
          content: computed(() => post.author?.name || null)
        },
        {
          property: 'og:type',
          content: 'article'
        },
        {
          property: 'og:title',
          content: computed(() => `${post.title || ''} | Meteostat`)
        },
        {
          property: 'og:image',
          content: computed(() => post.img || null)
        },
        {
          property: 'article:published_time',
          content: computed(() => post.date || null)
        },
      ],
    })

    return {
      t,
      post
    }
  },

  data() {
    return {
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
    if (!this._post) {
      // Fetch insights article
      await this.fetchPost()
    }
  },

  methods: {
    /**
     * Fetch post
     */
    async fetchPost(): Promise<void> {
      await fetch(`${this.$api}/cms/blog/post?lang=${this.$locale}&slug=${this.$route.params.slug}`)
        .then(response => response.json())
        .then(data => {
          Object.assign(this.post, data.data)
        })
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
  max-width: 1080px;
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

  &:hover {
    background: $primary;
    color: $white;
  }
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
@import "../node_modules/highlight.js/styles/a11y-dark";
//@import url('https://fonts.googleapis.com/css2?family=Merriweather&display=swap');

.post-tags {
  .badge {
    font-size: 1rem;
    font-weight: normal;
    background: $gray-200;
    color: $dark;
    margin-right: .25rem;
    margin-bottom: .3rem;

    &:hover {
      background: $primary;
      color: $white;
    }
  }
}

.post-content {
  line-height: 1.7;

  h2 {
    font-size: 1.5rem;
    margin-top: map-get($spacers, 4);
    margin-bottom: map-get($spacers, 3);
  }

  h3 {
    font-size: 1.25rem;
    margin-top: map-get($spacers, 4);
    margin-bottom: map-get($spacers, 3);
  }

  img {
    max-width: 100%;
    height: 100%;
  }

  figcaption {
    text-align: center;
    margin-top: map-get($spacers, 2);
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
    background-color: $gray-800;
    color: $white;
    border-radius: $border-radius;
    font-size: $font-size-sm;
  }

  & > p {
    & > code {
      padding: map-get($spacers, 1) map-get($spacers, 2);
      font-size: 80%;
      background-color: $light;
      color: $dark;
    }
  }

  pre {
    background-color: $gray-800;
    border-radius: $border-radius;
    padding: $spacer;
    margin: map-get($spacers, 4) 0;

    .shcb-language {
      display: none;
    }
  }
}
</style>