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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNoZWNrYm94Q2VsbFJlbmRlcmVyLmpzIl0sIm5hbWVzIjpbIlJlYWN0IiwiaXNSb3dTZWxlY3RhYmxlIiwiQ0xBU1NfQ0hFQ0tCT1hfU1BBTiIsIm9uSXRlbVNlbGVjdCIsInNlbGVjdGFibGVUeXBlIiwiZXh0ZW5zaW9uc1doaXRlbGlzdCIsImhhc0hpdFNlbGVjdGlvbkxpbWl0Iiwicm93RGF0YSIsInNlbGVjdGVkIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0FBTUEsT0FBT0EsS0FBUCxNQUFrQixPQUFsQjtBQUNBLE9BQU9DLGVBQVAsTUFBNEIsc0JBQTVCO0FBQ0EsU0FBU0MsbUJBQVQsUUFBb0MsaUJBQXBDOzs7QUFHQSxnQkFBZSxVQUNYQyxZQURXLEVBRVhDLGNBRlcsRUFHWEMsbUJBSFcsRUFJWEMsb0JBSlc7QUFBQSxXQUtBLGdCQUF1QztBQUFBLFlBQXBDQyxPQUFvQyxRQUFwQ0EsT0FBb0M7QUFBQSxnQ0FDckJBLE9BRHFCLENBQzFDQyxRQUQwQztBQUFBLFlBQzFDQSxRQUQwQyxxQ0FDL0IsS0FEK0I7OztBQUdsRCxZQUFJLENBQUNQLGdCQUFnQkcsY0FBaEIsRUFBZ0NDLG1CQUFoQyxFQUFxREMsb0JBQXJELEVBQTJFQyxPQUEzRSxDQUFMLEVBQTBGO0FBQ3RGLG1CQUFPLGlDQUFQO0FBQ0g7O0FBRUQ7QUFDQSxlQUNJO0FBQUE7QUFBQSxjQUFPLFdBQVUsZUFBakI7QUFDSSwyQ0FBTyxNQUFLLFVBQVosRUFBdUIsU0FBU0MsUUFBaEMsRUFBMEMsVUFBVTtBQUFBLDJCQUFNTCxhQUFhSSxPQUFiLENBQU47QUFBQSxpQkFBcEQsR0FESjtBQUVJLDBDQUFNLFdBQVdMLG1CQUFqQjtBQUZKLFNBREo7QUFNQTtBQUNILEtBcEJjO0FBQUEsQ0FBZiIsImZpbGUiOiJjaGVja2JveENlbGxSZW5kZXJlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBAZmxvd1xyXG4gKiBAZmlsZSBGdW5jdGlvbiB0byByZW5kZXIgdGhlIGNoZWNrYm94IHRhYmxlIGNlbGxcclxuICogQGF1dGhvciBCb3hcclxuICovXHJcblxyXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgaXNSb3dTZWxlY3RhYmxlIGZyb20gJy4vY2VsbFJlbmRlcmVySGVscGVyJztcclxuaW1wb3J0IHsgQ0xBU1NfQ0hFQ0tCT1hfU1BBTiB9IGZyb20gJy4uLy4uL2NvbnN0YW50cyc7XHJcbmltcG9ydCB0eXBlIHsgQm94SXRlbSB9IGZyb20gJy4uLy4uL2Zsb3dUeXBlcyc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCAoXHJcbiAgICBvbkl0ZW1TZWxlY3Q6IEZ1bmN0aW9uLFxyXG4gICAgc2VsZWN0YWJsZVR5cGU6IHN0cmluZyxcclxuICAgIGV4dGVuc2lvbnNXaGl0ZWxpc3Q6IHN0cmluZ1tdLFxyXG4gICAgaGFzSGl0U2VsZWN0aW9uTGltaXQ6IGJvb2xlYW5cclxuKTogRnVuY3Rpb24gPT4gKHsgcm93RGF0YSB9OiB7IHJvd0RhdGE6IEJveEl0ZW0gfSkgPT4ge1xyXG4gICAgY29uc3QgeyBzZWxlY3RlZCA9IGZhbHNlIH0gPSByb3dEYXRhO1xyXG5cclxuICAgIGlmICghaXNSb3dTZWxlY3RhYmxlKHNlbGVjdGFibGVUeXBlLCBleHRlbnNpb25zV2hpdGVsaXN0LCBoYXNIaXRTZWxlY3Rpb25MaW1pdCwgcm93RGF0YSkpIHtcclxuICAgICAgICByZXR1cm4gPHNwYW4gLz47XHJcbiAgICB9XHJcblxyXG4gICAgLyogZXNsaW50LWRpc2FibGUganN4LWExMXkvbGFiZWwtaGFzLWZvciAqL1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPSdidWlrLWNoZWNrYm94Jz5cclxuICAgICAgICAgICAgPGlucHV0IHR5cGU9J2NoZWNrYm94JyBjaGVja2VkPXtzZWxlY3RlZH0gb25DaGFuZ2U9eygpID0+IG9uSXRlbVNlbGVjdChyb3dEYXRhKX0gLz5cclxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPXtDTEFTU19DSEVDS0JPWF9TUEFOfSAvPlxyXG4gICAgICAgIDwvbGFiZWw+XHJcbiAgICApO1xyXG4gICAgLyogZXNsaW50LWVuYWJsZSBqc3gtYTExeS9sYWJlbC1oYXMtZm9yICovXHJcbn07XHJcbiJdfQ==