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

        const url = `/get_storage?name=${name}`;
        ajaxGet(url, function(stringAnswer) {
            const objectAnswer = JSON.parse(stringAnswer);
            const found = objectAnswer.answer;
            const cars = objectAnswer.cars;
            label.innerHTML = found ? `Склад ${name} с машинами ${cars} !` :
                                      `Склад ${name} не найден в базе!`;                       
            });    
    };
    back_btn.onclick = function(){
        location.replace("http://localhost:5004/Task71")
    };
};