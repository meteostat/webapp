import { Chart, Plugin } from 'chart.js'
import { toCelsius, toMillimeters, toKMH } from '../../utils/units'

export default {
  id: 'colorStripe',

  beforeDatasetsDraw: (chart: Chart): void => {
    if (chart.options?.plugins?.colorStripe?.scale) {
      const chartArea = chart.chartArea
      const ctx = chart.ctx
      const w = chartArea.right - chartArea.left
      const h = chartArea.bottom - chartArea.top
      const rectWidth = w / chart.data.labels.length
      const stripeScale = chart.config.options.plugins.colorStripe.scale
      
      const datasets = chart.data.datasets
      
      for (let i = 0; i < datasets[0].data.length; i++) {
        let exists = false
        const model = chart._metasets[0].data[i]
        datasets.forEach((dataset) => {
          if (dataset.data[i] !== null) {
            exists = true
          }
        })
        ctx.beginPath()
        ctx.rect(
          i > 0 ? model.x - rectWidth / 2 : model.x,
          h + 22,
          i > 0 && i !== datasets[0].data.length - 1 ? rectWidth : rectWidth / 2,
          5
        )
        if(!exists) {
          ctx.fillStyle = '#ffffff'
        }
        else {
          // Convert value to metric if necessary
          const scaleLabel = chart.options.scales.y.title.text
          let value = datasets[0].data[i]
          if (scaleLabel === '°F') {
            value = toCelsius(value)
          }
          else if (scaleLabel === 'in') {
            value = toMillimeters(value)
          }
          else if (scaleLabel === 'mph') {
            value = toKMH(value)
          }
          // Get color
          ctx.fillStyle = stripeScale.getColor(value)
        }
        ctx.fill()
      }
    }
  }
} as Plugin