"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.claims = claims;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function claims(state, action, reverse = false) {
  switch (action.type) {
    case "add_claim":
    case "sync_claim":
      {
        return _objectSpread({}, state, {
          items: _objectSpread({}, state.items, {
            [action.dataId]: action.newData
          })
        });
      }

    case "modify_claim":
      {
        return _objectSpread({}, state, {
          items: _objectSpread({}, state.items, {
            [action.dataId]: _objectSpread({}, state.items[action.dataId], {}, action.newData)
          })
        });
      }
    // TODO: Handle reverse (Or save state somewhere, would that be too large?)

    default:
      return state;
  }
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9yZXBvc2l0b3JpZXMvcmVkdWNlcnMvY2xhaW1zLnRzIl0sIm5hbWVzIjpbImNsYWltcyIsInN0YXRlIiwiYWN0aW9uIiwicmV2ZXJzZSIsInR5cGUiLCJpdGVtcyIsImRhdGFJZCIsIm5ld0RhdGEiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFHTyxTQUFTQSxNQUFULENBQWdCQyxLQUFoQixFQUFnQ0MsTUFBaEMsRUFBaURDLE9BQWdCLEdBQUcsS0FBcEUsRUFBb0Y7QUFDdkYsVUFBUUQsTUFBTSxDQUFDRSxJQUFmO0FBQ0ksU0FBSyxXQUFMO0FBQ0EsU0FBSyxZQUFMO0FBQ0k7QUFDSSxpQ0FDT0gsS0FEUDtBQUVJSSxVQUFBQSxLQUFLLG9CQUNFSixLQUFLLENBQUNJLEtBRFI7QUFFRCxhQUFDSCxNQUFNLENBQUNJLE1BQVIsR0FBaUJKLE1BQU0sQ0FBQ0s7QUFGdkI7QUFGVDtBQU9IOztBQUNMLFNBQUssY0FBTDtBQUNJO0FBQ0ksaUNBQ09OLEtBRFA7QUFFSUksVUFBQUEsS0FBSyxvQkFDRUosS0FBSyxDQUFDSSxLQURSO0FBRUQsYUFBQ0gsTUFBTSxDQUFDSSxNQUFSLHFCQUNPTCxLQUFLLENBQUNJLEtBQU4sQ0FBWUgsTUFBTSxDQUFDSSxNQUFuQixDQURQLE1BRU9KLE1BQU0sQ0FBQ0ssT0FGZDtBQUZDO0FBRlQ7QUFVSDtBQUVMOztBQUVBO0FBQ0ksYUFBT04sS0FBUDtBQTdCUjtBQStCSCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGlBY3Rpb24gfSBmcm9tIFwiLi4vLi4vZGF0YU1vZGVscy9BY3Rpb25cIlxyXG5pbXBvcnQgeyBpUnNEYXRhIH0gZnJvbSBcIi4uLy4uL2RhdGFNb2RlbHMvUnNEYXRhXCJcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBjbGFpbXMoc3RhdGU6IGlSc0RhdGEsIGFjdGlvbjogaUFjdGlvbiwgcmV2ZXJzZTogYm9vbGVhbiA9IGZhbHNlKTogaVJzRGF0YSB7XHJcbiAgICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XHJcbiAgICAgICAgY2FzZSBcImFkZF9jbGFpbVwiOlxyXG4gICAgICAgIGNhc2UgXCJzeW5jX2NsYWltXCI6XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLi4uc3RhdGUsXHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbXM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLi4uc3RhdGUuaXRlbXMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFthY3Rpb24uZGF0YUlkXTogYWN0aW9uLm5ld0RhdGFcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IGFzIGlSc0RhdGFcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIGNhc2UgXCJtb2RpZnlfY2xhaW1cIjpcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICAuLi5zdGF0ZSxcclxuICAgICAgICAgICAgICAgICAgICBpdGVtczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAuLi5zdGF0ZS5pdGVtcyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgW2FjdGlvbi5kYXRhSWRdOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuLi5zdGF0ZS5pdGVtc1thY3Rpb24uZGF0YUlkXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC4uLmFjdGlvbi5uZXdEYXRhLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBhcyBpUnNEYXRhXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gVE9ETzogSGFuZGxlIHJldmVyc2UgKE9yIHNhdmUgc3RhdGUgc29tZXdoZXJlLCB3b3VsZCB0aGF0IGJlIHRvbyBsYXJnZT8pXHJcblxyXG4gICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgIHJldHVybiBzdGF0ZVxyXG4gICAgfVxyXG59Il19