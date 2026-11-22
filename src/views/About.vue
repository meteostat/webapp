<template>
  <div class="container py-4">
    <div class="p-5 mb-4 text-white bg-forest rounded-3">
      <div class="container-fluid py-5">
        <h1 class="display-5 fw-bold">
          {{ t('$title') }}
        </h1>
        <p class="col-md-8 fs-4">
          {{ t('$description') }}
        </p>
      </div>
    </div>

    <div class="container-fluid mb-4">
      <div class="row">
        <div class="col-12 col-md-4 p-4 p-md-5 bg-light border border-white rounded-3">
          <h3 class="mb-4">
            {{ t('$features[0].title') }}
          </h3>
          <p class="text-muted">
            {{ t('$features[0].text') }}
          </p>
        </div>
        <div class="col-12 col-md-4 p-4 p-md-5 bg-light border border-white rounded-3">
          <h3 class="mb-4">
            {{ t('$features[1].title') }}
          </h3>
          <p class="text-muted">
            {{ t('$features[1].text') }}
          </p>
        </div>
        <div class="col-12 col-md-4 p-4 p-md-5 bg-light border border-white rounded-3">
          <h3 class="mb-4">
            {{ t('$features[2].title') }}
          </h3>
          <p class="text-muted">
            {{ t('$features[2].text') }}
          </p>
        </div>
      </div>
    </div>

    <div class="row align-items-md-stretch gy-3 mb-4">
      <div class="col-md-6">
        <div class="h-100 p-5 text-white bg-dark rounded-3">
          <h2>{{ t('$features[3].title') }}</h2>
          <p>{{ t('$features[3].text') }}</p>
          <a href="https://github.com/meteostat" class="btn btn-outline-light" target="_blank" rel="noreferrer">
            <icon :icon="['fab', 'github']" class="me-2" />
            GitHub
          </a>
        </div>
      </div>
      <div class="col-md-6">
        <div class="h-100 p-5 text-white bg-primary rounded-3">
          <h2>{{ t('$features[4].title') }}</h2>
          <p>{{ t('$features[4].text') }}</p>
          <a class="btn btn-outline-light btn-lg px-4 me-md-2" href="https://dev.meteostat.net/" target="_blank">
            <icon :icon="['fas', 'code']" class="me-1" />
            {{ t('documentation') }}
          </a>
        </div>
      </div>
    </div>

    <div class="p-5 text-white bg-love rounded-3">
      <div class="container-fluid py-3">
        <h2 class="display-6 fw-bold">
          {{ t('$features[5].title') }}
        </h2>
        <p class="col-md-8 fs-4">
          {{ t('$features[5].text') }}
        </p>
        <div class="d-grid gap-2 d-md-flex justify-content-md-start">
          <router-link to="/donate" class="btn btn-outline-light btn-lg px-4">
            <icon :icon="['fas', 'heart']" class="me-1" />
            {{ t('donation') }}
          </router-link>
          <router-link tag="button" class="btn btn-outline-light border-0 btn-lg px-4 me-md-2" to="/patrons">
            <icon :icon="['fas', 'user-friends']" class="me-1" />
            {{ t('patrons') }}
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useI18n } from 'vue-i18n';
import { useHead } from '@unhead/vue';

export default defineComponent({
  name: 'About',

  setup(): Record<string, any> {
    const { t } = useI18n();

    useHead({
      title: `${t('$meta.title')} | Meteostat`,
      meta: [
        {
          name: 'description',
          content: t('$meta.description')
        }
      ]
    });

    return { t };
  }
});
</script>

<style lang="scss" scoped>
@import '~/style/variables';
@import 'bootstrap/scss/functions';
@import 'bootstrap/scss/variables';
@import 'bootstrap/scss/mixins';

.bg-forest {
  background: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)),
    url(https://media.meteostat.net/assets/hero-forest.jpg);
  background-size: cover;
}

.bg-love {
  background: linear-gradient(to right, #cc2b5e, #753a88);
}
</style>

<i18n>
{
  "en": {
    "$meta": {
      "title": "About",
      "description": "Meteostat is one of the largest providers of open weather and climate data."
    },
    "$title": "The Weather's Record Keeper",
    "$description": "Meteostat is one of the largest providers of open weather and climate data. The platform provides access to long-term time series of thousands of weather stations.",
    "$features": [
      {
        "title": "Imagine a Search Engine for Weather Data",
        "text": "Meteostat processes data from various public sources. This allows both developers and end users to access weather and climate data through a single interface. Think of it as a gateway to meteorological data that puts user experience first."
      },
      {
        "title": "Real Observations and Common Standards",
        "text": "Our weather stations meet the World Meteorological Organization's criteria for location and observation methods. Also, Meteostat is one of the few sources that focus on real observations instead of supra-regional models."
      },
      {
        "title": "Weather Is Common Property",
        "text": "Meteorological data should not be reserved for those who can afford it. Meteostat democratizes weather and climate data by providing open and free access to its archive. As the climate keeps changing, transparency is more important than ever."
      },
      {
        "title": "Open Source",
        "text": "Meteostat supports both open source and open data. Most of the code that powers Meteostat is available under the MIT license. Help us make Meteostat even better or build your own projects on top of it."
      },
      {
        "title": "Get Creative",
        "text": "Integrate Meteostat data into your products, applications and workflows. Thanks to our open data policy, Meteostat is an ideal data source for research and educational projects."
      },
      {
        "title": "Show Your Love or Get Involved",
        "text": "We believe in open weather and climate data, but we need your help to continue our mission. Your contribution helps both Meteostat and the initiatives building on it move forward. Thank you!"
      }
    ]
  },
  "de": {
    "$meta": {
      "title": "Über uns",
      "description": "Meteostat ist einer der größten Anbieter von offenen Wetter- und Klimadaten."
    },
    "$title": "Wetterrückblick und Klimadaten",
    "$description": "Meteostat ist einer der größten Anbieter offener Wetter- und Klimadaten. Die Plattform bietet Zugang zu langjährigen Zeitreihen tausender Wetterstationen.",
    "$features": [
      {
        "title": "Eine Suchmaschine für Wetterdaten",
        "text": "Meteostat verarbeitet Daten aus verschiedenen öffentlichen Quellen. So können Entwickler und Endnutzer über eine einzige Schnittstelle auf Wetter- und Klimadaten zugreifen. Die Benutzerfreundlichkeit steht dabei im Vordergrund."
      },
      {
        "title": "Echte Beobachtungen und einheitliche Standards",
        "text": "Unsere Wetterstationen erfüllen die Kriterien der Weltorganisation für Meteorologie in Bezug auf Standort und Beobachtungsmethoden. Außerdem ist Meteostat eine der wenigen Quellen, die auf echte Beobachtungsdaten statt auf überregionale Modelle setzen."
      },
      {
        "title": "Das Wetter ist ein Gemeingut",
        "text": "Meteorologische Daten sollten nicht nur denjenigen vorbehalten sein, die sie sich leisten können. Meteostat demokratisiert Wetter- und Klimadaten, indem es offenen und kostenlosen Zugang zu seinem Archiv bietet. Angesichts des Klimawandels ist Transparenz wichtiger denn je."
      },
      {
        "title": "Open Source",
        "text": "Meteostat steht für Open Source und Open Data. Der Großteil des Codes hinter Meteostat ist unter der MIT-Lizenz verfügbar. Helfen Sie uns, Meteostat noch besser zu machen, oder bauen Sie eigene Projekte darauf auf."
      },
      {
        "title": "Werden Sie kreativ",
        "text": "Integrieren Sie Meteostat-Daten in Ihre Produkte, Anwendungen und Arbeitsabläufe. Dank unserer offenen Datenpolitik ist Meteostat eine ideale Datenquelle für Forschungs- und Bildungsprojekte."
      },
      {
        "title": "Unterstützen Sie Meteostat",
        "text": "Wir glauben an offene Wetter- und Klimadaten, brauchen aber Ihre Hilfe, um unsere Mission fortzusetzen. Ihr Beitrag hilft Meteostat und allen darauf aufbauenden Initiativen, sich weiterzuentwickeln. Vielen Dank!"
      }
    ]
  },
  "it": {
    "$meta": {
      "title": "Chi siamo",
      "description": "Meteostat è uno dei maggiori fornitori di dati meteo e climatici aperti."
    },
    "$title": "L'archivio del meteo",
    "$description": "Meteostat è uno dei maggiori fornitori di dati meteo e climatici aperti. La piattaforma offre l'accesso a serie temporali pluriennali di migliaia di stazioni meteo.",
    "$features": [
      {
        "title": "Un motore di ricerca per i dati meteo",
        "text": "Meteostat elabora dati provenienti da diverse fonti pubbliche. In questo modo sviluppatori e utenti finali possono accedere ai dati meteo e climatici tramite un'unica interfaccia. Pensalo come una porta d'accesso ai dati meteorologici che mette al primo posto l'esperienza dell'utente."
      },
      {
        "title": "Osservazioni reali e standard comuni",
        "text": "Le nostre stazioni meteo soddisfano i criteri dell'Organizzazione meteorologica mondiale per ubicazione e metodi di osservazione. Inoltre, Meteostat è una delle poche fonti che si basano su osservazioni reali invece che su modelli sovraregionali."
      },
      {
        "title": "Il meteo è un bene comune",
        "text": "I dati meteorologici non dovrebbero essere riservati a chi può permetterseli. Meteostat democratizza i dati meteo e climatici offrendo un accesso aperto e gratuito al proprio archivio. Con il clima che continua a cambiare, la trasparenza è più importante che mai."
      },
      {
        "title": "Open source",
        "text": "Meteostat sostiene sia l'open source che gli open data. Gran parte del codice di Meteostat è disponibile con licenza MIT. Aiutaci a migliorare Meteostat o crea i tuoi progetti partendo da esso."
      },
      {
        "title": "Dai spazio alla creatività",
        "text": "Integra i dati di Meteostat nei tuoi prodotti, applicazioni e flussi di lavoro. Grazie alla nostra politica di dati aperti, Meteostat è una fonte ideale per progetti di ricerca e didattici."
      },
      {
        "title": "Sostienici o partecipa",
        "text": "Crediamo nei dati meteo e climatici aperti, ma abbiamo bisogno del tuo aiuto per portare avanti la nostra missione. Il tuo contributo aiuta Meteostat e le iniziative che si basano su di esso a crescere. Grazie!"
      }
    ]
  },
  "es": {
    "$meta": {
      "title": "Acerca de",
      "description": "Meteostat es uno de los mayores proveedores de datos meteorológicos y climáticos abiertos."
    },
    "$title": "El archivo del tiempo",
    "$description": "Meteostat es uno de los mayores proveedores de datos meteorológicos y climáticos abiertos. La plataforma ofrece acceso a series temporales de largo plazo de miles de estaciones meteorológicas.",
    "$features": [
      {
        "title": "Un buscador de datos meteorológicos",
        "text": "Meteostat procesa datos de diversas fuentes públicas. Así, tanto desarrolladores como usuarios finales pueden acceder a datos meteorológicos y climáticos a través de una única interfaz. Piensa en ello como una puerta de acceso a los datos meteorológicos que da prioridad a la experiencia del usuario."
      },
      {
        "title": "Observaciones reales y estándares comunes",
        "text": "Nuestras estaciones meteorológicas cumplen los criterios de la Organización Meteorológica Mundial en cuanto a ubicación y métodos de observación. Además, Meteostat es una de las pocas fuentes que se basan en observaciones reales en lugar de modelos suprarregionales."
      },
      {
        "title": "El tiempo es un bien común",
        "text": "Los datos meteorológicos no deberían estar reservados a quienes pueden pagarlos. Meteostat democratiza los datos meteorológicos y climáticos ofreciendo acceso abierto y gratuito a su archivo. Con un clima en constante cambio, la transparencia es más importante que nunca."
      },
      {
        "title": "Código abierto",
        "text": "Meteostat apuesta por el código abierto y los datos abiertos. La mayor parte del código de Meteostat está disponible bajo la licencia MIT. Ayúdanos a mejorar Meteostat o crea tus propios proyectos a partir de él."
      },
      {
        "title": "Da rienda suelta a tu creatividad",
        "text": "Integra los datos de Meteostat en tus productos, aplicaciones y flujos de trabajo. Gracias a nuestra política de datos abiertos, Meteostat es una fuente de datos ideal para proyectos de investigación y educativos."
      },
      {
        "title": "Apóyanos o participa",
        "text": "Creemos en los datos meteorológicos y climáticos abiertos, pero necesitamos tu ayuda para continuar con nuestra misión. Tu contribución ayuda a Meteostat y a las iniciativas basadas en él a seguir avanzando. ¡Gracias!"
      }
    ]
  },
  "nl": {
    "$meta": {
      "title": "Over ons",
      "description": "Meteostat is een van de grootste aanbieders van open weer- en klimaatgegevens."
    },
    "$title": "Het geheugen van het weer",
    "$description": "Meteostat is een van de grootste aanbieders van open weer- en klimaatgegevens. Het platform biedt toegang tot langjarige tijdreeksen van duizenden weerstations.",
    "$features": [
      {
        "title": "Een zoekmachine voor weerdata",
        "text": "Meteostat verwerkt gegevens uit verschillende openbare bronnen. Zo hebben zowel ontwikkelaars als eindgebruikers via één interface toegang tot weer- en klimaatgegevens. Zie het als een toegangspoort tot meteorologische gegevens waarbij gebruiksgemak voorop staat."
      },
      {
        "title": "Echte waarnemingen en gemeenschappelijke standaarden",
        "text": "Onze weerstations voldoen aan de criteria van de Wereld Meteorologische Organisatie voor locatie en waarnemingsmethoden. Bovendien is Meteostat een van de weinige bronnen die uitgaan van echte waarnemingen in plaats van bovenregionale modellen."
      },
      {
        "title": "Het weer is van iedereen",
        "text": "Meteorologische gegevens zouden niet alleen beschikbaar moeten zijn voor wie ervoor kan betalen. Meteostat democratiseert weer- en klimaatgegevens door open en gratis toegang tot zijn archief te bieden. Nu het klimaat blijft veranderen, is transparantie belangrijker dan ooit."
      },
      {
        "title": "Open source",
        "text": "Meteostat staat voor open source én open data. Het grootste deel van de code achter Meteostat is beschikbaar onder de MIT-licentie. Help ons Meteostat nog beter te maken of bouw er je eigen projecten op."
      },
      {
        "title": "Ga creatief aan de slag",
        "text": "Integreer Meteostat-gegevens in je producten, applicaties en workflows. Dankzij ons opendatabeleid is Meteostat een ideale gegevensbron voor onderzoeks- en onderwijsprojecten."
      },
      {
        "title": "Steun ons of doe mee",
        "text": "Wij geloven in open weer- en klimaatgegevens, maar we hebben jouw hulp nodig om onze missie voort te zetten. Jouw bijdrage helpt Meteostat en de initiatieven die erop voortbouwen vooruit. Bedankt!"
      }
    ]
  },
  "fr": {
    "$meta": {
      "title": "À propos",
      "description": "Meteostat est l'un des plus grands fournisseurs de données météorologiques et climatiques ouvertes."
    },
    "$title": "La mémoire de la météo",
    "$description": "Meteostat est l'un des plus grands fournisseurs de données météorologiques et climatiques ouvertes. La plateforme donne accès à des séries temporelles longues de milliers de stations météo.",
    "$features": [
      {
        "title": "Un moteur de recherche pour les données météo",
        "text": "Meteostat traite des données provenant de diverses sources publiques. Les développeurs comme les utilisateurs finaux peuvent ainsi accéder aux données météorologiques et climatiques via une interface unique. Voyez-le comme une porte d'entrée vers les données météorologiques qui place l'expérience utilisateur au premier plan."
      },
      {
        "title": "Des observations réelles et des normes communes",
        "text": "Nos stations météo répondent aux critères de l'Organisation météorologique mondiale en matière d'emplacement et de méthodes d'observation. De plus, Meteostat est l'une des rares sources à s'appuyer sur des observations réelles plutôt que sur des modèles suprarégionaux."
      },
      {
        "title": "La météo est un bien commun",
        "text": "Les données météorologiques ne devraient pas être réservées à ceux qui peuvent se les offrir. Meteostat démocratise les données météorologiques et climatiques en offrant un accès libre et gratuit à ses archives. Alors que le climat ne cesse d'évoluer, la transparence est plus importante que jamais."
      },
      {
        "title": "Open source",
        "text": "Meteostat soutient à la fois l'open source et l'open data. La majeure partie du code de Meteostat est disponible sous licence MIT. Aidez-nous à améliorer Meteostat ou développez vos propres projets à partir de celui-ci."
      },
      {
        "title": "Laissez libre cours à votre créativité",
        "text": "Intégrez les données de Meteostat dans vos produits, applications et flux de travail. Grâce à notre politique de données ouvertes, Meteostat est une source de données idéale pour les projets de recherche et d'enseignement."
      },
      {
        "title": "Soutenez-nous ou participez",
        "text": "Nous croyons aux données météorologiques et climatiques ouvertes, mais nous avons besoin de votre aide pour poursuivre notre mission. Votre contribution aide Meteostat et les initiatives qui s'appuient sur lui à aller de l'avant. Merci !"
      }
    ]
  },
  "pt": {
    "$meta": {
      "title": "Sobre",
      "description": "O Meteostat é um dos maiores fornecedores de dados climáticos e meteorológicos abertos."
    },
    "$title": "O arquivo do tempo",
    "$description": "O Meteostat é um dos maiores fornecedores de dados meteorológicos e climáticos abertos. A plataforma dá acesso a séries temporais longas de milhares de estações meteorológicas.",
    "$features": [
      {
        "title": "Um motor de pesquisa para dados meteorológicos",
        "text": "O Meteostat processa dados de várias fontes públicas. Assim, tanto programadores como utilizadores finais podem aceder a dados meteorológicos e climáticos através de uma única interface. Pense nele como uma porta de entrada para dados meteorológicos que coloca a experiência do utilizador em primeiro lugar."
      },
      {
        "title": "Observações reais e normas comuns",
        "text": "As nossas estações meteorológicas cumprem os critérios da Organização Meteorológica Mundial quanto à localização e aos métodos de observação. Além disso, o Meteostat é uma das poucas fontes que se baseiam em observações reais em vez de modelos supra-regionais."
      },
      {
        "title": "O tempo é um bem comum",
        "text": "Os dados meteorológicos não devem estar reservados a quem os pode pagar. O Meteostat democratiza os dados meteorológicos e climáticos ao oferecer acesso aberto e gratuito ao seu arquivo. Com o clima em constante mudança, a transparência é mais importante do que nunca."
      },
      {
        "title": "Código aberto",
        "text": "O Meteostat apoia tanto o código aberto como os dados abertos. A maior parte do código do Meteostat está disponível sob a licença MIT. Ajude-nos a melhorar o Meteostat ou crie os seus próprios projetos a partir dele."
      },
      {
        "title": "Dê asas à criatividade",
        "text": "Integre os dados do Meteostat nos seus produtos, aplicações e fluxos de trabalho. Graças à nossa política de dados abertos, o Meteostat é uma fonte de dados ideal para projetos de investigação e educação."
      },
      {
        "title": "Apoie-nos ou participe",
        "text": "Acreditamos em dados meteorológicos e climáticos abertos, mas precisamos da sua ajuda para continuar a nossa missão. O seu contributo ajuda o Meteostat e as iniciativas que nele se baseiam a avançar. Obrigado!"
      }
    ]
  },
  "ru": {
    "$meta": {
      "title": "О проекте",
      "description": "Meteostat — один из крупнейших поставщиков открытых данных о погоде и климате."
    },
    "$title": "Летопись погоды",
    "$description": "Meteostat — один из крупнейших поставщиков открытых данных о погоде и климате. Платформа предоставляет доступ к многолетним временным рядам тысяч метеостанций.",
    "$features": [
      {
        "title": "Поисковая система для данных о погоде",
        "text": "Meteostat обрабатывает данные из различных открытых источников. Благодаря этому разработчики и обычные пользователи получают доступ к данным о погоде и климате через единый интерфейс. Это своего рода шлюз к метеорологическим данным, в котором главное — удобство пользователя."
      },
      {
        "title": "Реальные наблюдения и общие стандарты",
        "text": "Наши метеостанции соответствуют критериям Всемирной метеорологической организации по размещению и методам наблюдений. Кроме того, Meteostat — один из немногих источников, которые опираются на реальные наблюдения, а не на надрегиональные модели."
      },
      {
        "title": "Погода — общее достояние",
        "text": "Метеорологические данные не должны быть доступны только тем, кто может за них заплатить. Meteostat делает данные о погоде и климате общедоступными, предоставляя открытый и бесплатный доступ к своему архиву. В условиях меняющегося климата прозрачность важна как никогда."
      },
      {
        "title": "Открытый исходный код",
        "text": "Meteostat поддерживает как открытый код, так и открытые данные. Большая часть кода Meteostat доступна по лицензии MIT. Помогите нам сделать Meteostat ещё лучше или создайте на его основе собственные проекты."
      },
      {
        "title": "Творите",
        "text": "Интегрируйте данные Meteostat в свои продукты, приложения и рабочие процессы. Благодаря нашей политике открытых данных Meteostat — идеальный источник данных для исследовательских и образовательных проектов."
      },
      {
        "title": "Поддержите нас или присоединяйтесь",
        "text": "Мы верим в открытые данные о погоде и климате, но нам нужна ваша помощь, чтобы продолжать нашу миссию. Ваш вклад помогает развиваться и Meteostat, и проектам, построенным на его основе. Спасибо!"
      }
    ]
  }
}
</i18n>
