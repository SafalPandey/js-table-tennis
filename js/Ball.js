import {
  Sound
} from "./Sound.js"
const utils = require("./utils.js")
export class Ball {
  constructor(ctx, board, x, y, z, soundsDiv) {

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
    this.effectAlpha = 0;

    this.shadowY = this.board.y;
    this.bounceCount = 0;
    this.opponentBounceCount = 0;
    this.soundsDiv = soundsDiv;
    this.bounceSound = new Sound("sounds/bounce.mp3", this.soundsDiv);
    document.body.appendChild(this.soundsDiv)
  }

  draw() {

    this.center2d = utils.PROJECTOR.get2d(this.x, this.y, this.z);
    this.shadow = utils.PROJECTOR.get2d(this.x, this.maxY, this.z);
    let radius2d = utils.PROJECTOR.get2dLength(this.r, this.z);

    if (this.board.checkPointBound(this.center2d.x2d, this.center2d.y2d, this.y)) {
      return 0;
    }

    //shadow
    this.ctx.beginPath();
    this.ctx.arc(this.shadow.x2d, this.shadow.y2d, Math.abs(radius2d), 0, Math.PI * 2);
    this.ctx.fillStyle = "rgba(68,68,68,0.8)";
    this.ctx.fill();
    this.ctx.closePath();

    //ball
    this.ctx.beginPath();
    this.ctx.arc(this.center2d.x2d, this.center2d.y2d, Math.abs(radius2d), 0, Math.PI * 2);
    this.ctx.fillStyle = "#f4d443";
    this.ctx.fill();
    this.strokeStyle = "#837d66";
    // this.ctx.stroke();
    this.ctx.closePath();
  }

  reflect(dxOther, dzOther) {
    if (Math.abs(dzOther) > 15) {
      this.dz = (dzOther / Math.abs(dzOther)) * 15;
    }else if (dzOther == 0 && this.z < this.board.length && this.x < this.board.width && this.x > -this.board.width) {
      this.dz = -15;
    } else {

      this.dz = dzOther;
    }

    this.dx = 0.13 * dxOther
    // this.dx = dxOther * 0.1;
    this.maxY = this.board.y;
  }
  bounce() {
    while (this.soundsDiv.children.length != 0) {
        this.soundsDiv.removeChild(this.soundsDiv.children[0]);
    }
    this.dy = -this.dy;
    this.bounceSound = new Sound("sounds/bounce.mp3", this.soundsDiv);
    this.bounceSound.play();
  }
  sideCheck() {
    this.dx = -this.dx;

  }

  fall() {
    this.maxY = 600;
  }
  rise() {
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
    if (this.z - this.r < this.board.netPosition && this.z + this.r > this.board.netPosition && this.x > -this.board.width && this.x < this.board.width && this.y < this.board.y && this.y > this.board.netHeight) {
      this.y -= 10;
      this.reflect(this.dx,-this.dz)
    }

    if (this.y > this.maxY - this.r) {
      if (this.z < this.board.netPosition) {
        this.bounceCount++;
      }
      if (this.z > this.board.netPosition) {
        this.opponentBounceCount++;
      }
      this.y -=this.r;
      this.bounce();
    }

    if (this.z < this.board.z || this.z > this.board.z + this.board.length || this.x < -this.board.width || this.x > this.board.width) {
      this.fall();
    } else {
      this.rise();
    }

    }

    showEffect(x,y,z){
      let point2d = utils.PROJECTOR.get3d(this.x,this.y,this.z);
      this.ctx.arc(this.center2d.x2d,this.center2d.y2d,20,20,0,Math.PI*2);
      this.ctx.fillStyle = "rgba(0,0,0,"+this.effectAlpha+")";
      this.ctx.fill();

    // if (this.z < -100) this.reflect();
    // if (this.z > this.board.length) {
    //   this.bounceCount = 0;
    //   console.log("board oppo");
    //   this.reflect(this.dz * 1.25);
    // }
  }

}
