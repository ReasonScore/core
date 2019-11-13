"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Repository = void 0;

var _End = _interopRequireDefault(require("./dataModels/End"));

var _Type = require("./dataModels/Type");

var _Change = require("./dataModels/Change");

var _Score = require("./dataModels/Score");

var _Id = require("./dataModels/Id");

var _RsData = require("./dataModels/RsData");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Repository =
/*#__PURE__*/
function () {
  function Repository() {
    _classCallCheck(this, Repository);

    _defineProperty(this, "rsData", new _RsData.RsData());

    _defineProperty(this, "log", []);
  }

  _createClass(Repository, [{
    key: "notify",

    /** this function can be called by outside code to notfy this repository of changes */
    value: function notify(changes) {
      this.log.unshift(changes);
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = changes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var change = _step.value;
          var newItem = change.newItem;
          var idString = newItem.id.toString(); //Change the end date on the previous version of this item to now

          var oldItems = this.rsData.items[idString];

          if (oldItems && oldItems.length > 0) {
            oldItems[0].end = new Date().toISOString();
          } else {
            this.rsData.items[idString] = [];
          } // add the new item to the list of items


          this.rsData.items[idString].unshift(change.newItem); //Index Claim Edges

          if (change.newItem.type == _Type.Type.claimEdge) {
            this.indexClaimEdgeByParentId(change.newItem);
            this.indexClaimEdgeByChildId(change.newItem);
          } //Index score by source Id


          if (newItem.type == _Type.Type.score) {
            var score = newItem;
            this.rsData.scoreBySourceClaimId[score.sourceClaimId.toString()] = idString;
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
    key: "indexClaimEdgeByParentId",
    value: function indexClaimEdgeByParentId(claimEdge) {
      var destination = this.rsData.claimEdgesByParentId[claimEdge.parentId.toString()];

      if (!destination) {
        destination = [];
        this.rsData.claimEdgesByParentId[claimEdge.parentId.toString()] = destination;
      }

      if (!destination.includes(claimEdge.id.toString())) {
        destination.push(claimEdge.id.toString());
      }
    }
  }, {
    key: "indexClaimEdgeByChildId",
    value: function indexClaimEdgeByChildId(claimEdge) {
      var destination = this.rsData.claimEdgesByChildId[claimEdge.childId.toString()];

      if (!destination) {
        destination = [];
        this.rsData.claimEdgesByChildId[claimEdge.childId.toString()] = destination;
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
          result.push(this.rsData.items[itemId][0]);
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
    }
  }, {
    key: "getItem",
    value: function getItem(ItemId) {
      var when = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _End["default"];
      return this.rsData.items[ItemId.toString()].find(function (e) {
        return e.end >= _End["default"];
      });
    }
  }, {
    key: "getClaimEdgesByParentId",
    value: function getClaimEdgesByParentId(parentId) {
      var when = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _End["default"];
      var claimEdgeIds = this.rsData.claimEdgesByParentId[parentId.toString()];

      if (claimEdgeIds) {
        return this.getItemsForArray(claimEdgeIds);
      } else {
        return [];
      }
    }
  }, {
    key: "getClaimEdgesByChildId",
    value: function getClaimEdgesByChildId(childId) {
      var when = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _End["default"];
      var claimEdgeIds = this.rsData.claimEdgesByChildId[childId.toString()];

      if (claimEdgeIds) {
        return this.getItemsForArray(claimEdgeIds);
      } else {
        return [];
      }
    }
  }, {
    key: "getScoreBySourceClaimId",
    value: function getScoreBySourceClaimId(sourceClaimId) {
      var when = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _End["default"];
      var scoreIdString = this.rsData.scoreBySourceClaimId[sourceClaimId.toString()];

      if (scoreIdString) {
        var score = this.getItem((0, _Id.ID)(scoreIdString));

        if (score) {
          return score;
        }
      } //If there is not an existing score then create it


      var newScore = new _Score.Score(undefined, undefined, undefined, sourceClaimId);
      this.notify([new _Change.Change(newScore)]);
      return newScore;
    }
  }]);

  return Repository;
}();

exports.Repository = Repository;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9SZXBvc2l0b3J5LnRzIl0sIm5hbWVzIjpbIlJlcG9zaXRvcnkiLCJSc0RhdGEiLCJjaGFuZ2VzIiwibG9nIiwidW5zaGlmdCIsImNoYW5nZSIsIm5ld0l0ZW0iLCJpZFN0cmluZyIsImlkIiwidG9TdHJpbmciLCJvbGRJdGVtcyIsInJzRGF0YSIsIml0ZW1zIiwibGVuZ3RoIiwiZW5kIiwiRGF0ZSIsInRvSVNPU3RyaW5nIiwidHlwZSIsIlR5cGUiLCJjbGFpbUVkZ2UiLCJpbmRleENsYWltRWRnZUJ5UGFyZW50SWQiLCJpbmRleENsYWltRWRnZUJ5Q2hpbGRJZCIsInNjb3JlIiwic2NvcmVCeVNvdXJjZUNsYWltSWQiLCJzb3VyY2VDbGFpbUlkIiwiZGVzdGluYXRpb24iLCJjbGFpbUVkZ2VzQnlQYXJlbnRJZCIsInBhcmVudElkIiwiaW5jbHVkZXMiLCJwdXNoIiwiY2xhaW1FZGdlc0J5Q2hpbGRJZCIsImNoaWxkSWQiLCJpdGVtSWRzIiwicmVzdWx0IiwiaXRlbUlkIiwiSXRlbUlkIiwid2hlbiIsIkVuZCIsImZpbmQiLCJlIiwiY2xhaW1FZGdlSWRzIiwiZ2V0SXRlbXNGb3JBcnJheSIsInNjb3JlSWRTdHJpbmciLCJnZXRJdGVtIiwibmV3U2NvcmUiLCJTY29yZSIsInVuZGVmaW5lZCIsIm5vdGlmeSIsIkNoYW5nZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUVBOzs7Ozs7Ozs7Ozs7SUFJYUEsVTs7Ozs7O29DQUN3QixJQUFJQyxjQUFKLEU7O2lDQUNDLEU7Ozs7OztBQUVsQzsyQkFDT0MsTyxFQUEwQjtBQUM3QixXQUFLQyxHQUFMLENBQVNDLE9BQVQsQ0FBaUJGLE9BQWpCO0FBRDZCO0FBQUE7QUFBQTs7QUFBQTtBQUU3Qiw2QkFBcUJBLE9BQXJCLDhIQUE4QjtBQUFBLGNBQW5CRyxNQUFtQjtBQUMxQixjQUFNQyxPQUFPLEdBQUdELE1BQU0sQ0FBQ0MsT0FBdkI7QUFDQSxjQUFN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QixhLEVBQThDO0FBQUEsVUFBM0JZLElBQTJCLHVFQUFaQyxlQUFZO0FBQ2xFLFVBQU1LLGFBQWEsR0FBRyxLQUFLL0IsTUFBTCxDQUFZWSxvQkFBWixDQUFpQ0MsYUFBYSxDQUFDZixRQUFkLEVBQWpDLENBQXRCOztBQUNBLFVBQUlpQyxhQUFKLEVBQW1CO0FBQ2YsWUFBTXBCLEtBQUssR0FBVSxLQUFLcUIsT0FBTCxDQUFhLFlBQUdELGFBQUgsQ0FBYixDQUFyQjs7QUFDQSxZQUFJcEIsS0FBSixFQUFXO0FBQ1AsaUJBQU9BLEtBQVA7QUFDSDtBQUNKLE9BUGlFLENBU2xFOzs7QUFDQSxVQUFNc0IsUUFBUSxHQUFHLElBQUlDLFlBQUosQ0FBVUMsU0FBVixFQUFvQkEsU0FBcEIsRUFBOEJBLFNBQTlCLEVBQXdDdEIsYUFBeEMsQ0FBakI7QUFDQSxXQUFLdUIsTUFBTCxDQUFZLENBQUMsSUFBSUMsY0FBSixDQUFXSixRQUFYLENBQUQsQ0FBWjtBQUNBLGFBQU9BLFFBQVA7QUFDSCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENsYWltRWRnZSB9IGZyb20gXCIuL2RhdGFNb2RlbHMvQ2xhaW1FZGdlXCI7XHJcbmltcG9ydCBFbmQgZnJvbSBcIi4vZGF0YU1vZGVscy9FbmRcIjtcclxuaW1wb3J0IHsgVHlwZSB9IGZyb20gXCIuL2RhdGFNb2RlbHMvVHlwZVwiO1xyXG5pbXBvcnQgeyBDaGFuZ2UgfSBmcm9tIFwiLi9kYXRhTW9kZWxzL0NoYW5nZVwiO1xyXG5pbXBvcnQgeyBTY29yZSB9IGZyb20gXCIuL2RhdGFNb2RlbHMvU2NvcmVcIjtcclxuaW1wb3J0IHsgSWQsIElEIH0gZnJvbSBcIi4vZGF0YU1vZGVscy9JZFwiO1xyXG5pbXBvcnQgeyBJdGVtIH0gZnJvbSBcIi4vZGF0YU1vZGVscy9JdGVtXCI7XHJcbmltcG9ydCB7IFJzRGF0YSB9IGZyb20gXCIuL2RhdGFNb2RlbHMvUnNEYXRhXCI7XHJcbmltcG9ydCB7IGlSZXBvc2l0b3J5IH0gZnJvbSBcIi4vZGF0YU1vZGVscy9pUmVwb3NpdG9yeVwiO1xyXG5cclxuXHJcbmV4cG9ydCBjbGFzcyBSZXBvc2l0b3J5IGltcGxlbWVudHMgaVJlcG9zaXRvcnkge1xyXG4gICAgcHVibGljIHJlYWRvbmx5IHJzRGF0YTogUnNEYXRhID0gbmV3IFJzRGF0YSgpO1xyXG4gICAgcHVibGljIHJlYWRvbmx5IGxvZzogQ2hhbmdlW11bXSA9IFtdO1xyXG5cclxuICAgIC8qKiB0aGlzIGZ1bmN0aW9uIGNhbiBiZSBjYWxsZWQgYnkgb3V0c2lkZSBjb2RlIHRvIG5vdGZ5IHRoaXMgcmVwb3NpdG9yeSBvZiBjaGFuZ2VzICovXHJcbiAgICBub3RpZnkoY2hhbmdlczogQ2hhbmdlW10pIDogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5sb2cudW5zaGlmdChjaGFuZ2VzKTtcclxuICAgICAgICBmb3IgKGNvbnN0IGNoYW5nZSBvZiBjaGFuZ2VzKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IG5ld0l0ZW0gPSBjaGFuZ2UubmV3SXRlbTtcclxuICAgICAgICAgICAgY29uc3QgaWRTdHJpbmcgPSBuZXdJdGVtLmlkLnRvU3RyaW5nKCk7XHJcblxyXG4gICAgICAgICAgICAvL0NoYW5nZSB0aGUgZW5kIGRhdGUgb24gdGhlIHByZXZpb3VzIHZlcnNpb24gb2YgdGhpcyBpdGVtIHRvIG5vd1xyXG4gICAgICAgICAgICBjb25zdCBvbGRJdGVtcyA9IHRoaXMucnNEYXRhLml0ZW1zW2lkU3RyaW5nXVxyXG4gICAgICAgICAgICBpZiAob2xkSXRlbXMgJiYgb2xkSXRlbXMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgb2xkSXRlbXNbMF0uZW5kID0gbmV3IERhdGUoKS50b0lTT1N0cmluZygpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yc0RhdGEuaXRlbXNbaWRTdHJpbmddID0gW107XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIGFkZCB0aGUgbmV3IGl0ZW0gdG8gdGhlIGxpc3Qgb2YgaXRlbXNcclxuICAgICAgICAgICAgdGhpcy5yc0RhdGEuaXRlbXNbaWRTdHJpbmddLnVuc2hpZnQoY2hhbmdlLm5ld0l0ZW0pO1xyXG5cclxuICAgICAgICAgICAgLy9JbmRleCBDbGFpbSBFZGdlc1xyXG4gICAgICAgICAgICBpZiAoY2hhbmdlLm5ld0l0ZW0udHlwZSA9PSBUeXBlLmNsYWltRWRnZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pbmRleENsYWltRWRnZUJ5UGFyZW50SWQoPENsYWltRWRnZT5jaGFuZ2UubmV3SXRlbSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmluZGV4Q2xhaW1FZGdlQnlDaGlsZElkKDxDbGFpbUVkZ2U+Y2hhbmdlLm5ld0l0ZW0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvL0luZGV4IHNjb3JlIGJ5IHNvdXJjZSBJZFxyXG4gICAgICAgICAgICBpZiAobmV3SXRlbS50eXBlID09IFR5cGUuc2NvcmUpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHNjb3JlID0gPFNjb3JlPm5ld0l0ZW07XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJzRGF0YS5zY29yZUJ5U291cmNlQ2xhaW1JZFtzY29yZS5zb3VyY2VDbGFpbUlkLnRvU3RyaW5nKCldID0gaWRTdHJpbmc7XHJcbiAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGluZGV4Q2xhaW1FZGdlQnlQYXJlbnRJZChjbGFpbUVkZ2U6IENsYWltRWRnZSkge1xyXG4gICAgICAgIGxldCBkZXN0aW5hdGlvbiA9IHRoaXMucnNEYXRhLmNsYWltRWRnZXNCeVBhcmVudElkW2NsYWltRWRnZS5wYXJlbnRJZC50b1N0cmluZygpXTtcclxuICAgICAgICBpZiAoIWRlc3RpbmF0aW9uKSB7XHJcbiAgICAgICAgICAgIGRlc3RpbmF0aW9uID0gW107XHJcbiAgICAgICAgICAgIHRoaXMucnNEYXRhLmNsYWltRWRnZXNCeVBhcmVudElkW2NsYWltRWRnZS5wYXJlbnRJZC50b1N0cmluZygpXSA9IGRlc3RpbmF0aW9uO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIWRlc3RpbmF0aW9uLmluY2x1ZGVzKGNsYWltRWRnZS5pZC50b1N0cmluZygpKSkge1xyXG4gICAgICAgICAgICBkZXN0aW5hdGlvbi5wdXNoKGNsYWltRWRnZS5pZC50b1N0cmluZygpKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGluZGV4Q2xhaW1FZGdlQnlDaGlsZElkKGNsYWltRWRnZTogQ2xhaW1FZGdlKSB7XHJcbiAgICAgICAgbGV0IGRlc3RpbmF0aW9uID0gdGhpcy5yc0RhdGEuY2xhaW1FZGdlc0J5Q2hpbGRJZFtjbGFpbUVkZ2UuY2hpbGRJZC50b1N0cmluZygpXTtcclxuICAgICAgICBpZiAoIWRlc3RpbmF0aW9uKSB7XHJcbiAgICAgICAgICAgIGRlc3RpbmF0aW9uID0gW107XHJcbiAgICAgICAgICAgIHRoaXMucnNEYXRhLmNsYWltRWRnZXNCeUNoaWxkSWRbY2xhaW1FZGdlLmNoaWxkSWQudG9TdHJpbmcoKV0gPSBkZXN0aW5hdGlvbjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCFkZXN0aW5hdGlvbi5pbmNsdWRlcyhjbGFpbUVkZ2UuaWQudG9TdHJpbmcoKSkpIHtcclxuICAgICAgICAgICAgZGVzdGluYXRpb24ucHVzaChjbGFpbUVkZ2UuaWQudG9TdHJpbmcoKSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHByaXZhdGUgZ2V0SXRlbXNGb3JBcnJheShpdGVtSWRzOiBzdHJpbmdbXSk6IEl0ZW1bXSB7XHJcbiAgICAgICAgY29uc3QgcmVzdWx0OiBJdGVtW10gPSBbXTtcclxuICAgICAgICBmb3IgKGNvbnN0IGl0ZW1JZCBvZiBpdGVtSWRzKSB7XHJcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKHRoaXMucnNEYXRhLml0ZW1zW2l0ZW1JZF1bMF0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG5cclxuICAgIGdldEl0ZW0oSXRlbUlkOiBJZCwgd2hlbjogc3RyaW5nID0gRW5kKTogSXRlbSB8IHVuZGVmaW5lZCB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucnNEYXRhLml0ZW1zW0l0ZW1JZC50b1N0cmluZygpXS5maW5kKGUgPT5cclxuICAgICAgICAgICAgZS5lbmQgPj0gRW5kKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRDbGFpbUVkZ2VzQnlQYXJlbnRJZChwYXJlbnRJZDogSWQsIHdoZW46IHN0cmluZyA9IEVuZCk6IENsYWltRWRnZVtdIHtcclxuICAgICAgICBjb25zdCBjbGFpbUVkZ2VJZHMgPSB0aGlzLnJzRGF0YS5jbGFpbUVkZ2VzQnlQYXJlbnRJZFtwYXJlbnRJZC50b1N0cmluZygpXTtcclxuICAgICAgICBpZiAoY2xhaW1FZGdlSWRzKSB7XHJcbiAgICAgICAgICAgIHJldHVybiA8Q2xhaW1FZGdlW10+dGhpcy5nZXRJdGVtc0ZvckFycmF5KGNsYWltRWRnZUlkcylcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gW107XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGdldENsYWltRWRnZXNCeUNoaWxkSWQoY2hpbGRJZDogSWQsIHdoZW46IHN0cmluZyA9IEVuZCk6IENsYWltRWRnZVtdIHtcclxuICAgICAgICBjb25zdCBjbGFpbUVkZ2VJZHMgPSB0aGlzLnJzRGF0YS5jbGFpbUVkZ2VzQnlDaGlsZElkW2NoaWxkSWQudG9TdHJpbmcoKV07XHJcbiAgICAgICAgaWYgKGNsYWltRWRnZUlkcykge1xyXG4gICAgICAgICAgICByZXR1cm4gPENsYWltRWRnZVtdPnRoaXMuZ2V0SXRlbXNGb3JBcnJheShjbGFpbUVkZ2VJZHMpXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIFtdO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBnZXRTY29yZUJ5U291cmNlQ2xhaW1JZChzb3VyY2VDbGFpbUlkOiBJZCwgd2hlbjogc3RyaW5nID0gRW5kKTogU2NvcmUge1xyXG4gICAgICAgIGNvbnN0IHNjb3JlSWRTdHJpbmcgPSB0aGlzLnJzRGF0YS5zY29yZUJ5U291cmNlQ2xhaW1JZFtzb3VyY2VDbGFpbUlkLnRvU3RyaW5nKCldO1xyXG4gICAgICAgIGlmIChzY29yZUlkU3RyaW5nKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHNjb3JlID0gPFNjb3JlPnRoaXMuZ2V0SXRlbShJRChzY29yZUlkU3RyaW5nKSk7XHJcbiAgICAgICAgICAgIGlmIChzY29yZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHNjb3JlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL0lmIHRoZXJlIGlzIG5vdCBhbiBleGlzdGluZyBzY29yZSB0aGVuIGNyZWF0ZSBpdFxyXG4gICAgICAgIGNvbnN0IG5ld1Njb3JlID0gbmV3IFNjb3JlKHVuZGVmaW5lZCx1bmRlZmluZWQsdW5kZWZpbmVkLHNvdXJjZUNsYWltSWQpO1xyXG4gICAgICAgIHRoaXMubm90aWZ5KFtuZXcgQ2hhbmdlKG5ld1Njb3JlKV0pO1xyXG4gICAgICAgIHJldHVybiBuZXdTY29yZTtcclxuICAgIH1cclxuXHJcbn0iXX0=