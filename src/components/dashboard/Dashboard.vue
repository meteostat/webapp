<template>
  <!-- Toolbar -->
  <div class="toolbar">
    <div class="btn-group" role="group">
      <!-- Slot: toolbar-buttons -->
      <slot name="toolbarButtons" />
      <!-- Export Button -->
      <button
        class="btn btn-light"
        type="button"
        data-bs-toggle="modal"
        data-bs-target="#export-modal"
        :disabled="!dataCount"
        @click="loadExport = true"
      >
        <icon :icon="['fas', 'download']" />
        <span class="d-none d-xxl-inline ms-2">{{ t('export') }}</span>
      </button>
      <!-- Details Table Button -->
      <button
        class="btn btn-light me-1"
        type="button"
        data-bs-toggle="modal"
        data-bs-target="#details-modal"
        aria-controls="details-modal"
        :disabled="!dataCount"
        @click="loadDetails = true"
      >
        <icon :icon="['fas', 'table']" />
        <span class="d-none d-xxl-inline ms-2">{{ t('details') }}</span>
      </button>
    </div>
    <div class="ms-auto">
      <!-- Date Range Button -->
      <button
        v-if="range.start"
        class="btn btn-light px-4 px-md-3"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#dateRange"
        aria-controls="dateRange"
      >
        <icon :icon="['fas', 'calendar-alt']" />
        <span class="d-none d-md-inline ms-2">
          {{ format(range.start, t('dateFormat')) }} - {{ format(range.end, t('dateFormat')) }}
        </span>
      </button>
    </div>
  </div>

  <!-- Help Modal -->
  <Help :text="t('$manual')" />

  <!-- Main Dashboard -->
  <div class="mt-3">
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
        :load-export="loadExport"
        :load-details="loadDetails"
        @loaded="onLoaded"
      />
    </template>

    <!-- Daily Data -->
    <template v-else-if="range && mode === 'daily'">
      <Daily
        :station="station"
        :lat="lat"
        :lon="lon"
        :alt="alt"
        :range="[format(range.start, 'yyyy-MM-dd'), format(range.end, 'yyyy-MM-dd')]"
        :normals="normals"
        :load-export="loadExport"
        :load-details="loadDetails"
        @loaded="onLoaded"
      />
    </template>

    <!-- Ad (Bottom) -->
    <div class="my-3">
      <Ad slot-id="3216865845" />
    </div>

    <!-- Meteo Maps -->
    <section v-if="differenceInCalendarDays(new Date(), range.start) > 0" id="maps" ref="maps">
      <div class="card card-full-width mt-3 mt-md-4 p-3 bg-light rounded">
        <div class="card-header card-header-main px-0 rounded-0 bg-transparent">
          <h2 class="card-header-title lead">
            {{ t('maps') }}
          </h2>
        </div>
        <div class="card-body px-0">
          <disabled-content v-if="!mapsEnabled" @enable="mapsEnabled = true" />
          <Maps v-if="mapsEnabled" :lat="lat" :lon="lon" :range="[range.start, range.end]" />
        </div>
      </div>
    </section>

    <!-- Climate Data -->
    <section id="climate" ref="climate">
      <div class="card card-full-width mt-3 mt-md-4 p-3 bg-light rounded">
        <div class="card-header card-header-main px-0 rounded-0 bg-transparent">
          <h2 class="card-header-title lead">
            {{ t('climate') }}
          </h2>
        </div>
        <div class="card-body px-0">
          <Climate :normals="normals" :key="`${station}-${normals?.length}`" />
        </div>
      </div>
    </section>
  </div>

  <!-- Date Range Offcanvas -->
  <div id="dateRange" ref="dateRange" class="offcanvas offcanvas-end" tabindex="-1">
    <div class="offcanvas-header">
      <h5 class="offcanvas-title">
        {{ t('dateRange') }}
      </h5>
      <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" :aria-label="t('close')" />
    </div>
    <div class="offcanvas-body">
        <DatePicker
          ref="calendar"
          v-model="range"
          show-weeknumbers="right"
          :locale="t('locale')"
          color="gray"
          :attributes="pickerAttrs"
          is-range
          expanded
          :max-date="addDays(new Date(), 7)"
        />
      <div class="container p-0 mt-4">
        <div class="row row-cols-3 g-1 text-center">
          <div class="col">
            <a
              class="d-flex align-items-center justify-content-center bg-light p-2 h-100"
              @click="setRange(suggestions[0], suggestions[0])"
            >
              {{ t('today') }}
            </a>
          </div>
          <div class="col">
            <a
              class="d-flex align-items-center justify-content-center bg-light p-2 h-100"
              @click="setRange(suggestions[1], suggestions[1])"
            >
              {{ t('yesterday') }}
            </a>
          </div>
          <div class="col">
            <a
              class="d-flex align-items-center justify-content-center bg-light p-2 h-100"
              @click="setRange(suggestions[2][0], suggestions[2][1])"
            >
              {{ t('lastWeek') }}
            </a>
          </div>
          <div class="col">
            <a
              class="d-flex align-items-center justify-content-center bg-light p-2 h-100"
              @click="setRange(suggestions[3][0], suggestions[3][1])"
            >
              {{ t('lastMonth') }}
            </a>
          </div>
          <div class="col">
            <a
              class="d-flex align-items-center justify-content-center bg-light p-2 h-100"
              @click="setRange(suggestions[4][0], suggestions[4][1])"
            >
              {{ format(suggestions[4][0], 'MMM yyyy') }}
            </a>
          </div>
          <div class="col">
            <a
              class="d-flex align-items-center justify-content-center bg-light p-2 h-100"
              @click="setRange(suggestions[5][0], suggestions[5][1])"
            >
              {{ format(suggestions[5][0], 'MMM yyyy') }}
            </a>
          </div>
          <div class="col">
            <a
              class="d-flex align-items-center justify-content-center bg-light p-2 h-100"
              @click="setRange(suggestions[6][0], suggestions[6][1])"
            >
              {{ format(suggestions[6][0], 'MMM yyyy') }}
            </a>
          </div>
          <div class="col">
            <a
              class="d-flex align-items-center justify-content-center bg-light p-2 h-100"
              @click="setRange(suggestions[7][0], suggestions[7][1])"
            >
              {{ format(suggestions[7][0], 'yyyy') }}
            </a>
          </div>
          <div class="col">
            <a
              class="d-flex align-items-center justify-content-center bg-light p-2 h-100"
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
import { defineComponent, defineAsyncComponent } from 'vue';
import { useI18n } from 'vue-i18n';
import { useHead } from '@unhead/vue';
import { dashboardTitle } from '~/seo/meta';
import {
  parseISO,
  format,
  differenceInDays,
  subDays,
  addDays,
  subMonths,
  subYears,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  startOfYear,
  endOfYear,
  differenceInCalendarDays
} from 'date-fns';
import { useSettingsStore } from '~/stores/settings';
import Help from '~/components/Help.vue';
import Ad from '~/components/Ad.vue';
import DisabledContent from '~/components/alerts/DisabledContent.vue';

/**
 * Async Components
 */
const Hourly = defineAsyncComponent(() => import('./dashboards/Hourly.vue'));
const Daily = defineAsyncComponent(() => import('./dashboards/Daily.vue'));
const Maps = defineAsyncComponent(() => import('./Maps.vue'));
const Climate = defineAsyncComponent(() => import('./Climate.vue'));

export default defineComponent({
  name: 'Dashboard',

  emits: ['loaded'],

  components: {
    Help,
    Hourly,
    Daily,
    DisabledContent,
    Maps,
    Climate,
    Ad
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
    const { t, locale } = useI18n();
    const settings = useSettingsStore();

    // Meta tags
    useHead({
      title: dashboardTitle(props.name, locale.value)
    });

    return {
      t,
      settings,
      format,
      subDays,
      addDays,
      subMonths,
      subYears,
      startOfWeek,
      endOfWeek,
      startOfMonth,
      endOfMonth,
      startOfYear,
      endOfYear,
      differenceInCalendarDays
    };
  },

  data(): Record<string, any> {
    return {
      mapsEnabled: false,
      loadExport: false,
      loadDetails: false,
      dataCount: 0,
      range: this.getRangeFromQuery(),
      pickerAttrs: [
        {
          key: 'today',
          highlight: {
            color: 'blue',
            fillMode: 'light'
          },
          dates: new Date()
        }
      ],
      normals: null,
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
        [startOfMonth(subMonths(new Date(), 1)), endOfMonth(subMonths(new Date(), 1))],
        // Month before last month
        [startOfMonth(subMonths(new Date(), 2)), endOfMonth(subMonths(new Date(), 2))],
        // This month last year
        [startOfMonth(subMonths(new Date(), 12)), endOfMonth(subMonths(new Date(), 12))],
        // Last month a year ago
        [startOfMonth(subMonths(new Date(), 13)), endOfMonth(subMonths(new Date(), 13))],
        // Last year
        [startOfYear(subYears(new Date(), 1)), endOfYear(subYears(new Date(), 1))],
        // Year before last year
        [startOfYear(subYears(new Date(), 2)), endOfYear(subYears(new Date(), 2))]
      ]
    };
  },

  computed: {
    mode(): string {
      const dateDiff = differenceInDays(this.range.end, this.range.start);
      if (dateDiff <= 11) {
        return 'hourly';
      } else {
        return 'daily';
      }
    }
  },

  watch: {
    range(): void {
      // Set URL parameter
      if (['Station', 'Place'].includes(this.$route.name as string)) {
        this.$router.push({
          query: this.getUpdatedQuery()
        });
        // Hide offcanvas
        this.$bs.Offcanvas.default.getInstance(this.$refs.dateRange)?.hide();
        // Hide sub navbar menu
        this.$bs.Collapse.default.getInstance(this.$refs.subnav)?.hide();
      }
    },

    '$route.query.t': {
      handler() {
        const range = this.getRangeFromQuery();
        if (
          this.range?.start?.toDateString() !== range?.start?.toDateString() ||
          this.range?.end?.toDateString() !== range?.end?.toDateString()
        ) {
          this.range = range;
          (this.$refs as any).calendar?.move(range.start);
        }
      }
    }
  },

  mounted() {
    this.fetchNormalsData();
    // Set URL parameter
    const rawQuery = {
      ...this.getUpdatedQuery(),
      s: this.$route.name === 'Place' ? this.station : undefined
    };
    const query = Object.keys(rawQuery)
      .sort()
      .reduce((res: Record<string, string>, key: string) => ((res[key] = rawQuery[key]), res), {});
    // Update
    if (this.$route.query.t) {
      this.$router.push({ query });
    } else {
      this.$router.replace({ query });
    }
  },

  methods: {
    /**
     * Fetch climate normals data
     */
    async fetchNormalsData(): Promise<void> {
      // URL
      let url = `${this.$api}/app/proxy/stations/normals?station=${this.station}`;
      // Imperial units?
      if (this.settings.imperial) {
        url += '&units=imperial';
      }
      // Fetch data
      await fetch(url)
        .then((response) => response.json())
        .then((data) => {
          this.normals = data.data;
        });
    },

    getUpdatedQuery(): any {
      return {
        ...this.$route.query,
        t: `${format(this.range.start, 'yyyy-MM-dd')}/${format(this.range.end, 'yyyy-MM-dd')}`
      };
    },

    getRangeFromQuery(): Record<string, Date> {
      const t = this.$route.query.t as string;
      let start, end;
      if (t) {
        start = parseISO(t.substring(0, 10));
        end = parseISO(t.substring(11, 22));
      } else {
        start = subDays(new Date(), 14);
        end = subDays(new Date(), 7);
      }
      return { start, end };
    },

    setRange(start: Date, end: Date): void {
      // Change range
      this.range = {
        start,
        end
      };
      // Change calendar month
      (this.$refs as any).calendar?.move(start);
    },

    onLoaded(dataCount: number): void {
      this.dataCount = dataCount;
      this.$emit('loaded');
    }
  }
});
</script>

<style lang="scss">
@import 'bootstrap/scss/functions';
@import 'bootstrap/scss/variables';
@import 'bootstrap/scss/mixins';
@import '~/style/toolbar.scss';

.card-full-width {
  @include media-breakpoint-down(sm) {
    margin: 0 -0.75rem;
    border: 0;
    border-radius: 0 !important;
  }
}
</style>

<i18n>
{
  "en": {
    "$manual": "Historical weather data is available in hourly and daily resolution. For date ranges of up to twelve days, hourly data is shown. For longer periods, Meteostat switches to daily data. Please note that hourly and daily data do not always match, as they may be based on different aggregation methods and levels of detail.",
    "dateRange": "Date Range",
    "today": "Today",
    "yesterday": "Yesterday",
    "lastWeek": "Last Week",
    "lastMonth": "Last Month"
  },
  "de": {
    "$manual": "Historische Wetterdaten sind in stündlicher und täglicher Auflösung verfügbar. Für Zeiträume bis zu zwölf Tagen werden stündliche Daten angezeigt. Bei längeren Zeiträumen wechselt Meteostat zu Tageswerten. Bitte beachten Sie, dass stündliche und tägliche Daten nicht immer übereinstimmen, da sie auf unterschiedlichen Aggregationsmethoden und Detailstufen beruhen können.",
    "dateRange": "Zeitraum",
    "today": "Heute",
    "yesterday": "Gestern",
    "lastWeek": "Letzte Woche",
    "lastMonth": "Letzter Monat"
  },
  "it": {
    "$manual": "I dati meteo storici sono disponibili con risoluzione oraria e giornaliera. Per intervalli fino a dodici giorni vengono mostrati i dati orari. Per periodi più lunghi, Meteostat passa ai dati giornalieri. Tieni presente che i dati orari e giornalieri non sempre coincidono, poiché possono basarsi su metodi di aggregazione e livelli di dettaglio diversi.",
    "dateRange": "Intervallo di date",
    "today": "Oggi",
    "yesterday": "Ieri",
    "lastWeek": "Settimana scorsa",
    "lastMonth": "Mese scorso"
  },
  "es": {
    "$manual": "Los datos meteorológicos históricos están disponibles con resolución horaria y diaria. Para periodos de hasta doce días se muestran datos horarios. Para periodos más largos, Meteostat cambia a datos diarios. Ten en cuenta que los datos horarios y diarios no siempre coinciden, ya que pueden basarse en métodos de agregación y niveles de detalle diferentes.",
    "dateRange": "Rango de fechas",
    "today": "Hoy",
    "yesterday": "Ayer",
    "lastWeek": "Semana pasada",
    "lastMonth": "Mes pasado"
  },
  "nl": {
    "$manual": "Historische weergegevens zijn beschikbaar per uur en per dag. Voor periodes tot twaalf dagen worden uurgegevens getoond. Bij langere periodes schakelt Meteostat over op daggegevens. Houd er rekening mee dat uur- en daggegevens niet altijd overeenkomen, omdat ze op verschillende aggregatiemethoden en detailniveaus kunnen berusten.",
    "dateRange": "Datumbereik",
    "today": "Vandaag",
    "lastWeek": "Vorige week",
    "lastMonth": "Vorige maand",
    "yesterday": "Gisteren"
  },
  "fr": {
    "$manual": "Les données météo historiques sont disponibles en résolution horaire et journalière. Pour les périodes allant jusqu'à douze jours, les données horaires sont affichées. Pour les périodes plus longues, Meteostat passe aux données journalières. Veuillez noter que les données horaires et journalières ne concordent pas toujours, car elles peuvent reposer sur des méthodes d'agrégation et des niveaux de détail différents.",
    "dateRange": "Plage de dates",
    "today": "Aujourd'hui",
    "yesterday": "Hier",
    "lastWeek": "Semaine dernière",
    "lastMonth": "Mois dernier"
  },
  "pt": {
    "$manual": "Os dados meteorológicos históricos estão disponíveis com resolução horária e diária. Para períodos até doze dias são apresentados dados horários. Para períodos mais longos, o Meteostat passa a apresentar dados diários. Tenha em atenção que os dados horários e diários nem sempre coincidem, pois podem basear-se em métodos de agregação e níveis de detalhe diferentes.",
    "dateRange": "Intervalo de datas",
    "today": "Hoje",
    "yesterday": "Ontem",
    "lastWeek": "Semana passada",
    "lastMonth": "Mês passado"
  },
  "ru": {
    "$manual": "Исторические данные о погоде доступны с почасовым и суточным разрешением. Для периодов до двенадцати дней показываются почасовые данные. Для более длинных периодов Meteostat переключается на суточные данные. Обратите внимание, что почасовые и суточные данные не всегда совпадают, так как могут основываться на разных методах агрегирования и уровнях детализации.",
    "dateRange": "Диапазон дат",
    "today": "Сегодня",
    "yesterday": "Вчера",
    "lastWeek": "Прошлая неделя",
    "lastMonth": "Прошлый месяц"
  }
}
</i18n>
