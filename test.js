const obj = {name:1};
const obj2 = {name:2}; 
const div = document.createElement("div");
const f =function(){console.log(this)}.bind(obj);

f();