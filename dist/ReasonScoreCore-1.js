var ReasonScoreCore =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/ReasonScoreMath.js":
/*!********************************!*\
  !*** ./src/ReasonScoreMath.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nclass ReasonScoreMath {\r\n  static calculateReasonScore(id, childEdges, childScores, previousParentScore) {\r\n\r\n    let score = {}\r\n    if (previousParentScore) {\r\n      score = JSON.parse(JSON.stringify(previousParentScore));\r\n    } else {\r\n      score = {\r\n        claimId: id,\r\n        relevance: 1,\r\n        strengthTotal: 0,\r\n        weightTotal: 0,\r\n      };\r\n    }\r\n\r\n  //If there are no children that affect the truth of the claim then assume the claim is 100% true and start strength at 1\r\n  if(childEdges === undefined\r\n    || childEdges.length < 1\r\n    || childEdges.filter(e => e.affects === 'truth').length < 1) {\r\n  score.strengthTotal = 1;\r\n  score.weightTotal = 1;\r\n}\r\n\r\n// Loop through the children (edges) and determine the score of the parent.\r\nchildEdges.forEach((edge) => {\r\n  const childScore = childScores.filter(s => s.claimId === edge.child)[0];\r\n\r\n  // Process Truth child claims\r\n  if (edge.affects === 'truth') {\r\n    if (edge.reversable) {\r\n      childScore.weight = childScore.score * childScore.relevance;\r\n    } else {\r\n      childScore.weight = Math.max(0, childScore.score) * childScore.relevance;\r\n    }\r\n    score.weightTotal += childScore.weight;\r\n\r\n    if (edge.pro) {\r\n      childScore.strength = childScore.weight * childScore.score;\r\n    } else {\r\n      childScore.strength = childScore.weight * -childScore.score;\r\n    }\r\n\r\n    score.strengthTotal += childScore.strength;\r\n\r\n    childScore.display = `${Math.round(childScore.weight * 100)}%`;// * (edge.pro ? 1 : -1)}%`;\r\n    // childScore.display += \" (\"\r\n    //     + childScore.strengthTotal.toString().substring(0,4) + \":\"\r\n    //     + childScore.weightTotal.toString().substring(0,4) + \":\"\r\n    //     + childScore.strength.toString().substring(0,4) + \":\"\r\n    //     + childScore.weight.toString().substring(0,4) + \":\"\r\n    //     + childScore.relevance.toString().substring(0,4)\r\n    //    + \")\";\r\n  }\r\n\r\n  // Process Relevance child claims\r\n  if (edge.affects === 'relevance') {\r\n    if (edge.pro) {\r\n      childScore.relevance = 1 + childScore.score;\r\n    } else {\r\n      childScore.relevance = 1 - (childScore.score / 2);\r\n    }\r\n    score.relevance *= childScore.relevance;\r\n    childScore.display = `X${childScore.relevance}`;\r\n  }\r\n});\r\n\r\nif (score.weightTotal === 0) {\r\n  score.score = 0;\r\n} else {\r\n  score.score = score.strengthTotal / score.weightTotal;\r\n}\r\n\r\nscore.display = `${Math.round(score.score * 100)}%`;\r\n\r\nreturn score;\r\n  }\r\n}\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (ReasonScoreMath);\r\n\n\n//# sourceURL=webpack://ReasonScoreCore/./src/ReasonScoreMath.js?");

/***/ }),

/***/ "./src/ViewModelBuilder.js":
/*!*********************************!*\
  !*** ./src/ViewModelBuilder.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./data */ \"./src/data.js\");\n/* harmony import */ var _ReasonScoreMath__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ReasonScoreMath */ \"./src/ReasonScoreMath.js\");\n\r\n\r\n\r\nclass ViewModelBuilder {\r\n    constructor(setState, topClaimId) {\r\n        this.setState = setState;\r\n        this.topClaimId = topClaimId;\r\n        this.data = new _data__WEBPACK_IMPORTED_MODULE_0__[\"default\"](topClaimId, this.updateState.bind(this));\r\n        this.state = {\r\n            vm: this.buildViewModel(this.topClaimId, this.topClaimId, []),\r\n            data: this.data\r\n        };\r\n    }\r\n\r\n    updateState() {\r\n        this.setState({\r\n            vm: this.buildViewModel(this.topClaimId, this.topClaimId, [])\r\n        });\r\n    }\r\n\r\n    onSelect(vm) {\r\n        this.selectedVm = vm;\r\n        this.setState({\r\n            vm: this.buildViewModel(this.topClaimId, this.topClaimId, [])\r\n        });\r\n    }\r\n\r\n    newChild(vm, pro) {\r\n        var newClaim = {\r\n            type: \"claim\",\r\n            id: this.data.newId(),\r\n            content: \"\",\r\n        };\r\n        var newArgument = {\r\n            type: \"argument\",\r\n            id: this.data.newId(),\r\n            parent: vm.claim.id,\r\n            child: newClaim.id,\r\n            scope: vm.claim.id,\r\n            pro: pro,\r\n            affects: \"truth\"\r\n        };\r\n        this.data.sendTransaction([\r\n            {\r\n                id: newClaim.id,\r\n                act: 'add',\r\n                new: newClaim,\r\n            }, {\r\n                id: newArgument.id,\r\n                act: 'add',\r\n                new: newArgument,\r\n            }\r\n        ]);\r\n    }\r\n\r\n    buildViewModel(topId, parentClaimId, ancestors, conTop) {\r\n        const childArguments = this.data.getArguments(parentClaimId, ancestors);\r\n        const childVms = [];\r\n        const childScores = [];\r\n        const childIds = [];\r\n\r\n        childArguments.forEach((argument) => {\r\n            const childAncestors = ancestors.slice();\r\n            childAncestors.push(parentClaimId);\r\n            const childVm = this.buildViewModel(topId, argument.child, childAncestors,\r\n                argument.pro ? conTop : !conTop);\r\n            childVm.argument = argument;\r\n            childVms.push(childVm);\r\n        });\r\n\r\n        const vm = {\r\n            id: '',\r\n            topId,\r\n            childId: parentClaimId,\r\n            children: [],\r\n        };\r\n\r\n        vm.id = ancestors.join('/');\r\n        if (vm.id.length > 0) {\r\n            vm.id += '/';\r\n        }\r\n        vm.id += parentClaimId;\r\n\r\n\r\n        childVms.forEach((childVm) => {\r\n            childScores.push(childVm.score);\r\n            if (!childVm.score.id) {\r\n                childVm.score.id = this.data.newId();\r\n            }\r\n            childIds.push({\r\n                scoreId: childVm.score.id,\r\n                claimId: childVm.claimId\r\n            });\r\n        });\r\n\r\n        //add everything in\r\n        vm.score = _ReasonScoreMath__WEBPACK_IMPORTED_MODULE_1__[\"default\"].calculateReasonScore(parentClaimId, childArguments, childScores);\r\n        vm.children = childVms;\r\n        vm.childIds = childIds\r\n        vm.conTop = conTop;\r\n        vm.className = 'claim' + (vm.conTop ? ' con' : ' pro');\r\n        vm.claim = this.data.getClaim(parentClaimId);\r\n        vm.content = vm.claim.content;\r\n        //vm.display = vm.score.display;\r\n        if (this.selectedVm && vm.id === this.selectedVm.id) {\r\n            vm.selected = true\r\n            vm.unSelect = () => this.onSelect();\r\n        } else {\r\n            vm.onSelect = () => this.onSelect(vm);\r\n        }\r\n        vm.increase = () => this.newChild(vm, true);\r\n        vm.decrease = () => this.newChild(vm, false);\r\n        vm.sendTransaction = this.data.sendTransaction.bind(this.data);\r\n        return vm;\r\n    }\r\n}\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (ViewModelBuilder);\n\n//# sourceURL=webpack://ReasonScoreCore/./src/ViewModelBuilder.js?");

/***/ }),

/***/ "./src/data.js":
/*!*********************!*\
  !*** ./src/data.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nclass Data {\r\n  constructor(topClaimId, notifyCallback) {\r\n    this.topClaimId = topClaimId;\r\n    this.when = new Date();\r\n    this.notify = notifyCallback;\r\n\r\n    if (!window.ReasonScore) window.ReasonScore = {};\r\n    if (window.ReasonScore.data)\r\n      this.data = window.ReasonScore.data\r\n    else\r\n      this.data = {};\r\n      \r\n    //Set up singleton transaction processor\r\n    if (!window.ReasonScore.TransactionProcessors) {\r\n      window.ReasonScore.TransactionProcessors = [];\r\n    }\r\n    window.ReasonScore.TransactionProcessors.push(this.processTransaction.bind(this))\r\n  }\r\n\r\n  notify() {\r\n    //this function will be replaced by the calling function. Left here to prevent coding errors.\r\n  }\r\n\r\n  getClaim(claimId) {\r\n    //Pull the claims from the local store\r\n    const claims = Object.values(this.data.items).filter(claim =>\r\n      claim.id === claimId\r\n      && new Date(claim.start) <= this.when\r\n      && new Date(claim.end) >= this.when\r\n    )\r\n    if (claims.length < 1) { debugger; }\r\n    return claims[0];\r\n  }\r\n\r\n  getArguments(parent, ancestors, when) {\r\n    return Object.values(this.data.items).filter(edge =>\r\n      edge.parent === parent\r\n      && new Date(edge.start) <= this.when\r\n      && new Date(edge.end) > this.when\r\n      && (ancestors.includes(edge.scope)\r\n        || edge.scope === parent))\r\n  }\r\n\r\n  sendTransaction(transaction) {\r\n    var id = this.newId();\r\n    var start = new Date().toJSON();\r\n    //var end = \"3000-01-01T00:00:00.000Z\";\r\n    for (const action of transaction) {\r\n      action.ver = this.newId();\r\n      action.trans = id;\r\n      action.start = start;\r\n    };\r\n\r\n    for (const processTransaction of window.ReasonScore.TransactionProcessors) {\r\n      processTransaction(transaction)\r\n    }\r\n  }\r\n\r\n  processTransaction(transaction) {\r\n    const items = this.data.items;\r\n    for (const action of transaction) {\r\n      items[action.ver] = { ...action.old, ...action.new, ver: action.ver, start: action.start, end: \"3000-01-01T00:00:00.000Z\" };\r\n      if (action.old) {\r\n        items[action.old.ver] = { ...action.old, end: action.start }\r\n      }\r\n      this.when = new Date(action.start);\r\n      this.notify();\r\n    }\r\n  }\r\n\r\n  newId() {\r\n    // take the current UTC date and convert to base 62\r\n    let decimal = 5000000000000 - new Date();\r\n    const s = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');\r\n    let result = '';\r\n    while (decimal >= 1) {\r\n      result = s[(decimal - (62 * Math.floor(decimal / 62)))] + result;\r\n      decimal = Math.floor(decimal / 62);\r\n    }\r\n\r\n    // Add 5 extra random characters in case multiple ids are creates at the same time\r\n    result += Array(5).join().split(',').map(() => s[(Math.floor(Math.random() * s.length))])\r\n      .join('');\r\n\r\n    return result;\r\n  }\r\n}\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (Data);\r\n\n\n//# sourceURL=webpack://ReasonScoreCore/./src/data.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! exports provided: data, ReasonScoreMath, ViewModelBuilder */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./data */ \"./src/data.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"data\", function() { return _data__WEBPACK_IMPORTED_MODULE_0__[\"default\"]; });\n\n/* harmony import */ var _ReasonScoreMath__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ReasonScoreMath */ \"./src/ReasonScoreMath.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"ReasonScoreMath\", function() { return _ReasonScoreMath__WEBPACK_IMPORTED_MODULE_1__[\"default\"]; });\n\n/* harmony import */ var _ViewModelBuilder__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ViewModelBuilder */ \"./src/ViewModelBuilder.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"ViewModelBuilder\", function() { return _ViewModelBuilder__WEBPACK_IMPORTED_MODULE_2__[\"default\"]; });\n\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\n\n//# sourceURL=webpack://ReasonScoreCore/./src/index.js?");

/***/ })

/******/ });