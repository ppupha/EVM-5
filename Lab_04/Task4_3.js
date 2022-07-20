

let util = require("util");
const fs = require("fs");

let link = "https://www.youtube.com/watch";

function file_read(filename, is_show = 0){
	const nameString = filename;
	const contentString = fs.readFileSync(nameString, "utf8");
	if (is_show)
		console.log(contentString);
	return contentString;
}

function file_write(fileName, content){
	fs.writeFileSync(fileName, content);
}


function buildHtml(fields, adr) {
	var header = '';
	var body = '';

	header += '<meta charset=\"UTF-8\">' + '<title> Task 4.3</title>';

	body += '<h1>Task 4.3</h1>';
	body += util.format('<form method=\"GET\" action=\"%s\">','/Direc');

	for (let f in fields){
		body += util.format('<p>Input %s</p> <input name=\"%s\" spellcheck=\"false\" autocomplete=\"off\">', fields[f], fields[f]);
	}

	body += '<input type=\"submit\" value="Отправить запрос">';
	body +=  '</form>';

	res =  '<!DOCTYPE html>' + '<html><head>' + header + '</head><body>' + body + '</body></html>';
	
	file_write("43.html", res);
	return res;
};

const express = require("express");

const app = express();
const port = 5015;
app.listen(port);

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


app.get("/Task4/43", function(request, response) {
    
	let par = request.query;
	let fields = [];
	let link = par.link;
	for (k in par){
		if (k != "link")
			fields.push(par[k])
	}
	
	let res = buildHtml(fields, link);
	const answerJSON = res;
    response.end(answerJSON);
});

app.get("/Direc", function(request, response){
	let URL = link + '?';
	let par = request.query;
	for (key in par){
		URL += util.format('%s=%s&', key, par[key]);
	}	
	console.log(URL);
	return response.redirect(URL);
});