<template>
  <div class="container py-4">
    <h1 class="display-5 heading-main mb-3">
      {{ t('support') }}
    </h1>
    <div class="row gy-5">
      <div class="col-12 col-md-8">
        <p class="lead">
          {{ t('intro') }}
        </p>
        <form>
          <!-- Alert: Failed -->
          <p
            v-if="status === 400"
            class="alert alert-danger"
          >
            {{ t('alertFailed') }}
          </p>
          <!-- Alert: Success -->
          <p
            v-if="status === 200"
            class="alert alert-success"
          >
            {{ t('alertSuccess') }}
          </p>
          <div class="form-floating mb-3">
            <input
              id="subject"
              v-model="subject"
              type="text"
              class="form-control"
            >
            <label for="subject">{{ t('subject') }}</label>
          </div>
          <div class="form-floating mb-3">
            <input
              id="email"
              v-model="email"
              type="email"
              class="form-control"
            >
            <label for="email">{{ t('email') }}</label>
          </div>
          <div class="form-floating mb-3">
            <textarea
              id="message"
              v-model="message"
              class="form-control form-message"
            />
            <label for="message">{{ t('message') }}</label>
          </div>
          <p
            class="alert alert-primary"
          >
            {{ t('alertPrivacy') }}
          </p>
          <div class="d-flex align-items-center">
            <span
              v-if="!isFilled"
              class="text-danger"
            >
              {{ t('completeForm') }}
            </span>
            <button
              type="button"
              class="btn btn-primary ms-auto"
              :disabled="!isFilled"
              @click="sendMessage()"
            >
              {{ t('send') }}
            </button>
          </div>
        </form>
      </div>
      <div class="col-12 col-md-4">
        <div
          id="faqAccordion"
          class="accordion"
        >
          <div
            v-for="(item, key) in i18n.messages.value[$locale].faq"
            :key="key"
            class="accordion-item"
          >
            <h2
              :id="`faq-heading-${key}`"
              class="accordion-header"
            >
              <button
                class="accordion-button"
                :class="key === 0 ? '' : 'collapsed'"
                type="button"
                data-bs-toggle="collapse"
                :data-bs-target="`#faq-collapse-${key}`"
                :aria-expanded="key === 0 ? true : false"
                :aria-controls="`#faq-collapse-${key}`"
              >
                {{ t(`faq[${key}].question`) }}
              </button>
            </h2>
            <div
              :id="`faq-collapse-${key}`"
              class="accordion-collapse collapse"
              :class="key === 0 ? 'show' : ''"
              :aria-labelledby="`faq-heading-${key}`"
              data-bs-parent="#faqAccordion"
            >
              <div class="accordion-body">
                {{ t(`faq[${key}].answer`) }}
              </div>
            </div>
          </div>
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
  name: 'Support',

  setup(): Record<string, any> { 
    const { t, messages } = useI18n()

    useHead({
      title: `${t('$meta.title')} | Meteostat`,
      meta: [
        {
          name: 'description',
          content: t('$meta.description')
        }
      ],
    })

    return {
      t,
      i18n: {
        messages
      }
    }
  },

  data() {
    return {
      subject: '',
      email: '',
      message: '',
      status: 0
    }
  },

  computed: {
    isFilled() {
      return (
        this.subject.length > 1 &&
        this.email.length > 3 &&
        this.message.length > 3
      )
    }
  },

  methods: {
    sendMessage() {
      fetch(`${this.$api}/app/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          subject: this.subject,
          email: this.email,
          message: this.message
        }),
      })
      .then(response => this.status = response.status)
    }
  }
})
</script>

<style lang="scss" scoped>
.form-message {
  height: 200px !important;
}
</style>

<i18n>
{
  "en": {
    "$meta": {
      "title": "Support",
      "description": "Stuck with a problem? Get support with everything Meteostat."
    },
    "intro": "Do you have questions, feedback or another concern regarding Meteostat? We are here to help.",
    "alertFailed": "Failed to send message. Please check if everything is correct.",
    "alertSuccess": "We received your message and will get back to you soon.",
    "subject": "Subject",
    "email": "E-Mail",
    "message": "Message",
    "alertPrivacy": "By contacting Meteostat you agree with our privacy terms.",
    "completeForm": "Please fill in all fields.",
    "send": "Send",
    "faq": [
      {
        "question": "How was the weather at a certain day in the past?",
        "answer": "Please forebear from contacting Meteostat regarding general (historical) weather information. All data is made available for free on this website. If you need Meteostat data in a specific format, aggregation or visualization, please get in touch for a non-binding offer."
      },
      {
        "question": "Why do some time series contain future data?",
        "answer": "Meteostat substitutes missing observations with model data, by default. Model data also includes weather forecasts to improve the user experience when working with real-time data. You can always opt-out of model data."
      },
      {
        "question": "Why do hourly, daily and monthly data not always match?",
        "answer": "As daily and monthly data is not neccessarily aggregated from Meteostat's hourly data, you might experience some inconsistency (e.g. due to different aggregation methods) between the different frequencies. This is expected behaviour."
      },
      {
        "question": "Under which license is Meteostat data distributed?",
        "answer": "Meteostat data is distributed under the terms of the CC BY-NC 4.0 license."
      },
      {
        "question": "Is Meteostat a public or governmental service?",
        "answer": "Meteostat is not a public or governmental service. Furthermore, we are not associated with Meteosat. We collect data from national weather service like NOAA and DWD. However, Meteostat is an independent initiative which relies on donations, sponsoring and other sources of income."
      }
    ]
  },
}
</i18n>