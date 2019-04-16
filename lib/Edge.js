"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Affects = exports.Edge = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Stores the relationship between two claims in a specific scope. This is directional as the edge points from one claim to another. This is just a adata transfer object so it should have no logic in it.
 */
var Edge = function Edge() {
  var parentId = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
  var childId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
  var affects = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : Affects.Confidence;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9FZGdlLnRzIl0sIm5hbWVzIjpbIkVkZ2UiLCJwYXJlbnRJZCIsImNoaWxkSWQiLCJhZmZlY3RzIiwiQWZmZWN0cyIsIkNvbmZpZGVuY2UiLCJwcm8iLCJyZXZlcnNhYmxlIiwic2NvcGVJZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7OztJQUdhQSxJLEdBQ1QsZ0JBVUU7QUFBQSxNQVJTQyxRQVFULHVFQVI0QixFQVE1QjtBQUFBLE1BTlNDLE9BTVQsdUVBTjJCLEVBTTNCO0FBQUEsTUFKU0MsT0FJVCx1RUFKNEJDLE9BQU8sQ0FBQ0MsVUFJcEM7QUFBQSxNQUhTQyxHQUdULHVFQUh3QixJQUd4QjtBQUFBLE1BRlNDLFVBRVQsdUVBRitCLEtBRS9CO0FBQUEsTUFEU0MsT0FDVCx1RUFEMkIsRUFDM0I7O0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0QsQztBQUdMOzs7Ozs7SUFHWUosTzs7O1dBQUFBLE87QUFBQUEsRUFBQUEsTztBQUFBQSxFQUFBQSxPO0dBQUFBLE8sdUJBQUFBLE8iLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogU3RvcmVzIHRoZSByZWxhdGlvbnNoaXAgYmV0d2VlbiB0d28gY2xhaW1zIGluIGEgc3BlY2lmaWMgc2NvcGUuIFRoaXMgaXMgZGlyZWN0aW9uYWwgYXMgdGhlIGVkZ2UgcG9pbnRzIGZyb20gb25lIGNsYWltIHRvIGFub3RoZXIuIFRoaXMgaXMganVzdCBhIGFkYXRhIHRyYW5zZmVyIG9iamVjdCBzbyBpdCBzaG91bGQgaGF2ZSBubyBsb2dpYyBpbiBpdC5cclxuICovXHJcbmV4cG9ydCBjbGFzcyBFZGdlIHtcclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIC8qKiBUaGUgSUQgZm9yIHRoZSBwYXJlbnQgY2xhaW0gdGhpcyBlZGdlIHBvaW50cyB0byAqL1xyXG4gICAgICAgIHB1YmxpYyBwYXJlbnRJZDogc3RyaW5nID0gXCJcIixcclxuICAgICAgICAvKiogVGhlIElEIGZvciB0aGUgY2hpbGQgY2xhaW0gdGhpcyBlZGdlIHBvaW50cyBmcm9tICovXHJcbiAgICAgICAgcHVibGljIGNoaWxkSWQ6IHN0cmluZyA9IFwiXCIsXHJcbiAgICAgICAgLyoqIEhvdyB0aGUgY2hpbGQgYWZmZWN0cyB0aGUgcGFyZW50LiBPZnRlbiB3aGF0IG1hdGggaXMgZG9uZSB3aXRoIHdoZW4gdXNpbmcgdGhpcyBlZGdlIGluIGdlbmVyYXRpbmcgdGhlIHNjb3JlICovXHJcbiAgICAgICAgcHVibGljIGFmZmVjdHM6IEFmZmVjdHMgPSBBZmZlY3RzLkNvbmZpZGVuY2UsXHJcbiAgICAgICAgcHVibGljIHBybzogYm9vbGVhbiA9IHRydWUsXHJcbiAgICAgICAgcHVibGljIHJldmVyc2FibGU6IGJvb2xlYW4gPSBmYWxzZSxcclxuICAgICAgICBwdWJsaWMgc2NvcGVJZDogc3RyaW5nID0gXCJcIixcclxuICAgICkge1xyXG4gICAgfVxyXG59XHJcblxyXG4vKipcclxuICogSG93IGEgY2hpbGQgY2xhaW0gYWZmZWN0cyBhIHBhcmVudCBjbGFpbVxyXG4gKi9cclxuZXhwb3J0IGVudW0gQWZmZWN0cyB7XHJcbiAgICBDb25maWRlbmNlID0gXCJjb25maWRlbmNlXCIsXHJcbiAgICBSZWxldmFuY2UgPSBcInJlbGV2YW5jZVwiLFxyXG59XHJcbiJdfQ==