/**
 * 
 * @file Simple data and time utilities
 * @author Box
 */

/**
 * Gets the date in simple format
 *
 * @param {Object} date object
 * @param {string|void} [todayString] today
 * @param {string|void} [yesterdayString] yesterday
 * @return {string} date in words
 */
export function getDate(date, todayString, yesterdayString) {
    var today = new Date();
    var yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    var then = new Date(date);
    var isToday = today.toDateString() === then.toDateString();
    var isYesterday = yesterday.toDateString() === then.toDateString();

    if (isToday && !!todayString) {
        return todayString;
    } else if (isYesterday && !!yesterdayString) {
        return yesterdayString;
    }
    return then.toDateString();
}

/**
 * Gets the date time in simple format
 *
 * @param {Object} date object
 * @param {string|void} [todayString] today
 * @param {string|void} [yesterdayString] yesterday
 * @return {string} date in words
 */
export function getDateTime(date, todayString, yesterdayString) {
    var dateString = getDate(date, todayString, yesterdayString);
    var d = new Date(date);
    return dateString + ', ' + d.toLocaleTimeString();
}

/**
 * Formats a number of seconds as a time string
 *
 * @param {number} seconds - seconds
 * @return {string} A string formatted like 3:57:35
 */
export function formatTime(seconds) {
    var h = Math.floor(seconds / 3600);
    var m = Math.floor(seconds % 3600 / 60);
    var s = Math.floor(seconds % 3600 % 60);
    var hour = h > 0 ? h.toString() + ':' : '';
    var sec = s < 10 ? '0' + s.toString() : s.toString();
    var min = m.toString();
    if (h > 0 && m < 10) {
        min = '0' + min;
    }
    return '' + hour + min + ':' + sec;
}