"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.claimEdges = claimEdges;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function claimEdges(state, action, reverse = false) {
  switch (action.type) {
    case "add_claimEdge":
      {
        //Add any missing arrays
        if (!state.claimEdgeIdsByParentId[action.newData.parentId]) {
          state.claimEdgeIdsByParentId[action.newData.parentId] = [];
        }

        if (!state.claimEdgeIdsByChildId[action.newData.childId]) {
          state.claimEdgeIdsByChildId[action.newData.childId] = [];
        }

        return _objectSpread({}, state, {
          claimEdges: _objectSpread({}, state.claimEdges, {
            [action.dataId]: action.newData
          }),
          claimEdgeIdsByParentId: _objectSpread({}, state.claimEdgeIdsByParentId, {
            [action.newData.parentId]: [...state.claimEdgeIdsByParentId[action.newData.parentId], action.dataId]
          }),
          claimEdgeIdsByChildId: _objectSpread({}, state.claimEdgeIdsByChildId, {
            [action.newData.childId]: [...state.claimEdgeIdsByChildId[action.newData.childId], action.dataId]
          })
        });
      }
    // TODO: Handle modify_claimEdge
    // Check to see if the parent or child changes, If so, delete the reference and add the new one
    // TODO: Handle reverse (Or save state somewhere, would that be too large?)

    default:
      return state;
  }
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9yZXBvc2l0b3JpZXMvcmVkdWNlcnMvY2xhaW1FZGdlcy50cyJdLCJuYW1lcyI6WyJjbGFpbUVkZ2VzIiwic3RhdGUiLCJhY3Rpb24iLCJyZXZlcnNlIiwidHlwZSIsImNsYWltRWRnZUlkc0J5UGFyZW50SWQiLCJuZXdEYXRhIiwicGFyZW50SWQiLCJjbGFpbUVkZ2VJZHNCeUNoaWxkSWQiLCJjaGlsZElkIiwiZGF0YUlkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBR08sU0FBU0EsVUFBVCxDQUFvQkMsS0FBcEIsRUFBb0NDLE1BQXBDLEVBQXFEQyxPQUFnQixHQUFHLEtBQXhFLEVBQXdGO0FBQzNGLFVBQVFELE1BQU0sQ0FBQ0UsSUFBZjtBQUNJLFNBQUssZUFBTDtBQUNJO0FBQ0k7QUFDQSxZQUFJLENBQUVILEtBQUssQ0FBQ0ksc0JBQU4sQ0FBNkJILE1BQU0sQ0FBQ0ksT0FBUCxDQUFlQyxRQUE1QyxDQUFOLEVBQTREO0FBQ3hETixVQUFBQSxLQUFLLENBQUNJLHNCQUFOLENBQTZCSCxNQUFNLENBQUNJLE9BQVAsQ0FBZUMsUUFBNUMsSUFBd0QsRUFBeEQ7QUFDSDs7QUFDRCxZQUFJLENBQUVOLEtBQUssQ0FBQ08scUJBQU4sQ0FBNEJOLE1BQU0sQ0FBQ0ksT0FBUCxDQUFlRyxPQUEzQyxDQUFOLEVBQTBEO0FBQ3REUixVQUFBQSxLQUFLLENBQUNPLHFCQUFOLENBQTRCTixNQUFNLENBQUNJLE9BQVAsQ0FBZUcsT0FBM0MsSUFBc0QsRUFBdEQ7QUFDSDs7QUFFRCxpQ0FDT1IsS0FEUDtBQUVJRCxVQUFBQSxVQUFVLG9CQUNIQyxLQUFLLENBQUNELFVBREg7QUFFTixhQUFDRSxNQUFNLENBQUNRLE1BQVIsR0FBaUJSLE1BQU0sQ0FBQ0k7QUFGbEIsWUFGZDtBQU1JRCxVQUFBQSxzQkFBc0Isb0JBQ2ZKLEtBQUssQ0FBQ0ksc0JBRFM7QUFFbEIsYUFBQ0gsTUFBTSxDQUFDSSxPQUFQLENBQWVDLFFBQWhCLEdBQTJCLENBQ3ZCLEdBQUdOLEtBQUssQ0FBQ0ksc0JBQU4sQ0FBNkJILE1BQU0sQ0FBQ0ksT0FBUCxDQUFlQyxRQUE1QyxDQURvQixFQUV2QkwsTUFBTSxDQUFDUSxNQUZnQjtBQUZULFlBTjFCO0FBYUlGLFVBQUFBLHFCQUFxQixvQkFDZFAsS0FBSyxDQUFDTyxxQkFEUTtBQUVqQixhQUFDTixNQUFNLENBQUNJLE9BQVAsQ0FBZUcsT0FBaEIsR0FBMEIsQ0FDdEIsR0FBR1IsS0FBSyxDQUFDTyxxQkFBTixDQUE0Qk4sTUFBTSxDQUFDSSxPQUFQLENBQWVHLE9BQTNDLENBRG1CLEVBRXRCUCxNQUFNLENBQUNRLE1BRmU7QUFGVDtBQWJ6QjtBQXFCSDtBQUNEO0FBQ0E7QUFFQTs7QUFDSjtBQUNJLGFBQU9ULEtBQVA7QUF0Q1I7QUF3Q0giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBpQWN0aW9uIH0gZnJvbSBcIi4uLy4uL2RhdGFNb2RlbHMvQWN0aW9uXCJcclxuaW1wb3J0IHsgaVJzRGF0YSB9IGZyb20gXCIuLi8uLi9kYXRhTW9kZWxzL1JzRGF0YVwiXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gY2xhaW1FZGdlcyhzdGF0ZTogaVJzRGF0YSwgYWN0aW9uOiBpQWN0aW9uLCByZXZlcnNlOiBib29sZWFuID0gZmFsc2UpOiBpUnNEYXRhIHtcclxuICAgIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcclxuICAgICAgICBjYXNlIFwiYWRkX2NsYWltRWRnZVwiOlxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAvL0FkZCBhbnkgbWlzc2luZyBhcnJheXNcclxuICAgICAgICAgICAgICAgIGlmICghIHN0YXRlLmNsYWltRWRnZUlkc0J5UGFyZW50SWRbYWN0aW9uLm5ld0RhdGEucGFyZW50SWRdKXtcclxuICAgICAgICAgICAgICAgICAgICBzdGF0ZS5jbGFpbUVkZ2VJZHNCeVBhcmVudElkW2FjdGlvbi5uZXdEYXRhLnBhcmVudElkXSA9IFtdXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoISBzdGF0ZS5jbGFpbUVkZ2VJZHNCeUNoaWxkSWRbYWN0aW9uLm5ld0RhdGEuY2hpbGRJZF0pe1xyXG4gICAgICAgICAgICAgICAgICAgIHN0YXRlLmNsYWltRWRnZUlkc0J5Q2hpbGRJZFthY3Rpb24ubmV3RGF0YS5jaGlsZElkXSA9IFtdXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLi4uc3RhdGUsXHJcbiAgICAgICAgICAgICAgICAgICAgY2xhaW1FZGdlczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAuLi5zdGF0ZS5jbGFpbUVkZ2VzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBbYWN0aW9uLmRhdGFJZF06IGFjdGlvbi5uZXdEYXRhLFxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgY2xhaW1FZGdlSWRzQnlQYXJlbnRJZDoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAuLi5zdGF0ZS5jbGFpbUVkZ2VJZHNCeVBhcmVudElkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBbYWN0aW9uLm5ld0RhdGEucGFyZW50SWRdOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuLi5zdGF0ZS5jbGFpbUVkZ2VJZHNCeVBhcmVudElkW2FjdGlvbi5uZXdEYXRhLnBhcmVudElkXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbi5kYXRhSWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgY2xhaW1FZGdlSWRzQnlDaGlsZElkOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC4uLnN0YXRlLmNsYWltRWRnZUlkc0J5Q2hpbGRJZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgW2FjdGlvbi5uZXdEYXRhLmNoaWxkSWRdOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuLi5zdGF0ZS5jbGFpbUVkZ2VJZHNCeUNoaWxkSWRbYWN0aW9uLm5ld0RhdGEuY2hpbGRJZF0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb24uZGF0YUlkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IGFzIGlSc0RhdGFcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBUT0RPOiBIYW5kbGUgbW9kaWZ5X2NsYWltRWRnZVxyXG4gICAgICAgICAgICAvLyBDaGVjayB0byBzZWUgaWYgdGhlIHBhcmVudCBvciBjaGlsZCBjaGFuZ2VzLCBJZiBzbywgZGVsZXRlIHRoZSByZWZlcmVuY2UgYW5kIGFkZCB0aGUgbmV3IG9uZVxyXG5cclxuICAgICAgICAgICAgLy8gVE9ETzogSGFuZGxlIHJldmVyc2UgKE9yIHNhdmUgc3RhdGUgc29tZXdoZXJlLCB3b3VsZCB0aGF0IGJlIHRvbyBsYXJnZT8pXHJcbiAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgcmV0dXJuIHN0YXRlXHJcbiAgICB9XHJcbn0iXX0=