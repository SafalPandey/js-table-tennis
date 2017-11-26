import {
  Board
} from "./Board.js"
import {
  Ball
} from "./Ball.js"
import {
  Bat
} from "./Bat.js"
const utils = require("./utils.js")

export class Game {
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
    this.bgRadius = this.canvas.width * 1.2;
    console.log(this.canvas.height,this.canvas.width * 0.5625);
    this.bgCenter = {
      x : this.canvas.width / 2,
      y: this.canvas.width * 1.4
      // y: this.canvas.height * 2.8

    }
    this.bgGradient = this.ctx.createRadialGradient(this.bgCenter.x, this.bgCenter.y, this.bgRadius, this.bgCenter.x, this.bgCenter.y, this.bgRadius-100);
    this.bgGradient.addColorStop(0, '#030');
    this.bgGradient.addColorStop(1, '#070');

    this.gravity = 0.006;
    this.isStarted = false;
    this.hasServed = false;
  }

  init() {
    this.board = new Board(this.canvas, this.ctx);
    this.bat = new Bat(this.canvas, this.ctx, this.board);
    this.opponentBat = new Bat(this.canvas, this.ctx, this.board);
    this.opponentBat.z = this.board.length;
    this.opponentBat.isOpponent = true;
    this.ball = new Ball(this.ctx, this.board, this.bat.x, utils.BAT_Y_POSITION, 10);
    this.timer = 0;
    this.score = 0;

    this.canvas.addEventListener("mouseover", (evt) => {
      this.bat.point3d = utils.PROJECTOR.get3d(evt.clientX, evt.clientY);
      this.bat.x = this.bat.point3d.x;
      this.bat.y = this.bat.point3d.y;
      this.bat.z = this.bat.point3d.z;

      this.bat.lastX = this.bat.point3d.x;
      this.bat.lastZ = this.bat.point3d.z;
    }, false);

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

    this.ball = new Ball(this.ctx, this.board, this.bat.x, utils.BAT_Y_POSITION, 5);
    this.timer = 0;
  }
  drawBackground() {

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = '#000';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.beginPath();
    this.ctx.arc(this.bgCenter.x, this.bgCenter.y, this.bgRadius, -Math.PI, 0);

    this.ctx.fillStyle = this.bgGradient;
    // ctx.fillRect(0, 0, 200, 200);
    // this.ctx.fillStyle = "#aa9f7f";
    this.ctx.fill();
    this.ctx.closePath();

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
