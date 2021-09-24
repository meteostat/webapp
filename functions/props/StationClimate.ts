import type { EdgeProps } from 'vitedge'

export default <EdgeProps>{
  async handler({ params }) {
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
  },
  options: {
    cache: {
      html: 0,
    },
  },
}
