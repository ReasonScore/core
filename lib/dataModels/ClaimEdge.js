"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ClaimEdge = void 0;

var _newId = require("../newId");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Stores the relationship between a claim and an item (usually another claim).
 * This is directional as the edge points from one claim to it's parent.
 * This is just a data transfer object so it should have no logic in it
 * and only JSON compatible types string, number, object, array, boolean
 */
class ClaimEdge {
  constructor(parentId, childId, affects = 'confidence', pro = true, id = (0, _newId.newId)(), priority = "") {
    this.parentId = parentId;
    this.childId = childId;
    this.affects = affects;
    this.pro = pro;
    this.id = id;
    this.priority = priority;

    _defineProperty(this, "type", 'claimEdge');
  }

}

exports.ClaimEdge = ClaimEdge;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kYXRhTW9kZWxzL0NsYWltRWRnZS50cyJdLCJuYW1lcyI6WyJDbGFpbUVkZ2UiLCJjb25zdHJ1Y3RvciIsInBhcmVudElkIiwiY2hpbGRJZCIsImFmZmVjdHMiLCJwcm8iLCJpZCIsInByaW9yaXR5Il0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBRUE7Ozs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTyxNQUFNQSxTQUFOLENBQWdCO0FBR25CQyxFQUFBQSxXQUFXLENBRUFDLFFBRkEsRUFJQUMsT0FKQSxFQU1BQyxPQUFnQixHQUFHLFlBTm5CLEVBUUFDLEdBQVksR0FBRyxJQVJmLEVBU0FDLEVBQVUsR0FBRyxtQkFUYixFQVVBQyxRQUFnQixHQUFHLEVBVm5CLEVBV1Q7QUFBQSxTQVRTTCxRQVNULEdBVFNBLFFBU1Q7QUFBQSxTQVBTQyxPQU9ULEdBUFNBLE9BT1Q7QUFBQSxTQUxTQyxPQUtULEdBTFNBLE9BS1Q7QUFBQSxTQUhTQyxHQUdULEdBSFNBLEdBR1Q7QUFBQSxTQUZTQyxFQUVULEdBRlNBLEVBRVQ7QUFBQSxTQURTQyxRQUNULEdBRFNBLFFBQ1Q7O0FBQUEsa0NBYmdCLFdBYWhCO0FBQ0Q7O0FBZmtCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWZmZWN0cyB9IGZyb20gXCIuL0FmZmVjdHNcIlxyXG5pbXBvcnQgeyBJdGVtVHlwZXMgfSBmcm9tIFwiLi9JdGVtVHlwZXNcIjtcclxuaW1wb3J0IHsgbmV3SWQgfSBmcm9tIFwiLi4vbmV3SWRcIjtcclxuLyoqXHJcbiAqIFN0b3JlcyB0aGUgcmVsYXRpb25zaGlwIGJldHdlZW4gYSBjbGFpbSBhbmQgYW4gaXRlbSAodXN1YWxseSBhbm90aGVyIGNsYWltKS5cclxuICogVGhpcyBpcyBkaXJlY3Rpb25hbCBhcyB0aGUgZWRnZSBwb2ludHMgZnJvbSBvbmUgY2xhaW0gdG8gaXQncyBwYXJlbnQuXHJcbiAqIFRoaXMgaXMganVzdCBhIGRhdGEgdHJhbnNmZXIgb2JqZWN0IHNvIGl0IHNob3VsZCBoYXZlIG5vIGxvZ2ljIGluIGl0XHJcbiAqIGFuZCBvbmx5IEpTT04gY29tcGF0aWJsZSB0eXBlcyBzdHJpbmcsIG51bWJlciwgb2JqZWN0LCBhcnJheSwgYm9vbGVhblxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIENsYWltRWRnZSB7XHJcbiAgICB0eXBlOiBJdGVtVHlwZXMgPSAnY2xhaW1FZGdlJ1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIC8qKiBUaGUgSUQgZm9yIHRoZSBwYXJlbnQgY2xhaW0gdGhpcyBlZGdlIHBvaW50cyB0byAqL1xyXG4gICAgICAgIHB1YmxpYyBwYXJlbnRJZDogc3RyaW5nLFxyXG4gICAgICAgIC8qKiBUaGUgSUQgZm9yIHRoZSBjaGlsZCBjbGFpbSB0aGlzIGVkZ2UgcG9pbnRzIGZyb20gKi9cclxuICAgICAgICBwdWJsaWMgY2hpbGRJZDogc3RyaW5nLFxyXG4gICAgICAgIC8qKiBIb3cgdGhlIGNoaWxkIGFmZmVjdHMgdGhlIHBhcmVudCBzY29yZSAqL1xyXG4gICAgICAgIHB1YmxpYyBhZmZlY3RzOiBBZmZlY3RzID0gJ2NvbmZpZGVuY2UnLFxyXG4gICAgICAgIC8qKiBJcyB0aGUgY2hpbGQgY2xhaW0gYSBwcm8gb2YgaXQncyBwYXJlbnQgKGZhbHNlIGlmIGl0IGlzIGEgY29uKSAqL1xyXG4gICAgICAgIHB1YmxpYyBwcm86IGJvb2xlYW4gPSB0cnVlLFxyXG4gICAgICAgIHB1YmxpYyBpZDogc3RyaW5nID0gbmV3SWQoKSxcclxuICAgICAgICBwdWJsaWMgcHJpb3JpdHk6IHN0cmluZyA9IFwiXCIsXHJcbiAgICApIHtcclxuICAgIH1cclxufVxyXG4iXX0=