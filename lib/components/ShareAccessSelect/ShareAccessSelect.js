/**
 * 
 * @file Content Explorer Delete Confirmation Dialog
 * @author Box
 */

import React from 'react';

import { ACCESS_NONE, ACCESS_OPEN, ACCESS_COLLAB, ACCESS_COMPANY } from '../../constants';

/* eslint-disable jsx-a11y/label-has-for */
var ShareAccessSelect = function ShareAccessSelect(_ref) {
    var className = _ref.className,
        canSetShareAccess = _ref.canSetShareAccess,
        onChange = _ref.onChange,
        item = _ref.item,
        getLocalizedMessage = _ref.getLocalizedMessage;
    var allowedSharedAccessLevels = item.allowed_shared_link_access_levels,
        permissions = item.permissions,
        sharedLink = item.shared_link;


    if (!allowedSharedAccessLevels) {
        return React.createElement('span', null);
    }

    var _ref2 = sharedLink || {},
        _ref2$access = _ref2.access,
        access = _ref2$access === undefined ? ACCESS_NONE : _ref2$access;

    var _ref3 = permissions || {},
        allowShareAccessChange = _ref3.can_set_share_access;

    var changeHandler = function changeHandler(_ref4) {
        var target = _ref4.target;
        return onChange(target.value, item);
    };
    var allowOpen = allowedSharedAccessLevels.indexOf(ACCESS_OPEN) > -1;
    var allowCollab = allowedSharedAccessLevels.indexOf(ACCESS_COLLAB) > -1;
    var allowCompany = allowedSharedAccessLevels.indexOf(ACCESS_COMPANY) > -1;
    var allowed = canSetShareAccess && allowShareAccessChange && (allowOpen || allowCompany || allowCollab);

    if (!allowed) {
        return React.createElement('span', null);
    }

    return React.createElement(
        'select',
        { className: className, value: access, onChange: changeHandler },
        allowOpen ? React.createElement(
            'option',
            { value: ACCESS_OPEN },
            getLocalizedMessage('buik.item.share.access.open')
        ) : null,
        allowCollab ? React.createElement(
            'option',
            { value: ACCESS_COLLAB },
            getLocalizedMessage('buik.item.share.access.collaborators')
        ) : null,
        allowCompany ? React.createElement(
            'option',
            { value: ACCESS_COMPANY },
            getLocalizedMessage('buik.item.share.access.company')
        ) : null,
        React.createElement(
            'option',
            { value: ACCESS_NONE },
            access === ACCESS_NONE ? getLocalizedMessage('buik.item.share.access.none') : getLocalizedMessage('buik.item.share.access.remove')
        )
    );
};

export default ShareAccessSelect;