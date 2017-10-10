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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIktleXdvcmQuanMiXSwibmFtZXMiOlsiUmVhY3QiLCJQbGFpbkJ1dHRvbiIsIktleXdvcmQiLCJrZXl3b3JkIiwib25DbGljayIsImlzU2VsZWN0ZWQiLCJ0ZXh0Il0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0FBTUEsT0FBT0EsS0FBUCxNQUFrQixPQUFsQjtBQUNBLFNBQVNDLFdBQVQsUUFBNEIsV0FBNUI7QUFDQTs7O0FBVUEsSUFBTUMsVUFBVSxTQUFWQSxPQUFVO0FBQUEsUUFBR0MsT0FBSCxRQUFHQSxPQUFIO0FBQUEsUUFBWUMsT0FBWixRQUFZQSxPQUFaO0FBQUEsUUFBcUJDLFVBQXJCLFFBQXFCQSxVQUFyQjtBQUFBLFdBQ1o7QUFBQTtBQUFBLFVBQU0sV0FBVSxtQkFBaEI7QUFDSTtBQUFDLHVCQUFEO0FBQUE7QUFDSSx3REFBcUNBLGFBQWEsNEJBQWIsR0FBNEMsRUFBakYsQ0FESjtBQUVJO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBLGtCQUFTO0FBQUEsMkJBQU1ELFFBQVFELE9BQVIsQ0FBTjtBQUFBLGlCQUFUO0FBRko7QUFJS0Esb0JBQVFHO0FBSmI7QUFESixLQURZO0FBQUEsQ0FBaEI7O0FBVUE7QUFDQTtBQUNBOztBQUVBLGVBQWVKLE9BQWYiLCJmaWxlIjoiS2V5d29yZC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBAZmxvd1xyXG4gKiBAZmlsZSBGaWxlIEtleXdvcmQgY29tcG9uZW50XHJcbiAqIEBhdXRob3IgQm94XHJcbiAqL1xyXG5cclxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgUGxhaW5CdXR0b24gfSBmcm9tICcuLi9CdXR0b24nO1xyXG4vLyBpbXBvcnQgSWNvbkNyb3NzIGZyb20gJy4uL2ljb25zL0ljb25Dcm9zcyc7XHJcbmltcG9ydCB0eXBlIHsgU2tpbGxEYXRhRW50cnkgfSBmcm9tICcuLi8uLi9mbG93VHlwZXMnO1xyXG5pbXBvcnQgJy4vS2V5d29yZC5zY3NzJztcclxuXHJcbnR5cGUgUHJvcHMgPSB7XHJcbiAgICBrZXl3b3JkOiBTa2lsbERhdGFFbnRyeSxcclxuICAgIGlzU2VsZWN0ZWQ6IGJvb2xlYW4sXHJcbiAgICBvbkNsaWNrOiBGdW5jdGlvblxyXG59O1xyXG5cclxuY29uc3QgS2V5d29yZCA9ICh7IGtleXdvcmQsIG9uQ2xpY2ssIGlzU2VsZWN0ZWQgfTogUHJvcHMpID0+XHJcbiAgICA8c3BhbiBjbGFzc05hbWU9J2J1aWstZmlsZS1rZXl3b3JkJz5cclxuICAgICAgICA8UGxhaW5CdXR0b25cclxuICAgICAgICAgICAgY2xhc3NOYW1lPXtgYnVpay1maWxlLWtleXdvcmQtd29yZCAke2lzU2VsZWN0ZWQgPyAnYnVpay1maWxlLWtleXdvcmQtc2VsZWN0ZWQnIDogJyd9YH1cclxuICAgICAgICAgICAgb25DbGljaz17KCkgPT4gb25DbGljayhrZXl3b3JkKX1cclxuICAgICAgICA+XHJcbiAgICAgICAgICAgIHtrZXl3b3JkLnRleHR9XHJcbiAgICAgICAgPC9QbGFpbkJ1dHRvbj5cclxuICAgIDwvc3Bhbj47XHJcblxyXG4vLyA8UGxhaW5CdXR0b24gY2xhc3NOYW1lPSdidWlrLWZpbGUta2V5d29yZC1kZWxldGUnPlxyXG4vLyAgICAgPEljb25Dcm9zcyBjb2xvcj0nIzc3Nycgd2lkdGg9ezh9IGhlaWdodD17OH0gLz5cclxuLy8gPC9QbGFpbkJ1dHRvbj5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEtleXdvcmQ7XHJcbiJdfQ==