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
          <p
            class="text-muted"
          >
            {{ t('$features[0].text') }}
          </p>
        </div>
        <div class="col-12 col-md-4 p-4 p-md-5 bg-light border border-white rounded-3">
          <h3 class="mb-4">
            {{ t('$features[1].title') }}
          </h3>
          <p
            class="text-muted"
          >
            {{ t('$features[1].text') }}
          </p>
        </div>
        <div class="col-12 col-md-4 p-4 p-md-5 bg-light border border-white rounded-3">
          <h3 class="mb-4">
            {{ t('$features[2].title') }}
          </h3>
          <p
            class="text-muted"
          >
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
          <a
            href="https://github.com/meteostat"
            class="btn btn-outline-light"
            target="_blank"
            rel="noreferrer"
          >
            <icon
              :icon="['fab', 'github']"
              class="me-2"
            />
            GitHub
          </a>
        </div>
      </div>
      <div class="col-md-6">
        <div class="h-100 p-5 text-white bg-primary rounded-3">
          <h2>{{ t('$features[4].title') }}</h2>
          <p>{{ t('$features[4].text') }}</p>
          <a
            class="btn btn-outline-light btn-lg px-4 me-md-2"
            href="https://dev.meteostat.net/"
            target="_blank"
          >
            <icon
              :icon="['fas', 'code']"
              class="me-1"
            />
            {{ t('documentation') }}
          </a>
        </div>
      </div>
    </div>

    <div class="p-5 text-white bg-love rounded-3">
      <div class="container-fluid py-3">
        <h1 class="display-6 fw-bold">
          {{ t('$features[5].title') }}
        </h1>
        <p class="col-md-8 fs-4">
          {{ t('$features[5].text') }}
        </p>
        <div class="d-grid gap-2 d-md-flex justify-content-md-start">
          <a
            class="btn btn-outline-light btn-lg px-4"
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
          <router-link
            tag="button"
            class="btn btn-outline-light border-0 btn-lg px-4 me-md-2"
            to="/patrons"
          >
            <icon
              :icon="['fas', 'user-friends']"
              class="me-1"
            />
            {{ t('patrons') }}
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useHead } from '@vueuse/head'

export default defineComponent({
  name: 'About',

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
  }
})
</script>

<style lang="scss" scoped>
@import '~/style/variables';
@import "../node_modules/bootstrap/scss/functions";
@import "../node_modules/bootstrap/scss/variables";
@import "../node_modules/bootstrap/scss/mixins";

.bg-forest {
  background:
    linear-gradient(
      rgba(0, 0, 0, 0.3), 
      rgba(0, 0, 0, 0.3)
    ),
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
        "description": "Meteostat is one of the largest vendors of open weather and climate data."
    },
    "$title": "The Weather's Record Keeper",
    "$description": "Meteostat is one of the largest vendors of open weather and climate data. The platform provides access to long-term time series of thousands of weather stations.",
    "$features": [
      {
        "title": "Imagine a Search Engine for Weather Data",
        "text": "Meteostat processes data from various public sources. This allows both developers and end users to access weather and climate data through a single interface. Think of it as a gateway to meteorological data which puts user experience first."
      },
      {
        "title": "Real Observations and Common Standards",
        "text": "Our weather stations meet the World Meteorological Organization's criteria for location and observation methods. Also, Meteostat is one of the rare sources which focuses on real observation data instead of supra-regional models."
      },
      {
        "title": "Weather is Common Property",
        "text": "Meteorological data should not be exclusive to those who can afford it. Meteostat democratizes weather and climate data by providing open and free access to its archive. With climate change on the rise, transparency is more important than ever."
      },
      {
        "title": "Open Source",
        "text": "Meteostat fosters both open source and data. The majority of code which powers Meteostat is available under the MIT license. Help us making Meteostat even better or build upon it."
      },
      {
        "title": "Get Creative",
        "text": "Integrate Meteostat data into your products, applications and workflows. Thanks to our open data policy, Meteostat is an ideal data source for research and educational projects."
      },
      {
        "title": "Show Your Love Or Get Involved",
        "text": "We believe in open weather and climate data. But we need your help continuing our mission. Your contribution helps both Meteostat and the initiatives building on top of it moving forward. Thank you!"
      }
    ]
  },
  "de": {
    "$meta": {
        "title": "Über Uns",
        "description": "Meteostat ist einer der größten Anbieter von offenen Wetter- und Klimadaten."
    },
    "$title": "Wetterrückblick und Klimadaten",
    "$description": "Meteostat ist einer der größten Anbieter von offenen Wetter- und Klimadaten. Die Plattform bietet Zugang zu langjährigen Zeitreihen von Tausenden von Wetterstationen.",
    "$features": [
      {
        "title": "Eine Suchmaschine für Wetterdaten",
        "text": "Meteostat verarbeitet Daten aus verschiedenen öffentlichen Quellen. Dies ermöglicht sowohl Entwicklern als auch Endnutzern den Zugriff auf Wetter- und Klimadaten über eine einzige Schnittstelle. Die Benutzerfreundlichkeit steht dabei im Vordergrund."
      },
      {
        "title": "Echte Beobachtungen und einheitliche Standards",
        "text": "Unsere Wetterstationen erfüllen die Kriterien der Weltorganisation für Meteorologie in Bezug auf Standort und Beobachtungsmethoden. Außerdem ist Meteostat eine der wenigen Quellen, die sich auf reale Beobachtungsdaten anstelle von überregionalen Modellen konzentriert."
      },
      {
        "title": "Das Wetter ist ein Gemeingut",
        "text": "Meteorologische Daten sollten nicht nur denjenigen vorbehalten sein, die sie sich leisten können. Meteostat demokratisiert Wetter- und Klimadaten, indem es offenen und freien Zugang zu seinem Archiv bietet. Angesichts des Klimawandels ist Transparenz wichtiger denn je."
      },
      {
        "Titel": "Open Source",
        "text": "Meteostat fördert sowohl Open Source als auch Open Data. Der Großteil des Codes, der Meteostat antreibt, ist unter der MIT-Lizenz verfügbar. Helfen Sie uns, Meteostat noch besser zu machen oder bauen Sie eigene Projekte darauf auf."
      },
      {
        "title": "Werden Sie Kreativ",
        "text": "Integrieren Sie Meteostat-Daten in Ihre Produkte, Anwendungen und Arbeitsabläufe. Dank unserer offenen Datenpolitik ist Meteostat eine ideale Datenquelle für Forschungs- und Bildungsprojekte."
      },
      {
        "title": "Unterstützen Sie Meteostat",
        "text": "Wir glauben an offene Wetter- und Klimadaten. Aber wir brauchen Ihre Hilfe, um unsere Mission fortzusetzen. Ihr Beitrag hilft sowohl Meteostat als auch den darauf aufbauenden Initiativen, sich weiterzuentwickeln. Vielen Dank!"
      }
    ]
  },
  "it": {
    "$meta": {
        "title": "Su Meteostat",
        "description": "Meteostat è uno dei maggiori fornitori di dati meteo e climatici aperti."
    },
    "$title": "Il Guardiano del Tempo",
    "$description": "Meteostat è uno dei più grandi fornitori di dati climatici e meteorologici aperti. La piattaforma fornisce l'accesso a serie temporali a lungo termine di migliaia di stazioni meteorologiche.",
    "$features": [
      {
        "title": "Immagina un motore di ricerca per i dati meteo",
        "text": "Meteostat elabora dati da varie fonti pubbliche. Questo permette sia agli sviluppatori che agli utenti finali di accedere ai dati meteo e climatici attraverso un'unica interfaccia. Pensatelo come un gateway per i dati meteorologici che mette al primo posto l'esperienza dell'utente."
      },
      {
        "title": "Osservazioni reali e standard comuni",
        "text": "Le nostre stazioni meteorologiche soddisfano i criteri dell'Organizzazione Meteorologica Mondiale per l'ubicazione e i metodi di osservazione. Inoltre, Meteostat è una delle rare fonti che si concentra su dati di osservazione reali invece di modelli sovraregionali."
      },
      {
        "title": "Il tempo è proprietà comune",
        "text": "I dati meteorologici non dovrebbero essere esclusivi per coloro che possono permetterseli. Meteostat democratizza i dati meteorologici e climatici fornendo un accesso aperto e gratuito al suo archivio. Con il cambiamento climatico in aumento, la trasparenza è più importante che mai."
      },
      {
        "title": "Open Source",
        "text": "Meteostat promuove sia l'open source che i dati. La maggior parte del codice che alimenta Meteostat è disponibile sotto la licenza MIT. Aiutaci a rendere Meteostat ancora migliore o costruiscici sopra."
      },
      {
        "title": "Diventa Creativo",
        "text": "Integra i dati Meteostat nei tuoi prodotti, applicazioni e flussi di lavoro. Grazie alla nostra politica di dati aperti, Meteostat è una fonte di dati ideale per progetti di ricerca ed educativi."
      },
      {
        "title": "Mostra il Tuo Amore o Fatti Coinvolgere",
        "text": "Crediamo nei dati meteo e climatici aperti. Ma abbiamo bisogno del tuo aiuto per continuare la nostra missione. Il tuo contributo aiuta sia Meteostat che le iniziative che si basano su di esso ad andare avanti. Grazie!"
      }
    ]
  },
  "es": {
    "$meta": {
        "title": "Sobre Meteostat",
        "description": "Meteostat es uno de los mayores proveedores de datos meteorológicos y climáticos abiertos."
    },
    "$title": "El Guardián del Tiempo",
    "$description": "Meteostat es uno de los mayores vendedores de datos meteorológicos y climáticos abiertos. La plataforma proporciona acceso a series temporales a largo plazo de miles de estaciones meteorológicas.",
    "$features": [
      {
        "title": "Imagina un motor de búsqueda de datos meteorológicos",
        "text": "Meteostat procesa datos de varias fuentes públicas. Esto permite tanto a los desarrolladores como a los usuarios finales acceder a los datos meteorológicos y climáticos a través de una única interfaz. Piensa en ello como una puerta de acceso a los datos meteorológicos que da prioridad a la experiencia del usuario."
      },
      {
        "title": "Observaciones reales y normas comunes",
        "text": "Nuestras estaciones meteorológicas cumplen los criterios de la Organización Meteorológica Mundial en cuanto a ubicación y métodos de observación. Además, Meteostat es una de las pocas fuentes que se centra en datos de observación reales en lugar de modelos suprarregionales."
      },
      {
        "title": "El tiempo es una propiedad común",
        "text": "Los datos meteorológicos no deberían ser exclusivos de quienes pueden pagarlos. Meteostat democratiza los datos meteorológicos y climáticos proporcionando un acceso abierto y gratuito a su archivo. Con el aumento del cambio climático, la transparencia es más importante que nunca."
      },
      {
        "título": "Open Source",
        "text": "Meteostat fomenta tanto el código abierto como los datos. La mayor parte del código que alimenta a Meteostat está disponible bajo la licencia MIT. Ayúdanos a hacer que Meteostat sea aún mejor o construye sobre él."
      },
      {
        "title": "Ser Creativo",
        "text": "Integre los datos de Meteostat en sus productos, aplicaciones y flujos de trabajo. Gracias a nuestra política de datos abiertos, Meteostat es una fuente de datos ideal para proyectos de investigación y educativos."
      },
      {
        "title": "Muestra tu amor o participa",
        "text": "Creemos en los datos meteorológicos y climáticos abiertos. Pero necesitamos tu ayuda para continuar con nuestra misión. Tu contribución ayuda a que tanto Meteostat como las iniciativas que se construyen sobre él sigan adelante. Gracias!"
      }
    ]
  },
  "nl": {
    "$meta": {
        "title": "Over Meteostat",
        "description": "Meteostat is een van de grootste verkopers van open weer- en klimaatgegevens."
    },
    "$title": "The Weather's Record Keeper",
    "$description": "Meteostat is een van de grootste verkopers van open weer- en klimaatgegevens. Het platform biedt toegang tot lange termijn tijdreeksen van duizenden weerstations.",
    "$features": [
      {
        "title": "Stel je een zoekmachine voor weerdata voor",
        "text": "Meteostat verwerkt gegevens uit verschillende openbare bronnen. Hierdoor kunnen zowel ontwikkelaars als eindgebruikers via één interface toegang krijgen tot weer- en klimaatgegevens. Zie het als een toegangspoort tot meteorologische gegevens waarbij de gebruikerservaring voorop staat."
      },
      {
        "title": "Echte waarnemingen en gemeenschappelijke standaarden",
        "text": "Onze weerstations voldoen aan de criteria van de Wereld Meteorologische Organisatie voor locatie en waarnemingsmethoden. Bovendien is Meteostat een van de zeldzame bronnen die zich richt op echte waarnemingsgegevens in plaats van op supraregionale modellen."
      },
      {
        "title": "Het weer is gemeenschappelijk bezit",
        "text": "Meteorologische gegevens zouden niet exclusief moeten zijn voor degenen die het zich kunnen veroorloven. Meteostat democratiseert weer- en klimaatgegevens door open en vrije toegang te bieden tot zijn archief. Nu de klimaatverandering toeneemt, is transparantie belangrijker dan ooit."
      },
      {
        "title": "Open Source",
        "text": "Meteostat bevordert zowel open source als data. Het merendeel van de code die Meteostat voedt is beschikbaar onder de MIT-licentie. Help ons Meteostat nog beter te maken of bouw erop voort."
      },
      {
        "title": "Creatief Worden",
        "text": "Integreer Meteostat-data in uw producten, applicaties en workflows. Dankzij ons open data beleid is Meteostat een ideale databron voor onderzoeks- en educatieve projecten."
      },
      {
        "title": "Toon je Liefde of Doe Mee",
        "text": "Wij geloven in open weer- en klimaatgegevens. Maar we hebben jouw hulp nodig om onze missie voort te zetten. Jouw bijdrage helpt zowel Meteostat als de initiatieven die er bovenop bouwen vooruit. Dank je wel!"
      }
    ]
  },
  "fr": {
    "$meta" : {
        "title" : "À Propos de Meteostat",
        "description" : "Meteostat est l'un des plus grands vendeurs de données météorologiques et climatiques ouvertes."
    },
    "$title" : "Le Gardien du Temps",
    "$description" : "Meteostat est l'un des plus grands vendeurs de données météorologiques et climatiques ouvertes. La plateforme donne accès à des séries chronologiques à long terme de milliers de stations météorologiques.",
    "$features" : [
      {
        "title" : "Imaginez un moteur de recherche pour les données météorologiques",
        "text" : "Meteostat traite des données provenant de diverses sources publiques. Cela permet aux développeurs et aux utilisateurs finaux d'accéder aux données météorologiques et climatiques via une interface unique. Pensez-y comme une passerelle vers les données météorologiques qui place l'expérience utilisateur au premier plan."
      },
      {
        "title" : "Observations réelles et normes communes",
        "text" : "Nos stations météorologiques répondent aux critères de l'Organisation météorologique mondiale en matière de localisation et de méthodes d'observation. De plus, Meteostat est l'une des rares sources qui se concentre sur les données d'observation réelles plutôt que sur les modèles suprarégionaux."
      },
      {
        "title" : "La météo est un bien commun",
        "text" : "Les données météorologiques ne devraient pas être réservées à ceux qui en ont les moyens. Meteostat démocratise les données météorologiques et climatiques en offrant un accès ouvert et gratuit à ses archives. Avec le changement climatique en hausse, la transparence est plus importante que jamais."
      },
      {
        "titre" : "Open Source",
        "text" : "Meteostat favorise à la fois l'open source et les données. La majorité du code qui alimente Meteostat est disponible sous la licence MIT. Aidez-nous à rendre Meteostat encore meilleur ou à le développer."
      },
      {
        "title" : "Soyez créatif",
        "text" : "Intégrez les données de Météostat dans vos produits, applications et flux de travail. Grâce à notre politique de données ouvertes, Météostat est une source de données idéale pour les projets de recherche et d'éducation."
      },
      {
        "title" : "Montrez votre amour ou impliquez-vous",
        "text" : "Nous croyons aux données météorologiques et climatiques ouvertes. Mais nous avons besoin de votre aide pour poursuivre notre mission. Votre contribution permet à Meteostat et aux initiatives qui le complètent d'aller de l'avant. Merci !"
      }
    ]
  },
  "pt": {
    "$meta": {
        "title": "Sobre o Meteostat",
        "description": "O Meteostat é um dos maiores fornecedores de dados climáticos e meteorológicos abertos."
    },
    "$title": "O Recordista Meteorológico",
    "$description": "O Meteostat é um dos maiores fornecedores de dados climáticos e meteorológicos abertos. A plataforma dá acesso a séries temporais a longo prazo de milhares de estações meteorológicas.",
    "$features": [
      {
        "title": "Imagine a Search Engine for Weather Data",
        "text": "O Meteostat processa dados de várias fontes públicas. Isto permite tanto aos programadores como aos utilizadores finais aceder aos dados meteorológicos e climáticos através de uma única interface. Pense nisso como uma porta de entrada para dados meteorológicos que coloca a experiência do utilizador em primeiro lugar."
      },
      {
        "title": "Observações Reais e Normas Comuns",
        "text": "As nossas estações meteorológicas cumprem os critérios da Organização Meteorológica Mundial para a localização e métodos de observação. Além disso, o Meteostat é uma das raras fontes que se concentra em dados de observação reais em vez de modelos supra-regionais."
      },
      {
        "title": "O tempo é propriedade comum",
        "texto": "Os dados meteorológicos não devem ser exclusivos para aqueles que os podem pagar. O Meteostat democratiza os dados meteorológicos e climáticos, fornecendo acesso aberto e gratuito ao seu arquivo. Com as alterações climáticas a aumentar, a transparência é mais importante do que nunca."
      },
      {
        "title": "Open Source",
        "text": "O Meteostat fomenta tanto a fonte aberta como os dados. A maioria do código que alimenta o Meteostat está disponível sob a licença do MIT. Ajude-nos a tornar o Meteostat ainda melhor ou a construir sobre ele."
      },
      {
        "title": "Seja Criativo",
        "text": "Integre os dados do Meteostat nos seus produtos, aplicações e fluxos de trabalho. Graças à nossa política de dados aberta, o Meteostat é uma fonte de dados ideal para projectos de investigação e educação."
      },
      {
        "title": "Mostra o teu amor ou Envolve-te",
        "text": "Acreditamos em dados climáticos e meteorológicos abertos. Mas precisamos da vossa ajuda para continuar a nossa missão. A sua contribuição ajuda tanto o Meteostat como as iniciativas de construção em cima dele a avançarem. Obrigado!"
      }
    ]
  },
  "ru": {
    "$meta": {
        "title": "О Меteostat",
        "description": "Meteostat - один из крупнейших поставщиков открытых данных о погоде и климате."
    },
    "$title": "Хранитель погодных рекордов",
    "$description": "Meteostat - один из крупнейших поставщиков открытых данных о погоде и климате. Платформа предоставляет доступ к долгосрочным временным рядам тысяч метеостанций.",
    "$features": [
      {
        "title": "Представьте себе поисковую систему для данных о погоде",
        "text": "Meteostat обрабатывает данные из различных публичных источников. Это позволяет как разработчикам, так и конечным пользователям получать доступ к погодным и климатическим данным через единый интерфейс. Думайте об этом как о шлюзе к метеорологическим данным, который ставит пользовательский опыт на первое место."
      },
      {
        "title": "Реальные наблюдения и общие стандарты",
        "text": "Наши метеостанции соответствуют критериям Всемирной метеорологической организации в отношении местоположения и методов наблюдения. Кроме того, Меteostat - один из редких источников, который ориентируется на реальные данные наблюдений, а не на надрегиональные модели."
      },
      {
        "title": "Погода - общая собственность",
        "text": "Метеорологические данные не должны быть эксклюзивными для тех, кто может себе это позволить. Meteostat демократизирует погодные и климатические данные, предоставляя открытый и бесплатный доступ к своему архиву. В условиях растущего изменения климата прозрачность важна как никогда."
      },
      {
        "title": "Открытый исходный код",
        "text": "Meteostat поддерживает как открытый исходный код, так и данные. Большая часть кода, на котором работает Meteostat, доступна по лицензии MIT. Помогите нам сделать Meteostat еще лучше или создайте его."
      },
      {
        "title": "Займитесь творчеством",
        "text": "Интегрируйте данные Meteostat в свои продукты, приложения и рабочие процессы. Благодаря нашей политике открытых данных, Meteostat является идеальным источником данных для исследовательских и образовательных проектов."
      },
      {
        "title": "Проявите свою любовь или примите участие",
        "text": "Мы верим в открытые данные о погоде и климате. Но нам нужна ваша помощь в продолжении нашей миссии. Ваш вклад поможет и Meteostat, и инициативам, построенным на его основе, двигаться вперед. Спасибо!"
      }
    ]    
  }
}
</i18n>