<template>
  <div v-if="activeParameter" class="card mt-3 mt-md-4 p-3 rounded bg-light">
    <div class="card-header card-header-main px-0 rounded-0 bg-light d-flex align-items-center">
      <h2 class="card-header-title lead">
        {{ t('climate') }}
      </h2>
      <span
        class="badge border text-dark ms-auto mb-3"
        v-tooltip="t('$params.tavg')"
      >
        {{ tavgKPI ? `${tavgKPI} ${this.settings.units.temp}` : '—'  }}
      </span>
      <span
        class="badge border text-dark ms-1 mb-3"
        v-tooltip="t('$params.prcp')"
      >
        {{ prcpKPI ? `${prcpKPI} ${this.settings.units.prcp}` : '—'  }}
      </span>
    </div>
    <div
      class="card-body px-0"
    >
      <div
        ref="wrapper"
        class="wrapper"
      >
        <div class="d-flex align-items-center">
          <div class="dropdown">
            <button
              id="dropdownMenuButton"
              class="btn btn-light bg-white dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {{ t(`$params.${activeParameter}`) }}
            </button>
            <ul
              class="dropdown-menu"
              aria-labelledby="dropdownMenuButton"
            >
              <li v-for="chart in charts" :key="chart.id">
                <a
                  class="dropdown-item"
                  :class="{ disabled: !anyColData(chart.params || chart), active: activeParameter === chart.id }"
                  @click="setParameter(chart.id)"
                >
                  {{ t(`$params.${chart.id}`) }}
                </a>                
              </li>
            </ul>
          </div>
          <div class="d-flex align-items-center ms-auto">
            <!-- Reference Periods Dropdown -->
            <div class="dropdown d-inline-block">
              <button
                class="btn btn-light bg-white dropdown-toggle px-4 px-md-3"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <template v-if="activePeriod === null">{{ t('latest') }}</template>
                <template v-else>{{ activePeriod }} - {{ activePeriod + 29 }}</template>
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
        <div class="mt-4">
          <Chart
            ref="chart"
            :type="getChartConfig(activeParameter).type"
            :data="getChartConfig(activeParameter).data"
            :options="getChartConfig(activeParameter).options"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { Store } from 'pinia'
import { useSettingsStore } from '~/stores/settings'
import { ChartDefinitionInterface } from '~/utils/interfaces'
import { tsTooltips } from '~/components/charts/timeseries.config'
import Chart from '../charts/Chart.vue'
import DataMixin from '../Data.mixin'

export default defineComponent({
  name: 'Climate',

  components: {
    Chart
  },

  mixins: [DataMixin],

  props: {
    normals: {
      type: Object,
      default: null
    }
  },

  setup(): Record<string, (Store|Array<string>|any)> {
    // Translations
    const { t } = useI18n()

    // Store
    const settings = useSettingsStore()

    const charts: Array<Record<string, string | string[]> | string> = [
      {
        id: 'temp',
        params: ['tavg', 'tmin', 'tmax']
      },
      {
        id: 'prcp',
        params: 'prcp'
      },
      {
        id: 'wspd',
        params: 'wspd'
      },
      {
        id: 'pres',
        params: 'pres'
      },
      {
        id: 'tsun',
        params: 'tsun'
      }
    ]

    return {
      t,
      settings,
      charts
    }
  },

  data(): Record<string, any> {
    return {
      meta: {},
      activePeriod: null,
      activeParameter: null
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
      const tavg = this.fetchValues('tavg').filter((t: any) => t !== null)
      if (tavg.length > 0) {
        const sum = tavg.reduce((a: any, b: any) => Number(a) + Number(b), 0)
        const avg = (Number(sum) / tavg.length);
        return avg.toFixed(1)
      }
      return null
    },

    prcpKPI(): null|string {
      const prcp = this.fetchValues('prcp').filter((p: any) => p !== null)
      if (prcp.length > 0) {
        const sum = prcp.reduce((a: any, b: any) => Number(a) + Number(b), 0)
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
        type: 'line',
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
        type: 'bar',
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
        type: 'line',
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
        type: 'bar',
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
        type: 'bar',
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

  methods: {
    setPeriod(period: number): void {
      this.activePeriod = period
    },

    setParameter(param: string): void {
      this.activeParameter = param
    },

    getChartConfig(name: string): any {
      return this[`${name}Chart`]
    },

    setInitialChart(): string | void {
      for (let i = 0; i < this.charts.length; i++) {
        const chart = (this.charts as any)[i]
        if (this.anyColData(chart.params)) {
          return this.activeParameter = chart.id
        }
      }
    }
  },

  mounted() {
    this.setInitialChart()
  }
})
</script>

<style lang="scss" scoped>
@import "../node_modules/bootstrap/scss/functions";
@import "../node_modules/bootstrap/scss/variables";
@import "../node_modules/bootstrap/scss/mixins";

.card {
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