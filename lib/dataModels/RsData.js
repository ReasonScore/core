"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RsData = exports.VersionDate = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//Store the string for the ID
//Store the string for the ID
//Store the string for the ID
var VersionDate = function VersionDate(ItemIdString, start, end) {
  _classCallCheck(this, VersionDate);

  this.ItemIdString = ItemIdString;
  this.start = start;
  this.end = end;
};

exports.VersionDate = VersionDate;

var RsData = function RsData() {
  var versions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var scoreBySourceClaimId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var claimEdgesByParentId = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var claimEdgesByChildId = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var versionIdByItemId = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};

  _classCallCheck(this, RsData);

  this.versions = versions;
  this.scoreBySourceClaimId = scoreBySourceClaimId;
  this.claimEdgesByParentId = claimEdgesByParentId;
  this.claimEdgesByChildId = claimEdgesByChildId;
  this.versionIdByItemId = versionIdByItemId;
};

exports.RsData = RsData;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kYXRhTW9kZWxzL1JzRGF0YS50cyJdLCJuYW1lcyI6WyJWZXJzaW9uRGF0ZSIsIkl0ZW1JZFN0cmluZyIsInN0YXJ0IiwiZW5kIiwiUnNEYXRhIiwidmVyc2lvbnMiLCJzY29yZUJ5U291cmNlQ2xhaW1JZCIsImNsYWltRWRnZXNCeVBhcmVudElkIiwiY2xhaW1FZGdlc0J5Q2hpbGRJZCIsInZlcnNpb25JZEJ5SXRlbUlkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFHMEQ7QUFDTztBQUNnQjtJQUVwRUEsVyxHQUNULHFCQUNXQyxZQURYLEVBRVdDLEtBRlgsRUFHV0MsR0FIWCxFQUlFO0FBQUE7O0FBQUEsT0FIU0YsWUFHVCxHQUhTQSxZQUdUO0FBQUEsT0FGU0MsS0FFVCxHQUZTQSxLQUVUO0FBQUEsT0FEU0MsR0FDVCxHQURTQSxHQUNUO0FBQ0QsQzs7OztJQUdRQyxNLEdBQ1Qsa0JBTUU7QUFBQSxNQUxTQyxRQUtULHVFQUxvQyxFQUtwQztBQUFBLE1BSlNDLG9CQUlULHVFQUp1QyxFQUl2QztBQUFBLE1BSFNDLG9CQUdULHVFQUg0QyxFQUc1QztBQUFBLE1BRlNDLG1CQUVULHVFQUYyQyxFQUUzQztBQUFBLE1BRFNDLGlCQUNULHVFQURvRCxFQUNwRDs7QUFBQTs7QUFBQSxPQUxTSixRQUtULEdBTFNBLFFBS1Q7QUFBQSxPQUpTQyxvQkFJVCxHQUpTQSxvQkFJVDtBQUFBLE9BSFNDLG9CQUdULEdBSFNBLG9CQUdUO0FBQUEsT0FGU0MsbUJBRVQsR0FGU0EsbUJBRVQ7QUFBQSxPQURTQyxpQkFDVCxHQURTQSxpQkFDVDtBQUNELEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJdGVtIH0gZnJvbSBcIi4vSXRlbVwiO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJdGVtRGljdGlvbmFyeSB7IFtpZFN0cmluZzogc3RyaW5nXTogSXRlbTsgfVxyXG5leHBvcnQgaW50ZXJmYWNlIEluZGV4IHsgW3NlYXJjaEluZGV4OiBzdHJpbmddOiBzdHJpbmc7IH0gLy9TdG9yZSB0aGUgc3RyaW5nIGZvciB0aGUgSURcclxuZXhwb3J0IGludGVyZmFjZSBJbmRleEFycmF5IHsgW3NlYXJjaEluZGV4OiBzdHJpbmddOiBzdHJpbmdbXTsgfSAvL1N0b3JlIHRoZSBzdHJpbmcgZm9yIHRoZSBJRFxyXG5leHBvcnQgaW50ZXJmYWNlIEluZGV4VmVyc2lvbkRhdGVBcnJheSB7IFtzZWFyY2hJbmRleDogc3RyaW5nXTogVmVyc2lvbkRhdGVbXTsgfSAvL1N0b3JlIHRoZSBzdHJpbmcgZm9yIHRoZSBJRFxyXG5cclxuZXhwb3J0IGNsYXNzIFZlcnNpb25EYXRlIHtcclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHB1YmxpYyBJdGVtSWRTdHJpbmc6IHN0cmluZyxcclxuICAgICAgICBwdWJsaWMgc3RhcnQ6IHN0cmluZyxcclxuICAgICAgICBwdWJsaWMgZW5kOiBzdHJpbmdcclxuICAgICkge1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgUnNEYXRhIHtcclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHB1YmxpYyB2ZXJzaW9uczogSXRlbURpY3Rpb25hcnkgPSB7fSxcclxuICAgICAgICBwdWJsaWMgc2NvcmVCeVNvdXJjZUNsYWltSWQ6IEluZGV4ID0ge30sXHJcbiAgICAgICAgcHVibGljIGNsYWltRWRnZXNCeVBhcmVudElkOiBJbmRleEFycmF5ID0ge30sXHJcbiAgICAgICAgcHVibGljIGNsYWltRWRnZXNCeUNoaWxkSWQ6IEluZGV4QXJyYXkgPSB7fSxcclxuICAgICAgICBwdWJsaWMgdmVyc2lvbklkQnlJdGVtSWQ6IEluZGV4VmVyc2lvbkRhdGVBcnJheSA9IHt9LFxyXG4gICAgKSB7XHJcbiAgICB9XHJcbn0iXX0=