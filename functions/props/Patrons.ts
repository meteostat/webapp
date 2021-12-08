import type { EdgeProps } from 'vitedge'

export default <EdgeProps>{
  async handler({ href }) {
    // Remove trailing slash
    if (href.endsWith('/')) {
      return {
        status: 301,
        headers: {
          location: href.slice(0, -1)
        }
      }
    }
    // Fetch meta data
    else {
      return {
        data: {}
      }
    }
  },
  options: {
    cache: {
      api: 60*60*24*14,
      html: 60*60*24*14
    },
  },
}
