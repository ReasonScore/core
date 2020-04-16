"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.scoreTrees = scoreTrees;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function scoreTrees(state, action, reverse = false) {
  switch (action.type) {
    case "add_scoreTree":
    case "modify_scoreTree":
      {
        // Since the score data might just be some of the data we need to get the current score and combine them
        const originalItem = state.items[action.dataId];
        let newItem = action.newData;

        if (originalItem) {
          newItem = _objectSpread({}, originalItem, {}, newItem);
        }

        state = _objectSpread({}, state, {
          items: _objectSpread({}, state.items, {
            [action.dataId]: newItem
          })
        });

        if (state.ScoreTreeIds.indexOf(action.dataId) == -1) {
          state = _objectSpread({}, state, {
            ScoreTreeIds: [...state.ScoreTreeIds, action.dataId]
          });
        }

        return state;
      }

    default:
      return state;
  }
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9yZXBvc2l0b3JpZXMvcmVkdWNlcnMvc2NvcmVzVHJlZXMudHMiXSwibmFtZXMiOlsic2NvcmVUcmVlcyIsInN0YXRlIiwiYWN0aW9uIiwicmV2ZXJzZSIsInR5cGUiLCJvcmlnaW5hbEl0ZW0iLCJpdGVtcyIsImRhdGFJZCIsIm5ld0l0ZW0iLCJuZXdEYXRhIiwiU2NvcmVUcmVlSWRzIiwiaW5kZXhPZiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUlPLFNBQVNBLFVBQVQsQ0FBb0JDLEtBQXBCLEVBQW9DQyxNQUFwQyxFQUFxREMsT0FBZ0IsR0FBRyxLQUF4RSxFQUF3RjtBQUMzRixVQUFRRCxNQUFNLENBQUNFLElBQWY7QUFDSSxTQUFLLGVBQUw7QUFDQSxTQUFLLGtCQUFMO0FBQ0k7QUFDSTtBQUNBLGNBQU1DLFlBQVksR0FBR0osS0FBSyxDQUFDSyxLQUFOLENBQVlKLE1BQU0sQ0FBQ0ssTUFBbkIsQ0FBckI7QUFDQSxZQUFJQyxPQUFPLEdBQUdOLE1BQU0sQ0FBQ08sT0FBckI7O0FBQ0EsWUFBSUosWUFBSixFQUFrQjtBQUNkRyxVQUFBQSxPQUFPLHFCQUFRSCxZQUFSLE1BQXlCRyxPQUF6QixDQUFQO0FBQ0g7O0FBRURQLFFBQUFBLEtBQUsscUJBQ0VBLEtBREY7QUFFREssVUFBQUEsS0FBSyxvQkFDRUwsS0FBSyxDQUFDSyxLQURSO0FBRUQsYUFBQ0osTUFBTSxDQUFDSyxNQUFSLEdBQWlCQztBQUZoQjtBQUZKLFVBQUw7O0FBUUEsWUFBSVAsS0FBSyxDQUFDUyxZQUFOLENBQW1CQyxPQUFuQixDQUEyQlQsTUFBTSxDQUFDSyxNQUFsQyxLQUE2QyxDQUFDLENBQWxELEVBQXFEO0FBQ2pETixVQUFBQSxLQUFLLHFCQUNFQSxLQURGO0FBRURTLFlBQUFBLFlBQVksRUFBRSxDQUNWLEdBQUdULEtBQUssQ0FBQ1MsWUFEQyxFQUVWUixNQUFNLENBQUNLLE1BRkc7QUFGYixZQUFMO0FBT0g7O0FBRUQsZUFBT04sS0FBUDtBQUNIOztBQUNMO0FBQ0ksYUFBT0EsS0FBUDtBQWhDUjtBQWtDSCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGlBY3Rpb24gfSBmcm9tIFwiLi4vLi4vZGF0YU1vZGVscy9BY3Rpb25cIlxyXG5pbXBvcnQgeyBpUnNEYXRhIH0gZnJvbSBcIi4uLy4uL2RhdGFNb2RlbHMvUnNEYXRhXCJcclxuaW1wb3J0IHsgaVNjb3JlVHJlZSB9IGZyb20gXCIuLi8uLi9kYXRhTW9kZWxzL1Njb3JlVHJlZVwiO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHNjb3JlVHJlZXMoc3RhdGU6IGlSc0RhdGEsIGFjdGlvbjogaUFjdGlvbiwgcmV2ZXJzZTogYm9vbGVhbiA9IGZhbHNlKTogaVJzRGF0YSB7XHJcbiAgICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XHJcbiAgICAgICAgY2FzZSBcImFkZF9zY29yZVRyZWVcIjpcclxuICAgICAgICBjYXNlIFwibW9kaWZ5X3Njb3JlVHJlZVwiOlxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAvLyBTaW5jZSB0aGUgc2NvcmUgZGF0YSBtaWdodCBqdXN0IGJlIHNvbWUgb2YgdGhlIGRhdGEgd2UgbmVlZCB0byBnZXQgdGhlIGN1cnJlbnQgc2NvcmUgYW5kIGNvbWJpbmUgdGhlbVxyXG4gICAgICAgICAgICAgICAgY29uc3Qgb3JpZ2luYWxJdGVtID0gc3RhdGUuaXRlbXNbYWN0aW9uLmRhdGFJZF07XHJcbiAgICAgICAgICAgICAgICBsZXQgbmV3SXRlbSA9IGFjdGlvbi5uZXdEYXRhIGFzIGlTY29yZVRyZWVcclxuICAgICAgICAgICAgICAgIGlmIChvcmlnaW5hbEl0ZW0pIHtcclxuICAgICAgICAgICAgICAgICAgICBuZXdJdGVtID0geyAuLi5vcmlnaW5hbEl0ZW0sIC4uLm5ld0l0ZW0gfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHN0YXRlID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIC4uLnN0YXRlLFxyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW1zOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC4uLnN0YXRlLml0ZW1zLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBbYWN0aW9uLmRhdGFJZF06IG5ld0l0ZW0sXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChzdGF0ZS5TY29yZVRyZWVJZHMuaW5kZXhPZihhY3Rpb24uZGF0YUlkKSA9PSAtMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHN0YXRlID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAuLi5zdGF0ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgU2NvcmVUcmVlSWRzOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuLi5zdGF0ZS5TY29yZVRyZWVJZHMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb24uZGF0YUlkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHN0YXRlIGFzIGlSc0RhdGFcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgIHJldHVybiBzdGF0ZVxyXG4gICAgfVxyXG59XHJcblxyXG5cclxuIl19