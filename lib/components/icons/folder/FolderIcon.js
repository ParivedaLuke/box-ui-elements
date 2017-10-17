/**
 * 
 * @file Determines folder icon
 * @author Box
 */

import React from 'react';
import IconFolderCollab from './IconFolderCollab';
import IconFolderExternal from './IconFolderExternal';
import IconFolderPersonal from './IconFolderPersonal';

var FolderIcon = function FolderIcon(_ref) {
    var _ref$isExternal = _ref.isExternal,
        isExternal = _ref$isExternal === undefined ? false : _ref$isExternal,
        _ref$isCollab = _ref.isCollab,
        isCollab = _ref$isCollab === undefined ? false : _ref$isCollab,
        _ref$dimension = _ref.dimension,
        dimension = _ref$dimension === undefined ? 32 : _ref$dimension;

    if (isExternal) {
        return React.createElement(IconFolderExternal, { height: dimension, width: dimension });
    }

    if (isCollab) {
        return React.createElement(IconFolderCollab, { height: dimension, width: dimension });
    }

    return React.createElement(IconFolderPersonal, { height: dimension, width: dimension });
};

export default FolderIcon;