<template>
  <section id="christian" class="bg-light">
    <div class="container col-xxl-8 px-4">
      <div class="row align-items-center g-5 py-5">
        <div class="col-10 col-sm-8 col-lg-6 align-items-center">
          <img
            src="https://media.meteostat.net/assets/cla.jpg"
            class="d-block mx-lg-auto img-fluid rounded shadow"
            alt="Christian Lamprecht"
            width="400"
            height="400"
            loading="lazy"
          />
        </div>
        <div class="col-lg-6">
          <h1 class="display-5 fw-bold lh-1 mb-4">
            {{ t('meetChristian') }}
          </h1>
          <figure>
            <blockquote class="blockquote fst-italic">"{{ t('$quote') }}"</blockquote>
            <figcaption class="blockquote-footer text-end mt-3">Christian Lamprecht, {{ t('$cTitle') }}</figcaption>
          </figure>
          <div class="d-flex mt-3">
            <a
              class="btn btn-primary btn-sm me-1"
              href="https://www.linkedin.com/in/clampr/"
              target="_blank"
              rel="noreferrer"
            >
              <icon :icon="['fab', 'linkedin']" class="me-sm-1" />
              <span class="d-none d-sm-inline"> LinkedIn </span>
            </a>
            <a class="btn btn-dark btn-sm me-2" href="https://github.com/clampr" target="_blank" rel="noreferrer">
              <icon :icon="['fab', 'github']" class="me-sm-1" />
              <span class="d-none d-sm-inline"> GitHub </span>
            </a>
            <router-link class="btn btn-danger btn-sm" to="/donate">
              <icon :icon="['fas', 'heart']" class="me-1" />
              {{ t('donation') }}
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </section>

  <div class="bar" />

  <!-- Backers -->
  <section id="backers" class="container py-5">
    <div class="text-center mb-5">
      <h2 class="display-6 fw-bold">
        {{ t('supporters') }}
      </h2>
      <p class="lead text-muted col-lg-8 mx-auto mb-0">
        {{ t('$supportersText') }}
      </p>
    </div>
    <div class="row g-4">
      <div v-for="platform in platforms" :key="platform.name" class="col-md-6">
        <div class="card h-100 border-0 shadow-sm platform-card">
          <div class="card-body p-4 p-lg-5 d-flex flex-column">
            <div class="d-flex align-items-center mb-3">
              <span :class="`platform-icon platform-icon--${platform.id}`">
                <icon :icon="platform.icon" />
              </span>
              <h3 class="h4 mb-0 ms-3">
                {{ platform.name }}
              </h3>
            </div>
            <p class="text-muted">
              {{ t('$backersText', { service: platform.name }) }}
            </p>
            <div class="d-flex flex-wrap gap-2 mb-4">
              <a
                v-for="backer in platform.backers"
                :key="backer.name"
                :href="backer.link"
                class="backer-chip"
                target="_blank"
                rel="noreferrer nofollow"
              >
                <icon :icon="['fas', 'heart']" class="me-1 text-danger" />
                {{ backer.name }}
              </a>
            </div>
            <a
              :href="platform.link"
              :class="`btn btn-lg mt-auto align-self-start btn-${platform.id}`"
              target="_blank"
              rel="noreferrer"
            >
              <icon :icon="platform.icon" class="me-2" />
              {{ t(platform.cta) }}
            </a>
          </div>
        </div>
      </div>
    </div>
    <p class="text-center text-muted mt-4 mb-0">
      <i18n-t keypath="$otherOptions" tag="span">
        <template #donation>
          <router-link to="/donate">{{ t('donationOptions') }}</router-link>
        </template>
      </i18n-t>
    </p>
  </section>

  <!-- Contributors -->
  <section id="contributors" class="bg-light py-5">
    <div class="container">
      <div class="text-center mb-5">
        <h2 class="display-6 fw-bold">
          {{ t('contributors') }}
        </h2>
        <p class="lead text-muted col-lg-8 mx-auto mb-0">
          {{ t('$contributorsText') }}
        </p>
      </div>
      <div class="row row-cols-2 row-cols-sm-3 row-cols-md-5 g-4 justify-content-center">
        <div v-for="login in contributors" :key="login" class="col">
          <a
            :href="`https://github.com/${login}`"
            class="contributor d-block text-center text-decoration-none"
            target="_blank"
            rel="noreferrer nofollow"
          >
            <img
              :src="`https://github.com/${login}.png?size=192`"
              :alt="login"
              class="contributor-avatar rounded-circle mb-3"
              width="96"
              height="96"
              loading="lazy"
            />
            <span class="d-block fw-semibold text-dark text-truncate">@{{ login }}</span>
          </a>
        </div>
      </div>
      <div class="text-center mt-5">
        <a class="btn btn-dark btn-lg" href="https://github.com/meteostat" target="_blank" rel="noreferrer">
          <icon :icon="['fab', 'github']" class="me-2" />
          {{ t('contributeOnGithub') }}
        </a>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useI18n } from 'vue-i18n';
import { useHead } from '@unhead/vue';

interface Backer {
  name: string;
  link: string;
}

interface Platform {
  id: string;
  name: string;
  icon: [string, string];
  link: string;
  cta: string;
  backers: Backer[];
}

export default defineComponent({
  name: 'Contributors',

  setup() {
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

    const platforms: Platform[] = [
      {
        id: 'github',
        name: 'GitHub Sponsors',
        icon: ['fab', 'github'],
        link: 'https://github.com/sponsors/meteostat',
        cta: 'sponsorOnGithub',
        backers: [
          { name: 'Joe Shull', link: 'https://github.com/joeshull' },
          { name: 'Benjamin Gutzmann', link: 'https://github.com/gutzbenj' }
        ]
      },
      {
        id: 'patreon',
        name: 'Patreon',
        icon: ['fab', 'patreon'],
        link: 'https://www.patreon.com/meteostat',
        cta: 'joinPatreon',
        backers: [{ name: 'Tyler Kontra', link: 'https://www.patreon.com/user?u=18076117' }]
      }
    ];

    // Top 10 human contributors across all non-fork repos of github.com/meteostat (by commit count, ties alphabetical)
    const contributors = [
      'clampr',
      'mrsjuli',
      'rfoel',
      'twilightDD',
      'Kkoile',
      'amotl',
      'ghostrider',
      'GrahamHallEvergreen',
      'ida',
      'Kugeleis'
    ];

    return { t, platforms, contributors };
  }
});
</script>

<style lang="scss" scoped>
@import '~/style/variables';
@import 'bootstrap/scss/functions';
@import 'bootstrap/scss/variables';
@import 'bootstrap/scss/mixins';

$github: #24292f;
$patreon: #ff424d;

.bar {
  height: 10px;
  background: linear-gradient(to right, #7f7fd5, #86a8e7, #91eae4);
}

.platform-card {
  border-radius: 1rem;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: $box-shadow !important;
  }
}

.platform-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  font-size: 1.5rem;
  color: $white;
  border-radius: 0.75rem;

  &--github {
    background: $github;
  }

  &--patreon {
    background: $patreon;
  }
}

.backer-chip {
  display: inline-flex;
  align-items: center;
  padding: 0.375rem 0.875rem;
  font-weight: 500;
  color: $dark;
  text-decoration: none;
  background: $gray-100;
  border-radius: 50rem;
  transition: background-color 0.15s ease;

  &:hover {
    background: $gray-200;
  }
}

.btn-github {
  @include button-variant($github, $github);
}

.btn-patreon {
  @include button-variant($patreon, $patreon, $white);
}

.contributor {
  .contributor-avatar {
    background: $white;
    box-shadow: 0 0 0 4px $white, $box-shadow-sm;
    transition:
      transform 0.2s ease,
      box-shadow 0.2s ease;
  }

  &:hover .contributor-avatar {
    transform: scale(1.06);
    box-shadow: 0 0 0 4px $primary, $box-shadow;
  }
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
    "$quote": "Running an open source project can be challenging. You are always short on resources of all kinds – especially time and money. It is our passion for weather and climate that keeps us going. Meteostat is only possible thanks to dozens of generous backers and contributors who keep supporting the project. Thank you all!",
    "$cTitle": "Founder & Maintainer",
    "supporters": "Backers",
    "$supportersText": "Meteostat is funded by people who believe in open weather data. Thank you for keeping the project running!",
    "$backersText": "Our incredible backers on {service}.",
    "sponsorOnGithub": "Sponsor on GitHub",
    "joinPatreon": "Become a Patron",
    "$otherOptions": "Prefer PayPal or a bank transfer? Check out our {donation}.",
    "donationOptions": "donation options",
    "contributors": "Contributors",
    "$contributorsText": "The talented developers who are building Meteostat and its interfaces.",
    "contributeOnGithub": "Contribute on GitHub"
  },
  "de": {
    "$meta": {
      "title": "Förderer",
      "description": "Lernen Sie die Menschen kennen, die Meteostat unterstützen und fördern."
    },
    "meetChristian": "Das ist Christian.",
    "$quote": "Ein Open-Source-Projekt zu betreiben, kann eine Herausforderung sein. Es mangelt immer an Ressourcen aller Art – vor allem an Zeit und Geld. Unsere Leidenschaft für Wetter und Klima hält uns am Laufen. Meteostat ist nur dank Dutzender großzügiger Förderer und Mitwirkender möglich, die das Projekt unterstützen. Vielen Dank an Sie alle!",
    "$cTitle": "Gründer & Geschäftsführer",
    "supporters": "Unterstützer",
    "$supportersText": "Meteostat wird von Menschen finanziert, die an frei zugängliche Wetterdaten glauben. Danke, dass Sie das Projekt am Laufen halten!",
    "$backersText": "Unsere großartigen Unterstützer auf {service}.",
    "sponsorOnGithub": "Auf GitHub sponsern",
    "joinPatreon": "Auf Patreon unterstützen",
    "$otherOptions": "Lieber per PayPal oder Überweisung? Hier geht's zu den {donation}.",
    "donationOptions": "Spendenmöglichkeiten",
    "contributors": "Mitwirkende",
    "$contributorsText": "Die engagierten Entwickler, die Meteostat und seine Schnittstellen programmieren und unterhalten.",
    "contributeOnGithub": "Auf GitHub mitwirken"
  },
  "it": {
    "$meta": {
      "title": "Sostenitori",
      "description": "Conosci le persone che supportano Meteostat."
    },
    "meetChristian": "Incontra Christian.",
    "$quote": "Gestire un progetto open source può essere impegnativo. Si è sempre a corto di risorse di ogni tipo, soprattutto tempo e denaro. È la nostra passione per il meteo e il clima a farci andare avanti. Meteostat esiste solo grazie a decine di generosi sostenitori e collaboratori che continuano a supportare il progetto. Grazie a tutti!",
    "$cTitle": "Fondatore e sviluppatore",
    "supporters": "Sostenitori",
    "$supportersText": "Meteostat è finanziato da persone che credono nei dati meteo aperti. Grazie per mantenere vivo il progetto!",
    "$backersText": "I nostri incredibili sostenitori su {service}.",
    "sponsorOnGithub": "Sponsorizza su GitHub",
    "joinPatreon": "Sostienici su Patreon",
    "$otherOptions": "Preferisci PayPal o un bonifico bancario? Scopri le nostre {donation}.",
    "donationOptions": "opzioni di donazione",
    "contributors": "Contributori",
    "$contributorsText": "I talentuosi sviluppatori che stanno costruendo Meteostat e le sue interfacce.",
    "contributeOnGithub": "Contribuisci su GitHub"
  },
  "es": {
    "$meta": {
      "title": "Mecenas",
      "description": "Conoce a las personas que apoyan a Meteostat."
    },
    "meetChristian": "Conoce a Christian.",
    "$quote": "Llevar un proyecto de código abierto puede ser todo un reto. Siempre faltan recursos de todo tipo, sobre todo tiempo y dinero. Lo que nos impulsa es nuestra pasión por el tiempo y el clima. Meteostat solo es posible gracias a decenas de generosos mecenas y colaboradores que siguen apoyando el proyecto. ¡Gracias a todos!",
    "$cTitle": "Fundador y desarrollador",
    "supporters": "Mecenas",
    "$supportersText": "Meteostat está financiado por personas que creen en los datos meteorológicos abiertos. ¡Gracias por mantener vivo el proyecto!",
    "$backersText": "Nuestros increíbles mecenas en {service}.",
    "sponsorOnGithub": "Patrocinar en GitHub",
    "joinPatreon": "Apóyanos en Patreon",
    "$otherOptions": "¿Prefieres PayPal o una transferencia bancaria? Consulta nuestras {donation}.",
    "donationOptions": "opciones de donación",
    "contributors": "Colaboradores",
    "$contributorsText": "Los talentosos desarrolladores que están construyendo Meteostat y sus interfaces.",
    "contributeOnGithub": "Contribuir en GitHub"
  },
  "nl": {
    "$meta": {
      "title": "Supporters",
      "description": "Maak kennis met de mensen die Meteostat steunen."
    },
    "meetChristian": "Ontmoet Christian.",
    "$quote": "Een opensourceproject runnen kan een uitdaging zijn. Je komt altijd middelen tekort – vooral tijd en geld. Onze passie voor weer en klimaat houdt ons gaande. Meteostat is alleen mogelijk dankzij tientallen gulle supporters en bijdragers die het project blijven steunen. Bedankt allemaal!",
    "$cTitle": "Oprichter & ontwikkelaar",
    "supporters": "Supporters",
    "$supportersText": "Meteostat wordt gefinancierd door mensen die geloven in open weerdata. Bedankt dat jullie het project draaiende houden!",
    "$backersText": "Onze ongelooflijke supporters op {service}.",
    "sponsorOnGithub": "Sponsor op GitHub",
    "joinPatreon": "Steun ons op Patreon",
    "$otherOptions": "Liever PayPal of een bankoverschrijving? Bekijk onze {donation}.",
    "donationOptions": "donatiemogelijkheden",
    "contributors": "Bijdragers",
    "$contributorsText": "De getalenteerde ontwikkelaars die Meteostat en zijn interfaces bouwen.",
    "contributeOnGithub": "Bijdragen op GitHub"
  },
  "fr": {
    "$meta": {
      "title": "Mécènes",
      "description": "Découvrez les personnes qui soutiennent Meteostat."
    },
    "meetChristian": "Rencontrez Christian.",
    "$quote": "Gérer un projet open source peut être un défi. On manque toujours de ressources de toutes sortes, surtout de temps et d'argent. C'est notre passion pour la météo et le climat qui nous fait avancer. Meteostat n'existe que grâce à des dizaines de généreux mécènes et contributeurs qui continuent de soutenir le projet. Merci à vous tous !",
    "$cTitle": "Fondateur et Mainteneur",
    "supporters": "Soutiens",
    "$supportersText": "Meteostat est financé par des personnes qui croient aux données météorologiques ouvertes. Merci de faire vivre le projet !",
    "$backersText": "Nos incroyables soutiens sur {service}.",
    "sponsorOnGithub": "Sponsoriser sur GitHub",
    "joinPatreon": "Soutenez-nous sur Patreon",
    "$otherOptions": "Vous préférez PayPal ou un virement bancaire ? Découvrez nos {donation}.",
    "donationOptions": "options de don",
    "contributors": "Contributeurs",
    "$contributorsText": "Les développeurs talentueux qui construisent Meteostat et ses interfaces.",
    "contributeOnGithub": "Contribuer sur GitHub"
  },
  "pt": {
    "$meta": {
      "title": "Apoiantes",
      "description": "Conheça as pessoas que apoiam o Meteostat."
    },
    "meetChristian": "Conheça o Christian.",
    "$quote": "Gerir um projeto de código aberto pode ser um desafio. Faltam sempre recursos de todo o tipo, sobretudo tempo e dinheiro. É a nossa paixão pelo tempo e pelo clima que nos faz continuar. O Meteostat só é possível graças a dezenas de apoiantes e contribuidores generosos que continuam a apoiar o projeto. Obrigado a todos!",
    "$cTitle": "Fundador e programador",
    "supporters": "Apoiantes",
    "$supportersText": "O Meteostat é financiado por pessoas que acreditam em dados meteorológicos abertos. Obrigado por manterem o projeto vivo!",
    "$backersText": "Os nossos incríveis apoiantes no {service}.",
    "sponsorOnGithub": "Patrocinar no GitHub",
    "joinPatreon": "Apoie-nos no Patreon",
    "$otherOptions": "Prefere PayPal ou transferência bancária? Veja as nossas {donation}.",
    "donationOptions": "opções de doação",
    "contributors": "Contribuidores",
    "$contributorsText": "Os talentosos programadores que estão a construir o Meteostat e as suas interfaces.",
    "contributeOnGithub": "Contribuir no GitHub"
  },
  "ru": {
    "$meta": {
      "title": "Меценаты",
      "description": "Познакомьтесь с людьми, которые поддерживают Meteostat."
    },
    "meetChristian": "Познакомьтесь с Кристианом.",
    "$quote": "Вести проект с открытым исходным кодом непросто. Всегда не хватает ресурсов — особенно времени и денег. Нас движет страсть к погоде и климату. Meteostat существует только благодаря десяткам щедрых спонсоров и участников, которые продолжают поддерживать проект. Спасибо всем вам!",
    "$cTitle": "Основатель и разработчик",
    "supporters": "Спонсоры",
    "$supportersText": "Meteostat финансируется людьми, которые верят в открытые данные о погоде. Спасибо, что поддерживаете проект!",
    "$backersText": "Наши замечательные спонсоры на {service}.",
    "sponsorOnGithub": "Стать спонсором на GitHub",
    "joinPatreon": "Поддержать на Patreon",
    "$otherOptions": "Предпочитаете PayPal или банковский перевод? Посмотрите другие {donation}.",
    "donationOptions": "способы пожертвования",
    "contributors": "Участники",
    "$contributorsText": "Талантливые разработчики, которые создают Meteostat и его интерфейсы.",
    "contributeOnGithub": "Участвовать на GitHub"
  }
}
</i18n>
