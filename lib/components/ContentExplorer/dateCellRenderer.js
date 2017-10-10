/**
 * 
 * @file Function to render the date table cell
 * @author Box
 */

import React from 'react';
import { getDate } from '../../util/datetime';

export default (function (getLocalizedMessage) {
    return function (_ref) {
        var cellData = _ref.cellData;
        return React.createElement(
            'span',
            null,
            getDate(cellData, getLocalizedMessage('buik.date.today'), getLocalizedMessage('buik.date.yesterday'))
        );
    };
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRhdGVDZWxsUmVuZGVyZXIuanMiXSwibmFtZXMiOlsiUmVhY3QiLCJnZXREYXRlIiwiZ2V0TG9jYWxpemVkTWVzc2FnZSIsImNlbGxEYXRhIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0FBTUEsT0FBT0EsS0FBUCxNQUFrQixPQUFsQjtBQUNBLFNBQVNDLE9BQVQsUUFBd0IscUJBQXhCOztBQUVBLGdCQUFlLFVBQUNDLG1CQUFEO0FBQUEsV0FBbUM7QUFBQSxZQUFHQyxRQUFILFFBQUdBLFFBQUg7QUFBQSxlQUM5QztBQUFBO0FBQUE7QUFDS0Ysb0JBQVFFLFFBQVIsRUFBa0JELG9CQUFvQixpQkFBcEIsQ0FBbEIsRUFBMERBLG9CQUFvQixxQkFBcEIsQ0FBMUQ7QUFETCxTQUQ4QztBQUFBLEtBQW5DO0FBQUEsQ0FBZiIsImZpbGUiOiJkYXRlQ2VsbFJlbmRlcmVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIEBmbG93XHJcbiAqIEBmaWxlIEZ1bmN0aW9uIHRvIHJlbmRlciB0aGUgZGF0ZSB0YWJsZSBjZWxsXHJcbiAqIEBhdXRob3IgQm94XHJcbiAqL1xyXG5cclxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgZ2V0RGF0ZSB9IGZyb20gJy4uLy4uL3V0aWwvZGF0ZXRpbWUnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgKGdldExvY2FsaXplZE1lc3NhZ2U6IEZ1bmN0aW9uKSA9PiAoeyBjZWxsRGF0YSB9OiB7IGNlbGxEYXRhOiBzdHJpbmcgfSkgPT5cclxuICAgIDxzcGFuPlxyXG4gICAgICAgIHtnZXREYXRlKGNlbGxEYXRhLCBnZXRMb2NhbGl6ZWRNZXNzYWdlKCdidWlrLmRhdGUudG9kYXknKSwgZ2V0TG9jYWxpemVkTWVzc2FnZSgnYnVpay5kYXRlLnllc3RlcmRheScpKX1cclxuICAgIDwvc3Bhbj47XHJcbiJdfQ==