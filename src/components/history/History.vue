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
    <!-- Guide -->
    <Guide
      id="history"
      :text="t('$manual')"
    />
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
import { useSettingsStore } from '~/stores/settings'
import Sections from '../Sections.vue'
import Guide from '~/components/Guide.vue'
import Hourly from './dashboards/Hourly.vue'
import Daily from './dashboards/Daily.vue'

export default defineComponent({
  name: 'History',

  components: {
    Sections,
    Guide,
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
    const settings = useSettingsStore()

    // Meta tags
    useHead({
      title: `${props.name} | ${t('$meta.title')} | Meteostat`
    })

    return {
      t,
      settings,
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
      // Imperial units?
      if (this.settings.imperial) {
        url += '&units=imperial'
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
    "$manual": "Historical weather data is available in hourly and daily resolution. For all date ranges up to seven days, hourly data is shown. If you choose a longer period, Meteostat will switch to daily frequency. Please note that hourly and daily data do not always match. This can happen due to different aggregation methods or levels of detail.",
    "period": "Period",
    "dateRange": "Date Range",
    "today": "Today",
    "yesterday": "Yesterday",
    "lastWeek": "Last Week",
    "lastMonth": "Last Month"
  },
  "de": {
    "$meta": {
      "title": "Wetterrückblick"
    },
    "$manual": "Historische Wetterdaten sind in stündlicher und täglicher Auflösung verfügbar. Für alle Zeiträume bis zu sieben Tagen werden stündliche Daten angezeigt. Wenn Sie einen längeren Zeitraum wählen, schaltet Meteostat auf die tägliche Frequenz um. Bitte beachten Sie, dass stündliche und tägliche Daten nicht immer übereinstimmen. Dies kann aufgrund unterschiedlicher Aggregationsmethoden oder Detaillierungsgrade vorkommen.",
    "period": "Zeitraum",
    "dateRange": "Zeitraum",
    "today": "Heute",
    "yesterday": "Gestern",
    "lastWeek": "Letzte Woche",
    "lastMonth": "Letzter Monat"
  },
  "it": {
    "$meta": {
      "title": "Cronologia Meteo"
    },
    "$manual": "I dati meteo storici sono disponibili con risoluzione oraria e giornaliera. Per tutti gli intervalli di date fino a sette giorni, vengono mostrati dati orari. Se scegli un periodo più lungo, Meteostat passerà alla frequenza giornaliera. Si prega di notare che i dati orari e giornalieri non sempre corrispondono. Questo può accadere a causa di diversi metodi di aggregazione o livelli di dettaglio.",
    "period": "Periodo",
    "dateRange": "Intervallo di Date",
    "today": "Oggi",
    "yesterday": "Ieri",
    "lastWeek": "Settimana Scorsa",
    "lastMonth": "Ultimo Mese"
  },
  "es": {
    "$meta": {
      "title": "Historial Meteorológico"
    },
    "$manual": "Los datos meteorológicos históricos están disponibles en resolución horaria y diaria. Para todos los intervalos de fechas de hasta siete días, se muestran los datos horarios. Si elige un periodo más largo, Meteostat cambiará a la frecuencia diaria. Tenga en cuenta que los datos horarios y diarios no siempre coinciden. Esto puede ocurrir debido a diferentes métodos de agregación o niveles de detalle.",
    "period": "Period",
    "dateRange": "Rango de Fechas",
    "today": "Hoy",
    "yesterday": "Ayer",
    "lastWeek": "Última Semana",
    "lastMonth": "Último Mes"
  },
  "nl": {
    "$meta": {
      "title": "Weather History"
    },
    "$manual": "Historische weergegevens zijn beschikbaar in uurlijkse en dagelijkse resolutie. Voor alle datumbereiken tot zeven dagen, worden uurlijkse gegevens getoond. Als u een langere periode kiest, schakelt Meteostat over naar de dagelijkse frequentie. Houd er rekening mee dat uurlijkse en dagelijkse gegevens niet altijd overeenkomen. Dit kan gebeuren als gevolg van verschillende aggregatiemethoden of detailniveaus.",
    "period": "Periode",
    "dateRange": "Datumbereik",
    "today": "Vandaag",
    "gisteren": "Gisteren",
    "lastWeek": "Vorige week",
    "lastMonth": "Afgelopen Maand"
  },
  "fr": {
    "$meta" : {
      "title" : "Historique des Conditions Météorologiques"
    },
    "$manual" : "Les données météorologiques historiques sont disponibles en résolution horaire et quotidienne. Pour toutes les plages de dates jusqu'à sept jours, les données horaires sont affichées. Si vous choisissez une période plus longue, Meteostat passera à la fréquence quotidienne. Veuillez noter que les données horaires et quotidiennes ne correspondent pas toujours. Cela peut se produire en raison de différentes méthodes d'agrégation ou de niveaux de détail.",
    "période" : "Période",
    "dateRange" : "Plage de Dates",
    "today" : "Aujourd'hui",
    "yesterday" : "Hier",
    "lastWeek" : "Semaine Dernière",
    "lastMonth" : "Mois Dernier"
  },
  "pt": {
    "$meta": {
      "title": "História do Tempo"
    },
    "$manual": "Os dados meteorológicos históricos estão disponíveis em resolução horária e diária. Para todos os intervalos de datas até sete dias, os dados horários são mostrados. Se escolher um período mais longo, o Meteostat mudará para a frequência diária. Note-se que os dados horários e diários nem sempre coincidem. Isto pode acontecer devido a diferentes métodos de agregação ou níveis de detalhe.",
    "period": "Período",
    "dateRange": "Intervalo de Datas",
    "today": "Hoje",
    "yesterday": "Ontem",
    "lastWeek": "Última Semana",
    "lastMonth": "Último Mês"
  },
  "ru": {
    "$meta": {
      "title": "История погоды"
    },
    "$manual": "Исторические данные о погоде доступны в почасовом и ежедневном разрешении. Для всех диапазонов дат до семи дней отображаются почасовые данные. Если вы выберете более длительный период, Meteostat переключится на ежедневную частоту. Обратите внимание, что почасовые и суточные данные не всегда совпадают. Это может происходить из-за различных методов агрегирования или уровней детализации.",
    "period": "Период",
    "dateRange": "Диапазон дат",
    "today": "Сегодня",
    "yesterday": "Вчера",
    "lastWeek": "Последняя неделя",
    "lastMonth": "Последний месяц"
  }
}
</i18n>