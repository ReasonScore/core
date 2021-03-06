"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.itemChangesTests = itemChangesTests;

var _hasItemChanged = require("../utils/hasItemChanged");

function itemChangesTests() {
  test('Items Changes', async () => {
    const result = (0, _hasItemChanged.itemChanges)({
      a: "a",
      b: "not B",
      newProp: "New data"
    }, {
      a: "a",
      b: "b"
    });
    expect(result === null || result === void 0 ? void 0 : result.partialNewItem).toEqual({
      b: "not B",
      newProp: "New data"
    });
    expect(result === null || result === void 0 ? void 0 : result.partialOldItem).toEqual({
      b: "b"
    });
  });
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90ZXN0cy9pdGVtQ2hhbmdlc1Rlc3RzLnRzIl0sIm5hbWVzIjpbIml0ZW1DaGFuZ2VzVGVzdHMiLCJ0ZXN0IiwicmVzdWx0IiwiYSIsImIiLCJuZXdQcm9wIiwiZXhwZWN0IiwicGFydGlhbE5ld0l0ZW0iLCJ0b0VxdWFsIiwicGFydGlhbE9sZEl0ZW0iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFFTyxTQUFTQSxnQkFBVCxHQUE0QjtBQUMvQkMsRUFBQUEsSUFBSSxDQUFDLGVBQUQsRUFBa0IsWUFBWTtBQUM5QixVQUFNQyxNQUFNLEdBQUcsaUNBQ1g7QUFDSUMsTUFBQUEsQ0FBQyxFQUFFLEdBRFA7QUFFSUMsTUFBQUEsQ0FBQyxFQUFFLE9BRlA7QUFHSUMsTUFBQUEsT0FBTyxFQUFFO0FBSGIsS0FEVyxFQU1YO0FBQ0lGLE1BQUFBLENBQUMsRUFBRSxHQURQO0FBRUlDLE1BQUFBLENBQUMsRUFBRTtBQUZQLEtBTlcsQ0FBZjtBQVlBRSxJQUFBQSxNQUFNLENBQUNKLE1BQUQsYUFBQ0EsTUFBRCx1QkFBQ0EsTUFBTSxDQUFFSyxjQUFULENBQU4sQ0FBK0JDLE9BQS9CLENBQXVDO0FBQ25DSixNQUFBQSxDQUFDLEVBQUUsT0FEZ0M7QUFFbkNDLE1BQUFBLE9BQU8sRUFBRTtBQUYwQixLQUF2QztBQUtBQyxJQUFBQSxNQUFNLENBQUNKLE1BQUQsYUFBQ0EsTUFBRCx1QkFBQ0EsTUFBTSxDQUFFTyxjQUFULENBQU4sQ0FBK0JELE9BQS9CLENBQXVDO0FBQ25DSixNQUFBQSxDQUFDLEVBQUU7QUFEZ0MsS0FBdkM7QUFHSCxHQXJCRyxDQUFKO0FBc0JIIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgaXRlbUNoYW5nZXMgfSBmcm9tIFwiLi4vdXRpbHMvaGFzSXRlbUNoYW5nZWRcIlxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGl0ZW1DaGFuZ2VzVGVzdHMoKSB7XHJcbiAgICB0ZXN0KCdJdGVtcyBDaGFuZ2VzJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IGl0ZW1DaGFuZ2VzKFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBhOiBcImFcIixcclxuICAgICAgICAgICAgICAgIGI6IFwibm90IEJcIixcclxuICAgICAgICAgICAgICAgIG5ld1Byb3A6IFwiTmV3IGRhdGFcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgYTogXCJhXCIsXHJcbiAgICAgICAgICAgICAgICBiOiBcImJcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICApXHJcblxyXG4gICAgICAgIGV4cGVjdChyZXN1bHQ/LnBhcnRpYWxOZXdJdGVtKS50b0VxdWFsKHtcclxuICAgICAgICAgICAgYjogXCJub3QgQlwiLFxyXG4gICAgICAgICAgICBuZXdQcm9wOiBcIk5ldyBkYXRhXCIsXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGV4cGVjdChyZXN1bHQ/LnBhcnRpYWxPbGRJdGVtKS50b0VxdWFsKHtcclxuICAgICAgICAgICAgYjogXCJiXCIsXHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxufVxyXG4iXX0=