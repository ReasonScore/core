"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildTestResults = buildTestResults;

async function buildTestResults(expectations, repository) {
  const results = [];

  for (const expectation of expectations) {
    const pathItems = expectation[0].split(".");
    let result;

    if (pathItems[0] === "getScoresBySourceId") {
      result = (await repository.getScoresBySourceId(pathItems[1]))[0][pathItems[2]];
    }

    results.push([expectation[0], result]);
  }

  return results;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90ZXN0cy9idWlsZFRlc3RSZXN1bHRzLnRzIl0sIm5hbWVzIjpbImJ1aWxkVGVzdFJlc3VsdHMiLCJleHBlY3RhdGlvbnMiLCJyZXBvc2l0b3J5IiwicmVzdWx0cyIsImV4cGVjdGF0aW9uIiwicGF0aEl0ZW1zIiwic3BsaXQiLCJyZXN1bHQiLCJnZXRTY29yZXNCeVNvdXJjZUlkIiwicHVzaCJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUNPLGVBQWVBLGdCQUFmLENBQWdDQyxZQUFoQyxFQUFrRUMsVUFBbEUsRUFBMkY7QUFDOUYsUUFBTUMsT0FBTyxHQUFHLEVBQWhCOztBQUNBLE9BQUssTUFBTUMsV0FBWCxJQUEwQkgsWUFBMUIsRUFBd0M7QUFDcEMsVUFBTUksU0FBUyxHQUFHRCxXQUFXLENBQUMsQ0FBRCxDQUFYLENBQWVFLEtBQWYsQ0FBcUIsR0FBckIsQ0FBbEI7QUFDQSxRQUFJQyxNQUFKOztBQUNBLFFBQUlGLFNBQVMsQ0FBQyxDQUFELENBQVQsS0FBaUIscUJBQXJCLEVBQTRDO0FBQ3hDRSxNQUFBQSxNQUFNLEdBQUksQ0FBQyxNQUFNTCxVQUFVLENBQUNNLG1CQUFYLENBQStCSCxTQUFTLENBQUMsQ0FBRCxDQUF4QyxDQUFQLEVBQXFELENBQXJELENBQUQsQ0FBaUVBLFNBQVMsQ0FBQyxDQUFELENBQTFFLENBQVQ7QUFDSDs7QUFDREYsSUFBQUEsT0FBTyxDQUFDTSxJQUFSLENBQWEsQ0FDVEwsV0FBVyxDQUFDLENBQUQsQ0FERixFQUVURyxNQUZTLENBQWI7QUFJSDs7QUFDRCxTQUFPSixPQUFQO0FBQ0giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBpUmVwb3NpdG9yeSB9IGZyb20gXCIuLi9kYXRhTW9kZWxzL2lSZXBvc2l0b3J5XCI7XHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBidWlsZFRlc3RSZXN1bHRzKGV4cGVjdGF0aW9uczogKHN0cmluZyB8IGFueSlbXVtdLCByZXBvc2l0b3J5OiBpUmVwb3NpdG9yeSkge1xyXG4gICAgY29uc3QgcmVzdWx0cyA9IFtdO1xyXG4gICAgZm9yIChjb25zdCBleHBlY3RhdGlvbiBvZiBleHBlY3RhdGlvbnMpIHtcclxuICAgICAgICBjb25zdCBwYXRoSXRlbXMgPSBleHBlY3RhdGlvblswXS5zcGxpdChcIi5cIik7XHJcbiAgICAgICAgbGV0IHJlc3VsdDogYW55O1xyXG4gICAgICAgIGlmIChwYXRoSXRlbXNbMF0gPT09IFwiZ2V0U2NvcmVzQnlTb3VyY2VJZFwiKSB7XHJcbiAgICAgICAgICAgIHJlc3VsdCA9ICgoYXdhaXQgcmVwb3NpdG9yeS5nZXRTY29yZXNCeVNvdXJjZUlkKHBhdGhJdGVtc1sxXSkpWzBdIGFzIGFueSlbcGF0aEl0ZW1zWzJdXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmVzdWx0cy5wdXNoKFtcclxuICAgICAgICAgICAgZXhwZWN0YXRpb25bMF0sXHJcbiAgICAgICAgICAgIHJlc3VsdFxyXG4gICAgICAgIF0pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJlc3VsdHM7XHJcbn1cclxuIl19