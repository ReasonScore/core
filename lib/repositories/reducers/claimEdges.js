"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.claimEdges = claimEdges;
exports.IndexDelete = IndexDelete;

var _IndexReducer = require("./IndexReducer");

var _ClaimEdge = require("../../dataModels/ClaimEdge");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function claimEdges(state, action, reverse = false) {
  switch (action.type) {
    case "add_claimEdge":
    case "modify_claimEdge":
    case "sync_claimEdge":
      {
        let newItem = state.items[action.dataId];

        if (!newItem) {
          newItem = new _ClaimEdge.ClaimEdge("", "");
          newItem.id = action.dataId;
        }

        newItem = _objectSpread({}, newItem, {}, action.newData);
        state = _objectSpread({}, state, {
          items: _objectSpread({}, state.items, {
            [action.dataId]: newItem
          })
        });
        state = (0, _IndexReducer.IndexReducer)(state, "claimEdgeIdsByChildId", newItem.childId, action.dataId);
        state = (0, _IndexReducer.IndexReducer)(state, "claimEdgeIdsByParentId", newItem.parentId, action.dataId);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9yZXBvc2l0b3JpZXMvcmVkdWNlcnMvY2xhaW1FZGdlcy50cyJdLCJuYW1lcyI6WyJjbGFpbUVkZ2VzIiwic3RhdGUiLCJhY3Rpb24iLCJyZXZlcnNlIiwidHlwZSIsIm5ld0l0ZW0iLCJpdGVtcyIsImRhdGFJZCIsIkNsYWltRWRnZSIsImlkIiwibmV3RGF0YSIsImNoaWxkSWQiLCJwYXJlbnRJZCIsImNsYWltRWRnZSIsIkluZGV4RGVsZXRlIiwiY2xhaW1FZGdlSWRzQnlDaGlsZElkIiwiY2xhaW1FZGdlSWRzQnlQYXJlbnRJZCIsInNjb3JlSWRzIiwic2NvcmVJZHNCeVNvdXJjZUlkIiwic2NvcmVJZCIsInNjb3JlIiwiY2hpbGRJZHNCeVNjb3JlSWQiLCJwYXJlbnRTY29yZUlkIiwic291cmNlQ2xhaW1JZCIsImluZGV4Iiwia2V5SWQiLCJpbnRlcm5hbEluZGV4IiwibG9jYXRpb24iLCJpbmRleE9mIiwic3BsaWNlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUVBOztBQUNBOzs7Ozs7OztBQUdPLFNBQVNBLFVBQVQsQ0FBb0JDLEtBQXBCLEVBQW1DQyxNQUFuQyxFQUFtREMsT0FBZ0IsR0FBRyxLQUF0RSxFQUFxRjtBQUN4RixVQUFRRCxNQUFNLENBQUNFLElBQWY7QUFDSSxTQUFLLGVBQUw7QUFDQSxTQUFLLGtCQUFMO0FBQ0EsU0FBSyxnQkFBTDtBQUNJO0FBQ0ksWUFBSUMsT0FBTyxHQUFHSixLQUFLLENBQUNLLEtBQU4sQ0FBWUosTUFBTSxDQUFDSyxNQUFuQixDQUFkOztBQUNBLFlBQUksQ0FBQ0YsT0FBTCxFQUFhO0FBQ1RBLFVBQUFBLE9BQU8sR0FBRyxJQUFJRyxvQkFBSixDQUFjLEVBQWQsRUFBaUIsRUFBakIsQ0FBVjtBQUNBSCxVQUFBQSxPQUFPLENBQUNJLEVBQVIsR0FBYVAsTUFBTSxDQUFDSyxNQUFwQjtBQUNIOztBQUNERixRQUFBQSxPQUFPLHFCQUFPQSxPQUFQLE1BQW1CSCxNQUFNLENBQUNRLE9BQTFCLENBQVA7QUFFQVQsUUFBQUEsS0FBSyxxQkFDRUEsS0FERjtBQUVESyxVQUFBQSxLQUFLLG9CQUNFTCxLQUFLLENBQUNLLEtBRFI7QUFFRCxhQUFDSixNQUFNLENBQUNLLE1BQVIsR0FBaUJGO0FBRmhCO0FBRkosVUFBTDtBQVFBSixRQUFBQSxLQUFLLEdBQUcsZ0NBQWFBLEtBQWIsRUFBb0IsdUJBQXBCLEVBQTZDSSxPQUFPLENBQUNNLE9BQXJELEVBQThEVCxNQUFNLENBQUNLLE1BQXJFLENBQVI7QUFDQU4sUUFBQUEsS0FBSyxHQUFHLGdDQUFhQSxLQUFiLEVBQW9CLHdCQUFwQixFQUE4Q0ksT0FBTyxDQUFDTyxRQUF0RCxFQUFnRVYsTUFBTSxDQUFDSyxNQUF2RSxDQUFSO0FBQ0EsZUFBT04sS0FBUDtBQUNIOztBQUNMLFNBQUssa0JBQUw7QUFDSTtBQUNJLGNBQU1ZLFNBQVMsR0FBR1osS0FBSyxDQUFDSyxLQUFOLENBQVlKLE1BQU0sQ0FBQ0ssTUFBbkIsQ0FBbEIsQ0FESixDQUVJO0FBQ0E7QUFDQTs7QUFDQSxlQUFPTixLQUFLLENBQUNLLEtBQU4sQ0FBWUosTUFBTSxDQUFDSyxNQUFuQixDQUFQO0FBQ0FOLFFBQUFBLEtBQUssR0FBR2EsV0FBVyxDQUFDYixLQUFELEVBQVFBLEtBQUssQ0FBQ2MscUJBQWQsRUFBcUNGLFNBQVMsQ0FBQ0YsT0FBL0MsRUFBd0RULE1BQU0sQ0FBQ0ssTUFBL0QsQ0FBbkI7QUFDQU4sUUFBQUEsS0FBSyxHQUFHYSxXQUFXLENBQUNiLEtBQUQsRUFBUUEsS0FBSyxDQUFDZSxzQkFBZCxFQUFzQ0gsU0FBUyxDQUFDRCxRQUFoRCxFQUEwRFYsTUFBTSxDQUFDSyxNQUFqRSxDQUFuQjtBQUVBLGNBQU1VLFFBQVEsR0FBR2hCLEtBQUssQ0FBQ2lCLGtCQUFOLENBQXlCaEIsTUFBTSxDQUFDSyxNQUFoQyxDQUFqQjs7QUFDQSxhQUFLLE1BQU1ZLE9BQVgsSUFBc0JGLFFBQXRCLEVBQWdDO0FBQzVCLGdCQUFNRyxLQUFLLEdBQUduQixLQUFLLENBQUNLLEtBQU4sQ0FBWWEsT0FBWixDQUFkO0FBQ0EsaUJBQU9sQixLQUFLLENBQUNLLEtBQU4sQ0FBWWEsT0FBWixDQUFQO0FBQ0EsaUJBQU9sQixLQUFLLENBQUNpQixrQkFBTixDQUF5QmhCLE1BQU0sQ0FBQ0ssTUFBaEMsQ0FBUDtBQUNBLGlCQUFPTixLQUFLLENBQUNvQixpQkFBTixDQUF3QkYsT0FBeEIsQ0FBUDs7QUFDQSxjQUFJQyxLQUFLLENBQUNFLGFBQVYsRUFBeUI7QUFDckJyQixZQUFBQSxLQUFLLEdBQUdhLFdBQVcsQ0FBQ2IsS0FBRCxFQUFRQSxLQUFLLENBQUNvQixpQkFBZCxFQUFpQ0QsS0FBSyxDQUFDRSxhQUF2QyxFQUFzREgsT0FBdEQsQ0FBbkI7QUFDSDs7QUFDRGxCLFVBQUFBLEtBQUssR0FBR2EsV0FBVyxDQUFDYixLQUFELEVBQVFBLEtBQUssQ0FBQ2lCLGtCQUFkLEVBQWtDRSxLQUFLLENBQUNHLGFBQXhDLEVBQXVESixPQUF2RCxDQUFuQjtBQUNIOztBQUNELGVBQU9sQixLQUFQO0FBQ0g7O0FBQ0w7QUFDSSxhQUFPQSxLQUFQO0FBaERSO0FBa0RIOztBQUVNLFNBQVNhLFdBQVQsQ0FBcUJiLEtBQXJCLEVBQWlDdUIsS0FBakMsRUFBb0RDLEtBQXBELEVBQW1FaEIsRUFBbkUsRUFBdUY7QUFDMUYsUUFBTWlCLGFBQWEsR0FBR0YsS0FBSyxDQUFDQyxLQUFELENBQTNCO0FBQ0EsUUFBTUUsUUFBUSxHQUFHRCxhQUFhLENBQUNFLE9BQWQsQ0FBc0JuQixFQUF0QixFQUEwQixDQUExQixDQUFqQjs7QUFDQSxNQUFJa0IsUUFBUSxHQUFHLENBQUMsQ0FBaEIsRUFBbUI7QUFDZkQsSUFBQUEsYUFBYSxDQUFDRyxNQUFkLENBQXFCRixRQUFyQixFQUErQixDQUEvQjtBQUNIOztBQUVELFNBQU8xQixLQUFQO0FBQ0giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBY3Rpb24gfSBmcm9tIFwiLi4vLi4vZGF0YU1vZGVscy9BY3Rpb25cIlxyXG5pbXBvcnQgeyBSc0RhdGEsIEluZGV4QXJyYXkgfSBmcm9tIFwiLi4vLi4vZGF0YU1vZGVscy9Sc0RhdGFcIlxyXG5pbXBvcnQgeyBJbmRleFJlZHVjZXIgfSBmcm9tIFwiLi9JbmRleFJlZHVjZXJcIlxyXG5pbXBvcnQgeyBDbGFpbUVkZ2UgfSBmcm9tIFwiLi4vLi4vZGF0YU1vZGVscy9DbGFpbUVkZ2VcIjtcclxuaW1wb3J0IHsgU2NvcmUgfSBmcm9tIFwiLi4vLi4vZGF0YU1vZGVscy9TY29yZVwiO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGNsYWltRWRnZXMoc3RhdGU6IFJzRGF0YSwgYWN0aW9uOiBBY3Rpb24sIHJldmVyc2U6IGJvb2xlYW4gPSBmYWxzZSk6IFJzRGF0YSB7XHJcbiAgICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XHJcbiAgICAgICAgY2FzZSBcImFkZF9jbGFpbUVkZ2VcIjpcclxuICAgICAgICBjYXNlIFwibW9kaWZ5X2NsYWltRWRnZVwiOlxyXG4gICAgICAgIGNhc2UgXCJzeW5jX2NsYWltRWRnZVwiOlxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBsZXQgbmV3SXRlbSA9IHN0YXRlLml0ZW1zW2FjdGlvbi5kYXRhSWRdIGFzIENsYWltRWRnZVxyXG4gICAgICAgICAgICAgICAgaWYgKCFuZXdJdGVtKXtcclxuICAgICAgICAgICAgICAgICAgICBuZXdJdGVtID0gbmV3IENsYWltRWRnZShcIlwiLFwiXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgbmV3SXRlbS5pZCA9IGFjdGlvbi5kYXRhSWRcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIG5ld0l0ZW0gPSB7Li4ubmV3SXRlbSwgLi4uYWN0aW9uLm5ld0RhdGF9XHJcblxyXG4gICAgICAgICAgICAgICAgc3RhdGUgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLi4uc3RhdGUsXHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbXM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLi4uc3RhdGUuaXRlbXMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFthY3Rpb24uZGF0YUlkXTogbmV3SXRlbSxcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgc3RhdGUgPSBJbmRleFJlZHVjZXIoc3RhdGUsIFwiY2xhaW1FZGdlSWRzQnlDaGlsZElkXCIsIG5ld0l0ZW0uY2hpbGRJZCwgYWN0aW9uLmRhdGFJZCk7XHJcbiAgICAgICAgICAgICAgICBzdGF0ZSA9IEluZGV4UmVkdWNlcihzdGF0ZSwgXCJjbGFpbUVkZ2VJZHNCeVBhcmVudElkXCIsIG5ld0l0ZW0ucGFyZW50SWQsIGFjdGlvbi5kYXRhSWQpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHN0YXRlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICBjYXNlIFwiZGVsZXRlX2NsYWltRWRnZVwiOlxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBjbGFpbUVkZ2UgPSBzdGF0ZS5pdGVtc1thY3Rpb24uZGF0YUlkXSBhcyBDbGFpbUVkZ2U7XHJcbiAgICAgICAgICAgICAgICAvL1RPRE86IENoZWNrIHRoYXQgSSdtIG5vdCBkZWxldGluZyBhbnl0aGlnbiBJIHNob3VsZG4ndCBvciBkZWxldGluZyBzb21ldGhpbmcgdHdpY2U/XHJcbiAgICAgICAgICAgICAgICAvL1RPRE86IFRoaXMgbGVhdmVzIGEgbG90IG9mIG9ycGhhbmVkIHNjb3JlcyBhbmQgY2xhaW0gYW5kIGNsYWltZWRnZXNcclxuICAgICAgICAgICAgICAgIC8vVE9ETzogUHJvYmFibHkgc2hvdWxkIGNvbW1lbnQgd2hhdCB0aGlzIGlzIGRvaW5nXHJcbiAgICAgICAgICAgICAgICBkZWxldGUgc3RhdGUuaXRlbXNbYWN0aW9uLmRhdGFJZF07XHJcbiAgICAgICAgICAgICAgICBzdGF0ZSA9IEluZGV4RGVsZXRlKHN0YXRlLCBzdGF0ZS5jbGFpbUVkZ2VJZHNCeUNoaWxkSWQsIGNsYWltRWRnZS5jaGlsZElkLCBhY3Rpb24uZGF0YUlkKTtcclxuICAgICAgICAgICAgICAgIHN0YXRlID0gSW5kZXhEZWxldGUoc3RhdGUsIHN0YXRlLmNsYWltRWRnZUlkc0J5UGFyZW50SWQsIGNsYWltRWRnZS5wYXJlbnRJZCwgYWN0aW9uLmRhdGFJZCk7XHJcblxyXG4gICAgICAgICAgICAgICAgY29uc3Qgc2NvcmVJZHMgPSBzdGF0ZS5zY29yZUlkc0J5U291cmNlSWRbYWN0aW9uLmRhdGFJZF1cclxuICAgICAgICAgICAgICAgIGZvciAoY29uc3Qgc2NvcmVJZCBvZiBzY29yZUlkcykge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHNjb3JlID0gc3RhdGUuaXRlbXNbc2NvcmVJZF0gYXMgU2NvcmU7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIHN0YXRlLml0ZW1zW3Njb3JlSWRdO1xyXG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBzdGF0ZS5zY29yZUlkc0J5U291cmNlSWRbYWN0aW9uLmRhdGFJZF07XHJcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIHN0YXRlLmNoaWxkSWRzQnlTY29yZUlkW3Njb3JlSWRdO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzY29yZS5wYXJlbnRTY29yZUlkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRlID0gSW5kZXhEZWxldGUoc3RhdGUsIHN0YXRlLmNoaWxkSWRzQnlTY29yZUlkLCBzY29yZS5wYXJlbnRTY29yZUlkLCBzY29yZUlkKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgc3RhdGUgPSBJbmRleERlbGV0ZShzdGF0ZSwgc3RhdGUuc2NvcmVJZHNCeVNvdXJjZUlkLCBzY29yZS5zb3VyY2VDbGFpbUlkLCBzY29yZUlkKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiBzdGF0ZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgcmV0dXJuIHN0YXRlXHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBJbmRleERlbGV0ZShzdGF0ZTogYW55LCBpbmRleDogSW5kZXhBcnJheSwga2V5SWQ6IHN0cmluZywgaWQ6IHN0cmluZyk6IFJzRGF0YSB7XHJcbiAgICBjb25zdCBpbnRlcm5hbEluZGV4ID0gaW5kZXhba2V5SWRdXHJcbiAgICBjb25zdCBsb2NhdGlvbiA9IGludGVybmFsSW5kZXguaW5kZXhPZihpZCwgMCk7XHJcbiAgICBpZiAobG9jYXRpb24gPiAtMSkge1xyXG4gICAgICAgIGludGVybmFsSW5kZXguc3BsaWNlKGxvY2F0aW9uLCAxKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gc3RhdGU7XHJcbn0iXX0=