<template>
  <div class="modal-content">
    <div class="modal-header">
      <h5 class="modal-title">{{ t('details') }}</h5>
      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>
    <div class="modal-body">
      <div class="table-responsive">
        <table class="table table-striped table-bordered table-hover align-middle mb-0">
          <thead class="table-light">
            <tr>
              <th
                v-for="column in columns"
                :key="column.key"
                :class="{ 'font-monospace': !column.abbr }"
                scope="col"
                @click="sortBy(column.key)"
                v-tooltip="{ title: column.name || t(`$params.${column.key}`), trigger: 'hover' }"
              >
                {{ column.abbr || column.key.toUpperCase() }}
                <icon v-if="sort.column === column.key && sort.asc" :icon="['fas', 'arrow-up']" class="ms-1" />
                <icon v-if="sort.column === column.key && !sort.asc" :icon="['fas', 'arrow-down']" class="ms-1" />
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, index) in rows" :key="index">
              <th scope="row">
                {{ format(parseISO(row.time), 'yyyy-MM-dd') }}
              </th>
              <th scope="row">
                {{ format(parseISO(row.time), 'HH') }}
              </th>
              <td>
                <template v-if="row.coco">
                  <i :class="`wi wi-${getWeatherIcon(row.coco)}`" />
                </template>
                <span v-else class="text-muted">
                  <i class="wi wi-na" />
                </span>
              </td>
              <td>
                <template v-if="row.temp !== null">
                  {{ row.temp }}
                  <span class="text-muted">{{ settings.units.temp }}</span>
                </template>
                <span v-else class="text-muted">—</span>
              </td>
              <td>
                <template v-if="row.dwpt !== null">
                  {{ row.dwpt }}
                  <span class="text-muted">{{ settings.units.temp }}</span>
                </template>
                <span v-else class="text-muted">—</span>
              </td>
              <td>
                <template v-if="row.tsun !== null">
                  {{ row.tsun }}
                  <span class="text-muted">m</span>
                </template>
                <span v-else class="text-muted">—</span>
              </td>
              <td>
                <template v-if="row.prcp !== null">
                  {{ row.prcp }}
                  <span class="text-muted">{{ settings.units.prcp }}</span>
                </template>
                <span v-else class="text-muted">—</span>
              </td>
              <td>
                <template v-if="row.snow !== null">
                  {{ row.snow }}
                  <span class="text-muted">{{ settings.units.prcp }}</span>
                </template>
                <span v-else class="text-muted">—</span>
              </td>
              <td>
                <template v-if="row.wdir !== null">
                  <i :class="`wi wi-wind from-${row.wdir}-deg`" />
                </template>
                <span v-else class="text-muted">
                  <i class="wi wi-na" />
                </span>
              </td>
              <td>
                <template v-if="row.wspd !== null">
                  {{ row.wspd }}
                  <span class="text-muted">{{ settings.units.wspd }}</span>
                </template>
                <span v-else class="text-muted">—</span>
              </td>
              <td>
                <template v-if="row.wpgt !== null">
                  {{ row.wpgt }}
                  <span class="text-muted">{{ settings.units.wspd }}</span>
                </template>
                <span v-else class="text-muted">—</span>
              </td>
              <td>
                <template v-if="row.pres !== null">
                  {{ row.pres }}
                  <span class="text-muted">hPa</span>
                </template>
                <span v-else class="text-muted">—</span>
              </td>
              <td>
                <template v-if="row.rhum !== null">
                  {{ row.rhum }}
                  <span class="text-muted">%</span>
                </template>
                <span v-else class="text-muted">—</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="d-flex align-items-center mt-2">
        <a
          class="btn btn-light"
          role="button"
          target="_blank"
          href="https://dev.meteostat.net/formats.html#meteorological-parameters"
        >
          <icon :icon="['fas', 'question-circle']" />
          <span class="d-none d-md-inline-block ms-2">{{ t('documentation') }}</span>
        </a>
        <button class="btn btn-primary ms-auto" type="button" :disabled="count >= data.length" @click="showMore">
          <icon :icon="['fas', 'plus']" />
          <span class="ms-2">{{ t('$phrases.showMore') }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useI18n } from 'vue-i18n';
import { parseISO, format } from 'date-fns';
import { Store } from 'pinia';
import { useSettingsStore } from '~/stores/settings';

export default {
  name: 'HourlyTable',

  props: {
    data: {
      type: Array,
      required: true
    },
    display: {
      type: Number,
      default: 10
    }
  },

  setup(): Record<string, Store | any> {
    const { t } = useI18n();
    const settings = useSettingsStore();

    return { t, parseISO, format, settings };
  },

  data(): Record<string, any> {
    return {
      columns: [
        {
          name: this.t('$params.date'),
          abbr: this.t('$params.date'),
          key: 'time'
        },
        {
          name: this.t('$params.time'),
          abbr: 'H',
          key: 'time'
        },
        {
          key: 'coco'
        },
        {
          key: 'temp'
        },
        {
          key: 'dwpt'
        },
        {
          key: 'tsun'
        },
        {
          name: `${this.t('$params.prcp')} (1H)`,
          key: 'prcp'
        },
        {
          key: 'snow'
        },
        {
          key: 'wdir'
        },
        {
          key: 'wspd'
        },
        {
          key: 'wpgt'
        },
        {
          key: 'pres'
        },
        {
          key: 'rhum'
        }
      ],
      count: this.display,
      sort: {
        column: '',
        asc: true
      }
    };
  },

  computed: {
    rows(): Array<Record<string, number>> {
      // Get table data
      let data: Array<Record<string, number>> = JSON.parse(JSON.stringify(this.data));
      // Sort
      if (this.sort.column !== null) {
        data = data.sort((a: any, b: any) => {
          if (this.sort.asc === true) {
            return this.sort.column === 'time'
              ? a.time.localeCompare(b.time)
              : a[this.sort.column] - b[this.sort.column];
          } else {
            return this.sort.column === 'time'
              ? b.time.localeCompare(a.time)
              : b[this.sort.column] - a[this.sort.column];
          }
        });
      }
      // Return count
      return data.slice(0, this.count);
    }
  },

  methods: {
    sortBy(key: string): void {
      if (this.sort.column === key) {
        this.sort.asc = !this.sort.asc;
      } else {
        this.sort.column = key;
      }
    },
    showMore(): void {
      this.count += this.display;
    },
    getWeatherIcon(code: number): string {
      let icon = 'na';
      switch (code) {
        case 1:
          icon = 'day-sunny';
          break;
        case 2:
          icon = 'day-cloudy';
          break;
        case 3:
        case 4:
          icon = 'cloudy';
          break;
        case 5:
        case 6:
          icon = 'fog';
          break;
        case 7:
        case 8:
        case 9:
          icon = 'rain';
          break;
        case 10:
        case 11:
        case 12:
        case 13:
          icon = 'sleet';
          break;
        case 14:
        case 15:
        case 16:
          icon = 'snow';
          break;
        case 17:
        case 18:
          icon = 'rain-wind';
          break;
        case 19:
        case 20:
          icon = 'showers';
          break;
        case 21:
        case 22:
          icon = 'snow-wind';
          break;
        case 23:
          icon = 'lightning';
          break;
        case 24:
          icon = 'hail';
          break;
        case 25:
        case 26:
          icon = 'thunderstorm';
          break;
        case 27:
          icon = 'strong-wind';
          break;
        default:
          icon = 'na';
      }
      return icon;
    }
  }
};
</script>

<style lang="scss" scoped>
table {
  thead th {
    user-select: none;
    font-size: 0.75rem;
    white-space: nowrap;
    text-align: center;
  }

  tbody {
    border-top: 0 !important;
  }

  td,
  tbody th {
    white-space: nowrap;
    font-size: 0.9rem;
    font-weight: normal;
    text-align: center;
    padding: 0.75rem 0.5rem;

    i {
      font-size: 1.2rem;
    }
  }
}
</style>

<style>
@import '~/style/weather-icons/css/weather-icons-meteostat.css';
@import '~/style/weather-icons/css/weather-icons-wind-meteostat.css';
</style>
