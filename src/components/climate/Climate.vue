<template>
  <template v-if="periods.length > 0 && normals && anyData()">
    <!-- Toolbar -->
    <div class="d-flex mt-n2 py-2 sticky-top bg-white">
      <!-- Sections -->
      <Sections ref="sections" />
      <!-- Reference Periods -->
      <div class="ms-auto">
        <div class="dropdown">
          <button
            class="btn btn-light dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <icon :icon="['fas', 'history']" />
            <span class="ms-2">
              <template v-if="activePeriod === null">{{ t('latest') }}</template>
              <template v-else>{{ activePeriod }} - {{ activePeriod + 29 }}</template>
            </span>
          </button>
          <ul class="dropdown-menu">
            <li>
              <a
                :class="{ active: activePeriod === null }"
                class="dropdown-item"
                @click="setPeriod(null)"
              >{{ t('latest') }}</a>
            </li>
            <li><hr class="dropdown-divider"></li>
            <li
              v-for="period in periods"
              :key="period.start"
            >
              <a
                :class="{ active: period.start === activePeriod }"
                class="dropdown-item"
                @click="setPeriod(period.start)"
              >{{ period.start }} - {{ period.end }}</a>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="mt-2 pt-1">
      <!-- Guide -->
      <Guide
        id="climate"
        :text="t('$manual')"
      />
      <!-- Interpolation Info -->
      <InterpolationAlert
        v-if="!station"
        :stations="meta.stations"
      />
      <!-- Briefing -->
      <div class="row">
        <div class="col-6 pe-1 pe-md-3">
          <!-- Average Temperature -->
          <div
            class="card d-flex flex-row overflow-hidden py-1 rounded shadow-sm card-kpi card-temp h-100"
          >
            <div class="card-body py-2">
              <h5 class="card-title">
                <template v-if="tavgKPI !== null && anyColData('tavg')">
                  {{ tavgKPI }}
                  <small class="text-muted ms-1">°C</small>
                </template>
                <template v-else>
                  <span class="text-muted">{{ t('$phrases.noData') }}</span>
                </template>
              </h5>
              <span class="card-text text-muted text-truncate">{{ t('$params.tavg') }}</span>
            </div>
            <div class="card-icon d-none d-lg-block">
              <icon :icon="['fas', 'temperature-high']" />
            </div>
          </div>
        </div>
        <div class="col-6 ps-1 ps-md-3">
          <!-- Total Precipitation -->
          <div
            class="card d-flex flex-row overflow-hidden py-1 rounded shadow-sm card-kpi card-prcp h-100"
          >
            <div class="card-body py-2">
              <h5 class="card-title">
                <template v-if="prcpKPI !== null && anyColData('prcp')">
                  {{ prcpKPI }}
                  <small class="text-muted ms-1">mm</small>
                </template>
                <template v-else>
                  <span class="text-muted">{{ t('$phrases.noData') }}</span>
                </template>
              </h5>
              <span class="card-text text-muted text-truncate">{{ t('$params.prcp') }}</span>
            </div>
            <div class="card-icon d-none d-lg-block">
              <icon :icon="['fas', 'umbrella']" />
            </div>
          </div>
        </div>
      </div>

      <div class="my-3">
        <Ad slot="1641693690" />
      </div>

      <div
        id="sections"
        class="mt-4"
      >
        <!-- Temperature Chart -->
        <section
          v-if="anyColData('tavg') || anyColData('tmin') || anyColData('tmax')"
          id="temp"
          class="card mt-3 mt-md-4"
        >
          <div class="card-header card-header-main px-0 rounded-0 bg-white">
            <h2 class="card-header-title lead">
              {{ t('$meteo.temp') }}
            </h2>
          </div>
          <div class="card-body px-0">
            <Chart
              type="line"
              :data="tempChart.data"
              :options="tempChart.options"
            />
          </div>
        </section>
        <!-- Precipitation Chart -->
        <section
          v-if="anyColData('prcp')"
          id="prcp"
          class="card mt-3 mt-md-4"
        >
          <div class="card-header card-header-main px-0 rounded-0 bg-white">
            <h2 class="card-header-title lead">
              {{ t('$meteo.prcp') }}
            </h2>
          </div>
          <div class="card-body px-0">
            <Chart
              type="bar"
              :data="prcpChart.data"
              :options="prcpChart.options"
            />
          </div>
        </section>
        <!-- Wind Speed Chart -->
        <section
          v-if="anyColData('wspd')"
          id="wspd"
          class="card mt-3 mt-md-4"
        >
          <div class="card-header card-header-main px-0 rounded-0 bg-white">
            <h2 class="card-header-title lead">
              {{ t('$params.wspd') }}
            </h2>
          </div>
          <div class="card-body px-0">
            <Chart
              type="line"
              :data="wspdChart.data"
              :options="wspdChart.options"
            />
          </div>
        </section>
        <!-- Air Pressure Chart -->
        <section
          v-if="anyColData('pres')"
          id="pres"
          class="card mt-3 mt-md-4"
        >
          <div class="card-header card-header-main px-0 rounded-0 bg-white">
            <h2 class="card-header-title lead">
              {{ t('$params.pres') }}
            </h2>
          </div>
          <div class="card-body px-0">
            <Chart
              type="bar"
              :data="presChart.data"
              :options="presChart.options"
            />
          </div>
        </section>
        <!-- Sunshine Chart -->
        <section
          v-if="anyColData('tsun')"
          id="tsun"
          class="card mt-3 mt-md-4"
        >
          <div class="card-header card-header-main px-0 rounded-0 bg-white">
            <h2 class="card-header-title lead">
              {{ t('$params.tsun') }}
            </h2>
          </div>
          <div class="card-body px-0">
            <Chart
              type="bar"
              :data="tsunChart.data"
              :options="tsunChart.options"
            />
          </div>
        </section>
      </div>
    </div>
  </template>
  <!-- No Data -->
  <template v-else-if="meta.generated">
    <NoData />
  </template>
</template>

<script lang="ts">
import { defineComponent, defineAsyncComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useHead } from '@vueuse/head'
import { Store } from 'pinia'
import { useSettingsStore } from '~/stores/settings'
import { ChartDefinitionInterface } from '~/utils/interfaces'
import DataMixin from '../Location.mixin'
import { tsTooltips } from '~/components/charts/timeseries.config'
import Sections from '../Sections.vue'
import Guide from '~/components/Guide.vue'
import Ad from '~/components/Ad.vue'
import Chart from '../charts/Chart.vue'

/**
 * Async Components
 */
const InterpolationAlert = defineAsyncComponent(() =>
  import('~/components/alerts/Interpolation.vue')
)
const NoData = defineAsyncComponent(() =>
  import('./NoData.vue')
)

export default defineComponent({
  name: 'Climate',

  components: {
    Sections,
    InterpolationAlert,
    Chart,
    NoData,
    Guide,
    Ad
  },

  mixins: [DataMixin],

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
    }
  },

  setup(props: Record<string, any>): Record<string, (Store|Array<string>|any)> {
    // Translations
    const { t } = useI18n()

    // Store
    const settings = useSettingsStore()

    // Meta tags
    useHead({
      title: `${props.name} | ${t('$meta.title')} | Meteostat`
    })

    return {
      t,
      settings
    }
  },

  data(): Record<string, any> {
    return {
      meta: {},
      normals: null,
      activePeriod: null
    }
  },

  computed: {
    periods(): Array<Record<string, number>> {
      const periods: Array<Record<string, number>> = []
      this.normals?.forEach((record: any): void => {
        if (!periods.map(period => period.start).includes(record.start)) {
          periods.push({
            start: record.start,
            end: record.end
          })
        }
      })
      return periods
    },

    data(): any {
      let data: Record<string, any> = []
      if (this.activePeriod === null) {
        this.normals?.forEach((record: any): void => {
          data[record.month - 1] = {
            tavg: record.tavg || data[record.month - 1]?.tavg || null,
            tmin: record.tmin || data[record.month - 1]?.tmin || null,
            tmax: record.tmax || data[record.month - 1]?.tmax || null,
            wspd: record.wspd || data[record.month - 1]?.wspd || null,
            prcp: record.prcp || data[record.month - 1]?.prcp || null,
            pres: record.pres || data[record.month - 1]?.pres || null,
            tsun: record.tsun || data[record.month - 1]?.tsun || null
          }
        })
      }
      else {
        data = this.normals?.filter((record: any): boolean => {
          return record.start === this.activePeriod
        })
      }
      return data
    },

    tavgKPI(): string|null {
      const tavg = this.fetchValues('tavg').filter(t => t !== null)
      if (tavg.length > 0) {
        const sum = tavg.reduce((a, b) => Number(a) + Number(b), 0)
        const avg = (Number(sum) / tavg.length);
        return avg.toFixed(1)
      }
      return null
    },

    prcpKPI(): null|string {
      const prcp = this.fetchValues('prcp').filter(p => p !== null)
      if (prcp.length > 0) {
        const sum = prcp.reduce((a, b) => Number(a) + Number(b), 0)
        return Number(sum).toFixed(1)
      }
      return null
    },

    /**
     * Configuration for temperature chart
     * 
     * @returns {Object} Configuration object
     */
    tempChart(): ChartDefinitionInterface {
      return {
        data: {
          labels: [...Array(12).keys()].map(key => this.t(`$months[${key}]`)),
          datasets: [{
            label: this.t('$params.tavg'),
						type: 'line',
						fill: false,
						lineTension: 0.1,
						borderColor: "rgb(85,85,85)",
            backgroundColor: "rgb(85,85,85)",
						pointBorderColor: "rgb(255,255,255)",
						data: this.fetchValues('tavg')
					}, {
            label: this.t('$params.tmin'),
						type: 'bar',
						backgroundColor: "rgba(51,122,183,0.8)",
						data: this.fetchValues('tmin')
					}, {
            label: this.t('$params.tmax'),
						type: 'bar',
						backgroundColor: "rgba(217,83,79,0.8)",
						data: this.fetchValues('tmax')
					}]
        },
        options: {
          scales: {
            y: {
              title: {
                text: this.settings.units.temp
              }
            }
          },
          plugins: {
            tooltip: tsTooltips
          }
        }
      }
    },

    /**
     * Configuration for precipitation chart
     * 
     * @returns {Object} Configuration object
     */
    prcpChart(): ChartDefinitionInterface {
      return {
        data: {
          labels: [...Array(12).keys()].map(key => this.t(`$months[${key}]`)),
          datasets: [{
            label: this.t('$params.prcp'),
            borderWidth: 2,
            borderColor: "rgb(91,192,222)",
            backgroundColor: "rgb(91,192,222)",
            data: this.fetchValues('prcp')
          }]
        },
        options: {
          scales: {
            y: {
              title: {
                text: this.settings.units.prcp
              }
            }
          },
          plugins: {
            tooltip: tsTooltips
          }
        }
      }
    },

    /**
     * Configuration for wind speed chart
     * 
     * @returns {Object} Configuration object
     */
    wspdChart(): ChartDefinitionInterface {
      return {
        data: {
          labels: [...Array(12).keys()].map(key => this.t(`$months[${key}]`)),
          datasets: [{
            label: this.t('$params.wspd'),
            borderWidth: 2,
            borderColor: "rgb(51,122,183)",
            backgroundColor: "rgb(51,122,183)",
            fill: false,
            pointBorderColor: "rgb(255,255,255)",
            pointRadius: 4,
            data: this.fetchValues('wspd')
          }]
        },
        options: {
          scales: {
            y: {
              title: {
                text: this.settings.units.wspd
              }
            }
          },
          plugins: {
            tooltip: tsTooltips
          }
        }
      }
    },

    /**
     * Configuration for air pressure chart
     * 
     * @returns {Object} Configuration object
     */
    presChart(): ChartDefinitionInterface {
      return {
        data: {
          labels: [...Array(12).keys()].map(key => this.t(`$months[${key}]`)),
          datasets: [{
            label: this.t('$params.pres'),
            borderWidth: 2,
            borderColor: "rgb(92,184,92)",
            backgroundColor: "rgb(92,184,92)",
            fill: false,
            data: this.fetchValues('pres')
          }]
        },
        options: {
          scales: {
            y: {
              title: {
                text: 'hPa'
              },
              beginAtZero: false
            }
          },
          plugins: {
            tooltip: tsTooltips
          }
        }
      }
    },

    /**
     * Configuration for sunshine duration chart
     * 
     * @returns {Object} Configuration object
     */
    tsunChart(): ChartDefinitionInterface {
      return {
        data: {
          labels: [...Array(12).keys()].map(key => this.t(`$months[${key}]`)),
          datasets: [{
            label: this.t('$params.tsun'),
            borderWidth: 2,
            borderColor: "rgb(253,126,20)",
            backgroundColor: "rgb(253,126,20)",
            data: this.fetchValues('tsun')
          }]
        },
        options: {
          scales: {
            y: {
              title: {
                text: 'm'
              }
            }
          },
          plugins: {
            tooltip: tsTooltips
          }
        }
      }
    }
  },

  async mounted() {
    await this.fetchNormalsData()
  },

  updated(): void {
   // Update sections
   (this.$refs as any).sections?.update()
  },

  methods: {
    /**
     * Fetch climate normals data
     */
    async fetchNormalsData(): Promise<void> {
      // Set loading state
      this.$loading('normals')
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
        .then(data => {
          this.meta = data.meta
          this.normals = data.data
        })
        .finally(() => this.$loaded('normals'))
    },

    setPeriod(period: number): void {
      this.activePeriod = period
    }
  }
})
</script>

<i18n>
{
  "en": {
    "$meta": {
      "title": "Climate Data"
    },
    "latest": "Latest",
    "$manual": "Climate data provides information on the typical weather at a location. The normals are usually based on a period of 30 years. At Meteostat you can view data for all available reference periods. Inconsistencies can occur between the individual periods, as not all statistics were generated using the same methods.",
    "$months": [
      "JAN",
      "FEB",
      "MAR",
      "APR",
      "MAY",
      "JUN",
      "JUL",
      "AUG",
      "SEP",
      "OCT",
      "NOV",
      "DEC"
    ]
  },
  "de": {
    "$meta": {
      "title": "Klimadaten"
    },
    "latest": "Neueste",
    "$manual": "Klimadaten liefern Informationen über das typische Wetter an einem Ort. Die Normalwerte beziehen sich in der Regel auf einen Zeitraum von 30 Jahren. Bei Meteostat können Sie die Daten für alle verfügbaren Referenzzeiträume einsehen. Zwischen den einzelnen Zeiträumen kann es zu Inkonsistenzen kommen, da nicht alle Statistiken mit den gleichen Methoden erstellt wurden.",
    "$months": [
      "JAN",
      "FEB",
      "MAR",
      "APR",
      "MAI",
      "JUN",
      "JUL",
      "AUG",
      "SEP",
      "OKT",
      "NOV",
      "DEZ"
    ]
  },
  "it": {
    "$meta": {
      "title": "Dati climatici"
    },
    "latest": "Ultimo",
    "$manual": "I dati climatici forniscono informazioni sul tempo tipico di una località. Le norme sono solitamente basate su un periodo di 30 anni. Su Meteostat è possibile visualizzare i dati per tutti i periodi di riferimento disponibili. Possono verificarsi incongruenze tra i singoli periodi, poiché non tutte le statistiche sono state generate con gli stessi metodi.",
    "$months": [
      "JAN",
      "FEB",
      "MAR",
      "APR",
      "MAY",
      "JUN",
      "JUL",
      "AUG",
      "SEP",
      "OCT",
      "NOV",
      "DEC"
    ]
  },
  "es": {
    "$meta": {
      "title": "Datos Climáticos"
    },
    "latest": "Más Reciente",
    "$manual": "Los datos climáticos proporcionan información sobre el tiempo típico en un lugar. Los valores normales suelen basarse en un periodo de 30 años. En Meteostat puede ver los datos de todos los períodos de referencia disponibles. Pueden producirse incoherencias entre los distintos períodos, ya que no todas las estadísticas se generaron con los mismos métodos.",
    "$months": [
      "JAN",
      "FEB",
      "MAR",
      "APR",
      "MAY",
      "JUN",
      "JUL",
      "AUG",
      "SEP",
      "OCT",
      "NOV",
      "DEC"
    ]
  },
  "nl": {
    "$meta": {
      "title": "Climate Data"
    },
    "latest": "Laatste",
    "$manual": "Klimaatgegevens geven informatie over het typische weer op een locatie. De normalen zijn meestal gebaseerd op een periode van 30 jaar. Bij Meteostat kunt u gegevens bekijken voor alle beschikbare referentieperioden. Er kunnen inconsistenties optreden tussen de afzonderlijke perioden, omdat niet alle statistieken volgens dezelfde methoden zijn gegenereerd.",
    "$months": [
      "JAN",
      "FEB",
      "MAR",
      "APR",
      "MAY",
      "JUN",
      "JUL",
      "AUG",
      "SEP",
      "OCT",
      "NOV",
      "DEC"
    ]
  },
  "fr": {
    "$meta" : {
      "title" : "Données Climatiques"
    },
    "latest" : "Les plus récents",
    "$manual" : "Les données climatiques fournissent des informations sur les conditions météorologiques typiques d'un lieu. Les normales sont généralement basées sur une période de 30 ans. Sur Meteostat, vous pouvez consulter les données pour toutes les périodes de référence disponibles. Des incohérences peuvent apparaître entre les différentes périodes, car toutes les statistiques n'ont pas été générées en utilisant les mêmes méthodes.",
    "$months": [
      "JAN",
      "FEB",
      "MAR",
      "APR",
      "MAY",
      "JUN",
      "JUL",
      "AUG",
      "SEP",
      "OCT",
      "NOV",
      "DEC"
    ]
  },
  "pt": {
    "$meta": {
      "title": "Dados Climáticos"
    },
    "latest": "Mais Recente",
    "$manual": "Os dados climáticos fornecem informações sobre o tempo típico de um local. As normas são normalmente baseadas num período de 30 anos. No Meteostat é possível visualizar dados para todos os períodos de referência disponíveis. Podem ocorrer inconsistências entre os períodos individuais, uma vez que nem todas as estatísticas foram geradas utilizando os mesmos métodos.",
    "$months": [
      "JAN",
      "FEB",
      "MAR",
      "APR",
      "MAY",
      "JUN",
      "JUL",
      "AUG",
      "SEP",
      "OCT",
      "NOV",
      "DEC"
    ]
  },
  "ru": {
    "$meta": {
      "title": "Климатические данные"
    },
    "latest": "Последние",
    "$manual": "Климатические данные предоставляют информацию о типичной погоде в том или ином месте. Нормальные показатели обычно основываются на периоде в 30 лет. В Meteostat вы можете просмотреть данные за все доступные периоды. Между отдельными периодами могут возникать несоответствия, поскольку не все статистические данные были получены с использованием одних и тех же методов.",
    "$months": [
      "JAN",
      "FEB",
      "MAR",
      "APR",
      "MAY",
      "JUN",
      "JUL",
      "AUG",
      "SEP",
      "OCT",
      "NOV",
      "DEC"
    ]
  }
}
</i18n>