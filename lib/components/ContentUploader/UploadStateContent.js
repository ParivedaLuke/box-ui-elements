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