/**
 * 
 * @file Preview header component
 * @author Box
 */

import React from 'react';
import { PlainButton } from '../Button';
import IconCross from '../icons/IconCross';
import { getIcon } from '../Item/iconCellRenderer';


var Header = function Header(_ref) {
    var file = _ref.file,
        onClose = _ref.onClose,
        getLocalizedMessage = _ref.getLocalizedMessage;

    var name = file ? file.name : '';
    var close = getLocalizedMessage('buik.modal.dialog.share.button.close');
    return React.createElement(
        'div',
        { className: 'bcpr-header' },
        React.createElement(
            'div',
            { className: 'bcpr-name' },
            file ? getIcon(24, file) : null,
            React.createElement(
                'span',
                null,
                name
            )
        ),
        React.createElement(
            'div',
            { className: 'bcpr-btns' },
            onClose && React.createElement(
                PlainButton,
                { className: 'bcpr-btn', onClick: onClose, title: close, 'aria-label': close },
                React.createElement(IconCross, { color: '#777', width: 14, height: 14 })
            )
        )
    );
};

export default Header;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkhlYWRlci5qcyJdLCJuYW1lcyI6WyJSZWFjdCIsIlBsYWluQnV0dG9uIiwiSWNvbkNyb3NzIiwiZ2V0SWNvbiIsIkhlYWRlciIsImZpbGUiLCJvbkNsb3NlIiwiZ2V0TG9jYWxpemVkTWVzc2FnZSIsIm5hbWUiLCJjbG9zZSJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztBQU1BLE9BQU9BLEtBQVAsTUFBa0IsT0FBbEI7QUFDQSxTQUFTQyxXQUFULFFBQTRCLFdBQTVCO0FBQ0EsT0FBT0MsU0FBUCxNQUFzQixvQkFBdEI7QUFDQSxTQUFTQyxPQUFULFFBQXdCLDBCQUF4Qjs7O0FBVUEsSUFBTUMsU0FBUyxTQUFUQSxNQUFTLE9BQW1EO0FBQUEsUUFBaERDLElBQWdELFFBQWhEQSxJQUFnRDtBQUFBLFFBQTFDQyxPQUEwQyxRQUExQ0EsT0FBMEM7QUFBQSxRQUFqQ0MsbUJBQWlDLFFBQWpDQSxtQkFBaUM7O0FBQzlELFFBQU1DLE9BQU9ILE9BQU9BLEtBQUtHLElBQVosR0FBbUIsRUFBaEM7QUFDQSxRQUFNQyxRQUFRRixvQkFBb0Isc0NBQXBCLENBQWQ7QUFDQSxXQUNJO0FBQUE7QUFBQSxVQUFLLFdBQVUsYUFBZjtBQUNJO0FBQUE7QUFBQSxjQUFLLFdBQVUsV0FBZjtBQUNLRixtQkFBT0YsUUFBUSxFQUFSLEVBQVlFLElBQVosQ0FBUCxHQUEyQixJQURoQztBQUVJO0FBQUE7QUFBQTtBQUNLRztBQURMO0FBRkosU0FESjtBQU9JO0FBQUE7QUFBQSxjQUFLLFdBQVUsV0FBZjtBQUNLRix1QkFDRztBQUFDLDJCQUFEO0FBQUEsa0JBQWEsV0FBVSxVQUF2QixFQUFrQyxTQUFTQSxPQUEzQyxFQUFvRCxPQUFPRyxLQUEzRCxFQUFrRSxjQUFZQSxLQUE5RTtBQUNJLG9DQUFDLFNBQUQsSUFBVyxPQUFNLE1BQWpCLEVBQXdCLE9BQU8sRUFBL0IsRUFBbUMsUUFBUSxFQUEzQztBQURKO0FBRlI7QUFQSixLQURKO0FBZ0JILENBbkJEOztBQXFCQSxlQUFlTCxNQUFmIiwiZmlsZSI6IkhlYWRlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBAZmxvd1xyXG4gKiBAZmlsZSBQcmV2aWV3IGhlYWRlciBjb21wb25lbnRcclxuICogQGF1dGhvciBCb3hcclxuICovXHJcblxyXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBQbGFpbkJ1dHRvbiB9IGZyb20gJy4uL0J1dHRvbic7XHJcbmltcG9ydCBJY29uQ3Jvc3MgZnJvbSAnLi4vaWNvbnMvSWNvbkNyb3NzJztcclxuaW1wb3J0IHsgZ2V0SWNvbiB9IGZyb20gJy4uL0l0ZW0vaWNvbkNlbGxSZW5kZXJlcic7XHJcbmltcG9ydCB0eXBlIHsgQm94SXRlbSB9IGZyb20gJy4uLy4uL2Zsb3dUeXBlcyc7XHJcbmltcG9ydCAnLi9IZWFkZXIuc2Nzcyc7XHJcblxyXG50eXBlIFByb3BzID0ge1xyXG4gICAgZmlsZT86IEJveEl0ZW0sXHJcbiAgICBnZXRMb2NhbGl6ZWRNZXNzYWdlOiBGdW5jdGlvbixcclxuICAgIG9uQ2xvc2U/OiBGdW5jdGlvblxyXG59O1xyXG5cclxuY29uc3QgSGVhZGVyID0gKHsgZmlsZSwgb25DbG9zZSwgZ2V0TG9jYWxpemVkTWVzc2FnZSB9OiBQcm9wcykgPT4ge1xyXG4gICAgY29uc3QgbmFtZSA9IGZpbGUgPyBmaWxlLm5hbWUgOiAnJztcclxuICAgIGNvbnN0IGNsb3NlID0gZ2V0TG9jYWxpemVkTWVzc2FnZSgnYnVpay5tb2RhbC5kaWFsb2cuc2hhcmUuYnV0dG9uLmNsb3NlJyk7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPSdiY3ByLWhlYWRlcic+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdiY3ByLW5hbWUnPlxyXG4gICAgICAgICAgICAgICAge2ZpbGUgPyBnZXRJY29uKDI0LCBmaWxlKSA6IG51bGx9XHJcbiAgICAgICAgICAgICAgICA8c3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICB7bmFtZX1cclxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdiY3ByLWJ0bnMnPlxyXG4gICAgICAgICAgICAgICAge29uQ2xvc2UgJiZcclxuICAgICAgICAgICAgICAgICAgICA8UGxhaW5CdXR0b24gY2xhc3NOYW1lPSdiY3ByLWJ0bicgb25DbGljaz17b25DbG9zZX0gdGl0bGU9e2Nsb3NlfSBhcmlhLWxhYmVsPXtjbG9zZX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxJY29uQ3Jvc3MgY29sb3I9JyM3NzcnIHdpZHRoPXsxNH0gaGVpZ2h0PXsxNH0gLz5cclxuICAgICAgICAgICAgICAgICAgICA8L1BsYWluQnV0dG9uPn1cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICApO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgSGVhZGVyO1xyXG4iXX0=