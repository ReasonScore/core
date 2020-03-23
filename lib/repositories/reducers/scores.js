"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.scores = scores;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function scores(state, action, reverse = false) {
  switch (action.type) {
    case "add_score" || "modify_score":
      {
        const score = action.newData; //Add any missing arrays

        if (score.parentScoreId && !state.childIdsByScoreId[score.parentScoreId]) {
          state.childIdsByScoreId[score.parentScoreId] = [];
        }

        if (!state.scoreIdsByClaimId[score.sourceClaimId]) {
          state.scoreIdsByClaimId[score.sourceClaimId] = [];
        } //If there is a parent then index the child


        if (score.parentScoreId) {
          state = _objectSpread({}, state, {
            childIdsByScoreId: _objectSpread({}, state.childIdsByScoreId, {
              [score.parentScoreId]: [...state.childIdsByScoreId[score.parentScoreId], action.dataId]
            })
          });
        }

        return _objectSpread({}, state, {
          scores: _objectSpread({}, state.scores, {
            [action.dataId]: action.newData
          }),
          scoreIdsByClaimId: _objectSpread({}, state.scoreIdsByClaimId, {
            [score.sourceClaimId]: [...state.scoreIdsByClaimId[score.sourceClaimId], action.dataId]
          })
        });
      }

    default:
      return state;
  }
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9yZXBvc2l0b3JpZXMvcmVkdWNlcnMvc2NvcmVzLnRzIl0sIm5hbWVzIjpbInNjb3JlcyIsInN0YXRlIiwiYWN0aW9uIiwicmV2ZXJzZSIsInR5cGUiLCJzY29yZSIsIm5ld0RhdGEiLCJwYXJlbnRTY29yZUlkIiwiY2hpbGRJZHNCeVNjb3JlSWQiLCJzY29yZUlkc0J5Q2xhaW1JZCIsInNvdXJjZUNsYWltSWQiLCJkYXRhSWQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFJTyxTQUFTQSxNQUFULENBQWdCQyxLQUFoQixFQUFnQ0MsTUFBaEMsRUFBaURDLE9BQWdCLEdBQUcsS0FBcEUsRUFBb0Y7QUFDdkYsVUFBUUQsTUFBTSxDQUFDRSxJQUFmO0FBQ0ksU0FBSyxlQUFlLGNBQXBCO0FBQ0k7QUFDSSxjQUFNQyxLQUFLLEdBQUdILE1BQU0sQ0FBQ0ksT0FBckIsQ0FESixDQUVJOztBQUNBLFlBQUlELEtBQUssQ0FBQ0UsYUFBTixJQUF1QixDQUFDTixLQUFLLENBQUNPLGlCQUFOLENBQXdCSCxLQUFLLENBQUNFLGFBQTlCLENBQTVCLEVBQTBFO0FBQ3RFTixVQUFBQSxLQUFLLENBQUNPLGlCQUFOLENBQXdCSCxLQUFLLENBQUNFLGFBQTlCLElBQStDLEVBQS9DO0FBQ0g7O0FBQ0QsWUFBSSxDQUFDTixLQUFLLENBQUNRLGlCQUFOLENBQXdCSixLQUFLLENBQUNLLGFBQTlCLENBQUwsRUFBbUQ7QUFDL0NULFVBQUFBLEtBQUssQ0FBQ1EsaUJBQU4sQ0FBd0JKLEtBQUssQ0FBQ0ssYUFBOUIsSUFBK0MsRUFBL0M7QUFDSCxTQVJMLENBVUk7OztBQUNBLFlBQUlMLEtBQUssQ0FBQ0UsYUFBVixFQUF5QjtBQUNyQk4sVUFBQUEsS0FBSyxxQkFDRUEsS0FERjtBQUVETyxZQUFBQSxpQkFBaUIsb0JBQ1ZQLEtBQUssQ0FBQ08saUJBREk7QUFFYixlQUFDSCxLQUFLLENBQUNFLGFBQVAsR0FBdUIsQ0FDbkIsR0FBR04sS0FBSyxDQUFDTyxpQkFBTixDQUF3QkgsS0FBSyxDQUFDRSxhQUE5QixDQURnQixFQUVuQkwsTUFBTSxDQUFDUyxNQUZZO0FBRlY7QUFGaEIsWUFBTDtBQVVIOztBQUVELGlDQUNPVixLQURQO0FBRUlELFVBQUFBLE1BQU0sb0JBQ0NDLEtBQUssQ0FBQ0QsTUFEUDtBQUVGLGFBQUNFLE1BQU0sQ0FBQ1MsTUFBUixHQUFpQlQsTUFBTSxDQUFDSTtBQUZ0QixZQUZWO0FBTUlHLFVBQUFBLGlCQUFpQixvQkFDVlIsS0FBSyxDQUFDUSxpQkFESTtBQUViLGFBQUNKLEtBQUssQ0FBQ0ssYUFBUCxHQUF1QixDQUNuQixHQUFHVCxLQUFLLENBQUNRLGlCQUFOLENBQXdCSixLQUFLLENBQUNLLGFBQTlCLENBRGdCLEVBRW5CUixNQUFNLENBQUNTLE1BRlk7QUFGVjtBQU5yQjtBQWNIOztBQUNMO0FBQ0ksYUFBT1YsS0FBUDtBQTFDUjtBQTRDSCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGlBY3Rpb24gfSBmcm9tIFwiLi4vLi4vZGF0YU1vZGVscy9BY3Rpb25cIlxyXG5pbXBvcnQgeyBpUnNEYXRhIH0gZnJvbSBcIi4uLy4uL2RhdGFNb2RlbHMvUnNEYXRhXCJcclxuaW1wb3J0IHsgaVNjb3JlIH0gZnJvbSBcIi4uLy4uL2RhdGFNb2RlbHMvU2NvcmVcIlxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHNjb3JlcyhzdGF0ZTogaVJzRGF0YSwgYWN0aW9uOiBpQWN0aW9uLCByZXZlcnNlOiBib29sZWFuID0gZmFsc2UpOiBpUnNEYXRhIHtcclxuICAgIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcclxuICAgICAgICBjYXNlIFwiYWRkX3Njb3JlXCIgfHwgXCJtb2RpZnlfc2NvcmVcIjpcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgc2NvcmUgPSBhY3Rpb24ubmV3RGF0YSBhcyBpU2NvcmVcclxuICAgICAgICAgICAgICAgIC8vQWRkIGFueSBtaXNzaW5nIGFycmF5c1xyXG4gICAgICAgICAgICAgICAgaWYgKHNjb3JlLnBhcmVudFNjb3JlSWQgJiYgIXN0YXRlLmNoaWxkSWRzQnlTY29yZUlkW3Njb3JlLnBhcmVudFNjb3JlSWRdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RhdGUuY2hpbGRJZHNCeVNjb3JlSWRbc2NvcmUucGFyZW50U2NvcmVJZF0gPSBbXVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKCFzdGF0ZS5zY29yZUlkc0J5Q2xhaW1JZFtzY29yZS5zb3VyY2VDbGFpbUlkXSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHN0YXRlLnNjb3JlSWRzQnlDbGFpbUlkW3Njb3JlLnNvdXJjZUNsYWltSWRdID0gW11cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvL0lmIHRoZXJlIGlzIGEgcGFyZW50IHRoZW4gaW5kZXggdGhlIGNoaWxkXHJcbiAgICAgICAgICAgICAgICBpZiAoc2NvcmUucGFyZW50U2NvcmVJZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHN0YXRlID0geyAvL1RPRE86IGlzIGl0IGJhZCBmb3JtIHRvIHJlYXNzaWduIGEgcGFyYW0/XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC4uLnN0YXRlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjaGlsZElkc0J5U2NvcmVJZDoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLi4uc3RhdGUuY2hpbGRJZHNCeVNjb3JlSWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbc2NvcmUucGFyZW50U2NvcmVJZF06IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuLi5zdGF0ZS5jaGlsZElkc0J5U2NvcmVJZFtzY29yZS5wYXJlbnRTY29yZUlkXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb24uZGF0YUlkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICAuLi5zdGF0ZSxcclxuICAgICAgICAgICAgICAgICAgICBzY29yZXM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLi4uc3RhdGUuc2NvcmVzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBbYWN0aW9uLmRhdGFJZF06IGFjdGlvbi5uZXdEYXRhLFxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgc2NvcmVJZHNCeUNsYWltSWQ6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLi4uc3RhdGUuc2NvcmVJZHNCeUNsYWltSWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFtzY29yZS5zb3VyY2VDbGFpbUlkXTogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLi4uc3RhdGUuc2NvcmVJZHNCeUNsYWltSWRbc2NvcmUuc291cmNlQ2xhaW1JZF0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb24uZGF0YUlkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IGFzIGlSc0RhdGFcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgIHJldHVybiBzdGF0ZVxyXG4gICAgfVxyXG59Il19