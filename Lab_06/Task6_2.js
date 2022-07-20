"use strict";

// импортируем библиотеки
const express = require("express");
const cookieSession = require("cookie-session");
const fs = require("fs");
let util = require("util");

// запускаем сервер
const app = express();
const port = 5000;
app.listen(port);
console.log(`Server on port ${port}`);

// работа с сессией
app.use(cookieSession({
    name: 'session',
    keys: ['hhh', 'qqq', 'vvv'],
    maxAge: 24 * 60 * 60 * 1000 * 365
}));


// заголовки в ответ клиенту
app.use(function(req, res, next) {
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

function file_write(fileName, content){
	fs.writeFileSync(fileName, content);
}


function buildHtml(infor) {
	var header = '';
	var body = '';

	header += '<meta charset=\"UTF-8\">' + '<title> Task 6.2</title>';
	body += '<h1>Task 6.2</h1>';

	body += util.format('<form method=\"GET\" action=\"%s\">','/Logout');

	body += util.format('<p>Infor: Name is  %s age %s</p>', infor.name, infor.age);
    console.log(infor);


	body += '<input type=\"submit\" value="Logout">';
	body +=  '</form>';

	var res =  '<!DOCTYPE html>' + '<html><head>' + header + '</head><body>' + body + '</body></html>';
	
	file_write("62_1.html", res);
	return res;
};


// получить cookie
app.get("/infor", function(request, response) {
    // контролируем существование cookie
    let check = 1;
    if(!request.session.login) check = 0;
    if(!request.session.password) check = 0;

    if (check == 1){
        // отправляем ответ с содержимым cookie
        const login = request.session.login;
        const password = request.session.password;
        check = 0;
        const log = {id1: {login: "mylogin", password: "abc"}};
        const userInfor = {id1: {name: "I am ABC", age: 18}};

        for (let i in log){
            const inf = log[i];
            if (inf.login == login && inf.password == password){
                check = 1;
                const res = buildHtml(userInfor[i]);
                return response.end(res);
            }
        }
    }
    if (check == 0){
        const URL = "/login"
	    return response.redirect(URL);
    }
});


app.get("/login", function(request, response) {
    
    let check = 1;
    const login = request.query.login;
    const password = request.query.password;

    // контролируем существование параметров
    if(!request.session.login) check = 0;
    if(!request.session.password) check = 0;
    if (check == 1){
        const URL = "/infor";
        return response.redirect(URL);
    }

    const nameString = '62.html';
    if (fs.existsSync(nameString)) {
        const contentString = fs.readFileSync(nameString, "utf8");
        response.end(contentString);
    }
});

app.get("/api/save", function(request, response) {
    // получаем параметры запроса
    const login = request.query.login;
    const password = request.query.password;


    // контролируем существование параметров
    if(!login) return response.end("Login not set");
    if(!password) return response.end("Password not set");

    let check = 1;

    if (check == 1){
        // отправляем ответ с содержимым cookie
        const log = {id1: {login: "mylogin", password: "abc"}};
        const userInfor = {id1: {name: "I am ABC", password: 18}};
        check = 0;
        for (let i in log){
            const inf = log[i];
            if (inf.login == login && inf.password == password){
                check = 1;
            }
        }
    }
    console.log("check = " + check);

    if (check == 1){
        request.session.login = login;
        request.session.password = password;
        // отправляем ответ об успехе операции
        const URL = '/infor';
        return response.redirect(URL); 
    }
    else{
        return response.end(JSON.stringify({result:"Not Login"}));
    }

});


app.get("/Logout", function(request, response) {
    request.session = null;
    const URL = "/login"
	return response.redirect(URL);
});
    