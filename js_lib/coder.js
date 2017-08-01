const MovingObject = require("./moving_object");
const CoffeeCup = require("./coffee_cup");
const Util = require("./util");

function randomColor() {
  const hexDigits = "0123456789ABCDEF";

  let color = "#";
  for (let i = 0; i < 3; i++) {
    color += hexDigits[Math.floor((Math.random() * 16))];
  }
  console.log(color, "hex-color");
  return color;
}

class Coder extends MovingObject {
  constructor(options) {
    options.img = new Image();
    // options.img.src = 'sprites/coder1.png';
    options.radius = Coder.RADIUS;
    options.vel = options.vel || [0,0];
    options.color = options.color || randomColor();
    super(options);
    this.coffeeCups = 0;
    this.jumping = false;
    this.facingRight = true;
    this.bumped = false;
    this.jumpAudio = new Audio('sounds/jump-small.wav');
  }

  run(vel) {
    this.vel[0] = vel;
  }

  noRun() {
    if (this.vel[0] > 0) {
      this.vel[0] -= 2;
    } else if (this.vel[0] < 0) {
      this.vel[0] += 2;
    }
  }

  checkBumped() {
    if (this.bumped) {
      this.jumping = false;
      this.vel[0] = 0;
      if (this.pos[1] <= 280) {
        this.vel[1] += 15;
      } else if (this.pos[1] >= 450) {
        this.vel[1] = 0;
        this.pos[1] = 450;
      }
    }
  }

  jump() {
    if (this.pos[1] === 450 && this.jumping === false && this.bumped === false) {
      this.jumpAudio.play();
      this.vel[1] = -15;
      this.jumping = true;
    } else if (this.pos[1] <= 280) {
      this.vel[1] += 15;
    } else if (this.pos[1] >= 450) {
      this.vel[1] = 0;
      this.pos[1] = 450;
    }
  }

  noJump() {
    if (this.jumping === true) {
      this.vel[1] = 15;
      this.jumping = false;
    } else if (this.pos[1] >= 450) {
      this.vel[1] = 0;
      this.pos[1] = 450;
      this.jumping = false;
    }
  }

  relocate() {
    this.pos = [450, 400];
    this.vel = [0,0];
  }
}

Coder.RADIUS = 65;
module.exports = Coder;
