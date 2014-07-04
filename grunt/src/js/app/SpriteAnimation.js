(function(w, d){
  SpriteAnimation = function($e, prefix, frame, fps, repeat){
    this.$e = $e;
    this.prefix = prefix;
    this.frame = frame;
    this.fps = fps === undefined ? 30 : fps;
    this.repeat = repeat === undefined ? true : repeat;
    this.playing = false;
    this.timeStamp = -1;
    this.n = 1;
  };
  SpriteAnimation.prototype = {
    _getClassName: function(n){
       return this.prefix+("000" + this.n).slice(-4);
    },
    play: function(callback){
      this.playing = true;
      var num = "";
      var timeStamp = +new Date();
      this.timeStamp = timeStamp;
      var routine = function(){
        if(!this.playing || this.timeStamp !== timeStamp) return;
        var n_next = this.n+1;
        if(n_next > this.frame){
          if(this.repeat){
            n_next = 1;
          }else{
            n_next = this.frame;
            this.stop(callback);
          }
        }
        this.setN(n_next);
        setTimeout(routine, 1000/this.fps);
      }.bind(this);
      setTimeout(routine, 0);
    },
    setN: function(n, callback){
      this.$e.removeClass(this._getClassName(this.n));
      this.n = n;
      this.$e.addClass(this._getClassName(this.n));
      setTimeout(callback);
    },
    start: function(callback){
      this.setN(1);
      this.play(callback);
    },
    stop: function(callback){
      this.playing = false;
      setTimeout(callback, 0);
    }
  };
  exports.SpriteAnimation = SpriteAnimation;
})(this, document);
