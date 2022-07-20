"use strict";

const fs = require("fs");

function file_read(filename, is_show = 0){
	const nameString = filename;
	const contentString = fs.readFileSync(nameString, "utf8");
	if (is_show)
		console.log(contentString);
	return contentString;
}

function file_write(fileName, content){
	fs.writeFileSync(fileName, content);
}

function create_file(fileName){
    let arr = ['11111111', '222222', '3333333', '444444', '555555'];
    let arr_json = JSON.stringify(arr);
    file_write(fileName, arr_json);
}



const express = require("express");

const app = express();
const port = 5015;
app.listen(port);
console.log("My server on port " + port);
console.log("http://localhost:5015/");

app.get("/me/page", function(request, response) {
    const nameString = request.query.p;
    if (fs.existsSync(nameString)) {
        const contentString = fs.readFileSync(nameString, "utf8");
        response.end(contentString);
    } else {
        const contentString = fs.readFileSync("bad.html", "utf8");
        response.end(contentString);
    }
});

function getString(fileName, index){

    create_file(fileName);
    let content = file_read(fileName);
    let arr = JSON.parse(content);
    if (index >= arr.length)
        return "Index out of Range";
    return arr[index];
}

app.get("/Task4/42", function(request, response) {
    const index = request.query.index;

    const iInt = parseInt(index);
    let res = getString("in42.txt", iInt); 
    const answerJSON = JSON.stringify({result: res});
    response.end(answerJSON);
});