"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Affects = exports.Edge = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Stores the relationship between two claims in a specific scope. This is directional as the edge points from one claim to another. This is just a adata transfer object so it should have no logic in it.
 */
var Edge = function Edge(parentId, childId, affects) {
  var pro = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
  var reversable = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  var scopeId = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : "";

  _classCallCheck(this, Edge);

  this.parentId = parentId;
  this.childId = childId;
  this.affects = affects;
  this.pro = pro;
  this.reversable = reversable;
  this.scopeId = scopeId;
};
/**
 * How a child claim affects a parent claim
 */


exports.Edge = Edge;
var Affects;
exports.Affects = Affects;

(function (Affects) {
  Affects["Confidence"] = "confidence";
  Affects["Relevance"] = "relevance";
})(Affects || (exports.Affects = Affects = {}));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9FZGdlLnRzIl0sIm5hbWVzIjpbIkVkZ2UiLCJwYXJlbnRJZCIsImNoaWxkSWQiLCJhZmZlY3RzIiwicHJvIiwicmV2ZXJzYWJsZSIsInNjb3BlSWQiLCJBZmZlY3RzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTs7O0lBR2FBLEksR0FDVCxjQUVXQyxRQUZYLEVBSVdDLE9BSlgsRUFNV0MsT0FOWCxFQVVFO0FBQUEsTUFIU0MsR0FHVCx1RUFId0IsSUFHeEI7QUFBQSxNQUZTQyxVQUVULHVFQUYrQixLQUUvQjtBQUFBLE1BRFNDLE9BQ1QsdUVBRDJCLEVBQzNCOztBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNELEM7QUFHTDs7Ozs7O0lBR1lDLE87OztXQUFBQSxPO0FBQUFBLEVBQUFBLE87QUFBQUEsRUFBQUEsTztHQUFBQSxPLHVCQUFBQSxPIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIFN0b3JlcyB0aGUgcmVsYXRpb25zaGlwIGJldHdlZW4gdHdvIGNsYWltcyBpbiBhIHNwZWNpZmljIHNjb3BlLiBUaGlzIGlzIGRpcmVjdGlvbmFsIGFzIHRoZSBlZGdlIHBvaW50cyBmcm9tIG9uZSBjbGFpbSB0byBhbm90aGVyLiBUaGlzIGlzIGp1c3QgYSBhZGF0YSB0cmFuc2ZlciBvYmplY3Qgc28gaXQgc2hvdWxkIGhhdmUgbm8gbG9naWMgaW4gaXQuXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgRWRnZSB7XHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICAvKiogVGhlIElEIGZvciB0aGUgcGFyZW50IGNsYWltIHRoaXMgZWRnZSBwb2ludHMgdG8gKi9cclxuICAgICAgICBwdWJsaWMgcGFyZW50SWQ6IHN0cmluZyxcclxuICAgICAgICAvKiogVGhlIElEIGZvciB0aGUgY2hpbGQgY2xhaW0gdGhpcyBlZGdlIHBvaW50cyBmcm9tICovXHJcbiAgICAgICAgcHVibGljIGNoaWxkSWQ6IHN0cmluZyxcclxuICAgICAgICAvKiogSG93IHRoZSBjaGlsZCBhZmZlY3RzIHRoZSBwYXJlbnQuIE9mdGVuIHdoYXQgbWF0aCBpcyBkb25lIHdpdGggd2hlbiB1c2luZyB0aGlzIGVkZ2UgaW4gZ2VuZXJhdGluZyB0aGUgc2NvcmUgKi9cclxuICAgICAgICBwdWJsaWMgYWZmZWN0czogQWZmZWN0cyxcclxuICAgICAgICBwdWJsaWMgcHJvOiBib29sZWFuID0gdHJ1ZSxcclxuICAgICAgICBwdWJsaWMgcmV2ZXJzYWJsZTogYm9vbGVhbiA9IGZhbHNlLFxyXG4gICAgICAgIHB1YmxpYyBzY29wZUlkOiBzdHJpbmcgPSBcIlwiLFxyXG4gICAgKSB7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBIb3cgYSBjaGlsZCBjbGFpbSBhZmZlY3RzIGEgcGFyZW50IGNsYWltXHJcbiAqL1xyXG5leHBvcnQgZW51bSBBZmZlY3RzIHtcclxuICAgIENvbmZpZGVuY2UgPSBcImNvbmZpZGVuY2VcIixcclxuICAgIFJlbGV2YW5jZSA9IFwicmVsZXZhbmNlXCIsXHJcbn1cclxuIl19