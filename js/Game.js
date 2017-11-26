import {
  Board
} from "./Board.js"
import {
  Ball
} from "./Ball.js"
import {
  Bat
} from "./Bat.js"
import {
  draw
} from "./src/app.js"
const utils = require("./utils.js")

export class Game {
  constructor() {
    this.canvas = document.getElementById('gameCanvas');
    // this.canvas.style.border = "#000 1px solid"
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight - 4;
    utils.PROJECTOR.setCanvas(this.canvas);
    this.ctx = this.canvas.getContext('2d');
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);


    this.bgImg = new Image();
    this.bgImg.src = "images/bg1.png";
    this.bgImg.onload = () => {
      this.bgPattern = this.ctx.createPattern(this.bgImg, 'repeat');
      this.ctx.fillStyle = this.bgPattern;
    }
    this.bgRadius = Math.floor(this.canvas.width * 1.2);
    this.bgCenter = {
      x: this.canvas.width / 2,
      y: this.canvas.width * 1.4
      // y: this.canvas.height * 2.8

    }
    this.bgGradient = this.ctx.createRadialGradient(this.bgCenter.x, this.bgCenter.y, this.bgRadius, this.bgCenter.x, this.bgCenter.y, this.bgRadius - 100);
    this.bgGradient.addColorStop(0, '#030');
    this.bgGradient.addColorStop(1, '#070');

    this.gravity = 0.006;
    this.isStarted = false;
    this.hasServed = false;

    this.startButton = {
      x: 1.5 * this.canvas.width / 4,
      y: this.canvas.height / 2,
      width: this.canvas.width / 4,
      height: this.canvas.width / 8,
      text: "Start Game",
    };
    this.restartButton = {
      x: 1.5 * this.canvas.width / 4,
      y: this.canvas.height / 2,
      width: this.canvas.width / 4,
      height: this.canvas.width / 8,
      text: "Play Again",
    };

    this.button = this.startButton;
    this.drawButton();
    console.log(this.button);
    this.canvas.addEventListener('click', (e) => {
      this.handleClick(e)
    }, false);
  }

  init() {
    window.cancelAnimationFrame(this.animationLoop);
    this.board = new Board(this.canvas, this.ctx);
    this.bat = new Bat(this.canvas, this.ctx, this.board);
    this.opponentBat = new Bat(this.canvas, this.ctx, this.board);
    this.opponentBat.z = this.board.length;
    this.opponentBat.isOpponent = true;
    this.ball = new Ball(this.ctx, this.board, this.bat.x, utils.BAT_Y_POSITION, 10);
    this.timer = 0;
    this.playerScore = 0;
    this.opponentScore = 0;
    // this.canvas.style.cursor = 'none';
    this.canvas.removeEventListener('click', (e) => {
      this.handleClick(e)
    }, false);

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
    this.animationLoop = window.requestAnimationFrame(draw)
  }
  drawButton() {
    this.ctx.fillStyle = "green";
    this.ctx.fillRect(this.button.x, this.button.y, this.button.width, this.button.height);
    this.ctx.fillStyle = "white";
    this.ctx.font = "30px Arial";
    this.ctx.fillText(this.button.text, this.button.x + 20, this.button.y + 50);
  }
  handleClick(evt) {
    if (evt.clientX > this.button.x && evt.clientX < this.button.x + this.button.width && evt.clientY > this.button.y && evt.clientY < this.button.y + this.button.height) {
      this.init();
    }
  }
  serve() {
    this.ball.dx = 0.1 * this.bat.dx
    this.ball.dz = 0.1 * this.bat.dz;
    this.hasServed = true;
    this.timer = 0;
  }
  awardPoint() {
    this.playerScore++;
    this.hasServed = false;

  }
  removePoint() {
    this.opponentScore++;
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
    this.ctx.fillText("Your Score: " + this.playerScore, 30, 30);
    this.ctx.fillStyle = "#f99";
    this.ctx.fillText("Opponent's Score: " + this.opponentScore, this.canvas.width - 500, 30);

  }

  over() {

    this.board = null;
    this.bat = null;
    this.ball = null;
    this.point = 0;
    this.canvas.style.cursor = "auto";
    this.canvas.removeEventListener("mouseover", (evt) => {
      this.bat.point3d = utils.PROJECTOR.get3d(evt.clientX, evt.clientY);
      this.bat.x = this.bat.point3d.x;
      this.bat.y = this.bat.point3d.y;
      this.bat.z = this.bat.point3d.z;

      this.bat.lastX = this.bat.point3d.x;
      this.bat.lastZ = this.bat.point3d.z;
    }, false);

    this.canvas.removeEventListener('mousemove', (evt) => {
      evt.preventDefault();
      this.bat.point3d = utils.PROJECTOR.get3d(evt.clientX, evt.clientY);
      this.bat.x = this.bat.point3d.x;
      this.bat.y = this.bat.point3d.y;
      this.bat.z = this.bat.point3d.z;

    }, false)


    this.canvas.removeEventListener('touchmove', (evt) => {
      evt.preventDefault();
      let touch = evt.touches[0];
      this.bat.point3d = utils.PROJECTOR.get3d(touch.pageX, touch.pageY);
      this.bat.x = this.bat.point3d.x;
      this.bat.y = this.bat.point3d.y;
      this.bat.z = this.bat.point3d.z;
    }, false)

    this.button = this.restartButton;
    // this.canvas.addEventListener('click', (e) => {
    //   this.handleClick(e)
    // }, false);
    this.drawButton();
    this.hasServed=false;
    this.isStarted = false;
    window.cancelAnimationFrame(this.animationLoop);
  }

}
