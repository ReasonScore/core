"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.actions = actions;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function actions(state, action) {
  return _objectSpread({}, state, {
    actionsLog: [...action, ...state.actionsLog]
  });
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9yZXBvc2l0b3JpZXMvcmVkdWNlcnMvYWN0aW9ucy50cyJdLCJuYW1lcyI6WyJhY3Rpb25zIiwic3RhdGUiLCJhY3Rpb24iLCJhY3Rpb25zTG9nIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBR08sU0FBU0EsT0FBVCxDQUFpQkMsS0FBakIsRUFBaUNDLE1BQWpDLEVBQTZEO0FBQ2hFLDJCQUNPRCxLQURQO0FBRUlFLElBQUFBLFVBQVUsRUFBRSxDQUFDLEdBQUdELE1BQUosRUFDWixHQUFHRCxLQUFLLENBQUNFLFVBREc7QUFGaEI7QUFNSCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGlBY3Rpb24gfSBmcm9tIFwiLi4vLi4vZGF0YU1vZGVscy9BY3Rpb25cIlxyXG5pbXBvcnQgeyBpUnNEYXRhIH0gZnJvbSBcIi4uLy4uL2RhdGFNb2RlbHMvUnNEYXRhXCJcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBhY3Rpb25zKHN0YXRlOiBpUnNEYXRhLCBhY3Rpb246IGlBY3Rpb25bXSk6IGlSc0RhdGEge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICAuLi5zdGF0ZSxcclxuICAgICAgICBhY3Rpb25zTG9nOiBbLi4uYWN0aW9uLFxyXG4gICAgICAgIC4uLnN0YXRlLmFjdGlvbnNMb2dcclxuICAgICAgICBdXHJcbiAgICB9IGFzIGlSc0RhdGFcclxufSJdfQ==