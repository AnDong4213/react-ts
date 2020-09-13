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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.react.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.react.ts":
/*!****************************!*\
  !*** ./src/index.react.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var isDone1 = false;\r\nvar num = 18;\r\nvar num2 = 4104;\r\nvar x = [9, 'oo'];\r\nvar per = {\r\n    id: 9,\r\n    name: 'yo'\r\n};\r\nvar Animal = /** @class */ (function () {\r\n    function Animal(name) {\r\n        this.name = name;\r\n    }\r\n    Animal.prototype.run = function () {\r\n        return this.name + \" is running\";\r\n    };\r\n    Animal.isAnimal = function (a) {\r\n        return a instanceof Animal;\r\n    };\r\n    Animal.categoies = ['mammal', 'bird'];\r\n    return Animal;\r\n}());\r\nconsole.log(Animal.categoies);\r\nvar anake = new Animal('b');\r\nconsole.log(Animal.isAnimal(anake));\r\nvar Car = /** @class */ (function () {\r\n    function Car() {\r\n    }\r\n    Car.prototype.switchRadio = function () {\r\n    };\r\n    return Car;\r\n}());\r\nvar Cellphone = /** @class */ (function () {\r\n    function Cellphone() {\r\n    }\r\n    Cellphone.prototype.switchRadio = function () {\r\n    };\r\n    Cellphone.prototype.checkBatteryStatus = function () {\r\n        return 9;\r\n    };\r\n    return Cellphone;\r\n}());\r\nvar Cellphone2 = /** @class */ (function () {\r\n    function Cellphone2() {\r\n    }\r\n    Cellphone2.prototype.switchRadio = function () {\r\n    };\r\n    Cellphone2.prototype.checkBatteryStatus = function () { };\r\n    return Cellphone2;\r\n}());\r\n// console.log('Direction', Direction)  // Direction is not defined  必须console的是Direction.Up\r\nconsole.log('Direction', 0 /* Up */);\r\nconsole.log('Direction', \"Up\" /* Up */);\r\nfunction echo(arg) {\r\n    return arg;\r\n}\r\nvar result = echo(123);\r\nfunction swap(tuple) {\r\n    return [tuple[1], tuple[0]];\r\n}\r\nvar result2 = swap(['book', 99]);\r\nfunction echoWithArr(arg) {\r\n    console.log(arg.length);\r\n    return arg;\r\n}\r\nvar arrs = echoWithArr([1, '2', 3]);\r\nfunction echoWithArr2(arg) {\r\n    console.log(arg.length);\r\n    return arg;\r\n}\r\nvar str = echoWithArr2('abc');\r\nvar obj = echoWithArr2({ length: 0 });\r\nconsole.log('---------------------------------------------------------');\r\n/* const arrg = [9, 6]\r\nconsole.log(arrg)\r\nconsole.log(arrg.unshift(87))\r\nconsole.log(arrg)\r\nconsole.log(arrg.shift())\r\nconsole.log(arrg) */\r\n// 泛型类\r\nvar Queue = /** @class */ (function () {\r\n    function Queue() {\r\n        this.data = [];\r\n    }\r\n    Queue.prototype.push = function (item) {\r\n        return this.data.push(item);\r\n    };\r\n    Queue.prototype.pop = function () {\r\n        return this.data.shift();\r\n    };\r\n    return Queue;\r\n}());\r\nvar queue = new Queue();\r\nqueue.push(44);\r\nqueue.push(22);\r\nconsole.log(typeof queue.pop());\r\nconsole.log(queue.pop().toFixed());\r\nvar queue2 = new Queue();\r\nqueue2.push('str');\r\nconsole.log(queue2.pop());\r\nvar kp1 = {\r\n    key: 'str',\r\n    value: 9\r\n};\r\nvar list = [9, 8, 6];\r\nfunction plus(a, b) {\r\n    return a + b;\r\n}\r\nvar a = plus;\r\nfunction sum(a, b) {\r\n    return a + b;\r\n}\r\n// const sum2: (x: number, y: number) => number = sum\r\nvar sum2 = sum;\r\nfunction getName(n) {\r\n    if (typeof n === 'string') {\r\n        return n;\r\n    }\r\n    else {\r\n        return n();\r\n    }\r\n}\r\n// 类型断言  不是类型转换\r\nfunction getLength(input) {\r\n    /* const str = input as String\r\n    if (str.length) {\r\n      return str.length\r\n    } else {\r\n      const number = input as Number;\r\n      return number.toString().length\r\n    } */\r\n    if (input.length) {\r\n        return input.length;\r\n    }\r\n    else {\r\n        return input.toString().length;\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack:///./src/index.react.ts?");

/***/ })

/******/ });