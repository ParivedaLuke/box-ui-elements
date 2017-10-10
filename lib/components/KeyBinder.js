var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * 
 * @file Item List Key bindings
 * @author Box
 */

import React, { PureComponent } from 'react';
import noop from 'lodash.noop';
import { isInputElement } from '../util/dom';

var KeyBinder = function (_PureComponent) {
    _inherits(KeyBinder, _PureComponent);

    /**
     * [constructor]
     *
     * @private
     * @return {KeyBinder}
     */
    function KeyBinder(props) {
        _classCallCheck(this, KeyBinder);

        var _this = _possibleConstructorReturn(this, (KeyBinder.__proto__ || Object.getPrototypeOf(KeyBinder)).call(this, props));

        _this.onKeyDown = function (event) {
            if (isInputElement(event.target)) {
                return;
            }
            var _this$props = _this.props,
                columnCount = _this$props.columnCount,
                rowCount = _this$props.rowCount,
                onSelect = _this$props.onSelect,
                onRename = _this$props.onRename,
                onDownload = _this$props.onDownload,
                onShare = _this$props.onShare,
                onDelete = _this$props.onDelete,
                onOpen = _this$props.onOpen,
                items = _this$props.items;
            var _this$state = _this.state,
                scrollToColumnPrevious = _this$state.scrollToColumn,
                scrollToRowPrevious = _this$state.scrollToRow;
            var _this$state2 = _this.state,
                scrollToColumn = _this$state2.scrollToColumn,
                scrollToRow = _this$state2.scrollToRow;

            var currentItem = items[scrollToRow];
            var ctrlMeta = event.metaKey || event.ctrlKey;

            // The above cases all prevent default event event behavior.
            // This is to keep the grid from scrolling after the snap-to update.
            switch (event.key) {
                case 'ArrowDown':
                    scrollToRow = ctrlMeta ? rowCount - 1 : Math.min(scrollToRow + 1, rowCount - 1);
                    event.stopPropagation(); // To prevent the arrow down capture of parent
                    break;
                case 'ArrowLeft':
                    scrollToColumn = ctrlMeta ? 0 : Math.max(scrollToColumn - 1, 0);
                    break;
                case 'ArrowRight':
                    scrollToColumn = ctrlMeta ? columnCount - 1 : Math.min(scrollToColumn + 1, columnCount - 1);
                    break;
                case 'ArrowUp':
                    scrollToRow = ctrlMeta ? 0 : Math.max(scrollToRow - 1, 0);
                    break;
                case 'Enter':
                    onOpen(currentItem);
                    event.preventDefault();
                    break;
                case 'Delete':
                    onDelete(currentItem);
                    event.preventDefault();
                    break;
                case 'X':
                    onSelect(currentItem);
                    event.preventDefault();
                    break;
                case 'D':
                    onDownload(currentItem);
                    event.preventDefault();
                    break;
                case 'S':
                    onShare(currentItem);
                    event.preventDefault();
                    break;
                case 'R':
                    onRename(currentItem);
                    event.preventDefault();
                    break;
                default:
                    return;
            }

            if (scrollToColumn !== scrollToColumnPrevious || scrollToRow !== scrollToRowPrevious) {
                event.preventDefault();
                _this.updateScrollState({ scrollToColumn: scrollToColumn, scrollToRow: scrollToRow });
            }
        };

        _this.onSectionRendered = function (_ref) {
            var columnStartIndex = _ref.columnStartIndex,
                columnStopIndex = _ref.columnStopIndex,
                rowStartIndex = _ref.rowStartIndex,
                rowStopIndex = _ref.rowStopIndex;

            _this.columnStartIndex = columnStartIndex;
            _this.columnStopIndex = columnStopIndex;
            _this.rowStartIndex = rowStartIndex;
            _this.rowStopIndex = rowStopIndex;
        };

        _this.state = {
            scrollToColumn: props.scrollToColumn,
            scrollToRow: props.scrollToRow,
            focusOnRender: false
        };

        _this.columnStartIndex = 0;
        _this.columnStopIndex = 0;
        _this.rowStartIndex = 0;
        _this.rowStopIndex = 0;
        return _this;
    }

    /**
     * Resets scroll states and sets new states if
     * needed specially when collection changes
     *
     * @private
     * @inheritdoc
     * @return {void}
     */


    _createClass(KeyBinder, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            var id = nextProps.id,
                scrollToColumn = nextProps.scrollToColumn,
                scrollToRow = nextProps.scrollToRow;
            var prevId = this.props.id;
            var _state = this.state,
                prevScrollToColumn = _state.scrollToColumn,
                prevScrollToRow = _state.scrollToRow;

            var newState = {};

            if (id !== prevId) {
                // Only when the entire collection changes
                // like folder navigate, reset the scroll states
                newState.scrollToColumn = 0;
                newState.scrollToRow = 0;
                newState.focusOnRender = false;
            } else if (prevScrollToColumn !== scrollToColumn && prevScrollToRow !== scrollToRow) {
                newState.scrollToColumn = scrollToColumn;
                newState.scrollToRow = scrollToRow;
            } else if (prevScrollToColumn !== scrollToColumn) {
                newState.scrollToColumn = scrollToColumn;
            } else if (prevScrollToRow !== scrollToRow) {
                newState.scrollToRow = scrollToRow;
            }

            // Only update the state if there is something to set
            if (Object.keys(newState).length) {
                this.setState(newState);
            }
        }

        /**
         * Keyboard events
         *
         * @private
         * @inheritdoc
         * @return {void}
         */


        /**
         * Callback for set of rows rendered
         *
         * @private
         * @inheritdoc
         * @return {void}
         */

    }, {
        key: 'updateScrollState',


        /**
         * Updates the scroll states
         *
         * @private
         * @inheritdoc
         * @return {void}
         */
        value: function updateScrollState(_ref2) {
            var scrollToColumn = _ref2.scrollToColumn,
                scrollToRow = _ref2.scrollToRow;
            var onScrollToChange = this.props.onScrollToChange;

            onScrollToChange({ scrollToColumn: scrollToColumn, scrollToRow: scrollToRow });
            this.setState({ scrollToColumn: scrollToColumn, scrollToRow: scrollToRow, focusOnRender: true });
        }

        /**
         * Renders the HOC
         *
         * @private
         * @inheritdoc
         * @return {void}
         */

    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                className = _props.className,
                children = _props.children;
            var _state2 = this.state,
                scrollToColumn = _state2.scrollToColumn,
                scrollToRow = _state2.scrollToRow,
                focusOnRender = _state2.focusOnRender;

            /* eslint-disable jsx-a11y/no-static-element-interactions */

            return React.createElement(
                'div',
                { className: className, onKeyDown: this.onKeyDown },
                children({
                    onSectionRendered: this.onSectionRendered,
                    scrollToColumn: scrollToColumn,
                    scrollToRow: scrollToRow,
                    focusOnRender: focusOnRender
                })
            );
            /* eslint-enable jsx-a11y/no-static-element-interactions */
        }
    }]);

    return KeyBinder;
}(PureComponent);

KeyBinder.defaultProps = {
    scrollToColumn: 0,
    scrollToRow: 0,
    onRename: noop,
    onShare: noop,
    onDownload: noop,
    onOpen: noop,
    onSelect: noop,
    onDelete: noop
};


export default KeyBinder;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIktleUJpbmRlci5qcyJdLCJuYW1lcyI6WyJSZWFjdCIsIlB1cmVDb21wb25lbnQiLCJub29wIiwiaXNJbnB1dEVsZW1lbnQiLCJLZXlCaW5kZXIiLCJwcm9wcyIsIm9uS2V5RG93biIsImV2ZW50IiwidGFyZ2V0IiwiY29sdW1uQ291bnQiLCJyb3dDb3VudCIsIm9uU2VsZWN0Iiwib25SZW5hbWUiLCJvbkRvd25sb2FkIiwib25TaGFyZSIsIm9uRGVsZXRlIiwib25PcGVuIiwiaXRlbXMiLCJzdGF0ZSIsInNjcm9sbFRvQ29sdW1uUHJldmlvdXMiLCJzY3JvbGxUb0NvbHVtbiIsInNjcm9sbFRvUm93UHJldmlvdXMiLCJzY3JvbGxUb1JvdyIsImN1cnJlbnRJdGVtIiwiY3RybE1ldGEiLCJtZXRhS2V5IiwiY3RybEtleSIsImtleSIsIk1hdGgiLCJtaW4iLCJzdG9wUHJvcGFnYXRpb24iLCJtYXgiLCJwcmV2ZW50RGVmYXVsdCIsInVwZGF0ZVNjcm9sbFN0YXRlIiwib25TZWN0aW9uUmVuZGVyZWQiLCJjb2x1bW5TdGFydEluZGV4IiwiY29sdW1uU3RvcEluZGV4Iiwicm93U3RhcnRJbmRleCIsInJvd1N0b3BJbmRleCIsImZvY3VzT25SZW5kZXIiLCJuZXh0UHJvcHMiLCJpZCIsInByZXZJZCIsInByZXZTY3JvbGxUb0NvbHVtbiIsInByZXZTY3JvbGxUb1JvdyIsIm5ld1N0YXRlIiwiT2JqZWN0Iiwia2V5cyIsImxlbmd0aCIsInNldFN0YXRlIiwib25TY3JvbGxUb0NoYW5nZSIsImNsYXNzTmFtZSIsImNoaWxkcmVuIiwiZGVmYXVsdFByb3BzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7Ozs7QUFNQSxPQUFPQSxLQUFQLElBQWdCQyxhQUFoQixRQUFxQyxPQUFyQztBQUNBLE9BQU9DLElBQVAsTUFBaUIsYUFBakI7QUFDQSxTQUFTQyxjQUFULFFBQStCLGFBQS9COztJQXNDTUMsUzs7O0FBbUJGOzs7Ozs7QUFNQSx1QkFBWUMsS0FBWixFQUEw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V0FFZ0NBLGFBRmhDOztBQUlMOztBQUNBLG1CQUNJO0FBQUE7QUFBQSxrQkFBSyxXQUFXWSxTQUFoQixFQUEyQixXQUFXLEtBQUs3QyxTQUEzQztBQUNLOEMseUJBQVM7QUFDTmxCLHVDQUFtQixLQUFLQSxpQkFEbEI7QUFFTmQsa0RBRk07QUFHTkUsNENBSE07QUFJTmlCO0FBSk0saUJBQVQ7QUFETCxhQURKO0FBVUE7QUFDSDs7OztFQXBObUJ0QyxhOztBQUFsQkcsUyxDQVFLaUQsWSxHQUE2QjtBQUNoQ2pDLG9CQUFnQixDQURnQjtBQUVoQ0UsaUJBQWEsQ0FGbUI7QUFHaENWLGNBQVVWLElBSHNCO0FBSWhDWSxhQUFTWixJQUp1QjtBQUtoQ1csZ0JBQVlYLElBTG9CO0FBTWhDYyxZQUFRZCxJQU53QjtBQU9oQ1MsY0FBVVQsSUFQc0I7QUFRaENhLGNBQVViO0FBUnNCLEM7OztBQStNeEMsZUFBZUUsU0FBZiIsImZpbGUiOiJLZXlCaW5kZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQGZsb3dcclxuICogQGZpbGUgSXRlbSBMaXN0IEtleSBiaW5kaW5nc1xyXG4gKiBAYXV0aG9yIEJveFxyXG4gKi9cclxuXHJcbmltcG9ydCBSZWFjdCwgeyBQdXJlQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgbm9vcCBmcm9tICdsb2Rhc2gubm9vcCc7XHJcbmltcG9ydCB7IGlzSW5wdXRFbGVtZW50IH0gZnJvbSAnLi4vdXRpbC9kb20nO1xyXG5pbXBvcnQgdHlwZSB7IEJveEl0ZW0gfSBmcm9tICcuLi9mbG93VHlwZXMnO1xyXG5cclxudHlwZSBEZWZhdWx0UHJvcHMgPSB7XHJcbiAgICBzY3JvbGxUb0NvbHVtbjogbnVtYmVyLFxyXG4gICAgc2Nyb2xsVG9Sb3c6IG51bWJlcixcclxuICAgIG9uUmVuYW1lOiBGdW5jdGlvbixcclxuICAgIG9uU2hhcmU6IEZ1bmN0aW9uLFxyXG4gICAgb25Eb3dubG9hZDogRnVuY3Rpb24sXHJcbiAgICBvbk9wZW46IEZ1bmN0aW9uLFxyXG4gICAgb25TZWxlY3Q6IEZ1bmN0aW9uLFxyXG4gICAgb25EZWxldGU6IEZ1bmN0aW9uXHJcbn07XHJcblxyXG50eXBlIFByb3BzID0ge1xyXG4gICAgY2hpbGRyZW46IEZ1bmN0aW9uLFxyXG4gICAgY2xhc3NOYW1lOiBzdHJpbmcsXHJcbiAgICBjb2x1bW5Db3VudDogbnVtYmVyLFxyXG4gICAgb25TY3JvbGxUb0NoYW5nZTogRnVuY3Rpb24sXHJcbiAgICByb3dDb3VudDogbnVtYmVyLFxyXG4gICAgc2Nyb2xsVG9Db2x1bW46IG51bWJlcixcclxuICAgIHNjcm9sbFRvUm93OiBudW1iZXIsXHJcbiAgICBvblJlbmFtZTogRnVuY3Rpb24sXHJcbiAgICBvblNoYXJlOiBGdW5jdGlvbixcclxuICAgIG9uRG93bmxvYWQ6IEZ1bmN0aW9uLFxyXG4gICAgb25PcGVuOiBGdW5jdGlvbixcclxuICAgIG9uU2VsZWN0OiBGdW5jdGlvbixcclxuICAgIG9uRGVsZXRlOiBGdW5jdGlvbixcclxuICAgIGl0ZW1zOiBCb3hJdGVtW10sXHJcbiAgICBpZDogc3RyaW5nXHJcbn07XHJcblxyXG50eXBlIFN0YXRlID0ge1xyXG4gICAgc2Nyb2xsVG9Db2x1bW46IG51bWJlcixcclxuICAgIHNjcm9sbFRvUm93OiBudW1iZXIsXHJcbiAgICBmb2N1c09uUmVuZGVyOiBib29sZWFuXHJcbn07XHJcblxyXG5jbGFzcyBLZXlCaW5kZXIgZXh0ZW5kcyBQdXJlQ29tcG9uZW50PERlZmF1bHRQcm9wcywgUHJvcHMsIFN0YXRlPiB7XHJcbiAgICBzdGF0ZTogU3RhdGU7XHJcbiAgICBwcm9wczogUHJvcHM7XHJcbiAgICBjb2x1bW5TdGFydEluZGV4OiBudW1iZXI7XHJcbiAgICBjb2x1bW5TdG9wSW5kZXg6IG51bWJlcjtcclxuICAgIHJvd1N0YXJ0SW5kZXg6IG51bWJlcjtcclxuICAgIHJvd1N0b3BJbmRleDogbnVtYmVyO1xyXG5cclxuICAgIHN0YXRpYyBkZWZhdWx0UHJvcHM6IERlZmF1bHRQcm9wcyA9IHtcclxuICAgICAgICBzY3JvbGxUb0NvbHVtbjogMCxcclxuICAgICAgICBzY3JvbGxUb1JvdzogMCxcclxuICAgICAgICBvblJlbmFtZTogbm9vcCxcclxuICAgICAgICBvblNoYXJlOiBub29wLFxyXG4gICAgICAgIG9uRG93bmxvYWQ6IG5vb3AsXHJcbiAgICAgICAgb25PcGVuOiBub29wLFxyXG4gICAgICAgIG9uU2VsZWN0OiBub29wLFxyXG4gICAgICAgIG9uRGVsZXRlOiBub29wXHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogW2NvbnN0cnVjdG9yXVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcmV0dXJuIHtLZXlCaW5kZXJ9XHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKHByb3BzOiBQcm9wcykge1xyXG4gICAgICAgIHN1cGVyKHByb3BzKTtcclxuXHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcclxuICAgICAgICAgICAgc2Nyb2xsVG9Db2x1bW46IHByb3BzLnNjcm9sbFRvQ29sdW1uLFxyXG4gICAgICAgICAgICBzY3JvbGxUb1JvdzogcHJvcHMuc2Nyb2xsVG9Sb3csXHJcbiAgICAgICAgICAgIGZvY3VzT25SZW5kZXI6IGZhbHNlXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhpcy5jb2x1bW5TdGFydEluZGV4ID0gMDtcclxuICAgICAgICB0aGlzLmNvbHVtblN0b3BJbmRleCA9IDA7XHJcbiAgICAgICAgdGhpcy5yb3dTdGFydEluZGV4ID0gMDtcclxuICAgICAgICB0aGlzLnJvd1N0b3BJbmRleCA9IDA7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXNldHMgc2Nyb2xsIHN0YXRlcyBhbmQgc2V0cyBuZXcgc3RhdGVzIGlmXHJcbiAgICAgKiBuZWVkZWQgc3BlY2lhbGx5IHdoZW4gY29sbGVjdGlvbiBjaGFuZ2VzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBpbmhlcml0ZG9jXHJcbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxyXG4gICAgICovXHJcbiAgICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wczogUHJvcHMpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCB7IGlkLCBzY3JvbGxUb0NvbHVtbiwgc2Nyb2xsVG9Sb3cgfTogUHJvcHMgPSBuZXh0UHJvcHM7XHJcbiAgICAgICAgY29uc3QgeyBpZDogcHJldklkIH06IFByb3BzID0gdGhpcy5wcm9wcztcclxuICAgICAgICBjb25zdCB7IHNjcm9sbFRvQ29sdW1uOiBwcmV2U2Nyb2xsVG9Db2x1bW4sIHNjcm9sbFRvUm93OiBwcmV2U2Nyb2xsVG9Sb3cgfTogU3RhdGUgPSB0aGlzLnN0YXRlO1xyXG4gICAgICAgIGNvbnN0IG5ld1N0YXRlID0ge307XHJcblxyXG4gICAgICAgIGlmIChpZCAhPT0gcHJldklkKSB7XHJcbiAgICAgICAgICAgIC8vIE9ubHkgd2hlbiB0aGUgZW50aXJlIGNvbGxlY3Rpb24gY2hhbmdlc1xyXG4gICAgICAgICAgICAvLyBsaWtlIGZvbGRlciBuYXZpZ2F0ZSwgcmVzZXQgdGhlIHNjcm9sbCBzdGF0ZXNcclxuICAgICAgICAgICAgbmV3U3RhdGUuc2Nyb2xsVG9Db2x1bW4gPSAwO1xyXG4gICAgICAgICAgICBuZXdTdGF0ZS5zY3JvbGxUb1JvdyA9IDA7XHJcbiAgICAgICAgICAgIG5ld1N0YXRlLmZvY3VzT25SZW5kZXIgPSBmYWxzZTtcclxuICAgICAgICB9IGVsc2UgaWYgKHByZXZTY3JvbGxUb0NvbHVtbiAhPT0gc2Nyb2xsVG9Db2x1bW4gJiYgcHJldlNjcm9sbFRvUm93ICE9PSBzY3JvbGxUb1Jvdykge1xyXG4gICAgICAgICAgICBuZXdTdGF0ZS5zY3JvbGxUb0NvbHVtbiA9IHNjcm9sbFRvQ29sdW1uO1xyXG4gICAgICAgICAgICBuZXdTdGF0ZS5zY3JvbGxUb1JvdyA9IHNjcm9sbFRvUm93O1xyXG4gICAgICAgIH0gZWxzZSBpZiAocHJldlNjcm9sbFRvQ29sdW1uICE9PSBzY3JvbGxUb0NvbHVtbikge1xyXG4gICAgICAgICAgICBuZXdTdGF0ZS5zY3JvbGxUb0NvbHVtbiA9IHNjcm9sbFRvQ29sdW1uO1xyXG4gICAgICAgIH0gZWxzZSBpZiAocHJldlNjcm9sbFRvUm93ICE9PSBzY3JvbGxUb1Jvdykge1xyXG4gICAgICAgICAgICBuZXdTdGF0ZS5zY3JvbGxUb1JvdyA9IHNjcm9sbFRvUm93O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gT25seSB1cGRhdGUgdGhlIHN0YXRlIGlmIHRoZXJlIGlzIHNvbWV0aGluZyB0byBzZXRcclxuICAgICAgICBpZiAoT2JqZWN0LmtleXMobmV3U3RhdGUpLmxlbmd0aCkge1xyXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKG5ld1N0YXRlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBLZXlib2FyZCBldmVudHNcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQGluaGVyaXRkb2NcclxuICAgICAqIEByZXR1cm4ge3ZvaWR9XHJcbiAgICAgKi9cclxuICAgIG9uS2V5RG93biA9IChldmVudDogU3ludGhldGljS2V5Ym9hcmRFdmVudCAmIHsgdGFyZ2V0OiBIVE1MRWxlbWVudCB9KTogdm9pZCA9PiB7XHJcbiAgICAgICAgaWYgKGlzSW5wdXRFbGVtZW50KGV2ZW50LnRhcmdldCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCB7XHJcbiAgICAgICAgICAgIGNvbHVtbkNvdW50LFxyXG4gICAgICAgICAgICByb3dDb3VudCxcclxuICAgICAgICAgICAgb25TZWxlY3QsXHJcbiAgICAgICAgICAgIG9uUmVuYW1lLFxyXG4gICAgICAgICAgICBvbkRvd25sb2FkLFxyXG4gICAgICAgICAgICBvblNoYXJlLFxyXG4gICAgICAgICAgICBvbkRlbGV0ZSxcclxuICAgICAgICAgICAgb25PcGVuLFxyXG4gICAgICAgICAgICBpdGVtc1xyXG4gICAgICAgIH06IFByb3BzID0gdGhpcy5wcm9wcztcclxuICAgICAgICBjb25zdCB7IHNjcm9sbFRvQ29sdW1uOiBzY3JvbGxUb0NvbHVtblByZXZpb3VzLCBzY3JvbGxUb1Jvdzogc2Nyb2xsVG9Sb3dQcmV2aW91cyB9OiBTdGF0ZSA9IHRoaXMuc3RhdGU7XHJcbiAgICAgICAgbGV0IHsgc2Nyb2xsVG9Db2x1bW4sIHNjcm9sbFRvUm93IH06IFN0YXRlID0gdGhpcy5zdGF0ZTtcclxuICAgICAgICBjb25zdCBjdXJyZW50SXRlbTogQm94SXRlbSA9IGl0ZW1zW3Njcm9sbFRvUm93XTtcclxuICAgICAgICBjb25zdCBjdHJsTWV0YTogYm9vbGVhbiA9IGV2ZW50Lm1ldGFLZXkgfHwgZXZlbnQuY3RybEtleTtcclxuXHJcbiAgICAgICAgLy8gVGhlIGFib3ZlIGNhc2VzIGFsbCBwcmV2ZW50IGRlZmF1bHQgZXZlbnQgZXZlbnQgYmVoYXZpb3IuXHJcbiAgICAgICAgLy8gVGhpcyBpcyB0byBrZWVwIHRoZSBncmlkIGZyb20gc2Nyb2xsaW5nIGFmdGVyIHRoZSBzbmFwLXRvIHVwZGF0ZS5cclxuICAgICAgICBzd2l0Y2ggKGV2ZW50LmtleSkge1xyXG4gICAgICAgICAgICBjYXNlICdBcnJvd0Rvd24nOlxyXG4gICAgICAgICAgICAgICAgc2Nyb2xsVG9Sb3cgPSBjdHJsTWV0YSA/IHJvd0NvdW50IC0gMSA6IE1hdGgubWluKHNjcm9sbFRvUm93ICsgMSwgcm93Q291bnQgLSAxKTtcclxuICAgICAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpOyAvLyBUbyBwcmV2ZW50IHRoZSBhcnJvdyBkb3duIGNhcHR1cmUgb2YgcGFyZW50XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnQXJyb3dMZWZ0JzpcclxuICAgICAgICAgICAgICAgIHNjcm9sbFRvQ29sdW1uID0gY3RybE1ldGEgPyAwIDogTWF0aC5tYXgoc2Nyb2xsVG9Db2x1bW4gLSAxLCAwKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdBcnJvd1JpZ2h0JzpcclxuICAgICAgICAgICAgICAgIHNjcm9sbFRvQ29sdW1uID0gY3RybE1ldGEgPyBjb2x1bW5Db3VudCAtIDEgOiBNYXRoLm1pbihzY3JvbGxUb0NvbHVtbiArIDEsIGNvbHVtbkNvdW50IC0gMSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnQXJyb3dVcCc6XHJcbiAgICAgICAgICAgICAgICBzY3JvbGxUb1JvdyA9IGN0cmxNZXRhID8gMCA6IE1hdGgubWF4KHNjcm9sbFRvUm93IC0gMSwgMCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnRW50ZXInOlxyXG4gICAgICAgICAgICAgICAgb25PcGVuKGN1cnJlbnRJdGVtKTtcclxuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnRGVsZXRlJzpcclxuICAgICAgICAgICAgICAgIG9uRGVsZXRlKGN1cnJlbnRJdGVtKTtcclxuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnWCc6XHJcbiAgICAgICAgICAgICAgICBvblNlbGVjdChjdXJyZW50SXRlbSk7XHJcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ0QnOlxyXG4gICAgICAgICAgICAgICAgb25Eb3dubG9hZChjdXJyZW50SXRlbSk7XHJcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ1MnOlxyXG4gICAgICAgICAgICAgICAgb25TaGFyZShjdXJyZW50SXRlbSk7XHJcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ1InOlxyXG4gICAgICAgICAgICAgICAgb25SZW5hbWUoY3VycmVudEl0ZW0pO1xyXG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHNjcm9sbFRvQ29sdW1uICE9PSBzY3JvbGxUb0NvbHVtblByZXZpb3VzIHx8IHNjcm9sbFRvUm93ICE9PSBzY3JvbGxUb1Jvd1ByZXZpb3VzKSB7XHJcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlU2Nyb2xsU3RhdGUoeyBzY3JvbGxUb0NvbHVtbiwgc2Nyb2xsVG9Sb3cgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIENhbGxiYWNrIGZvciBzZXQgb2Ygcm93cyByZW5kZXJlZFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAaW5oZXJpdGRvY1xyXG4gICAgICogQHJldHVybiB7dm9pZH1cclxuICAgICAqL1xyXG4gICAgb25TZWN0aW9uUmVuZGVyZWQgPSAoe1xyXG4gICAgICAgIGNvbHVtblN0YXJ0SW5kZXgsXHJcbiAgICAgICAgY29sdW1uU3RvcEluZGV4LFxyXG4gICAgICAgIHJvd1N0YXJ0SW5kZXgsXHJcbiAgICAgICAgcm93U3RvcEluZGV4XHJcbiAgICB9OiB7XHJcbiAgICAgICAgY29sdW1uU3RhcnRJbmRleDogbnVtYmVyLFxyXG4gICAgICAgIGNvbHVtblN0b3BJbmRleDogbnVtYmVyLFxyXG4gICAgICAgIHJvd1N0YXJ0SW5kZXg6IG51bWJlcixcclxuICAgICAgICByb3dTdG9wSW5kZXg6IG51bWJlclxyXG4gICAgfSk6IHZvaWQgPT4ge1xyXG4gICAgICAgIHRoaXMuY29sdW1uU3RhcnRJbmRleCA9IGNvbHVtblN0YXJ0SW5kZXg7XHJcbiAgICAgICAgdGhpcy5jb2x1bW5TdG9wSW5kZXggPSBjb2x1bW5TdG9wSW5kZXg7XHJcbiAgICAgICAgdGhpcy5yb3dTdGFydEluZGV4ID0gcm93U3RhcnRJbmRleDtcclxuICAgICAgICB0aGlzLnJvd1N0b3BJbmRleCA9IHJvd1N0b3BJbmRleDtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBVcGRhdGVzIHRoZSBzY3JvbGwgc3RhdGVzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBpbmhlcml0ZG9jXHJcbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxyXG4gICAgICovXHJcbiAgICB1cGRhdGVTY3JvbGxTdGF0ZSh7IHNjcm9sbFRvQ29sdW1uLCBzY3JvbGxUb1JvdyB9OiB7IHNjcm9sbFRvQ29sdW1uOiBudW1iZXIsIHNjcm9sbFRvUm93OiBudW1iZXIgfSk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IHsgb25TY3JvbGxUb0NoYW5nZSB9ID0gdGhpcy5wcm9wcztcclxuICAgICAgICBvblNjcm9sbFRvQ2hhbmdlKHsgc2Nyb2xsVG9Db2x1bW4sIHNjcm9sbFRvUm93IH0pO1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyBzY3JvbGxUb0NvbHVtbiwgc2Nyb2xsVG9Sb3csIGZvY3VzT25SZW5kZXI6IHRydWUgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZW5kZXJzIHRoZSBIT0NcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQGluaGVyaXRkb2NcclxuICAgICAqIEByZXR1cm4ge3ZvaWR9XHJcbiAgICAgKi9cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICBjb25zdCB7IGNsYXNzTmFtZSwgY2hpbGRyZW4gfSA9IHRoaXMucHJvcHM7XHJcbiAgICAgICAgY29uc3QgeyBzY3JvbGxUb0NvbHVtbiwgc2Nyb2xsVG9Sb3csIGZvY3VzT25SZW5kZXIgfTogU3RhdGUgPSB0aGlzLnN0YXRlO1xyXG5cclxuICAgICAgICAvKiBlc2xpbnQtZGlzYWJsZSBqc3gtYTExeS9uby1zdGF0aWMtZWxlbWVudC1pbnRlcmFjdGlvbnMgKi9cclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17Y2xhc3NOYW1lfSBvbktleURvd249e3RoaXMub25LZXlEb3dufT5cclxuICAgICAgICAgICAgICAgIHtjaGlsZHJlbih7XHJcbiAgICAgICAgICAgICAgICAgICAgb25TZWN0aW9uUmVuZGVyZWQ6IHRoaXMub25TZWN0aW9uUmVuZGVyZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgc2Nyb2xsVG9Db2x1bW4sXHJcbiAgICAgICAgICAgICAgICAgICAgc2Nyb2xsVG9Sb3csXHJcbiAgICAgICAgICAgICAgICAgICAgZm9jdXNPblJlbmRlclxyXG4gICAgICAgICAgICAgICAgfSl9XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICk7XHJcbiAgICAgICAgLyogZXNsaW50LWVuYWJsZSBqc3gtYTExeS9uby1zdGF0aWMtZWxlbWVudC1pbnRlcmFjdGlvbnMgKi9cclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgS2V5QmluZGVyO1xyXG4iXX0=