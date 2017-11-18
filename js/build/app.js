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
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const utils = __webpack_require__(7);

class Board {
  constructor(canvas, ctx, fov) {

    this.canvas = canvas;
    this.ctx = ctx;

    this.x = 0;
    this.y = 200;
    this.z = 0;

    //Dimensions of the board
    this.width = this.canvas.width/2 *0.63; //xMax
    this.thickness = 10/400 *this.canvas.width/2; //yMax
    this.length = 720/400 * this.canvas.width/2; //zMax

    this.frontLeftPoint2d = utils.PROJECTOR.get2d(this.x - this.width, this.y, this.z);
    this.frontRightPoint2d = utils.PROJECTOR.get2d(this.x + this.width, this.y, this.z);
    this.backRightPoint2d = utils.PROJECTOR.get2d(this.x + this.width, this.y, this.z + this.length);
    this.backLeftPoint2d = utils.PROJECTOR.get2d(this.x - this.width, this.y, this.z + this.length);
    this.frontLeftoint2d = utils.PROJECTOR.get2d(this.x - this.width, this.y, this.z);
    this.frontLeftBottomPoint2d = utils.PROJECTOR.get2d(this.x - this.width, this.y + this.thickness, this.z);
    this.frontRightBottomPoint2d = utils.PROJECTOR.get2d(this.x + this.width, this.y + this.thickness, this.z);
    this.frontRightTopPoint2d = utils.PROJECTOR.get2d(this.x + this.width, this.y, this.z);


    this.drawBoard();
  }
  drawBoard() {

    //outer white surface drawing
    this.ctx.beginPath();
    //outer white surface path
    this.outerWhiteSurface();
    this.ctx.stroke();
    this.ctx.fillStyle = "white";
    this.ctx.fill()
    this.ctx.closePath();


    //inner surface drawing
    this.ctx.beginPath();
    //inner surface path
    this.innerSurface();
    this.ctx.stroke();
    this.ctx.fillStyle = "#24529b";
    this.ctx.fill();
    this.ctx.closePath();

    //center border drawing
    this.ctx.beginPath();
    //center border path
    this.centerBorder();
    this.ctx.fillStyle = "white";
    this.ctx.fill()
    this.ctx.closePath();

    //board-thickness drawing
    this.ctx.beginPath();
    //board-thickness path
    this.boardThickness();
    this.ctx.stroke();
    this.ctx.fillStyle = "#122c5f";
    this.ctx.fill()
    this.ctx.closePath();
  }
  outerWhiteSurface() {
    this.ctx.moveTo(this.frontLeftPoint2d.x2d, this.frontLeftPoint2d.y2d);
    this.ctx.lineTo(this.frontRightPoint2d.x2d, this.frontRightPoint2d.y2d);
    this.ctx.lineTo(this.backRightPoint2d.x2d, this.backRightPoint2d.y2d);
    this.ctx.lineTo(this.backLeftPoint2d.x2d, this.backLeftPoint2d.y2d);
    this.ctx.lineTo(this.frontLeftoint2d.x2d, this.frontLeftoint2d.y2d);
  }

  innerSurface() { //front-left point
    this.ctx.moveTo(this.frontLeftPoint2d.x2d + 0.01*this.width * utils.PROJECTOR.get2dLength(0.02*this.width, this.z), this.frontLeftPoint2d.y2d - utils.PROJECTOR.get2dLength(0.02*this.width, this.z));
    //front-right point
    this.ctx.lineTo(this.frontRightPoint2d.x2d - 0.01*this.width * utils.PROJECTOR.get2dLength(0.02*this.width, this.z), this.frontRightPoint2d.y2d - utils.PROJECTOR.get2dLength(0.02*this.width, this.z));
    //back-right point
    this.ctx.lineTo(this.backRightPoint2d.x2d - utils.PROJECTOR.get2dLength(0.02*this.width, this.length), this.backRightPoint2d.y2d + utils.PROJECTOR.get2dLength(0.02*this.width, this.length));
    //back-left point
    this.ctx.lineTo(this.backLeftPoint2d.x2d + utils.PROJECTOR.get2dLength(0.02*this.width, this.length), this.backLeftPoint2d.y2d + utils.PROJECTOR.get2dLength(0.02*this.width, this.length));
    //front-left point
    this.ctx.lineTo(this.frontLeftoint2d.x2d + 0.01*this.width * utils.PROJECTOR.get2dLength(0.02*this.width, this.z), this.frontLeftoint2d.y2d - utils.PROJECTOR.get2dLength(0.02*this.width, this.z));
  }
  centerBorder() {
    this.ctx.moveTo(this.frontLeftPoint2d.x2d + utils.PROJECTOR.get2dLength(this.width - 0.01*this.width, 0), this.frontLeftPoint2d.y2d);
    this.ctx.lineTo(this.backLeftPoint2d.x2d + utils.PROJECTOR.get2dLength(this.width - 0.01*this.width, this.length), this.backLeftPoint2d.y2d);
    this.ctx.lineTo(this.backLeftPoint2d.x2d + utils.PROJECTOR.get2dLength(this.width + 0.01*this.width, this.length), this.backLeftPoint2d.y2d);
    this.ctx.lineTo(this.frontLeftPoint2d.x2d + utils.PROJECTOR.get2dLength(this.width + 0.01*this.width, 0), this.frontLeftPoint2d.y2d);

  }
  boardThickness() {

    this.ctx.moveTo(this.frontLeftPoint2d.x2d, this.frontLeftPoint2d.y2d);
    //front-left-bottom point
    this.ctx.lineTo(this.frontLeftBottomPoint2d.x2d, this.frontLeftBottomPoint2d.y2d);
    //front-right-bottom point
    this.ctx.lineTo(this.frontRightBottomPoint2d.x2d, this.frontRightBottomPoint2d.y2d);
    //front-right-top point
    this.ctx.lineTo(this.frontRightTopPoint2d.x2d, this.frontRightTopPoint2d.y2d);
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Board;



/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Board_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Ball_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Bat_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Game_js__ = __webpack_require__(5);




const utils = __webpack_require__(7)
// import {script} from "../script.js"


let game = new __WEBPACK_IMPORTED_MODULE_3__Game_js__["a" /* Game */]();
let draw = () => {


  game.ctx.clearRect(0, 0, game.canvas.width, game.canvas.height);
  game.board.drawBoard();
  game.ball.updatePosition();
  if (game.ball.z > -100)
    game.ball.draw();
  game.bat.drawBat();
  if(game.ball.z < 0 && game.ball.x > game.bat.x-game.bat.r   && game.ball.x <game.bat.x+game.bat.r  ){
    console.log("reflected");
    game.ball.reflect();
    game.ball.z = 10;
  }
  window.requestAnimationFrame(draw);
}
window.requestAnimationFrame(draw)


/***/ }),
/* 2 */,
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const utils = __webpack_require__(7)

class Ball {
  constructor(ctx, board, x, y, z) {

    this.ctx = ctx;
    this.board = board;
    this.x = x;
    this.y = y;
    this.z = z;

    this.r = 10 / 400 * this.board.width;
    this.dx = 1 / 400 * this.board.width;
    // this.dy = 0;
    this.dy = 3 / 400 * this.board.width;
    this.dz = 5 / 400 * this.board.width;

  }

  draw() {

    this.center2d = utils.PROJECTOR.get2d(this.x, this.y, this.z)
    this.ctx.beginPath();
    this.ctx.arc(this.center2d.x2d, this.center2d.y2d, utils.PROJECTOR.get2dLength(this.r, this.z), 0, Math.PI * 2)
    this.ctx.fillStyle = "#f4d443";
    this.ctx.fill();
    this.strokeStyle = "#837d66";
    // this.ctx.stroke();
    this.ctx.closePath();
  }

  reflect() {
    this.dz = -this.dz;
  }
  bounce() {
    this.dy = -this.dy;
  }
  sideCheck() {
    this.dx = -this.dx;

  }
  updatePosition() {
    this.x += this.dx;
    this.y += this.dy;
    this.z += this.dz;

    if (this.x > this.board.x + this.board.width - this.r) {
      this.sideCheck();
    }
    if (this.x < this.board.x - this.board.width - this.r) {
      this.sideCheck();
    }

    if (this.y > this.board.y - this.r) {
      this.bounce();
    }
    if (this.y < 0) {
      this.bounce();
    }
    if (this.z < -100) this.reflect();
    if (this.z > this.board.length) {
      this.reflect();
    }
  }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = Ball;



/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const utils = __webpack_require__(7)
class Bat {
  constructor(canvas, ctx, board) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.board = board;
    this.x = 0;
    this.y = canvas.width / 2;
    this.z = 0;
    this.r = 5 * 10 / 400 * this.board.width;

    this.canvas.addEventListener('mousemove', (evt) => {
      this.x = evt.clientX;
      this.y = evt.clientY;
    }, false);
  }
  drawBat() {


    this.ctx.beginPath();
    this.batPaddle();

    this.ctx.closePath();
  }
  batPaddle() {
    this.ctx.arc(this.x, this.y, utils.PROJECTOR.get2dLength(this.r, this.z), Math.PI / 2, Math.PI * 2);
    this.ctx.fillStyle = "#9c0710";
    this.ctx.fill();
    this.ctx.closePath();
    this.ctx.beginPath();
    this.ctx.moveTo(this.x + this.r, this.y);
    this.ctx.lineTo(this.x + this.r, this.y + 0.7*this.r);
    this.ctx.lineTo(this.x + this.r + 0.4*this.r, this.y + 0.7*this.r + 0.4*this.r)
    this.ctx.lineTo(this.x + 0.7*this.r + 0.4*this.r, this.y + this.r + 0.4*this.r)
    this.ctx.lineTo(this.x + 0.7*this.r, this.y + this.r)
    this.ctx.lineTo(this.x, this.y + this.r)
    this.ctx.fillStyle = "#aa9f7f";
    this.ctx.fill();

  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Bat;



/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Board_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Ball_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Bat_js__ = __webpack_require__(4);



const utils = __webpack_require__(7)

class Game {
  constructor() {
    this.canvas = document.getElementById('gameCanvas');
    // this.canvas.style.border = "#000 1px solid"
    this.canvas.width = window.innerWidth;
    this.canvas.height = (window.innerHeight - 4);
    utils.PROJECTOR.setCanvas(this.canvas);
    this.ctx = this.canvas.getContext('2d');
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.board = new __WEBPACK_IMPORTED_MODULE_0__Board_js__["a" /* Board */](this.canvas, this.ctx);
    this.ball = new __WEBPACK_IMPORTED_MODULE_1__Ball_js__["a" /* Ball */](this.ctx, this.board, 0, 0, 10);
    this.ball.draw();

    this.bat = new __WEBPACK_IMPORTED_MODULE_2__Bat_js__["a" /* Bat */](this.canvas, this.ctx, this.board);
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Game;



/***/ }),
/* 6 */,
/* 7 */
/***/ (function(module, exports) {

let utils = {
  PROJECTOR : {
      eye2plane : 600,

    setCanvas:(canvas)=> {
      utils.PROJECTOR.canvas = canvas;
    },

    get2d:(x, y, z)=> {

      let scale = utils.PROJECTOR.eye2plane / (utils.PROJECTOR.eye2plane + z);
      let x2d = x * scale + utils.PROJECTOR.canvas.width / 2;
      let y2d = y * scale + utils.PROJECTOR.canvas.height / 2;

      return {
        x2d: x2d,
        y2d: y2d
      };

    },

    get2dLength:(l, z)=> {
      let scale = utils.PROJECTOR.eye2plane / (utils.PROJECTOR.eye2plane + z);

      return l * scale;
    }

  }

}

module.exports = utils;


/***/ })
/******/ ]);