let eventService: EventService

class EventService {
  subscribers: any[] = []

  addSubscriber (userIdentify): void {
    this.subscribers.push(userIdentify)
  }

  removeSubscribe (userIdentify): void {
    this.subscribers = this.subscribers.filter(sub => sub.id !== userIdentify)
  }

  sendMessage (userIdentify, message): void {
    if (userIdentify) {
      const subscriber = this.subscribers.find(item => item.id === userIdentify)

      if (subscriber) {
        subscriber.response.write(`data: ${JSON.stringify(message)}\n\n`)
      }
    } else {
      this.subscribers.forEach(subscriber => subscriber.response.write(`data: ${JSON.stringify(message)}\n\n`))
    }
  }
}

const createEventService = (): void => {
  if (!eventService) {
    eventService = new EventService()
  }
}

createEventService()

export { eventService as EventService }
