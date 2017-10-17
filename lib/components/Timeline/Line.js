/**
 * 
 * @file Timeline line component
 * @author Box
 */

import React from 'react';
import { PlainButton } from '../Button';
import { BOX_BLUE } from '../../constants';


var LENGTH_IMAGE_ITEMLINE = 215;
var LENGTH_TEXT_ITEMLINE = 270;

var Line = function Line(_ref) {
    var type = _ref.type,
        start = _ref.start,
        _ref$end = _ref.end,
        end = _ref$end === undefined ? 0 : _ref$end,
        duration = _ref.duration,
        _ref$color = _ref.color,
        color = _ref$color === undefined ? BOX_BLUE : _ref$color,
        getPreviewer = _ref.getPreviewer;

    if (typeof start !== 'number' || !duration) {
        return null;
    }
    var barLength = type === 'image' ? LENGTH_IMAGE_ITEMLINE : LENGTH_TEXT_ITEMLINE;
    var startLeft = Math.round(start * barLength / duration);
    var endLeft = Math.round(Math.min(barLength, Math.max(startLeft + 6, end * barLength / duration)));
    var styles = {
        backgroundColor: color,
        left: startLeft + 'px',
        width: endLeft - startLeft + 'px'
    };
    var onClick = function onClick() {
        var viewer = getPreviewer ? getPreviewer() : null;
        if (viewer && viewer.isLoaded() && !viewer.isDestroyed() && typeof viewer.play === 'function') {
            viewer.play(start);
        }
    };
    return React.createElement(PlainButton, { className: 'buik-timeline-time', style: styles, onClick: onClick });
};

export default Line;