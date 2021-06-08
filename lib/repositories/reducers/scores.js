"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.scores = scores;

var _Score = require("../../dataModels/Score");

var _IndexReducer = require("./IndexReducer");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function scores(state, action, reverse = false) {
  switch (action.type) {
    case "add_score":
    case "modify_score":
    case "sync_score":
      {
        let newItem = state.items[action.dataId];

        if (!newItem) {
          newItem = new _Score.Score("", "");
          newItem.id = action.dataId;
        }

        newItem = _objectSpread(_objectSpread({}, newItem), action.newData);
        state = _objectSpread(_objectSpread({}, state), {}, {
          items: _objectSpread(_objectSpread({}, state.items), {}, {
            [action.dataId]: newItem
          })
        }); //TODO: Do I need to stop recreating the state so many times in this reducer?

        state = (0, _IndexReducer.IndexReducer)(state, "childIdsByScoreId", newItem.parentScoreId, action.dataId);
        state = (0, _IndexReducer.IndexReducer)(state, "scoreIdsBySourceId", newItem.sourceClaimId, action.dataId);
        state = (0, _IndexReducer.IndexReducer)(state, "scoreIdsBySourceId", newItem.sourceEdgeId, action.dataId);
        return state;
      }

    default:
      return state;
  }
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9yZXBvc2l0b3JpZXMvcmVkdWNlcnMvc2NvcmVzLnRzIl0sIm5hbWVzIjpbInNjb3JlcyIsInN0YXRlIiwiYWN0aW9uIiwicmV2ZXJzZSIsInR5cGUiLCJuZXdJdGVtIiwiaXRlbXMiLCJkYXRhSWQiLCJTY29yZSIsImlkIiwibmV3RGF0YSIsInBhcmVudFNjb3JlSWQiLCJzb3VyY2VDbGFpbUlkIiwic291cmNlRWRnZUlkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBRUE7O0FBQ0E7Ozs7Ozs7O0FBRU8sU0FBU0EsTUFBVCxDQUFnQkMsS0FBaEIsRUFBK0JDLE1BQS9CLEVBQStDQyxPQUFnQixHQUFHLEtBQWxFLEVBQWlGO0FBQ3BGLFVBQVFELE1BQU0sQ0FBQ0UsSUFBZjtBQUNJLFNBQUssV0FBTDtBQUNBLFNBQUssY0FBTDtBQUNBLFNBQUssWUFBTDtBQUNJO0FBQ0ksWUFBSUMsT0FBTyxHQUFHSixLQUFLLENBQUNLLEtBQU4sQ0FBWUosTUFBTSxDQUFDSyxNQUFuQixDQUFkOztBQUNBLFlBQUksQ0FBQ0YsT0FBTCxFQUFhO0FBQ1RBLFVBQUFBLE9BQU8sR0FBRyxJQUFJRyxZQUFKLENBQVUsRUFBVixFQUFhLEVBQWIsQ0FBVjtBQUNBSCxVQUFBQSxPQUFPLENBQUNJLEVBQVIsR0FBYVAsTUFBTSxDQUFDSyxNQUFwQjtBQUNIOztBQUNERixRQUFBQSxPQUFPLG1DQUFPQSxPQUFQLEdBQW1CSCxNQUFNLENBQUNRLE9BQTFCLENBQVA7QUFFQVQsUUFBQUEsS0FBSyxtQ0FDRUEsS0FERjtBQUVESyxVQUFBQSxLQUFLLGtDQUNFTCxLQUFLLENBQUNLLEtBRFI7QUFFRCxhQUFDSixNQUFNLENBQUNLLE1BQVIsR0FBaUJGO0FBRmhCO0FBRkosVUFBTCxDQVJKLENBZ0JJOztBQUNBSixRQUFBQSxLQUFLLEdBQUcsZ0NBQWFBLEtBQWIsRUFBb0IsbUJBQXBCLEVBQXlDSSxPQUFPLENBQUNNLGFBQWpELEVBQWdFVCxNQUFNLENBQUNLLE1BQXZFLENBQVI7QUFDQU4sUUFBQUEsS0FBSyxHQUFHLGdDQUFhQSxLQUFiLEVBQW9CLG9CQUFwQixFQUEwQ0ksT0FBTyxDQUFDTyxhQUFsRCxFQUFpRVYsTUFBTSxDQUFDSyxNQUF4RSxDQUFSO0FBQ0FOLFFBQUFBLEtBQUssR0FBRyxnQ0FBYUEsS0FBYixFQUFvQixvQkFBcEIsRUFBMENJLE9BQU8sQ0FBQ1EsWUFBbEQsRUFBZ0VYLE1BQU0sQ0FBQ0ssTUFBdkUsQ0FBUjtBQUNBLGVBQU9OLEtBQVA7QUFDSDs7QUFDTDtBQUNJLGFBQU9BLEtBQVA7QUEzQlI7QUE2QkgiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBY3Rpb24gfSBmcm9tIFwiLi4vLi4vZGF0YU1vZGVscy9BY3Rpb25cIlxyXG5pbXBvcnQgeyBSc0RhdGEgfSBmcm9tIFwiLi4vLi4vZGF0YU1vZGVscy9Sc0RhdGFcIlxyXG5pbXBvcnQgeyBTY29yZSB9IGZyb20gXCIuLi8uLi9kYXRhTW9kZWxzL1Njb3JlXCJcclxuaW1wb3J0IHsgSW5kZXhSZWR1Y2VyIH0gZnJvbSBcIi4vSW5kZXhSZWR1Y2VyXCI7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gc2NvcmVzKHN0YXRlOiBSc0RhdGEsIGFjdGlvbjogQWN0aW9uLCByZXZlcnNlOiBib29sZWFuID0gZmFsc2UpOiBSc0RhdGEge1xyXG4gICAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xyXG4gICAgICAgIGNhc2UgXCJhZGRfc2NvcmVcIjpcclxuICAgICAgICBjYXNlIFwibW9kaWZ5X3Njb3JlXCI6XHJcbiAgICAgICAgY2FzZSBcInN5bmNfc2NvcmVcIjpcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbGV0IG5ld0l0ZW0gPSBzdGF0ZS5pdGVtc1thY3Rpb24uZGF0YUlkXSBhcyBTY29yZVxyXG4gICAgICAgICAgICAgICAgaWYgKCFuZXdJdGVtKXtcclxuICAgICAgICAgICAgICAgICAgICBuZXdJdGVtID0gbmV3IFNjb3JlKFwiXCIsXCJcIilcclxuICAgICAgICAgICAgICAgICAgICBuZXdJdGVtLmlkID0gYWN0aW9uLmRhdGFJZFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgbmV3SXRlbSA9IHsuLi5uZXdJdGVtLCAuLi5hY3Rpb24ubmV3RGF0YX1cclxuXHJcbiAgICAgICAgICAgICAgICBzdGF0ZSA9IHtcclxuICAgICAgICAgICAgICAgICAgICAuLi5zdGF0ZSxcclxuICAgICAgICAgICAgICAgICAgICBpdGVtczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAuLi5zdGF0ZS5pdGVtcyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgW2FjdGlvbi5kYXRhSWRdOiBuZXdJdGVtLFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvL1RPRE86IERvIEkgbmVlZCB0byBzdG9wIHJlY3JlYXRpbmcgdGhlIHN0YXRlIHNvIG1hbnkgdGltZXMgaW4gdGhpcyByZWR1Y2VyP1xyXG4gICAgICAgICAgICAgICAgc3RhdGUgPSBJbmRleFJlZHVjZXIoc3RhdGUsIFwiY2hpbGRJZHNCeVNjb3JlSWRcIiwgbmV3SXRlbS5wYXJlbnRTY29yZUlkLCBhY3Rpb24uZGF0YUlkKTtcclxuICAgICAgICAgICAgICAgIHN0YXRlID0gSW5kZXhSZWR1Y2VyKHN0YXRlLCBcInNjb3JlSWRzQnlTb3VyY2VJZFwiLCBuZXdJdGVtLnNvdXJjZUNsYWltSWQsIGFjdGlvbi5kYXRhSWQpO1xyXG4gICAgICAgICAgICAgICAgc3RhdGUgPSBJbmRleFJlZHVjZXIoc3RhdGUsIFwic2NvcmVJZHNCeVNvdXJjZUlkXCIsIG5ld0l0ZW0uc291cmNlRWRnZUlkLCBhY3Rpb24uZGF0YUlkKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBzdGF0ZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgcmV0dXJuIHN0YXRlXHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG4iXX0=