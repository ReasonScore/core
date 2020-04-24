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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kYXRhTW9kZWxzL0NsYWltLnRzIl0sIm5hbWVzIjpbIkNsYWltIiwiY29uc3RydWN0b3IiLCJjb250ZW50IiwiaWQiLCJyZXZlcnNpYmxlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQ0E7Ozs7QUFHTyxNQUFNQSxLQUFOLENBQTRCO0FBRy9CQyxFQUFBQSxXQUFXLENBQ0FDLE9BQWUsR0FBRyxFQURsQixFQUVBQyxFQUFVLEdBQUcsbUJBRmIsRUFHQUMsVUFBbUIsR0FBRyxLQUh0QixFQUlUO0FBQUEsU0FIU0YsT0FHVCxHQUhTQSxPQUdUO0FBQUEsU0FGU0MsRUFFVCxHQUZTQSxFQUVUO0FBQUEsU0FEU0MsVUFDVCxHQURTQSxVQUNUOztBQUFBLGtDQU5nQixPQU1oQjtBQUNEOztBQVI4QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEl0ZW1UeXBlcyB9IGZyb20gXCIuL0l0ZW1UeXBlc1wiO1xyXG5pbXBvcnQgeyBuZXdJZCB9IGZyb20gXCIuLi9uZXdJZFwiO1xyXG5pbXBvcnQgeyBJdGVtIH0gZnJvbSBcIi4vSXRlbVwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIENsYWltIGltcGxlbWVudHMgSXRlbSB7XHJcbiAgICB0eXBlOiBJdGVtVHlwZXMgPSAnY2xhaW0nXHJcblxyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHVibGljIGNvbnRlbnQ6IHN0cmluZyA9IFwiXCIsXHJcbiAgICAgICAgcHVibGljIGlkOiBzdHJpbmcgPSBuZXdJZCgpLFxyXG4gICAgICAgIHB1YmxpYyByZXZlcnNpYmxlOiBib29sZWFuID0gZmFsc2UsXHJcbiAgICApIHtcclxuICAgIH1cclxufVxyXG4iXX0=