/**
 * 
 * @file Flow types
 * @author Box
 */
/* eslint-disable no-use-before-define */

import FolderAPI from './api/Folder';
import FileAPI from './api/File';
import WebLinkAPI from './api/WebLink';
import ChunkedUploadAPI from './api/ChunkedUpload';
import PlainUploadAPI from './api/PlainUpload';
import Cache from './util/Cache';
import { ACCESS_OPEN, ACCESS_COLLAB, ACCESS_COMPANY, VIEW_SEARCH, VIEW_FOLDER, VIEW_ERROR, VIEW_SELECTED, VIEW_RECENTS, VIEW_UPLOAD_EMPTY, VIEW_UPLOAD_IN_PROGRESS, VIEW_UPLOAD_SUCCESS, SORT_ASC, SORT_DESC, SORT_NAME, SORT_SIZE, SORT_DATE, TYPE_FILE, TYPE_FOLDER, TYPE_WEBLINK, STATUS_PENDING, STATUS_IN_PROGRESS, STATUS_COMPLETE, STATUS_ERROR, DELIMITER_SLASH, DELIMITER_CARET, SIZE_SMALL, SIZE_LARGE, FIELD_NAME, FIELD_MODIFIED_AT, FIELD_INTERACTED_AT, FIELD_SIZE, DEFAULT_VIEW_RECENTS, DEFAULT_VIEW_FILES } from './constants';