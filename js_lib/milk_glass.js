const Util = require("./util");
const MovingObject = require("./moving_object");
const Coder = require('./coder');
const DEFAULTS = {
  COLOR: "#505050",
  RADIUS: 25,
  SPEED: 7
};


class MilkGlass extends MovingObject {
  constructor(options = {}) {
    options.img = new Image();
    options.img.src = 'pics/milk.png';
    options.pos = options.pos || options.game.beverageClouds[0].pos;
    options.radius = DEFAULTS.RADIUS;
    options.vel = options.vel || Util.randomVec(DEFAULTS.SPEED);
        super(options);
        this.index = Math.floor(Math.random() * 10);
        this.isWrappable = false;
        this.startTime = 0;
        this.emptyCoffeeCup = new Image();
        this.emptyCoffeeCup.src = 'sprites/white_mug.png';
        this.bumpAudio = new Audio('sounds/bump.wav');
  }

  collideWith(otherObject) {
    if (otherObject instanceof Coder && !otherObject.bumped) {
      this.remove();
      otherObject.bumped = true;
      this.bumpAudio.play();
      return true;
    }
  }

  checkOnTheGround(delta) {
    if (this.pos[1] >= 550) {
      this.vel = [0,0];
      this.startTime += delta;
    }
    let check = Math.floor((this.startTime) % 10);
    if (this.startTime > 1000) {
      this.remove();
    }
  }
}

module.exports = MilkGlass;
