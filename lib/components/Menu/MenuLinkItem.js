function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

/**
 * 
 * @file Menu Link Item component
 * @author Box
 */

import React, { cloneElement, Children } from 'react';
import omit from 'lodash.omit';

var MenuLinkItem = function MenuLinkItem(_ref) {
    var children = _ref.children,
        rest = _objectWithoutProperties(_ref, ['children']);

    var linkEl = Children.only(children);

    var listItemProps = omit(rest, ['role', 'tabIndex']);
    listItemProps.role = 'none';

    var linkProps = {
        role: 'menuitem',
        tabIndex: -1
    };

    return React.createElement(
        'li',
        listItemProps,
        cloneElement(linkEl, linkProps)
    );
};

export default MenuLinkItem;