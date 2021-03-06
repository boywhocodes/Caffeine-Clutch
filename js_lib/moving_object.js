const Util = require("./util");

class MovingObject {
  constructor (options) {
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

  collideWith(otherObject) {

  }

  draw(ctx, img) {

    console.log(ctx, "ctx");
    console.log(img, "img");
    ctx.drawImage(img, this.pos[0], this.pos[1]);
  }

  isCollidedWith(otherObject) {
    let newPos = [this.pos[0] + this.radius, this.pos[1] + this.radius];
    let otherPos = [otherObject.pos[0] + otherObject.radius, otherObject[1] + otherObject.radius];
    const centerDist = Util.dist(newPos, otherPos);
    return centerDist < (this.radius + otherObject.radius);
  }

  move(timeDelta) {
    const velocityScale = timeDelta / NORMAL_FRAME_TIME_DELTA,
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

  remove() {
    this.game.remove(this);
  }
}

const NORMAL_FRAME_TIME_DELTA = 1000/60;

module.exports = MovingObject;
