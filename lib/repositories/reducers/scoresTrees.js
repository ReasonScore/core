"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.scoreTrees = scoreTrees;

var _ScoreTree = require("../../dataModels/ScoreTree");

var _IndexReducer = require("./IndexReducer");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function scoreTrees(state, action, reverse = false) {
  switch (action.type) {
    case "add_scoreTree":
    case "modify_scoreTree":
      {
        let newItem = state.items[action.dataId];

        if (!newItem) {
          newItem = new _ScoreTree.ScoreTree("", "");
          newItem.id = action.dataId;
        }

        newItem = _objectSpread(_objectSpread({}, newItem), action.newData);
        state = _objectSpread(_objectSpread({}, state), {}, {
          items: _objectSpread(_objectSpread({}, state.items), {}, {
            [action.dataId]: newItem
          })
        }); //TODO: Do I need to stop recreating the state so many times in this reducer?

        state = (0, _IndexReducer.IndexReducer)(state, "ScoreTreeIds", newItem.id, action.dataId);
        return state;
      }

    default:
      return state;
  }
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9yZXBvc2l0b3JpZXMvcmVkdWNlcnMvc2NvcmVzVHJlZXMudHMiXSwibmFtZXMiOlsic2NvcmVUcmVlcyIsInN0YXRlIiwiYWN0aW9uIiwicmV2ZXJzZSIsInR5cGUiLCJuZXdJdGVtIiwiaXRlbXMiLCJkYXRhSWQiLCJTY29yZVRyZWUiLCJpZCIsIm5ld0RhdGEiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFFQTs7QUFDQTs7Ozs7Ozs7QUFFTyxTQUFTQSxVQUFULENBQW9CQyxLQUFwQixFQUFtQ0MsTUFBbkMsRUFBbURDLE9BQWdCLEdBQUcsS0FBdEUsRUFBcUY7QUFDeEYsVUFBUUQsTUFBTSxDQUFDRSxJQUFmO0FBQ0ksU0FBSyxlQUFMO0FBQ0EsU0FBSyxrQkFBTDtBQUNJO0FBQ0ksWUFBSUMsT0FBTyxHQUFHSixLQUFLLENBQUNLLEtBQU4sQ0FBWUosTUFBTSxDQUFDSyxNQUFuQixDQUFkOztBQUNBLFlBQUksQ0FBQ0YsT0FBTCxFQUFjO0FBQ1ZBLFVBQUFBLE9BQU8sR0FBRyxJQUFJRyxvQkFBSixDQUFjLEVBQWQsRUFBa0IsRUFBbEIsQ0FBVjtBQUNBSCxVQUFBQSxPQUFPLENBQUNJLEVBQVIsR0FBYVAsTUFBTSxDQUFDSyxNQUFwQjtBQUNIOztBQUNERixRQUFBQSxPQUFPLG1DQUFRQSxPQUFSLEdBQW9CSCxNQUFNLENBQUNRLE9BQTNCLENBQVA7QUFFQVQsUUFBQUEsS0FBSyxtQ0FDRUEsS0FERjtBQUVESyxVQUFBQSxLQUFLLGtDQUNFTCxLQUFLLENBQUNLLEtBRFI7QUFFRCxhQUFDSixNQUFNLENBQUNLLE1BQVIsR0FBaUJGO0FBRmhCO0FBRkosVUFBTCxDQVJKLENBZ0JJOztBQUNBSixRQUFBQSxLQUFLLEdBQUcsZ0NBQWFBLEtBQWIsRUFBb0IsY0FBcEIsRUFBb0NJLE9BQU8sQ0FBQ0ksRUFBNUMsRUFBZ0RQLE1BQU0sQ0FBQ0ssTUFBdkQsQ0FBUjtBQUNBLGVBQU9OLEtBQVA7QUFDSDs7QUFDTDtBQUNJLGFBQU9BLEtBQVA7QUF4QlI7QUEwQkgiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBY3Rpb24gfSBmcm9tIFwiLi4vLi4vZGF0YU1vZGVscy9BY3Rpb25cIlxyXG5pbXBvcnQgeyBSc0RhdGEgfSBmcm9tIFwiLi4vLi4vZGF0YU1vZGVscy9Sc0RhdGFcIlxyXG5pbXBvcnQgeyBTY29yZVRyZWUgfSBmcm9tIFwiLi4vLi4vZGF0YU1vZGVscy9TY29yZVRyZWVcIjtcclxuaW1wb3J0IHsgSW5kZXhSZWR1Y2VyIH0gZnJvbSBcIi4vSW5kZXhSZWR1Y2VyXCI7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gc2NvcmVUcmVlcyhzdGF0ZTogUnNEYXRhLCBhY3Rpb246IEFjdGlvbiwgcmV2ZXJzZTogYm9vbGVhbiA9IGZhbHNlKTogUnNEYXRhIHtcclxuICAgIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcclxuICAgICAgICBjYXNlIFwiYWRkX3Njb3JlVHJlZVwiOlxyXG4gICAgICAgIGNhc2UgXCJtb2RpZnlfc2NvcmVUcmVlXCI6XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGxldCBuZXdJdGVtID0gc3RhdGUuaXRlbXNbYWN0aW9uLmRhdGFJZF0gYXMgU2NvcmVUcmVlXHJcbiAgICAgICAgICAgICAgICBpZiAoIW5ld0l0ZW0pIHtcclxuICAgICAgICAgICAgICAgICAgICBuZXdJdGVtID0gbmV3IFNjb3JlVHJlZShcIlwiLCBcIlwiKVxyXG4gICAgICAgICAgICAgICAgICAgIG5ld0l0ZW0uaWQgPSBhY3Rpb24uZGF0YUlkXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBuZXdJdGVtID0geyAuLi5uZXdJdGVtLCAuLi5hY3Rpb24ubmV3RGF0YSB9XHJcblxyXG4gICAgICAgICAgICAgICAgc3RhdGUgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLi4uc3RhdGUsXHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbXM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLi4uc3RhdGUuaXRlbXMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFthY3Rpb24uZGF0YUlkXTogbmV3SXRlbSxcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy9UT0RPOiBEbyBJIG5lZWQgdG8gc3RvcCByZWNyZWF0aW5nIHRoZSBzdGF0ZSBzbyBtYW55IHRpbWVzIGluIHRoaXMgcmVkdWNlcj9cclxuICAgICAgICAgICAgICAgIHN0YXRlID0gSW5kZXhSZWR1Y2VyKHN0YXRlLCBcIlNjb3JlVHJlZUlkc1wiLCBuZXdJdGVtLmlkLCBhY3Rpb24uZGF0YUlkKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBzdGF0ZSBhcyBSc0RhdGFcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgIHJldHVybiBzdGF0ZVxyXG4gICAgfVxyXG59XHJcblxyXG5cclxuIl19