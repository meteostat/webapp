<template>
  <div class="card">
    <ul class="list-group list-group-flush">
      <li class="list-group-item p-0">
        <Map
          :lat="data.location.latitude"
          :lon="data.location.longitude"
        />
      </li>
      <li
        v-if="data.country"
        class="list-group-item d-flex"
      >
        {{ t('country') }}:
        <span class="ms-auto d-flex align-items-center">{{ data.country }}</span>
      </li>
      <li
        v-if="data.region"
        class="list-group-item d-flex"
      >
        {{ t('region') }}:
        <span class="ms-auto d-flex align-items-center">{{ data.region }}</span>
      </li>
      <li class="list-group-item d-flex">
        {{ t('elevation') }}:
        <span class="ms-auto d-flex align-items-center">{{ data.location.elevation }} m</span>
      </li>
      <li
        v-if="data.timezone"
        class="list-group-item d-flex"
      >
        {{ t('timezone') }}:
        <span class="ms-auto d-flex align-items-center">{{ data.timezone }}</span>
      </li>
      <li class="list-group-item d-flex">
        {{ t('coordinates') }}:
        <span class="ms-auto d-flex align-items-center">
          <a
            :href="`//www.google.com/maps/place/${ data.location.latitude },${ data.location.longitude }`"
            target="_blank"
            class="text-dark"
          >
            {{ data.location.latitude }}, {{ data.location.longitude }}
          </a>
        </span>
      </li>
      <li
        v-if="data.identifiers"
        class="list-group-item bg-light"
      >
        <small class="fw-bold">{{ t('stationIdentifiers') }}</small>
      </li>
      <li
        v-if="data.identifiers"
        class="list-group-item d-flex"
      >
        {{ t('meteostat') }}:
        <code class="badge bg-light text-dark border ms-auto d-flex align-items-center">{{ data.id }}</code>
      </li>
      <li
        v-if="data.identifiers"
        class="list-group-item d-flex"
      >
        {{ t('national') }}:
        <code class="badge bg-light text-dark border ms-auto d-flex align-items-center">{{ data.identifiers.national||'/' }}</code>
      </li>
      <li
        v-if="data.identifiers"
        class="list-group-item d-flex"
      >
        {{ t('wmo') }}:
        <code class="badge bg-light text-dark border ms-auto d-flex align-items-center">{{ data.identifiers.wmo||'/' }}</code>
      </li>
      <li
        v-if="data.identifiers"
        class="list-group-item d-flex"
      >
        {{ t('icao') }}:
        <code class="badge bg-light text-dark border ms-auto d-flex align-items-center">{{ data.identifiers.icao||'/' }}</code>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { useI18n } from 'vue-i18n'
import Map from './Map.vue'

export default {
  name: 'Meta',

  components: {
    Map
  },

  props: {
    data: {
      type: Object,
      default: null
    }
  },

  setup(): Record<string, any> {
    const { t } = useI18n()

    return { t }
  }
}
</script>

<i18n>
{
  "en": {
    "country": "Country",
    "region": "Region",
    "elevation": "Elevation",
    "timezone": "Timezone",
    "coordinates": "Coordinates",
    "stationIdentifiers": "Station Identifiers",
    "national": "National",
    "wmo": "WMO",
    "icao": "ICAO"
  }
}
</i18n>