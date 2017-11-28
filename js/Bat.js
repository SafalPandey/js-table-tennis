const utils = require("./utils.js")
export class Bat {
  constructor(canvas, ctx, board) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.board = board;
    this.x = 0;
    this.y = this.board.y - 100;
    this.z = -10;
    this.r = 5 * 10 / 400 * this.board.width;

    this.lastX = 0
    this.lastZ = 0;
    this.dx = 0;
    this.dz = 0;
    this.mouseX = 0;
    this.mouseY = 0;

    this.effectAlpha = 0;
    this.isOpponent= false;

  }
  drawBat(hasServed) {


    if(this.isOpponent && this.x < this.board.x - this.board.width) this.x = this.board.x - this.board.width
    if(this.isOpponent && this.x > this.board.x + this.board.width) this.x = this.board.x + this.board.width
    // if (this.z < -25) this.z = -25;
    if (!this.isOpponent && Math.abs( this.z) > this.board.length/2) this.z = this.board.length/2;
    this.point2d = utils.PROJECTOR.get2d(this.x, this.y, this.z);
    this.dx = this.x - this.lastX;
    this.dz = this.z - this.lastZ;

    // this.ctx.save();
    // this.ctx.translate(this.point2d.x2d,this.point2d.y2d)
    // this.ctx.rotate(Math.PI);

    this.ctx.beginPath();
    // this.makeBatShadow();
    this.makeBatPaddle(hasServed);
    this.ctx.closePath();
    this.lastX = this.x;
    this.lastZ = this.z;
    // console.log(this.dz);
    // this.ctx.rotate(-Math.PI/2);
    // this.ctx.translate(-this.point2d.x2d,-this.point2d.y2d)
    // this.ctx.restore();
  }
  makeBatShadow(){

  }
  makeBatPaddle(hasServed) {
    this.ctx.arc(this.point2d.x2d, this.point2d.y2d,Math.abs(utils.PROJECTOR.get2dLength( this.r,this.z)), Math.PI / 2, Math.PI * 2);
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
  showEffect(x,y,z){
    let point2d = utils.PROJECTOR.get3d(this.x,this.y,this.z);
    this.ctx.arc(point2d.x2d,point2d.y2d,20,20,0,Math.PI*2);
    this.ctx.fillStyle = "rgba(236,0,0,"+this.effectAlpha+")";
    this.ctx.fill();

  }
}
