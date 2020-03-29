"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.claimEdges = claimEdges;

var _IndexReducer = require("./IndexReducer");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function claimEdges(state, action, reverse = false) {
  switch (action.type) {
    case "add_claimEdge":
    case "modify_claimEdge":
      {
        state = _objectSpread({}, state, {
          claimEdges: _objectSpread({}, state.claimEdges, {
            [action.dataId]: _objectSpread({}, state.claimEdges[action.dataId], {}, action.newData)
          })
        });
        state = (0, _IndexReducer.IndexReducer)(state, "claimEdgeIdsByChildId", action.newData.childId, action.dataId);
        state = (0, _IndexReducer.IndexReducer)(state, "claimEdgeIdsByParentId", action.newData.parentId, action.dataId);
        return state;
      }

    default:
      return state;
  }
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9yZXBvc2l0b3JpZXMvcmVkdWNlcnMvY2xhaW1FZGdlcy50cyJdLCJuYW1lcyI6WyJjbGFpbUVkZ2VzIiwic3RhdGUiLCJhY3Rpb24iLCJyZXZlcnNlIiwidHlwZSIsImRhdGFJZCIsIm5ld0RhdGEiLCJjaGlsZElkIiwicGFyZW50SWQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFFQTs7Ozs7Ozs7QUFFTyxTQUFTQSxVQUFULENBQW9CQyxLQUFwQixFQUFvQ0MsTUFBcEMsRUFBcURDLE9BQWdCLEdBQUcsS0FBeEUsRUFBd0Y7QUFDM0YsVUFBUUQsTUFBTSxDQUFDRSxJQUFmO0FBQ0ksU0FBSyxlQUFMO0FBQ0EsU0FBSyxrQkFBTDtBQUNJO0FBQ0lILFFBQUFBLEtBQUsscUJBQ0VBLEtBREY7QUFFREQsVUFBQUEsVUFBVSxvQkFDSEMsS0FBSyxDQUFDRCxVQURIO0FBRU4sYUFBQ0UsTUFBTSxDQUFDRyxNQUFSLHFCQUFxQkosS0FBSyxDQUFDRCxVQUFOLENBQWlCRSxNQUFNLENBQUNHLE1BQXhCLENBQXJCLE1BQXlESCxNQUFNLENBQUNJLE9BQWhFO0FBRk07QUFGVCxVQUFMO0FBUUFMLFFBQUFBLEtBQUssR0FBRyxnQ0FBYUEsS0FBYixFQUFvQix1QkFBcEIsRUFBNkNDLE1BQU0sQ0FBQ0ksT0FBUCxDQUFlQyxPQUE1RCxFQUFxRUwsTUFBTSxDQUFDRyxNQUE1RSxDQUFSO0FBQ0FKLFFBQUFBLEtBQUssR0FBRyxnQ0FBYUEsS0FBYixFQUFvQix3QkFBcEIsRUFBOENDLE1BQU0sQ0FBQ0ksT0FBUCxDQUFlRSxRQUE3RCxFQUF1RU4sTUFBTSxDQUFDRyxNQUE5RSxDQUFSO0FBRUEsZUFBT0osS0FBUDtBQUNIOztBQUNMO0FBQ0ksYUFBT0EsS0FBUDtBQWxCUjtBQW9CSCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGlBY3Rpb24gfSBmcm9tIFwiLi4vLi4vZGF0YU1vZGVscy9BY3Rpb25cIlxyXG5pbXBvcnQgeyBpUnNEYXRhIH0gZnJvbSBcIi4uLy4uL2RhdGFNb2RlbHMvUnNEYXRhXCJcclxuaW1wb3J0IHsgSW5kZXhSZWR1Y2VyIH0gZnJvbSBcIi4vSW5kZXhSZWR1Y2VyXCJcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBjbGFpbUVkZ2VzKHN0YXRlOiBpUnNEYXRhLCBhY3Rpb246IGlBY3Rpb24sIHJldmVyc2U6IGJvb2xlYW4gPSBmYWxzZSk6IGlSc0RhdGEge1xyXG4gICAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xyXG4gICAgICAgIGNhc2UgXCJhZGRfY2xhaW1FZGdlXCI6XHJcbiAgICAgICAgY2FzZSBcIm1vZGlmeV9jbGFpbUVkZ2VcIjpcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgc3RhdGUgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLi4uc3RhdGUsXHJcbiAgICAgICAgICAgICAgICAgICAgY2xhaW1FZGdlczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAuLi5zdGF0ZS5jbGFpbUVkZ2VzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBbYWN0aW9uLmRhdGFJZF06IHsuLi5zdGF0ZS5jbGFpbUVkZ2VzW2FjdGlvbi5kYXRhSWRdLCAuLi5hY3Rpb24ubmV3RGF0YX0sXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBcclxuXHJcbiAgICAgICAgICAgICAgICBzdGF0ZSA9IEluZGV4UmVkdWNlcihzdGF0ZSwgXCJjbGFpbUVkZ2VJZHNCeUNoaWxkSWRcIiwgYWN0aW9uLm5ld0RhdGEuY2hpbGRJZCwgYWN0aW9uLmRhdGFJZCk7XHJcbiAgICAgICAgICAgICAgICBzdGF0ZSA9IEluZGV4UmVkdWNlcihzdGF0ZSwgXCJjbGFpbUVkZ2VJZHNCeVBhcmVudElkXCIsIGFjdGlvbi5uZXdEYXRhLnBhcmVudElkLCBhY3Rpb24uZGF0YUlkKTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHN0YXRlIGFzIGlSc0RhdGFcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgIHJldHVybiBzdGF0ZVxyXG4gICAgfVxyXG59Il19