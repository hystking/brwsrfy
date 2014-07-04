AnimationManager = function(list, repeat){
  this.list = list;
  this.timeStamp = -1;
  this.n = 0;
  this.repeat = repeat === undefined || repeat;
};
AnimationManager.getWait = function(duration){
  return function(cb, isAnimating){
    setTimeout(function(){
      if(isAnimating()) cb();
    }, duration);
  };
};
AnimationManager.getAddClass = function(className){
  return function(cb){
    $e.stop().addClass(className);
    cb();
  };
};
AnimationManager.getRemoveClass = function(className){
  return function(cb){
    $e.stop().removeClass(className);
    cb();
  };
};
AnimationManager.getSet = function(params){
  return function(cb){
    $e.stop().css(params);
    cb();
  };
};
AnimationManager.getAnimation = function(params, duration, queue){
  queue = queue === undefined || queue;
  return function(cb){
    if(!queue) cb();
    $e.stop()
      .animate(params, {duration: duration, queue: queue})
      .queue(queue?cb:null);
  };
};

AnimationManager.prototype = {
  "getCallback": function(timeStamp, userCallback){
    var isAnimating = function(){
      return timeStamp === this.timeStamp;
    }.bind(this);
    var callback = function(){
      if(!isAnimating()) return;
      if(this.n === this.list.length-1 && !this.repeat){
        this.stop(userCallback);
        return;
      }
      this.n = (this.n+1)%this.list.length;
      this.list[this.n](callback, isAnimating);
    }.bind(this);
    return callback;
  },
  "start": function(callback){
    this.timeStamp = +new Date();
    this.n = -1;
    this.getCallback(this.timeStamp, callback)();
  },
  "stop": function(callback){
    this.timeStamp = -1;
    if(callback) callback();
  }
};

exports.AnimationManager = AnimationManager;
