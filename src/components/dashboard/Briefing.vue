<template>
  <div class="row gx-1 gy-1">
    <!-- Average Temperature -->
    <div class="col-6 col-md-3">
      <div class="card card-kpi" @click="scrollToElement('temp')">
        <div class="card-body py-1">
          <h5 class="card-title d-flex align-items-center mb-1">
            <template v-if="temp !== null && anyColData(tempCol)">
              <icon
                v-if="tempAnomaly"
                v-tooltip="`${tempAnomaly} ${settings.units.temp}`"
                :icon="['fas', tempAnomaly < 0 ? 'arrow-down' : 'arrow-up']"
                class="me-2 fs-6"
                :class="{ 'anomaly-negative': tempAnomaly < 0, 'anomaly-positive': tempAnomaly > 0 }"
              />
              {{ temp }}
              <small class="text-muted fw-light ms-1">
                {{ settings.units.temp }}
              </small>
            </template>
            <template v-else>
              <span class="text-muted">{{ t('$phrases.noData') }}</span>
            </template>
          </h5>
          <div class="d-flex align-items-center">
            <span v-if="anyColData(tempCol)" class="circle circle-temp">
              <span v-if="anyColGaps(tempCol)" class="circle-gaps" v-tooltip="t('$phrases.someDataMissing')" />
            </span>
            <small class="card-text text-muted text-truncate">{{ t('$params.tavg') }}</small>
          </div>
        </div>
      </div>
    </div>
    <!-- Total Precipitation -->
    <div class="col-6 col-md-3">
      <div class="card card-kpi" @click="scrollToElement('prcp')">
        <div class="card-body py-1">
          <h5 class="card-title d-flex align-items-center mb-1">
            <template v-if="prcp !== null && anyColData('prcp')">
              <icon
                v-if="daily && prcpAnomaly"
                v-tooltip="`${prcpAnomaly} ${settings.units.prcp}`"
                :icon="['fas', prcpAnomaly < 0 ? 'arrow-down' : 'arrow-up']"
                class="me-2 fs-6"
                :class="{ 'anomaly-negative': prcpAnomaly < 0, 'anomaly-positive': prcpAnomaly > 0 }"
              />
              {{ prcp }}
              <small class="text-muted fw-light ms-1">
                {{ settings.units.prcp }}
              </small>
            </template>
            <template v-else>
              <span class="text-muted">{{ t('$phrases.noData') }}</span>
            </template>
          </h5>
          <div class="d-flex align-items-center">
            <span v-if="anyColData('prcp')" class="circle circle-prcp">
              <span v-if="anyColGaps('prcp')" class="circle-gaps" v-tooltip="t('$phrases.someDataMissing')" />
            </span>
            <small class="card-text text-muted text-truncate">{{ t('$params.prcp') }}</small>
          </div>
        </div>
      </div>
    </div>
    <!-- Wind Speed -->
    <div class="col-6 col-md-3">
      <div class="card card-kpi" @click="scrollToElement('wspd')">
        <div class="card-body py-1">
          <h5 class="card-title d-flex align-items-center mb-1">
            <template v-if="wspd !== null && anyColData('wspd')">
              <icon
                v-if="wspdAnomaly"
                v-tooltip="`${wspdAnomaly} ${settings.units.wspd}`"
                :icon="['fas', wspdAnomaly < 0 ? 'arrow-down' : 'arrow-up']"
                class="me-2 fs-6"
                :class="{ 'anomaly-negative': wspdAnomaly < 0, 'anomaly-positive': wspdAnomaly > 0 }"
              />
              {{ wspd }}
              <small class="text-muted fw-light ms-1">
                {{ settings.units.wspd }}
              </small>
            </template>
            <template v-else>
              <span class="text-muted">{{ t('$phrases.noData') }}</span>
            </template>
          </h5>
          <div class="d-flex align-items-center">
            <span v-if="anyColData('wspd')" class="circle circle-wspd">
              <span v-if="anyColGaps('wspd')" class="circle-gaps" v-tooltip="t('$phrases.someDataMissing')" />
            </span>
            <small class="card-text text-muted text-truncate">{{ t('$params.wspd') }}</small>
          </div>
        </div>
      </div>
    </div>
    <!-- Air Pressure -->
    <div class="col-6 col-md-3">
      <div class="card card-kpi" @click="scrollToElement('pres')">
        <div class="card-body py-1">
          <h5 class="card-title d-flex align-items-center mb-1">
            <template v-if="pres !== null && anyColData('pres')">
              <icon
                v-if="presAnomaly"
                v-tooltip="`${presAnomaly} hPa`"
                :icon="['fas', presAnomaly < 0 ? 'arrow-down' : 'arrow-up']"
                class="me-2 fs-6"
                :class="{ 'anomaly-negative': presAnomaly < 0, 'anomaly-positive': presAnomaly >= 0 }"
              />
              {{ pres }}
              <small class="text-muted fw-light ms-1">hPa</small>
            </template>
            <template v-else>
              <span class="text-muted">{{ t('$phrases.noData') }}</span>
            </template>
          </h5>
          <div class="d-flex align-items-center">
            <span v-if="anyColData('pres')" class="circle circle-pres">
              <span v-if="anyColGaps('pres')" class="circle-gaps" v-tooltip="t('$phrases.someDataMissing')" />
            </span>
            <small class="card-text text-muted text-truncate">{{ t('$params.pres') }}</small>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useI18n } from 'vue-i18n';
import { useSettingsStore } from '~/stores/settings';
import DataMixin from '../Data.mixin';
import { getAverage, getSum, getAnomaly, getSumAnomaly } from '~/utils/data';
import { scrollToElement } from '~/utils/spy';

export default defineComponent({
  name: 'Briefing',

  mixins: [DataMixin],

  props: {
    data: {
      type: Array,
      default: []
    },
    normals: {
      type: Array,
      default: []
    },
    daily: {
      type: Boolean,
      default: false
    }
  },

  setup() {
    // Translations
    const { t } = useI18n();

    // Store
    const settings = useSettingsStore();

    return {
      t,
      settings,
      scrollToElement
    };
  },

  computed: {
    tempCol(): string {
      return this.daily ? 'tavg' : 'temp';
    },

    timeValues(): string[] {
      return this.fetchValues(this.daily ? 'date' : 'time') as string[];
    },

    latestNormals(): any[] {
      const normals = this.normals?.slice(this.normals.length - 12);
      return normals ? normals : [];
    },

    temp(): null | number {
      return getAverage(this.fetchValues(this.tempCol) as number[]);
    },

    tempAnomaly(): null | number | string {
      return getAnomaly(
        this.fetchValues(this.tempCol) as number[],
        this.timeValues,
        this.latestNormals.map((n) => n.tavg)
      );
    },

    prcp(): null | number {
      return getSum(this.fetchValues('prcp') as number[], this.settings.unitPrecision.prcp);
    },

    prcpAnomaly(): null | number | string {
      return getSumAnomaly(
        this.fetchValues('prcp') as number[],
        this.timeValues,
        this.latestNormals.map((n) => n.prcp),
        this.settings.unitPrecision.prcp,
        this.daily
      );
    },

    wspd(): null | number {
      return getAverage(this.fetchValues('wspd') as number[]);
    },

    wspdAnomaly(): null | number | string {
      return getAnomaly(
        this.fetchValues('wspd') as number[],
        this.timeValues,
        this.latestNormals.map((n) => n.wspd)
      );
    },

    pres(): null | number {
      return getAverage(this.fetchValues('pres') as number[]);
    },

    presAnomaly(): null | number | string {
      return getAnomaly(
        this.fetchValues('pres') as number[],
        this.timeValues,
        this.latestNormals.map((n) => n.pres)
      );
    }
  }
});
</script>

<style lang="scss">
@import '~/style/variables';
@import '../node_modules/bootstrap/scss/functions';
@import '../node_modules/bootstrap/scss/variables';
@import '../node_modules/bootstrap/scss/mixins';

.card-kpi {
  display: flex;
  flex-direction: row;
  overflow: hidden;
  padding: 0.5rem;
  background: $light;
  border: 0;
  height: 100%;
  cursor: pointer;

  .card-body {
    overflow: hidden;

    h5 {
      white-space: nowrap;
      overflow: hidden;
    }
  }

  .circle {
    width: 10px;
    height: 10px;
    border-radius: 5px;
    margin-right: 0.3rem;
    flex-shrink: 0;

    &-temp {
      background-color: $red;
    }
    &-prcp {
      background-color: $cyan-600;
    }
    &-wspd {
      background-color: rgb(51, 122, 183);
    }
    &-pres {
      background-color: $green-400;
    }

    &-gaps {
      display: block;
      height: 100%;
      background: repeating-linear-gradient(45deg, transparent, transparent 1px, white 1px, white 2px);
    }
  }
  .anomaly-negative {
    color: $blue-700;
  }
  .anomaly-positive {
    color: $red-700;
  }
}
</style>
