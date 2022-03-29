<template>
  <div class="offcanvas-header">
    <h5 id="offcanvasExampleLabel" class="offcanvas-title">
      {{ t('donation') }}
    </h5>
    <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close" />
  </div>
  <div class="offcanvas-body">
    <div class="mb-4">
      {{ t('donationText') }}
      <small class="d-block text-muted mt-2">
        {{ t('donorPrivacy') }}
      </small>
    </div>
    <h6 class="d-block mb-3">
      {{ t('online') }}
    </h6>
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
    <a class="icon-link mb-4" href="https://github.com/sponsors/clampr" target="_blank" rel="noreferrer">
      <span class="box fs-5">
        <icon :icon="['fab', 'github']" />
      </span>
      <span class="link fs-5 ms-2">GitHub</span>
    </a>
    <hr />
    <h6 class="d-block mb-3">
      {{ t('bankTransfer') }}
    </h6>
    <div class="form-floating mb-3">
      <input id="recipient" type="text" class="form-control" :value="transfer.recipient" readonly />
      <label for="recipient">{{ t('recipient') }}</label>
    </div>
    <div class="form-floating mb-3">
      <input id="iban" type="text" class="form-control" :value="transfer.iban" readonly />
      <label for="iban">{{ t('iban') }}</label>
    </div>
    <div class="form-floating mb-3">
      <input id="bic" type="text" class="form-control" :value="transfer.bic" readonly />
      <label for="bic">{{ t('bic') }}</label>
    </div>
    <hr />
    <h6 class="d-block mb-3">
      {{ t('cryptoCurrencies') }}
    </h6>
    <ul class="nav nav-pills mb-3" role="tablist">
      <li class="nav-item" role="presentation">
        <button
          class="nav-link active"
          data-bs-toggle="pill"
          data-bs-target="#crypto-bitcoin"
          type="button"
          role="tab"
          aria-controls="crypto-bitcoin"
          aria-selected="true"
        >
          Bitcoin
        </button>
      </li>
      <li class="nav-item" role="presentation">
        <button
          class="nav-link"
          data-bs-toggle="pill"
          data-bs-target="#crypto-ethereum"
          type="button"
          role="tab"
          aria-controls="crypto-ethereum"
          aria-selected="false"
        >
          Ethereum
        </button>
      </li>
    </ul>
    <div class="tab-content">
      <div id="crypto-bitcoin" class="tab-pane fade show active" role="tabpanel">
        <div class="form-floating mb-3">
          <input id="bitcoin" type="text" class="form-control" :value="crypto.bitcoin" readonly />
          <label for="bitcoin">Bitcoin</label>
        </div>
        <img src="https://media.meteostat.net/assets/qr-bitcoin.png" class="img-fluid img-thumbnail" />
      </div>
      <div id="crypto-ethereum" class="tab-pane fade" role="tabpanel" aria-labelledby="pills-profile-tab">
        <div class="form-floating mb-3">
          <input id="ethereum" type="text" class="form-control" :value="crypto.ethereum" readonly />
          <label for="ethereum">Ethereum</label>
        </div>
        <img src="https://media.meteostat.net/assets/qr-ethereum.png" class="img-fluid img-thumbnail" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useI18n } from 'vue-i18n';

export default defineComponent({
  name: 'Donation',

  setup(): Record<string, any> {
    const { t } = useI18n();

    const transfer = {
      recipient: 'Christian Lamprecht',
      iban: 'DE76 1001 1001 2621 1459 29',
      bic: 'NTSBDEB1XXX'
    };

    const crypto = {
      bitcoin: 'bc1qg2alt82ry2ntkslw8ulr9528nmlj6ym6g2x0ms',
      ethereum: '0x5f4Dde3da1aE75280eFA6a62050c1D5cb1D7f694'
    };

    return { t, transfer, crypto };
  }
});
</script>

<style lang="scss" scoped>
@import '~/style/variables';
@import '../node_modules/bootstrap/scss/functions';
@import '../node_modules/bootstrap/scss/variables';
@import '../node_modules/bootstrap/scss/mixins';

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
    "donationText": "Support Meteostat on its mission of providing open weather and climate data for everyone. Your donation also helps educational and research projects reaching their goals using Meteostat data.",
    "donorPrivacy": "We would love to credit you as a patron. If you wish not to be mentioned, please add a note to your donation or contact us.",
    "online": "Online",
    "bankTransfer": "Bank Transfer",
    "recipient": "Recipient",
    "iban": "IBAN",
    "bic": "BIC",
    "cryptoCurrencies": "Crypto Currencies"
  },
  "de": {
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
