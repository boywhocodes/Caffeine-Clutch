/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Util = {
  //normalize length of vector to 1, maintaining direction
  dir: function dir(vec) {
    var norm = Util.norm(vec);
    return Util.scale(vec, 1 / norm);
  },


  //find distance btween two points
  dist: function dist(pos1, pos2) {
    return Math.sqrt(Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1], 2) // returns (base, exponent)
    );
  },

  //Find length of vector
  norm: function norm(vec) {
    return Util.dist([0, 0], vec);
  },

  //Return randomly oriented vector with the given length
  randomVec: function randomVec(length) {
    var deg = 2 * Math.PI * Math.random();
    return Util.scale([Math.sin(deg), Math.cos(deg)], length);
  },

  // Scale the length of a vector by the given amount
  scale: function scale(vec, m) {
    var yV = Math.abs(vec[1] * m);
    if (yV < 3) {
      yV += 3;
    }
    return [vec[0] * m, yV];
  },

  // Ability to go through edges
  wrap: function wrap(coord, max) {
    if (coord < 0) {
      return max - coord % max;
    } else if (coord > max) {
      return coord % max;
    } else {
      return coord;
    }
  }
};

module.exports = Util;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Util = __webpack_require__(0);

var MovingObject = function () {
  function MovingObject(options) {
    _classCallCheck(this, MovingObject);

    this.pos = options.pos;
    this.vel = options.vel;
    this.radius = options.radius;
    this.color = options.color;
    this.game = options.game;
    this.img = options.img;
    this.width = options.width;
    this.height = options.height;
    this.isWrappable = true;
  }

  _createClass(MovingObject, [{
    key: "collideWith",
    value: function collideWith(otherObject) {}
  }, {
    key: "draw",
    value: function draw(ctx, img) {
      ctx.drawImage(img, this.pos[0], this.pos[1]);
    }
  }, {
    key: "isCollidedWith",
    value: function isCollidedWith(otherObject) {
      var newPos = [this.pos[0] + this.radius, this.pos[1] + this.radius];
      var otherPos = [otherObject.pos[0] + otherObject.radius, otherObject[1] + otherObject.radius];
      var centerDist = Util.dist(newPos, otherPos);
      return centerDist < this.radius + otherObject.radius;
    }
  }, {
    key: "move",
    value: function move(timeDelta) {
      var velocityScale = timeDelta / NORMAL_FRAME_TIME_DELTA,
          offsetX = this.vel[0] * velocityScale,
          offsetY = this.vel[1] * velocityScale;

      this.pos = [this.pos[0] + offsetX, this.pos[1] + offsetY];
      if (this.game.isOutOfBounds(this.pos)) {
        if (this.isWrappable) {
          this.pos = this.game.wrap(this.pos);
        } else {
          this.vel[0] = -this.vel[0];
        }
      }
    }
  }, {
    key: "remove",
    value: function remove() {
      this.game.remove(this);
    }
  }]);

  return MovingObject;
}();

var NORMAL_FRAME_TIME_DELTA = 1000 / 60;

module.exports = MovingObject;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MovingObject = __webpack_require__(1);
var CoffeeCup = __webpack_require__(3);
var Util = __webpack_require__(0);

function randomColor() {
  var hexDigits = "0123456789ABCDEF";

  var color = "#";
  for (var i = 0; i < 3; i++) {
    color += hexDigits[Math.floor(Math.random() * 16)];
  }
  console.log(color, "hex-color");
  return color;
}

var Coder = function (_MovingObject) {
  _inherits(Coder, _MovingObject);

  function Coder(options) {
    _classCallCheck(this, Coder);

    options.img = new Image();
    options.img.src = 'pics/coder1.png';
    options.radius = Coder.RADIUS;
    options.vel = options.vel || [0, 0];
    options.color = options.color || randomColor();

    var _this = _possibleConstructorReturn(this, (Coder.__proto__ || Object.getPrototypeOf(Coder)).call(this, options));

    _this.coffeeCups = 0;
    _this.jumping = false;
    _this.facingRight = true;
    _this.bumped = false;
    _this.jumpAudio = new Audio('sounds/jump-small.wav');
    return _this;
  }

  _createClass(Coder, [{
    key: "run",
    value: function run(vel) {
      this.vel[0] = vel;
    }
  }, {
    key: "noRun",
    value: function noRun() {
      if (this.vel[0] > 0) {
        this.vel[0] -= 2;
      } else if (this.vel[0] < 0) {
        this.vel[0] += 2;
      }
    }
  }, {
    key: "checkBumped",
    value: function checkBumped() {
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
  }, {
    key: "jump",
    value: function jump() {
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
  }, {
    key: "noJump",
    value: function noJump() {
      if (this.jumping === true) {
        this.vel[1] = 15;
        this.jumping = false;
      } else if (this.pos[1] >= 450) {
        this.vel[1] = 0;
        this.pos[1] = 450;
        this.jumping = false;
      }
    }
  }, {
    key: "relocate",
    value: function relocate() {
      this.pos = [450, 400];
      this.vel = [0, 0];
    }
  }]);

  return Coder;
}(MovingObject);

Coder.RADIUS = 65;
module.exports = Coder;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Util = __webpack_require__(0);
var MovingObject = __webpack_require__(1);
var Coder = __webpack_require__(2);
var DEFAULTS = {
  COLOR: "#505050",
  RADIUS: 20,
  SPEED: 6
};

var CoffeeCup = function (_MovingObject) {
  _inherits(CoffeeCup, _MovingObject);

  function CoffeeCup() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, CoffeeCup);

    options.img = new Image();
    options.img.src = 'pics/coffee_pot.png';
    options.color = DEFAULTS.COLOR;
    options.pos = options.pos || options.game.beverageClouds[0].pos;
    options.radius = DEFAULTS.RADIUS;
    options.vel = options.vel || Util.randomVec(DEFAULTS.SPEED);

    var _this = _possibleConstructorReturn(this, (CoffeeCup.__proto__ || Object.getPrototypeOf(CoffeeCup)).call(this, options));

    _this.index = Math.floor(Math.random() * 10);
    _this.isWrappable = false;
    _this.startTime = 0;
    _this.emptyCoffeeCup = new Image();
    _this.emptyCoffeeCup.src = 'pics/white_mug.png';
    _this.coffeeCupAudio = new Audio('sounds/coffee_cup.mp3');
    return _this;
  }

  _createClass(CoffeeCup, [{
    key: "collideWith",
    value: function collideWith(otherObject) {
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
  }, {
    key: "checkOnTheGround",
    value: function checkOnTheGround(delta) {
      if (this.pos[1] >= 550) {
        this.vel = [0, 0];
        this.startTime += delta;
      }
      var check = Math.floor(this.startTime % 10);
      if (this.startTime > 10 && (check === 7 || check === 8 || check === 9)) {
        this.img = this.emptyCoffeeCup;
      }
      if (this.startTime > 2000) {
        this.remove();
      }
      console.log(this.startTime, "startTime");
    }
  }]);

  return CoffeeCup;
}(MovingObject);

module.exports = CoffeeCup;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Game = __webpack_require__(5);
var GameView = __webpack_require__(8);

document.addEventListener("DOMContentLoaded", function () {
  var canvasEl = document.getElementsByTagName("canvas")[0];
  canvasEl.width = Game.DIM_X;
  canvasEl.height = Game.DIM_Y;
  var ctx = canvasEl.getContext("2d");
  var game = new Game();
  var gameView = new GameView(game, ctx);

  gameView.start();
});

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CoffeeCup = __webpack_require__(3);
var MilkGlass = __webpack_require__(6);
var Util = __webpack_require__(0);
var BeverageCloud = __webpack_require__(7);
var Coder = __webpack_require__(2);

var Game = function () {
  function Game() {
    _classCallCheck(this, Game);
  }

  _createClass(Game, [{
    key: "cosntructor",
    value: function cosntructor() {
      this.highScore = 0;
      this.mainAudio = new Audio('sounds/main-bg-sound.wav');
      this.dieAudio = new Audio('sounds/game-over.wav');
      this.reset();
    }
  }, {
    key: "reset",
    value: function reset() {
      this.coffeeCups = [];
      this.coders = [];
      this.beverageClouds = [];
      this.milkGlasses = [];
      this.remainTime = 30;
    }
  }, {
    key: "add",
    value: function add(object) {
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
  }, {
    key: "addCoffeeCups",
    value: function addCoffeeCups() {
      for (var i = 0; i < GAME.NUM_COFFEE_CUPS; i++) {
        this.add(new CoffeeCup({
          game: this
        }));
      }
    }
  }, {
    key: "addMilkGlasses",
    value: function addMilkGlasses() {
      var milkGlassCount = Math.floor(Game.NUM_MILK_GLASSES * Math.random());
      for (var i = 0; i < milkGlassCount; i++) {
        this.add(new MilkGlass({
          game: this
        }));
      }
    }
  }, {
    key: "addCoder",
    value: function addCoder() {
      var coder = new Coder({
        pos: [400, 450],
        game: this
      });
      this.add(coder);
      return coder;
    }
  }, {
    key: "addBeverageCloud",
    value: function addBeverageCloud() {
      var beverageCloud = new BeverageCloud({
        pos: [600, 40],
        game: this
      });
      this.add(beverageCloud);
      return beverageCloud;
    }
  }, {
    key: "allObjects",
    value: function allObjects() {
      return [].concat(this.coders, this.coffeeCups, this.beverageClouds, this.milkGlasses);
    }
  }, {
    key: "checkCollisions",
    value: function checkCollisions() {
      var allObjects = this.allObjects();
      for (var i = 0; i < allObjects.length; i++) {
        for (var j = 0; j < allObjects.length; i++) {
          var obj1 = allObjects[i];
          var obj2 = allObjects[j];

          if (obj1.isCollidedWith(obj2)) {
            var collision = obj1.collideWith(obj2);
            if (collision) return;
          }
        }
      }
    }
  }, {
    key: "draw",
    value: function draw(ctx, gameLeftTime) {
      ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
      ctx.font = "30px Sans-serif";
      var bg = new Image();
      bg.src = 'pics/start-bg.jpg';
      ctx.drawImage(bg, 0, 0);

      if (this.coders[0].coffeeCups > this.highScore) {
        this.highScore = this.coders[0].coffeeCups;
      }
      ctx.fillText('High Score: ' + this.highScore, Game.DIM_X - 235, 30);
      var cofCupImg = new Image();
      cofCupImg.src = 'pics/coffee_pot.png';
      ctx.drawImage(cofCupImg, Game.DIM_X - 150, 45);

      ctx.fillText(' x ' + this.coders[0].coffeeCups, Game.DIM_X - 100, 80);

      var clockImg = new Image();
      clockImg.src = 'pics/clock.png';
      ctx.drawImage(clockImg, 20, 0);

      this.remainTime = Math.round(gameLeftTime * 100) / 100;
      if (this.remainTime < 0.01) {
        this.remainTime = 0;
      }
      ctx.fillText(this.remainTime, 80, 30);

      this.allObjects().forEach(function (object) {
        object.draw(ctx, object.img);
      });
    }
  }, {
    key: "isOutOfBounds",
    value: function isOutOfBounds(pos) {
      return pos[0] < 0 || pos[1] < 0 || pos[0] > Game.DIM_X || pos[1] > Game.DIM_Y;
    }
  }, {
    key: "handleInput",
    value: function handleInput() {
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
  }, {
    key: "moveObjects",
    value: function moveObjects(delta) {
      this.allObjects().forEach(function (object) {
        object.move(delta);
      });
      this.coders.forEach(function (coder) {
        coder.checkBumped(delta);
      });
      this.coffeeCups.forEach(function (coffeeCup) {
        coffeeCup.checkOnTheGround(delta);
      });
      this.milkGlasses.forEach(function (milkGlass) {
        milkGlass.checkOnTheGround(delta);
      });
    }
  }, {
    key: "randomPosition",
    value: function randomPosition() {
      return [Game.DIM_X * Math.random(), Game.DIM_Y * Math.random()];
    }
  }, {
    key: "remove",
    value: function remove(object) {
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
  }, {
    key: "step",
    value: function step(delta) {
      this.handleInput();
      this.moveObjects(delta);
      this.checkCollisions();
    }
  }, {
    key: "wrap",
    value: function wrap(pos) {
      return [Util.wrap(pos[0], Game.DIM_X), Util.wrap(pos[1], Game.DIM_Y)];
    }
  }]);

  return Game;
}();

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

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Util = __webpack_require__(0);
var MovingObject = __webpack_require__(1);
var Coder = __webpack_require__(2);
var DEFAULTS = {
  COLOR: "#505050",
  RADIUS: 25,
  SPEED: 7
};

var MilkGlass = function (_MovingObject) {
  _inherits(MilkGlass, _MovingObject);

  function MilkGlass() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, MilkGlass);

    options.img = new Image();
    options.img.src = 'pics/milk.png';
    options.pos = options.pos || options.game.beverageClouds[0].pos;
    options.radius = DEFAULTS.RADIUS;
    options.vel = options.vel || Util.randomVec(DEFAULTS.SPEED);

    var _this = _possibleConstructorReturn(this, (MilkGlass.__proto__ || Object.getPrototypeOf(MilkGlass)).call(this, options));

    _this.index = Math.floor(Math.random() * 10);
    _this.isWrappable = false;
    _this.startTime = 0;
    _this.emptyCoffeeCup = new Image();
    _this.emptyCoffeeCup.src = 'sprites/white_mug.png';
    _this.bumpAudio = new Audio('sounds/bump.wav');
    return _this;
  }

  _createClass(MilkGlass, [{
    key: "collideWith",
    value: function collideWith(otherObject) {
      if (otherObject instanceof Coder && !otherObject.bumped) {
        this.remove();
        otherObject.bumped = true;
        this.bumpAudio.play();
        return true;
      }
    }
  }, {
    key: "checkOnTheGround",
    value: function checkOnTheGround(delta) {
      if (this.pos[1] >= 550) {
        this.vel = [0, 0];
        this.startTime += delta;
      }
      var check = Math.floor(this.startTime % 10);
      if (this.startTime > 1000) {
        this.remove();
      }
    }
  }]);

  return MilkGlass;
}(MovingObject);

module.exports = MilkGlass;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MovingObject = __webpack_require__(1);

var BeverageCloud = function (_MovingObject) {
  _inherits(BeverageCloud, _MovingObject);

  function BeverageCloud(options) {
    _classCallCheck(this, BeverageCloud);

    options.radius = BeverageCloud.RADIUS;
    options.img = new Image();
    options.img.src = 'pics/beverage_cloud.png';
    options.vel = options.vel || [-1, 0];

    var _this = _possibleConstructorReturn(this, (BeverageCloud.__proto__ || Object.getPrototypeOf(BeverageCloud)).call(this, options));

    _this.isWrappable = true;
    return _this;
  }

  return BeverageCloud;
}(MovingObject);

BeverageCloud.RADIUS = 40;
BeverageCloud.SPEED = 10;

module.exports = BeverageCloud;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GameView = function () {
  function GameView(game, ctx) {
    _classCallCheck(this, GameView);

    this.ctx = ctx;
    this.game = game;
    this.addTimeAudio = new Audio("sounds/one-up.wav");
    this.pauseAudio = new Audio("sounds/pause.mp3");
    this.reset();
  }

  _createClass(GameView, [{
    key: "reset",
    value: function reset() {
      this.game.reset();
      this.time = 20;
      this.paused = true;
      this.coder = this.game.addCoder();
      this.beverageCloud = this.game.addBeverageCloud();
      this.wakeUpTime = 0;
      this.gameLeftTime = 30;
      this.addTimeIdx = 0;
      this.fiveSecTime = 0;
    }
  }, {
    key: "bindKeyHandlers",
    value: function bindKeyHandlers() {
      var _this = this;

      var coder = this.coder;
      console.log(coder, "coder");
      $(".start").click(function () {
        _this.paused = false;
        $('.start-bg').hide();
        $('.start').hide();
        $('.intro').hide();
        $('.five-sec').hide();
        $('.game-canvas').show();
        _this.game.mainAudio.play();
      });
      $('.restart').click(function () {
        _this.reset();
        $('.start-bg').show();
        $('.start').show();
        $('.intro').show();
        $('.pause').hide();
        $('.restart').hide();
        $('.five-sec').hide();
        $('.game-canvas').hide();
        _this.game.mainAudio.load();
      });
      $('.game-over').click(function () {
        _this.reset();
        $('.start-bg').show();
        $('.start').show();
        $('.intro').show();
        $('.pause').hide();
        $('restart').hide();
        $('.game-canvas').hide();
        $('.five-sec').hide();
        $('.game-over').hide();
        _this.game.mainAudio.load();
      });
      $('html').keydown(function (event) {
        if (event.which == 80) {
          _this.paused = !_this.paused;
          if (_this.paused) {
            $('.pause').show();
            $('.restart').show();
            _this.game.mainAudio.pause();
            _this.pauseAudio.play();
          } else {
            $('.pause').hide();
            $('.restart').hide();
            _this.game.mainAudio.play();
          }
        }
      });
    }
  }, {
    key: "start",
    value: function start() {
      this.bindKeyHandlers();
      this.lastTime = 0;
      //start animation
      requestAnimationFrame(this.animate.bind(this));
    }
  }, {
    key: "animate",
    value: function animate(time) {
      var timeDelta = time - this.lastTime;
      if (!this.paused) {
        this.coderAnimate(time);
        this.bevCloudAnimate(time);
        this.coffeeCupAnimate(time);
        this.createCoffeeCups(time);
        this.wakeUpCoder(timeDelta);
        this.calculateGameEndTime(timeDelta);
        this.game.step(timeDelta);
        this.game.draw(this.ctx, this.gameLeftTime);
      }
      this.lastTime = time;
      // console.log(time, "time");
      // console.log(timeDelta, "time-delta");
      //every call to animate requests another call to animate
      requestAnimationFrame(this.animate.bind(this));
      if (this.gameLeftTime < 0.01) {
        this.paused = true;
        this.game.mainAudio.load();
        $('.game-over').show();
      }
    }
  }, {
    key: "calculateGameEndTime",
    value: function calculateGameEndTime(timeDelta) {
      this.gameLeftTime = (this.gameLeftTime * 1000 - timeDelta) / 1000;
      if (Math.floor(this.coder.coffeeCups / 100) > this.addTimeIdx) {
        this.addTimeAudio.play();
        this.gameLeftTime += 5;
        this.addTimeIdx += 1;
        this.fiveSecTime = this.gameLeftTime;
        $('#five-sec').show();
      }
      if (this.fiveSecTime - this.gameLeftTime > 2) {
        this.fiveSecTime = 0;
        $('#five-sec').hide();
      }
    }
  }, {
    key: "wakeUpCoder",
    value: function wakeUpCoder(timeDelta) {
      console.log(wakeUpTime, "wakeUpTime");
      if (this.coder.bumped) {
        this.wakeUpTime += timeDelta;
      }
      if (this.wakeUpTime > 2000) {
        this.coder.bumped = false;
        this.wakeUpTime = 0;
      }
    }
  }, {
    key: "coderAnimate",
    value: function coderAnimate(time) {
      this.coderL1 = new Image();
      this.coderL1.src = 'pics/coderL1.png';
      this.coderL2 = new Image();
      this.coderL2.src = 'pics/coderL2.png';
      this.coderL3 = new Image();
      this.coderL3.src = 'pics/coderL3.png';
      this.coderR1 = new Image();
      this.coderR1.src = 'pics/coderR1.png';
      this.coderR2 = new Image();
      this.coderR2.src = 'pics/coderR2.png';
      this.coderR3 = new Image();
      this.coderR3.src = 'pics/coderR3.png';
      this.coderRj = new Image();
      this.coderRj.src = 'pics/coderRj.png';
      this.coderLj = new Image();
      this.coderLj.src = 'pics/coderLj.png';

      if (this.coder.bumped) {
        if (this.coder.facingRight) {
          this.coder.img = this.coderR3;
        } else {
          this.coder.img = this.coderL3;
        }
      } else {
        if (this.coder.vel[0] === 0) {
          if (this.coder.facingRight) {
            this.coder.img = this.coderR1;
          } else {
            this.coder.img = this.coderL1;
          }
        } else if (time / 50 % 2 < 1) {
          if (this.coder.facingRight) {
            this.coder.img = this.coderR1;
          } else {
            this.coder.img = this.coderL1;
          }
        } else {
          if (this.coder.facingRight) {
            this.coder.img = this.coderR2;
          } else {
            this.coder.img = this.coderL2;
          }
        }
        if (this.coder.jumping && this.coder.facingRight) {
          this.coder.img = this.coderRj;
        } else if (this.coder.jumping && this.coder.facingRight === false) {
          this.coder.img = this.coderLj;
        }
      }
    }
  }, {
    key: "bevCloudAnimate",
    value: function bevCloudAnimate(time) {
      this.bevCloudL = new Image();
      this.bevCloudL.src = 'pics/bevCloudL.png';
      this.bevCloudR = new Image();
      this.bevCloudR.src = 'pics/bevCloudR.png';
      var newVel = 2 * Math.random();
      if (this.beverageCloud.pos[0] < 60 || this.beverageCloud.pos[0] > 900) {
        this.beverageCloud.vel[0] = -this.beverageCloud.vel[0];
      }
      if (time / 300 % 2 < 1) {
        this.beverageCloud.vel[0] -= newVel;
        if (this.beverageCloud.vel[0] > 15) {
          this.beverageCloud.vel[0] -= newVel;
        } else if (this.beverageCloud.vel[0] < -15) {
          this.beverageCloud.vel[0] += newVel;
        }
      } else {
        this.beverageCloud.vel[0] += newVel;
        if (this.beverageCloud.vel[0] > 15) {
          this.beverageCloud.vel[0] -= newVel;
        } else if (this.beverageCloud.vel[0] < -15) {
          this.beverageCloud.vel[0] += newVel;
        }
      }

      if (this.beverageCloud.vel[0] < -2) {
        this.beverageCloud.img = this.bevCloudL;
      } else if (this.beverageCloud.vel[0] > 2) {
        this.beverageCloud.img = this.bevCloudR;
      }
    }
  }, {
    key: "coffeeCupAnimate",
    value: function coffeeCupAnimate(time) {
      var coffeeCups = this.game.coins;
      var images = [];
      for (var i = 1; i <= 10; i++) {
        var coffeeCupImage = new Image();
        coffeeCupImage.src = "pics/coffee_pot" + i + ".png";
      }
      coffeeCups.forEach(function (coffeeCup) {
        var newIdx = Math.floor(time / 100 % 10);
        coffeeCup.img = images[(coffeeCup.index + newIdx) % 10];
      });
    }
  }, {
    key: "createCoffeeCups",
    value: function createCoffeeCups(time) {
      var modTime = Math.floor(time / 10 % 300);
      console.log(modTime, "modTime");
      if (modTime === 25 || modTime === 26) {
        this.game.addCoffeeCups();
        this.game.addMilkGlasses();
      }
    }
  }]);

  return GameView;
}();

module.exports = GameView;

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map