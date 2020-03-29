"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IndexReducer = IndexReducer;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function IndexReducer(state, index, keyId, id) {
  if (keyId) {
    //TODO: remove this, can I use "...state[index][keyId] || []" below?
    if (!state[index][keyId]) {
      state[index][keyId] = [];
    }

    if (state[index][keyId].indexOf(id) == -1) {
      state = _objectSpread({}, state, {
        [index]: _objectSpread({}, state[index], {
          [keyId]: [...state[index][keyId], id]
        })
      });
    }
  }

  return state;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9yZXBvc2l0b3JpZXMvcmVkdWNlcnMvSW5kZXhSZWR1Y2VyLnRzIl0sIm5hbWVzIjpbIkluZGV4UmVkdWNlciIsInN0YXRlIiwiaW5kZXgiLCJrZXlJZCIsImlkIiwiaW5kZXhPZiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUNPLFNBQVNBLFlBQVQsQ0FBc0JDLEtBQXRCLEVBQWtDQyxLQUFsQyxFQUFpREMsS0FBakQsRUFBNEVDLEVBQTVFLEVBQWlHO0FBQ3BHLE1BQUlELEtBQUosRUFBVztBQUNQO0FBQ0EsUUFBSSxDQUFDRixLQUFLLENBQUNDLEtBQUQsQ0FBTCxDQUFhQyxLQUFiLENBQUwsRUFBMEI7QUFDdEJGLE1BQUFBLEtBQUssQ0FBQ0MsS0FBRCxDQUFMLENBQWFDLEtBQWIsSUFBc0IsRUFBdEI7QUFDSDs7QUFDRCxRQUFJRixLQUFLLENBQUNDLEtBQUQsQ0FBTCxDQUFhQyxLQUFiLEVBQW9CRSxPQUFwQixDQUE0QkQsRUFBNUIsS0FBbUMsQ0FBQyxDQUF4QyxFQUEyQztBQUN2Q0gsTUFBQUEsS0FBSyxxQkFDRUEsS0FERjtBQUVELFNBQUNDLEtBQUQscUJBQ09ELEtBQUssQ0FBQ0MsS0FBRCxDQURaO0FBRUksV0FBQ0MsS0FBRCxHQUFTLENBQ0wsR0FBR0YsS0FBSyxDQUFDQyxLQUFELENBQUwsQ0FBYUMsS0FBYixDQURFLEVBRUxDLEVBRks7QUFGYjtBQUZDLFFBQUw7QUFVSDtBQUNKOztBQUNELFNBQU9ILEtBQVA7QUFDSCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGlSc0RhdGEgfSBmcm9tIFwiLi4vLi4vZGF0YU1vZGVscy9Sc0RhdGFcIjtcclxuZXhwb3J0IGZ1bmN0aW9uIEluZGV4UmVkdWNlcihzdGF0ZTogYW55LCBpbmRleDogc3RyaW5nLCBrZXlJZDogc3RyaW5nIHwgdW5kZWZpbmVkLCBpZDogc3RyaW5nKTogaVJzRGF0YSB7XHJcbiAgICBpZiAoa2V5SWQpIHtcclxuICAgICAgICAvL1RPRE86IHJlbW92ZSB0aGlzLCBjYW4gSSB1c2UgXCIuLi5zdGF0ZVtpbmRleF1ba2V5SWRdIHx8IFtdXCIgYmVsb3c/XHJcbiAgICAgICAgaWYgKCFzdGF0ZVtpbmRleF1ba2V5SWRdKSB7XHJcbiAgICAgICAgICAgIHN0YXRlW2luZGV4XVtrZXlJZF0gPSBbXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHN0YXRlW2luZGV4XVtrZXlJZF0uaW5kZXhPZihpZCkgPT0gLTEpIHtcclxuICAgICAgICAgICAgc3RhdGUgPSB7XHJcbiAgICAgICAgICAgICAgICAuLi5zdGF0ZSxcclxuICAgICAgICAgICAgICAgIFtpbmRleF06IHtcclxuICAgICAgICAgICAgICAgICAgICAuLi5zdGF0ZVtpbmRleF0sXHJcbiAgICAgICAgICAgICAgICAgICAgW2tleUlkXTogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAuLi5zdGF0ZVtpbmRleF1ba2V5SWRdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZFxyXG4gICAgICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gc3RhdGU7XHJcbn1cclxuIl19