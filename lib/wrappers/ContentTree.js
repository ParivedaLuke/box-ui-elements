var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * 
 * @file Base class for the folder tree ES6 wrapper
 * @author Box
 */

import React from 'react';
import { render as _render } from 'react-dom';
import ES6Wrapper from './ES6Wrapper';
import ContentTreePopup from '../components/ContentTree/ContentTreePopup';
import ContentTreeComponent from '../components/ContentTree/ContentTree';
import { CLIENT_NAME_CONTENT_TREE } from '../constants';

var ContentTree = function (_ES6Wrapper) {
    _inherits(ContentTree, _ES6Wrapper);

    function ContentTree() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, ContentTree);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ContentTree.__proto__ || Object.getPrototypeOf(ContentTree)).call.apply(_ref, [this].concat(args))), _this), _this.onClick = function (data) {
            _this.emit('click', data);
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }
    /**
     * Callback for clicking an item
     *
     * @param {Array} data - chosen box items
     * @return {void}
     */


    _createClass(ContentTree, [{
        key: 'getClientName',


        /**
         * Returns the name for folder tree
         *
         * @return {void}
         */
        value: function getClientName() {
            return CLIENT_NAME_CONTENT_TREE;
        }

        /** @inheritdoc */

    }, {
        key: 'render',
        value: function render() {
            var _options = this.options,
                modal = _options.modal,
                rest = _objectWithoutProperties(_options, ['modal']);

            var TreeComponent = modal ? ContentTreePopup : ContentTreeComponent;
            _render(React.createElement(TreeComponent, _extends({
                clientName: this.getClientName(),
                getLocalizedMessage: this.getLocalizedMessage,
                componentRef: this.setComponent,
                rootFolderId: this.root,
                token: this.token,
                onClick: this.onClick,
                modal: modal
            }, rest)), this.container);
        }
    }]);

    return ContentTree;
}(ES6Wrapper);

global.Box = global.Box || {};
global.Box.ContentTree = ContentTree;
export default ContentTree;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkNvbnRlbnRUcmVlLmpzIl0sIm5hbWVzIjpbIlJlYWN0IiwicmVuZGVyIiwiRVM2V3JhcHBlciIsIkNvbnRlbnRUcmVlUG9wdXAiLCJDb250ZW50VHJlZUNvbXBvbmVudCIsIkNMSUVOVF9OQU1FX0NPTlRFTlRfVFJFRSIsIkNvbnRlbnRUcmVlIiwib25DbGljayIsImRhdGEiLCJlbWl0Iiwib3B0aW9ucyIsIm1vZGFsIiwicmVzdCIsIlRyZWVDb21wb25lbnQiLCJnZXRDbGllbnROYW1lIiwiZ2V0TG9jYWxpemVkTWVzc2FnZSIsInNldENvbXBvbmVudCIsInJvb3QiLCJ0b2tlbiIsImNvbnRhaW5lciIsImdsb2JhbCIsIkJveCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7OztBQU1BLE9BQU9BLEtBQVAsTUFBa0IsT0FBbEI7QUFDQSxTQUFTQyxpQkFBVCxRQUF1QixXQUF2QjtBQUNBLE9BQU9DLFVBQVAsTUFBdUIsY0FBdkI7QUFDQSxPQUFPQyxnQkFBUCxNQUE2Qiw0Q0FBN0I7QUFDQSxPQUFPQyxvQkFBUCxNQUFpQyx1Q0FBakM7QUFDQSxTQUFTQyx3QkFBVCxRQUF5QyxjQUF6Qzs7SUFHTUMsVzs7Ozs7Ozs7Ozs7Ozs7b01BT0ZDLE8sR0FBVSxVQUFDQyxJQUFELEVBQXlCO0FBQy9CLGtCQUFLQyxJQUFMLENBQVUsT0FBVixFQUFtQkQsSUFBbkI7QUFDSCxTOztBQVJEOzs7Ozs7Ozs7Ozs7QUFVQTs7Ozs7d0NBS3dCO0FBQ3BCLG1CQUFPSCx3QkFBUDtBQUNIOztBQUVEOzs7O2lDQUNTO0FBQUEsMkJBQ2dELEtBQUtLLE9BRHJEO0FBQUEsZ0JBQ0dDLEtBREgsWUFDR0EsS0FESDtBQUFBLGdCQUNhQyxJQURiOztBQUVMLGdCQUFNQyxnQkFBZ0JGLFFBQVFSLGdCQUFSLEdBQTJCQyxvQkFBakQ7QUFDQUgsb0JBQ0ksb0JBQUMsYUFBRDtBQUNJLDRCQUFZLEtBQUthLGFBQUwsRUFEaEI7QUFFSSxxQ0FBcUIsS0FBS0MsbUJBRjlCO0FBR0ksOEJBQWMsS0FBS0MsWUFIdkI7QUFJSSw4QkFBYyxLQUFLQyxJQUp2QjtBQUtJLHVCQUFPLEtBQUtDLEtBTGhCO0FBTUkseUJBQVMsS0FBS1gsT0FObEI7QUFPSSx1QkFBT0k7QUFQWCxlQVFRQyxJQVJSLEVBREosRUFXSSxLQUFLTyxTQVhUO0FBYUg7Ozs7RUFyQ3FCakIsVTs7QUF3QzFCa0IsT0FBT0MsR0FBUCxHQUFhRCxPQUFPQyxHQUFQLElBQWMsRUFBM0I7QUFDQUQsT0FBT0MsR0FBUCxDQUFXZixXQUFYLEdBQXlCQSxXQUF6QjtBQUNBLGVBQWVBLFdBQWYiLCJmaWxlIjoiQ29udGVudFRyZWUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQGZsb3dcclxuICogQGZpbGUgQmFzZSBjbGFzcyBmb3IgdGhlIGZvbGRlciB0cmVlIEVTNiB3cmFwcGVyXHJcbiAqIEBhdXRob3IgQm94XHJcbiAqL1xyXG5cclxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgcmVuZGVyIH0gZnJvbSAncmVhY3QtZG9tJztcclxuaW1wb3J0IEVTNldyYXBwZXIgZnJvbSAnLi9FUzZXcmFwcGVyJztcclxuaW1wb3J0IENvbnRlbnRUcmVlUG9wdXAgZnJvbSAnLi4vY29tcG9uZW50cy9Db250ZW50VHJlZS9Db250ZW50VHJlZVBvcHVwJztcclxuaW1wb3J0IENvbnRlbnRUcmVlQ29tcG9uZW50IGZyb20gJy4uL2NvbXBvbmVudHMvQ29udGVudFRyZWUvQ29udGVudFRyZWUnO1xyXG5pbXBvcnQgeyBDTElFTlRfTkFNRV9DT05URU5UX1RSRUUgfSBmcm9tICcuLi9jb25zdGFudHMnO1xyXG5pbXBvcnQgdHlwZSB7IE1vZGFsT3B0aW9ucywgQm94SXRlbSB9IGZyb20gJy4uL2Zsb3dUeXBlcyc7XHJcblxyXG5jbGFzcyBDb250ZW50VHJlZSBleHRlbmRzIEVTNldyYXBwZXIge1xyXG4gICAgLyoqXHJcbiAgICAgKiBDYWxsYmFjayBmb3IgY2xpY2tpbmcgYW4gaXRlbVxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7QXJyYXl9IGRhdGEgLSBjaG9zZW4gYm94IGl0ZW1zXHJcbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxyXG4gICAgICovXHJcbiAgICBvbkNsaWNrID0gKGRhdGE6IEJveEl0ZW0pOiB2b2lkID0+IHtcclxuICAgICAgICB0aGlzLmVtaXQoJ2NsaWNrJywgZGF0YSk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgbmFtZSBmb3IgZm9sZGVyIHRyZWVcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxyXG4gICAgICovXHJcbiAgICBnZXRDbGllbnROYW1lKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIENMSUVOVF9OQU1FX0NPTlRFTlRfVFJFRTtcclxuICAgIH1cclxuXHJcbiAgICAvKiogQGluaGVyaXRkb2MgKi9cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICBjb25zdCB7IG1vZGFsLCAuLi5yZXN0IH06IHsgbW9kYWw/OiBNb2RhbE9wdGlvbnMgfSA9IHRoaXMub3B0aW9ucztcclxuICAgICAgICBjb25zdCBUcmVlQ29tcG9uZW50ID0gbW9kYWwgPyBDb250ZW50VHJlZVBvcHVwIDogQ29udGVudFRyZWVDb21wb25lbnQ7XHJcbiAgICAgICAgcmVuZGVyKFxyXG4gICAgICAgICAgICA8VHJlZUNvbXBvbmVudFxyXG4gICAgICAgICAgICAgICAgY2xpZW50TmFtZT17dGhpcy5nZXRDbGllbnROYW1lKCl9XHJcbiAgICAgICAgICAgICAgICBnZXRMb2NhbGl6ZWRNZXNzYWdlPXt0aGlzLmdldExvY2FsaXplZE1lc3NhZ2V9XHJcbiAgICAgICAgICAgICAgICBjb21wb25lbnRSZWY9e3RoaXMuc2V0Q29tcG9uZW50fVxyXG4gICAgICAgICAgICAgICAgcm9vdEZvbGRlcklkPXt0aGlzLnJvb3R9XHJcbiAgICAgICAgICAgICAgICB0b2tlbj17dGhpcy50b2tlbn1cclxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMub25DbGlja31cclxuICAgICAgICAgICAgICAgIG1vZGFsPXttb2RhbH1cclxuICAgICAgICAgICAgICAgIHsuLi5yZXN0fVxyXG4gICAgICAgICAgICAvPixcclxuICAgICAgICAgICAgdGhpcy5jb250YWluZXJcclxuICAgICAgICApO1xyXG4gICAgfVxyXG59XHJcblxyXG5nbG9iYWwuQm94ID0gZ2xvYmFsLkJveCB8fCB7fTtcclxuZ2xvYmFsLkJveC5Db250ZW50VHJlZSA9IENvbnRlbnRUcmVlO1xyXG5leHBvcnQgZGVmYXVsdCBDb250ZW50VHJlZTtcclxuIl19