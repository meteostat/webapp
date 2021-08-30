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
              :key="period"
            >
              <a
                :class="{ active: period === activePeriod }"
                class="dropdown-item"
                @click="setPeriod(period)"
              >{{ period }} - {{ period + 29 }}</a>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="mt-2 pt-1">
      <!-- Manual -->
      <div
        v-if="!settings.dismiss.climateManual"
        class="alert alert-primary alert-dismissible fade show"
        role="alert"
      >
        <span v-html="t('$manual')" />
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="alert"
          aria-label="Close"
          @click="settings.dismiss.climateManual = true"
        />
      </div>

      <!-- Briefing -->
      <div class="row">
        <div class="col-6 pe-1 pe-md-3">
          <!-- Average Temperature -->
          <div
            class="card d-flex flex-row overflow-hidden py-1 rounded shadow-sm card-kpi card-temp h-100"
          >
            <div class="card-body py-2">
              <h5 class="card-title">
                <template v-if="tavgKPI">
                  {{ tavgKPI }}
                  <small class="text-muted ms-1">°C</small>
                </template>
                <template v-else>
                  <span class="text-muted">{{ t('noData') }}</span>
                </template>
              </h5>
              <span class="card-text text-muted text-truncate">Avg. Temperature</span>
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
                <template v-if="prcpKPI">
                  {{ prcpKPI }}
                  <small class="text-muted ms-1">mm</small>
                </template>
                <template v-else>
                  <span class="text-muted">{{ t('noData') }}</span>
                </template>
              </h5>
              <span class="card-text text-muted text-truncate">Total Precipitation</span>
            </div>
            <div class="card-icon d-none d-lg-block">
              <icon :icon="['fas', 'umbrella']" />
            </div>
          </div>
        </div>
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
              {{ t('temp') }}
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
              {{ t('prcp') }}
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
        <!-- Air Pressure Chart -->
        <section
          v-if="anyColData('pres')"
          id="pres"
          class="card mt-3 mt-md-4"
        >
          <div class="card-header card-header-main px-0 rounded-0 bg-white">
            <h2 class="card-header-title lead">
              {{ t('pres') }}
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
              {{ t('tsun') }}
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
  <template v-else>
    <NoData />
  </template>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { Store } from 'pinia'
import { useSettingsStore } from '../../stores/settings'
import { ChartDefinitionInterface } from '../../utils/interfaces'
import DataMixin from '../location/Data.mixin'
import Sections from '../Sections.vue'
import Chart from '../charts/Chart.vue'
import NoData from './NoData.vue'

export default defineComponent({
  name: 'Climate',

  components: {
    Sections,
    Chart,
    NoData
  },

  mixins: [DataMixin],

  props: {
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

  setup(): Record<string, (Store|Array<string>|any)> {
    // Translations
    const { t } = useI18n()

    // Store
    const settings = useSettingsStore()

    // Months
    const months = [
      'JAN',
      'FEB',
      'MAR',
      'APR',
      'MAY',
      'JUN',
      'JUL',
      'AUG',
      'SEP',
      'OCT',
      'NOV',
      'DEC'
    ]

    return {
      t,
      settings,
      months
    }
  },

  data(): Record<string, any> {
    return {
      normals: null,
      activePeriod: null
    }
  },

  computed: {
    periods(): Array<number> {
      const periods: Array<number> = []
      this.normals?.forEach((record: any): void => {
        if (!periods.includes(record.start)) {
          periods.push(record.start)
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
          labels: this.months,
          datasets: [{
            label: this.t('tavg'),
						type: 'line',
						fill: false,
						lineTension: 0.1,
						borderColor: "rgb(85,85,85)",
            backgroundColor: "rgb(85,85,85)",
						pointBorderColor: "rgb(255,255,255)",
						data: this.fetchValues('tavg')
					}, {
            label: this.t('tmin'),
						type: 'bar',
						backgroundColor: "rgba(51,122,183,0.8)",
						data: this.fetchValues('tmin')
					}, {
            label: this.t('tmax'),
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
          labels: this.months,
          datasets: [{
            label: this.t('prcp'),
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
          labels: this.months,
          datasets: [{
            label: this.t('pres'),
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
          labels: this.months,
          datasets: [{
            label: this.t('tsun'),
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
      let url = `${this.$api}/proxy/`
      if (this.station) {
        url += `stations/normals?station=${this.station}`
      } else {
        url += `point/normals?lat=${this.lat}&lon=${this.lon}&alt=${this.alt}`
      }
      // Fetch data
      await fetch(url)
        .then(response => response.json())
        .then(data => this.normals = data.data)
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
    "latest": "Latest",
    "$manual": "Climate data provides information on the <strong>typical weather</strong> at a location. The normals are usually based on a <strong>period of 30 years</strong>. At Meteostat you can view data for all available reference periods. The data <strong>accuracy may vary</strong> by period, as not all statistics were generated using the same methods. Also, missing periods may be (partially) replaced based on spatial grid data."
  }
}
</i18n>