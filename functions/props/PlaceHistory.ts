import type { EdgeProps } from 'vitedge'

export default <EdgeProps>{
  async handler({ params }) {
    let place = null
    await fetch(`https://api.meteostat.net/app/place?id=${params?.id}`)
      .then(response => response.json())
      .then(data => {
        place = data.data
      })
    return {
      data: {
        place: place,
      },
    }
  },
  options: {
    cache: {
      html: 0,
    },
  },
}
