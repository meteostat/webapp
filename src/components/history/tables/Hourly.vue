<template>
  <div class="card mt-3 mt-md-4">
    <div class="card-header card-header-main px-0 rounded-0 bg-white">
      <h2 class="card-header-title lead">
        {{ t('details') }}
      </h2>
    </div>
    <div class="card-body px-0">
      <div class="table-responsive">
        <table class="table table-striped table-bordered table-hover align-middle">
          <thead class="table-light">
            <tr>
              <th colspan="2">
                {{ t('$params.time') }}
              </th>
              <th colspan="3">
                {{ t('$meteo.weather') }}
              </th>
              <th colspan="2">
                {{ t('$meteo.prcp') }}
              </th>
              <th colspan="3">
                {{ t('$meteo.wind') }}
              </th>
              <th colspan="2">
                {{ t('$meteo.air') }}
              </th>
            </tr>
            <tr>
              <th
                v-for="column in columns"
                :key="column.key"
                scope="col"
                @click="sortBy(column.key)"
              >
                <abbr :title="column.name">
                  {{ column.abbr || column.name }}
                </abbr>
                <icon
                  v-if="sort.column === column.key && sort.asc"
                  :icon="['fas', 'arrow-up']"
                  class="ms-2"
                />
                <icon
                  v-if="sort.column === column.key && !sort.asc"
                  :icon="['fas', 'arrow-down']"
                  class="ms-2"
                />
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(row, index) in rows"
              :key="index"
            >
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
                <span
                  v-else
                  class="text-muted"
                >
                  <i class="wi wi-na" />
                </span>
              </td>
              <td>
                <template v-if="row.temp !== null">
                  {{ row.temp }}
                  <span class="text-muted">{{ settings.units.temp }}</span>
                </template>
                <span
                  v-else
                  class="text-muted"
                >—</span>
              </td>
              <td>
                <template v-if="row.tsun !== null">
                  {{ row.tsun }}
                  <span class="text-muted">m</span>
                </template>
                <span
                  v-else
                  class="text-muted"
                >—</span>
              </td>
              <td>
                <template v-if="row.prcp !== null">
                  {{ row.prcp }}
                  <span class="text-muted">{{ settings.units.prcp }}</span>
                </template>
                <span
                  v-else
                  class="text-muted"
                >—</span>
              </td>
              <td>
                <template v-if="row.snow !== null">
                  {{ row.snow }}
                  <span class="text-muted">{{ settings.units.prcp }}</span>
                </template>
                <span
                  v-else
                  class="text-muted"
                >—</span>
              </td>
              <td>
                <template v-if="row.wdir !== null">
                  <i :class="`wi wi-wind from-${row.wdir}-deg`" />
                </template>
                <span
                  v-else
                  class="text-muted"
                >
                  <i class="wi wi-na" />
                </span>
              </td>
              <td>
                <template v-if="row.wspd !== null">
                  {{ row.wspd }}
                  <span class="text-muted">{{ settings.units.wspd }}</span>
                </template>
                <span
                  v-else
                  class="text-muted"
                >—</span>
              </td>
              <td>
                <template v-if="row.wpgt !== null">
                  {{ row.wpgt }}
                  <span class="text-muted">{{ settings.units.wspd }}</span>
                </template>
                <span
                  v-else
                  class="text-muted"
                >—</span>
              </td>
              <td>
                <template v-if="row.pres !== null">
                  {{ row.pres }}
                  <span class="text-muted">hPa</span>
                </template>
                <span
                  v-else
                  class="text-muted"
                >—</span>
              </td>
              <td>
                <template v-if="row.rhum !== null">
                  {{ row.rhum }}
                  <span class="text-muted">%</span>
                </template>
                <span
                  v-else
                  class="text-muted"
                >—</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="d-grid">
        <button
          class="btn btn-light"
          type="button"
          :disabled="count >= data.length"
          @click="showMore"
        >
          {{ t('$phrases.showMore') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useI18n } from 'vue-i18n'
import { parseISO, format } from 'date-fns'
import { Store } from 'pinia'
import { useSettingsStore } from '~/stores/settings'

export default {
  name: 'HourlyTable',

  props: {
    data: {
      type: Array,
      required: true
    },
    display: {
      type: Number,
      default: 15
    }
  },

  setup(): Record<string, Store|any> {
    const { t } = useI18n()
    const settings = useSettingsStore()

    return { t, parseISO, format, settings }
  },

  data(): Record<string, any> {
    return {
      columns: [
        {
          name: this.t('$params.date'),
          abbr: null,
          key: 'time'
        },
        {
          name: this.t('hour'),
          abbr: 'H',
          key: 'time'
        },
        {
          name: null,
          abbr: null,
          key: 'coco'
        },
        {
          name: this.t('$params.temp'),
          abbr: `${this.t('$params.temp').substr(0, 4)}.`,
          key: 'temp'
        },
        {
          name: this.t('$params.tsun'),
          abbr: `${this.t('$meteo.sunshine').substr(0, 3)}.`,
          key: 'tsun'
        },
        {
          name: `${this.t('$params.prcp')} (1H)`,
          abbr: '1H',
          key: 'prcp'
        },
        {
          name: this.t('$params.snow'),
          abbr: this.t('$meteo.snow'),
          key: 'snow'
        },
        {
          name: null,
          key: 'wdir'
        },
        {
          name: this.t('$params.wspd'),
          abbr: this.t('avg'),
          key: 'wspd'
        },
        {
          name: this.t('$params.wpgt'),
          abbr: this.t('$meteo.gust'),
          key: 'wpgt'
        },
        {
          name: this.t('$params.pres'),
          abbr: `${this.t('$meteo.pres').substr(0, 4)}.`,
          key: 'pres'
        },
        {
          name: this.t('$params.rhum'),
          abbr: `${this.t('$meteo.humidity').substr(0, 3)}.`,
          key: 'rhum'
        }
      ],
      count: this.display,
      sort: {
        column: '',
        asc: true
      }
    }
  },

  computed: {
    rows(): Array<Record<string, number>> {
      // Get table data
      let data: Array<Record<string, number>> = JSON.parse(JSON.stringify(this.data))
      // Sort
      if (this.sort.column !== null) {
        data = data.sort((a, b) => {
          if (this.sort.asc === true) {
            return a[this.sort.column] - b[this.sort.column]
          } else {
            return b[this.sort.column] - a[this.sort.column]
          }
        })
      }
      // Return count
      return data.slice(0, this.count)
    }
  },

  methods: {
    sortBy(key: string): void {
      if (this.sort.column === key) {
        this.sort.asc = !this.sort.asc
      } else {
        this.sort.column = key
      }
    },
    showMore(): void {
      this.count += this.display
    },
    getWeatherIcon(code: number): string {
      let icon = 'na'
      switch(code) {
        case 1:
          icon = 'day-sunny'
          break
        case 2:
          icon = 'day-cloudy'
          break
        case 3:
        case 4:
          icon = 'cloudy'
          break
        case 5:
        case 6:
          icon = 'fog'
          break
        case 7:
        case 8:
        case 9:
          icon = 'rain'
          break
        case 10:
        case 11:
        case 12:
        case 13:
          icon = 'sleet'
          break
        case 14:
        case 15:
        case 16:
          icon = 'snow'
          break
        case 17:
        case 18:
          icon = 'rain-wind'
          break
        case 19:
        case 20:
          icon = 'showers'
          break
        case 21:
        case 22:
          icon = 'snow-wind'
          break
        case 23:
          icon = 'lightning'
          break
        case 24:
          icon = 'hail'
          break
        case 25:
        case 26:
          icon = 'thunderstorm'
          break
        case 27:
          icon = 'strong-wind'
          break
        default:
          icon = 'na'
      }
      return icon
    }
  }
}
</script>

<style lang="scss" scoped>
table {
  thead th {
    user-select: none;
    font-size: .75rem;
    white-space: nowrap;
    text-align: center;
  }

  tbody {
    border-top: 0 !important;
  }

  td, tbody th {
    white-space: nowrap;
    font-size: .9rem;
    font-weight: normal;
    text-align: center;
    padding: .75rem .5rem;

    i {
      font-size: 1.2rem;
    }
  }
}
</style>

<style>
@import "~/style/weather-icons/css/weather-icons-meteostat.css";
@import "~/style/weather-icons/css/weather-icons-wind-meteostat.css";
</style>