var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * 
 * @file HOC for drag drop
 * @author Box
 */

import React, { PureComponent } from 'react';
import { findDOMNode } from 'react-dom';
import classNames from 'classnames';


/* eslint-disable no-plusplus */
var makeDroppable = function makeDroppable(_ref) {
    var dropValidator = _ref.dropValidator,
        onDrop = _ref.onDrop;
    return function (Wrapped) {
        var _class, _temp;

        return _temp = _class = function (_PureComponent) {
            _inherits(DroppableComponent, _PureComponent);

            /**
             * [constructor]
             *
             * @param {*} props
             * @return {DroppableComponent}
             */
            function DroppableComponent(props) {
                _classCallCheck(this, DroppableComponent);

                var _this = _possibleConstructorReturn(this, (DroppableComponent.__proto__ || Object.getPrototypeOf(DroppableComponent)).call(this, props));

                _this.setWrappedRef = function (ref) {
                    _this.wrappedRef = ref;
                };

                _this.handleDragEnter = function (event) {
                    // This allows onDrop to be fired
                    event.preventDefault();

                    // Use this to track the number of drag enters and leaves.
                    // This is used to normalize enters/leaves between parent/child elements

                    // we only want to do things in dragenter when the counter === 1
                    if (++_this.enterLeaveCounter === 1) {
                        var dataTransfer = event.dataTransfer;

                        // if we don't have a dropValidator, we just default canDrop to true

                        var _canDrop = dropValidator ? dropValidator(_this.props, dataTransfer) : true;

                        _this.setState({
                            isOver: true,
                            canDrop: _canDrop
                        });
                    }
                };

                _this.handleDragOver = function (event) {
                    // This allows onDrop to be fired
                    event.preventDefault();

                    var canDrop = _this.state.canDrop;
                    var dataTransfer = event.dataTransfer;


                    if (!dataTransfer) {
                        return;
                    }

                    if (!canDrop) {
                        dataTransfer.dropEffect = 'none';
                    } else if (dataTransfer.effectAllowed) {
                        // Set the drop effect if it was defined
                        dataTransfer.dropEffect = dataTransfer.effectAllowed;
                    }
                };

                _this.handleDrop = function (event) {
                    event.preventDefault();

                    // reset enterLeaveCounter
                    _this.enterLeaveCounter = 0;

                    var canDrop = _this.state.canDrop;


                    _this.setState({
                        canDrop: false,
                        isDragging: false,
                        isOver: false
                    });

                    if (canDrop && onDrop) {
                        onDrop(event, _this.props);
                    }
                };

                _this.handleDragLeave = function (event) {
                    event.preventDefault();

                    // if enterLeaveCounter is zero, it means that we're actually leaving the item
                    if (--_this.enterLeaveCounter > 0) {
                        return;
                    }

                    _this.setState({
                        canDrop: false,
                        isDragging: false,
                        isOver: false
                    });
                };

                _this.enterLeaveCounter = 0;
                _this.state = {
                    canDrop: false,
                    isDragging: false,
                    isOver: false
                };
                return _this;
            }

            /**
             * Adds event listeners once the component mounts@inheritdoc
             * @inheritdoc
             */


            _createClass(DroppableComponent, [{
                key: 'componentDidMount',
                value: function componentDidMount() {
                    var droppableEl = findDOMNode(this);
                    if (!droppableEl || !(droppableEl instanceof Element)) {
                        throw new Error('Bad mount in makeDroppable');
                    }

                    // add event listeners directly on the element
                    droppableEl.addEventListener('dragenter', this.handleDragEnter);
                    droppableEl.addEventListener('dragover', this.handleDragOver);
                    droppableEl.addEventListener('dragleave', this.handleDragLeave);
                    droppableEl.addEventListener('drop', this.handleDrop);

                    this.droppableEl = droppableEl;
                }

                /**
                 * Removes event listeners when the component is going to unmount
                 * @inheritdoc
                 */

            }, {
                key: 'componentWillUnmount',
                value: function componentWillUnmount() {
                    this.droppableEl.removeEventListener('dragenter', this.handleDragEnter);
                    this.droppableEl.removeEventListener('dragover', this.handleDragOver);
                    this.droppableEl.removeEventListener('dragleave', this.handleDragLeave);
                    this.droppableEl.removeEventListener('drop', this.handleDrop);
                }

                /**
                 * Sets a ref to the instance of BaseComponent
                 * Note: This will return null if BaseComponent is a stateless, functional component
                 * because stateless, functional components have no instances
                 *
                 * @param {Component} ref - Ref to the component instance of BaseComponent
                 * @return {void}
                 */


                /**
                 * Function that gets called when an item is dragged into the drop zone
                 *
                 * @param {SyntheticEvent} event - The dragenter event
                 * @return {void}
                 */


                /**
                 * Function that gets called when an item is dragged over the drop zone
                 *
                 * @param {DragEvent} event - The dragover event
                 * @return {void}
                 */


                /**
                 * Function that gets called when an item is drop onto the drop zone
                 *
                 * @param {DragEvent} event - The drop event
                 * @return {void}
                 */


                /**
                 * Function that gets called when an item is dragged out of the drop zone
                 *
                 * @param {DragEvent} event - The dragleave event
                 * @return {void}
                 */

            }, {
                key: 'render',


                /**
                 * Renders the HOC
                 *
                 * @private
                 * @inheritdoc
                 * @return {Element}
                 */
                value: function render() {
                    var _props = this.props,
                        className = _props.className,
                        rest = _objectWithoutProperties(_props, ['className']);

                    var _state = this.state,
                        canDrop = _state.canDrop,
                        isOver = _state.isOver;


                    var classes = classNames(className, {
                        'is-droppable': canDrop,
                        'is-over': isOver
                    });

                    var mergedProps = _extends({}, rest, this.state, {
                        className: classes
                    });

                    return React.createElement(Wrapped, _extends({}, mergedProps, { ref: this.setWrappedRef }));
                }
            }]);

            return DroppableComponent;
        }(PureComponent), _class.defaultProps = {
            className: ''
        }, _temp;
    };
};

export default makeDroppable;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ha2VEcm9wcGFibGUuanMiXSwibmFtZXMiOlsiUmVhY3QiLCJQdXJlQ29tcG9uZW50IiwiZmluZERPTU5vZGUiLCJjbGFzc05hbWVzIiwibWFrZURyb3BwYWJsZSIsImRyb3BWYWxpZGF0b3IiLCJvbkRyb3AiLCJXcmFwcGVkIiwicHJvcHMiLCJzZXRXcmFwcGVkUmVmIiwicmVmIiwid3JhcHBlZFJlZiIsImhhbmRsZURyYWdFbnRlciIsImV2ZW50IiwicHJldmVudERlZmF1bHQiLCJlbnRlckxlYXZlQ291bnRlciIsImRhdGFUcmFuc2ZlciIsImNhbkRyb3AiLCJzZXRTdGF0ZSIsImlzT3ZlciIsImhhbmRsZURyYWdPdmVyIiwic3RhdGUiLCJkcm9wRWZmZWN0IiwiZWZmZWN0QWxsb3dlZCIsImhhbmRsZURyb3AiLCJpc0RyYWdnaW5nIiwiaGFuZGxlRHJhZ0xlYXZlIiwiZHJvcHBhYmxlRWwiLCJFbGVtZW50IiwiRXJyb3IiLCJhZGRFdmVudExpc3RlbmVyIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsImNsYXNzTmFtZSIsInJlc3QiLCJjbGFzc2VzIiwibWVyZ2VkUHJvcHMiLCJkZWZhdWx0UHJvcHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7QUFNQSxPQUFPQSxLQUFQLElBQWdCQyxhQUFoQixRQUFxQyxPQUFyQztBQUNBLFNBQVNDLFdBQVQsUUFBNEIsV0FBNUI7QUFDQSxPQUFPQyxVQUFQLE1BQXVCLFlBQXZCOzs7QUFpQkE7QUFDQSxJQUFNQyxnQkFBZ0IsU0FBaEJBLGFBQWdCO0FBQUEsUUFBR0MsYUFBSCxRQUFHQSxhQUFIO0FBQUEsUUFBa0JDLE1BQWxCLFFBQWtCQSxNQUFsQjtBQUFBLFdBQWdGLFVBQ2xHQyxPQURrRztBQUFBOztBQUFBO0FBQUE7O0FBYzlGOzs7Ozs7QUFNQSx3Q0FBWUMsS0FBWixFQUEwQjtBQUFBOztBQUFBLG9KQUNoQkEsS0FEZ0I7O0FBQUEsc0JBZ0QxQkMsYUFoRDBCLEdBZ0RWLFVBQUNDLEdB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ZUFBZTVCLGFBQWYiLCJmaWxlIjoibWFrZURyb3BwYWJsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBAZmxvd1xyXG4gKiBAZmlsZSBIT0MgZm9yIGRyYWcgZHJvcFxyXG4gKiBAYXV0aG9yIEJveFxyXG4gKi9cclxuXHJcbmltcG9ydCBSZWFjdCwgeyBQdXJlQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBmaW5kRE9NTm9kZSB9IGZyb20gJ3JlYWN0LWRvbSc7XHJcbmltcG9ydCBjbGFzc05hbWVzIGZyb20gJ2NsYXNzbmFtZXMnO1xyXG5pbXBvcnQgdHlwZSB7IENsYXNzQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vZmxvd1R5cGVzJztcclxuXHJcbnR5cGUgUHJvcHMgPSB7XHJcbiAgICBjbGFzc05hbWU6IHN0cmluZ1xyXG59O1xyXG5cclxudHlwZSBEZWZhdWx0UHJvcHMgPSB7XHJcbiAgICBjbGFzc05hbWU6IHN0cmluZ1xyXG59O1xyXG5cclxudHlwZSBTdGF0ZSA9IHtcclxuICAgIGNhbkRyb3A6IGJvb2xlYW4sXHJcbiAgICBpc0RyYWdnaW5nOiBib29sZWFuLFxyXG4gICAgaXNPdmVyOiBib29sZWFuXHJcbn07XHJcblxyXG4vKiBlc2xpbnQtZGlzYWJsZSBuby1wbHVzcGx1cyAqL1xyXG5jb25zdCBtYWtlRHJvcHBhYmxlID0gKHsgZHJvcFZhbGlkYXRvciwgb25Ecm9wIH06IHsgZHJvcFZhbGlkYXRvcj86IEZ1bmN0aW9uLCBvbkRyb3A/OiBGdW5jdGlvbiB9KSA9PiAoXHJcbiAgICBXcmFwcGVkOiBDbGFzc0NvbXBvbmVudDxhbnksIGFueSwgYW55PlxyXG4pOiBDbGFzc0NvbXBvbmVudDxhbnksIGFueSwgYW55PiA9PlxyXG4gICAgY2xhc3MgRHJvcHBhYmxlQ29tcG9uZW50IGV4dGVuZHMgUHVyZUNvbXBvbmVudDxEZWZhdWx0UHJvcHMsIFByb3BzLCBTdGF0ZT4ge1xyXG4gICAgICAgIHByb3BzOiBQcm9wcztcclxuICAgICAgICBzdGF0ZTogU3RhdGU7XHJcbiAgICAgICAgZW50ZXJMZWF2ZUNvdW50ZXI6IG51bWJlcjtcclxuICAgICAgICBkcm9wcGFibGVFbDogRWxlbWVudDtcclxuICAgICAgICB3cmFwcGVkUmVmOiBFbGVtZW50O1xyXG5cclxuICAgICAgICBzdGF0aWMgZGVmYXVsdFByb3BzOiBEZWZhdWx0UHJvcHMgPSB7XHJcbiAgICAgICAgICAgIGNsYXNzTmFtZTogJydcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBbY29uc3RydWN0b3JdXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcGFyYW0geyp9IHByb3BzXHJcbiAgICAgICAgICogQHJldHVybiB7RHJvcHBhYmxlQ29tcG9uZW50fVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKHByb3BzOiBQcm9wcykge1xyXG4gICAgICAgICAgICBzdXBlcihwcm9wcyk7XHJcbiAgICAgICAgICAgIHRoaXMuZW50ZXJMZWF2ZUNvdW50ZXIgPSAwO1xyXG4gICAgICAgICAgICB0aGlzLnN0YXRlID0ge1xyXG4gICAgICAgICAgICAgICAgY2FuRHJvcDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBpc0RyYWdnaW5nOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIGlzT3ZlcjogZmFsc2VcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEFkZHMgZXZlbnQgbGlzdGVuZXJzIG9uY2UgdGhlIGNvbXBvbmVudCBtb3VudHNAaW5oZXJpdGRvY1xyXG4gICAgICAgICAqIEBpbmhlcml0ZG9jXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgY29tcG9uZW50RGlkTW91bnQoKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGRyb3BwYWJsZUVsID0gZmluZERPTU5vZGUodGhpcyk7XHJcbiAgICAgICAgICAgIGlmICghZHJvcHBhYmxlRWwgfHwgIShkcm9wcGFibGVFbCBpbnN0YW5jZW9mIEVsZW1lbnQpKSB7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0JhZCBtb3VudCBpbiBtYWtlRHJvcHBhYmxlJyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIGFkZCBldmVudCBsaXN0ZW5lcnMgZGlyZWN0bHkgb24gdGhlIGVsZW1lbnRcclxuICAgICAgICAgICAgZHJvcHBhYmxlRWwuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ2VudGVyJywgdGhpcy5oYW5kbGVEcmFnRW50ZXIpO1xyXG4gICAgICAgICAgICBkcm9wcGFibGVFbC5hZGRFdmVudExpc3RlbmVyKCdkcmFnb3ZlcicsIHRoaXMuaGFuZGxlRHJhZ092ZXIpO1xyXG4gICAgICAgICAgICBkcm9wcGFibGVFbC5hZGRFdmVudExpc3RlbmVyKCdkcmFnbGVhdmUnLCB0aGlzLmhhbmRsZURyYWdMZWF2ZSk7XHJcbiAgICAgICAgICAgIGRyb3BwYWJsZUVsLmFkZEV2ZW50TGlzdGVuZXIoJ2Ryb3AnLCB0aGlzLmhhbmRsZURyb3ApO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5kcm9wcGFibGVFbCA9IGRyb3BwYWJsZUVsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogUmVtb3ZlcyBldmVudCBsaXN0ZW5lcnMgd2hlbiB0aGUgY29tcG9uZW50IGlzIGdvaW5nIHRvIHVubW91bnRcclxuICAgICAgICAgKiBAaW5oZXJpdGRvY1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xyXG4gICAgICAgICAgICB0aGlzLmRyb3BwYWJsZUVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2RyYWdlbnRlcicsIHRoaXMuaGFuZGxlRHJhZ0VudGVyKTtcclxuICAgICAgICAgICAgdGhpcy5kcm9wcGFibGVFbC5yZW1vdmVFdmVudExpc3RlbmVyKCdkcmFnb3ZlcicsIHRoaXMuaGFuZGxlRHJhZ092ZXIpO1xyXG4gICAgICAgICAgICB0aGlzLmRyb3BwYWJsZUVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2RyYWdsZWF2ZScsIHRoaXMuaGFuZGxlRHJhZ0xlYXZlKTtcclxuICAgICAgICAgICAgdGhpcy5kcm9wcGFibGVFbC5yZW1vdmVFdmVudExpc3RlbmVyKCdkcm9wJywgdGhpcy5oYW5kbGVEcm9wKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFNldHMgYSByZWYgdG8gdGhlIGluc3RhbmNlIG9mIEJhc2VDb21wb25lbnRcclxuICAgICAgICAgKiBOb3RlOiBUaGlzIHdpbGwgcmV0dXJuIG51bGwgaWYgQmFzZUNvbXBvbmVudCBpcyBhIHN0YXRlbGVzcywgZnVuY3Rpb25hbCBjb21wb25lbnRcclxuICAgICAgICAgKiBiZWNhdXNlIHN0YXRlbGVzcywgZnVuY3Rpb25hbCBjb21wb25lbnRzIGhhdmUgbm8gaW5zdGFuY2VzXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcGFyYW0ge0NvbXBvbmVudH0gcmVmIC0gUmVmIHRvIHRoZSBjb21wb25lbnQgaW5zdGFuY2Ugb2YgQmFzZUNvbXBvbmVudFxyXG4gICAgICAgICAqIEByZXR1cm4ge3ZvaWR9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgc2V0V3JhcHBlZFJlZiA9IChyZWY6IEVsZW1lbnQpID0+IHtcclxuICAgICAgICAgICAgdGhpcy53cmFwcGVkUmVmID0gcmVmO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEZ1bmN0aW9uIHRoYXQgZ2V0cyBjYWxsZWQgd2hlbiBhbiBpdGVtIGlzIGRyYWdnZWQgaW50byB0aGUgZHJvcCB6b25lXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcGFyYW0ge1N5bnRoZXRpY0V2ZW50fSBldmVudCAtIFRoZSBkcmFnZW50ZXIgZXZlbnRcclxuICAgICAgICAgKiBAcmV0dXJuIHt2b2lkfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGhhbmRsZURyYWdFbnRlciA9IChldmVudDogRHJhZ0V2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgIC8vIFRoaXMgYWxsb3dzIG9uRHJvcCB0byBiZSBmaXJlZFxyXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICAgICAgLy8gVXNlIHRoaXMgdG8gdHJhY2sgdGhlIG51bWJlciBvZiBkcmFnIGVudGVycyBhbmQgbGVhdmVzLlxyXG4gICAgICAgICAgICAvLyBUaGlzIGlzIHVzZWQgdG8gbm9ybWFsaXplIGVudGVycy9sZWF2ZXMgYmV0d2VlbiBwYXJlbnQvY2hpbGQgZWxlbWVudHNcclxuXHJcbiAgICAgICAgICAgIC8vIHdlIG9ubHkgd2FudCB0byBkbyB0aGluZ3MgaW4gZHJhZ2VudGVyIHdoZW4gdGhlIGNvdW50ZXIgPT09IDFcclxuICAgICAgICAgICAgaWYgKCsrdGhpcy5lbnRlckxlYXZlQ291bnRlciA9PT0gMSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgeyBkYXRhVHJhbnNmZXIgfSA9IGV2ZW50O1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIGlmIHdlIGRvbid0IGhhdmUgYSBkcm9wVmFsaWRhdG9yLCB3ZSBqdXN0IGRlZmF1bHQgY2FuRHJvcCB0byB0cnVlXHJcbiAgICAgICAgICAgICAgICBjb25zdCBjYW5Ecm9wID0gZHJvcFZhbGlkYXRvciA/IGRyb3BWYWxpZGF0b3IodGhpcy5wcm9wcywgZGF0YVRyYW5zZmVyKSA6IHRydWU7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgaXNPdmVyOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhbkRyb3BcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogRnVuY3Rpb24gdGhhdCBnZXRzIGNhbGxlZCB3aGVuIGFuIGl0ZW0gaXMgZHJhZ2dlZCBvdmVyIHRoZSBkcm9wIHpvbmVcclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBwYXJhbSB7RHJhZ0V2ZW50fSBldmVudCAtIFRoZSBkcmFnb3ZlciBldmVudFxyXG4gICAgICAgICAqIEByZXR1cm4ge3ZvaWR9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgaGFuZGxlRHJhZ092ZXIgPSAoZXZlbnQ6IERyYWdFdmVudCkgPT4ge1xyXG4gICAgICAgICAgICAvLyBUaGlzIGFsbG93cyBvbkRyb3AgdG8gYmUgZmlyZWRcclxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHsgY2FuRHJvcCB9ID0gdGhpcy5zdGF0ZTtcclxuICAgICAgICAgICAgY29uc3QgeyBkYXRhVHJhbnNmZXIgfSA9IGV2ZW50O1xyXG5cclxuICAgICAgICAgICAgaWYgKCFkYXRhVHJhbnNmZXIpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKCFjYW5Ecm9wKSB7XHJcbiAgICAgICAgICAgICAgICBkYXRhVHJhbnNmZXIuZHJvcEVmZmVjdCA9ICdub25lJztcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChkYXRhVHJhbnNmZXIuZWZmZWN0QWxsb3dlZCkge1xyXG4gICAgICAgICAgICAgICAgLy8gU2V0IHRoZSBkcm9wIGVmZmVjdCBpZiBpdCB3YXMgZGVmaW5lZFxyXG4gICAgICAgICAgICAgICAgZGF0YVRyYW5zZmVyLmRyb3BFZmZlY3QgPSBkYXRhVHJhbnNmZXIuZWZmZWN0QWxsb3dlZDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEZ1bmN0aW9uIHRoYXQgZ2V0cyBjYWxsZWQgd2hlbiBhbiBpdGVtIGlzIGRyb3Agb250byB0aGUgZHJvcCB6b25lXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcGFyYW0ge0RyYWdFdmVudH0gZXZlbnQgLSBUaGUgZHJvcCBldmVudFxyXG4gICAgICAgICAqIEByZXR1cm4ge3ZvaWR9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgaGFuZGxlRHJvcCA9IChldmVudDogRHJhZ0V2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgICAgICAvLyByZXNldCBlbnRlckxlYXZlQ291bnRlclxyXG4gICAgICAgICAgICB0aGlzLmVudGVyTGVhdmVDb3VudGVyID0gMDtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHsgY2FuRHJvcCB9ID0gdGhpcy5zdGF0ZTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgICAgICAgICAgY2FuRHJvcDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBpc0RyYWdnaW5nOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIGlzT3ZlcjogZmFsc2VcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBpZiAoY2FuRHJvcCAmJiBvbkRyb3ApIHtcclxuICAgICAgICAgICAgICAgIG9uRHJvcChldmVudCwgdGhpcy5wcm9wcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBGdW5jdGlvbiB0aGF0IGdldHMgY2FsbGVkIHdoZW4gYW4gaXRlbSBpcyBkcmFnZ2VkIG91dCBvZiB0aGUgZHJvcCB6b25lXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcGFyYW0ge0RyYWdFdmVudH0gZXZlbnQgLSBUaGUgZHJhZ2xlYXZlIGV2ZW50XHJcbiAgICAgICAgICogQHJldHVybiB7dm9pZH1cclxuICAgICAgICAgKi9cclxuICAgICAgICBoYW5kbGVEcmFnTGVhdmUgPSAoZXZlbnQ6IERyYWdFdmVudCkgPT4ge1xyXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICAgICAgLy8gaWYgZW50ZXJMZWF2ZUNvdW50ZXIgaXMgemVybywgaXQgbWVhbnMgdGhhdCB3ZSdyZSBhY3R1YWxseSBsZWF2aW5nIHRoZSBpdGVtXHJcbiAgICAgICAgICAgIGlmICgtLXRoaXMuZW50ZXJMZWF2ZUNvdW50ZXIgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgICAgICAgICAgY2FuRHJvcDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBpc0RyYWdnaW5nOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIGlzT3ZlcjogZmFsc2VcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogUmVuZGVycyB0aGUgSE9DXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICAgICAqIEBpbmhlcml0ZG9jXHJcbiAgICAgICAgICogQHJldHVybiB7RWxlbWVudH1cclxuICAgICAgICAgKi9cclxuICAgICAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHsgY2xhc3NOYW1lLCAuLi5yZXN0IH0gPSB0aGlzLnByb3BzO1xyXG4gICAgICAgICAgICBjb25zdCB7IGNhbkRyb3AsIGlzT3ZlciB9ID0gdGhpcy5zdGF0ZTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGNsYXNzZXMgPSBjbGFzc05hbWVzKGNsYXNzTmFtZSwge1xyXG4gICAgICAgICAgICAgICAgJ2lzLWRyb3BwYWJsZSc6IGNhbkRyb3AsXHJcbiAgICAgICAgICAgICAgICAnaXMtb3Zlcic6IGlzT3ZlclxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IG1lcmdlZFByb3BzID0ge1xyXG4gICAgICAgICAgICAgICAgLi4ucmVzdCxcclxuICAgICAgICAgICAgICAgIC4uLnRoaXMuc3RhdGUsXHJcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU6IGNsYXNzZXNcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiA8V3JhcHBlZCB7Li4ubWVyZ2VkUHJvcHN9IHJlZj17dGhpcy5zZXRXcmFwcGVkUmVmfSAvPjtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgbWFrZURyb3BwYWJsZTtcclxuIl19