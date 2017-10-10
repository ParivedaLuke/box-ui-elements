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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlNpZGViYXJDb250ZW50LmpzIl0sIm5hbWVzIjpbIlJlYWN0IiwiU2lkZWJhckNvbnRlbnQiLCJ0aXRsZSIsImNoaWxkcmVuIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0FBTUEsT0FBT0EsS0FBUCxNQUFrQixPQUFsQjs7O0FBUUE7QUFDQSxJQUFNQyxpQkFBaUIsU0FBakJBLGNBQWlCO0FBQUEsUUFBR0MsS0FBSCxRQUFHQSxLQUFIO0FBQUEsUUFBVUMsUUFBVixRQUFVQSxRQUFWO0FBQUEsV0FDbkI7QUFBQTtBQUFBLFVBQUssV0FBVSxzQkFBZjtBQUNJO0FBQUE7QUFBQSxjQUFJLFdBQVUsb0JBQWQ7QUFDS0Q7QUFETCxTQURKO0FBSUk7QUFBQTtBQUFBLGNBQUssV0FBVSxxQ0FBZjtBQUNJO0FBQUE7QUFBQSxrQkFBSyxXQUFVLDZCQUFmO0FBQ0tDO0FBREw7QUFESjtBQUpKLEtBRG1CO0FBQUEsQ0FBdkI7O0FBWUEsZUFBZUYsY0FBZiIsImZpbGUiOiJTaWRlYmFyQ29udGVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBAZmxvd1xyXG4gKiBAZmlsZSBQcmV2aWV3IHNpZGViYXIgY29udGVudCBjb21wb25lbnRcclxuICogQGF1dGhvciBCb3hcclxuICovXHJcblxyXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgJy4vU2lkZWJhckNvbnRlbnQuc2Nzcyc7XHJcblxyXG50eXBlIFByb3BzID0ge1xyXG4gICAgdGl0bGU6IHN0cmluZyxcclxuICAgIGNoaWxkcmVuOiBhbnlcclxufTtcclxuXHJcbi8qIGVzbGludC1kaXNhYmxlIGpzeC1hMTF5L2xhYmVsLWhhcy1mb3IgKi9cclxuY29uc3QgU2lkZWJhckNvbnRlbnQgPSAoeyB0aXRsZSwgY2hpbGRyZW4gfTogUHJvcHMpID0+XHJcbiAgICA8ZGl2IGNsYXNzTmFtZT0nYmNwci1zaWRlYmFyLWNvbnRlbnQnPlxyXG4gICAgICAgIDxoMyBjbGFzc05hbWU9J2JjcHItc2lkZWJhci10aXRsZSc+XHJcbiAgICAgICAgICAgIHt0aXRsZX1cclxuICAgICAgICA8L2gzPlxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPSdiY3ByLXNpZGViYXItc2Nyb2xsLWNvbnRlbnQtd3JhcHBlcic+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdiY3ByLXNpZGViYXItc2Nyb2xsLWNvbnRlbnQnPlxyXG4gICAgICAgICAgICAgICAge2NoaWxkcmVufVxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFNpZGViYXJDb250ZW50O1xyXG4iXX0=