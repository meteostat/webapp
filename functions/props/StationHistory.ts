import type { EdgeProps } from 'vitedge'

export default <EdgeProps>{
  async handler({ params }) {
    let station = null
    await fetch(`https://raw.githubusercontent.com/meteostat/weather-stations/master/stations/${params?.id}.json`)
      .then(response => response.json())
      .then(data => {
        station = data
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
