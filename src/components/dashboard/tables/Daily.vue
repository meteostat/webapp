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
              <th />
              <th colspan="3">
                {{ t('$meteo.temp') }}
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
                {{ format(parseISO(row.date), 'yyyy-MM-dd') }}
              </th>
              <td>
                <template v-if="row.tmin !== null">
                  {{ row.tmin }}
                  <span class="text-muted">{{ settings.units.temp }}</span>
                </template>
                <span
                  v-else
                  class="text-muted"
                >—</span>
              </td>
              <td>
                <template v-if="row.tavg !== null">
                  {{ row.tavg }}
                  <span class="text-muted">{{ settings.units.temp }}</span>
                </template>
                <span
                  v-else
                  class="text-muted"
                >—</span>
              </td>
              <td>
                <template v-if="row.tmax !== null">
                  {{ row.tmax }}
                  <span class="text-muted">{{ settings.units.temp }}</span>
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
  name: 'DailyTable',

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
          key: 'date'
        },
        {
          name: this.t('$params.tmin'),
          abbr: this.t('min'),
          key: 'tmin'
        },
        {
          name: this.t('$params.tavg'),
          abbr: this.t('avg'),
          key: 'tavg'
        },
        {
          name: this.t('$params.tmax'),
          abbr: this.t('max'),
          key: 'tmax'
        },
        {
          name: this.t('$params.prcp'),
          abbr: this.t('total'),
          key: 'prcp'
        },
        {
          name: this.t('$params.snow'),
          abbr: this.t('$meteo.snow'),
          key: 'snow'
        },
        {
          name: '',
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
          abbr: this.t('$meteo.pres'),
          key: 'pres'
        },
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