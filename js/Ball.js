const utils = require("./utils.js")

export class Ball {
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

    this.maxY = this.board.y;
    this.netPosition = this.board.length/2;

    this.shadowY = this.board.y;
    this.bounceCount = 0;
    this.opponentBounceCount = 0;

  }

  draw() {

    if (this.z < 0) this.shadowY = 600;
    else this.shadowY = this.board.y;

    this.center2d = utils.PROJECTOR.get2d(this.x, this.y, this.z);
    this.shadow = utils.PROJECTOR.get2d(this.x, this.maxY, this.z);
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

  reflect(dzOther) {
    this.dz = dzOther;
    this.maxY = this.board.y;
  }
  bounce() {
    this.dy = -this.dy;

    console.log(this.bounceCount,this.opponentBounceCount);
  }
  sideCheck() {
    this.dx = -this.dx;

  }

  fall(){
    this.maxY = 500;
  }
  rise(){
    this.maxY = this.board.y - this.r;
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
    if (this.z == this.netPosition && this.x > -this.board.width && this.x < this.board.width && this.y < this.board.y && this.y > this.board.netHeight ) {
      this.reflect(-this.dz)
    }

    if (this.y > this.maxY - this.r) {
      if (this.z <this.netPosition) {
        this.bounceCount++;
      }
      if (this.z >this.netPosition) {
        this.opponentBounceCount++;
      }
      this.bounce();
    }

    if (this.z < this.board.z || this.z > this.board.z + this.board.length || this.x < -this.board.width || this.x > this.board.width) {
      this.fall();
    }else {
      this.rise();
    }



    // if (this.z < -100) this.reflect();
    // if (this.z > this.board.length) {
    //   this.bounceCount = 0;
    //   console.log("board oppo");
    //   this.reflect(this.dz * 1.25);
    // }
  }

}
