<template>
  <div>
    <div ref="map" class="map" />
  </div>
</template>

<script lang="ts">
import useLeaflet from '../../utils/leaflet';
import '../../../node_modules/leaflet/dist/leaflet.css';

export default {
  name: 'Map',

  props: {
    lat: {
      type: Number,
      required: true
    },
    lon: {
      type: Number,
      required: true
    }
  },

  async mounted(): Promise<void> {
    const L = await useLeaflet();

    let map = L.map(this.$refs.map as HTMLElement).setView([this.lat, this.lon], 4);

    map.dragging.disable();
    map.touchZoom.disable();
    map.doubleClickZoom.disable();
    map.scrollWheelZoom.disable();
    map.boxZoom.disable();
    map.keyboard.disable();
    map.attributionControl.setPrefix(false);

    L.tileLayer('//{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/" target="_blank">OpenStreetMap</a> contributors, <a href="https://carto.com/attribution" target="_blank">CARTO</a>',
      id: 'osm'
    }).addTo(map);

    L.circleMarker([this.lat, this.lon], {
      radius: 8,
      color: '#ffffff',
      weight: 1,
      fillColor: '#0678BE',
      fillOpacity: 1
    }).addTo(map);
  }
};
</script>

<style lang="scss" scoped>
.map {
  width: 100%;
  height: 300px;
}
</style>
