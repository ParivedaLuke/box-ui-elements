/**
 * 
 * @file Details sidebar component
 * @author Box
 */

import React from 'react';
import SidebarSection from './SidebarSection';
import Keywords from '../Keywords';
import Transcript from '../Transcript';
import Timelines from '../Timeline';
import Keyvalues from '../Keyvalues';


function getCard(skill, getPreviewer) {
    var skills_data_type = skill.skills_data_type;

    switch (skills_data_type) {
        case 'keyword':
            return React.createElement(Keywords, { skill: skill, getPreviewer: getPreviewer });
        case 'keyvalue':
            return React.createElement(Keyvalues, { skill: skill });
        case 'timeline':
            return React.createElement(Timelines, { skill: skill, getPreviewer: getPreviewer });
        case 'transcript':
            return React.createElement(Transcript, { skill: skill, getPreviewer: getPreviewer });
        default:
            return null;
    }
}

var SidebarSkills = function SidebarSkills(_ref) {
    var metadata = _ref.metadata,
        getPreviewer = _ref.getPreviewer,
        getLocalizedMessage = _ref.getLocalizedMessage;

    if (!metadata || !metadata.global) {
        return null;
    }

    var skills = [];
    var keywords = metadata.global['box-skills-keywords-demo'];
    var timelines = metadata.global['box-skills-timelines-demo'];
    var transcripts = metadata.global['box-skills-transcripts-demo'];

    if (keywords) {
        try {
            skills = skills.concat(JSON.parse(keywords.keywords));
        } catch (e) {
            // ignore
        }
    }

    if (timelines) {
        try {
            skills = skills.concat(JSON.parse(timelines.timelines));
        } catch (e) {
            // ignore
        }
    }

    if (transcripts) {
        try {
            skills = skills.concat(JSON.parse(transcripts.transcripts));
        } catch (e) {
            // ignore
        }
    }

    if (skills.length === 0) {
        return null;
    }

    return React.createElement(
        'div',
        null,
        skills.map(function (skill
        /* eslint-disable react/no-array-index-key */
        , index) {
            return Array.isArray(skill.entries) && skill.entries.length > 0 && React.createElement(
                SidebarSection,
                {
                    key: index,
                    title: skill.title || getLocalizedMessage('buik.preview.sidebar.details.' + skill.skills_data_type)
                },
                getCard(skill, getPreviewer)
            );
        }
        /* eslint-enable react/no-array-index-key */
        )
    );
};

export default SidebarSkills;