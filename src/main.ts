import routes from './router';
import vitedge from 'vitedge';
import { installI18n, extractLocaleFromPath } from './i18n';
import { createPinia } from 'pinia';
import App from './App.vue';
import './style/default.scss';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faSearch,
  faEllipsisV,
  faCog,
  faCalendarAlt,
  faArrowUp,
  faArrowDown,
  faExclamationCircle,
  faPlay,
  faBackward,
  faForward,
  faExpand,
  faPause,
  faHeart,
  faUserFriends,
  faHandHoldingUsd,
  faCode,
  faCommentAlt,
  faMapMarkerAlt,
  faTrash,
  faDownload,
  faCircle,
  faQuestionCircle,
  faTable,
  faHotel,
  faPlaneDeparture,
  faCar,
  faSkating,
  faCopy,
  faCheck
} from '@fortawesome/free-solid-svg-icons';
import {
  faPatreon,
  faPaypal,
  faGithub,
  faLinkedin,
  faLinkedinIn,
  faTwitter,
  faFacebookF,
  faMedium,
  faBitcoin
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(
  faSearch,
  faEllipsisV,
  faCog,
  faCalendarAlt,
  faArrowUp,
  faArrowDown,
  faExclamationCircle,
  faPlay,
  faBackward,
  faForward,
  faExpand,
  faPause,
  faHeart,
  faUserFriends,
  faHandHoldingUsd,
  faCode,
  faCommentAlt,
  faMapMarkerAlt,
  faTrash,
  faDownload,
  faCircle,
  faQuestionCircle,
  faTable,
  faHotel,
  faPlaneDeparture,
  faCar,
  faSkating,
  faCopy,
  faCheck,
  faPatreon,
  faPaypal,
  faGithub,
  faLinkedin,
  faLinkedinIn,
  faTwitter,
  faFacebookF,
  faMedium,
  faBitcoin
);

const useBootstrap = async () => {
  const Collapse = await import('bootstrap/js/dist/collapse.js');
  const Offcanvas = await import('bootstrap/js/dist/offcanvas.js');
  const ScrollSpy = await import('bootstrap/js/dist/scrollspy.js');
  const Modal = await import('bootstrap/js/dist/modal.js');
  const Alert = await import('bootstrap/js/dist/alert.js');
  const Dropdown = await import('bootstrap/js/dist/dropdown.js');
  const Tooltip = await import('bootstrap/js/dist/tooltip.js');
  return {
    Offcanvas,
    ScrollSpy,
    Modal,
    Alert,
    Dropdown,
    Collapse,
    Tooltip
  };
};

const useChart = async () => {
  const {
    Chart,
    LineElement,
    PointElement,
    LineController,
    BarElement,
    BarController,
    RadarController,
    TimeScale,
    LinearScale,
    RadialLinearScale,
    CategoryScale,
    Filler,
    Tooltip,
    Legend
  } = await import('chart.js');

  // Import date adapter
  await import('chartjs-adapter-date-fns');

  // Register Chart.js components
  await Chart.register(
    LineElement,
    LineController,
    TimeScale,
    LinearScale,
    RadialLinearScale,
    CategoryScale,
    BarElement,
    PointElement,
    BarController,
    RadarController,
    Filler,
    Tooltip,
    Legend
  );

  return Chart;
};

declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $loading(uid: string): any;
    $loaded(uid?: string): any;
    $bs: any;
    $api: string;
  }
}

export default vitedge(
  App,
  {
    routes,
    base: ({ url }) => {
      const locale = extractLocaleFromPath(url.pathname);
      return `/${locale}/`;
    }
  },
  async (ctx) => {
    Object.values(import.meta.globEager('./modules/*.ts')).map((i) => i.install?.(ctx));

    const { app, router, initialRoute } = ctx;

    // Load language asyncrhonously to avoid bundling all languages
    const locale = extractLocaleFromPath(initialRoute.href);
    await installI18n(app, locale);
    app.config.globalProperties.$locale = locale;

    // API Base URL
    app.config.globalProperties.$api = 'https://d.meteostat.net' as string;

    // App state
    app.config.globalProperties.$state = {
      loading: []
    };

    // Pinia store
    app.use(createPinia());

    // FontAwesome Icons
    app.component('Icon', FontAwesomeIcon);

    // Browser only
    if (!import.meta.env.SSR) {
      app.config.globalProperties.$loading = (uid: string): void => {
        // Add loading class to body
        document.body.classList.add('loading');
        // Add uid to loading queue
        app.config.globalProperties.$state.loading.push(uid);
      };
      app.config.globalProperties.$loaded = (uid?: string): void => {
        // Remove uid from loading queue
        if (uid) {
          app.config.globalProperties.$state.loading = app.config.globalProperties.$state.loading.filter(
            (item: string): boolean => item !== uid
          );
        }
        // Remove loading class from body if queue is empty
        if (app.config.globalProperties.$state.loading.length === 0) {
          document.body.classList.remove('loading');
        }
      };
      // Set loading state before each route
      router.beforeEach(() => {
        // Set loading state
        app.config.globalProperties.$loading('router');
        // Reset page state
        (document?.activeElement as HTMLElement)?.blur();
        window.scrollTo(0, 0);
      });
      // Scroll to top after each navigation
      router.afterEach(async (to: Record<string, any>, from: Record<string, any>) => {
        // Remove loading state
        app.config.globalProperties.$loaded('router');
        // Exclude replace navigations
        if (
          to.fullPath === from.fullPath ||
          (to.name === 'Place' && !(to.query.s || to.query.t)) ||
          (to.name === 'Station' && !to.query.t)
        ) {
          return true;
        }
        // Track page view
        window._paq?.push(['setCustomUrl', location.pathname + location.search]);
        window._paq?.push(['setDocumentTitle', to.name]);
        window._paq?.push(['trackPageView']);
      });
      // Bootstrap
      app.config.globalProperties.$bs = await useBootstrap();
      // Chart.js
      app.config.globalProperties.$chart = await useChart();
      // DatePicker
      const { DatePicker } = await import('v-calendar');
      app.component('DatePicker', DatePicker);
    }
    // Tooltip directive
    app.directive('tooltip', (el: HTMLElement, binding: any) => {
      if (
        !import.meta.env.SSR &&
        binding?.value &&
        (typeof binding?.value === 'string' || typeof binding?.value?.title === 'string')
      ) {
        if (!app.config.globalProperties.$bs.Tooltip.default.getInstance(el)) {
          new app.config.globalProperties.$bs.Tooltip.default(
            el,
            typeof binding?.value === 'object'
              ? binding.value
              : {
                  title: binding.value
                }
          );
        }
      }
    });
  }
);
