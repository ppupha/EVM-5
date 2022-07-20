"use strict";

// импортируем необходимые библиотеки
const express = require("express");
const fs = require("fs");

// запускаем сервер
const app = express();
const port = 5000;
app.listen(port);
console.log(`Server on port ${port}`);

// отправка статических файлов
const way = __dirname + "/static51";

app.use(express.static(way));

// заголовки в ответ клиенту
app.use(function(req, res, next) {
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

// body
function loadBody(request, callback) {
    let body = [];
    request.on('data', (chunk) => {
        body.push(chunk);
    }).on('end', () => {
        body = Buffer.concat(body).toString();
        callback(body);
    });
}

function file_read(filename, is_show = 0){
	const nameString = filename;
    if (fs.existsSync(nameString)){
	    const contentString = fs.readFileSync(nameString, "utf8");
        return contentString;
    }
    else{
        const contentString = JSON.stringify({ "id1": {name : "ABC", phone: "000", email: "abc@gmail"},});
        file_write(nameString, contentString);
        return contentString;
    }
}

function file_write(fileName, content){
	fs.writeFileSync(fileName, content);
}

function getObjLen(a){
    var count = 0;
    var i;

    for (i in a) {
        if (a.hasOwnProperty(i)) {
            count++;
        }
    }
    return count;
}

// it is post
app.post("/save/info", function(request, response) {
    loadBody(request, function(body) {
    console.log("check");
        const obj = JSON.parse(body);
        const email = obj["email"];
        const name = obj["name"];
        const phone = obj["phone"];
        const fileContain = file_read("51.txt");
        var contain = JSON.parse(fileContain);

        let check = 1;
        for (let k in contain){
            const inf = contain[k];
            if (inf.email === email || inf.phone === phone){
                check = 0;
            }
        }

        if (check){
            var len = getObjLen(contain) + 1;
            contain["id" + len] = {email: email, phone: phone,  name: name};
            file_write("51.txt", JSON.stringify(contain));
            response.end(JSON.stringify({ result: "Save content OK" }));
        }
        else{
            response.end(JSON.stringify({ result: "Save content: Infor was used" }));
        }
    });
});


app.get("/checkInfor", function(request, response) {
    console.log("123");
    const email = request.query.email;
    const fileContain = file_read("51.txt");
    var contain = JSON.parse(fileContain);
        
    for (let k in contain){
        const inf = contain[k];
        if (inf.email === email){
            response.end(JSON.stringify({result: 1, infor: inf}));
        }
    }
    response.end(JSON.stringify({ result: 0, infor: "Not Found"}));
});