export default [
  {
    path: '',
    name: 'Home',
    component: (): Promise<any> => import('~/views/Home.vue')
  },
  {
    path: '/blog',
    name: 'Blog',
    component: (): Promise<any> => import('~/views/Blog.vue')
  },
  {
    path: '/blog/tag/:tag',
    name: 'BlogTag',
    component: (): Promise<any> => import('~/views/Blog.vue'),
    meta: {
      propsGetter: 'Blog'
    }
  },
  {
    path: '/blog/:slug',
    name: 'BlogPost',
    component: (): Promise<any> => import('~/views/BlogPost.vue')
  },
  {
    path: '/station/:id',
    name: 'Station',
    component: (): Promise<any> => import('~/views/Station.vue')
  },
  {
    path: '/place/:country/:id',
    name: 'Place',
    component: (): Promise<any> => import('~/views/Place.vue')
  },
  {
    path: '/place/:id',
    name: 'PlaceLegacy',
    component: (): Promise<any> => import('~/views/Place.vue')
  },
  {
    path: '/station/:id/climate',
    name: 'StationClimate',
    component: (): Promise<any> => import('~/views/NotFound.vue')
  },
  {
    path: '/place/:id/climate',
    name: 'PlaceClimate',
    component: (): Promise<any> => import('~/views/NotFound.vue')
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
];
