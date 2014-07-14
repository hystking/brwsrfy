(function(w,d){
  WindowManager = function(){
    this.$w = $(w);
    this.set();
    this.$w.resize(this.set.bind(this));
    this.$body = $("html, body");
    this.$wrapper = $(".wrapper");
  };
  WindowManager.prototype = {
    set: function(){
      this.windowWidth = w.innerWidth ? w.innerWidth : this.$w.innerWidth();
      this.windowHeight = w.innerHeight ? w.innerHeight : this.$w.innerHeight();
      if(this.windowWidth > 320){
        this.windowLeftFromScreen = - (this.windowWidth - 320) / 2;
        this.windowRightFromScreen = 320 + (this.windowWidth - 320) / 2;
      }else{
        this.windowLeftFromScreen = - (320 - 320) / 2;
        this.windowRightFromScreen = this.windowLeftFromScreen + this.windowWidth;
      }
    },
    lockScroll: function(y){
      if(y){
        this.$w.scrollTop(y);
      }
      this.$body.css({
        "overflow": "hidden",
        "outline":"none"
      });
      this.$wrapper.on('touchmove.noScroll', function(e) {
        e.preventDefault();
      });
    },
    unlockScroll: function(){
      this.$body.css({
        "overflow": "",
        "outline":""
      });
      this.$wrapper.off('.noScroll');
    }
  };
})(this, document);
