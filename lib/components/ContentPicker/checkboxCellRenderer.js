/**
 * 
 * @file Function to render the checkbox table cell
 * @author Box
 */

import React from 'react';
import isRowSelectable from './cellRendererHelper';
import { CLASS_CHECKBOX_SPAN } from '../../constants';


export default (function (onItemSelect, selectableType, extensionsWhitelist, hasHitSelectionLimit) {
    return function (_ref) {
        var rowData = _ref.rowData;
        var _rowData$selected = rowData.selected,
            selected = _rowData$selected === undefined ? false : _rowData$selected;


        if (!isRowSelectable(selectableType, extensionsWhitelist, hasHitSelectionLimit, rowData)) {
            return React.createElement('span', null);
        }

        /* eslint-disable jsx-a11y/label-has-for */
        return React.createElement(
            'label',
            { className: 'buik-checkbox' },
            React.createElement('input', { type: 'checkbox', checked: selected, onChange: function onChange() {
                    return onItemSelect(rowData);
                } }),
            React.createElement('span', { className: CLASS_CHECKBOX_SPAN })
        );
        /* eslint-enable jsx-a11y/label-has-for */
    };
});