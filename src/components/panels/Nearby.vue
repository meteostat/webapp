<template>
  <div class="card mt-4">
    <div class="card-header d-flex align-items-center">
      <h3 class="fs-6 fw-bolder mb-0">{{ t('nearbyStations') }}</h3>
    </div>
    <ul class="list-group list-group-flush">
      <router-link
        v-for="station in stations"
        :key="station.id"
        :to="`/station/${station.id}`"
        class="list-group-item list-group-item-action d-flex align-items-center"
      >
        <span class="text-truncate">{{ station.name }}</span>
        <span class="ms-auto text-nowrap">
          <span v-if="!station.active" class="badge bg-secondary me-1">{{ t('archive') }}</span>
          <code class="badge bg-light text-dark border ms-auto">
            {{ station.id }}
          </code>
        </span>
      </router-link>
    </ul>
  </div>
</template>

<script>
import { useI18n } from 'vue-i18n';

export default {
  name: 'Nearby',

  emits: ['loaded'],

  props: {
    lat: Number,
    lon: Number,
    limit: {
      type: Number,
      default: 7
    }
  },

  setup() {
    const { t } = useI18n();

    return { t };
  },

  data() {
    return {
      stations: []
    };
  },

  async mounted() {
    await fetch(
      `https://api.meteostat.net/app/nearby?lat=${this.lat}&lon=${this.lon}&lang=${this.$locale}&limit=${this.limit}`
    )
      .then((response) => response.json())
      .then((data) => {
        this.stations = data.data;
        this.$emit('loaded', this.stations);
      });
  }
};
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
  }
}
</i18n>
