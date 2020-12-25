function getCookie(cname, str) {
    if (str === void 0) { str = ""; }
    var name = cname + "=";
    var ca = str.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

module.exports = {
    getCookie: getCookie
};