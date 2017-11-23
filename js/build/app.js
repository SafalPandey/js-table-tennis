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
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

let utils = {
  PROJECTOR: {
    cameraPosition: {
      x: 0,
      y: -100,
      z: -400
    },
    cameraOrientation: {
      x: -Math.PI / 4,
      y: 0,
      z: 0
    },

    canvas: {
      width: null,
      height: null
    },

    viewerPosition: {
      x: 0,
      y: 0,
      z: 500
    },

    eye2plane: 800,

    setCanvas: (canvas) => {
      utils.PROJECTOR.canvas = canvas;
      utils.PROJECTOR.viewerPosition.x = -canvas.width / 2;
      utils.PROJECTOR.viewerPosition.x = -canvas.width / 2;
      utils.PROJECTOR.viewerPosition.y = -500;
    },

    get2d: (x, y, z) => {

      // let scale = utils.PROJECTOR.eye2plane / (utils.PROJECTOR.eye2plane + z);
      let cx = Math.cos(utils.PROJECTOR.cameraOrientation.x);
      let sx = Math.sin(utils.PROJECTOR.cameraOrientation.x);
      let cy = Math.cos(utils.PROJECTOR.cameraOrientation.y);
      let sy = Math.sin(utils.PROJECTOR.cameraOrientation.y);
      let cz = Math.cos(utils.PROJECTOR.cameraOrientation.z);
      let sz = Math.sin(utils.PROJECTOR.cameraOrientation.z);

      let X = (x - utils.PROJECTOR.cameraPosition.x);
      let Y = (y - utils.PROJECTOR.cameraPosition.y);
      let Z = (z - utils.PROJECTOR.cameraPosition.z);

      let xWithRespectToCam = cy * (sz * Y + cz * X) - sy * Z;
      let yWithRespectToCam = sx * (cy * Z + sy * (sz * Y + cz * X)) + cx * (cz * Y - sz * X);
      let zWithRespectToCam = cx * (cy * Z + sy * (sz * Y + cz * X)) - sx * (cz * Y - sz * X);

      let zWithRespectToCamInverse = 1 / zWithRespectToCam;

      let x2d = xWithRespectToCam * (zWithRespectToCamInverse) * utils.PROJECTOR.viewerPosition.z - utils.PROJECTOR.viewerPosition.x;

      let y2d = yWithRespectToCam * zWithRespectToCamInverse * utils.PROJECTOR.viewerPosition.z - utils.PROJECTOR.viewerPosition.y;

      return {
        x2d: x2d,
        y2d: y2d
      };

    },

    get2dLength: (l, z) => {
      let scale = utils.PROJECTOR.eye2plane / (utils.PROJECTOR.eye2plane + z);

      return l * scale;
    },

    get3d: (x2d, y2d) => {

      let cx = Math.cos(utils.PROJECTOR.cameraOrientation.x);
      let sx = Math.sin(utils.PROJECTOR.cameraOrientation.x);
      let cy = Math.cos(utils.PROJECTOR.cameraOrientation.y);
      let sy = Math.sin(utils.PROJECTOR.cameraOrientation.y);
      let cz = Math.cos(utils.PROJECTOR.cameraOrientation.z);
      let sz = Math.sin(utils.PROJECTOR.cameraOrientation.z);

      let y =   utils.BAT_Y_POSITION;


      let Y = (y - utils.PROJECTOR.cameraPosition.y);

      let numeratorZ = Y * -1 * (utils.PROJECTOR.viewerPosition.z * cx * cz + y2d * sx * cz + utils.PROJECTOR.viewerPosition.y * sx * cz)
      let denumeratorZ = cy * (utils.PROJECTOR.viewerPosition.z * sx - y2d * cx - utils.PROJECTOR.viewerPosition.y * cx)
      let Z = numeratorZ / denumeratorZ;


      let numeratorX = (x2d + utils.PROJECTOR.viewerPosition.x) * (cx * cy * Z - sx * cz * Y);
      let denumeratorX = utils.PROJECTOR.viewerPosition.z * cy * cz;

      let X = numeratorX / denumeratorX;

      let x = X + utils.PROJECTOR.cameraPosition.x;
      let z = Z + utils.PROJECTOR.cameraPosition.z;
      return {
        x: Math.floor(x),
        y: Math.floor(y),
        z: Math.floor(z)
      };

    },

  },

  BAT_Y_POSITION: 150,

}

module.exports = utils;


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const utils = __webpack_require__(0);

class Board {
  constructor(canvas, ctx, fov) {

    this.canvas = canvas;
    this.ctx = ctx;

    this.x = 0;
    this.y = 300;
    this.z = 0;

    //Dimensions of the board
    this.width = this.canvas.width / 2 * 0.63; //xMax
    this.thickness = 10 / 400 * this.canvas.width / 2; //yMax
    this.length = 720 / 400 * this.canvas.width / 2; //zMax

    this.frontLeftPoint2d = utils.PROJECTOR.get2d(this.x - this.width, this.y, this.z);
    this.frontRightPoint2d = utils.PROJECTOR.get2d(this.x + this.width, this.y, this.z);
    this.backRightPoint2d = utils.PROJECTOR.get2d(this.x + this.width, this.y, this.z + this.length);
    this.backLeftPoint2d = utils.PROJECTOR.get2d(this.x - this.width, this.y, this.z + this.length);
    this.frontLeftoint2d = utils.PROJECTOR.get2d(this.x - this.width, this.y, this.z);
    this.frontLeftBottomPoint2d = utils.PROJECTOR.get2d(this.x - this.width, this.y + this.thickness, this.z);
    this.frontRightBottomPoint2d = utils.PROJECTOR.get2d(this.x + this.width, this.y + this.thickness, this.z);
    this.frontRightTopPoint2d = utils.PROJECTOR.get2d(this.x + this.width, this.y, this.z);

    this.middleRightPoint2d = utils.PROJECTOR.get2d(this.x + this.width, this.y, this.z + this.length/2);
    this.middleRightTopPoint2d = utils.PROJECTOR.get2d(this.x + this.width, this.y - 55, this.z + this.length/2);
    this.middleLeftPoint2d = utils.PROJECTOR.get2d(this.x - this.width, this.y, this.z + this.length/2);
    this.middleLeftTopPoint2d = utils.PROJECTOR.get2d(this.x - this.width, this.y - 55, this.z + this.length/2);


    this.innerSurfaceFrontLeftPoint2d = utils.PROJECTOR.get2d(this.x - this.width + 10 / 400 * this.width, this.y, this.z + 10 / 400 * this.width);
    this.innerSurfaceFrontRightPoint2d = utils.PROJECTOR.get2d(this.x + this.width - 10 / 400 * this.width, this.y, this.z + 10 / 400 * this.width);
    this.innerSurfaceBackRightPoint2d = utils.PROJECTOR.get2d(this.x + this.width - 10 / 400 * this.width, this.y, this.z + this.length - 10 / 400 * this.width);
    this.innerSurfaceBackLeftPoint2d = utils.PROJECTOR.get2d(this.x - this.width + 10 / 400 * this.width, this.y, this.z + this.length - 10 / 400 * this.width);
    this.innerSurfaceFrontLeftoint2d = utils.PROJECTOR.get2d(this.x - this.width + 10 / 400 * this.width, this.y, this.z + 10 / 400 * this.width);


    this.centerBorderFrontLeftPoint2d = utils.PROJECTOR.get2d(this.x - 5 / 400 * this.width, this.y, this.z);
    this.centerBorderFrontRightPoint2d = utils.PROJECTOR.get2d(this.x + 5 / 400 * this.width, this.y, this.z);
    this.centerBorderBackLeftPoint2d = utils.PROJECTOR.get2d(this.x - 5 / 400 * this.width, this.y, this.z + this.length);
    this.centerBorderBackRightPoint2d = utils.PROJECTOR.get2d(this.x + 5 / 400 * this.width, this.y, this.z + this.length);

    this.netSquare = new Image();
    this.netSquare.src = 'images/netSquare.png';
    this.netSquare.onload = () => {
      this.netPattern = this.ctx.createPattern(this.netSquare, 'repeat');
      this.ctx.fillStyle = this.netPattern;
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }


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
    // this.ctx.arc(utils.PROJECTOR.get2d(this.x, this.y, this.z).x2d, utils.PROJECTOR.get2d(this.x, this.y, this.z).y2d, 10, 0, 2 * Math.PI);
    // this.ctx.fillStyle = "red";
    //net drawing
    this.ctx.beginPath();
    //net path
    this.net();
    this.ctx.fillStyle = this.netPattern;
    this.ctx.fill();
    this.ctx.closePath();
    // this.ctx.fill();
  }
  outerWhiteSurface() {
    this.ctx.moveTo(this.frontLeftPoint2d.x2d, this.frontLeftPoint2d.y2d);
    this.ctx.lineTo(this.frontRightPoint2d.x2d, this.frontRightPoint2d.y2d);
    this.ctx.lineTo(this.backRightPoint2d.x2d, this.backRightPoint2d.y2d);
    this.ctx.lineTo(this.backLeftPoint2d.x2d, this.backLeftPoint2d.y2d);
    this.ctx.lineTo(this.frontLeftoint2d.x2d, this.frontLeftoint2d.y2d);
  }
  net(){
    this.ctx.moveTo(this.middleLeftTopPoint2d.x2d,this.middleLeftTopPoint2d.y2d)
    this.ctx.lineTo(this.middleRightTopPoint2d.x2d,this.middleRightTopPoint2d.y2d)
    this.ctx.lineTo(this.middleRightTopPoint2d.x2d,this.middleRightPoint2d.y2d)
    this.ctx.lineTo(this.middleLeftTopPoint2d.x2d,this.middleLeftPoint2d.y2d)
  }
  innerSurface() {
    //front-left point
    this.ctx.moveTo(this.innerSurfaceFrontLeftPoint2d.x2d, this.innerSurfaceFrontLeftPoint2d.y2d);
    //front-right point
    this.ctx.lineTo(this.innerSurfaceFrontRightPoint2d.x2d, this.innerSurfaceFrontRightPoint2d.y2d);

    //back-right point
    this.ctx.lineTo(this.innerSurfaceBackRightPoint2d.x2d, this.innerSurfaceBackRightPoint2d.y2d);

    //back-left point
    this.ctx.lineTo(this.innerSurfaceBackLeftPoint2d.x2d, this.innerSurfaceBackLeftPoint2d.y2d);

    //front-left point
    this.ctx.lineTo(this.innerSurfaceFrontLeftoint2d.x2d, this.innerSurfaceFrontLeftoint2d.y2d);

  }
  centerBorder() {

    this.ctx.moveTo(this.centerBorderFrontLeftPoint2d.x2d, this.centerBorderFrontLeftPoint2d.y2d)
    this.ctx.lineTo(this.centerBorderFrontRightPoint2d.x2d, this.centerBorderFrontRightPoint2d.y2d)
    this.ctx.lineTo(this.centerBorderBackRightPoint2d.x2d, this.centerBorderBackRightPoint2d.y2d)
    this.ctx.lineTo(this.centerBorderBackLeftPoint2d.x2d, this.centerBorderBackLeftPoint2d.y2d)

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
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const utils = __webpack_require__(0)

class Ball {
  constructor(ctx, board, x, y, z) {

    this.ctx = ctx;
    this.board = board;
    this.x = x;
    this.y = y;
    this.z = z;

    this.r = 10 / 400 * this.board.width;
    // this.dx = 1 / 400 * this.board.width;
    // this.dy = 3 / 400 * this.board.width;
    // this.dz = 5 / 400 * this.board.width;

    this.dx = 0;
    this.dy = 0;
    this.dz = 0;



    this.shadowY = this.board.y;
    this.bounceCount = 0;

  }

  draw() {

    if (this.z < 0) this.shadowY = 600;
    else this.shadowY = this.board.y;

    this.center2d = utils.PROJECTOR.get2d(this.x, this.y, this.z);
    this.shadow = utils.PROJECTOR.get2d(this.x, this.shadowY, this.z);
    let radius2d = utils.PROJECTOR.get2dLength(this.r, this.z);
    //shadow
    this.ctx.beginPath();
    this.ctx.arc(this.shadow.x2d, this.shadow.y2d, radius2d, 0, Math.PI * 2);
    this.ctx.fillStyle = "rgba(68,68,68,0.5)";
    this.ctx.fill();
    this.ctx.closePath();

    //ball
    this.ctx.beginPath();
    this.ctx.arc(this.center2d.x2d, this.center2d.y2d, radius2d, 0, Math.PI * 2);
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

    // if (this.x > this.board.x + this.board.width - this.r) {
      // this.sideCheck();
    // }
    // if (this.x < this.board.x - this.board.width - this.r) {
    //   this.sideCheck();
    // }

    if (this.y > this.board.y - this.r) {
      this.bounceCount++;
      this.bounce();
    }
    if (this.y < 0) {
      this.bounce();
    }
    if (this.z < -100) this.reflect();
    if (this.z > this.board.length) {
      this.bounceCount = 0;
      this.reflect();
    }
  }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = Ball;



/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const utils = __webpack_require__(0)
class Bat {
  constructor(canvas, ctx, board) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.board = board;
    this.x = 0;
    this.y = this.board.y - 150;
    this.z = -10;
    this.r = 5 * 10 / 400 * this.board.width;

    this.lastX = 0
    this.lastZ = 0;
    this.dx = 0;
    this.dz = 0;
    this.mouseX = 0;
    this.mouseY = 0;

  }
  drawBat(hasServed) {


    if(this.x < this.board.x - this.board.width) this.x = this.board.x - this.board.width
    if(this.x > this.board.x + this.board.width) this.x = this.board.x + this.board.width
    // if (this.z < -25) this.z = -25;
    // if (this.z > this.board.z + this.board.length) this.z = 360;
    this.point2d = utils.PROJECTOR.get2d(this.x, this.y, this.z);
    this.dx = this.x - this.lastX;
    this.dz = this.z - this.lastZ;

    // this.ctx.save();
    // this.ctx.translate(this.point2d.x2d,this.point2d.y2d)
    // this.ctx.rotate(Math.PI);

    this.ctx.beginPath();
    // this.batShadow();
    this.batPaddle(hasServed);
    this.ctx.closePath();
    this.lastX = this.x;
    this.lastZ = this.z;
    // console.log(this.dz);
    // this.ctx.rotate(-Math.PI/2);
    // this.ctx.translate(-this.point2d.x2d,-this.point2d.y2d)
    this.ctx.restore();
  }
  batShadow(){

  }
  batPaddle(hasServed) {
    this.ctx.arc(this.point2d.x2d, this.point2d.y2d,utils.PROJECTOR.get2dLength( this.r,this.z), Math.PI / 2, Math.PI * 2);
    // this.ctx.fillStyle = "#9c0710";
    if (hasServed) {
      this.ctx.fillStyle = "rgba(156,7,16,1)";
    }
    else {
      this.ctx.fillStyle = "rgba(156,7,16,0.5)";
    }
    this.ctx.fill();
    this.ctx.closePath();
    this.ctx.beginPath();
    this.ctx.moveTo(this.point2d.x2d +utils.PROJECTOR.get2dLength(  this.r,this.z), this.point2d.y2d);
    this.ctx.lineTo(this.point2d.x2d + utils.PROJECTOR.get2dLength( this.r,this.z), this.point2d.y2d + utils.PROJECTOR.get2dLength( 0.7 * this.r,this.z));
    this.ctx.lineTo(this.point2d.x2d + utils.PROJECTOR.get2dLength( this.r + 0.4 * this.r,this.z), this.point2d.y2d +utils.PROJECTOR.get2dLength(  0.7 * this.r + 0.4 * this.r,this.z))
    this.ctx.lineTo(this.point2d.x2d + utils.PROJECTOR.get2dLength( 0.7 * this.r + 0.4 * this.r,this.z), this.point2d.y2d + utils.PROJECTOR.get2dLength( this.r + 0.4 * this.r,this.z))
    this.ctx.lineTo(this.point2d.x2d + utils.PROJECTOR.get2dLength( 0.7 * this.r,this.z), this.point2d.y2d +utils.PROJECTOR.get2dLength(  this.r,this.z))
    this.ctx.lineTo(this.point2d.x2d, this.point2d.y2d + utils.PROJECTOR.get2dLength( this.r,this.z))
    // this.ctx.fillStyle = "#aa9f7f";
    this.ctx.fillStyle = "rgba(170,159,127,1)";
    this.ctx.fill();

  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Bat;



/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Board_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Ball_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Bat_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Game_js__ = __webpack_require__(5);




const utils = __webpack_require__(0)


let game = new __WEBPACK_IMPORTED_MODULE_3__Game_js__["a" /* Game */]();
game.init();
let draw = () => {
  if (game.hasServed) game.timer++;
  game.drawBackground();
  game.board.drawBoard();
  if (game.ball.y < game.board.y) game.ball.dy += game.gravity * game.timer;
  // else game.ball.dy = 0;
  game.ball.updatePosition();
  if (game.ball.z > 0) game.ball.draw();

  game.bat.drawBat(game.hasServed);

  if(!game.hasServed) game.ball.x = game.bat.x
  if (!game.hasServed && game.bat.dz> 0 && game.bat.z > game.ball.z ) game.serve();
  game.drawScore();
  if (game.hasServed && game.ball.z > game.bat.z - 10 && game.ball.z < game.bat.z && game.ball.x > game.bat.x - game.bat.r && game.ball.x < game.bat.x + game.bat.r && game.ball.y < game.bat.y + game.bat.r ) {
    console.log("reflected");
    game.ball.bounceCount = 0;

    game.awardPoint();
    game.ball.reflect();
    game.ball.z = 10;
  }
  if (game.ball.bounceCount >= 10) {
    game.ball.bounceCount = 0;
    game.removePoint();
    game.anotherBall();
    game.animationLoop = window.requestAnimationFrame(draw);

  }

  else if (game.score == -10) {
    game.over();
  } else {

    game.animationLoop = window.requestAnimationFrame(draw);
  }
}
game.animationLoop = window.requestAnimationFrame(draw)


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Board_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Ball_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Bat_js__ = __webpack_require__(3);



const utils = __webpack_require__(0)

class Game {
  constructor() {
    this.canvas = document.getElementById('gameCanvas');
    // this.canvas.style.border = "#000 1px solid"
    this.canvas.width = window.innerWidth;
    this.canvas.height = (window.innerHeight - 4);
    utils.PROJECTOR.setCanvas(this.canvas);
    this.ctx = this.canvas.getContext('2d');
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);


    this.bgImg = new Image();
    this.bgImg.src = "images/bg1.png";
    this.bgImg.onload = () => {
      this.bgPattern = this.ctx.createPattern(this.bgImg, 'repeat');
      this.ctx.fillStyle = this.bgPattern;
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    this.gravity = 0.003;
    this.isStarted = false;
    this.hasServed = false;
  }

  init() {
    this.board = new __WEBPACK_IMPORTED_MODULE_0__Board_js__["a" /* Board */](this.canvas, this.ctx);
    this.bat = new __WEBPACK_IMPORTED_MODULE_2__Bat_js__["a" /* Bat */](this.canvas, this.ctx, this.board);
    this.ball = new __WEBPACK_IMPORTED_MODULE_1__Ball_js__["a" /* Ball */](this.ctx, this.board, this.bat.x, utils.BAT_Y_POSITION, 10);
    this.timer = 0;
    this.score = 0;

    this.canvas.addEventListener("mouseover", (evt)=>{
      this.bat.point3d = utils.PROJECTOR.get3d(evt.clientX, evt.clientY);
      this.bat.x = this.bat.point3d.x;
      this.bat.y = this.bat.point3d.y;
      this.bat.z = this.bat.point3d.z;

      this.bat.lastX = this.bat.point3d.x;
      this.bat.lastZ = this.bat.point3d.z;
    },false);

    this.canvas.addEventListener('mousemove', (evt) => {
      evt.preventDefault();
      this.bat.point3d = utils.PROJECTOR.get3d(evt.clientX, evt.clientY);
      this.bat.x = this.bat.point3d.x;
      this.bat.y = this.bat.point3d.y;
      this.bat.z = this.bat.point3d.z;

    }, false)


    this.canvas.addEventListener('touchmove', (evt) => {
      evt.preventDefault();
      let touch = evt.touches[0];
      this.bat.point3d = utils.PROJECTOR.get3d(touch.pageX, touch.pageY);
      this.bat.x = this.bat.point3d.x;
      this.bat.y = this.bat.point3d.y;
      this.bat.z = this.bat.point3d.z;
    }, false)

    this.isStarted = true;
  }

  serve() {
    this.ball.dx = 0.1 * this.bat.dx
    this.ball.dz = 0.1 * this.bat.dz;
    this.hasServed = true;
    this.timer = 0;
  }




  awardPoint() {
    this.score++;
  }
  removePoint() {
    this.score--;
    this.hasServed = false;
  }

  anotherBall() {
    this.ball = null;

    this.ball = new __WEBPACK_IMPORTED_MODULE_1__Ball_js__["a" /* Ball */](this.ctx, this.board, this.bat.x, utils.BAT_Y_POSITION, 5);
    this.timer = 0;
  }
  drawBackground() {

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.rect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = '#000';
    this.ctx.fill();
  }


  drawScore() {
    this.ctx.fillStyle = "#fff";
    this.ctx.strokeStyle = "#000";
    this.ctx.font = "30px Arial";
    this.ctx.fillText("Score: " + this.score, 30, 30);
  }

  over() {
    this.canvas.removeEventListener('mousemove', (evt) => {
      evt.preventDefault();
      if (evt.clientX - this.canvas.width / 2 > -this.board.width && evt.clientX - this.canvas.width / 2 < this.board.width) {

        this.bat.x = evt.clientX - this.canvas.width / 2;
      }
      if (evt.clientY < this.canvas.height - 50)
        this.bat.z = this.canvas.height - evt.clientY - 10;
    }, false)
    this.canvas.removeEventListener('touchmove', (evt) => {
      evt.preventDefault();
      let touch = evt.touches[0];
      console.log("touchM", touch.pageX, touch.pageY / 2);

      this.bat.x = touch.pageX - this.canvas.width / 2;
      this.bat.z = this.canvas.height - touch.pageY - 10;
    }, false)
    this.board = null;
    this.bat = null;
    this.ball = null;
    this.point = 0;

    this.isStarted = false;
    window.cancelAnimationFrame(this.animationLoop);
  }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = Game;



/***/ })
/******/ ]);