import { defineStore } from 'pinia'

// Get state from localStorage
let state: Record<string, string|boolean> = {}
if (typeof window !== 'undefined') {
  const settings = window.localStorage.getItem('settings')
  state = settings ? JSON.parse(settings) : {}
}

// Define store
export const useSettingsStore = defineStore({
  id: 'settings',
  state: () => ({
    returning: false,
    imperial: false,
    model: true,
    timezone: true,
    personalizedAds: false,
    dismiss: {
      guide: {}
    },
    ...state
  }),
  getters: {
    units(state) {
      if (state.imperial === false) {
        return {
          temp: '°C',
          prcp: 'mm',
          wspd: 'km/h'
        }
      } else {
        return {
          temp: '°F',
          prcp: 'in',
          wspd: 'mph'
        }        
      }
    },
    unitPrecision(state) {
      if (state.imperial === false) {
        return {
          prcp: 1
        }
      } else {
        return {
          prcp: 3
        }        
      }      
    }
  }
})