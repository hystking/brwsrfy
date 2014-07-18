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
