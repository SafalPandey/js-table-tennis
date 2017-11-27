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
  Sound
} from "./Sound.js"
import {
  draw
} from "./src/app.js"
const utils = require("./utils.js")

export class Game {
  constructor() {
    this.canvas = document.getElementById('gameCanvas');
    // this.canvas.style.border = "#000 1px solid"
    this.canvas.width = window.innerWidth;
    this.canvas.style.float = "left";
    this.canvas.height = window.innerHeight;
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
    this.bgGradient.addColorStop(0, '#66ffa6');
    this.bgGradient.addColorStop(1, '#00b248');

    this.gravity = 0.005;
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
    this.canvas.style.cursor = 'none';
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
    this.hasMissed = false;
    this.isStarted = true;
    this.animationLoop = window.requestAnimationFrame(() => {
      this.draw()
    })
  }
  drawButton() {
    this.ctx.fillStyle = "#00b248";
    this.ctx.fillRect(this.button.x, this.button.y, this.button.width, this.button.height);
    this.ctx.fillStyle = "white";
    this.ctx.font = "30px Arial";
    this.ctx.fillText(this.button.text, this.button.x + 20, this.button.y + 50);
  }
  handleClick(evt) {
    if (!this.isStarted && evt.clientX > this.button.x && evt.clientX < this.button.x + this.button.width && evt.clientY > this.button.y && evt.clientY < this.button.y + this.button.height) {
      this.init();
    }
  }
  serve() {
    this.ball.dx = 0.2 * this.bat.dx
    this.ball.dz = 0.2 * this.bat.dz;
    this.hasServed = true;
    this.timer = 0;
    this.bat.effectAlpha = 1;

    this.hasMissed = false;
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

    this.opponentBat.z = this.board.length;
    this.hasMissed = false;
  }
  drawBackground() {

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = '#9fffe0';
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
    this.ctx.strokeText("Your Score: " + this.playerScore, 30, 30);
    this.ctx.fillStyle = "#f99";
    this.ctx.fillText("Opponent's Score: " + this.opponentScore, this.canvas.width - 500, 30);
    this.ctx.strokeText("Opponent's Score: " + this.opponentScore, this.canvas.width - 500, 30);

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
    this.hasServed = false;
    this.isStarted = false;
    window.cancelAnimationFrame(this.animationLoop);
  }

  draw() {
    if (this.hasServed) this.timer++;
    this.drawBackground();
    this.drawScore();
    this.board.drawBoard();
    if (this.ball.y < this.board.y) this.ball.dy += this.gravity * this.timer;
    // else this.ball.dy = 0;
    this.ball.updatePosition();

    if (this.ball.z > -400) {
      if (!this.board.checkPointBound(this.ball.x,this.ball.y,this.ball.z)) {
        this.ball.draw();
      }
    }else {
      this.hasServed = false;
      this.anotherBall();
    }

    this.bat.drawBat(this.hasServed);
    if (!this.hasServed && this.bat.dz > 0 && this.bat.z > this.ball.z) this.serve();


    if (!this.hasMissed){

    if( this.ball.z > this.board.length / 2) {
      this.opponentBat.x = this.ball.x;
      if (this.ball.opponentBounceCount > 0) {
        let dz = this.opponentBat.dz
        this.opponentBat.z = this.ball.z;
        this.ball.reflect(dz);
        console.log(this.opponentBat.dz);

      }
    }else {
      this.opponentBat.z = this.board.length;
    }
    // this.opponentBat.y = this.ball.y;


    if (!this.hasServed) this.ball.x = this.bat.x
    if (this.hasServed && this.ball.bounceCount != 0) {
      if (this.ball.z < this.bat.z && this.ball.x > this.bat.x - this.bat.r && this.ball.x < this.bat.x + this.bat.r && this.ball.y > this.bat.y - this.bat.r) {
        console.log("reflected");
        this.ball.bounceCount = 0;
        this.ball.opponentBounceCount = 0;
        this.ball.reflect(this.ball.dz * -1);
        this.bat.effectAlpha = 1;

        // this.ball.z = 10;
      }
    }
    if (this.ball.bounceCount >= 2) {
      this.removePoint();
      this.ball.bounceCount = 0;
      this.ball.opponentBounceCount = 0;
      this.hasMissed = true;
    } else if (this.ball.opponentBounceCount > 2) {
      this.awardPoint();
      this.ball.bounceCount = 0;
      this.ball.opponentBounceCount = 0;
      this.hasMissed = true;

    }
  }

    this.opponentBat.drawBat(this.hasServed);
    if (this.bat.effectAlpha > 0) {
      this.bat.showEffect(this.ball.x, this.ball.y, this.ball.z);
      this.bat.effectAlpha -= 0.05;
    }

    if (this.ball.bounceCount > 5 || this.ball.opponentBounceCount > 4) {
      this.anotherBall();
    }

    if (this.score == -10) {
      this.over();
    } else {

      this.animationLoop = window.requestAnimationFrame(() => {
        this.draw()
      });
    }
  }


}
