"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.calcullateScoreTests = calcullateScoreTests;

var _calculateScore = require("../calculateScore");

var _Score = require("../dataModels/Score");

function calcullateScoreTests() {
  class TestData {
    constructor(testDescription = "Test", expectedScore, scores = [], reversible = false) {
      this.testDescription = testDescription;
      this.expectedScore = expectedScore;
      this.scores = scores;
      this.reversible = reversible;
    }

  }

  const u = undefined;

  function s(confidence = 1, relevance = 1, pro = true, affects = "confidence", reversible = false) {
    return new _Score.Score("", "", "", u, reversible, pro, affects, confidence, relevance);
  }

  function t(testDescription, expectedScore, scores, reversible = false) {
    return new TestData(testDescription, expectedScore, scores, reversible);
  }

  const pro = true;
  const con = false;
  const testData = [t("no scores   =  1  ", s(1), []), t("1 and 1     =  1    ", s(1), [s(+1), s(+1)]), t(" 1 and -1   =  1 ", s(1), [s(+1), s(-1)]), t("-1          =  0 ", s(0), [s(-1)]), t(" 1 and -1r  =  0 ", s(0), [s(+1), s(-1, u, u, u, true)]), t("-1r         = -1 ", s(-1), [s(-1, u, u, u, true)]), t("pro and con =  0", s(0), [s(+1), s(+1, u, con)]), t("1 Relevance =  1.2", s(1, 2), [s(+1, 1, pro, "relevance")]), t("pro and con with relevance", s(0.3333333333333333), [s(+1, 2), s(+1, 1, con)]), t("1 Relevance & 1 pro =  1,2", s(1, 2), [s(+1), s(+1, 1, pro, "relevance")]), t("1 con Relevance", s(1, 0.5), [s(+1, 1, con, "relevance")]), t("2 con Relevance", s(1, 0), [s(+1, 1, con, "relevance"), s(+1, 1, con, "relevance")])];
  const JsonTestData = [];

  for (let data of testData) {
    JsonTestData.push(JSON.stringify(data));
  }

  describe.each(JsonTestData)('', testJson => {
    const t = JSON.parse(testJson);
    test(t.testDescription + ' Confidence', () => {
      const result = (0, _calculateScore.calculateScore)({
        childScores: t.scores,
        reversible: t.reversible
      });
      expect(result.confidence).toBe(t.expectedScore.confidence);

      if (result.relevance != undefined) {
        expect(result.relevance).toBe(t.expectedScore.relevance);
      }
    });
  });
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90ZXN0cy9jYWxjdWxhdGVTY29yZVRlc3QudHMiXSwibmFtZXMiOlsiY2FsY3VsbGF0ZVNjb3JlVGVzdHMiLCJUZXN0RGF0YSIsImNvbnN0cnVjdG9yIiwidGVzdERlc2NyaXB0aW9uIiwiZXhwZWN0ZWRTY29yZSIsInNjb3JlcyIsInJldmVyc2libGUiLCJ1IiwidW5kZWZpbmVkIiwicyIsImNvbmZpZGVuY2UiLCJyZWxldmFuY2UiLCJwcm8iLCJhZmZlY3RzIiwiU2NvcmUiLCJ0IiwiY29uIiwidGVzdERhdGEiLCJKc29uVGVzdERhdGEiLCJkYXRhIiwicHVzaCIsIkpTT04iLCJzdHJpbmdpZnkiLCJkZXNjcmliZSIsImVhY2giLCJ0ZXN0SnNvbiIsInBhcnNlIiwidGVzdCIsInJlc3VsdCIsImNoaWxkU2NvcmVzIiwiZXhwZWN0IiwidG9CZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUNBOztBQUdPLFNBQVNBLG9CQUFULEdBQWdDO0FBQ25DLFFBQU1DLFFBQU4sQ0FBZTtBQUNYQyxJQUFBQSxXQUFXLENBQ0FDLGVBQXVCLEdBQUcsTUFEMUIsRUFFQUMsYUFGQSxFQUdBQyxNQUFlLEdBQUcsRUFIbEIsRUFJQUMsVUFBbUIsR0FBRyxLQUp0QixFQUtUO0FBQUEsV0FKU0gsZUFJVCxHQUpTQSxlQUlUO0FBQUEsV0FIU0MsYUFHVCxHQUhTQSxhQUdUO0FBQUEsV0FGU0MsTUFFVCxHQUZTQSxNQUVUO0FBQUEsV0FEU0MsVUFDVCxHQURTQSxVQUNUO0FBQ0Q7O0FBUFU7O0FBU2YsUUFBTUMsQ0FBQyxHQUFHQyxTQUFWOztBQUNBLFdBQVNDLENBQVQsQ0FBV0MsVUFBa0IsR0FBRyxDQUFoQyxFQUFtQ0MsU0FBaUIsR0FBRyxDQUF2RCxFQUNJQyxHQUFZLEdBQUcsSUFEbkIsRUFDeUJDLE9BQWdCLEdBQUcsWUFENUMsRUFDMERQLFVBQW1CLEdBQUcsS0FEaEYsRUFDOEY7QUFDMUYsV0FBTyxJQUFJUSxZQUFKLENBQVUsRUFBVixFQUFj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QXlCb0IsSUFBekIsQ0FBOEJoQixDQUFDLENBQUNYLGFBQUYsQ0FBZ0JPLFNBQTlDO0FBQ0g7QUFDSixLQU5HLENBQUo7QUFRSCxHQVhMO0FBYUgiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjYWxjdWxhdGVTY29yZSB9IGZyb20gXCIuLi9jYWxjdWxhdGVTY29yZVwiO1xyXG5pbXBvcnQgeyBTY29yZSB9IGZyb20gXCIuLi9kYXRhTW9kZWxzL1Njb3JlXCI7XHJcbmltcG9ydCB7IEFmZmVjdHMgfSBmcm9tIFwiLi4vZGF0YU1vZGVscy9BZmZlY3RzXCI7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gY2FsY3VsbGF0ZVNjb3JlVGVzdHMoKSB7XHJcbiAgICBjbGFzcyBUZXN0RGF0YSB7XHJcbiAgICAgICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgICAgIHB1YmxpYyB0ZXN0RGVzY3JpcHRpb246IHN0cmluZyA9IFwiVGVzdFwiLFxyXG4gICAgICAgICAgICBwdWJsaWMgZXhwZWN0ZWRTY29yZTogU2NvcmUsXHJcbiAgICAgICAgICAgIHB1YmxpYyBzY29yZXM6IFNjb3JlW10gPSBbXSxcclxuICAgICAgICAgICAgcHVibGljIHJldmVyc2libGU6IGJvb2xlYW4gPSBmYWxzZSxcclxuICAgICAgICApIHtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBjb25zdCB1ID0gdW5kZWZpbmVkO1xyXG4gICAgZnVuY3Rpb24gcyhjb25maWRlbmNlOiBudW1iZXIgPSAxLCByZWxldmFuY2U6IG51bWJlciA9IDEsXHJcbiAgICAgICAgcHJvOiBib29sZWFuID0gdHJ1ZSwgYWZmZWN0czogQWZmZWN0cyA9IFwiY29uZmlkZW5jZVwiLCByZXZlcnNpYmxlOiBib29sZWFuID0gZmFsc2UpOiBTY29yZSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBTY29yZShcIlwiLCBcIlwiLCBcIlwiLCB1LCByZXZlcnNpYmxlLCBwcm8sIGFmZmVjdHMsIGNvbmZpZGVuY2UsIHJlbGV2YW5jZSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gdCh0ZXN0RGVzY3JpcHRpb246IHN0cmluZywgZXhwZWN0ZWRTY29yZTogU2NvcmUsIHNjb3JlczogU2NvcmVbXSwgcmV2ZXJzaWJsZTogYm9vbGVhbiA9IGZhbHNlKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBUZXN0RGF0YSh0ZXN0RGVzY3JpcHRpb24sIGV4cGVjdGVkU2NvcmUsIHNjb3JlcywgcmV2ZXJzaWJsZSlcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBwcm8gPSB0cnVlO1xyXG4gICAgY29uc3QgY29uID0gZmFsc2U7XHJcblxyXG4gICAgY29uc3QgdGVzdERhdGEgPSBbXHJcbiAgICAgICAgdChcIm5vIHNjb3JlcyAgID0gIDEgIFwiLCBzKDEpLCBbXSksXHJcbiAgICAgICAgdChcIjEgYW5kIDEgICAgID0gIDEgICAgXCIsIHMoMSksIFtzKCsxKSwgcygrMSldKSxcclxuICAgICAgICB0KFwiIDEgYW5kIC0xICAgPSAgMSBcIiwgcygxKSwgW3MoKzEpLCBzKC0xKV0pLFxyXG4gICAgICAgIHQoXCItMSAgICAgICAgICA9ICAwIFwiLCBzKDApLCBbcygtMSldKSxcclxuICAgICAgICB0KFwiIDEgYW5kIC0xciAgPSAgMCBcIiwgcygwKSwgW3MoKzEpLCBzKC0xLCB1LCB1LCB1LCB0cnVlKV0pLFxyXG4gICAgICAgIHQoXCItMXIgICAgICAgICA9IC0xIFwiLCBzKC0xKSwgW3MoLTEsIHUsIHUsIHUsIHRydWUpXSksXHJcbiAgICAgICAgdChcInBybyBhbmQgY29uID0gIDBcIiwgcygwKSwgW3MoKzEpLCBzKCsxLCB1LCBjb24pXSksXHJcbiAgICAgICAgdChcIjEgUmVsZXZhbmNlID0gIDEuMlwiLCBzKDEsIDIpLCBbcygrMSwgMSwgcHJvLCBcInJlbGV2YW5jZVwiKV0pLFxyXG4gICAgICAgIHQoXCJwcm8gYW5kIGNvbiB3aXRoIHJlbGV2YW5jZVwiLCBzKDAuMzMzMzMzMzMzMzMzMzMzMyksIFtzKCsxLCAyKSwgcygrMSwgMSwgY29uKV0pLFxyXG4gICAgICAgIHQoXCIxIFJlbGV2YW5jZSAmIDEgcHJvID0gIDEsMlwiLCBzKDEsIDIpLCBbcygrMSksIHMoKzEsIDEsIHBybywgXCJyZWxldmFuY2VcIildKSxcclxuICAgICAgICB0KFwiMSBjb24gUmVsZXZhbmNlXCIsIHMoMSwgMC41KSwgW3MoKzEsIDEsIGNvbiwgXCJyZWxldmFuY2VcIildKSxcclxuICAgICAgICB0KFwiMiBjb24gUmVsZXZhbmNlXCIsIHMoMSwgMCksIFtzKCsxLCAxLCBjb24sIFwicmVsZXZhbmNlXCIpLCBzKCsxLCAxLCBjb24sIFwicmVsZXZhbmNlXCIpXSksXHJcblxyXG4gICAgXVxyXG5cclxuICAgIGNvbnN0IEpzb25UZXN0RGF0YTogc3RyaW5nW10gPSBbXTtcclxuXHJcbiAgICBmb3IgKGxldCBkYXRhIG9mIHRlc3REYXRhKSB7XHJcbiAgICAgICAgSnNvblRlc3REYXRhLnB1c2goSlNPTi5zdHJpbmdpZnkoZGF0YSkpXHJcbiAgICB9XHJcblxyXG4gICAgZGVzY3JpYmUuZWFjaChKc29uVGVzdERhdGEpKCcnLFxyXG4gICAgICAgICh0ZXN0SnNvbikgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCB0OiBUZXN0RGF0YSA9IEpTT04ucGFyc2UodGVzdEpzb24pO1xyXG4gICAgICAgICAgICB0ZXN0KHQudGVzdERlc2NyaXB0aW9uICsgJyBDb25maWRlbmNlJywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gY2FsY3VsYXRlU2NvcmUoeyBjaGlsZFNjb3JlczogdC5zY29yZXMsIHJldmVyc2libGU6IHQucmV2ZXJzaWJsZSB9KTtcclxuICAgICAgICAgICAgICAgIGV4cGVjdChyZXN1bHQuY29uZmlkZW5jZSkudG9CZSh0LmV4cGVjdGVkU2NvcmUuY29uZmlkZW5jZSlcclxuICAgICAgICAgICAgICAgIGlmIChyZXN1bHQucmVsZXZhbmNlICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGV4cGVjdChyZXN1bHQucmVsZXZhbmNlKS50b0JlKHQuZXhwZWN0ZWRTY29yZS5yZWxldmFuY2UpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9LFxyXG4gICAgKTtcclxufVxyXG4iXX0=