"use strict";

window.onload = function() {
    const name_input = document.getElementById("name_input");

    const btn = document.getElementById("add_btn");
    const label = document.getElementById("result_label");
    const btn_back = document.getElementById("back_btn");

    function ajaxGet(urlString, callback) {
        let request = new XMLHttpRequest();
        request.open("GET", urlString, true);
        request.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
        request.send(null);
        request.onload = function() {
            callback(request.response);
        };
    };

    btn.onclick = function() {
        const name = name_input.value;

        const url = `/get_car?name=${name}`;
        ajaxGet(url, function(stringAnswer) {
            const objectAnswer = JSON.parse(stringAnswer);
            const found = objectAnswer.answer;
            const price = objectAnswer.price;
            label.innerHTML = found ? `Машина ${name} с ценой ${price}!` :
                                      `Машина ${name} не найдена!`;                       
            });    
    };
    back_btn.onclick = function(){
        location.replace("http://localhost:5004/Task71")
    };
};