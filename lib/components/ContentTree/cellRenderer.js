/**
 * 
 * @file Function to render the table cell
 * @author Box
 */

import React from 'react';
import { Button } from '../Button';
import iconCellRenderer from '../Item/iconCellRenderer';
import ItemName from '../Item/ItemName';
import ItemSubDetails from '../Item/ItemSubDetails';
import { TYPE_FOLDER, VIEW_FOLDER } from '../../constants';


export default (function (getLocalizedMessage, onExpanderClick, onItemClick) {
    var isSmall = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
    var isLoading = arguments[4];
    return function (_ref) {
        var rowData = _ref.rowData;
        var path_collection = rowData.path_collection,
            selected = rowData.selected;

        if (!path_collection) {
            throw new Error('Bad Item!');
        }

        var paddingLeft = (path_collection.total_count - 1) * (isSmall ? 22 : 34) + 'px';
        var onClick = function onClick() {
            return onExpanderClick(rowData);
        };

        return React.createElement(
            'div',
            { className: 'bft-cell-node', style: { paddingLeft: paddingLeft } },
            rowData.type === TYPE_FOLDER ? React.createElement(
                Button,
                { onClick: onClick, className: 'bft-cell-node-btn', isDisabled: isLoading },
                selected ? '-' : '+'
            ) : React.createElement('div', { className: 'bft-cell-node-btn' }),
            iconCellRenderer(isSmall ? 24 : 32)({ rowData: rowData }),
            React.createElement(
                'div',
                { className: 'buik-item-name' },
                React.createElement(ItemName, { isTouch: false, item: rowData, canPreview: true, onClick: onItemClick }),
                isSmall ? null : React.createElement(
                    'div',
                    { className: 'buik-item-details' },
                    React.createElement(ItemSubDetails, { view: VIEW_FOLDER, item: rowData, getLocalizedMessage: getLocalizedMessage })
                )
            )
        );
    };
});