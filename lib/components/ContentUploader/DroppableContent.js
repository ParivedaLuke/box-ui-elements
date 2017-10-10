/**
 * 
 * @file Droppable area containing upload item list
 */

import React from 'react';
import ItemList from './ItemList';
import UploadState from './UploadState';
import makeDroppable from '../Droppable';


/**
 * Definition for drag and drop behavior.
 */
var dropDefinition = {
    /**
     * Validates whether a file can be dropped or not.
     */
    dropValidator: function dropValidator(props, dataTransfer) {
        var allowedTypes = props.allowedTypes;

        return [].some.call(dataTransfer.types, function (type) {
            return allowedTypes.indexOf(type) > -1;
        });
    },

    /**
     * Determines what happens after a file is dropped
     */
    onDrop: function onDrop(event, props) {
        var files = event.dataTransfer.files;

        // This filters out all files without an extension since there is no other
        // good way to filter out folders
        /* eslint-disable no-redeclare */

        files = [].filter.call(files, function (file) {
            var name = file.name;

            var extension = name.substr(name.lastIndexOf('.') + 1);
            return extension.length !== name.length;
        });
        /* eslint-enable no-redeclare */

        props.addFiles(files);
    }
};

var DroppableContent = makeDroppable(dropDefinition)(function (_ref) {
    var canDrop = _ref.canDrop,
        isOver = _ref.isOver,
        isTouch = _ref.isTouch,
        view = _ref.view,
        items = _ref.items,
        tableRef = _ref.tableRef,
        addFiles = _ref.addFiles,
        onClick = _ref.onClick,
        getLocalizedMessage = _ref.getLocalizedMessage;

    var handleSelectFiles = function handleSelectFiles(_ref2) {
        var files = _ref2.target.files;
        return addFiles(files);
    };
    var hasItems = items.length > 0;

    return React.createElement(
        'div',
        { className: 'bcu-droppable-content' },
        React.createElement(ItemList, {
            getLocalizedMessage: getLocalizedMessage,
            items: items,
            tableRef: tableRef,
            view: view,
            onClick: onClick
        }),
        React.createElement(UploadState, {
            canDrop: canDrop,
            getLocalizedMessage: getLocalizedMessage,
            hasItems: hasItems,
            isOver: isOver,
            isTouch: isTouch,
            view: view,
            onSelect: handleSelectFiles
        })
    );
});

export default DroppableContent;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkRyb3BwYWJsZUNvbnRlbnQuanMiXSwibmFtZXMiOlsiUmVhY3QiLCJJdGVtTGlzdCIsIlVwbG9hZFN0YXRlIiwibWFrZURyb3BwYWJsZSIsImRyb3BEZWZpbml0aW9uIiwiZHJvcFZhbGlkYXRvciIsInByb3BzIiwiZGF0YVRyYW5zZmVyIiwiYWxsb3dlZFR5cGVzIiwic29tZSIsImNhbGwiLCJ0eXBlcyIsInR5cGUiLCJpbmRleE9mIiwib25Ecm9wIiwiZXZlbnQiLCJmaWxlcyIsImZpbHRlciIsImZpbGUiLCJuYW1lIiwiZXh0ZW5zaW9uIiwic3Vic3RyIiwibGFzdEluZGV4T2YiLCJsZW5ndGgiLCJhZGRGaWxlcyIsIkRyb3BwYWJsZUNvbnRlbnQiLCJjYW5Ecm9wIiwiaXNPdmVyIiwiaXNUb3VjaCIsInZpZXciLCJpdGVtcyIsInRhYmxlUmVmIiwib25DbGljayIsImdldExvY2FsaXplZE1lc3NhZ2UiLCJoYW5kbGVTZWxlY3RGaWxlcyIsInRhcmdldCIsImhhc0l0ZW1zIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7QUFLQSxPQUFPQSxLQUFQLE1BQWtCLE9BQWxCO0FBQ0EsT0FBT0MsUUFBUCxNQUFxQixZQUFyQjtBQUNBLE9BQU9DLFdBQVAsTUFBd0IsZUFBeEI7QUFDQSxPQUFPQyxhQUFQLE1BQTBCLGNBQTFCOzs7QUFJQTs7O0FBR0EsSUFBTUMsaUJBQWlCO0FBQ25COzs7QUFHQUMsbUJBQWUsdUJBQUNDLEtBQUQsRUFBUUMsWUFBUixFQUF5QjtBQUFBLFlBQzVCQyxZQUQ0QixHQUNYRixLQURXLENBQzVCRSxZQUQ0Qjs7QUFFcEMsZUFBTyxHQUFHQyxJQUFILENBQVFDLElBQVIsQ0FBYUgsYUFBYUksS0FBMUIsRUFBaUMsVUFBQ0MsSUFBRDtBQUFBLG1CQUFVSixhQUFhSyxPQUFiLENBQXFCRCxJQUFyQixJQUE2QixDQUFDLENBQXhDO0FBQUEsU0FBakMsQ0FBUDtBQUNILEtBUGtCOztBQVNuQjs7O0FBR0FFLFlBQVEsZ0JBQUNDLEtBQUQsRUFBUVQsS0FBUixFQUFrQjtBQUFBLFlBQ0FVLEtBREEsR0FDWUQsS0FEWixDQUNoQlIsWUFEZ0IsQ0FDQVMsS0FEQTs7QUFHdEI7QUFDQTtBQUNBOztBQUNBQSxnQkFBUSxHQUFHQyxNQUFILENBQVVQLElBQVYsQ0FBZU0sS0FBZixFQUFzQixVQUFDRSxJQUFELEVBQVU7QUFBQSxnQkFDNUJDLElBRDRCLEdBQ25CRCxJQURtQixDQUM1QkMsSUFENEI7O0FBRXBDLGdCQUFNQyxZQUFZRCxLQUFLRSxNQUFMLENBQVlGLEtBQUtHLFdBQUwsQ0FBaUIsR0FBakIsSUFBd0IsQ0FBcEMsQ0FBbEI7QUFDQSxtQkFBT0YsVUFBVUcsTUFBVixLQUFxQkosS0FBS0ksTUFBakM7QUFDSCxTQUpPLENBQVI7QUFLQTs7QUFFQWpCLGNBQU1rQixRQUFOLENBQWVSLEtBQWY7QUFDSDtBQTFCa0IsQ0FBdkI7O0FBeUNBLElBQU1TLG1CQUFtQnRCLGNBQ3JCQyxjQURxQixFQUV2QixnQkFBd0c7QUFBQSxRQUFyR3NCLE9BQXFHLFFBQXJHQSxPQUFxRztBQUFBLFFBQTVGQyxNQUE0RixRQUE1RkEsTUFBNEY7QUFBQSxRQUFwRkMsT0FBb0YsUUFBcEZBLE9BQW9GO0FBQUEsUUFBM0VDLElBQTJFLFFBQTNFQSxJQUEyRTtBQUFBLFFBQXJFQyxLQUFxRSxRQUFyRUEsS0FBcUU7QUFBQSxRQUE5REMsUUFBOEQsUUFBOURBLFFBQThEO0FBQUEsUUFBcERQLFFBQW9ELFFBQXBEQSxRQUFvRDtBQUFBLFFBQTFDUSxPQUEwQyxRQUExQ0EsT0FBMEM7QUFBQSxRQUFqQ0MsbUJBQWlDLFFBQWpDQSxtQkFBaUM7O0FBQ3RHLFFBQU1DLG9CQUFvQixTQUFwQkEsaUJBQW9CO0FBQUEsWUFBYWxCLEtBQWIsU0FBR21CLE1BQUgsQ0FBYW5CLEtBQWI7QUFBQSxlQUFnQ1EsU0FBU1IsS0FBVCxDQUFoQztBQUFBLEtBQTFCO0FBQ0EsUUFBTW9CLFdBQVdOLE1BQU1QLE1BQU4sR0FBZSxDQUFoQzs7QUFFQSxXQUNJO0FBQUE7QUFBQSxVQUFLLFdBQVUsdUJBQWY7QUFDSSw0QkFBQyxRQUFEO0FBQ0ksaUNBQXFCVSxtQkFEekI7QUFFSSxtQkFBT0gsS0FGWDtBQUdJLHNCQUFVQyxRQUhkO0FBSUksa0JBQU1GLElBSlY7QUFLSSxxQkFBU0c7QUFMYixVQURKO0FBUUksNEJBQUMsV0FBRDtBQUNJLHFCQUFTTixPQURiO0FBRUksaUNBQXFCTyxtQkFGekI7QUFHSSxzQkFBVUcsUUFIZDtBQUlJLG9CQUFRVCxNQUpaO0FBS0kscUJBQVNDLE9BTGI7QUFNSSxrQkFBTUMsSUFOVjtBQU9JLHNCQUFVSztBQVBkO0FBUkosS0FESjtBQW9CSCxDQTFCd0IsQ0FBekI7O0FBNEJBLGVBQWVULGdCQUFmIiwiZmlsZSI6IkRyb3BwYWJsZUNvbnRlbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQGZsb3dcclxuICogQGZpbGUgRHJvcHBhYmxlIGFyZWEgY29udGFpbmluZyB1cGxvYWQgaXRlbSBsaXN0XHJcbiAqL1xyXG5cclxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IEl0ZW1MaXN0IGZyb20gJy4vSXRlbUxpc3QnO1xyXG5pbXBvcnQgVXBsb2FkU3RhdGUgZnJvbSAnLi9VcGxvYWRTdGF0ZSc7XHJcbmltcG9ydCBtYWtlRHJvcHBhYmxlIGZyb20gJy4uL0Ryb3BwYWJsZSc7XHJcbmltcG9ydCB0eXBlIHsgVXBsb2FkSXRlbSwgVmlldyB9IGZyb20gJy4uLy4uL2Zsb3dUeXBlcyc7XHJcbmltcG9ydCAnLi9Ecm9wcGFibGVDb250ZW50LnNjc3MnO1xyXG5cclxuLyoqXHJcbiAqIERlZmluaXRpb24gZm9yIGRyYWcgYW5kIGRyb3AgYmVoYXZpb3IuXHJcbiAqL1xyXG5jb25zdCBkcm9wRGVmaW5pdGlvbiA9IHtcclxuICAgIC8qKlxyXG4gICAgICogVmFsaWRhdGVzIHdoZXRoZXIgYSBmaWxlIGNhbiBiZSBkcm9wcGVkIG9yIG5vdC5cclxuICAgICAqL1xyXG4gICAgZHJvcFZhbGlkYXRvcjogKHByb3BzLCBkYXRhVHJhbnNmZXIpID0+IHtcclxuICAgICAgICBjb25zdCB7IGFsbG93ZWRUeXBlcyB9ID0gcHJvcHM7XHJcbiAgICAgICAgcmV0dXJuIFtdLnNvbWUuY2FsbChkYXRhVHJhbnNmZXIudHlwZXMsICh0eXBlKSA9PiBhbGxvd2VkVHlwZXMuaW5kZXhPZih0eXBlKSA+IC0xKTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEZXRlcm1pbmVzIHdoYXQgaGFwcGVucyBhZnRlciBhIGZpbGUgaXMgZHJvcHBlZFxyXG4gICAgICovXHJcbiAgICBvbkRyb3A6IChldmVudCwgcHJvcHMpID0+IHtcclxuICAgICAgICBsZXQgeyBkYXRhVHJhbnNmZXI6IHsgZmlsZXMgfSB9ID0gZXZlbnQ7XHJcblxyXG4gICAgICAgIC8vIFRoaXMgZmlsdGVycyBvdXQgYWxsIGZpbGVzIHdpdGhvdXQgYW4gZXh0ZW5zaW9uIHNpbmNlIHRoZXJlIGlzIG5vIG90aGVyXHJcbiAgICAgICAgLy8gZ29vZCB3YXkgdG8gZmlsdGVyIG91dCBmb2xkZXJzXHJcbiAgICAgICAgLyogZXNsaW50LWRpc2FibGUgbm8tcmVkZWNsYXJlICovXHJcbiAgICAgICAgZmlsZXMgPSBbXS5maWx0ZXIuY2FsbChmaWxlcywgKGZpbGUpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgeyBuYW1lIH0gPSBmaWxlO1xyXG4gICAgICAgICAgICBjb25zdCBleHRlbnNpb24gPSBuYW1lLnN1YnN0cihuYW1lLmxhc3RJbmRleE9mKCcuJykgKyAxKTtcclxuICAgICAgICAgICAgcmV0dXJuIGV4dGVuc2lvbi5sZW5ndGggIT09IG5hbWUubGVuZ3RoO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIC8qIGVzbGludC1lbmFibGUgbm8tcmVkZWNsYXJlICovXHJcblxyXG4gICAgICAgIHByb3BzLmFkZEZpbGVzKGZpbGVzKTtcclxuICAgIH1cclxufTtcclxuXHJcbnR5cGUgUHJvcHMgPSB7XHJcbiAgICBjYW5Ecm9wOiBib29sZWFuLFxyXG4gICAgaXNPdmVyOiBib29sZWFuLFxyXG4gICAgaXNUb3VjaDogYm9vbGVhbixcclxuICAgIHZpZXc6IFZpZXcsXHJcbiAgICBpdGVtczogVXBsb2FkSXRlbVtdLFxyXG4gICAgdGFibGVSZWY6IEZ1bmN0aW9uLFxyXG4gICAgYWRkRmlsZXM6IEZ1bmN0aW9uLFxyXG4gICAgb25DbGljazogRnVuY3Rpb24sXHJcbiAgICBnZXRMb2NhbGl6ZWRNZXNzYWdlOiBGdW5jdGlvblxyXG59O1xyXG5cclxuY29uc3QgRHJvcHBhYmxlQ29udGVudCA9IG1ha2VEcm9wcGFibGUoXHJcbiAgICBkcm9wRGVmaW5pdGlvblxyXG4pKCh7IGNhbkRyb3AsIGlzT3ZlciwgaXNUb3VjaCwgdmlldywgaXRlbXMsIHRhYmxlUmVmLCBhZGRGaWxlcywgb25DbGljaywgZ2V0TG9jYWxpemVkTWVzc2FnZSB9OiBQcm9wcykgPT4ge1xyXG4gICAgY29uc3QgaGFuZGxlU2VsZWN0RmlsZXMgPSAoeyB0YXJnZXQ6IHsgZmlsZXMgfSB9OiBhbnkpID0+IGFkZEZpbGVzKGZpbGVzKTtcclxuICAgIGNvbnN0IGhhc0l0ZW1zID0gaXRlbXMubGVuZ3RoID4gMDtcclxuXHJcbiAgICByZXR1cm4gKFxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPSdiY3UtZHJvcHBhYmxlLWNvbnRlbnQnPlxyXG4gICAgICAgICAgICA8SXRlbUxpc3RcclxuICAgICAgICAgICAgICAgIGdldExvY2FsaXplZE1lc3NhZ2U9e2dldExvY2FsaXplZE1lc3NhZ2V9XHJcbiAgICAgICAgICAgICAgICBpdGVtcz17aXRlbXN9XHJcbiAgICAgICAgICAgICAgICB0YWJsZVJlZj17dGFibGVSZWZ9XHJcbiAgICAgICAgICAgICAgICB2aWV3PXt2aWV3fVxyXG4gICAgICAgICAgICAgICAgb25DbGljaz17b25DbGlja31cclxuICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgPFVwbG9hZFN0YXRlXHJcbiAgICAgICAgICAgICAgICBjYW5Ecm9wPXtjYW5Ecm9wfVxyXG4gICAgICAgICAgICAgICAgZ2V0TG9jYWxpemVkTWVzc2FnZT17Z2V0TG9jYWxpemVkTWVzc2FnZX1cclxuICAgICAgICAgICAgICAgIGhhc0l0ZW1zPXtoYXNJdGVtc31cclxuICAgICAgICAgICAgICAgIGlzT3Zlcj17aXNPdmVyfVxyXG4gICAgICAgICAgICAgICAgaXNUb3VjaD17aXNUb3VjaH1cclxuICAgICAgICAgICAgICAgIHZpZXc9e3ZpZXd9XHJcbiAgICAgICAgICAgICAgICBvblNlbGVjdD17aGFuZGxlU2VsZWN0RmlsZXN9XHJcbiAgICAgICAgICAgIC8+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICApO1xyXG59KTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IERyb3BwYWJsZUNvbnRlbnQ7XHJcbiJdfQ==