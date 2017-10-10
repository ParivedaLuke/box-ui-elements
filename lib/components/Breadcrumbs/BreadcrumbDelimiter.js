/**
 * 
 * @file Clickable breadcrumb component
 * @author Box
 */

import React from 'react';
import { DELIMITER_CARET } from '../../constants';
import IconRightArrow from '../icons/IconRightArrow';


var BreadcrumbDelimiter = function BreadcrumbDelimiter(_ref) {
    var delimiter = _ref.delimiter;
    return delimiter === DELIMITER_CARET ? React.createElement(
        'span',
        { className: 'buik-breadcrumb-seperator' },
        React.createElement(IconRightArrow, null)
    ) : React.createElement(
        'span',
        null,
        '/'
    );
};

export default BreadcrumbDelimiter;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkJyZWFkY3J1bWJEZWxpbWl0ZXIuanMiXSwibmFtZXMiOlsiUmVhY3QiLCJERUxJTUlURVJfQ0FSRVQiLCJJY29uUmlnaHRBcnJvdyIsIkJyZWFkY3J1bWJEZWxpbWl0ZXIiLCJkZWxpbWl0ZXIiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7QUFNQSxPQUFPQSxLQUFQLE1BQWtCLE9BQWxCO0FBQ0EsU0FBU0MsZUFBVCxRQUFnQyxpQkFBaEM7QUFDQSxPQUFPQyxjQUFQLE1BQTJCLHlCQUEzQjs7O0FBT0EsSUFBTUMsc0JBQXNCLFNBQXRCQSxtQkFBc0I7QUFBQSxRQUFHQyxTQUFILFFBQUdBLFNBQUg7QUFBQSxXQUN4QkEsY0FBY0gsZUFBZCxHQUNNO0FBQUE7QUFBQSxVQUFNLFdBQVUsMkJBQWhCO0FBQ0UsNEJBQUMsY0FBRDtBQURGLEtBRE4sR0FJTTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBTGtCO0FBQUEsQ0FBNUI7O0FBT0EsZUFBZUUsbUJBQWYiLCJmaWxlIjoiQnJlYWRjcnVtYkRlbGltaXRlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBAZmxvd1xyXG4gKiBAZmlsZSBDbGlja2FibGUgYnJlYWRjcnVtYiBjb21wb25lbnRcclxuICogQGF1dGhvciBCb3hcclxuICovXHJcblxyXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBERUxJTUlURVJfQ0FSRVQgfSBmcm9tICcuLi8uLi9jb25zdGFudHMnO1xyXG5pbXBvcnQgSWNvblJpZ2h0QXJyb3cgZnJvbSAnLi4vaWNvbnMvSWNvblJpZ2h0QXJyb3cnO1xyXG5pbXBvcnQgdHlwZSB7IERlbGltaXRlciB9IGZyb20gJy4uLy4uL2Zsb3dUeXBlcyc7XHJcblxyXG50eXBlIFByb3BzID0ge1xyXG4gICAgZGVsaW1pdGVyPzogRGVsaW1pdGVyXHJcbn07XHJcblxyXG5jb25zdCBCcmVhZGNydW1iRGVsaW1pdGVyID0gKHsgZGVsaW1pdGVyIH06IFByb3BzKSA9PlxyXG4gICAgZGVsaW1pdGVyID09PSBERUxJTUlURVJfQ0FSRVRcclxuICAgICAgICA/IDxzcGFuIGNsYXNzTmFtZT0nYnVpay1icmVhZGNydW1iLXNlcGVyYXRvcic+XHJcbiAgICAgICAgICAgIDxJY29uUmlnaHRBcnJvdyAvPlxyXG4gICAgICAgIDwvc3Bhbj5cclxuICAgICAgICA6IDxzcGFuPi88L3NwYW4+O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgQnJlYWRjcnVtYkRlbGltaXRlcjtcclxuIl19