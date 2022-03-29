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
import { useHead } from '@vueuse/head';
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
@import '../node_modules/bootstrap/scss/functions';
@import '../node_modules/bootstrap/scss/variables';
@import '../node_modules/bootstrap/scss/mixins';
@import '../../node_modules/bootstrap/scss/accordion';

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
        "question": "Why do hourly and daily data not always match?",
        "answer": "As daily data is not neccessarily aggregated from Meteostat's hourly data, you might experience some inconsistency (e.g. due to different aggregation methods) between the different frequencies. This is expected behaviour."
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
  "de": {
    "$meta": {
      "title": "Kontakt",
      "description": "Erhalten Sie Hilfe bei allen Themen rund um Meteostat."
    },
    "intro": "Haben Sie Fragen, Feedback oder ein anderes Anliegen zu Meteostat? Wir sind für Sie da.",
    "alertFailed": "Nachricht konnte nicht gesendet werden. Bitte prüfen Sie, ob alles korrekt ist.",
    "alertSuccess": "Wir haben Ihre Nachricht erhalten und werden uns bald bei Ihnen melden.",
    "subject": "Betreff",
    "email": "E-Mail",
    "message": "Nachricht",
    "alertPrivacy": "Durch die Kontaktaufnahme mit Meteostat erklären Sie sich mit unseren Datenschutzbestimmungen einverstanden.",
    "completeForm": "Bitte füllen Sie alle Felder aus.",
    "send": "Senden",
    "faq": [
      {
        "question": "Wie war das Wetter an einem bestimmten Tag in der Vergangenheit?",
        "answer": "Bitte sehen Sie davon ab, Meteostat bezüglich allgemeiner (historischer) Wetterinformationen zu kontaktieren. Alle Daten werden auf dieser Website kostenlos zur Verfügung gestellt. Wenn Sie Meteostat-Daten in einem bestimmten Format, einer bestimmten Aggregation oder Visualisierung benötigen, kontaktieren Sie uns bitte für ein unverbindliches Angebot."
      },
      {
        "question": "Warum enthalten manche Zeitreihen Zukunftsdaten?",
        "answer": "Meteostat ersetzt fehlende Beobachtungen standardmäßig durch Modelldaten. Die Modelldaten enthalten auch Wettervorhersagen, um die Benutzerfreundlichkeit bei der Arbeit mit Echtzeitdaten zu verbessern. Sie können Modelldaten jederzeit deaktivieren."
      },
      {
        "question": "Warum stimmen die stündlichen und täglichen Daten nicht immer überein?",
        "answer": "Da die täglichen Daten nicht notwendigerweise aus den stündlichen Daten von Meteostat aggregiert werden, kann es zu Inkonsistenzen (z. B. aufgrund unterschiedlicher Aggregationsmethoden) zwischen den verschiedenen Frequenzen kommen."
      },
      {
        "question": "Unter welcher Lizenz werden die Meteostat-Daten bereitgestellt?",
        "answer": "Die Meteostat-Daten werden unter den Bedingungen der CC BY-NC 4.0-Lizenz bereitgestellt."
      },
      {
        "question": "Ist Meteostat ein öffentlicher oder staatlicher Service?",
        "answer": "Meteostat ist kein öffentlicher oder staatlicher Service. Außerdem sind wir nicht mit Meteosat verbunden. Wir sammeln Daten von nationalen Wetterdiensten wie NOAA und DWD. Meteostat ist jedoch eine unabhängige Initiative, die auf Spenden, Sponsoring und andere Einnahmequellen angewiesen ist."
      }
    ]
  },
  "it": {
    "$meta": {
      "title": "Supporto",
      "description": "Bloccato con un problema? Ottieni supporto per tutto ciò che riguarda Meteostat."
    },
    "intro": "Hai domande, feedback o un'altra preoccupazione riguardo a Meteostat? Siamo qui per aiutarti.",
    "alertFailed": "Impossibile inviare il messaggio. Si prega di controllare se tutto è corretto.",
    "alertSuccess": "Abbiamo ricevuto il suo messaggio e la contatteremo presto.",
    "subject": "Oggetto",
    "email": "E-Mail",
    "message": "Messaggio",
    "alertPrivacy": "Contattando Meteostat accetti le nostre condizioni sulla privacy.",
    "completeForm": "Si prega di compilare tutti i campi.",
    "send": "Invia",
    "faq": [
      {
        "question": "Com'era il tempo in un certo giorno del passato?",
        "answer": "Si prega di evitare di contattare Meteostat per informazioni meteorologiche generali (storiche). Tutti i dati sono disponibili gratuitamente su questo sito. Se hai bisogno di dati Meteostat in un formato specifico, aggregazione o visualizzazione, contattaci per un'offerta non vincolante."
      },
      {
        "question": "Perché alcune serie temporali contengono dati futuri?",
        "answer": "Meteostat sostituisce le osservazioni mancanti con i dati del modello, per impostazione predefinita. I dati del modello includono anche le previsioni del tempo per migliorare l'esperienza dell'utente quando lavora con i dati in tempo reale. È sempre possibile rinunciare ai dati del modello."
      },
      {
        "question": "Perché i dati orari e giornalieri non sempre corrispondono?",
        "answer": "Poiché i dati giornalieri non sono necessariamente aggregati dai dati orari di Meteostat, si potrebbe verificare qualche incoerenza (ad esempio a causa di diversi metodi di aggregazione) tra le diverse frequenze. Questo è un comportamento atteso."
      },
      {
        "question": "Sotto quale licenza vengono distribuiti i dati Meteostat?",
        "answer": "I dati Meteostat sono distribuiti secondo i termini della licenza CC BY-NC 4.0."
      },
      {
        "question": "Meteostat è un servizio pubblico o governativo?",
        "answer": "Meteostat non è un servizio pubblico o governativo. Inoltre, non siamo associati a Meteosat. Raccogliamo dati dal servizio meteorologico nazionale come NOAA e DWD. Tuttavia, Meteostat è un'iniziativa indipendente che si basa su donazioni, sponsorizzazioni e altre fonti di reddito."
      }
    ]
  },
  "es": {
    "$meta": {
      "title": "Soporte",
      "description": "¿Atascado con un problema? Obtenga ayuda con todo lo que se refiere a Meteostat."
    },
    "intro": "¿Tiene preguntas, comentarios o alguna otra inquietud sobre Meteostat? Estamos aquí para ayudarle.",
    "alertFailed": "No se ha podido enviar el mensaje. Por favor, compruebe si todo es correcto.",
    "alertSuccess": "Hemos recibido su mensaje y nos pondremos en contacto con usted en breve.",
    "subject": "Asunto",
    "email": "E-Mail",
    "message": "Mensaje",
    "alertPrivacy": "Al ponerse en contacto con Meteostat, acepta nuestras condiciones de privacidad.",
    "completeForm": "Por favor, rellene todos los campos.",
    "send": "Enviar",
    "faq": [
      {
        "question": "¿Cómo era el tiempo en un día determinado en el pasado?",
        "answer": "Le rogamos que no se ponga en contacto con Meteostat para obtener información meteorológica general (histórica). Todos los datos están disponibles de forma gratuita en este sitio web. Si necesita datos de Meteostat en un formato específico, agregación o visualización, póngase en contacto con nosotros para una oferta no vinculante."
      },
      {
        "question": "¿Por qué algunas series temporales contienen datos futuros?",
        "answer": "Meteostat sustituye por defecto las observaciones que faltan por los datos del modelo. Los datos del modelo también incluyen previsiones meteorológicas para mejorar la experiencia del usuario cuando trabaja con datos en tiempo real. Siempre se puede optar por no utilizar los datos del modelo."
      },
      {
        "question": "¿Por qué los datos horarios y diarios no siempre coinciden?",
        "answer": "Dado que los datos diarios no se agregan necesariamente a partir de los datos horarios de Meteostat, es posible que se produzcan algunas incoherencias (por ejemplo, debido a los diferentes métodos de agregación) entre las distintas frecuencias. Este es un comportamiento esperado."
      },
      {
        "question": "¿Bajo qué licencia se distribuyen los datos de Meteostat?",
        "answer": "Los datos de Meteostat se distribuyen bajo los términos de la licencia CC BY-NC 4.0."
      },
      {
        "question": "¿Es Meteostat un servicio público o gubernamental?",
        "answer": "Meteostat no es un servicio público o gubernamental. Además, no estamos asociados a Meteosat. Recogemos datos de servicios meteorológicos nacionales como la NOAA y el DWD. Sin embargo, Meteostat es una iniciativa independiente que depende de donaciones, patrocinios y otras fuentes de ingresos."
      }
    ]
  },
  "nl": {
    "$meta": {
      "title": "Steun",
      "description": "Zit je vast met een probleem? Krijg ondersteuning bij alles wat Meteostat doet."
    },
    "intro": "Heeft u vragen, feedback of een andere zorg met betrekking tot Meteostat? Wij zijn er om u te helpen.",
    "alertFailed": "Mislukt om bericht te verzenden. Controleer of alles correct is.",
    "alertSuccess": "We hebben uw bericht ontvangen en zullen spoedig contact met u opnemen.",
    "subject": "Betreft",
    "email": "E-Mail",
    "message": "Bericht",
    "alertPrivacy": "Door contact op te nemen met Meteostat gaat u akkoord met onze privacy voorwaarden.",
    "completeForm": "Gelieve alle velden in te vullen.",
    "send": "Stuur",
    "faq": [
      {
        "question": "Hoe was het weer op een bepaalde dag in het verleden?",
        "answer": "Gelieve Meteostat niet te contacteren in verband met algemene (historische) weerinformatie. Alle gegevens worden gratis ter beschikking gesteld op deze website. Als u Meteostat-gegevens in een specifiek formaat, aggregatie of visualisatie nodig hebt, neem dan contact op voor een vrijblijvende offerte."
      },
      {
        "question": "Waarom bevatten sommige tijdreeksen toekomstige gegevens?",
        "answer": "Meteostat vervangt standaard ontbrekende waarnemingen door modelgegevens. Modelgegevens bevatten ook weersvoorspellingen om de gebruikerservaring te verbeteren bij het werken met real-time gegevens. U kunt zich altijd afmelden voor modelgegevens."
      },
      {
        "question": "Waarom komen uurlijkse en dagelijkse gegevens niet altijd overeen?",
        "answer": "Aangezien de dagelijkse gegevens niet noodzakelijk worden geaggregeerd uit de uurlijkse gegevens van Meteostat, kunt u enige inconsistentie ondervinden (bv. als gevolg van verschillende aggregatiemethoden) tussen de verschillende frequenties. Dit is verwacht gedrag."
      },
      {
        "question": "Onder welke licentie worden Meteostat-gegevens verspreid?",
        "answer": "Meteostat-gegevens worden verspreid onder de voorwaarden van de CC BY-NC 4.0 licentie."
      },
      {
        "question": "Is Meteostat een openbare of overheidsdienst?",
        "answer": "Meteostat is geen openbare of gouvernementele dienst. Bovendien zijn wij niet verbonden met Meteosat. Wij verzamelen gegevens van nationale weerdiensten zoals NOAA en DWD. Meteostat is echter een onafhankelijk initiatief dat afhankelijk is van donaties, sponsoring en andere bronnen van inkomsten."
      }
    ]
  },
  "fr": {
    "$meta": {
      "title": "Soutien",
      "description": "Vous avez un problème? Obtenez de l'aide pour tout ce qui concerne Meteostat."
    },
    "intro": "Vous avez des questions, des commentaires ou une autre préoccupation concernant Meteostat? Nous sommes là pour vous aider.",
    "alertFailed": "L'envoi du message a échoué. Veuillez vérifier si tout est correct.",
    "alertSuccess": "Nous avons reçu votre message et nous vous répondrons bientôt.",
    "subject": "Sujet",
    "email": "E-Mail",
    "message": "Message",
    "alertPrivacy": "En contactant Meteostat, vous acceptez nos conditions de confidentialité.",
    "completeForm": "Veuillez remplir tous les champs.",
    "send": "Envoyer",
    "faq": [
      {
        "question": "Quel temps faisait-il à un certain jour dans le passé?",
        "answer": "Veuillez vous abstenir de contacter Meteostat pour des informations météorologiques générales (historiques). Toutes les données sont mises à disposition gratuitement sur ce site web. Si vous avez besoin des données de Meteostat dans un format spécifique, d'une agrégation ou d'une visualisation, veuillez nous contacter pour une offre sans engagement."
      },
      {
        "question": "Pourquoi certaines séries chronologiques contiennent-elles des données futures?",
        "answer": "Par défaut, Meteostat remplace les observations manquantes par les données du modèle. Les données du modèle incluent également des prévisions météorologiques pour améliorer l'expérience utilisateur lorsqu'il travaille avec des données en temps réel. Vous pouvez toujours désactiver les données de modèle."
      },
      {
        "question": "Pourquoi les données horaires et quotidiennes ne correspondent-elles pas toujours?",
        "answer": "Comme les données quotidiennes ne sont pas nécessairement agrégées à partir des données horaires de Meteostat, il se peut que vous constatiez une certaine incohérence (par exemple, en raison des différentes méthodes d'agrégation) entre les différentes fréquences. Il s'agit d'un comportement attendu."
      },
      {
        "question": "Sous quelle licence les données de Meteostat sont-elles distribuées ?",
        "answer": "Les données de Meteostat sont distribuées selon les termes de la licence CC BY-NC 4.0."
      },
      {
        "question": "Meteostat est-il un service public ou gouvernemental?",
        "answer": "Meteostat n'est pas un service public ou gouvernemental. De plus, nous ne sommes pas associés à Meteosat. Nous collectons des données auprès des services météorologiques nationaux comme la NOAA et le DWD. Cependant, Meteostat est une initiative indépendante qui repose sur des dons, des parrainages et d'autres sources de revenus."
      }
    ]
  },
  "pt": {
    "$meta": {
      "title": "Apoio",
      "description": "Preso a um problema? Obter apoio com tudo Meteostat."
    },
    "intro": "Tem perguntas, feedback ou outra preocupação em relação ao Meteostat? Estamos aqui para ajudar.",
    "alertFailed": "Falha no envio de mensagem. Por favor, verifique se tudo está correcto.",
    "alertSuccess": "Recebemos a sua mensagem e entraremos em contacto consigo em breve.",
    "subject": "Assunto",
    "email": "E-Mail",
    "message": "Mensagem",
    "alertPrivacy": "Ao contactar o Meteostat está a concordar com os nossos termos de privacidade.",
    "completeForm": "Por favor, preencha todos os campos.",
    "send": "Enviar",
    "faq": [
      {
        "question": "Como era o tempo num determinado dia no passado?",
        "answer": "Por favor, não hesite em contactar o Meteostat em relação a informações meteorológicas gerais (históricas). Todos os dados são disponibilizados gratuitamente neste website. Se necessitar de dados Meteostat num formato específico, agregação ou visualização, por favor entre em contacto para uma oferta sem compromisso."
      },
      {
        "question": "Porque é que algumas séries cronológicas contêm dados futuros?",
        "answer": "O Meteostat substitui, por defeito, as observações em falta por dados de modelo. Os dados do modelo incluem também previsões meteorológicas para melhorar a experiência do utilizador quando se trabalha com dados em tempo real. É sempre possível optar por não incluir dados de modelo."
      },
      {
        "question": "Porque é que os dados horários e diários nem sempre coincidem?",
        "answer": "Como os dados diários não são necessariamente agregados a partir dos dados horários do Meteostat, pode haver alguma inconsistência (por exemplo, devido a diferentes métodos de agregação) entre as diferentes frequências. Este é o comportamento esperado."
      },
      {
        "question": "Sob que licença são distribuídos os dados do Meteostat?",
        "answer": "Os dados do Meteostat são distribuídos sob os termos da licença CC BY-NC 4.0."
      },
      {
        "question": "O Meteostat é um serviço público ou governamental?",
        "answer": "O Meteostat não é um serviço público ou governamental. Além disso, não estamos associados ao Meteosat. Recolhemos dados do serviço meteorológico nacional como NOAA e DWD. No entanto, o Meteostat é uma iniciativa independente que depende de doações, patrocínios e outras fontes de rendimento."
      }
    ]
  },
  "ru": {
    "$meta": {
      "title": "Поддержка",
      "description": "Застряли с проблемой? Получите поддержку по всем вопросам, связанным с Meteostat."
    },
    "intro": "У вас есть вопросы, отзывы или другая проблема, касающаяся Meteostat? Мы всегда готовы помочь.",
    "alertFailed": "Не удалось отправить сообщение. Пожалуйста, проверьте, все ли правильно.",
    "alertSuccess": "Мы получили ваше сообщение и свяжемся с вами в ближайшее время.",
    "subject": "Тема",
    "email": "E-Mail",
    "message": "Сообщение",
    "alertPrivacy": "Обращаясь в Meteostat, вы соглашаетесь с нашими условиями конфиденциальности.",
    "completeForm": "Пожалуйста, заполните все поля.",
    "send": "Отправить",
    "faq": [
      {
        "question": "Какая погода была в определенный день в прошлом?",
        "answer": "Пожалуйста, воздержитесь от обращения в Meteostat по поводу общей (исторической) информации о погоде. Все данные предоставляются на этом сайте бесплатно. Если вам нужны данные Meteostatа в определенном формате, агрегации или визуализации, пожалуйста, свяжитесь с нами для получения необязывающего предложения."
      },
      {
        "question": "Почему некоторые временные ряды содержат будущие данные?",
        "answer": "По умолчанию Meteostat заменяет отсутствующие наблюдения модельными данными. Модельные данные также включают прогнозы погоды для улучшения работы пользователя с данными в реальном времени. Вы всегда можете отказаться от использования модельных данных."
      },
      {
        "question": "Почему часовые и дневные данные не всегда совпадают?",
        "answer": "Поскольку ежедневные данные не обязательно агрегируются с часовыми данными Meteostat, вы можете столкнуться с некоторым несоответствием (например, из-за различных методов агрегирования) между различными частотами. Это ожидаемое поведение."
      },
      {
        "question": "Под какой лицензией распространяются данные Meteostat?",
        "answer": "Данные Meteostat распространяются на условиях лицензии CC BY-NC 4.0."
      },
      {
        "question": "Является ли Meteostat общественной или правительственной службой?",
        "answer": "Meteostat не является общественной или правительственной службой. Кроме того, мы не связаны с компанией Meteosat. Мы собираем данные из национальных метеорологических служб, таких как NOAA и DWD. Однако Meteostat - это независимая инициатива, которая полагается на пожертвования, спонсорство и другие источники дохода."
      }
    ]
  }
}
</i18n>
