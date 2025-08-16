export default function getTime(): string {
    const dateObj = new Date();

    const hours = dateObj.getHours().toString().length == 1 ? `0${dateObj.getHours()}` : dateObj.getHours()
    const minutes = dateObj.getMinutes().toString().length == 1 ? `0${dateObj.getMinutes()}` : dateObj.getMinutes()

    const time = `${hours}:${minutes}`
    
    return time;
}