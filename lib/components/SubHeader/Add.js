/**
 * 
 * @file Content sub header component
 * @author Box
 */

import React from 'react';
import DropdownMenu from '../DropdownMenu';
import { Menu, MenuItem } from '../Menu';
import { Button } from '../Button';
import IconPlus from '../icons/IconPlus';


var Add = function Add(_ref) {
    var onUpload = _ref.onUpload,
        onCreate = _ref.onCreate,
        isLoaded = _ref.isLoaded,
        getLocalizedMessage = _ref.getLocalizedMessage;
    return React.createElement(
        DropdownMenu,
        { isRightAligned: true, constrainToScrollParent: true },
        React.createElement(
            Button,
            { className: 'buik-btn-add', isDisabled: !isLoaded },
            React.createElement(IconPlus, null)
        ),
        React.createElement(
            Menu,
            { className: 'buik-sort' },
            React.createElement(
                MenuItem,
                { onClick: onUpload },
                getLocalizedMessage('buik.header.button.upload')
            ),
            React.createElement(
                MenuItem,
                { onClick: onCreate },
                getLocalizedMessage('buik.header.button.create')
            )
        )
    );
};

export default Add;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkFkZC5qcyJdLCJuYW1lcyI6WyJSZWFjdCIsIkRyb3Bkb3duTWVudSIsIk1lbnUiLCJNZW51SXRlbSIsIkJ1dHRvbiIsIkljb25QbHVzIiwiQWRkIiwib25VcGxvYWQiLCJvbkNyZWF0ZSIsImlzTG9hZGVkIiwiZ2V0TG9jYWxpemVkTWVzc2FnZSJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztBQU1BLE9BQU9BLEtBQVAsTUFBa0IsT0FBbEI7QUFDQSxPQUFPQyxZQUFQLE1BQXlCLGlCQUF6QjtBQUNBLFNBQVNDLElBQVQsRUFBZUMsUUFBZixRQUErQixTQUEvQjtBQUNBLFNBQVNDLE1BQVQsUUFBdUIsV0FBdkI7QUFDQSxPQUFPQyxRQUFQLE1BQXFCLG1CQUFyQjs7O0FBVUEsSUFBTUMsTUFBTSxTQUFOQSxHQUFNO0FBQUEsUUFBR0MsUUFBSCxRQUFHQSxRQUFIO0FBQUEsUUFBYUMsUUFBYixRQUFhQSxRQUFiO0FBQUEsUUFBdUJDLFFBQXZCLFFBQXVCQSxRQUF2QjtBQUFBLFFBQWlDQyxtQkFBakMsUUFBaUNBLG1CQUFqQztBQUFBLFdBQ1I7QUFBQyxvQkFBRDtBQUFBLFVBQWMsb0JBQWQsRUFBNkIsNkJBQTdCO0FBQ0k7QUFBQyxrQkFBRDtBQUFBLGNBQVEsV0FBVSxjQUFsQixFQUFpQyxZQUFZLENBQUNELFFBQTlDO0FBQ0ksZ0NBQUMsUUFBRDtBQURKLFNBREo7QUFJSTtBQUFDLGdCQUFEO0FBQUEsY0FBTSxXQUFVLFdBQWhCO0FBQ0k7QUFBQyx3QkFBRDtBQUFBLGtCQUFVLFNBQVNGLFFBQW5CO0FBQ0tHLG9DQUFvQiwyQkFBcEI7QUFETCxhQURKO0FBSUk7QUFBQyx3QkFBRDtBQUFBLGtCQUFVLFNBQVNGLFFBQW5CO0FBQ0tFLG9DQUFvQiwyQkFBcEI7QUFETDtBQUpKO0FBSkosS0FEUTtBQUFBLENBQVo7O0FBZUEsZUFBZUosR0FBZiIsImZpbGUiOiJBZGQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQGZsb3dcclxuICogQGZpbGUgQ29udGVudCBzdWIgaGVhZGVyIGNvbXBvbmVudFxyXG4gKiBAYXV0aG9yIEJveFxyXG4gKi9cclxuXHJcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBEcm9wZG93bk1lbnUgZnJvbSAnLi4vRHJvcGRvd25NZW51JztcclxuaW1wb3J0IHsgTWVudSwgTWVudUl0ZW0gfSBmcm9tICcuLi9NZW51JztcclxuaW1wb3J0IHsgQnV0dG9uIH0gZnJvbSAnLi4vQnV0dG9uJztcclxuaW1wb3J0IEljb25QbHVzIGZyb20gJy4uL2ljb25zL0ljb25QbHVzJztcclxuaW1wb3J0ICcuL0FkZC5zY3NzJztcclxuXHJcbnR5cGUgUHJvcHMgPSB7XHJcbiAgICBvblVwbG9hZDogRnVuY3Rpb24sXHJcbiAgICBvbkNyZWF0ZTogRnVuY3Rpb24sXHJcbiAgICBpc0xvYWRlZDogYm9vbGVhbixcclxuICAgIGdldExvY2FsaXplZE1lc3NhZ2U6IEZ1bmN0aW9uXHJcbn07XHJcblxyXG5jb25zdCBBZGQgPSAoeyBvblVwbG9hZCwgb25DcmVhdGUsIGlzTG9hZGVkLCBnZXRMb2NhbGl6ZWRNZXNzYWdlIH06IFByb3BzKSA9PlxyXG4gICAgPERyb3Bkb3duTWVudSBpc1JpZ2h0QWxpZ25lZCBjb25zdHJhaW5Ub1Njcm9sbFBhcmVudD5cclxuICAgICAgICA8QnV0dG9uIGNsYXNzTmFtZT0nYnVpay1idG4tYWRkJyBpc0Rpc2FibGVkPXshaXNMb2FkZWR9PlxyXG4gICAgICAgICAgICA8SWNvblBsdXMgLz5cclxuICAgICAgICA8L0J1dHRvbj5cclxuICAgICAgICA8TWVudSBjbGFzc05hbWU9J2J1aWstc29ydCc+XHJcbiAgICAgICAgICAgIDxNZW51SXRlbSBvbkNsaWNrPXtvblVwbG9hZH0+XHJcbiAgICAgICAgICAgICAgICB7Z2V0TG9jYWxpemVkTWVzc2FnZSgnYnVpay5oZWFkZXIuYnV0dG9uLnVwbG9hZCcpfVxyXG4gICAgICAgICAgICA8L01lbnVJdGVtPlxyXG4gICAgICAgICAgICA8TWVudUl0ZW0gb25DbGljaz17b25DcmVhdGV9PlxyXG4gICAgICAgICAgICAgICAge2dldExvY2FsaXplZE1lc3NhZ2UoJ2J1aWsuaGVhZGVyLmJ1dHRvbi5jcmVhdGUnKX1cclxuICAgICAgICAgICAgPC9NZW51SXRlbT5cclxuICAgICAgICA8L01lbnU+XHJcbiAgICA8L0Ryb3Bkb3duTWVudT47XHJcblxyXG5leHBvcnQgZGVmYXVsdCBBZGQ7XHJcbiJdfQ==