const p = document.createElement("div");
p.innerText = "hi";
const c1 = document.createElement("div");
const c2 = document.createElement("div");
p.appendChild(c1);
p.appendChild(c2);

console.log(p);

p.removeChild(p.firstChild);
p.removeChild(p.firstChild);
console.log(p);
