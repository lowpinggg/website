// features/events/utils/eventHelpers.ts
export const isEventPassed = (eventDate: string) => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const eventDateObj = new Date(eventDate)
  return eventDateObj < today
}