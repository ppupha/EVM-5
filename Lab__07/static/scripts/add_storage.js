"use strict";

window.onload = function() {
    const name_input = document.getElementById("name_input");
    const cars_input = document.getElementById("cars_input");

    const btn = document.getElementById("add_btn");
    const label = document.getElementById("result_label");
    const btn_back = document.getElementById("back_btn");

    function ajaxGet(urlString, callback) {
        let request = new XMLHttpRequest();
        request.open("POST", urlString, true);
        request.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
        request.send(null);
        request.onload = function() {
            callback(request.response);
        };
    };

    btn.onclick = function() {
        const name = name_input.value;
        const cars = cars_input.value.split(',');

        const url = `/add_storage?name=${name}&cars=${cars}`;
        ajaxGet(url, function(stringAnswer) {
            const objectAnswer = JSON.parse(stringAnswer);
            const added = objectAnswer.answer;
            label.innerHTML = added ? `Склад ${name} добавлена!` :
                                      `Склад ${name} уже существует!`;                       
            });    
    };
    back_btn.onclick = function(){
        location.replace("http://localhost:5004/Task71")
    };
};