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

app.get("/calculate/cmp", function(request, response) {
    const a = request.query.a;
    const b = request.query.b;
    const c = request.query.c;
    const aNum = Number(a);
    const bNum = Number(b);
    const cNum = Number(c);
    let maxNum;
    if (aNum >= bNum && aNum >= cNum){
        maxNum = aNum;
    } else if (bNum >= cNum){
        maxNum = bNum;
    } else {
        maxNum = cNum;
    }
    const answerJSON = JSON.stringify({result: maxNum});
    response.end(answerJSON);
});

app.get("/calculate/getContentCell", function(request, response){
    const id = request.query.id;
    const idInt = parseInt(id);

    const contentString = fs.readFileSync("ex2.txt", "utf8");
    const obj = JSON.parse(contentString);
    const answerJSON = JSON.stringify({result: obj[idInt]});
    response.end(answerJSON);
});

app.get("/calculate/range", function (request, response){
    const a = request.query.a;
    const b = request.query.b;
    const c = request.query.c;
    const aInt = parseInt(a);
    const bInt = parseInt(b);
    const cInt = parseInt(c);
    let arr = [];
    for (let num = aInt; num <= bInt; num++){
        if (num % cInt === 0){
            arr.push(num);
        }
    }

    const answerJSON = JSON.stringify({result: arr});
    response.end(answerJSON);
})
