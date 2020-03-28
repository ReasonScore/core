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
            [action.dataId]: action.newData
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9yZXBvc2l0b3JpZXMvcmVkdWNlcnMvY2xhaW1FZGdlcy50cyJdLCJuYW1lcyI6WyJjbGFpbUVkZ2VzIiwic3RhdGUiLCJhY3Rpb24iLCJyZXZlcnNlIiwidHlwZSIsImRhdGFJZCIsIm5ld0RhdGEiLCJjaGlsZElkIiwicGFyZW50SWQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFFQTs7Ozs7Ozs7QUFFTyxTQUFTQSxVQUFULENBQW9CQyxLQUFwQixFQUFvQ0MsTUFBcEMsRUFBcURDLE9BQWdCLEdBQUcsS0FBeEUsRUFBd0Y7QUFDM0YsVUFBUUQsTUFBTSxDQUFDRSxJQUFmO0FBQ0ksU0FBSyxlQUFMO0FBQ0EsU0FBSyxrQkFBTDtBQUNJO0FBQ0lILFFBQUFBLEtBQUsscUJBQ0VBLEtBREY7QUFFREQsVUFBQUEsVUFBVSxvQkFDSEMsS0FBSyxDQUFDRCxVQURIO0FBRU4sYUFBQ0UsTUFBTSxDQUFDRyxNQUFSLEdBQWlCSCxNQUFNLENBQUNJO0FBRmxCO0FBRlQsVUFBTDtBQVFBTCxRQUFBQSxLQUFLLEdBQUcsZ0NBQWFBLEtBQWIsRUFBb0IsdUJBQXBCLEVBQTZDQyxNQUFNLENBQUNJLE9BQVAsQ0FBZUMsT0FBNUQsRUFBcUVMLE1BQU0sQ0FBQ0csTUFBNUUsQ0FBUjtBQUNBSixRQUFBQSxLQUFLLEdBQUcsZ0NBQWFBLEtBQWIsRUFBb0Isd0JBQXBCLEVBQThDQyxNQUFNLENBQUNJLE9BQVAsQ0FBZUUsUUFBN0QsRUFBdUVOLE1BQU0sQ0FBQ0csTUFBOUUsQ0FBUjtBQUVBLGVBQU9KLEtBQVA7QUFDSDs7QUFDTDtBQUNJLGFBQU9BLEtBQVA7QUFsQlI7QUFvQkgiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBpQWN0aW9uIH0gZnJvbSBcIi4uLy4uL2RhdGFNb2RlbHMvQWN0aW9uXCJcclxuaW1wb3J0IHsgaVJzRGF0YSB9IGZyb20gXCIuLi8uLi9kYXRhTW9kZWxzL1JzRGF0YVwiXHJcbmltcG9ydCB7IEluZGV4UmVkdWNlciB9IGZyb20gXCIuL0luZGV4UmVkdWNlclwiXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gY2xhaW1FZGdlcyhzdGF0ZTogaVJzRGF0YSwgYWN0aW9uOiBpQWN0aW9uLCByZXZlcnNlOiBib29sZWFuID0gZmFsc2UpOiBpUnNEYXRhIHtcclxuICAgIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcclxuICAgICAgICBjYXNlIFwiYWRkX2NsYWltRWRnZVwiOlxyXG4gICAgICAgIGNhc2UgXCJtb2RpZnlfY2xhaW1FZGdlXCI6XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHN0YXRlID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIC4uLnN0YXRlLFxyXG4gICAgICAgICAgICAgICAgICAgIGNsYWltRWRnZXM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLi4uc3RhdGUuY2xhaW1FZGdlcyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgW2FjdGlvbi5kYXRhSWRdOiBhY3Rpb24ubmV3RGF0YSxcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IFxyXG5cclxuICAgICAgICAgICAgICAgIHN0YXRlID0gSW5kZXhSZWR1Y2VyKHN0YXRlLCBcImNsYWltRWRnZUlkc0J5Q2hpbGRJZFwiLCBhY3Rpb24ubmV3RGF0YS5jaGlsZElkLCBhY3Rpb24uZGF0YUlkKTtcclxuICAgICAgICAgICAgICAgIHN0YXRlID0gSW5kZXhSZWR1Y2VyKHN0YXRlLCBcImNsYWltRWRnZUlkc0J5UGFyZW50SWRcIiwgYWN0aW9uLm5ld0RhdGEucGFyZW50SWQsIGFjdGlvbi5kYXRhSWQpO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gc3RhdGUgYXMgaVJzRGF0YVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgcmV0dXJuIHN0YXRlXHJcbiAgICB9XHJcbn0iXX0=