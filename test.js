class A{
  constructor(){
    this.x = 3;
  }
  method1(){
    console.log("hello");
  }
  
  say(){
    const a = this.method1;
    console.log(a);
    a();    
  }
  hoge(){
      console.log(this);
      console.log("hoge");
    
  }
  
  foo(){
    const a = document.createElement("button");
    a.addEventListener("click",()=>{
      console.log(this)
      this.hoge();
    });
    a.click();
  }
  
  cen(){
    console.log(this.x);
  }
  
  aha(){
    const a = this.cen;
    console.log(a);
    a();
  }
  
}

myA = new A();
myA.aha();



console.log(`"this" indicates %o`,this);
const a = ()=>{
  console.log(`"this" indicates %o`,this);
}
function b(){
  console.log(`"this" indicates %o`,this);
}
const obj ={a:a,b:b};
a();
b();
obj.a();
obj.b();

const me = {
  name:"Tom",
  
  greet(){
    console.log(`Hello, I'm ${this.name}`);
    return;
  },
  
  this_equals(){
    console.log(this);
    
    return;
  },
  
  foo(){
    const this_equals = this.this_equals;
    this_equals();
  }
  
}

me.this_equals();
const this_equals = me.this_equals;
this_equals();

me.foo();







const obj = {  
name: "music",
  
variations:{   
            love:function(){console.log(`I love ${this.name}`); },
            like:function(){console.log(`I like ${this.name}`); },
            dislike:function(){console.log(`I dislike ${this.name}`); }
        },
say:function(){
      for(let key of Object.keys(this.variations)){
        const method = this.variations[key];
        console.log(method);
        method();
      }
    }

};

obj.say();
















