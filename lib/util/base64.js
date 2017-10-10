/**
 * 
 * @file Function to convert Int32Array to Base64 for SHA1 digest
 * @author Box
 */

/**
 * Converts Int32Array to Base64. Adapted from https://jsperf.com/int32array-to-base64.
 *
 * @param {Int32Array} numArray - Int32Array to convert
 * @return {string}
 */
export default function (numArray) {
    var bytes = '';

    for (var i = 0; i < numArray.length; i += 1) {
        var v = numArray[i];
        bytes += String.fromCharCode(v & 0xff, v >> 8 & 0xff, v >> 16 & 0xff, v >> 24 & 0xff);
    }

    return btoa(bytes);
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJhc2U2NC5qcyJdLCJuYW1lcyI6WyJudW1BcnJheSIsImJ5dGVzIiwiaSIsImxlbmd0aCIsInYiLCJTdHJpbmciLCJmcm9tQ2hhckNvZGUiLCJidG9hIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0FBTUE7Ozs7OztBQU9BLGVBQWUsVUFBU0EsUUFBVCxFQUF1QztBQUNsRCxRQUFJQyxRQUFRLEVBQVo7O0FBRUEsU0FBSyxJQUFJQyxJQUFJLENBQWIsRUFBZ0JBLElBQUlGLFNBQVNHLE1BQTdCLEVBQXFDRCxLQUFLLENBQTFDLEVBQTZDO0FBQ3pDLFlBQU1FLElBQUlKLFNBQVNFLENBQVQsQ0FBVjtBQUNBRCxpQkFBU0ksT0FBT0MsWUFBUCxDQUFvQkYsSUFBSSxJQUF4QixFQUErQkEsS0FBSyxDQUFOLEdBQVcsSUFBekMsRUFBZ0RBLEtBQUssRUFBTixHQUFZLElBQTNELEVBQWtFQSxLQUFLLEVBQU4sR0FBWSxJQUE3RSxDQUFUO0FBQ0g7O0FBRUQsV0FBT0csS0FBS04sS0FBTCxDQUFQO0FBQ0giLCJmaWxlIjoiYmFzZTY0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIEBmbG93XHJcbiAqIEBmaWxlIEZ1bmN0aW9uIHRvIGNvbnZlcnQgSW50MzJBcnJheSB0byBCYXNlNjQgZm9yIFNIQTEgZGlnZXN0XHJcbiAqIEBhdXRob3IgQm94XHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIENvbnZlcnRzIEludDMyQXJyYXkgdG8gQmFzZTY0LiBBZGFwdGVkIGZyb20gaHR0cHM6Ly9qc3BlcmYuY29tL2ludDMyYXJyYXktdG8tYmFzZTY0LlxyXG4gKlxyXG4gKiBAcGFyYW0ge0ludDMyQXJyYXl9IG51bUFycmF5IC0gSW50MzJBcnJheSB0byBjb252ZXJ0XHJcbiAqIEByZXR1cm4ge3N0cmluZ31cclxuICovXHJcbi8qIGVzbGludC1kaXNhYmxlIG5vLWJpdHdpc2UgKi9cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24obnVtQXJyYXk6IEludDMyQXJyYXkpOiBzdHJpbmcge1xyXG4gICAgbGV0IGJ5dGVzID0gJyc7XHJcblxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBudW1BcnJheS5sZW5ndGg7IGkgKz0gMSkge1xyXG4gICAgICAgIGNvbnN0IHYgPSBudW1BcnJheVtpXTtcclxuICAgICAgICBieXRlcyArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKHYgJiAweGZmLCAodiA+PiA4KSAmIDB4ZmYsICh2ID4+IDE2KSAmIDB4ZmYsICh2ID4+IDI0KSAmIDB4ZmYpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBidG9hKGJ5dGVzKTtcclxufVxyXG4iXX0=