"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Repository = void 0;

var _end = _interopRequireDefault(require("./dataModels/end"));

var _Type = require("./dataModels/Type");

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
      var when = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _end["default"];
      return this.rsData.items[ItemId.toString()].find(function (e) {
        return e.end >= _end["default"];
      });
    }
  }, {
    key: "getClaimEdgesByParentId",
    value: function getClaimEdgesByParentId(parentId) {
      var when = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _end["default"];
      return this.getItemsForArray(this.rsData.claimEdgesByParentId[parentId.toString()]);
    }
  }, {
    key: "getClaimEdgesByChildId",
    value: function getClaimEdgesByChildId(childId) {
      var when = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _end["default"];
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
      var when = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _end["default"];
      var scoreIdString = this.rsData.scoreBySourceClaimId[sourceClaimId.toString()];
      var score = this.getItem((0, _Id.ID)(scoreIdString));

      if (score) {
        return score;
      } else {
        return new _Score.Score();
      }
    }
  }]);

  return Repository;
}();

exports.Repository = Repository;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9SZXBvc2l0b3J5LnRzIl0sIm5hbWVzIjpbIlJlcG9zaXRvcnkiLCJSc0RhdGEiLCJjaGFuZ2VzIiwibG9nIiwidW5zaGlmdCIsImNoYW5nZSIsIm5ld0l0ZW0iLCJpZFN0cmluZyIsImlkIiwidG9TdHJpbmciLCJvbGRJdGVtcyIsInJzRGF0YSIsIml0ZW1zIiwibGVuZ3RoIiwiZW5kIiwiRGF0ZSIsInRvSVNPU3RyaW5nIiwidHlwZSIsIlR5cGUiLCJjbGFpbUVkZ2UiLCJpbmRleENsYWltRWRnZUJ5UGFyZW50SWQiLCJpbmRleENsYWltRWRnZUJ5Q2hpbGRJZCIsInNjb3JlIiwic2NvcmVCeVNvdXJjZUNsYWltSWQiLCJzb3VyY2VDbGFpbUlkIiwiZGVzdGluYXRpb24iLCJjbGFpbUVkZ2VzQnlQYXJlbnRJZCIsInBhcmVudElkIiwiaW5jbHVkZXMiLCJwdXNoIiwiY2xhaW1FZGdlc0J5Q2hpbGRJZCIsImNoaWxkSWQiLCJpdGVtSWRzIiwicmVzdWx0IiwiaXRlbUlkIiwiSXRlbUlkIiwid2hlbiIsIkVuZCIsImZpbmQiLCJlIiwiZ2V0SXRlbXNGb3JBcnJheSIsImNsYWltRWRnZUlkcyIsInNjb3JlSWRTdHJpbmciLCJnZXRJdGVtIiwiU2NvcmUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFDQTs7QUFDQTs7QUFFQTs7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7O0lBR2FBLFU7Ozs7OztvQ0FDd0IsSUFBSUMsY0FBSixFOztpQ0FDQyxFOzs7Ozs7QUFFbEM7MkJBQ09DLE8sRUFBbUI7QUFDdEIsV0FBS0MsR0FBTCxDQUFTQyxPQUFULENBQWlCRixPQUFqQjtBQURzQjtBQUFBO0FBQUE7O0FBQUE7QUFFdEIsNkJBQXFCQSxPQUFyQiw4SEFBOEI7QUFBQSxjQUFuQkcsTUFBbUI7QUFDMUIsY0FBTUMsT0FBTyxHQUFHRCxNQUFNLENBQUNDLE9BQXZCO0FBQ0EsY0FBTUMsUUFBUSxHQUFHRCxPQUFPLENBQUNFLEVBQVIsQ0FBV0MsUUFBWCxFQUFqQixD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QUFLLEdBQVUsS0FBS3FCLE9BQUwsQ0FBYSxZQUFHRCxhQUFILENBQWIsQ0FBckI7O0FBQ0EsVUFBSXBCLEtBQUosRUFBVztBQUNQLGVBQU9BLEtBQVA7QUFDSCxPQUZELE1BRU87QUFDSCxlQUFPLElBQUlzQixZQUFKLEVBQVA7QUFDSDtBQUNKIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2xhaW1FZGdlIH0gZnJvbSBcIi4vZGF0YU1vZGVscy9DbGFpbUVkZ2VcIjtcclxuaW1wb3J0IEVuZCBmcm9tIFwiLi9kYXRhTW9kZWxzL2VuZFwiO1xyXG5pbXBvcnQgeyBUeXBlIH0gZnJvbSBcIi4vZGF0YU1vZGVscy9UeXBlXCI7XHJcbmltcG9ydCB7IENoYW5nZSB9IGZyb20gXCIuL2RhdGFNb2RlbHMvQ2hhbmdlXCI7XHJcbmltcG9ydCB7IFNjb3JlIH0gZnJvbSBcIi4vZGF0YU1vZGVscy9TY29yZVwiO1xyXG5pbXBvcnQgeyBJZCwgSUQgfSBmcm9tIFwiLi9kYXRhTW9kZWxzL0lkXCI7XHJcbmltcG9ydCB7IEl0ZW0gfSBmcm9tIFwiLi9kYXRhTW9kZWxzL0l0ZW1cIjtcclxuaW1wb3J0IHsgUnNEYXRhIH0gZnJvbSBcIi4vZGF0YU1vZGVscy9Sc0RhdGFcIjtcclxuXHJcblxyXG5leHBvcnQgY2xhc3MgUmVwb3NpdG9yeSB7XHJcbiAgICBwdWJsaWMgcmVhZG9ubHkgcnNEYXRhOiBSc0RhdGEgPSBuZXcgUnNEYXRhKCk7XHJcbiAgICBwdWJsaWMgcmVhZG9ubHkgbG9nOiBDaGFuZ2VbXVtdID0gW107XHJcblxyXG4gICAgLyoqIHRoaXMgZnVuY3Rpb24gY2FuIGJlIGNhbGxlZCBieSBvdXRzaWRlIGNvZGUgdG8gbm90ZnkgdGhpcyByZXBvc2l0b3J5IG9mIGNoYW5nZXMgKi9cclxuICAgIG5vdGlmeShjaGFuZ2VzOiBDaGFuZ2VbXSkge1xyXG4gICAgICAgIHRoaXMubG9nLnVuc2hpZnQoY2hhbmdlcyk7XHJcbiAgICAgICAgZm9yIChjb25zdCBjaGFuZ2Ugb2YgY2hhbmdlcykge1xyXG4gICAgICAgICAgICBjb25zdCBuZXdJdGVtID0gY2hhbmdlLm5ld0l0ZW07XHJcbiAgICAgICAgICAgIGNvbnN0IGlkU3RyaW5nID0gbmV3SXRlbS5pZC50b1N0cmluZygpO1xyXG5cclxuICAgICAgICAgICAgLy9DaGFuZ2UgdGhlIGVuZCBkYXRlIG9uIHRoZSBwcmV2aW91cyB2ZXJzaW9uIG9mIHRoaXMgaXRlbSB0byBub3dcclxuICAgICAgICAgICAgY29uc3Qgb2xkSXRlbXMgPSB0aGlzLnJzRGF0YS5pdGVtc1tpZFN0cmluZ11cclxuICAgICAgICAgICAgaWYgKG9sZEl0ZW1zICYmIG9sZEl0ZW1zLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgIG9sZEl0ZW1zWzBdLmVuZCA9IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucnNEYXRhLml0ZW1zW2lkU3RyaW5nXSA9IFtdO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBhZGQgdGhlIG5ldyBpdGVtIHRvIHRoZSBsaXN0IG9mIGl0ZW1zXHJcbiAgICAgICAgICAgIHRoaXMucnNEYXRhLml0ZW1zW2lkU3RyaW5nXS51bnNoaWZ0KGNoYW5nZS5uZXdJdGVtKTtcclxuXHJcbiAgICAgICAgICAgIC8vSW5kZXggQ2xhaW0gRWRnZXNcclxuICAgICAgICAgICAgaWYgKGNoYW5nZS5uZXdJdGVtLnR5cGUgPT0gVHlwZS5jbGFpbUVkZ2UpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaW5kZXhDbGFpbUVkZ2VCeVBhcmVudElkKDxDbGFpbUVkZ2U+Y2hhbmdlLm5ld0l0ZW0pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pbmRleENsYWltRWRnZUJ5Q2hpbGRJZCg8Q2xhaW1FZGdlPmNoYW5nZS5uZXdJdGVtKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy9JbmRleCBzY29yZSBieSBzb3VyY2UgSWRcclxuICAgICAgICAgICAgaWYgKG5ld0l0ZW0udHlwZSA9PSBUeXBlLnNjb3JlKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBzY29yZSA9IDxTY29yZT5uZXdJdGVtO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yc0RhdGEuc2NvcmVCeVNvdXJjZUNsYWltSWRbc2NvcmUuc291cmNlQ2xhaW1JZC50b1N0cmluZygpXSA9IGlkU3RyaW5nO1xyXG4gICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBpbmRleENsYWltRWRnZUJ5UGFyZW50SWQoY2xhaW1FZGdlOiBDbGFpbUVkZ2UpIHtcclxuICAgICAgICBsZXQgZGVzdGluYXRpb24gPSB0aGlzLnJzRGF0YS5jbGFpbUVkZ2VzQnlQYXJlbnRJZFtjbGFpbUVkZ2UucGFyZW50SWQudG9TdHJpbmcoKV07XHJcbiAgICAgICAgaWYgKCFkZXN0aW5hdGlvbikge1xyXG4gICAgICAgICAgICBkZXN0aW5hdGlvbiA9IFtdO1xyXG4gICAgICAgICAgICB0aGlzLnJzRGF0YS5jbGFpbUVkZ2VzQnlQYXJlbnRJZFtjbGFpbUVkZ2UucGFyZW50SWQudG9TdHJpbmcoKV0gPSBkZXN0aW5hdGlvbjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCFkZXN0aW5hdGlvbi5pbmNsdWRlcyhjbGFpbUVkZ2UuaWQudG9TdHJpbmcoKSkpIHtcclxuICAgICAgICAgICAgZGVzdGluYXRpb24ucHVzaChjbGFpbUVkZ2UuaWQudG9TdHJpbmcoKSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBpbmRleENsYWltRWRnZUJ5Q2hpbGRJZChjbGFpbUVkZ2U6IENsYWltRWRnZSkge1xyXG4gICAgICAgIGxldCBkZXN0aW5hdGlvbiA9IHRoaXMucnNEYXRhLmNsYWltRWRnZXNCeUNoaWxkSWRbY2xhaW1FZGdlLmNoaWxkSWQudG9TdHJpbmcoKV07XHJcbiAgICAgICAgaWYgKCFkZXN0aW5hdGlvbikge1xyXG4gICAgICAgICAgICBkZXN0aW5hdGlvbiA9IFtdO1xyXG4gICAgICAgICAgICB0aGlzLnJzRGF0YS5jbGFpbUVkZ2VzQnlDaGlsZElkW2NsYWltRWRnZS5jaGlsZElkLnRvU3RyaW5nKCldID0gZGVzdGluYXRpb247XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghZGVzdGluYXRpb24uaW5jbHVkZXMoY2xhaW1FZGdlLmlkLnRvU3RyaW5nKCkpKSB7XHJcbiAgICAgICAgICAgIGRlc3RpbmF0aW9uLnB1c2goY2xhaW1FZGdlLmlkLnRvU3RyaW5nKCkpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwcml2YXRlIGdldEl0ZW1zRm9yQXJyYXkoaXRlbUlkczogc3RyaW5nW10pOiBJdGVtW10ge1xyXG4gICAgICAgIGNvbnN0IHJlc3VsdDogSXRlbVtdID0gW107XHJcbiAgICAgICAgZm9yIChjb25zdCBpdGVtSWQgb2YgaXRlbUlkcykge1xyXG4gICAgICAgICAgICByZXN1bHQucHVzaCh0aGlzLnJzRGF0YS5pdGVtc1tpdGVtSWRdWzBdKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuXHJcbiAgICBnZXRJdGVtKEl0ZW1JZDogSWQsIHdoZW46IHN0cmluZyA9IEVuZCk6IEl0ZW0gfCB1bmRlZmluZWQge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnJzRGF0YS5pdGVtc1tJdGVtSWQudG9TdHJpbmcoKV0uZmluZChlID0+XHJcbiAgICAgICAgICAgIGUuZW5kID49IEVuZCk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0Q2xhaW1FZGdlc0J5UGFyZW50SWQocGFyZW50SWQ6IElkLCB3aGVuOiBzdHJpbmcgPSBFbmQpOiBDbGFpbUVkZ2VbXSB7XHJcbiAgICAgICAgcmV0dXJuIDxDbGFpbUVkZ2VbXT50aGlzLmdldEl0ZW1zRm9yQXJyYXkodGhpcy5yc0RhdGEuY2xhaW1FZGdlc0J5UGFyZW50SWRbcGFyZW50SWQudG9TdHJpbmcoKV0pXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0Q2xhaW1FZGdlc0J5Q2hpbGRJZChjaGlsZElkOiBJZCwgd2hlbjogc3RyaW5nID0gRW5kKTogQ2xhaW1FZGdlW10ge1xyXG4gICAgICAgIGNvbnN0IGNsYWltRWRnZUlkcyA9IHRoaXMucnNEYXRhLmNsYWltRWRnZXNCeUNoaWxkSWRbY2hpbGRJZC50b1N0cmluZygpXTtcclxuICAgICAgICBpZiAoY2xhaW1FZGdlSWRzKSB7XHJcbiAgICAgICAgICAgIHJldHVybiA8Q2xhaW1FZGdlW10+dGhpcy5nZXRJdGVtc0ZvckFycmF5KGNsYWltRWRnZUlkcylcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gW107XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGdldFNjb3JlQnlTb3VyY2VDbGFpbUlkKHNvdXJjZUNsYWltSWQ6IElkLCB3aGVuOiBzdHJpbmcgPSBFbmQpOiBTY29yZSB7XHJcbiAgICAgICAgY29uc3Qgc2NvcmVJZFN0cmluZyA9IHRoaXMucnNEYXRhLnNjb3JlQnlTb3VyY2VDbGFpbUlkW3NvdXJjZUNsYWltSWQudG9TdHJpbmcoKV07XHJcbiAgICAgICAgY29uc3Qgc2NvcmUgPSA8U2NvcmU+dGhpcy5nZXRJdGVtKElEKHNjb3JlSWRTdHJpbmcpKTtcclxuICAgICAgICBpZiAoc2NvcmUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHNjb3JlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgU2NvcmUoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59Il19