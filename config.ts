export const API_URL = "http://192.168.4.117:1337";

export const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
export const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

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

