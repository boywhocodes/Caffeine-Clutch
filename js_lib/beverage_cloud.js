const MovingObject = require("./moving_object");

class BeverageCloud extends MovingObject {
  constructor(options) {
    options.radius = BeverageCloud.RADIUS;
    options.img = new Image();
    options.img.src = 'sprites/beverage_cloud.png';
    options.vel = options.vel || [-1, 0]
    super(options);
    this.isWrappable = true;
  }
}

BeverageCloud.RADIUS = 40;
BeverageCloud.SPEED = 10;

module.exports = BeverageCloud;
