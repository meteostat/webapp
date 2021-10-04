<template>
  <template v-if="data && anyData()">
    <!-- Interpolation Info -->
    <InterpolationAlert
      v-if="!station"
      :stations="meta.stations"
    />

    <!-- Briefing -->
    <div class="row">
      <!-- Average Temperature -->
      <div class="col-6 pe-1 pe-md-3">
        <div
          class="card d-flex flex-row overflow-hidden py-1 rounded shadow-sm card-kpi card-temp h-100"
          :title="anyColGaps('tavg') ? t('$phrases.someDataMissing') : undefined"
          data-bs-toggle="tooltip"
          data-bs-placement="bottom"
        >
          <div class="card-body py-2">
            <h5 class="card-title">
              <template v-if="tempKPI">
                {{ tempKPI }}
                <small
                  v-if="tempAnomalyKPI"
                  class="fw-light"
                  :class="{ 'anomaly-negative': tempAnomalyKPI < 0, 'anomaly-positive': tempAnomalyKPI >= 0 }"
                >
                  ({{ tempAnomalyKPI }})
                </small>
                <small class="text-muted ms-1">
                  {{ settings.units.temp }}
                </small>
              </template>
              <template v-else>
                <span class="text-muted">{{ t('$phrases.noData') }}</span>
              </template>
            </h5>
            <div class="text-muted text-truncate">
              <icon
                v-if="anyColGaps('tavg')"
                :icon="['fas', 'exclamation-circle']"
                class="me-2"
              />
              <span class="card-text">{{ t('$params.tavg') }}</span>
            </div>
          </div>
          <div class="card-icon d-none d-lg-block">
            <icon :icon="['fas', 'temperature-high']" />
          </div>
        </div>
      </div>

      <!-- Total Precipitation -->
      <div class="col-6 ps-1 ps-md-3">
        <div
          class="card d-flex flex-row overflow-hidden py-1 rounded shadow-sm card-kpi card-prcp h-100"
          :title="prcpKPI && anyColGaps('prcp') ? t('$phrases.someDataMissing') : undefined"
          data-bs-toggle="tooltip"
          data-bs-placement="bottom"
        >
          <div class="card-body py-2">
            <h5 class="card-title">
              <template v-if="prcpKPI">
                {{ prcpKPI }}
                <small
                  v-if="prcpAnomalyKPI"
                  class="fw-light"
                  :class="{ 'anomaly-negative': prcpAnomalyKPI < 0, 'anomaly-positive': prcpAnomalyKPI >= 0 }"
                >
                  ({{ prcpAnomalyKPI }})
                </small>
                <small class="text-muted ms-1">
                  {{ settings.units.prcp }}
                </small>
              </template>
              <template v-else>
                <span class="text-muted">{{ t('$phrases.noData') }}</span>
              </template>
            </h5>
            <div class="text-muted text-truncate">
              <icon
                v-if="prcpKPI && anyColGaps('temp')"
                :icon="['fas', 'exclamation-circle']"
                class="me-2"
              />
              <span class="card-text">{{ t('$params.prcp') }}</span>
            </div>
          </div>
          <div class="card-icon d-none d-lg-block">
            <icon :icon="['fas', 'umbrella']" />
          </div>
        </div>
      </div>
    </div>

    <Ad />

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

      <!-- Wind Direction Chart -->
      <section
        v-if="anyColData('wdir')"
        id="wdir"
        class="card mt-3 mt-md-4"
      >
        <div class="card-header card-header-main px-0 rounded-0 bg-white">
          <h2 class="card-header-title lead">
            {{ t('$params.wdir') }}
          </h2>
        </div>
        <div class="card-body px-0">
          <Chart
            type="radar"
            :data="wdirChart.data"
            :options="wdirChart.options"
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
            type="line"
            :data="presChart.data"
            :options="presChart.options"
          />
        </div>
      </section>

      <!-- Snow Chart -->
      <section
        v-if="anyColData('snow')"
        id="snow"
        class="card mt-3 mt-md-4"
      >
        <div class="card-header card-header-main px-0 rounded-0 bg-white">
          <h2 class="card-header-title lead">
            {{ t('$meteo.snow') }}
          </h2>
        </div>
        <div class="card-body px-0">
          <Chart
            type="bar"
            :data="snowChart.data"
            :options="snowChart.options"
          />
        </div>
      </section>

      <!-- Sunshine Duration Chart -->
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

      <!-- Details Table -->
      <section
        id="details"
        ref="details"
        class="card d-none d-lg-block mt-3 mt-md-4"
      >
        <div class="card-header card-header-main px-0 rounded-0 bg-white">
          <h2 class="card-header-title lead">
            {{ t('details') }}
          </h2>
        </div>
        <div
          class="card-body px-0"
          :class="{ 'table-placeholder': !showTable }"
        >
          <Table
            v-if="showTable"
            :data="data"
          />
        </div>
      </section>
    </div>
  </template>

  <!-- No Data -->
  <template v-else>
    <NoData />
  </template>

  <!-- Meteo Maps -->
  <section
    v-if="range[0] !== format(new Date(), 'yyyy-MM-dd')"
    id="maps"
    ref="maps"
    class="card d-none d-lg-block mt-3 mt-md-4 p-3 bg-light rounded"
  >
    <div class="card-header card-header-main px-0 rounded-0 bg-light">
      <h2 class="card-header-title lead">
        {{ t('maps') }}
      </h2>
    </div>
    <div
      class="card-body px-0"
      :class="{ 'maps-placeholder': !showMaps }"
    >
      <Maps
        v-if="showMaps"
        :lat="lat"
        :lon="lon"
        :range="[parseISO(range[0]), parseISO(range[1])]"
      />
    </div>
  </section>

  <!-- Update Time -->
  <div
    v-if="meta.generated"
    class="mt-3 mt-md-4 text-muted text-end"
  >
    {{ t('updated') }}: {{ format(parseISO(meta.generated), t('dateTimeFormat')) }} UTC
  </div>

  <!-- Export Modal -->
  <div
    id="exportModal"
    class="modal fade"
    tabindex="-1"
    aria-hidden="true"
  >
    <Export :data="data" />
  </div>
</template>

<script lang="ts">
import { defineComponent, defineAsyncComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { parseISO, getDaysInMonth, format } from 'date-fns'
import { useSettingsStore } from '~/stores/settings'
import { tempScale, prcpScale, wspdScale, presScale, tsunScale, ColorScale } from '~/utils/colorScale'
import { ChartDefinitionInterface } from '~/utils/interfaces'
import isElementInViewport from '~/utils/spy'
import { initTooltips } from '~/utils/tooltips'
import DataMixin from '../../Location.mixin'
import Chart from '../../charts/Chart.vue'
import { tsTooltips, tsPointRadius, tsScales } from '../../charts/timeseries.config'
import NoData from '../NoData.vue'
import Ad from '~/components/Ad.vue'

/**
 * Async Components
 */
const Export = defineAsyncComponent(() =>
  import('../Export.vue')
)
const InterpolationAlert = defineAsyncComponent(() =>
  import('~/components/alerts/Interpolation.vue')
)
const Table = defineAsyncComponent(() =>
  import('../tables/Daily.vue')
)
const Maps = defineAsyncComponent(() =>
  import('../Maps.vue')
)

/**
 * Component Definition
 */
export default defineComponent({
  name: 'Daily',

  components: {
    Export,
    InterpolationAlert,
    Chart,
    Table,
    NoData,
    Maps,
    Ad
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
    },
    range: {
      type: Array,
      required: true
    },
    normals: {
      type: Array,
      default: (): Array<undefined> => []
    }
  },

  emits: ['loaded'],

  setup() {
    // Translations
    const { t } = useI18n()

    // Store
    const settings = useSettingsStore()

    return {
      t,
      parseISO,
      format,
      settings,
      tempScale,
      prcpScale,
      wspdScale,
      presScale,
      tsunScale,
      ColorScale
    }
  },

  data() {
    return {
      meta: {},
      data: [],
      showTable: false,
      showMaps: false
    }
  },

  computed: {
    /**
     * Returns average temperature across period
     * 
     * @returns {null|String} Average temperature
     */
    tempKPI(): null|number {
      const temp = this.fetchValues('tavg').filter(t => t !== null)
      if (temp.length > 0) {
        const sum = temp.reduce((a, b) => Number(a) + Number(b), 0)
        const avg = (Number(sum) / temp.length);
        return Number(avg.toFixed(1))
      }
      return null
    },

    /**
     * Returns average temperature anomaly
     * 
     * @returns {null|String} Average temperature anomaly
     */
    tempAnomalyKPI(): null|string {
      const times = this.fetchValues('date')
      const temps = this.fetchValues('tavg')
      const anomalies: Array<number> = []
      if (this.normals) {
        const normals: Record<string, any> = this.normals.slice(this.normals.length - 12)
        times.forEach((time, index) => {
          const temp = temps[index]
          const date = parseISO(String(time))
          const normal = normals[date.getMonth()]?.tavg
          if (temp !== null && normal) {
            const anomaly = Number(temp) - normal
            anomalies.push(anomaly)
          }
        })
        const anomalySum = anomalies.reduce((a, b) => a + b, 0)
        let anomaly = Number(anomalySum / anomalies.length).toFixed(1)
        anomaly = Number(anomaly) < 0 ? anomaly : `+${anomaly}`
        return anomalies.length ? anomaly : null
      }
      return null
    },

    /**
     * Returns total precipitation across period
     * 
     * @returns {null|String} Total precipitation
     */
    prcpKPI(): null|number {
      const prcp = this.fetchValues('prcp').filter(p => p !== null)
      if (prcp.length > 0) {
        const sum = Number(prcp.reduce((a, b) => Number(a) + Number(b), 0))
        return Number(sum.toFixed(this.settings.unitPrecision.prcp))
      }
      return null
    },

    /**
     * Precipitation anomaly
     * 
     * @returns {null|String} Precipitation anomaly
     */
    prcpAnomalyKPI(): null|string {
      const times = this.fetchValues('date')
      const prcps = this.fetchValues('prcp')
      const anomalies: Array<number> = []
      if (this.normals) {
        const normals: Record<string, any> = this.normals.slice(this.normals.length - 12)
        times.forEach((time, index) => {
          const prcp = prcps[index]
          const date = parseISO(String(time))
          const normal = normals[date.getMonth()]?.prcp / getDaysInMonth(date)
          if (prcp !== null && normal) {
            const anomaly = Number(prcp) - normal
            anomalies.push(anomaly)
          }
        })
        const anomalySum = anomalies.reduce((a, b) => a + b, 0)
        let anomaly = String(Number(Number(anomalySum).toFixed(this.settings.unitPrecision.prcp)))
        anomaly = Number(anomaly) < 0 ? anomaly : `+${anomaly}`
        return anomalies.length ? anomaly : null
      }
      return null
    },

    /**
     * Time labels
     * 
     * @returns {Array} The time strings
     */
    timeValues(): Array<string> {
      return this.fetchValues('date').map(String)
    },

    /**
     * Configuration for temperature chart
     * 
     * @returns {Object} Configuration object
     */
    tempChart(): ChartDefinitionInterface {
      // Fetch values
      const tavgValues = this.fetchValues('tavg')
      const tminValues = this.fetchValues('tmin')
      const tmaxValues = this.fetchValues('tmax')
      // Return configuration object
      return {
        data: {
          labels: this.fetchValues('date'),
          datasets: [
            {
              label: this.t('$params.tavg'),
              borderColor: "rgb(85,85,85)",
              backgroundColor: "rgb(85,85,85)",
              borderWidth: 2,
              fill: false,
              pointBorderColor: "rgb(255,255,255)",
              pointRadius: tsPointRadius(tavgValues),
              data: tavgValues
            },
            {
              label: this.t('$params.tmin'),
              borderWidth: 2,
              borderColor: "rgb(51,122,183)",
              backgroundColor: "rgba(51,122,183)",
              fill: false,
              pointBorderColor: "rgb(255,255,255)",
              pointRadius: tsPointRadius(tminValues),
              data: tminValues
            },
            {
              label: this.t('$params.tmax'),
              borderWidth: 2,
              borderColor: "rgba(217,83,79)",
              backgroundColor: "rgba(217,83,79)",
              fill: false,
              pointBorderColor: "rgb(255,255,255)",
              pointRadius: tsPointRadius(tmaxValues),
              data: tmaxValues
            },
          ]
        },
        options: {
          scales: tsScales(this.timeValues, this.settings.units.temp),
          plugins: {
            tooltip: tsTooltips,
            colorStripe: {
              scale: new ColorScale(tempScale, -10, 30, null)
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
      // Fetch values
      const prcpValues = this.fetchValues('prcp')
      // Return configuration object
      return {
        data: {
          labels: this.fetchValues('date'),
          datasets: [{
            label: this.t('$params.prcp'),
            borderWidth: 2,
            borderColor: "rgb(91,192,222)",
            backgroundColor: "rgb(91,192,222)",
            pointRadius: tsPointRadius(prcpValues),
            data: prcpValues
          }]
        },
        options: {
          scales: tsScales(this.timeValues, this.settings.units.prcp),
          plugins: {
            colorStripe: {
              scale: new ColorScale(prcpScale, 0, 10, '#eeeeee')
            }
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
      // Fetch values
      const wspdValues = this.fetchValues('wspd')
      const wpgtValues = this.fetchValues('wpgt')
      // Return configuration object
      return {
        data: {
          labels: this.fetchValues('date'),
          datasets: [{
            label: this.t('$params.wspd'),
            borderWidth: 2,
            borderColor: "rgb(51,122,183)",
            backgroundColor: "rgb(51,122,183)",
            fill: false,
            pointBorderColor: "rgb(255,255,255)",
            pointRadius: tsPointRadius(wspdValues),
            data: wspdValues
          }, {
            label: this.t('$params.wpgt'),
            borderWidth: 2,
            borderColor: "rgb(217,83,79)",
            backgroundColor: "rgb(217,83,79)",
            fill: false,
            pointBorderColor: "rgb(255,255,255)",
            pointRadius: tsPointRadius(wpgtValues),
            data: wpgtValues
          }]
        },
        options: {
          scales: tsScales(this.timeValues, this.settings.units.wspd),
          plugins: {
            colorStripe: {
              scale: new ColorScale(wspdScale, 0, 40, null)
            }
          }
        }
      }
    },

    /**
     * Configuration for wind direction chart
     * 
     * @returns {Object} Configuration object
     */
    wdirChart(): ChartDefinitionInterface {
      return {
        data: {
          labels: ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'],
          datasets: [{
            label: this.t('$params.wdir'),
            fill: true,
            borderColor: 'rgb(51, 122, 183)',
            backgroundColor: 'rgba(51, 122, 183, 0.4)',
            borderWidth: 1,
            pointRadius: 0,
            data: ((): Array<number> => {
              const directions: Record<string, number> = {
                n: 0,
                ne: 0,
                e: 0,
                se: 0,
                s: 0,
                sw: 0,
                w: 0,
                nw: 0
              }
              this.fetchValues('wdir').forEach((dir): void => {
                if(dir !== null) {
                  if (dir <= 22.5 || dir > 337.5) directions.n++;
                  else if (dir > 22.5 && dir <= 67.5) directions.ne++;
                  else if (dir > 67.5 && dir <= 112.5) directions.e++;
                  else if (dir > 112.5 && dir <= 157.5) directions.se++;
                  else if (dir > 157.5 && dir <= 202.5) directions.s++;
                  else if (dir > 202.5 && dir <= 247.5) directions.sw++;
                  else if (dir > 247.5 && dir <= 292.5) directions.w++;
                  else if (dir > 292.5 && dir <= 337.5) directions.nw++;
                }
              })
              return Object.values(directions)
            })()
          }]
        },
        options: {
          layout: {
            padding: {
              top: 10
            }
          },
          scales: {
            r: {
              ticks: {
                display: false
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
      // Fetch values
      const presValues = this.fetchValues('pres')
      // Return configuration object
      return {
        data: {
          labels: this.fetchValues('date'),
          datasets: [{
            label: this.t('$params.pres'),
            borderWidth: 2,
            borderColor: "rgb(92,184,92)",
            backgroundColor: "rgb(92,184,92)",
            fill: false,
            pointBorderColor: "rgb(255,255,255)",
            pointRadius: tsPointRadius(presValues),
            data: presValues
          }]
        },
        options: {
          scales: tsScales(this.timeValues, 'hPa'),
          plugins: {
            colorStripe: {
              scale: new ColorScale(presScale, 990, 1025, null)
            }
         }
        }
      }
    },

    /**
     * Configuration for snow chart
     * 
     * @returns {Object} Configuration object
     */
    snowChart(): ChartDefinitionInterface {
      // Fetch values
      const snowValues = this.fetchValues('snow')
      // Return configuration object
      return {
        data: {
          labels: this.fetchValues('date'),
          datasets: [{
            label: this.t('$params.snow'),
            borderWidth: 2,
            borderColor: "rgb(111,66,193)",
            backgroundColor: "rgb(111,66,193)",
            fill: false,
            pointBorderColor: "rgb(255,255,255)",
            pointRadius: tsPointRadius(snowValues),
            data: snowValues
          }]
        },
        options: {
          scales: tsScales(this.timeValues, this.settings.units.prcp),
          plugins: {
            colorStripe: {
              scale: new ColorScale(prcpScale, 0, 500, '#eeeeee')
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
      // Fetch values
      const tsunValues = this.fetchValues('tsun')
      // Return configuration object
      return {
        data: {
          labels: this.fetchValues('date'),
          datasets: [{
            label: this.t('$params.tsun'),
            borderWidth: 2,
            borderColor: "rgb(253,126,20)",
            backgroundColor: "rgb(253,126,20)",
            fill: false,
            pointBorderColor: "rgb(255,255,255)",
            pointRadius: tsPointRadius(tsunValues),
            data: tsunValues
          }]
        },
        options: {
          scales: tsScales(this.timeValues, 'm'),
          plugins: {
            colorStripe: {
              scale: new ColorScale(tsunScale, 0, 60, '#eeeeee')
            }
          }
        }
      }
    }
  },

  watch: {
    async range(newRange: Record<string, string>, oldRange: Record<string, string>): Promise<void> {
      if (
        newRange[0] !== oldRange[0] ||
        newRange[1] !== oldRange[1]
      ) {
        await this.fetchData()
      }
    }
  },

  async mounted(): Promise<void> {
    // Fetch data
    await this.fetchData()

    // Check async components in viewport
    this.viewportCheck()
    window.addEventListener('scroll', () => {
      this.viewportCheck()
    })
  },

  methods: {
    /**
     * Fetch daily data from Meteostat API
     */
    async fetchData(): Promise<void> {
      // Start loading
      this.$loading('daily')
      // Data URL
      let url = `${this.$api}/app/proxy/`
      if (this.station) {
        url += `stations/daily?station=${this.station}`
      } else {
        url += `point/daily?lat=${this.lat}&lon=${this.lon}&alt=${this.alt}`
      }
      if (!this.settings.model) {
        url += '&model=0'
      }
      if (this.settings.imperial) {
        url += '&units=imperial'
      }
      // Get data
      await fetch(`${url}&start=${this.range[0]}&end=${this.range[1]}`)
        // Convert to JSON
        .then(response => response.json())
        .then(data => {
          this.meta = data.meta
          this.data = data.data
        })
        // Finish loading
        .finally(() => {
          // Finish loading state
          this.$loaded('daily')
          // Emit event
          this.$emit('loaded')
          // Init tooltips
          initTooltips(this.$bs)
        })
    },

    /**
     * Check if async components in viewport
     */
    viewportCheck(): void {
      if (isElementInViewport(this.$refs.details as HTMLElement)) {
        this.showTable = true
      }
      if (isElementInViewport(this.$refs.maps as HTMLElement)) {
        this.showMaps = true
      }
    } 
  }
})
</script>

<style lang="scss">
.table-placeholder {
  min-height: calc(815px + 16px + 16px);
}

.maps-placeholder {
  min-height: calc(587px + 16px + 16px);
}
</style>