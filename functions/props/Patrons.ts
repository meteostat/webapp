import type { EdgeProps } from 'vitedge'

export default <EdgeProps>{
  async handler() {
    return {
      data: {}
    }
  },
  options: {
    cache: {
      html: 0,
    },
  },
}
