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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9yZXBvc2l0b3JpZXMvcmVkdWNlcnMvc2NvcmVzVHJlZXMudHMiXSwibmFtZXMiOlsic2NvcmVUcmVlcyIsInN0YXRlIiwiYWN0aW9uIiwicmV2ZXJzZSIsInR5cGUiLCJvcmlnaW5hbEl0ZW0iLCJpdGVtcyIsImRhdGFJZCIsIm5ld0l0ZW0iLCJuZXdEYXRhIiwiU2NvcmVUcmVlSWRzIiwiaW5kZXhPZiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUlPLFNBQVNBLFVBQVQsQ0FBb0JDLEtBQXBCLEVBQW1DQyxNQUFuQyxFQUFtREMsT0FBZ0IsR0FBRyxLQUF0RSxFQUFxRjtBQUN4RixVQUFRRCxNQUFNLENBQUNFLElBQWY7QUFDSSxTQUFLLGVBQUw7QUFDQSxTQUFLLGtCQUFMO0FBQ0k7QUFDSTtBQUNBLGNBQU1DLFlBQVksR0FBR0osS0FBSyxDQUFDSyxLQUFOLENBQVlKLE1BQU0sQ0FBQ0ssTUFBbkIsQ0FBckI7QUFDQSxZQUFJQyxPQUFPLEdBQUdOLE1BQU0sQ0FBQ08sT0FBckI7O0FBQ0EsWUFBSUosWUFBSixFQUFrQjtBQUNkRyxVQUFBQSxPQUFPLHFCQUFRSCxZQUFSLE1BQXlCRyxPQUF6QixDQUFQO0FBQ0g7O0FBRURQLFFBQUFBLEtBQUsscUJBQ0VBLEtBREY7QUFFREssVUFBQUEsS0FBSyxvQkFDRUwsS0FBSyxDQUFDSyxLQURSO0FBRUQsYUFBQ0osTUFBTSxDQUFDSyxNQUFSLEdBQWlCQztBQUZoQjtBQUZKLFVBQUw7O0FBUUEsWUFBSVAsS0FBSyxDQUFDUyxZQUFOLENBQW1CQyxPQUFuQixDQUEyQlQsTUFBTSxDQUFDSyxNQUFsQyxLQUE2QyxDQUFDLENBQWxELEVBQXFEO0FBQ2pETixVQUFBQSxLQUFLLHFCQUNFQSxLQURGO0FBRURTLFlBQUFBLFlBQVksRUFBRSxDQUNWLEdBQUdULEtBQUssQ0FBQ1MsWUFEQyxFQUVWUixNQUFNLENBQUNLLE1BRkc7QUFGYixZQUFMO0FBT0g7O0FBRUQsZUFBT04sS0FBUDtBQUNIOztBQUNMO0FBQ0ksYUFBT0EsS0FBUDtBQWhDUjtBQWtDSCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFjdGlvbiB9IGZyb20gXCIuLi8uLi9kYXRhTW9kZWxzL0FjdGlvblwiXHJcbmltcG9ydCB7IFJzRGF0YSB9IGZyb20gXCIuLi8uLi9kYXRhTW9kZWxzL1JzRGF0YVwiXHJcbmltcG9ydCB7IFNjb3JlVHJlZSB9IGZyb20gXCIuLi8uLi9kYXRhTW9kZWxzL1Njb3JlVHJlZVwiO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHNjb3JlVHJlZXMoc3RhdGU6IFJzRGF0YSwgYWN0aW9uOiBBY3Rpb24sIHJldmVyc2U6IGJvb2xlYW4gPSBmYWxzZSk6IFJzRGF0YSB7XHJcbiAgICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XHJcbiAgICAgICAgY2FzZSBcImFkZF9zY29yZVRyZWVcIjpcclxuICAgICAgICBjYXNlIFwibW9kaWZ5X3Njb3JlVHJlZVwiOlxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAvLyBTaW5jZSB0aGUgc2NvcmUgZGF0YSBtaWdodCBqdXN0IGJlIHNvbWUgb2YgdGhlIGRhdGEgd2UgbmVlZCB0byBnZXQgdGhlIGN1cnJlbnQgc2NvcmUgYW5kIGNvbWJpbmUgdGhlbVxyXG4gICAgICAgICAgICAgICAgY29uc3Qgb3JpZ2luYWxJdGVtID0gc3RhdGUuaXRlbXNbYWN0aW9uLmRhdGFJZF07XHJcbiAgICAgICAgICAgICAgICBsZXQgbmV3SXRlbSA9IGFjdGlvbi5uZXdEYXRhIGFzIFNjb3JlVHJlZVxyXG4gICAgICAgICAgICAgICAgaWYgKG9yaWdpbmFsSXRlbSkge1xyXG4gICAgICAgICAgICAgICAgICAgIG5ld0l0ZW0gPSB7IC4uLm9yaWdpbmFsSXRlbSwgLi4ubmV3SXRlbSB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgc3RhdGUgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLi4uc3RhdGUsXHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbXM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLi4uc3RhdGUuaXRlbXMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFthY3Rpb24uZGF0YUlkXTogbmV3SXRlbSxcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHN0YXRlLlNjb3JlVHJlZUlkcy5pbmRleE9mKGFjdGlvbi5kYXRhSWQpID09IC0xKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RhdGUgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC4uLnN0YXRlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBTY29yZVRyZWVJZHM6IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC4uLnN0YXRlLlNjb3JlVHJlZUlkcyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbi5kYXRhSWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gc3RhdGUgYXMgUnNEYXRhXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICByZXR1cm4gc3RhdGVcclxuICAgIH1cclxufVxyXG5cclxuXHJcbiJdfQ==