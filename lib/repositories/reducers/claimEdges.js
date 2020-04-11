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
    case "sync_claimEdge":
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
        //TODO: This leaves a lot of orphaned scores and claim and claimedges
        //TODO: Probably should comment what this is doing

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9yZXBvc2l0b3JpZXMvcmVkdWNlcnMvY2xhaW1FZGdlcy50cyJdLCJuYW1lcyI6WyJjbGFpbUVkZ2VzIiwic3RhdGUiLCJhY3Rpb24iLCJyZXZlcnNlIiwidHlwZSIsIml0ZW1zIiwiZGF0YUlkIiwibmV3RGF0YSIsImNoaWxkSWQiLCJwYXJlbnRJZCIsImNsYWltRWRnZSIsIkluZGV4RGVsZXRlIiwiY2xhaW1FZGdlSWRzQnlDaGlsZElkIiwiY2xhaW1FZGdlSWRzQnlQYXJlbnRJZCIsInNjb3JlSWRzIiwic2NvcmVJZHNCeVNvdXJjZUlkIiwic2NvcmVJZCIsInNjb3JlIiwiY2hpbGRJZHNCeVNjb3JlSWQiLCJwYXJlbnRTY29yZUlkIiwic291cmNlQ2xhaW1JZCIsImluZGV4Iiwia2V5SWQiLCJpZCIsImludGVybmFsSW5kZXgiLCJsb2NhdGlvbiIsImluZGV4T2YiLCJzcGxpY2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBRUE7Ozs7Ozs7O0FBSU8sU0FBU0EsVUFBVCxDQUFvQkMsS0FBcEIsRUFBb0NDLE1BQXBDLEVBQXFEQyxPQUFnQixHQUFHLEtBQXhFLEVBQXdGO0FBQzNGLFVBQVFELE1BQU0sQ0FBQ0UsSUFBZjtBQUNJLFNBQUssZUFBTDtBQUNBLFNBQUssa0JBQUw7QUFDQSxTQUFLLGdCQUFMO0FBQ0k7QUFDSUgsUUFBQUEsS0FBSyxxQkFDRUEsS0FERjtBQUVESSxVQUFBQSxLQUFLLG9CQUNFSixLQUFLLENBQUNJLEtBRFI7QUFFRCxhQUFDSCxNQUFNLENBQUNJLE1BQVIscUJBQXNCTCxLQUFLLENBQUNJLEtBQU4sQ0FBWUgsTUFBTSxDQUFDSSxNQUFuQixDQUF0QixNQUFxREosTUFBTSxDQUFDSyxPQUE1RDtBQUZDO0FBRkosVUFBTDtBQVFBTixRQUFBQSxLQUFLLEdBQUcsZ0NBQWFBLEtBQWIsRUFBb0IsdUJBQXBCLEVBQTZDQyxNQUFNLENBQUNLLE9BQVAsQ0FBZUMsT0FBNUQsRUFBcUVOLE1BQU0sQ0FBQ0ksTUFBNUUsQ0FBUjtBQUNBTCxRQUFBQSxLQUFLLEdBQUcsZ0NBQWFBLEtBQWIsRUFBb0Isd0JBQXBCLEVBQThDQyxNQUFNLENBQUNLLE9BQVAsQ0FBZUUsUUFBN0QsRUFBdUVQLE1BQU0sQ0FBQ0ksTUFBOUUsQ0FBUjtBQUVBLGVBQU9MLEtBQVA7QUFDSDs7QUFDTCxTQUFLLGtCQUFMO0FBQ0k7QUFDSSxjQUFNUyxTQUFTLEdBQUdULEtBQUssQ0FBQ0ksS0FBTixDQUFZSCxNQUFNLENBQUNJLE1BQW5CLENBQWxCLENBREosQ0FFSTtBQUNBO0FBQ0E7O0FBQ0EsZUFBT0wsS0FBSyxDQUFDSSxLQUFOLENBQVlILE1BQU0sQ0FBQ0ksTUFBbkIsQ0FBUDtBQUNBTCxRQUFBQSxLQUFLLEdBQUdVLFdBQVcsQ0FBQ1YsS0FBRCxFQUFRQSxLQUFLLENBQUNXLHFCQUFkLEVBQXFDRixTQUFTLENBQUNGLE9BQS9DLEVBQXdETixNQUFNLENBQUNJLE1BQS9ELENBQW5CO0FBQ0FMLFFBQUFBLEtBQUssR0FBR1UsV0FBVyxDQUFDVixLQUFELEVBQVFBLEtBQUssQ0FBQ1ksc0JBQWQsRUFBc0NILFNBQVMsQ0FBQ0QsUUFBaEQsRUFBMERQLE1BQU0sQ0FBQ0ksTUFBakUsQ0FBbkI7QUFFQSxjQUFNUSxRQUFRLEdBQUdiLEtBQUssQ0FBQ2Msa0JBQU4sQ0FBeUJiLE1BQU0sQ0FBQ0ksTUFBaEMsQ0FBakI7O0FBQ0EsYUFBSyxNQUFNVSxPQUFYLElBQXNCRixRQUF0QixFQUFnQztBQUM1QixnQkFBTUcsS0FBSyxHQUFHaEIsS0FBSyxDQUFDSSxLQUFOLENBQVlXLE9BQVosQ0FBZDtBQUNBLGlCQUFPZixLQUFLLENBQUNJLEtBQU4sQ0FBWVcsT0FBWixDQUFQO0FBQ0EsaUJBQU9mLEtBQUssQ0FBQ2Msa0JBQU4sQ0FBeUJiLE1BQU0sQ0FBQ0ksTUFBaEMsQ0FBUDtBQUNBLGlCQUFPTCxLQUFLLENBQUNpQixpQkFBTixDQUF3QkYsT0FBeEIsQ0FBUDs7QUFDQSxjQUFJQyxLQUFLLENBQUNFLGFBQVYsRUFBeUI7QUFDckJsQixZQUFBQSxLQUFLLEdBQUdVLFdBQVcsQ0FBQ1YsS0FBRCxFQUFRQSxLQUFLLENBQUNpQixpQkFBZCxFQUFpQ0QsS0FBSyxDQUFDRSxhQUF2QyxFQUFzREgsT0FBdEQsQ0FBbkI7QUFDSDs7QUFDRGYsVUFBQUEsS0FBSyxHQUFHVSxXQUFXLENBQUNWLEtBQUQsRUFBUUEsS0FBSyxDQUFDYyxrQkFBZCxFQUFrQ0UsS0FBSyxDQUFDRyxhQUF4QyxFQUF1REosT0FBdkQsQ0FBbkI7QUFDSDs7QUFDRCxlQUFPZixLQUFQO0FBQ0g7O0FBQ0w7QUFDSSxhQUFPQSxLQUFQO0FBMUNSO0FBNENIOztBQUVNLFNBQVNVLFdBQVQsQ0FBcUJWLEtBQXJCLEVBQWlDb0IsS0FBakMsRUFBb0RDLEtBQXBELEVBQW1FQyxFQUFuRSxFQUF3RjtBQUMzRixRQUFNQyxhQUFhLEdBQUdILEtBQUssQ0FBQ0MsS0FBRCxDQUEzQjtBQUNBLFFBQU1HLFFBQVEsR0FBR0QsYUFBYSxDQUFDRSxPQUFkLENBQXNCSCxFQUF0QixFQUEwQixDQUExQixDQUFqQjs7QUFDQSxNQUFJRSxRQUFRLEdBQUcsQ0FBQyxDQUFoQixFQUFtQjtBQUNmRCxJQUFBQSxhQUFhLENBQUNHLE1BQWQsQ0FBcUJGLFFBQXJCLEVBQStCLENBQS9CO0FBQ0g7O0FBRUQsU0FBT3hCLEtBQVA7QUFDSCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGlBY3Rpb24gfSBmcm9tIFwiLi4vLi4vZGF0YU1vZGVscy9BY3Rpb25cIlxyXG5pbXBvcnQgeyBpUnNEYXRhLCBJbmRleEFycmF5IH0gZnJvbSBcIi4uLy4uL2RhdGFNb2RlbHMvUnNEYXRhXCJcclxuaW1wb3J0IHsgSW5kZXhSZWR1Y2VyIH0gZnJvbSBcIi4vSW5kZXhSZWR1Y2VyXCJcclxuaW1wb3J0IHsgQ2xhaW1FZGdlIH0gZnJvbSBcIi4uLy4uL2RhdGFNb2RlbHMvQ2xhaW1FZGdlXCI7XHJcbmltcG9ydCB7IFNjb3JlIH0gZnJvbSBcIi4uLy4uL2RhdGFNb2RlbHMvU2NvcmVcIjtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBjbGFpbUVkZ2VzKHN0YXRlOiBpUnNEYXRhLCBhY3Rpb246IGlBY3Rpb24sIHJldmVyc2U6IGJvb2xlYW4gPSBmYWxzZSk6IGlSc0RhdGEge1xyXG4gICAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xyXG4gICAgICAgIGNhc2UgXCJhZGRfY2xhaW1FZGdlXCI6XHJcbiAgICAgICAgY2FzZSBcIm1vZGlmeV9jbGFpbUVkZ2VcIjpcclxuICAgICAgICBjYXNlIFwic3luY19jbGFpbUVkZ2VcIjpcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgc3RhdGUgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLi4uc3RhdGUsXHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbXM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLi4uc3RhdGUuaXRlbXMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFthY3Rpb24uZGF0YUlkXTogeyAuLi5zdGF0ZS5pdGVtc1thY3Rpb24uZGF0YUlkXSwgLi4uYWN0aW9uLm5ld0RhdGEgfSxcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgc3RhdGUgPSBJbmRleFJlZHVjZXIoc3RhdGUsIFwiY2xhaW1FZGdlSWRzQnlDaGlsZElkXCIsIGFjdGlvbi5uZXdEYXRhLmNoaWxkSWQsIGFjdGlvbi5kYXRhSWQpO1xyXG4gICAgICAgICAgICAgICAgc3RhdGUgPSBJbmRleFJlZHVjZXIoc3RhdGUsIFwiY2xhaW1FZGdlSWRzQnlQYXJlbnRJZFwiLCBhY3Rpb24ubmV3RGF0YS5wYXJlbnRJZCwgYWN0aW9uLmRhdGFJZCk7XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHN0YXRlIGFzIGlSc0RhdGFcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIGNhc2UgXCJkZWxldGVfY2xhaW1FZGdlXCI6XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGNsYWltRWRnZSA9IHN0YXRlLml0ZW1zW2FjdGlvbi5kYXRhSWRdIGFzIENsYWltRWRnZTtcclxuICAgICAgICAgICAgICAgIC8vVE9ETzogQ2hlY2sgdGhhdCBJJ20gbm90IGRlbGV0aW5nIGFueXRoaWduIEkgc2hvdWxkbid0IG9yIGRlbGV0aW5nIHNvbWV0aGluZyB0d2ljZT9cclxuICAgICAgICAgICAgICAgIC8vVE9ETzogVGhpcyBsZWF2ZXMgYSBsb3Qgb2Ygb3JwaGFuZWQgc2NvcmVzIGFuZCBjbGFpbSBhbmQgY2xhaW1lZGdlc1xyXG4gICAgICAgICAgICAgICAgLy9UT0RPOiBQcm9iYWJseSBzaG91bGQgY29tbWVudCB3aGF0IHRoaXMgaXMgZG9pbmdcclxuICAgICAgICAgICAgICAgIGRlbGV0ZSBzdGF0ZS5pdGVtc1thY3Rpb24uZGF0YUlkXTtcclxuICAgICAgICAgICAgICAgIHN0YXRlID0gSW5kZXhEZWxldGUoc3RhdGUsIHN0YXRlLmNsYWltRWRnZUlkc0J5Q2hpbGRJZCwgY2xhaW1FZGdlLmNoaWxkSWQsIGFjdGlvbi5kYXRhSWQpO1xyXG4gICAgICAgICAgICAgICAgc3RhdGUgPSBJbmRleERlbGV0ZShzdGF0ZSwgc3RhdGUuY2xhaW1FZGdlSWRzQnlQYXJlbnRJZCwgY2xhaW1FZGdlLnBhcmVudElkLCBhY3Rpb24uZGF0YUlkKTtcclxuXHJcbiAgICAgICAgICAgICAgICBjb25zdCBzY29yZUlkcyA9IHN0YXRlLnNjb3JlSWRzQnlTb3VyY2VJZFthY3Rpb24uZGF0YUlkXVxyXG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBzY29yZUlkIG9mIHNjb3JlSWRzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2NvcmUgPSBzdGF0ZS5pdGVtc1tzY29yZUlkXSBhcyBTY29yZTtcclxuICAgICAgICAgICAgICAgICAgICBkZWxldGUgc3RhdGUuaXRlbXNbc2NvcmVJZF07XHJcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIHN0YXRlLnNjb3JlSWRzQnlTb3VyY2VJZFthY3Rpb24uZGF0YUlkXTtcclxuICAgICAgICAgICAgICAgICAgICBkZWxldGUgc3RhdGUuY2hpbGRJZHNCeVNjb3JlSWRbc2NvcmVJZF07XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNjb3JlLnBhcmVudFNjb3JlSWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGUgPSBJbmRleERlbGV0ZShzdGF0ZSwgc3RhdGUuY2hpbGRJZHNCeVNjb3JlSWQsIHNjb3JlLnBhcmVudFNjb3JlSWQsIHNjb3JlSWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBzdGF0ZSA9IEluZGV4RGVsZXRlKHN0YXRlLCBzdGF0ZS5zY29yZUlkc0J5U291cmNlSWQsIHNjb3JlLnNvdXJjZUNsYWltSWQsIHNjb3JlSWQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHN0YXRlIGFzIGlSc0RhdGFcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgIHJldHVybiBzdGF0ZVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gSW5kZXhEZWxldGUoc3RhdGU6IGFueSwgaW5kZXg6IEluZGV4QXJyYXksIGtleUlkOiBzdHJpbmcsIGlkOiBzdHJpbmcpOiBpUnNEYXRhIHtcclxuICAgIGNvbnN0IGludGVybmFsSW5kZXggPSBpbmRleFtrZXlJZF1cclxuICAgIGNvbnN0IGxvY2F0aW9uID0gaW50ZXJuYWxJbmRleC5pbmRleE9mKGlkLCAwKTtcclxuICAgIGlmIChsb2NhdGlvbiA+IC0xKSB7XHJcbiAgICAgICAgaW50ZXJuYWxJbmRleC5zcGxpY2UobG9jYXRpb24sIDEpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBzdGF0ZTtcclxufSJdfQ==