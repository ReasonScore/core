"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.scores = scores;

var _IndexReducer = require("./IndexReducer");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function scores(state, action, reverse = false) {
  switch (action.type) {
    case "add_score":
    case "modify_score":
    case "sync_score":
      {
        // Since the score data might just be some of the data we need to get the current score and combine them
        const originalScore = state.items[action.dataId];
        let score = action.newData;

        if (originalScore) {
          score = _objectSpread({}, originalScore, {}, score);
        }

        state = _objectSpread({}, state, {
          items: _objectSpread({}, state.items, {
            [action.dataId]: score
          })
        }); //TODO: Do I need to stop recreating the state so many times in this reducer?

        state = (0, _IndexReducer.IndexReducer)(state, "childIdsByScoreId", score.parentScoreId, action.dataId);
        state = (0, _IndexReducer.IndexReducer)(state, "scoreIdsBySourceId", score.sourceClaimId, action.dataId);
        state = (0, _IndexReducer.IndexReducer)(state, "scoreIdsBySourceId", score.sourceEdgeId, action.dataId);
        return state;
      }

    default:
      return state;
  }
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9yZXBvc2l0b3JpZXMvcmVkdWNlcnMvc2NvcmVzLnRzIl0sIm5hbWVzIjpbInNjb3JlcyIsInN0YXRlIiwiYWN0aW9uIiwicmV2ZXJzZSIsInR5cGUiLCJvcmlnaW5hbFNjb3JlIiwiaXRlbXMiLCJkYXRhSWQiLCJzY29yZSIsIm5ld0RhdGEiLCJwYXJlbnRTY29yZUlkIiwic291cmNlQ2xhaW1JZCIsInNvdXJjZUVkZ2VJZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUdBOzs7Ozs7OztBQUVPLFNBQVNBLE1BQVQsQ0FBZ0JDLEtBQWhCLEVBQStCQyxNQUEvQixFQUErQ0MsT0FBZ0IsR0FBRyxLQUFsRSxFQUFpRjtBQUNwRixVQUFRRCxNQUFNLENBQUNFLElBQWY7QUFDSSxTQUFLLFdBQUw7QUFDQSxTQUFLLGNBQUw7QUFDQSxTQUFLLFlBQUw7QUFDSTtBQUNJO0FBQ0EsY0FBTUMsYUFBYSxHQUFHSixLQUFLLENBQUNLLEtBQU4sQ0FBWUosTUFBTSxDQUFDSyxNQUFuQixDQUF0QjtBQUNBLFlBQUlDLEtBQUssR0FBR04sTUFBTSxDQUFDTyxPQUFuQjs7QUFDQSxZQUFJSixhQUFKLEVBQW1CO0FBQ2ZHLFVBQUFBLEtBQUsscUJBQVFILGFBQVIsTUFBMEJHLEtBQTFCLENBQUw7QUFDSDs7QUFFRFAsUUFBQUEsS0FBSyxxQkFDRUEsS0FERjtBQUVESyxVQUFBQSxLQUFLLG9CQUNFTCxLQUFLLENBQUNLLEtBRFI7QUFFRCxhQUFDSixNQUFNLENBQUNLLE1BQVIsR0FBaUJDO0FBRmhCO0FBRkosVUFBTCxDQVJKLENBZ0JJOztBQUNBUCxRQUFBQSxLQUFLLEdBQUcsZ0NBQWFBLEtBQWIsRUFBb0IsbUJBQXBCLEVBQXlDTyxLQUFLLENBQUNFLGFBQS9DLEVBQThEUixNQUFNLENBQUNLLE1BQXJFLENBQVI7QUFDQU4sUUFBQUEsS0FBSyxHQUFHLGdDQUFhQSxLQUFiLEVBQW9CLG9CQUFwQixFQUEwQ08sS0FBSyxDQUFDRyxhQUFoRCxFQUErRFQsTUFBTSxDQUFDSyxNQUF0RSxDQUFSO0FBQ0FOLFFBQUFBLEtBQUssR0FBRyxnQ0FBYUEsS0FBYixFQUFvQixvQkFBcEIsRUFBMENPLEtBQUssQ0FBQ0ksWUFBaEQsRUFBOERWLE1BQU0sQ0FBQ0ssTUFBckUsQ0FBUjtBQUNBLGVBQU9OLEtBQVA7QUFDSDs7QUFDTDtBQUNJLGFBQU9BLEtBQVA7QUEzQlI7QUE2QkgiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBY3Rpb24gfSBmcm9tIFwiLi4vLi4vZGF0YU1vZGVscy9BY3Rpb25cIlxyXG5pbXBvcnQgeyBSc0RhdGEgfSBmcm9tIFwiLi4vLi4vZGF0YU1vZGVscy9Sc0RhdGFcIlxyXG5pbXBvcnQgeyBTY29yZSB9IGZyb20gXCIuLi8uLi9kYXRhTW9kZWxzL1Njb3JlXCJcclxuaW1wb3J0IHsgSW5kZXhSZWR1Y2VyIH0gZnJvbSBcIi4vSW5kZXhSZWR1Y2VyXCI7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gc2NvcmVzKHN0YXRlOiBSc0RhdGEsIGFjdGlvbjogQWN0aW9uLCByZXZlcnNlOiBib29sZWFuID0gZmFsc2UpOiBSc0RhdGEge1xyXG4gICAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xyXG4gICAgICAgIGNhc2UgXCJhZGRfc2NvcmVcIjpcclxuICAgICAgICBjYXNlIFwibW9kaWZ5X3Njb3JlXCI6XHJcbiAgICAgICAgY2FzZSBcInN5bmNfc2NvcmVcIjpcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgLy8gU2luY2UgdGhlIHNjb3JlIGRhdGEgbWlnaHQganVzdCBiZSBzb21lIG9mIHRoZSBkYXRhIHdlIG5lZWQgdG8gZ2V0IHRoZSBjdXJyZW50IHNjb3JlIGFuZCBjb21iaW5lIHRoZW1cclxuICAgICAgICAgICAgICAgIGNvbnN0IG9yaWdpbmFsU2NvcmUgPSBzdGF0ZS5pdGVtc1thY3Rpb24uZGF0YUlkXTtcclxuICAgICAgICAgICAgICAgIGxldCBzY29yZSA9IGFjdGlvbi5uZXdEYXRhIGFzIFNjb3JlXHJcbiAgICAgICAgICAgICAgICBpZiAob3JpZ2luYWxTY29yZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNjb3JlID0geyAuLi5vcmlnaW5hbFNjb3JlLCAuLi5zY29yZSB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgc3RhdGUgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLi4uc3RhdGUsXHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbXM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLi4uc3RhdGUuaXRlbXMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFthY3Rpb24uZGF0YUlkXTogc2NvcmUsXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vVE9ETzogRG8gSSBuZWVkIHRvIHN0b3AgcmVjcmVhdGluZyB0aGUgc3RhdGUgc28gbWFueSB0aW1lcyBpbiB0aGlzIHJlZHVjZXI/XHJcbiAgICAgICAgICAgICAgICBzdGF0ZSA9IEluZGV4UmVkdWNlcihzdGF0ZSwgXCJjaGlsZElkc0J5U2NvcmVJZFwiLCBzY29yZS5wYXJlbnRTY29yZUlkLCBhY3Rpb24uZGF0YUlkKTtcclxuICAgICAgICAgICAgICAgIHN0YXRlID0gSW5kZXhSZWR1Y2VyKHN0YXRlLCBcInNjb3JlSWRzQnlTb3VyY2VJZFwiLCBzY29yZS5zb3VyY2VDbGFpbUlkLCBhY3Rpb24uZGF0YUlkKTtcclxuICAgICAgICAgICAgICAgIHN0YXRlID0gSW5kZXhSZWR1Y2VyKHN0YXRlLCBcInNjb3JlSWRzQnlTb3VyY2VJZFwiLCBzY29yZS5zb3VyY2VFZGdlSWQsIGFjdGlvbi5kYXRhSWQpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHN0YXRlIGFzIFJzRGF0YVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgcmV0dXJuIHN0YXRlXHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG4iXX0=