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
          items: _objectSpread({}, state.items, {
            [action.dataId]: _objectSpread({}, state.items[action.dataId], {}, action.newData)
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9yZXBvc2l0b3JpZXMvcmVkdWNlcnMvY2xhaW1FZGdlcy50cyJdLCJuYW1lcyI6WyJjbGFpbUVkZ2VzIiwic3RhdGUiLCJhY3Rpb24iLCJyZXZlcnNlIiwidHlwZSIsIml0ZW1zIiwiZGF0YUlkIiwibmV3RGF0YSIsImNoaWxkSWQiLCJwYXJlbnRJZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUVBOzs7Ozs7OztBQUVPLFNBQVNBLFVBQVQsQ0FBb0JDLEtBQXBCLEVBQW9DQyxNQUFwQyxFQUFxREMsT0FBZ0IsR0FBRyxLQUF4RSxFQUF3RjtBQUMzRixVQUFRRCxNQUFNLENBQUNFLElBQWY7QUFDSSxTQUFLLGVBQUw7QUFDQSxTQUFLLGtCQUFMO0FBQ0k7QUFDSUgsUUFBQUEsS0FBSyxxQkFDRUEsS0FERjtBQUVESSxVQUFBQSxLQUFLLG9CQUNFSixLQUFLLENBQUNJLEtBRFI7QUFFRCxhQUFDSCxNQUFNLENBQUNJLE1BQVIscUJBQXFCTCxLQUFLLENBQUNJLEtBQU4sQ0FBWUgsTUFBTSxDQUFDSSxNQUFuQixDQUFyQixNQUFvREosTUFBTSxDQUFDSyxPQUEzRDtBQUZDO0FBRkosVUFBTDtBQVFBTixRQUFBQSxLQUFLLEdBQUcsZ0NBQWFBLEtBQWIsRUFBb0IsdUJBQXBCLEVBQTZDQyxNQUFNLENBQUNLLE9BQVAsQ0FBZUMsT0FBNUQsRUFBcUVOLE1BQU0sQ0FBQ0ksTUFBNUUsQ0FBUjtBQUNBTCxRQUFBQSxLQUFLLEdBQUcsZ0NBQWFBLEtBQWIsRUFBb0Isd0JBQXBCLEVBQThDQyxNQUFNLENBQUNLLE9BQVAsQ0FBZUUsUUFBN0QsRUFBdUVQLE1BQU0sQ0FBQ0ksTUFBOUUsQ0FBUjtBQUVBLGVBQU9MLEtBQVA7QUFDSDs7QUFDTDtBQUNJLGFBQU9BLEtBQVA7QUFsQlI7QUFvQkgiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBpQWN0aW9uIH0gZnJvbSBcIi4uLy4uL2RhdGFNb2RlbHMvQWN0aW9uXCJcclxuaW1wb3J0IHsgaVJzRGF0YSB9IGZyb20gXCIuLi8uLi9kYXRhTW9kZWxzL1JzRGF0YVwiXHJcbmltcG9ydCB7IEluZGV4UmVkdWNlciB9IGZyb20gXCIuL0luZGV4UmVkdWNlclwiXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gY2xhaW1FZGdlcyhzdGF0ZTogaVJzRGF0YSwgYWN0aW9uOiBpQWN0aW9uLCByZXZlcnNlOiBib29sZWFuID0gZmFsc2UpOiBpUnNEYXRhIHtcclxuICAgIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcclxuICAgICAgICBjYXNlIFwiYWRkX2NsYWltRWRnZVwiOlxyXG4gICAgICAgIGNhc2UgXCJtb2RpZnlfY2xhaW1FZGdlXCI6XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHN0YXRlID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIC4uLnN0YXRlLFxyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW1zOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC4uLnN0YXRlLml0ZW1zLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBbYWN0aW9uLmRhdGFJZF06IHsuLi5zdGF0ZS5pdGVtc1thY3Rpb24uZGF0YUlkXSwgLi4uYWN0aW9uLm5ld0RhdGF9LFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gXHJcblxyXG4gICAgICAgICAgICAgICAgc3RhdGUgPSBJbmRleFJlZHVjZXIoc3RhdGUsIFwiY2xhaW1FZGdlSWRzQnlDaGlsZElkXCIsIGFjdGlvbi5uZXdEYXRhLmNoaWxkSWQsIGFjdGlvbi5kYXRhSWQpO1xyXG4gICAgICAgICAgICAgICAgc3RhdGUgPSBJbmRleFJlZHVjZXIoc3RhdGUsIFwiY2xhaW1FZGdlSWRzQnlQYXJlbnRJZFwiLCBhY3Rpb24ubmV3RGF0YS5wYXJlbnRJZCwgYWN0aW9uLmRhdGFJZCk7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIHJldHVybiBzdGF0ZSBhcyBpUnNEYXRhXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICByZXR1cm4gc3RhdGVcclxuICAgIH1cclxufSJdfQ==