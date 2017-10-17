/**
 * 
 * @file File Properties SkillData component
 * @author Box
 */

import React from 'react';
import getSize from '../../util/size';
import { getDateTime } from '../../util/datetime';


var FileProperties = function FileProperties(_ref) {
    var file = _ref.file,
        getLocalizedMessage = _ref.getLocalizedMessage;
    var owned_by = file.owned_by,
        created_by = file.created_by,
        _file$created_at = file.created_at,
        created_at = _file$created_at === undefined ? '' : _file$created_at,
        _file$modified_at = file.modified_at,
        modified_at = _file$modified_at === undefined ? '' : _file$modified_at,
        _file$size = file.size,
        size = _file$size === undefined ? 0 : _file$size;

    var _ref2 = owned_by || {},
        _ref2$name = _ref2.name,
        owner = _ref2$name === undefined ? '' : _ref2$name;

    var _ref3 = created_by || {},
        _ref3$name = _ref3.name,
        uploader = _ref3$name === undefined ? '' : _ref3$name;

    return React.createElement(
        'dl',
        null,
        !!owner && React.createElement(
            'dt',
            null,
            getLocalizedMessage('buik.item.owner')
        ),
        !!owner && React.createElement(
            'dd',
            null,
            owner
        ),
        !!uploader && React.createElement(
            'dt',
            null,
            getLocalizedMessage('buik.item.uploader')
        ),
        !!uploader && React.createElement(
            'dd',
            null,
            uploader
        ),
        React.createElement(
            'dt',
            null,
            getLocalizedMessage('buik.item.created')
        ),
        React.createElement(
            'dd',
            null,
            getDateTime(created_at)
        ),
        React.createElement(
            'dt',
            null,
            getLocalizedMessage('buik.item.modified')
        ),
        React.createElement(
            'dd',
            null,
            getDateTime(modified_at)
        ),
        React.createElement(
            'dt',
            null,
            getLocalizedMessage('buik.item.size')
        ),
        React.createElement(
            'dd',
            null,
            getSize(size)
        )
    );
};

export default FileProperties;