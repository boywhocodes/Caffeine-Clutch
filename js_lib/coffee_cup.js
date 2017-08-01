const Util = require("./util");
const MovingObject = require("./moving_object");
const Coder = require("./coder");
const DEFAULTS = {
  COLOR: "#505050",
  RADIUS: 20,
  SPEED: 6
};

class CoffeeCup extends MovingObject {
  constructor(options = {}) {
    options.img = new Image();
    // options.img.src = 'sprites/coffee_cup.png'
    options.color = DEFAULTS.COLOR;
    options.pos = options.pos || options.game.beverageClouds[0].pos;
    options.radius = DEFAULTS.RADIUS;
    options.vel = options.vel || Util.randomVec(DEFAULTS.SPEED);
        super(options);
        this.index = Math.floor(Math.random() * 10);
        this.isWrappable = false;
        this.startTime = 0;
        this.emptyCoffeeCup = new Image();
        // this.emptyCoffeeCup.src = 'sprites/empty_coffee_cup.png';
        this.coffeeCupAudio = new Audio('sounds/coffee_cup.wav');
  }

  collideWith(otherObject) {
    if (otherObject instanceof Coder && !otherObject.bumped) {
      if (otherObject.bonus) {
        otherObject.coffeeCups += 2;
      } else {
        otherObject.coffeeCups += 1;
      }
      this.coffeeCupAudio.play();
      this.remove();
      return true;
    }
  }

  checkOnTheGround(delta) {
    if (this.pos[1] >= 550) {
      this.vel = [0,0];
      this.startTime += delta;
    }
    let check = Math.floor((this.startTime) % 10);
    if (this.startTime > 10 && (check === 7 || check === 8 || check === 9)) {
      this.img = this.emptyCoffeeCup;
    }
    if (this.startTime > 2000) {
      this.remove();
    }
    console.log(this.startTime, "startTime");
  }
}

module.exports = CoffeeCup;
