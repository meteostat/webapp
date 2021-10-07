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
        v-if="data.identifier"
        class="list-group-item bg-light"
      >
        <small class="fw-bold">{{ t('stationIdentifiers') }}</small>
      </li>
      <li
        v-if="data.identifier"
        class="list-group-item d-flex"
      >
        Meteostat:
        <code class="badge bg-light text-dark border ms-auto d-flex align-items-center">{{ data.id }}</code>
      </li>
      <li
        v-if="data.identifier"
        class="list-group-item d-flex"
      >
        {{ t('national') }}:
        <code class="badge bg-light text-dark border ms-auto d-flex align-items-center">{{ data.identifier.national||'/' }}</code>
      </li>
      <li
        v-if="data.identifier"
        class="list-group-item d-flex"
      >
        WMO:
        <code class="badge bg-light text-dark border ms-auto d-flex align-items-center">{{ data.identifier.wmo||'/' }}</code>
      </li>
      <li
        v-if="data.identifier"
        class="list-group-item d-flex"
      >
        ICAO:
        <code class="badge bg-light text-dark border ms-auto d-flex align-items-center">{{ data.identifier.icao||'/' }}</code>
      </li>
      <li
        v-if="data.inventory"
        class="list-group-item bg-light"
      >
        <small class="fw-bold">{{ t('inventory') }}</small>
      </li>
      <li
        v-if="data.inventory"
        class="list-group-item d-flex align-items-center"
      >
        {{ t('hourly') }}:
        <span
          class="ms-auto"
        >
          <template v-if="data.inventory.hourly.start">
            <small class="text-muted">
              {{ format(parseISO(data.inventory.hourly.start), t('dateFormat')) }} - {{ format(parseISO(data.inventory.hourly.end), t('dateFormat')) }}
            </small>
            <icon
              :icon="['fas', 'circle']"
              class="text-success ms-2"
            />
          </template>
          <template v-else>
            <icon
              :icon="['fas', 'circle']"
              class="text-danger ms-auto"
            />
          </template>
        </span>
      </li>
      <li
        v-if="data.inventory"
        class="list-group-item d-flex align-items-center"
      >
        {{ t('daily') }}:
        <span
          class="ms-auto"
        >
          <template v-if="data.inventory.daily.start">
            <small class="text-muted">
              {{ format(parseISO(data.inventory.daily.start), t('dateFormat')) }} - {{ format(parseISO(data.inventory.daily.end), t('dateFormat')) }}
            </small>
            <icon
              :icon="['fas', 'circle']"
              class="text-success ms-2"
            />
          </template>
          <template v-else>
            <icon
              :icon="['fas', 'circle']"
              class="text-danger ms-auto"
            />
          </template>
        </span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { useI18n } from 'vue-i18n'
import { format, parseISO } from 'date-fns'
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

    return { t, format, parseISO }
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
    "inventory": "Inventory",
    "hourly": "Hourly",
    "daily": "Daily"
  },
  "de": {
    "country": "Land",
    "region": "Region",
    "elevation": "Höhe",
    "timezone": "Zeitzone",
    "coordinates": "Koordinaten",
    "stationIdentifiers": "Stationskennungen",
    "national": "National",
    "inventory": "Datenverfügbarkeit",
    "hourly": "Stündlich",
    "daily": "Täglich"
  },
  "it": {
    "country": "Paese",
    "region": "Regione",
    "elevation": "Elevazione",
    "timezone": "Fuso orario",
    "coordinates": "Coordinate",
    "stationIdentifiers": "Identificatori di Stazione",
    "national": "Nazionale",
    "inventory": "Inventario",
    "hourly": "Oraria",
    "daily": "Giornaliero"
  },
  "es": {
    "country": "País",
    "region": "Región",
    "elevation": "Elevación",
    "timezone": "Zona Horaria",
    "coordinates": "Coordenadas",
    "stationIdentifiers": "Identificadores de Estación",
    "national": "Nacional",
    "inventory": "Inventario",
    "hourly": "Por Hora",
    "daily": "Diario"
  },
  "nl": {
    "country": "Land",
    "region": "Regio",
    "elevation": "Verhoging",
    "timezone": "Tijdzone",
    "coordinates": "Coördinaten",
    "stationIdentifiers": "Identificatie Stations",
    "national": "Nationaal",
    "inventory": "Inventaris",
    "hourly": "Uurlijks",
    "daily": "Dagelijks"
  },
  "fr": {
    "country": "Pays",
    "region": "Région",
    "elevation": "Élévation",
    "timezone": "Fuseau Horaire",
    "coordinates": "Coordonnées",
    "stationIdentifiers": "Identificateurs de Station",
    "national": "National",
    "inventory": "Inventaire",
    "hourly": "Horaire",
    "daily": "Quotidiennement"
  },
  "pt": {
    "country": "País",
    "region": "Região",
    "elevation": "Elevação",
    "timezone": "Fuso Horário",
    "coordinates": "Coordenadas",
    "stationIdentifiers": "Identificadores de Estação",
    "national": "Nacional",
    "inventory": "Inventário",
    "hourly": "Horário",
    "daily": "Diariamente"
  },
  "ru": {
    "country": "Страна",
    "region": "Регион",
    "elevation": "Высота",
    "timezone": "Часовой пояс",
    "coordinates": "Координаты",
    "stationIdentifiers": "Идентификаторы станции",
    "national": "национальный",
    "inventory": "инвентаризация",
    "hourly": "Почасовая",
    "daily": "Ежедневно" 
  }
}
</i18n>