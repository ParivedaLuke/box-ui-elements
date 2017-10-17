/**
 * 
 * @file Details sidebar component
 * @author Box
 */

import React from 'react';
import SidebarSection from './SidebarSection';
import FileProperties from '../FileProperties';
import SidebarContent from './SidebarContent';
import SidebarSkills from './SidebarSkills';


/* eslint-disable jsx-a11y/label-has-for */
var DetailsSidebar = function DetailsSidebar(_ref) {
    var file = _ref.file,
        getPreviewer = _ref.getPreviewer,
        getLocalizedMessage = _ref.getLocalizedMessage;
    return React.createElement(
        SidebarContent,
        { title: getLocalizedMessage('buik.preview.sidebar.details.title') },
        React.createElement(SidebarSkills, { metadata: file.metadata, getPreviewer: getPreviewer, getLocalizedMessage: getLocalizedMessage }),
        React.createElement(
            SidebarSection,
            { title: getLocalizedMessage('buik.preview.sidebar.details.properties') },
            React.createElement(FileProperties, { file: file, getLocalizedMessage: getLocalizedMessage })
        )
    );
};

export default DetailsSidebar;

// <div className='bcpr-sidebar-details-description'>
// <label>
//     <span>
//         {getLocalizedMessage('buik.preview.sidebar.details.description')}
//     </span>
//     <textarea
//         readOnly
//         placeholder={getLocalizedMessage('buik.preview.sidebar.details.description.placeholder')}
//         defaultValue={file.description}
//     />
// </label>
// </div>