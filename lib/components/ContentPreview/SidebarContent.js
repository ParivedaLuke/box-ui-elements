/**
 * 
 * @file Preview sidebar content component
 * @author Box
 */

import React from 'react';


/* eslint-disable jsx-a11y/label-has-for */
var SidebarContent = function SidebarContent(_ref) {
    var title = _ref.title,
        children = _ref.children;
    return React.createElement(
        'div',
        { className: 'bcpr-sidebar-content' },
        React.createElement(
            'h3',
            { className: 'bcpr-sidebar-title' },
            title
        ),
        React.createElement(
            'div',
            { className: 'bcpr-sidebar-scroll-content-wrapper' },
            React.createElement(
                'div',
                { className: 'bcpr-sidebar-scroll-content' },
                children
            )
        )
    );
};

export default SidebarContent;