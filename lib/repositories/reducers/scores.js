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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9yZXBvc2l0b3JpZXMvcmVkdWNlcnMvc2NvcmVzLnRzIl0sIm5hbWVzIjpbInNjb3JlcyIsInN0YXRlIiwiYWN0aW9uIiwicmV2ZXJzZSIsInR5cGUiLCJvcmlnaW5hbFNjb3JlIiwiaXRlbXMiLCJkYXRhSWQiLCJzY29yZSIsIm5ld0RhdGEiLCJwYXJlbnRTY29yZUlkIiwic291cmNlQ2xhaW1JZCIsInNvdXJjZUVkZ2VJZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUdBOzs7Ozs7OztBQUVPLFNBQVNBLE1BQVQsQ0FBZ0JDLEtBQWhCLEVBQWdDQyxNQUFoQyxFQUFpREMsT0FBZ0IsR0FBRyxLQUFwRSxFQUFvRjtBQUN2RixVQUFRRCxNQUFNLENBQUNFLElBQWY7QUFDSSxTQUFLLFdBQUw7QUFDQSxTQUFLLGNBQUw7QUFDSTtBQUNJO0FBQ0EsY0FBTUMsYUFBYSxHQUFHSixLQUFLLENBQUNLLEtBQU4sQ0FBWUosTUFBTSxDQUFDSyxNQUFuQixDQUF0QjtBQUNBLFlBQUlDLEtBQUssR0FBR04sTUFBTSxDQUFDTyxPQUFuQjs7QUFDQSxZQUFJSixhQUFKLEVBQW1CO0FBQ2ZHLFVBQUFBLEtBQUsscUJBQVFILGFBQVIsTUFBMEJHLEtBQTFCLENBQUw7QUFDSDs7QUFFRFAsUUFBQUEsS0FBSyxxQkFDRUEsS0FERjtBQUVESyxVQUFBQSxLQUFLLG9CQUNFTCxLQUFLLENBQUNLLEtBRFI7QUFFRCxhQUFDSixNQUFNLENBQUNLLE1BQVIsR0FBaUJDO0FBRmhCO0FBRkosVUFBTCxDQVJKLENBZ0JJOztBQUNBUCxRQUFBQSxLQUFLLEdBQUcsZ0NBQWFBLEtBQWIsRUFBb0IsbUJBQXBCLEVBQXlDTyxLQUFLLENBQUNFLGFBQS9DLEVBQThEUixNQUFNLENBQUNLLE1BQXJFLENBQVI7QUFDQU4sUUFBQUEsS0FBSyxHQUFHLGdDQUFhQSxLQUFiLEVBQW9CLG9CQUFwQixFQUEwQ08sS0FBSyxDQUFDRyxhQUFoRCxFQUErRFQsTUFBTSxDQUFDSyxNQUF0RSxDQUFSO0FBQ0FOLFFBQUFBLEtBQUssR0FBRyxnQ0FBYUEsS0FBYixFQUFvQixvQkFBcEIsRUFBMENPLEtBQUssQ0FBQ0ksWUFBaEQsRUFBOERWLE1BQU0sQ0FBQ0ssTUFBckUsQ0FBUjtBQUNBLGVBQU9OLEtBQVA7QUFDSDs7QUFDTDtBQUNJLGFBQU9BLEtBQVA7QUExQlI7QUE0QkgiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBpQWN0aW9uIH0gZnJvbSBcIi4uLy4uL2RhdGFNb2RlbHMvQWN0aW9uXCJcclxuaW1wb3J0IHsgaVJzRGF0YSB9IGZyb20gXCIuLi8uLi9kYXRhTW9kZWxzL1JzRGF0YVwiXHJcbmltcG9ydCB7IGlTY29yZSB9IGZyb20gXCIuLi8uLi9kYXRhTW9kZWxzL1Njb3JlXCJcclxuaW1wb3J0IHsgSW5kZXhSZWR1Y2VyIH0gZnJvbSBcIi4vSW5kZXhSZWR1Y2VyXCI7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gc2NvcmVzKHN0YXRlOiBpUnNEYXRhLCBhY3Rpb246IGlBY3Rpb24sIHJldmVyc2U6IGJvb2xlYW4gPSBmYWxzZSk6IGlSc0RhdGEge1xyXG4gICAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xyXG4gICAgICAgIGNhc2UgXCJhZGRfc2NvcmVcIjpcclxuICAgICAgICBjYXNlIFwibW9kaWZ5X3Njb3JlXCI6XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIC8vIFNpbmNlIHRoZSBzY29yZSBkYXRhIG1pZ2h0IGp1c3QgYmUgc29tZSBvZiB0aGUgZGF0YSB3ZSBuZWVkIHRvIGdldCB0aGUgY3VycmVudCBzY29yZSBhbmQgY29tYmluZSB0aGVtXHJcbiAgICAgICAgICAgICAgICBjb25zdCBvcmlnaW5hbFNjb3JlID0gc3RhdGUuaXRlbXNbYWN0aW9uLmRhdGFJZF07XHJcbiAgICAgICAgICAgICAgICBsZXQgc2NvcmUgPSBhY3Rpb24ubmV3RGF0YSBhcyBpU2NvcmVcclxuICAgICAgICAgICAgICAgIGlmIChvcmlnaW5hbFNjb3JlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2NvcmUgPSB7IC4uLm9yaWdpbmFsU2NvcmUsIC4uLnNjb3JlIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBzdGF0ZSA9IHtcclxuICAgICAgICAgICAgICAgICAgICAuLi5zdGF0ZSxcclxuICAgICAgICAgICAgICAgICAgICBpdGVtczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAuLi5zdGF0ZS5pdGVtcyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgW2FjdGlvbi5kYXRhSWRdOiBzY29yZSxcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy9UT0RPOiBEbyBJIG5lZWQgdG8gc3RvcCByZWNyZWF0aW5nIHRoZSBzdGF0ZSBzbyBtYW55IHRpbWVzIGluIHRoaXMgcmVkdWNlcj9cclxuICAgICAgICAgICAgICAgIHN0YXRlID0gSW5kZXhSZWR1Y2VyKHN0YXRlLCBcImNoaWxkSWRzQnlTY29yZUlkXCIsIHNjb3JlLnBhcmVudFNjb3JlSWQsIGFjdGlvbi5kYXRhSWQpO1xyXG4gICAgICAgICAgICAgICAgc3RhdGUgPSBJbmRleFJlZHVjZXIoc3RhdGUsIFwic2NvcmVJZHNCeVNvdXJjZUlkXCIsIHNjb3JlLnNvdXJjZUNsYWltSWQsIGFjdGlvbi5kYXRhSWQpO1xyXG4gICAgICAgICAgICAgICAgc3RhdGUgPSBJbmRleFJlZHVjZXIoc3RhdGUsIFwic2NvcmVJZHNCeVNvdXJjZUlkXCIsIHNjb3JlLnNvdXJjZUVkZ2VJZCwgYWN0aW9uLmRhdGFJZCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gc3RhdGUgYXMgaVJzRGF0YVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgcmV0dXJuIHN0YXRlXHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG4iXX0=