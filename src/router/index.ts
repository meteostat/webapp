import Home from '../views/Home.vue'
import Station from '../views/Station.vue'
import Place from '../views/Place.vue'

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
    path: '/station/:id/analysis',
    name: 'StationAnalysis',
    component: Station
  },
  {
    path: '/place/:id',
    name: 'Place',
    component: Place
  }
]
