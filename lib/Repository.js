"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Repository = exports.Indexes = void 0;

var _end = _interopRequireDefault(require("./dataModels/end"));

var _Type = require("./dataModels/Type");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//Store the string for the ID
var Indexes = function Indexes() {
  _classCallCheck(this, Indexes);

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
      //scoreByClaimId
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9SZXBvc2l0b3J5LnRzIl0sIm5hbWVzIjpbIkluZGV4ZXMiLCJSZXBvc2l0b3J5IiwiY2hhbmdlcyIsImxvZyIsInB1c2giLCJjaGFuZ2UiLCJpZFN0cmluZyIsIm5ld0l0ZW0iLCJpZCIsInRvU3RyaW5nIiwib2xkSXRlbXMiLCJpdGVtcyIsImxlbmd0aCIsImVuZCIsIkRhdGUiLCJ0b0lTT1N0cmluZyIsInVuc2hpZnQiLCJ0eXBlIiwiVHlwZSIsInNjb3JlIiwiaW5kZXhTY29yZSIsImNsYWltRWRnZSIsImluZGV4Q2xhaW1FZGdlQnlQYXJlbnRJZCIsImRlc3RpbmF0aW9uIiwiaW5kZXhlcyIsInNjb3Jlc0J5Q2xhaW1JZCIsInNvdXJjZUNsYWltSWQiLCJpbmNsdWRlcyIsImNsYWltRWRnZXNCeVBhcmVudElkIiwicGFyZW50SWQiLCJpdGVtSWRzIiwicmVzdWx0IiwiaXRlbUlkIiwid2hlbiIsIkVuZCIsImdldEl0ZW1zRm9yQXJyYXkiLCJjbGFpbUlkIiwic2NvcmVzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7OztBQVMwRDtJQUU3Q0EsTzs7OzJDQUNxQixFOztnREFDSyxFOzs7OztJQUcxQkMsVTs7Ozs7O21DQUMrQixFOztxQ0FDTCxJQUFJRCxPQUFKLEU7O2lDQUNELEU7Ozs7OztBQUVsQzsyQkFDT0UsTyxFQUFtQjtBQUN0QixXQUFLQyxHQUFMLENBQVNDLElBQVQsQ0FBY0YsT0FBZDtBQURzQjtBQUFBO0FBQUE7O0FBQUE7QUFFdEIsNkJBQXFCQSxPQUFyQiw4SEFBOEI7QUFBQSxjQUFuQkcsTUFBbUI7O0FBQzFCLGNBQU1DLFNBQVEsR0FBR0QsTUFBTSxDQUFDRSxPQUFQLENBQWVDLEVBQWYsQ0FBa0JDLFFBQWxCLEVBQWpCLENBRDBCLENBRTFCOzs7QUFDQSxjQUFNQyxRQUFRLEdBQUcsS0FBS0MsS0FBTCxDQUFXTCxTQUFYLENBQWpCOztBQUNBLGNBQUlJLFFBQVEsSUFBSUEsUUFBUSxDQUFD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SSxvQkFBYixDQUFrQ0MsUUFBUSxDQUFDcEIsUUFBVCxFQUFsQyxDQUF0QixDQUFwQjtBQUNILEssQ0FFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7Ozt1Q0FFbUIyQixPLEVBQTBDO0FBQUEsVUFBN0JILElBQTZCLHVFQUFkQyxlQUFjO0FBQ3pELFVBQU1HLE1BQU0sR0FBRyxLQUFLYixPQUFMLENBQWFDLGVBQWIsQ0FBNkJXLE9BQU8sQ0FBQzNCLFFBQVIsRUFBN0IsQ0FBZjs7QUFDQSxVQUFJNEIsTUFBSixFQUFZO0FBQ1IsZUFBZ0IsS0FBS0YsZ0JBQUwsQ0FBc0JFLE1BQXRCLENBQWhCO0FBQ0gsT0FGRCxNQUVPO0FBQ0gsZUFBTyxFQUFQO0FBQ0g7QUFDSixLLENBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDbGFpbUVkZ2UgfSBmcm9tIFwiLi9kYXRhTW9kZWxzL0NsYWltRWRnZVwiO1xuaW1wb3J0IEVuZCBmcm9tIFwiLi9kYXRhTW9kZWxzL2VuZFwiO1xuaW1wb3J0IHsgVHlwZSB9IGZyb20gXCIuL2RhdGFNb2RlbHMvVHlwZVwiO1xuaW1wb3J0IHsgQ2hhbmdlIH0gZnJvbSBcIi4vZGF0YU1vZGVscy9DaGFuZ2VcIjtcbmltcG9ydCB7IFNjb3JlIH0gZnJvbSBcIi4vZGF0YU1vZGVscy9TY29yZVwiO1xuaW1wb3J0IHsgQ2xhaW0gfSBmcm9tIFwiLi9kYXRhTW9kZWxzL0NsYWltXCI7XG5pbXBvcnQgeyBJZCB9IGZyb20gXCIuL2RhdGFNb2RlbHMvSWRcIjtcbmltcG9ydCB7IEl0ZW0gfSBmcm9tIFwiLi9kYXRhTW9kZWxzL0l0ZW1cIjtcblxuaW50ZXJmYWNlIEl0ZW1EaWN0aW9uYXJ5IHsgW2lkU3RyaW5nOiBzdHJpbmddOiBJdGVtW107IH1cbmludGVyZmFjZSBJbmRleCB7IFtzZWFyY2hJbmRleDogc3RyaW5nXTogc3RyaW5nOyB9IC8vU3RvcmUgdGhlIHN0cmluZyBmb3IgdGhlIElEXG5pbnRlcmZhY2UgSW5kZXhBcnJheSB7IFtzZWFyY2hJbmRleDogc3RyaW5nXTogc3RyaW5nW107IH0gLy9TdG9yZSB0aGUgc3RyaW5nIGZvciB0aGUgSURcblxuZXhwb3J0IGNsYXNzIEluZGV4ZXMge1xuICAgIHNjb3Jlc0J5Q2xhaW1JZDogSW5kZXhBcnJheSA9IHt9XG4gICAgY2xhaW1FZGdlc0J5UGFyZW50SWQ6IEluZGV4QXJyYXkgPSB7fVxufVxuXG5leHBvcnQgY2xhc3MgUmVwb3NpdG9yeSB7XG4gICAgcHVibGljIHJlYWRvbmx5IGl0ZW1zOiBJdGVtRGljdGlvbmFyeSA9IHt9O1xuICAgIHB1YmxpYyByZWFkb25seSBpbmRleGVzOiBJbmRleGVzID0gbmV3IEluZGV4ZXMoKTtcbiAgICBwdWJsaWMgcmVhZG9ubHkgbG9nOiBDaGFuZ2VbXVtdID0gW107XG5cbiAgICAvKiogdGhpcyBmdW5jdGlvbiBjYW4gYmUgY2FsbGVkIGJ5IG91dHNpZGUgY29kZSB0byBub3RmeSB0aGlzIHJlcG9zaXRvcnkgb2YgY2hhbmdlcyAqL1xuICAgIG5vdGlmeShjaGFuZ2VzOiBDaGFuZ2VbXSkge1xuICAgICAgICB0aGlzLmxvZy5wdXNoKGNoYW5nZXMpO1xuICAgICAgICBmb3IgKGNvbnN0IGNoYW5nZSBvZiBjaGFuZ2VzKSB7XG4gICAgICAgICAgICBjb25zdCBpZFN0cmluZyA9IGNoYW5nZS5uZXdJdGVtLmlkLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICAvL0NoYW5nZSB0aGUgZW5kIGRhdGUgb24gdGhlIHByZXZpb3VzIHZlcnNpb24gb2YgdGhpcyBpdGVtIHRvIG5vd1xuICAgICAgICAgICAgY29uc3Qgb2xkSXRlbXMgPSB0aGlzLml0ZW1zW2lkU3RyaW5nXVxuICAgICAgICAgICAgaWYgKG9sZEl0ZW1zICYmIG9sZEl0ZW1zLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICBvbGRJdGVtc1swXS5lbmQgPSBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuaXRlbXNbaWRTdHJpbmddID0gW107XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuaXRlbXNbaWRTdHJpbmddLnVuc2hpZnQoY2hhbmdlLm5ld0l0ZW0pO1xuXG4gICAgICAgICAgICBpZiAoY2hhbmdlLm5ld0l0ZW0udHlwZSA9PSBUeXBlLnNjb3JlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5pbmRleFNjb3JlKDxTY29yZT5jaGFuZ2UubmV3SXRlbSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChjaGFuZ2UubmV3SXRlbS50eXBlID09IFR5cGUuY2xhaW1FZGdlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5pbmRleENsYWltRWRnZUJ5UGFyZW50SWQoPENsYWltRWRnZT5jaGFuZ2UubmV3SXRlbSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGluZGV4U2NvcmUoc2NvcmU6IFNjb3JlKSB7XG4gICAgICAgIC8vc2NvcmVCeUNsYWltSWRcbiAgICAgICAgbGV0IGRlc3RpbmF0aW9uID0gdGhpcy5pbmRleGVzLnNjb3Jlc0J5Q2xhaW1JZFtzY29yZS5zb3VyY2VDbGFpbUlkLnRvU3RyaW5nKCldO1xuICAgICAgICBpZiAoIWRlc3RpbmF0aW9uKSB7XG4gICAgICAgICAgICBkZXN0aW5hdGlvbiA9IFtdO1xuICAgICAgICAgICAgdGhpcy5pbmRleGVzLnNjb3Jlc0J5Q2xhaW1JZFtzY29yZS5zb3VyY2VDbGFpbUlkLnRvU3RyaW5nKCldID0gZGVzdGluYXRpb247XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFkZXN0aW5hdGlvbi5pbmNsdWRlcyhzY29yZS5pZC50b1N0cmluZygpKSkge1xuICAgICAgICAgICAgZGVzdGluYXRpb24ucHVzaChzY29yZS5pZC50b1N0cmluZygpKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpbmRleENsYWltRWRnZUJ5UGFyZW50SWQoY2xhaW1FZGdlOiBDbGFpbUVkZ2UpIHtcbiAgICAgICAgbGV0IGRlc3RpbmF0aW9uID0gdGhpcy5pbmRleGVzLmNsYWltRWRnZXNCeVBhcmVudElkW2NsYWltRWRnZS5wYXJlbnRJZC50b1N0cmluZygpXTtcbiAgICAgICAgaWYgKCFkZXN0aW5hdGlvbikge1xuICAgICAgICAgICAgZGVzdGluYXRpb24gPSBbXTtcbiAgICAgICAgICAgIHRoaXMuaW5kZXhlcy5jbGFpbUVkZ2VzQnlQYXJlbnRJZFtjbGFpbUVkZ2UucGFyZW50SWQudG9TdHJpbmcoKV0gPSBkZXN0aW5hdGlvbjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWRlc3RpbmF0aW9uLmluY2x1ZGVzKGNsYWltRWRnZS5pZC50b1N0cmluZygpKSkge1xuICAgICAgICAgICAgZGVzdGluYXRpb24ucHVzaChjbGFpbUVkZ2UuaWQudG9TdHJpbmcoKSlcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0SXRlbXNGb3JBcnJheShpdGVtSWRzOiBzdHJpbmdbXSk6IEl0ZW1bXSB7XG4gICAgICAgIGNvbnN0IHJlc3VsdDogSXRlbVtdID0gW107XG4gICAgICAgIGZvciAoY29uc3QgaXRlbUlkIG9mIGl0ZW1JZHMpIHtcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKHRoaXMuaXRlbXNbaXRlbUlkXVswXSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICAvLyBnZXRDbGFpbUVkZ2UoaWQ6IElkLCB3aGVuOiBzdHJpbmcgPSBFbmQpOiBDbGFpbUVkZ2Uge1xuICAgIC8vICAgICAvLyBsZXQgdGVtcENsYWltRWRnZSA9IHRoaXMucnNEYXRhLmNsYWltRWRnZXMuZmluZChlID0+XG4gICAgLy8gICAgIC8vICAgICBlLmlkID09IGlkICYmXG4gICAgLy8gICAgIC8vICAgICBlLmVuZCA+PSBFbmQpO1xuICAgIC8vICAgICAvLyByZXR1cm4gdGVtcENsYWltRWRnZSA/IHRlbXBDbGFpbUVkZ2UgOiBuZXcgQ2xhaW1FZGdlKCk7XG4gICAgLy8gICAgIHJldHVybiBuZXcgQ2xhaW1FZGdlKCk7XG4gICAgLy8gfVxuXG4gICAgZ2V0Q2xhaW1FZGdlc0J5UGFyZW50SWQocGFyZW50SWQ6IElkLCB3aGVuOiBzdHJpbmcgPSBFbmQpOiBDbGFpbUVkZ2VbXSB7XG4gICAgICAgIHJldHVybiA8Q2xhaW1FZGdlW10+dGhpcy5nZXRJdGVtc0ZvckFycmF5KHRoaXMuaW5kZXhlcy5jbGFpbUVkZ2VzQnlQYXJlbnRJZFtwYXJlbnRJZC50b1N0cmluZygpXSlcbiAgICB9XG5cbiAgICAvLyBnZXRTY29yZShpZDogSWQsIHdoZW46IHN0cmluZyA9IEVuZCk6IFNjb3JlIHtcbiAgICAvLyAgICAgLy8gbGV0IHRlbXBTY29yZSA9IHRoaXMucnNEYXRhLnNjb3Jlcy5maW5kKGUgPT5cbiAgICAvLyAgICAgLy8gICAgIGUuaWQgPT0gaWQgJiZcbiAgICAvLyAgICAgLy8gICAgIGUuZW5kID49IEVuZCk7XG4gICAgLy8gICAgIC8vIHJldHVybiB0ZW1wU2NvcmUgPyB0ZW1wU2NvcmUgOiBuZXcgU2NvcmUoKTtcbiAgICAvLyAgICAgcmV0dXJuIG5ldyBTY29yZSgpO1xuXG4gICAgLy8gfVxuXG4gICAgZ2V0U2NvcmVzQnlDbGFpbUlkKGNsYWltSWQ6IElkLCB3aGVuOiBzdHJpbmcgPSBFbmQpOiBTY29yZVtdIHtcbiAgICAgICAgY29uc3Qgc2NvcmVzID0gdGhpcy5pbmRleGVzLnNjb3Jlc0J5Q2xhaW1JZFtjbGFpbUlkLnRvU3RyaW5nKCldXG4gICAgICAgIGlmIChzY29yZXMpIHtcbiAgICAgICAgICAgIHJldHVybiA8U2NvcmVbXT50aGlzLmdldEl0ZW1zRm9yQXJyYXkoc2NvcmVzKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gZ2V0Q2xhaW0oaWQ6IElkLCB3aGVuOiBzdHJpbmcgPSBFbmQpOiBDbGFpbSB7XG4gICAgLy8gICAgIC8vIGxldCB0ZW1wQ2xhaW0gPSB0aGlzLnJzRGF0YS5jbGFpbXMuZmluZChlID0+XG4gICAgLy8gICAgIC8vICAgICBlLmlkID09IGlkICYmXG4gICAgLy8gICAgIC8vICAgICBlLmVuZCA+PSBFbmQpO1xuICAgIC8vICAgICAvLyByZXR1cm4gdGVtcENsYWltID8gdGVtcENsYWltIDogbmV3IENsYWltKCk7XG4gICAgLy8gICAgIHJldHVybiBuZXcgQ2xhaW0oKTtcbiAgICAvLyB9XG59XG5cbiJdfQ==