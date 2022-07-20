"use strict";

// импорт библиотеки
const express = require("express");
const fs = require("fs");

// запускаем сервер
const app = express();
const port = 5000;
app.listen(port);
console.log(`Server on port ${port}`);

// активируем шаблонизатор
app.set("view engine", "hbs");

// заголовки в ответ клиенту
app.use(function(req, res, next) {
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Origin", "*");
    next();
});


   

app.get("/Task6", function(request, response) {
    const nameString = "61.html";
    if (fs.existsSync(nameString)) {
        const contentString = fs.readFileSync(nameString, "utf8");
        response.end(contentString);
    }
});

// выдача страницы с массивом учеников
app.get("/page/game", function(request, response) {
    const age = request.query.age;
    const ageInt = parseInt(age);
    console.log(ageInt);
    const gamearr = [{name: "game1", desc: "This is a game", age: 15}, {name: "game2", desc: "This is a game 2", age: 20}];

    const infoObject = {
        descriptionValue: "Game under ${age} age",
        gameArray: []
    };

    for (let i in gamearr){
        if (gamearr[i].age < ageInt){
            infoObject.gameArray.push(gamearr[i]);
        }
    }

    console.log(infoObject);
    response.render("61.hbs", infoObject);
});