import { handleEvent } from 'vitedge/worker'

addEventListener('fetch', (event) => {
  try {
    event.respondWith(
      handleEvent(event, {
        http2ServerPush: {
          destinations: [],
        },
        willRequestApi({ url, query }) {
          console.log('API:', url.pathname, query)
        },
      })
    )
  } catch (error) {
    event.respondWith(
      new Response(error.toString(), {
        status: 500
      })
    )
  }
})
