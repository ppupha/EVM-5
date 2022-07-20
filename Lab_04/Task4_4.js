
"use strict";

const fs = require("fs");
const express = require("express");
const app = express();
const port = 5015;
app.listen(port);
console.log("My server on port " + port);

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

function work4_4(a, b, c){
		let start = parseInt(a / c);
		if (start * c < a){
			start++;
		}
		let end = parseInt(b / c);
		let res = [];
		for (let i = start; i <= end; i++)
			res.push(i * c);

		return res;
}

app.get("/Task4/44", function(request, response) {
    const a = request.query.a;
    const b = request.query.b;
    const c = request.query.c;

    const aInt = parseInt(a);
    const bInt = parseInt(b);
    const cInt = parseInt(c);

    
    let res = work4_4(a, b, c);
    const answerJSON = JSON.stringify({result: res});
    response.end(answerJSON);
});