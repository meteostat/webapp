<template>
  <div>
    <div class="hero px-4 pt-5 text-center">
      <h1 class="display-5 fw-bold">
        {{ t('$slogan') }}
      </h1>
      <div class="col-lg-6 mx-auto">
        <p class="lead mb-4">
          {{ t('$heroText') }}
        </p>
        <div class="d-grid gap-2 d-sm-flex justify-content-sm-center mb-5">
          <button
            type="button"
            class="btn btn-primary btn-lg px-4 me-sm-3"
            @click="myLocation()"
          >
            <icon
              :icon="['fas', 'map-marker-alt']"
              class="me-1"
            />
            {{ t('myLocation') }}
          </button>
          <button
            type="button"
            class="btn btn-outline-dark btn-lg px-4"
            @click="findStations()"
          >
            <icon
              :icon="['fas', 'search']"
              class="me-1"
            />
            {{ t('findStations') }}
          </button>
        </div>
      </div>
      <div
        class="overflow-hidden"
        style="max-height: 30vh;"
      >
        <div class="container px-5">
          <img
            src="https://media.meteostat.net/assets/hero-map.png"
            class="img-fluid border rounded-3 shadow-lg mb-4"
            width="698"
            height="380"
            loading="lazy"
          >
        </div>
      </div>
    </div>
    <div class="bg-light">
      <div class="container col-xxl-8 px-4 py-5">
        <div class="row flex-lg-row-reverse align-items-center g-5 py-5">
          <div class="col-10 col-sm-8 col-lg-6">
            <img
              src="https://media.meteostat.net/assets/illustration-community.svg"
              class="d-block mx-lg-auto img-fluid"
              width="700"
              loading="lazy"
            >
          </div>
          <div class="col-lg-6">
            <h2 class="display-5 lh-1 mb-3">
              {{ t('$sections[0].title') }}
            </h2>
            <p class="lead">
              {{ t('$sections[0].text') }}
            </p>
            <div class="d-grid gap-2 d-md-flex justify-content-md-start">
              <router-link
                tag="button"
                class="btn btn-primary btn-lg px-4 me-md-2"
                to="/patrons"
              >
                <icon
                  :icon="['fas', 'user-friends']"
                  class="me-1"
                />
                {{ t('patrons') }}
              </router-link>
              <a
                class="btn btn-danger btn-lg px-4"
                data-bs-toggle="offcanvas"
                data-bs-target="#donationSidebar"
                aria-controls="donationSidebar"
              >
                <icon
                  :icon="['fas', 'heart']"
                  class="me-1"
                />
                {{ t('donation') }}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container col-xxl-8 px-4 py-5">
      <div class="row align-items-center g-5 py-5">
        <div class="col-10 col-sm-8 col-lg-6">
          <img
            src="https://media.meteostat.net/assets/illustration-code.svg"
            class="d-block mx-lg-auto img-fluid"
            height="500"
            loading="lazy"
          >
        </div>
        <div class="col-lg-6">
          <h2 class="display-5 lh-1 mb-3">
            {{ t('$sections[1].title') }}
          </h2>
          <p class="lead">
            {{ t('$sections[1].text') }}
          </p>
          <div class="d-grid gap-2 d-md-flex justify-content-md-start">
            <a
              class="btn btn-primary btn-lg px-4 me-md-2"
              href="https://dev.meteostat.net/"
              target="_blank"
            >
              <icon
                :icon="['fas', 'code']"
                class="me-1"
              />
              {{ t('documentation') }}
            </a>
            <a
              class="btn btn-dark btn-lg px-4"
              href="https://github.com/meteostat"
              target="_blank"
            >
              <icon
                :icon="['fab', 'github']"
                class="me-1"
              />
              GitHub
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { encodePlacemark } from '~/utils/placemarks'

export default defineComponent({
  name: 'Home',

  setup(): Record<string, any> {
    const { t } = useI18n()

    return { t }
  },

  methods: {
    myLocation() {
      if (navigator.geolocation) {
        this.$loading('myLocation')
        navigator.geolocation.getCurrentPosition(position => {
          const placemark = encodePlacemark(position.coords.latitude, position.coords.longitude)
          this.$loaded('myLocation')
          this.$router.push(`/place/${placemark}`)
        })
      }
    },

    findStations() {
      document.getElementById('search')?.focus()
    }
  }
})
</script>

<style lang="scss">
@import "../node_modules/bootstrap/scss/functions";
@import "../node_modules/bootstrap/scss/variables";
@import "../node_modules/bootstrap/scss/mixins";

.hero {
  background: linear-gradient(165deg, #f7f5fb 50%, #fff 50%);
  background-size: cover;
  color: $dark;
}
.sponsor {
  max-height: 50px;
  max-width: 150px;
  object-fit: contain;
}
</style>

<i18n>
{
  "en": {
    "$slogan": "The Weather's Record Keeper",
    "$heroText": "Weather and climate database providing detailed weather data for thousands of weather stations and places worldwide. Take a look at yesterday's temperatures or discover the weather hundreds of years ago.",
    "myLocation": "My Location",
    "findStations": "Find Stations",
    "$sections": [
      {
        "title": "Powered By You.",
        "text": "Meteostat provides open weather and climate data for everyone. Become a patron and support Meteostat on its mission of democratizing meteorological data. Your donation also helps dozens of educational and research projects making the world run better."
      },
      {
        "title": " Made For Developers.",
        "text": "Meteostat is one of the largest vendors of open weather and climate data. Access long-term time series of thousands of weather stations and integrate Meteostat data into your products, applications and workflows. Thanks to our open data policy, Meteostat is an ideal data source for research and educational projects."
      }
    ]
  }
}
</i18n>