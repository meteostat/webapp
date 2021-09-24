<template>
  <div class="offcanvas-header">
    <h5
      id="offcanvasExampleLabel"
      class="offcanvas-title"
    >
      {{ t('donation') }}
    </h5>
    <button
      type="button"
      class="btn-close text-reset"
      data-bs-dismiss="offcanvas"
      aria-label="Close"
    />
  </div>
  <div class="offcanvas-body">
    <div class="mb-4">
      {{ t('donationText') }}
      <small class="d-block text-muted mt-2">
        {{ t('donorPrivacy') }}
      </small>
    </div>
    <strong class="d-block mb-3">{{ t('online') }}</strong>
    <a
      class="icon-link mb-2"
      href="https://www.patreon.com/meteostat"
      target="_blank"
    >
      <span class="box fs-5">
        <icon :icon="['fab', 'patreon']" />
      </span>
      <span class="link fs-5 ms-2">Patreon</span>
    </a>
    <a
      class="icon-link mb-2"
      href="https://www.paypal.com/donate?hosted_button_id=MQ67WRDC8EW38"
      target="_blank"
    >
      <span class="box fs-5">
        <icon :icon="['fab', 'paypal']" />
      </span>
      <span class="link fs-5 ms-2">PayPal</span>
    </a>
    <a
      class="icon-link mb-4"
      href="https://github.com/sponsors/clampr"
      target="_blank"
    >
      <span class="box fs-5">
        <icon :icon="['fab', 'github']" />
      </span>
      <span class="link fs-5 ms-2">GitHub</span>
    </a>
    <hr>
    <strong class="d-block mb-3">{{ t('bankTransfer') }}</strong>
    <div class="form-floating mb-3">
      <input
        id="recipient"
        type="text"
        class="form-control"
        :value="transfer.recipient"
        readonly
      >
      <label for="recipient">{{ t('recipient') }}</label>
    </div>
    <div class="form-floating mb-3">
      <input
        id="iban"
        type="text"
        class="form-control"
        :value="transfer.iban"
        readonly
      >
      <label for="iban">{{ t('iban') }}</label>
    </div>
    <div class="form-floating mb-3">
      <input
        id="bic"
        type="text"
        class="form-control"
        :value="transfer.bic"
        readonly
      >
      <label for="bic">{{ t('bic') }}</label>
    </div>
    <hr>
    <strong class="d-block mb-3">{{ t('cryptoCurrencies') }}</strong>
    <div class="form-floating mb-3">
      <input
        id="bitcoin"
        type="text"
        class="form-control"
        :value="crypto.bitcoin"
        readonly
      >
      <label for="bitcoin">Bitcoin</label>
    </div>
    <div class="form-floating mb-3">
      <input
        id="ethereum"
        type="text"
        class="form-control"
        :value="crypto.ethereum"
        readonly
      >
      <label for="ethereum">Ethereum</label>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'Donation',

  setup(): Record<string, any> {
    const { t } = useI18n()

    const transfer = {
      recipient: 'Christian Lamprecht',
      iban: 'DE76 1001 1001 2621 1459 29',
      bic: 'NTSBDEB1XXX'
    }

    const crypto = {
      bitcoin: 'bc1qg2alt82ry2ntkslw8ulr9528nmlj6ym6g2x0ms',
      ethereum: '0x5f4Dde3da1aE75280eFA6a62050c1D5cb1D7f694'
    }

    return { t, transfer, crypto }
  }
})
</script>

<style lang="scss" scoped>
@import "~/style/variables";
@import "../node_modules/bootstrap/scss/functions";
@import "../node_modules/bootstrap/scss/variables";
@import "../node_modules/bootstrap/scss/mixins";

.icon-link {
  display: flex;
  align-items: center;
  
  .box {
    display: flex;
    justify-content: center;
    width: 40px;
    padding: .5rem;
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
    "donationText": "Support Meteostat on its mission of providing open weather and climate data for everyone. Your donation also helps educational and research projects making the world run better using Meteostat data.",
    "donorPrivacy": "We would love to credit you as a patron. If you wish not to be mentioned, please add a note to your donation or contact us.",
    "online": "Online",
    "bankTransfer": "Bank Transfer",
    "recipient": "Recipient",
    "iban": "IBAN",
    "bic": "BIC",
    "cryptoCurrencies": "Crypto Currencies"
  },
  "de": {
    "donation": "Spenden",
    "donationText": "Unterstützen Sie Meteostat bei dem Vorhaben, Wetter- und Klimadaten für jedermann frei zugänglich zu machen. Ihre Spende hilft auch zahlreichen Projekten aus Bildung und Forschung, die Meteostat-Daten für ihre Arbeit verwenden.",
    "online": "Online",
    "bankTransfer": "Überweisung",
    "recipient": "Empfänger",
    "iban": "IBAN",
    "bic": "BIC"
  }
}
</i18n>