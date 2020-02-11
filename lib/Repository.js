"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Repository = void 0;

var _End = _interopRequireDefault(require("./dataModels/End"));

var _Type = require("./dataModels/Type");

var _Id = require("./dataModels/Id");

var _RsData = require("./dataModels/RsData");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

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
    value: function () {
      var _notify = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(changes) {
        var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, change, newItem, idString, currentWhen, oldItems, oldItem, score;

        return regeneratorRuntime.wrap(function _callee$(_context) {
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
        }, _callee, this, [[4, 8, 12, 20], [13,, 15, 19]]);
      }));

      function notify(_x) {
        return _notify.apply(this, arguments);
      }

      return notify;
    }()
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
    value: function () {
      var _getItemsForArray = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(itemIds) {
        var result, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, itemId, item;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
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
                return this.getItem((0, _Id.ID)(itemId));

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
        }, _callee2, this, [[4, 17, 21, 29], [22,, 24, 28]]);
      }));

      function getItemsForArray(_x2) {
        return _getItemsForArray.apply(this, arguments);
      }

      return getItemsForArray;
    }()
  }, {
    key: "getItem",
    value: function () {
      var _getItem = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(ItemId) {
        var when,
            versionData,
            _VersionDate,
            _args3 = arguments;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
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
        }, _callee3, this);
      }));

      function getItem(_x3) {
        return _getItem.apply(this, arguments);
      }

      return getItem;
    }()
  }, {
    key: "getClaimEdgesByParentId",
    value: function () {
      var _getClaimEdgesByParentId = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4(parentId) {
        var when,
            claimEdgeIds,
            _args4 = arguments;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
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
                return this.getItemsForArray(claimEdgeIds);

              case 5:
                return _context4.abrupt("return", _context4.sent);

              case 8:
                return _context4.abrupt("return", []);

              case 9:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function getClaimEdgesByParentId(_x4) {
        return _getClaimEdgesByParentId.apply(this, arguments);
      }

      return getClaimEdgesByParentId;
    }()
  }, {
    key: "getClaimEdgesByChildId",
    value: function () {
      var _getClaimEdgesByChildId = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5(childId) {
        var when,
            claimEdgeIds,
            _args5 = arguments;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
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
                return this.getItemsForArray(claimEdgeIds);

              case 5:
                return _context5.abrupt("return", _context5.sent);

              case 8:
                return _context5.abrupt("return", []);

              case 9:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function getClaimEdgesByChildId(_x5) {
        return _getClaimEdgesByChildId.apply(this, arguments);
      }

      return getClaimEdgesByChildId;
    }()
  }, {
    key: "getScoreBySourceClaimId",
    value: function () {
      var _getScoreBySourceClaimId = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee6(sourceClaimId) {
        var when,
            scoreIdString,
            score,
            _args6 = arguments;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
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
                return this.getItem((0, _Id.ID)(scoreIdString));

              case 5:
                score = _context6.sent;

                if (!score) {
                  _context6.next = 8;
                  break;
                }

                return _context6.abrupt("return", score);

              case 8:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function getScoreBySourceClaimId(_x6) {
        return _getScoreBySourceClaimId.apply(this, arguments);
      }

      return getScoreBySourceClaimId;
    }()
  }]);

  return Repository;
}();

exports.Repository = Repository;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9SZXBvc2l0b3J5LnRzIl0sIm5hbWVzIjpbIlJlcG9zaXRvcnkiLCJSc0RhdGEiLCJjaGFuZ2VzIiwibG9nIiwidW5zaGlmdCIsImNoYW5nZSIsIm5ld0l0ZW0iLCJpZFN0cmluZyIsImlkIiwidG9TdHJpbmciLCJjdXJyZW50V2hlbiIsIkRhdGUiLCJ0b0lTT1N0cmluZyIsIm9sZEl0ZW1zIiwicnNEYXRhIiwidmVyc2lvbklkQnlJdGVtSWQiLCJsZW5ndGgiLCJlbmQiLCJFbmQiLCJvbGRJdGVtIiwidmVyc2lvbnMiLCJJdGVtSWRTdHJpbmciLCJ2ZXJzaW9uIiwiVmVyc2lvbkRhdGUiLCJzdGFydCIsInR5cGUiLCJUeXBlIiwiY2xhaW1FZGdlIiwiaW5kZXhDbGFpbUVkZ2VCeVBhcmVudElkIiwiaW5kZXhDbGFpbUVkZ2VCeUNoaWxkSWQiLCJzY29yZSIsInNjb3JlQnlTb3VyY2VDbGFpbUlkIiwic291cmNlQ2xhaW1JZCIsImRlc3RpbmF0aW9uIiwiY2xhaW1FZGdlc0J5UGFyZW50SWQiLCJwYXJlbnRJZCIsImluY2x1ZGVzIiwicHVzaCIsImNsYWltRWRnZXNCeUNoaWxkSWQiLCJjaGlsZElkIiwiaXRlbUlkcyIsInJlc3VsdCIsIml0ZW1JZCIsImdldEl0ZW0iLCJpdGVtIiwiSXRlbUlkIiwid2hlbiIsInZlcnNpb25EYXRhIiwiZmluZCIsImUiLCJjbGFpbUVkZ2VJZHMiLCJnZXRJdGVtc0ZvckFycmF5Iiwic2NvcmVJZFN0cmluZyJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUNBOztBQUNBOztBQUdBOztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7O0lBSWFBLFU7Ozs7OztvQ0FDZSxJQUFJQyxjQUFKLEU7O2lDQUNVLEU7Ozs7OztBQUVsQzs7OzsrQ0FDYUMsTzs7Ozs7OztBQUNULHFCQUFLQyxHQUFMLENBQVNDLE9BQVQsQ0FBaUJGLE9BQWpCOzs7Ozs7QUFDQSxpQ0FBcUJBLE9BQXJCLHVIQUE4QjtBQUFuQkcsa0JBQUFBLE1BQW1CO0FBQ3BC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OEI4QixNQUFNLENBQUNwQyxRQUFQLEVBQTlCLEVBQWlEdUMsSUFBakQsQ0FBc0QsVUFBQUMsQ0FBQztBQUFBLHlCQUN2RUEsQ0FBQyxDQUFDaEMsR0FBRixJQUFTQyxlQUQ4RDtBQUFBLGlCQUF2RCxDOztxQkFFaEJLLFk7Ozs7O2tEQUNPLEtBQUtULE1BQUwsQ0FBWU0sUUFBWixDQUFxQkcsWUFBVyxDQUFDRixZQUFqQyxDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Z0RBS1djLFE7Ozs7Ozs7O0FBQWNXLGdCQUFBQSxJLDhEQUFlNUIsZTtBQUNqRGdDLGdCQUFBQSxZLEdBQWUsS0FBS3BDLE1BQUwsQ0FBWW9CLG9CQUFaLENBQWlDQyxRQUFRLENBQUMxQixRQUFULEVBQWpDLEM7O3FCQUNqQnlDLFk7Ozs7Ozt1QkFDMEIsS0FBS0MsZ0JBQUwsQ0FBc0JELFlBQXRCLEM7Ozs7OztrREFFbkIsRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2dEQUljWCxPOzs7Ozs7OztBQUFhTyxnQkFBQUEsSSw4REFBZTVCLGU7QUFDL0NnQyxnQkFBQUEsWSxHQUFlLEtBQUtwQyxNQUFMLENBQVl3QixtQkFBWixDQUFnQ0MsT0FBTyxDQUFDOUIsUUFBUixFQUFoQyxDOztxQkFDakJ5QyxZOzs7Ozs7dUJBQzBCLEtBQUtDLGdCQUFMLENBQXNCRCxZQUF0QixDOzs7Ozs7a0RBRW5CLEU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztnREFJZWxCLGE7Ozs7Ozs7OztBQUFtQmMsZ0JBQUFBLEksOERBQWU1QixlO0FBQ3REa0MsZ0JBQUFBLGEsR0FBZ0IsS0FBS3RDLE1BQUwsQ0FBWWlCLG9CQUFaLENBQWlDQyxhQUFhLENBQUN2QixRQUFkLEVBQWpDLEM7O3FCQUNsQjJDLGE7Ozs7Ozt1QkFDMkIsS0FBS1QsT0FBTCxDQUFhLFlBQUdTLGFBQUgsQ0FBYixDOzs7QUFBckJ0QixnQkFBQUEsSzs7cUJBQ0ZBLEs7Ozs7O2tEQUNPQSxLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2xhaW1FZGdlIH0gZnJvbSBcIi4vZGF0YU1vZGVscy9DbGFpbUVkZ2VcIjtcclxuaW1wb3J0IEVuZCBmcm9tIFwiLi9kYXRhTW9kZWxzL0VuZFwiO1xyXG5pbXBvcnQgeyBUeXBlIH0gZnJvbSBcIi4vZGF0YU1vZGVscy9UeXBlXCI7XHJcbmltcG9ydCB7IENoYW5nZSB9IGZyb20gXCIuL2RhdGFNb2RlbHMvQ2hhbmdlXCI7XHJcbmltcG9ydCB7IFNjb3JlIH0gZnJvbSBcIi4vZGF0YU1vZGVscy9TY29yZVwiO1xyXG5pbXBvcnQgeyBJZCwgSUQgfSBmcm9tIFwiLi9kYXRhTW9kZWxzL0lkXCI7XHJcbmltcG9ydCB7IEl0ZW0gfSBmcm9tIFwiLi9kYXRhTW9kZWxzL0l0ZW1cIjtcclxuaW1wb3J0IHsgUnNEYXRhLCBWZXJzaW9uRGF0ZSB9IGZyb20gXCIuL2RhdGFNb2RlbHMvUnNEYXRhXCI7XHJcbmltcG9ydCB7IGlSZXBvc2l0b3J5IH0gZnJvbSBcIi4vZGF0YU1vZGVscy9pUmVwb3NpdG9yeVwiO1xyXG5cclxuXHJcbmV4cG9ydCBjbGFzcyBSZXBvc2l0b3J5IGltcGxlbWVudHMgaVJlcG9zaXRvcnkge1xyXG4gICAgcHVibGljIHJzRGF0YTogUnNEYXRhID0gbmV3IFJzRGF0YSgpO1xyXG4gICAgcHVibGljIHJlYWRvbmx5IGxvZzogQ2hhbmdlW11bXSA9IFtdO1xyXG5cclxuICAgIC8qKiB0aGlzIGZ1bmN0aW9uIGNhbiBiZSBjYWxsZWQgYnkgb3V0c2lkZSBjb2RlIHRvIG5vdGZ5IHRoaXMgcmVwb3NpdG9yeSBvZiBjaGFuZ2VzICovXHJcbiAgICBhc3luYyBub3RpZnkoY2hhbmdlczogQ2hhbmdlW10pIHtcclxuICAgICAgICB0aGlzLmxvZy51bnNoaWZ0KGNoYW5nZXMpO1xyXG4gICAgICAgIGZvciAoY29uc3QgY2hhbmdlIG9mIGNoYW5nZXMpIHtcclxuICAgICAgICAgICAgY29uc3QgbmV3SXRlbSA9IGNoYW5nZS5uZXdJdGVtO1xyXG4gICAgICAgICAgICBjb25zdCBpZFN0cmluZyA9IG5ld0l0ZW0uaWQudG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgY29uc3QgY3VycmVudFdoZW4gPSBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCk7XHJcblxyXG4gICAgICAgICAgICAvL0NoYW5nZSB0aGUgZW5kIGRhdGUgb24gdGhlIHByZXZpb3VzIHZlcnNpb24gb2YgdGhpcyBpdGVtIHRvIG5vd1xyXG4gICAgICAgICAgICBjb25zdCBvbGRJdGVtcyA9IHRoaXMucnNEYXRhLnZlcnNpb25JZEJ5SXRlbUlkW2lkU3RyaW5nXVxyXG4gICAgICAgICAgICBpZiAob2xkSXRlbXMgJiYgb2xkSXRlbXMubGVuZ3RoID4gMCAmJiBvbGRJdGVtc1swXS5lbmQgPT09IEVuZCkge1xyXG4gICAgICAgICAgICAgICAgb2xkSXRlbXNbMF0uZW5kID0gY3VycmVudFdoZW47XHJcbiAgICAgICAgICAgICAgICBjb25zdCBvbGRJdGVtID0gdGhpcy5yc0RhdGEudmVyc2lvbnNbb2xkSXRlbXNbMF0uSXRlbUlkU3RyaW5nXVxyXG4gICAgICAgICAgICAgICAgaWYgKG9sZEl0ZW0gJiYgb2xkSXRlbS5lbmQgPT09IEVuZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIG9sZEl0ZW0uZW5kID0gb2xkSXRlbXNbMF0uZW5kO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yc0RhdGEudmVyc2lvbklkQnlJdGVtSWRbaWRTdHJpbmddID0gW107XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIGFkZCB0aGUgbmV3IGl0ZW0gdG8gdGhlIGxpc3Qgb2YgaXRlbXNcclxuICAgICAgICAgICAgdGhpcy5yc0RhdGEudmVyc2lvbnNbbmV3SXRlbS52ZXJzaW9uLnRvU3RyaW5nKCldID0gbmV3SXRlbTtcclxuICAgICAgICAgICAgdGhpcy5yc0RhdGEudmVyc2lvbklkQnlJdGVtSWRbaWRTdHJpbmddLnVuc2hpZnQoXHJcbiAgICAgICAgICAgICAgICBuZXcgVmVyc2lvbkRhdGUobmV3SXRlbS52ZXJzaW9uLnRvU3RyaW5nKCksIG5ld0l0ZW0uc3RhcnQsIG5ld0l0ZW0uZW5kKVxyXG4gICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgLy9JbmRleCBDbGFpbSBFZGdlc1xyXG4gICAgICAgICAgICBpZiAoY2hhbmdlLm5ld0l0ZW0udHlwZSA9PSBUeXBlLmNsYWltRWRnZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pbmRleENsYWltRWRnZUJ5UGFyZW50SWQoPENsYWltRWRnZT5jaGFuZ2UubmV3SXRlbSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmluZGV4Q2xhaW1FZGdlQnlDaGlsZElkKDxDbGFpbUVkZ2U+Y2hhbmdlLm5ld0l0ZW0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvL0luZGV4IHNjb3JlIGJ5IHNvdXJjZSBJZFxyXG4gICAgICAgICAgICBpZiAobmV3SXRlbS50eXBlID09IFR5cGUuc2NvcmUpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHNjb3JlID0gPFNjb3JlPm5ld0l0ZW07XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJzRGF0YS5zY29yZUJ5U291cmNlQ2xhaW1JZFtzY29yZS5zb3VyY2VDbGFpbUlkLnRvU3RyaW5nKCldID0gaWRTdHJpbmc7XHJcbiAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGluZGV4Q2xhaW1FZGdlQnlQYXJlbnRJZChjbGFpbUVkZ2U6IENsYWltRWRnZSkge1xyXG4gICAgICAgIGxldCBkZXN0aW5hdGlvbiA9IHRoaXMucnNEYXRhLmNsYWltRWRnZXNCeVBhcmVudElkW2NsYWltRWRnZS5wYXJlbnRJZC50b1N0cmluZygpXTtcclxuICAgICAgICBpZiAoIWRlc3RpbmF0aW9uKSB7XHJcbiAgICAgICAgICAgIGRlc3RpbmF0aW9uID0gW107XHJcbiAgICAgICAgICAgIHRoaXMucnNEYXRhLmNsYWltRWRnZXNCeVBhcmVudElkW2NsYWltRWRnZS5wYXJlbnRJZC50b1N0cmluZygpXSA9IGRlc3RpbmF0aW9uO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIWRlc3RpbmF0aW9uLmluY2x1ZGVzKGNsYWltRWRnZS5pZC50b1N0cmluZygpKSkge1xyXG4gICAgICAgICAgICBkZXN0aW5hdGlvbi5wdXNoKGNsYWltRWRnZS5pZC50b1N0cmluZygpKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGluZGV4Q2xhaW1FZGdlQnlDaGlsZElkKGNsYWltRWRnZTogQ2xhaW1FZGdlKSB7XHJcbiAgICAgICAgbGV0IGRlc3RpbmF0aW9uID0gdGhpcy5yc0RhdGEuY2xhaW1FZGdlc0J5Q2hpbGRJZFtjbGFpbUVkZ2UuY2hpbGRJZC50b1N0cmluZygpXTtcclxuICAgICAgICBpZiAoIWRlc3RpbmF0aW9uKSB7XHJcbiAgICAgICAgICAgIGRlc3RpbmF0aW9uID0gW107XHJcbiAgICAgICAgICAgIHRoaXMucnNEYXRhLmNsYWltRWRnZXNCeUNoaWxkSWRbY2xhaW1FZGdlLmNoaWxkSWQudG9TdHJpbmcoKV0gPSBkZXN0aW5hdGlvbjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCFkZXN0aW5hdGlvbi5pbmNsdWRlcyhjbGFpbUVkZ2UuaWQudG9TdHJpbmcoKSkpIHtcclxuICAgICAgICAgICAgZGVzdGluYXRpb24ucHVzaChjbGFpbUVkZ2UuaWQudG9TdHJpbmcoKSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHByaXZhdGUgYXN5bmMgZ2V0SXRlbXNGb3JBcnJheShpdGVtSWRzOiBzdHJpbmdbXSkge1xyXG4gICAgICAgIGNvbnN0IHJlc3VsdDogSXRlbVtdID0gW107XHJcbiAgICAgICAgZm9yIChjb25zdCBpdGVtSWQgb2YgaXRlbUlkcykge1xyXG4gICAgICAgICAgICBjb25zdCBpdGVtID0gYXdhaXQgdGhpcy5nZXRJdGVtKElEKGl0ZW1JZCkpO1xyXG4gICAgICAgICAgICBpZiAoaXRlbSkge1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goaXRlbSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBnZXRJdGVtKEl0ZW1JZDogSWQsIHdoZW46IHN0cmluZyA9IEVuZCk6IFByb21pc2U8SXRlbSB8IHVuZGVmaW5lZD4ge1xyXG4gICAgICAgIGNvbnN0IHZlcnNpb25EYXRhID0gdGhpcy5yc0RhdGEudmVyc2lvbklkQnlJdGVtSWRbSXRlbUlkLnRvU3RyaW5nKCldXHJcbiAgICAgICAgaWYgKHZlcnNpb25EYXRhKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IFZlcnNpb25EYXRlID0gdGhpcy5yc0RhdGEudmVyc2lvbklkQnlJdGVtSWRbSXRlbUlkLnRvU3RyaW5nKCldLmZpbmQoZSA9PlxyXG4gICAgICAgICAgICAgICAgZS5lbmQgPj0gRW5kKTtcclxuICAgICAgICAgICAgaWYgKFZlcnNpb25EYXRlKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5yc0RhdGEudmVyc2lvbnNbVmVyc2lvbkRhdGUuSXRlbUlkU3RyaW5nXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBnZXRDbGFpbUVkZ2VzQnlQYXJlbnRJZChwYXJlbnRJZDogSWQsIHdoZW46IHN0cmluZyA9IEVuZCk6IFByb21pc2U8Q2xhaW1FZGdlW10+IHtcclxuICAgICAgICBjb25zdCBjbGFpbUVkZ2VJZHMgPSB0aGlzLnJzRGF0YS5jbGFpbUVkZ2VzQnlQYXJlbnRJZFtwYXJlbnRJZC50b1N0cmluZygpXTtcclxuICAgICAgICBpZiAoY2xhaW1FZGdlSWRzKSB7XHJcbiAgICAgICAgICAgIHJldHVybiA8Q2xhaW1FZGdlW10+YXdhaXQgdGhpcy5nZXRJdGVtc0ZvckFycmF5KGNsYWltRWRnZUlkcylcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gW107XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIGdldENsYWltRWRnZXNCeUNoaWxkSWQoY2hpbGRJZDogSWQsIHdoZW46IHN0cmluZyA9IEVuZCk6IFByb21pc2U8Q2xhaW1FZGdlW10+IHtcclxuICAgICAgICBjb25zdCBjbGFpbUVkZ2VJZHMgPSB0aGlzLnJzRGF0YS5jbGFpbUVkZ2VzQnlDaGlsZElkW2NoaWxkSWQudG9TdHJpbmcoKV07XHJcbiAgICAgICAgaWYgKGNsYWltRWRnZUlkcykge1xyXG4gICAgICAgICAgICByZXR1cm4gPENsYWltRWRnZVtdPmF3YWl0IHRoaXMuZ2V0SXRlbXNGb3JBcnJheShjbGFpbUVkZ2VJZHMpXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIFtdO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBnZXRTY29yZUJ5U291cmNlQ2xhaW1JZChzb3VyY2VDbGFpbUlkOiBJZCwgd2hlbjogc3RyaW5nID0gRW5kKTogUHJvbWlzZTxTY29yZSB8IHVuZGVmaW5lZD4ge1xyXG4gICAgICAgIGNvbnN0IHNjb3JlSWRTdHJpbmcgPSB0aGlzLnJzRGF0YS5zY29yZUJ5U291cmNlQ2xhaW1JZFtzb3VyY2VDbGFpbUlkLnRvU3RyaW5nKCldO1xyXG4gICAgICAgIGlmIChzY29yZUlkU3RyaW5nKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHNjb3JlID0gPFNjb3JlPmF3YWl0IHRoaXMuZ2V0SXRlbShJRChzY29yZUlkU3RyaW5nKSk7XHJcbiAgICAgICAgICAgIGlmIChzY29yZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHNjb3JlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufSJdfQ==