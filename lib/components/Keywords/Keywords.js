var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * 
 * @file File Keywords SkillData component
 * @author Box
 */

import React, { PureComponent } from 'react';
import FileKeyword from './Keyword';
import { Timeline } from '../Timeline';

var FileKeywords = function (_PureComponent) {
    _inherits(FileKeywords, _PureComponent);

    function FileKeywords() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, FileKeywords);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = FileKeywords.__proto__ || Object.getPrototypeOf(FileKeywords)).call.apply(_ref, [this].concat(args))), _this), _this.state = {}, _this.onClick = function (keyword) {
            _this.setState({ keyword: keyword });
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(FileKeywords, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _props = this.props,
                skill = _props.skill,
                getPreviewer = _props.getPreviewer;
            var entries = skill.entries,
                duration = skill.duration;
            var keyword = this.state.keyword;

            return React.createElement(
                'div',
                { className: 'buik-file-keywords' },
                entries.map(function (entry
                /* eslint-disable react/no-array-index-key */
                , index) {
                    return React.createElement(FileKeyword, {
                        key: index,
                        keyword: entry,
                        isSelected: keyword === entry,
                        onClick: _this2.onClick
                    });
                }
                /* eslint-enable react/no-array-index-key */
                ),
                !!keyword && Array.isArray(keyword.appears) && keyword.appears.length > 0 && React.createElement(
                    'div',
                    { className: 'buik-timelines' },
                    React.createElement(Timeline, {
                        type: keyword.type,
                        timeslices: keyword.appears,
                        duration: duration,
                        getPreviewer: getPreviewer
                    })
                )
            );
        }
    }]);

    return FileKeywords;
}(PureComponent);

export default FileKeywords;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIktleXdvcmRzLmpzIl0sIm5hbWVzIjpbIlJlYWN0IiwiUHVyZUNvbXBvbmVudCIsIkZpbGVLZXl3b3JkIiwiVGltZWxpbmUiLCJGaWxlS2V5d29yZHMiLCJzdGF0ZSIsIm9uQ2xpY2siLCJrZXl3b3JkIiwic2V0U3RhdGUiLCJwcm9wcyIsInNraWxsIiwiZ2V0UHJldmlld2VyIiwiZW50cmllcyIsImR1cmF0aW9uIiwibWFwIiwiZW50cnkiLCJpbmRleCIsIkFycmF5IiwiaXNBcnJheSIsImFwcGVhcnMiLCJsZW5ndGgiLCJ0eXBlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7Ozs7QUFNQSxPQUFPQSxLQUFQLElBQWdCQyxhQUFoQixRQUFxQyxPQUFyQztBQUNBLE9BQU9DLFdBQVAsTUFBd0IsV0FBeEI7QUFDQSxTQUFTQyxRQUFULFFBQXlCLGFBQXpCOztJQVlNQyxZOzs7Ozs7Ozs7Ozs7OztzTUFFRkMsSyxHQUFlLEUsUUFFZkMsTyxHQUFVLFVBQUNDLE9BQUQsRUFBNkI7QUFDbkMsa0JBQUtDLFFBQUwsQ0FBYyxFQUFFRCxnQkFBRixFQUFkO0FBQ0gsUzs7Ozs7aUNBRVE7QUFBQTs7QUFBQSx5QkFDa0MsS0FBS0UsS0FEdkM7QUFBQSxnQkFDR0MsS0FESCxVQUNHQSxLQURIO0FBQUEsZ0JBQ1VDLFlBRFYsVUFDVUEsWUFEVjtBQUFBLGdCQUVHQyxPQUZILEdBRW9DRixLQUZwQyxDQUVHRSxPQUZIO0FBQUEsZ0JBRVlDLFFBRlosR0FFb0NILEtBRnBDLENBRVlHLFFBRlo7QUFBQSxnQkFHR04sT0FISCxHQUdzQixLQUFLRixLQUgzQixDQUdHRSxPQUhIOztBQUlMLG1CQUNJO0FBQUE7QUFBQSxrQkFBSyxXQUFVLG9CQUFmO0FBQ0tLLHdCQUFRRSxHQUFSLENBQ0csVUFBQ0M7QUFDRztBQURKLGtCQUF3QkMsS0FBeEI7QUFBQSwyQkFFSSxvQkFBQyxXQUFEO0FBQ0ksNkJBQUtBLEtBRFQ7QUFFSSxpQ0FBU0QsS0FGYjtBQUdJLG9DQUFZUixZQUFZUSxLQUg1QjtBQUlJLGlDQUFTLE9BQUtUO0FBSmxCLHNCQUZKO0FBQUE7QUFRQTtBQVRILGlCQURMO0FBWUssaUJBQUMsQ0FBQ0MsT0FBRixJQUNHVSxNQUFNQyxPQUFOLENBQWNYLFFBQVFZLE9BQXRCLENBREgsSUFFR1osUUFBUVksT0FBUixDQUFnQkMsTUFBaEIsR0FBeUIsQ0FGNUIsSUFHRztBQUFBO0FBQUEsc0JBQUssV0FBVSxnQkFBZjtBQUNJLHdDQUFDLFFBQUQ7QUFDSSw4QkFBTWIsUUFBUWMsSUFEbEI7QUFFSSxvQ0FBWWQsUUFBUVksT0FGeEI7QUFHSSxrQ0FBVU4sUUFIZDtBQUlJLHNDQUFjRjtBQUpsQjtBQURKO0FBZlIsYUFESjtBQTBCSDs7OztFQXRDc0JWLGE7O0FBeUMzQixlQUFlRyxZQUFmIiwiZmlsZSI6IktleXdvcmRzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIEBmbG93XHJcbiAqIEBmaWxlIEZpbGUgS2V5d29yZHMgU2tpbGxEYXRhIGNvbXBvbmVudFxyXG4gKiBAYXV0aG9yIEJveFxyXG4gKi9cclxuXHJcbmltcG9ydCBSZWFjdCwgeyBQdXJlQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgRmlsZUtleXdvcmQgZnJvbSAnLi9LZXl3b3JkJztcclxuaW1wb3J0IHsgVGltZWxpbmUgfSBmcm9tICcuLi9UaW1lbGluZSc7XHJcbmltcG9ydCB0eXBlIHsgU2tpbGxEYXRhLCBTa2lsbERhdGFFbnRyeSB9IGZyb20gJy4uLy4uL2Zsb3dUeXBlcyc7XHJcblxyXG50eXBlIFByb3BzID0ge1xyXG4gICAgc2tpbGw6IFNraWxsRGF0YSxcclxuICAgIGdldFByZXZpZXdlcj86IEZ1bmN0aW9uXHJcbn07XHJcblxyXG50eXBlIFN0YXRlID0ge1xyXG4gICAga2V5d29yZD86IFNraWxsRGF0YUVudHJ5XHJcbn07XHJcblxyXG5jbGFzcyBGaWxlS2V5d29yZHMgZXh0ZW5kcyBQdXJlQ29tcG9uZW50PHZvaWQsIFByb3BzLCBTdGF0ZT4ge1xyXG4gICAgcHJvcHM6IFByb3BzO1xyXG4gICAgc3RhdGU6IFN0YXRlID0ge307XHJcblxyXG4gICAgb25DbGljayA9IChrZXl3b3JkOiBTa2lsbERhdGFFbnRyeSkgPT4ge1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyBrZXl3b3JkIH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgY29uc3QgeyBza2lsbCwgZ2V0UHJldmlld2VyIH06IFByb3BzID0gdGhpcy5wcm9wcztcclxuICAgICAgICBjb25zdCB7IGVudHJpZXMsIGR1cmF0aW9uIH06IFNraWxsRGF0YSA9IHNraWxsO1xyXG4gICAgICAgIGNvbnN0IHsga2V5d29yZCB9OiBTdGF0ZSA9IHRoaXMuc3RhdGU7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2J1aWstZmlsZS1rZXl3b3Jkcyc+XHJcbiAgICAgICAgICAgICAgICB7ZW50cmllcy5tYXAoXHJcbiAgICAgICAgICAgICAgICAgICAgKGVudHJ5OiBTa2lsbERhdGFFbnRyeSwgaW5kZXgpID0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8qIGVzbGludC1kaXNhYmxlIHJlYWN0L25vLWFycmF5LWluZGV4LWtleSAqL1xyXG4gICAgICAgICAgICAgICAgICAgICAgICA8RmlsZUtleXdvcmRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleT17aW5kZXh9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXl3b3JkPXtlbnRyeX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzU2VsZWN0ZWQ9e2tleXdvcmQgPT09IGVudHJ5fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5vbkNsaWNrfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgICAgICAgIC8qIGVzbGludC1lbmFibGUgcmVhY3Qvbm8tYXJyYXktaW5kZXgta2V5ICovXHJcbiAgICAgICAgICAgICAgICApfVxyXG4gICAgICAgICAgICAgICAgeyEha2V5d29yZCAmJlxyXG4gICAgICAgICAgICAgICAgICAgIEFycmF5LmlzQXJyYXkoa2V5d29yZC5hcHBlYXJzKSAmJlxyXG4gICAgICAgICAgICAgICAgICAgIGtleXdvcmQuYXBwZWFycy5sZW5ndGggPiAwICYmXHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2J1aWstdGltZWxpbmVzJz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPFRpbWVsaW5lXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPXtrZXl3b3JkLnR5cGV9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aW1lc2xpY2VzPXtrZXl3b3JkLmFwcGVhcnN9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbj17ZHVyYXRpb259XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBnZXRQcmV2aWV3ZXI9e2dldFByZXZpZXdlcn1cclxuICAgICAgICAgICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj59XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEZpbGVLZXl3b3JkcztcclxuIl19