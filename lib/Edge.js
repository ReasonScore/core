"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Affects = exports.Edge = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Stores the relationship between two claims in a specific scope. This is directional as the edge points from one claim to another. This is just a adata transfer object so it should have no logic in it.
 * @property {string} parentId - The ID for the parent claim.
 * @property {string} childId - The ID for the parent claim.
 * @property {string} scopeId - The ID for the scope claim. A scope claim must be an ancestor in this relationship for this child to affect it's parent at all. 
 * @property {Affects} affects - How the child affects the parent.
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
 * @property {Affects} affects - How the child affects the parent.
 */


exports.Edge = Edge;
var Affects;
exports.Affects = Affects;

(function (Affects) {
  Affects["Confidence"] = "confidence";
  Affects["Relevance"] = "relevance";
})(Affects || (exports.Affects = Affects = {}));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9FZGdlLnRzIl0sIm5hbWVzIjpbIkVkZ2UiLCJwYXJlbnRJZCIsImNoaWxkSWQiLCJhZmZlY3RzIiwicHJvIiwicmV2ZXJzYWJsZSIsInNjb3BlSWQiLCJBZmZlY3RzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTs7Ozs7OztJQU9hQSxJLEdBQ1QsY0FDV0MsUUFEWCxFQUVXQyxPQUZYLEVBR1dDLE9BSFgsRUFPRTtBQUFBLE1BSFNDLEdBR1QsdUVBSHdCLElBR3hCO0FBQUEsTUFGU0MsVUFFVCx1RUFGK0IsS0FFL0I7QUFBQSxNQURTQyxPQUNULHVFQUQyQixFQUMzQjs7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDRCxDO0FBR0w7Ozs7Ozs7SUFJWUMsTzs7O1dBQUFBLE87QUFBQUEsRUFBQUEsTztBQUFBQSxFQUFBQSxPO0dBQUFBLE8sdUJBQUFBLE8iLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogU3RvcmVzIHRoZSByZWxhdGlvbnNoaXAgYmV0d2VlbiB0d28gY2xhaW1zIGluIGEgc3BlY2lmaWMgc2NvcGUuIFRoaXMgaXMgZGlyZWN0aW9uYWwgYXMgdGhlIGVkZ2UgcG9pbnRzIGZyb20gb25lIGNsYWltIHRvIGFub3RoZXIuIFRoaXMgaXMganVzdCBhIGFkYXRhIHRyYW5zZmVyIG9iamVjdCBzbyBpdCBzaG91bGQgaGF2ZSBubyBsb2dpYyBpbiBpdC5cclxuICogQHByb3BlcnR5IHtzdHJpbmd9IHBhcmVudElkIC0gVGhlIElEIGZvciB0aGUgcGFyZW50IGNsYWltLlxyXG4gKiBAcHJvcGVydHkge3N0cmluZ30gY2hpbGRJZCAtIFRoZSBJRCBmb3IgdGhlIHBhcmVudCBjbGFpbS5cclxuICogQHByb3BlcnR5IHtzdHJpbmd9IHNjb3BlSWQgLSBUaGUgSUQgZm9yIHRoZSBzY29wZSBjbGFpbS4gQSBzY29wZSBjbGFpbSBtdXN0IGJlIGFuIGFuY2VzdG9yIGluIHRoaXMgcmVsYXRpb25zaGlwIGZvciB0aGlzIGNoaWxkIHRvIGFmZmVjdCBpdCdzIHBhcmVudCBhdCBhbGwuIFxyXG4gKiBAcHJvcGVydHkge0FmZmVjdHN9IGFmZmVjdHMgLSBIb3cgdGhlIGNoaWxkIGFmZmVjdHMgdGhlIHBhcmVudC5cclxuICovXHJcbmV4cG9ydCBjbGFzcyBFZGdlIHtcclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHB1YmxpYyBwYXJlbnRJZDogc3RyaW5nLFxyXG4gICAgICAgIHB1YmxpYyBjaGlsZElkOiBzdHJpbmcsXHJcbiAgICAgICAgcHVibGljIGFmZmVjdHM6IEFmZmVjdHMsXHJcbiAgICAgICAgcHVibGljIHBybzogYm9vbGVhbiA9IHRydWUsXHJcbiAgICAgICAgcHVibGljIHJldmVyc2FibGU6IGJvb2xlYW4gPSBmYWxzZSxcclxuICAgICAgICBwdWJsaWMgc2NvcGVJZDogc3RyaW5nID0gXCJcIixcclxuICAgICkge1xyXG4gICAgfVxyXG59XHJcblxyXG4vKipcclxuICogSG93IGEgY2hpbGQgY2xhaW0gYWZmZWN0cyBhIHBhcmVudCBjbGFpbVxyXG4gKiBAcHJvcGVydHkge0FmZmVjdHN9IGFmZmVjdHMgLSBIb3cgdGhlIGNoaWxkIGFmZmVjdHMgdGhlIHBhcmVudC5cclxuICovXHJcbmV4cG9ydCBlbnVtIEFmZmVjdHMge1xyXG4gICAgQ29uZmlkZW5jZSA9IFwiY29uZmlkZW5jZVwiLFxyXG4gICAgUmVsZXZhbmNlID0gXCJyZWxldmFuY2VcIixcclxufVxyXG4iXX0=