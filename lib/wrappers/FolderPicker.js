var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * 
 * @file Main entry point for the Folder Picker ES6 wrapper
 * @author Box
 */

import ContentPicker from './ContentPicker';
import { TYPE_FOLDER, CLIENT_NAME_FOLDER_PICKER } from '../constants';

var FolderPicker = function (_ContentPicker) {
    _inherits(FolderPicker, _ContentPicker);

    function FolderPicker() {
        _classCallCheck(this, FolderPicker);

        return _possibleConstructorReturn(this, (FolderPicker.__proto__ || Object.getPrototypeOf(FolderPicker)).apply(this, arguments));
    }

    _createClass(FolderPicker, [{
        key: 'getType',

        /** @inheritdoc */
        value: function getType() {
            return TYPE_FOLDER;
        }

        /** @inheritdoc */

    }, {
        key: 'getClientName',
        value: function getClientName() {
            return CLIENT_NAME_FOLDER_PICKER;
        }
    }]);

    return FolderPicker;
}(ContentPicker);

export default FolderPicker;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkZvbGRlclBpY2tlci5qcyJdLCJuYW1lcyI6WyJDb250ZW50UGlja2VyIiwiVFlQRV9GT0xERVIiLCJDTElFTlRfTkFNRV9GT0xERVJfUElDS0VSIiwiRm9sZGVyUGlja2VyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7Ozs7QUFNQSxPQUFPQSxhQUFQLE1BQTBCLGlCQUExQjtBQUNBLFNBQVNDLFdBQVQsRUFBc0JDLHlCQUF0QixRQUF1RCxjQUF2RDs7SUFFTUMsWTs7Ozs7Ozs7Ozs7O0FBQ0Y7a0NBQ2tCO0FBQ2QsbUJBQU9GLFdBQVA7QUFDSDs7QUFFRDs7Ozt3Q0FDd0I7QUFDcEIsbUJBQU9DLHlCQUFQO0FBQ0g7Ozs7RUFUc0JGLGE7O0FBWTNCLGVBQWVHLFlBQWYiLCJmaWxlIjoiRm9sZGVyUGlja2VyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIEBmbG93XHJcbiAqIEBmaWxlIE1haW4gZW50cnkgcG9pbnQgZm9yIHRoZSBGb2xkZXIgUGlja2VyIEVTNiB3cmFwcGVyXHJcbiAqIEBhdXRob3IgQm94XHJcbiAqL1xyXG5cclxuaW1wb3J0IENvbnRlbnRQaWNrZXIgZnJvbSAnLi9Db250ZW50UGlja2VyJztcclxuaW1wb3J0IHsgVFlQRV9GT0xERVIsIENMSUVOVF9OQU1FX0ZPTERFUl9QSUNLRVIgfSBmcm9tICcuLi9jb25zdGFudHMnO1xyXG5cclxuY2xhc3MgRm9sZGVyUGlja2VyIGV4dGVuZHMgQ29udGVudFBpY2tlciB7XHJcbiAgICAvKiogQGluaGVyaXRkb2MgKi9cclxuICAgIGdldFR5cGUoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gVFlQRV9GT0xERVI7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIEBpbmhlcml0ZG9jICovXHJcbiAgICBnZXRDbGllbnROYW1lKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIENMSUVOVF9OQU1FX0ZPTERFUl9QSUNLRVI7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEZvbGRlclBpY2tlcjtcclxuIl19