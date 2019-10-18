"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Repository = exports.Indexes = void 0;

var _End = _interopRequireDefault(require("./dataModels/End"));

var _Type = require("./dataModels/Type");

var _Score = require("./dataModels/Score");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//Store the string for the ID
var Indexes = function Indexes() {
  _classCallCheck(this, Indexes);

  _defineProperty(this, "scoreByClaimIdAndScope", {});

  _defineProperty(this, "scoresByClaimId", {});

  _defineProperty(this, "claimEdgesByParentId", {});
};

exports.Indexes = Indexes;

var Repository =
/*#__PURE__*/
function () {
  function Repository() {
    _classCallCheck(this, Repository);

    _defineProperty(this, "items", {});

    _defineProperty(this, "indexes", new Indexes());

    _defineProperty(this, "log", []);
  }

  _createClass(Repository, [{
    key: "notify",

    /** this function can be called by outside code to notfy this repository of changes */
    value: function notify(changes) {
      this.log.push(changes);
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = changes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var change = _step.value;

          var _idString = change.newItem.id.toString(); //Change the end date on the previous version of this item to now


          var oldItems = this.items[_idString];

          if (oldItems && oldItems.length > 0) {
            oldItems[0].end = new Date().toISOString();
          } else {
            this.items[_idString] = [];
          }

          this.items[_idString].unshift(change.newItem);

          if (change.newItem.type == _Type.Type.score) {
            this.indexScore(change.newItem);
          }

          if (change.newItem.type == _Type.Type.claimEdge) {
            this.indexClaimEdgeByParentId(change.newItem);
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }
  }, {
    key: "indexScore",
    value: function indexScore(score) {
      //scoreByClaimIdAndScope
      if (score.scopeId) {
        this.indexes.scoreByClaimIdAndScope[score.sourceClaimId.toString() + "-" + score.scopeId.toString()] = score.id.toString();
      } //scoreByClaimId


      var destination = this.indexes.scoresByClaimId[score.sourceClaimId.toString()];

      if (!destination) {
        destination = [];
        this.indexes.scoresByClaimId[score.sourceClaimId.toString()] = destination;
      }

      if (!destination.includes(score.id.toString())) {
        destination.push(score.id.toString());
      }
    }
  }, {
    key: "indexClaimEdgeByParentId",
    value: function indexClaimEdgeByParentId(claimEdge) {
      var destination = this.indexes.claimEdgesByParentId[claimEdge.parentId.toString()];

      if (!destination) {
        destination = [];
        this.indexes.claimEdgesByParentId[claimEdge.parentId.toString()] = destination;
      }

      if (!destination.includes(claimEdge.id.toString())) {
        destination.push(claimEdge.id.toString());
      }
    }
  }, {
    key: "getItemsForArray",
    value: function getItemsForArray(itemIds) {
      var result = [];
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = itemIds[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var itemId = _step2.value;
          result.push(this.items[itemId][0]);
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
            _iterator2["return"]();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      return result;
    } // getClaimEdge(id: Id, when: string = End): ClaimEdge {
    //     // let tempClaimEdge = this.rsData.claimEdges.find(e =>
    //     //     e.id == id &&
    //     //     e.end >= End);
    //     // return tempClaimEdge ? tempClaimEdge : new ClaimEdge();
    //     return new ClaimEdge();
    // }

  }, {
    key: "getClaimEdgesByParentId",
    value: function getClaimEdgesByParentId(parentId) {
      var when = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _End["default"];
      return this.getItemsForArray(this.indexes.claimEdgesByParentId[parentId.toString()]);
    } // getScore(id: Id, when: string = End): Score {
    //     // let tempScore = this.rsData.scores.find(e =>
    //     //     e.id == id &&
    //     //     e.end >= End);
    //     // return tempScore ? tempScore : new Score();
    //     return new Score();
    // }

  }, {
    key: "getScoresByClaimId",
    value: function getScoresByClaimId(claimId) {
      var when = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _End["default"];
      var scores = this.indexes.scoresByClaimId[claimId.toString()];

      if (scores) {
        return this.getItemsForArray(scores);
      } else {
        return [];
      }
    }
    /** Will create a new score if it does not already exist */

  }, {
    key: "getScoreByClaimIdAndScope",
    value: function getScoreByClaimIdAndScope(claimId, scopeId) {
      var when = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _End["default"];
      var scores = this.getScoresByClaimId(claimId, when);
      var score = scores.find(function (s) {
        return s.scopeId == scopeId;
      });

      if (score) {
        return score;
      } else {
        return new _Score.Score();
      }
    } // getClaim(id: Id, when: string = End): Claim {
    //     // let tempClaim = this.rsData.claims.find(e =>
    //     //     e.id == id &&
    //     //     e.end >= End);
    //     // return tempClaim ? tempClaim : new Claim();
    //     return new Claim();
    // }

  }]);

  return Repository;
}();

exports.Repository = Repository;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9SZXBvc2l0b3J5LnRzIl0sIm5hbWVzIjpbIkluZGV4ZXMiLCJSZXBvc2l0b3J5IiwiY2hhbmdlcyIsImxvZyIsInB1c2giLCJjaGFuZ2UiLCJpZFN0cmluZyIsIm5ld0l0ZW0iLCJpZCIsInRvU3RyaW5nIiwib2xkSXRlbXMiLCJpdGVtcyIsImxlbmd0aCIsImVuZCIsIkRhdGUiLCJ0b0lTT1N0cmluZyIsInVuc2hpZnQiLCJ0eXBlIiwiVHlwZSIsInNjb3JlIiwiaW5kZXhTY29yZSIsImNsYWltRWRnZSIsImluZGV4Q2xhaW1FZGdlQnlQYXJlbnRJZCIsInNjb3BlSWQiLCJpbmRleGVzIiwic2NvcmVCeUNsYWltSWRBbmRTY29wZSIsInNvdXJjZUNsYWltSWQiLCJkZXN0aW5hdGlvbiIsInNjb3Jlc0J5Q2xhaW1JZCIsImluY2x1ZGVzIiwiY2xhaW1FZGdlc0J5UGFyZW50SWQiLCJwYXJlbnRJZCIsIml0ZW1JZHMiLCJyZXN1bHQiLCJpdGVtSWQiLCJ3aGVuIiwiRW5kIiwiZ2V0SXRlbXNGb3JBcnJheSIsImNsYWltSWQiLCJzY29yZXMiLCJnZXRTY29yZXNCeUNsYWltSWQiLCJmaW5kIiwicyIsIlNjb3JlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQ0E7O0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7OztBQU8wRDtJQUU3Q0EsTzs7O2tEQUN1QixFOzsyQ0FDRixFOztnREFDSyxFOzs7OztJQUcxQkMsVTs7Ozs7O21DQUMrQixFOztxQ0FDTCxJQUFJRCxPQUFKLEU7O2lDQUNELEU7Ozs7OztBQUVsQzsyQkFDT0UsTyxFQUFtQjtBQUN0QixXQUFLQyxHQUFMLENBQVNDLElBQVQsQ0FBY0YsT0FBZDtBQURzQjtBQUFBO0FBQUE7O0FBQUE7QUFFdEIsNkJBQXFCQSxPQUFyQiw4SEFBOEI7QUFBQSxjQUFuQkcsTUFBbUI7O0FBQzFCLGNBQU1DLFNBQVEsR0FBR0QsTUFBTSxDQUFDRSxPQUFQLENBQWVDLEVBQWYsQ0FBa0JDLFFBQWxCLEVBQWpCLENBRDBC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QVA7QUFDSCxPQUZELE1BRU87QUFDSCxlQUFPLElBQUl3QixZQUFKLEVBQVA7QUFDSDtBQUNKLEssQ0FFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENsYWltRWRnZSB9IGZyb20gXCIuL2RhdGFNb2RlbHMvQ2xhaW1FZGdlXCI7XHJcbmltcG9ydCBFbmQgZnJvbSBcIi4vZGF0YU1vZGVscy9FbmRcIjtcclxuaW1wb3J0IHsgVHlwZSB9IGZyb20gXCIuL2RhdGFNb2RlbHMvVHlwZVwiO1xyXG5pbXBvcnQgeyBDaGFuZ2UgfSBmcm9tIFwiLi9kYXRhTW9kZWxzL0NoYW5nZVwiO1xyXG5pbXBvcnQgeyBTY29yZSB9IGZyb20gXCIuL2RhdGFNb2RlbHMvU2NvcmVcIjtcclxuaW1wb3J0IHsgQ2xhaW0gfSBmcm9tIFwiLi9kYXRhTW9kZWxzL0NsYWltXCI7XHJcbmltcG9ydCB7IElkIH0gZnJvbSBcIi4vZGF0YU1vZGVscy9JZFwiO1xyXG5pbXBvcnQgeyBJdGVtIH0gZnJvbSBcIi4vZGF0YU1vZGVscy9JdGVtXCI7XHJcblxyXG5pbnRlcmZhY2UgSXRlbURpY3Rpb25hcnkgeyBbaWRTdHJpbmc6IHN0cmluZ106IEl0ZW1bXTsgfVxyXG5pbnRlcmZhY2UgSW5kZXggeyBbc2VhcmNoSW5kZXg6IHN0cmluZ106IHN0cmluZzsgfSAvL1N0b3JlIHRoZSBzdHJpbmcgZm9yIHRoZSBJRFxyXG5pbnRlcmZhY2UgSW5kZXhBcnJheSB7IFtzZWFyY2hJbmRleDogc3RyaW5nXTogc3RyaW5nW107IH0gLy9TdG9yZSB0aGUgc3RyaW5nIGZvciB0aGUgSURcclxuXHJcbmV4cG9ydCBjbGFzcyBJbmRleGVzIHtcclxuICAgIHNjb3JlQnlDbGFpbUlkQW5kU2NvcGU6IEluZGV4ID0ge31cclxuICAgIHNjb3Jlc0J5Q2xhaW1JZDogSW5kZXhBcnJheSA9IHt9XHJcbiAgICBjbGFpbUVkZ2VzQnlQYXJlbnRJZDogSW5kZXhBcnJheSA9IHt9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBSZXBvc2l0b3J5IHtcclxuICAgIHB1YmxpYyByZWFkb25seSBpdGVtczogSXRlbURpY3Rpb25hcnkgPSB7fTtcclxuICAgIHB1YmxpYyByZWFkb25seSBpbmRleGVzOiBJbmRleGVzID0gbmV3IEluZGV4ZXMoKTtcclxuICAgIHB1YmxpYyByZWFkb25seSBsb2c6IENoYW5nZVtdW10gPSBbXTtcclxuXHJcbiAgICAvKiogdGhpcyBmdW5jdGlvbiBjYW4gYmUgY2FsbGVkIGJ5IG91dHNpZGUgY29kZSB0byBub3RmeSB0aGlzIHJlcG9zaXRvcnkgb2YgY2hhbmdlcyAqL1xyXG4gICAgbm90aWZ5KGNoYW5nZXM6IENoYW5nZVtdKSB7XHJcbiAgICAgICAgdGhpcy5sb2cucHVzaChjaGFuZ2VzKTtcclxuICAgICAgICBmb3IgKGNvbnN0IGNoYW5nZSBvZiBjaGFuZ2VzKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGlkU3RyaW5nID0gY2hhbmdlLm5ld0l0ZW0uaWQudG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgLy9DaGFuZ2UgdGhlIGVuZCBkYXRlIG9uIHRoZSBwcmV2aW91cyB2ZXJzaW9uIG9mIHRoaXMgaXRlbSB0byBub3dcclxuICAgICAgICAgICAgY29uc3Qgb2xkSXRlbXMgPSB0aGlzLml0ZW1zW2lkU3RyaW5nXVxyXG4gICAgICAgICAgICBpZiAob2xkSXRlbXMgJiYgb2xkSXRlbXMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgb2xkSXRlbXNbMF0uZW5kID0gbmV3IERhdGUoKS50b0lTT1N0cmluZygpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pdGVtc1tpZFN0cmluZ10gPSBbXTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5pdGVtc1tpZFN0cmluZ10udW5zaGlmdChjaGFuZ2UubmV3SXRlbSk7XHJcblxyXG4gICAgICAgICAgICBpZiAoY2hhbmdlLm5ld0l0ZW0udHlwZSA9PSBUeXBlLnNjb3JlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmluZGV4U2NvcmUoPFNjb3JlPmNoYW5nZS5uZXdJdGVtKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGNoYW5nZS5uZXdJdGVtLnR5cGUgPT0gVHlwZS5jbGFpbUVkZ2UpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaW5kZXhDbGFpbUVkZ2VCeVBhcmVudElkKDxDbGFpbUVkZ2U+Y2hhbmdlLm5ld0l0ZW0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaW5kZXhTY29yZShzY29yZTogU2NvcmUpIHtcclxuICAgICAgICAvL3Njb3JlQnlDbGFpbUlkQW5kU2NvcGVcclxuICAgICAgICBpZiAoc2NvcmUuc2NvcGVJZCkge1xyXG4gICAgICAgICAgICB0aGlzLmluZGV4ZXMuc2NvcmVCeUNsYWltSWRBbmRTY29wZVtcclxuICAgICAgICAgICAgICAgIHNjb3JlLnNvdXJjZUNsYWltSWQudG9TdHJpbmcoKSArIFwiLVwiICtcclxuICAgICAgICAgICAgICAgIHNjb3JlLnNjb3BlSWQudG9TdHJpbmcoKVxyXG4gICAgICAgICAgICBdID0gc2NvcmUuaWQudG9TdHJpbmcoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vc2NvcmVCeUNsYWltSWRcclxuICAgICAgICBsZXQgZGVzdGluYXRpb24gPSB0aGlzLmluZGV4ZXMuc2NvcmVzQnlDbGFpbUlkW3Njb3JlLnNvdXJjZUNsYWltSWQudG9TdHJpbmcoKV07XHJcbiAgICAgICAgaWYgKCFkZXN0aW5hdGlvbikge1xyXG4gICAgICAgICAgICBkZXN0aW5hdGlvbiA9IFtdO1xyXG4gICAgICAgICAgICB0aGlzLmluZGV4ZXMuc2NvcmVzQnlDbGFpbUlkW3Njb3JlLnNvdXJjZUNsYWltSWQudG9TdHJpbmcoKV0gPSBkZXN0aW5hdGlvbjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCFkZXN0aW5hdGlvbi5pbmNsdWRlcyhzY29yZS5pZC50b1N0cmluZygpKSkge1xyXG4gICAgICAgICAgICBkZXN0aW5hdGlvbi5wdXNoKHNjb3JlLmlkLnRvU3RyaW5nKCkpXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGluZGV4Q2xhaW1FZGdlQnlQYXJlbnRJZChjbGFpbUVkZ2U6IENsYWltRWRnZSkge1xyXG4gICAgICAgIGxldCBkZXN0aW5hdGlvbiA9IHRoaXMuaW5kZXhlcy5jbGFpbUVkZ2VzQnlQYXJlbnRJZFtjbGFpbUVkZ2UucGFyZW50SWQudG9TdHJpbmcoKV07XHJcbiAgICAgICAgaWYgKCFkZXN0aW5hdGlvbikge1xyXG4gICAgICAgICAgICBkZXN0aW5hdGlvbiA9IFtdO1xyXG4gICAgICAgICAgICB0aGlzLmluZGV4ZXMuY2xhaW1FZGdlc0J5UGFyZW50SWRbY2xhaW1FZGdlLnBhcmVudElkLnRvU3RyaW5nKCldID0gZGVzdGluYXRpb247XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghZGVzdGluYXRpb24uaW5jbHVkZXMoY2xhaW1FZGdlLmlkLnRvU3RyaW5nKCkpKSB7XHJcbiAgICAgICAgICAgIGRlc3RpbmF0aW9uLnB1c2goY2xhaW1FZGdlLmlkLnRvU3RyaW5nKCkpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0SXRlbXNGb3JBcnJheShpdGVtSWRzOiBzdHJpbmdbXSk6IEl0ZW1bXSB7XHJcbiAgICAgICAgY29uc3QgcmVzdWx0OiBJdGVtW10gPSBbXTtcclxuICAgICAgICBmb3IgKGNvbnN0IGl0ZW1JZCBvZiBpdGVtSWRzKSB7XHJcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKHRoaXMuaXRlbXNbaXRlbUlkXVswXSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gZ2V0Q2xhaW1FZGdlKGlkOiBJZCwgd2hlbjogc3RyaW5nID0gRW5kKTogQ2xhaW1FZGdlIHtcclxuICAgIC8vICAgICAvLyBsZXQgdGVtcENsYWltRWRnZSA9IHRoaXMucnNEYXRhLmNsYWltRWRnZXMuZmluZChlID0+XHJcbiAgICAvLyAgICAgLy8gICAgIGUuaWQgPT0gaWQgJiZcclxuICAgIC8vICAgICAvLyAgICAgZS5lbmQgPj0gRW5kKTtcclxuICAgIC8vICAgICAvLyByZXR1cm4gdGVtcENsYWltRWRnZSA/IHRlbXBDbGFpbUVkZ2UgOiBuZXcgQ2xhaW1FZGdlKCk7XHJcbiAgICAvLyAgICAgcmV0dXJuIG5ldyBDbGFpbUVkZ2UoKTtcclxuICAgIC8vIH1cclxuXHJcbiAgICBnZXRDbGFpbUVkZ2VzQnlQYXJlbnRJZChwYXJlbnRJZDogSWQsIHdoZW46IHN0cmluZyA9IEVuZCk6IENsYWltRWRnZVtdIHtcclxuICAgICAgICByZXR1cm4gPENsYWltRWRnZVtdPnRoaXMuZ2V0SXRlbXNGb3JBcnJheSh0aGlzLmluZGV4ZXMuY2xhaW1FZGdlc0J5UGFyZW50SWRbcGFyZW50SWQudG9TdHJpbmcoKV0pXHJcbiAgICB9XHJcblxyXG4gICAgLy8gZ2V0U2NvcmUoaWQ6IElkLCB3aGVuOiBzdHJpbmcgPSBFbmQpOiBTY29yZSB7XHJcbiAgICAvLyAgICAgLy8gbGV0IHRlbXBTY29yZSA9IHRoaXMucnNEYXRhLnNjb3Jlcy5maW5kKGUgPT5cclxuICAgIC8vICAgICAvLyAgICAgZS5pZCA9PSBpZCAmJlxyXG4gICAgLy8gICAgIC8vICAgICBlLmVuZCA+PSBFbmQpO1xyXG4gICAgLy8gICAgIC8vIHJldHVybiB0ZW1wU2NvcmUgPyB0ZW1wU2NvcmUgOiBuZXcgU2NvcmUoKTtcclxuICAgIC8vICAgICByZXR1cm4gbmV3IFNjb3JlKCk7XHJcblxyXG4gICAgLy8gfVxyXG5cclxuICAgIGdldFNjb3Jlc0J5Q2xhaW1JZChjbGFpbUlkOiBJZCwgd2hlbjogc3RyaW5nID0gRW5kKTogU2NvcmVbXSB7XHJcbiAgICAgICAgY29uc3Qgc2NvcmVzID0gdGhpcy5pbmRleGVzLnNjb3Jlc0J5Q2xhaW1JZFtjbGFpbUlkLnRvU3RyaW5nKCldXHJcbiAgICAgICAgaWYgKHNjb3Jlcykge1xyXG4gICAgICAgICAgICByZXR1cm4gPFNjb3JlW10+dGhpcy5nZXRJdGVtc0ZvckFycmF5KHNjb3JlcylcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gW107XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKiBXaWxsIGNyZWF0ZSBhIG5ldyBzY29yZSBpZiBpdCBkb2VzIG5vdCBhbHJlYWR5IGV4aXN0ICovXHJcbiAgICBnZXRTY29yZUJ5Q2xhaW1JZEFuZFNjb3BlKGNsYWltSWQ6IElkLCBzY29wZUlkOiBJZCB8IHVuZGVmaW5lZCwgd2hlbjogc3RyaW5nID0gRW5kKTogU2NvcmUge1xyXG4gICAgICAgIGNvbnN0IHNjb3JlcyA9IHRoaXMuZ2V0U2NvcmVzQnlDbGFpbUlkKGNsYWltSWQsd2hlbik7XHJcbiAgICAgICAgbGV0IHNjb3JlID0gc2NvcmVzLmZpbmQocyA9PiBzLnNjb3BlSWQgPT0gc2NvcGVJZCk7XHJcbiAgICAgICAgaWYgKHNjb3JlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBzY29yZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFNjb3JlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIGdldENsYWltKGlkOiBJZCwgd2hlbjogc3RyaW5nID0gRW5kKTogQ2xhaW0ge1xyXG4gICAgLy8gICAgIC8vIGxldCB0ZW1wQ2xhaW0gPSB0aGlzLnJzRGF0YS5jbGFpbXMuZmluZChlID0+XHJcbiAgICAvLyAgICAgLy8gICAgIGUuaWQgPT0gaWQgJiZcclxuICAgIC8vICAgICAvLyAgICAgZS5lbmQgPj0gRW5kKTtcclxuICAgIC8vICAgICAvLyByZXR1cm4gdGVtcENsYWltID8gdGVtcENsYWltIDogbmV3IENsYWltKCk7XHJcbiAgICAvLyAgICAgcmV0dXJuIG5ldyBDbGFpbSgpO1xyXG4gICAgLy8gfVxyXG59XHJcblxyXG4iXX0=