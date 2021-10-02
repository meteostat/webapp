<template>
  <!-- Toolbar -->
  <div class="d-flex mt-n2 py-2 sticky-top bg-white">
    <!-- Sections -->
    <Sections ref="sections" />

    <!-- Date Range Button -->
    <div class="ms-auto">
      <button
        class="btn btn-light d-none d-md-inline-block me-2"
        type="button"
        data-bs-toggle="modal"
        data-bs-target="#exportModal"
      >
        <icon
          :icon="['fas', 'download']"
        />
        <span class="ms-2">{{ t('export') }}</span>
      </button>
      <button
        v-if="range.start"
        class="btn btn-light"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#dateRange"
        aria-controls="dateRange"
      >
        <icon :icon="['fas', 'calendar-alt']" />
        <span class="ms-2 d-sm-none">{{ t('period') }}</span>
        <span class="ms-2 d-none d-sm-inline">{{ format(range.start, t('dateFormat')) }} - {{ format(range.end, t('dateFormat')) }}</span>
      </button>
    </div>
  </div>

  <!-- Dashboard -->
  <div class="mt-2 pt-1">
    <!-- Hourly Data -->
    <template v-if="range && mode === 'hourly'">
      <Hourly
        :station="station"
        :lat="lat"
        :lon="lon"
        :alt="alt"
        :range="[format(range.start, 'yyyy-MM-dd'), format(range.end, 'yyyy-MM-dd')]"
        :tz="tz"
        :normals="normals"
        @loaded="updateSections"
      />
    </template>

    <!-- Daily Data --->
    <template v-else-if="range && mode === 'daily'">
      <Daily
        :station="station"
        :lat="lat"
        :lon="lon"
        :alt="alt"
        :range="[format(range.start, 'yyyy-MM-dd'), format(range.end, 'yyyy-MM-dd')]"
        :normals="normals"
        @loaded="updateSections"
      />
    </template>
  </div>

  <!-- Date Range Offcanvas -->
  <div
    id="dateRange"
    ref="dateRange"
    class="offcanvas offcanvas-end"
    tabindex="-1"
  >
    <div class="offcanvas-header">
      <h5 class="offcanvas-title">
        {{ t('dateRange') }}
      </h5>
      <button
        type="button"
        class="btn-close text-reset"
        data-bs-dismiss="offcanvas"
        aria-label="Close"
      />
    </div>
    <div class="offcanvas-body">
      <ClientOnly>
        <DatePicker
          ref="calendar"
          v-model="range"
          show-weeknumbers="right"
          :locale="t('locale')"
          color="gray"
          is-range
          is-expanded
          :max-date="new Date()"
        />
      </ClientOnly>
      <div class="container p-0 mt-4">
        <div class="row row-cols-3 g-1 text-center">
          <div class="col">
            <a
              class="d-block bg-light p-2"
              @click="setRange(suggestions[0], suggestions[0])"
            >
              {{ t('today') }}
            </a>
          </div>
          <div class="col">
            <a
              class="d-block bg-light p-2"
              @click="setRange(suggestions[1], suggestions[1])"
            >
              {{ t('yesterday') }}
            </a>
          </div>
          <div class="col">
            <a
              class="d-block bg-light p-2"
              @click="setRange(suggestions[2][0], suggestions[2][1])"
            >
              {{ t('lastWeek') }}
            </a>
          </div>
          <div class="col">
            <a
              class="d-block bg-light p-2"
              @click="setRange(suggestions[3][0], suggestions[3][1])"
            >
              {{ t('lastMonth') }}
            </a>
          </div>
          <div class="col">
            <a
              class="d-block bg-light p-2"
              @click="setRange(suggestions[4][0], suggestions[4][1])"
            >
              {{ format(suggestions[4][0], 'MMM yyyy') }}
            </a>
          </div>
          <div class="col">
            <a
              class="d-block bg-light p-2"
              @click="setRange(suggestions[5][0], suggestions[5][1])"
            >
              {{ format(suggestions[5][0], 'MMM yyyy') }}
            </a>
          </div>
          <div class="col">
            <a
              class="d-block bg-light p-2"
              @click="setRange(suggestions[6][0], suggestions[6][1])"
            >
              {{ format(suggestions[6][0], 'MMM yyyy') }}
            </a>
          </div>
          <div class="col">
            <a
              class="d-block bg-light p-2"
              @click="setRange(suggestions[7][0], suggestions[7][1])"
            >
              {{ format(suggestions[7][0], 'yyyy') }}
            </a>
          </div>
          <div class="col">
            <a
              class="d-block bg-light p-2"
              @click="setRange(suggestions[8][0], suggestions[8][1])"
            >
              {{ format(suggestions[8][0], 'yyyy') }}
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { RouteLocationNormalized } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useHead } from '@vueuse/head'
import {
  parseISO,
  format,
  differenceInDays,
  subDays,
  subMonths,
  subYears,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  startOfYear,
  endOfYear
} from 'date-fns'
import Sections from '../Sections.vue'
import Hourly from './dashboards/Hourly.vue'
import Daily from './dashboards/Daily.vue'

export default defineComponent({
  name: 'History',

  components: {
    Sections,
    Hourly,
    Daily
  },

  props: {
    name: {
      type: String,
      default: null
    },
    station: {
      type: String,
      default: null
    },
    lat: {
      type: Number,
      default: null
    },
    lon: {
      type: Number,
      default: null
    },
    alt: {
      type: Number,
      default: null
    },
    tz: {
      type: String,
      default: null
    }
  },

  setup(props: Record<string, any>): Record<string, any> {
    const { t } = useI18n()

    // Meta tags
    useHead({
      title: `${props.name} | ${t('$meta.title')} | Meteostat`
    })

    return {
      t,
      format,
      subDays,
      subMonths,
      subYears,
      startOfWeek,
      endOfWeek,
      startOfMonth,
      endOfMonth,
      startOfYear,
      endOfYear
    }
  },

  data(): Record<string, any> {
    const route = this.$route as RouteLocationNormalized
    const t = route.query.t as string
    let start, end
    if (t) {
      start = parseISO(t.substring(0, 10))
      end = parseISO(t.substring(11, 22))
    } else {
      start = subDays(new Date(), 14)
      end = subDays(new Date(), 7)
    }
    return {
      range: {
        start,
        end
      },
      normals: [],
      suggestions: [
        // Today
        new Date(),
        // Yesterday
        subDays(new Date(), 1),
        // Last week
        [
          startOfWeek(subDays(new Date(), 7), {
            weekStartsOn: 1
          }),
          endOfWeek(subDays(new Date(), 7), {
            weekStartsOn: 1
          })
        ],
        // Last month
        [
          startOfMonth(subMonths(new Date(), 1)),
          endOfMonth(subMonths(new Date(), 1))
        ],
        // Month before last month
        [
          startOfMonth(subMonths(new Date(), 2)),
          endOfMonth(subMonths(new Date(), 2))
        ],
        // This month last year
        [
          startOfMonth(subMonths(new Date(), 12)),
          endOfMonth(subMonths(new Date(), 12))          
        ],
        // Last month a year ago
        [
          startOfMonth(subMonths(new Date(), 13)),
          endOfMonth(subMonths(new Date(), 13))
        ],
        // Last year
        [
          startOfYear(subYears(new Date(), 1)),
          endOfYear(subYears(new Date(), 1))          
        ],
        // Year before last year
        [
          startOfYear(subYears(new Date(), 2)),
          endOfYear(subYears(new Date(), 2))
        ]
      ]
    }
  },

  computed: {
    mode(): string {
      const dateDiff = differenceInDays(this.range.end, this.range.start)
      if (dateDiff <= 12) {
        return 'hourly'
      }
      else {
        return 'daily'
      }
    }
  },

  watch: {
    range(): void {
      // Set URL parameter
      this.$router.push({
        query: {
          t: `${format(this.range.start, 'yyyy-MM-dd')}/${format(this.range.end, 'yyyy-MM-dd')}`
        }
      })
      // Hide offcanvas
      const offcanvas = this.$bs.Offcanvas.getInstance(this.$refs.dateRange)
      if (offcanvas) {
        offcanvas.hide()
      }
      // Hide sub navbar menu
      const subnav = this.$bs.Collapse.getInstance(this.$refs.subnav)
      if (subnav) {
        subnav.hide()
      }
    }
  },

  mounted() {
    this.fetchNormalsData()
  },

  methods: {
    /**
     * Fetch climate normals data
     */
    async fetchNormalsData(): Promise<void> {
      // URL
      let url = `${this.$api}/app/proxy/`
      if (this.station) {
        url += `stations/normals?station=${this.station}`
      } else {
        url += `point/normals?lat=${this.lat}&lon=${this.lon}&alt=${this.alt}`
      }
      // Fetch data
      await fetch(url)
        .then(response => response.json())
        .then(data => this.normals = data.data)
    },

    updateSections(): void {
      (this.$refs as any).sections.update()
    },

    setRange(start: Date, end: Date): void {
      // Change range
      this.range = {
        start,
        end
      };
      // Change calendar month
      (this.$refs as any).calendar?.focusDate(start)
    }
  }
})
</script>

<i18n>
{
  "en": {
    "$meta": {
      "title": "Weather History"
    },
    "period": "Period",
    "dateRange": "Date Range",
    "today": "Today",
    "yesterday": "Yesterday",
    "lastWeek": "Last Week",
    "lastMonth": "Last Month"
  }
}
</i18n>