/**
 * 
 * @file Timeline component
 * @author Box
 */

import React from 'react';
import { PlainButton } from '../Button';
import Line from './Line';


var Timeline = function Timeline(_ref) {
    var _ref$type = _ref.type,
        type = _ref$type === undefined ? 'text' : _ref$type,
        color = _ref.color,
        _ref$text = _ref.text,
        text = _ref$text === undefined ? '' : _ref$text,
        _ref$url = _ref.url,
        url = _ref$url === undefined ? '' : _ref$url,
        _ref$duration = _ref.duration,
        duration = _ref$duration === undefined ? 0 : _ref$duration,
        _ref$timeslices = _ref.timeslices,
        timeslices = _ref$timeslices === undefined ? [] : _ref$timeslices,
        getPreviewer = _ref.getPreviewer;

    var nextTimeSliceIndex = 0;
    var startNextSegment = function startNextSegment() {
        var viewer = getPreviewer ? getPreviewer() : null;
        if (viewer && viewer.isLoaded() && !viewer.isDestroyed() && typeof viewer.play === 'function' && timeslices[nextTimeSliceIndex]) {
            viewer.play(timeslices[nextTimeSliceIndex].start);
            nextTimeSliceIndex = (nextTimeSliceIndex + 1) % timeslices.length;
        }
    };

    return React.createElement(
        'div',
        { className: 'buik-timeline buik-timeline-' + type },
        (text || url) && React.createElement(
            'div',
            { className: 'buik-timeline-label' },
            type === 'image' ? React.createElement(
                PlainButton,
                { onClick: startNextSegment },
                React.createElement('img', { alt: text, title: text, src: url })
            ) : React.createElement(
                'span',
                null,
                text
            )
        ),
        React.createElement(
            'div',
            { className: 'buik-timeline-wrapper' },
            React.createElement('div', { className: 'buik-timeline-line', style: { backgroundColor: color } }),
            timeslices.map(function (_ref2
            /* eslint-disable react/no-array-index-key */
            , index) {
                var start = _ref2.start,
                    end = _ref2.end;
                return React.createElement(Line, {
                    key: index,
                    color: color,
                    type: type,
                    start: start,
                    end: end,
                    duration: duration,
                    getPreviewer: getPreviewer
                });
            }
            /* eslint-enable react/no-array-index-key */
            )
        )
    );
};

export default Timeline;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlRpbWVsaW5lLmpzIl0sIm5hbWVzIjpbIlJlYWN0IiwiUGxhaW5CdXR0b24iLCJMaW5lIiwiVGltZWxpbmUiLCJ0eXBlIiwiY29sb3IiLCJ0ZXh0IiwidXJsIiwiZHVyYXRpb24iLCJ0aW1lc2xpY2VzIiwiZ2V0UHJldmlld2VyIiwibmV4dFRpbWVTbGljZUluZGV4Iiwic3RhcnROZXh0U2VnbWVudCIsInZpZXdlciIsImlzTG9hZGVkIiwiaXNEZXN0cm95ZWQiLCJwbGF5Iiwic3RhcnQiLCJsZW5ndGgiLCJiYWNrZ3JvdW5kQ29sb3IiLCJtYXAiLCJpbmRleCIsImVuZCJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztBQU1BLE9BQU9BLEtBQVAsTUFBa0IsT0FBbEI7QUFDQSxTQUFTQyxXQUFULFFBQTRCLFdBQTVCO0FBQ0EsT0FBT0MsSUFBUCxNQUFpQixRQUFqQjs7O0FBY0EsSUFBTUMsV0FBVyxTQUFYQSxRQUFXLE9BUUo7QUFBQSx5QkFQVEMsSUFPUztBQUFBLFFBUFRBLElBT1MsNkJBUEYsTUFPRTtBQUFBLFFBTlRDLEtBTVMsUUFOVEEsS0FNUztBQUFBLHlCQUxUQyxJQUtTO0FBQUEsUUFMVEEsSUFLUyw2QkFMRixFQUtFO0FBQUEsd0JBSlRDLEdBSVM7QUFBQSxRQUpUQSxHQUlTLDRCQUpILEVBSUc7QUFBQSw2QkFIVEMsUUFHUztBQUFBLFFBSFRBLFFBR1MsaUNBSEUsQ0FHRjtBQUFBLCtCQUZUQyxVQUVTO0FBQUEsUUFGVEEsVUFFUyxtQ0FGSSxFQUVKO0FBQUEsUUFEVEMsWUFDUyxRQURUQSxZQUNTOztBQUNULFFBQUlDLHFCQUFxQixDQUF6QjtBQUNBLFFBQU1DLG1CQUFtQixTQUFuQkEsZ0JBQW1CLEdBQU07QUFDM0IsWUFBTUMsU0FBU0gsZUFBZUEsY0FBZixHQUFnQyxJQUEvQztBQUNBLFlBQ0lHLFVBQ0FBLE9BQU9DLFFBQVAsRUFEQSxJQUVBLENBQUNELE9BQU9FLFdBQVAsRUFGRCxJQUdBLE9BQU9GLE9BQU9HLElBQWQsS0FBdUIsVUFIdkIsSUFJQVAsV0FBV0Usa0JBQVgsQ0FMSixFQU1FO0FBQ0VFLG1CQUFPRyxJQUFQLENBQVlQLFdBQVdFLGtCQUFYLEVBQStCTSxLQUEzQztBQUNBTixpQ0FBcUIsQ0FBQ0EscUJBQXFCLENBQXRCLElBQTJCRixXQUFXUyxNQUEzRDtBQUNIO0FBQ0osS0FaRDs7QUFjQSxXQUNJO0FBQUE7QUFBQSxVQUFLLDRDQUEwQ2QsSUFBL0M7QUFDSyxTQUFDRSxRQUFRQyxHQUFULEtBQ0c7QUFBQTtBQUFBLGNBQUssV0FBVSxxQkFBZjtBQUNLSCxxQkFBUyxPQUFULEdBQ0s7QUFBQywyQkFBRDtBQUFBLGtCQUFhLFNBQVNRLGdCQUF0QjtBQUNFLDZDQUFLLEtBQUtOLElBQVYsRUFBZ0IsT0FBT0EsSUFBdkIsRUFBNkIsS0FBS0MsR0FBbEM7QUFERixhQURMLEdBSUs7QUFBQTtBQUFBO0FBQ0dEO0FBREg7QUFMVixTQUZSO0FBV0k7QUFBQTtBQUFBLGNBQUssV0FBVSx1QkFBZjtBQUNJLHlDQUFLLFdBQVUsb0JBQWYsRUFBb0MsT0FBTyxFQUFFYSxpQkFBaUJkLEtBQW5CLEVBQTNDLEdBREo7QUFFS0ksdUJBQVdXLEdBQVgsQ0FDRztBQUNJO0FBREosY0FBNEJDLEtBQTVCO0FBQUEsb0JBQUdKLEtBQUgsU0FBR0EsS0FBSDtBQUFBLG9CQUFVSyxHQUFWLFNBQVVBLEdBQVY7QUFBQSx1QkFFSSxvQkFBQyxJQUFEO0FBQ0kseUJBQUtELEtBRFQ7QUFFSSwyQkFBT2hCLEtBRlg7QUFHSSwwQkFBTUQsSUFIVjtBQUlJLDJCQUFPYSxLQUpYO0FBS0kseUJBQUtLLEdBTFQ7QUFNSSw4QkFBVWQsUUFOZDtBQU9JLGtDQUFjRTtBQVBsQixrQkFGSjtBQUFBO0FBV0E7QUFaSDtBQUZMO0FBWEosS0FESjtBQStCSCxDQXZERDs7QUF5REEsZUFBZVAsUUFBZiIsImZpbGUiOiJUaW1lbGluZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBAZmxvd1xyXG4gKiBAZmlsZSBUaW1lbGluZSBjb21wb25lbnRcclxuICogQGF1dGhvciBCb3hcclxuICovXHJcblxyXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBQbGFpbkJ1dHRvbiB9IGZyb20gJy4uL0J1dHRvbic7XHJcbmltcG9ydCBMaW5lIGZyb20gJy4vTGluZSc7XHJcbmltcG9ydCB0eXBlIHsgVGltZVNsaWNlLCBTa2lsbERhdGFFbnRyeVR5cGUgfSBmcm9tICcuLi8uLi9mbG93VHlwZXMnO1xyXG5pbXBvcnQgJy4vVGltZWxpbmUuc2Nzcyc7XHJcblxyXG50eXBlIFByb3BzID0ge1xyXG4gICAgdHlwZT86IFNraWxsRGF0YUVudHJ5VHlwZSxcclxuICAgIGNvbG9yPzogc3RyaW5nLFxyXG4gICAgdGV4dD86IHN0cmluZyxcclxuICAgIHVybD86IHN0cmluZyxcclxuICAgIHRpbWVzbGljZXM/OiBUaW1lU2xpY2VbXSxcclxuICAgIGR1cmF0aW9uPzogbnVtYmVyLFxyXG4gICAgZ2V0UHJldmlld2VyPzogRnVuY3Rpb25cclxufTtcclxuXHJcbmNvbnN0IFRpbWVsaW5lID0gKHtcclxuICAgIHR5cGUgPSAndGV4dCcsXHJcbiAgICBjb2xvcixcclxuICAgIHRleHQgPSAnJyxcclxuICAgIHVybCA9ICcnLFxyXG4gICAgZHVyYXRpb24gPSAwLFxyXG4gICAgdGltZXNsaWNlcyA9IFtdLFxyXG4gICAgZ2V0UHJldmlld2VyXHJcbn06IFByb3BzKSA9PiB7XHJcbiAgICBsZXQgbmV4dFRpbWVTbGljZUluZGV4ID0gMDtcclxuICAgIGNvbnN0IHN0YXJ0TmV4dFNlZ21lbnQgPSAoKSA9PiB7XHJcbiAgICAgICAgY29uc3Qgdmlld2VyID0gZ2V0UHJldmlld2VyID8gZ2V0UHJldmlld2VyKCkgOiBudWxsO1xyXG4gICAgICAgIGlmIChcclxuICAgICAgICAgICAgdmlld2VyICYmXHJcbiAgICAgICAgICAgIHZpZXdlci5pc0xvYWRlZCgpICYmXHJcbiAgICAgICAgICAgICF2aWV3ZXIuaXNEZXN0cm95ZWQoKSAmJlxyXG4gICAgICAgICAgICB0eXBlb2Ygdmlld2VyLnBsYXkgPT09ICdmdW5jdGlvbicgJiZcclxuICAgICAgICAgICAgdGltZXNsaWNlc1tuZXh0VGltZVNsaWNlSW5kZXhdXHJcbiAgICAgICAgKSB7XHJcbiAgICAgICAgICAgIHZpZXdlci5wbGF5KHRpbWVzbGljZXNbbmV4dFRpbWVTbGljZUluZGV4XS5zdGFydCk7XHJcbiAgICAgICAgICAgIG5leHRUaW1lU2xpY2VJbmRleCA9IChuZXh0VGltZVNsaWNlSW5kZXggKyAxKSAlIHRpbWVzbGljZXMubGVuZ3RoO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIChcclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT17YGJ1aWstdGltZWxpbmUgYnVpay10aW1lbGluZS0ke3R5cGV9YH0+XHJcbiAgICAgICAgICAgIHsodGV4dCB8fCB1cmwpICYmXHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nYnVpay10aW1lbGluZS1sYWJlbCc+XHJcbiAgICAgICAgICAgICAgICAgICAge3R5cGUgPT09ICdpbWFnZSdcclxuICAgICAgICAgICAgICAgICAgICAgICAgPyA8UGxhaW5CdXR0b24gb25DbGljaz17c3RhcnROZXh0U2VnbWVudH0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW1nIGFsdD17dGV4dH0gdGl0bGU9e3RleHR9IHNyYz17dXJsfSAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L1BsYWluQnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA6IDxzcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge3RleHR9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj59XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj59XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdidWlrLXRpbWVsaW5lLXdyYXBwZXInPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2J1aWstdGltZWxpbmUtbGluZScgc3R5bGU9e3sgYmFja2dyb3VuZENvbG9yOiBjb2xvciB9fSAvPlxyXG4gICAgICAgICAgICAgICAge3RpbWVzbGljZXMubWFwKFxyXG4gICAgICAgICAgICAgICAgICAgICh7IHN0YXJ0LCBlbmQgfTogVGltZVNsaWNlLCBpbmRleCkgPT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLyogZXNsaW50LWRpc2FibGUgcmVhY3Qvbm8tYXJyYXktaW5kZXgta2V5ICovXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxMaW5lXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk9e2luZGV4fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I9e2NvbG9yfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT17dHlwZX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0PXtzdGFydH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVuZD17ZW5kfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZHVyYXRpb249e2R1cmF0aW9ufVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2V0UHJldmlld2VyPXtnZXRQcmV2aWV3ZXJ9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgLyogZXNsaW50LWVuYWJsZSByZWFjdC9uby1hcnJheS1pbmRleC1rZXkgKi9cclxuICAgICAgICAgICAgICAgICl9XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFRpbWVsaW5lO1xyXG4iXX0=