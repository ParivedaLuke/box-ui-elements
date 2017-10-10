/**
 * 
 * @file Timelines component
 * @author Box
 */

import React from 'react';
import randomcolor from 'randomcolor';
import Timeline from './Timeline';


var Timelines = function Timelines(_ref) {
    var _ref$skill = _ref.skill,
        entries = _ref$skill.entries,
        duration = _ref$skill.duration,
        getPreviewer = _ref.getPreviewer;

    var colors = randomcolor({ count: entries.length, luminosity: 'dark' });
    return React.createElement(
        'div',
        { className: 'buik-timelines' },
        entries.map(function (_ref2
        /* eslint-disable react/no-array-index-key */
        , index) {
            var type = _ref2.type,
                text = _ref2.text,
                url = _ref2.url,
                appears = _ref2.appears;
            return React.createElement(Timeline, {
                key: index,
                type: type,
                text: text,
                url: url,
                color: colors[index],
                timeslices: appears,
                duration: duration,
                getPreviewer: getPreviewer
            });
        }
        /* eslint-enable react/no-array-index-key */
        )
    );
};

export default Timelines;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlRpbWVsaW5lcy5qcyJdLCJuYW1lcyI6WyJSZWFjdCIsInJhbmRvbWNvbG9yIiwiVGltZWxpbmUiLCJUaW1lbGluZXMiLCJza2lsbCIsImVudHJpZXMiLCJkdXJhdGlvbiIsImdldFByZXZpZXdlciIsImNvbG9ycyIsImNvdW50IiwibGVuZ3RoIiwibHVtaW5vc2l0eSIsIm1hcCIsImluZGV4IiwidHlwZSIsInRleHQiLCJ1cmwiLCJhcHBlYXJzIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0FBTUEsT0FBT0EsS0FBUCxNQUFrQixPQUFsQjtBQUNBLE9BQU9DLFdBQVAsTUFBd0IsYUFBeEI7QUFDQSxPQUFPQyxRQUFQLE1BQXFCLFlBQXJCOzs7QUFRQSxJQUFNQyxZQUFZLFNBQVpBLFNBQVksT0FBMkQ7QUFBQSwwQkFBeERDLEtBQXdEO0FBQUEsUUFBL0NDLE9BQStDLGNBQS9DQSxPQUErQztBQUFBLFFBQXRDQyxRQUFzQyxjQUF0Q0EsUUFBc0M7QUFBQSxRQUExQkMsWUFBMEIsUUFBMUJBLFlBQTBCOztBQUN6RSxRQUFNQyxTQUFTUCxZQUFZLEVBQUVRLE9BQU9KLFFBQVFLLE1BQWpCLEVBQXlCQyxZQUFZLE1BQXJDLEVBQVosQ0FBZjtBQUNBLFdBQ0k7QUFBQTtBQUFBLFVBQUssV0FBVSxnQkFBZjtBQUNLTixnQkFBUU8sR0FBUixDQUNHO0FBQ0k7QUFESixVQUErQ0MsS0FBL0M7QUFBQSxnQkFBR0MsSUFBSCxTQUFHQSxJQUFIO0FBQUEsZ0JBQVNDLElBQVQsU0FBU0EsSUFBVDtBQUFBLGdCQUFlQyxHQUFmLFNBQWVBLEdBQWY7QUFBQSxnQkFBb0JDLE9BQXBCLFNBQW9CQSxPQUFwQjtBQUFBLG1CQUVJLG9CQUFDLFFBQUQ7QUFDSSxxQkFBS0osS0FEVDtBQUVJLHNCQUFNQyxJQUZWO0FBR0ksc0JBQU1DLElBSFY7QUFJSSxxQkFBS0MsR0FKVDtBQUtJLHVCQUFPUixPQUFPSyxLQUFQLENBTFg7QUFNSSw0QkFBWUksT0FOaEI7QUFPSSwwQkFBVVgsUUFQZDtBQVFJLDhCQUFjQztBQVJsQixjQUZKO0FBQUE7QUFZQTtBQWJIO0FBREwsS0FESjtBQW1CSCxDQXJCRDs7QUF1QkEsZUFBZUosU0FBZiIsImZpbGUiOiJUaW1lbGluZXMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQGZsb3dcclxuICogQGZpbGUgVGltZWxpbmVzIGNvbXBvbmVudFxyXG4gKiBAYXV0aG9yIEJveFxyXG4gKi9cclxuXHJcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCByYW5kb21jb2xvciBmcm9tICdyYW5kb21jb2xvcic7XHJcbmltcG9ydCBUaW1lbGluZSBmcm9tICcuL1RpbWVsaW5lJztcclxuaW1wb3J0IHR5cGUgeyBTa2lsbERhdGEsIFNraWxsRGF0YUVudHJ5IH0gZnJvbSAnLi4vLi4vZmxvd1R5cGVzJztcclxuXHJcbnR5cGUgUHJvcHMgPSB7XHJcbiAgICBza2lsbDogU2tpbGxEYXRhLFxyXG4gICAgZ2V0UHJldmlld2VyPzogRnVuY3Rpb25cclxufTtcclxuXHJcbmNvbnN0IFRpbWVsaW5lcyA9ICh7IHNraWxsOiB7IGVudHJpZXMsIGR1cmF0aW9uIH0sIGdldFByZXZpZXdlciB9OiBQcm9wcykgPT4ge1xyXG4gICAgY29uc3QgY29sb3JzID0gcmFuZG9tY29sb3IoeyBjb3VudDogZW50cmllcy5sZW5ndGgsIGx1bWlub3NpdHk6ICdkYXJrJyB9KTtcclxuICAgIHJldHVybiAoXHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9J2J1aWstdGltZWxpbmVzJz5cclxuICAgICAgICAgICAge2VudHJpZXMubWFwKFxyXG4gICAgICAgICAgICAgICAgKHsgdHlwZSwgdGV4dCwgdXJsLCBhcHBlYXJzIH06IFNraWxsRGF0YUVudHJ5LCBpbmRleCkgPT5cclxuICAgICAgICAgICAgICAgICAgICAvKiBlc2xpbnQtZGlzYWJsZSByZWFjdC9uby1hcnJheS1pbmRleC1rZXkgKi9cclxuICAgICAgICAgICAgICAgICAgICA8VGltZWxpbmVcclxuICAgICAgICAgICAgICAgICAgICAgICAga2V5PXtpbmRleH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT17dHlwZX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGV4dD17dGV4dH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgdXJsPXt1cmx9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yPXtjb2xvcnNbaW5kZXhdfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aW1lc2xpY2VzPXthcHBlYXJzfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbj17ZHVyYXRpb259XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdldFByZXZpZXdlcj17Z2V0UHJldmlld2VyfVxyXG4gICAgICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgICAvKiBlc2xpbnQtZW5hYmxlIHJlYWN0L25vLWFycmF5LWluZGV4LWtleSAqL1xyXG4gICAgICAgICAgICApfVxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFRpbWVsaW5lcztcclxuIl19