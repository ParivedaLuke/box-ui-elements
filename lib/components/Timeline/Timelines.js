/**
 * 
 * @file Timelines component
 * @author Box
 */

import React from 'react';
import randomcolor from 'randomcolor';
import Timeline from './Timeline';


var Timelines = function Timelines(_ref) {
    var _ref$skill = _ref.skill,
        entries = _ref$skill.entries,
        duration = _ref$skill.duration,
        getPreviewer = _ref.getPreviewer;

    var colors = randomcolor({ count: entries.length, luminosity: 'dark' });
    return React.createElement(
        'div',
        { className: 'buik-timelines' },
        entries.map(function (_ref2
        /* eslint-disable react/no-array-index-key */
        , index) {
            var type = _ref2.type,
                text = _ref2.text,
                url = _ref2.url,
                appears = _ref2.appears;
            return React.createElement(Timeline, {
                key: index,
                type: type,
                text: text,
                url: url,
                color: colors[index],
                timeslices: appears,
                duration: duration,
                getPreviewer: getPreviewer
            });
        }
        /* eslint-enable react/no-array-index-key */
        )
    );
};

export default Timelines;