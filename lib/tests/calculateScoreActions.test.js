"use strict";

var _RepositoryLocalPure = require("../repositories/RepositoryLocalPure");

var _calculateScoreActions = require("../calculateScoreActions");

var _calculateScore = require("../calculateScore");

var _Claim = require("../dataModels/Claim");

var _Action = require("../dataModels/Action");

var _ClaimEdge = require("../dataModels/ClaimEdge");

//import { RepositoryLocalReactive } from "../repositories/RepositoryLocalReactive";
test('add a new scoretree', async () => {
  const repository = new _RepositoryLocalPure.RepositoryLocalPure(); // Add a new claim and set it as a score tree top

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90ZXN0cy9jYWxjdWxhdGVTY29yZUFjdGlvbnMudGVzdC50cyJdLCJuYW1lcyI6WyJ0ZXN0IiwicmVwb3NpdG9yeSIsIlJlcG9zaXRvcnlMb2NhbFB1cmUiLCJyZXN1bHQiLCJhY3Rpb25zIiwiQWN0aW9uIiwiQ2xhaW0iLCJ1bmRlZmluZWQiLCJjYWxjdWxhdG9yIiwiY2FsY3VsYXRlU2NvcmUiLCJleHBlY3QiLCJ0b01hdGNoT2JqZWN0IiwiQ2xhaW1FZGdlIl0sIm1hcHBpbmdzIjoiOztBQUFBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBO0FBR0FBLElBQUksQ0FBQyxxQkFBRCxFQUF3QixZQUFZO0FBQ3RDLFFBQU1DLFVBQVUsR0FBRyxJQUFJQyx3Q0FBSixFQUFuQixDQURzQyxDQUV0Qzs7QUFDQSxRQUFNQyxNQUFNLEdBQUcsTUFBTSxrREFBc0I7QUFDekNDLElBQUFBLE9BQU8sRUFBRSxDQUNQLElBQUlDLGNBQUosQ0FBVyxJQUFJQyxZQUFKLENBQVUsRUFBVixFQUFjLFdBQWQsQ0FBWCxFQUF1Q0MsU0FBdkMsRUFBa0QsV0FBbEQsRUFBK0QsV0FBL0QsQ0FETyxFQUVQLElBQUlGLGNBQUosQ0FBV0UsU0FBWCxFQUFzQkEsU0FBdEIsRUFBaUMsZUFBakMsRUFBa0QsV0FBbEQsQ0FGTyxDQURnQztBQUt6Q04sSUFBQUEsVUFBVSxFQUFFQSxVQUw2QjtBQU16Q08sSUFBQUEsVUFBVSxFQUFFQztBQU42QixHQUF0QixDQUFyQjtBQVNBQyxFQUFBQSxNQUFNLENBQUNQLE1BQUQsQ0FBTixDQUFlUSxhQUFmLENBQ0UsQ0FBQztBQUNDLGVBQ0E7QUFDRSx1QkFBaUIsV0FEbkI7QUFFRSxvQkFBYyxLQUZoQjtBQUdFLGFBQU8sSUFIVDtBQUlFLGlCQUFXLFlBSmI7QUFLRSxvQkFBYyxDQUxoQjtBQU1FLG1CQUFhLENBTmYsQ0FPRTs7QUFQRixLQUZEO0FBVUksZUFBVyxFQVZmO0FBV0MsWUFBUSxXQVhULENBWUM7O0FB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MUMsRUFBcUQsS0FBckQsRUFBNEQsaUJBQTVELENBQVgsRUFBMkZBLFNBQTNGLEVBQXNHLGVBQXRHLEVBQXVILGlCQUF2SCxDQURPLENBRGdDO0FBSXpDTixJQUFBQSxVQUFVLEVBQUVBLFVBSjZCO0FBS3pDTyxJQUFBQSxVQUFVLEVBQUVDO0FBTDZCLEdBQXRCLENBQXJCO0FBUUFDLEVBQUFBLE1BQU0sQ0FBQ1AsTUFBRCxDQUFOLENBQWVRLGFBQWYsQ0FDRSxDQUNFO0FBQ0UsZUFDQTtBQUNFLHVCQUFpQixhQURuQjtBQUVFLG9CQUFjLEtBRmhCO0FBR0UsYUFBTyxLQUhUO0FBSUUsaUJBQVcsWUFKYjtBQUtFLG9CQUFjLENBTGhCO0FBTUUsbUJBQWEsQ0FOZjtBQU9FLHVCQUFpQixjQVBuQixDQVFFOztBQVJGLEtBRkY7QUFXSyxlQUFXSixTQVhoQjtBQVlFLFlBQVEsV0FaVixDQWFFOztBQWJGLEdBREYsRUFnQkU7QUFDRSxlQUNBO0FBQ0UsdUJBQWlCLFdBRG5CO0FBRUUsdUJBQWlCQSxTQUZuQjtBQUdFLG9CQUFjLEtBSGhCO0FBSUUsYUFBTyxJQUpUO0FBS0UsaUJBQVcsWUFMYjtBQU1FLG9CQUFjLENBTmhCO0FBT0UsbUJBQWEsQ0FQZixDQVFFOztBQVJGLEtBRkY7QUFXSyxlQUFXQSxTQVhoQjtBQVlFLFlBQVEsV0FaVixDQWFFOztBQWJGLEdBaEJGLENBREY7QUFtQ0QsQ0FuRkcsQ0FBSiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFJlcG9zaXRvcnlMb2NhbFB1cmUgfSBmcm9tIFwiLi4vcmVwb3NpdG9yaWVzL1JlcG9zaXRvcnlMb2NhbFB1cmVcIjtcclxuaW1wb3J0IHsgY2FsY3VsYXRlU2NvcmVBY3Rpb25zIH0gZnJvbSBcIi4uL2NhbGN1bGF0ZVNjb3JlQWN0aW9uc1wiO1xyXG5pbXBvcnQgeyBjYWxjdWxhdGVTY29yZSB9IGZyb20gXCIuLi9jYWxjdWxhdGVTY29yZVwiO1xyXG5pbXBvcnQgeyBDbGFpbSB9IGZyb20gXCIuLi9kYXRhTW9kZWxzL0NsYWltXCI7XHJcbmltcG9ydCB7IEFjdGlvbiB9IGZyb20gXCIuLi9kYXRhTW9kZWxzL0FjdGlvblwiO1xyXG5pbXBvcnQgeyBDbGFpbUVkZ2UgfSBmcm9tIFwiLi4vZGF0YU1vZGVscy9DbGFpbUVkZ2VcIjtcclxuLy9pbXBvcnQgeyBSZXBvc2l0b3J5TG9jYWxSZWFjdGl2ZSB9IGZyb20gXCIuLi9yZXBvc2l0b3JpZXMvUmVwb3NpdG9yeUxvY2FsUmVhY3RpdmVcIjtcclxuXHJcblxyXG50ZXN0KCdhZGQgYSBuZXcgc2NvcmV0cmVlJywgYXN5bmMgKCkgPT4ge1xyXG4gIGNvbnN0IHJlcG9zaXRvcnkgPSBuZXcgUmVwb3NpdG9yeUxvY2FsUHVyZSgpO1xyXG4gIC8vIEFkZCBhIG5ldyBjbGFpbSBhbmQgc2V0IGl0IGFzIGEgc2NvcmUgdHJlZSB0b3BcclxuICBjb25zdCByZXN1bHQgPSBhd2FpdCBjYWxjdWxhdGVTY29yZUFjdGlvbnMoe1xyXG4gICAgYWN0aW9uczogW1xyXG4gICAgICBuZXcgQWN0aW9uKG5ldyBDbGFpbShcIlwiLCBcInRlc3RDbGFpbVwiKSwgdW5kZWZpbmVkLCBcImFkZF9jbGFpbVwiLCBcInRlc3RDbGFpbVwiKSxcclxuICAgICAgbmV3IEFjdGlvbih1bmRlZmluZWQsIHVuZGVmaW5lZCwgXCJhZGRfc2NvcmV0cmVlXCIsIFwidGVzdENsYWltXCIpXHJcbiAgICBdLFxyXG4gICAgcmVwb3NpdG9yeTogcmVwb3NpdG9yeSxcclxuICAgIGNhbGN1bGF0b3I6IGNhbGN1bGF0ZVNjb3JlXHJcbiAgfSlcclxuXHJcbiAgZXhwZWN0KHJlc3VsdCkudG9NYXRjaE9iamVjdChcclxuICAgIFt7XHJcbiAgICAgIFwibmV3RGF0YVwiOlxyXG4gICAgICB7XHJcbiAgICAgICAgXCJzb3VyY2VDbGFpbUlkXCI6IFwidGVzdENsYWltXCIsXHJcbiAgICAgICAgXCJyZXZlcnNpYmxlXCI6IGZhbHNlLFxyXG4gICAgICAgIFwicHJvXCI6IHRydWUsXHJcbiAgICAgICAgXCJhZmZlY3RzXCI6IFwiY29uZmlkZW5jZVwiLFxyXG4gICAgICAgIFwiY29uZmlkZW5jZVwiOiAxLFxyXG4gICAgICAgIFwicmVsZXZhbmNlXCI6IDEsXHJcbiAgICAgICAgLy9cImlkXCI6IFwiWWEzWmV1VG1HVVpxXCJcclxuICAgICAgfSwgXCJvbGREYXRhXCI6IHt9LFxyXG4gICAgICBcInR5cGVcIjogXCJhZGRfc2NvcmVcIixcclxuICAgICAgLy9cImRhdGFJZFwiOiBcIllhM1pldVRtR1VacVwiXHJcbiAgICB9XVxyXG4gIClcclxufSk7XHJcblxyXG50ZXN0KCdBZGQgYSBjaGlsZCB0aGF0IGRvZXMgbm90IGNoYW5nZSB0aGUgdG9wIHNjb3JlJywgYXN5bmMgKCkgPT4ge1xyXG4gIGNvbnN0IHJlcG9zaXRvcnkgPSBuZXcgUmVwb3NpdG9yeUxvY2FsUHVyZSh7XHJcbiAgICBcImFjdGlvbnNMb2dcIjogW10sXHJcbiAgICBcImNsYWltc1wiOiB7XHJcbiAgICAgIFwidGVzdENsYWltXCI6IHtcclxuICAgICAgICAvL1wiY29udGVudFwiOiBcIlwiLFxyXG4gICAgICAgIFwiaWRcIjogXCJ0ZXN0Q2xhaW1cIixcclxuICAgICAgICBcInJldmVyc2libGVcIjogZmFsc2UsXHJcbiAgICAgICAgXCJ0eXBlXCI6IFwiY2xhaW1cIlxyXG4gICAgICB9LFxyXG4gICAgICBcIkNoaWxkQ2xhaW0xXCI6IHtcclxuICAgICAgICAvL1wiY29udGVudFwiOiBcIlwiLFxyXG4gICAgICAgIFwiaWRcIjogXCJDaGlsZENsYWltMVwiLFxyXG4gICAgICAgIFwicmV2ZXJzaWJsZVwiOiBmYWxzZSxcclxuICAgICAgICBcInR5cGVcIjogXCJjbGFpbVwiXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBcImNsYWltRWRnZXNcIjoge30sXHJcbiAgICBcImNsYWltRWRnZUlkc0J5UGFyZW50SWRcIjoge30sXHJcbiAgICBcImNsYWltRWRnZUlkc0J5Q2hpbGRJZFwiOiB7fSxcclxuICAgIFwic2NvcmVzXCI6IHtcclxuICAgICAgXCJZOVphcEZNTWcwQmZcIjoge1xyXG4gICAgICAgIFwic291cmNlQ2xhaW1JZFwiOiBcInRlc3RDbGFpbVwiLFxyXG4gICAgICAgIFwicGFyZW50U2NvcmVJZFwiOiB1bmRlZmluZWQsXHJcbiAgICAgICAgXCJyZXZlcnNpYmxlXCI6IGZhbHNlLFxyXG4gICAgICAgIFwicHJvXCI6IHRydWUsXHJcbiAgICAgICAgXCJhZmZlY3RzXCI6IFwiY29uZmlkZW5jZVwiLFxyXG4gICAgICAgIFwiY29uZmlkZW5jZVwiOiAxLFxyXG4gICAgICAgIFwicmVsZXZhbmNlXCI6IDEsXHJcbiAgICAgICAgXCJpZFwiOiBcIlk5WmFwRk1NZzBCZlwiXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBcInNjb3JlSWRzQnlDbGFpbUlkXCI6IHtcclxuICAgICAgXCJ0ZXN0Q2xhaW1cIjogW1xyXG4gICAgICAgIFwiWTlaYXBGTU1nMEJmXCJcclxuICAgICAgXVxyXG4gICAgfSxcclxuICAgIFwiY2hpbGRJZHNCeVNjb3JlSWRcIjoge31cclxuICB9KTtcclxuXHJcbiAgY29uc3QgcmVzdWx0ID0gYXdhaXQgY2FsY3VsYXRlU2NvcmVBY3Rpb25zKHtcclxuICAgIGFjdGlvbnM6IFtcclxuICAgICAgbmV3IEFjdGlvbihuZXcgQ2xhaW1FZGdlKFwidGVzdENsYWltXCIsIFwiQ2hpbGRDbGFpbTFcIiwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIFwiQ2hpbGRDbGFpbTFFZGdlXCIpLCB1bmRlZmluZWQsIFwiYWRkX2NsYWltRWRnZVwiLCBcIkNoaWxkQ2xhaW0xRWRnZVwiKVxyXG4gICAgXSxcclxuICAgIHJlcG9zaXRvcnk6IHJlcG9zaXRvcnksXHJcbiAgICBjYWxjdWxhdG9yOiBjYWxjdWxhdGVTY29yZVxyXG4gIH0pXHJcblxyXG4gIGV4cGVjdChyZXN1bHQpLnRvTWF0Y2hPYmplY3QoXHJcbiAgICBbXHJcbiAgICAgIHtcclxuICAgICAgICBcIm5ld0RhdGFcIjpcclxuICAgICAgICB7XHJcbiAgICAgICAgICBcInNvdXJjZUNsYWltSWRcIjogXCJDaGlsZENsYWltMVwiLFxyXG4gICAgICAgICAgXCJyZXZlcnNpYmxlXCI6IGZhbHNlLFxyXG4gICAgICAgICAgXCJwcm9cIjogdHJ1ZSxcclxuICAgICAgICAgIFwiYWZmZWN0c1wiOiBcImNvbmZpZGVuY2VcIixcclxuICAgICAgICAgIFwiY29uZmlkZW5jZVwiOiAxLFxyXG4gICAgICAgICAgXCJyZWxldmFuY2VcIjogMSxcclxuICAgICAgICAgIFwicGFyZW50U2NvcmVJZFwiOiBcIlk5WmFwRk1NZzBCZlwiXHJcbiAgICAgICAgICAvL1wiZGF0YUlkXCI6IFwiWWEzWmV1VG1HVVpxXCJcclxuICAgICAgICB9LCBcIm9sZERhdGFcIjogdW5kZWZpbmVkLFxyXG4gICAgICAgIFwidHlwZVwiOiBcImFkZF9zY29yZVwiLFxyXG4gICAgICAgIC8vXCJkYXRhSWRcIjogXCJZYTNaZXVUbUdVWnFcIlxyXG4gICAgICB9XHJcbiAgICBdXHJcbiAgKVxyXG5cclxufSk7XHJcblxyXG50ZXN0KCdBZGQgYSBjaGlsZCB0aGF0IHJldmVyc2VzIHRoZSB0b3Agc2NvcmUnLCBhc3luYyAoKSA9PiB7XHJcbiAgY29uc3QgcmVwb3NpdG9yeSA9IG5ldyBSZXBvc2l0b3J5TG9jYWxQdXJlKHtcclxuICAgIFwiYWN0aW9uc0xvZ1wiOiBbXSxcclxuICAgIFwiY2xhaW1zXCI6IHtcclxuICAgICAgXCJ0ZXN0Q2xhaW1cIjoge1xyXG4gICAgICAgIC8vXCJjb250ZW50XCI6IFwiXCIsXHJcbiAgICAgICAgXCJpZFwiOiBcInRlc3RDbGFpbVwiLFxyXG4gICAgICAgIFwicmV2ZXJzaWJsZVwiOiBmYWxzZSxcclxuICAgICAgICBcInR5cGVcIjogXCJjbGFpbVwiXHJcbiAgICAgIH0sXHJcbiAgICAgIFwiQ2hpbGRDbGFpbTFcIjoge1xyXG4gICAgICAgIC8vXCJjb250ZW50XCI6IFwiXCIsXHJcbiAgICAgICAgXCJpZFwiOiBcIkNoaWxkQ2xhaW0xXCIsXHJcbiAgICAgICAgXCJyZXZlcnNpYmxlXCI6IGZhbHNlLFxyXG4gICAgICAgIFwidHlwZVwiOiBcImNsYWltXCJcclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIFwiY2xhaW1FZGdlc1wiOiB7fSxcclxuICAgIFwiY2xhaW1FZGdlSWRzQnlQYXJlbnRJZFwiOiB7fSxcclxuICAgIFwiY2xhaW1FZGdlSWRzQnlDaGlsZElkXCI6IHt9LFxyXG4gICAgXCJzY29yZXNcIjoge1xyXG4gICAgICBcIlk5WmFwRk1NZzBCZlwiOiB7XHJcbiAgICAgICAgXCJzb3VyY2VDbGFpbUlkXCI6IFwidGVzdENsYWltXCIsXHJcbiAgICAgICAgXCJwYXJlbnRTY29yZUlkXCI6IHVuZGVmaW5lZCxcclxuICAgICAgICBcInJldmVyc2libGVcIjogZmFsc2UsXHJcbiAgICAgICAgXCJwcm9cIjogdHJ1ZSxcclxuICAgICAgICBcImFmZmVjdHNcIjogXCJjb25maWRlbmNlXCIsXHJcbiAgICAgICAgXCJjb25maWRlbmNlXCI6IDEsXHJcbiAgICAgICAgXCJyZWxldmFuY2VcIjogMSxcclxuICAgICAgICBcImlkXCI6IFwiWTlaYXBGTU1nMEJmXCJcclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIFwic2NvcmVJZHNCeUNsYWltSWRcIjoge1xyXG4gICAgICBcInRlc3RDbGFpbVwiOiBbXHJcbiAgICAgICAgXCJZOVphcEZNTWcwQmZcIlxyXG4gICAgICBdXHJcbiAgICB9LFxyXG4gICAgXCJjaGlsZElkc0J5U2NvcmVJZFwiOiB7fVxyXG4gIH0pO1xyXG5cclxuICBjb25zdCByZXN1bHQgPSBhd2FpdCBjYWxjdWxhdGVTY29yZUFjdGlvbnMoe1xyXG4gICAgYWN0aW9uczogW1xyXG4gICAgICBuZXcgQWN0aW9uKG5ldyBDbGFpbUVkZ2UoXCJ0ZXN0Q2xhaW1cIiwgXCJDaGlsZENsYWltMVwiLCB1bmRlZmluZWQsIGZhbHNlLCBcIkNoaWxkQ2xhaW0xRWRnZVwiKSwgdW5kZWZpbmVkLCBcImFkZF9jbGFpbUVkZ2VcIiwgXCJDaGlsZENsYWltMUVkZ2VcIilcclxuICAgIF0sXHJcbiAgICByZXBvc2l0b3J5OiByZXBvc2l0b3J5LFxyXG4gICAgY2FsY3VsYXRvcjogY2FsY3VsYXRlU2NvcmVcclxuICB9KVxyXG5cclxuICBleHBlY3QocmVzdWx0KS50b01hdGNoT2JqZWN0KFxyXG4gICAgW1xyXG4gICAgICB7XHJcbiAgICAgICAgXCJuZXdEYXRhXCI6XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgXCJzb3VyY2VDbGFpbUlkXCI6IFwiQ2hpbGRDbGFpbTFcIixcclxuICAgICAgICAgIFwicmV2ZXJzaWJsZVwiOiBmYWxzZSxcclxuICAgICAgICAgIFwicHJvXCI6IGZhbHNlLFxyXG4gICAgICAgICAgXCJhZmZlY3RzXCI6IFwiY29uZmlkZW5jZVwiLFxyXG4gICAgICAgICAgXCJjb25maWRlbmNlXCI6IDEsXHJcbiAgICAgICAgICBcInJlbGV2YW5jZVwiOiAxLFxyXG4gICAgICAgICAgXCJwYXJlbnRTY29yZUlkXCI6IFwiWTlaYXBGTU1nMEJmXCJcclxuICAgICAgICAgIC8vXCJkYXRhSWRcIjogXCJZYTNaZXVUbUdVWnFcIlxyXG4gICAgICAgIH0sIFwib2xkRGF0YVwiOiB1bmRlZmluZWQsXHJcbiAgICAgICAgXCJ0eXBlXCI6IFwiYWRkX3Njb3JlXCIsXHJcbiAgICAgICAgLy9cImRhdGFJZFwiOiBcIllhM1pldVRtR1VacVwiXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICBcIm5ld0RhdGFcIjpcclxuICAgICAgICB7XHJcbiAgICAgICAgICBcInNvdXJjZUNsYWltSWRcIjogXCJ0ZXN0Q2xhaW1cIixcclxuICAgICAgICAgIFwicGFyZW50U2NvcmVJZFwiOiB1bmRlZmluZWQsXHJcbiAgICAgICAgICBcInJldmVyc2libGVcIjogZmFsc2UsXHJcbiAgICAgICAgICBcInByb1wiOiB0cnVlLFxyXG4gICAgICAgICAgXCJhZmZlY3RzXCI6IFwiY29uZmlkZW5jZVwiLFxyXG4gICAgICAgICAgXCJjb25maWRlbmNlXCI6IDAsXHJcbiAgICAgICAgICBcInJlbGV2YW5jZVwiOiAxLFxyXG4gICAgICAgICAgLy9cImlkXCI6IFwiWTlaYXBGTU1nMEJmXCJcclxuICAgICAgICB9LCBcIm9sZERhdGFcIjogdW5kZWZpbmVkLFxyXG4gICAgICAgIFwidHlwZVwiOiBcImFkZF9zY29yZVwiLFxyXG4gICAgICAgIC8vXCJkYXRhSWRcIjogXCJZYTNaZXVUbUdVWnFcIlxyXG4gICAgICB9XHJcbiAgICBdXHJcbiAgKVxyXG5cclxufSk7XHJcblxyXG4iXX0=