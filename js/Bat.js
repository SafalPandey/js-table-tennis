const utils = require("./utils.js")
export class Bat {
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
