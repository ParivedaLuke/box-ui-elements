/**
 * 
 * @file Global constants
 * @author Box
 */

import { canPlayDash } from './util/browser';

/* ----------------------- Size ---------------------------- */
export var SIZE_SMALL = 'small';
export var SIZE_LARGE = 'large';

/* ----------------------- Views ---------------------------- */
export var VIEW_FOLDER = 'folder';
export var VIEW_SEARCH = 'search';
export var VIEW_SELECTED = 'selected';
export var VIEW_RECENTS = 'recents';
export var VIEW_ERROR = 'error';
export var VIEW_UPLOAD_EMPTY = 'upload-empty';
export var VIEW_UPLOAD_IN_PROGRESS = 'upload-inprogress';
export var VIEW_UPLOAD_SUCCESS = 'upload-success';

/* ----------------------- Types ---------------------------- */
export var TYPE_FOLDER = 'folder';
export var TYPE_FILE = 'file';
export var TYPE_WEBLINK = 'web_link';

/* -------------------- Typed Prefix-------------------------- */
export var TYPED_ID_FOLDER_PREFIX = 'folder_';
export var TYPED_ID_FILE_PREFIX = 'file_';
export var TYPED_ID_WEBLINK_PREFIX = 'web_link_';

/* ----------------- Cache Key Prefix ----------------------- */
export var CACHE_PREFIX_FOLDER = TYPED_ID_FOLDER_PREFIX;
export var CACHE_PREFIX_FILE = TYPED_ID_FILE_PREFIX;
export var CACHE_PREFIX_WEBLINK = TYPED_ID_WEBLINK_PREFIX;
export var CACHE_PREFIX_SEARCH = 'search_';
export var CACHE_PREFIX_RECENTS = 'recents_';

/* ----------------------- Sorts ---------------------------- */
export var SORT_ASC = 'ASC';
export var SORT_DESC = 'DESC';
export var SORT_NAME = 'name';
export var SORT_DATE = 'date';
export var SORT_SIZE = 'size';

/* -------------------- Shared access ----------------------- */
export var ACCESS_NONE = 'none';
export var ACCESS_OPEN = 'open';
export var ACCESS_COLLAB = 'collaborators';
export var ACCESS_COMPANY = 'company';

/* ----------------------- Fields --------------------------- */
export var FIELD_ID = 'id';
export var FIELD_NAME = 'name';
export var FIELD_TYPE = 'type';
export var FIELD_SIZE = 'size';
export var FIELD_PARENT = 'parent';
export var FIELD_EXTENSION = 'extension';
export var FIELD_PERMISSIONS = 'permissions';
export var FIELD_ITEM_COLLECTION = 'item_collection';
export var FIELD_PATH_COLLECTION = 'path_collection';
export var FIELD_MODIFIED_AT = 'modified_at';
export var FIELD_CREATED_AT = 'created_at';
export var FIELD_INTERACTED_AT = 'interacted_at';
export var FIELD_SHARED_LINK = 'shared_link';
export var FIELD_ALLOWED_SHARED_LINK_ACCESS_LEVELS = 'allowed_shared_link_access_levels';
export var FIELD_HAS_COLLABORATIONS = 'has_collaborations';
export var FIELD_IS_EXTERNALLY_OWNED = 'is_externally_owned';
export var FIELD_TOTAL_COUNT = 'total_count';
export var FIELD_ENTRIES = 'entries';
export var FIELD_DOWNLOAD_URL = 'download_url';
export var FIELD_ACCESS = 'access';
export var FIELD_URL = 'url';
export var FIELD_CREATED_BY = 'created_by';
export var FIELD_MODIFIED_BY = 'modified_by';
export var FIELD_OWNED_BY = 'owned_by';
export var FIELD_DESCRIPTION = 'description';
export var FIELD_REPRESENTATIONS = 'representations';
export var FIELD_SHA1 = 'sha1';
export var FIELD_WATERMARK_INFO = 'watermark_info';
export var FIELD_AUTHENTICATED_DOWNLOAD_URL = 'authenticated_download_url';
export var FIELD_FILE_VERSION = 'file_version';
export var METADATA_KEYWORDS = 'metadata.global.box-skills-keywords-demo';
export var METADATA_TIMELINES = 'metadata.global.box-skills-timelines-demo';
export var METADATA_TRANSCRIPTS = 'metadata.global.box-skills-transcripts-demo';

/* ----------------------- Permissions --------------------------- */
export var PERMISSION_CAN_PREVIEW = 'can_preview';
export var PERMISSION_CAN_RENAME = 'can_rename';
export var PERMISSION_CAN_DOWNLOAD = 'can_download';
export var PERMISSION_CAN_DELETE = 'can_delete';
export var PERMISSION_CAN_UPLOAD = 'can_upload';
export var PERMISSION_CAN_SHARE = 'can_share';
export var PERMISSION_CAN_SET_SHARE_ACCESS = 'can_set_share_access';

/* ------------- Delimiters for bread crumbs ---------------- */
export var DELIMITER_SLASH = 'slash';
export var DELIMITER_CARET = 'caret';

/* ---------------------- Defaults -------------------------- */
export var DEFAULT_PREVIEW_VERSION = '1.13.0';
export var DEFAULT_PREVIEW_LOCALE = 'en-US';
export var DEFAULT_PATH_STATIC = 'platform/elements';
export var DEFAULT_PATH_STATIC_PREVIEW = 'platform/preview';
export var DEFAULT_HOSTNAME_API = 'https://api.box.com';
export var DEFAULT_HOSTNAME_STATIC = 'https://cdn01.boxcdn.net';
export var DEFAULT_HOSTNAME_UPLOAD = 'https://upload.box.com';
export var DEFAULT_HOSTNAME_APP = 'https://app.box.com';
export var DEFAULT_CONTAINER = 'body';
export var DEFAULT_ROOT = '0';
export var DEFAULT_SEARCH_DEBOUNCE = 500;
export var DEFAULT_VIEW_FILES = 'files';
export var DEFAULT_VIEW_RECENTS = 'recents';
export var BOX_BLUE = '#0061d5';
export var BOX_BLUE_LIGHT = '#dbe8f8';
export var COLOR_RED = '#c82341';
export var CLIENT_NAME_CONTENT_TREE = 'ContentTree';
export var CLIENT_NAME_CONTENT_PICKER = 'ContentPicker';
export var CLIENT_NAME_FILE_PICKER = 'FilePicker';
export var CLIENT_NAME_FOLDER_PICKER = 'FolderPicker';
export var CLIENT_NAME_CONTENT_UPLOADER = 'ContentUploader';
export var CLIENT_NAME_CONTENT_EXPLORER = 'ContentExplorer';
export var CLIENT_NAME_CONTENT_PREVIEW = 'ContentPreview';

/* ---------------------- Statuses  -------------------------- */
export var STATUS_PENDING = 'pending';
export var STATUS_IN_PROGRESS = 'inprogress';
export var STATUS_COMPLETE = 'complete';
export var STATUS_ERROR = 'error';

/* ------------------- Styles ------------------------ */
export var CLASS_MODAL_CONTENT = 'buik-modal-dialog-content';
export var CLASS_MODAL_CONTENT_FULL_BLEED = 'buik-modal-dialog-content-full-bleed';
export var CLASS_MODAL_OVERLAY = 'buik-modal-dialog-overlay';
export var CLASS_IS_COMPACT = 'buik-is-small';
export var CLASS_IS_TOUCH = 'buik-is-touch';
export var CLASS_MODAL = 'buik-modal';
export var CLASS_BUTTON_CONTENT_SPAN = 'buik-btn-content';
export var CLASS_CHECKBOX_SPAN = 'buik-checkbox-span';

/* ------------------ Error Codes  ---------------------- */
export var ERROR_CODE_ITEM_NAME_INVALID = 'item_name_invalid';
export var ERROR_CODE_ITEM_NAME_TOO_LONG = 'item_name_too_long';
export var ERROR_CODE_ITEM_NAME_IN_USE = 'item_name_in_use';

/* ------------- Representation Hints  ------------------- */
var X_REP_HINT_BASE = '[3d][pdf][text][mp3]';
var X_REP_HINT_DOC_THUMBNAIL = '[jpg?dimensions=1024x1024&paged=false]';
var X_REP_HINT_IMAGE = '[jpg?dimensions=2048x2048,png?dimensions=2048x2048]';
var X_REP_HINT_VIDEO_DASH = '[dash,mp4][filmstrip]';
var X_REP_HINT_VIDEO_MP4 = '[mp4]';
var videoHint = canPlayDash() ? X_REP_HINT_VIDEO_DASH : X_REP_HINT_VIDEO_MP4;
export var X_REP_HINTS = '' + X_REP_HINT_BASE + X_REP_HINT_DOC_THUMBNAIL + X_REP_HINT_IMAGE + videoHint;