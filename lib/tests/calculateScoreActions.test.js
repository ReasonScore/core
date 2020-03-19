"use strict";

var _calculateScoreActions = require("../calculateScoreActions");

var _calculateScore = require("../calculateScore");

var _Claim = require("../dataModels/Claim");

var _Action = require("../dataModels/Action");

var _ClaimEdge = require("../dataModels/ClaimEdge");

var _RepositoryLocalReactive = require("../repositories/RepositoryLocalReactive");

test('add a new scoretree', async () => {
  const repository = new _RepositoryLocalReactive.RepositoryLocalReactive(); // Add a new claim and set it as a score tree top

  const result = await (0, _calculateScoreActions.calculateScoreActions)({
    actions: [new _Action.Action(new _Claim.Claim("", "testClaim"), undefined, "add_claim", "testClaim"), new _Action.Action(undefined, undefined, "add_scoretree", "testClaim")],
    repository: repository,
    calculator: _calculateScore.calculateScore
  });
  expect(result).toMatchObject([{
    "newData": {
      "sourceClaimId": "testClaim",
      "reversible": false,
      "pro": true,
      "affects": "confidence",
      "confidence": 1,
      "relevance": 1 //"id": "Ya3ZeuTmGUZq"

    },
    "oldData": {},
    "type": "add_score" //"dataId": "Ya3ZeuTmGUZq"

  }]);
});
test('Add a child that does not change the top score', async () => {
  const repository = new _RepositoryLocalReactive.RepositoryLocalReactive({
    "actionsLog": [],
    "claims": {
      "testClaim": {
        //"content": "",
        "id": "testClaim",
        "reversible": false,
        "type": "claim"
      },
      "ChildClaim1": {
        //"content": "",
        "id": "ChildClaim1",
        "reversible": false,
        "type": "claim"
      }
    },
    "claimEdges": {},
    "claimEdgeIdsByParentId": {},
    "claimEdgeIdsByChildId": {},
    "scores": {
      "Y9ZapFMMg0Bf": {
        "sourceClaimId": "testClaim",
        "parentScoreId": undefined,
        "reversible": false,
        "pro": true,
        "affects": "confidence",
        "confidence": 1,
        "relevance": 1,
        "id": "Y9ZapFMMg0Bf"
      }
    },
    "scoreIdsByClaimId": {
      "testClaim": ["Y9ZapFMMg0Bf"]
    },
    "childIdsByScoreId": {}
  });
  const result = await (0, _calculateScoreActions.calculateScoreActions)({
    actions: [new _Action.Action(new _ClaimEdge.ClaimEdge("testClaim", "ChildClaim1", undefined, undefined, "ChildClaim1Edge"), undefined, "add_claimEdge", "ChildClaim1Edge")],
    repository: repository,
    calculator: _calculateScore.calculateScore
  });
  expect(result).toMatchObject([{
    "newData": {
      "sourceClaimId": "ChildClaim1",
      "reversible": false,
      "pro": true,
      "affects": "confidence",
      "confidence": 1,
      "relevance": 1,
      "parentScoreId": "Y9ZapFMMg0Bf" //"dataId": "Ya3ZeuTmGUZq"

    },
    "oldData": undefined,
    "type": "add_score" //"dataId": "Ya3ZeuTmGUZq"

  }]);
});
test('Add a child that reverses the top score', async () => {
  const repository = new _RepositoryLocalReactive.RepositoryLocalReactive({
    "actionsLog": [],
    "claims": {
      "testClaim": {
        //"content": "",
        "id": "testClaim",
        "reversible": false,
        "type": "claim"
      },
      "ChildClaim1": {
        //"content": "",
        "id": "ChildClaim1",
        "reversible": false,
        "type": "claim"
      }
    },
    "claimEdges": {},
    "claimEdgeIdsByParentId": {},
    "claimEdgeIdsByChildId": {},
    "scores": {
      "Y9ZapFMMg0Bf": {
        "sourceClaimId": "testClaim",
        "parentScoreId": undefined,
        "reversible": false,
        "pro": true,
        "affects": "confidence",
        "confidence": 1,
        "relevance": 1,
        "id": "Y9ZapFMMg0Bf"
      }
    },
    "scoreIdsByClaimId": {
      "testClaim": ["Y9ZapFMMg0Bf"]
    },
    "childIdsByScoreId": {}
  });
  const result = await (0, _calculateScoreActions.calculateScoreActions)({
    actions: [new _Action.Action(new _ClaimEdge.ClaimEdge("testClaim", "ChildClaim1", undefined, false, "ChildClaim1Edge"), undefined, "add_claimEdge", "ChildClaim1Edge")],
    repository: repository,
    calculator: _calculateScore.calculateScore
  });
  debugger;
  expect(result).toMatchObject([{
    "newData": {
      "sourceClaimId": "ChildClaim1",
      "reversible": false,
      "pro": false,
      "affects": "confidence",
      "confidence": 1,
      "relevance": 1,
      "parentScoreId": "Y9ZapFMMg0Bf" //"dataId": "Ya3ZeuTmGUZq"

    },
    "oldData": undefined,
    "type": "add_score" //"dataId": "Ya3ZeuTmGUZq"

  }, {
    "newData": {
      "sourceClaimId": "testClaim",
      "parentScoreId": undefined,
      "reversible": false,
      "pro": true,
      "affects": "confidence",
      "confidence": 0,
      "relevance": 1 //"id": "Y9ZapFMMg0Bf"

    },
    "oldData": undefined,
    "type": "add_score" //"dataId": "Ya3ZeuTmGUZq"

  }]);
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90ZXN0cy9jYWxjdWxhdGVTY29yZUFjdGlvbnMudGVzdC50cyJdLCJuYW1lcyI6WyJ0ZXN0IiwicmVwb3NpdG9yeSIsIlJlcG9zaXRvcnlMb2NhbFJlYWN0aXZlIiwicmVzdWx0IiwiYWN0aW9ucyIsIkFjdGlvbiIsIkNsYWltIiwidW5kZWZpbmVkIiwiY2FsY3VsYXRvciIsImNhbGN1bGF0ZVNjb3JlIiwiZXhwZWN0IiwidG9NYXRjaE9iamVjdCIsIkNsYWltRWRnZSJdLCJtYXBwaW5ncyI6Ijs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFJQUEsSUFBSSxDQUFDLHFCQUFELEVBQXdCLFlBQVk7QUFDdEMsUUFBTUMsVUFBVSxHQUFHLElBQUlDLGdEQUFKLEVBQW5CLENBRHNDLENBRXRDOztBQUNBLFFBQU1DLE1BQU0sR0FBRyxNQUFNLGtEQUFzQjtBQUN6Q0MsSUFBQUEsT0FBTyxFQUFFLENBQ1AsSUFBSUMsY0FBSixDQUFXLElBQUlDLFlBQUosQ0FBVSxFQUFWLEVBQWMsV0FBZCxDQUFYLEVBQXVDQyxTQUF2QyxFQUFrRCxXQUFsRCxFQUErRCxXQUEvRCxDQURPLEVBRVAsSUFBSUYsY0FBSixDQUFXRSxTQUFYLEVBQXNCQSxTQUF0QixFQUFpQyxlQUFqQyxFQUFrRCxXQUFsRCxDQUZPLENBRGdDO0FBS3pDTixJQUFBQSxVQUFVLEVBQUVBLFVBTDZCO0FBTXpDTyxJQUFBQSxVQUFVLEVBQUVDO0FBTjZCLEdBQXRCLENBQXJCO0FBU0FDLEVBQUFBLE1BQU0sQ0FBQ1AsTUFBRCxDQUFOLENBQWVRLGFBQWYsQ0FDRSxDQUFDO0FBQ0MsZUFDQTtBQUNFLHVCQUFpQixXQURuQjtBQUVFLG9CQUFjLEtBRmhCO0FBR0UsYUFBTyxJQUhUO0FBSUUsaUJBQVcsWUFKYjtBQUtFLG9CQUFjLENBTGhCO0FBTUUsbUJBQWEsQ0FOZixDQU9FOztBQVBGLEtBRkQ7QUFVSSxlQUFXLEVBVmY7QUFXQyxZQUFRLFdBWFQsQ0FZQzs7QUFa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QTFDLEVBQXFELEtBQXJELEVBQTRELGlCQUE1RCxDQUFYLEVBQTJGQSxTQUEzRixFQUFzRyxlQUF0RyxFQUF1SCxpQkFBdkgsQ0FETyxDQURnQztBQUl6Q04sSUFBQUEsVUFBVSxFQUFFQSxVQUo2QjtBQUt6Q08sSUFBQUEsVUFBVSxFQUFFQztBQUw2QixHQUF0QixDQUFyQjtBQU9GO0FBQ0VDLEVBQUFBLE1BQU0sQ0FBQ1AsTUFBRCxDQUFOLENBQWVRLGFBQWYsQ0FDRSxDQUNFO0FBQ0UsZUFDQTtBQUNFLHVCQUFpQixhQURuQjtBQUVFLG9CQUFjLEtBRmhCO0FBR0UsYUFBTyxLQUhUO0FBSUUsaUJBQVcsWUFKYjtBQUtFLG9CQUFjLENBTGhCO0FBTUUsbUJBQWEsQ0FOZjtBQU9FLHVCQUFpQixjQVBuQixDQVFFOztBQVJGLEtBRkY7QUFXSyxlQUFXSixTQVhoQjtBQVlFLFlBQVEsV0FaVixDQWFFOztBQWJGLEdBREYsRUFnQkU7QUFDRSxlQUNBO0FBQ0UsdUJBQWlCLFdBRG5CO0FBRUUsdUJBQWlCQSxTQUZuQjtBQUdFLG9CQUFjLEtBSGhCO0FBSUUsYUFBTyxJQUpUO0FBS0UsaUJBQVcsWUFMYjtBQU1FLG9CQUFjLENBTmhCO0FBT0UsbUJBQWEsQ0FQZixDQVFFOztBQVJGLEtBRkY7QUFXSyxlQUFXQSxTQVhoQjtBQVlFLFlBQVEsV0FaVixDQWFFOztBQWJGLEdBaEJGLENBREY7QUFtQ0QsQ0FuRkcsQ0FBSiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFJlcG9zaXRvcnlMb2NhbFB1cmUgfSBmcm9tIFwiLi4vcmVwb3NpdG9yaWVzL1JlcG9zaXRvcnlMb2NhbFB1cmVcIjtcclxuaW1wb3J0IHsgY2FsY3VsYXRlU2NvcmVBY3Rpb25zIH0gZnJvbSBcIi4uL2NhbGN1bGF0ZVNjb3JlQWN0aW9uc1wiO1xyXG5pbXBvcnQgeyBjYWxjdWxhdGVTY29yZSB9IGZyb20gXCIuLi9jYWxjdWxhdGVTY29yZVwiO1xyXG5pbXBvcnQgeyBDbGFpbSB9IGZyb20gXCIuLi9kYXRhTW9kZWxzL0NsYWltXCI7XHJcbmltcG9ydCB7IEFjdGlvbiB9IGZyb20gXCIuLi9kYXRhTW9kZWxzL0FjdGlvblwiO1xyXG5pbXBvcnQgeyBDbGFpbUVkZ2UgfSBmcm9tIFwiLi4vZGF0YU1vZGVscy9DbGFpbUVkZ2VcIjtcclxuaW1wb3J0IHsgUmVwb3NpdG9yeUxvY2FsUmVhY3RpdmUgfSBmcm9tIFwiLi4vcmVwb3NpdG9yaWVzL1JlcG9zaXRvcnlMb2NhbFJlYWN0aXZlXCI7XHJcbmltcG9ydCB7IFNjb3JlIH0gZnJvbSBcIi4uL2RhdGFNb2RlbHMvU2NvcmVcIjtcclxuXHJcblxyXG50ZXN0KCdhZGQgYSBuZXcgc2NvcmV0cmVlJywgYXN5bmMgKCkgPT4ge1xyXG4gIGNvbnN0IHJlcG9zaXRvcnkgPSBuZXcgUmVwb3NpdG9yeUxvY2FsUmVhY3RpdmUoKTtcclxuICAvLyBBZGQgYSBuZXcgY2xhaW0gYW5kIHNldCBpdCBhcyBhIHNjb3JlIHRyZWUgdG9wXHJcbiAgY29uc3QgcmVzdWx0ID0gYXdhaXQgY2FsY3VsYXRlU2NvcmVBY3Rpb25zKHtcclxuICAgIGFjdGlvbnM6IFtcclxuICAgICAgbmV3IEFjdGlvbihuZXcgQ2xhaW0oXCJcIiwgXCJ0ZXN0Q2xhaW1cIiksIHVuZGVmaW5lZCwgXCJhZGRfY2xhaW1cIiwgXCJ0ZXN0Q2xhaW1cIiksXHJcbiAgICAgIG5ldyBBY3Rpb24odW5kZWZpbmVkLCB1bmRlZmluZWQsIFwiYWRkX3Njb3JldHJlZVwiLCBcInRlc3RDbGFpbVwiKVxyXG4gICAgXSxcclxuICAgIHJlcG9zaXRvcnk6IHJlcG9zaXRvcnksXHJcbiAgICBjYWxjdWxhdG9yOiBjYWxjdWxhdGVTY29yZVxyXG4gIH0pXHJcblxyXG4gIGV4cGVjdChyZXN1bHQpLnRvTWF0Y2hPYmplY3QoXHJcbiAgICBbe1xyXG4gICAgICBcIm5ld0RhdGFcIjpcclxuICAgICAge1xyXG4gICAgICAgIFwic291cmNlQ2xhaW1JZFwiOiBcInRlc3RDbGFpbVwiLFxyXG4gICAgICAgIFwicmV2ZXJzaWJsZVwiOiBmYWxzZSxcclxuICAgICAgICBcInByb1wiOiB0cnVlLFxyXG4gICAgICAgIFwiYWZmZWN0c1wiOiBcImNvbmZpZGVuY2VcIixcclxuICAgICAgICBcImNvbmZpZGVuY2VcIjogMSxcclxuICAgICAgICBcInJlbGV2YW5jZVwiOiAxLFxyXG4gICAgICAgIC8vXCJpZFwiOiBcIllhM1pldVRtR1VacVwiXHJcbiAgICAgIH0sIFwib2xkRGF0YVwiOiB7fSxcclxuICAgICAgXCJ0eXBlXCI6IFwiYWRkX3Njb3JlXCIsXHJcbiAgICAgIC8vXCJkYXRhSWRcIjogXCJZYTNaZXVUbUdVWnFcIlxyXG4gICAgfV1cclxuICApXHJcbn0pO1xyXG5cclxudGVzdCgnQWRkIGEgY2hpbGQgdGhhdCBkb2VzIG5vdCBjaGFuZ2UgdGhlIHRvcCBzY29yZScsIGFzeW5jICgpID0+IHtcclxuICBjb25zdCByZXBvc2l0b3J5ID0gbmV3IFJlcG9zaXRvcnlMb2NhbFJlYWN0aXZlKHtcclxuICAgIFwiYWN0aW9uc0xvZ1wiOiBbXSxcclxuICAgIFwiY2xhaW1zXCI6IHtcclxuICAgICAgXCJ0ZXN0Q2xhaW1cIjoge1xyXG4gICAgICAgIC8vXCJjb250ZW50XCI6IFwiXCIsXHJcbiAgICAgICAgXCJpZFwiOiBcInRlc3RDbGFpbVwiLFxyXG4gICAgICAgIFwicmV2ZXJzaWJsZVwiOiBmYWxzZSxcclxuICAgICAgICBcInR5cGVcIjogXCJjbGFpbVwiXHJcbiAgICAgIH0sXHJcbiAgICAgIFwiQ2hpbGRDbGFpbTFcIjoge1xyXG4gICAgICAgIC8vXCJjb250ZW50XCI6IFwiXCIsXHJcbiAgICAgICAgXCJpZFwiOiBcIkNoaWxkQ2xhaW0xXCIsXHJcbiAgICAgICAgXCJyZXZlcnNpYmxlXCI6IGZhbHNlLFxyXG4gICAgICAgIFwidHlwZVwiOiBcImNsYWltXCJcclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIFwiY2xhaW1FZGdlc1wiOiB7fSxcclxuICAgIFwiY2xhaW1FZGdlSWRzQnlQYXJlbnRJZFwiOiB7fSxcclxuICAgIFwiY2xhaW1FZGdlSWRzQnlDaGlsZElkXCI6IHt9LFxyXG4gICAgXCJzY29yZXNcIjoge1xyXG4gICAgICBcIlk5WmFwRk1NZzBCZlwiOiB7XHJcbiAgICAgICAgXCJzb3VyY2VDbGFpbUlkXCI6IFwidGVzdENsYWltXCIsXHJcbiAgICAgICAgXCJwYXJlbnRTY29yZUlkXCI6IHVuZGVmaW5lZCxcclxuICAgICAgICBcInJldmVyc2libGVcIjogZmFsc2UsXHJcbiAgICAgICAgXCJwcm9cIjogdHJ1ZSxcclxuICAgICAgICBcImFmZmVjdHNcIjogXCJjb25maWRlbmNlXCIsXHJcbiAgICAgICAgXCJjb25maWRlbmNlXCI6IDEsXHJcbiAgICAgICAgXCJyZWxldmFuY2VcIjogMSxcclxuICAgICAgICBcImlkXCI6IFwiWTlaYXBGTU1nMEJmXCJcclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIFwic2NvcmVJZHNCeUNsYWltSWRcIjoge1xyXG4gICAgICBcInRlc3RDbGFpbVwiOiBbXHJcbiAgICAgICAgXCJZOVphcEZNTWcwQmZcIlxyXG4gICAgICBdXHJcbiAgICB9LFxyXG4gICAgXCJjaGlsZElkc0J5U2NvcmVJZFwiOiB7fVxyXG4gIH0pO1xyXG5cclxuICBjb25zdCByZXN1bHQgPSBhd2FpdCBjYWxjdWxhdGVTY29yZUFjdGlvbnMoe1xyXG4gICAgYWN0aW9uczogW1xyXG4gICAgICBuZXcgQWN0aW9uKG5ldyBDbGFpbUVkZ2UoXCJ0ZXN0Q2xhaW1cIiwgXCJDaGlsZENsYWltMVwiLCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgXCJDaGlsZENsYWltMUVkZ2VcIiksIHVuZGVmaW5lZCwgXCJhZGRfY2xhaW1FZGdlXCIsIFwiQ2hpbGRDbGFpbTFFZGdlXCIpXHJcbiAgICBdLFxyXG4gICAgcmVwb3NpdG9yeTogcmVwb3NpdG9yeSxcclxuICAgIGNhbGN1bGF0b3I6IGNhbGN1bGF0ZVNjb3JlXHJcbiAgfSlcclxuXHJcbiAgZXhwZWN0KHJlc3VsdCkudG9NYXRjaE9iamVjdChcclxuICAgIFtcclxuICAgICAge1xyXG4gICAgICAgIFwibmV3RGF0YVwiOlxyXG4gICAgICAgIHtcclxuICAgICAgICAgIFwic291cmNlQ2xhaW1JZFwiOiBcIkNoaWxkQ2xhaW0xXCIsXHJcbiAgICAgICAgICBcInJldmVyc2libGVcIjogZmFsc2UsXHJcbiAgICAgICAgICBcInByb1wiOiB0cnVlLFxyXG4gICAgICAgICAgXCJhZmZlY3RzXCI6IFwiY29uZmlkZW5jZVwiLFxyXG4gICAgICAgICAgXCJjb25maWRlbmNlXCI6IDEsXHJcbiAgICAgICAgICBcInJlbGV2YW5jZVwiOiAxLFxyXG4gICAgICAgICAgXCJwYXJlbnRTY29yZUlkXCI6IFwiWTlaYXBGTU1nMEJmXCJcclxuICAgICAgICAgIC8vXCJkYXRhSWRcIjogXCJZYTNaZXVUbUdVWnFcIlxyXG4gICAgICAgIH0sIFwib2xkRGF0YVwiOiB1bmRlZmluZWQsXHJcbiAgICAgICAgXCJ0eXBlXCI6IFwiYWRkX3Njb3JlXCIsXHJcbiAgICAgICAgLy9cImRhdGFJZFwiOiBcIllhM1pldVRtR1VacVwiXHJcbiAgICAgIH1cclxuICAgIF1cclxuICApXHJcblxyXG59KTtcclxuXHJcbnRlc3QoJ0FkZCBhIGNoaWxkIHRoYXQgcmV2ZXJzZXMgdGhlIHRvcCBzY29yZScsIGFzeW5jICgpID0+IHtcclxuICBjb25zdCByZXBvc2l0b3J5ID0gbmV3IFJlcG9zaXRvcnlMb2NhbFJlYWN0aXZlKHtcclxuICAgIFwiYWN0aW9uc0xvZ1wiOiBbXSxcclxuICAgIFwiY2xhaW1zXCI6IHtcclxuICAgICAgXCJ0ZXN0Q2xhaW1cIjoge1xyXG4gICAgICAgIC8vXCJjb250ZW50XCI6IFwiXCIsXHJcbiAgICAgICAgXCJpZFwiOiBcInRlc3RDbGFpbVwiLFxyXG4gICAgICAgIFwicmV2ZXJzaWJsZVwiOiBmYWxzZSxcclxuICAgICAgICBcInR5cGVcIjogXCJjbGFpbVwiXHJcbiAgICAgIH0sXHJcbiAgICAgIFwiQ2hpbGRDbGFpbTFcIjoge1xyXG4gICAgICAgIC8vXCJjb250ZW50XCI6IFwiXCIsXHJcbiAgICAgICAgXCJpZFwiOiBcIkNoaWxkQ2xhaW0xXCIsXHJcbiAgICAgICAgXCJyZXZlcnNpYmxlXCI6IGZhbHNlLFxyXG4gICAgICAgIFwidHlwZVwiOiBcImNsYWltXCJcclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIFwiY2xhaW1FZGdlc1wiOiB7fSxcclxuICAgIFwiY2xhaW1FZGdlSWRzQnlQYXJlbnRJZFwiOiB7fSxcclxuICAgIFwiY2xhaW1FZGdlSWRzQnlDaGlsZElkXCI6IHt9LFxyXG4gICAgXCJzY29yZXNcIjoge1xyXG4gICAgICBcIlk5WmFwRk1NZzBCZlwiOiB7XHJcbiAgICAgICAgXCJzb3VyY2VDbGFpbUlkXCI6IFwidGVzdENsYWltXCIsXHJcbiAgICAgICAgXCJwYXJlbnRTY29yZUlkXCI6IHVuZGVmaW5lZCxcclxuICAgICAgICBcInJldmVyc2libGVcIjogZmFsc2UsXHJcbiAgICAgICAgXCJwcm9cIjogdHJ1ZSxcclxuICAgICAgICBcImFmZmVjdHNcIjogXCJjb25maWRlbmNlXCIsXHJcbiAgICAgICAgXCJjb25maWRlbmNlXCI6IDEsXHJcbiAgICAgICAgXCJyZWxldmFuY2VcIjogMSxcclxuICAgICAgICBcImlkXCI6IFwiWTlaYXBGTU1nMEJmXCJcclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIFwic2NvcmVJZHNCeUNsYWltSWRcIjoge1xyXG4gICAgICBcInRlc3RDbGFpbVwiOiBbXHJcbiAgICAgICAgXCJZOVphcEZNTWcwQmZcIlxyXG4gICAgICBdXHJcbiAgICB9LFxyXG4gICAgXCJjaGlsZElkc0J5U2NvcmVJZFwiOiB7fVxyXG4gIH0pO1xyXG5cclxuICBjb25zdCByZXN1bHQgPSBhd2FpdCBjYWxjdWxhdGVTY29yZUFjdGlvbnMoe1xyXG4gICAgYWN0aW9uczogW1xyXG4gICAgICBuZXcgQWN0aW9uKG5ldyBDbGFpbUVkZ2UoXCJ0ZXN0Q2xhaW1cIiwgXCJDaGlsZENsYWltMVwiLCB1bmRlZmluZWQsIGZhbHNlLCBcIkNoaWxkQ2xhaW0xRWRnZVwiKSwgdW5kZWZpbmVkLCBcImFkZF9jbGFpbUVkZ2VcIiwgXCJDaGlsZENsYWltMUVkZ2VcIilcclxuICAgIF0sXHJcbiAgICByZXBvc2l0b3J5OiByZXBvc2l0b3J5LFxyXG4gICAgY2FsY3VsYXRvcjogY2FsY3VsYXRlU2NvcmVcclxuICB9KVxyXG5kZWJ1Z2dlclxyXG4gIGV4cGVjdChyZXN1bHQpLnRvTWF0Y2hPYmplY3QoXHJcbiAgICBbXHJcbiAgICAgIHtcclxuICAgICAgICBcIm5ld0RhdGFcIjpcclxuICAgICAgICB7XHJcbiAgICAgICAgICBcInNvdXJjZUNsYWltSWRcIjogXCJDaGlsZENsYWltMVwiLFxyXG4gICAgICAgICAgXCJyZXZlcnNpYmxlXCI6IGZhbHNlLFxyXG4gICAgICAgICAgXCJwcm9cIjogZmFsc2UsXHJcbiAgICAgICAgICBcImFmZmVjdHNcIjogXCJjb25maWRlbmNlXCIsXHJcbiAgICAgICAgICBcImNvbmZpZGVuY2VcIjogMSxcclxuICAgICAgICAgIFwicmVsZXZhbmNlXCI6IDEsXHJcbiAgICAgICAgICBcInBhcmVudFNjb3JlSWRcIjogXCJZOVphcEZNTWcwQmZcIlxyXG4gICAgICAgICAgLy9cImRhdGFJZFwiOiBcIllhM1pldVRtR1VacVwiXHJcbiAgICAgICAgfSwgXCJvbGREYXRhXCI6IHVuZGVmaW5lZCxcclxuICAgICAgICBcInR5cGVcIjogXCJhZGRfc2NvcmVcIixcclxuICAgICAgICAvL1wiZGF0YUlkXCI6IFwiWWEzWmV1VG1HVVpxXCJcclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIFwibmV3RGF0YVwiOlxyXG4gICAgICAgIHtcclxuICAgICAgICAgIFwic291cmNlQ2xhaW1JZFwiOiBcInRlc3RDbGFpbVwiLFxyXG4gICAgICAgICAgXCJwYXJlbnRTY29yZUlkXCI6IHVuZGVmaW5lZCxcclxuICAgICAgICAgIFwicmV2ZXJzaWJsZVwiOiBmYWxzZSxcclxuICAgICAgICAgIFwicHJvXCI6IHRydWUsXHJcbiAgICAgICAgICBcImFmZmVjdHNcIjogXCJjb25maWRlbmNlXCIsXHJcbiAgICAgICAgICBcImNvbmZpZGVuY2VcIjogMCxcclxuICAgICAgICAgIFwicmVsZXZhbmNlXCI6IDEsXHJcbiAgICAgICAgICAvL1wiaWRcIjogXCJZOVphcEZNTWcwQmZcIlxyXG4gICAgICAgIH0sIFwib2xkRGF0YVwiOiB1bmRlZmluZWQsXHJcbiAgICAgICAgXCJ0eXBlXCI6IFwiYWRkX3Njb3JlXCIsXHJcbiAgICAgICAgLy9cImRhdGFJZFwiOiBcIllhM1pldVRtR1VacVwiXHJcbiAgICAgIH1cclxuICAgIF1cclxuICApXHJcblxyXG59KTtcclxuXHJcbiJdfQ==