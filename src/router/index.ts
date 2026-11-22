import type { RouteRecordRaw } from 'vue-router';

/**
 * Resolve legacy placemark URLs (/place/:placemark) to /place/:country/:id
 */
async function resolveLegacyPlace(to: any) {
  try {
    const response = await fetch(`https://d.meteostat.net/app/place?placemark=${to.params.id}`);
    const { data } = await response.json();
    if (data?.id) {
      return { name: 'Place', params: { country: data.country.toLowerCase(), id: data.id }, replace: true };
    }
  } catch {
    // Fall through to 404
  }
  return { name: 'NotFound', params: { pathMatch: to.path.substring(1).split('/') }, replace: true };
}

const routes: RouteRecordRaw[] = [
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
    component: (): Promise<any> => import('~/views/Blog.vue')
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
    component: (): Promise<any> => import('~/views/NotFound.vue'),
    beforeEnter: resolveLegacyPlace
  },
  {
    path: '/station/:id/climate',
    name: 'StationClimate',
    redirect: (to) => ({ name: 'Station', params: { id: to.params.id } })
  },
  {
    path: '/place/:id/climate',
    name: 'PlaceClimate',
    redirect: (to) => ({ name: 'PlaceLegacy', params: { id: to.params.id } })
  },
  {
    path: '/donate',
    name: 'Donate',
    component: (): Promise<any> => import('~/views/Donate.vue')
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
    component: (): Promise<any> => import('~/views/Page.vue')
  },
  {
    path: '/privacy',
    name: 'Privacy',
    component: (): Promise<any> => import('~/views/Page.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: (): Promise<any> => import('~/views/NotFound.vue')
  }
];

export default routes;
