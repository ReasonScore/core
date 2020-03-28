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
    case "add_score":
    case "modify_score":
      {
        // Since the score data might just be some of the data we need to get the current score and combine them
        const originalScore = state.scores[action.dataId];
        let score = action.newData;

        if (originalScore) {
          score = _objectSpread({}, originalScore, {}, score);
        } //Add any missing empty index arrays


        if (score.parentScoreId && !state.childIdsByScoreId[score.parentScoreId]) {
          state.childIdsByScoreId[score.parentScoreId] = [];
        }

        if (!state.scoreIdsBySourceId[score.sourceClaimId]) {
          state.scoreIdsBySourceId[score.sourceClaimId] = [];
        }

        if (score.sourceEdgeId) {
          if (!state.scoreIdsBySourceId[score.sourceEdgeId]) {
            state.scoreIdsBySourceId[score.sourceEdgeId] = [];
          }
        } //If there is a parent then index the child


        if (score.parentScoreId && state.childIdsByScoreId[score.parentScoreId].indexOf(action.dataId) == -1) {
          state = _objectSpread({}, state, {
            childIdsByScoreId: _objectSpread({}, state.childIdsByScoreId, {
              [score.parentScoreId]: [...state.childIdsByScoreId[score.parentScoreId], action.dataId]
            })
          });
        } //TODO: Do I need to stop recreating the state so many times in this reducer?


        state = _objectSpread({}, state, {
          scores: _objectSpread({}, state.scores, {
            [action.dataId]: score
          })
        });

        if (state.scoreIdsBySourceId[score.sourceClaimId].indexOf(action.dataId) == -1) {
          state = _objectSpread({}, state, {
            scores: _objectSpread({}, state.scores, {
              [action.dataId]: score
            }),
            scoreIdsBySourceId: _objectSpread({}, state.scoreIdsBySourceId, {
              [score.sourceClaimId]: [...state.scoreIdsBySourceId[score.sourceClaimId], action.dataId]
            })
          });
        } //Exception for the the sourceEdgeId exists


        if (score.sourceEdgeId && state.scoreIdsBySourceId[score.sourceEdgeId].indexOf(action.dataId) == -1) {
          if (!state.scoreIdsBySourceId[score.sourceEdgeId]) {
            state.scoreIdsBySourceId[score.sourceEdgeId] = [];
          }

          state = _objectSpread({}, state, {
            scoreIdsBySourceId: _objectSpread({}, state.scoreIdsBySourceId, {
              [score.sourceEdgeId]: [...state.scoreIdsBySourceId[score.sourceEdgeId], action.dataId]
            })
          });
        }

        return state;
      }

    default:
      return state;
  }
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9yZXBvc2l0b3JpZXMvcmVkdWNlcnMvc2NvcmVzLnRzIl0sIm5hbWVzIjpbInNjb3JlcyIsInN0YXRlIiwiYWN0aW9uIiwicmV2ZXJzZSIsInR5cGUiLCJvcmlnaW5hbFNjb3JlIiwiZGF0YUlkIiwic2NvcmUiLCJuZXdEYXRhIiwicGFyZW50U2NvcmVJZCIsImNoaWxkSWRzQnlTY29yZUlkIiwic2NvcmVJZHNCeVNvdXJjZUlkIiwic291cmNlQ2xhaW1JZCIsInNvdXJjZUVkZ2VJZCIsImluZGV4T2YiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFJTyxTQUFTQSxNQUFULENBQWdCQyxLQUFoQixFQUFnQ0MsTUFBaEMsRUFBaURDLE9BQWdCLEdBQUcsS0FBcEUsRUFBb0Y7QUFDdkYsVUFBUUQsTUFBTSxDQUFDRSxJQUFmO0FBQ0ksU0FBSyxXQUFMO0FBQ0EsU0FBSyxjQUFMO0FBQ0k7QUFDSTtBQUNBLGNBQU1DLGFBQWEsR0FBR0osS0FBSyxDQUFDRCxNQUFOLENBQWFFLE1BQU0sQ0FBQ0ksTUFBcEIsQ0FBdEI7QUFDQSxZQUFJQyxLQUFLLEdBQUdMLE1BQU0sQ0FBQ00sT0FBbkI7O0FBQ0EsWUFBSUgsYUFBSixFQUFtQjtBQUNmRSxVQUFBQSxLQUFLLHFCQUFRRixhQUFSLE1BQTBCRSxLQUExQixDQUFMO0FBQ0gsU0FOTCxDQVFJOzs7QUFDQSxZQUFJQSxLQUFLLENBQUNFLGFBQU4sSUFBdUIsQ0FBQ1IsS0FBSyxDQUFDUyxpQkFBTixDQUF3QkgsS0FBSyxDQUFDRSxhQUE5QixDQUE1QixFQUEwRTtBQUN0RVIsVUFBQUEsS0FBSyxDQUFDUyxpQkFBTixDQUF3QkgsS0FBSyxDQUFDRSxhQUE5QixJQUErQyxFQUEvQztBQUNIOztBQUNELFlBQUksQ0FBQ1IsS0FBSyxDQUFDVSxrQkFBTixDQUF5QkosS0FBSyxDQUFDSyxhQUEvQixDQUFMLEVBQW9EO0FBQ2hEWCxVQUFBQSxLQUFLLENBQUNVLGtCQUFOLENBQXlCSixLQUFLLENBQUNLLGFBQS9CLElBQWdELEVBQWhEO0FBQ0g7O0FBQ0QsWUFBSUwsS0FBSyxDQUFDTSxZQUFWLEVBQXdCO0FBQ3BCLGNBQUksQ0FBQ1osS0FBSyxDQUFDVSxrQkFBTixDQUF5QkosS0FBSyxDQUFDTSxZQUEvQixDQUFMLEVBQW1EO0FBQy9DWixZQUFBQSxLQUFLLENBQUNVLGtCQUFOLENBQXlCSixLQUFLLENBQUNNLFlBQS9CLElBQStDLEVBQS9DO0FBQ0g7QUFDSixTQW5CTCxDQXFCSTs7O0FBQ0EsWUFBSU4sS0FBSyxDQUFDRSxhQUFOLElBQXVCUixLQUFLLENBQUNTLGlCQUFOLENBQXdCSCxLQUFLLENBQUNFLGFBQTlCLEVBQTZDSyxPQUE3QyxDQUFxRFosTUFBTSxDQUFDSSxNQUE1RCxLQUF1RSxDQUFDLENBQW5HLEVBQXNHO0FBQ2xHTCxVQUFBQSxLQUFLLHFCQUNFQSxLQURGO0FBRURTLFlBQUFBLGlCQUFpQixvQkFDVlQsS0FBSyxDQUFDUyxpQkFESTtBQUViLGVBQUNILEtBQUssQ0FBQ0UsYUFBUCxHQUF1QixDQUNuQixHQUFHUixLQUFLLENBQUNTLGlCQUFOLENBQXdCSCxLQUFLLENBQUNFLGFBQTlCLENBRGdCLEVBRW5CUCxNQUFNLENBQUNJLE1BRlk7QUFGVjtBQUZoQixZQUFMO0FBVUgsU0FqQ0wsQ0FtQ0k7OztBQUNBTCxRQUFBQSxLQUFLLHFCQUNFQSxLQURGO0FBRURELFVBQUFBLE1BQU0sb0JBQ0NDLEtBQUssQ0FBQ0QsTUFEUDtBQUVGLGFBQUNFLE1BQU0sQ0FBQ0ksTUFBUixHQUFpQkM7QUFGZjtBQUZMLFVBQUw7O0FBUUEsWUFBSU4sS0FBSyxDQUFDVSxrQkFBTixDQUF5QkosS0FBSyxDQUFDSyxhQUEvQixFQUE4Q0UsT0FBOUMsQ0FBc0RaLE1BQU0sQ0FBQ0ksTUFBN0QsS0FBd0UsQ0FBQyxDQUE3RSxFQUFnRjtBQUM1RUwsVUFBQUEsS0FBSyxxQkFDRUEsS0FERjtBQUVERCxZQUFBQSxNQUFNLG9CQUNDQyxLQUFLLENBQUNELE1BRFA7QUFFRixlQUFDRSxNQUFNLENBQUNJLE1BQVIsR0FBaUJDO0FBRmYsY0FGTDtBQU1ESSxZQUFBQSxrQkFBa0Isb0JBQ1hWLEtBQUssQ0FBQ1Usa0JBREs7QUFFZCxlQUFDSixLQUFLLENBQUNLLGFBQVAsR0FBdUIsQ0FDbkIsR0FBR1gsS0FBSyxDQUFDVSxrQkFBTixDQUF5QkosS0FBSyxDQUFDSyxhQUEvQixDQURnQixFQUVuQlYsTUFBTSxDQUFDSSxNQUZZO0FBRlQ7QUFOakIsWUFBTDtBQWNILFNBM0RMLENBNkRJOzs7QUFDQSxZQUFJQyxLQUFLLENBQUNNLFlBQU4sSUFDQVosS0FBSyxDQUFDVSxrQkFBTixDQUF5QkosS0FBSyxDQUFDTSxZQUEvQixFQUE2Q0MsT0FBN0MsQ0FBcURaLE1BQU0sQ0FBQ0ksTUFBNUQsS0FBdUUsQ0FBQyxDQUQ1RSxFQUMrRTtBQUMzRSxjQUFJLENBQUNMLEtBQUssQ0FBQ1Usa0JBQU4sQ0FBeUJKLEtBQUssQ0FBQ00sWUFBL0IsQ0FBTCxFQUFtRDtBQUMvQ1osWUFBQUEsS0FBSyxDQUFDVSxrQkFBTixDQUF5QkosS0FBSyxDQUFDTSxZQUEvQixJQUErQyxFQUEvQztBQUNIOztBQUVEWixVQUFBQSxLQUFLLHFCQUNFQSxLQURGO0FBRURVLFlBQUFBLGtCQUFrQixvQkFDWFYsS0FBSyxDQUFDVSxrQkFESztBQUVkLGVBQUNKLEtBQUssQ0FBQ00sWUFBUCxHQUFzQixDQUNsQixHQUFHWixLQUFLLENBQUNVLGtCQUFOLENBQXlCSixLQUFLLENBQUNNLFlBQS9CLENBRGUsRUFFbEJYLE1BQU0sQ0FBQ0ksTUFGVztBQUZSO0FBRmpCLFlBQUw7QUFVSDs7QUFFRCxlQUFPTCxLQUFQO0FBQ0g7O0FBQ0w7QUFDSSxhQUFPQSxLQUFQO0FBdEZSO0FBd0ZIIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgaUFjdGlvbiB9IGZyb20gXCIuLi8uLi9kYXRhTW9kZWxzL0FjdGlvblwiXHJcbmltcG9ydCB7IGlSc0RhdGEgfSBmcm9tIFwiLi4vLi4vZGF0YU1vZGVscy9Sc0RhdGFcIlxyXG5pbXBvcnQgeyBpU2NvcmUgfSBmcm9tIFwiLi4vLi4vZGF0YU1vZGVscy9TY29yZVwiXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gc2NvcmVzKHN0YXRlOiBpUnNEYXRhLCBhY3Rpb246IGlBY3Rpb24sIHJldmVyc2U6IGJvb2xlYW4gPSBmYWxzZSk6IGlSc0RhdGEge1xyXG4gICAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xyXG4gICAgICAgIGNhc2UgXCJhZGRfc2NvcmVcIjpcclxuICAgICAgICBjYXNlIFwibW9kaWZ5X3Njb3JlXCI6XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIC8vIFNpbmNlIHRoZSBzY29yZSBkYXRhIG1pZ2h0IGp1c3QgYmUgc29tZSBvZiB0aGUgZGF0YSB3ZSBuZWVkIHRvIGdldCB0aGUgY3VycmVudCBzY29yZSBhbmQgY29tYmluZSB0aGVtXHJcbiAgICAgICAgICAgICAgICBjb25zdCBvcmlnaW5hbFNjb3JlID0gc3RhdGUuc2NvcmVzW2FjdGlvbi5kYXRhSWRdO1xyXG4gICAgICAgICAgICAgICAgbGV0IHNjb3JlID0gYWN0aW9uLm5ld0RhdGEgYXMgaVNjb3JlXHJcbiAgICAgICAgICAgICAgICBpZiAob3JpZ2luYWxTY29yZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNjb3JlID0geyAuLi5vcmlnaW5hbFNjb3JlLCAuLi5zY29yZSB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy9BZGQgYW55IG1pc3NpbmcgZW1wdHkgaW5kZXggYXJyYXlzXHJcbiAgICAgICAgICAgICAgICBpZiAoc2NvcmUucGFyZW50U2NvcmVJZCAmJiAhc3RhdGUuY2hpbGRJZHNCeVNjb3JlSWRbc2NvcmUucGFyZW50U2NvcmVJZF0pIHtcclxuICAgICAgICAgICAgICAgICAgICBzdGF0ZS5jaGlsZElkc0J5U2NvcmVJZFtzY29yZS5wYXJlbnRTY29yZUlkXSA9IFtdXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoIXN0YXRlLnNjb3JlSWRzQnlTb3VyY2VJZFtzY29yZS5zb3VyY2VDbGFpbUlkXSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHN0YXRlLnNjb3JlSWRzQnlTb3VyY2VJZFtzY29yZS5zb3VyY2VDbGFpbUlkXSA9IFtdXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoc2NvcmUuc291cmNlRWRnZUlkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFzdGF0ZS5zY29yZUlkc0J5U291cmNlSWRbc2NvcmUuc291cmNlRWRnZUlkXSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGF0ZS5zY29yZUlkc0J5U291cmNlSWRbc2NvcmUuc291cmNlRWRnZUlkXSA9IFtdXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vSWYgdGhlcmUgaXMgYSBwYXJlbnQgdGhlbiBpbmRleCB0aGUgY2hpbGRcclxuICAgICAgICAgICAgICAgIGlmIChzY29yZS5wYXJlbnRTY29yZUlkICYmIHN0YXRlLmNoaWxkSWRzQnlTY29yZUlkW3Njb3JlLnBhcmVudFNjb3JlSWRdLmluZGV4T2YoYWN0aW9uLmRhdGFJZCkgPT0gLTEpIHtcclxuICAgICAgICAgICAgICAgICAgICBzdGF0ZSA9IHsgLy9UT0RPOiBpcyBpdCBiYWQgZm9ybSB0byByZWFzc2lnbiBhIHBhcmFtP1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAuLi5zdGF0ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGRJZHNCeVNjb3JlSWQ6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC4uLnN0YXRlLmNoaWxkSWRzQnlTY29yZUlkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW3Njb3JlLnBhcmVudFNjb3JlSWRdOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLi4uc3RhdGUuY2hpbGRJZHNCeVNjb3JlSWRbc2NvcmUucGFyZW50U2NvcmVJZF0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uLmRhdGFJZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vVE9ETzogRG8gSSBuZWVkIHRvIHN0b3AgcmVjcmVhdGluZyB0aGUgc3RhdGUgc28gbWFueSB0aW1lcyBpbiB0aGlzIHJlZHVjZXI/XHJcbiAgICAgICAgICAgICAgICBzdGF0ZSA9IHtcclxuICAgICAgICAgICAgICAgICAgICAuLi5zdGF0ZSxcclxuICAgICAgICAgICAgICAgICAgICBzY29yZXM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLi4uc3RhdGUuc2NvcmVzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBbYWN0aW9uLmRhdGFJZF06IHNjb3JlLFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoc3RhdGUuc2NvcmVJZHNCeVNvdXJjZUlkW3Njb3JlLnNvdXJjZUNsYWltSWRdLmluZGV4T2YoYWN0aW9uLmRhdGFJZCkgPT0gLTEpIHtcclxuICAgICAgICAgICAgICAgICAgICBzdGF0ZSA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLi4uc3RhdGUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjb3Jlczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLi4uc3RhdGUuc2NvcmVzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW2FjdGlvbi5kYXRhSWRdOiBzY29yZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2NvcmVJZHNCeVNvdXJjZUlkOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuLi5zdGF0ZS5zY29yZUlkc0J5U291cmNlSWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbc2NvcmUuc291cmNlQ2xhaW1JZF06IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuLi5zdGF0ZS5zY29yZUlkc0J5U291cmNlSWRbc2NvcmUuc291cmNlQ2xhaW1JZF0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uLmRhdGFJZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vRXhjZXB0aW9uIGZvciB0aGUgdGhlIHNvdXJjZUVkZ2VJZCBleGlzdHNcclxuICAgICAgICAgICAgICAgIGlmIChzY29yZS5zb3VyY2VFZGdlSWQgJiYgXHJcbiAgICAgICAgICAgICAgICAgICAgc3RhdGUuc2NvcmVJZHNCeVNvdXJjZUlkW3Njb3JlLnNvdXJjZUVkZ2VJZF0uaW5kZXhPZihhY3Rpb24uZGF0YUlkKSA9PSAtMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghc3RhdGUuc2NvcmVJZHNCeVNvdXJjZUlkW3Njb3JlLnNvdXJjZUVkZ2VJZF0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGUuc2NvcmVJZHNCeVNvdXJjZUlkW3Njb3JlLnNvdXJjZUVkZ2VJZF0gPSBbXVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgc3RhdGUgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC4uLnN0YXRlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzY29yZUlkc0J5U291cmNlSWQ6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC4uLnN0YXRlLnNjb3JlSWRzQnlTb3VyY2VJZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtzY29yZS5zb3VyY2VFZGdlSWRdOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLi4uc3RhdGUuc2NvcmVJZHNCeVNvdXJjZUlkW3Njb3JlLnNvdXJjZUVkZ2VJZF0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uLmRhdGFJZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiBzdGF0ZSBhcyBpUnNEYXRhXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICByZXR1cm4gc3RhdGVcclxuICAgIH1cclxufSJdfQ==