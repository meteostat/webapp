import type { EdgeProps } from 'vitedge'

export default <EdgeProps>{
  async handler({ params, href }) {
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
      let station = null
      await fetch(`https://d.meteostat.net/app/proxy/stations/meta?id=${params?.id}`)
        .then(response => response.json())
        .then(data => {
          station = data.data
        })
      return {
        data: {
          station: station,
        },
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
