<template>
  <div class="container py-4">
    <div class="p-5 mb-4 text-white bg-primary rounded-3">
      <div class="container-fluid">
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
        <div id="online" class="col-12 col-md-4 p-4 p-md-5 bg-light border border-white rounded-3">
          <h3>
            {{ t('online') }}
          </h3>
          <p class="text-muted mb-4">{{ t('$onlineText') }}</p>
          <a class="icon-link mb-2" href="https://www.patreon.com/meteostat" target="_blank" rel="noreferrer">
            <span class="box fs-5">
              <icon :icon="['fab', 'patreon']" />
            </span>
            <span class="link fs-5 ms-2">Patreon</span>
          </a>
          <a
            class="icon-link mb-2"
            href="https://www.paypal.com/donate?hosted_button_id=MQ67WRDC8EW38"
            target="_blank"
            rel="noreferrer"
          >
            <span class="box fs-5">
              <icon :icon="['fab', 'paypal']" />
            </span>
            <span class="link fs-5 ms-2">PayPal</span>
          </a>
          <a class="icon-link mb-2" href="https://github.com/sponsors/clampr" target="_blank" rel="noreferrer">
            <span class="box fs-5">
              <icon :icon="['fab', 'github']" />
            </span>
            <span class="link fs-5 ms-2">GitHub</span>
          </a>
          <a
            class="icon-link mb-3"
            data-bs-toggle="collapse"
            href="#cryptoCurrencies"
            role="button"
            aria-expanded="false"
            aria-controls="cryptoCurrencies"
          >
            <span class="box fs-5">
              <icon :icon="['fab', 'bitcoin']" />
            </span>
            <span class="link fs-5 ms-2">{{ t('crypto') }}</span>
          </a>
          <div class="collapse" id="cryptoCurrencies">
            <copy-input class="mb-3">
              <div class="form-floating">
                <input id="bitcoin" type="text" class="form-control bg-white" :value="crypto.bitcoin" readonly />
                <label for="bitcoin">Bitcoin</label>
              </div>
            </copy-input>
            <copy-input class="mb-3">
              <div class="form-floating">
                <input id="ethereum" type="text" class="form-control bg-white" :value="crypto.ethereum" readonly />
                <label for="ethereum">Ethereum</label>
              </div>
            </copy-input>
          </div>
        </div>
        <div id="bank" class="col-12 col-md-4 p-4 p-md-5 bg-light border border-white rounded-3">
          <h3>
            {{ t('bank') }}
          </h3>
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
          <copy-input class="mb-3">
            <div class="form-floating">
              <input id="bic" type="text" class="form-control bg-white" :value="transfer.bic" readonly />
              <label for="bic">{{ t('bic') }}</label>
            </div>
          </copy-input>
        </div>
        <div id="stores" class="col-12 col-md-4 p-4 p-md-5 bg-light border border-white rounded-3">
          <h3>
            {{ t('stores') }}
          </h3>
          <p class="text-muted mb-4">{{ t('$storesText') }}</p>
          <a
            v-for="store in stores"
            :key="store.name"
            :href="store.link"
            class="icon-link mb-2"
            target="_blank"
            rel="noreferrer"
          >
            <span class="box fs-5">
              <icon :icon="store.icon" />
            </span>
            <span class="link fs-5 ms-2">{{ store.name }}</span>
          </a>
        </div>
      </div>
    </div>

    <div class="text-white bg-love rounded-3">
      <div class="container-fluid py-5 text-center">
        <h2 class="display-5 fw-bold mb-0">
          {{ t('thankYou') }}
          <icon :icon="['fas', 'heart']" class="ms-2" />
        </h2>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useI18n } from 'vue-i18n';
import { useHead } from '@vueuse/head';
import { getExpediaLink, getAmazonLink, getUdemyLink } from '~/utils/affiliate';
import CopyInput from '~/components/CopyInput.vue';

export default defineComponent({
  name: 'Donate',

  components: {
    CopyInput
  },

  setup(): Record<string, any> {
    const { t, locale } = useI18n();

    useHead({
      title: `${t('$meta.title')} | Meteostat`,
      meta: [
        {
          name: 'description',
          content: t('$meta.description')
        }
      ]
    });

    const transfer = {
      recipient: 'Christian Lamprecht',
      iban: 'DE76 1001 1001 2621 1459 29',
      bic: 'NTSBDEB1XXX'
    };

    const crypto = {
      bitcoin: 'bc1qg2alt82ry2ntkslw8ulr9528nmlj6ym6g2x0ms',
      ethereum: '0x5f4Dde3da1aE75280eFA6a62050c1D5cb1D7f694'
    };

    const storesSource: Record<string, any> = {
      base: {
        amazon: {
          link: getAmazonLink(locale.value),
          name: 'Amazon',
          icon: ['fab', 'amazon']
        },
        expedia: {
          link: getExpediaLink(locale.value),
          name: 'Expedia',
          icon: ['fas', 'plane-departure']
        },
        udemy: {
          link: getUdemyLink(locale.value),
          name: 'Udemy',
          icon: ['fas', 'graduation-cap']
        }
      }
    };

    const stores = {
      ...storesSource.base,
      ...storesSource[locale.value]
    };

    return { t, transfer, crypto, stores };
  }
});
</script>

<style lang="scss" scoped>
@import '~/style/variables';
@import '../node_modules/bootstrap/scss/functions';
@import '../node_modules/bootstrap/scss/variables';
@import '../node_modules/bootstrap/scss/mixins';

.bg-love {
  background: linear-gradient(to right, #cc2b5e, #753a88);
}

.icon-link {
  display: flex;
  align-items: center;

  .box {
    display: flex;
    justify-content: center;
    width: 40px;
    padding: 0.5rem;
    color: $white;
    background: $dark;
    border-radius: 4px;
  }

  .link {
    color: $dark;
  }

  &:hover {
    .box {
      background: $primary;
    }

    .link {
      color: $primary;
    }
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
    "$description": "Support Meteostat on its mission of providing open weather and climate data for everyone. Your donation also helps educational and research projects reaching their goals using Meteostat data.",
    "online": "Online",
    "$onlineText": "Support Meteostat financially using one of these online services.",
    "bank": "Bank",
    "$bankText": "Set up recurring pledges or make a one-time donation using bank transfer.",
    "stores": "Stores",
    "$storesText": "Support Meteostat while shopping online - with no additional costs for you!",
    "recipient": "Recipient",
    "iban": "IBAN",
    "bic": "BIC",
    "crypto": "Crypto",
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
    "$bankText": "Unterstützen Sie Meteostat mit einem Geldbetrag Ihrer Wahl.",
    "stores": "Shops",
    "$storesText": "Unterstützen Sie Meteostat mit Ihrem Online-Einkauf - ohne Mehrkosten für Sie!",
    "recipient": "Empfänger",
    "iban": "IBAN",
    "bic": "BIC",
    "crypto": "Kryptowährungen",
    "thankYou": "Vielen Dank"
  },
  "it": {
    "$meta": {
      "titolo": "Donare",
      "descrizione": "Sostieni Meteostat nella sua missione di fornire dati meteo e climatici aperti a tutti."
    },
    "$title": "Democratizziamo i Dati Meteo",
    "$description": "Sostieni Meteostat nella sua missione di fornire dati meteo e climatici aperti a tutti. La tua donazione aiuta anche i progetti educativi e di ricerca che fanno funzionare meglio il mondo usando i dati di Meteostat.",
    "online": "Online",
    "$onlineText": "Sostieni finanziariamente Meteostat usando uno di questi servizi online",
    "bank": "Bonifico Bancario",
    "$bankText": "Imposta impegni ricorrenti o fai una donazione una tantum tramite bonifico bancario",
    "stores": "Negozi",
    "$storesText": "Sostieni Meteostat mentre acquisti online - senza costi aggiuntivi per te!",
    "recipient": "Destinatario",
    "iban": "IBAN",
    "bic": "BIC",
    "crypto": "Criptovalute",
    "thankYou": "Grazie"
  },
  "es": {
    "$meta": {
      "title": "Donar",
      "description": "Apoya a Meteostat en su misión de proporcionar datos meteorológicos y climáticos abiertos para todos."
    },
    "$title": "Democraticemos los Datos Meteorológicos",
    "$description": "Apoya a Meteostat en su misión de proporcionar datos meteorológicos y climáticos abiertos para todos. Tu donación también ayuda a los proyectos educativos y de investigación que hacen que el mundo funcione mejor utilizando los datos de Meteostat.",
    "online": "Online",
    "$onlineText": "Apoya financieramente a Meteostat utilizando uno de estos servicios online.",
    "bank": "Bancaria",
    "$bankText": "Establezca promesas recurrentes o haga una donación única mediante transferencia bancaria.",
    "stores": "Tiendas",
    "$storesText": "Apoya a Meteostat mientras compras en línea - ¡sin costes adicionales para ti!",
    "recipient": "Destinatario",
    "iban": "IBAN",
    "bic": "BIC",
    "crypto": "Criptomonedas",
    "thankYou": "Gracias"
  },
  "nl": {
    "$meta": {
      "title": "Doneren",
      "description": "Steun Meteostat in haar missie om open weer- en klimaatgegevens voor iedereen beschikbaar te stellen."
    },
    "$title": "Laten we Weerdata Democratiseren",
    "$description": "Steun Meteostat in haar missie om open weer- en klimaatgegevens te leveren voor iedereen. Uw donatie helpt ook educatieve en onderzoeksprojecten die de wereld beter laten draaien met behulp van Meteostat-gegevens.",
    "online": "Online",
    "$onlineText": "Steun Meteostat financieel met behulp van een van deze online diensten.",
    "bank": "Bank",
    "$bankText": "Stel terugkerende toezeggingen in of doe een eenmalige donatie via een bankoverschrijving.",
    "stores": "Stores",
    "$storesText": "Steun Meteostat tijdens het online winkelen - zonder extra kosten voor jou!",
    "recipient": "Ontvanger",
    "iban": "IBAN",
    "bic": "BIC",
    "crypto": "Crypto Valuta's",
    "thankYou": "Dank u wel"
  },
  "fr": {
    "$meta" : {
      "title" : "Donation",
      "description" : "Soutenez Meteostat dans sa mission de fournir des données météorologiques et climatiques ouvertes à tous."
    },
    "$title" : "Démocratisons les Données Météorologiques",
    "$description": "Soutenez Meteostat dans sa mission de fournir des données météorologiques et climatiques ouvertes à tous. Votre don permet également d'aider les projets éducatifs et de recherche visant à améliorer le fonctionnement du monde grâce aux données de Meteostat.",
    "online": "Online",
    "$onlineText" : "Soutenez financièrement Meteostat en utilisant l'un de ces services en ligne.",
    "bank": "Bancaire",
    "$bankText" : "Configurez des promesses de dons récurrentes ou faites un don unique par virement bancaire.",
    "stores" : "Magasins",
    "$storesText" : "Soutenez Meteostat tout en faisant vos achats en ligne - sans frais supplémentaires pour vous!",
    "recipient": "Recipient",
    "iban": "IBAN",
    "bic": "BIC",
    "crypto": "Crypto Monnaies",
    "thankYou": "Merci"
  },
  "pt": {
    "$meta": {
      "título": "Doar",
      "descrição": "Apoiar o Meteostat na sua missão de fornecer dados climáticos e meteorológicos abertos para todos."
    },
    "$title": "Vamos Democratizar os Dados Meteorológicos",
    "$description": "Apoiar o Meteostat na sua missão de fornecer dados climáticos e meteorológicos abertos para todos. A sua doação também ajuda projectos educativos e de investigação que fazem com que o mundo funcione melhor usando os dados do Meteostat.",
    "online": "Online",
    "$onlineText": "Apoiar financeiramente o Meteostat utilizando um destes serviços em linha.",
    "bank": "Bancária",
    "$bankText": "Estabelecer promessas recorrentes ou fazer uma doação única utilizando uma transferência bancária.",
    "stores": "Lojas",
    "$storesText": "Apoiar o Meteostat enquanto faz compras online - sem custos adicionais para si!",
    "recipient": "Destinatário",
    "iban": "IBAN",
    "bic": "BIC",
    "crypto": "Moedas Criptográficas",
    "thankYou": "Obrigado"
  },
  "ru": {
    "$meta": {
      "title": "Пожертвовать",
      "description": "Поддержите Meteostat в его миссии по предоставлению открытых данных о погоде и климате для всех."
    },
    "$title": "Давайте демократизировать данные о погоде",
    "$description": "Поддержите Меteostat в его миссии по предоставлению открытых данных о погоде и климате для всех. Ваше пожертвование также поможет образовательным и исследовательским проектам сделать мир лучше, используя данные Meteostat.",
    "online": "Онлайн",
    "$onlineText": "Поддержите Метеостат финансово, используя один из этих онлайн-сервисов.",
    "bank": "Банковский перевод",
    "$bankText": "Установите периодические взносы или сделайте единовременное пожертвование с помощью банковского перевода.",
    "stores": "Магазины",
    "$storesText": "Поддержите Meteostat, делая покупки в Интернете - без дополнительных затрат для вас!",
    "recipient": "Получатель",
    "iban": "IBAN",
    "bic": "BIC",
    "crypto": "Криптовалюты",
    "thankYou": "Спасибо"
  }
}
</i18n>
