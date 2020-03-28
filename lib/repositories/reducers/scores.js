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


        if (score.parentScoreId) {
          state = _objectSpread({}, state, {
            childIdsByScoreId: _objectSpread({}, state.childIdsByScoreId, {
              [score.parentScoreId]: [...state.childIdsByScoreId[score.parentScoreId], action.dataId]
            })
          });
        }

        state = _objectSpread({}, state, {
          scores: _objectSpread({}, state.scores, {
            [action.dataId]: score
          }),
          scoreIdsBySourceId: _objectSpread({}, state.scoreIdsBySourceId, {
            [score.sourceClaimId]: [...state.scoreIdsBySourceId[score.sourceClaimId], action.dataId]
          })
        }); //Exception for the the sourceEdgeId exists

        if (score.sourceEdgeId) {
          if (!state.scoreIdsBySourceId[score.sourceEdgeId]) {
            state.scoreIdsBySourceId[score.sourceEdgeId] = [];
          }

          state = _objectSpread({}, state, {
            scoreIdsBySourceId: _objectSpread({}, state.scoreIdsBySourceId, {
              [score.sourceEdgeId]: [...state.scoreIdsBySourceId[score.sourceClaimId], action.dataId]
            })
          });
        }

        return state;
      }

    default:
      return state;
  }
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9yZXBvc2l0b3JpZXMvcmVkdWNlcnMvc2NvcmVzLnRzIl0sIm5hbWVzIjpbInNjb3JlcyIsInN0YXRlIiwiYWN0aW9uIiwicmV2ZXJzZSIsInR5cGUiLCJvcmlnaW5hbFNjb3JlIiwiZGF0YUlkIiwic2NvcmUiLCJuZXdEYXRhIiwicGFyZW50U2NvcmVJZCIsImNoaWxkSWRzQnlTY29yZUlkIiwic2NvcmVJZHNCeVNvdXJjZUlkIiwic291cmNlQ2xhaW1JZCIsInNvdXJjZUVkZ2VJZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUlPLFNBQVNBLE1BQVQsQ0FBZ0JDLEtBQWhCLEVBQWdDQyxNQUFoQyxFQUFpREMsT0FBZ0IsR0FBRyxLQUFwRSxFQUFvRjtBQUN2RixVQUFRRCxNQUFNLENBQUNFLElBQWY7QUFDSSxTQUFLLFdBQUw7QUFDQSxTQUFLLGNBQUw7QUFDSTtBQUNJO0FBQ0EsY0FBTUMsYUFBYSxHQUFHSixLQUFLLENBQUNELE1BQU4sQ0FBYUUsTUFBTSxDQUFDSSxNQUFwQixDQUF0QjtBQUNBLFlBQUlDLEtBQUssR0FBR0wsTUFBTSxDQUFDTSxPQUFuQjs7QUFDQSxZQUFJSCxhQUFKLEVBQW1CO0FBQ2ZFLFVBQUFBLEtBQUsscUJBQVFGLGFBQVIsTUFBMEJFLEtBQTFCLENBQUw7QUFDSCxTQU5MLENBUUk7OztBQUNBLFlBQUlBLEtBQUssQ0FBQ0UsYUFBTixJQUF1QixDQUFDUixLQUFLLENBQUNTLGlCQUFOLENBQXdCSCxLQUFLLENBQUNFLGFBQTlCLENBQTVCLEVBQTBFO0FBQ3RFUixVQUFBQSxLQUFLLENBQUNTLGlCQUFOLENBQXdCSCxLQUFLLENBQUNFLGFBQTlCLElBQStDLEVBQS9DO0FBQ0g7O0FBQ0QsWUFBSSxDQUFDUixLQUFLLENBQUNVLGtCQUFOLENBQXlCSixLQUFLLENBQUNLLGFBQS9CLENBQUwsRUFBb0Q7QUFDaERYLFVBQUFBLEtBQUssQ0FBQ1Usa0JBQU4sQ0FBeUJKLEtBQUssQ0FBQ0ssYUFBL0IsSUFBZ0QsRUFBaEQ7QUFDSDs7QUFDRCxZQUFJTCxLQUFLLENBQUNNLFlBQVYsRUFBd0I7QUFDcEIsY0FBSSxDQUFDWixLQUFLLENBQUNVLGtCQUFOLENBQXlCSixLQUFLLENBQUNNLFlBQS9CLENBQUwsRUFBbUQ7QUFDL0NaLFlBQUFBLEtBQUssQ0FBQ1Usa0JBQU4sQ0FBeUJKLEtBQUssQ0FBQ00sWUFBL0IsSUFBK0MsRUFBL0M7QUFDSDtBQUNKLFNBbkJMLENBcUJJOzs7QUFDQSxZQUFJTixLQUFLLENBQUNFLGFBQVYsRUFBeUI7QUFDckJSLFVBQUFBLEtBQUsscUJBQ0VBLEtBREY7QUFFRFMsWUFBQUEsaUJBQWlCLG9CQUNWVCxLQUFLLENBQUNTLGlCQURJO0FBRWIsZUFBQ0gsS0FBSyxDQUFDRSxhQUFQLEdBQXVCLENBQ25CLEdBQUdSLEtBQUssQ0FBQ1MsaUJBQU4sQ0FBd0JILEtBQUssQ0FBQ0UsYUFBOUIsQ0FEZ0IsRUFFbkJQLE1BQU0sQ0FBQ0ksTUFGWTtBQUZWO0FBRmhCLFlBQUw7QUFVSDs7QUFFREwsUUFBQUEsS0FBSyxxQkFDRUEsS0FERjtBQUVERCxVQUFBQSxNQUFNLG9CQUNDQyxLQUFLLENBQUNELE1BRFA7QUFFRixhQUFDRSxNQUFNLENBQUNJLE1BQVIsR0FBaUJDO0FBRmYsWUFGTDtBQU1ESSxVQUFBQSxrQkFBa0Isb0JBQ1hWLEtBQUssQ0FBQ1Usa0JBREs7QUFFZCxhQUFDSixLQUFLLENBQUNLLGFBQVAsR0FBdUIsQ0FDbkIsR0FBR1gsS0FBSyxDQUFDVSxrQkFBTixDQUF5QkosS0FBSyxDQUFDSyxhQUEvQixDQURnQixFQUVuQlYsTUFBTSxDQUFDSSxNQUZZO0FBRlQ7QUFOakIsVUFBTCxDQW5DSixDQWtESTs7QUFDQSxZQUFJQyxLQUFLLENBQUNNLFlBQVYsRUFBd0I7QUFDcEIsY0FBSSxDQUFDWixLQUFLLENBQUNVLGtCQUFOLENBQXlCSixLQUFLLENBQUNNLFlBQS9CLENBQUwsRUFBbUQ7QUFDL0NaLFlBQUFBLEtBQUssQ0FBQ1Usa0JBQU4sQ0FBeUJKLEtBQUssQ0FBQ00sWUFBL0IsSUFBK0MsRUFBL0M7QUFDSDs7QUFFRFosVUFBQUEsS0FBSyxxQkFDRUEsS0FERjtBQUVEVSxZQUFBQSxrQkFBa0Isb0JBQ1hWLEtBQUssQ0FBQ1Usa0JBREs7QUFFZCxlQUFDSixLQUFLLENBQUNNLFlBQVAsR0FBc0IsQ0FDbEIsR0FBR1osS0FBSyxDQUFDVSxrQkFBTixDQUF5QkosS0FBSyxDQUFDSyxhQUEvQixDQURlLEVBRWxCVixNQUFNLENBQUNJLE1BRlc7QUFGUjtBQUZqQixZQUFMO0FBVUg7O0FBRUQsZUFBT0wsS0FBUDtBQUNIOztBQUNMO0FBQ0ksYUFBT0EsS0FBUDtBQTFFUjtBQTRFSCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGlBY3Rpb24gfSBmcm9tIFwiLi4vLi4vZGF0YU1vZGVscy9BY3Rpb25cIlxyXG5pbXBvcnQgeyBpUnNEYXRhIH0gZnJvbSBcIi4uLy4uL2RhdGFNb2RlbHMvUnNEYXRhXCJcclxuaW1wb3J0IHsgaVNjb3JlIH0gZnJvbSBcIi4uLy4uL2RhdGFNb2RlbHMvU2NvcmVcIlxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHNjb3JlcyhzdGF0ZTogaVJzRGF0YSwgYWN0aW9uOiBpQWN0aW9uLCByZXZlcnNlOiBib29sZWFuID0gZmFsc2UpOiBpUnNEYXRhIHtcclxuICAgIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcclxuICAgICAgICBjYXNlIFwiYWRkX3Njb3JlXCI6XHJcbiAgICAgICAgY2FzZSBcIm1vZGlmeV9zY29yZVwiOlxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAvLyBTaW5jZSB0aGUgc2NvcmUgZGF0YSBtaWdodCBqdXN0IGJlIHNvbWUgb2YgdGhlIGRhdGEgd2UgbmVlZCB0byBnZXQgdGhlIGN1cnJlbnQgc2NvcmUgYW5kIGNvbWJpbmUgdGhlbVxyXG4gICAgICAgICAgICAgICAgY29uc3Qgb3JpZ2luYWxTY29yZSA9IHN0YXRlLnNjb3Jlc1thY3Rpb24uZGF0YUlkXTtcclxuICAgICAgICAgICAgICAgIGxldCBzY29yZSA9IGFjdGlvbi5uZXdEYXRhIGFzIGlTY29yZVxyXG4gICAgICAgICAgICAgICAgaWYgKG9yaWdpbmFsU2NvcmUpIHtcclxuICAgICAgICAgICAgICAgICAgICBzY29yZSA9IHsgLi4ub3JpZ2luYWxTY29yZSwgLi4uc2NvcmUgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vQWRkIGFueSBtaXNzaW5nIGVtcHR5IGluZGV4IGFycmF5c1xyXG4gICAgICAgICAgICAgICAgaWYgKHNjb3JlLnBhcmVudFNjb3JlSWQgJiYgIXN0YXRlLmNoaWxkSWRzQnlTY29yZUlkW3Njb3JlLnBhcmVudFNjb3JlSWRdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RhdGUuY2hpbGRJZHNCeVNjb3JlSWRbc2NvcmUucGFyZW50U2NvcmVJZF0gPSBbXVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKCFzdGF0ZS5zY29yZUlkc0J5U291cmNlSWRbc2NvcmUuc291cmNlQ2xhaW1JZF0pIHtcclxuICAgICAgICAgICAgICAgICAgICBzdGF0ZS5zY29yZUlkc0J5U291cmNlSWRbc2NvcmUuc291cmNlQ2xhaW1JZF0gPSBbXVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKHNjb3JlLnNvdXJjZUVkZ2VJZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghc3RhdGUuc2NvcmVJZHNCeVNvdXJjZUlkW3Njb3JlLnNvdXJjZUVkZ2VJZF0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGUuc2NvcmVJZHNCeVNvdXJjZUlkW3Njb3JlLnNvdXJjZUVkZ2VJZF0gPSBbXVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvL0lmIHRoZXJlIGlzIGEgcGFyZW50IHRoZW4gaW5kZXggdGhlIGNoaWxkXHJcbiAgICAgICAgICAgICAgICBpZiAoc2NvcmUucGFyZW50U2NvcmVJZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHN0YXRlID0geyAvL1RPRE86IGlzIGl0IGJhZCBmb3JtIHRvIHJlYXNzaWduIGEgcGFyYW0/XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC4uLnN0YXRlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjaGlsZElkc0J5U2NvcmVJZDoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLi4uc3RhdGUuY2hpbGRJZHNCeVNjb3JlSWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbc2NvcmUucGFyZW50U2NvcmVJZF06IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuLi5zdGF0ZS5jaGlsZElkc0J5U2NvcmVJZFtzY29yZS5wYXJlbnRTY29yZUlkXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb24uZGF0YUlkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgc3RhdGUgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLi4uc3RhdGUsXHJcbiAgICAgICAgICAgICAgICAgICAgc2NvcmVzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC4uLnN0YXRlLnNjb3JlcyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgW2FjdGlvbi5kYXRhSWRdOiBzY29yZSxcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHNjb3JlSWRzQnlTb3VyY2VJZDoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAuLi5zdGF0ZS5zY29yZUlkc0J5U291cmNlSWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFtzY29yZS5zb3VyY2VDbGFpbUlkXTogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLi4uc3RhdGUuc2NvcmVJZHNCeVNvdXJjZUlkW3Njb3JlLnNvdXJjZUNsYWltSWRdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uLmRhdGFJZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vRXhjZXB0aW9uIGZvciB0aGUgdGhlIHNvdXJjZUVkZ2VJZCBleGlzdHNcclxuICAgICAgICAgICAgICAgIGlmIChzY29yZS5zb3VyY2VFZGdlSWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIXN0YXRlLnNjb3JlSWRzQnlTb3VyY2VJZFtzY29yZS5zb3VyY2VFZGdlSWRdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRlLnNjb3JlSWRzQnlTb3VyY2VJZFtzY29yZS5zb3VyY2VFZGdlSWRdID0gW11cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHN0YXRlID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAuLi5zdGF0ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2NvcmVJZHNCeVNvdXJjZUlkOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuLi5zdGF0ZS5zY29yZUlkc0J5U291cmNlSWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbc2NvcmUuc291cmNlRWRnZUlkXTogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC4uLnN0YXRlLnNjb3JlSWRzQnlTb3VyY2VJZFtzY29yZS5zb3VyY2VDbGFpbUlkXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb24uZGF0YUlkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHN0YXRlIGFzIGlSc0RhdGFcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgIHJldHVybiBzdGF0ZVxyXG4gICAgfVxyXG59Il19