import Home from '~/views/Home.vue'
import Station from '~/views/Station.vue'
import Place from '~/views/Place.vue'
import Contributors from '~/views/Contributors.vue'

export default [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/station/:id',
    name: 'StationHistory',
    component: Station
  },
  {
    path: '/station/:id/climate',
    name: 'StationClimate',
    component: Station
  },
  {
    path: '/place/:id',
    name: 'PlaceHistory',
    component: Place
  },
  {
    path: '/place/:id/climate',
    name: 'PlaceClimate',
    component: Place
  },
  {
    path: '/contributors',
    name: 'Contributors',
    component: Contributors
  }
]
