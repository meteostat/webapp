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

      let post: Record<string, string> = {}
      await fetch(`https://d.meteostat.net/cms/blog/post?lang=${locale}&slug=${params.slug}`)
        .then(response => response.json())
        .then(data => {
          post = data.data
        })

      return {
        data: {
          status: post.slug ? 200 : 404,
          _post: post
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
