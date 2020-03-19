"use strict";

var _calculateScore = require("../calculateScore");

var _Id = require("../dataModels/Id");

var _ = require("..");

test('complicated test for debugging Messenger', function () {
  var repo = new _.Repository();
  var messenger = new _.Messenger();
  var calculationInitator = new _.CalculationInitator(repo, messenger.notify);
  var topClaim = new _.Claim("Fiction City should convert Elm Street to only pedestrian traffic?", (0, _Id.ID)("1"));
  calculationInitator.notify([new _.Change(topClaim)]);
  expect((0, _calculateScore.calculateScore)().confidence).toBe(1);
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90ZXN0cy9tZXNzZW5nZXIudGVzdC5za2lwLnRzIl0sIm5hbWVzIjpbInRlc3QiLCJyZXBvIiwiUmVwb3NpdG9yeSIsIm1lc3NlbmdlciIsIk1lc3NlbmdlciIsImNhbGN1bGF0aW9uSW5pdGF0b3IiLCJDYWxjdWxhdGlvbkluaXRhdG9yIiwibm90aWZ5IiwidG9wQ2xhaW0iLCJDbGFpbSIsIkNoYW5nZSIsImV4cGVjdCIsImNvbmZpZGVuY2UiLCJ0b0JlIl0sIm1hcHBpbmdzIjoiOztBQUFBOztBQUVBOztBQUdBOztBQUVBQSxJQUFJLENBQUMsMENBQUQsRUFBNkMsWUFBTTtBQUNuRCxNQUFNQyxJQUFJLEdBQUcsSUFBSUMsWUFBSixFQUFiO0FBQ0EsTUFBTUMsU0FBUyxHQUFHLElBQUlDLFdBQUosRUFBbEI7QUFDQSxNQUFNQyxtQkFBbUIsR0FBRyxJQUFJQyxxQkFBSixDQUF3QkwsSUFBeEIsRUFBOEJFLFNBQVMsQ0FBQ0ksTUFBeEMsQ0FBNUI7QUFDQSxNQUFNQyxRQUFRLEdBQUcsSUFBSUMsT0FBSixDQUFVLG9FQUFWLEVBQWdGLFlBQUcsR0FBSCxDQUFoRixDQUFqQjtBQUVBSixFQUFBQSxtQkFBbUIsQ0FBQ0UsTUFBcEIsQ0FBMkIsQ0FDdkIsSUFBSUcsUUFBSixDQUFXRixRQUFYLENBRHVCLENBQTNCO0FBSUFHLEVBQUFBLE1BQU0sQ0FBQyxzQ0FBaUJDLFVBQWxCLENBQU4sQ0FBb0NDLElBQXBDLENBQXlDLENBQXpDO0FBQ0gsQ0FYRyxDQUFKIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY2FsY3VsYXRlU2NvcmUgfSBmcm9tIFwiLi4vY2FsY3VsYXRlU2NvcmVcIjtcclxuaW1wb3J0IHsgU2NvcmUgfSBmcm9tIFwiLi4vZGF0YU1vZGVscy9TY29yZVwiO1xyXG5pbXBvcnQgeyBJRCB9IGZyb20gXCIuLi9kYXRhTW9kZWxzL0lkXCI7XHJcbmltcG9ydCB7IFNjb3JlQW5kQ2xhaW1FZGdlIH0gZnJvbSBcIi4uL2RhdGFNb2RlbHMvU2NvcmVBbmRDbGFpbUVkZ2VcIjtcclxuaW1wb3J0IHsgQ2xhaW1FZGdlIH0gZnJvbSBcIi4uL2RhdGFNb2RlbHMvQ2xhaW1FZGdlXCI7XHJcbmltcG9ydCB7IFJlcG9zaXRvcnksIE1lc3NlbmdlciwgQ2FsY3VsYXRpb25Jbml0YXRvciwgQ2xhaW0sIENoYW5nZSwgQWZmZWN0cyB9IGZyb20gXCIuLlwiO1xyXG5cclxudGVzdCgnY29tcGxpY2F0ZWQgdGVzdCBmb3IgZGVidWdnaW5nIE1lc3NlbmdlcicsICgpID0+IHtcclxuICAgIGNvbnN0IHJlcG8gPSBuZXcgUmVwb3NpdG9yeSgpO1xyXG4gICAgY29uc3QgbWVzc2VuZ2VyID0gbmV3IE1lc3NlbmdlcigpO1xyXG4gICAgY29uc3QgY2FsY3VsYXRpb25Jbml0YXRvciA9IG5ldyBDYWxjdWxhdGlvbkluaXRhdG9yKHJlcG8sIG1lc3Nlbmdlci5ub3RpZnkpO1xyXG4gICAgY29uc3QgdG9wQ2xhaW0gPSBuZXcgQ2xhaW0oXCJGaWN0aW9uIENpdHkgc2hvdWxkIGNvbnZlcnQgRWxtIFN0cmVldCB0byBvbmx5IHBlZGVzdHJpYW4gdHJhZmZpYz9cIiwgSUQoXCIxXCIpKTtcclxuXHJcbiAgICBjYWxjdWxhdGlvbkluaXRhdG9yLm5vdGlmeShbXHJcbiAgICAgICAgbmV3IENoYW5nZSh0b3BDbGFpbSksXHJcbiAgICBdKTtcclxuXHJcbiAgICBleHBlY3QoY2FsY3VsYXRlU2NvcmUoKS5jb25maWRlbmNlKS50b0JlKDEpO1xyXG59KTtcclxuXHJcbiJdfQ==