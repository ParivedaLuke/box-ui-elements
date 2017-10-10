/**
 * 
 * @file Drop down part of breadcrumbs
 * @author Box
 */

import React from 'react';
import DropdownMenu from '../DropdownMenu';
import { Menu, MenuItem } from '../Menu';
import { PlainButton } from '../Button';


var BreadcrumbDropdown = function BreadcrumbDropdown(_ref) {
    var crumbs = _ref.crumbs,
        onCrumbClick = _ref.onCrumbClick,
        _ref$className = _ref.className,
        className = _ref$className === undefined ? '' : _ref$className;
    return React.createElement(
        DropdownMenu,
        { constrainToScrollParent: true },
        React.createElement(
            PlainButton,
            { className: 'buik-breadcrumbs-drop-down ' + className },
            '\xB7\xB7\xB7'
        ),
        React.createElement(
            Menu,
            null,
            crumbs.map(function (_ref2) {
                var id = _ref2.id,
                    name = _ref2.name;
                return React.createElement(
                    MenuItem,
                    { key: id, onClick: function onClick() {
                            return onCrumbClick(id);
                        } },
                    name
                );
            })
        )
    );
};

export default BreadcrumbDropdown;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkJyZWFkY3J1bWJEcm9wZG93bi5qcyJdLCJuYW1lcyI6WyJSZWFjdCIsIkRyb3Bkb3duTWVudSIsIk1lbnUiLCJNZW51SXRlbSIsIlBsYWluQnV0dG9uIiwiQnJlYWRjcnVtYkRyb3Bkb3duIiwiY3J1bWJzIiwib25DcnVtYkNsaWNrIiwiY2xhc3NOYW1lIiwibWFwIiwiaWQiLCJuYW1lIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0FBTUEsT0FBT0EsS0FBUCxNQUFrQixPQUFsQjtBQUNBLE9BQU9DLFlBQVAsTUFBeUIsaUJBQXpCO0FBQ0EsU0FBU0MsSUFBVCxFQUFlQyxRQUFmLFFBQStCLFNBQS9CO0FBQ0EsU0FBU0MsV0FBVCxRQUE0QixXQUE1Qjs7O0FBVUEsSUFBTUMscUJBQXFCLFNBQXJCQSxrQkFBcUI7QUFBQSxRQUFHQyxNQUFILFFBQUdBLE1BQUg7QUFBQSxRQUFXQyxZQUFYLFFBQVdBLFlBQVg7QUFBQSw4QkFBeUJDLFNBQXpCO0FBQUEsUUFBeUJBLFNBQXpCLGtDQUFxQyxFQUFyQztBQUFBLFdBQ3ZCO0FBQUMsb0JBQUQ7QUFBQSxVQUFjLDZCQUFkO0FBQ0k7QUFBQyx1QkFBRDtBQUFBLGNBQWEsMkNBQXlDQSxTQUF0RDtBQUFBO0FBQUEsU0FESjtBQUVJO0FBQUMsZ0JBQUQ7QUFBQTtBQUNLRixtQkFBT0csR0FBUCxDQUFXO0FBQUEsb0JBQUdDLEVBQUgsU0FBR0EsRUFBSDtBQUFBLG9CQUFPQyxJQUFQLFNBQU9BLElBQVA7QUFBQSx1QkFDUjtBQUFDLDRCQUFEO0FBQUEsc0JBQVUsS0FBS0QsRUFBZixFQUFtQixTQUFTO0FBQUEsbUNBQU1ILGFBQWFHLEVBQWIsQ0FBTjtBQUFBLHlCQUE1QjtBQUNLQztBQURMLGlCQURRO0FBQUEsYUFBWDtBQURMO0FBRkosS0FEdUI7QUFBQSxDQUEzQjs7QUFZQSxlQUFlTixrQkFBZiIsImZpbGUiOiJCcmVhZGNydW1iRHJvcGRvd24uanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQGZsb3dcclxuICogQGZpbGUgRHJvcCBkb3duIHBhcnQgb2YgYnJlYWRjcnVtYnNcclxuICogQGF1dGhvciBCb3hcclxuICovXHJcblxyXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgRHJvcGRvd25NZW51IGZyb20gJy4uL0Ryb3Bkb3duTWVudSc7XHJcbmltcG9ydCB7IE1lbnUsIE1lbnVJdGVtIH0gZnJvbSAnLi4vTWVudSc7XHJcbmltcG9ydCB7IFBsYWluQnV0dG9uIH0gZnJvbSAnLi4vQnV0dG9uJztcclxuaW1wb3J0IHR5cGUgeyBDcnVtYiB9IGZyb20gJy4uLy4uL2Zsb3dUeXBlcyc7XHJcbmltcG9ydCAnLi9CcmVhZGNydW1iRHJvcGRvd24uc2Nzcyc7XHJcblxyXG50eXBlIFByb3BzID0ge1xyXG4gICAgY2xhc3NOYW1lOiBzdHJpbmcsXHJcbiAgICBvbkNydW1iQ2xpY2s6IEZ1bmN0aW9uLFxyXG4gICAgY3J1bWJzOiBDcnVtYltdXHJcbn07XHJcblxyXG5jb25zdCBCcmVhZGNydW1iRHJvcGRvd24gPSAoeyBjcnVtYnMsIG9uQ3J1bWJDbGljaywgY2xhc3NOYW1lID0gJycgfTogUHJvcHMpID0+XHJcbiAgICA8RHJvcGRvd25NZW51IGNvbnN0cmFpblRvU2Nyb2xsUGFyZW50PlxyXG4gICAgICAgIDxQbGFpbkJ1dHRvbiBjbGFzc05hbWU9e2BidWlrLWJyZWFkY3J1bWJzLWRyb3AtZG93biAke2NsYXNzTmFtZX1gfT7Ct8K3wrc8L1BsYWluQnV0dG9uPlxyXG4gICAgICAgIDxNZW51PlxyXG4gICAgICAgICAgICB7Y3J1bWJzLm1hcCgoeyBpZCwgbmFtZSB9OiBDcnVtYikgPT5cclxuICAgICAgICAgICAgICAgIDxNZW51SXRlbSBrZXk9e2lkfSBvbkNsaWNrPXsoKSA9PiBvbkNydW1iQ2xpY2soaWQpfT5cclxuICAgICAgICAgICAgICAgICAgICB7bmFtZX1cclxuICAgICAgICAgICAgICAgIDwvTWVudUl0ZW0+XHJcbiAgICAgICAgICAgICl9XHJcbiAgICAgICAgPC9NZW51PlxyXG4gICAgPC9Ecm9wZG93bk1lbnU+O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgQnJlYWRjcnVtYkRyb3Bkb3duO1xyXG4iXX0=