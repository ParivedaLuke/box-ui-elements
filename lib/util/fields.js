/**
 * 
 * @file Utility to combine API fields needed
 * @author Box
 */

import { FIELD_ID, FIELD_NAME, FIELD_URL, FIELD_TYPE, FIELD_SIZE, FIELD_PARENT, FIELD_EXTENSION, FIELD_PERMISSIONS, FIELD_ITEM_COLLECTION, FIELD_PATH_COLLECTION, FIELD_MODIFIED_AT, FIELD_CREATED_AT, FIELD_SHARED_LINK, FIELD_ALLOWED_SHARED_LINK_ACCESS_LEVELS, FIELD_HAS_COLLABORATIONS, FIELD_IS_EXTERNALLY_OWNED, FIELD_CREATED_BY, FIELD_MODIFIED_BY, FIELD_OWNED_BY, FIELD_DESCRIPTION, FIELD_REPRESENTATIONS, FIELD_SHA1, FIELD_WATERMARK_INFO, FIELD_AUTHENTICATED_DOWNLOAD_URL, FIELD_FILE_VERSION, METADATA_KEYWORDS, METADATA_TIMELINES, METADATA_TRANSCRIPTS } from '../constants';

// Minimum set of fields needed for Content Explorer / Picker
var BASE_FIELDS_TO_FETCH = [FIELD_ID, FIELD_NAME, FIELD_URL, FIELD_TYPE, FIELD_SIZE, FIELD_PARENT, FIELD_EXTENSION, FIELD_PERMISSIONS, FIELD_ITEM_COLLECTION, FIELD_PATH_COLLECTION, FIELD_MODIFIED_AT, FIELD_CREATED_AT, FIELD_SHARED_LINK, FIELD_ALLOWED_SHARED_LINK_ACCESS_LEVELS, FIELD_HAS_COLLABORATIONS, FIELD_IS_EXTERNALLY_OWNED];

// Additional fields needed for the sidebar
var SIDEBAR_FIELDS_TO_FETCH = [FIELD_CREATED_BY, FIELD_MODIFIED_BY, FIELD_OWNED_BY, FIELD_DESCRIPTION, METADATA_KEYWORDS, METADATA_TIMELINES, METADATA_TRANSCRIPTS];

// Additional fields needed for preview
var PREVIEW_FIELDS_TO_FETCH = [FIELD_REPRESENTATIONS, FIELD_SHA1, FIELD_WATERMARK_INFO, FIELD_AUTHENTICATED_DOWNLOAD_URL, FIELD_FILE_VERSION];

/**
 * Returns all the fields that can be fetched
 *
 * @return {string} comma seperated list of fields
 */
function getFieldsIncludingPreviewSidebar() {
    return BASE_FIELDS_TO_FETCH.concat(SIDEBAR_FIELDS_TO_FETCH).concat(PREVIEW_FIELDS_TO_FETCH).join(',');
}

/**
 * Returns base fields and preview fields
 *
 * @return {string} comma seperated list of fields
 */
function getFieldsIncludingPreview() {
    return BASE_FIELDS_TO_FETCH.concat(PREVIEW_FIELDS_TO_FETCH).join(',');
}

/**
 * Returns fields needed other than sidebar and preview
 *
 * @param {boolean|void} [includePreview] - Optionally include preview fields
 * @param {boolean|void} [includePreviewSidebar] - Optionally include preview and sidebar fields
 * @return {string} comma seperated list of fields
 */
export default function getFields() {
    var includePreview = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    var includePreviewSidebar = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    if (includePreview && includePreviewSidebar) {
        // Only include sidebar fields if we are also including preview fields
        return getFieldsIncludingPreviewSidebar();
    } else if (includePreview) {
        // Preview may not have a sidebar
        return getFieldsIncludingPreview();
    }
    return BASE_FIELDS_TO_FETCH.join(',');
}