"use strict";

const execSync = require('child_process').execSync;

function useCmd(s) {
	const options = {encoding: 'utf8'};
	const cmd = s.toString();
	const answer = execSync(cmd, options);
	return answer.toString();
}



// получаем параметры скрипта
const nStr = process.argv[2];

const factCommand = `node fact.js ${nStr}`;
let fact = useCmd(factCommand);
fact = parseInt(fact);
console.log(`Result: ${nStr}! = ${fact}`);