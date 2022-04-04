<template>
  <template v-if="data && anyData()">
    <!-- Briefing -->
    <Briefing :data="data" :normals="normals" />

    <!-- Main Content Ad -->
    <div class="my-3">
      <Ad slot-id="3216865845" />
    </div>

    <div id="sections" class="mt-3">
      <!-- Temperature Chart -->
      <Section v-if="anyColData('temp')" id="temp" :title="t('$meteo.temp')">
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
      <Section v-if="anyColData('pres')" id="pres" :title="t('$meteo.pres')">
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
  <div v-if="meta.generated" class="mt-3 text-muted text-end">
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
import { parseISO, format, differenceInDays } from 'date-fns';
import { useSettingsStore } from '~/stores/settings';
import { tempScale, prcpScale, wspdScale, presScale, ColorScale } from '~/utils/colorScale';
import { ChartDefinitionInterface } from '~/utils/interfaces';
import DataMixin from '../../Data.mixin';
import Briefing from '../Briefing.vue';
import Section from '../Section.vue';
import Chart from '../../charts/Chart.vue';
import { tsTooltips, tsPointRadius, tsScales } from '~/components/charts/timeseries.config';
import Ad from '~/components/Ad.vue';

/**
 * Async Components
 */
const Export = defineAsyncComponent(() => import('../Export.vue'));
const Table = defineAsyncComponent(() => import('../tables/Hourly.vue'));
const NoData = defineAsyncComponent(() => import('../../alerts/NoData.vue'));

/**
 * Component Definition
 */
export default defineComponent({
  name: 'Hourly',

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
    tz: {
      type: String,
      default: null
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
      differenceInDays,
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
      return this.fetchValues('time').map(String);
    },

    /**
     * Configuration for temperature chart
     *
     * @returns {Object} Configuration object
     */
    tempChart(): ChartDefinitionInterface {
      // Fetch values
      const tempValues = this.fetchValues('temp');
      const dwptValues = this.fetchValues('dwpt');
      // Return configuration object
      return {
        data: {
          labels: this.timeValues,
          datasets: [
            {
              label: this.t('$params.temp'),
              borderWidth: 2,
              borderColor: 'rgb(217,83,79)',
              backgroundColor: 'rgb(217,83,79)',
              fill: false,
              pointBorderColor: 'rgb(255,255,255)',
              pointRadius: tsPointRadius(tempValues),
              data: tempValues
            },
            {
              label: this.t('$params.dwpt'),
              borderWidth: 2,
              borderColor: 'rgb(99,73,139)',
              backgroundColor: 'rgb(99,73,139)',
              fill: false,
              pointBorderColor: 'rgb(255,255,255)',
              pointRadius: tsPointRadius(dwptValues),
              data: dwptValues
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
              scale: new ColorScale(prcpScale, 0, 10, '#dee2e6')
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
     * Fetch hourly data from Meteostat API
     */
    async fetchData(): Promise<void> {
      // Start loading
      this.$loading('hourly');
      // Data URL
      let url = `${this.$api}/app/proxy/stations/hourly?station=${this.station}`;
      if (this.settings.timezone) {
        url += `&tz=${this.tz}`;
      }
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
          this.$loaded('hourly');
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