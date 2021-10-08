import type { EdgeProps } from 'vitedge'

export default <EdgeProps>{
  async handler({ params }) {
    let place = null
    await fetch(`https://d.meteostat.net/app/place?id=${params?.id}`)
      .then(response => response.json())
      .then(data => {
        place = data.data
      })
    return {
      data: {
        status: place === null ? 404 : 200,
        place: place
      },
    }
  },
  options: {
    cache: {
      api: 60*60*24*14,
      html: 60*60*24*14
    },
  },
}
