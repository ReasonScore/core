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
        const score = action.newData;
        debugger; //Add any missing arrays

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9yZXBvc2l0b3JpZXMvcmVkdWNlcnMvc2NvcmVzLnRzIl0sIm5hbWVzIjpbInNjb3JlcyIsInN0YXRlIiwiYWN0aW9uIiwicmV2ZXJzZSIsInR5cGUiLCJzY29yZSIsIm5ld0RhdGEiLCJwYXJlbnRTY29yZUlkIiwiY2hpbGRJZHNCeVNjb3JlSWQiLCJzY29yZUlkc0J5Q2xhaW1JZCIsInNvdXJjZUNsYWltSWQiLCJkYXRhSWQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFJTyxTQUFTQSxNQUFULENBQWdCQyxLQUFoQixFQUFnQ0MsTUFBaEMsRUFBaURDLE9BQWdCLEdBQUcsS0FBcEUsRUFBb0Y7QUFDdkYsVUFBUUQsTUFBTSxDQUFDRSxJQUFmO0FBQ0ksU0FBSyxlQUFlLGNBQXBCO0FBQ0k7QUFDSSxjQUFNQyxLQUFLLEdBQUdILE1BQU0sQ0FBQ0ksT0FBckI7QUFDaEIsaUJBRlksQ0FHSTs7QUFDQSxZQUFJRCxLQUFLLENBQUNFLGFBQU4sSUFBdUIsQ0FBQ04sS0FBSyxDQUFDTyxpQkFBTixDQUF3QkgsS0FBSyxDQUFDRSxhQUE5QixDQUE1QixFQUEwRTtBQUN0RU4sVUFBQUEsS0FBSyxDQUFDTyxpQkFBTixDQUF3QkgsS0FBSyxDQUFDRSxhQUE5QixJQUErQyxFQUEvQztBQUNIOztBQUNELFlBQUksQ0FBQ04sS0FBSyxDQUFDUSxpQkFBTixDQUF3QkosS0FBSyxDQUFDSyxhQUE5QixDQUFMLEVBQW1EO0FBQy9DVCxVQUFBQSxLQUFLLENBQUNRLGlCQUFOLENBQXdCSixLQUFLLENBQUNLLGFBQTlCLElBQStDLEVBQS9DO0FBQ0gsU0FUTCxDQVdJOzs7QUFDQSxZQUFJTCxLQUFLLENBQUNFLGFBQVYsRUFBeUI7QUFDckJOLFVBQUFBLEtBQUsscUJBQ0VBLEtBREY7QUFFRE8sWUFBQUEsaUJBQWlCLG9CQUNWUCxLQUFLLENBQUNPLGlCQURJO0FBRWIsZUFBQ0gsS0FBSyxDQUFDRSxhQUFQLEdBQXVCLENBQ25CLEdBQUdOLEtBQUssQ0FBQ08saUJBQU4sQ0FBd0JILEtBQUssQ0FBQ0UsYUFBOUIsQ0FEZ0IsRUFFbkJMLE1BQU0sQ0FBQ1MsTUFGWTtBQUZWO0FBRmhCLFlBQUw7QUFVSDs7QUFFRCxpQ0FDT1YsS0FEUDtBQUVJRCxVQUFBQSxNQUFNLG9CQUNDQyxLQUFLLENBQUNELE1BRFA7QUFFRixhQUFDRSxNQUFNLENBQUNTLE1BQVIsR0FBaUJULE1BQU0sQ0FBQ0k7QUFGdEIsWUFGVjtBQU1JRyxVQUFBQSxpQkFBaUIsb0JBQ1ZSLEtBQUssQ0FBQ1EsaUJBREk7QUFFYixhQUFDSixLQUFLLENBQUNLLGFBQVAsR0FBdUIsQ0FDbkIsR0FBR1QsS0FBSyxDQUFDUSxpQkFBTixDQUF3QkosS0FBSyxDQUFDSyxhQUE5QixDQURnQixFQUVuQlIsTUFBTSxDQUFDUyxNQUZZO0FBRlY7QUFOckI7QUFjSDs7QUFDTDtBQUNJLGFBQU9WLEtBQVA7QUEzQ1I7QUE2Q0giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBpQWN0aW9uIH0gZnJvbSBcIi4uLy4uL2RhdGFNb2RlbHMvQWN0aW9uXCJcclxuaW1wb3J0IHsgaVJzRGF0YSB9IGZyb20gXCIuLi8uLi9kYXRhTW9kZWxzL1JzRGF0YVwiXHJcbmltcG9ydCB7IGlTY29yZSB9IGZyb20gXCIuLi8uLi9kYXRhTW9kZWxzL1Njb3JlXCJcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBzY29yZXMoc3RhdGU6IGlSc0RhdGEsIGFjdGlvbjogaUFjdGlvbiwgcmV2ZXJzZTogYm9vbGVhbiA9IGZhbHNlKTogaVJzRGF0YSB7XHJcbiAgICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XHJcbiAgICAgICAgY2FzZSBcImFkZF9zY29yZVwiIHx8IFwibW9kaWZ5X3Njb3JlXCI6XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHNjb3JlID0gYWN0aW9uLm5ld0RhdGEgYXMgaVNjb3JlXHJcbmRlYnVnZ2VyXHJcbiAgICAgICAgICAgICAgICAvL0FkZCBhbnkgbWlzc2luZyBhcnJheXNcclxuICAgICAgICAgICAgICAgIGlmIChzY29yZS5wYXJlbnRTY29yZUlkICYmICFzdGF0ZS5jaGlsZElkc0J5U2NvcmVJZFtzY29yZS5wYXJlbnRTY29yZUlkXSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHN0YXRlLmNoaWxkSWRzQnlTY29yZUlkW3Njb3JlLnBhcmVudFNjb3JlSWRdID0gW11cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmICghc3RhdGUuc2NvcmVJZHNCeUNsYWltSWRbc2NvcmUuc291cmNlQ2xhaW1JZF0pIHtcclxuICAgICAgICAgICAgICAgICAgICBzdGF0ZS5zY29yZUlkc0J5Q2xhaW1JZFtzY29yZS5zb3VyY2VDbGFpbUlkXSA9IFtdXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy9JZiB0aGVyZSBpcyBhIHBhcmVudCB0aGVuIGluZGV4IHRoZSBjaGlsZFxyXG4gICAgICAgICAgICAgICAgaWYgKHNjb3JlLnBhcmVudFNjb3JlSWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBzdGF0ZSA9IHsgLy9UT0RPOiBpcyBpdCBiYWQgZm9ybSB0byByZWFzc2lnbiBhIHBhcmFtP1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAuLi5zdGF0ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGRJZHNCeVNjb3JlSWQ6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC4uLnN0YXRlLmNoaWxkSWRzQnlTY29yZUlkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW3Njb3JlLnBhcmVudFNjb3JlSWRdOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLi4uc3RhdGUuY2hpbGRJZHNCeVNjb3JlSWRbc2NvcmUucGFyZW50U2NvcmVJZF0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uLmRhdGFJZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLi4uc3RhdGUsXHJcbiAgICAgICAgICAgICAgICAgICAgc2NvcmVzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC4uLnN0YXRlLnNjb3JlcyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgW2FjdGlvbi5kYXRhSWRdOiBhY3Rpb24ubmV3RGF0YSxcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHNjb3JlSWRzQnlDbGFpbUlkOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC4uLnN0YXRlLnNjb3JlSWRzQnlDbGFpbUlkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBbc2NvcmUuc291cmNlQ2xhaW1JZF06IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC4uLnN0YXRlLnNjb3JlSWRzQnlDbGFpbUlkW3Njb3JlLnNvdXJjZUNsYWltSWRdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uLmRhdGFJZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBhcyBpUnNEYXRhXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICByZXR1cm4gc3RhdGVcclxuICAgIH1cclxufSJdfQ==