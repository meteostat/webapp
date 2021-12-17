<template>
  <div class="container py-4">
    <div
      class="container-fluid mb-4"
    >
      <div class="row">
        <router-link
          v-for="(post, index) in posts"
          :key="post.url"
          class="col-12 col-md-4 p-4 story bg-light border border-white rounded-3 placeholder-glow"
          :to="`/blog/${post.slug}`"
        >
          <div
            v-if="post.lang !== $locale"
            class="ribbon ribbon-lang"
          >
            <span
              class="fw-bold d-flex justify-content-center align-items-center text-white"
            >{{ post.lang }}</span>
          </div>
          <div
            v-if="imgLoaded[index] === undefined"
            class="story-img placeholder bg-dark"
          />
          <img
            :src="post.img"
            class="story-img img-fluid mb-3"
            loading="lazy"
            v-show="imgLoaded[index] || false"
            @load="imgLoaded[index] = true"
          />
          <h5 class="text-dark">
            {{ post.title }}
          </h5>
          <p class="text-muted mb-0">
            {{ post.excerpt }}
          </p>
        </router-link>
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

export default defineComponent({
  name: 'Blog',

  props: {
    _posts: {
      type: Array,
      default: null
    },
    _tag: {
      type: Array,
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

  data() {
    return {
      imgLoaded: []
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

<style lang="scss" scoped>
@import '~/style/variables';
@import "../node_modules/bootstrap/scss/functions";
@import "../node_modules/bootstrap/scss/variables";
@import "../node_modules/bootstrap/scss/mixins";

.story-img {
  height: 180px;
  width: 100%;
  object-fit: cover;
}

.story {
  position: relative;

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
}
</style>

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