<template>
  <div class="container py-4">
    <div class="hero p-5 mb-4 text-white bg-donate">
      <div class="container-fluid py-md-4">
        <h1 class="display-5 fw-bold">
          {{ t('$title') }}
        </h1>
        <p class="col-md-8 fs-5 mb-0 opacity-90">
          {{ t('$description') }}
        </p>
      </div>
    </div>

    <div class="row g-4 mb-4">
      <!-- Online -->
      <div id="online" class="col-12 col-lg-6">
        <div class="card h-100 border-0 shadow-sm option-card">
          <div class="card-body p-4 p-lg-5">
            <h2 class="h3 mb-2">
              {{ t('online') }}
            </h2>
            <p class="text-muted mb-4">{{ t('$onlineText') }}</p>
            <div class="d-grid gap-3">
              <a
                v-for="service in services"
                :key="service.id"
                :href="service.link"
                class="service-link"
                target="_blank"
                rel="noreferrer"
              >
                <span :class="`service-icon service-icon--${service.id}`">
                  <icon :icon="service.icon" />
                </span>
                <span class="flex-grow-1 ms-3">
                  <span class="d-block fw-semibold fs-5 text-dark">{{ service.name }}</span>
                  <span class="d-block small text-muted">{{ service.display }}</span>
                </span>
                <icon :icon="['fas', 'arrow-right']" class="service-arrow" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- Bank Transfer -->
      <div id="bank" class="col-12 col-lg-6">
        <div class="card h-100 border-0 shadow-sm option-card">
          <div class="card-body p-4 p-lg-5">
            <h2 class="h3 mb-2">
              {{ t('bank') }}
            </h2>
            <p class="text-muted mb-4">{{ t('$bankText') }}</p>
            <copy-input class="mb-3">
              <div class="form-floating">
                <input id="recipient" type="text" class="form-control bg-white" :value="transfer.recipient" readonly />
                <label for="recipient">{{ t('recipient') }}</label>
              </div>
            </copy-input>
            <copy-input class="mb-3">
              <div class="form-floating">
                <input id="iban" type="text" class="form-control bg-white" :value="transfer.iban" readonly />
                <label for="iban">{{ t('iban') }}</label>
              </div>
            </copy-input>
            <copy-input>
              <div class="form-floating">
                <input id="bic" type="text" class="form-control bg-white" :value="transfer.bic" readonly />
                <label for="bic">{{ t('bic') }}</label>
              </div>
            </copy-input>
          </div>
        </div>
      </div>
    </div>

    <div class="hero text-white bg-love">
      <div class="container-fluid py-5 text-center">
        <h2 class="display-5 fw-bold mb-0">
          {{ t('thankYou') }}
          <icon :icon="['fas', 'heart']" class="ms-2 heartbeat" />
        </h2>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useI18n } from 'vue-i18n';
import { useHead } from '@unhead/vue';
import CopyInput from '~/components/CopyInput.vue';

export default defineComponent({
  name: 'Donate',

  components: {
    CopyInput
  },

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

    const services = [
      {
        id: 'github',
        name: 'GitHub Sponsors',
        display: 'github.com/sponsors/meteostat',
        icon: ['fab', 'github'],
        link: 'https://github.com/sponsors/meteostat'
      },
      {
        id: 'patreon',
        name: 'Patreon',
        display: 'patreon.com/meteostat',
        icon: ['fab', 'patreon'],
        link: 'https://www.patreon.com/meteostat'
      },
      {
        id: 'paypal',
        name: 'PayPal',
        display: 'paypal.com',
        icon: ['fab', 'paypal'],
        link: 'https://www.paypal.com/donate?hosted_button_id=MQ67WRDC8EW38'
      }
    ];

    const transfer = {
      recipient: 'Christian Lamprecht',
      iban: 'DE76 1001 1001 2621 1459 29',
      bic: 'NTSBDEB1XXX'
    };

    return { t, services, transfer };
  }
});
</script>

<style lang="scss" scoped>
@import '~/style/variables';
@import 'bootstrap/scss/functions';
@import 'bootstrap/scss/variables';
@import 'bootstrap/scss/mixins';

.hero {
  border-radius: 1rem;
}

.bg-donate {
  background-color: $primary;
  background: url('/assets/pattern-1.svg') center center;
  background-size: cover;
}

.bg-love {
  background: linear-gradient(to right, #cc2b5e, #753a88);
}

.opacity-90 {
  opacity: 0.9;
}

.option-card {
  border-radius: 1rem;
}

.service-link {
  display: flex;
  align-items: center;
  padding: 1rem;
  text-decoration: none;
  background: $gray-100;
  border: 1px solid transparent;
  border-radius: 0.75rem;
  transition:
    background-color 0.15s ease,
    border-color 0.15s ease,
    transform 0.15s ease;

  .service-arrow {
    color: $gray-500;
    transition:
      transform 0.15s ease,
      color 0.15s ease;
  }

  &:hover {
    background: $white;
    border-color: $gray-300;
    transform: translateY(-2px);

    .service-arrow {
      color: $primary;
      transform: translateX(4px);
    }
  }
}

.service-icon {
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  font-size: 1.5rem;
  color: $white;
  border-radius: 0.75rem;

  &--github {
    background: #24292f;
  }

  &--patreon {
    background: #ff424d;
  }

  &--paypal {
    background: #003087;
  }
}

.heartbeat {
  animation: heartbeat 1.6s ease-in-out infinite;
}

@keyframes heartbeat {
  0%,
  40%,
  100% {
    transform: scale(1);
  }
  20% {
    transform: scale(1.15);
  }
}

@media (prefers-reduced-motion: reduce) {
  .heartbeat {
    animation: none;
  }
}
</style>

<i18n>
{
  "en": {
    "$meta": {
      "title": "Donate",
      "description": "Support Meteostat on its mission of providing open weather and climate data for everyone."
    },
    "$title": "Let's Democratize Weather Data",
    "$description": "Support Meteostat on its mission of providing open weather and climate data for everyone. Your donation also helps educational and research projects that use Meteostat data to reach their goals.",
    "online": "Online",
    "$onlineText": "Support Meteostat financially using one of these online services.",
    "bank": "Bank Transfer",
    "$bankText": "Set up a recurring payment or make a one-time donation via bank transfer.",
    "recipient": "Recipient",
    "iban": "IBAN",
    "bic": "BIC",
    "thankYou": "Thank You"
  },
  "de": {
    "$meta": {
      "title": "Spenden",
      "description": "Unterstützen Sie Meteostat bei dem Vorhaben, Wetter- und Klimadaten für jedermann frei zugänglich zu machen."
    },
    "$title": "Das Wetter ist ein Gemeingut",
    "$description": "Unterstützen Sie Meteostat bei dem Vorhaben, Wetter- und Klimadaten für jedermann frei zugänglich zu machen. Ihre Spende hilft auch zahlreichen Projekten aus Bildung und Forschung, die Meteostat-Daten für ihre Arbeit verwenden.",
    "online": "Online",
    "$onlineText": "Unterstützen Sie Meteostat finanziell über einen dieser Dienste.",
    "bank": "Überweisung",
    "$bankText": "Richten Sie einen Dauerauftrag ein oder spenden Sie einmalig per Überweisung.",
    "recipient": "Empfänger",
    "iban": "IBAN",
    "bic": "BIC",
    "thankYou": "Vielen Dank"
  },
  "it": {
    "$meta": {
      "title": "Dona",
      "description": "Sostieni Meteostat nella sua missione di fornire dati meteo e climatici aperti a tutti."
    },
    "$title": "Democratizziamo i dati meteo",
    "$description": "Sostieni Meteostat nella sua missione di offrire dati meteo e climatici aperti a tutti. La tua donazione aiuta anche i progetti didattici e di ricerca che usano i dati di Meteostat a raggiungere i propri obiettivi.",
    "online": "Online",
    "$onlineText": "Sostieni Meteostat economicamente tramite uno di questi servizi online.",
    "bank": "Bonifico bancario",
    "$bankText": "Imposta un bonifico periodico o fai una donazione una tantum tramite bonifico bancario.",
    "recipient": "Destinatario",
    "iban": "IBAN",
    "bic": "BIC",
    "thankYou": "Grazie"
  },
  "es": {
    "$meta": {
      "title": "Donar",
      "description": "Apoya a Meteostat en su misión de proporcionar datos meteorológicos y climáticos abiertos para todos."
    },
    "$title": "Democraticemos los datos meteorológicos",
    "$description": "Apoya a Meteostat en su misión de ofrecer datos meteorológicos y climáticos abiertos para todos. Tu donación también ayuda a los proyectos educativos y de investigación que utilizan los datos de Meteostat a alcanzar sus objetivos.",
    "online": "Online",
    "$onlineText": "Apoya financieramente a Meteostat utilizando uno de estos servicios online.",
    "bank": "Transferencia bancaria",
    "$bankText": "Configura una transferencia periódica o haz una donación única por transferencia bancaria.",
    "recipient": "Destinatario",
    "iban": "IBAN",
    "bic": "BIC",
    "thankYou": "Gracias"
  },
  "nl": {
    "$meta": {
      "title": "Doneren",
      "description": "Steun Meteostat in haar missie om open weer- en klimaatgegevens voor iedereen beschikbaar te stellen."
    },
    "$title": "Weerdata voor iedereen",
    "$description": "Steun Meteostat in zijn missie om open weer- en klimaatgegevens voor iedereen beschikbaar te maken. Jouw donatie helpt ook onderwijs- en onderzoeksprojecten die Meteostat-gegevens gebruiken om hun doelen te bereiken.",
    "online": "Online",
    "$onlineText": "Steun Meteostat financieel via een van deze onlinediensten.",
    "bank": "Bankoverschrijving",
    "$bankText": "Stel een periodieke overboeking in of doe een eenmalige donatie via een bankoverschrijving.",
    "recipient": "Ontvanger",
    "iban": "IBAN",
    "bic": "BIC",
    "thankYou": "Dank je wel"
  },
  "fr": {
    "$meta": {
      "title": "Faire un don",
      "description": "Soutenez Meteostat dans sa mission de fournir des données météorologiques et climatiques ouvertes à tous."
    },
    "$title": "Démocratisons les données météo",
    "$description": "Soutenez Meteostat dans sa mission de fournir des données météorologiques et climatiques ouvertes à tous. Votre don aide également les projets éducatifs et de recherche qui utilisent les données de Meteostat à atteindre leurs objectifs.",
    "online": "Online",
    "$onlineText": "Soutenez financièrement Meteostat en utilisant l'un de ces services en ligne.",
    "bank": "Virement bancaire",
    "$bankText": "Mettez en place un virement permanent ou faites un don ponctuel par virement bancaire.",
    "recipient": "Bénéficiaire",
    "iban": "IBAN",
    "bic": "BIC",
    "thankYou": "Merci"
  },
  "pt": {
    "$meta": {
      "title": "Doar",
      "description": "Apoie o Meteostat na sua missão de disponibilizar dados meteorológicos e climáticos abertos para todos."
    },
    "$title": "Vamos democratizar os dados meteorológicos",
    "$description": "Apoie o Meteostat na sua missão de disponibilizar dados meteorológicos e climáticos abertos para todos. O seu donativo ajuda também projetos educativos e de investigação que utilizam os dados do Meteostat a alcançar os seus objetivos.",
    "online": "Online",
    "$onlineText": "Apoie financeiramente o Meteostat através de um destes serviços online.",
    "bank": "Transferência bancária",
    "$bankText": "Configure uma transferência periódica ou faça um donativo único por transferência bancária.",
    "recipient": "Destinatário",
    "iban": "IBAN",
    "bic": "BIC",
    "thankYou": "Obrigado"
  },
  "ru": {
    "$meta": {
      "title": "Пожертвовать",
      "description": "Поддержите Meteostat в его миссии по предоставлению открытых данных о погоде и климате для всех."
    },
    "$title": "Сделаем данные о погоде доступными для всех",
    "$description": "Поддержите Meteostat в его миссии сделать данные о погоде и климате открытыми для всех. Ваше пожертвование также помогает образовательным и исследовательским проектам, использующим данные Meteostat, достигать своих целей.",
    "online": "Онлайн",
    "$onlineText": "Поддержите Meteostat финансово через один из этих онлайн-сервисов.",
    "bank": "Банковский перевод",
    "$bankText": "Настройте регулярный платёж или сделайте разовое пожертвование банковским переводом.",
    "recipient": "Получатель",
    "iban": "IBAN",
    "bic": "BIC",
    "thankYou": "Спасибо"
  }
}
</i18n>
