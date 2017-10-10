/**
 * 
 * @file Upload state component
 */

import classNames from 'classnames';
import React from 'react';
import IconErrorEmptyState from '../icons/states/IconErrorEmptyState';
import IconUploadStartState from '../icons/states/IconUploadStartState';
import IconUploadSuccessState from '../icons/states/IconUploadSuccessState';
import UploadStateContent from './UploadStateContent';
import { VIEW_ERROR, VIEW_UPLOAD_EMPTY, VIEW_UPLOAD_IN_PROGRESS, VIEW_UPLOAD_SUCCESS } from '../../constants';


var UploadState = function UploadState(_ref) {
    var canDrop = _ref.canDrop,
        getLocalizedMessage = _ref.getLocalizedMessage,
        hasItems = _ref.hasItems,
        isOver = _ref.isOver,
        isTouch = _ref.isTouch,
        view = _ref.view,
        onSelect = _ref.onSelect;

    var icon = void 0;
    var content = void 0;
    /* eslint-disable jsx-a11y/label-has-for */
    switch (view) {
        case VIEW_ERROR:
            icon = React.createElement(IconErrorEmptyState, null);
            content = React.createElement(UploadStateContent, { message: getLocalizedMessage('buik.upload.state.error') });
            break;
        case VIEW_UPLOAD_EMPTY:
            icon = React.createElement(IconUploadStartState, null);
            /* eslint-disable no-nested-ternary */
            content = canDrop && hasItems ? React.createElement(UploadStateContent, { message: getLocalizedMessage('buik.upload.state.inprogress') }) : isTouch ? React.createElement(UploadStateContent, {
                inputLabel: getLocalizedMessage('buik.upload.state.empty.input.nodragdrop'),
                useButton: true,
                onChange: onSelect
            }) : React.createElement(UploadStateContent, {
                inputLabel: getLocalizedMessage('buik.upload.state.empty.input'),
                message: getLocalizedMessage('buik.upload.state.empty'),
                onChange: onSelect
            });
            /* eslint-enable no-nested-ternary */
            break;
        case VIEW_UPLOAD_IN_PROGRESS:
            icon = React.createElement(IconUploadStartState, null);
            content = React.createElement(UploadStateContent, { message: getLocalizedMessage('buik.upload.state.inprogress') });
            break;
        case VIEW_UPLOAD_SUCCESS:
            icon = React.createElement(IconUploadSuccessState, null);
            content = React.createElement(UploadStateContent, {
                inputLabel: getLocalizedMessage('buik.upload.state.success.input'),
                message: getLocalizedMessage('buik.upload.state.success'),
                useButton: isTouch,
                onChange: onSelect
            });
            break;
        default:
            break;
        /* eslint-enable jsx-a11y/label-has-for */
    }

    var className = classNames('bcu-upload-state', {
        'bcu-is-droppable': isOver && canDrop,
        'bcu-is-not-droppable': isOver && !canDrop,
        'bcu-has-items': hasItems
    });

    return React.createElement(
        'div',
        { className: className },
        React.createElement(
            'div',
            null,
            icon,
            content
        ),
        React.createElement('div', { className: 'bcu-drag-drop-overlay' })
    );
};

export default UploadState;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlVwbG9hZFN0YXRlLmpzIl0sIm5hbWVzIjpbImNsYXNzTmFtZXMiLCJSZWFjdCIsIkljb25FcnJvckVtcHR5U3RhdGUiLCJJY29uVXBsb2FkU3RhcnRTdGF0ZSIsIkljb25VcGxvYWRTdWNjZXNzU3RhdGUiLCJVcGxvYWRTdGF0ZUNvbnRlbnQiLCJWSUVXX0VSUk9SIiwiVklFV19VUExPQURfRU1QVFkiLCJWSUVXX1VQTE9BRF9JTl9QUk9HUkVTUyIsIlZJRVdfVVBMT0FEX1NVQ0NFU1MiLCJVcGxvYWRTdGF0ZSIsImNhbkRyb3AiLCJnZXRMb2NhbGl6ZWRNZXNzYWdlIiwiaGFzSXRlbXMiLCJpc092ZXIiLCJpc1RvdWNoIiwidmlldyIsIm9uU2VsZWN0IiwiaWNvbiIsImNvbnRlbnQiLCJjbGFzc05hbWUiXSwibWFwcGluZ3MiOiJBQUFBOzs7OztBQUtBLE9BQU9BLFVBQVAsTUFBdUIsWUFBdkI7QUFDQSxPQUFPQyxLQUFQLE1BQWtCLE9BQWxCO0FBQ0EsT0FBT0MsbUJBQVAsTUFBZ0MscUNBQWhDO0FBQ0EsT0FBT0Msb0JBQVAsTUFBaUMsc0NBQWpDO0FBQ0EsT0FBT0Msc0JBQVAsTUFBbUMsd0NBQW5DO0FBQ0EsT0FBT0Msa0JBQVAsTUFBK0Isc0JBQS9CO0FBQ0EsU0FBU0MsVUFBVCxFQUFxQkMsaUJBQXJCLEVBQXdDQyx1QkFBeEMsRUFBaUVDLG1CQUFqRSxRQUE0RixpQkFBNUY7OztBQWNBLElBQU1DLGNBQWMsU0FBZEEsV0FBYyxPQUF3RjtBQUFBLFFBQXJGQyxPQUFxRixRQUFyRkEsT0FBcUY7QUFBQSxRQUE1RUMsbUJBQTRFLFFBQTVFQSxtQkFBNEU7QUFBQSxRQUF2REMsUUFBdUQsUUFBdkRBLFFBQXVEO0FBQUEsUUFBN0NDLE1BQTZDLFFBQTdDQSxNQUE2QztBQUFBLFFBQXJDQyxPQUFxQyxRQUFyQ0EsT0FBcUM7QUFBQSxRQUE1QkMsSUFBNEIsUUFBNUJBLElBQTRCO0FBQUEsUUFBdEJDLFFBQXNCLFFBQXRCQSxRQUFzQjs7QUFDeEcsUUFBSUMsYUFBSjtBQUNBLFFBQUlDLGdCQUFKO0FBQ0E7QUFDQSxZQUFRSCxJQUFSO0FBQ0ksYUFBS1YsVUFBTDtBQUNJWSxtQkFBTyxvQkFBQyxtQkFBRCxPQUFQO0FBQ0FDLHNCQUFVLG9CQUFDLGtCQUFELElBQW9CLFNBQVNQLG9CQUFvQix5QkFBcEIsQ0FBN0IsR0FBVjtBQUNBO0FBQ0osYUFBS0wsaUJBQUw7QUFDSVcsbUJBQU8sb0JBQUMsb0JBQUQsT0FBUDtBQUNBO0FBQ0FDLHNCQUNJUixXQUFXRSxRQUFYLEdBQ00sb0JBQUMsa0JBQUQsSUFBb0IsU0FBU0Qsb0JBQW9CLDhCQUFwQixDQUE3QixHQUROLEdBRU1HLFVBQ0Usb0JBQUMsa0JBQUQ7QUFDRSw0QkFBWUgsb0JBQW9CLDBDQUFwQixDQURkO0FBRUUsK0JBRkY7QUFHRSwwQkFBVUs7QUFIWixjQURGLEdBTUUsb0JBQUMsa0JBQUQ7QUFDRSw0QkFBWUwsb0JBQW9CLCtCQUFwQixDQURkO0FBRUUseUJBQVNBLG9CQUFvQix5QkFBcEIsQ0FGWDtBQUdFLDBCQUFVSztBQUhaLGNBVFo7QUFjQTtBQUNBO0FBQ0osYUFBS1QsdUJBQUw7QUFDSVUsbUJBQU8sb0JBQUMsb0JBQUQsT0FBUDtBQUNBQyxzQkFBVSxvQkFBQyxrQkFBRCxJQUFvQixTQUFTUCxvQkFBb0IsOEJBQXBCLENBQTdCLEdBQVY7QUFDQTtBQUNKLGFBQUtILG1CQUFMO0FBQ0lTLG1CQUFPLG9CQUFDLHNCQUFELE9BQVA7QUFDQUMsc0JBQ0ksb0JBQUMsa0JBQUQ7QUFDSSw0QkFBWVAsb0JBQW9CLGlDQUFwQixDQURoQjtBQUVJLHlCQUFTQSxvQkFBb0IsMkJBQXBCLENBRmI7QUFHSSwyQkFBV0csT0FIZjtBQUlJLDBCQUFVRTtBQUpkLGNBREo7QUFRQTtBQUNKO0FBQ0k7QUFDSjtBQXpDSjs7QUE0Q0EsUUFBTUcsWUFBWXBCLFdBQVcsa0JBQVgsRUFBK0I7QUFDN0MsNEJBQW9CYyxVQUFVSCxPQURlO0FBRTdDLGdDQUF3QkcsVUFBVSxDQUFDSCxPQUZVO0FBRzdDLHlCQUFpQkU7QUFINEIsS0FBL0IsQ0FBbEI7O0FBTUEsV0FDSTtBQUFBO0FBQUEsVUFBSyxXQUFXTyxTQUFoQjtBQUNJO0FBQUE7QUFBQTtBQUNLRixnQkFETDtBQUVLQztBQUZMLFNBREo7QUFLSSxxQ0FBSyxXQUFVLHVCQUFmO0FBTEosS0FESjtBQVNILENBL0REOztBQWlFQSxlQUFlVCxXQUFmIiwiZmlsZSI6IlVwbG9hZFN0YXRlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIEBmbG93XHJcbiAqIEBmaWxlIFVwbG9hZCBzdGF0ZSBjb21wb25lbnRcclxuICovXHJcblxyXG5pbXBvcnQgY2xhc3NOYW1lcyBmcm9tICdjbGFzc25hbWVzJztcclxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IEljb25FcnJvckVtcHR5U3RhdGUgZnJvbSAnLi4vaWNvbnMvc3RhdGVzL0ljb25FcnJvckVtcHR5U3RhdGUnO1xyXG5pbXBvcnQgSWNvblVwbG9hZFN0YXJ0U3RhdGUgZnJvbSAnLi4vaWNvbnMvc3RhdGVzL0ljb25VcGxvYWRTdGFydFN0YXRlJztcclxuaW1wb3J0IEljb25VcGxvYWRTdWNjZXNzU3RhdGUgZnJvbSAnLi4vaWNvbnMvc3RhdGVzL0ljb25VcGxvYWRTdWNjZXNzU3RhdGUnO1xyXG5pbXBvcnQgVXBsb2FkU3RhdGVDb250ZW50IGZyb20gJy4vVXBsb2FkU3RhdGVDb250ZW50JztcclxuaW1wb3J0IHsgVklFV19FUlJPUiwgVklFV19VUExPQURfRU1QVFksIFZJRVdfVVBMT0FEX0lOX1BST0dSRVNTLCBWSUVXX1VQTE9BRF9TVUNDRVNTIH0gZnJvbSAnLi4vLi4vY29uc3RhbnRzJztcclxuaW1wb3J0IHR5cGUgeyBWaWV3IH0gZnJvbSAnLi4vLi4vZmxvd1R5cGVzJztcclxuaW1wb3J0ICcuL1VwbG9hZFN0YXRlLnNjc3MnO1xyXG5cclxudHlwZSBQcm9wcyA9IHtcclxuICAgIGNhbkRyb3A6IGJvb2xlYW4sXHJcbiAgICBnZXRMb2NhbGl6ZWRNZXNzYWdlOiBGdW5jdGlvbixcclxuICAgIGhhc0l0ZW1zOiBib29sZWFuLFxyXG4gICAgaXNPdmVyOiBib29sZWFuLFxyXG4gICAgaXNUb3VjaDogYm9vbGVhbixcclxuICAgIHZpZXc6IFZpZXcsXHJcbiAgICBvblNlbGVjdDogRnVuY3Rpb25cclxufTtcclxuXHJcbmNvbnN0IFVwbG9hZFN0YXRlID0gKHsgY2FuRHJvcCwgZ2V0TG9jYWxpemVkTWVzc2FnZSwgaGFzSXRlbXMsIGlzT3ZlciwgaXNUb3VjaCwgdmlldywgb25TZWxlY3QgfTogUHJvcHMpID0+IHtcclxuICAgIGxldCBpY29uO1xyXG4gICAgbGV0IGNvbnRlbnQ7XHJcbiAgICAvKiBlc2xpbnQtZGlzYWJsZSBqc3gtYTExeS9sYWJlbC1oYXMtZm9yICovXHJcbiAgICBzd2l0Y2ggKHZpZXcpIHtcclxuICAgICAgICBjYXNlIFZJRVdfRVJST1I6XHJcbiAgICAgICAgICAgIGljb24gPSA8SWNvbkVycm9yRW1wdHlTdGF0ZSAvPjtcclxuICAgICAgICAgICAgY29udGVudCA9IDxVcGxvYWRTdGF0ZUNvbnRlbnQgbWVzc2FnZT17Z2V0TG9jYWxpemVkTWVzc2FnZSgnYnVpay51cGxvYWQuc3RhdGUuZXJyb3InKX0gLz47XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgVklFV19VUExPQURfRU1QVFk6XHJcbiAgICAgICAgICAgIGljb24gPSA8SWNvblVwbG9hZFN0YXJ0U3RhdGUgLz47XHJcbiAgICAgICAgICAgIC8qIGVzbGludC1kaXNhYmxlIG5vLW5lc3RlZC10ZXJuYXJ5ICovXHJcbiAgICAgICAgICAgIGNvbnRlbnQgPVxyXG4gICAgICAgICAgICAgICAgY2FuRHJvcCAmJiBoYXNJdGVtc1xyXG4gICAgICAgICAgICAgICAgICAgID8gPFVwbG9hZFN0YXRlQ29udGVudCBtZXNzYWdlPXtnZXRMb2NhbGl6ZWRNZXNzYWdlKCdidWlrLnVwbG9hZC5zdGF0ZS5pbnByb2dyZXNzJyl9IC8+XHJcbiAgICAgICAgICAgICAgICAgICAgOiBpc1RvdWNoXHJcbiAgICAgICAgICAgICAgICAgICAgICA/IDxVcGxvYWRTdGF0ZUNvbnRlbnRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBpbnB1dExhYmVsPXtnZXRMb2NhbGl6ZWRNZXNzYWdlKCdidWlrLnVwbG9hZC5zdGF0ZS5lbXB0eS5pbnB1dC5ub2RyYWdkcm9wJyl9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdXNlQnV0dG9uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e29uU2VsZWN0fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgOiA8VXBsb2FkU3RhdGVDb250ZW50XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXRMYWJlbD17Z2V0TG9jYWxpemVkTWVzc2FnZSgnYnVpay51cGxvYWQuc3RhdGUuZW1wdHkuaW5wdXQnKX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlPXtnZXRMb2NhbGl6ZWRNZXNzYWdlKCdidWlrLnVwbG9hZC5zdGF0ZS5lbXB0eScpfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXtvblNlbGVjdH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgLz47XHJcbiAgICAgICAgICAgIC8qIGVzbGludC1lbmFibGUgbm8tbmVzdGVkLXRlcm5hcnkgKi9cclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBWSUVXX1VQTE9BRF9JTl9QUk9HUkVTUzpcclxuICAgICAgICAgICAgaWNvbiA9IDxJY29uVXBsb2FkU3RhcnRTdGF0ZSAvPjtcclxuICAgICAgICAgICAgY29udGVudCA9IDxVcGxvYWRTdGF0ZUNvbnRlbnQgbWVzc2FnZT17Z2V0TG9jYWxpemVkTWVzc2FnZSgnYnVpay51cGxvYWQuc3RhdGUuaW5wcm9ncmVzcycpfSAvPjtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBWSUVXX1VQTE9BRF9TVUNDRVNTOlxyXG4gICAgICAgICAgICBpY29uID0gPEljb25VcGxvYWRTdWNjZXNzU3RhdGUgLz47XHJcbiAgICAgICAgICAgIGNvbnRlbnQgPSAoXHJcbiAgICAgICAgICAgICAgICA8VXBsb2FkU3RhdGVDb250ZW50XHJcbiAgICAgICAgICAgICAgICAgICAgaW5wdXRMYWJlbD17Z2V0TG9jYWxpemVkTWVzc2FnZSgnYnVpay51cGxvYWQuc3RhdGUuc3VjY2Vzcy5pbnB1dCcpfVxyXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U9e2dldExvY2FsaXplZE1lc3NhZ2UoJ2J1aWsudXBsb2FkLnN0YXRlLnN1Y2Nlc3MnKX1cclxuICAgICAgICAgICAgICAgICAgICB1c2VCdXR0b249e2lzVG91Y2h9XHJcbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e29uU2VsZWN0fVxyXG4gICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgLyogZXNsaW50LWVuYWJsZSBqc3gtYTExeS9sYWJlbC1oYXMtZm9yICovXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgY2xhc3NOYW1lID0gY2xhc3NOYW1lcygnYmN1LXVwbG9hZC1zdGF0ZScsIHtcclxuICAgICAgICAnYmN1LWlzLWRyb3BwYWJsZSc6IGlzT3ZlciAmJiBjYW5Ecm9wLFxyXG4gICAgICAgICdiY3UtaXMtbm90LWRyb3BwYWJsZSc6IGlzT3ZlciAmJiAhY2FuRHJvcCxcclxuICAgICAgICAnYmN1LWhhcy1pdGVtcyc6IGhhc0l0ZW1zXHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gKFxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPXtjbGFzc05hbWV9PlxyXG4gICAgICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICAgICAge2ljb259XHJcbiAgICAgICAgICAgICAgICB7Y29udGVudH1cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdiY3UtZHJhZy1kcm9wLW92ZXJsYXknIC8+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICApO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgVXBsb2FkU3RhdGU7XHJcbiJdfQ==