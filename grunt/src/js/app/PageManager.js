(function(w, d){
  var HEIGHT_MARGIN = 0;
  var DURATION_SCROLL = 500;
  PageManager = function(offset){
    this.$page = $(".page");
    this.ss = new SmoothScroll(DURATION_SCROLL, offset);
    this.scrolling = false;
    this.pages = {};
    this.$lockedPage = null;
    this.lockedCallback = function(){};
    this.setN(0);
    var timer_id = null;
    $w.scroll(function(e){
      if(!this.$lockedPage) return;
      var height = $w.height();
      var y = $w.scrollTop() + height;
      var y_threshold = this.$lockedPage.offset().top + this.$lockedPage.innerHeight();
      if(y > y_threshold){
        $w.scrollTop(y_threshold - height);
        this.lockedCallback();
        /*
        clearTimeout(timer_id);
        timer_id = setTimeout(this.lockedCallback, 100);
        */
      }
    }.bind(this));
  };
  PageManager.prototype.addPage = function(n, page){
    this.pages[n] = page;
  };
  PageManager.prototype.lockAt = function(n, callback){
    this.$lockedPage = this.$page.eq(n);
    this.lockedCallback = callback || function(){};
  };
  PageManager.prototype.clearLock = function(){
    this.$lockedPage = null;
    this.lockedCallback = function(){};
  };
  PageManager.prototype.setN = function(n, callEvent){
    var i, page;
    this.n = n;
    this.currentPage = this.$page.eq(n);
    this.isLastPage = this.n === this.$page.length - 1;
    this.isFirstPage = this.n === 0;
    this.currentPageTop = this.isFirstPage?-999999:this.offsetTop(this.n);
    this.nextPageTop = this.isLastPage?999999:this.offsetTop(this.n+1);
    if(this.nav) this.nav.update(n);
    if(callEvent === undefined || callEvent){
      for(i in this.pages){
        page = this.pages[i];
        if(page && page.stop && parseInt(i) !== n) page.stop();
      }
      page = this.pages[n];
      if(page && page.start) page.start();
    }
  };
  PageManager.prototype.offsetTop = function(n){
    return this.$page.eq(n).offset().top;
  };
  PageManager.prototype.next = function(callback){
    if(this.n+1 >= this.$page.length) return;
    return this.navigate(this.n+1, callback);
  };
  PageManager.prototype.prev = function(callback){
    if(this.n-1 < 0) return;
    return this.navigate(this.n-1, callback);
  };
  PageManager.prototype.navigate = function(n, callback){
    if(n < 0 || n >= this.$page.length) return false;
    if(this.scrolling) return false;
    this.scrolling = true;
    var page = this.pages[n];
    if(page && page.setup) page.setup();
    this.ss.scrollTo(this.$page.eq(n), function(){
      this.setN(n);
      var $currentPage = this.currentPage;
      var _callback = callback?function(){callback($currentPage);}:function(){};
      setTimeout(_callback, 0);
      setTimeout(function(){
        this.scrolling = false;
      }.bind(this), 200);
    }.bind(this));
  };
})(this, document);
