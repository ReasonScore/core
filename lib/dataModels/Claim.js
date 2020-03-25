"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Claim = void 0;

var _newId = require("../newId");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class Claim {
  constructor(content = "", id = (0, _newId.newId)(), reversible = false) {
    this.content = content;
    this.id = id;
    this.reversible = reversible;

    _defineProperty(this, "type", 'claim');
  }

}

exports.Claim = Claim;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kYXRhTW9kZWxzL0NsYWltLnRzIl0sIm5hbWVzIjpbIkNsYWltIiwiY29uc3RydWN0b3IiLCJjb250ZW50IiwiaWQiLCJyZXZlcnNpYmxlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQ0E7Ozs7QUFFTyxNQUFNQSxLQUFOLENBQThCO0FBR2pDQyxFQUFBQSxXQUFXLENBQ0FDLE9BQWUsR0FBRyxFQURsQixFQUVBQyxFQUFVLEdBQUcsbUJBRmIsRUFHQUMsVUFBbUIsR0FBRyxLQUh0QixFQUlUO0FBQUEsU0FIU0YsT0FHVCxHQUhTQSxPQUdUO0FBQUEsU0FGU0MsRUFFVCxHQUZTQSxFQUVUO0FBQUEsU0FEU0MsVUFDVCxHQURTQSxVQUNUOztBQUFBLGtDQU5nQixPQU1oQjtBQUNEOztBQVJnQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEl0ZW1UeXBlcyB9IGZyb20gXCIuL0l0ZW1UeXBlc1wiO1xyXG5pbXBvcnQgeyBuZXdJZCB9IGZyb20gXCIuLi9uZXdJZFwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIENsYWltIGltcGxlbWVudHMgaUNsYWltIHtcclxuICAgIHR5cGU6IEl0ZW1UeXBlcyA9ICdjbGFpbSdcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwdWJsaWMgY29udGVudDogc3RyaW5nID0gXCJcIixcclxuICAgICAgICBwdWJsaWMgaWQ6IHN0cmluZyA9IG5ld0lkKCksXHJcbiAgICAgICAgcHVibGljIHJldmVyc2libGU6IGJvb2xlYW4gPSBmYWxzZSxcclxuICAgICkge1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIGlDbGFpbSB7XHJcbiAgICB0eXBlOiBJdGVtVHlwZXMsXHJcbiAgICBpZDogc3RyaW5nLFxyXG4gICAgcmV2ZXJzaWJsZTogYm9vbGVhbixcclxuICAgIC8qKiBhbGxvdyBmb3Igb3RoZXIgcHJvcGVydGllcyBieSBleHRlcm5hbCBpbXBsZW1lbnRhdGlvbnMgKi9cclxuICAgIFtvdGhlcnM6IHN0cmluZ106IGFueTtcclxufVxyXG5cclxuXHJcbiJdfQ==