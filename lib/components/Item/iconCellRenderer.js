/**
 * 
 * @file Function to render the icon table cell
 * @author Box
 */

import React from 'react';
import IconWebLink from '../icons/IconWebLink';
import FileIcon from '../icons/file';
import FolderIcon from '../icons/folder';
import { TYPE_FOLDER, TYPE_FILE, TYPE_WEBLINK } from '../../constants';


export function getIcon(dimension, rowData) {
    var type = rowData.type,
        extension = rowData.extension,
        has_collaborations = rowData.has_collaborations,
        is_externally_owned = rowData.is_externally_owned;

    switch (type) {
        case TYPE_FOLDER:
            return React.createElement(FolderIcon, { dimension: dimension, isCollab: has_collaborations, isExternal: is_externally_owned });
        case TYPE_FILE:
            return React.createElement(FileIcon, { dimension: dimension, extension: extension });
        case TYPE_WEBLINK:
            return React.createElement(IconWebLink, { width: dimension });
        default:
            throw new Error('Unsupported item type!');
    }
}

export default (function () {
    var dimension = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 32;
    return function (_ref) {
        var rowData = _ref.rowData;
        return React.createElement(
            'div',
            { className: 'buik-item-icon' },
            getIcon(dimension, rowData)
        );
    };
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImljb25DZWxsUmVuZGVyZXIuanMiXSwibmFtZXMiOlsiUmVhY3QiLCJJY29uV2ViTGluayIsIkZpbGVJY29uIiwiRm9sZGVySWNvbiIsIlRZUEVfRk9MREVSIiwiVFlQRV9GSUxFIiwiVFlQRV9XRUJMSU5LIiwiZ2V0SWNvbiIsImRpbWVuc2lvbiIsInJvd0RhdGEiLCJ0eXBlIiwiZXh0ZW5zaW9uIiwiaGFzX2NvbGxhYm9yYXRpb25zIiwiaXNfZXh0ZXJuYWxseV9vd25lZCIsIkVycm9yIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0FBTUEsT0FBT0EsS0FBUCxNQUFrQixPQUFsQjtBQUNBLE9BQU9DLFdBQVAsTUFBd0Isc0JBQXhCO0FBQ0EsT0FBT0MsUUFBUCxNQUFxQixlQUFyQjtBQUNBLE9BQU9DLFVBQVAsTUFBdUIsaUJBQXZCO0FBQ0EsU0FBU0MsV0FBVCxFQUFzQkMsU0FBdEIsRUFBaUNDLFlBQWpDLFFBQXFELGlCQUFyRDs7O0FBSUEsT0FBTyxTQUFTQyxPQUFULENBQWlCQyxTQUFqQixFQUFvQ0MsT0FBcEMsRUFBc0Q7QUFBQSxRQUNqREMsSUFEaUQsR0FDcUJELE9BRHJCLENBQ2pEQyxJQURpRDtBQUFBLFFBQzNDQyxTQUQyQyxHQUNxQkYsT0FEckIsQ0FDM0NFLFNBRDJDO0FBQUEsUUFDaENDLGtCQURnQyxHQUNxQkgsT0FEckIsQ0FDaENHLGtCQURnQztBQUFBLFFBQ1pDLG1CQURZLEdBQ3FCSixPQURyQixDQUNaSSxtQkFEWTs7QUFFekQsWUFBUUgsSUFBUjtBQUNJLGFBQUtOLFdBQUw7QUFDSSxtQkFBTyxvQkFBQyxVQUFELElBQVksV0FBV0ksU0FBdkIsRUFBa0MsVUFBVUksa0JBQTVDLEVBQWdFLFlBQVlDLG1CQUE1RSxHQUFQO0FBQ0osYUFBS1IsU0FBTDtBQUNJLG1CQUFPLG9CQUFDLFFBQUQsSUFBVSxXQUFXRyxTQUFyQixFQUFnQyxXQUFXRyxTQUEzQyxHQUFQO0FBQ0osYUFBS0wsWUFBTDtBQUNJLG1CQUFPLG9CQUFDLFdBQUQsSUFBYSxPQUFPRSxTQUFwQixHQUFQO0FBQ0o7QUFDSSxrQkFBTSxJQUFJTSxLQUFKLENBQVUsd0JBQVYsQ0FBTjtBQVJSO0FBVUg7O0FBRUQsZ0JBQWU7QUFBQSxRQUFDTixTQUFELHVFQUFxQixFQUFyQjtBQUFBLFdBQXNDO0FBQUEsWUFBR0MsT0FBSCxRQUFHQSxPQUFIO0FBQUEsZUFDakQ7QUFBQTtBQUFBLGNBQUssV0FBVSxnQkFBZjtBQUNLRixvQkFBUUMsU0FBUixFQUFtQkMsT0FBbkI7QUFETCxTQURpRDtBQUFBLEtBQXRDO0FBQUEsQ0FBZiIsImZpbGUiOiJpY29uQ2VsbFJlbmRlcmVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIEBmbG93XHJcbiAqIEBmaWxlIEZ1bmN0aW9uIHRvIHJlbmRlciB0aGUgaWNvbiB0YWJsZSBjZWxsXHJcbiAqIEBhdXRob3IgQm94XHJcbiAqL1xyXG5cclxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IEljb25XZWJMaW5rIGZyb20gJy4uL2ljb25zL0ljb25XZWJMaW5rJztcclxuaW1wb3J0IEZpbGVJY29uIGZyb20gJy4uL2ljb25zL2ZpbGUnO1xyXG5pbXBvcnQgRm9sZGVySWNvbiBmcm9tICcuLi9pY29ucy9mb2xkZXInO1xyXG5pbXBvcnQgeyBUWVBFX0ZPTERFUiwgVFlQRV9GSUxFLCBUWVBFX1dFQkxJTksgfSBmcm9tICcuLi8uLi9jb25zdGFudHMnO1xyXG5pbXBvcnQgdHlwZSB7IEJveEl0ZW0gfSBmcm9tICcuLi8uLi9mbG93VHlwZXMnO1xyXG5pbXBvcnQgJy4vSWNvbkNlbGwuc2Nzcyc7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0SWNvbihkaW1lbnNpb246IG51bWJlciwgcm93RGF0YTogQm94SXRlbSkge1xyXG4gICAgY29uc3QgeyB0eXBlLCBleHRlbnNpb24sIGhhc19jb2xsYWJvcmF0aW9ucywgaXNfZXh0ZXJuYWxseV9vd25lZCB9OiBCb3hJdGVtID0gcm93RGF0YTtcclxuICAgIHN3aXRjaCAodHlwZSkge1xyXG4gICAgICAgIGNhc2UgVFlQRV9GT0xERVI6XHJcbiAgICAgICAgICAgIHJldHVybiA8Rm9sZGVySWNvbiBkaW1lbnNpb249e2RpbWVuc2lvbn0gaXNDb2xsYWI9e2hhc19jb2xsYWJvcmF0aW9uc30gaXNFeHRlcm5hbD17aXNfZXh0ZXJuYWxseV9vd25lZH0gLz47XHJcbiAgICAgICAgY2FzZSBUWVBFX0ZJTEU6XHJcbiAgICAgICAgICAgIHJldHVybiA8RmlsZUljb24gZGltZW5zaW9uPXtkaW1lbnNpb259IGV4dGVuc2lvbj17ZXh0ZW5zaW9ufSAvPjtcclxuICAgICAgICBjYXNlIFRZUEVfV0VCTElOSzpcclxuICAgICAgICAgICAgcmV0dXJuIDxJY29uV2ViTGluayB3aWR0aD17ZGltZW5zaW9ufSAvPjtcclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1Vuc3VwcG9ydGVkIGl0ZW0gdHlwZSEnKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgKGRpbWVuc2lvbjogbnVtYmVyID0gMzIpOiBGdW5jdGlvbiA9PiAoeyByb3dEYXRhIH06IHsgcm93RGF0YTogQm94SXRlbSB9KSA9PlxyXG4gICAgPGRpdiBjbGFzc05hbWU9J2J1aWstaXRlbS1pY29uJz5cclxuICAgICAgICB7Z2V0SWNvbihkaW1lbnNpb24sIHJvd0RhdGEpfVxyXG4gICAgPC9kaXY+O1xyXG4iXX0=