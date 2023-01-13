function checkTime(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}
function startTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    // add a zero in front of numbers<10
    m = checkTime(m);
    s = checkTime(s);
    return h + ":" + m + ":" + s;
}
function formatDate() {
    var d = new Date(), month = '' + (d.getMonth() + 1), day = '' + d.getDate(), year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-') + ' ' + startTime()
}

module.exports = {
    formatDate
}