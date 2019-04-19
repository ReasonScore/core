"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Score = void 0;

var _Affects = require("./Affects");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Stores the score for a claim. Just a data transfer object. Does not contain any logic.
 * Usually within the context of a view of the claim or another claim
 */
var Score = function Score() {
  var affects = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _Affects.Affects.Confidence;
  var reversable = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var score = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
  var relevance = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;

  _classCallCheck(this, Score);

  this.affects = affects;
  this.reversable = reversable;
  this.score = score;
  this.relevance = relevance;
};

exports.Score = Score;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9TY29yZS50cyJdLCJuYW1lcyI6WyJTY29yZSIsImFmZmVjdHMiLCJBZmZlY3RzIiwiQ29uZmlkZW5jZSIsInJldmVyc2FibGUiLCJzY29yZSIsInJlbGV2YW5jZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7SUFJYUEsSyxHQUNULGlCQU1FO0FBQUEsTUFMU0MsT0FLVCx1RUFMNEJDLGlCQUFRQyxVQUtwQztBQUFBLE1BSlNDLFVBSVQsdUVBSitCLEtBSS9CO0FBQUEsTUFIU0MsS0FHVCx1RUFIeUIsQ0FHekI7QUFBQSxNQURTQyxTQUNULHVFQUQ2QixDQUM3Qjs7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNELEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBZmZlY3RzIH0gZnJvbSBcIi4vQWZmZWN0c1wiXHJcbi8qKlxyXG4gKiBTdG9yZXMgdGhlIHNjb3JlIGZvciBhIGNsYWltLiBKdXN0IGEgZGF0YSB0cmFuc2ZlciBvYmplY3QuIERvZXMgbm90IGNvbnRhaW4gYW55IGxvZ2ljLlxyXG4gKiBVc3VhbGx5IHdpdGhpbiB0aGUgY29udGV4dCBvZiBhIHZpZXcgb2YgdGhlIGNsYWltIG9yIGFub3RoZXIgY2xhaW1cclxuICovXHJcbmV4cG9ydCBjbGFzcyBTY29yZSB7XHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwdWJsaWMgYWZmZWN0czogQWZmZWN0cyA9IEFmZmVjdHMuQ29uZmlkZW5jZSxcclxuICAgICAgICBwdWJsaWMgcmV2ZXJzYWJsZTogYm9vbGVhbiA9IGZhbHNlLFxyXG4gICAgICAgIHB1YmxpYyBzY29yZTogbnVtYmVyID0gMSxcclxuICAgICAgICAvKiogSG93IHJlbGV2ZW50IHRoaXMgY2xhaW0gaXMgdG8gaXQncyBwYXJlbnQgY2xhaW0uIENhbGN1bGF0aW9uOiBQcm86IDEgKyBjaGlsZFNjb3JlLnNjb3JlLCBjb246IDEgLSAoY2hpbGRTY29yZS5zY29yZSAvIDIpLiBBIG11bHRpcGxpZXIgc2V0IGJ5IGFsbCB0aGUgY2hpbGQgZWRnZXMgdGhhdCBhZmZlY3QgJ3JlbGV2YW5jZScuIEEgbXVsdGlwbGllciBzZXQgYnkgYWxsIHRoZSBjaGlsZCBlZGdlcyB0aGF0IGFmZmVjdCAncmVsZXZhbmNlJy4gVGhpcyBpcyB1c3VhbGx5IHNldCBkdXJpbmcgdGhlIGNhbGN1bGF0aW9uIG9mIGl0J3MgcGFyZW50IHNjb3JlLiAqL1xyXG4gICAgICAgIHB1YmxpYyByZWxldmFuY2U6IG51bWJlciA9IDEsXHJcbiAgICApIHtcclxuICAgIH1cclxuXHJcbn0iXX0=