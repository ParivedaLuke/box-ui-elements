/**
 * 
 * @file Content sub header component
 * @author Box
 */

import React from 'react';
import SubHeaderLeft from './SubHeaderLeft';
import SubHeaderRight from './SubHeaderRight';


var SubHeader = function SubHeader(props) {
    return React.createElement(
        'div',
        { className: 'buik-sub-header' },
        React.createElement(SubHeaderLeft, props),
        React.createElement(SubHeaderRight, props)
    );
};

export default SubHeader;