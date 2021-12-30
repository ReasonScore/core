"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.claims = claims;

var _Claim = require("../../dataModels/Claim");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function claims(state, action, reverse = false) {
  switch (action.type) {
    case "add_claim":
    case "sync_claim":
    case "modify_claim":
      {
        let newItem = state.items[action.dataId];

        if (!newItem) {
          newItem = new _Claim.Claim("", "");
          newItem.id = action.dataId;
        }

        newItem = _objectSpread(_objectSpread({}, newItem), action.newData);
        return _objectSpread(_objectSpread({}, state), {}, {
          items: _objectSpread(_objectSpread({}, state.items), {}, {
            [action.dataId]: newItem
          })
        });
      }

    default:
      return state;
  }
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9yZXBvc2l0b3JpZXMvcmVkdWNlcnMvY2xhaW1zLnRzIl0sIm5hbWVzIjpbImNsYWltcyIsInN0YXRlIiwiYWN0aW9uIiwicmV2ZXJzZSIsInR5cGUiLCJuZXdJdGVtIiwiaXRlbXMiLCJkYXRhSWQiLCJDbGFpbSIsImlkIiwibmV3RGF0YSJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUVBOzs7Ozs7OztBQUVPLFNBQVNBLE1BQVQsQ0FBZ0JDLEtBQWhCLEVBQStCQyxNQUEvQixFQUErQ0MsT0FBZ0IsR0FBRyxLQUFsRSxFQUFpRjtBQUNwRixVQUFRRCxNQUFNLENBQUNFLElBQWY7QUFDSSxTQUFLLFdBQUw7QUFDQSxTQUFLLFlBQUw7QUFDQSxTQUFLLGNBQUw7QUFDSTtBQUNJLFlBQUlDLE9BQU8sR0FBR0osS0FBSyxDQUFDSyxLQUFOLENBQVlKLE1BQU0sQ0FBQ0ssTUFBbkIsQ0FBZDs7QUFDQSxZQUFJLENBQUNGLE9BQUwsRUFBYTtBQUNUQSxVQUFBQSxPQUFPLEdBQUcsSUFBSUcsWUFBSixDQUFVLEVBQVYsRUFBYSxFQUFiLENBQVY7QUFDQUgsVUFBQUEsT0FBTyxDQUFDSSxFQUFSLEdBQWFQLE1BQU0sQ0FBQ0ssTUFBcEI7QUFDSDs7QUFDREYsUUFBQUEsT0FBTyxtQ0FBT0EsT0FBUCxHQUFtQkgsTUFBTSxDQUFDUSxPQUExQixDQUFQO0FBRUEsK0NBQ09ULEtBRFA7QUFFSUssVUFBQUEsS0FBSyxrQ0FDRUwsS0FBSyxDQUFDSyxLQURSO0FBRUQsYUFBQ0osTUFBTSxDQUFDSyxNQUFSLEdBQWlCRjtBQUZoQjtBQUZUO0FBT0g7O0FBRUw7QUFDSSxhQUFPSixLQUFQO0FBdEJSO0FBd0JIIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWN0aW9uIH0gZnJvbSBcIi4uLy4uL2RhdGFNb2RlbHMvQWN0aW9uXCJcclxuaW1wb3J0IHsgUnNEYXRhIH0gZnJvbSBcIi4uLy4uL2RhdGFNb2RlbHMvUnNEYXRhXCJcclxuaW1wb3J0IHsgQ2xhaW0gfSBmcm9tIFwiLi4vLi4vZGF0YU1vZGVscy9DbGFpbVwiXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gY2xhaW1zKHN0YXRlOiBSc0RhdGEsIGFjdGlvbjogQWN0aW9uLCByZXZlcnNlOiBib29sZWFuID0gZmFsc2UpOiBSc0RhdGEge1xyXG4gICAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xyXG4gICAgICAgIGNhc2UgXCJhZGRfY2xhaW1cIjpcclxuICAgICAgICBjYXNlIFwic3luY19jbGFpbVwiOlxyXG4gICAgICAgIGNhc2UgXCJtb2RpZnlfY2xhaW1cIjpcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbGV0IG5ld0l0ZW0gPSBzdGF0ZS5pdGVtc1thY3Rpb24uZGF0YUlkXSBhcyBDbGFpbVxyXG4gICAgICAgICAgICAgICAgaWYgKCFuZXdJdGVtKXtcclxuICAgICAgICAgICAgICAgICAgICBuZXdJdGVtID0gbmV3IENsYWltKFwiXCIsXCJcIilcclxuICAgICAgICAgICAgICAgICAgICBuZXdJdGVtLmlkID0gYWN0aW9uLmRhdGFJZFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgbmV3SXRlbSA9IHsuLi5uZXdJdGVtLCAuLi5hY3Rpb24ubmV3RGF0YX1cclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICAuLi5zdGF0ZSxcclxuICAgICAgICAgICAgICAgICAgICBpdGVtczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAuLi5zdGF0ZS5pdGVtcyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgW2FjdGlvbi5kYXRhSWRdOiBuZXdJdGVtLFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gYXMgUnNEYXRhXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgcmV0dXJuIHN0YXRlXHJcbiAgICB9XHJcbn0iXX0=