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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kYXRhTW9kZWxzL1JzRGF0YS50cyJdLCJuYW1lcyI6WyJSc0RhdGEiLCJpdGVtcyIsInNjb3JlQnlTb3VyY2VDbGFpbUlkIiwiY2xhaW1FZGdlc0J5UGFyZW50SWQiLCJjbGFpbUVkZ2VzQnlDaGlsZElkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFRMEQ7QUFDTztJQUVwREEsTSxHQUNULGtCQUtFO0FBQUEsTUFKU0MsS0FJVCx1RUFKaUMsRUFJakM7QUFBQSxNQUhTQyxvQkFHVCx1RUFIdUMsRUFHdkM7QUFBQSxNQUZTQyxvQkFFVCx1RUFGNEMsRUFFNUM7QUFBQSxNQURTQyxtQkFDVCx1RUFEMkMsRUFDM0M7O0FBQUE7O0FBQUEsT0FKU0gsS0FJVCxHQUpTQSxLQUlUO0FBQUEsT0FIU0Msb0JBR1QsR0FIU0Esb0JBR1Q7QUFBQSxPQUZTQyxvQkFFVCxHQUZTQSxvQkFFVDtBQUFBLE9BRFNDLG1CQUNULEdBRFNBLG1CQUNUO0FBQ0QsQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENsYWltIH0gZnJvbSBcIi4vQ2xhaW1cIjtcclxuaW1wb3J0IHsgQ2xhaW1FZGdlIH0gZnJvbSBcIi4vQ2xhaW1FZGdlXCI7XHJcbmltcG9ydCB7IFNjb3JlIH0gZnJvbSBcIi4vU2NvcmVcIjtcclxuaW1wb3J0IHsgVmlldyB9IGZyb20gXCIuL1ZpZXdcIjtcclxuaW1wb3J0IHsgVmlld0VkZ2UgfSBmcm9tIFwiLi92aWV3RWRnZVwiO1xyXG5pbXBvcnQgeyBJdGVtIH0gZnJvbSBcIi4vSXRlbVwiO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJdGVtRGljdGlvbmFyeSB7IFtpZFN0cmluZzogc3RyaW5nXTogSXRlbVtdOyB9XHJcbmV4cG9ydCBpbnRlcmZhY2UgSW5kZXggeyBbc2VhcmNoSW5kZXg6IHN0cmluZ106IHN0cmluZzsgfSAvL1N0b3JlIHRoZSBzdHJpbmcgZm9yIHRoZSBJRFxyXG5leHBvcnQgaW50ZXJmYWNlIEluZGV4QXJyYXkgeyBbc2VhcmNoSW5kZXg6IHN0cmluZ106IHN0cmluZ1tdOyB9IC8vU3RvcmUgdGhlIHN0cmluZyBmb3IgdGhlIElEXHJcblxyXG5leHBvcnQgY2xhc3MgUnNEYXRhIHtcclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHB1YmxpYyBpdGVtczogSXRlbURpY3Rpb25hcnkgPSB7fSxcclxuICAgICAgICBwdWJsaWMgc2NvcmVCeVNvdXJjZUNsYWltSWQ6IEluZGV4ID0ge30sXHJcbiAgICAgICAgcHVibGljIGNsYWltRWRnZXNCeVBhcmVudElkOiBJbmRleEFycmF5ID0ge30sXHJcbiAgICAgICAgcHVibGljIGNsYWltRWRnZXNCeUNoaWxkSWQ6IEluZGV4QXJyYXkgPSB7fSxcclxuICAgICkge1xyXG4gICAgfVxyXG59Il19