const Util = {
  //normalize length of vector to 1, maintaining direction
  dir (vec) {
    let norm = Util.norm(vec);
    return Util.scale(vec, 1 / norm);
  },

  //find distance btween two points
  dist(pos1, pos2) {
    return Math.sqrt(
      Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1], 2) // returns (base, exponent)
    );
  },
  //Find length of vector
  norm(vec) {
    return Util.dist([0, 0], vec);
  },
  //Return randomly oriented vector with the given length
  randomVec(length) {
    let deg = 2 * Math.PI * Math.random();
    return Util.scale([Math.sin(deg), Math.cos(deg)], length);
  },
  // Scale the length of a vector by the given amount
  scale (vec, m) {
    let yV = Math.abs(vec[1] * m);
    if (yV < 3) {
      yV += 3;
    }
    return [vec[0] * m, yV];
  },
  // Ability to go through edges
  wrap (coord, max) {
    if (coord < 0) {
      return max - (coord % max);
    } else if (coord > max) {
      return coord % max;
    } else {
      return coord;
    }
  }
};

module.exports = Util;
