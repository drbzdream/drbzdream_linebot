require('source-map-support/register')
module.exports =
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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var express = __webpack_require__(2);
var line = __webpack_require__(6);

__webpack_require__(5).config();

// config line developer account
var config = {
    channelAccessToken: "Vj8BrPqUF2Bi9oIPc6BGCu2RWLWy+aQ3PXW9pZ/U4eIbWM4N49ikkjpljzsaBlaA06etw9YjT+9uzF0oeY/Tm6AleDmYC43kIufQvfi+O1PtSxMjvFDZ7wdKWhyyY6KYXMzG13rkG7olCk0Z9wdRQgdB04t89/1O/w1cDnyilFU=",
    channelSecret: "81bf39e163e77999a7e9160ab05aa0be"
};
var client = new line.Client(config);

// setup server
var app = express();
app.set('port', process.env.PORT || 9090);
app.listen(app.get('port'), function () {
    console.log('Production Express server API running at localhost:' + app.get('port'));
});

app.get('/', function (req, res) {
    res.send('Hello!!! This is server for DrbzDream bot');
});

app.post('/webhook', line.middleware(config), function (req, res) {
    Promise.all(req.body.events.map(handleEvent)).then(function (result) {
        return res.json(result);
    });
});

function handleEvent(event) {
    console.log(event);
    if (event.type === 'message') {
        handleMessageEvent(event);
    } else {
        return Promise.resolve(null);
    }
}

// detect msg 
function handleMessageEvent(event) {
    var msg = {
        type: 'text',
        text: 'น้องยังโง่ รอน้องหน่อยเน้ออออ น้องจะตอบคำถามที่ดูฉลาดกว่านี้ <3'
    };

    if (event.message.type === 'text') {
        var eventText = event.message.text.toLowerCase();

        if (eventText === 'ขอดูหน่อย') {
            msg = {
                'type': 'image',
                'originalContentUrl': 'https://www.thesun.co.uk/wp-content/uploads/2017/03/fifa-17-2.jpg?strip=all&w=742&quality=100',
                'previewImageUrl': 'https://images.performgroup.com/di/library/GOAL/a6/bb/fifa-18-ronaldo_lx3r88bpjpk91re36ukdgomrj.jpg?t=2027563652&w=620&h=430'
            };
        } else if (eventText === 'อยู่ไหน') {
            msg = {
                "type": "location",
                "title": "my location",
                "address": "〒150-0002 東京都渋谷区渋谷２丁目２１−１",
                "latitude": 35.65910807942215,
                "longitude": 139.70372892916203
            };
        }
    } else if (event.message.type === 'sticker') {
        msg = {
            "type": "sticker",
            "packageId": "1",
            "stickerId": "1"
        };
    }

    return client.replyMessage(event.replyToken, msg);
}

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 3 */,
/* 4 */,
/* 5 */
/***/ (function(module, exports) {

module.exports = require("dotenv");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("@line/bot-sdk");

/***/ })
/******/ ]);
//# sourceMappingURL=main.map