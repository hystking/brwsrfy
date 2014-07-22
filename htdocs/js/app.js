(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var Animation = function(draw, duration, repeat){
  this.timeStamp = 0;
  this.duration = duration;
  this.repeat = repeat || false;
  this.playing = false;
  this.callback = null;
  this._draw = draw;
};

Animation.prototype = {
  "_start": function(timeStamp, callback){
    var draw = function(){
      // calc t
      t = Date.now() - timeStamp;
      if(repeat){
        t = t % duration;
      }
      if(t < 0){
        t = 0;
      }else if(t >= duration){
        t = duration;
        dis.stop(callback);
      }
      // draw it
      _draw(t/duration);
      //call next draw
      if(dis.playing && timeStamp === dis.timeStamp){
        requestAnimationFrame(draw);
        //setTimeout(draw, 30);
      }
    };
    var repeat = this.repeat;
    var duration = this.duration;
    var _draw = this._draw;
    var dis = this;
    var t;
    draw();
  },
  "start": function(callback){
    this.timeStamp = +new Date();
    this.playing = true;
    this._start(this.timeStamp, callback || null);
  },
  "stop": function(callback){
    this.playing = false;
    if(callback) callback();
  }
};

module.exports = Animation;

},{}],2:[function(require,module,exports){
module.exports = {
  "easeIn": function(t){
    return t * t;
  },
  "easeIn3": function(t){
    return t * t * t;
  },
  "easeIn4": function(t){
    return t * t * t * t;
  },
  "easeOut": function(t){
    var _t = 1-t;
    return 1 - _t * _t;
  },
  "easeOut3": function(t){
    var _t = 1-t;
    return 1 - _t * _t * _t;
  },
  "easeOut4": function(t){
    var _t = 1-t;
    return 1 - _t * _t * _t * _t;
  },
  "easeInOut": function(t){
    if(t < 0.5){
      t = t / 0.5;
      return t * t * 0.5;
    }
    t = t / 0.5 - 1;
    return (2 - (1-t) * (1-t)) * 0.5;
  },
  "attack": function(t, a){
    return ((1 - t * t) * a + 1) * t;
  },
  "roundTrip": function(t){
    if(t < 0.5){
      return t / 0.5;
    }
    return (1 - t) / 0.5;
  },
  "bezier2d3": function(x1, y1, x2, y2, x3, y3, t){
    var t_ = 1-t;
    return [
      x1*t_*t_ + x2*2*t_*t + x3*t*t,
      y1*t_*t_ + y2*2*t_*t + y3*t*t
        ];
  },
  "bezier2d4": function(x1, y1, x2, y2, x3, y3, x4, y4, t){
    var t_ = 1-t;
    return [
      x1*t_*t_*t_ + x2*3*t_*t_*t + x3*3*t_*t*t + x4*t*t*t,
      y1*t_*t_*t_ + y2*3*t_*t_*t + y3*3*t_*t*t + y4*t*t*t
        ];
  }
};


},{}],3:[function(require,module,exports){
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

},{}],4:[function(require,module,exports){
Transform = function(dom, string){
  this.list = [];
  this.dict = {};
  this.dom = dom || null;
  if(string) this.parse(string);
};
Transform.prototype = {
  "parse": function(string){
    var attr = string.split(")");
    var len = attr.length;
    var dict = {};
    var list = [];
    var i, p, name, val;
    for(i=0; i<len-1; i++){
      p = attr[i].split("(");
      dict[p[0]] = p;
      list.push(p);
    }
    this.dict = dict;
    this.list = list;
  },
  "stringify": function(){
    var string = "";
    var list = this.list;
    var len = list.length;
    var i, p;
    for(i=0; i<len; i++){
      p = list[i];
      string += p[0] + "("+p[1]+") ";
    }
    return string;
  },
  "get": function(name, unit, def){
    var p = this.dict[name];
    return p ? +p[1].replace(unit,"") : def || 0;
  },
  "set": function(name, val){
    var p = this.dict[name];
    if(p){
      p[1] = val;
    }else{
      p = [name, val];
      this.dict[p[0]] = p;
      this.list.push(p);
    }
  },
  /* SUGER METHODS */
  "applyStyle": function(){
    var dom = this.dom;
    var str = this.stringify();
    dom.style.transform = str;
    dom.style.WebkitTransform = str;
    dom.style.MozTransform = str;
    dom.style.MsTransform = str;
    dom.style.OTransform = str;
  },
  "x": function(val, unit){
    unit = unit || "px";
    if(val === undefined){
      return this.get("translateX", unit, 0);
    }else{
      this.set("translateX", val + unit);
    }
  },
  "y": function(val, unit){
    unit = unit || "px";
    if(val === undefined){
      return this.get("translateY", unit, 0);
    }else{
      this.set("translateY", val + unit);
    }
  },
  "scale": function(val, unit){
    unit = unit || "";
    if(val === undefined){
      return this.get("scale", unit, 0);
    }else{
      this.set("scale", val + unit);
    }
  },
  "rotate": function(val, unit){
    unit = unit || "deg";
    if(val === undefined){
      return this.get("rotate",  unit, 0);
    }else{
      this.set("rotate", val + unit);
    }
  }
};

module.exports = Transform;

},{}],5:[function(require,module,exports){
var Easing = require("./app/Easing");
var Animation = require("./app/Animation");
var Transform = require("./app/Transform");
var SpriteAnimation = require("./app/SpriteAnimation");
window.onload = function(){
  var i;
  var prototypeBackground = document.getElementById("prototype-background");
  var prototypeTranslate = document.getElementById("prototype-translate");

  var stageWidth = 500;
  var stageHeight = 500;

  var hoge = function(){
    //var clone = prototypeBackground.cloneNode(true);
    var clone = prototypeTranslate.cloneNode(true);
    var tf = new Transform(clone);
    tf.x(Math.random()*stageWidth|0);
    tf.y(Math.random()*stageHeight|0);
    tf.rotate(0);
    var t2, t3;
    var xr = Math.random()*5+5;
    var yr = Math.random()*5+5;
    var rr = (Math.random()*50-25|0)*360;
    new Animation(function(t){
      t2 = Easing.easeIn(
        Easing.roundTrip(
          t * xr % 1
          )
        );
      t3 = Easing.roundTrip(
        t * yr % 1
      );
      tf.x(t3*stageWidth);
      tf.y(t2*stageHeight);
      tf.rotate(t*rr);
      tf.applyStyle();
    }, Math.random()*100000+100000, true).start();
    document.body.appendChild(
      clone
    );
    
  };
  for(i=0; i<100; i++){
    hoge();
  }
  prototypeBackground.style.display = "none";
  prototypeTranslate.style.display = "none";
};

},{"./app/Animation":1,"./app/Easing":2,"./app/SpriteAnimation":3,"./app/Transform":4}]},{},[5])