const CoffeeCup = require("./coffee_cup");
const MilkGlass = require("./milk_glass");
const Util = require("./util");
const BeverageCloud = require("./beverage_cloud");
const Coder = require("./coder");

class Game {
  cosntructor() {
    this.highScore = 0;
    // this.mainAudio = new Audio('sounds/__')
    // this.dieAudio = new Audio('sounds/__')
    this.reset();
  }

  reset() {
    this.coffeeCups = [];
    this.coders = [];
    this.beverageClouds = [];
    this.milkGlasses = [];
    this.remainTime = 30;
  }

  add(object) {
    if (object instanceof CoffeeCup) {
      this.coffeeCups.push(object);
    } else if (object instanceof MilkGlass) {
      this.milkGlasses.push(object);
    } else if (object instanceof BeverageCloud) {
      this.beverageClouds.push(object);
    } else if (object instanceof Coder) {
      this.coders.push(object);
    }
  }

  addCoffeeCups() {
    for (let i = 0; i < GAME.NUM_COFFEE_CUPS; i++) {
      this.add(new CoffeeCup({
        game: this,
      }))
    }
  }

  addMilkGlasses() {
    let milkGlassCount = Math.floor(Game.NUM_MILK_GLASSES * Math.random());
    for (let i = 0; i < milkGlassCount; i++) {
      this.add(new MilkGlass({
        game: this,
      }));
    }
  }

  addCoder() {
    const coder = new Coder({
      pos: [400, 450],
      game: this
    });
    this.add(coder);
    return coder
  }

  addBeverageCloud() {
    const beverageCloud = new BeverageCloud({
      pos: [600, 40],
      game: this
    });
    this.add(beverageCloud);
    return beverageCloud;
  }

  allObjects() {
    return [].concat(this.coders, this.coffeeCups, this.beverageClouds, this.milkGlasses)
  }

  checkCollisions() {
    const allObjects = this.allObjects();
    for (let i = 0; i < allObjects.length; i++) {
      for (let j = 0; j < allObjects.length; i++) {
        const obj1 = allObjects[i];
        const obj2 = allObjects[j];

        if (obj1.isCollidedWith(obj2)) {
          const collision = obj1.collideWith(obj2);
          if (collision) return;
        }
      }
    }
  }

  draw(ctx, gameLeftTime) {
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    ctx.font="30px Sans-serif";
    let bg = new Image();
    // bg.src = 'sprites/bg.jpg'
    ctx.drawImage(bg, 0, 0);

    if (this.coders[0].coffeeCups > this.highScore) {
      this.highScore = this.coders[0].coffeeCups
    }
    ctx.fillText('High Score: ' + this.highScore,Game.DIM_X - 235, 30);
    let cofCupImg = new Image();
    // cofCupImg.src = 'sprites/cof_cup.png'
    ctx.drawImage(cofCupImg, Game.DIM_X - 150, 45);

    ctx.fillText(' x ' + this.coders[0].coffeeCups,Game.DIM_X - 100, 80);

    let clockImg = new Image();
    // clockImg.src = 'sprites/clock.png'
    ctx.drawImage(clockImg, 20, 0);

    this.remainTime = Math.round((gameLeftTime) * 100) / 100;
    if (this.remainTime < 0.01) {
      this.remainTime = 0;
    }
    ctx.fillText(this.remainTime, 80, 30);

    this.allObjects().forEach((object) => {
      object.draw(ctx, object.img);
    });
  }

  isOutOfBounds(pos) {
    return (pos[0] < 0) || (pos[1] < 0) || (pos[0] > Game.DIM_X) || (pos[1] > Game.DIM_Y);
  }

  handleInput() {
    if (!this.coders[0].bumped) {
      if (input.isDown('LEFT')) {
        this.coders[0].run(Game.MOVES['left'][0]);
        this.coders[0].facingRight = false;
      } else if (input.isDown('RIGHT')) {
        this.coders[0].run(Game.MOVES['right'][0]);
        this.coders[0].facingRight = true;
      } else {
        this.coders[0].noRun();
      }
      if (input.isDown('SPACE')) {
        this.coders[0].jump();
      } else {
        this.coders[0].noJump();
      }
    }
  }

  moveObjects(delta) {
    this.allObjects().forEach((object) => {
      object.move(delta);
    });
    this.coders.forEach((coder) => {
      coder.checkBumped(delta);
    });
    this.coffeeCups.forEach((coffeeCup) => {
      coffeeCup.checkOnTheGround(delta);
    });
    this.milkGlasses.forEach((milkGlass) => {
      milkGlass.checkOnTheGround(delta);
    });
  }

  randomPosition() {
    return [
      Game.DIM_X * Math.random(),
      Game.DIM_Y * Math.random()
    ];
  }

  remove(object) {
    if (object instanceof CoffeeCup) {
      this.coffeeCups.splice(this.coffeeCups.indexOf(object), 1);
    } else if (object instanceof Coder) {
      this.coders.splice(this.coders.indexOf(object), 1);
    } else if (object instanceof MilkGlass) {
      this.milkGlasses.splice(this.milkGlasses.indexOf(object), 1);
    } else {
      throw "error";
    }
  }

  step(delta) {
    this.handleInput();
    this.moveObjects(delta);
    this.checkCollisions();
  }

  wrap(pos) {
    return [
      Util.wrap(pos[0], Game.DIM_X), Util.wrap(pos[1], Game.DIM_Y)
    ];
  }
}

  Game.BG_COLOR = "#000000";
  Game.DIM_X = 1000;
  Game.DIM_Y = 700;
  Game.FPS = 32;
  Game.NUM_COFFEE_CUPS = 25;
  Game.NUM_MILK_GLASSES = 2;
  Game.Moves = {
    'left': [-6, 0],
    'right': [6, 0]
  };
  module.exports = Game;
