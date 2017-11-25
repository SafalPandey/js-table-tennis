import {
  Board
} from "../Board.js"
import {
  Ball
} from "../Ball.js"
import {
  Bat
} from "../Bat.js"
import {
  Game
} from "../Game.js"
const utils = require("../utils.js")


let game = new Game();
game.init();
let draw = () => {
  if (game.hasServed) game.timer++;
  game.drawBackground();
  game.board.drawBoard();
  if (game.ball.y < game.board.y) game.ball.dy += game.gravity * game.timer;
  // else game.ball.dy = 0;
  game.ball.updatePosition();
  if(game.ball.z > -200) game.ball.draw();

  game.bat.drawBat(game.hasServed);
  game.opponentBat.x = game.ball.x;
  // game.opponentBat.y = game.ball.y;
  game.opponentBat.drawBat(game.hasServed);

  if (!game.hasServed) game.ball.x = game.bat.x
  if (!game.hasServed && game.bat.dz > 0 && game.bat.z > game.ball.z) game.serve();
  game.drawScore();
  if (game.hasServed && game.ball.bounceCount != 0 && game.ball.z > game.bat.z - 10 && game.ball.z < game.bat.z && game.ball.x > game.bat.x - game.bat.r && game.ball.x < game.bat.x + game.bat.r && game.ball.y > game.bat.y - game.bat.r && game.ball.y < game.bat.y + game.bat.r) {
    console.log("reflected");
    game.ball.bounceCount = 0;
    game.awardPoint();

    game.ball.reflect();
    game.ball.z = 10;
  }
  if (game.ball.bounceCount >= 10) {
    game.ball.bounceCount = 0;
    game.removePoint();
    game.anotherBall();
    game.animationLoop = window.requestAnimationFrame(draw);

  } else if (game.score == -10) {
    game.over();
  } else {

    game.animationLoop = window.requestAnimationFrame(draw);
  }
}
game.animationLoop = window.requestAnimationFrame(draw)
