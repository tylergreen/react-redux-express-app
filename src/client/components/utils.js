export function time_display_string(milliseconds){
    var count = milliseconds
    var seconds = Math.floor(count / 1000.0) % 60
    var minutes = Math.floor(count / 60000.0) % 60
    var hours = Math.floor(count / 3600000.0) % 60
    
    hours = ("0" + hours).slice(-2)
    minutes = ("0" + minutes).slice(-2)
    seconds = ("0" + seconds).slice(-2)
    
    return `${hours}:${minutes}:${seconds}`
}
