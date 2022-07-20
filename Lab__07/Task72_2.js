"use strict";

const execSync = require('child_process').execSync;

function useCmd(s) {
	const options = {encoding: 'utf8'};
	const cmd = s.toString();
	const answer = execSync(cmd, options);
	return answer.toString();
}


const len = process.argv.length;
var arr = [];
for (let i = 2; i < len; i++){
	const nStr = process.argv[i];
	const factCommand = `node fact.js ${nStr}`;
	let fact = useCmd(factCommand);
	fact = parseInt(fact);
	console.log(`${nStr}! = ${fact}`);
}
