/**
 * 
 * @file File Key Values Skill Data component
 * @author Box
 */

import React from 'react';


var Keyvalues = function Keyvalues(_ref) {
    var entries = _ref.skill.entries;
    return React.createElement(
        'div',
        { className: 'buik-keyvalues' },
        Array.isArray(entries) && entries.map(function (_ref2, index) {
            var label = _ref2.label,
                text = _ref2.text;
            return !!label && !!text &&
            /* eslint-disable react/no-array-index-key */
            React.createElement(
                'dl',
                { className: 'buik-keyvalue', key: index },
                React.createElement(
                    'dt',
                    null,
                    label
                ),
                React.createElement(
                    'dd',
                    null,
                    text
                )
            );
        }
        /* eslint-enable react/no-array-index-key */
        )
    );
};

export default Keyvalues;