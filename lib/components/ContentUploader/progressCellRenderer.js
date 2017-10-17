/**
 * 
 * @file Function to render the progress table cell
 */

import React from 'react';
import ItemProgress from './ItemProgress';
import { STATUS_PENDING } from '../../constants';


export default (function () {
  return function (_ref) {
    var rowData = _ref.rowData;
    return rowData.status !== STATUS_PENDING ? React.createElement(ItemProgress, rowData) : null;
  };
});