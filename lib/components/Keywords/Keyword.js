/**
 * 
 * @file File Keyword component
 * @author Box
 */

import React from 'react';
import { PlainButton } from '../Button';
// import IconCross from '../icons/IconCross';


var Keyword = function Keyword(_ref) {
    var keyword = _ref.keyword,
        onClick = _ref.onClick,
        isSelected = _ref.isSelected;
    return React.createElement(
        'span',
        { className: 'buik-file-keyword' },
        React.createElement(
            PlainButton,
            {
                className: 'buik-file-keyword-word ' + (isSelected ? 'buik-file-keyword-selected' : ''),
                onClick: function (_onClick) {
                    function onClick() {
                        return _onClick.apply(this, arguments);
                    }

                    onClick.toString = function () {
                        return _onClick.toString();
                    };

                    return onClick;
                }(function () {
                    return onClick(keyword);
                })
            },
            keyword.text
        )
    );
};

// <PlainButton className='buik-file-keyword-delete'>
//     <IconCross color='#777' width={8} height={8} />
// </PlainButton>

export default Keyword;