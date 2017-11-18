import {Board} from "./Board.js"
import {Ball} from "./Ball.js"
import {Bat} from "./Bat.js"
const utils = require("./utils.js")

export class Game {
  constructor() {
    this.canvas = document.getElementById('gameCanvas');
    // this.canvas.style.border = "#000 1px solid"
    this.canvas.width = window.innerWidth;
    this.canvas.height = (window.innerHeight - 4);
    utils.PROJECTOR.setCanvas(this.canvas);
    this.ctx = this.canvas.getContext('2d');
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.board = new Board(this.canvas, this.ctx);
    this.ball = new Ball(this.ctx, this.board, 0, 0, 10);
    this.ball.draw();

    this.bat = new Bat(this.canvas, this.ctx, this.board);
  }
}
