let utils = {
  PROJECTOR: {
    cameraPosition: {
      x: 0,
      y: -100,
      z: -400
    },
    cameraOrientation: {
      x: -Math.PI / 4,
      y: 0,
      z: 0
    },

    canvas: {
      width: null,
      height: null
    },

    viewerPosition: {
      x: 0,
      y: 0,
      z: 500
    },

    eye2plane: 800,

    setCanvas: (canvas) => {
      utils.PROJECTOR.canvas = canvas;
      utils.PROJECTOR.viewerPosition.x = -canvas.width / 2;
      utils.PROJECTOR.viewerPosition.x = -canvas.width / 2;
      utils.PROJECTOR.viewerPosition.y = -500;
    },

    get2d: (x, y, z) => {

      // let scale = utils.PROJECTOR.eye2plane / (utils.PROJECTOR.eye2plane + z);
      let cx = Math.cos(utils.PROJECTOR.cameraOrientation.x);
      let sx = Math.sin(utils.PROJECTOR.cameraOrientation.x);
      let cy = Math.cos(utils.PROJECTOR.cameraOrientation.y);
      let sy = Math.sin(utils.PROJECTOR.cameraOrientation.y);
      let cz = Math.cos(utils.PROJECTOR.cameraOrientation.z);
      let sz = Math.sin(utils.PROJECTOR.cameraOrientation.z);

      let X = (x - utils.PROJECTOR.cameraPosition.x);
      let Y = (y - utils.PROJECTOR.cameraPosition.y);
      let Z = (z - utils.PROJECTOR.cameraPosition.z);

      let xWithRespectToCam = cy * (sz * Y + cz * X) - sy * Z;
      let yWithRespectToCam = sx * (cy * Z + sy * (sz * Y + cz * X)) + cx * (cz * Y - sz * X);
      let zWithRespectToCam = cx * (cy * Z + sy * (sz * Y + cz * X)) - sx * (cz * Y - sz * X);

      let zWithRespectToCamInverse = 1 / zWithRespectToCam;

      let x2d = xWithRespectToCam * (zWithRespectToCamInverse) * utils.PROJECTOR.viewerPosition.z - utils.PROJECTOR.viewerPosition.x;

      let y2d = yWithRespectToCam * zWithRespectToCamInverse * utils.PROJECTOR.viewerPosition.z - utils.PROJECTOR.viewerPosition.y;

      return {
        x2d: x2d,
        y2d: y2d
      };

    },

    get2dLength: (l, z) => {
      let scale = utils.PROJECTOR.eye2plane / (utils.PROJECTOR.eye2plane + z);

      return l * scale;
    },

    get3d: (x2d, y2d) => {

      let cx = Math.cos(utils.PROJECTOR.cameraOrientation.x);
      let sx = Math.sin(utils.PROJECTOR.cameraOrientation.x);
      let cy = Math.cos(utils.PROJECTOR.cameraOrientation.y);
      let sy = Math.sin(utils.PROJECTOR.cameraOrientation.y);
      let cz = Math.cos(utils.PROJECTOR.cameraOrientation.z);
      let sz = Math.sin(utils.PROJECTOR.cameraOrientation.z);

      let y =   utils.BAT_Y_POSITION;


      let Y = (y - utils.PROJECTOR.cameraPosition.y);

      let numeratorZ = Y * -1 * (utils.PROJECTOR.viewerPosition.z * cx * cz + y2d * sx * cz + utils.PROJECTOR.viewerPosition.y * sx * cz)
      let denumeratorZ = cy * (utils.PROJECTOR.viewerPosition.z * sx - y2d * cx - utils.PROJECTOR.viewerPosition.y * cx)
      let Z = numeratorZ / denumeratorZ;


      let numeratorX = (x2d + utils.PROJECTOR.viewerPosition.x) * (cx * cy * Z - sx * cz * Y);
      let denumeratorX = utils.PROJECTOR.viewerPosition.z * cy * cz;

      let X = numeratorX / denumeratorX;

      let x = X + utils.PROJECTOR.cameraPosition.x;
      let z = Z + utils.PROJECTOR.cameraPosition.z;
      return {
        x: Math.floor(x),
        y: Math.floor(y),
        z: Math.floor(z)
      };

    },

  },

  BAT_Y_POSITION: 150,

}

module.exports = utils;
