import type { EdgeProps } from 'vitedge'

export default <EdgeProps>{
  async handler({ href, params }) {
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
      const locale = href.split('/')[1]
      let endpoint = 'https://d.meteostat.net/cms/blog/'
      if (params?.tag) {
        endpoint += `tag?tag="${params.tag}&limit=9`
      } else {
        endpoint += 'latest?limit=9'
      }
      endpoint += `&lang=${locale}`

      let posts: Array<Record<string, string>> = []
      let tag: Record<string, string> = {}
      await fetch(endpoint)
        .then(response => response.json())
        .then(data => {
          posts = data.data
          if (params?.tag) {
            tag = data.meta.tag
          }
        })
      return {
        data: {
          _posts: posts,
          _tag: tag
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
