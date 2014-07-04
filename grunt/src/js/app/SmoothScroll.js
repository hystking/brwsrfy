(function(w, d){
  SmoothScroll = function(speed){
    this.speed = speed;
    this.body = $("html, body");
  };
  SmoothScroll.prototype.scrollTo = function(pos, callback){
    var callback_called = false;
    if(typeof(pos) === "object"){
      pos = pos.offset().top;
    }
    this.body.animate({"scroll-top": pos}, this.speed, "swing", function(){
      if(!callback_called){
        callback_called = true;
        setTimeout(callback, 0);
      }
    });
  };
})(this, document);
