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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkZpbGVQcm9wZXJ0aWVzLmpzIl0sIm5hbWVzIjpbIlJlYWN0IiwiZ2V0U2l6ZSIsImdldERhdGVUaW1lIiwiRmlsZVByb3BlcnRpZXMiLCJmaWxlIiwiZ2V0TG9jYWxpemVkTWVzc2FnZSIsIm93bmVkX2J5IiwiY3JlYXRlZF9ieSIsImNyZWF0ZWRfYXQiLCJtb2RpZmllZF9hdCIsInNpemUiLCJuYW1lIiwib3duZXIiLCJ1cGxvYWRlciJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztBQU1BLE9BQU9BLEtBQVAsTUFBa0IsT0FBbEI7QUFDQSxPQUFPQyxPQUFQLE1BQW9CLGlCQUFwQjtBQUNBLFNBQVNDLFdBQVQsUUFBNEIscUJBQTVCOzs7QUFRQSxJQUFNQyxpQkFBaUIsU0FBakJBLGNBQWlCLE9BQTBDO0FBQUEsUUFBdkNDLElBQXVDLFFBQXZDQSxJQUF1QztBQUFBLFFBQWpDQyxtQkFBaUMsUUFBakNBLG1CQUFpQztBQUFBLFFBQ3JEQyxRQURxRCxHQUMwQkYsSUFEMUIsQ0FDckRFLFFBRHFEO0FBQUEsUUFDM0NDLFVBRDJDLEdBQzBCSCxJQUQxQixDQUMzQ0csVUFEMkM7QUFBQSwyQkFDMEJILElBRDFCLENBQy9CSSxVQUQrQjtBQUFBLFFBQy9CQSxVQUQrQixvQ0FDbEIsRUFEa0I7QUFBQSw0QkFDMEJKLElBRDFCLENBQ2RLLFdBRGM7QUFBQSxRQUNkQSxXQURjLHFDQUNBLEVBREE7QUFBQSxxQkFDMEJMLElBRDFCLENBQ0lNLElBREo7QUFBQSxRQUNJQSxJQURKLDhCQUNXLENBRFg7O0FBQUEsZ0JBRWhDSixZQUFZLEVBRm9CO0FBQUEsMkJBRXJESyxJQUZxRDtBQUFBLFFBRS9DQyxLQUYrQyw4QkFFdkMsRUFGdUM7O0FBQUEsZ0JBRzdCTCxjQUFjLEVBSGU7QUFBQSwyQkFHckRJLElBSHFEO0FBQUEsUUFHL0NFLFFBSCtDLDhCQUdwQyxFQUhvQzs7QUFJN0QsV0FDSTtBQUFBO0FBQUE7QUFDSyxTQUFDLENBQUNELEtBQUYsSUFDRztBQUFBO0FBQUE7QUFDS1AsZ0NBQW9CLGlCQUFwQjtBQURMLFNBRlI7QUFLSyxTQUFDLENBQUNPLEtBQUYsSUFDRztBQUFBO0FBQUE7QUFDS0E7QUFETCxTQU5SO0FBU0ssU0FBQyxDQUFDQyxRQUFGLElBQ0c7QUFBQTtBQUFBO0FBQ0tSLGdDQUFvQixvQkFBcEI7QUFETCxTQVZSO0FBYUssU0FBQyxDQUFDUSxRQUFGLElBQ0c7QUFBQTtBQUFBO0FBQ0tBO0FBREwsU0FkUjtBQWlCSTtBQUFBO0FBQUE7QUFDS1IsZ0NBQW9CLG1CQUFwQjtBQURMLFNBakJKO0FBb0JJO0FBQUE7QUFBQTtBQUNLSCx3QkFBWU0sVUFBWjtBQURMLFNBcEJKO0FBdUJJO0FBQUE7QUFBQTtBQUNLSCxnQ0FBb0Isb0JBQXBCO0FBREwsU0F2Qko7QUEwQkk7QUFBQTtBQUFBO0FBQ0tILHdCQUFZTyxXQUFaO0FBREwsU0ExQko7QUE2Qkk7QUFBQTtBQUFBO0FBQ0tKLGdDQUFvQixnQkFBcEI7QUFETCxTQTdCSjtBQWdDSTtBQUFBO0FBQUE7QUFDS0osb0JBQVFTLElBQVI7QUFETDtBQWhDSixLQURKO0FBc0NILENBMUNEOztBQTRDQSxlQUFlUCxjQUFmIiwiZmlsZSI6IkZpbGVQcm9wZXJ0aWVzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIEBmbG93XHJcbiAqIEBmaWxlIEZpbGUgUHJvcGVydGllcyBTa2lsbERhdGEgY29tcG9uZW50XHJcbiAqIEBhdXRob3IgQm94XHJcbiAqL1xyXG5cclxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IGdldFNpemUgZnJvbSAnLi4vLi4vdXRpbC9zaXplJztcclxuaW1wb3J0IHsgZ2V0RGF0ZVRpbWUgfSBmcm9tICcuLi8uLi91dGlsL2RhdGV0aW1lJztcclxuaW1wb3J0IHR5cGUgeyBCb3hJdGVtIH0gZnJvbSAnLi4vLi4vZmxvd1R5cGVzJztcclxuXHJcbnR5cGUgUHJvcHMgPSB7XHJcbiAgICBmaWxlOiBCb3hJdGVtLFxyXG4gICAgZ2V0TG9jYWxpemVkTWVzc2FnZTogRnVuY3Rpb25cclxufTtcclxuXHJcbmNvbnN0IEZpbGVQcm9wZXJ0aWVzID0gKHsgZmlsZSwgZ2V0TG9jYWxpemVkTWVzc2FnZSB9OiBQcm9wcykgPT4ge1xyXG4gICAgY29uc3QgeyBvd25lZF9ieSwgY3JlYXRlZF9ieSwgY3JlYXRlZF9hdCA9ICcnLCBtb2RpZmllZF9hdCA9ICcnLCBzaXplID0gMCB9OiBCb3hJdGVtID0gZmlsZTtcclxuICAgIGNvbnN0IHsgbmFtZTogb3duZXIgPSAnJyB9ID0gb3duZWRfYnkgfHwge307XHJcbiAgICBjb25zdCB7IG5hbWU6IHVwbG9hZGVyID0gJycgfSA9IGNyZWF0ZWRfYnkgfHwge307XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICAgIDxkbD5cclxuICAgICAgICAgICAgeyEhb3duZXIgJiZcclxuICAgICAgICAgICAgICAgIDxkdD5cclxuICAgICAgICAgICAgICAgICAgICB7Z2V0TG9jYWxpemVkTWVzc2FnZSgnYnVpay5pdGVtLm93bmVyJyl9XHJcbiAgICAgICAgICAgICAgICA8L2R0Pn1cclxuICAgICAgICAgICAgeyEhb3duZXIgJiZcclxuICAgICAgICAgICAgICAgIDxkZD5cclxuICAgICAgICAgICAgICAgICAgICB7b3duZXJ9XHJcbiAgICAgICAgICAgICAgICA8L2RkPn1cclxuICAgICAgICAgICAgeyEhdXBsb2FkZXIgJiZcclxuICAgICAgICAgICAgICAgIDxkdD5cclxuICAgICAgICAgICAgICAgICAgICB7Z2V0TG9jYWxpemVkTWVzc2FnZSgnYnVpay5pdGVtLnVwbG9hZGVyJyl9XHJcbiAgICAgICAgICAgICAgICA8L2R0Pn1cclxuICAgICAgICAgICAgeyEhdXBsb2FkZXIgJiZcclxuICAgICAgICAgICAgICAgIDxkZD5cclxuICAgICAgICAgICAgICAgICAgICB7dXBsb2FkZXJ9XHJcbiAgICAgICAgICAgICAgICA8L2RkPn1cclxuICAgICAgICAgICAgPGR0PlxyXG4gICAgICAgICAgICAgICAge2dldExvY2FsaXplZE1lc3NhZ2UoJ2J1aWsuaXRlbS5jcmVhdGVkJyl9XHJcbiAgICAgICAgICAgIDwvZHQ+XHJcbiAgICAgICAgICAgIDxkZD5cclxuICAgICAgICAgICAgICAgIHtnZXREYXRlVGltZShjcmVhdGVkX2F0KX1cclxuICAgICAgICAgICAgPC9kZD5cclxuICAgICAgICAgICAgPGR0PlxyXG4gICAgICAgICAgICAgICAge2dldExvY2FsaXplZE1lc3NhZ2UoJ2J1aWsuaXRlbS5tb2RpZmllZCcpfVxyXG4gICAgICAgICAgICA8L2R0PlxyXG4gICAgICAgICAgICA8ZGQ+XHJcbiAgICAgICAgICAgICAgICB7Z2V0RGF0ZVRpbWUobW9kaWZpZWRfYXQpfVxyXG4gICAgICAgICAgICA8L2RkPlxyXG4gICAgICAgICAgICA8ZHQ+XHJcbiAgICAgICAgICAgICAgICB7Z2V0TG9jYWxpemVkTWVzc2FnZSgnYnVpay5pdGVtLnNpemUnKX1cclxuICAgICAgICAgICAgPC9kdD5cclxuICAgICAgICAgICAgPGRkPlxyXG4gICAgICAgICAgICAgICAge2dldFNpemUoc2l6ZSl9XHJcbiAgICAgICAgICAgIDwvZGQ+XHJcbiAgICAgICAgPC9kbD5cclxuICAgICk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBGaWxlUHJvcGVydGllcztcclxuIl19