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
// game.init();
export let draw = () => {
  if (game.hasServed) game.timer++;
  game.drawBackground();
  game.drawScore();
  game.board.drawBoard();
  if (game.ball.y < game.board.y) game.ball.dy += game.gravity * game.timer;
  // else game.ball.dy = 0;
  game.ball.updatePosition();

  if(game.ball.z > -200) game.ball.draw();

  game.bat.drawBat(game.hasServed);

  if (game.ball.z > game.board.length/2) {
    game.opponentBat.x = game.ball.x;
    if (game.ball.opponentBounceCount > 0) {
      game.opponentBat.z = game.ball.z;

      console.log("gt0",game.opponentBat.dz);
    if (Math.abs(game.opponentBat.dz) > Math.abs(game.ball.dz * 1.2)) {
      game.ball.reflect(game.ball.dz * -1.1);

      console.log(game.opponentBat.dz);
    }else {
      game.ball.reflect(game.ball.dz * 1.1);
      // game.ball.reflect(game.opponentBat.dz);
      console.log("lt0",game.opponentBat.dz);

    }
  }
    // game.ball.opponentBounceCount = 0;
    // game.ball.bounceCount = 0;
    // if (game.ball.z >= game.board.length) {
    //   game.opponentBat.y = game.ball.y;
    // }
  }
  // game.opponentBat.y = game.ball.y;
  game.opponentBat.drawBat(game.hasServed);

  if (!game.hasServed) game.ball.x = game.bat.x
  if (!game.hasServed && game.bat.dz > 0 && game.bat.z > game.ball.z) game.serve();
  if (game.hasServed && game.ball.bounceCount != 0 && game.ball.z < game.bat.z && game.ball.x > game.bat.x - game.bat.r && game.ball.x < game.bat.x + game.bat.r && game.ball.y > game.bat.y - game.bat.r ) {
    console.log("reflected");
    game.ball.bounceCount = 0;
    game.ball.opponentBounceCount = 0;
    game.ball.reflect(game.ball.dz * -1);
    // game.ball.z = 10;
  }
  if (game.ball.bounceCount >= 5) {
    game.ball.bounceCount = 0;
    game.ball.opponentBounceCount = 0;
    game.removePoint();
    game.anotherBall();
  } else if (game.ball.opponentBounceCount > 5) {
    game.ball.bounceCount = 0;
    game.ball.opponentBounceCount = 0;
    game.awardPoint();
    game.anotherBall();
  }{

  }

  if (game.score == -10) {
    game.over();
  } else {

    game.animationLoop = window.requestAnimationFrame(draw);
  }
}
