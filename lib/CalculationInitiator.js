"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CalculationInitator = void 0;

var _Change = require("./dataModels/Change");

var _Type = require("./dataModels/Type");

var _ScoreAndClaimEdge = require("./dataModels/ScoreAndClaimEdge");

var _calculateScore = require("./calculateScore");

var _Score = require("./dataModels/Score");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var CalculationInitator =
/*#__PURE__*/
function () {
  function CalculationInitator(repo) {
    var subscriber = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

    _classCallCheck(this, CalculationInitator);

    this.repo = repo;
    this.subscriber = subscriber;
  }
  /** this function can be called by outside code to notfy this repository of changes */


  _createClass(CalculationInitator, [{
    key: "notify",
    value: function notify(changes) {
      return regeneratorRuntime.async(function notify$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return regeneratorRuntime.awrap(this.repo.notify(changes));

            case 2:
              if (this.subscriber) {
                this.subscriber(changes);
              }

              _context.next = 5;
              return regeneratorRuntime.awrap(this.CalculationInitiator(changes));

            case 5:
            case "end":
              return _context.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "CalculationInitiator",
    value: function CalculationInitiator(changes) {
      var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, change, newItem, oldItemVersion, claimEdge, claim, score, claimseEdges, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, _claimEdge;

      return regeneratorRuntime.async(function CalculationInitiator$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _iteratorNormalCompletion = true;
              _didIteratorError = false;
              _iteratorError = undefined;
              _context2.prev = 3;
              _iterator = changes[Symbol.iterator]();

            case 5:
              if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                _context2.next = 51;
                break;
              }

              change = _step.value;
              newItem = change.newItem, oldItemVersion = change.oldItemVersion; // Initiate calculations from a changed/new claim Edge

              if (!(newItem.type == _Type.Type.claimEdge)) {
                _context2.next = 12;
                break;
              }

              claimEdge = newItem;
              _context2.next = 12;
              return regeneratorRuntime.awrap(this.CalculateByClaimId(claimEdge.parentId));

            case 12:
              if (!(newItem.type == _Type.Type.claim)) {
                _context2.next = 16;
                break;
              }

              claim = newItem;
              _context2.next = 16;
              return regeneratorRuntime.awrap(this.CalculateByClaimId(claim.id));

            case 16:
              if (!(newItem.type == _Type.Type.score)) {
                _context2.next = 48;
                break;
              }

              score = newItem; // Get all the claimEdges that have this score's SourceClaimId as the child and re calculate them

              _context2.next = 20;
              return regeneratorRuntime.awrap(this.repo.getClaimEdgesByChildId(score.sourceClaimId));

            case 20:
              claimseEdges = _context2.sent;
              if (score.sourceClaimId.toString() == "measuredClaim") debugger;
              _iteratorNormalCompletion2 = true;
              _didIteratorError2 = false;
              _iteratorError2 = undefined;
              _context2.prev = 25;
              _iterator2 = claimseEdges[Symbol.iterator]();

            case 27:
              if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
                _context2.next = 34;
                break;
              }

              _claimEdge = _step2.value;
              _context2.next = 31;
              return regeneratorRuntime.awrap(this.CalculateByClaimId(_claimEdge.parentId));

            case 31:
              _iteratorNormalCompletion2 = true;
              _context2.next = 27;
              break;

            case 34:
              _context2.next = 40;
              break;

            case 36:
              _context2.prev = 36;
              _context2.t0 = _context2["catch"](25);
              _didIteratorError2 = true;
              _iteratorError2 = _context2.t0;

            case 40:
              _context2.prev = 40;
              _context2.prev = 41;

              if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
                _iterator2["return"]();
              }

            case 43:
              _context2.prev = 43;

              if (!_didIteratorError2) {
                _context2.next = 46;
                break;
              }

              throw _iteratorError2;

            case 46:
              return _context2.finish(43);

            case 47:
              return _context2.finish(40);

            case 48:
              _iteratorNormalCompletion = true;
              _context2.next = 5;
              break;

            case 51:
              _context2.next = 57;
              break;

            case 53:
              _context2.prev = 53;
              _context2.t1 = _context2["catch"](3);
              _didIteratorError = true;
              _iteratorError = _context2.t1;

            case 57:
              _context2.prev = 57;
              _context2.prev = 58;

              if (!_iteratorNormalCompletion && _iterator["return"] != null) {
                _iterator["return"]();
              }

            case 60:
              _context2.prev = 60;

              if (!_didIteratorError) {
                _context2.next = 63;
                break;
              }

              throw _iteratorError;

            case 63:
              return _context2.finish(60);

            case 64:
              return _context2.finish(57);

            case 65:
            case "end":
              return _context2.stop();
          }
        }
      }, null, this, [[3, 53, 57, 65], [25, 36, 40, 48], [41,, 43, 47], [58,, 60, 64]]);
    }
  }, {
    key: "CalculateByClaimId",
    value: function CalculateByClaimId(parentId) {
      var scoreAndClaimEdges, reversible, parentItem, parentClaim, claimseEdges, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, claimseEdge, scoreItem, newScore, oldScore;

      return regeneratorRuntime.async(function CalculateByClaimId$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              scoreAndClaimEdges = []; //Is parent reversible?

              reversible = false;
              _context3.next = 4;
              return regeneratorRuntime.awrap(this.repo.getItem(parentId));

            case 4:
              parentItem = _context3.sent;

              if (parentItem) {
                parentClaim = parentItem;
                reversible = parentClaim.reversible;
              } //Get all the claims for the parent to calculate the score


              _context3.next = 8;
              return regeneratorRuntime.awrap(this.repo.getClaimEdgesByParentId(parentId));

            case 8:
              claimseEdges = _context3.sent;
              _iteratorNormalCompletion3 = true;
              _didIteratorError3 = false;
              _iteratorError3 = undefined;
              _context3.prev = 12;
              _iterator3 = claimseEdges[Symbol.iterator]();

            case 14:
              if (_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done) {
                _context3.next = 23;
                break;
              }

              claimseEdge = _step3.value;
              _context3.next = 18;
              return regeneratorRuntime.awrap(this.repo.getScoreBySourceClaimId(claimseEdge.childId));

            case 18:
              scoreItem = _context3.sent;
              scoreAndClaimEdges.push(new _ScoreAndClaimEdge.ScoreAndClaimEdge(scoreItem, claimseEdge));

            case 20:
              _iteratorNormalCompletion3 = true;
              _context3.next = 14;
              break;

            case 23:
              _context3.next = 29;
              break;

            case 25:
              _context3.prev = 25;
              _context3.t0 = _context3["catch"](12);
              _didIteratorError3 = true;
              _iteratorError3 = _context3.t0;

            case 29:
              _context3.prev = 29;
              _context3.prev = 30;

              if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
                _iterator3["return"]();
              }

            case 32:
              _context3.prev = 32;

              if (!_didIteratorError3) {
                _context3.next = 35;
                break;
              }

              throw _iteratorError3;

            case 35:
              return _context3.finish(32);

            case 36:
              return _context3.finish(29);

            case 37:
              newScore = (0, _calculateScore.calculateScore)({
                scoreAndClaimEdges: scoreAndClaimEdges,
                reversible: reversible,
                sourceClaimId: parentId
              });
              _context3.next = 40;
              return regeneratorRuntime.awrap(this.repo.getScoreBySourceClaimId(newScore.sourceClaimId));

            case 40:
              oldScore = _context3.sent;

              if (!oldScore) {
                _context3.next = 48;
                break;
              }

              if (!(0, _Score.differentScores)(oldScore, newScore)) {
                _context3.next = 46;
                break;
              }

              newScore.id = oldScore.id;
              _context3.next = 46;
              return regeneratorRuntime.awrap(this.notify([new _Change.Change(newScore, oldScore.id)]));

            case 46:
              _context3.next = 50;
              break;

            case 48:
              _context3.next = 50;
              return regeneratorRuntime.awrap(this.notify([new _Change.Change(newScore)]));

            case 50:
            case "end":
              return _context3.stop();
          }
        }
      }, null, this, [[12, 25, 29, 37], [30,, 32, 36]]);
    }
  }]);

  return CalculationInitator;
}();

exports.CalculationInitator = CalculationInitator;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9DYWxjdWxhdGlvbkluaXRpYXRvci50cyJdLCJuYW1lcyI6WyJDYWxjdWxhdGlvbkluaXRhdG9yIiwicmVwbyIsInN1YnNjcmliZXIiLCJ1bmRlZmluZWQiLCJjaGFuZ2VzIiwibm90aWZ5IiwiQ2FsY3VsYXRpb25Jbml0aWF0b3IiLCJjaGFuZ2UiLCJuZXdJdGVtIiwib2xkSXRlbVZlcnNpb24iLCJ0eXBlIiwiVHlwZSIsImNsYWltRWRnZSIsIkNhbGN1bGF0ZUJ5Q2xhaW1JZCIsInBhcmVudElkIiwiY2xhaW0iLCJpZCIsInNjb3JlIiwiZ2V0Q2xhaW1FZGdlc0J5Q2hpbGRJZCIsInNvdXJjZUNsYWltSWQiLCJjbGFpbXNlRWRnZXMiLCJ0b1N0cmluZyIsInNjb3JlQW5kQ2xhaW1FZGdlcyIsInJldmVyc2libGUiLCJnZXRJdGVtIiwicGFyZW50SXRlbSIsInBhcmVudENsYWltIiwiZ2V0Q2xhaW1FZGdlc0J5UGFyZW50SWQiLCJjbGFpbXNlRWRnZSIsImdldFNjb3JlQnlTb3VyY2VDbGFpbUlkIiwiY2hpbGRJZCIsInNjb3JlSXRlbSIsInB1c2giLCJTY29yZUFuZENsYWltRWRnZSIsIm5ld1Njb3JlIiwib2xkU2NvcmUiLCJDaGFuZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFFQTs7QUFDQTs7QUFFQTs7QUFDQTs7Ozs7Ozs7SUFLYUEsbUI7OztBQUVULCtCQUNXQyxJQURYLEVBR0U7QUFBQSxRQURTQyxVQUNULHVFQURpRUMsU0FDakU7O0FBQUE7O0FBQUEsU0FGU0YsSUFFVCxHQUZTQSxJQUVUO0FBQUEsU0FEU0MsVUFDVCxHQURTQSxVQUNUO0FBQ0Q7QUFFRDs7Ozs7MkJBQ2FFLE87Ozs7Ozs4Q0FDSCxLQUFLSCxJQUFMLENBQVVJLE1BQVYsQ0FBaUJELE9BQWpCLEM7OztBQUNOLGtCQUFJLEtBQUtGLFVBQVQsRUFBcUI7QUFDakIscUJBQUtBLFVBQUwsQ0FBZ0JFLE9BQWhCO0FBQ0g7Ozs4Q0FDSyxLQUFLRSxvQkFBTCxD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XHJcbmltcG9ydCB7IFJlcG9zaXRvcnkgfSBmcm9tIFwiLi9SZXBvc2l0b3J5XCI7XHJcbmltcG9ydCB7IFR5cGUgfSBmcm9tIFwiLi9kYXRhTW9kZWxzL1R5cGVcIjtcclxuaW1wb3J0IHsgU2NvcmVBbmRDbGFpbUVkZ2UgfSBmcm9tIFwiLi9kYXRhTW9kZWxzL1Njb3JlQW5kQ2xhaW1FZGdlXCI7XHJcbmltcG9ydCB7IENsYWltRWRnZSB9IGZyb20gXCIuL2RhdGFNb2RlbHMvQ2xhaW1FZGdlXCI7XHJcbmltcG9ydCB7IGNhbGN1bGF0ZVNjb3JlIH0gZnJvbSBcIi4vY2FsY3VsYXRlU2NvcmVcIjtcclxuaW1wb3J0IHsgU2NvcmUsIGRpZmZlcmVudFNjb3JlcyB9IGZyb20gXCIuL2RhdGFNb2RlbHMvU2NvcmVcIjtcclxuaW1wb3J0IHsgQ2xhaW0gfSBmcm9tIFwiLi9kYXRhTW9kZWxzL0NsYWltXCI7XHJcbmltcG9ydCB7IElkIH0gZnJvbSBcIi4vZGF0YU1vZGVscy9JZFwiO1xyXG5pbXBvcnQgeyBpUmVwb3NpdG9yeSB9IGZyb20gXCIuL2RhdGFNb2RlbHMvaVJlcG9zaXRvcnlcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBDYWxjdWxhdGlvbkluaXRhdG9yIHtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwdWJsaWMgcmVwbzogaVJlcG9zaXRvcnksXHJcbiAgICAgICAgcHVibGljIHN1YnNjcmliZXI6ICgoY2hhbmdlczogQ2hhbmdlW10pID0+IHZvaWQpIHwgdW5kZWZpbmVkID0gdW5kZWZpbmVkXHJcbiAgICApIHtcclxuICAgIH1cclxuXHJcbiAgICAvKiogdGhpcyBmdW5jdGlvbiBjYW4gYmUgY2FsbGVkIGJ5IG91dHNpZGUgY29kZSB0byBub3RmeSB0aGlzIHJlcG9zaXRvcnkgb2YgY2hhbmdlcyAqL1xyXG4gICAgYXN5bmMgbm90aWZ5KGNoYW5nZXM6IENoYW5nZVtdKSB7XHJcbiAgICAgICAgYXdhaXQgdGhpcy5yZXBvLm5vdGlmeShjaGFuZ2VzKTtcclxuICAgICAgICBpZiAodGhpcy5zdWJzY3JpYmVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3Vic2NyaWJlcihjaGFuZ2VzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgYXdhaXQgdGhpcy5DYWxjdWxhdGlvbkluaXRpYXRvcihjaGFuZ2VzKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGFzeW5jIENhbGN1bGF0aW9uSW5pdGlhdG9yKGNoYW5nZXM6IENoYW5nZVtdKSB7XHJcbiAgICAgICAgZm9yIChjb25zdCBjaGFuZ2Ugb2YgY2hhbmdlcykge1xyXG4gICAgICAgICAgICBjb25zdCB7IG5ld0l0ZW0sIG9sZEl0ZW1WZXJzaW9uIH0gPSBjaGFuZ2U7XHJcblxyXG4gICAgICAgICAgICAvLyBJbml0aWF0ZSBjYWxjdWxhdGlvbnMgZnJvbSBhIGNoYW5nZWQvbmV3IGNsYWltIEVkZ2VcclxuICAgICAgICAgICAgaWYgKG5ld0l0ZW0udHlwZSA9PSBUeXBlLmNsYWltRWRnZSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgY2xhaW1FZGdlID0gbmV3SXRlbSBhcyBDbGFpbUVkZ2U7XHJcbiAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLkNhbGN1bGF0ZUJ5Q2xhaW1JZChjbGFpbUVkZ2UucGFyZW50SWQpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBJbml0aWF0ZSBjYWxjdWxhdGlvbnMgZnJvbSBhIGNhbmdlZC9uZXcgY2xhaW1cclxuICAgICAgICAgICAgaWYgKG5ld0l0ZW0udHlwZSA9PSBUeXBlLmNsYWltKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBjbGFpbSA9IDxDbGFpbT5uZXdJdGVtO1xyXG4gICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5DYWxjdWxhdGVCeUNsYWltSWQoY2xhaW0uaWQpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBJbml0aWF0ZSBjYWxjdWxhdGlvbnMgZnJvbSBhIGNhbmdlZC9uZXcgc2NvcmVcclxuICAgICAgICAgICAgaWYgKG5ld0l0ZW0udHlwZSA9PSBUeXBlLnNjb3JlKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBzY29yZSA9IDxTY29yZT5uZXdJdGVtO1xyXG4gICAgICAgICAgICAgICAgLy8gR2V0IGFsbCB0aGUgY2xhaW1FZGdlcyB0aGF0IGhhdmUgdGhpcyBzY29yZSdzIFNvdXJjZUNsYWltSWQgYXMgdGhlIGNoaWxkIGFuZCByZSBjYWxjdWxhdGUgdGhlbVxyXG4gICAgICAgICAgICAgICAgY29uc3QgY2xhaW1zZUVkZ2VzID0gYXdhaXQgdGhpcy5yZXBvLmdldENsYWltRWRnZXNCeUNoaWxkSWQoc2NvcmUuc291cmNlQ2xhaW1JZCk7XHJcbiAgICAgICAgICAgICAgICBpZihzY29yZS5zb3VyY2VDbGFpbUlkLnRvU3RyaW5nKCkgPT0gXCJtZWFzdXJlZENsYWltXCIpIGRlYnVnZ2VyO1xyXG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBjbGFpbUVkZ2Ugb2YgY2xhaW1zZUVkZ2VzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5DYWxjdWxhdGVCeUNsYWltSWQoY2xhaW1FZGdlLnBhcmVudElkKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGFzeW5jIENhbGN1bGF0ZUJ5Q2xhaW1JZChwYXJlbnRJZDogSWQpIHtcclxuICAgICAgICBjb25zdCBzY29yZUFuZENsYWltRWRnZXM6IFNjb3JlQW5kQ2xhaW1FZGdlW10gPSBbXTtcclxuICAgICAgICAvL0lzIHBhcmVudCByZXZlcnNpYmxlP1xyXG4gICAgICAgIGxldCByZXZlcnNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgY29uc3QgcGFyZW50SXRlbSA9IGF3YWl0IHRoaXMucmVwby5nZXRJdGVtKHBhcmVudElkKTtcclxuICAgICAgICBpZiAocGFyZW50SXRlbSkge1xyXG4gICAgICAgICAgICBjb25zdCBwYXJlbnRDbGFpbSA9IDxDbGFpbT5wYXJlbnRJdGVtO1xyXG4gICAgICAgICAgICByZXZlcnNpYmxlID0gcGFyZW50Q2xhaW0ucmV2ZXJzaWJsZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vR2V0IGFsbCB0aGUgY2xhaW1zIGZvciB0aGUgcGFyZW50IHRvIGNhbGN1bGF0ZSB0aGUgc2NvcmVcclxuICAgICAgICBjb25zdCBjbGFpbXNlRWRnZXMgPSBhd2FpdCB0aGlzLnJlcG8uZ2V0Q2xhaW1FZGdlc0J5UGFyZW50SWQocGFyZW50SWQpO1xyXG4gICAgICAgIGZvciAoY29uc3QgY2xhaW1zZUVkZ2Ugb2YgY2xhaW1zZUVkZ2VzKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHNjb3JlSXRlbSA9IGF3YWl0IHRoaXMucmVwby5nZXRTY29yZUJ5U291cmNlQ2xhaW1JZChjbGFpbXNlRWRnZS5jaGlsZElkKVxyXG4gICAgICAgICAgICBzY29yZUFuZENsYWltRWRnZXMucHVzaChcclxuICAgICAgICAgICAgICAgIG5ldyBTY29yZUFuZENsYWltRWRnZSg8U2NvcmU+c2NvcmVJdGVtLCBjbGFpbXNlRWRnZSlcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IG5ld1Njb3JlID0gY2FsY3VsYXRlU2NvcmUoe1xyXG4gICAgICAgICAgICBzY29yZUFuZENsYWltRWRnZXM6IHNjb3JlQW5kQ2xhaW1FZGdlcyxcclxuICAgICAgICAgICAgcmV2ZXJzaWJsZTogcmV2ZXJzaWJsZSxcclxuICAgICAgICAgICAgc291cmNlQ2xhaW1JZDogcGFyZW50SWRcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgY29uc3Qgb2xkU2NvcmUgPSBhd2FpdCB0aGlzLnJlcG8uZ2V0U2NvcmVCeVNvdXJjZUNsYWltSWQobmV3U2NvcmUuc291cmNlQ2xhaW1JZClcclxuICAgICAgICBpZiAob2xkU2NvcmUpIHtcclxuICAgICAgICAgICAgaWYgKGRpZmZlcmVudFNjb3JlcyhvbGRTY29yZSwgbmV3U2NvcmUpKSB7XHJcbiAgICAgICAgICAgICAgICBuZXdTY29yZS5pZCA9IG9sZFNjb3JlLmlkO1xyXG4gICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5ub3RpZnkoW25ldyBDaGFuZ2UobmV3U2NvcmUsIG9sZFNjb3JlLmlkKV0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgIGF3YWl0IHRoaXMubm90aWZ5KFtuZXcgQ2hhbmdlKG5ld1Njb3JlKV0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn0iXX0=