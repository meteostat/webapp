export default {
  data() {
    return {
      debounceTimers: {}
    }
  },

  methods: {
    debounce(this: any, fn: Function, delay: number, uid: string) {
      if (typeof fn === 'function') {
        clearTimeout(this.debounceTimers[uid])
        this.debounceTimers[uid] = setTimeout(() => fn.bind(this)(), delay)
      }
    }
  }
}