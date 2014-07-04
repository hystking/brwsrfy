/*var Easing = require("./app/Easing").Easing;
var Animation = require("./app/Animation").Animation;
var Transform = require("./app/Transform").Transform;
var SpriteAnimation = require("./app/SpriteAnimation").SpriteAnimation;
*/
/*
$(this).ready(function(){
  var body = $("body");
  */
  /*
  anim = new Animation(function(t){
    var col = 255 * Easing.easeInOut(Easing.roundTrip(t)) | 0;
    body.css("background", "rgb("+col+","+col+","+col+")");
  }, 2000, true);
  anim.start();
  */
  /*
  var $smily = $(".smily");
  var setAnim = function (dom){
    var tf = new Transform(dom);
    //tf.x(0);
    tf.rotate(0);
    new Animation(function(t){
      t = Easing.easeInOut(t);
      tf.rotate(-360*2*t);
      //tf.scale(t/10+1);
      tf.applyStyle();
    }, 3000, true).start();
  };
  setAnim($smily[0]);
  setAnim($smily[1]);
  $(".smily").animate({"margin-left": "100"},10000);
  */
  //new SpriteAnimation($smily, "f", 60, 30, true).start();
//});
window.onload = function(){
  var i, clone;
  var prototypeBackground = document.getElementById("prototype-background");
  var prototypeTranslate = document.getElementById("prototype-translate");

  for(i=0; i<500; i++){
    //clone = prototypeBackground.cloneNode(true);
    clone = prototypeTranslate.cloneNode(true);
    clone.style.left = (Math.random()*500|0) + "px";
    clone.style.top = (Math.random()*500|0) + "px";
    document.body.appendChild(
        clone
    );
  }
  prototypeBackground.style.display = "none";
  prototypeTranslate.style.display = "none";
};
