"use strict";

class Child{
	constructor(name, age){
		this.name = name;
		this.age = age;
	}

	nameSetter(new_name){
		this.name = new_name;
	}

	ageSetter(new_age){
		this.age = new_age;
	}

	show(){
		console.log(this.name + " " + this.age);
	}
}

function create(name, age){
	return new Child(name, age);
}

function childrenRead(charr){
	for (let i = 0; i < charr.length; i++)
		charr[i].show();
}


function update(ch, new_name, new_age){
	ch.nameSetter(new_name);
	ch.ageSetter(new_age);
}

function childrenDel(charr, index){
	charr.splice(index, 1);
}

function childrenAgeAver(charr){
	let sum = 0;
	for (let i = 0; i < charr.length; i++)
		sum += charr[i].age;
	if (sum === 0)
		return sum;
	return sum / charr.length;
}

function childMaxAge(charr){

	let c = charr[0];
	for (let i = 1; i < charr.length; i ++)
		if (c.age < charr[i].age)
			c = charr[i];

	c.show();
	return c;
}

function childAgeFilter(charr, start_age, end_age){
	for (let i = 0; i < charr.length; i++)
		if (start_age <= charr[i].age &&  charr[i].age<= end_age)
		{
			charr[i].show();
		}
}

function childNameFilter(charr, c){
	for (let i = 0; i < charr.length; i++)
		if (charr[i].name.charAt(0) == c)
			charr[i].show();
}

function childNameLenFilter(charr, len){
	for (let i = 0; i < charr.length; i++)
		if (charr[i].name.length === len)
			charr[i].show();
}

function isVowel(c){
	let vArr = ['A', 'O', 'E', 'U', 'I'];
	for (let i = 0; i < vArr.length; i++){
		if (c == vArr[i]) return 1;
	}
	return 0;
}

function childNameFilter2(charr){
	for (let i = 0; i < charr.length; i++){
		let c = charr[i].name.charAt(0);
		if (isVowel(c)){
			charr[i].show();
		}
	}
}


let c1 = create("AB", 10);
let c2 = create("BCD", 15);
let c3 = create("CEF", 20);
let c4 = create("FDCD", 25);

let count = 0;
let Charr = [c1, c2, c3, c4];
count++;
console.log(count);
childrenRead(Charr);
console.log("");

count++;
console.log(count + "Delete Third:");
childrenDel(Charr, 2);
childrenRead(Charr);
console.log("");

count++;
console.log(count);
console.log("Aver = " + childrenAgeAver(Charr));
console.log("");

count++;
console.log(count + ". Max Age: ");
childMaxAge(Charr);
console.log("");

count++;
console.log(count + ". Age from 10 to 20: ");
childAgeFilter(Charr, 10, 20);
console.log("");

count++;
console.log(count + ". Name start with A: ");
childNameFilter(Charr, 'A');
console.log("");

count++;
console.log(count + ". Name with len = 3: ");
childNameLenFilter(Charr, 3);
console.log("");

count++;
console.log(count + ". Name start with Vowel: ");
childNameFilter2(Charr);
console.log("");





