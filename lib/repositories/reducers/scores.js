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
        const originalScore = state.scores[action.dataId];
        let score = action.newData;

        if (originalScore) {
          score = _objectSpread({}, originalScore, {}, score);
        }

        state = _objectSpread({}, state, {
          scores: _objectSpread({}, state.scores, {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9yZXBvc2l0b3JpZXMvcmVkdWNlcnMvc2NvcmVzLnRzIl0sIm5hbWVzIjpbInNjb3JlcyIsInN0YXRlIiwiYWN0aW9uIiwicmV2ZXJzZSIsInR5cGUiLCJvcmlnaW5hbFNjb3JlIiwiZGF0YUlkIiwic2NvcmUiLCJuZXdEYXRhIiwicGFyZW50U2NvcmVJZCIsInNvdXJjZUNsYWltSWQiLCJzb3VyY2VFZGdlSWQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFHQTs7Ozs7Ozs7QUFFTyxTQUFTQSxNQUFULENBQWdCQyxLQUFoQixFQUFnQ0MsTUFBaEMsRUFBaURDLE9BQWdCLEdBQUcsS0FBcEUsRUFBb0Y7QUFDdkYsVUFBUUQsTUFBTSxDQUFDRSxJQUFmO0FBQ0ksU0FBSyxXQUFMO0FBQ0EsU0FBSyxjQUFMO0FBQ0k7QUFDSTtBQUNBLGNBQU1DLGFBQWEsR0FBR0osS0FBSyxDQUFDRCxNQUFOLENBQWFFLE1BQU0sQ0FBQ0ksTUFBcEIsQ0FBdEI7QUFDQSxZQUFJQyxLQUFLLEdBQUdMLE1BQU0sQ0FBQ00sT0FBbkI7O0FBQ0EsWUFBSUgsYUFBSixFQUFtQjtBQUNmRSxVQUFBQSxLQUFLLHFCQUFRRixhQUFSLE1BQTBCRSxLQUExQixDQUFMO0FBQ0g7O0FBRUROLFFBQUFBLEtBQUsscUJBQ0VBLEtBREY7QUFFREQsVUFBQUEsTUFBTSxvQkFDQ0MsS0FBSyxDQUFDRCxNQURQO0FBRUYsYUFBQ0UsTUFBTSxDQUFDSSxNQUFSLEdBQWlCQztBQUZmO0FBRkwsVUFBTCxDQVJKLENBZ0JJOztBQUNBTixRQUFBQSxLQUFLLEdBQUcsZ0NBQWFBLEtBQWIsRUFBb0IsbUJBQXBCLEVBQXlDTSxLQUFLLENBQUNFLGFBQS9DLEVBQThEUCxNQUFNLENBQUNJLE1BQXJFLENBQVI7QUFDQUwsUUFBQUEsS0FBSyxHQUFHLGdDQUFhQSxLQUFiLEVBQW9CLG9CQUFwQixFQUEwQ00sS0FBSyxDQUFDRyxhQUFoRCxFQUErRFIsTUFBTSxDQUFDSSxNQUF0RSxDQUFSO0FBQ0FMLFFBQUFBLEtBQUssR0FBRyxnQ0FBYUEsS0FBYixFQUFvQixvQkFBcEIsRUFBMENNLEtBQUssQ0FBQ0ksWUFBaEQsRUFBOERULE1BQU0sQ0FBQ0ksTUFBckUsQ0FBUjtBQUNBLGVBQU9MLEtBQVA7QUFDSDs7QUFDTDtBQUNJLGFBQU9BLEtBQVA7QUExQlI7QUE0QkgiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBpQWN0aW9uIH0gZnJvbSBcIi4uLy4uL2RhdGFNb2RlbHMvQWN0aW9uXCJcclxuaW1wb3J0IHsgaVJzRGF0YSB9IGZyb20gXCIuLi8uLi9kYXRhTW9kZWxzL1JzRGF0YVwiXHJcbmltcG9ydCB7IGlTY29yZSB9IGZyb20gXCIuLi8uLi9kYXRhTW9kZWxzL1Njb3JlXCJcclxuaW1wb3J0IHsgSW5kZXhSZWR1Y2VyIH0gZnJvbSBcIi4vSW5kZXhSZWR1Y2VyXCI7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gc2NvcmVzKHN0YXRlOiBpUnNEYXRhLCBhY3Rpb246IGlBY3Rpb24sIHJldmVyc2U6IGJvb2xlYW4gPSBmYWxzZSk6IGlSc0RhdGEge1xyXG4gICAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xyXG4gICAgICAgIGNhc2UgXCJhZGRfc2NvcmVcIjpcclxuICAgICAgICBjYXNlIFwibW9kaWZ5X3Njb3JlXCI6XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIC8vIFNpbmNlIHRoZSBzY29yZSBkYXRhIG1pZ2h0IGp1c3QgYmUgc29tZSBvZiB0aGUgZGF0YSB3ZSBuZWVkIHRvIGdldCB0aGUgY3VycmVudCBzY29yZSBhbmQgY29tYmluZSB0aGVtXHJcbiAgICAgICAgICAgICAgICBjb25zdCBvcmlnaW5hbFNjb3JlID0gc3RhdGUuc2NvcmVzW2FjdGlvbi5kYXRhSWRdO1xyXG4gICAgICAgICAgICAgICAgbGV0IHNjb3JlID0gYWN0aW9uLm5ld0RhdGEgYXMgaVNjb3JlXHJcbiAgICAgICAgICAgICAgICBpZiAob3JpZ2luYWxTY29yZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNjb3JlID0geyAuLi5vcmlnaW5hbFNjb3JlLCAuLi5zY29yZSB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgc3RhdGUgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLi4uc3RhdGUsXHJcbiAgICAgICAgICAgICAgICAgICAgc2NvcmVzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC4uLnN0YXRlLnNjb3JlcyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgW2FjdGlvbi5kYXRhSWRdOiBzY29yZSxcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy9UT0RPOiBEbyBJIG5lZWQgdG8gc3RvcCByZWNyZWF0aW5nIHRoZSBzdGF0ZSBzbyBtYW55IHRpbWVzIGluIHRoaXMgcmVkdWNlcj9cclxuICAgICAgICAgICAgICAgIHN0YXRlID0gSW5kZXhSZWR1Y2VyKHN0YXRlLCBcImNoaWxkSWRzQnlTY29yZUlkXCIsIHNjb3JlLnBhcmVudFNjb3JlSWQsIGFjdGlvbi5kYXRhSWQpO1xyXG4gICAgICAgICAgICAgICAgc3RhdGUgPSBJbmRleFJlZHVjZXIoc3RhdGUsIFwic2NvcmVJZHNCeVNvdXJjZUlkXCIsIHNjb3JlLnNvdXJjZUNsYWltSWQsIGFjdGlvbi5kYXRhSWQpO1xyXG4gICAgICAgICAgICAgICAgc3RhdGUgPSBJbmRleFJlZHVjZXIoc3RhdGUsIFwic2NvcmVJZHNCeVNvdXJjZUlkXCIsIHNjb3JlLnNvdXJjZUVkZ2VJZCwgYWN0aW9uLmRhdGFJZCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gc3RhdGUgYXMgaVJzRGF0YVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgcmV0dXJuIHN0YXRlXHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG4iXX0=