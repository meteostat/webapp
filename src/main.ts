import routes from './router'
import vitedge from 'vitedge'
import { installI18n, extractLocaleFromPath } from './i18n'
import { createPinia } from 'pinia'
import App from './App.vue'
import "./style/default.scss"
import { library } from "@fortawesome/fontawesome-svg-core"
import {
  faSearch,
  faEllipsisV,
  faCog,
  faCalendarAlt,
  faUmbrella,
  faTemperatureHigh,
  faListUl,
  faArrowUp,
  faArrowDown,
  faExclamationCircle,
  faPlay,
  faBackward,
  faForward,
  faExpand,
  faCompress,
  faPause,
  faHistory,
} from "@fortawesome/free-solid-svg-icons"
import { faPatreon, faPaypal, faGithub } from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"

library.add(
  faSearch,
  faEllipsisV,
  faCog,
  faCalendarAlt,
  faUmbrella,
  faTemperatureHigh,
  faListUl,
  faArrowUp,
  faArrowDown,
  faExclamationCircle,
  faPlay,
  faBackward,
  faForward,
  faExpand,
  faCompress,
  faPause,
  faHistory,
  faPatreon,
  faPaypal,
  faGithub
)

declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $loading(): any,
    $loaded(): any,
    $api: string
  }
}

export default vitedge(
  App,
  {
    routes,
    base: ({ url }) => {
      const locale = extractLocaleFromPath(url.pathname)
      return `/${locale}`
    }
  },
  async (ctx) => {
    Object.values(import.meta.globEager('./modules/*.ts')).map((i) =>
      i.install?.(ctx)
    )

    const { app, initialRoute } = ctx

    // Load language asyncrhonously to avoid bundling all languages
    const locale = extractLocaleFromPath(initialRoute.href)
    await installI18n(app, locale)
    app.config.globalProperties.$locale = locale

    // API Base URL
    app.config.globalProperties.$api = 'https://d.meteostat.net/app' as string

    // Pinia store
    app.use(createPinia())

    app.component('Icon', FontAwesomeIcon)

    if (!import.meta.env.SSR) {
      app.config.globalProperties.$loading = (): void => {
        document.body.classList.add('loading')
      }
      app.config.globalProperties.$loaded = (): void => {
        document.body.classList.remove('loading')
      }
      app.config.globalProperties.$bs = await import('bootstrap')
      const { DatePicker } = await import('v-calendar')
      app.component('DatePicker', DatePicker)
    }
  }
)
