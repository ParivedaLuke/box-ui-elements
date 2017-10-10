/**
 * 
 * @file Component for file icon and name
 */

import React from 'react';
import ItemName from './ItemName';
import FileIcon from '../icons/file';


var IconName = function IconName(_ref) {
    var name = _ref.name,
        extension = _ref.extension;
    return React.createElement(
        'div',
        { className: 'bcu-item-icon-name' },
        React.createElement(
            'div',
            { className: 'bcu-item-icon' },
            React.createElement(FileIcon, { extension: extension })
        ),
        React.createElement(
            'div',
            { className: 'bcu-item-name' },
            React.createElement(ItemName, { name: name })
        )
    );
};

export default IconName;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkljb25OYW1lLmpzIl0sIm5hbWVzIjpbIlJlYWN0IiwiSXRlbU5hbWUiLCJGaWxlSWNvbiIsIkljb25OYW1lIiwibmFtZSIsImV4dGVuc2lvbiJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7O0FBS0EsT0FBT0EsS0FBUCxNQUFrQixPQUFsQjtBQUNBLE9BQU9DLFFBQVAsTUFBcUIsWUFBckI7QUFDQSxPQUFPQyxRQUFQLE1BQXFCLGVBQXJCOzs7QUFRQSxJQUFNQyxXQUFXLFNBQVhBLFFBQVc7QUFBQSxRQUFHQyxJQUFILFFBQUdBLElBQUg7QUFBQSxRQUFTQyxTQUFULFFBQVNBLFNBQVQ7QUFBQSxXQUNiO0FBQUE7QUFBQSxVQUFLLFdBQVUsb0JBQWY7QUFDSTtBQUFBO0FBQUEsY0FBSyxXQUFVLGVBQWY7QUFDSSxnQ0FBQyxRQUFELElBQVUsV0FBV0EsU0FBckI7QUFESixTQURKO0FBSUk7QUFBQTtBQUFBLGNBQUssV0FBVSxlQUFmO0FBQ0ksZ0NBQUMsUUFBRCxJQUFVLE1BQU1ELElBQWhCO0FBREo7QUFKSixLQURhO0FBQUEsQ0FBakI7O0FBVUEsZUFBZUQsUUFBZiIsImZpbGUiOiJJY29uTmFtZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBAZmxvd1xyXG4gKiBAZmlsZSBDb21wb25lbnQgZm9yIGZpbGUgaWNvbiBhbmQgbmFtZVxyXG4gKi9cclxuXHJcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBJdGVtTmFtZSBmcm9tICcuL0l0ZW1OYW1lJztcclxuaW1wb3J0IEZpbGVJY29uIGZyb20gJy4uL2ljb25zL2ZpbGUnO1xyXG5pbXBvcnQgJy4vSWNvbk5hbWUuc2Nzcyc7XHJcblxyXG50eXBlIFByb3BzID0ge1xyXG4gICAgbmFtZTogc3RyaW5nLFxyXG4gICAgZXh0ZW5zaW9uOiBzdHJpbmdcclxufTtcclxuXHJcbmNvbnN0IEljb25OYW1lID0gKHsgbmFtZSwgZXh0ZW5zaW9uIH06IFByb3BzKSA9PlxyXG4gICAgPGRpdiBjbGFzc05hbWU9J2JjdS1pdGVtLWljb24tbmFtZSc+XHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9J2JjdS1pdGVtLWljb24nPlxyXG4gICAgICAgICAgICA8RmlsZUljb24gZXh0ZW5zaW9uPXtleHRlbnNpb259IC8+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9J2JjdS1pdGVtLW5hbWUnPlxyXG4gICAgICAgICAgICA8SXRlbU5hbWUgbmFtZT17bmFtZX0gLz5cclxuICAgICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEljb25OYW1lO1xyXG4iXX0=