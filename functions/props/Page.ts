import type { EdgeProps } from 'vitedge'

export default <EdgeProps>{
  async handler({ name, href }) {
    let updated: string|null = null
    let title: string|null = null
    let body: string|null = null
    if (name && href) {
      const locale = href.split('/')[1]
      await fetch(`https://d.meteostat.net/cms/pages/page?lang=${locale}&slug=${name.toLowerCase()}`)
      .then(response => response.json())
      .then(data => {
        updated = data.data.updated
        title = data.data.title
        body = data.data.body
      })
    }
    return {
      data: {
        updated,
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
