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

    return { t, format, parseISO };
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

<i18n lang="json" src="./Meta.i18n.json"></i18n>
