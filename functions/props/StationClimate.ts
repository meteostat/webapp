import type { EdgeProps } from 'vitedge'

export default <EdgeProps>{
  async handler({ href }) {
    return {
      status: 301,
      headers: {
        location: href.endsWith('/') ? href.slice(0, -9) : href.slice(0, -8)
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
