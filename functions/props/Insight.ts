import type { EdgeProps } from 'vitedge'

export default <EdgeProps>{
  async handler({ name, params, href }) {
    let insight: Record<string, string> = {}
    if (name && params && href) {
      const locale = href.split('/')[1]
      await fetch(
        `https://d.meteostat.net/cms/insights/single?lang=${locale}&year=${params.year}&month=${params.month}&slug=${params.slug}`
      )
      .then(response => response.json())
      .then(data => {
        insight = data.data
      })
    }
    return {
      data: {
        insight: {
          ...insight,
          body: encodeURIComponent(insight.body)
        }
      },
    }
  },
  options: {
    cache: {
      api: 60*60*24,
      html: 60*60*24*14
    },
  },
}
