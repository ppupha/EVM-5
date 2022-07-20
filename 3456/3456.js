
let util = require("util");
const fs = require("fs");

// импортируем библиотеки
const express = require("express");
const cookieSession = require("cookie-session");
const app = express();
const port = 5015;
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

function buildHtml(infor) {
	var header = '';
	var body = '';

	header += '<meta charset=\"UTF-8\">' + '<title> Task</title>';
	body += '<h1>Task Answer</h1>';
    body += "<p>";
    arr = infor.result;
    for (let i in arr)
	    body += util.format('<div>%s  </div>', arr[i]);

    body += "</p>";
	var res =  '<!DOCTYPE html>' + '<html><head>' + header + '</head><body>' + body + '</body></html>';
	
	return res;
};

app.get("/3451", function(request, response) {
    const nameString = "1.html";
    if (fs.existsSync(nameString)) {
        const contentString = fs.readFileSync(nameString, "utf8");
        response.end(contentString);
    }
});

app.get("/3452", function(request, response) {
    const nameString = "2.html";
    if (fs.existsSync(nameString)) {
        const contentString = fs.readFileSync(nameString, "utf8");
        response.end(contentString);
    }
});

// сохранить cookie
app.get("/Task/1", function(request, response) {
    // получаем параметры запроса
    console.log(request.query);
    const fileName = request.query.fileName;

    // контролируем существование параметров
    if(!fileName) return response.end("fileName not set");
    // выставляем cookie
    request.session.fileName = fileName;
    // отправляем ответ об успехе операции
    const URL = "/3452"
    response.redirect(URL);
});

function file_read(filename, is_show = 0){
	const nameString = filename;
	const contentString = fs.readFileSync(nameString, "utf8");
	if (is_show)
		console.log(contentString);
	return contentString;
}



app.get("/Task/2", function(request, response) {
    console.log(request.query);
    // получаем параметры запроса
    const asc = request.query.asc;

    if(!request.session.fileName) return response.end("File Not exists");
    // отправляем ответ с содержимым cookie
    const fileName = request.session.fileName;
    // контролируем существование параметров
    
    if (!fs.existsSync(fileName)) return  response.end(JSON.stringify({result: "File Not Found"}));


    const fileContain = file_read(fileName);

    var arr = fileContain.split(" ");
    arr.map(function(item) {
                return parseInt(item)})

    if (asc === "True"){
        arr.sort(function(a, b){return a-b});
    }
    else{
        arr.sort(function(a, b){return b-a});
    }


    response.end(buildHtml({result: arr}));

});

