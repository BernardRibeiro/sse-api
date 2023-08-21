import { EventService } from './../entities'

const EventController = (request, response): void => {
  const headers = {
    'Content-Type': 'text/event-stream',
    Connection: 'keep-alive',
    'Cache-Control': 'no-cache'
  }

  // Para suportar CORS (Cross-Origin Resource Sharing) basta incluir um argumento opcional ao instanciar o objeto`EventSource`:
  // var es = new EventSource('api/events', {
  //   withCredentials: true
  // });

  // `data`: texto que se quer retornar. Quando for retornado, vai acionar o evento `onMessage` que foi definido no cliente. Esse texto pode ser qualquer tipo de dado em formato texto: uma `string`, numeros, JSON, XML, etc.
  // `retry`: especifica o intervalo entre tentativas de reconexão em caso de erros. Informado em millisegundos. O navegador tenta reconectar automaticamente respeitando esse valor.
  // `id”:` Identificação única usado para definir a sequência dos eventos. Ao informar um `id`, o navegador sabe qual foi o ultimo evento disparado, e automaticamente envia um header `Last-Event-Id` na tentativa de reconexão. O servidor pode usar este header para saber quais dados deve enviar para o cliente (por exemplo, em qual ponto do feed estava).
  // `event`: usado para criar eventos personalizados.

  response.writeHead(200, headers)

  const { user } = request.query

  const data = `data: ${JSON.stringify({ name: Event.name })}\n\n`

  response.write(data)

  const subscriber = {
    id: user,
    response
  }

  EventService.addSubscriber(subscriber)

  request.on('close', () => {
    console.log(`${user} Connection closed`)

    EventService.removeSubscribe(user)
  })
}

export { EventController }
