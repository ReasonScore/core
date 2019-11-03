"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Claim = void 0;

var _Type = require("./Type");

var _newId = require("../newId");

var _End = _interopRequireDefault(require("./End"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Claim = function Claim() {
  var content = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
  var id = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : (0, _newId.newId)();
  var version = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : (0, _newId.newId)();
  var start = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : new Date().toISOString();
  var end = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : _End["default"];
  var reversable = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;

  _classCallCheck(this, Claim);

  this.content = content;
  this.id = id;
  this.version = version;
  this.start = start;
  this.end = end;
  this.reversable = reversable;

  _defineProperty(this, "type", _Type.Type.claim);
};

exports.Claim = Claim;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kYXRhTW9kZWxzL0NsYWltLnRzIl0sIm5hbWVzIjpbIkNsYWltIiwiY29udGVudCIsImlkIiwidmVyc2lvbiIsInN0YXJ0IiwiRGF0ZSIsInRvSVNPU3RyaW5nIiwiZW5kIiwiRW5kIiwicmV2ZXJzYWJsZSIsIlR5cGUiLCJjbGFpbSJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUNBOztBQUNBOztBQUNBOzs7Ozs7OztJQUdhQSxLLEdBR1QsaUJBT0U7QUFBQSxNQU5TQyxPQU1ULHVFQU4yQixFQU0zQjtBQUFBLE1BTFNDLEVBS1QsdUVBTGtCLG1CQUtsQjtBQUFBLE1BSlNDLE9BSVQsdUVBSnVCLG1CQUl2QjtBQUFBLE1BSFNDLEtBR1QsdUVBSHlCLElBQUlDLElBQUosR0FBV0MsV0FBWCxFQUd6QjtBQUFBLE1BRlNDLEdBRVQsdUVBRnVCQyxlQUV2QjtBQUFBLE1BRFNDLFVBQ1QsdUVBRCtCLEtBQy9COztBQUFBOztBQUFBLE9BTlNSLE9BTVQsR0FOU0EsT0FNVDtBQUFBLE9BTFNDLEVBS1QsR0FMU0EsRUFLVDtBQUFBLE9BSlNDLE9BSVQsR0FKU0EsT0FJVDtBQUFBLE9BSFNDLEtBR1QsR0FIU0EsS0FHVDtBQUFBLE9BRlNHLEdBRVQsR0FGU0EsR0FFVDtBQUFBLE9BRFNFLFVBQ1QsR0FEU0EsVUFDVDs7QUFBQSxnQ0FUV0MsV0FBS0MsS0FTaEI7QUFDRCxDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSXRlbSB9IGZyb20gXCIuL0l0ZW1cIjtcclxuaW1wb3J0IHsgVHlwZSB9IGZyb20gXCIuL1R5cGVcIjtcclxuaW1wb3J0IHsgbmV3SWQgfSBmcm9tIFwiLi4vbmV3SWRcIjtcclxuaW1wb3J0IEVuZCBmcm9tIFwiLi9FbmRcIjtcclxuaW1wb3J0IHsgSWQgfSBmcm9tIFwiLi9JZFwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIENsYWltIGltcGxlbWVudHMgSXRlbSB7XHJcbiAgICB0eXBlOiBUeXBlID0gVHlwZS5jbGFpbVxyXG4gICAgXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwdWJsaWMgY29udGVudDogc3RyaW5nID0gXCJcIixcclxuICAgICAgICBwdWJsaWMgaWQ6IElkID0gbmV3SWQoKSxcclxuICAgICAgICBwdWJsaWMgdmVyc2lvbjogSWQgPSBuZXdJZCgpLFxyXG4gICAgICAgIHB1YmxpYyBzdGFydDogc3RyaW5nID0gbmV3IERhdGUoKS50b0lTT1N0cmluZygpLFxyXG4gICAgICAgIHB1YmxpYyBlbmQ6IHN0cmluZyA9IEVuZCxcclxuICAgICAgICBwdWJsaWMgcmV2ZXJzYWJsZTogYm9vbGVhbiA9IGZhbHNlLFxyXG4gICAgKSB7XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG4iXX0=