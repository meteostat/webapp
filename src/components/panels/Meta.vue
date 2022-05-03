<template>
  <div class="card">
    <ul class="list-group list-group-flush">
      <li class="list-group-item p-0">
        <Map :lat="data.location.latitude" :lon="data.location.longitude" />
      </li>
      <li v-if="data.country" class="list-group-item d-flex">
        {{ t('country') }}:
        <span class="ms-auto d-flex align-items-center">{{ data.country }}</span>
      </li>
      <li v-if="data.region" class="list-group-item d-flex">
        {{ t('region') }}:
        <span class="ms-auto d-flex align-items-center">{{ data.region }}</span>
      </li>
      <li class="list-group-item d-flex">
        {{ t('elevation') }}:
        <span class="ms-auto d-flex align-items-center">{{ data.location.elevation }} m</span>
      </li>
      <li v-if="data.timezone" class="list-group-item d-flex">
        {{ t('timezone') }}:
        <span class="ms-auto d-flex align-items-center">{{ data.timezone }}</span>
      </li>
      <li class="list-group-item d-flex">
        {{ t('coordinates') }}:
        <span class="ms-auto d-flex align-items-center">
          <a
            :href="`//www.google.com/maps/place/${data.location.latitude},${data.location.longitude}`"
            target="_blank"
            class="text-dark"
          >
            {{ data.location.latitude }}, {{ data.location.longitude }}
          </a>
        </span>
      </li>
      <li class="list-group-item bg-light">
        <i18n-t v-if="!data.identifier" keypath="$discover" tag="small" class="fw-bold">
          <template #name>
            {{ data?.name }}
          </template>
        </i18n-t>
        <i18n-t v-else keypath="discover" tag="small" class="fw-bold" />
      </li>
      <a
        :href="getHotelsLink($locale, data.name)"
        target="_blank"
        class="list-group-item list-group-item-action d-flex align-items-center"
      >
        <icon :icon="['fas', 'hotel']" class="me-3" />
        <i18n-t keypath="$hotels" tag="span">
          <template #name>
            {{ data?.name }}
          </template>
        </i18n-t>
      </a>
      <a
        :href="getFlightsLink($locale)"
        target="_blank"
        class="list-group-item list-group-item-action d-flex align-items-center"
      >
        <icon :icon="['fas', 'plane-departure']" class="me-3" />
        <i18n-t keypath="$flights" tag="span">
          <template #name>
            {{ data?.name }}
          </template>
        </i18n-t>
      </a>
      <a
        :href="getCarsLink($locale, data.name)"
        target="_blank"
        class="list-group-item list-group-item-action d-flex align-items-center"
      >
        <icon :icon="['fas', 'car']" class="me-3" />
        <i18n-t keypath="$cars" tag="span">
          <template #name>
            {{ data?.name }}
          </template>
        </i18n-t>
      </a>
      <a
        :href="getActivitiesLink($locale, data.name)"
        target="_blank"
        class="list-group-item list-group-item-action d-flex align-items-center"
      >
        <icon :icon="['fas', 'skating']" class="me-3" />
        <i18n-t keypath="$activities" tag="span">
          <template #name>
            {{ data?.name }}
          </template>
        </i18n-t>
      </a>
      <li v-if="data.identifier" class="list-group-item bg-light">
        <small class="fw-bold">{{ t('stationIdentifiers') }}</small>
      </li>
      <li v-if="data.identifier" class="list-group-item d-flex">
        Meteostat:
        <code class="badge bg-light text-dark border ms-auto d-flex align-items-center">{{ data.id }}</code>
      </li>
      <li v-if="data.identifier" class="list-group-item d-flex">
        {{ t('national') }}:
        <code class="badge bg-light text-dark border ms-auto d-flex align-items-center">{{
          data.identifier.national || '/'
        }}</code>
      </li>
      <li v-if="data.identifier" class="list-group-item d-flex">
        WMO:
        <code class="badge bg-light text-dark border ms-auto d-flex align-items-center">{{
          data.identifier.wmo || '/'
        }}</code>
      </li>
      <li v-if="data.identifier" class="list-group-item d-flex">
        ICAO:
        <code class="badge bg-light text-dark border ms-auto d-flex align-items-center">{{
          data.identifier.icao || '/'
        }}</code>
      </li>
      <li v-if="data.inventory" class="list-group-item bg-light">
        <small class="fw-bold">{{ t('inventory') }}</small>
      </li>
      <li v-if="data.inventory" class="list-group-item d-flex align-items-center">
        {{ t('hourly') }}:
        <span class="ms-auto">
          <template v-if="data.inventory.hourly.start">
            <small class="text-muted">
              {{ format(parseISO(data.inventory.hourly.start), t('dateFormat')) }} -
              {{ format(parseISO(data.inventory.hourly.end), t('dateFormat')) }}
            </small>
            <icon :icon="['fas', 'circle']" class="text-success ms-2" />
          </template>
          <template v-else>
            <icon :icon="['fas', 'circle']" class="text-danger ms-auto" />
          </template>
        </span>
      </li>
      <li v-if="data.inventory" class="list-group-item d-flex align-items-center">
        {{ t('daily') }}:
        <span class="ms-auto">
          <template v-if="data.inventory.daily.start">
            <small class="text-muted">
              {{ format(parseISO(data.inventory.daily.start), t('dateFormat')) }} -
              {{ format(parseISO(data.inventory.daily.end), t('dateFormat')) }}
            </small>
            <icon :icon="['fas', 'circle']" class="text-success ms-2" />
          </template>
          <template v-else>
            <icon :icon="['fas', 'circle']" class="text-danger ms-auto" />
          </template>
        </span>
      </li>
      <li class="list-group-item bg-light">
        <small class="fw-bold">{{ t('nearbyStations') }}</small>
      </li>
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

<script lang="ts">
import { useI18n } from 'vue-i18n';
import { format, parseISO } from 'date-fns';
import { getHotelsLink, getFlightsLink, getCarsLink, getActivitiesLink } from '~/utils/affiliate';
import Map from './Map.vue';

export default {
  name: 'Meta',

  emits: ['loaded'],

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
    const { t } = useI18n();

    return { t, format, parseISO, getHotelsLink, getFlightsLink, getCarsLink, getActivitiesLink };
  },

  data() {
    return {
      stations: []
    };
  },

  async mounted() {
    await fetch(
      `${this.$api}/app/nearby?lat=${this.data.location.latitude}&lon=${this.data.location.longitude}&lang=${this.$locale}&limit=7`
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
    "country": "Country",
    "region": "Region",
    "elevation": "Elevation",
    "timezone": "Timezone",
    "coordinates": "Coordinates",
    "discover": "Discover",
    "$discover": "Discover {name}",
    "$hotels": "Find a hotel",
    "$flights": "Book a flight",
    "$cars": "Rent a car",
    "$activities": "Things to do",
    "stationIdentifiers": "Station Identifiers",
    "national": "National",
    "inventory": "Inventory",
    "hourly": "Hourly",
    "daily": "Daily",
    "nearbyStations": "Nearby Stations"
  },
  "de": {
    "country": "Land",
    "region": "Region",
    "elevation": "Höhe",
    "timezone": "Zeitzone",
    "coordinates": "Koordinaten",
    "discover": "Entdecken",
    "$discover": "{name} entdecken",
    "$hotels": "Hotel finden",
    "$flights": "Flug buchen",
    "$cars": "Auto mieten",
    "$activities": "Aktivitäten",
    "stationIdentifiers": "Stationskennungen",
    "national": "National",
    "inventory": "Datenverfügbarkeit",
    "hourly": "Stündlich",
    "daily": "Täglich",
    "nearbyStations": "Wetterstationen in der Nähe"
  },
  "it": {
    "country": "Paese",
    "region": "Regione",
    "elevation": "Elevazione",
    "timezone": "Fuso orario",
    "coordinates": "Coordinate",
    "discover": "Scoprire",
    "$discover": "Scoprire {name}",
    "$hotels": "Trova Hotel",
    "$flights": "Prenotare il Volo",
    "$cars": "Noleggio Auto",
    "$activities": "Attività",
    "stationIdentifiers": "Identificatori di Stazione",
    "national": "Nazionale",
    "inventory": "Inventario",
    "hourly": "Oraria",
    "daily": "Giornaliero",
    "nearbyStations": "Stazioni Vicine"
  },
  "es": {
    "country": "País",
    "region": "Región",
    "elevation": "Elevación",
    "timezone": "Zona Horaria",
    "coordinates": "Coordenadas",
    "discover": "Descubrir",
    "$discover": "{name} descubrir",
    "$hotels": "Encontrar Hotel",
    "$flights": "Reservar un Vuelo",
    "$cars": "Alquilar un Coche",
    "$activities": "Actividades",
    "stationIdentifiers": "Identificadores de Estación",
    "national": "Nacional",
    "inventory": "Inventario",
    "hourly": "Por Hora",
    "daily": "Diario",
    "nearbyStations": "Estaciones Cercanas"
  },
  "nl": {
    "country": "Land",
    "region": "Regio",
    "elevation": "Verhoging",
    "timezone": "Tijdzone",
    "coordinates": "Coördinaten",
    "Discover": "Ontdek",
    "$discover": "{name} ontdek",
    "$hotels": "Vind Hotel",
    "$flights": "Boek Vlucht",
    "$cars": "Huur een Auto",
    "$activities": "Activiteiten",
    "stationIdentifiers": "Identificatie Stations",
    "national": "Nationaal",
    "inventory": "Inventaris",
    "hourly": "Uurlijks",
    "daily": "Dagelijks",
    "nearbyStations": "Stations in de Buurt"
  },
  "fr": {
    "country": "Pays",
    "region": "Région",
    "elevation": "Élévation",
    "timezone": "Fuseau Horaire",
    "coordinates": "Coordonnées",
    "discover" : "Découvrir",
    "$discover" : "Découvrir {name}",
    "$hotels" : "Trouver un Hôtel",
    "$flights" : "Réserver un Vol",
    "$cars" : "Louer une Voiture",
    "$activities" : "Activités",
    "stationIdentifiers": "Identificateurs de Station",
    "national": "National",
    "inventory": "Inventaire",
    "hourly": "Horaire",
    "daily": "Quotidiennement",
    "nearbyStations": "Stations à Proximité"
  },
  "pt": {
    "country": "País",
    "region": "Região",
    "elevation": "Elevação",
    "timezone": "Fuso Horário",
    "coordinates": "Coordenadas",
    "discover": "Descobrir",
    "$discover": "{name} descobrir",
    "$hotels": "Encontrar Hotel",
    "$flights": "Voo de reserva",
    "$cars": "Alugar um Carro",
    "$activities": "Actividades",
    "stationIdentifiers": "Identificadores de Estação",
    "national": "Nacional",
    "inventory": "Inventário",
    "hourly": "Horário",
    "daily": "Diariamente",
    "nearbyStations": "Estações Próximas"
  },
  "ru": {
    "country": "Страна",
    "region": "Регион",
    "elevation": "Высота",
    "timezone": "Часовой пояс",
    "coordinates": "Координаты",
    "discover": "открытие",
    "$discover": "Узнайте {name}",
    "$hotels": "найти отель",
    "$flights": "забронировать рейс",
    "$cars": "Аренда автомобиля",
    "$activities": "Деятельность",
    "stationIdentifiers": "Идентификаторы станции",
    "national": "национальный",
    "inventory": "инвентаризация",
    "hourly": "Почасовая",
    "daily": "Ежедневно",
    "nearbyStations": "Близлежащие станции"
  }
}
</i18n>
