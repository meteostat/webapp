import type { EdgeProps } from 'vitedge'

export default <EdgeProps>{
  async handler() {
    return {
      data: {}
    }
  },
  options: {
    cache: {
      api: 60*60*24*14,
      html: 60*60*24*14
    },
  },
}
