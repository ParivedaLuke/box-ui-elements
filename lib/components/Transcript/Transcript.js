/**
 * 
 * @file Transcript component
 * @author Box
 */

import React from 'react';
import { Table, Column } from 'react-virtualized/dist/es/Table';
import AutoSizer from 'react-virtualized/dist/es/AutoSizer';
import { CellMeasurer, CellMeasurerCache } from 'react-virtualized/dist/es/CellMeasurer';

import { formatTime } from '../../util/datetime';


var cache = new CellMeasurerCache({
    minHeight: 10,
    fixedWidth: true
});

var isValidStartTime = function isValidStartTime(cellData) {
    return Array.isArray(cellData) && !!cellData[0] && typeof cellData[0].start === 'number';
};

var Transcript = function Transcript(_ref) {
    var entries = _ref.skill.entries,
        getPreviewer = _ref.getPreviewer;
    return entries.length === 1 && !isValidStartTime(entries[0].appears) ? React.createElement(
        'span',
        { className: 'buik-transcript' },
        entries[0].text
    ) : React.createElement(
        AutoSizer,
        { disableHeight: true },
        function (_ref2) {
            var width = _ref2.width;
            return React.createElement(
                Table,
                {
                    width: width,
                    height: 300,
                    disableHeader: true,
                    headerHeight: 0,
                    rowHeight: cache.rowHeight,
                    rowCount: entries.length,
                    rowGetter: function rowGetter(_ref3) {
                        var index = _ref3.index;
                        return entries[index];
                    },
                    className: 'buik-transcript',
                    deferredMeasurementCache: cache,
                    onRowClick: function onRowClick(_ref4) {
                        var rowData = _ref4.rowData;

                        var viewer = getPreviewer ? getPreviewer() : null;
                        var cellData = rowData.appears;
                        if (isValidStartTime(cellData) && viewer && viewer.isLoaded() && !viewer.isDestroyed() && typeof viewer.play === 'function') {
                            // $FlowFixMe Already checked above
                            var start = cellData[0].start;

                            viewer.play(start);
                        }
                    }
                },
                React.createElement(Column, {
                    dataKey: 'appears',
                    width: 60,
                    flexShrink: 0,
                    className: 'buik-transcript-time-column',
                    cellRenderer: function cellRenderer(_ref5) {
                        var cellData = _ref5.cellData;
                        return isValidStartTime(cellData) ? formatTime(cellData[0].start) : '--';
                    }
                }),
                React.createElement(Column, {
                    dataKey: 'text',
                    width: 230,
                    flexGrow: 1,
                    cellRenderer: function cellRenderer(_ref6) {
                        var dataKey = _ref6.dataKey,
                            parent = _ref6.parent,
                            rowIndex = _ref6.rowIndex,
                            cellData = _ref6.cellData;
                        return React.createElement(
                            CellMeasurer,
                            {
                                cache: cache,
                                columnIndex: 0,
                                key: dataKey,
                                parent: parent,
                                rowIndex: rowIndex
                            },
                            React.createElement(
                                'div',
                                {
                                    className: 'buik-transcript-column',
                                    style: {
                                        whiteSpace: 'normal'
                                    }
                                },
                                (cellData || '').replace(/\r?\n|\r/g, '')
                            )
                        );
                    }
                })
            );
        }
    );
};

export default Transcript;