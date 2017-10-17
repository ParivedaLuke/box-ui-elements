/**
 * 
 * @file Footer list component
 * @author Box
 */

import React from 'react';
import { Button, PrimaryButton, PlainButton } from '../Button';


var Footer = function Footer(_ref) {
    var selectedCount = _ref.selectedCount,
        onSelectedClick = _ref.onSelectedClick,
        hasHitSelectionLimit = _ref.hasHitSelectionLimit,
        onCancel = _ref.onCancel,
        onChoose = _ref.onChoose,
        getLocalizedMessage = _ref.getLocalizedMessage,
        chooseButtonLabel = _ref.chooseButtonLabel,
        cancelButtonLabel = _ref.cancelButtonLabel;
    return React.createElement(
        'div',
        { className: 'bcp-footer' },
        React.createElement(
            'div',
            { className: 'bcp-footer-left' },
            React.createElement(
                PlainButton,
                { onClick: onSelectedClick },
                React.createElement(
                    'span',
                    { className: 'bcp-selected-count' },
                    selectedCount
                ),
                '\xA0',
                React.createElement(
                    'span',
                    null,
                    getLocalizedMessage('buik.footer.selected')
                )
            ),
            '\xA0',
            hasHitSelectionLimit ? React.createElement(
                'span',
                { className: 'bcp-selected-max' },
                getLocalizedMessage('buik.footer.selected.max')
            ) : null
        ),
        React.createElement(
            'div',
            { className: 'bcp-footer-right' },
            React.createElement(
                Button,
                { onClick: onCancel },
                cancelButtonLabel || getLocalizedMessage('buik.footer.button.cancel')
            ),
            React.createElement(
                PrimaryButton,
                { onClick: onChoose },
                chooseButtonLabel || getLocalizedMessage('buik.footer.button.choose')
            )
        )
    );
};

export default Footer;