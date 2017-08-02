class GameView {
  constructor(game, ctx) {
    this.ctx = ctx;
    this.game = game;
    this.addTimeAudio = new Audio("sounds/one-up.wav");
    this.pauseAudio = new Audio("sounds/pause.wav");
    this.reset();
  }

  reset() {
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

  bindKeyHandlers() {
    const coder = this.coder;
    $("#start").click(() => {
      this.paused = false;
      $('#start-bg').hide();
      $('#start').hide();
      $('#intro').hide();
      $('#five-sec').hide();
      $('#game-canvas').show();
      this.game.mainAudio.play();
    });
    $('#restart').click(() => {
      this.reset();
      $('#start-bg').show();
      $('#start').show();
      $('#intro').show();
      $('#pause').hide();
      $('#restart').hide();
      $('#five-sec').hide();
      $('#game-canvas').hide();
      this.game.mainAudio.load();
    });
    $('#game-over').click(() => {
      this.reset();
      $('#start-bg').show();
      $('#start').show();
      $('#intro').show();
      $('#pause').hide();
      $('restart').hide();
      $('#game-canvas').hide();
      $('#five-sec').hide();
      $('#game-over').hide();
      this.game.mainAudio.load();
    });
    $('html').keydown(event => {
      if (event.which == 80) {
        this.paused = !this.paused;
        if (this.paused) {
          $('#pause').show();
          $('#restart').show();
          this.game.mainAudio.pause();
          this.pauseAudio.play();
        } else {
          $('#pause').hide();
          $('#restart').hide();
          this.game.mainAudio.play();
        }
      }
    });
  }

  start() {
    this.bindKeyHandlers();
    this.lastTime = 0;
    //start animation
    requestAnimationFrame(this.animate.bind(this));
  }

  animate(time) {
    let timeDelta = time - this.lastTime;
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
    console.log(time, "time");
    console.log(timeDelta, "time-delta");
    //every call to animate requests another call to animate
    requestAnimationFrame(this.animate.bind(this));
    if (this.gameLeftTime < 0.01) {
      this.paused = true;
      this.game.mainAudio.load();
      $('#game-over').show();
    }
  }

  calculateGameEndTime(timeDelta) {
    this.gameLeftTime = ((this.gameLeftTime * 1000 - timeDelta) / 1000);
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

  wakeUpCoder(timeDelta) {
    console.log(wakeUpTime, "wakeUpTime");
    if (this.coder.bumped) {
      this.wakeUpTime += timeDelta;
    }
    if (this.wakeUpTime > 2000) {
      this.coder.bumped = false;
      this.wakeUpTime = 0;
    }
  }

  coderAnimate(time) {
    this.coderL1 = new Image();
    this.coderL1.src = 'sprites/coderL1.png';
    this.coderL2 = new Image();
    this.coderL2.src = 'sprites/coderL2.png';
    this.coderL3 = new Image();
    this.coderL3.src = 'sprites/coderL3.png';
    this.coderR1 = new Image();
    this.coderR1.src = 'sprites/coderR1.png';
    this.coderR2 = new Image();
    this.coderR2.src = 'sprites/coderR2.png';
    this.coderR3 = new Image();
    this.coderR3.src = 'sprites/coderR3.png';
    this.coderRj = new Image();
    this.coderRj.src = 'sprites/coderRj.png';
    this.coderLj = new Image();
    this.coderLj.src = 'sprites/coderLj.png';

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
      } else if (((time / 50) % 2) < 1) {
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


  bevCloudAnimate(time) {
    this.bevCloudL = new Image();
    this.bevCloudL.src = 'sprites/bevCloudL.png';
    this.bevCloudR = new Image();
    this.bevCloudR.src
  }
}
