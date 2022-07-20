"use strict";

for (let i = 1; i <= 10; i++){
    setTimeout(() =>{
    console.log(i);
	}, i * 2000);
        }

    for (let i = 1; i <= 10; i++){
	    setTimeout(() =>{
		console.log(i+ 10);
	    }, 20 * 1000 + i * 1000);
    }

    
    let count = 0;
    let interval = setInterval(() => {
        count += 1;

        for (let i = 1; i <= 10; i++){
	        setTimeout(() =>{
		    console.log(i);
	        }, i * 2000);
        }

        for (let i = 1; i <= 10; i++){
	        setTimeout(() =>{
		    console.log(i + 10);
	        }, 20 * 1000 + i * 1000);
        }
    }, 30 * 1000);
