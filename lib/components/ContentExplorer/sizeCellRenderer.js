/**
 * 
 * @file Function to render the date table cell
 * @author Box
 */

import React from 'react';
import getSize from '../../util/size';

export default (function () {
    return function (_ref) {
        var cellData = _ref.cellData;
        return React.createElement(
            'span',
            null,
            getSize(cellData)
        );
    };
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNpemVDZWxsUmVuZGVyZXIuanMiXSwibmFtZXMiOlsiUmVhY3QiLCJnZXRTaXplIiwiY2VsbERhdGEiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7QUFNQSxPQUFPQSxLQUFQLE1BQWtCLE9BQWxCO0FBQ0EsT0FBT0MsT0FBUCxNQUFvQixpQkFBcEI7O0FBRUEsZ0JBQWU7QUFBQSxXQUFNO0FBQUEsWUFBR0MsUUFBSCxRQUFHQSxRQUFIO0FBQUEsZUFDakI7QUFBQTtBQUFBO0FBQ0tELG9CQUFRQyxRQUFSO0FBREwsU0FEaUI7QUFBQSxLQUFOO0FBQUEsQ0FBZiIsImZpbGUiOiJzaXplQ2VsbFJlbmRlcmVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIEBmbG93XHJcbiAqIEBmaWxlIEZ1bmN0aW9uIHRvIHJlbmRlciB0aGUgZGF0ZSB0YWJsZSBjZWxsXHJcbiAqIEBhdXRob3IgQm94XHJcbiAqL1xyXG5cclxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IGdldFNpemUgZnJvbSAnLi4vLi4vdXRpbC9zaXplJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0ICgpID0+ICh7IGNlbGxEYXRhIH06IHsgY2VsbERhdGE6IG51bWJlciB9KSA9PlxyXG4gICAgPHNwYW4+XHJcbiAgICAgICAge2dldFNpemUoY2VsbERhdGEpfVxyXG4gICAgPC9zcGFuPjtcclxuIl19