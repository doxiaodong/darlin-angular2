// not use
export function checkDateFormat(date: Date): string {

  let now: Date = new Date()

  if (date.getFullYear() !== now.getFullYear()) {
    return 'y-MM-dd HH:mm'
  }

  if (date.getMonth() === now.getMonth() && date.getDate() === now.getDate()) {
    return 'HH:mm:ss'
  }

  return 'MM-dd HH:mm'
}
