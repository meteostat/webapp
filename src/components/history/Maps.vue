<template>
  <div
    ref="wrapper"
    class="wrapper"
  >
    <div class="d-flex align-items-center">
      <span class="lead">{{ format(date, 'yyyy-MM-dd') }}</span>
      <div
        v-if="cells.length === 0"
        class="ms-2"
      >
        <icon
          :icon="['fas', 'exclamation-circle']"
          class="me-1 text-danger"
        />
        {{ t('$phrases.noData') }}
      </div>
      <div
        v-if="loading"
        class="spinner-border spinner-border-sm ms-2"
        role="status"
      />
      <div class="d-flex align-items-center ms-auto">
        <button
          type="button"
          class="btn btn-light bg-white"
          @click="downloadMap()"
        >
          <icon :icon="['fas', 'download']" />
        </button>
        <button
          type="button"
          class="btn btn-light bg-white ms-1"
          @click="toggleFullscreen()"
        >
          <icon
            v-if="!fullscreen"
            :icon="['fas', 'expand']"
          />
          <icon
            v-if="fullscreen"
            :icon="['fas', 'compress']"
          />
        </button>
        <div class="dropdown ms-2">
          <button
            id="dropdownMenuButton"
            class="btn btn-light bg-white dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            {{ parameterName }}
          </button>
          <ul
            class="dropdown-menu"
            aria-labelledby="dropdownMenuButton"
          >
            <li>
              <a
                class="dropdown-item"
                @click="setParameter('tavg')"
              >{{ t('$params.tavg') }}</a>
            </li>
            <li>
              <a
                class="dropdown-item"
                @click="setParameter('tmin')"
              >{{ t('$params.tmin') }}</a>
            </li>
            <li>
              <a
                class="dropdown-item"
                @click="setParameter('tmax')"
              >{{ t('$params.tmax') }}</a>
            </li>
            <li>
              <a
                class="dropdown-item"
                @click="setParameter('prcp')"
              >{{ t('$params.prcp') }}</a>
            </li>
            <li>
              <a
                class="dropdown-item"
                @click="setParameter('wspd')"
              >{{ t('$params.wspd') }}</a>
            </li>
            <li>
              <a
                class="dropdown-item"
                @click="setParameter('pres')"
              >{{ t('$params.pres') }}</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div
      ref="map"
      class="map my-2 rounded"
    />
    <div class="d-flex align-items-center">
      <div class="btn-group btn-group-sm rounded border">
        <button
          type="button"
          class="btn btn-light bg-white px-3"
          :disabled="subDays(date, 1) < range[0]"
          @click="goBackward()"
        >
          <icon :icon="['fas', 'backward']" />
        </button>
        <button
          type="button"
          class="btn btn-primary px-4"
          :disabled="differenceInDays(range[1], range[0]) === 0"
          @click="play()"
        >
          <icon
            v-if="!playing"
            :icon="['fas', 'play']"
          />
          <icon
            v-if="playing"
            :icon="['fas', 'pause']"
          />
        </button>
        <button
          type="button"
          class="btn btn-light bg-white px-3"
          :disabled="addDays(date, 1) > range[1]"
          @click="goForward()"
        >
          <icon :icon="['fas', 'forward']" />
        </button>
      </div>
      <small class="ms-auto">
        <a
          href="https://www.openstreetmap.org/"
          target="_blank"
          class="text-muted"
        >OpenStreetMap</a>,
        <a
          href="https://carto.com/attribution"
          target="_blank"
          class="text-muted"
        >CARTO</a>
      </small>
    </div>
    <div class="legend mt-4">
      <div class="d-flex align-item-center">
        <div
          v-if="scale.zero"
          class="legend-item"
          :style="`background: ${scale.zero}`"
        />
        <div
          v-for="color in scale.colors"
          :key="color"
          class="legend-item"
          :style="`background: ${color}`"
        />
      </div>
      <div class="d-flex align-items-center justify-content-between mt-2">
        <span>
          {{ scale.min }}
          <span class="text-muted">{{ scale.label }}</span>
        </span>
        <span>
          {{ Math.round((scale.min + scale.max) / 2) }}
          <span class="text-muted">{{ scale.label }}</span>
        </span>
        <span>
          {{ scale.max }}
          <span class="text-muted">{{ scale.label }}</span>
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { useI18n } from 'vue-i18n'
import { format, addDays, subDays, differenceInDays } from 'date-fns'
import { useSettingsStore } from '../../stores/settings'
import { Map, Rectangle } from 'leaflet'
import markerIcon from "leaflet/dist/images/marker-icon.png"
import { parse } from 'papaparse'
import { tempScale, prcpScale, wspdScale, presScale, ColorScale } from '../../utils/colorScale'
import { toFahrenheit, toInches, toMPH } from '../../utils/units'
import useLeaflet from '../../utils/leaflet'
import leafletImage from 'leaflet-image'
import { saveAs } from 'file-saver'
import '../../../node_modules/leaflet/dist/leaflet.css';

export default defineComponent({
  name: 'MeteoMaps',

  props: {
    lat: {
      type: Number,
      required: true
    },
    lon: {
      type: Number,
      required: true
    },
    range: {
      type: Array as PropType<Array<Date>>,
      required: true
    }
  },

  setup(): Record<string, any> {
    // Translations
    const { t } = useI18n()

    // Settings store
    const settings = useSettingsStore()

    return { t, settings, format, subDays, addDays, differenceInDays }
  },

  data(): Record<string, Map|Date|string|null|Array<Rectangle>|any> {
    return {
      L: null,
      map: null,
      date: this.range[0],
      parameter: 'tavg',
      parameterName: this.t('$params.tavg'),
      cells: [],
      interval: null,
      playing: false,
      loading: true,
      fullscreen: false,
      scale: {
        colors: [],
        label: null,
        min: null,
        max: null
      }
    }
  },

  watch: {
    async range(): Promise<void> {
      if (this.map !== null) {
        this.date = this.range[0]
        await this.fetchData()
      }
    }
  },

  async mounted(): Promise<void> {
    this.L = await useLeaflet()

    this.map = this.L.map(this.$refs.map, {
      preferCanvas: true
    }).setView([this.lat, this.lon], 4)

    this.map.dragging.disable()
    this.map.touchZoom.disable()
    this.map.doubleClickZoom.disable()
    this.map.scrollWheelZoom.disable()
    this.map.boxZoom.disable()
    this.map.keyboard.disable()
    this.map.attributionControl.setPrefix(false)

    this.L.tileLayer('//{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png', {
      minZoom: 2,
      maxZoom: 7,
      attribution: false,
      id: 'osm'
    }).addTo(this.map)

    this.map.on('moveend', () => {
      this.fetchData()
    })

    await this.fetchData()

    const icon = new this.L.icon({
      iconUrl: markerIcon,
      iconSize: [25, 41],
      iconAnchor: [12, 41]
    })
    this.L.marker([this.lat, this.lon], { opacity: 1, icon: icon }).addTo(this.map);
  },

  methods: {
    clearMap(): void {
      for (let i in this.cells) {
        this.map.removeLayer(this.cells[i])
      }
      this.cells = []
    },

    async fetchData(): Promise<void> {
      // Start loading
      this.loading = true

      // Get bounds
      const bounds = [
        Math.min(90, this.map.getBounds().getNorth() + 0.5),
        Math.max(-180, this.map.getBounds().getWest() - 0.5),
        Math.max(-90, this.map.getBounds().getSouth() - 0.5),
        Math.min(180, this.map.getBounds().getEast() + 0.5)
      ]

      await parse(`${this.$api}/app/spatial?parameter=${this.parameter}&date=${format(this.date, 'yyyy-MM-dd')}&bounds=${bounds.join()}`, {
        download: true,
        dynamicTyping: true,
        complete: (result: Record<string, any>): void => {
          // Remove cells from map
          this.clearMap()
          // Get scale definition
          let definition = tempScale
          let min: number|null = -10
          let max: number|null = 30
          let zero = null
          switch (this.parameter) {
            case 'tavg':
            case 'tmin':
            case 'tmax':
              if (this.parameter === 'tmin') {
                min = -15
                max = 25
              }
              else if (this.parameter == 'tmax') {
                min = 0
                max = 40
              }
              this.scale.label = this.settings.units.temp
              if (this.settings.imperial) {
                this.scale.min = toFahrenheit(min)
                this.scale.max = toFahrenheit(max)
              } else {
                this.scale.min = min
                this.scale.max = max
              }
              break
            case 'prcp':
              definition = prcpScale
              min = 0
              max = 20
              zero = '#aaa'
              this.scale.label = this.settings.units.prcp
              if (this.settings.imperial) {
                this.scale.min = toInches(min)
                this.scale.max = toInches(max)
              } else {
                this.scale.min = min
                this.scale.max = max
              }
              break
            case 'wspd':
              definition = wspdScale
              min = 0
              max = 30
              this.scale.label = this.settings.units.wspd
              if (this.settings.imperial) {
                this.scale.min = toMPH(min)
                this.scale.max = toMPH(max)
              } else {
                this.scale.min = min
                this.scale.max = max
              }
              break
            case 'pres':
              definition = presScale
              min = 990
              max = 1025
              this.scale.label = 'hPa'
              this.scale.min = min
              this.scale.max = max
              break
          }
          // Persist scale info
          this.scale.colors = definition
          this.scale.zero = zero
          // Initialize scale
          const scale = new ColorScale(definition, min, max, zero)
          // Create cells
          result.data.forEach((data: Array<number>): void => {
            if (data[2] !== null) {
              try {
                this.cells.push(
                  this.L.rectangle([
                    [data[0]+0.5, data[1]-0.5],
                    [data[0]-0.5, data[1]+0.5]
                  ], {
                    fillColor: scale.getColor(data[2]),
                    fillOpacity: 0.6,
                    weight: 0
                  }).addTo(this.map)
                )
              } catch {
                console.log("Error")
              }
            }
          })
          // Finish loading
          this.loading = false
        }
      })
    },

    setParameter(parameter: string): void {
      this.parameter = parameter
      this.parameterName = this.t(`$params.${parameter}`)
      this.fetchData()
    },

    goBackward(): void {
      const prev = subDays(this.date, 1)
      if (prev >= this.range[0]) {
        this.date = prev
        this.fetchData()
      }
    },

    goForward(): void {
      const next = addDays(this.date, 1)
      if (next <= this.range[1]) {
        this.date = next
        this.fetchData()
      }
    },

    play(): void {
      if (this.playing) {
        clearInterval(this.interval)
      } else {
        this.interval = setInterval(() => {
          // Get current date
          const currentDate = this.date
          // Next day
          this.goForward()
          // Check if dates equal
          if (currentDate === this.date) {
            // Reset date
            this.date = this.range[0]
            // Get data
            this.fetchData()
          }
        }, 2000)
      }
      this.playing = !this.playing
    },

    downloadMap(): void {
      let map = this.map
      leafletImage(map, (err: any, canvas: HTMLCanvasElement): void => {
				canvas.toBlob(blob => {
					saveAs(blob, 'map.png');
				});
      });
    },

    toggleFullscreen(): void {
      if (!document.fullscreenElement) {
          (this.$refs as any).wrapper.requestFullscreen()
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen()
        }
      }
      this.fullscreen = !this.fullscreen
    }
  }
})
</script>

<style lang="scss" scoped>
@import "../node_modules/bootstrap/scss/functions";
@import "../node_modules/bootstrap/scss/variables";
@import "../node_modules/bootstrap/scss/mixins";

.map {
  width: 100%;
  height: 500px;

  a, a:hover, a:active {
    color: #333 !important;
  }
}

.wrapper:fullscreen {
  display: flex;
  flex-flow: column;
  width: 100%;
  height: 100%;
  padding: 1rem;
  background: $white;

  .map {
    height: 100%;
  }
}

.legend {
  &-item {
    width: 100%;
    height: 20px;
  }
}
</style>