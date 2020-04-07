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
    case "modify_score":
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9yZXBvc2l0b3JpZXMvcmVkdWNlcnMvc2NvcmVzVHJlZXMudHMiXSwibmFtZXMiOlsic2NvcmVUcmVlcyIsInN0YXRlIiwiYWN0aW9uIiwicmV2ZXJzZSIsInR5cGUiLCJvcmlnaW5hbEl0ZW0iLCJpdGVtcyIsImRhdGFJZCIsIm5ld0l0ZW0iLCJuZXdEYXRhIiwiU2NvcmVUcmVlSWRzIiwiaW5kZXhPZiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUlPLFNBQVNBLFVBQVQsQ0FBb0JDLEtBQXBCLEVBQW9DQyxNQUFwQyxFQUFxREMsT0FBZ0IsR0FBRyxLQUF4RSxFQUF3RjtBQUMzRixVQUFRRCxNQUFNLENBQUNFLElBQWY7QUFDSSxTQUFLLGVBQUw7QUFDQSxTQUFLLGNBQUw7QUFDSTtBQUNJO0FBQ0EsY0FBTUMsWUFBWSxHQUFHSixLQUFLLENBQUNLLEtBQU4sQ0FBWUosTUFBTSxDQUFDSyxNQUFuQixDQUFyQjtBQUNBLFlBQUlDLE9BQU8sR0FBR04sTUFBTSxDQUFDTyxPQUFyQjs7QUFDQSxZQUFJSixZQUFKLEVBQWtCO0FBQ2RHLFVBQUFBLE9BQU8scUJBQVFILFlBQVIsTUFBeUJHLE9BQXpCLENBQVA7QUFDSDs7QUFFRFAsUUFBQUEsS0FBSyxxQkFDRUEsS0FERjtBQUVESyxVQUFBQSxLQUFLLG9CQUNFTCxLQUFLLENBQUNLLEtBRFI7QUFFRCxhQUFDSixNQUFNLENBQUNLLE1BQVIsR0FBaUJDO0FBRmhCO0FBRkosVUFBTDs7QUFRQSxZQUFJUCxLQUFLLENBQUNTLFlBQU4sQ0FBbUJDLE9BQW5CLENBQTJCVCxNQUFNLENBQUNLLE1BQWxDLEtBQTZDLENBQUMsQ0FBbEQsRUFBcUQ7QUFDakROLFVBQUFBLEtBQUsscUJBQ0VBLEtBREY7QUFFRFMsWUFBQUEsWUFBWSxFQUFFLENBQ1YsR0FBR1QsS0FBSyxDQUFDUyxZQURDLEVBRVZSLE1BQU0sQ0FBQ0ssTUFGRztBQUZiLFlBQUw7QUFPSDs7QUFFRCxlQUFPTixLQUFQO0FBQ0g7O0FBQ0w7QUFDSSxhQUFPQSxLQUFQO0FBaENSO0FBa0NIIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgaUFjdGlvbiB9IGZyb20gXCIuLi8uLi9kYXRhTW9kZWxzL0FjdGlvblwiXHJcbmltcG9ydCB7IGlSc0RhdGEgfSBmcm9tIFwiLi4vLi4vZGF0YU1vZGVscy9Sc0RhdGFcIlxyXG5pbXBvcnQgeyBpU2NvcmVUcmVlIH0gZnJvbSBcIi4uLy4uL2RhdGFNb2RlbHMvU2NvcmVUcmVlXCI7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gc2NvcmVUcmVlcyhzdGF0ZTogaVJzRGF0YSwgYWN0aW9uOiBpQWN0aW9uLCByZXZlcnNlOiBib29sZWFuID0gZmFsc2UpOiBpUnNEYXRhIHtcclxuICAgIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcclxuICAgICAgICBjYXNlIFwiYWRkX3Njb3JlVHJlZVwiOlxyXG4gICAgICAgIGNhc2UgXCJtb2RpZnlfc2NvcmVcIjpcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgLy8gU2luY2UgdGhlIHNjb3JlIGRhdGEgbWlnaHQganVzdCBiZSBzb21lIG9mIHRoZSBkYXRhIHdlIG5lZWQgdG8gZ2V0IHRoZSBjdXJyZW50IHNjb3JlIGFuZCBjb21iaW5lIHRoZW1cclxuICAgICAgICAgICAgICAgIGNvbnN0IG9yaWdpbmFsSXRlbSA9IHN0YXRlLml0ZW1zW2FjdGlvbi5kYXRhSWRdO1xyXG4gICAgICAgICAgICAgICAgbGV0IG5ld0l0ZW0gPSBhY3Rpb24ubmV3RGF0YSBhcyBpU2NvcmVUcmVlXHJcbiAgICAgICAgICAgICAgICBpZiAob3JpZ2luYWxJdGVtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmV3SXRlbSA9IHsgLi4ub3JpZ2luYWxJdGVtLCAuLi5uZXdJdGVtIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBzdGF0ZSA9IHtcclxuICAgICAgICAgICAgICAgICAgICAuLi5zdGF0ZSxcclxuICAgICAgICAgICAgICAgICAgICBpdGVtczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAuLi5zdGF0ZS5pdGVtcyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgW2FjdGlvbi5kYXRhSWRdOiBuZXdJdGVtLFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoc3RhdGUuU2NvcmVUcmVlSWRzLmluZGV4T2YoYWN0aW9uLmRhdGFJZCkgPT0gLTEpIHtcclxuICAgICAgICAgICAgICAgICAgICBzdGF0ZSA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLi4uc3RhdGUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFNjb3JlVHJlZUlkczogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLi4uc3RhdGUuU2NvcmVUcmVlSWRzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uLmRhdGFJZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICAgICAgICAgIHJldHVybiBzdGF0ZSBhcyBpUnNEYXRhXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICByZXR1cm4gc3RhdGVcclxuICAgIH1cclxufVxyXG5cclxuXHJcbiJdfQ==