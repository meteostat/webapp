<template>
  <div>
    <div class="hero px-4 pt-5 text-center border-bottom">
      <h1 class="display-5 fw-bold">
        The Weather's Record Keeper
      </h1>
      <div class="col-lg-6 mx-auto">
        <p class="lead mb-4">
          Weather and climate database providing detailed weather data for thousands of weather stations and places worldwide. Take a look at yesterday's temperatures or discover the weather hundreds of years ago.
        </p>
        <div class="d-grid gap-2 d-sm-flex justify-content-sm-center mb-5">
          <button
            type="button"
            class="btn btn-primary btn-lg px-4 me-sm-3"
          >
            Primary button
          </button>
          <button
            type="button"
            class="btn btn-outline-light btn-lg px-4"
          >
            Secondary
          </button>
        </div>
      </div>
      <div
        class="overflow-hidden"
        style="max-height: 30vh;"
      >
        <div class="container px-5">
          <img
            src="https://getbootstrap.com/docs/5.0/examples/heroes/bootstrap-docs.png"
            class="img-fluid border rounded-3 shadow-lg mb-4"
            alt="Example image"
            width="700"
            height="500"
            loading="lazy"
          >
        </div>
      </div>
    </div>
    <div class="border-bottom">
      <div class="container col-xxl-8 p-4">
        <h3 class="mt-2 mb-4 text-center text-uppercase">
          Proudly Sponsored By
        </h3>
        <div class="row">
          <div
            v-for="sponsor in sponsors"
            :key="sponsor"
            class="col-12 col-sm-6 col-lg-3 py-3 text-center"
          >
            <img
              class="sponsor"
              :src="sponsor"
            >
          </div>
        </div>
      </div>
    </div>
    <div class="bg-light border-bottom">
      <div class="container col-xxl-8 px-4 py-5">
        <div class="row flex-lg-row-reverse align-items-center g-5 py-5">
          <div class="col-10 col-sm-8 col-lg-6">
            <img
              src="https://getbootstrap.com/docs/5.0/examples/heroes/bootstrap-themes.png"
              class="d-block mx-lg-auto img-fluid"
              alt="Bootstrap Themes"
              width="700"
              height="500"
              loading="lazy"
            >
          </div>
          <div class="col-lg-6">
            <h1 class="display-5 fw-bold lh-1 mb-3">
              Responsive left-aligned hero with image
            </h1>
            <p class="lead">
              Quickly design and customize responsive mobile-first sites with Bootstrap, the world’s most popular front-end open source toolkit, featuring Sass variables and mixins, responsive grid system, extensive prebuilt components, and powerful JavaScript plugins.
            </p>
            <div class="d-grid gap-2 d-md-flex justify-content-md-start">
              <button
                type="button"
                class="btn btn-primary btn-lg px-4 me-md-2"
              >
                Primary
              </button>
              <button
                type="button"
                class="btn btn-outline-secondary btn-lg px-4"
              >
                Default
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="border-bottom">
      <div class="container col-xxl-8 px-4 py-5">
        <div class="row align-items-center g-5 py-5">
          <div class="col-10 col-sm-8 col-lg-6">
            <img
              src="https://getbootstrap.com/docs/5.0/examples/heroes/bootstrap-themes.png"
              class="d-block mx-lg-auto img-fluid"
              alt="Bootstrap Themes"
              width="700"
              height="500"
              loading="lazy"
            >
          </div>
          <div class="col-lg-6">
            <h1 class="display-5 fw-bold lh-1 mb-3">
              Responsive left-aligned hero with image
            </h1>
            <p class="lead">
              Quickly design and customize responsive mobile-first sites with Bootstrap, the world’s most popular front-end open source toolkit, featuring Sass variables and mixins, responsive grid system, extensive prebuilt components, and powerful JavaScript plugins.
            </p>
            <div class="d-grid gap-2 d-md-flex justify-content-md-start">
              <button
                type="button"
                class="btn btn-primary btn-lg px-4 me-md-2"
              >
                Primary
              </button>
              <button
                type="button"
                class="btn btn-outline-secondary btn-lg px-4"
              >
                Default
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Home',

  data(): Record<string, Array<string>> {
    return {
      sponsors: [
        'https://upload.wikimedia.org/wikipedia/de/thumb/7/7b/DWD-Logo_2013.svg/2000px-DWD-Logo_2013.svg.png',
        'http://www.pa.op.dlr.de/nawdex/images/envcanada_logo.png',
        'https://cdn.signavio.com/uploads/2017/09/met-office-logo-web.png',
        'https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/NOAA_logo.svg/1024px-NOAA_logo.svg.png'
      ]
    }
  }
})
</script>

<style lang="scss">
@import "../node_modules/bootstrap/scss/functions";
@import "../node_modules/bootstrap/scss/variables";
@import "../node_modules/bootstrap/scss/mixins";

.hero {
  background:
    linear-gradient(
      rgba(0, 0, 0, 0.3), 
      rgba(0, 0, 0, 0.3)
    ),
    url(https://assets.meteostat.net/hero-cover.jpg);
  background-size: cover;
  color: $white;
}
.sponsor {
  max-height: 50px;
  max-width: 150px;
  object-fit: contain;
}
</style>