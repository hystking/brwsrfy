(function(w, d){
  ScrollEvent = function(y, callback, repeat){
    this.y = y;
    this.callback = callback;
    this.repeat = repeat || false;
  };
  ScrollWatcher = function(){
    this.scrollEvents = [];
    this.pre_y = NaN;
  };
  ScrollWatcher.prototype.set = function(y, callback, repeat){
    this.scrollEvents.push(
      new ScrollEvent(y, callback, repeat || false)
      );
  };
  ScrollWatcher.prototype.set$e = function($e, callback, repeat){
    this.set(
      $e.offset().top + $e.innerHeight()*1/2,
      callback,
      repeat || false
      );
  };
  ScrollWatcher.prototype.onScroll = function(){
    var i;
    var y = $w.scrollTop();
    if(Math.abs(y-this.pre_y) < 40) return;
    var y_top, y_bottom;
    var margin_y = $w.height()*2/3;
    if(y < this.pre_y){
      y_top = y + margin_y;
      y_bottom = this.pre_y + margin_y;
    }else{
      y_top = this.pre_y + margin_y;
      y_bottom = y + margin_y;
    }
    for(i=0; i<this.scrollEvents.length; i++){
      var e = this.scrollEvents[i];
      if(y_top <= e.y && e.y <= y_bottom){
        setTimeout(e.callback);
        if(!e.repeat){
          this.scrollEvents.splice(i, 1);
          i--;
        }
      }
    }
    this.pre_y = y;
  };
  ScrollWatcher.prototype.startWatch = function(){
    d.addEventListener("scroll", this.onScroll.bind(this));
  };
})(this, document);
