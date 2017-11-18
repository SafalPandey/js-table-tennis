import {Projector} from "../perspectiveProjector.js"
import {Board} from "../Board.js"
import {Ball} from "../Ball.js"
import {Bat} from "../Bat.js"
import {Game} from "../Game.js"
const utils = require("../utils.js")
// import {script} from "../script.js"


let game = new Game();
let draw = () => {


  game.ctx.clearRect(0, 0, game.canvas.width, game.canvas.height);
  game.board.drawBoard();
  game.ball.updatePosition();
  if (game.ball.z > -100)
    game.ball.draw();
  game.bat.drawBat();
  if(game.ball.z < 0 && game.ball.x > game.bat.x-game.bat.r   && game.ball.x <game.bat.x+game.bat.r  ){
    console.log("reflected");
    game.ball.reflect();
    game.ball.z = 10;
  }
  window.requestAnimationFrame(draw);
}
window.requestAnimationFrame(draw)
