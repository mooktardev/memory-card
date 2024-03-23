export default function convertSeconds (seconds) {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const remainingSeconds = seconds % 60
  
    const hourString = hours > 0 ? `${hours < 10 ? `0${hours}` : hours}` : '00'
    const minuteString = minutes > 0 ? `${minutes < 10 ? `0${minutes}` : minutes}` : '00'
    const secondString =
      remainingSeconds > 0 ? `${remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds}` : '00'
    return `${hourString}:${minuteString}:${secondString}`
  }