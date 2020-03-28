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
    case "modify_claimEdge":
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
    // TODO: Handle reverse (Or save state somewhere, would that be too large?)

    default:
      return state;
  }
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9yZXBvc2l0b3JpZXMvcmVkdWNlcnMvY2xhaW1FZGdlcy50cyJdLCJuYW1lcyI6WyJjbGFpbUVkZ2VzIiwic3RhdGUiLCJhY3Rpb24iLCJyZXZlcnNlIiwidHlwZSIsImNsYWltRWRnZUlkc0J5UGFyZW50SWQiLCJuZXdEYXRhIiwicGFyZW50SWQiLCJjbGFpbUVkZ2VJZHNCeUNoaWxkSWQiLCJjaGlsZElkIiwiZGF0YUlkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBR08sU0FBU0EsVUFBVCxDQUFvQkMsS0FBcEIsRUFBb0NDLE1BQXBDLEVBQXFEQyxPQUFnQixHQUFHLEtBQXhFLEVBQXdGO0FBQzNGLFVBQVFELE1BQU0sQ0FBQ0UsSUFBZjtBQUNJLFNBQUssZUFBTDtBQUNBLFNBQUssa0JBQUw7QUFDSTtBQUNJO0FBQ0EsWUFBSSxDQUFDSCxLQUFLLENBQUNJLHNCQUFOLENBQTZCSCxNQUFNLENBQUNJLE9BQVAsQ0FBZUMsUUFBNUMsQ0FBTCxFQUE0RDtBQUN4RE4sVUFBQUEsS0FBSyxDQUFDSSxzQkFBTixDQUE2QkgsTUFBTSxDQUFDSSxPQUFQLENBQWVDLFFBQTVDLElBQXdELEVBQXhEO0FBQ0g7O0FBQ0QsWUFBSSxDQUFDTixLQUFLLENBQUNPLHFCQUFOLENBQTRCTixNQUFNLENBQUNJLE9BQVAsQ0FBZUcsT0FBM0MsQ0FBTCxFQUEwRDtBQUN0RFIsVUFBQUEsS0FBSyxDQUFDTyxxQkFBTixDQUE0Qk4sTUFBTSxDQUFDSSxPQUFQLENBQWVHLE9BQTNDLElBQXNELEVBQXREO0FBQ0g7O0FBRUQsaUNBQ09SLEtBRFA7QUFFSUQsVUFBQUEsVUFBVSxvQkFDSEMsS0FBSyxDQUFDRCxVQURIO0FBRU4sYUFBQ0UsTUFBTSxDQUFDUSxNQUFSLEdBQWlCUixNQUFNLENBQUNJO0FBRmxCLFlBRmQ7QUFNSUQsVUFBQUEsc0JBQXNCLG9CQUNmSixLQUFLLENBQUNJLHNCQURTO0FBRWxCLGFBQUNILE1BQU0sQ0FBQ0ksT0FBUCxDQUFlQyxRQUFoQixHQUEyQixDQUN2QixHQUFHTixLQUFLLENBQUNJLHNCQUFOLENBQTZCSCxNQUFNLENBQUNJLE9BQVAsQ0FBZUMsUUFBNUMsQ0FEb0IsRUFFdkJMLE1BQU0sQ0FBQ1EsTUFGZ0I7QUFGVCxZQU4xQjtBQWFJRixVQUFBQSxxQkFBcUIsb0JBQ2RQLEtBQUssQ0FBQ08scUJBRFE7QUFFakIsYUFBQ04sTUFBTSxDQUFDSSxPQUFQLENBQWVHLE9BQWhCLEdBQTBCLENBQ3RCLEdBQUdSLEtBQUssQ0FBQ08scUJBQU4sQ0FBNEJOLE1BQU0sQ0FBQ0ksT0FBUCxDQUFlRyxPQUEzQyxDQURtQixFQUV0QlAsTUFBTSxDQUFDUSxNQUZlO0FBRlQ7QUFiekI7QUFxQkg7QUFFTDs7QUFDQTtBQUNJLGFBQU9ULEtBQVA7QUFyQ1I7QUF1Q0giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBpQWN0aW9uIH0gZnJvbSBcIi4uLy4uL2RhdGFNb2RlbHMvQWN0aW9uXCJcclxuaW1wb3J0IHsgaVJzRGF0YSB9IGZyb20gXCIuLi8uLi9kYXRhTW9kZWxzL1JzRGF0YVwiXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gY2xhaW1FZGdlcyhzdGF0ZTogaVJzRGF0YSwgYWN0aW9uOiBpQWN0aW9uLCByZXZlcnNlOiBib29sZWFuID0gZmFsc2UpOiBpUnNEYXRhIHtcclxuICAgIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcclxuICAgICAgICBjYXNlIFwiYWRkX2NsYWltRWRnZVwiOlxyXG4gICAgICAgIGNhc2UgXCJtb2RpZnlfY2xhaW1FZGdlXCI6XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIC8vQWRkIGFueSBtaXNzaW5nIGFycmF5c1xyXG4gICAgICAgICAgICAgICAgaWYgKCFzdGF0ZS5jbGFpbUVkZ2VJZHNCeVBhcmVudElkW2FjdGlvbi5uZXdEYXRhLnBhcmVudElkXSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHN0YXRlLmNsYWltRWRnZUlkc0J5UGFyZW50SWRbYWN0aW9uLm5ld0RhdGEucGFyZW50SWRdID0gW11cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmICghc3RhdGUuY2xhaW1FZGdlSWRzQnlDaGlsZElkW2FjdGlvbi5uZXdEYXRhLmNoaWxkSWRdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RhdGUuY2xhaW1FZGdlSWRzQnlDaGlsZElkW2FjdGlvbi5uZXdEYXRhLmNoaWxkSWRdID0gW11cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgIC4uLnN0YXRlLFxyXG4gICAgICAgICAgICAgICAgICAgIGNsYWltRWRnZXM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLi4uc3RhdGUuY2xhaW1FZGdlcyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgW2FjdGlvbi5kYXRhSWRdOiBhY3Rpb24ubmV3RGF0YSxcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGNsYWltRWRnZUlkc0J5UGFyZW50SWQ6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLi4uc3RhdGUuY2xhaW1FZGdlSWRzQnlQYXJlbnRJZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgW2FjdGlvbi5uZXdEYXRhLnBhcmVudElkXTogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLi4uc3RhdGUuY2xhaW1FZGdlSWRzQnlQYXJlbnRJZFthY3Rpb24ubmV3RGF0YS5wYXJlbnRJZF0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb24uZGF0YUlkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGNsYWltRWRnZUlkc0J5Q2hpbGRJZDoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAuLi5zdGF0ZS5jbGFpbUVkZ2VJZHNCeUNoaWxkSWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFthY3Rpb24ubmV3RGF0YS5jaGlsZElkXTogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLi4uc3RhdGUuY2xhaW1FZGdlSWRzQnlDaGlsZElkW2FjdGlvbi5uZXdEYXRhLmNoaWxkSWRdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uLmRhdGFJZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBhcyBpUnNEYXRhXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gVE9ETzogSGFuZGxlIHJldmVyc2UgKE9yIHNhdmUgc3RhdGUgc29tZXdoZXJlLCB3b3VsZCB0aGF0IGJlIHRvbyBsYXJnZT8pXHJcbiAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgcmV0dXJuIHN0YXRlXHJcbiAgICB9XHJcbn0iXX0=