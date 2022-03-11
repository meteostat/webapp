import type { EdgeProps } from 'vitedge'

export default <EdgeProps>{
  async handler({ params, href }) {
    const locale = href.split('/')[1]
    let place: any = null
    await fetch(`https://d.meteostat.net/app/place?placemark=${params?.id}`)
      .then(response => response.json())
      .then(data => {
        place = data.data
      })
    return {
      status: 301,
      headers: {
        location: `https://meteostat.net/${locale}/place/${place?.country?.toLowerCase()}/${place?.id}`
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
