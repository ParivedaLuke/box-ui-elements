/**
 * 
 * @file File for some simple dom utilities
 * @author Box
 */

import { CLASS_CHECKBOX_SPAN, CLASS_BUTTON_CONTENT_SPAN } from '../constants';

/**
 * Checks if an html element is some type of input-able
 * element or text area type where characters can be typed.
 *
 * @param {HTMLElement|null} element - the dom element to check
 * @return {boolean} true if its one of the above elements
 */
export function isInputElement(element) {
    if (!element || !(element instanceof HTMLElement)) {
        return false;
    }
    var tag = element.tagName.toLowerCase();
    return tag === 'input' || tag === 'select' || tag === 'textarea';
}

/**
 * Checks if an html element is some kind of element
 * that the user would want to keep their focus on.
 *
 * @param {HTMLElement|null} element - the dom element to check
 * @return {boolean} true if its one of the above elements
 */
export function isFocusableElement(element) {
    if (!element || !(element instanceof HTMLElement)) {
        return false;
    }
    var tag = element.tagName.toLowerCase();
    return isInputElement(element) || tag === 'button' || tag === 'a' || tag === 'option' || element.classList.contains(CLASS_CHECKBOX_SPAN) || element.classList.contains(CLASS_BUTTON_CONTENT_SPAN);
}

/**
 * Focuses a DOM element if it exists.
 *
 * @param {HTMLElement} root - the root dom element to search
 * @param {string} selector - the query selector
 * @param {boolean|void} [focusRoot] - if root should be focused
 * @return {void}
 */
export function focus(root, selector) {
    var focusRoot = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

    if (!root || !selector) {
        return;
    }
    var element = root.querySelector(selector);
    if (element && typeof element.focus === 'function') {
        element.focus();
    } else if (focusRoot) {
        root.focus();
    }
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRvbS5qcyJdLCJuYW1lcyI6WyJDTEFTU19DSEVDS0JPWF9TUEFOIiwiQ0xBU1NfQlVUVE9OX0NPTlRFTlRfU1BBTiIsImlzSW5wdXRFbGVtZW50IiwiZWxlbWVudCIsIkhUTUxFbGVtZW50IiwidGFnIiwidGFnTmFtZSIsInRvTG93ZXJDYXNlIiwiaXNGb2N1c2FibGVFbGVtZW50IiwiY2xhc3NMaXN0IiwiY29udGFpbnMiLCJmb2N1cyIsInJvb3QiLCJzZWxlY3RvciIsImZvY3VzUm9vdCIsInF1ZXJ5U2VsZWN0b3IiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7QUFNQSxTQUFTQSxtQkFBVCxFQUE4QkMseUJBQTlCLFFBQStELGNBQS9EOztBQUVBOzs7Ozs7O0FBT0EsT0FBTyxTQUFTQyxjQUFULENBQXdCQyxPQUF4QixFQUE4RDtBQUNqRSxRQUFJLENBQUNBLE9BQUQsSUFBWSxFQUFFQSxtQkFBbUJDLFdBQXJCLENBQWhCLEVBQW1EO0FBQy9DLGVBQU8sS0FBUDtBQUNIO0FBQ0QsUUFBTUMsTUFBTUYsUUFBUUcsT0FBUixDQUFnQkMsV0FBaEIsRUFBWjtBQUNBLFdBQU9GLFFBQVEsT0FBUixJQUFtQkEsUUFBUSxRQUEzQixJQUF1Q0EsUUFBUSxVQUF0RDtBQUNIOztBQUVEOzs7Ozs7O0FBT0EsT0FBTyxTQUFTRyxrQkFBVCxDQUE0QkwsT0FBNUIsRUFBa0U7QUFDckUsUUFBSSxDQUFDQSxPQUFELElBQVksRUFBRUEsbUJBQW1CQyxXQUFyQixDQUFoQixFQUFtRDtBQUMvQyxlQUFPLEtBQVA7QUFDSDtBQUNELFFBQU1DLE1BQU1GLFFBQVFHLE9BQVIsQ0FBZ0JDLFdBQWhCLEVBQVo7QUFDQSxXQUNJTCxlQUFlQyxPQUFmLEtBQ0FFLFFBQVEsUUFEUixJQUVBQSxRQUFRLEdBRlIsSUFHQUEsUUFBUSxRQUhSLElBSUFGLFFBQVFNLFNBQVIsQ0FBa0JDLFFBQWxCLENBQTJCVixtQkFBM0IsQ0FKQSxJQUtBRyxRQUFRTSxTQUFSLENBQWtCQyxRQUFsQixDQUEyQlQseUJBQTNCLENBTko7QUFRSDs7QUFFRDs7Ozs7Ozs7QUFRQSxPQUFPLFNBQVNVLEtBQVQsQ0FBZUMsSUFBZixFQUFrQ0MsUUFBbEMsRUFBcUY7QUFBQSxRQUFqQ0MsU0FBaUMsdUVBQVosSUFBWTs7QUFDeEYsUUFBSSxDQUFDRixJQUFELElBQVMsQ0FBQ0MsUUFBZCxFQUF3QjtBQUNwQjtBQUNIO0FBQ0QsUUFBTVYsVUFBVVMsS0FBS0csYUFBTCxDQUFtQkYsUUFBbkIsQ0FBaEI7QUFDQSxRQUFJVixXQUFXLE9BQU9BLFFBQVFRLEtBQWYsS0FBeUIsVUFBeEMsRUFBb0Q7QUFDaERSLGdCQUFRUSxLQUFSO0FBQ0gsS0FGRCxNQUVPLElBQUlHLFNBQUosRUFBZTtBQUNsQkYsYUFBS0QsS0FBTDtBQUNIO0FBQ0oiLCJmaWxlIjoiZG9tLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIEBmbG93XHJcbiAqIEBmaWxlIEZpbGUgZm9yIHNvbWUgc2ltcGxlIGRvbSB1dGlsaXRpZXNcclxuICogQGF1dGhvciBCb3hcclxuICovXHJcblxyXG5pbXBvcnQgeyBDTEFTU19DSEVDS0JPWF9TUEFOLCBDTEFTU19CVVRUT05fQ09OVEVOVF9TUEFOIH0gZnJvbSAnLi4vY29uc3RhbnRzJztcclxuXHJcbi8qKlxyXG4gKiBDaGVja3MgaWYgYW4gaHRtbCBlbGVtZW50IGlzIHNvbWUgdHlwZSBvZiBpbnB1dC1hYmxlXHJcbiAqIGVsZW1lbnQgb3IgdGV4dCBhcmVhIHR5cGUgd2hlcmUgY2hhcmFjdGVycyBjYW4gYmUgdHlwZWQuXHJcbiAqXHJcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR8bnVsbH0gZWxlbWVudCAtIHRoZSBkb20gZWxlbWVudCB0byBjaGVja1xyXG4gKiBAcmV0dXJuIHtib29sZWFufSB0cnVlIGlmIGl0cyBvbmUgb2YgdGhlIGFib3ZlIGVsZW1lbnRzXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gaXNJbnB1dEVsZW1lbnQoZWxlbWVudDogSFRNTEVsZW1lbnQgfCBudWxsKTogYm9vbGVhbiB7XHJcbiAgICBpZiAoIWVsZW1lbnQgfHwgIShlbGVtZW50IGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpKSB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgY29uc3QgdGFnID0gZWxlbWVudC50YWdOYW1lLnRvTG93ZXJDYXNlKCk7XHJcbiAgICByZXR1cm4gdGFnID09PSAnaW5wdXQnIHx8IHRhZyA9PT0gJ3NlbGVjdCcgfHwgdGFnID09PSAndGV4dGFyZWEnO1xyXG59XHJcblxyXG4vKipcclxuICogQ2hlY2tzIGlmIGFuIGh0bWwgZWxlbWVudCBpcyBzb21lIGtpbmQgb2YgZWxlbWVudFxyXG4gKiB0aGF0IHRoZSB1c2VyIHdvdWxkIHdhbnQgdG8ga2VlcCB0aGVpciBmb2N1cyBvbi5cclxuICpcclxuICogQHBhcmFtIHtIVE1MRWxlbWVudHxudWxsfSBlbGVtZW50IC0gdGhlIGRvbSBlbGVtZW50IHRvIGNoZWNrXHJcbiAqIEByZXR1cm4ge2Jvb2xlYW59IHRydWUgaWYgaXRzIG9uZSBvZiB0aGUgYWJvdmUgZWxlbWVudHNcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBpc0ZvY3VzYWJsZUVsZW1lbnQoZWxlbWVudDogSFRNTEVsZW1lbnQgfCBudWxsKTogYm9vbGVhbiB7XHJcbiAgICBpZiAoIWVsZW1lbnQgfHwgIShlbGVtZW50IGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpKSB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgY29uc3QgdGFnID0gZWxlbWVudC50YWdOYW1lLnRvTG93ZXJDYXNlKCk7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICAgIGlzSW5wdXRFbGVtZW50KGVsZW1lbnQpIHx8XHJcbiAgICAgICAgdGFnID09PSAnYnV0dG9uJyB8fFxyXG4gICAgICAgIHRhZyA9PT0gJ2EnIHx8XHJcbiAgICAgICAgdGFnID09PSAnb3B0aW9uJyB8fFxyXG4gICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKENMQVNTX0NIRUNLQk9YX1NQQU4pIHx8XHJcbiAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoQ0xBU1NfQlVUVE9OX0NPTlRFTlRfU1BBTilcclxuICAgICk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBGb2N1c2VzIGEgRE9NIGVsZW1lbnQgaWYgaXQgZXhpc3RzLlxyXG4gKlxyXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSByb290IC0gdGhlIHJvb3QgZG9tIGVsZW1lbnQgdG8gc2VhcmNoXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBzZWxlY3RvciAtIHRoZSBxdWVyeSBzZWxlY3RvclxyXG4gKiBAcGFyYW0ge2Jvb2xlYW58dm9pZH0gW2ZvY3VzUm9vdF0gLSBpZiByb290IHNob3VsZCBiZSBmb2N1c2VkXHJcbiAqIEByZXR1cm4ge3ZvaWR9XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZm9jdXMocm9vdDogSFRNTEVsZW1lbnQsIHNlbGVjdG9yOiBzdHJpbmcsIGZvY3VzUm9vdDogYm9vbGVhbiA9IHRydWUpOiB2b2lkIHtcclxuICAgIGlmICghcm9vdCB8fCAhc2VsZWN0b3IpIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBjb25zdCBlbGVtZW50ID0gcm9vdC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKTtcclxuICAgIGlmIChlbGVtZW50ICYmIHR5cGVvZiBlbGVtZW50LmZvY3VzID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgZWxlbWVudC5mb2N1cygpO1xyXG4gICAgfSBlbHNlIGlmIChmb2N1c1Jvb3QpIHtcclxuICAgICAgICByb290LmZvY3VzKCk7XHJcbiAgICB9XHJcbn1cclxuIl19