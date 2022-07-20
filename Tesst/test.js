
const fs = require("fs");
let util = require("util");


const fileName = "inp.txt";

let a= [{1: "a"}, {2: "b"}, {3: "c"}];

fs.writeFileSync(fileName, JSON.stringify(a));

const contentString = fs.readFileSync(fileName, "utf8");

const arr = JSON.parse(contentString);

console.log(arr);
console.log("\n----\n");
console.log(contentString);

const name = "ABC";
console.log({name : name});