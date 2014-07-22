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
