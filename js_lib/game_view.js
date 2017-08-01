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

  }
}
