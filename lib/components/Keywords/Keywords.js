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