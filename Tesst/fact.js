"use strict";

const nStr = "" + process.argv[2];
const nInt = parseInt(nStr);

let s = 1;
for (let i = 1; i <= nInt; i++)
	s *= i;

console.log("" + s);