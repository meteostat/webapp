<template>
  <div class="row gx-3 gy-1">
    <!-- Average Temperature -->
    <div class="col-6 col-md-3">
      <div class="card d-flex flex-row overflow-hidden py-1 card-kpi card-kpi-temp h-100">
        <div class="card-body py-1">
          <h5 class="card-title mb-1">
            <template v-if="temp !== null && anyColData(tempCol)">
              {{ temp }}
              <small
                v-if="tempAnomaly"
                class="fw-light"
                :class="{ 'anomaly-negative': tempAnomaly < 0, 'anomaly-positive': tempAnomaly >= 0 }"
              >
                {{ tempAnomaly }}
              </small>
              <small class="text-muted fw-light ms-1">
                {{ settings.units.temp }}
              </small>
            </template>
            <template v-else>
              <span class="text-muted">{{ t('$phrases.noData') }}</span>
            </template>
          </h5>
          <div class="text-muted text-truncate">
            <icon
              v-if="temp && anyColGaps(tempCol)"
              :icon="['fas', 'exclamation-circle']"
              class="me-2"
              v-tooltip="t('$phrases.someDataMissing')"
            />
            <small class="card-text">{{ t('$params.tavg') }}</small>
          </div>
        </div>
      </div>
    </div>
    <!-- Total Precipitation -->
    <div class="col-6 col-md-3">
      <div class="card d-flex flex-row overflow-hidden py-1 card-kpi card-kpi-prcp h-100">
        <div class="card-body py-1">
          <h5 class="card-title mb-1">
            <template v-if="prcp !== null && anyColData('prcp')">
              {{ prcp }}
              <small
                v-if="prcpAnomaly"
                class="fw-light"
                :class="{ 'anomaly-negative': prcpAnomaly < 0, 'anomaly-positive': prcpAnomaly >= 0 }"
              >
                {{ prcpAnomaly }}
              </small>
              <small class="text-muted fw-light ms-1">
                {{ settings.units.prcp }}
              </small>
            </template>
            <template v-else>
              <span class="text-muted">{{ t('$phrases.noData') }}</span>
            </template>
          </h5>
          <div class="text-muted text-truncate">
            <icon
              v-if="prcp && anyColGaps('prcp')"
              :icon="['fas', 'exclamation-circle']"
              class="me-2"
              v-tooltip="t('$phrases.someDataMissing')"
            />
            <small class="card-text">{{ t('$params.prcp') }}</small>
          </div>
        </div>
      </div>
    </div>
    <!-- Wind Speed -->
    <div class="col-6 col-md-3">
      <div class="card d-flex flex-row overflow-hidden py-1 card-kpi card-kpi-wspd h-100">
        <div class="card-body py-1">
          <h5 class="card-title mb-1">
            <template v-if="wspd !== null && anyColData('wspd')">
              {{ wspd }}
              <small
                v-if="wspdAnomaly"
                class="fw-light"
                :class="{ 'anomaly-negative': wspdAnomaly < 0, 'anomaly-positive': wspdAnomaly >= 0 }"
              >
                {{ wspdAnomaly }}
              </small>
              <small class="text-muted fw-light ms-1">
                {{ settings.units.wspd }}
              </small>
            </template>
            <template v-else>
              <span class="text-muted">{{ t('$phrases.noData') }}</span>
            </template>
          </h5>
          <div class="text-muted text-truncate">
            <icon
              v-if="wspd && anyColGaps('wspd')"
              :icon="['fas', 'exclamation-circle']"
              class="me-2"
              v-tooltip="t('$phrases.someDataMissing')"
            />
            <small class="card-text">{{ t('$params.wspd') }}</small>
          </div>
        </div>
      </div>
    </div>
    <!-- Air Pressure -->
    <div class="col-6 col-md-3">
      <div class="card d-flex flex-row overflow-hidden py-1 card-kpi card-kpi-pres h-100">
        <div class="card-body py-1">
          <h5 class="card-title mb-1">
            <template v-if="pres !== null && anyColData('pres')">
              {{ pres }}
              <small
                v-if="presAnomaly"
                class="fw-light"
                :class="{ 'anomaly-negative': presAnomaly < 0, 'anomaly-positive': presAnomaly >= 0 }"
              >
                {{ presAnomaly }}
              </small>
              <small class="text-muted fw-light ms-1"> hPa </small>
            </template>
            <template v-else>
              <span class="text-muted">{{ t('$phrases.noData') }}</span>
            </template>
          </h5>
          <div class="text-muted text-truncate">
            <icon
              v-if="pres && anyColGaps('pres')"
              :icon="['fas', 'exclamation-circle']"
              class="me-2"
              v-tooltip="t('$phrases.someDataMissing')"
            />
            <small class="card-text">{{ t('$params.pres') }}</small>
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
      settings
    };
  },

  computed: {
    tempCol(): string {
      return this.daily ? 'tavg' : 'temp';
    },

    timeValues(): string[] {
      return this.fetchValues(this.daily ? 'date' : 'time').map(String);
    },

    latestNormals(): any[] {
      return this.normals.slice(this.normals.length - 12);
    },

    temp(): null | number {
      return getAverage(this.fetchValues(this.tempCol).map(Number));
    },

    tempAnomaly(): null | string {
      return getAnomaly(
        this.fetchValues(this.tempCol).map(Number),
        this.timeValues,
        this.latestNormals.map((n) => n.tavg)
      );
    },

    prcp(): null | number {
      return getSum(this.fetchValues('prcp').map(Number), this.settings.unitPrecision.prcp);
    },

    prcpAnomaly(): null | string {
      return getSumAnomaly(
        this.fetchValues('prcp').map(Number),
        this.timeValues,
        this.latestNormals.map((n) => n.prcp),
        this.settings.unitPrecision.prcp,
        this.daily
      );
    },

    wspd(): null | number {
      return getAverage(this.fetchValues('wspd').map(Number));
    },

    wspdAnomaly(): null | string {
      return getAnomaly(
        this.fetchValues('wspd').map(Number),
        this.timeValues,
        this.latestNormals.map((n) => n.wspd)
      );
    },

    pres(): null | number {
      return getAverage(this.fetchValues('pres').map(Number));
    },

    presAnomaly(): null | string {
      return getAnomaly(
        this.fetchValues('pres').map(Number),
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
  border: 0;
  border-radius: 0;

  .card-body {
    overflow: hidden;

    h5 {
      white-space: nowrap;
      overflow: hidden;
    }
  }

  &-temp {
    border-left: 3px solid $red;
  }
  &-prcp {
    border-left: 3px solid $cyan-600;
  }
  &-wspd {
    border-left: 3px solid rgb(51, 122, 183);
  }
  &-pres {
    border-left: 3px solid $green-400;
  }

  .anomaly-negative {
    color: $cyan-700;
  }
  .anomaly-positive {
    color: $red-700;
  }
}
</style>
