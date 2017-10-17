/**
 * 
 * @file Logo for the header
 * @author Box
 */

import React from 'react';
import IconDefaultLogo from '../icons/IconDefaultLogo';
import IconBoxLogo from '../icons/IconBoxLogo';


function getLogo(isSmall, url) {
    if (url === 'box') {
        return React.createElement(IconBoxLogo, null);
    } else if (typeof url === 'string') {
        return React.createElement('img', { alt: '', src: url, className: 'buik-logo-custom' });
    }
    return React.createElement(IconDefaultLogo, { width: isSmall ? 75 : 100 });
}

var Logo = function Logo(_ref) {
    var url = _ref.url,
        isSmall = _ref.isSmall;
    return React.createElement(
        'div',
        { className: 'buik-logo' },
        getLogo(isSmall, url)
    );
};

export default Logo;