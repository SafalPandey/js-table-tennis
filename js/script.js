class Game {
  constructor() {
    this.canvas = document.getElementById('gameCanvas');
    // this.canvas.style.border = "#000 1px solid"
    this.canvas.width = window.innerWidth;
    this.canvas.height = (window.innerHeight - 4);
    projector.setCanvas(this.canvas);

    this.ctx = this.canvas.getContext('2d');
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.board = new Board(this.canvas, this.ctx);
    this.ball = new Ball(this.ctx, this.board, 0, 0, 10);
    this.ball.draw();

    this.bat = new Bat(this.canvas, this.ctx, this.board);
  }
}

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
    this.ctx.arc(this.x, this.y, projector.get2dLength(this.r, this.z), Math.PI / 2, Math.PI * 2);
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

    this.center2d = projector.get2d(this.x, this.y, this.z)
    this.ctx.beginPath();
    this.ctx.arc(this.center2d.x2d, this.center2d.y2d, projector.get2dLength(this.r, this.z), 0, Math.PI * 2)
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

let projector = new Projector();
let game = new Game();
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
