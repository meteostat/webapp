import type { EdgeProps } from 'vitedge'

export default <EdgeProps>{
  async handler({ name, params, href }) {
    let date: string|null = null
    let topic: string|null = null
    let author: string|null = null
    let cover: string|null = null
    let teaser: string|null = null
    let title: string|null = null
    let body: string|null = null
    if (name && params && href) {
      const locale = href.split('/')[1]
      await fetch(
        `https://d.meteostat.net/cms/insights/single?lang=${locale}&year=${params.year}&month=${params.month}&slug=${params.slug}`
      )
      .then(response => response.json())
      .then(data => {
        date = data.data.date
        topic = data.data.topic
        author = data.data.author
        cover = data.data.cover
        teaser = data.data.teaser
        title = data.data.title
        body = data.data.body
      })
    }
    return {
      data: {
        date,
        topic,
        author,
        cover,
        teaser,
        title,
        body
      },
    }
  },
  options: {
    cache: {
      html: 0,
    },
  },
}
