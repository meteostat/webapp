<template>
  <section
    id="christian"
    class="bg-light"
  >
    <div class="container col-xxl-8 px-4">
      <div class="row align-items-center g-5 py-5">
        <div class="col-10 col-sm-8 col-lg-6 align-items-center">
          <img
            src="https://media.meteostat.net/assets/cla.jpg"
            class="d-block mx-lg-auto img-fluid rounded"
            alt="Christian Lamprecht"
            width="400"
            height="400"
            loading="lazy"
          >
        </div>
        <div class="col-lg-6">
          <h1 class="display-5 fw-bold lh-1 mb-4">
            {{ t('meetChristian') }}
          </h1>
          <figure>
            <blockquote class="blockquote fst-italic">
              "{{ t('cQuote') }}"
            </blockquote>
            <figcaption class="blockquote-footer text-end mt-3">
              Christian Lamprecht, {{ t('cTitle') }}
            </figcaption>
          </figure>
          <div class="d-flex mt-3">
            <a
              class="btn btn-primary btn-sm me-1"
              href="https://www.linkedin.com/in/clampr/"
              target="_blank"
            >
              <icon
                :icon="['fab', 'linkedin']"
                class="me-sm-1"
              />
              <span class="d-none d-sm-inline">
                LinkedIn
              </span>
            </a>
            <a
              class="btn btn-dark btn-sm me-2"
              href="https://github.com/clampr"
              target="_blank"
            >
              <icon
                :icon="['fab', 'github']"
                class="me-sm-1"
              />
              <span class="d-none d-sm-inline">
                GitHub
              </span>
            </a>
            <a
              class="btn btn-danger btn-sm"
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
  </section>
  <div class="bar" />
  <section
    id="sponsors"
    class="my-5"
  >
    <h2 class="display-5 text-center mb-4">
      {{ t('sponsorsAndPartners') }}
    </h2>
    <div class="container overflow-hidden">
      <div class="row row-cols-1 row-cols-sm-2 row-cols-md-4 justify-content-center gx-3 gy-3">
        <div
          v-for="sponsor in sponsors"
          :key="sponsor.name"
          class="col"
        >
          <a
            :href="sponsor.link"
            class="d-block text-center p-3"
            target="_blank"
          >
            <img
              :src="sponsor.logo"
              :alt="sponsor.name"
              :title="sponsor.name"
              class="partner-logo img-fluid"
            >
          </a>
        </div>
      </div>
    </div>
  </section>
  <section
    id="backers"
    class="container-fluid"
  >
    <div class="row border border-white features">
      <div class="col-12 col-md-4 p-4 p-md-5 bg-light border border-white">
        <h3 class="mb-4">
          <icon
            :icon="['fas', 'user-friends']"
            class="me-2"
          />
          {{ t('backers') }}
        </h3>
        <p
          class="text-muted"
        >
          {{ t('backersText') }}
        </p>
        <ul>
          <li
            v-for="backer in backers.sort()"
            :key="backer"
          >
            {{ backer }}
          </li>
        </ul>
        <hr>
        <i18n-t
          keypath="backersAction"
          tag="p"
        >
          <template #patreon>
            <a
              href="https://www.patreon.com/meteostat"
              target="_blank"
            >Patreon</a>
          </template>
          <template #github>
            <a
              href="https://github.com/sponsors/clampr"
              target="_blank"
            >GitHub</a>
          </template>
          <template #donation>
            <a
              href=""
              data-bs-toggle="offcanvas"
              data-bs-target="#donationSidebar"
              aria-controls="donationSidebar"
            >{{ t('these') }}</a>
          </template>
        </i18n-t>
      </div>
      <div class="col-12 col-md-4 p-4 p-md-5 bg-light border border-white">
        <h3 class="mb-4">
          <icon
            :icon="['fas', 'hand-holding-usd']"
            class="me-2"
          />
          {{ t('donors') }}
        </h3>
        <p
          class="text-muted"
        >
          {{ t('donorsText') }}
        </p>
        <ul>
          <li
            v-for="donor in donors.sort()"
            :key="donor"
          >
            {{ donor }}
          </li>
        </ul>
        <hr>
        <i18n-t
          keypath="donorsAction"
          tag="p"
        >
          <template #paypal>
            <a
              href="https://www.paypal.com/donate?hosted_button_id=MQ67WRDC8EW38"
              target="_blank"
            >PayPal</a>
          </template>
          <template #donation>
            <a
              href=""
              data-bs-toggle="offcanvas"
              data-bs-target="#donationSidebar"
              aria-controls="donationSidebar"
            >{{ t('otherOptions') }}</a>
          </template>
        </i18n-t>
      </div>
      <div class="col-12 col-md-4 p-4 p-md-5 bg-light border border-white">
        <h3 class="mb-4">
          <icon
            :icon="['fas', 'code']"
            class="me-2"
          />
          {{ t('contributors') }}
        </h3>
        <p
          class="text-muted"
        >
          {{ t('contributorsText') }}
        </p>
        <ul>
          <li
            v-for="contributor in contributors.sort()"
            :key="contributor"
          >
            <a
              :href="`https://github.com/${contributor}`"
              target="_blank"
            >@{{ contributor }}</a>
          </li>
        </ul>
        <hr>
        <i18n-t
          keypath="contributorsAction"
          tag="p"
        >
          <template #github>
            <a
              href="https://github.com/meteostat"
              target="_blank"
            >GitHub</a>
          </template>
        </i18n-t>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useHead } from '@vueuse/head'

export default defineComponent({
  name: 'Contributors',

  setup(): Record<string, any> {
    const { t } = useI18n()

    useHead({
      title: `${t('$meta.title')} | Meteostat`,
      meta: [
        {
          name: 'description',
          content: t('$meta.description')
        }
      ],
    })

    return { t }
  },

  data(): Record<string, Array<string|Record<string, string>>> {
    return {
      sponsors: [
        {
          name: 'API3',
          logo: 'https://media.meteostat.net/assets/partners/api3.png',
          link: 'https://api3.org/'
        }
      ],
      generousBackers: [],
      backers: [],
      donors: [
        'Birgit Becherer',
        'Yan Nusinovich',
        'Maximilian Hüttner',
        'Maximilian Hennebach',
        'Benedikt Allendorf'
      ],
      contributors: [
        'weyaaron',
        'mrsjuli',
        'mstaessen',
        'ghostrider',
        'amotl',
        'ida',
        'ajhaupt7'
      ]
    }
  }
})
</script>

<style lang="scss" scoped>
@import '~/style/variables';
@import "../node_modules/bootstrap/scss/functions";
@import "../node_modules/bootstrap/scss/variables";
@import "../node_modules/bootstrap/scss/mixins";

.bar {
  height: 10px;
  background: linear-gradient(to right, #7f7fd5, #86a8e7, #91eae4);
}

.partner-logo {
  height: 100px;
}
</style>

<i18n>
{
  "en": {
    "$meta": {
      "title": "Patrons",
      "description": "Get to know the people who support Meteostat."
    },
    "meetChristian": "Meet Christian.",
    "cQuote": "Running an open source project can be challenging. You are always low on all kinds of resources - especially time and money. It is our passion for weather and climate which keeps us going. Meteostat is only possible because we have dozens of generous backers and contributors who keep supporting the project. Thanks to all of you!",
    "cTitle": "Founder & Maintainer",
    "sponsorsAndPartners": "Sponsors & Partners",
    "these": "these",
    "otherOptions": "other options",
    "backers": "Backers",
    "backersText": "Our incredible patrons who keep Meteostat running with recurring financial support.",
    "backersAction": "Become a backer on {patreon} or {github}. Alternatively, you can also set up recurring pledges using {donation} options.",
    "donors": "Donors",
    "donorsText": "Some of the generous people and companies who donated money to Meteostat in the past.",
    "donorsAction": "Use {paypal} to make a one-time donation or check for {donation}.",
    "contributors": "Contributors",
    "contributorsText": "The taltented developers and contributors who are building Meteostat and its interfaces.",
    "contributorsAction": "If you are familiar with coding, head over to {github} and help us building Meteostat."
  },
}
</i18n>