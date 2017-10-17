/**
 * 
 * @file Determines the file icon
 * @author Box
 */

import React from 'react';
import IconFileAudio from './IconFileAudio';
import IconFileBookmark from './IconFileBookmark';
import IconFileBoxNote from './IconFileBoxNote';
import IconFileCode from './IconFileCode';
import IconFileDefault from './IconFileDefault';
import IconFileDocument from './IconFileDocument';
import IconFileIllustrator from './IconFileIllustrator';
import IconFileImage from './IconFileImage';
import IconFileIndesign from './IconFileIndesign';
import IconFilePDF from './IconFilePDF';
import IconFilePhotoshop from './IconFilePhotoshop';
import IconFilePresentation from './IconFilePresentation';
import IconFileSpreadsheet from './IconFileSpreadsheet';
import IconFileText from './IconFileText';
import IconFileThreeD from './IconFileThreeD';
import IconFileVector from './IconFileVector';
import IconFileVideo from './IconFileVideo';
import IconFileZip from './IconFileZip';

var Components = {
    IconFileAudio: IconFileAudio,
    IconFileBookmark: IconFileBookmark,
    IconFileBoxNote: IconFileBoxNote,
    IconFileCode: IconFileCode,
    IconFileDefault: IconFileDefault,
    IconFileDocument: IconFileDocument,
    IconFileIllustrator: IconFileIllustrator,
    IconFileImage: IconFileImage,
    IconFileIndesign: IconFileIndesign,
    IconFilePDF: IconFilePDF,
    IconFilePhotoshop: IconFilePhotoshop,
    IconFilePresentation: IconFilePresentation,
    IconFileSpreadsheet: IconFileSpreadsheet,
    IconFileText: IconFileText,
    IconFileThreeD: IconFileThreeD,
    IconFileVector: IconFileVector,
    IconFileVideo: IconFileVideo,
    IconFileZip: IconFileZip
};

var mirror = function mirror(values) {
    return values.reduce(function (prev, cur) {
        prev[cur] = cur;
        return prev;
    }, {});
};

var EXTENSIONS = {
    IconFileAudio: mirror(['aac', 'aif', 'aifc', 'aiff', 'amr', 'au', 'flac', 'm3u', 'm4a', 'mid', 'mp3', 'ra', 'wav', 'wma', 'wpl']),
    IconFileBoxNote: mirror(['boxnote']),
    IconFileCode: mirror(['as', 'as3', 'asm', 'aspx', 'c', 'cpp', 'bat', 'c', 'cc', 'cmake', 'cs', 'css', 'cxx', 'db', 'diff', 'erb', 'groovy', 'h', 'haml', 'hh', 'htm', 'html', 'java', 'js', 'less', 'm', 'make', 'md', 'ml', 'mm', 'php', 'pl', 'plist', 'properties', 'py', 'rb', 'sass', 'scala', 'script', 'scm', 'sml', 'sql', 'sh', 'wabba', 'yaml']),
    IconFileDocument: mirror(['csv', 'doc', 'docx', 'dot', 'dotx', 'gdoc', 'msg', 'odt', 'rtf', 'tsv', 'wpd', 'xhtml', 'xml', 'xsd', 'xsl']),
    IconFileVector: mirror(['eps']),
    IconFileIllustrator: mirror(['svg', 'ai']),
    IconFileIndesign: mirror(['indd']),
    IconFileImage: mirror(['bmp', 'gif', 'eps', 'gdraw', 'jpeg', 'jpg', 'png', 'ps', 'svs', 'tif', 'tiff', 'ai', 'eps', 'ps']),
    IconFileBookmark: mirror(['link']),
    IconFilePDF: mirror(['pdf']),
    IconFilePresentation: mirror(['gslide', 'key', 'odp', 'otp', 'pot', 'potx', 'ppt', 'pptx']),
    IconFilePhotoshop: mirror(['psd']),
    IconFileSpreadsheet: mirror(['gsheet', 'ods', 'xls', 'xlsm', 'xlsx', 'xlt', 'xltx']),
    IconFileText: mirror(['txt', 'vi', 'vim', 'webdoc']),
    IconFileThreeD: mirror(['3ds', 'dae', 'fbx', 'obj', 'ply', 'stl']),
    IconFileVideo: mirror(['3g2', '3gp', 'avi', 'flv', 'm2v', 'm2ts', 'm4v', 'mkv', 'mov', 'mp4', 'mpeg', 'mpg', 'ogg', 'mts', 'qt', 'wmv']),
    IconFileZip: mirror(['rar', 'tgz', 'zip'])
};

var getFileIconComponent = function getFileIconComponent(extension) {
    var extensionComponentName = Object.keys(EXTENSIONS).filter(function (extensionComponent) {
        return !!EXTENSIONS[extensionComponent][extension];
    })[0];
    return extensionComponentName || 'IconFileDefault';
};

var FileIcon = function FileIcon(_ref) {
    var _ref$extension = _ref.extension,
        extension = _ref$extension === undefined ? '' : _ref$extension,
        _ref$dimension = _ref.dimension,
        dimension = _ref$dimension === undefined ? 32 : _ref$dimension;

    var IconComponent = Components[getFileIconComponent(extension)];
    return React.createElement(IconComponent, { height: dimension, width: dimension });
};

export default FileIcon;