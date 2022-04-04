<template>
  <template v-if="data && anyData()">
    <!-- Briefing -->
    <Briefing :data="data" :normals="normals" :daily="true" />

    <!-- Main Content Ad -->
    <div class="my-3">
      <Ad slot-id="3216865845" />
    </div>

    <div id="sections" class="mt-3">
      <!-- Temperature Chart -->
      <Section v-if="anyColData('tavg') || anyColData('tmin') || anyColData('tmax')" id="temp" :title="t('$meteo.temp')">
        <Chart type="line" :data="tempChart.data" :options="tempChart.options" />
      </Section>

      <!-- Precipitation Chart -->
      <Section v-if="anyColData('prcp')" id="prcp" :title="t('$meteo.prcp')">
        <Chart type="bar" :data="prcpChart.data" :options="prcpChart.options" />
      </Section>

      <!-- Wind Speed Chart -->
      <Section v-if="anyColData('wspd')" id="wspd" :title="t('$params.wspd')">
        <Chart type="line" :data="wspdChart.data" :options="wspdChart.options" />
      </Section>

      <!-- Wind Direction Chart -->
      <Section v-if="anyColData('wdir')" id="wdir" :title="t('$params.wdir')">
        <Chart type="radar" :data="wdirChart.data" :options="wdirChart.options" />
      </Section>

      <!-- Air Pressure Chart -->
      <Section v-if="anyColData('pres')" id="pres" :title="t('$params.pres')">
        <Chart type="line" :data="presChart.data" :options="presChart.options" />
      </Section>

      <!-- Details Table -->
      <div id="details-offcanvas" class="offcanvas offcanvas-start offcanvas-details" tabindex="-1">
        <Table :data="data" />
      </div>
    </div>
  </template>

  <!-- No Data -->
  <template v-else-if="meta.generated">
    <NoData />
  </template>

  <!-- Update Time -->
  <div v-if="meta.generated" class="mt-3 mt-md-4 text-muted text-end">
    {{ t('updated') }}: {{ format(parseISO(meta.generated), t('dateTimeFormat')) }} UTC
  </div>

  <!-- Export Modal -->
  <div id="exportModal" class="modal fade" tabindex="-1" aria-hidden="true">
    <Export :data="data" />
  </div>
</template>

<script lang="ts">
import { defineComponent, defineAsyncComponent } from 'vue';
import { useI18n } from 'vue-i18n';
import { parseISO, format } from 'date-fns';
import { useSettingsStore } from '~/stores/settings';
import { tempScale, prcpScale, wspdScale, presScale, ColorScale } from '~/utils/colorScale';
import { ChartDefinitionInterface } from '~/utils/interfaces';
import DataMixin from '../../Data.mixin';
import Briefing from '../Briefing.vue';
import Section from '../Section.vue';
import Chart from '../../charts/Chart.vue';
import { tsTooltips, tsPointRadius, tsScales } from '../../charts/timeseries.config';
import Ad from '~/components/Ad.vue';

/**
 * Async Components
 */
const Export = defineAsyncComponent(() => import('../Export.vue'));
const Table = defineAsyncComponent(() => import('../tables/Daily.vue'));
const NoData = defineAsyncComponent(() => import('../../alerts/NoData.vue'));

/**
 * Component Definition
 */
export default defineComponent({
  name: 'Daily',

  components: {
    Export,
    Briefing,
    Section,
    Chart,
    Table,
    NoData,
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
    const { t } = useI18n();

    // Store
    const settings = useSettingsStore();

    return {
      t,
      parseISO,
      format,
      settings,
      tempScale,
      prcpScale,
      wspdScale,
      presScale,
      ColorScale
    };
  },

  data() {
    return {
      meta: {},
      data: []
    };
  },

  computed: {
    /**
     * Time labels
     *
     * @returns {Array} The time strings
     */
    timeValues(): Array<string> {
      return this.fetchValues('date').map(String);
    },

    /**
     * Configuration for temperature chart
     *
     * @returns {Object} Configuration object
     */
    tempChart(): ChartDefinitionInterface {
      // Fetch values
      const tavgValues = this.fetchValues('tavg');
      const tminValues = this.fetchValues('tmin');
      const tmaxValues = this.fetchValues('tmax');
      // Return configuration object
      return {
        data: {
          labels: this.timeValues,
          datasets: [
            {
              label: this.t('$params.tavg'),
              borderColor: 'rgb(85,85,85)',
              backgroundColor: 'rgb(85,85,85)',
              borderWidth: 2,
              fill: false,
              pointBorderColor: 'rgb(255,255,255)',
              pointRadius: tsPointRadius(tavgValues),
              data: tavgValues
            },
            {
              label: this.t('$params.tmin'),
              borderWidth: 2,
              borderColor: 'rgb(51,122,183)',
              backgroundColor: 'rgba(51,122,183)',
              fill: false,
              pointBorderColor: 'rgb(255,255,255)',
              pointRadius: tsPointRadius(tminValues),
              data: tminValues
            },
            {
              label: this.t('$params.tmax'),
              borderWidth: 2,
              borderColor: 'rgba(217,83,79)',
              backgroundColor: 'rgba(217,83,79)',
              fill: false,
              pointBorderColor: 'rgb(255,255,255)',
              pointRadius: tsPointRadius(tmaxValues),
              data: tmaxValues
            }
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
      };
    },

    /**
     * Configuration for precipitation chart
     *
     * @returns {Object} Configuration object
     */
    prcpChart(): ChartDefinitionInterface {
      // Fetch values
      const prcpValues = this.fetchValues('prcp');
      // Return configuration object
      return {
        data: {
          labels: this.timeValues,
          datasets: [
            {
              label: this.t('$params.prcp'),
              borderWidth: 2,
              borderColor: 'rgb(91,192,222)',
              backgroundColor: 'rgb(91,192,222)',
              pointRadius: tsPointRadius(prcpValues),
              data: prcpValues
            }
          ]
        },
        options: {
          scales: tsScales(this.timeValues, this.settings.units.prcp),
          plugins: {
            tooltip: tsTooltips,
            colorStripe: {
              scale: new ColorScale(prcpScale, 0, 30, '#dee2e6')
            }
          }
        }
      };
    },

    /**
     * Configuration for wind speed chart
     *
     * @returns {Object} Configuration object
     */
    wspdChart(): ChartDefinitionInterface {
      // Fetch values
      const wspdValues = this.fetchValues('wspd');
      const wpgtValues = this.fetchValues('wpgt');
      // Return configuration object
      return {
        data: {
          labels: this.timeValues,
          datasets: [
            {
              label: this.t('$params.wspd'),
              borderWidth: 2,
              borderColor: 'rgb(51,122,183)',
              backgroundColor: 'rgb(51,122,183)',
              fill: false,
              pointBorderColor: 'rgb(255,255,255)',
              pointRadius: tsPointRadius(wspdValues),
              data: wspdValues
            },
            {
              label: this.t('$params.wpgt'),
              borderWidth: 2,
              borderColor: 'rgb(217,83,79)',
              backgroundColor: 'rgb(217,83,79)',
              fill: false,
              pointBorderColor: 'rgb(255,255,255)',
              pointRadius: tsPointRadius(wpgtValues),
              data: wpgtValues
            }
          ]
        },
        options: {
          scales: tsScales(this.timeValues, this.settings.units.wspd),
          plugins: {
            tooltip: tsTooltips,
            colorStripe: {
              scale: new ColorScale(wspdScale, 0, 40, null)
            }
          }
        }
      };
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
          datasets: [
            {
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
                };
                this.fetchValues('wdir').forEach((dir): void => {
                  if (dir !== null) {
                    if (dir <= 22.5 || dir > 337.5) directions.n++;
                    else if (dir > 22.5 && dir <= 67.5) directions.ne++;
                    else if (dir > 67.5 && dir <= 112.5) directions.e++;
                    else if (dir > 112.5 && dir <= 157.5) directions.se++;
                    else if (dir > 157.5 && dir <= 202.5) directions.s++;
                    else if (dir > 202.5 && dir <= 247.5) directions.sw++;
                    else if (dir > 247.5 && dir <= 292.5) directions.w++;
                    else if (dir > 292.5 && dir <= 337.5) directions.nw++;
                  }
                });
                return Object.values(directions);
              })()
            }
          ]
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
      };
    },

    /**
     * Configuration for air pressure chart
     *
     * @returns {Object} Configuration object
     */
    presChart(): ChartDefinitionInterface {
      // Fetch values
      const presValues = this.fetchValues('pres');
      // Return configuration object
      return {
        data: {
          labels: this.timeValues,
          datasets: [
            {
              label: this.t('$params.pres'),
              borderWidth: 2,
              borderColor: 'rgb(92,184,92)',
              backgroundColor: 'rgb(92,184,92)',
              fill: false,
              pointBorderColor: 'rgb(255,255,255)',
              pointRadius: tsPointRadius(presValues),
              data: presValues
            }
          ]
        },
        options: {
          scales: tsScales(this.timeValues, 'hPa'),
          plugins: {
            tooltip: tsTooltips,
            colorStripe: {
              scale: new ColorScale(presScale, 990, 1025, null)
            }
          }
        }
      };
    }
  },

  watch: {
    async range(newRange: Record<string, string>, oldRange: Record<string, string>): Promise<void> {
      if (newRange[0] !== oldRange[0] || newRange[1] !== oldRange[1]) {
        await this.fetchData();
      }
    }
  },

  async mounted(): Promise<void> {
    await this.fetchData();
  },

  methods: {
    /**
     * Fetch daily data from Meteostat API
     */
    async fetchData(): Promise<void> {
      // Start loading
      this.$loading('daily');
      // Data URL
      let url = `${this.$api}/app/proxy/stations/daily?station=${this.station}`;
      if (!this.settings.model) {
        url += '&model=0';
      }
      if (this.settings.imperial) {
        url += '&units=imperial';
      }
      // Get data
      await fetch(`${url}&start=${this.range[0]}&end=${this.range[1]}`)
        // Convert to JSON
        .then((response) => response.json())
        .then((data) => {
          this.meta = data.meta;
          this.data = data.data;
        })
        // Finish loading
        .finally(() => {
          // Finish loading state
          this.$loaded('daily');
          // Emit event
          this.$emit('loaded');
        });
    }
  }
});
</script>

<style lang="scss">
.offcanvas-details {
  width: 100%;
  max-width: 980px;
}
</style>