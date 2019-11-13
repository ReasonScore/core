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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9SZXBvc2l0b3J5LnRzIl0sIm5hbWVzIjpbIlJlcG9zaXRvcnkiLCJSc0RhdGEiLCJjaGFuZ2VzIiwibG9nIiwidW5zaGlmdCIsImNoYW5nZSIsIm5ld0l0ZW0iLCJpZFN0cmluZyIsImlkIiwidG9TdHJpbmciLCJvbGRJdGVtcyIsInJzRGF0YSIsIml0ZW1zIiwibGVuZ3RoIiwiZW5kIiwiRGF0ZSIsInRvSVNPU3RyaW5nIiwidHlwZSIsIlR5cGUiLCJjbGFpbUVkZ2UiLCJpbmRleENsYWltRWRnZUJ5UGFyZW50SWQiLCJpbmRleENsYWltRWRnZUJ5Q2hpbGRJZCIsInNjb3JlIiwic2NvcmVCeVNvdXJjZUNsYWltSWQiLCJzb3VyY2VDbGFpbUlkIiwiZGVzdGluYXRpb24iLCJjbGFpbUVkZ2VzQnlQYXJlbnRJZCIsInBhcmVudElkIiwiaW5jbHVkZXMiLCJwdXNoIiwiY2xhaW1FZGdlc0J5Q2hpbGRJZCIsImNoaWxkSWQiLCJpdGVtSWRzIiwicmVzdWx0IiwiaXRlbUlkIiwiSXRlbUlkIiwid2hlbiIsIkVuZCIsImZpbmQiLCJlIiwiY2xhaW1FZGdlSWRzIiwiZ2V0SXRlbXNGb3JBcnJheSIsInNjb3JlSWRTdHJpbmciLCJnZXRJdGVtIiwibmV3U2NvcmUiLCJTY29yZSIsInVuZGVmaW5lZCIsIm5vdGlmeSIsIkNoYW5nZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUVBOzs7Ozs7Ozs7Ozs7SUFHYUEsVTs7Ozs7O29DQUN3QixJQUFJQyxjQUFKLEU7O2lDQUNDLEU7Ozs7OztBQUVsQzsyQkFDT0MsTyxFQUFtQjtBQUN0QixXQUFLQyxHQUFMLENBQVNDLE9BQVQsQ0FBaUJGLE9BQWpCO0FBRHNCO0FBQUE7QUFBQTs7QUFBQTtBQUV0Qiw2QkFBcUJBLE9BQXJCLDhIQUE4QjtBQUFBLGNBQW5CRyxNQUFtQjtBQUMxQixjQUFNQyxPQUFPLEdBQUdELE1BQU0sQ0FBQ0MsT0FBdkI7QUFDQSxjQUFNQyxRQUFRLEdBQUdELE9BQU8sQ0FBQ0UsRUFBUixDQUFXQyxRQUFYLEVBQWpCLENBRjBCLENBSTFCOztBQUNBLGNBQU1DLFFBQVEsR0FBRyxLQUFLQyxNQUFMLENBQVlDLEtBQVosQ0FBa0JMLFFBQWxCLENBQWpCOztBQUNBLGNBQUlHLFFBQVEsSUFBSUEsUUFBUSxDQUFDRyxNQUFULEdBQWtCLENBQWxDLEVBQXFDO0FBQ2pDSCxZQUFBQSxRQUFRLENBQUMsQ0FBRCxDQUFSLENBQVlJLEdBQVosR0FBa0IsSUFBSUMsSUFBSixHQUFXQyxXQUFYLEVBQWxCO0FBQ0gsV0FGRCxNQUVPO0FBQ0gsaUJBQUtMLE1BQUwsQ0FBWUMsS0FBWixDQUFrQkwsUUFBbEIsSUFBOEIsRUFBOUI7QUFDSCxXQVZ5QixDQVkxQjs7O0FBQ0EsZUFBS0ksTUFBTCxDQUFZQyxLQUFaLENBQWtCTCxRQUFsQixFQUE0QkgsT0FBNUIsQ0FBb0NDLE1BQU0sQ0FBQ0MsT0FBM0MsRUFiMEIsQ0FlMUI7O0FBQ0EsY0FBSUQsTUFBTSxDQUFDQyxPQUFQLENBQWVXLElBQWYsSUFBdUJDLFdBQUtDLFNBQWhDLEVBQTJDO0FBQ3ZDLGlCQUFLQyx3QkFBTCxDQUF5Q2YsTUFBTSxDQUFDQyxPQUFoRDtBQUNBLGlCQUFLZSx1QkFBTCxDQUF3Q2hCLE1BQU0sQ0FBQ0MsT0FBL0M7QUFDSCxXQW5CeUIsQ0FxQjFCOzs7QUFDQSxjQUFJQSxPQUFPLENBQUNXLElBQVIsSUFBZ0JDLFdBQUtJLEtBQXpCLEVBQWdDO0FBQzVCLGdCQUFNQSxLQUFLLEdBQVVoQixPQUFyQjtBQUNBLGlCQUFLSyxNQUFMLENBQVlZLG9CQUFaLENBQWlDRCxLQUFLLENBQUNFLGFBQU4sQ0FBb0JmLFFBQXBCLEVBQWpDLElBQW1FRixRQUFuRTtBQUNIO0FBR0o7QUE5QnFCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUErQnpCOzs7NkNBRWdDWSxTLEVBQXNCO0FBQ25ELFVBQUlNLFdBQVcsR0FBRyxLQUFLZCxNQUFMLENBQVllLG9CQUFaLENBQWlDUCxTQUFTLENBQUNRLFFBQVYsQ0FBbUJsQixRQUFuQixFQUFqQyxDQUFsQjs7QUFDQSxVQUFJLENBQUNnQixXQUFMLEVBQWtCO0FBQ2RBLFFBQUFBLFdBQVcsR0FBRyxFQUFkO0FBQ0EsYUFBS2QsTUFBTCxDQUFZZSxvQkFBWixDQUFpQ1AsU0FBUyxDQUFDUSxRQUFWLENBQW1CbEIsUUFBbkIsRUFBakMsSUFBa0VnQixXQUFsRTtBQUNIOztBQUNELFVBQUksQ0FBQ0EsV0FBVyxDQUFDRyxRQUFaLENBQXFCVCxTQUFTLENBQUNYLEVBQVYsQ0FBYUMsUUFBYixFQUFyQixDQUFMLEVBQW9EO0FBQ2hEZ0IsUUFBQUEsV0FBVyxDQUFDSSxJQUFaLENBQWlCVixTQUFTLENBQUNYLEVBQVYsQ0FBYUMsUUFBYixFQUFqQjtBQUNIO0FBQ0o7Ozs0Q0FFK0JVLFMsRUFBc0I7QUFDbEQsVUFBSU0sV0FBVyxHQUFHLEtBQUtkLE1BQUwsQ0FBWW1CLG1CQUFaLENBQWdDWCxTQUFTLENBQUNZLE9BQVYsQ0FBa0J0QixRQUFsQixFQUFoQyxDQUFsQjs7QUFDQSxVQUFJLENBQUNnQixXQUFMLEVBQWtCO0FBQ2RBLFFBQUFBLFdBQVcsR0FBRyxFQUFkO0FBQ0EsYUFBS2QsTUFBTCxDQUFZbUIsbUJBQVosQ0FBZ0NYLFNBQVMsQ0FBQ1ksT0FBVixDQUFrQnRCLFFBQWxCLEVBQWhDLElBQWdFZ0IsV0FBaEU7QUFDSDs7QUFDRCxVQUFJLENBQUNBLFdBQVcsQ0FBQ0csUUFBWixDQUFxQlQsU0FBUyxDQUFDWCxFQUFWLENBQWFDLFFBQWIsRUFBckIsQ0FBTCxFQUFvRDtBQUNoRGdCLFFBQUFBLFdBQVcsQ0FBQ0ksSUFBWixDQUFpQlYsU0FBUyxDQUFDWCxFQUFWLENBQWFDLFFBQWIsRUFBakI7QUFDSDtBQUNKOzs7cUNBR3dCdUIsTyxFQUEyQjtBQUNoRCxVQUFNQyxNQUFjLEdBQUcsRUFBdkI7QUFEZ0Q7QUFBQTtBQUFBOztBQUFBO0FBRWhELDhCQUFxQkQsT0FBckIsbUlBQThCO0FBQUEsY0FBbkJFLE1BQW1CO0FBQzFCRCxVQUFBQSxNQUFNLENBQUNKLElBQVAsQ0FBWSxLQUFLbEIsTUFBTCxDQUFZQyxLQUFaLENBQWtCc0IsTUFBbEIsRUFBMEIsQ0FBMUIsQ0FBWjtBQUNIO0FBSitDO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBS2hELGFBQU9ELE1BQVA7QUFDSDs7OzRCQUVPRSxNLEVBQWtEO0FBQUEsVUFBdENDLElBQXNDLHVFQUF2QkMsZUFBdUI7QUFDdEQsYUFBTyxLQUFLMUIsTUFBTCxDQUFZQyxLQUFaLENBQWtCdUIsTUFBTSxDQUFDMUIsUUFBUCxFQUFsQixFQUFxQzZCLElBQXJDLENBQTBDLFVBQUFDLENBQUM7QUFBQSxlQUM5Q0EsQ0FBQyxDQUFDekIsR0FBRixJQUFTdUIsZUFEcUM7QUFBQSxPQUEzQyxDQUFQO0FBRUg7Ozs0Q0FFdUJWLFEsRUFBK0M7QUFBQSxVQUFqQ1MsSUFBaUMsdUVBQWxCQyxlQUFrQjtBQUNuRSxVQUFNRyxZQUFZLEdBQUcsS0FBSzdCLE1BQUwsQ0FBWWUsb0JBQVosQ0FBaUNDLFFBQVEsQ0FBQ2xCLFFBQVQsRUFBakMsQ0FBckI7O0FBQ0EsVUFBSStCLFlBQUosRUFBa0I7QUFDZCxlQUFvQixLQUFLQyxnQkFBTCxDQUFzQkQsWUFBdEIsQ0FBcEI7QUFDSCxPQUZELE1BRU87QUFDSCxlQUFPLEVBQVA7QUFDSDtBQUNKOzs7MkNBRXNCVCxPLEVBQThDO0FBQUEsVUFBakNLLElBQWlDLHVFQUFsQkMsZUFBa0I7QUFDakUsVUFBTUcsWUFBWSxHQUFHLEtBQUs3QixNQUFMLENBQVltQixtQkFBWixDQUFnQ0MsT0FBTyxDQUFDdEIsUUFBUixFQUFoQyxDQUFyQjs7QUFDQSxVQUFJK0IsWUFBSixFQUFrQjtBQUNkLGVBQW9CLEtBQUtDLGdCQUFMLENBQXNCRCxZQUF0QixDQUFwQjtBQUNILE9BRkQsTUFFTztBQUNILGVBQU8sRUFBUDtBQUNIO0FBQ0o7Ozs0Q0FFdUJoQixhLEVBQThDO0FBQUEsVUFBM0JZLElBQTJCLHVFQUFaQyxlQUFZO0FBQ2xFLFVBQU1LLGFBQWEsR0FBRyxLQUFLL0IsTUFBTCxDQUFZWSxvQkFBWixDQUFpQ0MsYUFBYSxDQUFDZixRQUFkLEVBQWpDLENBQXRCOztBQUNBLFVBQUlpQyxhQUFKLEVBQW1CO0FBQ2YsWUFBTXBCLEtBQUssR0FBVSxLQUFLcUIsT0FBTCxDQUFhLFlBQUdELGFBQUgsQ0FBYixDQUFyQjs7QUFDQSxZQUFJcEIsS0FBSixFQUFXO0FBQ1AsaUJBQU9BLEtBQVA7QUFDSDtBQUNKLE9BUGlFLENBU2xFOzs7QUFDQSxVQUFNc0IsUUFBUSxHQUFHLElBQUlDLFlBQUosQ0FBVUMsU0FBVixFQUFvQkEsU0FBcEIsRUFBOEJBLFNBQTlCLEVBQXdDdEIsYUFBeEMsQ0FBakI7QUFDQSxXQUFLdUIsTUFBTCxDQUFZLENBQUMsSUFBSUMsY0FBSixDQUFXSixRQUFYLENBQUQsQ0FBWjtBQUNBLGFBQU9BLFFBQVA7QUFDSCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENsYWltRWRnZSB9IGZyb20gXCIuL2RhdGFNb2RlbHMvQ2xhaW1FZGdlXCI7XHJcbmltcG9ydCBFbmQgZnJvbSBcIi4vZGF0YU1vZGVscy9FbmRcIjtcclxuaW1wb3J0IHsgVHlwZSB9IGZyb20gXCIuL2RhdGFNb2RlbHMvVHlwZVwiO1xyXG5pbXBvcnQgeyBDaGFuZ2UgfSBmcm9tIFwiLi9kYXRhTW9kZWxzL0NoYW5nZVwiO1xyXG5pbXBvcnQgeyBTY29yZSB9IGZyb20gXCIuL2RhdGFNb2RlbHMvU2NvcmVcIjtcclxuaW1wb3J0IHsgSWQsIElEIH0gZnJvbSBcIi4vZGF0YU1vZGVscy9JZFwiO1xyXG5pbXBvcnQgeyBJdGVtIH0gZnJvbSBcIi4vZGF0YU1vZGVscy9JdGVtXCI7XHJcbmltcG9ydCB7IFJzRGF0YSB9IGZyb20gXCIuL2RhdGFNb2RlbHMvUnNEYXRhXCI7XHJcblxyXG5cclxuZXhwb3J0IGNsYXNzIFJlcG9zaXRvcnkge1xyXG4gICAgcHVibGljIHJlYWRvbmx5IHJzRGF0YTogUnNEYXRhID0gbmV3IFJzRGF0YSgpO1xyXG4gICAgcHVibGljIHJlYWRvbmx5IGxvZzogQ2hhbmdlW11bXSA9IFtdO1xyXG5cclxuICAgIC8qKiB0aGlzIGZ1bmN0aW9uIGNhbiBiZSBjYWxsZWQgYnkgb3V0c2lkZSBjb2RlIHRvIG5vdGZ5IHRoaXMgcmVwb3NpdG9yeSBvZiBjaGFuZ2VzICovXHJcbiAgICBub3RpZnkoY2hhbmdlczogQ2hhbmdlW10pIHtcclxuICAgICAgICB0aGlzLmxvZy51bnNoaWZ0KGNoYW5nZXMpO1xyXG4gICAgICAgIGZvciAoY29uc3QgY2hhbmdlIG9mIGNoYW5nZXMpIHtcclxuICAgICAgICAgICAgY29uc3QgbmV3SXRlbSA9IGNoYW5nZS5uZXdJdGVtO1xyXG4gICAgICAgICAgICBjb25zdCBpZFN0cmluZyA9IG5ld0l0ZW0uaWQudG9TdHJpbmcoKTtcclxuXHJcbiAgICAgICAgICAgIC8vQ2hhbmdlIHRoZSBlbmQgZGF0ZSBvbiB0aGUgcHJldmlvdXMgdmVyc2lvbiBvZiB0aGlzIGl0ZW0gdG8gbm93XHJcbiAgICAgICAgICAgIGNvbnN0IG9sZEl0ZW1zID0gdGhpcy5yc0RhdGEuaXRlbXNbaWRTdHJpbmddXHJcbiAgICAgICAgICAgIGlmIChvbGRJdGVtcyAmJiBvbGRJdGVtcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBvbGRJdGVtc1swXS5lbmQgPSBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJzRGF0YS5pdGVtc1tpZFN0cmluZ10gPSBbXTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gYWRkIHRoZSBuZXcgaXRlbSB0byB0aGUgbGlzdCBvZiBpdGVtc1xyXG4gICAgICAgICAgICB0aGlzLnJzRGF0YS5pdGVtc1tpZFN0cmluZ10udW5zaGlmdChjaGFuZ2UubmV3SXRlbSk7XHJcblxyXG4gICAgICAgICAgICAvL0luZGV4IENsYWltIEVkZ2VzXHJcbiAgICAgICAgICAgIGlmIChjaGFuZ2UubmV3SXRlbS50eXBlID09IFR5cGUuY2xhaW1FZGdlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmluZGV4Q2xhaW1FZGdlQnlQYXJlbnRJZCg8Q2xhaW1FZGdlPmNoYW5nZS5uZXdJdGVtKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuaW5kZXhDbGFpbUVkZ2VCeUNoaWxkSWQoPENsYWltRWRnZT5jaGFuZ2UubmV3SXRlbSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vSW5kZXggc2NvcmUgYnkgc291cmNlIElkXHJcbiAgICAgICAgICAgIGlmIChuZXdJdGVtLnR5cGUgPT0gVHlwZS5zY29yZSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgc2NvcmUgPSA8U2NvcmU+bmV3SXRlbTtcclxuICAgICAgICAgICAgICAgIHRoaXMucnNEYXRhLnNjb3JlQnlTb3VyY2VDbGFpbUlkW3Njb3JlLnNvdXJjZUNsYWltSWQudG9TdHJpbmcoKV0gPSBpZFN0cmluZztcclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaW5kZXhDbGFpbUVkZ2VCeVBhcmVudElkKGNsYWltRWRnZTogQ2xhaW1FZGdlKSB7XHJcbiAgICAgICAgbGV0IGRlc3RpbmF0aW9uID0gdGhpcy5yc0RhdGEuY2xhaW1FZGdlc0J5UGFyZW50SWRbY2xhaW1FZGdlLnBhcmVudElkLnRvU3RyaW5nKCldO1xyXG4gICAgICAgIGlmICghZGVzdGluYXRpb24pIHtcclxuICAgICAgICAgICAgZGVzdGluYXRpb24gPSBbXTtcclxuICAgICAgICAgICAgdGhpcy5yc0RhdGEuY2xhaW1FZGdlc0J5UGFyZW50SWRbY2xhaW1FZGdlLnBhcmVudElkLnRvU3RyaW5nKCldID0gZGVzdGluYXRpb247XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghZGVzdGluYXRpb24uaW5jbHVkZXMoY2xhaW1FZGdlLmlkLnRvU3RyaW5nKCkpKSB7XHJcbiAgICAgICAgICAgIGRlc3RpbmF0aW9uLnB1c2goY2xhaW1FZGdlLmlkLnRvU3RyaW5nKCkpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaW5kZXhDbGFpbUVkZ2VCeUNoaWxkSWQoY2xhaW1FZGdlOiBDbGFpbUVkZ2UpIHtcclxuICAgICAgICBsZXQgZGVzdGluYXRpb24gPSB0aGlzLnJzRGF0YS5jbGFpbUVkZ2VzQnlDaGlsZElkW2NsYWltRWRnZS5jaGlsZElkLnRvU3RyaW5nKCldO1xyXG4gICAgICAgIGlmICghZGVzdGluYXRpb24pIHtcclxuICAgICAgICAgICAgZGVzdGluYXRpb24gPSBbXTtcclxuICAgICAgICAgICAgdGhpcy5yc0RhdGEuY2xhaW1FZGdlc0J5Q2hpbGRJZFtjbGFpbUVkZ2UuY2hpbGRJZC50b1N0cmluZygpXSA9IGRlc3RpbmF0aW9uO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIWRlc3RpbmF0aW9uLmluY2x1ZGVzKGNsYWltRWRnZS5pZC50b1N0cmluZygpKSkge1xyXG4gICAgICAgICAgICBkZXN0aW5hdGlvbi5wdXNoKGNsYWltRWRnZS5pZC50b1N0cmluZygpKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgcHJpdmF0ZSBnZXRJdGVtc0ZvckFycmF5KGl0ZW1JZHM6IHN0cmluZ1tdKTogSXRlbVtdIHtcclxuICAgICAgICBjb25zdCByZXN1bHQ6IEl0ZW1bXSA9IFtdO1xyXG4gICAgICAgIGZvciAoY29uc3QgaXRlbUlkIG9mIGl0ZW1JZHMpIHtcclxuICAgICAgICAgICAgcmVzdWx0LnB1c2godGhpcy5yc0RhdGEuaXRlbXNbaXRlbUlkXVswXSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0SXRlbShJdGVtSWQ6IElkLCB3aGVuOiBzdHJpbmcgPSBFbmQpOiBJdGVtIHwgdW5kZWZpbmVkIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5yc0RhdGEuaXRlbXNbSXRlbUlkLnRvU3RyaW5nKCldLmZpbmQoZSA9PlxyXG4gICAgICAgICAgICBlLmVuZCA+PSBFbmQpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldENsYWltRWRnZXNCeVBhcmVudElkKHBhcmVudElkOiBJZCwgd2hlbjogc3RyaW5nID0gRW5kKTogQ2xhaW1FZGdlW10ge1xyXG4gICAgICAgIGNvbnN0IGNsYWltRWRnZUlkcyA9IHRoaXMucnNEYXRhLmNsYWltRWRnZXNCeVBhcmVudElkW3BhcmVudElkLnRvU3RyaW5nKCldO1xyXG4gICAgICAgIGlmIChjbGFpbUVkZ2VJZHMpIHtcclxuICAgICAgICAgICAgcmV0dXJuIDxDbGFpbUVkZ2VbXT50aGlzLmdldEl0ZW1zRm9yQXJyYXkoY2xhaW1FZGdlSWRzKVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBbXTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0Q2xhaW1FZGdlc0J5Q2hpbGRJZChjaGlsZElkOiBJZCwgd2hlbjogc3RyaW5nID0gRW5kKTogQ2xhaW1FZGdlW10ge1xyXG4gICAgICAgIGNvbnN0IGNsYWltRWRnZUlkcyA9IHRoaXMucnNEYXRhLmNsYWltRWRnZXNCeUNoaWxkSWRbY2hpbGRJZC50b1N0cmluZygpXTtcclxuICAgICAgICBpZiAoY2xhaW1FZGdlSWRzKSB7XHJcbiAgICAgICAgICAgIHJldHVybiA8Q2xhaW1FZGdlW10+dGhpcy5nZXRJdGVtc0ZvckFycmF5KGNsYWltRWRnZUlkcylcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gW107XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGdldFNjb3JlQnlTb3VyY2VDbGFpbUlkKHNvdXJjZUNsYWltSWQ6IElkLCB3aGVuOiBzdHJpbmcgPSBFbmQpOiBTY29yZSB7XHJcbiAgICAgICAgY29uc3Qgc2NvcmVJZFN0cmluZyA9IHRoaXMucnNEYXRhLnNjb3JlQnlTb3VyY2VDbGFpbUlkW3NvdXJjZUNsYWltSWQudG9TdHJpbmcoKV07XHJcbiAgICAgICAgaWYgKHNjb3JlSWRTdHJpbmcpIHtcclxuICAgICAgICAgICAgY29uc3Qgc2NvcmUgPSA8U2NvcmU+dGhpcy5nZXRJdGVtKElEKHNjb3JlSWRTdHJpbmcpKTtcclxuICAgICAgICAgICAgaWYgKHNjb3JlKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gc2NvcmU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vSWYgdGhlcmUgaXMgbm90IGFuIGV4aXN0aW5nIHNjb3JlIHRoZW4gY3JlYXRlIGl0XHJcbiAgICAgICAgY29uc3QgbmV3U2NvcmUgPSBuZXcgU2NvcmUodW5kZWZpbmVkLHVuZGVmaW5lZCx1bmRlZmluZWQsc291cmNlQ2xhaW1JZCk7XHJcbiAgICAgICAgdGhpcy5ub3RpZnkoW25ldyBDaGFuZ2UobmV3U2NvcmUpXSk7XHJcbiAgICAgICAgcmV0dXJuIG5ld1Njb3JlO1xyXG4gICAgfVxyXG5cclxufSJdfQ==