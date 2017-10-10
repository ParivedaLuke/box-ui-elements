/**
 * 
 * @file Component for the details for the item name
 * @author Box
 */

import React from 'react';
import { PlainButton } from '../Button';
import { TYPE_FOLDER, TYPE_WEBLINK } from '../../constants';


var ItemName = function ItemName(_ref) {
    var item = _ref.item,
        onClick = _ref.onClick,
        onFocus = _ref.onFocus,
        canPreview = _ref.canPreview,
        isTouch = _ref.isTouch;
    var name = item.name,
        type = item.type;
    // $FlowFixMe: flow bug

    var onItemFocus = onFocus ? function () {
        return onFocus(item);
    } : null;
    var onItemClick = function onItemClick() {
        return onClick(item);
    };

    return type === TYPE_FOLDER || !isTouch && (type === TYPE_WEBLINK || canPreview) ? React.createElement(
        PlainButton,
        { className: 'buik-item-label', onFocus: onItemFocus, onClick: onItemClick },
        name
    ) : React.createElement(
        'span',
        { className: 'buik-item-label' },
        name
    );
};

export default ItemName;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkl0ZW1OYW1lLmpzIl0sIm5hbWVzIjpbIlJlYWN0IiwiUGxhaW5CdXR0b24iLCJUWVBFX0ZPTERFUiIsIlRZUEVfV0VCTElOSyIsIkl0ZW1OYW1lIiwiaXRlbSIsIm9uQ2xpY2siLCJvbkZvY3VzIiwiY2FuUHJldmlldyIsImlzVG91Y2giLCJuYW1lIiwidHlwZSIsIm9uSXRlbUZvY3VzIiwib25JdGVtQ2xpY2siXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7QUFNQSxPQUFPQSxLQUFQLE1BQWtCLE9BQWxCO0FBQ0EsU0FBU0MsV0FBVCxRQUE0QixXQUE1QjtBQUNBLFNBQVNDLFdBQVQsRUFBc0JDLFlBQXRCLFFBQTBDLGlCQUExQzs7O0FBWUEsSUFBTUMsV0FBVyxTQUFYQSxRQUFXLE9BQTREO0FBQUEsUUFBekRDLElBQXlELFFBQXpEQSxJQUF5RDtBQUFBLFFBQW5EQyxPQUFtRCxRQUFuREEsT0FBbUQ7QUFBQSxRQUExQ0MsT0FBMEMsUUFBMUNBLE9BQTBDO0FBQUEsUUFBakNDLFVBQWlDLFFBQWpDQSxVQUFpQztBQUFBLFFBQXJCQyxPQUFxQixRQUFyQkEsT0FBcUI7QUFBQSxRQUNqRUMsSUFEaUUsR0FDekNMLElBRHlDLENBQ2pFSyxJQURpRTtBQUFBLFFBQzNEQyxJQUQyRCxHQUN6Q04sSUFEeUMsQ0FDM0RNLElBRDJEO0FBRXpFOztBQUNBLFFBQU1DLGNBQWNMLFVBQVU7QUFBQSxlQUFNQSxRQUFRRixJQUFSLENBQU47QUFBQSxLQUFWLEdBQWdDLElBQXBEO0FBQ0EsUUFBTVEsY0FBd0IsU0FBeEJBLFdBQXdCO0FBQUEsZUFBWVAsUUFBUUQsSUFBUixDQUFaO0FBQUEsS0FBOUI7O0FBRUEsV0FBT00sU0FBU1QsV0FBVCxJQUF5QixDQUFDTyxPQUFELEtBQWFFLFNBQVNSLFlBQVQsSUFBeUJLLFVBQXRDLENBQXpCLEdBQ0Q7QUFBQyxtQkFBRDtBQUFBLFVBQWEsV0FBVSxpQkFBdkIsRUFBeUMsU0FBU0ksV0FBbEQsRUFBK0QsU0FBU0MsV0FBeEU7QUFDR0g7QUFESCxLQURDLEdBSUQ7QUFBQTtBQUFBLFVBQU0sV0FBVSxpQkFBaEI7QUFDR0E7QUFESCxLQUpOO0FBT0gsQ0FiRDs7QUFlQSxlQUFlTixRQUFmIiwiZmlsZSI6Ikl0ZW1OYW1lLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIEBmbG93XHJcbiAqIEBmaWxlIENvbXBvbmVudCBmb3IgdGhlIGRldGFpbHMgZm9yIHRoZSBpdGVtIG5hbWVcclxuICogQGF1dGhvciBCb3hcclxuICovXHJcblxyXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBQbGFpbkJ1dHRvbiB9IGZyb20gJy4uL0J1dHRvbic7XHJcbmltcG9ydCB7IFRZUEVfRk9MREVSLCBUWVBFX1dFQkxJTksgfSBmcm9tICcuLi8uLi9jb25zdGFudHMnO1xyXG5pbXBvcnQgdHlwZSB7IEJveEl0ZW0gfSBmcm9tICcuLi8uLi9mbG93VHlwZXMnO1xyXG5pbXBvcnQgJy4vSXRlbU5hbWUuc2Nzcyc7XHJcblxyXG50eXBlIFByb3BzID0ge1xyXG4gICAgaXRlbTogQm94SXRlbSxcclxuICAgIGNhblByZXZpZXc6IGJvb2xlYW4sXHJcbiAgICBvbkNsaWNrOiBGdW5jdGlvbixcclxuICAgIG9uRm9jdXM/OiBGdW5jdGlvbixcclxuICAgIGlzVG91Y2g6IGJvb2xlYW5cclxufTtcclxuXHJcbmNvbnN0IEl0ZW1OYW1lID0gKHsgaXRlbSwgb25DbGljaywgb25Gb2N1cywgY2FuUHJldmlldywgaXNUb3VjaCB9OiBQcm9wcykgPT4ge1xyXG4gICAgY29uc3QgeyBuYW1lLCB0eXBlIH06IEJveEl0ZW0gPSBpdGVtO1xyXG4gICAgLy8gJEZsb3dGaXhNZTogZmxvdyBidWdcclxuICAgIGNvbnN0IG9uSXRlbUZvY3VzID0gb25Gb2N1cyA/ICgpID0+IG9uRm9jdXMoaXRlbSkgOiBudWxsO1xyXG4gICAgY29uc3Qgb25JdGVtQ2xpY2s6IEZ1bmN0aW9uID0gKCk6IHZvaWQgPT4gb25DbGljayhpdGVtKTtcclxuXHJcbiAgICByZXR1cm4gdHlwZSA9PT0gVFlQRV9GT0xERVIgfHwgKCFpc1RvdWNoICYmICh0eXBlID09PSBUWVBFX1dFQkxJTksgfHwgY2FuUHJldmlldykpXHJcbiAgICAgICAgPyA8UGxhaW5CdXR0b24gY2xhc3NOYW1lPSdidWlrLWl0ZW0tbGFiZWwnIG9uRm9jdXM9e29uSXRlbUZvY3VzfSBvbkNsaWNrPXtvbkl0ZW1DbGlja30+XHJcbiAgICAgICAgICAgIHtuYW1lfVxyXG4gICAgICAgIDwvUGxhaW5CdXR0b24+XHJcbiAgICAgICAgOiA8c3BhbiBjbGFzc05hbWU9J2J1aWstaXRlbS1sYWJlbCc+XHJcbiAgICAgICAgICAgIHtuYW1lfVxyXG4gICAgICAgIDwvc3Bhbj47XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBJdGVtTmFtZTtcclxuIl19