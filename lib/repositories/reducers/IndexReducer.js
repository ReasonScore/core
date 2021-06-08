"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IndexReducer = IndexReducer;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function IndexReducer(state, index, keyId, id) {
  if (keyId) {
    //TODO: remove this, can I use "...state[index][keyId] || []" below?
    if (!state[index][keyId]) {
      state[index][keyId] = [];
    }

    if (state[index][keyId].indexOf(id) == -1) {
      state = _objectSpread(_objectSpread({}, state), {}, {
        [index]: _objectSpread(_objectSpread({}, state[index]), {}, {
          [keyId]: [...state[index][keyId], id]
        })
      });
    }
  }

  return state;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9yZXBvc2l0b3JpZXMvcmVkdWNlcnMvSW5kZXhSZWR1Y2VyLnRzIl0sIm5hbWVzIjpbIkluZGV4UmVkdWNlciIsInN0YXRlIiwiaW5kZXgiLCJrZXlJZCIsImlkIiwiaW5kZXhPZiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUNPLFNBQVNBLFlBQVQsQ0FBc0JDLEtBQXRCLEVBQWtDQyxLQUFsQyxFQUFpREMsS0FBakQsRUFBbUZDLEVBQW5GLEVBQXVHO0FBQzFHLE1BQUlELEtBQUosRUFBVztBQUNQO0FBQ0EsUUFBSSxDQUFDRixLQUFLLENBQUNDLEtBQUQsQ0FBTCxDQUFhQyxLQUFiLENBQUwsRUFBMEI7QUFDdEJGLE1BQUFBLEtBQUssQ0FBQ0MsS0FBRCxDQUFMLENBQWFDLEtBQWIsSUFBc0IsRUFBdEI7QUFDSDs7QUFDRCxRQUFJRixLQUFLLENBQUNDLEtBQUQsQ0FBTCxDQUFhQyxLQUFiLEVBQW9CRSxPQUFwQixDQUE0QkQsRUFBNUIsS0FBbUMsQ0FBQyxDQUF4QyxFQUEyQztBQUN2Q0gsTUFBQUEsS0FBSyxtQ0FDRUEsS0FERjtBQUVELFNBQUNDLEtBQUQsbUNBQ09ELEtBQUssQ0FBQ0MsS0FBRCxDQURaO0FBRUksV0FBQ0MsS0FBRCxHQUFTLENBQ0wsR0FBR0YsS0FBSyxDQUFDQyxLQUFELENBQUwsQ0FBYUMsS0FBYixDQURFLEVBRUxDLEVBRks7QUFGYjtBQUZDLFFBQUw7QUFVSDtBQUNKOztBQUNELFNBQU9ILEtBQVA7QUFDSCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFJzRGF0YSB9IGZyb20gXCIuLi8uLi9kYXRhTW9kZWxzL1JzRGF0YVwiO1xyXG5leHBvcnQgZnVuY3Rpb24gSW5kZXhSZWR1Y2VyKHN0YXRlOiBhbnksIGluZGV4OiBzdHJpbmcsIGtleUlkOiBzdHJpbmcgfCBudWxsIHwgdW5kZWZpbmVkLCBpZDogc3RyaW5nKTogUnNEYXRhIHtcclxuICAgIGlmIChrZXlJZCkge1xyXG4gICAgICAgIC8vVE9ETzogcmVtb3ZlIHRoaXMsIGNhbiBJIHVzZSBcIi4uLnN0YXRlW2luZGV4XVtrZXlJZF0gfHwgW11cIiBiZWxvdz9cclxuICAgICAgICBpZiAoIXN0YXRlW2luZGV4XVtrZXlJZF0pIHtcclxuICAgICAgICAgICAgc3RhdGVbaW5kZXhdW2tleUlkXSA9IFtdO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoc3RhdGVbaW5kZXhdW2tleUlkXS5pbmRleE9mKGlkKSA9PSAtMSkge1xyXG4gICAgICAgICAgICBzdGF0ZSA9IHtcclxuICAgICAgICAgICAgICAgIC4uLnN0YXRlLFxyXG4gICAgICAgICAgICAgICAgW2luZGV4XToge1xyXG4gICAgICAgICAgICAgICAgICAgIC4uLnN0YXRlW2luZGV4XSxcclxuICAgICAgICAgICAgICAgICAgICBba2V5SWRdOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC4uLnN0YXRlW2luZGV4XVtrZXlJZF0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkXHJcbiAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBzdGF0ZTtcclxufVxyXG4iXX0=