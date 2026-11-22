<template>
  <div v-if="meta?.id">
    <!-- Navbar -->
    <Navbar :id="meta.id" ref="subnav" type="station" :name="getLocaleName" :country="meta.country" />
    <!-- Content -->
    <div class="container my-3 my-lg-4">
      <div class="row gy-4">
        <div class="col-12 col-lg-8">
          <!-- Dashboard -->
          <Dashboard
            :name="meta.name[$locale] || meta.name['en']"
            :station="meta.id"
            :lat="meta.location.latitude"
            :lon="meta.location.longitude"
            :tz="meta.timezone"
            @loaded="updateNavbarItems()"
          />
        </div>
        <div class="col-12 col-lg-4">
          <!-- Meta Data -->
          <Meta :data="{ ...meta, name: getLocaleName }" />
          <!-- Ads -->
          <AdStickyTop />
        </div>
      </div>
    </div>
  </div>
  <NotFound v-else-if="notFound" />
</template>

<script lang="ts">
import { defineComponent, defineAsyncComponent, ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useHead } from '@unhead/vue';
import { stationDescription, stationName, localizedUrl } from '~/seo/meta';
import { format } from 'date-fns';
import Navbar from '~/components/LocationNavbar.vue';
import Meta from '~/components/panels/Meta.vue';
import AdStickyTop from '~/components/AdStickyTop.vue';
import NotFound from '~/views/NotFound.vue';

/**
 * Async Components
 */
const Dashboard = defineAsyncComponent(() => import('~/components/dashboard/Dashboard.vue'));

export default defineComponent({
  name: 'Station',

  components: {
    Navbar,
    Meta,
    Dashboard,
    AdStickyTop,
    NotFound
  },

  setup(): Record<string, any> {
    // Translations
    const { t, locale } = useI18n();

    // Station meta data (fetched on mount)
    const meta = ref<Record<string, any> | null>(null);

    // Set to true if the API does not know this station
    const notFound = ref(false);

    // Meta tags
    useHead({
      meta: computed(() => {
        if (notFound.value) {
          return [{ name: 'robots', content: 'noindex' }];
        }
        if (!meta.value?.id) {
          return [];
        }
        return [
          {
            name: 'description',
            content: stationDescription(stationName(meta.value.name, locale.value), meta.value.country, locale.value)
          }
        ];
      }),
      link: computed(() =>
        meta.value?.id
          ? [
              {
                rel: 'canonical',
                href: localizedUrl(locale.value, `/station/${meta.value.id}`)
              }
            ]
          : []
      )
    });

    return { t, format, meta, notFound };
  },

  data(): Record<string, any> {
    return {
      nearbyStations: []
    };
  },

  computed: {
    getLocaleName() {
      return this.meta.name[this.$locale] || this.meta.name['en'];
    }
  },

  async mounted(): Promise<void> {
    await this.fetchMetaData();
  },

  methods: {
    /**
     * Fetch station meta data
     */
    async fetchMetaData(): Promise<void> {
      await fetch(`${this.$api}/app/proxy/stations/meta?id=${this.$route.params.id}`)
        .then((response) => response.json())
        .then((data) => {
          if (data?.data?.id) {
            this.meta = data.data;
          } else {
            this.notFound = true;
          }
        })
        .catch(() => (this.notFound = true));
    },

    updateNavbarItems(): void {
      (this.$refs as any).subnav.updateItems();
    }
  }
});
</script>
