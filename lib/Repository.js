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
          versionData,
          _VersionDate,
          _args3 = arguments;

      return regeneratorRuntime.async(function getItem$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              when = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : _End["default"];
              versionData = this.rsData.versionIdByItemId[ItemId.toString()];

              if (!versionData) {
                _context3.next = 6;
                break;
              }

              _VersionDate = this.rsData.versionIdByItemId[ItemId.toString()].find(function (e) {
                return e.end >= _End["default"];
              });

              if (!_VersionDate) {
                _context3.next = 6;
                break;
              }

              return _context3.abrupt("return", this.rsData.versions[_VersionDate.ItemIdString]);

            case 6:
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9SZXBvc2l0b3J5LnRzIl0sIm5hbWVzIjpbIlJlcG9zaXRvcnkiLCJSc0RhdGEiLCJjaGFuZ2VzIiwibG9nIiwidW5zaGlmdCIsImNoYW5nZSIsIm5ld0l0ZW0iLCJpZFN0cmluZyIsImlkIiwidG9TdHJpbmciLCJjdXJyZW50V2hlbiIsIkRhdGUiLCJ0b0lTT1N0cmluZyIsIm9sZEl0ZW1zIiwicnNEYXRhIiwidmVyc2lvbklkQnlJdGVtSWQiLCJsZW5ndGgiLCJlbmQiLCJFbmQiLCJvbGRJdGVtIiwidmVyc2lvbnMiLCJJdGVtSWRTdHJpbmciLCJ2ZXJzaW9uIiwiVmVyc2lvbkRhdGUiLCJzdGFydCIsInR5cGUiLCJUeXBlIiwiY2xhaW1FZGdlIiwiaW5kZXhDbGFpbUVkZ2VCeVBhcmVudElkIiwiaW5kZXhDbGFpbUVkZ2VCeUNoaWxkSWQiLCJzY29yZSIsInNjb3JlQnlTb3VyY2VDbGFpbUlkIiwic291cmNlQ2xhaW1JZCIsImRlc3RpbmF0aW9uIiwiY2xhaW1FZGdlc0J5UGFyZW50SWQiLCJwYXJlbnRJZCIsImluY2x1ZGVzIiwicHVzaCIsImNsYWltRWRnZXNCeUNoaWxkSWQiLCJjaGlsZElkIiwiaXRlbUlkcyIsInJlc3VsdCIsIml0ZW1JZCIsImdldEl0ZW0iLCJpdGVtIiwiSXRlbUlkIiwid2hlbiIsInZlcnNpb25EYXRhIiwiZmluZCIsImUiLCJjbGFpbUVkZ2VJZHMiLCJnZXRJdGVtc0ZvckFycmF5Iiwic2NvcmVJZFN0cmluZyIsIm5ld1Njb3JlIiwiU2NvcmUiLCJ1bmRlZmluZWQiLCJub3RpZnkiLCJDaGFuZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7O0lBSWFBLFU7Ozs7OztvQ0FDZSxJQUFJQyxjQUFKLEU7O2lDQUNVLEU7Ozs7OztBQUVsQzsyQkFDYUMsTzs7Ozs7OztBQUNULG1CQUFLQyxHQUFMLENBQVNDLE9BQVQsQ0FBaUJGLE9BQWpCOzs7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QWhDLEVBQTJDdkIsYUFBM0MsQzs7OENBQ1gsS0FBS3dCLE1BQUwsQ0FBWSxDQUFDLElBQUlDLGNBQUosQ0FBV0osUUFBWCxDQUFELENBQVosQzs7O2dEQUNDQSxRIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2xhaW1FZGdlIH0gZnJvbSBcIi4vZGF0YU1vZGVscy9DbGFpbUVkZ2VcIjtcclxuaW1wb3J0IEVuZCBmcm9tIFwiLi9kYXRhTW9kZWxzL0VuZFwiO1xyXG5pbXBvcnQgeyBUeXBlIH0gZnJvbSBcIi4vZGF0YU1vZGVscy9UeXBlXCI7XHJcbmltcG9ydCB7IENoYW5nZSB9IGZyb20gXCIuL2RhdGFNb2RlbHMvQ2hhbmdlXCI7XHJcbmltcG9ydCB7IFNjb3JlIH0gZnJvbSBcIi4vZGF0YU1vZGVscy9TY29yZVwiO1xyXG5pbXBvcnQgeyBJZCwgSUQgfSBmcm9tIFwiLi9kYXRhTW9kZWxzL0lkXCI7XHJcbmltcG9ydCB7IEl0ZW0gfSBmcm9tIFwiLi9kYXRhTW9kZWxzL0l0ZW1cIjtcclxuaW1wb3J0IHsgUnNEYXRhLCBWZXJzaW9uRGF0ZSB9IGZyb20gXCIuL2RhdGFNb2RlbHMvUnNEYXRhXCI7XHJcbmltcG9ydCB7IGlSZXBvc2l0b3J5IH0gZnJvbSBcIi4vZGF0YU1vZGVscy9pUmVwb3NpdG9yeVwiO1xyXG5cclxuXHJcbmV4cG9ydCBjbGFzcyBSZXBvc2l0b3J5IGltcGxlbWVudHMgaVJlcG9zaXRvcnkge1xyXG4gICAgcHVibGljIHJzRGF0YTogUnNEYXRhID0gbmV3IFJzRGF0YSgpO1xyXG4gICAgcHVibGljIHJlYWRvbmx5IGxvZzogQ2hhbmdlW11bXSA9IFtdO1xyXG5cclxuICAgIC8qKiB0aGlzIGZ1bmN0aW9uIGNhbiBiZSBjYWxsZWQgYnkgb3V0c2lkZSBjb2RlIHRvIG5vdGZ5IHRoaXMgcmVwb3NpdG9yeSBvZiBjaGFuZ2VzICovXHJcbiAgICBhc3luYyBub3RpZnkoY2hhbmdlczogQ2hhbmdlW10pIHtcclxuICAgICAgICB0aGlzLmxvZy51bnNoaWZ0KGNoYW5nZXMpO1xyXG4gICAgICAgIGZvciAoY29uc3QgY2hhbmdlIG9mIGNoYW5nZXMpIHtcclxuICAgICAgICAgICAgY29uc3QgbmV3SXRlbSA9IGNoYW5nZS5uZXdJdGVtO1xyXG4gICAgICAgICAgICBjb25zdCBpZFN0cmluZyA9IG5ld0l0ZW0uaWQudG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgY29uc3QgY3VycmVudFdoZW4gPSBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCk7XHJcblxyXG4gICAgICAgICAgICAvL0NoYW5nZSB0aGUgZW5kIGRhdGUgb24gdGhlIHByZXZpb3VzIHZlcnNpb24gb2YgdGhpcyBpdGVtIHRvIG5vd1xyXG4gICAgICAgICAgICBjb25zdCBvbGRJdGVtcyA9IHRoaXMucnNEYXRhLnZlcnNpb25JZEJ5SXRlbUlkW2lkU3RyaW5nXVxyXG4gICAgICAgICAgICBpZiAob2xkSXRlbXMgJiYgb2xkSXRlbXMubGVuZ3RoID4gMCAmJiBvbGRJdGVtc1swXS5lbmQgPT09IEVuZCkge1xyXG4gICAgICAgICAgICAgICAgb2xkSXRlbXNbMF0uZW5kID0gY3VycmVudFdoZW47XHJcbiAgICAgICAgICAgICAgICBjb25zdCBvbGRJdGVtID0gdGhpcy5yc0RhdGEudmVyc2lvbnNbb2xkSXRlbXNbMF0uSXRlbUlkU3RyaW5nXVxyXG4gICAgICAgICAgICAgICAgaWYgKG9sZEl0ZW0gJiYgb2xkSXRlbS5lbmQgPT09IEVuZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIG9sZEl0ZW0uZW5kID0gb2xkSXRlbXNbMF0uZW5kO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yc0RhdGEudmVyc2lvbklkQnlJdGVtSWRbaWRTdHJpbmddID0gW107XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIGFkZCB0aGUgbmV3IGl0ZW0gdG8gdGhlIGxpc3Qgb2YgaXRlbXNcclxuICAgICAgICAgICAgdGhpcy5yc0RhdGEudmVyc2lvbnNbbmV3SXRlbS52ZXJzaW9uLnRvU3RyaW5nKCldID0gbmV3SXRlbTtcclxuICAgICAgICAgICAgdGhpcy5yc0RhdGEudmVyc2lvbklkQnlJdGVtSWRbaWRTdHJpbmddLnVuc2hpZnQoXHJcbiAgICAgICAgICAgICAgICBuZXcgVmVyc2lvbkRhdGUobmV3SXRlbS52ZXJzaW9uLnRvU3RyaW5nKCksIG5ld0l0ZW0uc3RhcnQsIG5ld0l0ZW0uZW5kKVxyXG4gICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgLy9JbmRleCBDbGFpbSBFZGdlc1xyXG4gICAgICAgICAgICBpZiAoY2hhbmdlLm5ld0l0ZW0udHlwZSA9PSBUeXBlLmNsYWltRWRnZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pbmRleENsYWltRWRnZUJ5UGFyZW50SWQoPENsYWltRWRnZT5jaGFuZ2UubmV3SXRlbSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmluZGV4Q2xhaW1FZGdlQnlDaGlsZElkKDxDbGFpbUVkZ2U+Y2hhbmdlLm5ld0l0ZW0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvL0luZGV4IHNjb3JlIGJ5IHNvdXJjZSBJZFxyXG4gICAgICAgICAgICBpZiAobmV3SXRlbS50eXBlID09IFR5cGUuc2NvcmUpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHNjb3JlID0gPFNjb3JlPm5ld0l0ZW07XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJzRGF0YS5zY29yZUJ5U291cmNlQ2xhaW1JZFtzY29yZS5zb3VyY2VDbGFpbUlkLnRvU3RyaW5nKCldID0gaWRTdHJpbmc7XHJcbiAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGluZGV4Q2xhaW1FZGdlQnlQYXJlbnRJZChjbGFpbUVkZ2U6IENsYWltRWRnZSkge1xyXG4gICAgICAgIGxldCBkZXN0aW5hdGlvbiA9IHRoaXMucnNEYXRhLmNsYWltRWRnZXNCeVBhcmVudElkW2NsYWltRWRnZS5wYXJlbnRJZC50b1N0cmluZygpXTtcclxuICAgICAgICBpZiAoIWRlc3RpbmF0aW9uKSB7XHJcbiAgICAgICAgICAgIGRlc3RpbmF0aW9uID0gW107XHJcbiAgICAgICAgICAgIHRoaXMucnNEYXRhLmNsYWltRWRnZXNCeVBhcmVudElkW2NsYWltRWRnZS5wYXJlbnRJZC50b1N0cmluZygpXSA9IGRlc3RpbmF0aW9uO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIWRlc3RpbmF0aW9uLmluY2x1ZGVzKGNsYWltRWRnZS5pZC50b1N0cmluZygpKSkge1xyXG4gICAgICAgICAgICBkZXN0aW5hdGlvbi5wdXNoKGNsYWltRWRnZS5pZC50b1N0cmluZygpKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGluZGV4Q2xhaW1FZGdlQnlDaGlsZElkKGNsYWltRWRnZTogQ2xhaW1FZGdlKSB7XHJcbiAgICAgICAgbGV0IGRlc3RpbmF0aW9uID0gdGhpcy5yc0RhdGEuY2xhaW1FZGdlc0J5Q2hpbGRJZFtjbGFpbUVkZ2UuY2hpbGRJZC50b1N0cmluZygpXTtcclxuICAgICAgICBpZiAoIWRlc3RpbmF0aW9uKSB7XHJcbiAgICAgICAgICAgIGRlc3RpbmF0aW9uID0gW107XHJcbiAgICAgICAgICAgIHRoaXMucnNEYXRhLmNsYWltRWRnZXNCeUNoaWxkSWRbY2xhaW1FZGdlLmNoaWxkSWQudG9TdHJpbmcoKV0gPSBkZXN0aW5hdGlvbjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCFkZXN0aW5hdGlvbi5pbmNsdWRlcyhjbGFpbUVkZ2UuaWQudG9TdHJpbmcoKSkpIHtcclxuICAgICAgICAgICAgZGVzdGluYXRpb24ucHVzaChjbGFpbUVkZ2UuaWQudG9TdHJpbmcoKSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHByaXZhdGUgYXN5bmMgZ2V0SXRlbXNGb3JBcnJheShpdGVtSWRzOiBzdHJpbmdbXSkge1xyXG4gICAgICAgIGNvbnN0IHJlc3VsdDogSXRlbVtdID0gW107XHJcbiAgICAgICAgZm9yIChjb25zdCBpdGVtSWQgb2YgaXRlbUlkcykge1xyXG4gICAgICAgICAgICBjb25zdCBpdGVtID0gYXdhaXQgdGhpcy5nZXRJdGVtKElEKGl0ZW1JZCkpO1xyXG4gICAgICAgICAgICBpZiAoaXRlbSkge1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goaXRlbSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBnZXRJdGVtKEl0ZW1JZDogSWQsIHdoZW46IHN0cmluZyA9IEVuZCk6IFByb21pc2U8SXRlbSB8IHVuZGVmaW5lZD4ge1xyXG4gICAgICAgIGNvbnN0IHZlcnNpb25EYXRhID0gdGhpcy5yc0RhdGEudmVyc2lvbklkQnlJdGVtSWRbSXRlbUlkLnRvU3RyaW5nKCldXHJcbiAgICAgICAgaWYgKHZlcnNpb25EYXRhKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IFZlcnNpb25EYXRlID0gdGhpcy5yc0RhdGEudmVyc2lvbklkQnlJdGVtSWRbSXRlbUlkLnRvU3RyaW5nKCldLmZpbmQoZSA9PlxyXG4gICAgICAgICAgICAgICAgZS5lbmQgPj0gRW5kKTtcclxuICAgICAgICAgICAgaWYgKFZlcnNpb25EYXRlKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5yc0RhdGEudmVyc2lvbnNbVmVyc2lvbkRhdGUuSXRlbUlkU3RyaW5nXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBnZXRDbGFpbUVkZ2VzQnlQYXJlbnRJZChwYXJlbnRJZDogSWQsIHdoZW46IHN0cmluZyA9IEVuZCk6IFByb21pc2U8Q2xhaW1FZGdlW10+IHtcclxuICAgICAgICBjb25zdCBjbGFpbUVkZ2VJZHMgPSB0aGlzLnJzRGF0YS5jbGFpbUVkZ2VzQnlQYXJlbnRJZFtwYXJlbnRJZC50b1N0cmluZygpXTtcclxuICAgICAgICBpZiAoY2xhaW1FZGdlSWRzKSB7XHJcbiAgICAgICAgICAgIHJldHVybiA8Q2xhaW1FZGdlW10+YXdhaXQgdGhpcy5nZXRJdGVtc0ZvckFycmF5KGNsYWltRWRnZUlkcylcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gW107XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIGdldENsYWltRWRnZXNCeUNoaWxkSWQoY2hpbGRJZDogSWQsIHdoZW46IHN0cmluZyA9IEVuZCk6IFByb21pc2U8Q2xhaW1FZGdlW10+IHtcclxuICAgICAgICBjb25zdCBjbGFpbUVkZ2VJZHMgPSB0aGlzLnJzRGF0YS5jbGFpbUVkZ2VzQnlDaGlsZElkW2NoaWxkSWQudG9TdHJpbmcoKV07XHJcbiAgICAgICAgaWYgKGNsYWltRWRnZUlkcykge1xyXG4gICAgICAgICAgICByZXR1cm4gPENsYWltRWRnZVtdPmF3YWl0IHRoaXMuZ2V0SXRlbXNGb3JBcnJheShjbGFpbUVkZ2VJZHMpXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIFtdO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBnZXRTY29yZUJ5U291cmNlQ2xhaW1JZChzb3VyY2VDbGFpbUlkOiBJZCwgd2hlbjogc3RyaW5nID0gRW5kKTogUHJvbWlzZTxTY29yZT4ge1xyXG4gICAgICAgIGNvbnN0IHNjb3JlSWRTdHJpbmcgPSB0aGlzLnJzRGF0YS5zY29yZUJ5U291cmNlQ2xhaW1JZFtzb3VyY2VDbGFpbUlkLnRvU3RyaW5nKCldO1xyXG4gICAgICAgIGlmIChzY29yZUlkU3RyaW5nKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHNjb3JlID0gPFNjb3JlPmF3YWl0IHRoaXMuZ2V0SXRlbShJRChzY29yZUlkU3RyaW5nKSk7XHJcbiAgICAgICAgICAgIGlmIChzY29yZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHNjb3JlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL0lmIHRoZXJlIGlzIG5vdCBhbiBleGlzdGluZyBzY29yZSB0aGVuIGNyZWF0ZSBpdFxyXG4gICAgICAgIGNvbnN0IG5ld1Njb3JlID0gbmV3IFNjb3JlKHVuZGVmaW5lZCwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIHNvdXJjZUNsYWltSWQpO1xyXG4gICAgICAgIGF3YWl0IHRoaXMubm90aWZ5KFtuZXcgQ2hhbmdlKG5ld1Njb3JlKV0pO1xyXG4gICAgICAgIHJldHVybiBuZXdTY29yZTtcclxuICAgIH1cclxuXHJcbn0iXX0=