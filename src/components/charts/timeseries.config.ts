import { parseISO, intervalToDuration } from 'date-fns'

// Tooltips
const tsTooltips = {
  mode: 'index',
  intersect: false,
  callbacks: {
    label: (ctx: any): string|null => {
      return ctx.raw !== null ? `${ctx.formattedValue} ${ctx.chart.options.scales.y.title.text}` : null
    }
  }
}

// Point radius
const tsPointRadius = (data: Array<string|number|null>): Array<number> => {
  const count = data.filter((v: string|number|null) => v !== null).length
  return data.map((v: string|number|null, i: number) => {
    let r = 0
    if (count < 32) {
      r = 4
    } else if (
      i === 0 ||
      i === data.length - 1 ||
      data[i - 1] === null ||
      data[i + 1] === null
    ) {
      r = 3
    }
    return r
  })
}

// Scales
const tsScales = (labels: Array<string>, scaleLabel: string): any => {
  // Date range
  const start = parseISO(labels[0])
  const end = parseISO(labels[labels.length - 1])
  const days = intervalToDuration({
    start: start,
    end: end
  }).days || 1
  // Return scale configuration
  return {
    x: {
      type: 'time',
      offset: false,
      time: {
        unit: days < 2 ? 'hour' : 'day',
        stepSize: days < 2 ? 4 : 1,
        tooltipFormat: 'MMM d, yyyy - HH:mm'
      },
      ticks: {
        autoSkip: true,
        maxTicksLimit: 12,
        padding: 16
      },
    },
    y: {
      title: {
        text: scaleLabel
      }
    }
  }
}

export { tsTooltips, tsPointRadius, tsScales }