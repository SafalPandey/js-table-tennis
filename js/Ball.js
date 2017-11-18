const utils = require("./utils.js")

export class Ball {
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
