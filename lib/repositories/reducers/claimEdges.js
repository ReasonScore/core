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
        return _objectSpread({}, state, {
          claimEdges: _objectSpread({}, state.claimEdges, {
            [action.dataId]: action.newData
          }),
          claimEdgeIdsByParentId: _objectSpread({}, state.claimEdgeIdsByParentId, {
            [action.newData.parentId]: [...state.claimEdgeIdsByParentId[action.newData.parentId], ...action.dataId]
          }),
          claimEdgeIdsByChildId: _objectSpread({}, state.claimEdgeIdsByChildId, {
            [action.newData.childId]: [...state.claimEdgeIdsByChildId[action.newData.childId], ...action.dataId]
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9yZXBvc2l0b3JpZXMvcmVkdWNlcnMvY2xhaW1FZGdlcy50cyJdLCJuYW1lcyI6WyJjbGFpbUVkZ2VzIiwic3RhdGUiLCJhY3Rpb24iLCJyZXZlcnNlIiwidHlwZSIsImRhdGFJZCIsIm5ld0RhdGEiLCJjbGFpbUVkZ2VJZHNCeVBhcmVudElkIiwicGFyZW50SWQiLCJjbGFpbUVkZ2VJZHNCeUNoaWxkSWQiLCJjaGlsZElkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBSU8sU0FBU0EsVUFBVCxDQUFvQkMsS0FBcEIsRUFBb0NDLE1BQXBDLEVBQXFEQyxPQUFnQixHQUFHLEtBQXhFLEVBQXdGO0FBQzNGLFVBQVFELE1BQU0sQ0FBQ0UsSUFBZjtBQUNJLFNBQUssZUFBTDtBQUNJO0FBQ0ksaUNBQ09ILEtBRFA7QUFFSUQsVUFBQUEsVUFBVSxvQkFDSEMsS0FBSyxDQUFDRCxVQURIO0FBRU4sYUFBQ0UsTUFBTSxDQUFDRyxNQUFSLEdBQWlCSCxNQUFNLENBQUNJO0FBRmxCLFlBRmQ7QUFNSUMsVUFBQUEsc0JBQXNCLG9CQUNmTixLQUFLLENBQUNNLHNCQURTO0FBRWxCLGFBQUNMLE1BQU0sQ0FBQ0ksT0FBUCxDQUFlRSxRQUFoQixHQUEyQixDQUN2QixHQUFHUCxLQUFLLENBQUNNLHNCQUFOLENBQTZCTCxNQUFNLENBQUNJLE9BQVAsQ0FBZUUsUUFBNUMsQ0FEb0IsRUFFdkIsR0FBR04sTUFBTSxDQUFDRyxNQUZhO0FBRlQsWUFOMUI7QUFhSUksVUFBQUEscUJBQXFCLG9CQUNkUixLQUFLLENBQUNRLHFCQURRO0FBRWpCLGFBQUNQLE1BQU0sQ0FBQ0ksT0FBUCxDQUFlSSxPQUFoQixHQUEwQixDQUN0QixHQUFHVCxLQUFLLENBQUNRLHFCQUFOLENBQTRCUCxNQUFNLENBQUNJLE9BQVAsQ0FBZUksT0FBM0MsQ0FEbUIsRUFFdEIsR0FBR1IsTUFBTSxDQUFDRyxNQUZZO0FBRlQ7QUFiekI7QUFxQkg7QUFDRDtBQUNBO0FBRUE7O0FBQ0o7QUFDSSxhQUFPSixLQUFQO0FBOUJSO0FBZ0NIIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgaUFjdGlvbiB9IGZyb20gXCIuLi8uLi9kYXRhTW9kZWxzL0FjdGlvblwiXHJcbmltcG9ydCB7IGlSc0RhdGEgfSBmcm9tIFwiLi4vLi4vZGF0YU1vZGVscy9Sc0RhdGFcIlxyXG5pbXBvcnQgeyBDbGFpbUVkZ2UgfSBmcm9tIFwiLi4vLi4vZGF0YU1vZGVscy9DbGFpbUVkZ2VcIlxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGNsYWltRWRnZXMoc3RhdGU6IGlSc0RhdGEsIGFjdGlvbjogaUFjdGlvbiwgcmV2ZXJzZTogYm9vbGVhbiA9IGZhbHNlKTogaVJzRGF0YSB7XHJcbiAgICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XHJcbiAgICAgICAgY2FzZSBcImFkZF9jbGFpbUVkZ2VcIjpcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICAuLi5zdGF0ZSxcclxuICAgICAgICAgICAgICAgICAgICBjbGFpbUVkZ2VzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC4uLnN0YXRlLmNsYWltRWRnZXMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFthY3Rpb24uZGF0YUlkXTogYWN0aW9uLm5ld0RhdGEsXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBjbGFpbUVkZ2VJZHNCeVBhcmVudElkOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC4uLnN0YXRlLmNsYWltRWRnZUlkc0J5UGFyZW50SWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFthY3Rpb24ubmV3RGF0YS5wYXJlbnRJZF06IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC4uLnN0YXRlLmNsYWltRWRnZUlkc0J5UGFyZW50SWRbYWN0aW9uLm5ld0RhdGEucGFyZW50SWRdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLi4uYWN0aW9uLmRhdGFJZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBjbGFpbUVkZ2VJZHNCeUNoaWxkSWQ6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLi4uc3RhdGUuY2xhaW1FZGdlSWRzQnlDaGlsZElkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBbYWN0aW9uLm5ld0RhdGEuY2hpbGRJZF06IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC4uLnN0YXRlLmNsYWltRWRnZUlkc0J5Q2hpbGRJZFthY3Rpb24ubmV3RGF0YS5jaGlsZElkXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC4uLmFjdGlvbi5kYXRhSWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gYXMgaVJzRGF0YVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIFRPRE86IEhhbmRsZSBtb2RpZnlfY2xhaW1FZGdlXHJcbiAgICAgICAgICAgIC8vIENoZWNrIHRvIHNlZSBpZiB0aGUgcGFyZW50IG9yIGNoaWxkIGNoYW5nZXMsIElmIHNvLCBkZWxldGUgdGhlIHJlZmVyZW5jZSBhbmQgYWRkIHRoZSBuZXcgb25lXHJcblxyXG4gICAgICAgICAgICAvLyBUT0RPOiBIYW5kbGUgcmV2ZXJzZSAoT3Igc2F2ZSBzdGF0ZSBzb21ld2hlcmUsIHdvdWxkIHRoYXQgYmUgdG9vIGxhcmdlPylcclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICByZXR1cm4gc3RhdGVcclxuICAgIH1cclxufSJdfQ==