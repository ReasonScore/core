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
      {
        return _objectSpread({}, state, {
          claims: _objectSpread({}, state.claims, {
            [action.dataId]: action.newData
          })
        });
      }

    case "modify_claim":
      {
        return _objectSpread({}, state, {
          claims: _objectSpread({}, state.claims, {
            [action.dataId]: _objectSpread({}, state.claims[action.dataId], {}, action.newData)
          })
        });
      }
    // TODO: Handle reverse (Or save state somewhere, would that be too large?)

    default:
      return state;
  }
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9yZXBvc2l0b3JpZXMvcmVkdWNlcnMvY2xhaW1zLnRzIl0sIm5hbWVzIjpbImNsYWltcyIsInN0YXRlIiwiYWN0aW9uIiwicmV2ZXJzZSIsInR5cGUiLCJkYXRhSWQiLCJuZXdEYXRhIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBR08sU0FBU0EsTUFBVCxDQUFnQkMsS0FBaEIsRUFBZ0NDLE1BQWhDLEVBQWlEQyxPQUFnQixHQUFHLEtBQXBFLEVBQW9GO0FBQ3ZGLFVBQVFELE1BQU0sQ0FBQ0UsSUFBZjtBQUNJLFNBQUssV0FBTDtBQUNJO0FBQ0ksaUNBQ09ILEtBRFA7QUFFSUQsVUFBQUEsTUFBTSxvQkFDQ0MsS0FBSyxDQUFDRCxNQURQO0FBRUYsYUFBQ0UsTUFBTSxDQUFDRyxNQUFSLEdBQWlCSCxNQUFNLENBQUNJO0FBRnRCO0FBRlY7QUFPSDs7QUFDTCxTQUFLLGNBQUw7QUFDSTtBQUNJLGlDQUNPTCxLQURQO0FBRUlELFVBQUFBLE1BQU0sb0JBQ0NDLEtBQUssQ0FBQ0QsTUFEUDtBQUVGLGFBQUNFLE1BQU0sQ0FBQ0csTUFBUixxQkFDT0osS0FBSyxDQUFDRCxNQUFOLENBQWFFLE1BQU0sQ0FBQ0csTUFBcEIsQ0FEUCxNQUVPSCxNQUFNLENBQUNJLE9BRmQ7QUFGRTtBQUZWO0FBVUg7QUFFTDs7QUFFQTtBQUNJLGFBQU9MLEtBQVA7QUE1QlI7QUE4QkgiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBpQWN0aW9uIH0gZnJvbSBcIi4uLy4uL2RhdGFNb2RlbHMvQWN0aW9uXCJcclxuaW1wb3J0IHsgaVJzRGF0YSB9IGZyb20gXCIuLi8uLi9kYXRhTW9kZWxzL1JzRGF0YVwiXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gY2xhaW1zKHN0YXRlOiBpUnNEYXRhLCBhY3Rpb246IGlBY3Rpb24sIHJldmVyc2U6IGJvb2xlYW4gPSBmYWxzZSk6IGlSc0RhdGEge1xyXG4gICAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xyXG4gICAgICAgIGNhc2UgXCJhZGRfY2xhaW1cIjpcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICAuLi5zdGF0ZSxcclxuICAgICAgICAgICAgICAgICAgICBjbGFpbXM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLi4uc3RhdGUuY2xhaW1zLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBbYWN0aW9uLmRhdGFJZF06IGFjdGlvbi5uZXdEYXRhXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBhcyBpUnNEYXRhXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICBjYXNlIFwibW9kaWZ5X2NsYWltXCI6XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLi4uc3RhdGUsXHJcbiAgICAgICAgICAgICAgICAgICAgY2xhaW1zOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC4uLnN0YXRlLmNsYWltcyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgW2FjdGlvbi5kYXRhSWRdOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuLi5zdGF0ZS5jbGFpbXNbYWN0aW9uLmRhdGFJZF0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuLi5hY3Rpb24ubmV3RGF0YSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gYXMgaVJzRGF0YVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFRPRE86IEhhbmRsZSByZXZlcnNlIChPciBzYXZlIHN0YXRlIHNvbWV3aGVyZSwgd291bGQgdGhhdCBiZSB0b28gbGFyZ2U/KVxyXG5cclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICByZXR1cm4gc3RhdGVcclxuICAgIH1cclxufSJdfQ==