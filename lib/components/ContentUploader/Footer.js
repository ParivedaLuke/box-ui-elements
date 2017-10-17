/**
 * 
 * @file Footer component
 */

import React from 'react';
import { Button, PrimaryButton } from '../Button';


var Footer = function Footer(_ref) {
    var isLoading = _ref.isLoading,
        hasFiles = _ref.hasFiles,
        message = _ref.message,
        onCancel = _ref.onCancel,
        onClose = _ref.onClose,
        onUpload = _ref.onUpload,
        getLocalizedMessage = _ref.getLocalizedMessage;
    return React.createElement(
        'div',
        { className: 'bcu-footer' },
        React.createElement(
            'div',
            { className: 'bcu-footer-left' },
            onClose ? React.createElement(
                Button,
                { isDisabled: hasFiles, onClick: onClose },
                getLocalizedMessage('buik.footer.button.close')
            ) : null
        ),
        React.createElement(
            'div',
            { className: 'bcu-footer-message' },
            message
        ),
        React.createElement(
            'div',
            { className: 'bcu-footer-right' },
            React.createElement(
                Button,
                { isDisabled: !hasFiles, onClick: onCancel },
                getLocalizedMessage('buik.footer.button.cancel.uploads')
            ),
            React.createElement(
                PrimaryButton,
                { isDisabled: !hasFiles, isLoading: isLoading, onClick: onUpload },
                getLocalizedMessage('buik.footer.button.upload')
            )
        )
    );
};

export default Footer;