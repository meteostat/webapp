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
              <router-link class="btn btn-primary btn-lg px-4 me-md-2" to="/patrons">
                <icon :icon="['fas', 'user-friends']" class="me-1" />
                {{ t('patrons') }}
              </router-link>
              <router-link class="btn btn-danger btn-lg px-4" to="/donate">
                <icon :icon="['fas', 'heart']" class="me-1" />
                {{ t('donation') }}
              </router-link>
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
@import 'bootstrap/scss/functions';
@import 'bootstrap/scss/variables';
@import 'bootstrap/scss/mixins';

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
    "$heroText": "Weather and climate database providing detailed weather data for thousands of weather stations and places worldwide. Check yesterday's temperatures or discover the weather of centuries ago.",
    "myLocation": "My Location",
    "findStations": "Find Stations",
    "$sections": [
      {
        "title": "Powered by You.",
        "text": "Meteostat provides open weather and climate data for everyone. Become a patron and support Meteostat on its mission of democratizing meteorological data. Your donation also supports dozens of educational and research projects that rely on Meteostat data."
      },
      {
        "title": "Made for Developers.",
        "text": "Meteostat is one of the largest providers of open weather and climate data. Access long-term time series of thousands of weather stations and integrate Meteostat data into your products, applications and workflows. Thanks to our open data policy, Meteostat is an ideal data source for research and educational projects."
      }
    ]
  },
  "de": {
    "$slogan": "Wetterrückblick und Klimadaten",
    "$heroText": "Wetter- und Klimadatenbank mit detaillierten Wetteraufzeichnungen und Klimastatistiken für tausende Wetterstationen und Orte weltweit. Werfen Sie einen Blick auf die gestrigen Temperaturen oder auf das Wetter vor 100 Jahren.",
    "myLocation": "Mein Standort",
    "findStations": "Stationen finden",
    "$sections": [
      {
        "title": "Freie Daten.",
        "text": "Meteostat bietet offene Wetter- und Klimadaten für alle. Werden Sie Förderer und unterstützen Sie Meteostat bei der Mission, meteorologische Daten zu demokratisieren. Ihre Spende unterstützt auch Dutzende Bildungs- und Forschungsprojekte, die auf Meteostat-Daten angewiesen sind."
      },
      {
        "title": "Für Entwickler.",
        "text": "Meteostat ist einer der größten Anbieter offener Wetter- und Klimadaten. Greifen Sie auf langjährige Zeitreihen tausender Wetterstationen zu und integrieren Sie Meteostat-Daten in Ihre Produkte, Anwendungen und Arbeitsabläufe. Dank unserer offenen Datenpolitik ist Meteostat eine ideale Datenquelle für Forschungs- und Bildungsprojekte."
      }
    ]
  },
  "it": {
    "$slogan": "L'archivio del meteo",
    "$heroText": "Database meteo e climatico con dati dettagliati per migliaia di stazioni meteo e luoghi in tutto il mondo. Controlla le temperature di ieri o scopri che tempo faceva secoli fa.",
    "myLocation": "La mia posizione",
    "findStations": "Trova stazioni",
    "$sections": [
      {
        "title": "Sostenuto da te.",
        "text": "Meteostat offre dati meteo e climatici aperti a tutti. Diventa un sostenitore e aiuta Meteostat nella sua missione di democratizzare i dati meteorologici. La tua donazione sostiene anche decine di progetti didattici e di ricerca che si basano sui dati di Meteostat."
      },
      {
        "title": "Pensato per gli sviluppatori.",
        "text": "Meteostat è uno dei maggiori fornitori di dati meteo e climatici aperti. Accedi a serie temporali pluriennali di migliaia di stazioni meteo e integra i dati di Meteostat nei tuoi prodotti, applicazioni e flussi di lavoro. Grazie alla nostra politica di dati aperti, Meteostat è una fonte ideale per progetti di ricerca e didattici."
      }
    ]
  },
  "es": {
    "$slogan": "El archivo del tiempo",
    "$heroText": "Base de datos meteorológica y climática con datos detallados de miles de estaciones meteorológicas y lugares de todo el mundo. Consulta las temperaturas de ayer o descubre el tiempo de hace siglos.",
    "myLocation": "Mi ubicación",
    "findStations": "Buscar estaciones",
    "$sections": [
      {
        "title": "Impulsado por ti.",
        "text": "Meteostat ofrece datos meteorológicos y climáticos abiertos para todos. Hazte mecenas y apoya a Meteostat en su misión de democratizar los datos meteorológicos. Tu donación también apoya a decenas de proyectos educativos y de investigación que dependen de los datos de Meteostat."
      },
      {
        "title": "Hecho para desarrolladores.",
        "text": "Meteostat es uno de los mayores proveedores de datos meteorológicos y climáticos abiertos. Accede a series temporales de largo plazo de miles de estaciones meteorológicas e integra los datos de Meteostat en tus productos, aplicaciones y flujos de trabajo. Gracias a nuestra política de datos abiertos, Meteostat es una fuente de datos ideal para proyectos de investigación y educativos."
      }
    ]
  },
  "nl": {
    "$slogan": "Het geheugen van het weer",
    "$heroText": "Weer- en klimaatdatabase met gedetailleerde weergegevens van duizenden weerstations en plaatsen wereldwijd. Bekijk de temperaturen van gisteren of ontdek het weer van eeuwen geleden.",
    "myLocation": "Mijn locatie",
    "findStations": "Stations zoeken",
    "$sections": [
      {
        "title": "Mogelijk gemaakt door jou.",
        "text": "Meteostat biedt open weer- en klimaatgegevens voor iedereen. Word supporter en steun Meteostat in zijn missie om meteorologische gegevens te democratiseren. Jouw donatie steunt ook tientallen onderwijs- en onderzoeksprojecten die afhankelijk zijn van Meteostat-gegevens."
      },
      {
        "title": "Gemaakt voor ontwikkelaars.",
        "text": "Meteostat is een van de grootste aanbieders van open weer- en klimaatgegevens. Krijg toegang tot langjarige tijdreeksen van duizenden weerstations en integreer Meteostat-gegevens in je producten, applicaties en workflows. Dankzij ons opendatabeleid is Meteostat een ideale gegevensbron voor onderzoeks- en onderwijsprojecten."
      }
    ]
  },
  "fr": {
    "$slogan": "La mémoire de la météo",
    "$heroText": "Base de données météorologiques et climatiques offrant des données détaillées pour des milliers de stations météo et de lieux dans le monde entier. Consultez les températures d'hier ou découvrez le temps qu'il faisait il y a des siècles.",
    "myLocation": "Ma Position",
    "findStations": "Trouver des stations",
    "$sections": [
      {
        "title": "Propulsé par vous.",
        "text": "Meteostat fournit des données météorologiques et climatiques ouvertes à tous. Devenez mécène et soutenez Meteostat dans sa mission de démocratisation des données météorologiques. Votre don soutient également des dizaines de projets éducatifs et de recherche qui s'appuient sur les données de Meteostat."
      },
      {
        "title": "Conçu pour les développeurs.",
        "text": "Meteostat est l'un des plus grands fournisseurs de données météorologiques et climatiques ouvertes. Accédez à des séries temporelles longues de milliers de stations météo et intégrez les données de Meteostat dans vos produits, applications et flux de travail. Grâce à notre politique de données ouvertes, Meteostat est une source de données idéale pour les projets de recherche et d'enseignement."
      }
    ]
  },
  "pt": {
    "$slogan": "O arquivo do tempo",
    "$heroText": "Base de dados meteorológicos e climáticos com dados detalhados de milhares de estações meteorológicas e locais em todo o mundo. Consulte as temperaturas de ontem ou descubra o tempo de há séculos.",
    "myLocation": "A minha localização",
    "findStations": "Encontrar estações",
    "$sections": [
      {
        "title": "Graças a si.",
        "text": "O Meteostat disponibiliza dados meteorológicos e climáticos abertos para todos. Torne-se apoiante e ajude o Meteostat na sua missão de democratizar os dados meteorológicos. O seu donativo apoia também dezenas de projetos educativos e de investigação que dependem dos dados do Meteostat."
      },
      {
        "title": "Feito para programadores.",
        "text": "O Meteostat é um dos maiores fornecedores de dados meteorológicos e climáticos abertos. Aceda a séries temporais longas de milhares de estações meteorológicas e integre os dados do Meteostat nos seus produtos, aplicações e fluxos de trabalho. Graças à nossa política de dados abertos, o Meteostat é uma fonte de dados ideal para projetos de investigação e educação."
      }
    ]
  },
  "ru": {
    "$slogan": "Летопись погоды",
    "$heroText": "База данных о погоде и климате с подробными данными тысяч метеостанций и мест по всему миру. Узнайте, какой была температура вчера или какая погода была столетия назад.",
    "myLocation": "Мое местоположение",
    "findStations": "Найти станции",
    "$sections": [
      {
        "title": "Благодаря вам.",
        "text": "Meteostat предоставляет открытые данные о погоде и климате для всех. Станьте меценатом и поддержите Meteostat в его миссии сделать метеорологические данные общедоступными. Ваше пожертвование также поддерживает десятки образовательных и исследовательских проектов, которые используют данные Meteostat."
      },
      {
        "title": "Создано для разработчиков.",
        "text": "Meteostat — один из крупнейших поставщиков открытых данных о погоде и климате. Получите доступ к многолетним временным рядам тысяч метеостанций и интегрируйте данные Meteostat в свои продукты, приложения и рабочие процессы. Благодаря нашей политике открытых данных Meteostat — идеальный источник данных для исследовательских и образовательных проектов."
      }
    ]
  }
}
</i18n>
