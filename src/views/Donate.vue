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
      "description": "Get to know the people who support Meteostat."
    },
    "$title": "Let's Democratize Weather Data",
    "$description": "Support Meteostat on its mission of providing open weather and climate data for everyone. Your donation also helps educational and research projects reaching their goals using Meteostat data.",
    "donorPrivacy": "We would love to credit you as a patron. If you wish not to be mentioned, please add a note to your donation or contact us.",
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
      "title": "Donate",
      "description": "Get to know the people who support Meteostat."
    },
    "donationText": "Unterstützen Sie Meteostat bei dem Vorhaben, Wetter- und Klimadaten für jedermann frei zugänglich zu machen. Ihre Spende hilft auch zahlreichen Projekten aus Bildung und Forschung, die Meteostat-Daten für ihre Arbeit verwenden.",
    "donorPrivacy": "Wir würden Sie gerne als Unterstützer auf unserer Webseite nennen. Wenn Sie dies nicht möchten, fügen Sie bitte eine Bemerkung zu Ihrer Spende hinzu, oder nehmen Sie Kontakt mit uns auf.",
    "online": "Online",
    "bankTransfer": "Überweisung",
    "recipient": "Empfänger",
    "iban": "IBAN",
    "bic": "BIC",
    "cryptoCurrencies": "Kryptowährungen"
  },
  "it": {
    "$meta": {
      "title": "Donate",
      "description": "Get to know the people who support Meteostat."
    },
    "donationText": "Sostieni Meteostat nella sua missione di fornire dati meteo e climatici aperti a tutti. La tua donazione aiuta anche i progetti educativi e di ricerca che fanno funzionare meglio il mondo usando i dati di Meteostat.",
    "donorPrivacy": "Ci piacerebbe accreditarti come mecenate. Se non vuoi essere menzionato, per favore aggiungi una nota alla tua donazione o contattaci.",
    "online": "Online",
    "bankTransfer": "Bonifico Bancario",
    "recipient": "Destinatario",
    "iban": "IBAN",
    "bic": "BIC",
    "cryptoCurrencies": "Criptovalute"
  },
  "es": {
    "$meta": {
      "title": "Donate",
      "description": "Get to know the people who support Meteostat."
    },
    "donationText": "Apoya a Meteostat en su misión de proporcionar datos meteorológicos y climáticos abiertos para todos. Tu donación también ayuda a los proyectos educativos y de investigación que hacen que el mundo funcione mejor utilizando los datos de Meteostat.",
    "donorPrivacy": "Nos encantaría acreditarle como mecenas. Si desea que no se le mencione, añada una nota a su donación o póngase en contacto con nosotros.",
    "online": "Online",
    "bankTransfer": "Transferencia Bancaria",
    "recipient": "Destinatario",
    "iban": "IBAN",
    "bic": "BIC",
    "cryptoCurrencies": "Criptomonedas"
  },
  "nl": {
    "$meta": {
      "title": "Donate",
      "description": "Get to know the people who support Meteostat."
    },
    "donationText": "Steun Meteostat in haar missie om open weer- en klimaatgegevens te leveren voor iedereen. Uw donatie helpt ook educatieve en onderzoeksprojecten die de wereld beter laten draaien met behulp van Meteostat-gegevens.",
    "donorPrivacy": "We vermelden je graag als begunstiger. Als je niet genoemd wilt worden, voeg dan een notitie toe aan je donatie of neem contact met ons op.",
    "online": "Online",
    "bankTransfer": "Bankoverschrijving",
    "recipient": "Ontvanger",
    "iban": "IBAN",
    "bic": "BIC",
    "cryptoCurrencies": "Crypto Valuta's"
  },
  "fr": {
    "$meta": {
      "title": "Donate",
      "description": "Get to know the people who support Meteostat."
    },
    "donationText": "Soutenez Meteostat dans sa mission de fournir des données météorologiques et climatiques ouvertes à tous. Votre don permet également d'aider les projets éducatifs et de recherche visant à améliorer le fonctionnement du monde grâce aux données de Meteostat.",
    "donorPrivacy": "Nous serions ravis de vous mentionner en tant que mécène. Si vous ne souhaitez pas être mentionné, veuillez ajouter une note à votre don ou nous contacter.",
    "online": "Online",
    "bankTransfer": "Virement Bancaire",
    "recipient": "Recipient",
    "iban": "IBAN",
    "bic": "BIC",
    "cryptoCurrencies": "Crypto Monnaies"
  },
  "pt": {
    "$meta": {
      "title": "Donate",
      "description": "Get to know the people who support Meteostat."
    },
    "donationText": "Apoiar o Meteostat na sua missão de fornecer dados climáticos e meteorológicos abertos para todos. A sua doação também ajuda projectos educativos e de investigação que fazem com que o mundo funcione melhor usando os dados do Meteostat.",
    "donorPrivacy": "Gostaríamos de lhe dar crédito como mecenas. Se não desejar ser mencionado, por favor acrescente uma nota ao seu donativo ou contacte-nos.",
    "online": "On-line",
    "bankTransfer": "Transferência Bancária",
    "recipient": "Destinatário",
    "iban": "IBAN",
    "bic": "BIC",
    "cryptoCurrencies": "Moedas Criptográficas"
  },
  "ru": {
    "$meta": {
      "title": "Donate",
      "description": "Get to know the people who support Meteostat."
    },
    "donationText": "Поддержите Меteostat в его миссии по предоставлению открытых данных о погоде и климате для всех. Ваше пожертвование также поможет образовательным и исследовательским проектам сделать мир лучше, используя данные Meteostat.",
    "donorPrivacy": "Мы будем рады отметить вас как мецената. Если вы не хотите, чтобы вас упоминали, пожалуйста, добавьте примечание к вашему пожертвованию или свяжитесь с нами.",
    "online": "Онлайн",
    "bankTransfer": "Банковский перевод",
    "recipient": "Получатель",
    "iban": "IBAN",
    "bic": "BIC",
    "cryptoCurrencies": "Криптовалюты"   
  }
}
</i18n>
