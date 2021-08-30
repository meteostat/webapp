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
  faHeart
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
  faHeart,
  faPatreon,
  faPaypal,
  faGithub
)

declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $loading(uid: string): any,
    $loaded(uid: string): any,
    $bs: any,
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

    // App state
    app.config.globalProperties.$state = {
      loading: []
    }

    // Pinia store
    app.use(createPinia())

    // FontAwesome Icons
    app.component('Icon', FontAwesomeIcon)

    // Browser only
    if (!import.meta.env.SSR) {
      app.config.globalProperties.$loading = (uid: string): void => {
        // Add loading class to body
        document.body.classList.add('loading')
        // Add uid to loading queue
        app.config.globalProperties.$state.loading.push(uid)
      }
      app.config.globalProperties.$loaded = (uid: string): void => {
        // Remove uid from loading queue
        app.config.globalProperties.$state.loading = app.config.globalProperties.$state.loading.filter((item: string): boolean => item !== uid)
        // Remove loading class from body if queue is empty
        if (app.config.globalProperties.$state.loading.length === 0) {
          document.body.classList.remove('loading')
        }
      }
      app.config.globalProperties.$bs = await import('bootstrap')
      const { DatePicker } = await import('v-calendar')
      app.component('DatePicker', DatePicker)
    }
  }
)
