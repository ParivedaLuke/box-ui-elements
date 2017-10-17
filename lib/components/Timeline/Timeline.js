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