import type { EdgeProps } from 'vitedge'

export default <EdgeProps>{
  async handler({ href }) {
    let insights: Array<Record<string, string>> = []
    if (href) {
      const locale = href.split('/')[1]
      await fetch(`https://d.meteostat.net/cms/insights/latest?lang=${locale}&limit=9`)
      .then(response => response.json())
      .then(data => {
        insights = data.data
      })
    }
    return {
      data: {
        insights
      },
    }
  },
  options: {
    cache: {
      api: 60*60*3,
      html: 60*60*24*14
    },
  },
}
