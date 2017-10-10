/**
 * 
 * @file Upload state content component
 */

import React from 'react';

/* eslint-disable jsx-a11y/label-has-for */
var UploadStateContent = function UploadStateContent(_ref) {
    var message = _ref.message,
        inputLabel = _ref.inputLabel,
        _ref$useButton = _ref.useButton,
        useButton = _ref$useButton === undefined ? false : _ref$useButton,
        onChange = _ref.onChange;

    var messageContent = message ? React.createElement(
        'div',
        { className: 'bcu-upload-state-message' },
        message
    ) : null;
    var inputLabelClass = useButton ? 'buik-btn buik-btn-primary buik-input-btn' : 'buik-input-link';
    var inputContent = React.createElement(
        'label',
        { className: inputLabelClass },
        inputLabel,
        React.createElement('input', { className: 'buik-input', multiple: true, type: 'file', onChange: onChange })
    );

    return React.createElement(
        'div',
        null,
        messageContent,
        inputLabel ? inputContent : null
    );
};
/* eslint-enable jsx-a11y/label-has-for */

export default UploadStateContent;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlVwbG9hZFN0YXRlQ29udGVudC5qcyJdLCJuYW1lcyI6WyJSZWFjdCIsIlVwbG9hZFN0YXRlQ29udGVudCIsIm1lc3NhZ2UiLCJpbnB1dExhYmVsIiwidXNlQnV0dG9uIiwib25DaGFuZ2UiLCJtZXNzYWdlQ29udGVudCIsImlucHV0TGFiZWxDbGFzcyIsImlucHV0Q29udGVudCJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7O0FBS0EsT0FBT0EsS0FBUCxNQUFrQixPQUFsQjs7QUFTQTtBQUNBLElBQU1DLHFCQUFxQixTQUFyQkEsa0JBQXFCLE9BQWlFO0FBQUEsUUFBOURDLE9BQThELFFBQTlEQSxPQUE4RDtBQUFBLFFBQXJEQyxVQUFxRCxRQUFyREEsVUFBcUQ7QUFBQSw4QkFBekNDLFNBQXlDO0FBQUEsUUFBekNBLFNBQXlDLGtDQUE3QixLQUE2QjtBQUFBLFFBQXRCQyxRQUFzQixRQUF0QkEsUUFBc0I7O0FBQ3hGLFFBQU1DLGlCQUFpQkosVUFDakI7QUFBQTtBQUFBLFVBQUssV0FBVSwwQkFBZjtBQUNHQTtBQURILEtBRGlCLEdBSWpCLElBSk47QUFLQSxRQUFNSyxrQkFBa0JILFlBQVksMENBQVosR0FBeUQsaUJBQWpGO0FBQ0EsUUFBTUksZUFDRjtBQUFBO0FBQUEsVUFBTyxXQUFXRCxlQUFsQjtBQUNLSixrQkFETDtBQUVJLHVDQUFPLFdBQVUsWUFBakIsRUFBOEIsY0FBOUIsRUFBdUMsTUFBSyxNQUE1QyxFQUFtRCxVQUFVRSxRQUE3RDtBQUZKLEtBREo7O0FBT0EsV0FDSTtBQUFBO0FBQUE7QUFDS0Msc0JBREw7QUFFS0gscUJBQWFLLFlBQWIsR0FBNEI7QUFGakMsS0FESjtBQU1ILENBcEJEO0FBcUJBOztBQUVBLGVBQWVQLGtCQUFmIiwiZmlsZSI6IlVwbG9hZFN0YXRlQ29udGVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBAZmxvd1xyXG4gKiBAZmlsZSBVcGxvYWQgc3RhdGUgY29udGVudCBjb21wb25lbnRcclxuICovXHJcblxyXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5cclxudHlwZSBQcm9wcyA9IHtcclxuICAgIG1lc3NhZ2U/OiBzdHJpbmcsXHJcbiAgICBpbnB1dExhYmVsPzogc3RyaW5nLFxyXG4gICAgdXNlQnV0dG9uPzogYm9vbGVhbixcclxuICAgIG9uQ2hhbmdlPzogRnVuY3Rpb25cclxufTtcclxuXHJcbi8qIGVzbGludC1kaXNhYmxlIGpzeC1hMTF5L2xhYmVsLWhhcy1mb3IgKi9cclxuY29uc3QgVXBsb2FkU3RhdGVDb250ZW50ID0gKHsgbWVzc2FnZSwgaW5wdXRMYWJlbCwgdXNlQnV0dG9uID0gZmFsc2UsIG9uQ2hhbmdlIH06IFByb3BzKSA9PiB7XHJcbiAgICBjb25zdCBtZXNzYWdlQ29udGVudCA9IG1lc3NhZ2VcclxuICAgICAgICA/IDxkaXYgY2xhc3NOYW1lPSdiY3UtdXBsb2FkLXN0YXRlLW1lc3NhZ2UnPlxyXG4gICAgICAgICAgICB7bWVzc2FnZX1cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA6IG51bGw7XHJcbiAgICBjb25zdCBpbnB1dExhYmVsQ2xhc3MgPSB1c2VCdXR0b24gPyAnYnVpay1idG4gYnVpay1idG4tcHJpbWFyeSBidWlrLWlucHV0LWJ0bicgOiAnYnVpay1pbnB1dC1saW5rJztcclxuICAgIGNvbnN0IGlucHV0Q29udGVudCA9IChcclxuICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPXtpbnB1dExhYmVsQ2xhc3N9PlxyXG4gICAgICAgICAgICB7aW5wdXRMYWJlbH1cclxuICAgICAgICAgICAgPGlucHV0IGNsYXNzTmFtZT0nYnVpay1pbnB1dCcgbXVsdGlwbGUgdHlwZT0nZmlsZScgb25DaGFuZ2U9e29uQ2hhbmdlfSAvPlxyXG4gICAgICAgIDwvbGFiZWw+XHJcbiAgICApO1xyXG5cclxuICAgIHJldHVybiAoXHJcbiAgICAgICAgPGRpdj5cclxuICAgICAgICAgICAge21lc3NhZ2VDb250ZW50fVxyXG4gICAgICAgICAgICB7aW5wdXRMYWJlbCA/IGlucHV0Q29udGVudCA6IG51bGx9XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICApO1xyXG59O1xyXG4vKiBlc2xpbnQtZW5hYmxlIGpzeC1hMTF5L2xhYmVsLWhhcy1mb3IgKi9cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFVwbG9hZFN0YXRlQ29udGVudDtcclxuIl19