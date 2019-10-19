"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Repository = void 0;

var _End = _interopRequireDefault(require("./dataModels/End"));

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
      }

      return new _Score.Score();
    }
  }]);

  return Repository;
}();

exports.Repository = Repository;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9SZXBvc2l0b3J5LnRzIl0sIm5hbWVzIjpbIlJlcG9zaXRvcnkiLCJSc0RhdGEiLCJjaGFuZ2VzIiwibG9nIiwidW5zaGlmdCIsImNoYW5nZSIsIm5ld0l0ZW0iLCJpZFN0cmluZyIsImlkIiwidG9TdHJpbmciLCJvbGRJdGVtcyIsInJzRGF0YSIsIml0ZW1zIiwibGVuZ3RoIiwiZW5kIiwiRGF0ZSIsInRvSVNPU3RyaW5nIiwidHlwZSIsIlR5cGUiLCJjbGFpbUVkZ2UiLCJpbmRleENsYWltRWRnZUJ5UGFyZW50SWQiLCJpbmRleENsYWltRWRnZUJ5Q2hpbGRJZCIsInNjb3JlIiwic2NvcmVCeVNvdXJjZUNsYWltSWQiLCJzb3VyY2VDbGFpbUlkIiwiZGVzdGluYXRpb24iLCJjbGFpbUVkZ2VzQnlQYXJlbnRJZCIsInBhcmVudElkIiwiaW5jbHVkZXMiLCJwdXNoIiwiY2xhaW1FZGdlc0J5Q2hpbGRJZCIsImNoaWxkSWQiLCJpdGVtSWRzIiwicmVzdWx0IiwiaXRlbUlkIiwiSXRlbUlkIiwid2hlbiIsIkVuZCIsImZpbmQiLCJlIiwiY2xhaW1FZGdlSWRzIiwiZ2V0SXRlbXNGb3JBcnJheSIsInNjb3JlSWRTdHJpbmciLCJnZXRJdGVtIiwiU2NvcmUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFDQTs7QUFDQTs7QUFFQTs7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7O0lBR2FBLFU7Ozs7OztvQ0FDd0IsSUFBSUMsY0FBSixFOztpQ0FDQyxFOzs7Ozs7QUFFbEM7MkJBQ09DLE8sRUFBbUI7QUFDdEIsV0FBS0MsR0FBTCxDQUFTQyxPQUFULENBQWlCRixPQUFqQjtBQURzQjtBQUFBO0FBQUE7O0FBQUE7QUFFdEIsNkJBQXFCQSxPQUFyQiw4SEFBOEI7QUFBQSxjQUFuQkcsTUFBbUI7QUFDMUIsY0FBTUMsT0FBTyxHQUFHRCxNQUFNLENBQUNDLE9BQXZCO0FBQ0EsY0FBTUMsUUFBUSxHQUFHRCxPQUFPLENBQUNFLEVBQVIsQ0FBV0MsUUFBWCxFQUFqQixDQUYwQixDQUkxQjs7QUFDQSxjQUFNQyxRQUFRLEdBQUcsS0FBS0MsTUFBTCxDQUFZQyxLQUFaLENBQWtCTCxRQUFsQixDQUFqQjs7QUFDQSxjQUFJRyxRQUFRLElBQUlBLFFBQVEsQ0FBQ0csTUFBVCxHQUFrQixDQUFsQyxFQUFxQztBQUNqQ0gsWUFBQUEsUUFBUSxDQUFDLENBQUQsQ0FBUixDQUFZSSxHQUFaLEdBQWtCLElBQUlDLElBQUosR0FBV0MsV0FBWCxFQUFsQjtBQUNILFdBRkQsTUFFTztBQUNILGlCQUFLTCxNQUFMLENBQVlDLEtBQVosQ0FBa0JMLFFBQWxCLElBQThCLEVBQTlCO0FBQ0gsV0FWeUIsQ0FZMUI7OztBQUNBLGVBQUtJLE1BQUwsQ0FBWUMsS0FBWixDQUFrQkwsUUFBbEIsRUFBNEJILE9BQTVCLENBQW9DQyxNQUFNLENBQUNDLE9BQTNDLEVBYjBCLENBZTFCOztBQUNBLGNBQUlELE1BQU0sQ0FBQ0MsT0FBUCxDQUFlVyxJQUFmLElBQXVCQyxXQUFLQyxTQUFoQyxFQUEyQztBQUN2QyxpQkFBS0Msd0JBQUwsQ0FBeUNmLE1BQU0sQ0FBQ0MsT0FBaEQ7QUFDQSxpQkFBS2UsdUJBQUwsQ0FBd0NoQixNQUFNLENBQUNDLE9BQS9DO0FBQ0gsV0FuQnlCLENBcUIxQjs7O0FBQ0EsY0FBSUEsT0FBTyxDQUFDVyxJQUFSLElBQWdCQyxXQUFLSSxLQUF6QixFQUFnQztBQUM1QixnQkFBTUEsS0FBSyxHQUFVaEIsT0FBckI7QUFDQSxpQkFBS0ssTUFBTCxDQUFZWSxvQkFBWixDQUFpQ0QsS0FBSyxDQUFDRSxhQUFOLENBQW9CZixRQUFwQixFQUFqQyxJQUFtRUYsUUFBbkU7QUFDSDtBQUdKO0FBOUJxQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBK0J6Qjs7OzZDQUVnQ1ksUyxFQUFzQjtBQUNuRCxVQUFJTSxXQUFXLEdBQUcsS0FBS2QsTUFBTCxDQUFZZSxvQkFBWixDQUFpQ1AsU0FBUyxDQUFDUSxRQUFWLENBQW1CbEIsUUFBbkIsRUFBakMsQ0FBbEI7O0FBQ0EsVUFBSSxDQUFDZ0IsV0FBTCxFQUFrQjtBQUNkQSxRQUFBQSxXQUFXLEdBQUcsRUFBZDtBQUNBLGFBQUtkLE1BQUwsQ0FBWWUsb0JBQVosQ0FBaUNQLFNBQVMsQ0FBQ1EsUUFBVixDQUFtQmxCLFFBQW5CLEVBQWpDLElBQWtFZ0IsV0FBbEU7QUFDSDs7QUFDRCxVQUFJLENBQUNBLFdBQVcsQ0FBQ0csUUFBWixDQUFxQlQsU0FBUyxDQUFDWCxFQUFWLENBQWFDLFFBQWIsRUFBckIsQ0FBTCxFQUFvRDtBQUNoRGdCLFFBQUFBLFdBQVcsQ0FBQ0ksSUFBWixDQUFpQlYsU0FBUyxDQUFDWCxFQUFWLENBQWFDLFFBQWIsRUFBakI7QUFDSDtBQUNKOzs7NENBRStCVSxTLEVBQXNCO0FBQ2xELFVBQUlNLFdBQVcsR0FBRyxLQUFLZCxNQUFMLENBQVltQixtQkFBWixDQUFnQ1gsU0FBUyxDQUFDWSxPQUFWLENBQWtCdEIsUUFBbEIsRUFBaEMsQ0FBbEI7O0FBQ0EsVUFBSSxDQUFDZ0IsV0FBTCxFQUFrQjtBQUNkQSxRQUFBQSxXQUFXLEdBQUcsRUFBZDtBQUNBLGFBQUtkLE1BQUwsQ0FBWW1CLG1CQUFaLENBQWdDWCxTQUFTLENBQUNZLE9BQVYsQ0FBa0J0QixRQUFsQixFQUFoQyxJQUFnRWdCLFdBQWhFO0FBQ0g7O0FBQ0QsVUFBSSxDQUFDQSxXQUFXLENBQUNHLFFBQVosQ0FBcUJULFNBQVMsQ0FBQ1gsRUFBVixDQUFhQyxRQUFiLEVBQXJCLENBQUwsRUFBb0Q7QUFDaERnQixRQUFBQSxXQUFXLENBQUNJLElBQVosQ0FBaUJWLFNBQVMsQ0FBQ1gsRUFBVixDQUFhQyxRQUFiLEVBQWpCO0FBQ0g7QUFDSjs7O3FDQUd3QnVCLE8sRUFBMkI7QUFDaEQsVUFBTUMsTUFBYyxHQUFHLEVBQXZCO0FBRGdEO0FBQUE7QUFBQTs7QUFBQTtBQUVoRCw4QkFBcUJELE9BQXJCLG1JQUE4QjtBQUFBLGNBQW5CRSxNQUFtQjtBQUMxQkQsVUFBQUEsTUFBTSxDQUFDSixJQUFQLENBQVksS0FBS2xCLE1BQUwsQ0FBWUMsS0FBWixDQUFrQnNCLE1BQWxCLEVBQTBCLENBQTFCLENBQVo7QUFDSDtBQUorQztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQUtoRCxhQUFPRCxNQUFQO0FBQ0g7Ozs0QkFFT0UsTSxFQUFrRDtBQUFBLFVBQXRDQyxJQUFzQyx1RUFBdkJDLGVBQXVCO0FBQ3RELGFBQU8sS0FBSzFCLE1BQUwsQ0FBWUMsS0FBWixDQUFrQnVCLE1BQU0sQ0FBQzFCLFFBQVAsRUFBbEIsRUFBcUM2QixJQUFyQyxDQUEwQyxVQUFBQyxDQUFDO0FBQUEsZUFDOUNBLENBQUMsQ0FBQ3pCLEdBQUYsSUFBU3VCLGVBRHFDO0FBQUEsT0FBM0MsQ0FBUDtBQUVIOzs7NENBRXVCVixRLEVBQStDO0FBQUEsVUFBakNTLElBQWlDLHVFQUFsQkMsZUFBa0I7QUFDbkUsVUFBTUcsWUFBWSxHQUFHLEtBQUs3QixNQUFMLENBQVllLG9CQUFaLENBQWlDQyxRQUFRLENBQUNsQixRQUFULEVBQWpDLENBQXJCOztBQUNBLFVBQUkrQixZQUFKLEVBQWtCO0FBQ2QsZUFBb0IsS0FBS0MsZ0JBQUwsQ0FBc0JELFlBQXRCLENBQXBCO0FBQ0gsT0FGRCxNQUVPO0FBQ0gsZUFBTyxFQUFQO0FBQ0g7QUFDSjs7OzJDQUVzQlQsTyxFQUE4QztBQUFBLFVBQWpDSyxJQUFpQyx1RUFBbEJDLGVBQWtCO0FBQ2pFLFVBQU1HLFlBQVksR0FBRyxLQUFLN0IsTUFBTCxDQUFZbUIsbUJBQVosQ0FBZ0NDLE9BQU8sQ0FBQ3RCLFFBQVIsRUFBaEMsQ0FBckI7O0FBQ0EsVUFBSStCLFlBQUosRUFBa0I7QUFDZCxlQUFvQixLQUFLQyxnQkFBTCxDQUFzQkQsWUFBdEIsQ0FBcEI7QUFDSCxPQUZELE1BRU87QUFDSCxlQUFPLEVBQVA7QUFDSDtBQUNKOzs7NENBRXVCaEIsYSxFQUE4QztBQUFBLFVBQTNCWSxJQUEyQix1RUFBWkMsZUFBWTtBQUNsRSxVQUFNSyxhQUFhLEdBQUcsS0FBSy9CLE1BQUwsQ0FBWVksb0JBQVosQ0FBaUNDLGFBQWEsQ0FBQ2YsUUFBZCxFQUFqQyxDQUF0Qjs7QUFDQSxVQUFJaUMsYUFBSixFQUFtQjtBQUNmLFlBQU1wQixLQUFLLEdBQVUsS0FBS3FCLE9BQUwsQ0FBYSxZQUFHRCxhQUFILENBQWIsQ0FBckI7O0FBQ0EsWUFBSXBCLEtBQUosRUFBVztBQUNQLGlCQUFPQSxLQUFQO0FBQ0g7QUFDSjs7QUFDRCxhQUFPLElBQUlzQixZQUFKLEVBQVA7QUFDSCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENsYWltRWRnZSB9IGZyb20gXCIuL2RhdGFNb2RlbHMvQ2xhaW1FZGdlXCI7XHJcbmltcG9ydCBFbmQgZnJvbSBcIi4vZGF0YU1vZGVscy9FbmRcIjtcclxuaW1wb3J0IHsgVHlwZSB9IGZyb20gXCIuL2RhdGFNb2RlbHMvVHlwZVwiO1xyXG5pbXBvcnQgeyBDaGFuZ2UgfSBmcm9tIFwiLi9kYXRhTW9kZWxzL0NoYW5nZVwiO1xyXG5pbXBvcnQgeyBTY29yZSB9IGZyb20gXCIuL2RhdGFNb2RlbHMvU2NvcmVcIjtcclxuaW1wb3J0IHsgSWQsIElEIH0gZnJvbSBcIi4vZGF0YU1vZGVscy9JZFwiO1xyXG5pbXBvcnQgeyBJdGVtIH0gZnJvbSBcIi4vZGF0YU1vZGVscy9JdGVtXCI7XHJcbmltcG9ydCB7IFJzRGF0YSB9IGZyb20gXCIuL2RhdGFNb2RlbHMvUnNEYXRhXCI7XHJcblxyXG5cclxuZXhwb3J0IGNsYXNzIFJlcG9zaXRvcnkge1xyXG4gICAgcHVibGljIHJlYWRvbmx5IHJzRGF0YTogUnNEYXRhID0gbmV3IFJzRGF0YSgpO1xyXG4gICAgcHVibGljIHJlYWRvbmx5IGxvZzogQ2hhbmdlW11bXSA9IFtdO1xyXG5cclxuICAgIC8qKiB0aGlzIGZ1bmN0aW9uIGNhbiBiZSBjYWxsZWQgYnkgb3V0c2lkZSBjb2RlIHRvIG5vdGZ5IHRoaXMgcmVwb3NpdG9yeSBvZiBjaGFuZ2VzICovXHJcbiAgICBub3RpZnkoY2hhbmdlczogQ2hhbmdlW10pIHtcclxuICAgICAgICB0aGlzLmxvZy51bnNoaWZ0KGNoYW5nZXMpO1xyXG4gICAgICAgIGZvciAoY29uc3QgY2hhbmdlIG9mIGNoYW5nZXMpIHtcclxuICAgICAgICAgICAgY29uc3QgbmV3SXRlbSA9IGNoYW5nZS5uZXdJdGVtO1xyXG4gICAgICAgICAgICBjb25zdCBpZFN0cmluZyA9IG5ld0l0ZW0uaWQudG9TdHJpbmcoKTtcclxuXHJcbiAgICAgICAgICAgIC8vQ2hhbmdlIHRoZSBlbmQgZGF0ZSBvbiB0aGUgcHJldmlvdXMgdmVyc2lvbiBvZiB0aGlzIGl0ZW0gdG8gbm93XHJcbiAgICAgICAgICAgIGNvbnN0IG9sZEl0ZW1zID0gdGhpcy5yc0RhdGEuaXRlbXNbaWRTdHJpbmddXHJcbiAgICAgICAgICAgIGlmIChvbGRJdGVtcyAmJiBvbGRJdGVtcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBvbGRJdGVtc1swXS5lbmQgPSBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJzRGF0YS5pdGVtc1tpZFN0cmluZ10gPSBbXTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gYWRkIHRoZSBuZXcgaXRlbSB0byB0aGUgbGlzdCBvZiBpdGVtc1xyXG4gICAgICAgICAgICB0aGlzLnJzRGF0YS5pdGVtc1tpZFN0cmluZ10udW5zaGlmdChjaGFuZ2UubmV3SXRlbSk7XHJcblxyXG4gICAgICAgICAgICAvL0luZGV4IENsYWltIEVkZ2VzXHJcbiAgICAgICAgICAgIGlmIChjaGFuZ2UubmV3SXRlbS50eXBlID09IFR5cGUuY2xhaW1FZGdlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmluZGV4Q2xhaW1FZGdlQnlQYXJlbnRJZCg8Q2xhaW1FZGdlPmNoYW5nZS5uZXdJdGVtKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuaW5kZXhDbGFpbUVkZ2VCeUNoaWxkSWQoPENsYWltRWRnZT5jaGFuZ2UubmV3SXRlbSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vSW5kZXggc2NvcmUgYnkgc291cmNlIElkXHJcbiAgICAgICAgICAgIGlmIChuZXdJdGVtLnR5cGUgPT0gVHlwZS5zY29yZSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgc2NvcmUgPSA8U2NvcmU+bmV3SXRlbTtcclxuICAgICAgICAgICAgICAgIHRoaXMucnNEYXRhLnNjb3JlQnlTb3VyY2VDbGFpbUlkW3Njb3JlLnNvdXJjZUNsYWltSWQudG9TdHJpbmcoKV0gPSBpZFN0cmluZztcclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaW5kZXhDbGFpbUVkZ2VCeVBhcmVudElkKGNsYWltRWRnZTogQ2xhaW1FZGdlKSB7XHJcbiAgICAgICAgbGV0IGRlc3RpbmF0aW9uID0gdGhpcy5yc0RhdGEuY2xhaW1FZGdlc0J5UGFyZW50SWRbY2xhaW1FZGdlLnBhcmVudElkLnRvU3RyaW5nKCldO1xyXG4gICAgICAgIGlmICghZGVzdGluYXRpb24pIHtcclxuICAgICAgICAgICAgZGVzdGluYXRpb24gPSBbXTtcclxuICAgICAgICAgICAgdGhpcy5yc0RhdGEuY2xhaW1FZGdlc0J5UGFyZW50SWRbY2xhaW1FZGdlLnBhcmVudElkLnRvU3RyaW5nKCldID0gZGVzdGluYXRpb247XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghZGVzdGluYXRpb24uaW5jbHVkZXMoY2xhaW1FZGdlLmlkLnRvU3RyaW5nKCkpKSB7XHJcbiAgICAgICAgICAgIGRlc3RpbmF0aW9uLnB1c2goY2xhaW1FZGdlLmlkLnRvU3RyaW5nKCkpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaW5kZXhDbGFpbUVkZ2VCeUNoaWxkSWQoY2xhaW1FZGdlOiBDbGFpbUVkZ2UpIHtcclxuICAgICAgICBsZXQgZGVzdGluYXRpb24gPSB0aGlzLnJzRGF0YS5jbGFpbUVkZ2VzQnlDaGlsZElkW2NsYWltRWRnZS5jaGlsZElkLnRvU3RyaW5nKCldO1xyXG4gICAgICAgIGlmICghZGVzdGluYXRpb24pIHtcclxuICAgICAgICAgICAgZGVzdGluYXRpb24gPSBbXTtcclxuICAgICAgICAgICAgdGhpcy5yc0RhdGEuY2xhaW1FZGdlc0J5Q2hpbGRJZFtjbGFpbUVkZ2UuY2hpbGRJZC50b1N0cmluZygpXSA9IGRlc3RpbmF0aW9uO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIWRlc3RpbmF0aW9uLmluY2x1ZGVzKGNsYWltRWRnZS5pZC50b1N0cmluZygpKSkge1xyXG4gICAgICAgICAgICBkZXN0aW5hdGlvbi5wdXNoKGNsYWltRWRnZS5pZC50b1N0cmluZygpKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgcHJpdmF0ZSBnZXRJdGVtc0ZvckFycmF5KGl0ZW1JZHM6IHN0cmluZ1tdKTogSXRlbVtdIHtcclxuICAgICAgICBjb25zdCByZXN1bHQ6IEl0ZW1bXSA9IFtdO1xyXG4gICAgICAgIGZvciAoY29uc3QgaXRlbUlkIG9mIGl0ZW1JZHMpIHtcclxuICAgICAgICAgICAgcmVzdWx0LnB1c2godGhpcy5yc0RhdGEuaXRlbXNbaXRlbUlkXVswXSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0SXRlbShJdGVtSWQ6IElkLCB3aGVuOiBzdHJpbmcgPSBFbmQpOiBJdGVtIHwgdW5kZWZpbmVkIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5yc0RhdGEuaXRlbXNbSXRlbUlkLnRvU3RyaW5nKCldLmZpbmQoZSA9PlxyXG4gICAgICAgICAgICBlLmVuZCA+PSBFbmQpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldENsYWltRWRnZXNCeVBhcmVudElkKHBhcmVudElkOiBJZCwgd2hlbjogc3RyaW5nID0gRW5kKTogQ2xhaW1FZGdlW10ge1xyXG4gICAgICAgIGNvbnN0IGNsYWltRWRnZUlkcyA9IHRoaXMucnNEYXRhLmNsYWltRWRnZXNCeVBhcmVudElkW3BhcmVudElkLnRvU3RyaW5nKCldO1xyXG4gICAgICAgIGlmIChjbGFpbUVkZ2VJZHMpIHtcclxuICAgICAgICAgICAgcmV0dXJuIDxDbGFpbUVkZ2VbXT50aGlzLmdldEl0ZW1zRm9yQXJyYXkoY2xhaW1FZGdlSWRzKVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBbXTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0Q2xhaW1FZGdlc0J5Q2hpbGRJZChjaGlsZElkOiBJZCwgd2hlbjogc3RyaW5nID0gRW5kKTogQ2xhaW1FZGdlW10ge1xyXG4gICAgICAgIGNvbnN0IGNsYWltRWRnZUlkcyA9IHRoaXMucnNEYXRhLmNsYWltRWRnZXNCeUNoaWxkSWRbY2hpbGRJZC50b1N0cmluZygpXTtcclxuICAgICAgICBpZiAoY2xhaW1FZGdlSWRzKSB7XHJcbiAgICAgICAgICAgIHJldHVybiA8Q2xhaW1FZGdlW10+dGhpcy5nZXRJdGVtc0ZvckFycmF5KGNsYWltRWRnZUlkcylcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gW107XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGdldFNjb3JlQnlTb3VyY2VDbGFpbUlkKHNvdXJjZUNsYWltSWQ6IElkLCB3aGVuOiBzdHJpbmcgPSBFbmQpOiBTY29yZSB7XHJcbiAgICAgICAgY29uc3Qgc2NvcmVJZFN0cmluZyA9IHRoaXMucnNEYXRhLnNjb3JlQnlTb3VyY2VDbGFpbUlkW3NvdXJjZUNsYWltSWQudG9TdHJpbmcoKV07XHJcbiAgICAgICAgaWYgKHNjb3JlSWRTdHJpbmcpIHtcclxuICAgICAgICAgICAgY29uc3Qgc2NvcmUgPSA8U2NvcmU+dGhpcy5nZXRJdGVtKElEKHNjb3JlSWRTdHJpbmcpKTtcclxuICAgICAgICAgICAgaWYgKHNjb3JlKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gc2NvcmU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG5ldyBTY29yZSgpO1xyXG4gICAgfVxyXG5cclxufSJdfQ==