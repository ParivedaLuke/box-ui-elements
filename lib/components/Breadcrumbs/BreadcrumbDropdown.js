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