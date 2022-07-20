
"use strict";

// импорт библиотеки
const express = require("express");
const fs = require("fs");

// запускаем сервер
const app = express();
const port = 5003;
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
        const contentString = JSON.stringify([ { name: "K1", carArray: ["Car1", "Car2"] } ]);
        file_write(filename, contentString);
        return contentString;
    }
}

app.post("/insert/record", function(request, response) {
    loadBody(request, function(body) {
        const obj = JSON.parse(body);
        const name = obj.warehouse;
        const carArray = obj.carArray;
        
        const fileName = "inpB.txt";
        const inpString = file_read(fileName);
        let warehousrArr = JSON.parse(inpString);

        warehousrArr.push({name: name, carArray: carArray});
        const outJSON = JSON.stringify(warehousrArr);
        file_write(fileName, outJSON);

        const resJSON = JSON.stringify({answer: "successfully"});
        console.log(resJSON);
        response.end(resJSON);
    });
});

app.post("/select/record", function(request, response) {
    loadBody(request, function(body) {
        const fileName = "inpB.txt";
        const inpString = file_read(fileName);
        let arr = JSON.parse(inpString);

        const obj = JSON.parse(body);
        const name = obj.name;

        var tmp = -1;
        var carArray = [];
        for (let i = 0; i < arr.length; i++){
            if (name == arr[i].name){
                carArray = arr[i].carArray;
                tmp = i;
            }
        }

        const outJSON = JSON.stringify({carArray: carArray});
        response.end(outJSON);
    });
});