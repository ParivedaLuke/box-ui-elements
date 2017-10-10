/**
 * 
 * @file Upload item progress component
 */

import React from 'react';
import ProgressBar from './ProgressBar';


var ItemProgress = function ItemProgress(_ref) {
    var progress = _ref.progress;
    return React.createElement(
        'div',
        { className: 'bcu-item-progress' },
        React.createElement(ProgressBar, { percent: progress }),
        React.createElement(
            'div',
            { className: 'bcu-progress-label' },
            progress,
            '%'
        )
    );
};

export default ItemProgress;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkl0ZW1Qcm9ncmVzcy5qcyJdLCJuYW1lcyI6WyJSZWFjdCIsIlByb2dyZXNzQmFyIiwiSXRlbVByb2dyZXNzIiwicHJvZ3Jlc3MiXSwibWFwcGluZ3MiOiJBQUFBOzs7OztBQUtBLE9BQU9BLEtBQVAsTUFBa0IsT0FBbEI7QUFDQSxPQUFPQyxXQUFQLE1BQXdCLGVBQXhCOzs7QUFPQSxJQUFNQyxlQUFlLFNBQWZBLFlBQWU7QUFBQSxRQUFHQyxRQUFILFFBQUdBLFFBQUg7QUFBQSxXQUNqQjtBQUFBO0FBQUEsVUFBSyxXQUFVLG1CQUFmO0FBQ0ksNEJBQUMsV0FBRCxJQUFhLFNBQVNBLFFBQXRCLEdBREo7QUFFSTtBQUFBO0FBQUEsY0FBSyxXQUFVLG9CQUFmO0FBQ0tBLG9CQURMO0FBQUE7QUFBQTtBQUZKLEtBRGlCO0FBQUEsQ0FBckI7O0FBUUEsZUFBZUQsWUFBZiIsImZpbGUiOiJJdGVtUHJvZ3Jlc3MuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQGZsb3dcclxuICogQGZpbGUgVXBsb2FkIGl0ZW0gcHJvZ3Jlc3MgY29tcG9uZW50XHJcbiAqL1xyXG5cclxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IFByb2dyZXNzQmFyIGZyb20gJy4vUHJvZ3Jlc3NCYXInO1xyXG5pbXBvcnQgJy4vSXRlbVByb2dyZXNzLnNjc3MnO1xyXG5cclxudHlwZSBQcm9wcyA9IHtcclxuICAgIHByb2dyZXNzOiBudW1iZXJcclxufTtcclxuXHJcbmNvbnN0IEl0ZW1Qcm9ncmVzcyA9ICh7IHByb2dyZXNzIH06IFByb3BzKSA9PlxyXG4gICAgPGRpdiBjbGFzc05hbWU9J2JjdS1pdGVtLXByb2dyZXNzJz5cclxuICAgICAgICA8UHJvZ3Jlc3NCYXIgcGVyY2VudD17cHJvZ3Jlc3N9IC8+XHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9J2JjdS1wcm9ncmVzcy1sYWJlbCc+XHJcbiAgICAgICAgICAgIHtwcm9ncmVzc30lXHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj47XHJcblxyXG5leHBvcnQgZGVmYXVsdCBJdGVtUHJvZ3Jlc3M7XHJcbiJdfQ==