"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Repository = exports.Indexes = void 0;

var _end = _interopRequireDefault(require("./dataModels/end"));

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
      var when = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _end["default"];
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
      var when = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _end["default"];
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
      var when = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _end["default"];
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9SZXBvc2l0b3J5LnRzIl0sIm5hbWVzIjpbIkluZGV4ZXMiLCJSZXBvc2l0b3J5IiwiY2hhbmdlcyIsImxvZyIsInB1c2giLCJjaGFuZ2UiLCJpZFN0cmluZyIsIm5ld0l0ZW0iLCJpZCIsInRvU3RyaW5nIiwib2xkSXRlbXMiLCJpdGVtcyIsImxlbmd0aCIsImVuZCIsIkRhdGUiLCJ0b0lTT1N0cmluZyIsInVuc2hpZnQiLCJ0eXBlIiwiVHlwZSIsInNjb3JlIiwiaW5kZXhTY29yZSIsImNsYWltRWRnZSIsImluZGV4Q2xhaW1FZGdlQnlQYXJlbnRJZCIsInNjb3BlSWQiLCJpbmRleGVzIiwic2NvcmVCeUNsYWltSWRBbmRTY29wZSIsInNvdXJjZUNsYWltSWQiLCJkZXN0aW5hdGlvbiIsInNjb3Jlc0J5Q2xhaW1JZCIsImluY2x1ZGVzIiwiY2xhaW1FZGdlc0J5UGFyZW50SWQiLCJwYXJlbnRJZCIsIml0ZW1JZHMiLCJyZXN1bHQiLCJpdGVtSWQiLCJ3aGVuIiwiRW5kIiwiZ2V0SXRlbXNGb3JBcnJheSIsImNsYWltSWQiLCJzY29yZXMiLCJnZXRTY29yZXNCeUNsYWltSWQiLCJmaW5kIiwicyIsIlNjb3JlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQ0E7O0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7OztBQU8wRDtJQUU3Q0EsTzs7O2tEQUN1QixFOzsyQ0FDRixFOztnREFDSyxFOzs7OztJQUcxQkMsVTs7Ozs7O21DQUMrQixFOztxQ0FDTCxJQUFJRCxPQUFKLEU7O2lDQUNELEU7Ozs7OztBQUVsQzsyQkFDT0UsTyxFQUFtQjtBQUN0QixXQUFLQyxHQUFMLENBQVNDLElBQVQsQ0FBY0YsT0FBZDtBQURzQjtBQUFBO0FBQUE7O0FBQUE7QUFFdEIsNkJBQXFCQSxPQUFyQiw4SEFBOEI7QUFBQSxjQUFuQkcsTUFBbUI7O0FBQzFCLGNBQU1DLFNBQVEsR0FBR0QsTUFBTSxDQUFDRSxPQUFQLENBQWVDLEVBQWYsQ0FBa0JDLFFBQWxCLEVBQWpCLENBRDBC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QVA7QUFDSCxPQUZELE1BRU87QUFDSCxlQUFPLElBQUl3QixZQUFKLEVBQVA7QUFDSDtBQUNKLEssQ0FFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENsYWltRWRnZSB9IGZyb20gXCIuL2RhdGFNb2RlbHMvQ2xhaW1FZGdlXCI7XG5pbXBvcnQgRW5kIGZyb20gXCIuL2RhdGFNb2RlbHMvZW5kXCI7XG5pbXBvcnQgeyBUeXBlIH0gZnJvbSBcIi4vZGF0YU1vZGVscy9UeXBlXCI7XG5pbXBvcnQgeyBDaGFuZ2UgfSBmcm9tIFwiLi9kYXRhTW9kZWxzL0NoYW5nZVwiO1xuaW1wb3J0IHsgU2NvcmUgfSBmcm9tIFwiLi9kYXRhTW9kZWxzL1Njb3JlXCI7XG5pbXBvcnQgeyBDbGFpbSB9IGZyb20gXCIuL2RhdGFNb2RlbHMvQ2xhaW1cIjtcbmltcG9ydCB7IElkIH0gZnJvbSBcIi4vZGF0YU1vZGVscy9JZFwiO1xuaW1wb3J0IHsgSXRlbSB9IGZyb20gXCIuL2RhdGFNb2RlbHMvSXRlbVwiO1xuXG5pbnRlcmZhY2UgSXRlbURpY3Rpb25hcnkgeyBbaWRTdHJpbmc6IHN0cmluZ106IEl0ZW1bXTsgfVxuaW50ZXJmYWNlIEluZGV4IHsgW3NlYXJjaEluZGV4OiBzdHJpbmddOiBzdHJpbmc7IH0gLy9TdG9yZSB0aGUgc3RyaW5nIGZvciB0aGUgSURcbmludGVyZmFjZSBJbmRleEFycmF5IHsgW3NlYXJjaEluZGV4OiBzdHJpbmddOiBzdHJpbmdbXTsgfSAvL1N0b3JlIHRoZSBzdHJpbmcgZm9yIHRoZSBJRFxuXG5leHBvcnQgY2xhc3MgSW5kZXhlcyB7XG4gICAgc2NvcmVCeUNsYWltSWRBbmRTY29wZTogSW5kZXggPSB7fVxuICAgIHNjb3Jlc0J5Q2xhaW1JZDogSW5kZXhBcnJheSA9IHt9XG4gICAgY2xhaW1FZGdlc0J5UGFyZW50SWQ6IEluZGV4QXJyYXkgPSB7fVxufVxuXG5leHBvcnQgY2xhc3MgUmVwb3NpdG9yeSB7XG4gICAgcHVibGljIHJlYWRvbmx5IGl0ZW1zOiBJdGVtRGljdGlvbmFyeSA9IHt9O1xuICAgIHB1YmxpYyByZWFkb25seSBpbmRleGVzOiBJbmRleGVzID0gbmV3IEluZGV4ZXMoKTtcbiAgICBwdWJsaWMgcmVhZG9ubHkgbG9nOiBDaGFuZ2VbXVtdID0gW107XG5cbiAgICAvKiogdGhpcyBmdW5jdGlvbiBjYW4gYmUgY2FsbGVkIGJ5IG91dHNpZGUgY29kZSB0byBub3RmeSB0aGlzIHJlcG9zaXRvcnkgb2YgY2hhbmdlcyAqL1xuICAgIG5vdGlmeShjaGFuZ2VzOiBDaGFuZ2VbXSkge1xuICAgICAgICB0aGlzLmxvZy5wdXNoKGNoYW5nZXMpO1xuICAgICAgICBmb3IgKGNvbnN0IGNoYW5nZSBvZiBjaGFuZ2VzKSB7XG4gICAgICAgICAgICBjb25zdCBpZFN0cmluZyA9IGNoYW5nZS5uZXdJdGVtLmlkLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICAvL0NoYW5nZSB0aGUgZW5kIGRhdGUgb24gdGhlIHByZXZpb3VzIHZlcnNpb24gb2YgdGhpcyBpdGVtIHRvIG5vd1xuICAgICAgICAgICAgY29uc3Qgb2xkSXRlbXMgPSB0aGlzLml0ZW1zW2lkU3RyaW5nXVxuICAgICAgICAgICAgaWYgKG9sZEl0ZW1zICYmIG9sZEl0ZW1zLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICBvbGRJdGVtc1swXS5lbmQgPSBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuaXRlbXNbaWRTdHJpbmddID0gW107XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuaXRlbXNbaWRTdHJpbmddLnVuc2hpZnQoY2hhbmdlLm5ld0l0ZW0pO1xuXG4gICAgICAgICAgICBpZiAoY2hhbmdlLm5ld0l0ZW0udHlwZSA9PSBUeXBlLnNjb3JlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5pbmRleFNjb3JlKDxTY29yZT5jaGFuZ2UubmV3SXRlbSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChjaGFuZ2UubmV3SXRlbS50eXBlID09IFR5cGUuY2xhaW1FZGdlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5pbmRleENsYWltRWRnZUJ5UGFyZW50SWQoPENsYWltRWRnZT5jaGFuZ2UubmV3SXRlbSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGluZGV4U2NvcmUoc2NvcmU6IFNjb3JlKSB7XG4gICAgICAgIC8vc2NvcmVCeUNsYWltSWRBbmRTY29wZVxuICAgICAgICBpZiAoc2NvcmUuc2NvcGVJZCkge1xuICAgICAgICAgICAgdGhpcy5pbmRleGVzLnNjb3JlQnlDbGFpbUlkQW5kU2NvcGVbXG4gICAgICAgICAgICAgICAgc2NvcmUuc291cmNlQ2xhaW1JZC50b1N0cmluZygpICsgXCItXCIgK1xuICAgICAgICAgICAgICAgIHNjb3JlLnNjb3BlSWQudG9TdHJpbmcoKVxuICAgICAgICAgICAgXSA9IHNjb3JlLmlkLnRvU3RyaW5nKCk7XG4gICAgICAgIH1cblxuICAgICAgICAvL3Njb3JlQnlDbGFpbUlkXG4gICAgICAgIGxldCBkZXN0aW5hdGlvbiA9IHRoaXMuaW5kZXhlcy5zY29yZXNCeUNsYWltSWRbc2NvcmUuc291cmNlQ2xhaW1JZC50b1N0cmluZygpXTtcbiAgICAgICAgaWYgKCFkZXN0aW5hdGlvbikge1xuICAgICAgICAgICAgZGVzdGluYXRpb24gPSBbXTtcbiAgICAgICAgICAgIHRoaXMuaW5kZXhlcy5zY29yZXNCeUNsYWltSWRbc2NvcmUuc291cmNlQ2xhaW1JZC50b1N0cmluZygpXSA9IGRlc3RpbmF0aW9uO1xuICAgICAgICB9XG4gICAgICAgIGlmICghZGVzdGluYXRpb24uaW5jbHVkZXMoc2NvcmUuaWQudG9TdHJpbmcoKSkpIHtcbiAgICAgICAgICAgIGRlc3RpbmF0aW9uLnB1c2goc2NvcmUuaWQudG9TdHJpbmcoKSlcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpbmRleENsYWltRWRnZUJ5UGFyZW50SWQoY2xhaW1FZGdlOiBDbGFpbUVkZ2UpIHtcbiAgICAgICAgbGV0IGRlc3RpbmF0aW9uID0gdGhpcy5pbmRleGVzLmNsYWltRWRnZXNCeVBhcmVudElkW2NsYWltRWRnZS5wYXJlbnRJZC50b1N0cmluZygpXTtcbiAgICAgICAgaWYgKCFkZXN0aW5hdGlvbikge1xuICAgICAgICAgICAgZGVzdGluYXRpb24gPSBbXTtcbiAgICAgICAgICAgIHRoaXMuaW5kZXhlcy5jbGFpbUVkZ2VzQnlQYXJlbnRJZFtjbGFpbUVkZ2UucGFyZW50SWQudG9TdHJpbmcoKV0gPSBkZXN0aW5hdGlvbjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWRlc3RpbmF0aW9uLmluY2x1ZGVzKGNsYWltRWRnZS5pZC50b1N0cmluZygpKSkge1xuICAgICAgICAgICAgZGVzdGluYXRpb24ucHVzaChjbGFpbUVkZ2UuaWQudG9TdHJpbmcoKSlcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0SXRlbXNGb3JBcnJheShpdGVtSWRzOiBzdHJpbmdbXSk6IEl0ZW1bXSB7XG4gICAgICAgIGNvbnN0IHJlc3VsdDogSXRlbVtdID0gW107XG4gICAgICAgIGZvciAoY29uc3QgaXRlbUlkIG9mIGl0ZW1JZHMpIHtcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKHRoaXMuaXRlbXNbaXRlbUlkXVswXSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICAvLyBnZXRDbGFpbUVkZ2UoaWQ6IElkLCB3aGVuOiBzdHJpbmcgPSBFbmQpOiBDbGFpbUVkZ2Uge1xuICAgIC8vICAgICAvLyBsZXQgdGVtcENsYWltRWRnZSA9IHRoaXMucnNEYXRhLmNsYWltRWRnZXMuZmluZChlID0+XG4gICAgLy8gICAgIC8vICAgICBlLmlkID09IGlkICYmXG4gICAgLy8gICAgIC8vICAgICBlLmVuZCA+PSBFbmQpO1xuICAgIC8vICAgICAvLyByZXR1cm4gdGVtcENsYWltRWRnZSA/IHRlbXBDbGFpbUVkZ2UgOiBuZXcgQ2xhaW1FZGdlKCk7XG4gICAgLy8gICAgIHJldHVybiBuZXcgQ2xhaW1FZGdlKCk7XG4gICAgLy8gfVxuXG4gICAgZ2V0Q2xhaW1FZGdlc0J5UGFyZW50SWQocGFyZW50SWQ6IElkLCB3aGVuOiBzdHJpbmcgPSBFbmQpOiBDbGFpbUVkZ2VbXSB7XG4gICAgICAgIHJldHVybiA8Q2xhaW1FZGdlW10+dGhpcy5nZXRJdGVtc0ZvckFycmF5KHRoaXMuaW5kZXhlcy5jbGFpbUVkZ2VzQnlQYXJlbnRJZFtwYXJlbnRJZC50b1N0cmluZygpXSlcbiAgICB9XG5cbiAgICAvLyBnZXRTY29yZShpZDogSWQsIHdoZW46IHN0cmluZyA9IEVuZCk6IFNjb3JlIHtcbiAgICAvLyAgICAgLy8gbGV0IHRlbXBTY29yZSA9IHRoaXMucnNEYXRhLnNjb3Jlcy5maW5kKGUgPT5cbiAgICAvLyAgICAgLy8gICAgIGUuaWQgPT0gaWQgJiZcbiAgICAvLyAgICAgLy8gICAgIGUuZW5kID49IEVuZCk7XG4gICAgLy8gICAgIC8vIHJldHVybiB0ZW1wU2NvcmUgPyB0ZW1wU2NvcmUgOiBuZXcgU2NvcmUoKTtcbiAgICAvLyAgICAgcmV0dXJuIG5ldyBTY29yZSgpO1xuXG4gICAgLy8gfVxuXG4gICAgZ2V0U2NvcmVzQnlDbGFpbUlkKGNsYWltSWQ6IElkLCB3aGVuOiBzdHJpbmcgPSBFbmQpOiBTY29yZVtdIHtcbiAgICAgICAgY29uc3Qgc2NvcmVzID0gdGhpcy5pbmRleGVzLnNjb3Jlc0J5Q2xhaW1JZFtjbGFpbUlkLnRvU3RyaW5nKCldXG4gICAgICAgIGlmIChzY29yZXMpIHtcbiAgICAgICAgICAgIHJldHVybiA8U2NvcmVbXT50aGlzLmdldEl0ZW1zRm9yQXJyYXkoc2NvcmVzKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqIFdpbGwgY3JlYXRlIGEgbmV3IHNjb3JlIGlmIGl0IGRvZXMgbm90IGFscmVhZHkgZXhpc3QgKi9cbiAgICBnZXRTY29yZUJ5Q2xhaW1JZEFuZFNjb3BlKGNsYWltSWQ6IElkLCBzY29wZUlkOiBJZCB8IHVuZGVmaW5lZCwgd2hlbjogc3RyaW5nID0gRW5kKTogU2NvcmUge1xuICAgICAgICBjb25zdCBzY29yZXMgPSB0aGlzLmdldFNjb3Jlc0J5Q2xhaW1JZChjbGFpbUlkLHdoZW4pO1xuICAgICAgICBsZXQgc2NvcmUgPSBzY29yZXMuZmluZChzID0+IHMuc2NvcGVJZCA9PSBzY29wZUlkKTtcbiAgICAgICAgaWYgKHNjb3JlKSB7XG4gICAgICAgICAgICByZXR1cm4gc2NvcmU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFNjb3JlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBnZXRDbGFpbShpZDogSWQsIHdoZW46IHN0cmluZyA9IEVuZCk6IENsYWltIHtcbiAgICAvLyAgICAgLy8gbGV0IHRlbXBDbGFpbSA9IHRoaXMucnNEYXRhLmNsYWltcy5maW5kKGUgPT5cbiAgICAvLyAgICAgLy8gICAgIGUuaWQgPT0gaWQgJiZcbiAgICAvLyAgICAgLy8gICAgIGUuZW5kID49IEVuZCk7XG4gICAgLy8gICAgIC8vIHJldHVybiB0ZW1wQ2xhaW0gPyB0ZW1wQ2xhaW0gOiBuZXcgQ2xhaW0oKTtcbiAgICAvLyAgICAgcmV0dXJuIG5ldyBDbGFpbSgpO1xuICAgIC8vIH1cbn1cblxuIl19