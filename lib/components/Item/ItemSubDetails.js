/**
 * 
 * @file Component for the sub details for the item name
 * @author Box
 */

import React from 'react';
import getSize from '../../util/size';
import { getDate } from '../../util/datetime';
import { VIEW_RECENTS } from '../../constants';


var ItemSubDetails = function ItemSubDetails(_ref) {
    var view = _ref.view,
        item = _ref.item,
        getLocalizedMessage = _ref.getLocalizedMessage;
    var size = item.size,
        _item$modified_at = item.modified_at,
        modified_at = _item$modified_at === undefined ? '' : _item$modified_at,
        _item$interacted_at = item.interacted_at,
        interacted_at = _item$interacted_at === undefined ? '' : _item$interacted_at;

    var today = getLocalizedMessage('buik.date.today');
    var yesterday = getLocalizedMessage('buik.date.yesterday');
    var isRecents = view === VIEW_RECENTS;
    var date = getDate(isRecents ? interacted_at || modified_at : modified_at, today, yesterday);
    var message = isRecents ? getLocalizedMessage('buik.item.interacted') : getLocalizedMessage('buik.item.modified');

    return React.createElement(
        'span',
        null,
        message + ' ' + date + ' - ' + getSize(size)
    );
};

export default ItemSubDetails;