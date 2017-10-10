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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlNoYXJlQWNjZXNzU2VsZWN0LmpzIl0sIm5hbWVzIjpbIlJlYWN0IiwiQUNDRVNTX05PTkUiLCJBQ0NFU1NfT1BFTiIsIkFDQ0VTU19DT0xMQUIiLCJBQ0NFU1NfQ09NUEFOWSIsIlNoYXJlQWNjZXNzU2VsZWN0IiwiY2xhc3NOYW1lIiwiY2FuU2V0U2hhcmVBY2Nlc3MiLCJvbkNoYW5nZSIsIml0ZW0iLCJnZXRMb2NhbGl6ZWRNZXNzYWdlIiwiYWxsb3dlZFNoYXJlZEFjY2Vzc0xldmVscyIsImFsbG93ZWRfc2hhcmVkX2xpbmtfYWNjZXNzX2xldmVscyIsInBlcm1pc3Npb25zIiwic2hhcmVkTGluayIsInNoYXJlZF9saW5rIiwiYWNjZXNzIiwiYWxsb3dTaGFyZUFjY2Vzc0NoYW5nZSIsImNhbl9zZXRfc2hhcmVfYWNjZXNzIiwiY2hhbmdlSGFuZGxlciIsInRhcmdldCIsInZhbHVlIiwiYWxsb3dPcGVuIiwiaW5kZXhPZiIsImFsbG93Q29sbGFiIiwiYWxsb3dDb21wYW55IiwiYWxsb3dlZCJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztBQU1BLE9BQU9BLEtBQVAsTUFBa0IsT0FBbEI7O0FBRUEsU0FBU0MsV0FBVCxFQUFzQkMsV0FBdEIsRUFBbUNDLGFBQW5DLEVBQWtEQyxjQUFsRCxRQUF3RSxpQkFBeEU7O0FBVUE7QUFDQSxJQUFNQyxvQkFBb0IsU0FBcEJBLGlCQUFvQixPQUFrRjtBQUFBLFFBQS9FQyxTQUErRSxRQUEvRUEsU0FBK0U7QUFBQSxRQUFwRUMsaUJBQW9FLFFBQXBFQSxpQkFBb0U7QUFBQSxRQUFqREMsUUFBaUQsUUFBakRBLFFBQWlEO0FBQUEsUUFBdkNDLElBQXVDLFFBQXZDQSxJQUF1QztBQUFBLFFBQWpDQyxtQkFBaUMsUUFBakNBLG1CQUFpQztBQUFBLFFBQzdEQyx5QkFENkQsR0FDT0YsSUFEUCxDQUNoR0csaUNBRGdHO0FBQUEsUUFDbENDLFdBRGtDLEdBQ09KLElBRFAsQ0FDbENJLFdBRGtDO0FBQUEsUUFDUkMsVUFEUSxHQUNPTCxJQURQLENBQ3JCTSxXQURxQjs7O0FBR3hHLFFBQUksQ0FBQ0oseUJBQUwsRUFBZ0M7QUFDNUIsZUFBTyxpQ0FBUDtBQUNIOztBQUx1RyxnQkFPdkVHLGNBQWMsRUFQeUQ7QUFBQSw2QkFPaEdFLE1BUGdHO0FBQUEsUUFPaEdBLE1BUGdHLGdDQU92RmYsV0FQdUY7O0FBQUEsZ0JBUS9DWSxlQUFlLEVBUmdDO0FBQUEsUUFRMUVJLHNCQVIwRSxTQVFoR0Msb0JBUmdHOztBQVV4RyxRQUFNQyxnQkFBZ0IsU0FBaEJBLGFBQWdCO0FBQUEsWUFBR0MsTUFBSCxTQUFHQSxNQUFIO0FBQUEsZUFBZ0JaLFNBQVNZLE9BQU9DLEtBQWhCLEVBQXVCWixJQUF2QixDQUFoQjtBQUFBLEtBQXRCO0FBQ0EsUUFBTWEsWUFBWVgsMEJBQTBCWSxPQUExQixDQUFrQ3JCLFdBQWxDLElBQWlELENBQUMsQ0FBcEU7QUFDQSxRQUFNc0IsY0FBY2IsMEJBQTBCWSxPQUExQixDQUFrQ3BCLGFBQWxDLElBQW1ELENBQUMsQ0FBeEU7QUFDQSxRQUFNc0IsZUFBZWQsMEJBQTBCWSxPQUExQixDQUFrQ25CLGNBQWxDLElBQW9ELENBQUMsQ0FBMUU7QUFDQSxRQUFNc0IsVUFBVW5CLHFCQUFxQlUsc0JBQXJCLEtBQWdESyxhQUFhRyxZQUFiLElBQTZCRCxXQUE3RSxDQUFoQjs7QUFFQSxRQUFJLENBQUNFLE9BQUwsRUFBYztBQUNWLGVBQU8saUNBQVA7QUFDSDs7QUFFRCxXQUNJO0FBQUE7QUFBQSxVQUFRLFdBQVdwQixTQUFuQixFQUE4QixPQUFPVSxNQUFyQyxFQUE2QyxVQUFVRyxhQUF2RDtBQUNLRyxvQkFDSztBQUFBO0FBQUEsY0FBUSxPQUFPcEIsV0FBZjtBQUNHUSxnQ0FBb0IsNkJBQXBCO0FBREgsU0FETCxHQUlLLElBTFY7QUFNS2Msc0JBQ0s7QUFBQTtBQUFBLGNBQVEsT0FBT3JCLGFBQWY7QUFDR08sZ0NBQW9CLHNDQUFwQjtBQURILFNBREwsR0FJSyxJQVZWO0FBV0tlLHVCQUNLO0FBQUE7QUFBQSxjQUFRLE9BQU9yQixjQUFmO0FBQ0dNLGdDQUFvQixnQ0FBcEI7QUFESCxTQURMLEdBSUssSUFmVjtBQWdCSTtBQUFBO0FBQUEsY0FBUSxPQUFPVCxXQUFmO0FBQ0tlLHVCQUFXZixXQUFYLEdBQ0tTLG9CQUFvQiw2QkFBcEIsQ0FETCxHQUVLQSxvQkFBb0IsK0JBQXBCO0FBSFY7QUFoQkosS0FESjtBQXdCSCxDQTVDRDs7QUE4Q0EsZUFBZUwsaUJBQWYiLCJmaWxlIjoiU2hhcmVBY2Nlc3NTZWxlY3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQGZsb3dcclxuICogQGZpbGUgQ29udGVudCBFeHBsb3JlciBEZWxldGUgQ29uZmlybWF0aW9uIERpYWxvZ1xyXG4gKiBAYXV0aG9yIEJveFxyXG4gKi9cclxuXHJcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB0eXBlIHsgQm94SXRlbSB9IGZyb20gJy4uLy4uL2Zsb3dUeXBlcyc7XHJcbmltcG9ydCB7IEFDQ0VTU19OT05FLCBBQ0NFU1NfT1BFTiwgQUNDRVNTX0NPTExBQiwgQUNDRVNTX0NPTVBBTlkgfSBmcm9tICcuLi8uLi9jb25zdGFudHMnO1xyXG5cclxudHlwZSBQcm9wcyA9IHtcclxuICAgIGNhblNldFNoYXJlQWNjZXNzOiBib29sZWFuLFxyXG4gICAgb25DaGFuZ2U6IEZ1bmN0aW9uLFxyXG4gICAgaXRlbTogQm94SXRlbSxcclxuICAgIGdldExvY2FsaXplZE1lc3NhZ2U6IEZ1bmN0aW9uLFxyXG4gICAgY2xhc3NOYW1lOiBzdHJpbmdcclxufTtcclxuXHJcbi8qIGVzbGludC1kaXNhYmxlIGpzeC1hMTF5L2xhYmVsLWhhcy1mb3IgKi9cclxuY29uc3QgU2hhcmVBY2Nlc3NTZWxlY3QgPSAoeyBjbGFzc05hbWUsIGNhblNldFNoYXJlQWNjZXNzLCBvbkNoYW5nZSwgaXRlbSwgZ2V0TG9jYWxpemVkTWVzc2FnZSB9OiBQcm9wcykgPT4ge1xyXG4gICAgY29uc3QgeyBhbGxvd2VkX3NoYXJlZF9saW5rX2FjY2Vzc19sZXZlbHM6IGFsbG93ZWRTaGFyZWRBY2Nlc3NMZXZlbHMsIHBlcm1pc3Npb25zLCBzaGFyZWRfbGluazogc2hhcmVkTGluayB9ID0gaXRlbTtcclxuXHJcbiAgICBpZiAoIWFsbG93ZWRTaGFyZWRBY2Nlc3NMZXZlbHMpIHtcclxuICAgICAgICByZXR1cm4gPHNwYW4gLz47XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgeyBhY2Nlc3MgPSBBQ0NFU1NfTk9ORSB9ID0gc2hhcmVkTGluayB8fCB7fTtcclxuICAgIGNvbnN0IHsgY2FuX3NldF9zaGFyZV9hY2Nlc3M6IGFsbG93U2hhcmVBY2Nlc3NDaGFuZ2UgfSA9IHBlcm1pc3Npb25zIHx8IHt9O1xyXG5cclxuICAgIGNvbnN0IGNoYW5nZUhhbmRsZXIgPSAoeyB0YXJnZXQgfSkgPT4gb25DaGFuZ2UodGFyZ2V0LnZhbHVlLCBpdGVtKTtcclxuICAgIGNvbnN0IGFsbG93T3BlbiA9IGFsbG93ZWRTaGFyZWRBY2Nlc3NMZXZlbHMuaW5kZXhPZihBQ0NFU1NfT1BFTikgPiAtMTtcclxuICAgIGNvbnN0IGFsbG93Q29sbGFiID0gYWxsb3dlZFNoYXJlZEFjY2Vzc0xldmVscy5pbmRleE9mKEFDQ0VTU19DT0xMQUIpID4gLTE7XHJcbiAgICBjb25zdCBhbGxvd0NvbXBhbnkgPSBhbGxvd2VkU2hhcmVkQWNjZXNzTGV2ZWxzLmluZGV4T2YoQUNDRVNTX0NPTVBBTlkpID4gLTE7XHJcbiAgICBjb25zdCBhbGxvd2VkID0gY2FuU2V0U2hhcmVBY2Nlc3MgJiYgYWxsb3dTaGFyZUFjY2Vzc0NoYW5nZSAmJiAoYWxsb3dPcGVuIHx8IGFsbG93Q29tcGFueSB8fCBhbGxvd0NvbGxhYik7XHJcblxyXG4gICAgaWYgKCFhbGxvd2VkKSB7XHJcbiAgICAgICAgcmV0dXJuIDxzcGFuIC8+O1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiAoXHJcbiAgICAgICAgPHNlbGVjdCBjbGFzc05hbWU9e2NsYXNzTmFtZX0gdmFsdWU9e2FjY2Vzc30gb25DaGFuZ2U9e2NoYW5nZUhhbmRsZXJ9PlxyXG4gICAgICAgICAgICB7YWxsb3dPcGVuXHJcbiAgICAgICAgICAgICAgICA/IDxvcHRpb24gdmFsdWU9e0FDQ0VTU19PUEVOfT5cclxuICAgICAgICAgICAgICAgICAgICB7Z2V0TG9jYWxpemVkTWVzc2FnZSgnYnVpay5pdGVtLnNoYXJlLmFjY2Vzcy5vcGVuJyl9XHJcbiAgICAgICAgICAgICAgICA8L29wdGlvbj5cclxuICAgICAgICAgICAgICAgIDogbnVsbH1cclxuICAgICAgICAgICAge2FsbG93Q29sbGFiXHJcbiAgICAgICAgICAgICAgICA/IDxvcHRpb24gdmFsdWU9e0FDQ0VTU19DT0xMQUJ9PlxyXG4gICAgICAgICAgICAgICAgICAgIHtnZXRMb2NhbGl6ZWRNZXNzYWdlKCdidWlrLml0ZW0uc2hhcmUuYWNjZXNzLmNvbGxhYm9yYXRvcnMnKX1cclxuICAgICAgICAgICAgICAgIDwvb3B0aW9uPlxyXG4gICAgICAgICAgICAgICAgOiBudWxsfVxyXG4gICAgICAgICAgICB7YWxsb3dDb21wYW55XHJcbiAgICAgICAgICAgICAgICA/IDxvcHRpb24gdmFsdWU9e0FDQ0VTU19DT01QQU5ZfT5cclxuICAgICAgICAgICAgICAgICAgICB7Z2V0TG9jYWxpemVkTWVzc2FnZSgnYnVpay5pdGVtLnNoYXJlLmFjY2Vzcy5jb21wYW55Jyl9XHJcbiAgICAgICAgICAgICAgICA8L29wdGlvbj5cclxuICAgICAgICAgICAgICAgIDogbnVsbH1cclxuICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT17QUNDRVNTX05PTkV9PlxyXG4gICAgICAgICAgICAgICAge2FjY2VzcyA9PT0gQUNDRVNTX05PTkVcclxuICAgICAgICAgICAgICAgICAgICA/IGdldExvY2FsaXplZE1lc3NhZ2UoJ2J1aWsuaXRlbS5zaGFyZS5hY2Nlc3Mubm9uZScpXHJcbiAgICAgICAgICAgICAgICAgICAgOiBnZXRMb2NhbGl6ZWRNZXNzYWdlKCdidWlrLml0ZW0uc2hhcmUuYWNjZXNzLnJlbW92ZScpfVxyXG4gICAgICAgICAgICA8L29wdGlvbj5cclxuICAgICAgICA8L3NlbGVjdD5cclxuICAgICk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBTaGFyZUFjY2Vzc1NlbGVjdDtcclxuIl19