import type { EdgeProps } from 'vitedge'

export default <EdgeProps>{
  async handler({ name, href }) {
    // Remove trailing slash
    if (href.endsWith('/')) {
      return {
        status: 301,
        headers: {
          location: href.slice(0, -1)
        }
      }
    }
    // Fetch page data
    else {
      let page: Record<string, string> = {}
      if (name && href) {
        const locale = href.split('/')[1]
        await fetch(`https://d.meteostat.net/cms/pages/page?lang=${locale}&slug=${name.toLowerCase()}`)
        .then(response => response.json())
        .then(data => {
          page = data.data
        })
      }
      return {
        data: {
          page: {
            ...page,
            body: encodeURIComponent(page.body)
          }
        },
      }
    }
  },
  options: {
    cache: {
      api: 60*60*24*7,
      html: 60*60*24*14
    },
  },
}
