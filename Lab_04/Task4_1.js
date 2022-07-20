"use strict";

const fs = require("fs");

const express = require("express");

const app = express();
const port = 5015;
app.listen(port);
console.log("My server on port " + port);
console.log("http://localhost:5015/Task4/41?a=10&b=20&c=30");

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

app.get("/Task4/41", function(request, response) {
    const a = request.query.a;
    const b = request.query.b;
    const c = request.query.c;

    const aInt = parseInt(a);
    const bInt = parseInt(b);
    const cInt = parseInt(c);

    const sInt = Math.max(aInt, bInt, cInt);
    const answerJSON = JSON.stringify({result: sInt});
    response.end(answerJSON);
});