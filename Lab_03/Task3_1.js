"use strict";

const readlineSync = require('readline-sync');
const fs = require("fs");


function file_write(fileName, content){
	fs.writeFileSync(fileName, content);
}

function work1(){

	let n = readlineSync.question("Input Number N: ");
	let arr = [];
	for (let i = 0; i < n; i++){
		let str = readlineSync.question("Input String: ");
		if (str.length % 2 === 0){
			arr.push(str);
		}
	}

	let arr_json = JSON.stringify(arr);

	console.log("Wrrite to file: ");
	console.log(arr_json);
	file_write("out1.txt", arr_json);
}

function file_read(filename, is_show = 0){
	const nameString = filename;
	const contentString = fs.readFileSync(nameString, "utf8");
	if (is_show)
		console.log(contentString);
	return contentString;
}

function isVowel(c){
	let vArr = ["U", "A", "O", "E", "I"];
	for (let i = 0; i < vArr.length; i++)
		if (c == vArr[i])
			return 1;
	return 0;
}

function work2(){
	let res = []

	const fs = require("fs");
	const nameString = "out1.txt";

	if (!fs.existsSync(nameString)) {
		console.log("File was not found");
		return res;
	}	

	let content = file_read(nameString);
	let arr = JSON.parse(content);

	console.log("File: ");
	console.log(arr);

	for (let i = 0; i < arr.length; i++){
		let fl = 1;
		let s = arr[i];
		for (let j = 0; j < s.length && fl; j++){
			if (!isVowel(s[j]))
				fl = 0;
		}
		if (fl)
			res.push(arr[i]);
	}
	console.log("Output: ");
	console.log(res);
	return res;
}

function work3(){
	let s = readlineSync.question("Input: ");
	let folder = readlineSync.question("Input Address: ");

	const arr = fs.readdirSync(folder);

	s = "." + s;


	for(let i = 0; i < arr.length; i++) {
		const fileName = arr[i];
		if (fileName.endsWith(s))
		{
			console.log("File: " + fileName);
			file_read(fileName, 1);
			console.log(" ");
		}
	}
}

function work4(path = "./"){
	console.log("Start");
	getFile("./");
	console.log("End");
}

function getFile(path){
	let res = [];
	const arr = fs.readdirSync(path);

	for(let i = 0; i < arr.length; i++) {
		const fileName = arr[i];
		let filePath = path + "/" + fileName;

		let stat = fs.statSync(filePath)
		if (stat.isDirectory())
		{
			let new_res = getFile(filePath);
			for (let i = 0; i < new_res.length; i++)
				res.push(new_res[i]);
		}
		else if (fileName.endsWith(".txt")){
			const content = file_read(filePath);
			if (content.length <= 10)
				console.log(fileName);
		}

	}

	return res;
}

function work5(){
	let n = readlineSync.question("Input Number N: ");
	let content = "";
	for (let i = 0; i < n; i++){
		let str = readlineSync.question("Input String: ");
		if (fs.existsSync(str)){
			const contentString = fs.readFileSync(str, "utf8");
			content += contentString;
		}
	}
	console.log("Write to File: [\n" + content);
	console.log("]");
	file_write("res.txt", content);
}

function work6(){

	let obj = {"obj": ""};
	let res = rec(obj, obj);
	console.log(res);
}

function rec(sobj,obj){
	try{
		let max = 0;
		let ob = {"obj": ""};
		obj["obj"] = ob;
		JSON.stringify(sobj);
		max = rec(sobj,ob);
		return max + 1
	}
	catch(err){
		return 0;
	}
}

function work7(fileName = "in7.txt"){
	let content = file_read(fileName);
	let obj = JSON.parse(content);	
	let res = rec_with_branch(obj);
	console.log(res);
}

function rec_with_branch(obj){
	let max = 0;
	let str = "";
	for (let key in obj){
		if (typeof(obj[key]) == "object"){
			let level = rec_with_branch(obj[key]);
			if (max < level["max"]){
				max = level["max"];
				str = key + " / " +  level["branch"];
			}
		}
		else if (str == ""){
			str = key;
		}
	}
	return {"max": max + 1, "branch": str};
}

//work1();
//work2();
//work3();
//work4();
//work5();
//work6();
work7();

