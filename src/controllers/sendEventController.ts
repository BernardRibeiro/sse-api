import { EventService } from './../entities'

const SendEventController = (request, response): void => {
  const { user, message } = request.body

  EventService.sendMessage(user, message)

  response.json({ success: true })
}

export { SendEventController }
