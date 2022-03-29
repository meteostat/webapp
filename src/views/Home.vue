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
          <button type="button" class="btn btn-primary btn-lg px-4 me-sm-3" @click="myLocation()">
            <icon :icon="['fas', 'map-marker-alt']" class="me-1" />
            {{ t('myLocation') }}
          </button>
          <button type="button" class="btn btn-outline-dark btn-lg px-4" @click="findStations()">
            <icon :icon="['fas', 'search']" class="me-1" />
            {{ t('findStations') }}
          </button>
        </div>
      </div>
      <div class="overflow-hidden" style="max-height: 30vh">
        <div class="container px-5">
          <img
            src="https://media.meteostat.net/assets/hero-map.png"
            class="img-fluid border rounded-3 shadow-lg mb-4"
            width="698"
            height="380"
            loading="lazy"
          />
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
            />
          </div>
          <div class="col-lg-6">
            <h2 class="display-5 lh-1 mb-3">
              {{ t('$sections[0].title') }}
            </h2>
            <p class="lead">
              {{ t('$sections[0].text') }}
            </p>
            <div class="d-grid gap-2 d-md-flex justify-content-md-start">
              <router-link tag="button" class="btn btn-primary btn-lg px-4 me-md-2" to="/patrons">
                <icon :icon="['fas', 'user-friends']" class="me-1" />
                {{ t('patrons') }}
              </router-link>
              <a
                class="btn btn-danger btn-lg px-4"
                data-bs-toggle="offcanvas"
                data-bs-target="#donationSidebar"
                aria-controls="donationSidebar"
              >
                <icon :icon="['fas', 'heart']" class="me-1" />
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
          />
        </div>
        <div class="col-lg-6">
          <h2 class="display-5 lh-1 mb-3">
            {{ t('$sections[1].title') }}
          </h2>
          <p class="lead">
            {{ t('$sections[1].text') }}
          </p>
          <div class="d-grid gap-2 d-md-flex justify-content-md-start">
            <a class="btn btn-primary btn-lg px-4 me-md-2" href="https://dev.meteostat.net/" target="_blank">
              <icon :icon="['fas', 'code']" class="me-1" />
              {{ t('documentation') }}
            </a>
            <a class="btn btn-dark btn-lg px-4" href="https://github.com/meteostat" target="_blank" rel="noreferrer">
              <icon :icon="['fab', 'github']" class="me-1" />
              GitHub
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useI18n } from 'vue-i18n';
import { encodePlacemark } from '~/utils/placemarks';

export default defineComponent({
  name: 'Home',

  setup(): Record<string, any> {
    const { t } = useI18n();

    return { t };
  },

  methods: {
    async myLocation() {
      if (navigator.geolocation) {
        this.$loading('myLocation');
        navigator.geolocation.getCurrentPosition(async (position) => {
          const placemark = encodePlacemark(position.coords.latitude, position.coords.longitude);
          await fetch(`${this.$api}/app/place?placemark=${placemark}`)
            .then((response) => response.json())
            .then((data) => data.data)
            .then((place) => {
              this.$loaded('myLocation');
              this.$router.push(`/place/${place.country.toLowerCase()}/${place.id}`);
            })
            .catch(() => this.$loaded('myLocation'));
        });
      }
    },

    findStations() {
      document.getElementById('search')?.focus();
    }
  }
});
</script>

<style lang="scss">
@import '../node_modules/bootstrap/scss/functions';
@import '../node_modules/bootstrap/scss/variables';
@import '../node_modules/bootstrap/scss/mixins';

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
        "title": "Made For Developers.",
        "text": "Meteostat is one of the largest vendors of open weather and climate data. Access long-term time series of thousands of weather stations and integrate Meteostat data into your products, applications and workflows. Thanks to our open data policy, Meteostat is an ideal data source for research and educational projects."
      }
    ]
  },
  "de": {
    "$slogan": "Wetterrückblick und Klimadaten",
    "$heroText": "Wetter- und Klimadatenbank mit detaillierten Wetteraufzeichnungen und Klimastatistiken für tausende Wetterstationen und Orte weltweit. Werfen Sie einen Blick auf die gestrigen Temperaturen oder auf das Wetter vor 100 Jahren.",
    "myLocation": "Mein Standort",
    "findStations": "Station Finden",
    "$sections": [
      {
        "title": "Freie Daten.",
        "text": "Meteostat bietet offene Wetter- und Klimadaten für jedermann. Werden Sie Förderer und unterstützen Sie Meteostat bei der Mission, meteorologische Daten zu demokratisieren. Ihre Spende hilft auch Dutzenden von Bildungs- und Forschungsprojekten, die mit ihrer Arbeit Großes leisten."
      },
      {
        "title": "Für Entwickler.",
        "text": "Meteostat ist einer der größten Anbieter von offenen Wetter- und Klimadaten. Greifen Sie auf langfristige Zeitreihen von Tausenden von Wetterstationen zu und integrieren Sie Meteostat-Daten in Ihre Produkte, Anwendungen und Arbeitsabläufe. Dank unserer offenen Datenpolitik ist Meteostat eine ideale Datenquelle für Forschungs- und Bildungsprojekte."
      }
    ]
  },
  "it": {
    "$slogan": "Il Guardiano del Tempo",
    "$heroText": "Database meteo e climatico che fornisce dati meteo dettagliati per migliaia di stazioni meteo e luoghi in tutto il mondo. Dai un'occhiata alle temperature di ieri o scopri il tempo di centinaia di anni fa.",
    "myLocation": "Mia Posizione",
    "findStations": "Trova Stazioni",
    "$sections": [
      {
        "title": "Alimentato da Te.",
        "text": "Meteostat fornisce dati meteorologici e climatici aperti a tutti. Diventa un mecenate e sostieni Meteostat nella sua missione di democratizzazione dei dati meteorologici. La tua donazione aiuta anche decine di progetti educativi e di ricerca che fanno funzionare meglio il mondo."
      },
      {
        "title": "Fatto per gli Sviluppatori.",
        "text": "Meteostat è uno dei maggiori fornitori di dati meteo e climatici aperti. Accedi alle serie temporali a lungo termine di migliaia di stazioni meteorologiche e integra i dati Meteostat nei tuoi prodotti, applicazioni e flussi di lavoro. Grazie alla nostra politica di dati aperti, Meteostat è una fonte di dati ideale per la ricerca e i progetti educativi."
      }
    ]
  },
  "es": {
    "$slogan": "El Guardián del Tiempo",
    "$heroText": "Base de datos meteorológicos y climáticos que proporciona datos meteorológicos detallados de miles de estaciones meteorológicas y lugares de todo el mundo. Echa un vistazo a las temperaturas de ayer o descubre el tiempo de hace cientos de años.",
    "myLocation": "Mi Localización",
    "findStations": "Encontrar Estaciones",
    "$sections": [
      {
        "title": "Desarrollado por Usted.",
        "text": "Meteostat proporciona datos meteorológicos y climáticos abiertos para todos. Hazte mecenas y apoya a Meteostat en su misión de democratizar los datos meteorológicos. Tu donación también ayuda a docenas de proyectos educativos y de investigación que hacen que el mundo funcione mejor."
      },
      {
        "title": "Hecho Para Desarrolladores.",
        "text": "Meteostat es uno de los mayores proveedores de datos meteorológicos y climáticos abiertos. Acceda a series temporales a largo plazo de miles de estaciones meteorológicas e integre los datos de Meteostat en sus productos, aplicaciones y flujos de trabajo. Gracias a nuestra política de datos abiertos, Meteostat es una fuente de datos ideal para proyectos de investigación y educativos."
      }
    ]
  },
  "nl": {
    "$slogan": "The Weather's Record Keeper",
    "$heroText": "Weer- en klimaatdatabase met gedetailleerde weergegevens van duizenden weerstations en plaatsen wereldwijd. Neem een kijkje naar de temperaturen van gisteren of ontdek het weer van honderden jaren geleden.",
    "myLocation": "Mijn Locatie",
    "findStations": "Zoek Stations",
    "$sections": [
      {
        "title": "Aangedreven door Jou.",
        "text": "Meteostat biedt open weer- en klimaatgegevens voor iedereen. Word mecenas en steun Meteostat in haar missie om meteorologische gegevens te democratiseren. Jouw donatie helpt ook tientallen educatieve en onderzoeksprojecten die de wereld beter laten draaien."
      },
      {
        "title": "Gemaakt voor Ontwikkelaars.",
        "text": "Meteostat is een van de grootste leveranciers van open weer- en klimaatgegevens. Krijg toegang tot langetermijntijdreeksen van duizenden weerstations en integreer Meteostat-gegevens in uw producten, toepassingen en workflows. Dankzij ons open gegevensbeleid is Meteostat een ideale gegevensbron voor onderzoeks- en onderwijsprojecten."
      }
    ]
  },
  "fr": {
    "$slogan": "Le Gardien du Temps",
    "$heroText": "Base de données météorologiques et climatiques fournissant des données météorologiques détaillées pour des milliers de stations météorologiques et de lieux dans le monde entier. Jetez un coup d'œil aux températures d'hier ou découvrez le temps qu'il faisait il y a des centaines d'années.",
    "myLocation": "Ma Position",
    "findStations": "Trouver des Stations",
    "$sections": [
      {
        "title": "Propulsé par Vous.",
        "text": "Meteostat fournit des données météorologiques et climatiques ouvertes pour tout le monde. Devenez un mécène et soutenez Meteostat dans sa mission de démocratisation des données météorologiques. Votre don aide également des dizaines de projets éducatifs et de recherche qui permettent au monde de mieux fonctionner."
      },
      {
        "title": "Pour les Développeurs.",
        "text": " Meteostat est l'un des plus grands vendeurs de données météorologiques et climatiques ouvertes. Accédez aux séries temporelles à long terme de milliers de stations météorologiques et intégrez les données de Meteostat dans vos produits, applications et flux de travail. Grâce à notre politique de données ouvertes, Meteostat est une source de données idéale pour les projets de recherche et d'éducation."
      }
    ]
  },
  "pt": {
    "$slogan": "O Recordista Meteorológico",
    "$heroText": "Base de dados meteorológicos e climáticos fornecendo dados meteorológicos detalhados para milhares de estações meteorológicas e locais em todo o mundo. Veja as temperaturas de ontem ou descubra o tempo há centenas de anos",
    "myLocation": "Minha Localização",
    "findStations": "Encontrar Estações",
    "$sections": [
      {
        "title": "Desenvolvido por Você.",
        "text": "Meteostat fornece dados climáticos e meteorológicos abertos para todos. Torne-se um patrono e apoie o Meteostat na sua missão de democratizar os dados meteorológicos. A sua doação também ajuda dezenas de projectos educativos e de investigação a melhorar o funcionamento do mundo."
      },
      {
        "title": "Feito Para Desenvolvedores.",
        "text": "O Meteostat é um dos maiores fornecedores de dados climáticos e meteorológicos abertos. Aceda a séries temporais a longo prazo de milhares de estações meteorológicas e integre os dados do Meteostat nos seus produtos, aplicações e fluxos de trabalho. Graças à nossa política de dados abertos, o Meteostat é uma fonte de dados ideal para projectos de investigação e educação."
      }
    ]
  },
  "ru": {
    "$slogan": "Хранитель рекордов погоды",
    "$heroText": "База данных о погоде и климате, предоставляющая подробные данные о погоде для тысяч метеостанций и мест по всему миру. Посмотрите на вчерашние температуры или узнайте погоду сотни лет назад.",
    "myLocation": "Мое местоположение",
    "findStations": "Найти станции",
    "$sections": [
      {
        "title": "Работает на вас.",
        "text": "Meteostat предоставляет открытые данные о погоде и климате для всех. Станьте меценатом и поддержите Meteostat в его миссии демократизации метеорологических данных. Ваше пожертвование также поможет десяткам образовательных и исследовательских проектов, делающих мир лучше."
      },
      {
        "title": "Сделано для разработчиков.",
        "text": "Meteostat является одним из крупнейших поставщиков открытых данных о погоде и климате. Получите доступ к долгосрочным временным рядам тысяч метеостанций и интегрируйте данные Meteostat в свои продукты, приложения и рабочие процессы. Благодаря нашей политике открытых данных, Meteostat является идеальным источником данных для исследовательских и образовательных проектов."
      }
    ]   
  }
}
</i18n>
