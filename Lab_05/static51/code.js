"use strict";
   
function ajaxPost(urlString, bodyString, callback) {
    let r = new XMLHttpRequest();
    r.open("POST", urlString, true);
    r.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    r.send(bodyString);
    r.onload = function() {
        callback(r.response);
    }
}

function btnClicked() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    ajaxPost("/save/info", JSON.stringify({
        email: email, phone: phone, name: name
    }), function(answerString) {
            const answerObject = JSON.parse(answerString);
            const result = answerObject.result;
            alert(result);
    });
}
        
        
function ajaxGet(urlString, callback) {
    let r = new XMLHttpRequest();
    r.open("GET", urlString, true);
    r.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
    r.send(null);
    r.onload = function() {
        callback(r.response);
    };
};
        

function btn1Clicked() {
    const email = document.getElementById("email1").value;
    const url = `/checkInfor?email=${email}`;
    const label = document.getElementById("result-label1");

    ajaxGet(url, function(stringAnswer) {
        const objectAnswer = JSON.parse(stringAnswer);
        const result = objectAnswer.result;
        const inf = objectAnswer.infor;
        if (result == 0){
            label.innerHTML = `Ответ: ${inf}`;
        }
        else{
            label.innerHTML = `Ответ: Name: ${inf.name}, Phone: ${inf.phone}`;
        }

    });
}
