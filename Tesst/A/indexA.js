
"use strict";

// импорт библиотеки
const express = require("express");
const fs = require("fs");

// запускаем сервер
const app = express();
const port = 5002;
app.listen(port);
console.log("Server on port " + port);

// заголовки для ответа
app.use(function(req, res, next) {
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

// загрузка тела
function loadBody(request, callback) {
    let body = [];
    request.on('data', (chunk) => {
        body.push(chunk);
    }).on('end', () => {
        body = Buffer.concat(body).toString();
        callback(body);
    });
}

function file_write(fileName, content){
	fs.writeFileSync(fileName, content);
}

function file_read(filename, is_show = 0){
	const nameString = filename;
    if (fs.existsSync(nameString)){
	    const contentString = fs.readFileSync(nameString, "utf8");
        return contentString;
    }
    else{
        const contentString = JSON.stringify([ { name: "car1", cost: 10000} ]);
        file_write(filename, contentString);
        return contentString;
    }
}

// приём запроса
app.post("/query/calculate", function(request, response) {
    loadBody(request, function(body) {
        const obj = JSON.parse(body);
        const x = obj.x;
        const y = obj.y;
        const s = parseInt(x) + parseInt(y);
        response.end(JSON.stringify({
            answer: s
        }));
    });
});

app.post("/insert/record", function(request, response) {
    loadBody(request, function(body) {
        
        const obj = JSON.parse(body);
        const name = obj.carType;
        const cost = obj.carCost;

        console.log("test");
        const fileName = "inpA.txt";
        const inpString = file_read(fileName);
        let arr = JSON.parse(inpString);

        arr.push({ name: name, cost: cost});
        const outJSON = JSON.stringify(arr);
        console.log(outJSON);
        file_write(fileName, outJSON);
        
        const resJSON = JSON.stringify({answer: "successfully"});
        console.log(resJSON);
        response.end(resJSON);
    });
});

app.post("/select/record", function(request, response) {
    loadBody(request, function(body) {
        const fileName = "inpA.txt";
        const inpString = file_read(fileName);
        let arr = JSON.parse(inpString);

        const obj = JSON.parse(body);
        const name = obj.carType;
        var cost = 0;
        var tmp = -1;
        for (let i = 0; i < arr.length; i++){
            console.log(name + " - "  + (name in arr[i]));
            console.log(arr[i]);
            if (name == arr[i].name){
                cost = arr[i].cost;
                tmp = i;
            }
        }

        const outJSON = JSON.stringify({carCost: cost});
        response.end(outJSON);
    });
});