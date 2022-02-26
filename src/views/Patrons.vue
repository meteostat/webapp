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
              "{{ t('$quote') }}"
            </blockquote>
            <figcaption class="blockquote-footer text-end mt-3">
              Christian Lamprecht, {{ t('$cTitle') }}
            </figcaption>
          </figure>
          <div class="d-flex mt-3">
            <a
              class="btn btn-primary btn-sm me-1"
              href="https://www.linkedin.com/in/clampr/"
              target="_blank"
              rel="noreferrer"
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
              rel="noreferrer"
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
            rel="noreferrer nofollow"
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
            :icon="['fas', 'heart']"
            class="me-2 text-danger"
          />
          GitHub
        </h3>
        <i18n-t
          keypath="$backersText"
          tag="p"
          class="text-muted"
        >
          <template #service>GitHub Sponsors</template>
        </i18n-t>
        <ul>
          <li
            v-for="backer in ghBackers"
            :key="backer"
          >
            <a
              :href="backer.link"
              target="_blank"
              rel="noreferrer nofollow"
            >
              {{ backer.name }}
            </a>
          </li>
        </ul>
        <hr>
        <i18n-t
          keypath="$backersAction"
          tag="p"
        >
          <template #patreon>
            <a
              href="https://www.patreon.com/meteostat"
              target="_blank"
              rel="noreferrer"
            >Patreon</a>
          </template>
          <template #github>
            <a
              href="https://github.com/sponsors/clampr"
              target="_blank"
              rel="noreferrer"
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
            :icon="['fab', 'patreon']"
            class="me-2"
          />
          Patreon
        </h3>
        <i18n-t
          keypath="$backersText"
          tag="p"
          class="text-muted"
        >
          <template #service>Patreon</template>
        </i18n-t>
        <ul>
          <li
            v-for="patron in patrons"
            :key="patron.name"
          >
            <a
              :href="patron.link"
              target="_blank"
              rel="noreferrer nofollow"
            >
              {{ patron.name }}
            </a>
          </li>
        </ul>
        <hr>
        <i18n-t
          keypath="$backersAction"
          tag="p"
        >
          <template #patreon>
            <a
              href="https://www.patreon.com/meteostat"
              target="_blank"
              rel="noreferrer"
            >Patreon</a>
          </template>
          <template #github>
            <a
              href="https://github.com/sponsors/clampr"
              target="_blank"
              rel="noreferrer"
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
            :icon="['fab', 'github']"
            class="me-2"
          />
          {{ t('contributors') }}
        </h3>
        <p
          class="text-muted"
        >
          {{ t('$contributorsText') }}
        </p>
        <ul>
          <li
            v-for="contributor in contributors.sort()"
            :key="contributor"
          >
            <a
              :href="`https://github.com/${contributor}`"
              target="_blank"
              rel="noreferrer nofollow"
            >@{{ contributor }}</a>
          </li>
        </ul>
        <hr>
        <i18n-t
          keypath="$contributorsAction"
          tag="p"
        >
          <template #github>
            <a
              href="https://github.com/meteostat"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
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
      ghBackers: [
        {
          name: 'Benjamin Gutzmann',
          link: 'https://github.com/gutzbenj'
        }        
      ],
      patrons: [
        {
          name: 'Tyler Kontra',
          link: 'https://www.patreon.com/user?u=18076117'
        },
        {
          name: 'Erica Kovac',
          link: 'https://www.patreon.com/digitalfox'
        }
      ],
      contributors: [
        'weyaaron',
        'mrsjuli',
        'amotl',
        'meteoDaniel',
        'rfoel',
        'Kkoile',
        'clampr'
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
    "$quote": "Running an open source project can be challenging. You are always low on all kinds of resources - especially time and money. It is our passion for weather and climate which keeps us going. Meteostat is only possible because we have dozens of generous backers and contributors who keep supporting the project. Thanks to all of you!",
    "$cTitle": "Founder & Maintainer",
    "sponsorsAndPartners": "Sponsors & Partners",
    "these": "these",
    "$backersText": "Our incredible patrons on {service}.",
    "$backersAction": "Become a backer on {patreon} or {github}. Alternatively, you can also set up recurring pledges or a one-time donation using {donation} options.",
    "contributors": "Contributors",
    "$contributorsText": "The taltented developers and contributors who are building Meteostat and its interfaces.",
    "$contributorsAction": "If you are familiar with coding, head over to {github} and help us building Meteostat."
  },
  "de": {
    "$meta": {
      "title": "Förderer",
      "description": "Lernen Sie die Menschen kennen, die Meteostat unterstützen und fördern."
    },
    "meetChristian": "Liebe Nutzer,",
    "$quote": "Die Organisation eines Open-Source-Projekts kann eine Herausforderung sein. Man ist immer knapp an allen möglichen Ressourcen - vor allem Zeit und Geld. Es ist unsere Leidenschaft für Wetter und Klima, die uns am Laufen hält. Meteostat ist nur möglich, weil wir Dutzende von großzügigen Förderern und Mitwirkenden haben, die das Projekt unterstützen. Vielen Dank an Sie alle!",
    "$cTitle": "Gründer & Geschäftsführer",
    "sponsorsAndPartners": "Förderer & Partner",
    "these": "diesen",
    "$backersText": "Unsere großartigen Unterstützer auf {service}.",
    "$backersAction": "Werden Sie Unterstützer auf {patreon} oder {github}. Alternativ können Sie auch mit {donation} Optionen regelmäßige Förderbeiträge einrichten oder eine einmalige Spende tätigen.",
    "contributors": "Mitwirkende",
    "$contributorsText": "Die engagierten Entwickler und Mitwirkenden, die Meteostat und seine Schnittstellen programmieren und unterhalten.",
    "$contributorsAction": "Sie haben selbst Spaß am Programmieren? Schauen Sie sich unsere Projekte bei {github} an und helfen Sie uns bei der Weiterentwicklung von Meteostat."
  },
  "it": {
    "$meta": {
      "title": "Patroni",
      "description": "Conosci le persone che supportano Meteostat."
    },
    "meetChristian": "Incontra Christian.",
    "$quote": "Gestire un progetto open source può essere impegnativo. Sei sempre a corto di tutti i tipi di risorse - specialmente tempo e denaro. È la nostra passione per il tempo e il clima che ci fa andare avanti. Meteostat è possibile solo perché abbiamo decine di generosi finanziatori e collaboratori che continuano a sostenere il progetto. Grazie a tutti voi!",
    "$cTitle": "Fondatore e Manutentore",
    "sponsorsAndPartners": "Sponsor e Partner",
    "these": "questi",
    "$backersText": "I nostri incredibili clienti su {service}.",
    "$backersAction": "Diventa un sostenitore su {patreon} o {github}. In alternativa, puoi anche impostare impegni ricorrenti usando le opzioni di {donation}.",
    "contributors": "Contributori",
    "$contributorsText": "I talentuosi sviluppatori e collaboratori che stanno costruendo Meteostat e le sue interfacce.",
    "$contributorsAction": "Se hai familiarità con la codifica, vai su {github} e aiutaci a costruire Meteostat."
  },
  "es": {
    "$meta": {
      "title": "Patrones",
      "description": "Conoce a las personas que apoyan a Meteostat."
    },
    "meetChristian": "Conoce a Christian.",
    "$quote": "Dirigir un proyecto de código abierto puede ser un reto. Siempre hay pocos recursos, especialmente tiempo y dinero. Es nuestra pasión por el tiempo y el clima lo que nos hace seguir adelante. Meteostat sólo es posible porque contamos con decenas de generosos patrocinadores y colaboradores que siguen apoyando el proyecto. Gracias a todos vosotros!",
    "$cTitle": "Fundador y Mantenedor",
    "sponsorsAndPartners": "Patrocinadores y Socios",
    "these": "estos",
    "$backersText": "Nuestros increíbles clientes en {service}.",
    "$backersAction": "Hazte mecenas en {patreon} o {github}. Alternativamente, también puedes establecer promesas recurrentes utilizando las opciones de {donation}.",
    "contributors": "Colaboradores",
    "$contributorsText": "Los talentosos desarrolladores y colaboradores que están construyendo Meteostat y sus interfaces",
    "$contributorsAction": "Si estás familiarizado con la codificación, dirígete a {github} y ayúdanos a construir Meteostat."
  },
  "nl": {
    "$meta": {
      "title": "Patroons",
      "description": "Leer de mensen kennen die Meteostat ondersteunen."
    },
    "meetChristian": "Ontmoet Christian.",
    "$quote": "Het runnen van een open source project kan een uitdaging zijn. Je hebt altijd een tekort aan allerlei middelen - vooral tijd en geld. Het is onze passie voor weer en klimaat die ons op de been houdt. Meteostat is alleen mogelijk omdat we tientallen gulle gevers en bijdragers hebben die het project blijven steunen. Dank aan jullie allemaal!",
    "$cTitle": "Oprichter & Onderhouder",
    "sponsorsAndPartners": "Sponsors en Partners",
    "these": "deze",
    "$backersText": "Onze ongelooflijke beschermheren op {service}.",
    "$backersAction": "Word een backer op {patreon} of {github}. Als alternatief kunt u ook terugkerende toezeggingen instellen met behulp van {donation} opties.",
    "contributors": "Contributors",
    "$contributorsText": "De getalenteerde ontwikkelaars en bijdragers die Meteostat en zijn interfaces bouwen.",
    "$contributorsAction": "Als je bekend bent met coderen, ga dan naar {github} en help ons met het bouwen van Meteostat."
  },
  "fr": {
    "$meta" : {
      "title" : "Patrons",
      "description" : "Apprenez à connaître les personnes qui soutiennent Meteostat."
    },
    "meetChristian" : "Rencontrez Christian.",
    "$quote" : "Gérer un projet open source peut être un défi. Vous êtes toujours à court de ressources de toutes sortes, en particulier de temps et d'argent. C'est notre passion pour le temps et le climat qui nous pousse à continuer. Meteostat n'est possible que grâce à des dizaines de généreux donateurs et contributeurs qui continuent à soutenir le projet. Merci à vous tous!",
    "$cTitle" : "Fondateur et Mainteneur",
    "sponsorsAndPartners" : "Sponsors et Partenaires",
    "these" : "ces",
    "$backersText" : "Nos incroyables clients sur {service}.",
    "$backersAction" : "Devenez un mécène sur {patreon} ou {github}. Alternativement, vous pouvez également mettre en place des promesses de dons récurrents en utilisant les options {donation}.",
    "contributors" : "Contributeurs",
    "$contributorsText" : "Les développeurs et contributeurs talentueux qui construisent Meteostat et ses interfaces.",
    "$contributorsAction" : "Si vous êtes familier avec le codage, rendez-vous sur {github} et aidez-nous à construire Meteostat."
  },
  "pt": {
    "$meta": {
      "title": "Patronos",
      "description": "Conheça as pessoas que apoiam o Meteostat."
    },
    "meetChristian": "Conheça o Christian.",
    "$quote": "Executar um projecto de código aberto pode ser um desafio. Tem sempre poucos recursos - especialmente tempo e dinheiro. É a nossa paixão pelo tempo e pelo clima que nos mantém em movimento. O Meteostat só é possível porque temos dezenas de apoiantes e contribuintes generosos que continuam a apoiar o projecto. Obrigado a todos vós!",
    "$cTitle": "Fundador & Mantenedor",
    "sponsorsAndPartners": "Patrocinadores e Parceiros",
    "these": "estes",
    "$backersText": "Os nossos incríveis patronos no {service}.",
    "$backersAction": "Torne-se um backer no {patreon} ou {github}. Alternativamente, pode também estabelecer promessas recorrentes usando opções {donation}.",
    "contributors": "Contribuintes",
    "$contributorsText": "Os talentosos criadores e contribuintes que estão a construir o Meteostat e as suas interfaces.",
    "$contributorsAction": "Se está familiarizado com a codificação, dirija-se a {github} e ajude-nos a construir o Meteostat."
  },
  "ru": {
    "$meta": {
      "title": "Меценаты",
      "description": "Познакомьтесь с людьми, которые поддерживают Meteostat."
    },
    "meetChristian": "Познакомьтесь с Кристианом.",
    "$quote": "Вести проект с открытым исходным кодом может быть непросто. У вас всегда мало ресурсов - особенно времени и денег. Именно наша страсть к погоде и климату помогает нам продолжать работу. Meteostat возможен только потому, что у нас есть десятки щедрых спонсоров и жертвователей, которые продолжают поддерживать проект. Спасибо всем вам!",
    "$cTitle": "Основатель и разработчик",
    "sponsorsAndPartners": "Спонсоры и партнеры",
    "these": "эти",
    "$backersText": "Наши невероятные покровители на {service}.",
    "$backersAction": "Станьте беккером на {patreon} или {github}. Кроме того, вы можете установить периодические взносы, используя опции {donation}.",
    "contributors": "Вкладчики",
    "$contributorsText": "Талантливые разработчики и соавторы, которые создают Meteostat и его интерфейсы",
    "$contributorsAction": "Если вы знакомы с кодированием, зайдите на {github} и помогите нам создать Meteostat."
  }
}
</i18n>