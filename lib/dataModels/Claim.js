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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kYXRhTW9kZWxzL0NsYWltLnRzIl0sIm5hbWVzIjpbIkNsYWltIiwiY29uc3RydWN0b3IiLCJjb250ZW50IiwiaWQiLCJyZXZlcnNpYmxlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQ0E7Ozs7QUFHTyxNQUFNQSxLQUFOLENBQW9DO0FBR3ZDQyxFQUFBQSxXQUFXLENBQ0FDLE9BQWUsR0FBRyxFQURsQixFQUVBQyxFQUFVLEdBQUcsbUJBRmIsRUFHQUMsVUFBbUIsR0FBRyxLQUh0QixFQUlUO0FBQUEsU0FIU0YsT0FHVCxHQUhTQSxPQUdUO0FBQUEsU0FGU0MsRUFFVCxHQUZTQSxFQUVUO0FBQUEsU0FEU0MsVUFDVCxHQURTQSxVQUNUOztBQUFBLGtDQU5nQixPQU1oQjtBQUNEOztBQVJzQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEl0ZW1UeXBlcyB9IGZyb20gXCIuL0l0ZW1UeXBlc1wiO1xyXG5pbXBvcnQgeyBuZXdJZCB9IGZyb20gXCIuLi9uZXdJZFwiO1xyXG5pbXBvcnQgeyBJdGVtIH0gZnJvbSBcIi4uXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgQ2xhaW0gaW1wbGVtZW50cyBpQ2xhaW0sIEl0ZW0ge1xyXG4gICAgdHlwZTogSXRlbVR5cGVzID0gJ2NsYWltJ1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHB1YmxpYyBjb250ZW50OiBzdHJpbmcgPSBcIlwiLFxyXG4gICAgICAgIHB1YmxpYyBpZDogc3RyaW5nID0gbmV3SWQoKSxcclxuICAgICAgICBwdWJsaWMgcmV2ZXJzaWJsZTogYm9vbGVhbiA9IGZhbHNlLFxyXG4gICAgKSB7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgaUNsYWltIHtcclxuICAgIHR5cGU6IEl0ZW1UeXBlcyxcclxuICAgIGlkOiBzdHJpbmcsXHJcbiAgICByZXZlcnNpYmxlOiBib29sZWFuLFxyXG4gICAgLyoqIGFsbG93IGZvciBvdGhlciBwcm9wZXJ0aWVzIGJ5IGV4dGVybmFsIGltcGxlbWVudGF0aW9ucyAqL1xyXG4gICAgLy8gW290aGVyczogc3RyaW5nXTogYW55O1xyXG59XHJcblxyXG5cclxuIl19