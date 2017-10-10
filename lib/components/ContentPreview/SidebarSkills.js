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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlNpZGViYXJTa2lsbHMuanMiXSwibmFtZXMiOlsiUmVhY3QiLCJTaWRlYmFyU2VjdGlvbiIsIktleXdvcmRzIiwiVHJhbnNjcmlwdCIsIlRpbWVsaW5lcyIsIktleXZhbHVlcyIsImdldENhcmQiLCJza2lsbCIsImdldFByZXZpZXdlciIsInNraWxsc19kYXRhX3R5cGUiLCJTaWRlYmFyU2tpbGxzIiwibWV0YWRhdGEiLCJnZXRMb2NhbGl6ZWRNZXNzYWdlIiwiZ2xvYmFsIiwic2tpbGxzIiwia2V5d29yZHMiLCJ0aW1lbGluZXMiLCJ0cmFuc2NyaXB0cyIsImNvbmNhdCIsIkpTT04iLCJwYXJzZSIsImUiLCJsZW5ndGgiLCJtYXAiLCJpbmRleCIsIkFycmF5IiwiaXNBcnJheSIsImVudHJpZXMiLCJ0aXRsZSJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztBQU1BLE9BQU9BLEtBQVAsTUFBa0IsT0FBbEI7QUFDQSxPQUFPQyxjQUFQLE1BQTJCLGtCQUEzQjtBQUNBLE9BQU9DLFFBQVAsTUFBcUIsYUFBckI7QUFDQSxPQUFPQyxVQUFQLE1BQXVCLGVBQXZCO0FBQ0EsT0FBT0MsU0FBUCxNQUFzQixhQUF0QjtBQUNBLE9BQU9DLFNBQVAsTUFBc0IsY0FBdEI7OztBQVNBLFNBQVNDLE9BQVQsQ0FBaUJDLEtBQWpCLEVBQW1DQyxZQUFuQyxFQUEyRDtBQUFBLFFBQy9DQyxnQkFEK0MsR0FDMUJGLEtBRDBCLENBQy9DRSxnQkFEK0M7O0FBRXZELFlBQVFBLGdCQUFSO0FBQ0ksYUFBSyxTQUFMO0FBQ0ksbUJBQU8sb0JBQUMsUUFBRCxJQUFVLE9BQU9GLEtBQWpCLEVBQXdCLGNBQWNDLFlBQXRDLEdBQVA7QUFDSixhQUFLLFVBQUw7QUFDSSxtQkFBTyxvQkFBQyxTQUFELElBQVcsT0FBT0QsS0FBbEIsR0FBUDtBQUNKLGFBQUssVUFBTDtBQUNJLG1CQUFPLG9CQUFDLFNBQUQsSUFBVyxPQUFPQSxLQUFsQixFQUF5QixjQUFjQyxZQUF2QyxHQUFQO0FBQ0osYUFBSyxZQUFMO0FBQ0ksbUJBQU8sb0JBQUMsVUFBRCxJQUFZLE9BQU9ELEtBQW5CLEVBQTBCLGNBQWNDLFlBQXhDLEdBQVA7QUFDSjtBQUNJLG1CQUFPLElBQVA7QUFWUjtBQVlIOztBQUVELElBQU1FLGdCQUFnQixTQUFoQkEsYUFBZ0IsT0FBNEQ7QUFBQSxRQUF6REMsUUFBeUQsUUFBekRBLFFBQXlEO0FBQUEsUUFBL0NILFlBQStDLFFBQS9DQSxZQUErQztBQUFBLFFBQWpDSSxtQkFBaUMsUUFBakNBLG1CQUFpQzs7QUFDOUUsUUFBSSxDQUFDRCxRQUFELElBQWEsQ0FBQ0EsU0FBU0UsTUFBM0IsRUFBbUM7QUFDL0IsZUFBTyxJQUFQO0FBQ0g7O0FBRUQsUUFBSUMsU0FBc0IsRUFBMUI7QUFDQSxRQUFNQyxXQUFXSixTQUFTRSxNQUFULENBQWdCLDBCQUFoQixDQUFqQjtBQUNBLFFBQU1HLFlBQVlMLFNBQVNFLE1BQVQsQ0FBZ0IsMkJBQWhCLENBQWxCO0FBQ0EsUUFBTUksY0FBY04sU0FBU0UsTUFBVCxDQUFnQiw2QkFBaEIsQ0FBcEI7O0FBRUEsUUFBSUUsUUFBSixFQUFjO0FBQ1YsWUFBSTtBQUNBRCxxQkFBU0EsT0FBT0ksTUFBUCxDQUFjQyxLQUFLQyxLQUFMLENBQVdMLFNBQVNBLFFBQXBCLENBQWQsQ0FBVDtBQUNILFNBRkQsQ0FFRSxPQUFPTSxDQUFQLEVBQVU7QUFDUjtBQUNIO0FBQ0o7O0FBRUQsUUFBSUwsU0FBSixFQUFlO0FBQ1gsWUFBSTtBQUNBRixxQkFBU0EsT0FBT0ksTUFBUCxDQUFjQyxLQUFLQyxLQUFMLENBQVdKLFVBQVVBLFNBQXJCLENBQWQsQ0FBVDtBQUNILFNBRkQsQ0FFRSxPQUFPSyxDQUFQLEVBQVU7QUFDUjtBQUNIO0FBQ0o7O0FBRUQsUUFBSUosV0FBSixFQUFpQjtBQUNiLFlBQUk7QUFDQUgscUJBQVNBLE9BQU9JLE1BQVAsQ0FBY0MsS0FBS0MsS0FBTCxDQUFXSCxZQUFZQSxXQUF2QixDQUFkLENBQVQ7QUFDSCxTQUZELENBRUUsT0FBT0ksQ0FBUCxFQUFVO0FBQ1I7QUFDSDtBQUNKOztBQUVELFFBQUlQLE9BQU9RLE1BQVAsS0FBa0IsQ0FBdEIsRUFBeUI7QUFDckIsZUFBTyxJQUFQO0FBQ0g7O0FBRUQsV0FDSTtBQUFBO0FBQUE7QUFDS1IsZUFBT1MsR0FBUCxDQUNHLFVBQUNoQjtBQUNHO0FBREosVUFBbUJpQixLQUFuQjtBQUFBLG1CQUVJQyxNQUFNQyxPQUFOLENBQWNuQixNQUFNb0IsT0FBcEIsS0FDQXBCLE1BQU1vQixPQUFOLENBQWNMLE1BQWQsR0FBdUIsQ0FEdkIsSUFFQTtBQUFDLDhCQUFEO0FBQUE7QUFDSSx5QkFBS0UsS0FEVDtBQUVJLDJCQUNJakIsTUFBTXFCLEtBQU4sSUFBZWhCLHNEQUFvREwsTUFBTUUsZ0JBQTFEO0FBSHZCO0FBTUtILHdCQUFRQyxLQUFSLEVBQWVDLFlBQWY7QUFOTCxhQUpKO0FBQUE7QUFZQTtBQWJIO0FBREwsS0FESjtBQW1CSCxDQXpERDs7QUEyREEsZUFBZUUsYUFBZiIsImZpbGUiOiJTaWRlYmFyU2tpbGxzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIEBmbG93XHJcbiAqIEBmaWxlIERldGFpbHMgc2lkZWJhciBjb21wb25lbnRcclxuICogQGF1dGhvciBCb3hcclxuICovXHJcblxyXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgU2lkZWJhclNlY3Rpb24gZnJvbSAnLi9TaWRlYmFyU2VjdGlvbic7XHJcbmltcG9ydCBLZXl3b3JkcyBmcm9tICcuLi9LZXl3b3Jkcyc7XHJcbmltcG9ydCBUcmFuc2NyaXB0IGZyb20gJy4uL1RyYW5zY3JpcHQnO1xyXG5pbXBvcnQgVGltZWxpbmVzIGZyb20gJy4uL1RpbWVsaW5lJztcclxuaW1wb3J0IEtleXZhbHVlcyBmcm9tICcuLi9LZXl2YWx1ZXMnO1xyXG5pbXBvcnQgdHlwZSB7IFNraWxsRGF0YSwgTWV0YWRhdGFUeXBlIH0gZnJvbSAnLi4vLi4vZmxvd1R5cGVzJztcclxuXHJcbnR5cGUgUHJvcHMgPSB7XHJcbiAgICBtZXRhZGF0YT86IE1ldGFkYXRhVHlwZSxcclxuICAgIGdldFByZXZpZXdlcjogRnVuY3Rpb24sXHJcbiAgICBnZXRMb2NhbGl6ZWRNZXNzYWdlOiBGdW5jdGlvblxyXG59O1xyXG5cclxuZnVuY3Rpb24gZ2V0Q2FyZChza2lsbDogU2tpbGxEYXRhLCBnZXRQcmV2aWV3ZXI6IEZ1bmN0aW9uKSB7XHJcbiAgICBjb25zdCB7IHNraWxsc19kYXRhX3R5cGUgfSA9IHNraWxsO1xyXG4gICAgc3dpdGNoIChza2lsbHNfZGF0YV90eXBlKSB7XHJcbiAgICAgICAgY2FzZSAna2V5d29yZCc6XHJcbiAgICAgICAgICAgIHJldHVybiA8S2V5d29yZHMgc2tpbGw9e3NraWxsfSBnZXRQcmV2aWV3ZXI9e2dldFByZXZpZXdlcn0gLz47XHJcbiAgICAgICAgY2FzZSAna2V5dmFsdWUnOlxyXG4gICAgICAgICAgICByZXR1cm4gPEtleXZhbHVlcyBza2lsbD17c2tpbGx9IC8+O1xyXG4gICAgICAgIGNhc2UgJ3RpbWVsaW5lJzpcclxuICAgICAgICAgICAgcmV0dXJuIDxUaW1lbGluZXMgc2tpbGw9e3NraWxsfSBnZXRQcmV2aWV3ZXI9e2dldFByZXZpZXdlcn0gLz47XHJcbiAgICAgICAgY2FzZSAndHJhbnNjcmlwdCc6XHJcbiAgICAgICAgICAgIHJldHVybiA8VHJhbnNjcmlwdCBza2lsbD17c2tpbGx9IGdldFByZXZpZXdlcj17Z2V0UHJldmlld2VyfSAvPjtcclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxufVxyXG5cclxuY29uc3QgU2lkZWJhclNraWxscyA9ICh7IG1ldGFkYXRhLCBnZXRQcmV2aWV3ZXIsIGdldExvY2FsaXplZE1lc3NhZ2UgfTogUHJvcHMpID0+IHtcclxuICAgIGlmICghbWV0YWRhdGEgfHwgIW1ldGFkYXRhLmdsb2JhbCkge1xyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCBza2lsbHM6IFNraWxsRGF0YVtdID0gW107XHJcbiAgICBjb25zdCBrZXl3b3JkcyA9IG1ldGFkYXRhLmdsb2JhbFsnYm94LXNraWxscy1rZXl3b3Jkcy1kZW1vJ107XHJcbiAgICBjb25zdCB0aW1lbGluZXMgPSBtZXRhZGF0YS5nbG9iYWxbJ2JveC1za2lsbHMtdGltZWxpbmVzLWRlbW8nXTtcclxuICAgIGNvbnN0IHRyYW5zY3JpcHRzID0gbWV0YWRhdGEuZ2xvYmFsWydib3gtc2tpbGxzLXRyYW5zY3JpcHRzLWRlbW8nXTtcclxuXHJcbiAgICBpZiAoa2V5d29yZHMpIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBza2lsbHMgPSBza2lsbHMuY29uY2F0KEpTT04ucGFyc2Uoa2V5d29yZHMua2V5d29yZHMpKTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgIC8vIGlnbm9yZVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpZiAodGltZWxpbmVzKSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgc2tpbGxzID0gc2tpbGxzLmNvbmNhdChKU09OLnBhcnNlKHRpbWVsaW5lcy50aW1lbGluZXMpKTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgIC8vIGlnbm9yZVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpZiAodHJhbnNjcmlwdHMpIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBza2lsbHMgPSBza2lsbHMuY29uY2F0KEpTT04ucGFyc2UodHJhbnNjcmlwdHMudHJhbnNjcmlwdHMpKTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgIC8vIGlnbm9yZVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpZiAoc2tpbGxzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiAoXHJcbiAgICAgICAgPGRpdj5cclxuICAgICAgICAgICAge3NraWxscy5tYXAoXHJcbiAgICAgICAgICAgICAgICAoc2tpbGw6IFNraWxsRGF0YSwgaW5kZXgpID0+XHJcbiAgICAgICAgICAgICAgICAgICAgLyogZXNsaW50LWRpc2FibGUgcmVhY3Qvbm8tYXJyYXktaW5kZXgta2V5ICovXHJcbiAgICAgICAgICAgICAgICAgICAgQXJyYXkuaXNBcnJheShza2lsbC5lbnRyaWVzKSAmJlxyXG4gICAgICAgICAgICAgICAgICAgIHNraWxsLmVudHJpZXMubGVuZ3RoID4gMCAmJlxyXG4gICAgICAgICAgICAgICAgICAgIDxTaWRlYmFyU2VjdGlvblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBrZXk9e2luZGV4fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aXRsZT17XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBza2lsbC50aXRsZSB8fCBnZXRMb2NhbGl6ZWRNZXNzYWdlKGBidWlrLnByZXZpZXcuc2lkZWJhci5kZXRhaWxzLiR7c2tpbGwuc2tpbGxzX2RhdGFfdHlwZX1gKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7Z2V0Q2FyZChza2lsbCwgZ2V0UHJldmlld2VyKX1cclxuICAgICAgICAgICAgICAgICAgICA8L1NpZGViYXJTZWN0aW9uPlxyXG4gICAgICAgICAgICAgICAgLyogZXNsaW50LWVuYWJsZSByZWFjdC9uby1hcnJheS1pbmRleC1rZXkgKi9cclxuICAgICAgICAgICAgKX1cclxuICAgICAgICA8L2Rpdj5cclxuICAgICk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBTaWRlYmFyU2tpbGxzO1xyXG4iXX0=