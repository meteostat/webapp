<template>
  <div>
    <div class="hero px-4 pt-5 text-center border-bottom">
      <h1 class="display-5 fw-bold">
        Contributors & Sponsors
      </h1>
      <div class="col-lg-6 mx-auto">
        <p class="lead mb-4">
          Support Meteostat on its mission of providing open weather and climate data for everyone. Your donation also helps educational and research projects making the world run better using Meteostat data.
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Contributors',

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

<style lang="scss" scoped>
@import "../node_modules/bootstrap/scss/functions";
@import "../node_modules/bootstrap/scss/variables";
@import "../node_modules/bootstrap/scss/mixins";

.hero {
  background: linear-gradient(to right, #12c2e9, #c471ed, #f64f59);
  color: $white;
}
</style>