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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9yZXBvc2l0b3JpZXMvcmVkdWNlcnMvc2NvcmVzVHJlZXMudHMiXSwibmFtZXMiOlsic2NvcmVUcmVlcyIsInN0YXRlIiwiYWN0aW9uIiwicmV2ZXJzZSIsInR5cGUiLCJvcmlnaW5hbEl0ZW0iLCJpdGVtcyIsImRhdGFJZCIsIm5ld0l0ZW0iLCJuZXdEYXRhIiwiU2NvcmVUcmVlSWRzIiwiaW5kZXhPZiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUlPLFNBQVNBLFVBQVQsQ0FBb0JDLEtBQXBCLEVBQW9DQyxNQUFwQyxFQUFxREMsT0FBZ0IsR0FBRyxLQUF4RSxFQUF3RjtBQUMzRixVQUFRRCxNQUFNLENBQUNFLElBQWY7QUFDSSxTQUFLLGVBQUw7QUFDQSxTQUFLLGtCQUFMO0FBQ0k7QUFDSTtBQUNBLGNBQU1DLFlBQVksR0FBR0osS0FBSyxDQUFDSyxLQUFOLENBQVlKLE1BQU0sQ0FBQ0ssTUFBbkIsQ0FBckI7QUFDQSxZQUFJQyxPQUFPLEdBQUdOLE1BQU0sQ0FBQ08sT0FBckI7O0FBQ0EsWUFBSUosWUFBSixFQUFrQjtBQUNkRyxVQUFBQSxPQUFPLHFCQUFRSCxZQUFSLE1BQXlCRyxPQUF6QixDQUFQO0FBQ0g7O0FBRURQLFFBQUFBLEtBQUsscUJBQ0VBLEtBREY7QUFFREssVUFBQUEsS0FBSyxvQkFDRUwsS0FBSyxDQUFDSyxLQURSO0FBRUQsYUFBQ0osTUFBTSxDQUFDSyxNQUFSLEdBQWlCQztBQUZoQjtBQUZKLFVBQUw7O0FBUUEsWUFBSVAsS0FBSyxDQUFDUyxZQUFOLENBQW1CQyxPQUFuQixDQUEyQlQsTUFBTSxDQUFDSyxNQUFsQyxLQUE2QyxDQUFDLENBQWxELEVBQXFEO0FBQ2pETixVQUFBQSxLQUFLLHFCQUNFQSxLQURGO0FBRURTLFlBQUFBLFlBQVksRUFBRSxDQUNWLEdBQUdULEtBQUssQ0FBQ1MsWUFEQyxFQUVWUixNQUFNLENBQUNLLE1BRkc7QUFGYixZQUFMO0FBT0g7O0FBRUQsZUFBT04sS0FBUDtBQUNIOztBQUNMO0FBQ0ksYUFBT0EsS0FBUDtBQWhDUjtBQWtDSCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGlBY3Rpb24gfSBmcm9tIFwiLi4vLi4vZGF0YU1vZGVscy9BY3Rpb25cIlxyXG5pbXBvcnQgeyBpUnNEYXRhIH0gZnJvbSBcIi4uLy4uL2RhdGFNb2RlbHMvUnNEYXRhXCJcclxuaW1wb3J0IHsgU2NvcmVUcmVlIH0gZnJvbSBcIi4uLy4uL2RhdGFNb2RlbHMvU2NvcmVUcmVlXCI7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gc2NvcmVUcmVlcyhzdGF0ZTogaVJzRGF0YSwgYWN0aW9uOiBpQWN0aW9uLCByZXZlcnNlOiBib29sZWFuID0gZmFsc2UpOiBpUnNEYXRhIHtcclxuICAgIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcclxuICAgICAgICBjYXNlIFwiYWRkX3Njb3JlVHJlZVwiOlxyXG4gICAgICAgIGNhc2UgXCJtb2RpZnlfc2NvcmVUcmVlXCI6XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIC8vIFNpbmNlIHRoZSBzY29yZSBkYXRhIG1pZ2h0IGp1c3QgYmUgc29tZSBvZiB0aGUgZGF0YSB3ZSBuZWVkIHRvIGdldCB0aGUgY3VycmVudCBzY29yZSBhbmQgY29tYmluZSB0aGVtXHJcbiAgICAgICAgICAgICAgICBjb25zdCBvcmlnaW5hbEl0ZW0gPSBzdGF0ZS5pdGVtc1thY3Rpb24uZGF0YUlkXTtcclxuICAgICAgICAgICAgICAgIGxldCBuZXdJdGVtID0gYWN0aW9uLm5ld0RhdGEgYXMgU2NvcmVUcmVlXHJcbiAgICAgICAgICAgICAgICBpZiAob3JpZ2luYWxJdGVtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmV3SXRlbSA9IHsgLi4ub3JpZ2luYWxJdGVtLCAuLi5uZXdJdGVtIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBzdGF0ZSA9IHtcclxuICAgICAgICAgICAgICAgICAgICAuLi5zdGF0ZSxcclxuICAgICAgICAgICAgICAgICAgICBpdGVtczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAuLi5zdGF0ZS5pdGVtcyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgW2FjdGlvbi5kYXRhSWRdOiBuZXdJdGVtLFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoc3RhdGUuU2NvcmVUcmVlSWRzLmluZGV4T2YoYWN0aW9uLmRhdGFJZCkgPT0gLTEpIHtcclxuICAgICAgICAgICAgICAgICAgICBzdGF0ZSA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLi4uc3RhdGUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFNjb3JlVHJlZUlkczogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLi4uc3RhdGUuU2NvcmVUcmVlSWRzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uLmRhdGFJZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICAgICAgICAgIHJldHVybiBzdGF0ZSBhcyBpUnNEYXRhXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICByZXR1cm4gc3RhdGVcclxuICAgIH1cclxufVxyXG5cclxuXHJcbiJdfQ==