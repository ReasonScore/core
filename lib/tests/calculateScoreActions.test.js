"use strict";

var _RepositoryLocalPure = require("../repositories/RepositoryLocalPure");

var _calculateScoreActions = require("../calculateScoreActions");

var _calculateScore = require("../calculateScore");

var _Claim = require("../dataModels/Claim");

var _Action = require("../dataModels/Action");

var _ClaimEdge = require("../dataModels/ClaimEdge");

var _Score = require("../dataModels/Score");

//import { RepositoryLocalReactive } from "../repositories/RepositoryLocalReactive";
test('add a new scoretree', async () => {
  const repository = new _RepositoryLocalPure.RepositoryLocalPure(); // Add a new claim and set it as a score tree top

  const newScore = new _Score.Score("testClaim");
  const result = await (0, _calculateScoreActions.calculateScoreActions)({
    actions: [new _Action.Action(new _Claim.Claim("", "testClaim"), undefined, "add_claim", "testClaim"), new _Action.Action(newScore, undefined, "add_score", newScore.id)],
    repository: repository,
    calculator: _calculateScore.calculateScore
  });
  debugger;
  expect(repository.rsData.scoreIdsByClaimId["testClaim"].length).toEqual(1);
});
test('Add a child that does not change the top score', async () => {
  const repository = new _RepositoryLocalPure.RepositoryLocalPure({
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
  const repository = new _RepositoryLocalPure.RepositoryLocalPure({
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90ZXN0cy9jYWxjdWxhdGVTY29yZUFjdGlvbnMudGVzdC50cyJdLCJuYW1lcyI6WyJ0ZXN0IiwicmVwb3NpdG9yeSIsIlJlcG9zaXRvcnlMb2NhbFB1cmUiLCJuZXdTY29yZSIsIlNjb3JlIiwicmVzdWx0IiwiYWN0aW9ucyIsIkFjdGlvbiIsIkNsYWltIiwidW5kZWZpbmVkIiwiaWQiLCJjYWxjdWxhdG9yIiwiY2FsY3VsYXRlU2NvcmUiLCJleHBlY3QiLCJyc0RhdGEiLCJzY29yZUlkc0J5Q2xhaW1JZCIsImxlbmd0aCIsInRvRXF1YWwiLCJDbGFpbUVkZ2UiLCJ0b01hdGNoT2JqZWN0Il0sIm1hcHBpbmdzIjoiOztBQUFBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBO0FBR0FBLElBQUksQ0FBQyxxQkFBRCxFQUF3QixZQUFZO0FBQ3RDLFFBQU1DLFVBQVUsR0FBRyxJQUFJQyx3Q0FBSixFQUFuQixDQURzQyxDQUV0Qzs7QUFDQSxRQUFNQyxRQUFRLEdBQUcsSUFBSUMsWUFBSixDQUFVLFdBQVYsQ0FBakI7QUFDQSxRQUFNQyxNQUFNLEdBQUcsTUFBTSxrREFBc0I7QUFDekNDLElBQUFBLE9BQU8sRUFBRSxDQUNQLElBQUlDLGNBQUosQ0FBVyxJQUFJQyxZQUFKLENBQVUsRUFBVixFQUFjLFdBQWQsQ0FBWCxFQUF1Q0MsU0FBdkMsRUFBa0QsV0FBbEQsRUFBK0QsV0FBL0QsQ0FETyxFQUVQLElBQUlGLGNBQUosQ0FBV0osUUFBWCxFQUFxQk0sU0FBckIsRUFBZ0MsV0FBaEMsRUFBNkNOLFFBQVEsQ0FBQ08sRUFBdEQsQ0FGTyxDQURnQztBQUt6Q1QsSUFBQUEsVUFBVSxFQUFFQSxVQUw2QjtBQU16Q1UsSUFBQUEsVUFBVSxFQUFFQztBQU42QixHQUF0QixDQUFyQjtBQVFGO0FBQ0VDLEVBQUFBLE1BQU0sQ0FBQ1osVUFBVSxDQUFDYSxNQUFYLENBQWtCQyxpQkFBbEIsQ0FBb0MsV0FBcEMsRUFBaURDLE1BQWxELENBQU4sQ0FBZ0VDLE9BQWhFLENBQXdFLENBQXhFO0FBQ0QsQ0FkRyxDQUFKO0FBZ0JBakIsSUFBSSxDQUFDLGdEQUFELEVBQW1ELFlBQVk7QUFDakUsUUFBTUMsVUFBVSxHQUFHLElBQUlDLHdDQUFKLENBQXdCO0FBQ3pDLGtCQUFjLEVBRDJCO0FBRXpDLGNBQVU7QUFDUixtQkFBYTtBQUNYO0FBQ0EsY0FBTSxXQUZLO0FBR1gsc0JBQWMsS0FISDtBQUlYLGdCQUFRO0FBSkcsT0FETDtBQU9SLHFCQUFlO0FBQ2I7QUFDQSxjQUFNLGFBRk87QUFHYixzQkFBYyxLQUhEO0FBSWIsZ0JBQVE7QUFKSztBQVBQLEtBRitCO0FBZ0J6QyxrQkFBYyxFQWhCMkI7QUFpQnpDLDhCQUEwQixFQWpCZTtBQWtCekMsNkJBQXlCLEVBbEJnQjtBQW1CekMsY0FBVTtBQUNSLHNCQUFnQjtBQUNkLHlCQUFpQixXQURIO0FBRWQseUJBQWlCTyxTQUZIO0FBR2Qsc0JBQWMsS0FIQTtBQUlkLGVBQU8sSUFKTztBQUtkLG1CQUFXLFlBTEc7QUFNZCxzQkFBYyxDQU5BO0FBT2QscUJBQWEsQ0FQQztBQVFkLGNBQU07QUFSUTtBQURSLEtBbkIrQjtBQStCekMseUJBQXFCO0FBQ25CLG1CQUFhLENBQ1gsY0FEVztBQURNLEtBL0JvQjtBQW9DekMseUJBQXFCO0FBcENvQixHQUF4QixDQUFuQjtBQXVDQSxRQUFNSixNQUFNLEdBQUcsTUFBTSxrREFBc0I7QUFDekNDLElBQUFBLE9BQU8sRUFBRSxDQUNQLElBQUlDLGNBQUosQ0FBVyxJQUFJVyxvQkFBSixDQUFjLFdBQWQsRUFBMkIsYUFBM0IsRUFBMENULFNBQTFDLEVBQXFEQSxTQUFyRCxFQUFnRSxpQkFBaEUsQ0FBWCxFQUErRkEsU0FBL0YsRUFBMEcsZUFBMUcsRUFBMkgsaUJBQTNILENBRE8sQ0FEZ0M7QUFJekNSLElBQUFBLFVBQVUsRUFBRUEsVUFKNkI7QUFLekNVLElBQUFBLFVBQVUsRUFBRUM7QUFMNkIsR0FBdEIsQ0FBckI7QUFRQUMsRUFBQUEsTUFBTSxDQUFDUixNQUFELENBQU4sQ0FBZWMsYUFBZixDQUNFLENBQ0U7QUFDRSxlQUNBO0FBQ0UsdUJBQWlCLGFBRG5CO0FBRUUsb0JBQWMsS0FGaEI7QUFHRSxhQUFPLElBSFQ7QUFJRSxpQkFBVyxZQUpiO0FBS0Usb0JBQWMsQ0FMaEI7QUFNRSxtQkFBYSxDQU5mO0FBT0UsdUJBQWlCLGNBUG5CLENBUUU7O0FBUkYsS0FGRjtBQVdLLGVBQVdWLFNBWGhCO0FBWUUsWUFBUSxXQVpWLENBYUU7O0FBYkYsR0FERixDQURGO0FBb0JELENBcEVHLENBQUo7QUFzRUFULElBQUksQ0FBQyx5Q0FBRCxFQUE0QyxZQUFZO0FBQzFELFFBQU1DLFVBQVUsR0FBRyxJQUFJQyx3Q0FBSixDQUF3QjtBQUN6QyxrQkFBYyxFQUQyQjtBQUV6QyxjQUFVO0FBQ1IsbUJBQWE7QUFDWDtBQUNBLGNBQU0sV0FGSztBQUdYLHNCQUFjLEtBSEg7QUFJWCxnQkFBUTtBQUpHLE9BREw7QUFPUixxQkFBZTtBQUNiO0FBQ0EsY0FBTSxhQUZPO0FBR2Isc0JBQWMsS0FIRDtBQUliLGdCQUFRO0FBSks7QUFQUCxLQUYrQjtBQWdCekMsa0JBQWMsRUFoQjJCO0FBaUJ6Qyw4QkFBMEIsRUFqQmU7QUFrQnpDLDZCQUF5QixFQWxCZ0I7QUFtQnpDLGNBQVU7QUFDUixzQkFBZ0I7QUFDZCx5QkFBaUIsV0FESDtBQUVkLHlCQUFpQk8sU0FGSDtBQUdkLHNCQUFjLEtBSEE7QUFJZCxlQUFPLElBSk87QUFLZCxtQkFBVyxZQUxHO0FBTWQsc0JBQWMsQ0FOQTtBQU9kLHFCQUFhLENBUEM7QUFRZCxjQUFNO0FBUlE7QUFEUixLQW5CK0I7QUErQnpDLHlCQUFxQjtBQUNuQixtQkFBYSxDQUNYLGNBRFc7QUFETSxLQS9Cb0I7QUFvQ3pDLHlCQUFxQjtBQXBDb0IsR0FBeEIsQ0FBbkI7QUF1Q0EsUUFBTUosTUFBTSxHQUFHLE1BQU0sa0RBQXNCO0FBQ3pDQyxJQUFBQSxPQUFPLEVBQUUsQ0FDUCxJQUFJQyxjQUFKLENBQVcsSUFBSVcsb0JBQUosQ0FBYyxXQUFkLEVBQTJCLGFBQTNCLEVBQTBDVCxTQUExQyxFQUFxRCxLQUFyRCxFQUE0RCxpQkFBNUQsQ0FBWCxFQUEyRkEsU0FBM0YsRUFBc0csZUFBdEcsRUFBdUgsaUJBQXZILENBRE8sQ0FEZ0M7QUFJekNSLElBQUFBLFVBQVUsRUFBRUEsVUFKNkI7QUFLekNVLElBQUFBLFVBQVUsRUFBRUM7QUFMNkIsR0FBdEIsQ0FBckI7QUFRQUMsRUFBQUEsTUFBTSxDQUFDUixNQUFELENBQU4sQ0FBZWMsYUFBZixDQUNFLENBQ0U7QUFDRSxlQUNBO0FBQ0UsdUJBQWlCLGFBRG5CO0FBRUUsb0JBQWMsS0FGaEI7QUFHRSxhQUFPLEtBSFQ7QUFJRSxpQkFBVyxZQUpiO0FBS0Usb0JBQWMsQ0FMaEI7QUFNRSxtQkFBYSxDQU5mO0FBT0UsdUJBQWlCLGNBUG5CLENBUUU7O0FBUkYsS0FGRjtBQVdLLGVBQVdWLFNBWGhCO0FBWUUsWUFBUSxXQVpWLENBYUU7O0FBYkYsR0FERixFQWdCRTtBQUNFLGVBQ0E7QUFDRSx1QkFBaUIsV0FEbkI7QUFFRSx1QkFBaUJBLFNBRm5CO0FBR0Usb0JBQWMsS0FIaEI7QUFJRSxhQUFPLElBSlQ7QUFLRSxpQkFBVyxZQUxiO0FBTUUsb0JBQWMsQ0FOaEI7QUFPRSxtQkFBYSxDQVBmLENBUUU7O0FBUkYsS0FGRjtBQVdLLGVBQVdBLFNBWGhCO0FBWUUsWUFBUSxXQVpWLENBYUU7O0FBYkYsR0FoQkYsQ0FERjtBQW1DRCxDQW5GRyxDQUFKIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUmVwb3NpdG9yeUxvY2FsUHVyZSB9IGZyb20gXCIuLi9yZXBvc2l0b3JpZXMvUmVwb3NpdG9yeUxvY2FsUHVyZVwiO1xyXG5pbXBvcnQgeyBjYWxjdWxhdGVTY29yZUFjdGlvbnMgfSBmcm9tIFwiLi4vY2FsY3VsYXRlU2NvcmVBY3Rpb25zXCI7XHJcbmltcG9ydCB7IGNhbGN1bGF0ZVNjb3JlIH0gZnJvbSBcIi4uL2NhbGN1bGF0ZVNjb3JlXCI7XHJcbmltcG9ydCB7IENsYWltIH0gZnJvbSBcIi4uL2RhdGFNb2RlbHMvQ2xhaW1cIjtcclxuaW1wb3J0IHsgQWN0aW9uIH0gZnJvbSBcIi4uL2RhdGFNb2RlbHMvQWN0aW9uXCI7XHJcbmltcG9ydCB7IENsYWltRWRnZSB9IGZyb20gXCIuLi9kYXRhTW9kZWxzL0NsYWltRWRnZVwiO1xyXG5pbXBvcnQgeyBTY29yZSB9IGZyb20gXCIuLi9kYXRhTW9kZWxzL1Njb3JlXCI7XHJcbi8vaW1wb3J0IHsgUmVwb3NpdG9yeUxvY2FsUmVhY3RpdmUgfSBmcm9tIFwiLi4vcmVwb3NpdG9yaWVzL1JlcG9zaXRvcnlMb2NhbFJlYWN0aXZlXCI7XHJcblxyXG5cclxudGVzdCgnYWRkIGEgbmV3IHNjb3JldHJlZScsIGFzeW5jICgpID0+IHtcclxuICBjb25zdCByZXBvc2l0b3J5ID0gbmV3IFJlcG9zaXRvcnlMb2NhbFB1cmUoKTtcclxuICAvLyBBZGQgYSBuZXcgY2xhaW0gYW5kIHNldCBpdCBhcyBhIHNjb3JlIHRyZWUgdG9wXHJcbiAgY29uc3QgbmV3U2NvcmUgPSBuZXcgU2NvcmUoXCJ0ZXN0Q2xhaW1cIik7XHJcbiAgY29uc3QgcmVzdWx0ID0gYXdhaXQgY2FsY3VsYXRlU2NvcmVBY3Rpb25zKHtcclxuICAgIGFjdGlvbnM6IFtcclxuICAgICAgbmV3IEFjdGlvbihuZXcgQ2xhaW0oXCJcIiwgXCJ0ZXN0Q2xhaW1cIiksIHVuZGVmaW5lZCwgXCJhZGRfY2xhaW1cIiwgXCJ0ZXN0Q2xhaW1cIiksXHJcbiAgICAgIG5ldyBBY3Rpb24obmV3U2NvcmUsIHVuZGVmaW5lZCwgXCJhZGRfc2NvcmVcIiwgbmV3U2NvcmUuaWQpXHJcbiAgICBdLFxyXG4gICAgcmVwb3NpdG9yeTogcmVwb3NpdG9yeSxcclxuICAgIGNhbGN1bGF0b3I6IGNhbGN1bGF0ZVNjb3JlXHJcbiAgfSlcclxuZGVidWdnZXJcclxuICBleHBlY3QocmVwb3NpdG9yeS5yc0RhdGEuc2NvcmVJZHNCeUNsYWltSWRbXCJ0ZXN0Q2xhaW1cIl0ubGVuZ3RoKS50b0VxdWFsKDEpXHJcbn0pO1xyXG5cclxudGVzdCgnQWRkIGEgY2hpbGQgdGhhdCBkb2VzIG5vdCBjaGFuZ2UgdGhlIHRvcCBzY29yZScsIGFzeW5jICgpID0+IHtcclxuICBjb25zdCByZXBvc2l0b3J5ID0gbmV3IFJlcG9zaXRvcnlMb2NhbFB1cmUoe1xyXG4gICAgXCJhY3Rpb25zTG9nXCI6IFtdLFxyXG4gICAgXCJjbGFpbXNcIjoge1xyXG4gICAgICBcInRlc3RDbGFpbVwiOiB7XHJcbiAgICAgICAgLy9cImNvbnRlbnRcIjogXCJcIixcclxuICAgICAgICBcImlkXCI6IFwidGVzdENsYWltXCIsXHJcbiAgICAgICAgXCJyZXZlcnNpYmxlXCI6IGZhbHNlLFxyXG4gICAgICAgIFwidHlwZVwiOiBcImNsYWltXCJcclxuICAgICAgfSxcclxuICAgICAgXCJDaGlsZENsYWltMVwiOiB7XHJcbiAgICAgICAgLy9cImNvbnRlbnRcIjogXCJcIixcclxuICAgICAgICBcImlkXCI6IFwiQ2hpbGRDbGFpbTFcIixcclxuICAgICAgICBcInJldmVyc2libGVcIjogZmFsc2UsXHJcbiAgICAgICAgXCJ0eXBlXCI6IFwiY2xhaW1cIlxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgXCJjbGFpbUVkZ2VzXCI6IHt9LFxyXG4gICAgXCJjbGFpbUVkZ2VJZHNCeVBhcmVudElkXCI6IHt9LFxyXG4gICAgXCJjbGFpbUVkZ2VJZHNCeUNoaWxkSWRcIjoge30sXHJcbiAgICBcInNjb3Jlc1wiOiB7XHJcbiAgICAgIFwiWTlaYXBGTU1nMEJmXCI6IHtcclxuICAgICAgICBcInNvdXJjZUNsYWltSWRcIjogXCJ0ZXN0Q2xhaW1cIixcclxuICAgICAgICBcInBhcmVudFNjb3JlSWRcIjogdW5kZWZpbmVkLFxyXG4gICAgICAgIFwicmV2ZXJzaWJsZVwiOiBmYWxzZSxcclxuICAgICAgICBcInByb1wiOiB0cnVlLFxyXG4gICAgICAgIFwiYWZmZWN0c1wiOiBcImNvbmZpZGVuY2VcIixcclxuICAgICAgICBcImNvbmZpZGVuY2VcIjogMSxcclxuICAgICAgICBcInJlbGV2YW5jZVwiOiAxLFxyXG4gICAgICAgIFwiaWRcIjogXCJZOVphcEZNTWcwQmZcIlxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgXCJzY29yZUlkc0J5Q2xhaW1JZFwiOiB7XHJcbiAgICAgIFwidGVzdENsYWltXCI6IFtcclxuICAgICAgICBcIlk5WmFwRk1NZzBCZlwiXHJcbiAgICAgIF1cclxuICAgIH0sXHJcbiAgICBcImNoaWxkSWRzQnlTY29yZUlkXCI6IHt9XHJcbiAgfSk7XHJcblxyXG4gIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGNhbGN1bGF0ZVNjb3JlQWN0aW9ucyh7XHJcbiAgICBhY3Rpb25zOiBbXHJcbiAgICAgIG5ldyBBY3Rpb24obmV3IENsYWltRWRnZShcInRlc3RDbGFpbVwiLCBcIkNoaWxkQ2xhaW0xXCIsIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCBcIkNoaWxkQ2xhaW0xRWRnZVwiKSwgdW5kZWZpbmVkLCBcImFkZF9jbGFpbUVkZ2VcIiwgXCJDaGlsZENsYWltMUVkZ2VcIilcclxuICAgIF0sXHJcbiAgICByZXBvc2l0b3J5OiByZXBvc2l0b3J5LFxyXG4gICAgY2FsY3VsYXRvcjogY2FsY3VsYXRlU2NvcmVcclxuICB9KVxyXG5cclxuICBleHBlY3QocmVzdWx0KS50b01hdGNoT2JqZWN0KFxyXG4gICAgW1xyXG4gICAgICB7XHJcbiAgICAgICAgXCJuZXdEYXRhXCI6XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgXCJzb3VyY2VDbGFpbUlkXCI6IFwiQ2hpbGRDbGFpbTFcIixcclxuICAgICAgICAgIFwicmV2ZXJzaWJsZVwiOiBmYWxzZSxcclxuICAgICAgICAgIFwicHJvXCI6IHRydWUsXHJcbiAgICAgICAgICBcImFmZmVjdHNcIjogXCJjb25maWRlbmNlXCIsXHJcbiAgICAgICAgICBcImNvbmZpZGVuY2VcIjogMSxcclxuICAgICAgICAgIFwicmVsZXZhbmNlXCI6IDEsXHJcbiAgICAgICAgICBcInBhcmVudFNjb3JlSWRcIjogXCJZOVphcEZNTWcwQmZcIlxyXG4gICAgICAgICAgLy9cImRhdGFJZFwiOiBcIllhM1pldVRtR1VacVwiXHJcbiAgICAgICAgfSwgXCJvbGREYXRhXCI6IHVuZGVmaW5lZCxcclxuICAgICAgICBcInR5cGVcIjogXCJhZGRfc2NvcmVcIixcclxuICAgICAgICAvL1wiZGF0YUlkXCI6IFwiWWEzWmV1VG1HVVpxXCJcclxuICAgICAgfVxyXG4gICAgXVxyXG4gIClcclxuXHJcbn0pO1xyXG5cclxudGVzdCgnQWRkIGEgY2hpbGQgdGhhdCByZXZlcnNlcyB0aGUgdG9wIHNjb3JlJywgYXN5bmMgKCkgPT4ge1xyXG4gIGNvbnN0IHJlcG9zaXRvcnkgPSBuZXcgUmVwb3NpdG9yeUxvY2FsUHVyZSh7XHJcbiAgICBcImFjdGlvbnNMb2dcIjogW10sXHJcbiAgICBcImNsYWltc1wiOiB7XHJcbiAgICAgIFwidGVzdENsYWltXCI6IHtcclxuICAgICAgICAvL1wiY29udGVudFwiOiBcIlwiLFxyXG4gICAgICAgIFwiaWRcIjogXCJ0ZXN0Q2xhaW1cIixcclxuICAgICAgICBcInJldmVyc2libGVcIjogZmFsc2UsXHJcbiAgICAgICAgXCJ0eXBlXCI6IFwiY2xhaW1cIlxyXG4gICAgICB9LFxyXG4gICAgICBcIkNoaWxkQ2xhaW0xXCI6IHtcclxuICAgICAgICAvL1wiY29udGVudFwiOiBcIlwiLFxyXG4gICAgICAgIFwiaWRcIjogXCJDaGlsZENsYWltMVwiLFxyXG4gICAgICAgIFwicmV2ZXJzaWJsZVwiOiBmYWxzZSxcclxuICAgICAgICBcInR5cGVcIjogXCJjbGFpbVwiXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBcImNsYWltRWRnZXNcIjoge30sXHJcbiAgICBcImNsYWltRWRnZUlkc0J5UGFyZW50SWRcIjoge30sXHJcbiAgICBcImNsYWltRWRnZUlkc0J5Q2hpbGRJZFwiOiB7fSxcclxuICAgIFwic2NvcmVzXCI6IHtcclxuICAgICAgXCJZOVphcEZNTWcwQmZcIjoge1xyXG4gICAgICAgIFwic291cmNlQ2xhaW1JZFwiOiBcInRlc3RDbGFpbVwiLFxyXG4gICAgICAgIFwicGFyZW50U2NvcmVJZFwiOiB1bmRlZmluZWQsXHJcbiAgICAgICAgXCJyZXZlcnNpYmxlXCI6IGZhbHNlLFxyXG4gICAgICAgIFwicHJvXCI6IHRydWUsXHJcbiAgICAgICAgXCJhZmZlY3RzXCI6IFwiY29uZmlkZW5jZVwiLFxyXG4gICAgICAgIFwiY29uZmlkZW5jZVwiOiAxLFxyXG4gICAgICAgIFwicmVsZXZhbmNlXCI6IDEsXHJcbiAgICAgICAgXCJpZFwiOiBcIlk5WmFwRk1NZzBCZlwiXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBcInNjb3JlSWRzQnlDbGFpbUlkXCI6IHtcclxuICAgICAgXCJ0ZXN0Q2xhaW1cIjogW1xyXG4gICAgICAgIFwiWTlaYXBGTU1nMEJmXCJcclxuICAgICAgXVxyXG4gICAgfSxcclxuICAgIFwiY2hpbGRJZHNCeVNjb3JlSWRcIjoge31cclxuICB9KTtcclxuXHJcbiAgY29uc3QgcmVzdWx0ID0gYXdhaXQgY2FsY3VsYXRlU2NvcmVBY3Rpb25zKHtcclxuICAgIGFjdGlvbnM6IFtcclxuICAgICAgbmV3IEFjdGlvbihuZXcgQ2xhaW1FZGdlKFwidGVzdENsYWltXCIsIFwiQ2hpbGRDbGFpbTFcIiwgdW5kZWZpbmVkLCBmYWxzZSwgXCJDaGlsZENsYWltMUVkZ2VcIiksIHVuZGVmaW5lZCwgXCJhZGRfY2xhaW1FZGdlXCIsIFwiQ2hpbGRDbGFpbTFFZGdlXCIpXHJcbiAgICBdLFxyXG4gICAgcmVwb3NpdG9yeTogcmVwb3NpdG9yeSxcclxuICAgIGNhbGN1bGF0b3I6IGNhbGN1bGF0ZVNjb3JlXHJcbiAgfSlcclxuXHJcbiAgZXhwZWN0KHJlc3VsdCkudG9NYXRjaE9iamVjdChcclxuICAgIFtcclxuICAgICAge1xyXG4gICAgICAgIFwibmV3RGF0YVwiOlxyXG4gICAgICAgIHtcclxuICAgICAgICAgIFwic291cmNlQ2xhaW1JZFwiOiBcIkNoaWxkQ2xhaW0xXCIsXHJcbiAgICAgICAgICBcInJldmVyc2libGVcIjogZmFsc2UsXHJcbiAgICAgICAgICBcInByb1wiOiBmYWxzZSxcclxuICAgICAgICAgIFwiYWZmZWN0c1wiOiBcImNvbmZpZGVuY2VcIixcclxuICAgICAgICAgIFwiY29uZmlkZW5jZVwiOiAxLFxyXG4gICAgICAgICAgXCJyZWxldmFuY2VcIjogMSxcclxuICAgICAgICAgIFwicGFyZW50U2NvcmVJZFwiOiBcIlk5WmFwRk1NZzBCZlwiXHJcbiAgICAgICAgICAvL1wiZGF0YUlkXCI6IFwiWWEzWmV1VG1HVVpxXCJcclxuICAgICAgICB9LCBcIm9sZERhdGFcIjogdW5kZWZpbmVkLFxyXG4gICAgICAgIFwidHlwZVwiOiBcImFkZF9zY29yZVwiLFxyXG4gICAgICAgIC8vXCJkYXRhSWRcIjogXCJZYTNaZXVUbUdVWnFcIlxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgXCJuZXdEYXRhXCI6XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgXCJzb3VyY2VDbGFpbUlkXCI6IFwidGVzdENsYWltXCIsXHJcbiAgICAgICAgICBcInBhcmVudFNjb3JlSWRcIjogdW5kZWZpbmVkLFxyXG4gICAgICAgICAgXCJyZXZlcnNpYmxlXCI6IGZhbHNlLFxyXG4gICAgICAgICAgXCJwcm9cIjogdHJ1ZSxcclxuICAgICAgICAgIFwiYWZmZWN0c1wiOiBcImNvbmZpZGVuY2VcIixcclxuICAgICAgICAgIFwiY29uZmlkZW5jZVwiOiAwLFxyXG4gICAgICAgICAgXCJyZWxldmFuY2VcIjogMSxcclxuICAgICAgICAgIC8vXCJpZFwiOiBcIlk5WmFwRk1NZzBCZlwiXHJcbiAgICAgICAgfSwgXCJvbGREYXRhXCI6IHVuZGVmaW5lZCxcclxuICAgICAgICBcInR5cGVcIjogXCJhZGRfc2NvcmVcIixcclxuICAgICAgICAvL1wiZGF0YUlkXCI6IFwiWWEzWmV1VG1HVVpxXCJcclxuICAgICAgfVxyXG4gICAgXVxyXG4gIClcclxuXHJcbn0pO1xyXG5cclxuIl19