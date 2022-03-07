<template>
  <div class="container py-4">
    <div
      class="container-fluid mb-4"
    >
      <div class="row">
        <template
          v-for="post in posts"
          :key="post.url"
        >
          <router-link
            v-if="post.lang === $locale"
            class="col-12 col-md-4 p-4 story position-relative bg-light border border-white rounded-3 placeholder-glow"
            :to="`/blog/${post.slug}`"
          >
            <blog-post-card :post="post" />
          </router-link>
          <a
            v-else
            class="col-12 col-md-4 p-4 story position-relative bg-light border border-white rounded-3 placeholder-glow"
            :href="`/${post.lang}/blog/${post.slug}`"
          >
            <blog-post-card :post="post" />
          </a>
        </template>
      </div>
    </div>
    <div
      v-if="!complete"
      ref="spinner"
      class="d-flex justify-content-center my-4"
    >
      <div
        class="spinner-grow text-primary"
        role="status"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import { useHead } from '@vueuse/head'
import isElementInViewport from '~/utils/spy'
import BlogPostCard from '~/components/BlogPostCard.vue'

export default defineComponent({
  name: 'Blog',

  components: {
    BlogPostCard
  },

  props: {
    _posts: {
      type: Array,
      default: null
    },
    _tag: {
      type: Object,
      default: null
    }
  },

  setup(props): Record<string, any> {
    // Current route
    const route = useRoute()

    // Translations
    const { t } = useI18n()

    // Data
    const posts = reactive(props._posts || [])
    const isTag = ref(!!route.params.tag)
    const tag = reactive(props._tag || {})
    const loading = ref(false)
    const complete = ref(props._posts && props._posts.length < 9 ? true : false)

    // Meta
    useHead({
      title: `${t('blog')} | Meteostat`,
      meta: [
        {
          name: 'description',
          content: t('$meta.description') 
        }
      ]
    })

    return {
      t,
      posts,
      isTag,
      tag,
      loading,
      complete
    }
  },

  mounted() {
    if (this.isTag && !this._tag) {
      this.fetchTag()
    }
    else if (!this.isTag && !this._posts) {
      // Fetch posts
      this.fetchPosts()
    }
    window.addEventListener('scroll', this.viewportCheck)
  },

  unmounted() {
    window.removeEventListener('scroll', this.viewportCheck)
  },

  methods: {
    viewportCheck() {
      if (!this.loading && !this.complete) {
        if (isElementInViewport(this.$refs.spinner as HTMLElement)) {
          this.loading = true
          if (this.isTag && (this.tag as any).count > this.posts.length) {
            this.fetchTag(this.posts.length)
          } else if ((this.isTag && this.tag as any).count === this.posts.length) {
            this.complete = true
          } else if (!this.isTag) {
            this.fetchPosts(this.posts.length)
          }
        }
      }
    },

    /**
     * Fetch postst
     */
    async fetchPosts(offset?: number): Promise<void> {
      let endpoint = `${this.$api}/cms/blog/latest?lang=${this.$locale}&limit=9`;
      if (offset) {
        endpoint = `${endpoint}&offset=${offset}`
      }
      await fetch(endpoint)
        .then(response => response.json())
        .then(data => {
          this.posts = this.posts || []
          this.posts.push(...data.data)
          if (data.data.length < 9) {
            this.complete = true
            window.removeEventListener('scroll', this.viewportCheck)
          }
        })
        .finally(() => this.loading = false)
    },

    /**
     * Fetch postst
     */
    async fetchTag(offset?: number): Promise<void> {
      let endpoint = `${this.$api}/cms/blog/tag?tag=${this.$route.params.tag}&limit=9`;
      if (offset) {
        endpoint = `${endpoint}&offset=${offset}`
      }
      await fetch(endpoint)
        .then(response => response.json())
        .then(data => {
          this.tag = data.meta.tag
          this.posts = this.posts || []
          this.posts.push(...data.data)
          if (data.data.length < 9) {
            this.complete = true
            window.removeEventListener('scroll', this.viewportCheck)
          }
        })
        .finally(() => this.loading = false)
    }
  }
})
</script>

<i18n>
{
  "en": {
    "$meta": {
      "description": "Meteostat's blog for the latest on weather, climate and meteorological data science."
    }
  },
  "de": {
    "$meta": {
      "description": "Das Neuste von Meteostat aus den Bereichen Wetter, Klima und meteorlogische Daten."
    }
  },
  "it": {
    "$meta": {
      "description": "Il blog di Meteostat per le ultime notizie su meteo, clima e scienza dei dati meteorologici."
    }
  },
  "es": {
    "$meta": {
      "description": "El blog de Meteostat para conocer las últimas novedades de la ciencia del tiempo, el clima y los datos meteorológicos."
    }
  },
  "nl": {
    "$meta": {
      "description": "De blog van Meteostat voor het laatste nieuws over weer, klimaat en meteorologische gegevenswetenschap."
    }
  },
  "fr": {
    "$meta" : {
      "description" : "Le blog de Meteostat pour les dernières nouvelles sur le temps, le climat et la science des données météorologiques."
    }
  },
  "pt": {
    "$meta": {
      "description": "Blog do Meteostat para as últimas novidades sobre o tempo, clima e ciência de dados meteorológicos."
    }
  },
  "ru": {
    "$meta": {
      "description": "Блог Meteostat о последних новостях в области погоды, климата и науки о метеорологических данных."
    }    
  }
}
</i18n>