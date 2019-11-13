"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RsData = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//Store the string for the ID
//Store the string for the ID
var RsData = function RsData() {
  var items = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var scoreBySourceClaimId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var claimEdgesByParentId = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var claimEdgesByChildId = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

  _classCallCheck(this, RsData);

  this.items = items;
  this.scoreBySourceClaimId = scoreBySourceClaimId;
  this.claimEdgesByParentId = claimEdgesByParentId;
  this.claimEdgesByChildId = claimEdgesByChildId;
};

exports.RsData = RsData;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kYXRhTW9kZWxzL1JzRGF0YS50cyJdLCJuYW1lcyI6WyJSc0RhdGEiLCJpdGVtcyIsInNjb3JlQnlTb3VyY2VDbGFpbUlkIiwiY2xhaW1FZGdlc0J5UGFyZW50SWQiLCJjbGFpbUVkZ2VzQnlDaGlsZElkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFHMEQ7QUFDTztJQUVwREEsTSxHQUNULGtCQUtFO0FBQUEsTUFKU0MsS0FJVCx1RUFKaUMsRUFJakM7QUFBQSxNQUhTQyxvQkFHVCx1RUFIdUMsRUFHdkM7QUFBQSxNQUZTQyxvQkFFVCx1RUFGNEMsRUFFNUM7QUFBQSxNQURTQyxtQkFDVCx1RUFEMkMsRUFDM0M7O0FBQUE7O0FBQUEsT0FKU0gsS0FJVCxHQUpTQSxLQUlUO0FBQUEsT0FIU0Msb0JBR1QsR0FIU0Esb0JBR1Q7QUFBQSxPQUZTQyxvQkFFVCxHQUZTQSxvQkFFVDtBQUFBLE9BRFNDLG1CQUNULEdBRFNBLG1CQUNUO0FBQ0QsQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEl0ZW0gfSBmcm9tIFwiLi9JdGVtXCI7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIEl0ZW1EaWN0aW9uYXJ5IHsgW2lkU3RyaW5nOiBzdHJpbmddOiBJdGVtW107IH1cclxuZXhwb3J0IGludGVyZmFjZSBJbmRleCB7IFtzZWFyY2hJbmRleDogc3RyaW5nXTogc3RyaW5nOyB9IC8vU3RvcmUgdGhlIHN0cmluZyBmb3IgdGhlIElEXHJcbmV4cG9ydCBpbnRlcmZhY2UgSW5kZXhBcnJheSB7IFtzZWFyY2hJbmRleDogc3RyaW5nXTogc3RyaW5nW107IH0gLy9TdG9yZSB0aGUgc3RyaW5nIGZvciB0aGUgSURcclxuXHJcbmV4cG9ydCBjbGFzcyBSc0RhdGEge1xyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHVibGljIGl0ZW1zOiBJdGVtRGljdGlvbmFyeSA9IHt9LFxyXG4gICAgICAgIHB1YmxpYyBzY29yZUJ5U291cmNlQ2xhaW1JZDogSW5kZXggPSB7fSxcclxuICAgICAgICBwdWJsaWMgY2xhaW1FZGdlc0J5UGFyZW50SWQ6IEluZGV4QXJyYXkgPSB7fSxcclxuICAgICAgICBwdWJsaWMgY2xhaW1FZGdlc0J5Q2hpbGRJZDogSW5kZXhBcnJheSA9IHt9LFxyXG4gICAgKSB7XHJcbiAgICB9XHJcbn0iXX0=