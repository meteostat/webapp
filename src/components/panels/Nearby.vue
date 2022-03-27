<template>
  <div class="card mt-4">
    <div class="card-header fw-bold">
      {{ t('nearbyStations') }}
    </div>
    <ul class="list-group list-group-flush">
      <router-link
        v-for="station in stations"
        :key="station.id"
        :to="`/station/${station.id}`"
        class="list-group-item list-group-item-action d-flex align-items-center"
      >
        <span class="text-truncate">{{ station.name.en }}</span>
        <code class="badge bg-light text-dark border ms-auto">{{ station.id }}</code>
      </router-link>
    </ul>
  </div>
</template>

<script>
import { useI18n } from 'vue-i18n'

export default {
  name: 'Nearby',

  props: {
    lat: Number,
    lon: Number,
    limit: {
      type: Number,
      default: 7
    }
  },

  setup() {
    const { t } = useI18n()

    return { t }
  },

  data() {
    return {
      stations: []
    }
  },

  async mounted() {
    await fetch(`https://api.meteostat.net/app/proxy/stations/nearby?lat=${this.lat}&lon=${this.lon}&limit=${this.limit}`)
      .then(response => response.json())
      .then(data => this.stations = data.data) 
  }
}
</script>

<i18n>
{
  "en": {
    "nearbyStations": "Nearby Stations"
  },
  "de": {
    "nearbyStations": "Wetterstationen in der Nähe"
  },
  "it": {
    "nearbyStations": "Stazioni Vicine"
  },
  "es": {
    "nearbyStations": "Estaciones Cercanas"
  },
  "nl": {
    "nearbyStations": "Stations in de Buurt"
  },
  "fr": {
    "nearbyStations": "Stations à Proximité"
  },
  "pt": {
    "nearbyStations": "Estações Próximas"
  },
  "ru": {
    "nearbyStations": "Близлежащие станции"
  },
  "zh": {
    "nearbyStations": "附近站点"
  }
}
</i18n>
