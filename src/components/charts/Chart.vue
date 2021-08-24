<template>
  <canvas
    ref="chart"
    class="chart"
  />
</template>

<script lang="js">
import ColorStripePlugin from './ColorStripe.plugin.ts'

export default {
  name: 'Chart',

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
      loading: false
    }
  },

  watch: {
    async data() {
      if (!this.loading) {
        this.loading = true
        this.createChart()
      }
    }
  },

  mounted() {
    this.createChart()
  },

  methods: {
    async createChart() {
      if (!import.meta.env.SSR) {
        // Import Chart.js
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
        } = await import('chart.js')

        // Import date adapter
        await import('chartjs-adapter-date-fns')

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
        )

        // Mobile device?
        const isMobile = !import.meta.env.SSR ? window.matchMedia('(max-width: 768px)').matches : false

        // Defaults
        Chart.defaults.aspectRatio = isMobile ? 1.5 : 2
        Chart.defaults.scale.title.display = isMobile ? false : true
        Chart.defaults.plugins.legend.position = 'bottom'
        Chart.defaults.plugins.legend.align = 'end'
        Chart.defaults.plugins.legend.labels.boxWidth = 20

        // Register plugins
        Chart.register(ColorStripePlugin);

        // Get canvas
        let ctx = this.$refs.chart

        // Chart options
        const options = {
          animation: {
            onComplete: () => {
              this.loading = false
            }
          },
          ...this.options,
        }

        // Destroy chart if exists
        if (this.instance) {
          await this.instance.destroy()
        }

        // Create chart
        this.instance = new Chart(ctx, {
          type: this.type,
          data: this.data,
          options
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.chart {
  width: 100%;
  max-height: 428px;
}
</style>