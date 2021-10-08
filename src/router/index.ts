export default [
  {
    path: '',
    name: 'Home',
    component: (): Promise<any> => import('~/views/Home.vue')
  },
  {
    path: '/station/:id',
    name: 'StationHistory',
    component: (): Promise<any> => import('~/views/Station.vue')
  },
  {
    path: '/station/:id/climate',
    name: 'StationClimate',
    component: (): Promise<any> => import('~/views/Station.vue')
  },
  {
    path: '/place/:id',
    name: 'PlaceHistory',
    component: (): Promise<any> => import('~/views/Place.vue')
  },
  {
    path: '/place/:id/climate',
    name: 'PlaceClimate',
    component: (): Promise<any> => import('~/views/Place.vue')
  },
  {
    path: '/insights',
    name: 'Insights',
    component: (): Promise<any> => import('~/views/Insights.vue')
  },
  {
    path: '/insights/:year/:month/:slug',
    name: 'Insight',
    component: (): Promise<any> => import('~/views/Insight.vue')
  },
  {
    path: '/patrons',
    name: 'Patrons',
    component: (): Promise<any> => import('~/views/Patrons.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: (): Promise<any> => import('~/views/About.vue')
  },
  {
    path: '/support',
    name: 'Support',
    component: (): Promise<any> => import('~/views/Support.vue')
  },
  {
    path: '/legal',
    name: 'Legal',
    component: (): Promise<any> => import('~/views/Page.vue'),
    meta: {
      propsGetter: 'Page'
    }
  },
  {
    path: '/privacy',
    name: 'Privacy',
    component: (): Promise<any> => import('~/views/Page.vue'),
    meta: {
      propsGetter: 'Page'
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: (): Promise<any> => import('~/views/NotFound.vue')
  }
]
