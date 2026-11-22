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
        <!-- Main Content Ad -->
        <div class="my-3">
          <Ad slot-id="3216865845" />
        </div>
        <form>
          <!-- Alert: Failed -->
          <p v-if="status === 400" class="alert alert-danger">
            {{ t('alertFailed') }}
          </p>
          <!-- Alert: Success -->
          <p v-if="status === 200" class="alert alert-success">
            {{ t('alertSuccess') }}
          </p>
          <div class="form-floating mb-3">
            <input id="subject" v-model="subject" type="text" class="form-control" />
            <label for="subject">{{ t('subject') }}</label>
          </div>
          <div class="form-floating mb-3">
            <input id="email" v-model="email" type="email" class="form-control" />
            <label for="email">{{ t('email') }}</label>
          </div>
          <div class="form-floating mb-3">
            <textarea id="message" v-model="message" class="form-control form-message" />
            <label for="message">{{ t('message') }}</label>
          </div>
          <p class="alert alert-primary">
            {{ t('alertPrivacy') }}
          </p>
          <div class="d-flex align-items-center">
            <span v-if="!isFilled" class="text-danger">
              {{ t('completeForm') }}
            </span>
            <button type="button" class="btn btn-primary ms-auto" :disabled="!isFilled" @click="sendMessage">
              {{ t('send') }}
            </button>
          </div>
        </form>
      </div>
      <div class="col-12 col-md-4">
        <div id="faqAccordion" class="accordion">
          <div v-for="(item, key) in i18n.messages.value[$locale].faq" :key="key" class="accordion-item">
            <h2 :id="`faq-heading-${key}`" class="accordion-header">
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
        <div class="my-3">
          <Ad slot-id="3216865845" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useI18n } from 'vue-i18n';
import { useHead } from '@unhead/vue';
import Ad from '~/components/Ad.vue';

export default defineComponent({
  name: 'Support',

  components: {
    Ad
  },

  setup(): Record<string, any> {
    const { t, messages } = useI18n();

    useHead({
      title: `${t('$meta.title')} | Meteostat`,
      meta: [
        {
          name: 'description',
          content: t('$meta.description')
        }
      ]
    });

    return {
      t,
      i18n: {
        messages
      }
    };
  },

  data() {
    return {
      subject: '',
      email: '',
      message: '',
      status: 0
    };
  },

  computed: {
    isFilled(this: any) {
      return this.subject.length > 1 && this.email.length > 3 && this.message.length > 3;
    }
  },

  methods: {
    sendMessage(event: Event) {
      (event.target as HTMLButtonElement).disabled = true;
      fetch(`${this.$api}/app/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          subject: this.subject,
          email: this.email,
          message: this.message
        })
      }).then((response) => (this.status = response.status));
    }
  }
});
</script>

<style lang="scss" scoped>
@import '~/style/variables';
@import 'bootstrap/scss/functions';
@import 'bootstrap/scss/variables';
@import 'bootstrap/scss/mixins';
@import 'bootstrap/scss/accordion';

.form-message {
  height: 200px !important;
}
</style>

<i18n>
{
  "en": {
    "$meta": {
      "title": "Support",
      "description": "Stuck with a problem? Get help with all things Meteostat."
    },
    "intro": "Do you have questions, feedback or any other request regarding Meteostat? We are here to help.",
    "alertFailed": "Your message could not be sent. Please check your input.",
    "alertSuccess": "We received your message and will get back to you soon.",
    "subject": "Subject",
    "email": "Email",
    "message": "Message",
    "alertPrivacy": "By contacting Meteostat, you agree to our privacy policy.",
    "completeForm": "Please fill in all fields.",
    "send": "Send",
    "faq": [
      {
        "question": "How was the weather on a certain day in the past?",
        "answer": "Please refrain from contacting Meteostat about general (historical) weather information. All data is available for free on this website. If you need Meteostat data in a specific format, aggregation or visualization, please get in touch for a non-binding quote."
      },
      {
        "question": "Why do some time series contain future data?",
        "answer": "By default, Meteostat replaces missing observations with model data. Model data also includes weather forecasts to improve the experience when working with real-time data. You can always opt out of model data."
      },
      {
        "question": "Why don't hourly and daily data always match?",
        "answer": "As daily data is not necessarily aggregated from Meteostat's hourly data, the two frequencies may differ (e.g. due to different aggregation methods). This is expected behavior."
      },
      {
        "question": "Under which license is Meteostat data distributed?",
        "answer": "Meteostat data is distributed under the terms of the CC BY-NC 4.0 license."
      },
      {
        "question": "Is Meteostat a public or governmental service?",
        "answer": "No, Meteostat is not a public or governmental service, and we are not affiliated with Meteosat. We collect data from national weather services such as NOAA and DWD. Meteostat is an independent initiative that relies on donations, sponsorships and other sources of income."
      }
    ]
  },
  "de": {
    "$meta": {
      "title": "Kontakt",
      "description": "Erhalten Sie Hilfe bei allen Themen rund um Meteostat."
    },
    "intro": "Haben Sie Fragen, Feedback oder ein anderes Anliegen zu Meteostat? Wir sind für Sie da.",
    "alertFailed": "Die Nachricht konnte nicht gesendet werden. Bitte überprüfen Sie Ihre Eingaben.",
    "alertSuccess": "Wir haben Ihre Nachricht erhalten und werden uns bald bei Ihnen melden.",
    "subject": "Betreff",
    "email": "E-Mail",
    "message": "Nachricht",
    "alertPrivacy": "Mit der Kontaktaufnahme erklären Sie sich mit unserer Datenschutzerklärung einverstanden.",
    "completeForm": "Bitte füllen Sie alle Felder aus.",
    "send": "Senden",
    "faq": [
      {
        "question": "Wie war das Wetter an einem bestimmten Tag in der Vergangenheit?",
        "answer": "Bitte sehen Sie davon ab, Meteostat wegen allgemeiner (historischer) Wetterinformationen zu kontaktieren. Alle Daten stehen auf dieser Website kostenlos zur Verfügung. Wenn Sie Meteostat-Daten in einem bestimmten Format, einer bestimmten Aggregation oder Visualisierung benötigen, kontaktieren Sie uns gerne für ein unverbindliches Angebot."
      },
      {
        "question": "Warum enthalten manche Zeitreihen Daten aus der Zukunft?",
        "answer": "Meteostat ersetzt fehlende Beobachtungen standardmäßig durch Modelldaten. Diese enthalten auch Wettervorhersagen, um die Arbeit mit Echtzeitdaten zu erleichtern. Sie können Modelldaten jederzeit deaktivieren."
      },
      {
        "question": "Warum stimmen stündliche und tägliche Daten nicht immer überein?",
        "answer": "Da die Tageswerte nicht zwingend aus den stündlichen Daten von Meteostat berechnet werden, kann es zwischen den beiden Auflösungen zu Abweichungen kommen (z. B. durch unterschiedliche Aggregationsmethoden). Das ist so beabsichtigt."
      },
      {
        "question": "Unter welcher Lizenz werden die Meteostat-Daten bereitgestellt?",
        "answer": "Die Meteostat-Daten werden unter den Bedingungen der Lizenz CC BY-NC 4.0 bereitgestellt."
      },
      {
        "question": "Ist Meteostat ein öffentlicher oder staatlicher Dienst?",
        "answer": "Nein, Meteostat ist kein öffentlicher oder staatlicher Dienst und steht in keiner Verbindung zu Meteosat. Wir beziehen Daten von nationalen Wetterdiensten wie NOAA und DWD. Meteostat ist eine unabhängige Initiative, die auf Spenden, Sponsoring und andere Einnahmequellen angewiesen ist."
      }
    ]
  },
  "it": {
    "$meta": {
      "title": "Supporto",
      "description": "Hai un problema? Ricevi assistenza su tutto ciò che riguarda Meteostat."
    },
    "intro": "Hai domande, feedback o un'altra richiesta su Meteostat? Siamo qui per aiutarti.",
    "alertFailed": "Non è stato possibile inviare il messaggio. Controlla i dati inseriti.",
    "alertSuccess": "Abbiamo ricevuto il tuo messaggio e ti risponderemo al più presto.",
    "subject": "Oggetto",
    "email": "E-mail",
    "message": "Messaggio",
    "alertPrivacy": "Contattando Meteostat accetti la nostra informativa sulla privacy.",
    "completeForm": "Compila tutti i campi.",
    "send": "Invia",
    "faq": [
      {
        "question": "Com'era il tempo in un determinato giorno del passato?",
        "answer": "Ti preghiamo di non contattare Meteostat per informazioni meteo generali (storiche). Tutti i dati sono disponibili gratuitamente su questo sito. Se hai bisogno dei dati di Meteostat in un formato, un'aggregazione o una visualizzazione specifici, contattaci per un'offerta non vincolante."
      },
      {
        "question": "Perché alcune serie temporali contengono dati futuri?",
        "answer": "Per impostazione predefinita, Meteostat sostituisce le osservazioni mancanti con dati del modello. Questi includono anche previsioni meteo, per facilitare il lavoro con i dati in tempo reale. Puoi sempre disattivare i dati del modello."
      },
      {
        "question": "Perché i dati orari e giornalieri non sempre coincidono?",
        "answer": "Poiché i dati giornalieri non sono necessariamente calcolati a partire dai dati orari di Meteostat, possono esserci differenze tra le due frequenze (ad esempio per via di metodi di aggregazione diversi). Questo comportamento è previsto."
      },
      {
        "question": "Con quale licenza vengono distribuiti i dati di Meteostat?",
        "answer": "I dati di Meteostat sono distribuiti secondo i termini della licenza CC BY-NC 4.0."
      },
      {
        "question": "Meteostat è un servizio pubblico o governativo?",
        "answer": "No, Meteostat non è un servizio pubblico o governativo e non è affiliato a Meteosat. Raccogliamo dati dai servizi meteorologici nazionali come NOAA e DWD. Meteostat è un'iniziativa indipendente che si sostiene grazie a donazioni, sponsorizzazioni e altre fonti di entrate."
      }
    ]
  },
  "es": {
    "$meta": {
      "title": "Soporte",
      "description": "¿Tienes un problema? Obtén ayuda con todo lo relacionado con Meteostat."
    },
    "intro": "¿Tienes preguntas, comentarios o cualquier otra consulta sobre Meteostat? Estamos aquí para ayudarte.",
    "alertFailed": "No se ha podido enviar el mensaje. Comprueba los datos introducidos.",
    "alertSuccess": "Hemos recibido tu mensaje y te responderemos lo antes posible.",
    "subject": "Asunto",
    "email": "Correo electrónico",
    "message": "Mensaje",
    "alertPrivacy": "Al contactar con Meteostat, aceptas nuestra política de privacidad.",
    "completeForm": "Rellena todos los campos.",
    "send": "Enviar",
    "faq": [
      {
        "question": "¿Qué tiempo hizo un día concreto en el pasado?",
        "answer": "Te rogamos que no contactes con Meteostat para consultas generales sobre el tiempo (histórico). Todos los datos están disponibles de forma gratuita en este sitio web. Si necesitas datos de Meteostat en un formato, agregación o visualización específicos, ponte en contacto con nosotros para recibir una oferta sin compromiso."
      },
      {
        "question": "¿Por qué algunas series temporales contienen datos futuros?",
        "answer": "Por defecto, Meteostat sustituye las observaciones que faltan por datos del modelo. Estos también incluyen previsiones meteorológicas para facilitar el trabajo con datos en tiempo real. Siempre puedes desactivar los datos del modelo."
      },
      {
        "question": "¿Por qué los datos horarios y diarios no siempre coinciden?",
        "answer": "Como los datos diarios no se calculan necesariamente a partir de los datos horarios de Meteostat, puede haber diferencias entre ambas frecuencias (por ejemplo, por distintos métodos de agregación). Es un comportamiento esperado."
      },
      {
        "question": "¿Bajo qué licencia se distribuyen los datos de Meteostat?",
        "answer": "Los datos de Meteostat se distribuyen bajo los términos de la licencia CC BY-NC 4.0."
      },
      {
        "question": "¿Es Meteostat un servicio público o gubernamental?",
        "answer": "No, Meteostat no es un servicio público ni gubernamental, y no tiene relación con Meteosat. Recopilamos datos de servicios meteorológicos nacionales como la NOAA y el DWD. Meteostat es una iniciativa independiente que depende de donaciones, patrocinios y otras fuentes de ingresos."
      }
    ]
  },
  "nl": {
    "$meta": {
      "title": "Support",
      "description": "Loop je ergens tegenaan? Krijg hulp bij alles rondom Meteostat."
    },
    "intro": "Heb je vragen, feedback of een ander verzoek over Meteostat? We helpen je graag.",
    "alertFailed": "Je bericht kon niet worden verzonden. Controleer je invoer.",
    "alertSuccess": "We hebben je bericht ontvangen en nemen zo snel mogelijk contact met je op.",
    "subject": "Onderwerp",
    "email": "E-mail",
    "message": "Bericht",
    "alertPrivacy": "Door contact op te nemen met Meteostat ga je akkoord met ons privacybeleid.",
    "completeForm": "Vul alle velden in.",
    "send": "Versturen",
    "faq": [
      {
        "question": "Hoe was het weer op een bepaalde dag in het verleden?",
        "answer": "Neem alsjeblieft geen contact op met Meteostat voor algemene (historische) weerinformatie. Alle gegevens zijn gratis beschikbaar op deze website. Heb je Meteostat-gegevens nodig in een specifiek formaat, een specifieke aggregatie of visualisatie? Neem dan contact op voor een vrijblijvende offerte."
      },
      {
        "question": "Waarom bevatten sommige tijdreeksen gegevens uit de toekomst?",
        "answer": "Meteostat vervangt ontbrekende waarnemingen standaard door modelgegevens. Die bevatten ook weersverwachtingen, zodat je makkelijker met realtimegegevens kunt werken. Je kunt modelgegevens altijd uitschakelen."
      },
      {
        "question": "Waarom komen uur- en daggegevens niet altijd overeen?",
        "answer": "Omdat daggegevens niet per se worden berekend uit de uurgegevens van Meteostat, kunnen beide van elkaar afwijken (bijvoorbeeld door verschillende aggregatiemethoden). Dit is verwacht gedrag."
      },
      {
        "question": "Onder welke licentie worden Meteostat-gegevens verspreid?",
        "answer": "Meteostat-gegevens worden verspreid onder de voorwaarden van de licentie CC BY-NC 4.0."
      },
      {
        "question": "Is Meteostat een openbare of overheidsdienst?",
        "answer": "Nee, Meteostat is geen openbare of overheidsdienst en is niet verbonden aan Meteosat. We verzamelen gegevens van nationale weerdiensten zoals NOAA en DWD. Meteostat is een onafhankelijk initiatief dat afhankelijk is van donaties, sponsoring en andere inkomstenbronnen."
      }
    ]
  },
  "fr": {
    "$meta": {
      "title": "Assistance",
      "description": "Vous rencontrez un problème ? Obtenez de l'aide pour tout ce qui concerne Meteostat."
    },
    "intro": "Vous avez des questions, des commentaires ou une autre demande concernant Meteostat ? Nous sommes là pour vous aider.",
    "alertFailed": "Votre message n'a pas pu être envoyé. Veuillez vérifier votre saisie.",
    "alertSuccess": "Nous avons reçu votre message et nous vous répondrons bientôt.",
    "subject": "Sujet",
    "email": "E-mail",
    "message": "Message",
    "alertPrivacy": "En contactant Meteostat, vous acceptez notre politique de confidentialité.",
    "completeForm": "Veuillez remplir tous les champs.",
    "send": "Envoyer",
    "faq": [
      {
        "question": "Quel temps faisait-il un jour donné dans le passé ?",
        "answer": "Merci de ne pas contacter Meteostat pour des informations météorologiques générales (historiques). Toutes les données sont disponibles gratuitement sur ce site. Si vous avez besoin des données de Meteostat dans un format, une agrégation ou une visualisation spécifiques, contactez-nous pour une offre sans engagement."
      },
      {
        "question": "Pourquoi certaines séries temporelles contiennent-elles des données futures ?",
        "answer": "Par défaut, Meteostat remplace les observations manquantes par des données de modèle. Celles-ci incluent également des prévisions météo afin de faciliter le travail avec les données en temps réel. Vous pouvez toujours désactiver les données de modèle."
      },
      {
        "question": "Pourquoi les données horaires et journalières ne concordent-elles pas toujours ?",
        "answer": "Les données journalières n'étant pas nécessairement calculées à partir des données horaires de Meteostat, des écarts peuvent apparaître entre les deux fréquences (par exemple en raison de méthodes d'agrégation différentes). Ce comportement est normal."
      },
      {
        "question": "Sous quelle licence les données de Meteostat sont-elles distribuées ?",
        "answer": "Les données de Meteostat sont distribuées selon les termes de la licence CC BY-NC 4.0."
      },
      {
        "question": "Meteostat est-il un service public ou gouvernemental ?",
        "answer": "Non, Meteostat n'est pas un service public ou gouvernemental et n'est pas affilié à Meteosat. Nous collectons des données auprès de services météorologiques nationaux comme la NOAA et le DWD. Meteostat est une initiative indépendante qui repose sur les dons, le parrainage et d'autres sources de revenus."
      }
    ]
  },
  "pt": {
    "$meta": {
      "title": "Suporte",
      "description": "Tem um problema? Obtenha ajuda com tudo o que diz respeito ao Meteostat."
    },
    "intro": "Tem perguntas, sugestões ou outro pedido relacionado com o Meteostat? Estamos aqui para ajudar.",
    "alertFailed": "Não foi possível enviar a mensagem. Verifique os dados introduzidos.",
    "alertSuccess": "Recebemos a sua mensagem e entraremos em contacto consigo em breve.",
    "subject": "Assunto",
    "email": "E-mail",
    "message": "Mensagem",
    "alertPrivacy": "Ao contactar o Meteostat, concorda com a nossa política de privacidade.",
    "completeForm": "Preencha todos os campos.",
    "send": "Enviar",
    "faq": [
      {
        "question": "Como estava o tempo num determinado dia do passado?",
        "answer": "Pedimos que não contacte o Meteostat por questões gerais sobre o tempo (histórico). Todos os dados estão disponíveis gratuitamente neste website. Se precisar de dados do Meteostat num formato, agregação ou visualização específicos, entre em contacto connosco para obter uma proposta sem compromisso."
      },
      {
        "question": "Porque é que algumas séries temporais contêm dados futuros?",
        "answer": "Por predefinição, o Meteostat substitui as observações em falta por dados de modelo. Estes incluem também previsões meteorológicas para facilitar o trabalho com dados em tempo real. Pode desativar os dados de modelo a qualquer momento."
      },
      {
        "question": "Porque é que os dados horários e diários nem sempre coincidem?",
        "answer": "Como os dados diários não são necessariamente calculados a partir dos dados horários do Meteostat, podem existir diferenças entre as duas frequências (por exemplo, devido a métodos de agregação diferentes). Este comportamento é esperado."
      },
      {
        "question": "Sob que licença são distribuídos os dados do Meteostat?",
        "answer": "Os dados do Meteostat são distribuídos nos termos da licença CC BY-NC 4.0."
      },
      {
        "question": "O Meteostat é um serviço público ou governamental?",
        "answer": "Não, o Meteostat não é um serviço público nem governamental e não tem qualquer ligação ao Meteosat. Recolhemos dados de serviços meteorológicos nacionais como a NOAA e o DWD. O Meteostat é uma iniciativa independente que depende de donativos, patrocínios e outras fontes de receita."
      }
    ]
  },
  "ru": {
    "$meta": {
      "title": "Поддержка",
      "description": "Возникла проблема? Получите помощь по любым вопросам, связанным с Meteostat."
    },
    "intro": "У вас есть вопросы, отзывы или другие обращения, связанные с Meteostat? Мы готовы помочь.",
    "alertFailed": "Не удалось отправить сообщение. Пожалуйста, проверьте введённые данные.",
    "alertSuccess": "Мы получили ваше сообщение и свяжемся с вами в ближайшее время.",
    "subject": "Тема",
    "email": "Эл. почта",
    "message": "Сообщение",
    "alertPrivacy": "Обращаясь в Meteostat, вы соглашаетесь с нашей политикой конфиденциальности.",
    "completeForm": "Пожалуйста, заполните все поля.",
    "send": "Отправить",
    "faq": [
      {
        "question": "Какая погода была в определённый день в прошлом?",
        "answer": "Пожалуйста, не обращайтесь в Meteostat с общими вопросами о (прошлой) погоде. Все данные бесплатно доступны на этом сайте. Если вам нужны данные Meteostat в определённом формате, с особой агрегацией или визуализацией, свяжитесь с нами, чтобы получить предложение без обязательств."
      },
      {
        "question": "Почему некоторые временные ряды содержат данные из будущего?",
        "answer": "По умолчанию Meteostat заменяет отсутствующие наблюдения модельными данными. Они также включают прогнозы погоды, чтобы упростить работу с данными в реальном времени. Вы всегда можете отключить модельные данные."
      },
      {
        "question": "Почему почасовые и суточные данные не всегда совпадают?",
        "answer": "Поскольку суточные данные не обязательно рассчитываются на основе почасовых данных Meteostat, между ними возможны расхождения (например, из-за разных методов агрегирования). Это ожидаемое поведение."
      },
      {
        "question": "Под какой лицензией распространяются данные Meteostat?",
        "answer": "Данные Meteostat распространяются на условиях лицензии CC BY-NC 4.0."
      },
      {
        "question": "Является ли Meteostat государственной службой?",
        "answer": "Нет, Meteostat не является государственной или общественной службой и не связан с Meteosat. Мы собираем данные национальных метеослужб, таких как NOAA и DWD. Meteostat — независимый проект, который существует за счёт пожертвований, спонсорства и других источников дохода."
      }
    ]
  }
}
</i18n>
