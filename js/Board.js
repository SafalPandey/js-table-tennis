const utils = require('./utils.js');

export class Board {
  constructor(canvas, ctx) {

    this.canvas = canvas;
    this.ctx = ctx;

    this.x = 0;
    this.y = 300;
    this.z = 0;

    //Dimensions of the board
    this.width = this.canvas.width / 2 * 0.65; //xMax
    this.thickness = 10 / 400 * this.canvas.width / 2; //yMax
    this.length = 720 / 400 * this.canvas.width / 2; //zMax

    this.netHeight = this.y - 55 / 400 * this.width;
    this.netPosition = this.length / 2;

    this.legLength = 300;

    this.borderWidth = 10 / 400 * this.width;

    this.frontLeftPoint2d = utils.PROJECTOR.get2d(this.x - this.width, this.y, this.z);
    this.frontRightPoint2d = utils.PROJECTOR.get2d(this.x + this.width, this.y, this.z);
    this.backRightPoint2d = utils.PROJECTOR.get2d(this.x + this.width, this.y, this.z + this.length);
    this.backLeftPoint2d = utils.PROJECTOR.get2d(this.x - this.width, this.y, this.z + this.length);
    this.frontLeftoint2d = utils.PROJECTOR.get2d(this.x - this.width, this.y, this.z);
    this.frontLeftBottomPoint2d = utils.PROJECTOR.get2d(this.x - this.width, this.y + this.thickness, this.z);
    this.frontRightBottomPoint2d = utils.PROJECTOR.get2d(this.x + this.width, this.y + this.thickness, this.z);
    this.frontRightTopPoint2d = utils.PROJECTOR.get2d(this.x + this.width, this.y, this.z);

    this.middleRightPoint2d = utils.PROJECTOR.get2d(this.x + this.width, this.y, this.z + this.netPosition);
    this.middleRightTopPoint2d = utils.PROJECTOR.get2d(this.x + this.width, this.netHeight, this.z + this.netPosition);
    this.middleLeftPoint2d = utils.PROJECTOR.get2d(this.x - this.width, this.y, this.z + this.netPosition);
    this.middleLeftTopPoint2d = utils.PROJECTOR.get2d(this.x - this.width, this.netHeight, this.z + this.netPosition);

    // this.singlePlayerMiddleRightPoint2d = utils.PROJECTOR.get2d(this.x + this.width, this.y, this.z + this.netPosition);
    // this.singlePlayerMiddleRightTopPoint2d = utils.PROJECTOR.get2d(this.x + this.width, this.y - this.length / 4, this.z + this.netPosition);
    // this.singlePlayerMiddleLeftPoint2d = utils.PROJECTOR.get2d(this.x - this.width, this.y, this.z + this.netPosition);
    // this.singlePlayerMiddleLeftTopPoint2d = utils.PROJECTOR.get2d(this.x - this.width, this.y - this.length / 4, this.z + this.netPosition);

    this.innerSurfaceFrontLeftPoint2d = utils.PROJECTOR.get2d(this.x - this.width + this.borderWidth, this.y, this.z + this.borderWidth);
    this.innerSurfaceFrontRightPoint2d = utils.PROJECTOR.get2d(this.x + this.width - this.borderWidth, this.y, this.z + this.borderWidth);
    this.innerSurfaceBackRightPoint2d = utils.PROJECTOR.get2d(this.x + this.width - this.borderWidth, this.y, this.z + this.length - this.borderWidth);
    this.innerSurfaceBackLeftPoint2d = utils.PROJECTOR.get2d(this.x - this.width + this.borderWidth, this.y, this.z + this.length - this.borderWidth);
    this.innerSurfaceFrontLeftoint2d = utils.PROJECTOR.get2d(this.x - this.width + this.borderWidth, this.y, this.z + this.borderWidth);

    this.centerBorderFrontLeftPoint2d = utils.PROJECTOR.get2d(this.x - 5 / 400 * this.width, this.y, this.z);
    this.centerBorderFrontRightPoint2d = utils.PROJECTOR.get2d(this.x + 5 / 400 * this.width, this.y, this.z);
    this.centerBorderBackLeftPoint2d = utils.PROJECTOR.get2d(this.x - 5 / 400 * this.width, this.y, this.z + this.length);
    this.centerBorderBackRightPoint2d = utils.PROJECTOR.get2d(this.x + 5 / 400 * this.width, this.y, this.z + this.length);

    this.frontLeftLegLPoint2d = utils.PROJECTOR.get2d(this.x - 380 / 400 * this.width, this.y, this.z + 50 / 400 * this.width);
    this.frontBottomLeftLegLPoint2d = utils.PROJECTOR.get2d(this.x - 380 / 400 * this.width, this.y + this.legLength, this.z + 50 / 400 * this.width);
    this.frontLeftLegRPoint2d = utils.PROJECTOR.get2d(this.x - 360 / 400 * this.width, this.y, this.z + 50 / 400 * this.width);
    this.frontBottomLeftLegRPoint2d = utils.PROJECTOR.get2d(this.x - 360 / 400 * this.width, this.y + this.legLength, this.z + 50 / 400 * this.width);

    this.frontRightLegLPoint2d = utils.PROJECTOR.get2d(this.x + 380 / 400 * this.width, this.y, this.z + 50 / 400 * this.width);
    this.frontBottomRightLegLPoint2d = utils.PROJECTOR.get2d(this.x + 380 / 400 * this.width, this.y + this.legLength, this.z + 50 / 400 * this.width);
    this.frontRightLegRPoint2d = utils.PROJECTOR.get2d(this.x + 360 / 400 * this.width, this.y, this.z + 50 / 400 * this.width);
    this.frontBottomRightLegRPoint2d = utils.PROJECTOR.get2d(this.x + 360 / 400 * this.width, this.y + this.legLength, this.z + 50 / 400 * this.width);


    this.netSquare = new Image();
    this.netSquare.src = 'images/netSquare.png';
    this.netSquare.onload = () => {
      this.netPattern = this.ctx.createPattern(this.netSquare, 'repeat');
      this.ctx.fillStyle = this.netPattern;
      // this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }


    this.drawBoard();
  }
  drawBoard(isSingle) {

    //leg drawing
    this.ctx.beginPath();
    //leg path
    this.makeLeftLegs();
    this.ctx.fillStyle = '#060402';
    this.ctx.fill();
    this.ctx.closePath();

    this.makeRightLegs();
    this.ctx.fill();
    this.ctx.closePath();

    //outer white surface drawing
    this.ctx.beginPath();
    //outer white surface path
    this.makeOuterWhiteSurface();
    this.ctx.stroke();
    this.ctx.fillStyle = "white";
    this.ctx.fill();
    this.ctx.closePath();
    //inner surface drawing
    this.ctx.beginPath();
    //inner surface path
    this.makeInnerSurface();
    this.ctx.stroke();
    this.ctx.fillStyle = "#24529b";
    this.ctx.fill();
    this.ctx.closePath();

    //center border drawing
    this.ctx.beginPath();
    //center border path
    this.makeCenterBorder();
    this.ctx.fillStyle = "white";
    this.ctx.fill();
    this.ctx.closePath();

    //board-thickness drawing
    this.ctx.beginPath();
    //board-thickness path
    this.makeBoardThickness();
    this.ctx.stroke();
    this.ctx.fillStyle = "#122c5f";
    this.ctx.fill();
    this.ctx.closePath();

    //net drawing
    this.ctx.beginPath();
    //net path
    this.makeNet();
    this.ctx.fillStyle = this.netPattern;
    this.ctx.fill();
    this.ctx.closePath();




  }
  makeOuterWhiteSurface() {
    this.ctx.moveTo(this.frontLeftPoint2d.x2d, this.frontLeftPoint2d.y2d);
    this.ctx.lineTo(this.frontRightPoint2d.x2d, this.frontRightPoint2d.y2d);
    this.ctx.lineTo(this.backRightPoint2d.x2d, this.backRightPoint2d.y2d);
    this.ctx.lineTo(this.backLeftPoint2d.x2d, this.backLeftPoint2d.y2d);
    this.ctx.lineTo(this.frontLeftoint2d.x2d, this.frontLeftoint2d.y2d);
  }
  makeNet() {
    this.ctx.moveTo(this.middleLeftTopPoint2d.x2d, this.middleLeftTopPoint2d.y2d)
    this.ctx.lineTo(this.middleRightTopPoint2d.x2d, this.middleRightTopPoint2d.y2d)
    this.ctx.lineTo(this.middleRightTopPoint2d.x2d, this.middleRightPoint2d.y2d)
    this.ctx.lineTo(this.middleLeftTopPoint2d.x2d, this.middleLeftPoint2d.y2d)
  }
  makeInnerSurface() {
    //front-left point
    this.ctx.moveTo(this.innerSurfaceFrontLeftPoint2d.x2d, this.innerSurfaceFrontLeftPoint2d.y2d);
    //front-right point
    this.ctx.lineTo(this.innerSurfaceFrontRightPoint2d.x2d, this.innerSurfaceFrontRightPoint2d.y2d);

    //back-right point
    this.ctx.lineTo(this.innerSurfaceBackRightPoint2d.x2d, this.innerSurfaceBackRightPoint2d.y2d);

    //back-left point
    this.ctx.lineTo(this.innerSurfaceBackLeftPoint2d.x2d, this.innerSurfaceBackLeftPoint2d.y2d);

    //front-left point
    this.ctx.lineTo(this.innerSurfaceFrontLeftoint2d.x2d, this.innerSurfaceFrontLeftoint2d.y2d);

  }
  makeCenterBorder() {

    this.ctx.moveTo(this.centerBorderFrontLeftPoint2d.x2d, this.centerBorderFrontLeftPoint2d.y2d)
    this.ctx.lineTo(this.centerBorderFrontRightPoint2d.x2d, this.centerBorderFrontRightPoint2d.y2d)
    this.ctx.lineTo(this.centerBorderBackRightPoint2d.x2d, this.centerBorderBackRightPoint2d.y2d)
    this.ctx.lineTo(this.centerBorderBackLeftPoint2d.x2d, this.centerBorderBackLeftPoint2d.y2d)

  }
  makeBoardThickness() {

    this.ctx.moveTo(this.frontLeftPoint2d.x2d, this.frontLeftPoint2d.y2d);
    //front-left-bottom point
    this.ctx.lineTo(this.frontLeftBottomPoint2d.x2d, this.frontLeftBottomPoint2d.y2d);
    //front-right-bottom point
    this.ctx.lineTo(this.frontRightBottomPoint2d.x2d, this.frontRightBottomPoint2d.y2d);
    //front-right-top point
    this.ctx.lineTo(this.frontRightTopPoint2d.x2d, this.frontRightTopPoint2d.y2d);
  }
  makeOtherHalfVertical() {
    this.ctx.moveTo(this.singlePlayerMiddleLeftPoint2d.x2d, this.singlePlayerMiddleLeftPoint2d.y2d);
    this.ctx.lineTo(this.singlePlayerMiddleRightPoint2d.x2d, this.singlePlayerMiddleRightPoint2d.y2d);
    this.ctx.lineTo(this.singlePlayerMiddleRightPoint2d.x2d, this.singlePlayerMiddleRightTopPoint2d.y2d);
    this.ctx.lineTo(this.singlePlayerMiddleLeftPoint2d.x2d, this.singlePlayerMiddleLeftTopPoint2d.y2d);
  }

  makeLeftLegs() {
    this.ctx.moveTo(this.frontLeftLegLPoint2d.x2d, this.frontLeftLegLPoint2d.y2d);
    this.ctx.lineTo(this.frontBottomLeftLegLPoint2d.x2d, this.frontBottomLeftLegLPoint2d.y2d);
    this.ctx.lineTo(this.frontBottomLeftLegRPoint2d.x2d, this.frontBottomLeftLegRPoint2d.y2d);
    this.ctx.lineTo(this.frontLeftLegRPoint2d.x2d, this.frontLeftLegRPoint2d.y2d);

  }

  makeRightLegs() {
    this.ctx.moveTo(this.frontRightLegLPoint2d.x2d, this.frontRightLegLPoint2d.y2d);
    this.ctx.lineTo(this.frontBottomRightLegLPoint2d.x2d, this.frontBottomRightLegLPoint2d.y2d);
    this.ctx.lineTo(this.frontBottomRightLegRPoint2d.x2d, this.frontBottomRightLegRPoint2d.y2d);
    this.ctx.lineTo(this.frontRightLegRPoint2d.x2d, this.frontRightLegRPoint2d.y2d);

  }

  checkPointBound(x2d, y2d, y3d) {
    let determinantLeftSide = (x2d - this.frontLeftoint2d.x2d) * (this.backLeftPoint2d.y2d - this.frontLeftoint2d.y2d) - (y2d - this.frontLeftoint2d.y2d) * (this.backLeftPoint2d.x2d - this.frontLeftoint2d.x2d);
    let determinantRightSide = (x2d - this.frontRightPoint2d.x2d) * (this.backRightPoint2d.y2d - this.frontRightPoint2d.y2d) - (y2d - this.frontRightPoint2d.y2d) * (this.backRightPoint2d.x2d - this.frontRightPoint2d.x2d);
    if (y2d > this.backLeftPoint2d.y2d && y2d < this.frontLeftoint2d.y2d && determinantLeftSide < 0 && determinantRightSide > 0 && y3d > this.y) {
      return true;
    }
  }
}
