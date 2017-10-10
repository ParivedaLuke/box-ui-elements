/**
 * 
 * @file Component that creates breadcumbs for both the header and name details
 * @author Box
 */

import React from 'react';
import Breadcrumb from './Breadcrumb';
import BreadcrumbDropdown from './BreadcrumbDropdown';
import BreadcrumbDelimiter from './BreadcrumbDelimiter';
import { DELIMITER_SLASH, DELIMITER_CARET } from '../../constants';


/**
 * Filters out ancestors to root from the crumbs.
 * This is useful when the root is not All Files.
 *
 * @private
 * @param {string} rootId the root folder id
 * @param {Array} crumbs list of crumbs
 * @return {Array} crumbs
 */
function filterCrumbs(rootId, crumbs) {
    var rootIndex = crumbs.findIndex(function (crumb) {
        return crumb.id === rootId;
    });
    return rootIndex === -1 ? crumbs : crumbs.slice(rootIndex);
}

/**
 * Creates an individual breadcrumb
 *
 * @private
 * @param {Object} crumb single crumb data
 * @param {boolean} isLast is this the last crumb
 * @return {Element}
 */
function getBreadcrumb(crumbs, isLast, onCrumbClick, delimiter) {
    if (Array.isArray(crumbs)) {
        var condensed = delimiter !== DELIMITER_CARET;
        return React.createElement(
            'span',
            { className: 'buik-breadcrumb-more' },
            React.createElement(BreadcrumbDropdown, {
                onCrumbClick: onCrumbClick,
                crumbs: crumbs,
                className: condensed ? 'buik-breadcrumbs-condensed' : ''
            }),
            React.createElement(BreadcrumbDelimiter, { delimiter: condensed ? DELIMITER_SLASH : DELIMITER_CARET })
        );
    }

    var id = crumbs.id,
        name = crumbs.name;

    return React.createElement(Breadcrumb, { name: name, onClick: function onClick() {
            return onCrumbClick(id);
        }, isLast: isLast, delimiter: delimiter });
}

var Breadcrumbs = function Breadcrumbs(_ref) {
    var rootId = _ref.rootId,
        crumbs = _ref.crumbs,
        onCrumbClick = _ref.onCrumbClick,
        delimiter = _ref.delimiter,
        _ref$isSmall = _ref.isSmall,
        isSmall = _ref$isSmall === undefined ? false : _ref$isSmall;

    if (!rootId || crumbs.length === 0) {
        return React.createElement('span', null);
    }

    // The crumbs given may have ancestors higher than the root. We need to filter them out.
    var filteredCrumbs = filterCrumbs(rootId, crumbs);
    var length = filteredCrumbs.length;

    // Always show the last/leaf breadcrumb.
    var crumb = filteredCrumbs[length - 1];
    var onClick = crumb.id ? function () {
        return onCrumbClick(crumb.id);
    } : undefined;
    var lastBreadcrumb = React.createElement(Breadcrumb, { name: crumb.name, onClick: onClick, isLast: true });

    // Always show the second last/parent breadcrumb when there are at least 2 crumbs.
    var secondLastBreadcrumb = length > 1 ? getBreadcrumb(filteredCrumbs[length - 2], false, onCrumbClick, delimiter) : null;

    // Only show the more dropdown when there were at least 4 crumbs.
    var moreBreadcrumbs = length > 3 ? getBreadcrumb(filteredCrumbs.slice(1, length - 2), false, onCrumbClick, delimiter) : null;

    // Only show the root breadcrumb when there are at least 3 crumbs.
    var firstBreadcrumb = length > 2 ? getBreadcrumb(filteredCrumbs[0], false, onCrumbClick, delimiter) : null;

    return React.createElement(
        'div',
        { className: 'buik-breadcrumbs' },
        isSmall ? null : firstBreadcrumb,
        isSmall ? null : moreBreadcrumbs,
        secondLastBreadcrumb,
        lastBreadcrumb
    );
};

export default Breadcrumbs;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkJyZWFkY3J1bWJzLmpzIl0sIm5hbWVzIjpbIlJlYWN0IiwiQnJlYWRjcnVtYiIsIkJyZWFkY3J1bWJEcm9wZG93biIsIkJyZWFkY3J1bWJEZWxpbWl0ZXIiLCJERUxJTUlURVJfU0xBU0giLCJERUxJTUlURVJfQ0FSRVQiLCJmaWx0ZXJDcnVtYnMiLCJyb290SWQiLCJjcnVtYnMiLCJyb290SW5kZXgiLCJmaW5kSW5kZXgiLCJjcnVtYiIsImlkIiwic2xpY2UiLCJnZXRCcmVhZGNydW1iIiwiaXNMYXN0Iiwib25DcnVtYkNsaWNrIiwiZGVsaW1pdGVyIiwiQXJyYXkiLCJpc0FycmF5IiwiY29uZGVuc2VkIiwibmFtZSIsIkJyZWFkY3J1bWJzIiwiaXNTbWFsbCIsImxlbmd0aCIsImZpbHRlcmVkQ3J1bWJzIiwib25DbGljayIsInVuZGVmaW5lZCIsImxhc3RCcmVhZGNydW1iIiwic2Vjb25kTGFzdEJyZWFkY3J1bWIiLCJtb3JlQnJlYWRjcnVtYnMiLCJmaXJzdEJyZWFkY3J1bWIiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7QUFNQSxPQUFPQSxLQUFQLE1BQWtCLE9BQWxCO0FBQ0EsT0FBT0MsVUFBUCxNQUF1QixjQUF2QjtBQUNBLE9BQU9DLGtCQUFQLE1BQStCLHNCQUEvQjtBQUNBLE9BQU9DLG1CQUFQLE1BQWdDLHVCQUFoQztBQUNBLFNBQVNDLGVBQVQsRUFBMEJDLGVBQTFCLFFBQWlELGlCQUFqRDs7O0FBWUE7Ozs7Ozs7OztBQVNBLFNBQVNDLFlBQVQsQ0FBc0JDLE1BQXRCLEVBQXNDQyxNQUF0QyxFQUFnRTtBQUM1RCxRQUFNQyxZQUFZRCxPQUFPRSxTQUFQLENBQWlCLFVBQUNDLEtBQUQ7QUFBQSxlQUFrQkEsTUFBTUMsRUFBTixLQUFhTCxNQUEvQjtBQUFBLEtBQWpCLENBQWxCO0FBQ0EsV0FBT0UsY0FBYyxDQUFDLENBQWYsR0FBbUJELE1BQW5CLEdBQTRCQSxPQUFPSyxLQUFQLENBQWFKLFNBQWIsQ0FBbkM7QUFDSDs7QUFFRDs7Ozs7Ozs7QUFRQSxTQUFTSyxhQUFULENBQXVCTixNQUF2QixFQUFnRE8sTUFBaEQsRUFBaUVDLFlBQWpFLEVBQXlGQyxTQUF6RixFQUErRztBQUMzRyxRQUFJQyxNQUFNQyxPQUFOLENBQWNYLE1BQWQsQ0FBSixFQUEyQjtBQUN2QixZQUFNWSxZQUFZSCxjQUFjWixlQUFoQztBQUNBLGVBQ0k7QUFBQTtBQUFBLGNBQU0sV0FBVSxzQkFBaEI7QUFDSSxnQ0FBQyxrQkFBRDtBQUNJLDhCQUFjVyxZQURsQjtBQUVJLHdCQUFRUixNQUZaO0FBR0ksMkJBQVdZLFlBQVksNEJBQVosR0FBMkM7QUFIMUQsY0FESjtBQU1JLGdDQUFDLG1CQUFELElBQXFCLFdBQVdBLFlBQVloQixlQUFaLEdBQThCQyxlQUE5RDtBQU5KLFNBREo7QUFVSDs7QUFiMEcsUUFlbkdPLEVBZm1HLEdBZXRGSixNQWZzRixDQWVuR0ksRUFmbUc7QUFBQSxRQWUvRlMsSUFmK0YsR0FldEZiLE1BZnNGLENBZS9GYSxJQWYrRjs7QUFnQjNHLFdBQU8sb0JBQUMsVUFBRCxJQUFZLE1BQU1BLElBQWxCLEVBQXdCLFNBQVM7QUFBQSxtQkFBTUwsYUFBYUosRUFBYixDQUFOO0FBQUEsU0FBakMsRUFBeUQsUUFBUUcsTUFBakUsRUFBeUUsV0FBV0UsU0FBcEYsR0FBUDtBQUNIOztBQUVELElBQU1LLGNBQWMsU0FBZEEsV0FBYyxPQUF5RTtBQUFBLFFBQXRFZixNQUFzRSxRQUF0RUEsTUFBc0U7QUFBQSxRQUE5REMsTUFBOEQsUUFBOURBLE1BQThEO0FBQUEsUUFBdERRLFlBQXNELFFBQXREQSxZQUFzRDtBQUFBLFFBQXhDQyxTQUF3QyxRQUF4Q0EsU0FBd0M7QUFBQSw0QkFBN0JNLE9BQTZCO0FBQUEsUUFBN0JBLE9BQTZCLGdDQUFuQixLQUFtQjs7QUFDekYsUUFBSSxDQUFDaEIsTUFBRCxJQUFXQyxPQUFPZ0IsTUFBUCxLQUFrQixDQUFqQyxFQUFvQztBQUNoQyxlQUFPLGlDQUFQO0FBQ0g7O0FBRUQ7QUFDQSxRQUFNQyxpQkFBaUJuQixhQUFhQyxNQUFiLEVBQXFCQyxNQUFyQixDQUF2QjtBQUNBLFFBQU1nQixTQUFTQyxlQUFlRCxNQUE5Qjs7QUFFQTtBQUNBLFFBQU1iLFFBQVFjLGVBQWVELFNBQVMsQ0FBeEIsQ0FBZDtBQUNBLFFBQU1FLFVBQVVmLE1BQU1DLEVBQU4sR0FBVztBQUFBLGVBQU1JLGFBQWFMLE1BQU1DLEVBQW5CLENBQU47QUFBQSxLQUFYLEdBQTBDZSxTQUExRDtBQUNBLFFBQU1DLGlCQUFpQixvQkFBQyxVQUFELElBQVksTUFBTWpCLE1BQU1VLElBQXhCLEVBQThCLFNBQVNLLE9BQXZDLEVBQWdELFlBQWhELEdBQXZCOztBQUVBO0FBQ0EsUUFBTUcsdUJBQ0ZMLFNBQVMsQ0FBVCxHQUFhVixjQUFjVyxlQUFlRCxTQUFTLENBQXhCLENBQWQsRUFBMEMsS0FBMUMsRUFBaURSLFlBQWpELEVBQStEQyxTQUEvRCxDQUFiLEdBQXlGLElBRDdGOztBQUdBO0FBQ0EsUUFBTWEsa0JBQ0ZOLFNBQVMsQ0FBVCxHQUFhVixjQUFjVyxlQUFlWixLQUFmLENBQXFCLENBQXJCLEVBQXdCVyxTQUFTLENBQWpDLENBQWQsRUFBbUQsS0FBbkQsRUFBMERSLFlBQTFELEVBQXdFQyxTQUF4RSxDQUFiLEdBQWtHLElBRHRHOztBQUdBO0FBQ0EsUUFBTWMsa0JBQWtCUCxTQUFTLENBQVQsR0FBYVYsY0FBY1csZUFBZSxDQUFmLENBQWQsRUFBaUMsS0FBakMsRUFBd0NULFlBQXhDLEVBQXNEQyxTQUF0RCxDQUFiLEdBQWdGLElBQXhHOztBQUVBLFdBQ0k7QUFBQTtBQUFBLFVBQUssV0FBVSxrQkFBZjtBQUNLTSxrQkFBVSxJQUFWLEdBQWlCUSxlQUR0QjtBQUVLUixrQkFBVSxJQUFWLEdBQWlCTyxlQUZ0QjtBQUdLRCw0QkFITDtBQUlLRDtBQUpMLEtBREo7QUFRSCxDQWpDRDs7QUFtQ0EsZUFBZU4sV0FBZiIsImZpbGUiOiJCcmVhZGNydW1icy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBAZmxvd1xyXG4gKiBAZmlsZSBDb21wb25lbnQgdGhhdCBjcmVhdGVzIGJyZWFkY3VtYnMgZm9yIGJvdGggdGhlIGhlYWRlciBhbmQgbmFtZSBkZXRhaWxzXHJcbiAqIEBhdXRob3IgQm94XHJcbiAqL1xyXG5cclxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IEJyZWFkY3J1bWIgZnJvbSAnLi9CcmVhZGNydW1iJztcclxuaW1wb3J0IEJyZWFkY3J1bWJEcm9wZG93biBmcm9tICcuL0JyZWFkY3J1bWJEcm9wZG93bic7XHJcbmltcG9ydCBCcmVhZGNydW1iRGVsaW1pdGVyIGZyb20gJy4vQnJlYWRjcnVtYkRlbGltaXRlcic7XHJcbmltcG9ydCB7IERFTElNSVRFUl9TTEFTSCwgREVMSU1JVEVSX0NBUkVUIH0gZnJvbSAnLi4vLi4vY29uc3RhbnRzJztcclxuaW1wb3J0IHR5cGUgeyBDcnVtYiwgRGVsaW1pdGVyIH0gZnJvbSAnLi4vLi4vZmxvd1R5cGVzJztcclxuaW1wb3J0ICcuL0JyZWFkY3J1bWJzLnNjc3MnO1xyXG5cclxudHlwZSBQcm9wcyA9IHtcclxuICAgIHJvb3RJZDogc3RyaW5nLFxyXG4gICAgb25DcnVtYkNsaWNrOiBGdW5jdGlvbixcclxuICAgIGNydW1iczogQ3J1bWJbXSxcclxuICAgIGRlbGltaXRlcjogRGVsaW1pdGVyLFxyXG4gICAgaXNTbWFsbD86IGJvb2xlYW5cclxufTtcclxuXHJcbi8qKlxyXG4gKiBGaWx0ZXJzIG91dCBhbmNlc3RvcnMgdG8gcm9vdCBmcm9tIHRoZSBjcnVtYnMuXHJcbiAqIFRoaXMgaXMgdXNlZnVsIHdoZW4gdGhlIHJvb3QgaXMgbm90IEFsbCBGaWxlcy5cclxuICpcclxuICogQHByaXZhdGVcclxuICogQHBhcmFtIHtzdHJpbmd9IHJvb3RJZCB0aGUgcm9vdCBmb2xkZXIgaWRcclxuICogQHBhcmFtIHtBcnJheX0gY3J1bWJzIGxpc3Qgb2YgY3J1bWJzXHJcbiAqIEByZXR1cm4ge0FycmF5fSBjcnVtYnNcclxuICovXHJcbmZ1bmN0aW9uIGZpbHRlckNydW1icyhyb290SWQ6IHN0cmluZywgY3J1bWJzOiBDcnVtYltdKTogQ3J1bWJbXSB7XHJcbiAgICBjb25zdCByb290SW5kZXggPSBjcnVtYnMuZmluZEluZGV4KChjcnVtYjogQ3J1bWIpID0+IGNydW1iLmlkID09PSByb290SWQpO1xyXG4gICAgcmV0dXJuIHJvb3RJbmRleCA9PT0gLTEgPyBjcnVtYnMgOiBjcnVtYnMuc2xpY2Uocm9vdEluZGV4KTtcclxufVxyXG5cclxuLyoqXHJcbiAqIENyZWF0ZXMgYW4gaW5kaXZpZHVhbCBicmVhZGNydW1iXHJcbiAqXHJcbiAqIEBwcml2YXRlXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBjcnVtYiBzaW5nbGUgY3J1bWIgZGF0YVxyXG4gKiBAcGFyYW0ge2Jvb2xlYW59IGlzTGFzdCBpcyB0aGlzIHRoZSBsYXN0IGNydW1iXHJcbiAqIEByZXR1cm4ge0VsZW1lbnR9XHJcbiAqL1xyXG5mdW5jdGlvbiBnZXRCcmVhZGNydW1iKGNydW1iczogQ3J1bWIgfCBDcnVtYltdLCBpc0xhc3Q6IGJvb2xlYW4sIG9uQ3J1bWJDbGljazogRnVuY3Rpb24sIGRlbGltaXRlcjogRGVsaW1pdGVyKSB7XHJcbiAgICBpZiAoQXJyYXkuaXNBcnJheShjcnVtYnMpKSB7XHJcbiAgICAgICAgY29uc3QgY29uZGVuc2VkID0gZGVsaW1pdGVyICE9PSBERUxJTUlURVJfQ0FSRVQ7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPSdidWlrLWJyZWFkY3J1bWItbW9yZSc+XHJcbiAgICAgICAgICAgICAgICA8QnJlYWRjcnVtYkRyb3Bkb3duXHJcbiAgICAgICAgICAgICAgICAgICAgb25DcnVtYkNsaWNrPXtvbkNydW1iQ2xpY2t9XHJcbiAgICAgICAgICAgICAgICAgICAgY3J1bWJzPXtjcnVtYnN9XHJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjb25kZW5zZWQgPyAnYnVpay1icmVhZGNydW1icy1jb25kZW5zZWQnIDogJyd9XHJcbiAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgICAgPEJyZWFkY3J1bWJEZWxpbWl0ZXIgZGVsaW1pdGVyPXtjb25kZW5zZWQgPyBERUxJTUlURVJfU0xBU0ggOiBERUxJTUlURVJfQ0FSRVR9IC8+XHJcbiAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHsgaWQsIG5hbWUgfSA9IGNydW1icztcclxuICAgIHJldHVybiA8QnJlYWRjcnVtYiBuYW1lPXtuYW1lfSBvbkNsaWNrPXsoKSA9PiBvbkNydW1iQ2xpY2soaWQpfSBpc0xhc3Q9e2lzTGFzdH0gZGVsaW1pdGVyPXtkZWxpbWl0ZXJ9IC8+O1xyXG59XHJcblxyXG5jb25zdCBCcmVhZGNydW1icyA9ICh7IHJvb3RJZCwgY3J1bWJzLCBvbkNydW1iQ2xpY2ssIGRlbGltaXRlciwgaXNTbWFsbCA9IGZhbHNlIH06IFByb3BzKSA9PiB7XHJcbiAgICBpZiAoIXJvb3RJZCB8fCBjcnVtYnMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgcmV0dXJuIDxzcGFuIC8+O1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFRoZSBjcnVtYnMgZ2l2ZW4gbWF5IGhhdmUgYW5jZXN0b3JzIGhpZ2hlciB0aGFuIHRoZSByb290LiBXZSBuZWVkIHRvIGZpbHRlciB0aGVtIG91dC5cclxuICAgIGNvbnN0IGZpbHRlcmVkQ3J1bWJzID0gZmlsdGVyQ3J1bWJzKHJvb3RJZCwgY3J1bWJzKTtcclxuICAgIGNvbnN0IGxlbmd0aCA9IGZpbHRlcmVkQ3J1bWJzLmxlbmd0aDtcclxuXHJcbiAgICAvLyBBbHdheXMgc2hvdyB0aGUgbGFzdC9sZWFmIGJyZWFkY3J1bWIuXHJcbiAgICBjb25zdCBjcnVtYiA9IGZpbHRlcmVkQ3J1bWJzW2xlbmd0aCAtIDFdO1xyXG4gICAgY29uc3Qgb25DbGljayA9IGNydW1iLmlkID8gKCkgPT4gb25DcnVtYkNsaWNrKGNydW1iLmlkKSA6IHVuZGVmaW5lZDtcclxuICAgIGNvbnN0IGxhc3RCcmVhZGNydW1iID0gPEJyZWFkY3J1bWIgbmFtZT17Y3J1bWIubmFtZX0gb25DbGljaz17b25DbGlja30gaXNMYXN0IC8+O1xyXG5cclxuICAgIC8vIEFsd2F5cyBzaG93IHRoZSBzZWNvbmQgbGFzdC9wYXJlbnQgYnJlYWRjcnVtYiB3aGVuIHRoZXJlIGFyZSBhdCBsZWFzdCAyIGNydW1icy5cclxuICAgIGNvbnN0IHNlY29uZExhc3RCcmVhZGNydW1iID1cclxuICAgICAgICBsZW5ndGggPiAxID8gZ2V0QnJlYWRjcnVtYihmaWx0ZXJlZENydW1ic1tsZW5ndGggLSAyXSwgZmFsc2UsIG9uQ3J1bWJDbGljaywgZGVsaW1pdGVyKSA6IG51bGw7XHJcblxyXG4gICAgLy8gT25seSBzaG93IHRoZSBtb3JlIGRyb3Bkb3duIHdoZW4gdGhlcmUgd2VyZSBhdCBsZWFzdCA0IGNydW1icy5cclxuICAgIGNvbnN0IG1vcmVCcmVhZGNydW1icyA9XHJcbiAgICAgICAgbGVuZ3RoID4gMyA/IGdldEJyZWFkY3J1bWIoZmlsdGVyZWRDcnVtYnMuc2xpY2UoMSwgbGVuZ3RoIC0gMiksIGZhbHNlLCBvbkNydW1iQ2xpY2ssIGRlbGltaXRlcikgOiBudWxsO1xyXG5cclxuICAgIC8vIE9ubHkgc2hvdyB0aGUgcm9vdCBicmVhZGNydW1iIHdoZW4gdGhlcmUgYXJlIGF0IGxlYXN0IDMgY3J1bWJzLlxyXG4gICAgY29uc3QgZmlyc3RCcmVhZGNydW1iID0gbGVuZ3RoID4gMiA/IGdldEJyZWFkY3J1bWIoZmlsdGVyZWRDcnVtYnNbMF0sIGZhbHNlLCBvbkNydW1iQ2xpY2ssIGRlbGltaXRlcikgOiBudWxsO1xyXG5cclxuICAgIHJldHVybiAoXHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9J2J1aWstYnJlYWRjcnVtYnMnPlxyXG4gICAgICAgICAgICB7aXNTbWFsbCA/IG51bGwgOiBmaXJzdEJyZWFkY3J1bWJ9XHJcbiAgICAgICAgICAgIHtpc1NtYWxsID8gbnVsbCA6IG1vcmVCcmVhZGNydW1ic31cclxuICAgICAgICAgICAge3NlY29uZExhc3RCcmVhZGNydW1ifVxyXG4gICAgICAgICAgICB7bGFzdEJyZWFkY3J1bWJ9XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICApO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgQnJlYWRjcnVtYnM7XHJcbiJdfQ==