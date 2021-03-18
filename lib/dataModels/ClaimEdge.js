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
  constructor(
  /** The ID for the parent claim this edge points to */
  parentId,
  /** The ID for the child claim this edge points from */
  childId,
  /** How the child affects the parent score */
  affects = 'confidence',
  /** Is the child claim a pro of it's parent (false if it is a con) */
  pro = true, id = (0, _newId.newId)(), priority = "") {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kYXRhTW9kZWxzL0NsYWltRWRnZS50cyJdLCJuYW1lcyI6WyJDbGFpbUVkZ2UiLCJjb25zdHJ1Y3RvciIsInBhcmVudElkIiwiY2hpbGRJZCIsImFmZmVjdHMiLCJwcm8iLCJpZCIsInByaW9yaXR5Il0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBRUE7Ozs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTyxNQUFNQSxTQUFOLENBQWdCO0FBR25CQyxFQUFBQSxXQUFXO0FBQ1A7QUFDT0MsRUFBQUEsUUFGQTtBQUdQO0FBQ09DLEVBQUFBLE9BSkE7QUFLUDtBQUNPQyxFQUFBQSxPQUFnQixHQUFHLFlBTm5CO0FBT1A7QUFDT0MsRUFBQUEsR0FBWSxHQUFHLElBUmYsRUFTQUMsRUFBVSxHQUFHLG1CQVRiLEVBVUFDLFFBQWdCLEdBQUcsRUFWbkIsRUFXVDtBQUFBLFNBVFNMLFFBU1QsR0FUU0EsUUFTVDtBQUFBLFNBUFNDLE9BT1QsR0FQU0EsT0FPVDtBQUFBLFNBTFNDLE9BS1QsR0FMU0EsT0FLVDtBQUFBLFNBSFNDLEdBR1QsR0FIU0EsR0FHVDtBQUFBLFNBRlNDLEVBRVQsR0FGU0EsRUFFVDtBQUFBLFNBRFNDLFFBQ1QsR0FEU0EsUUFDVDs7QUFBQSxrQ0FiZ0IsV0FhaEI7QUFDRDs7QUFma0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBZmZlY3RzIH0gZnJvbSBcIi4vQWZmZWN0c1wiXHJcbmltcG9ydCB7IEl0ZW1UeXBlcyB9IGZyb20gXCIuL0l0ZW1UeXBlc1wiO1xyXG5pbXBvcnQgeyBuZXdJZCB9IGZyb20gXCIuLi9uZXdJZFwiO1xyXG4vKipcclxuICogU3RvcmVzIHRoZSByZWxhdGlvbnNoaXAgYmV0d2VlbiBhIGNsYWltIGFuZCBhbiBpdGVtICh1c3VhbGx5IGFub3RoZXIgY2xhaW0pLlxyXG4gKiBUaGlzIGlzIGRpcmVjdGlvbmFsIGFzIHRoZSBlZGdlIHBvaW50cyBmcm9tIG9uZSBjbGFpbSB0byBpdCdzIHBhcmVudC5cclxuICogVGhpcyBpcyBqdXN0IGEgZGF0YSB0cmFuc2ZlciBvYmplY3Qgc28gaXQgc2hvdWxkIGhhdmUgbm8gbG9naWMgaW4gaXRcclxuICogYW5kIG9ubHkgSlNPTiBjb21wYXRpYmxlIHR5cGVzIHN0cmluZywgbnVtYmVyLCBvYmplY3QsIGFycmF5LCBib29sZWFuXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgQ2xhaW1FZGdlIHtcclxuICAgIHR5cGU6IEl0ZW1UeXBlcyA9ICdjbGFpbUVkZ2UnXHJcblxyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgLyoqIFRoZSBJRCBmb3IgdGhlIHBhcmVudCBjbGFpbSB0aGlzIGVkZ2UgcG9pbnRzIHRvICovXHJcbiAgICAgICAgcHVibGljIHBhcmVudElkOiBzdHJpbmcsXHJcbiAgICAgICAgLyoqIFRoZSBJRCBmb3IgdGhlIGNoaWxkIGNsYWltIHRoaXMgZWRnZSBwb2ludHMgZnJvbSAqL1xyXG4gICAgICAgIHB1YmxpYyBjaGlsZElkOiBzdHJpbmcsXHJcbiAgICAgICAgLyoqIEhvdyB0aGUgY2hpbGQgYWZmZWN0cyB0aGUgcGFyZW50IHNjb3JlICovXHJcbiAgICAgICAgcHVibGljIGFmZmVjdHM6IEFmZmVjdHMgPSAnY29uZmlkZW5jZScsXHJcbiAgICAgICAgLyoqIElzIHRoZSBjaGlsZCBjbGFpbSBhIHBybyBvZiBpdCdzIHBhcmVudCAoZmFsc2UgaWYgaXQgaXMgYSBjb24pICovXHJcbiAgICAgICAgcHVibGljIHBybzogYm9vbGVhbiA9IHRydWUsXHJcbiAgICAgICAgcHVibGljIGlkOiBzdHJpbmcgPSBuZXdJZCgpLFxyXG4gICAgICAgIHB1YmxpYyBwcmlvcml0eTogc3RyaW5nID0gXCJcIixcclxuICAgICkge1xyXG4gICAgfVxyXG59XHJcbiJdfQ==