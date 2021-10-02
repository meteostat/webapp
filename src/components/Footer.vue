<template>
  <footer class="footer mt-auto py-3 bg-light">
    <div class="container-fluid p-3 p-md-5">
      <ul class="d-md-flex align-items-center text-center flex-wrap pb-4 m-0">
        <li class="d-inline-block">
          <router-link to="/about">
            About Meteostat
          </router-link>
        </li>
        <li class="d-inline-block ms-3">
          <a href="https://dev.meteostat.net">Developers</a>
        </li>
        <li class="d-inline-block ms-3">
          <a href="https://medium.com/meteostat">Our Blog</a>
        </li>
        <li class="d-block mt-3 my-md-0 ms-md-4">
          <router-link
            to="/support"
            tag="button"
            class="btn btn-light bg-transparent btn-sm border w-100"
            data-toggle="modal"
            data-target="#contact"
          >
            <icon
              :icon="['fas', 'comment-alt']"
              class="me-2"
            />
            {{ t('support') }}
          </router-link>
        </li>
        <li class="w-100 d-md-none" />
        <li class="d-inline-block mt-3 mt-md-0 ms-md-auto fs-4">
          <a
            href="https://medium.com/meteostat"
            data-toggle="tooltip"
            data-placement="top"
            title="Blog"
          >
            <icon :icon="['fab', 'medium']" />
          </a>
        </li>
        <li class="d-inline-block mt-3 mt-md-0 ms-3 fs-4">
          <a
            href="https://twitter.com/meteost"
            data-toggle="tooltip"
            data-placement="top"
            title="Twitter"
          >
            <icon :icon="['fab', 'twitter']" />
          </a>
        </li>
        <li class="d-inline-block mt-3 mt-md-0 ms-3 fs-4">
          <a
            href="https://github.com/meteostat"
            data-toggle="tooltip"
            data-placement="top"
            title="GitHub"
          >
            <icon :icon="['fab', 'github']" />
          </a>
        </li>
        <li class="d-inline-block mt-3 mt-md-0 ms-3 fs-4">
          <a
            href="https://www.linkedin.com/company/meteostat/"
            data-toggle="tooltip"
            data-placement="top"
            title="LinkedIn"
          >
            <icon :icon="['fab', 'linkedin']" />
          </a>
        </li>
        <li class="d-inline-block mt-3 mt-md-0 ms-3 fs-4">
          <a
            href="https://www.patreon.com/meteostat"
            data-toggle="tooltip"
            data-placement="top"
            title="Patreon"
          >
            <icon :icon="['fab', 'patreon']" />
          </a>
        </li>
      </ul>
      <div class="mb-3 fs-6">
        <span class="me-2">Language:</span>
        <div class="dropdown d-inline">
          <a
            class="dropdown-toggle"
            data-bs-toggle="dropdown"
          >
            {{ lang.name }}
          </a>
          <div class="dropdown-menu">
            <a
              v-for="language in languages"
              :key="language"
              class="dropdown-item"
              :href="i18nLink(language.locale)"
            >
              {{ language.name }}
            </a>
          </div>
        </div>
      </div>
      <small>Copyright &copy; Meteostat 2021. <a href="/en/legal">Legal Disclosure</a> & <a href="/en/privacy">Privacy</a>.<br>Weather data provided by <a
        href="http://www.noaa.gov/"
        target="_blank"
      >NOAA</a>, <a
        href="https://www.dwd.de/"
        target="_blank"
      >Deutscher Wetterdienst</a> and <a
        href="https://weather.gc.ca/"
        target="_blank"
      >Environment Canada</a>. Learn more about <a href="/en/sources">our sources</a>.</small>
    </div>
  </footer>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { SUPPORTED_LANGUAGES } from '~/i18n/locales'

export default defineComponent({
  name: 'Footer',

  setup(): Record<string, any> {    
    const { t, locale } = useI18n()

    const languages = SUPPORTED_LANGUAGES
    const lang = languages.filter(l => l.locale === locale.value)[0]

    return {
      t,
      languages,
      lang
    }
  },

  data() {
    return {
      translateableRoutes: [
        'StationHistory',
        'StationClimate',
        'PlaceHistory',
        'PlaceClimate',
        'Insights',
        'Patrons',
        'About',
        'Support'
      ]
    }
  },

  computed: {
    path() {
      return this.translateableRoutes.includes(
        this.$route.name
      ) ? this.$route.path : null
    }
  },

  methods: {
    i18nLink(locale: string): string {
      return this.path ? `/${locale}${this.path}` : `/${locale}`
    }
  }
})
</script>

<style lang="scss">
@import "../node_modules/bootstrap/scss/functions";
@import "../node_modules/bootstrap/scss/variables";
@import "../node_modules/bootstrap/scss/mixins";

footer {
	border-top: 1px solid #eee;
	font-size: 85%;
}

footer a {
  font-weight: 500;
  color: $dark;
}

footer a:hover {
	color: $blue;
}

footer ul {
	list-style: none;
	padding-left: 0;
}

footer ul a > i {
	font-size: 24px;
}
</style>

<i18n>
{
  "en": {
    "donation": "Donation",
    "donationText": "Support Meteostat on its mission of providing open weather and climate data for everyone. Your donation also helps educational and research projects making the world run better using Meteostat data.",
    "online": "Online",
    "bankTransfer": "Bank Transfer",
    "recipient": "Recipient",
    "iban": "IBAN",
    "bic": "BIC"
  }
}
</i18n>