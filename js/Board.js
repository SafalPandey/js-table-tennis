class Board {
  constructor(canvas, ctx, fov) {

    this.canvas = canvas;
    this.ctx = ctx;

    this.x = 0;
    this.y = 200;
    this.z = 0;

    //Dimensions of the board
    this.width = this.canvas.width/2 *0.63; //xMax
    this.thickness = 10/400 *this.canvas.width/2; //yMax
    this.length = 720/400 * this.canvas.width/2; //zMax

    this.frontLeftPoint2d = projector.get2d(this.x - this.width, this.y, this.z);
    this.frontRightPoint2d = projector.get2d(this.x + this.width, this.y, this.z);
    this.backRightPoint2d = projector.get2d(this.x + this.width, this.y, this.z + this.length);
    this.backLeftPoint2d = projector.get2d(this.x - this.width, this.y, this.z + this.length);
    this.frontLeftoint2d = projector.get2d(this.x - this.width, this.y, this.z);
    this.frontLeftBottomPoint2d = projector.get2d(this.x - this.width, this.y + this.thickness, this.z);
    this.frontRightBottomPoint2d = projector.get2d(this.x + this.width, this.y + this.thickness, this.z);
    this.frontRightTopPoint2d = projector.get2d(this.x + this.width, this.y, this.z);


    this.drawBoard();
  }
  drawBoard() {

    //outer white surface drawing
    this.ctx.beginPath();
    //outer white surface path
    this.outerWhiteSurface();
    this.ctx.stroke();
    this.ctx.fillStyle = "white";
    this.ctx.fill()
    this.ctx.closePath();


    //inner surface drawing
    this.ctx.beginPath();
    //inner surface path
    this.innerSurface();
    this.ctx.stroke();
    this.ctx.fillStyle = "#24529b";
    this.ctx.fill();
    this.ctx.closePath();

    //center border drawing
    this.ctx.beginPath();
    //center border path
    this.centerBorder();
    this.ctx.fillStyle = "white";
    this.ctx.fill()
    this.ctx.closePath();

    //board-thickness drawing
    this.ctx.beginPath();
    //board-thickness path
    this.boardThickness();
    this.ctx.stroke();
    this.ctx.fillStyle = "#122c5f";
    this.ctx.fill()
    this.ctx.closePath();





  }
  outerWhiteSurface() {
    this.ctx.moveTo(this.frontLeftPoint2d.x2d, this.frontLeftPoint2d.y2d);
    this.ctx.lineTo(this.frontRightPoint2d.x2d, this.frontRightPoint2d.y2d);
    this.ctx.lineTo(this.backRightPoint2d.x2d, this.backRightPoint2d.y2d);
    this.ctx.lineTo(this.backLeftPoint2d.x2d, this.backLeftPoint2d.y2d);
    this.ctx.lineTo(this.frontLeftoint2d.x2d, this.frontLeftoint2d.y2d);
  }

  innerSurface() { //front-left point
    this.ctx.moveTo(this.frontLeftPoint2d.x2d + 0.01*this.width * projector.get2dLength(0.02*this.width, this.z), this.frontLeftPoint2d.y2d - projector.get2dLength(0.02*this.width, this.z));
    //front-right point
    this.ctx.lineTo(this.frontRightPoint2d.x2d - 0.01*this.width * projector.get2dLength(0.02*this.width, this.z), this.frontRightPoint2d.y2d - projector.get2dLength(0.02*this.width, this.z));
    //back-right point
    this.ctx.lineTo(this.backRightPoint2d.x2d - projector.get2dLength(0.02*this.width, this.length), this.backRightPoint2d.y2d + projector.get2dLength(0.02*this.width, this.length));
    //back-left point
    this.ctx.lineTo(this.backLeftPoint2d.x2d + projector.get2dLength(0.02*this.width, this.length), this.backLeftPoint2d.y2d + projector.get2dLength(0.02*this.width, this.length));
    //front-left point
    this.ctx.lineTo(this.frontLeftoint2d.x2d + 0.01*this.width * projector.get2dLength(0.02*this.width, this.z), this.frontLeftoint2d.y2d - projector.get2dLength(0.02*this.width, this.z));
  }
  centerBorder() {
    this.ctx.moveTo(this.frontLeftPoint2d.x2d + projector.get2dLength(this.width - 0.01*this.width, 0), this.frontLeftPoint2d.y2d);
    this.ctx.lineTo(this.backLeftPoint2d.x2d + projector.get2dLength(this.width - 0.01*this.width, this.length), this.backLeftPoint2d.y2d);
    this.ctx.lineTo(this.backLeftPoint2d.x2d + projector.get2dLength(this.width + 0.01*this.width, this.length), this.backLeftPoint2d.y2d);
    this.ctx.lineTo(this.frontLeftPoint2d.x2d + projector.get2dLength(this.width + 0.01*this.width, 0), this.frontLeftPoint2d.y2d);

  }
  boardThickness() {

    this.ctx.moveTo(this.frontLeftPoint2d.x2d, this.frontLeftPoint2d.y2d);
    //front-left-bottom point
    this.ctx.lineTo(this.frontLeftBottomPoint2d.x2d, this.frontLeftBottomPoint2d.y2d);
    //front-right-bottom point
    this.ctx.lineTo(this.frontRightBottomPoint2d.x2d, this.frontRightBottomPoint2d.y2d);
    //front-right-top point
    this.ctx.lineTo(this.frontRightTopPoint2d.x2d, this.frontRightTopPoint2d.y2d);
  }
}
