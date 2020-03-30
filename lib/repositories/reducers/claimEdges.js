"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.claimEdges = claimEdges;
exports.IndexDelete = IndexDelete;

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

    case "delete_claimEdge":
      {
        const claimEdge = state.items[action.dataId]; //TODO: Check that I'm not deleting anythign I shouldn't or deleting something twice?
        //TODO: Probably comment what this is doing

        delete state.items[action.dataId];
        state = IndexDelete(state, state.claimEdgeIdsByChildId, claimEdge.childId, action.dataId);
        state = IndexDelete(state, state.claimEdgeIdsByParentId, claimEdge.parentId, action.dataId);
        const scoreIds = state.scoreIdsBySourceId[action.dataId];

        for (const scoreId of scoreIds) {
          const score = state.items[scoreId];
          delete state.items[scoreId];
          delete state.scoreIdsBySourceId[action.dataId];
          delete state.childIdsByScoreId[scoreId];

          if (score.parentScoreId) {
            state = IndexDelete(state, state.childIdsByScoreId, score.parentScoreId, scoreId);
          }

          state = IndexDelete(state, state.scoreIdsBySourceId, score.sourceClaimId, scoreId);
        }

        debugger;
        return state;
      }

    default:
      return state;
  }
}

function IndexDelete(state, index, keyId, id) {
  const internalIndex = index[keyId];
  const location = internalIndex.indexOf(id, 0);

  if (location > -1) {
    internalIndex.splice(location, 1);
  }

  return state;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9yZXBvc2l0b3JpZXMvcmVkdWNlcnMvY2xhaW1FZGdlcy50cyJdLCJuYW1lcyI6WyJjbGFpbUVkZ2VzIiwic3RhdGUiLCJhY3Rpb24iLCJyZXZlcnNlIiwidHlwZSIsIml0ZW1zIiwiZGF0YUlkIiwibmV3RGF0YSIsImNoaWxkSWQiLCJwYXJlbnRJZCIsImNsYWltRWRnZSIsIkluZGV4RGVsZXRlIiwiY2xhaW1FZGdlSWRzQnlDaGlsZElkIiwiY2xhaW1FZGdlSWRzQnlQYXJlbnRJZCIsInNjb3JlSWRzIiwic2NvcmVJZHNCeVNvdXJjZUlkIiwic2NvcmVJZCIsInNjb3JlIiwiY2hpbGRJZHNCeVNjb3JlSWQiLCJwYXJlbnRTY29yZUlkIiwic291cmNlQ2xhaW1JZCIsImluZGV4Iiwia2V5SWQiLCJpZCIsImludGVybmFsSW5kZXgiLCJsb2NhdGlvbiIsImluZGV4T2YiLCJzcGxpY2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBRUE7Ozs7Ozs7O0FBSU8sU0FBU0EsVUFBVCxDQUFvQkMsS0FBcEIsRUFBb0NDLE1BQXBDLEVBQXFEQyxPQUFnQixHQUFHLEtBQXhFLEVBQXdGO0FBQzNGLFVBQVFELE1BQU0sQ0FBQ0UsSUFBZjtBQUNJLFNBQUssZUFBTDtBQUNBLFNBQUssa0JBQUw7QUFDSTtBQUNJSCxRQUFBQSxLQUFLLHFCQUNFQSxLQURGO0FBRURJLFVBQUFBLEtBQUssb0JBQ0VKLEtBQUssQ0FBQ0ksS0FEUjtBQUVELGFBQUNILE1BQU0sQ0FBQ0ksTUFBUixxQkFBc0JMLEtBQUssQ0FBQ0ksS0FBTixDQUFZSCxNQUFNLENBQUNJLE1BQW5CLENBQXRCLE1BQXFESixNQUFNLENBQUNLLE9BQTVEO0FBRkM7QUFGSixVQUFMO0FBUUFOLFFBQUFBLEtBQUssR0FBRyxnQ0FBYUEsS0FBYixFQUFvQix1QkFBcEIsRUFBNkNDLE1BQU0sQ0FBQ0ssT0FBUCxDQUFlQyxPQUE1RCxFQUFxRU4sTUFBTSxDQUFDSSxNQUE1RSxDQUFSO0FBQ0FMLFFBQUFBLEtBQUssR0FBRyxnQ0FBYUEsS0FBYixFQUFvQix3QkFBcEIsRUFBOENDLE1BQU0sQ0FBQ0ssT0FBUCxDQUFlRSxRQUE3RCxFQUF1RVAsTUFBTSxDQUFDSSxNQUE5RSxDQUFSO0FBRUEsZUFBT0wsS0FBUDtBQUNIOztBQUNMLFNBQUssa0JBQUw7QUFDSTtBQUNJLGNBQU1TLFNBQVMsR0FBR1QsS0FBSyxDQUFDSSxLQUFOLENBQVlILE1BQU0sQ0FBQ0ksTUFBbkIsQ0FBbEIsQ0FESixDQUVJO0FBQ0E7O0FBQ0EsZUFBT0wsS0FBSyxDQUFDSSxLQUFOLENBQVlILE1BQU0sQ0FBQ0ksTUFBbkIsQ0FBUDtBQUVBTCxRQUFBQSxLQUFLLEdBQUdVLFdBQVcsQ0FBQ1YsS0FBRCxFQUFRQSxLQUFLLENBQUNXLHFCQUFkLEVBQXFDRixTQUFTLENBQUNGLE9BQS9DLEVBQXdETixNQUFNLENBQUNJLE1BQS9ELENBQW5CO0FBQ0FMLFFBQUFBLEtBQUssR0FBR1UsV0FBVyxDQUFDVixLQUFELEVBQVFBLEtBQUssQ0FBQ1ksc0JBQWQsRUFBc0NILFNBQVMsQ0FBQ0QsUUFBaEQsRUFBMERQLE1BQU0sQ0FBQ0ksTUFBakUsQ0FBbkI7QUFFQSxjQUFNUSxRQUFRLEdBQUdiLEtBQUssQ0FBQ2Msa0JBQU4sQ0FBeUJiLE1BQU0sQ0FBQ0ksTUFBaEMsQ0FBakI7O0FBQ0EsYUFBSyxNQUFNVSxPQUFYLElBQXNCRixRQUF0QixFQUFnQztBQUM1QixnQkFBTUcsS0FBSyxHQUFHaEIsS0FBSyxDQUFDSSxLQUFOLENBQVlXLE9BQVosQ0FBZDtBQUNBLGlCQUFPZixLQUFLLENBQUNJLEtBQU4sQ0FBWVcsT0FBWixDQUFQO0FBQ0EsaUJBQU9mLEtBQUssQ0FBQ2Msa0JBQU4sQ0FBeUJiLE1BQU0sQ0FBQ0ksTUFBaEMsQ0FBUDtBQUNBLGlCQUFPTCxLQUFLLENBQUNpQixpQkFBTixDQUF3QkYsT0FBeEIsQ0FBUDs7QUFDQSxjQUFJQyxLQUFLLENBQUNFLGFBQVYsRUFBeUI7QUFDckJsQixZQUFBQSxLQUFLLEdBQUdVLFdBQVcsQ0FBQ1YsS0FBRCxFQUFRQSxLQUFLLENBQUNpQixpQkFBZCxFQUFpQ0QsS0FBSyxDQUFDRSxhQUF2QyxFQUFzREgsT0FBdEQsQ0FBbkI7QUFDSDs7QUFDRGYsVUFBQUEsS0FBSyxHQUFHVSxXQUFXLENBQUNWLEtBQUQsRUFBUUEsS0FBSyxDQUFDYyxrQkFBZCxFQUFrQ0UsS0FBSyxDQUFDRyxhQUF4QyxFQUF1REosT0FBdkQsQ0FBbkI7QUFDSDs7QUFDRDtBQUNBLGVBQU9mLEtBQVA7QUFDSDs7QUFDTDtBQUNJLGFBQU9BLEtBQVA7QUExQ1I7QUE0Q0g7O0FBRU0sU0FBU1UsV0FBVCxDQUFxQlYsS0FBckIsRUFBaUNvQixLQUFqQyxFQUFvREMsS0FBcEQsRUFBbUVDLEVBQW5FLEVBQXdGO0FBQzNGLFFBQU1DLGFBQWEsR0FBR0gsS0FBSyxDQUFDQyxLQUFELENBQTNCO0FBQ0EsUUFBTUcsUUFBUSxHQUFHRCxhQUFhLENBQUNFLE9BQWQsQ0FBc0JILEVBQXRCLEVBQTBCLENBQTFCLENBQWpCOztBQUNBLE1BQUlFLFFBQVEsR0FBRyxDQUFDLENBQWhCLEVBQW1CO0FBQ2ZELElBQUFBLGFBQWEsQ0FBQ0csTUFBZCxDQUFxQkYsUUFBckIsRUFBK0IsQ0FBL0I7QUFDSDs7QUFFRCxTQUFPeEIsS0FBUDtBQUNIIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgaUFjdGlvbiB9IGZyb20gXCIuLi8uLi9kYXRhTW9kZWxzL0FjdGlvblwiXHJcbmltcG9ydCB7IGlSc0RhdGEsIEluZGV4QXJyYXkgfSBmcm9tIFwiLi4vLi4vZGF0YU1vZGVscy9Sc0RhdGFcIlxyXG5pbXBvcnQgeyBJbmRleFJlZHVjZXIgfSBmcm9tIFwiLi9JbmRleFJlZHVjZXJcIlxyXG5pbXBvcnQgeyBDbGFpbUVkZ2UgfSBmcm9tIFwiLi4vLi4vZGF0YU1vZGVscy9DbGFpbUVkZ2VcIjtcclxuaW1wb3J0IHsgU2NvcmUgfSBmcm9tIFwiLi4vLi4vZGF0YU1vZGVscy9TY29yZVwiO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGNsYWltRWRnZXMoc3RhdGU6IGlSc0RhdGEsIGFjdGlvbjogaUFjdGlvbiwgcmV2ZXJzZTogYm9vbGVhbiA9IGZhbHNlKTogaVJzRGF0YSB7XHJcbiAgICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XHJcbiAgICAgICAgY2FzZSBcImFkZF9jbGFpbUVkZ2VcIjpcclxuICAgICAgICBjYXNlIFwibW9kaWZ5X2NsYWltRWRnZVwiOlxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBzdGF0ZSA9IHtcclxuICAgICAgICAgICAgICAgICAgICAuLi5zdGF0ZSxcclxuICAgICAgICAgICAgICAgICAgICBpdGVtczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAuLi5zdGF0ZS5pdGVtcyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgW2FjdGlvbi5kYXRhSWRdOiB7IC4uLnN0YXRlLml0ZW1zW2FjdGlvbi5kYXRhSWRdLCAuLi5hY3Rpb24ubmV3RGF0YSB9LFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBzdGF0ZSA9IEluZGV4UmVkdWNlcihzdGF0ZSwgXCJjbGFpbUVkZ2VJZHNCeUNoaWxkSWRcIiwgYWN0aW9uLm5ld0RhdGEuY2hpbGRJZCwgYWN0aW9uLmRhdGFJZCk7XHJcbiAgICAgICAgICAgICAgICBzdGF0ZSA9IEluZGV4UmVkdWNlcihzdGF0ZSwgXCJjbGFpbUVkZ2VJZHNCeVBhcmVudElkXCIsIGFjdGlvbi5uZXdEYXRhLnBhcmVudElkLCBhY3Rpb24uZGF0YUlkKTtcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gc3RhdGUgYXMgaVJzRGF0YVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgY2FzZSBcImRlbGV0ZV9jbGFpbUVkZ2VcIjpcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgY2xhaW1FZGdlID0gc3RhdGUuaXRlbXNbYWN0aW9uLmRhdGFJZF0gYXMgQ2xhaW1FZGdlO1xyXG4gICAgICAgICAgICAgICAgLy9UT0RPOiBDaGVjayB0aGF0IEknbSBub3QgZGVsZXRpbmcgYW55dGhpZ24gSSBzaG91bGRuJ3Qgb3IgZGVsZXRpbmcgc29tZXRoaW5nIHR3aWNlP1xyXG4gICAgICAgICAgICAgICAgLy9UT0RPOiBQcm9iYWJseSBjb21tZW50IHdoYXQgdGhpcyBpcyBkb2luZ1xyXG4gICAgICAgICAgICAgICAgZGVsZXRlIHN0YXRlLml0ZW1zW2FjdGlvbi5kYXRhSWRdO1xyXG5cclxuICAgICAgICAgICAgICAgIHN0YXRlID0gSW5kZXhEZWxldGUoc3RhdGUsIHN0YXRlLmNsYWltRWRnZUlkc0J5Q2hpbGRJZCwgY2xhaW1FZGdlLmNoaWxkSWQsIGFjdGlvbi5kYXRhSWQpO1xyXG4gICAgICAgICAgICAgICAgc3RhdGUgPSBJbmRleERlbGV0ZShzdGF0ZSwgc3RhdGUuY2xhaW1FZGdlSWRzQnlQYXJlbnRJZCwgY2xhaW1FZGdlLnBhcmVudElkLCBhY3Rpb24uZGF0YUlkKTtcclxuXHJcbiAgICAgICAgICAgICAgICBjb25zdCBzY29yZUlkcyA9IHN0YXRlLnNjb3JlSWRzQnlTb3VyY2VJZFthY3Rpb24uZGF0YUlkXVxyXG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBzY29yZUlkIG9mIHNjb3JlSWRzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2NvcmUgPSBzdGF0ZS5pdGVtc1tzY29yZUlkXSBhcyBTY29yZTtcclxuICAgICAgICAgICAgICAgICAgICBkZWxldGUgc3RhdGUuaXRlbXNbc2NvcmVJZF07XHJcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIHN0YXRlLnNjb3JlSWRzQnlTb3VyY2VJZFthY3Rpb24uZGF0YUlkXTtcclxuICAgICAgICAgICAgICAgICAgICBkZWxldGUgc3RhdGUuY2hpbGRJZHNCeVNjb3JlSWRbc2NvcmVJZF07XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNjb3JlLnBhcmVudFNjb3JlSWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGUgPSBJbmRleERlbGV0ZShzdGF0ZSwgc3RhdGUuY2hpbGRJZHNCeVNjb3JlSWQsIHNjb3JlLnBhcmVudFNjb3JlSWQsIHNjb3JlSWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBzdGF0ZSA9IEluZGV4RGVsZXRlKHN0YXRlLCBzdGF0ZS5zY29yZUlkc0J5U291cmNlSWQsIHNjb3JlLnNvdXJjZUNsYWltSWQsIHNjb3JlSWQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZGVidWdnZXJcclxuICAgICAgICAgICAgICAgIHJldHVybiBzdGF0ZSBhcyBpUnNEYXRhXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICByZXR1cm4gc3RhdGVcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIEluZGV4RGVsZXRlKHN0YXRlOiBhbnksIGluZGV4OiBJbmRleEFycmF5LCBrZXlJZDogc3RyaW5nLCBpZDogc3RyaW5nKTogaVJzRGF0YSB7XHJcbiAgICBjb25zdCBpbnRlcm5hbEluZGV4ID0gaW5kZXhba2V5SWRdXHJcbiAgICBjb25zdCBsb2NhdGlvbiA9IGludGVybmFsSW5kZXguaW5kZXhPZihpZCwgMCk7XHJcbiAgICBpZiAobG9jYXRpb24gPiAtMSkge1xyXG4gICAgICAgIGludGVybmFsSW5kZXguc3BsaWNlKGxvY2F0aW9uLCAxKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gc3RhdGU7XHJcbn0iXX0=