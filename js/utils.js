let utils = {
  PROJECTOR : {
      eye2plane : 600,

    setCanvas:(canvas)=> {
      utils.PROJECTOR.canvas = canvas;
    },

    get2d:(x, y, z)=> {

      let scale = utils.PROJECTOR.eye2plane / (utils.PROJECTOR.eye2plane + z);
      let x2d = x * scale + utils.PROJECTOR.canvas.width / 2;
      let y2d = y * scale + utils.PROJECTOR.canvas.height / 2;

      return {
        x2d: x2d,
        y2d: y2d
      };

    },

    get2dLength:(l, z)=> {
      let scale = utils.PROJECTOR.eye2plane / (utils.PROJECTOR.eye2plane + z);

      return l * scale;
    }

  }

}

module.exports = utils;
