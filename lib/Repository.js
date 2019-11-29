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
      var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, change, newItem, idString, currentWhen, oldItems, oldItem, score;

      return regeneratorRuntime.async(function notify$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              this.log.unshift(changes);
              _iteratorNormalCompletion = true;
              _didIteratorError = false;
              _iteratorError = undefined;
              _context.prev = 4;

              for (_iterator = changes[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                change = _step.value;
                newItem = change.newItem;
                idString = newItem.id.toString();
                currentWhen = new Date().toISOString(); //Change the end date on the previous version of this item to now

                oldItems = this.rsData.versionIdByItemId[idString];

                if (oldItems && oldItems.length > 0 && oldItems[0].end === _End["default"]) {
                  oldItems[0].end = currentWhen;
                  oldItem = this.rsData.versions[oldItems[0].ItemIdString];

                  if (oldItem && oldItem.end === _End["default"]) {
                    oldItem.end = oldItems[0].end;
                  }
                } else {
                  this.rsData.versionIdByItemId[idString] = [];
                } // add the new item to the list of items


                this.rsData.versions[newItem.version.toString()] = newItem;
                this.rsData.versionIdByItemId[idString].unshift(new _RsData.VersionDate(newItem.version.toString(), newItem.start, newItem.end)); //Index Claim Edges

                if (change.newItem.type == _Type.Type.claimEdge) {
                  this.indexClaimEdgeByParentId(change.newItem);
                  this.indexClaimEdgeByChildId(change.newItem);
                } //Index score by source Id


                if (newItem.type == _Type.Type.score) {
                  score = newItem;
                  this.rsData.scoreBySourceClaimId[score.sourceClaimId.toString()] = idString;
                }
              }

              _context.next = 12;
              break;

            case 8:
              _context.prev = 8;
              _context.t0 = _context["catch"](4);
              _didIteratorError = true;
              _iteratorError = _context.t0;

            case 12:
              _context.prev = 12;
              _context.prev = 13;

              if (!_iteratorNormalCompletion && _iterator["return"] != null) {
                _iterator["return"]();
              }

            case 15:
              _context.prev = 15;

              if (!_didIteratorError) {
                _context.next = 18;
                break;
              }

              throw _iteratorError;

            case 18:
              return _context.finish(15);

            case 19:
              return _context.finish(12);

            case 20:
            case "end":
              return _context.stop();
          }
        }
      }, null, this, [[4, 8, 12, 20], [13,, 15, 19]]);
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
      var result, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, itemId, item;

      return regeneratorRuntime.async(function getItemsForArray$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              result = [];
              _iteratorNormalCompletion2 = true;
              _didIteratorError2 = false;
              _iteratorError2 = undefined;
              _context2.prev = 4;
              _iterator2 = itemIds[Symbol.iterator]();

            case 6:
              if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
                _context2.next = 15;
                break;
              }

              itemId = _step2.value;
              _context2.next = 10;
              return regeneratorRuntime.awrap(this.getItem((0, _Id.ID)(itemId)));

            case 10:
              item = _context2.sent;

              if (item) {
                result.push(item);
              }

            case 12:
              _iteratorNormalCompletion2 = true;
              _context2.next = 6;
              break;

            case 15:
              _context2.next = 21;
              break;

            case 17:
              _context2.prev = 17;
              _context2.t0 = _context2["catch"](4);
              _didIteratorError2 = true;
              _iteratorError2 = _context2.t0;

            case 21:
              _context2.prev = 21;
              _context2.prev = 22;

              if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
                _iterator2["return"]();
              }

            case 24:
              _context2.prev = 24;

              if (!_didIteratorError2) {
                _context2.next = 27;
                break;
              }

              throw _iteratorError2;

            case 27:
              return _context2.finish(24);

            case 28:
              return _context2.finish(21);

            case 29:
              return _context2.abrupt("return", result);

            case 30:
            case "end":
              return _context2.stop();
          }
        }
      }, null, this, [[4, 17, 21, 29], [22,, 24, 28]]);
    }
  }, {
    key: "getItem",
    value: function getItem(ItemId) {
      var when,
          VersionDate,
          _args3 = arguments;
      return regeneratorRuntime.async(function getItem$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              when = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : _End["default"];
              VersionDate = this.rsData.versionIdByItemId[ItemId.toString()].find(function (e) {
                return e.end >= _End["default"];
              });

              if (!VersionDate) {
                _context3.next = 4;
                break;
              }

              return _context3.abrupt("return", this.rsData.versions[VersionDate.ItemIdString]);

            case 4:
            case "end":
              return _context3.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "getClaimEdgesByParentId",
    value: function getClaimEdgesByParentId(parentId) {
      var when,
          claimEdgeIds,
          _args4 = arguments;
      return regeneratorRuntime.async(function getClaimEdgesByParentId$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              when = _args4.length > 1 && _args4[1] !== undefined ? _args4[1] : _End["default"];
              claimEdgeIds = this.rsData.claimEdgesByParentId[parentId.toString()];

              if (!claimEdgeIds) {
                _context4.next = 8;
                break;
              }

              _context4.next = 5;
              return regeneratorRuntime.awrap(this.getItemsForArray(claimEdgeIds));

            case 5:
              return _context4.abrupt("return", _context4.sent);

            case 8:
              return _context4.abrupt("return", []);

            case 9:
            case "end":
              return _context4.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "getClaimEdgesByChildId",
    value: function getClaimEdgesByChildId(childId) {
      var when,
          claimEdgeIds,
          _args5 = arguments;
      return regeneratorRuntime.async(function getClaimEdgesByChildId$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              when = _args5.length > 1 && _args5[1] !== undefined ? _args5[1] : _End["default"];
              claimEdgeIds = this.rsData.claimEdgesByChildId[childId.toString()];

              if (!claimEdgeIds) {
                _context5.next = 8;
                break;
              }

              _context5.next = 5;
              return regeneratorRuntime.awrap(this.getItemsForArray(claimEdgeIds));

            case 5:
              return _context5.abrupt("return", _context5.sent);

            case 8:
              return _context5.abrupt("return", []);

            case 9:
            case "end":
              return _context5.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "getScoreBySourceClaimId",
    value: function getScoreBySourceClaimId(sourceClaimId) {
      var when,
          scoreIdString,
          score,
          newScore,
          _args6 = arguments;
      return regeneratorRuntime.async(function getScoreBySourceClaimId$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              when = _args6.length > 1 && _args6[1] !== undefined ? _args6[1] : _End["default"];
              scoreIdString = this.rsData.scoreBySourceClaimId[sourceClaimId.toString()];

              if (!scoreIdString) {
                _context6.next = 8;
                break;
              }

              _context6.next = 5;
              return regeneratorRuntime.awrap(this.getItem((0, _Id.ID)(scoreIdString)));

            case 5:
              score = _context6.sent;

              if (!score) {
                _context6.next = 8;
                break;
              }

              return _context6.abrupt("return", score);

            case 8:
              //If there is not an existing score then create it
              newScore = new _Score.Score(undefined, undefined, undefined, sourceClaimId);
              _context6.next = 11;
              return regeneratorRuntime.awrap(this.notify([new _Change.Change(newScore)]));

            case 11:
              return _context6.abrupt("return", newScore);

            case 12:
            case "end":
              return _context6.stop();
          }
        }
      }, null, this);
    }
  }]);

  return Repository;
}();

exports.Repository = Repository;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9SZXBvc2l0b3J5LnRzIl0sIm5hbWVzIjpbIlJlcG9zaXRvcnkiLCJSc0RhdGEiLCJjaGFuZ2VzIiwibG9nIiwidW5zaGlmdCIsImNoYW5nZSIsIm5ld0l0ZW0iLCJpZFN0cmluZyIsImlkIiwidG9TdHJpbmciLCJjdXJyZW50V2hlbiIsIkRhdGUiLCJ0b0lTT1N0cmluZyIsIm9sZEl0ZW1zIiwicnNEYXRhIiwidmVyc2lvbklkQnlJdGVtSWQiLCJsZW5ndGgiLCJlbmQiLCJFbmQiLCJvbGRJdGVtIiwidmVyc2lvbnMiLCJJdGVtSWRTdHJpbmciLCJ2ZXJzaW9uIiwiVmVyc2lvbkRhdGUiLCJzdGFydCIsInR5cGUiLCJUeXBlIiwiY2xhaW1FZGdlIiwiaW5kZXhDbGFpbUVkZ2VCeVBhcmVudElkIiwiaW5kZXhDbGFpbUVkZ2VCeUNoaWxkSWQiLCJzY29yZSIsInNjb3JlQnlTb3VyY2VDbGFpbUlkIiwic291cmNlQ2xhaW1JZCIsImRlc3RpbmF0aW9uIiwiY2xhaW1FZGdlc0J5UGFyZW50SWQiLCJwYXJlbnRJZCIsImluY2x1ZGVzIiwicHVzaCIsImNsYWltRWRnZXNCeUNoaWxkSWQiLCJjaGlsZElkIiwiaXRlbUlkcyIsInJlc3VsdCIsIml0ZW1JZCIsImdldEl0ZW0iLCJpdGVtIiwiSXRlbUlkIiwid2hlbiIsImZpbmQiLCJlIiwiY2xhaW1FZGdlSWRzIiwiZ2V0SXRlbXNGb3JBcnJheSIsInNjb3JlSWRTdHJpbmciLCJuZXdTY29yZSIsIlNjb3JlIiwidW5kZWZpbmVkIiwibm90aWZ5IiwiQ2hhbmdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7OztJQUlhQSxVOzs7Ozs7b0NBQ2UsSUFBSUMsY0FBSixFOztpQ0FDVSxFOzs7Ozs7QUFFbEM7MkJBQ2FDLE87Ozs7Ozs7QUFDVCxtQkFBS0MsR0FBTCxDQUFTQyxPQUFULENBQWlCRixPQUFqQjs7Ozs7O0FBQ0EsK0JBQXFC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IjpbImltcG9ydCB7IENsYWltRWRnZSB9IGZyb20gXCIuL2RhdGFNb2RlbHMvQ2xhaW1FZGdlXCI7XHJcbmltcG9ydCBFbmQgZnJvbSBcIi4vZGF0YU1vZGVscy9FbmRcIjtcclxuaW1wb3J0IHsgVHlwZSB9IGZyb20gXCIuL2RhdGFNb2RlbHMvVHlwZVwiO1xyXG5pbXBvcnQgeyBDaGFuZ2UgfSBmcm9tIFwiLi9kYXRhTW9kZWxzL0NoYW5nZVwiO1xyXG5pbXBvcnQgeyBTY29yZSB9IGZyb20gXCIuL2RhdGFNb2RlbHMvU2NvcmVcIjtcclxuaW1wb3J0IHsgSWQsIElEIH0gZnJvbSBcIi4vZGF0YU1vZGVscy9JZFwiO1xyXG5pbXBvcnQgeyBJdGVtIH0gZnJvbSBcIi4vZGF0YU1vZGVscy9JdGVtXCI7XHJcbmltcG9ydCB7IFJzRGF0YSwgVmVyc2lvbkRhdGUgfSBmcm9tIFwiLi9kYXRhTW9kZWxzL1JzRGF0YVwiO1xyXG5pbXBvcnQgeyBpUmVwb3NpdG9yeSB9IGZyb20gXCIuL2RhdGFNb2RlbHMvaVJlcG9zaXRvcnlcIjtcclxuXHJcblxyXG5leHBvcnQgY2xhc3MgUmVwb3NpdG9yeSBpbXBsZW1lbnRzIGlSZXBvc2l0b3J5IHtcclxuICAgIHB1YmxpYyByc0RhdGE6IFJzRGF0YSA9IG5ldyBSc0RhdGEoKTtcclxuICAgIHB1YmxpYyByZWFkb25seSBsb2c6IENoYW5nZVtdW10gPSBbXTtcclxuXHJcbiAgICAvKiogdGhpcyBmdW5jdGlvbiBjYW4gYmUgY2FsbGVkIGJ5IG91dHNpZGUgY29kZSB0byBub3RmeSB0aGlzIHJlcG9zaXRvcnkgb2YgY2hhbmdlcyAqL1xyXG4gICAgYXN5bmMgbm90aWZ5KGNoYW5nZXM6IENoYW5nZVtdKSB7XHJcbiAgICAgICAgdGhpcy5sb2cudW5zaGlmdChjaGFuZ2VzKTtcclxuICAgICAgICBmb3IgKGNvbnN0IGNoYW5nZSBvZiBjaGFuZ2VzKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IG5ld0l0ZW0gPSBjaGFuZ2UubmV3SXRlbTtcclxuICAgICAgICAgICAgY29uc3QgaWRTdHJpbmcgPSBuZXdJdGVtLmlkLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRXaGVuID0gbmV3IERhdGUoKS50b0lTT1N0cmluZygpO1xyXG5cclxuICAgICAgICAgICAgLy9DaGFuZ2UgdGhlIGVuZCBkYXRlIG9uIHRoZSBwcmV2aW91cyB2ZXJzaW9uIG9mIHRoaXMgaXRlbSB0byBub3dcclxuICAgICAgICAgICAgY29uc3Qgb2xkSXRlbXMgPSB0aGlzLnJzRGF0YS52ZXJzaW9uSWRCeUl0ZW1JZFtpZFN0cmluZ11cclxuICAgICAgICAgICAgaWYgKG9sZEl0ZW1zICYmIG9sZEl0ZW1zLmxlbmd0aCA+IDAgJiYgb2xkSXRlbXNbMF0uZW5kID09PSBFbmQpIHtcclxuICAgICAgICAgICAgICAgIG9sZEl0ZW1zWzBdLmVuZCA9IGN1cnJlbnRXaGVuO1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgb2xkSXRlbSA9IHRoaXMucnNEYXRhLnZlcnNpb25zW29sZEl0ZW1zWzBdLkl0ZW1JZFN0cmluZ11cclxuICAgICAgICAgICAgICAgIGlmIChvbGRJdGVtICYmIG9sZEl0ZW0uZW5kID09PSBFbmQpIHtcclxuICAgICAgICAgICAgICAgICAgICBvbGRJdGVtLmVuZCA9IG9sZEl0ZW1zWzBdLmVuZDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucnNEYXRhLnZlcnNpb25JZEJ5SXRlbUlkW2lkU3RyaW5nXSA9IFtdO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBhZGQgdGhlIG5ldyBpdGVtIHRvIHRoZSBsaXN0IG9mIGl0ZW1zXHJcbiAgICAgICAgICAgIHRoaXMucnNEYXRhLnZlcnNpb25zW25ld0l0ZW0udmVyc2lvbi50b1N0cmluZygpXSA9IG5ld0l0ZW07XHJcbiAgICAgICAgICAgIHRoaXMucnNEYXRhLnZlcnNpb25JZEJ5SXRlbUlkW2lkU3RyaW5nXS51bnNoaWZ0KFxyXG4gICAgICAgICAgICAgICAgbmV3IFZlcnNpb25EYXRlKG5ld0l0ZW0udmVyc2lvbi50b1N0cmluZygpLCBuZXdJdGVtLnN0YXJ0LCBuZXdJdGVtLmVuZClcclxuICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgIC8vSW5kZXggQ2xhaW0gRWRnZXNcclxuICAgICAgICAgICAgaWYgKGNoYW5nZS5uZXdJdGVtLnR5cGUgPT0gVHlwZS5jbGFpbUVkZ2UpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaW5kZXhDbGFpbUVkZ2VCeVBhcmVudElkKDxDbGFpbUVkZ2U+Y2hhbmdlLm5ld0l0ZW0pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pbmRleENsYWltRWRnZUJ5Q2hpbGRJZCg8Q2xhaW1FZGdlPmNoYW5nZS5uZXdJdGVtKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy9JbmRleCBzY29yZSBieSBzb3VyY2UgSWRcclxuICAgICAgICAgICAgaWYgKG5ld0l0ZW0udHlwZSA9PSBUeXBlLnNjb3JlKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBzY29yZSA9IDxTY29yZT5uZXdJdGVtO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yc0RhdGEuc2NvcmVCeVNvdXJjZUNsYWltSWRbc2NvcmUuc291cmNlQ2xhaW1JZC50b1N0cmluZygpXSA9IGlkU3RyaW5nO1xyXG4gICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBpbmRleENsYWltRWRnZUJ5UGFyZW50SWQoY2xhaW1FZGdlOiBDbGFpbUVkZ2UpIHtcclxuICAgICAgICBsZXQgZGVzdGluYXRpb24gPSB0aGlzLnJzRGF0YS5jbGFpbUVkZ2VzQnlQYXJlbnRJZFtjbGFpbUVkZ2UucGFyZW50SWQudG9TdHJpbmcoKV07XHJcbiAgICAgICAgaWYgKCFkZXN0aW5hdGlvbikge1xyXG4gICAgICAgICAgICBkZXN0aW5hdGlvbiA9IFtdO1xyXG4gICAgICAgICAgICB0aGlzLnJzRGF0YS5jbGFpbUVkZ2VzQnlQYXJlbnRJZFtjbGFpbUVkZ2UucGFyZW50SWQudG9TdHJpbmcoKV0gPSBkZXN0aW5hdGlvbjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCFkZXN0aW5hdGlvbi5pbmNsdWRlcyhjbGFpbUVkZ2UuaWQudG9TdHJpbmcoKSkpIHtcclxuICAgICAgICAgICAgZGVzdGluYXRpb24ucHVzaChjbGFpbUVkZ2UuaWQudG9TdHJpbmcoKSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBpbmRleENsYWltRWRnZUJ5Q2hpbGRJZChjbGFpbUVkZ2U6IENsYWltRWRnZSkge1xyXG4gICAgICAgIGxldCBkZXN0aW5hdGlvbiA9IHRoaXMucnNEYXRhLmNsYWltRWRnZXNCeUNoaWxkSWRbY2xhaW1FZGdlLmNoaWxkSWQudG9TdHJpbmcoKV07XHJcbiAgICAgICAgaWYgKCFkZXN0aW5hdGlvbikge1xyXG4gICAgICAgICAgICBkZXN0aW5hdGlvbiA9IFtdO1xyXG4gICAgICAgICAgICB0aGlzLnJzRGF0YS5jbGFpbUVkZ2VzQnlDaGlsZElkW2NsYWltRWRnZS5jaGlsZElkLnRvU3RyaW5nKCldID0gZGVzdGluYXRpb247XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghZGVzdGluYXRpb24uaW5jbHVkZXMoY2xhaW1FZGdlLmlkLnRvU3RyaW5nKCkpKSB7XHJcbiAgICAgICAgICAgIGRlc3RpbmF0aW9uLnB1c2goY2xhaW1FZGdlLmlkLnRvU3RyaW5nKCkpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwcml2YXRlIGFzeW5jIGdldEl0ZW1zRm9yQXJyYXkoaXRlbUlkczogc3RyaW5nW10pIHtcclxuICAgICAgICBjb25zdCByZXN1bHQ6IEl0ZW1bXSA9IFtdO1xyXG4gICAgICAgIGZvciAoY29uc3QgaXRlbUlkIG9mIGl0ZW1JZHMpIHtcclxuICAgICAgICAgICAgY29uc3QgaXRlbSA9IGF3YWl0IHRoaXMuZ2V0SXRlbShJRChpdGVtSWQpKTtcclxuICAgICAgICAgICAgaWYgKGl0ZW0pIHtcclxuICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKGl0ZW0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgZ2V0SXRlbShJdGVtSWQ6IElkLCB3aGVuOiBzdHJpbmcgPSBFbmQpOiBQcm9taXNlPEl0ZW0gfCB1bmRlZmluZWQ+IHtcclxuICAgICAgICBjb25zdCBWZXJzaW9uRGF0ZSA9IHRoaXMucnNEYXRhLnZlcnNpb25JZEJ5SXRlbUlkW0l0ZW1JZC50b1N0cmluZygpXS5maW5kKGUgPT5cclxuICAgICAgICAgICAgZS5lbmQgPj0gRW5kKTtcclxuICAgICAgICBpZiAoVmVyc2lvbkRhdGUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucnNEYXRhLnZlcnNpb25zW1ZlcnNpb25EYXRlLkl0ZW1JZFN0cmluZ107XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIGdldENsYWltRWRnZXNCeVBhcmVudElkKHBhcmVudElkOiBJZCwgd2hlbjogc3RyaW5nID0gRW5kKTogUHJvbWlzZTxDbGFpbUVkZ2VbXT4ge1xyXG4gICAgICAgIGNvbnN0IGNsYWltRWRnZUlkcyA9IHRoaXMucnNEYXRhLmNsYWltRWRnZXNCeVBhcmVudElkW3BhcmVudElkLnRvU3RyaW5nKCldO1xyXG4gICAgICAgIGlmIChjbGFpbUVkZ2VJZHMpIHtcclxuICAgICAgICAgICAgcmV0dXJuIDxDbGFpbUVkZ2VbXT4gYXdhaXQgdGhpcy5nZXRJdGVtc0ZvckFycmF5KGNsYWltRWRnZUlkcylcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gW107XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIGdldENsYWltRWRnZXNCeUNoaWxkSWQoY2hpbGRJZDogSWQsIHdoZW46IHN0cmluZyA9IEVuZCk6IFByb21pc2U8Q2xhaW1FZGdlW10+IHtcclxuICAgICAgICBjb25zdCBjbGFpbUVkZ2VJZHMgPSB0aGlzLnJzRGF0YS5jbGFpbUVkZ2VzQnlDaGlsZElkW2NoaWxkSWQudG9TdHJpbmcoKV07XHJcbiAgICAgICAgaWYgKGNsYWltRWRnZUlkcykge1xyXG4gICAgICAgICAgICByZXR1cm4gPENsYWltRWRnZVtdPiBhd2FpdCB0aGlzLmdldEl0ZW1zRm9yQXJyYXkoY2xhaW1FZGdlSWRzKVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBbXTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgZ2V0U2NvcmVCeVNvdXJjZUNsYWltSWQoc291cmNlQ2xhaW1JZDogSWQsIHdoZW46IHN0cmluZyA9IEVuZCk6IFByb21pc2U8U2NvcmU+IHtcclxuICAgICAgICBjb25zdCBzY29yZUlkU3RyaW5nID0gdGhpcy5yc0RhdGEuc2NvcmVCeVNvdXJjZUNsYWltSWRbc291cmNlQ2xhaW1JZC50b1N0cmluZygpXTtcclxuICAgICAgICBpZiAoc2NvcmVJZFN0cmluZykge1xyXG4gICAgICAgICAgICBjb25zdCBzY29yZSA9IDxTY29yZT4gYXdhaXQgdGhpcy5nZXRJdGVtKElEKHNjb3JlSWRTdHJpbmcpKTtcclxuICAgICAgICAgICAgaWYgKHNjb3JlKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gc2NvcmU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vSWYgdGhlcmUgaXMgbm90IGFuIGV4aXN0aW5nIHNjb3JlIHRoZW4gY3JlYXRlIGl0XHJcbiAgICAgICAgY29uc3QgbmV3U2NvcmUgPSBuZXcgU2NvcmUodW5kZWZpbmVkLCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgc291cmNlQ2xhaW1JZCk7XHJcbiAgICAgICAgYXdhaXQgdGhpcy5ub3RpZnkoW25ldyBDaGFuZ2UobmV3U2NvcmUpXSk7XHJcbiAgICAgICAgcmV0dXJuIG5ld1Njb3JlO1xyXG4gICAgfVxyXG5cclxufSJdfQ==