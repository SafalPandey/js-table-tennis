class Projector {

  constructor() {
    this.eye2plane = 600;
  }

  setCanvas(canvas) {
    this.canvas = canvas;
  }

  get2d(x, y, z) {

    let scale = this.eye2plane / (this.eye2plane + z);
    let x2d = x * scale + this.canvas.width / 2;
    let y2d = y * scale + this.canvas.height / 2;

    return {
      x2d: x2d,
      y2d: y2d
    };

  };

  get2dLength(l, z) {
    let scale = this.eye2plane / (this.eye2plane + z);

    return l * scale;
  }

};
