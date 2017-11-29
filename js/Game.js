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
    this.bgGradient.addColorStop(0, '#757575');
    this.bgGradient.addColorStop(1, '#a4a4a4');

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
    this.canvas.addEventListener('click', (e) => {
      this.handleClick(e)
    }, false);
    this.soundsDiv = document.createElement('div');

  }

  init() {
    window.cancelAnimationFrame(this.animationLoop);
    this.board = new Board(this.canvas, this.ctx);
    this.bat = new Bat(this.canvas, this.ctx, this.board);
    this.opponentBat = new Bat(this.canvas, this.ctx, this.board);
    this.opponentBat.z = this.board.length;
    this.opponentBat.isOpponent = true;
    this.ball = new Ball(this.ctx, this.board, this.bat.x, utils.BAT_Y_POSITION, 10, this.soundsDiv);
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

    this.ball.dx = 0.13 * this.bat.dx
    this.ball.dz = 0.13 * this.bat.dz;
    this.ball.dy = 4;
    this.hasServed = true;
    this.justServed = true;
    this.timer = 0;
    this.ball.effectAlpha = 1;
    console.log('served');
    this.hasMissed = false;
    this.opponentHasTouched = false;
    this.bat.y = this.board.y - 50
    this.bounceSound = new Sound("sounds/bounce.mp3", this.soundsDiv);
    this.bounceSound.play();
  }
  awardPoint() {
    this.playerScore++;
    this.hasMissed = true;
    this.ball.bounceCount = 0;
    this.ball.opponentBounceCount = 0;


  }
  removePoint() {
    this.opponentScore++;
    this.hasMissed = true;
    this.ball.bounceCount = 0;
    this.ball.opponentBounceCount = 0;

  }

  getAnotherBall() {
    this.ball = null;

    this.ball = new Ball(this.ctx, this.board, this.bat.x, utils.BAT_Y_POSITION, 10, this.soundsDiv);
    this.timer = 0;
    this.opponentBat.z = this.board.length;
    this.hasMissed = false;
    this.hasServed = false;
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

    if (!this.hasMissed) {

      if (!this.hasServed) this.ball.x = this.bat.x

      if (this.hasServed) {
        if (this.opponentHasTouched) {
          if (this.ball.z < this.bat.z && this.ball.x > this.bat.x - this.bat.r && this.ball.x < this.bat.x + this.bat.r && this.ball.y > this.bat.y - this.bat.r) {
            console.log("reflected");
            this.ball.bounceCount = 0;
            this.ball.opponentBounceCount = 0;
            this.ball.dy = -0.015 * Math.abs(this.bat.z);
            this.ball.reflect(this.bat.dx, this.bat.dz * 0.5);
            this.timer = 0;
            this.ball.effectAlpha = 1;
            this.opponentHasTouched = false;
          }
        }

        if (this.justServed && !this.opponentHasTouched){
        if ((this.ball.bounceCount == 0 && this.ball.opponentBounceCount > 0) || (this.ball.bounceCount == 1 && this.ball.z > this.board.length && this.ball.opponentBounceCount == 0) ) {
          this.removePoint();
        }
      }
      }

      //move Opponent Bat
      if (this.ball.z > this.board.length / 2) {
        this.opponentBat.x = this.ball.x;
        if (this.ball.opponentBounceCount > 0) {
          this.opponentBat.z = this.ball.z;
          this.ball.reflect(this.opponentBat.dx, this.opponentBat.dz);
          if (!this.opponentHasTouched) {
            this.ball.dy = -0.013 * this.opponentBat.z;
            this.opponentHasTouched = true;
            this.ball.bounceCount = 0;

            if (this.justServed) {
              this.justServed = false;
            }
          }
        }
      } else {
        this.opponentBat.z = this.board.length;
      }

      //game logic
      if (this.ball.bounceCount === 2) {
        this.removePoint();
      } else if (this.ball.opponentBounceCount === 2) {
        this.awardPoint();
      }
    }

    this.opponentBat.drawBat(this.hasServed);

    //draw ball only if it is infront of the player
    if (this.ball.z > -400) {
      if (!this.board.checkPointBound(this.ball.x, this.ball.y, this.ball.z)) {
        this.ball.draw();
      }
    } else {
      this.hasServed = false;

      //award or remove point before making new ball
      if (this.ball.opponentBounceCount == 1 && this.ball.bounceCount == 0) {
        this.awardPoint();
      } else if (this.ball.opponentBounceCount == 1 && this.ball.bounceCount == 1 || this.ball.opponentBounceCount == 0 && this.ball.bounceCount == 1) {
        this.removePoint();
      }

      this.getAnotherBall();
    }

    this.bat.drawBat(this.hasServed);

    //hit effect on ball
    if (this.ball.effectAlpha > 0) {
      this.ball.showEffect(this.ball.x, this.ball.y, this.ball.z);
      this.ball.effectAlpha -= 0.05;
    }

    if (this.ball.bounceCount > 2 || this.ball.opponentBounceCount > 2) {
      this.getAnotherBall();
    }

    if (!this.hasServed && this.bat.dz > 0 && this.bat.z > this.ball.z) {
      this.serve();
    }

    if (this.playerScore > 10 || this.opponentScore > 10) {
      //game over
      this.over();
    } else {

      //next animation frame
      this.animationLoop = window.requestAnimationFrame(() => {
        this.draw()
      });
    }
  }
}
