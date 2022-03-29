<template>
  <canvas ref="chart" class="chart" />
</template>

<script lang="js">
import { defineComponent } from 'vue'
import DebounceMixin from '../Debounce.mixin.ts'
import ColorStripePlugin from './ColorStripe.plugin.ts'

export default defineComponent({
  name: 'Chart',

  mixins: [DebounceMixin],

  props: {
    type: {
      type: String,
      required: true
    },
    data: {
      type: Object,
      required: true
    },
    options: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },

  data() {
    return {
      loading: false,
      instance: null
    }
  },

  watch: {
    async data() {
      if (!this.loading && !import.meta.env.SSR) {
        this.createChart()
      }
    }
  },

  async mounted() {
    this.$chart.defaults.plugins.legend.position = 'bottom'
    this.$chart.defaults.plugins.legend.align = 'end'
    this.$chart.defaults.plugins.legend.labels.boxWidth = 20
    // Register plugins
    this.$chart.register(ColorStripePlugin);
    // Create chart
    await this.createChart()
    // Update on resize
    window.addEventListener('resize', () => {
      this.debounce(this.createChart, 500, `chart-${this.instance?.id}`)
    });
  },

  methods: {
    async createChart() {
      // Start loading
      this.loading = true
      // Mobile device?
      const isMobile = window.matchMedia('(max-width: 768px)').matches;
      // Chart defaults
      this.$chart.defaults.aspectRatio = isMobile ? 1.5 : 2
      this.$chart.defaults.scale.title.display = isMobile ? false : true
      // Get canvas
      let ctx = this.$refs.chart
      // Chart options
      const options = {
        animation: false,
        ...this.options,
      }
      // Destroy chart if exists
      if (this.instance) {
        await this.instance.destroy()
      }
      // Create chart
      this.instance = new this.$chart(ctx, {
        type: this.type,
        data: this.data,
        options
      })
      // Finish loading
      this.loading = false
    }
  }
})
</script>

<style lang="scss" scoped>
.chart {
  width: 100%;
  max-height: 428px;
}
</style>
