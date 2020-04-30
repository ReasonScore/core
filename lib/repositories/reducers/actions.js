"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.actions = actions;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function actions(state, action) {
  return _objectSpread(_objectSpread({}, state), {}, {
    actionsLog: [...action, ...state.actionsLog]
  });
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9yZXBvc2l0b3JpZXMvcmVkdWNlcnMvYWN0aW9ucy50cyJdLCJuYW1lcyI6WyJhY3Rpb25zIiwic3RhdGUiLCJhY3Rpb24iLCJhY3Rpb25zTG9nIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBR08sU0FBU0EsT0FBVCxDQUFpQkMsS0FBakIsRUFBZ0NDLE1BQWhDLEVBQTBEO0FBQzdELHlDQUNPRCxLQURQO0FBRUlFLElBQUFBLFVBQVUsRUFBRSxDQUFDLEdBQUdELE1BQUosRUFDWixHQUFHRCxLQUFLLENBQUNFLFVBREc7QUFGaEI7QUFNSCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFjdGlvbiB9IGZyb20gXCIuLi8uLi9kYXRhTW9kZWxzL0FjdGlvblwiXHJcbmltcG9ydCB7IFJzRGF0YSB9IGZyb20gXCIuLi8uLi9kYXRhTW9kZWxzL1JzRGF0YVwiXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gYWN0aW9ucyhzdGF0ZTogUnNEYXRhLCBhY3Rpb246IEFjdGlvbltdKTogUnNEYXRhIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgLi4uc3RhdGUsXHJcbiAgICAgICAgYWN0aW9uc0xvZzogWy4uLmFjdGlvbixcclxuICAgICAgICAuLi5zdGF0ZS5hY3Rpb25zTG9nXHJcbiAgICAgICAgXVxyXG4gICAgfSBhcyBSc0RhdGFcclxufSJdfQ==