"use strict";

// импорт библиотек
const express = require("express");
const request = require("request");
const fs = require("fs");

// запускаем сервер
const app = express();
const port = 5000;
app.listen(port);
console.log(`Server on port ${port}`);

// заголовки в ответ клиенту
app.use(function(req, res, next) {
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

// функция для отправки POST запроса на другой сервер
function sendPost(url, body, callback) {
    // задаём заголовки
    const headers = {};
    headers["Cache-Control"] = "no-cache, no-store, must-revalidate";
    headers["Connection"] = "close";
    // отправляем запрос
    request.post({
        url: url,
        body: body,
        headers: headers,
    }, function (error, response, body) {
        if(error) {
            callback(null);
        } else {
            callback(body);
        }
    });
}



app.get("/Task71", function(request, response) {
    const nameString = "./C/71C.html";
    if (fs.existsSync(nameString)) {
        const contentString = fs.readFileSync(nameString, "utf8");
        response.end(contentString);
    }
    response.end(JSON.stringify({result: "page not found"}));

});


// принимаем GET запрос и отправляем POST запрос на другой сервер
app.get("/Task71/1", function(request, response) {
    const carType = request.query.cartype;
    const carCost = request.query.carcost;
    const intCarCost = parseInt(carCost); 
    console.log(intCarCost);
    sendPost("http://localhost:5002/insert/record", JSON.stringify({
        carCost: intCarCost,
        carType: carType
    }), function(answerString) {
        const answerObject = JSON.parse(answerString);
        console.log(answerString);
        const answer = answerObject.answer;
        URL = "http://localhost:5000/Task71";
        response.redirect(URL);
    });

});

app.get("/Task71/3", function(request, response) {
    const name = request.query.warehouse;
    const obj = request.query;
    const carArray = [];
        for (let k in obj){
            console.log(k + "-"+obj[k]);
            if (k != "warehouse")
                carArray.push(obj[k])
        }
    sendPost("http://localhost:5003/select/record", JSON.stringify({
        name: name,
        carArray: carArray
    }), function(answerString) {
        const answerObject = JSON.parse(answerString);
        console.log(answerString);
        const answer = answerObject.answer;
        URL = "http://localhost:5000/Task71";
        response.redirect(URL);
        
    });

});

app.get("/Task71/2", function(request, response) {
    const carType = request.query.cartype;
    sendPost("http://localhost:5002/select/record", JSON.stringify({
        carType: carType
    }), function(answerString) {
        const answerObject = JSON.parse(answerString);
        console.log(answerString);
        const carCost = answerObject.carCost;
        if (carCost < 0)
            response.end("Car not Found");
        else
            response.end("Answer: " + carCost);
    });
});


function getCarInfor(carType){
    var carCost = -1;
    sendPost("http://localhost:5002/select/record", JSON.stringify({
        carType: carType
    }), function(answerString) {
        console.log(answerString);
        const answerObject = JSON.parse(answerString);
        carCost = answerObject.carCost;
    });
    return carCost;
}

app.get("/Task71/4", function(request, response) {
    const name = request.query.warehouse;
    sendPost("http://localhost:5003/select/record", JSON.stringify({
        name: name
    }), function(answerString) {
        const answerObject = JSON.parse(answerString);
        const carArray = answerObject.carArray;
        if (carArray.length == 0)
            response.end("Warehouse not Found");
        else
        {
            let resArr = [];
            for (let i = 0; i < carArray.length; i++){
                let car = carArray[i];
                let cost = getCarInfor(car);

                resArr.push({carType: car, carCost: cost});
            }
            response.end(JSON.stringify(resArr));
        }
            
    });
});