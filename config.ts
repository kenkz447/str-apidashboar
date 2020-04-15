export const API_URL = "http://192.168.4.117:1337";


export function getCookie() {
    var cookieArr = document.cookie.split(";");
    for(var i = 0; i < cookieArr.length; i++) {
        var cookiePair = cookieArr[i].split("=");
        if('auth' == cookiePair[0].trim()) {
            return decodeURIComponent(cookiePair[1]);
        }
    }
    return '';
}

