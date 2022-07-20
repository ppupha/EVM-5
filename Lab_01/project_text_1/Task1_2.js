"use strict";

class Student{
	constructor(group = "", ID = -1, mark = -1){
		this.group = group;
		this.ID = ID;
		this.mark = mark;
	}

	show(){
		console.log(this.group + " " + this.ID + " " + this.mark);
	}

	groupSetter(new_group){
		this.group = new_group;
	}

	idSetter(new_ID){
		this.ID = new_ID;
	}

	markSetter(new_mark){
		this.mark = new_mark;
	}

}

function create(group, ID, mark){
	return new Student(group, ID, mark);
}

function update(stu, new_group, new_ID, new_mark){
	stu.groupSetter(new_group);
	stu.idSetter(new_ID);
	stu.markSetter(new_mark);
}

function studentRead(stuarr){
	for (let i = 0; i < stuarr.length; i++){
		stuarr[i].show();
	}
}

function studentDel(stuarr, index){
	stuarr.splice(index, 1);
}

function studentMarkAver(stuarr){
	let sum = 0;
	for (let i = 0; i < stuarr.length; i++)
		sum += stuarr[i].age;
	if (sum === 0)
		return sum;
	return sum / stuarr.length;
}

function studentGroupFilter(stuarr, group){
	let s = [];
	for(let i = 0; i < stuarr.length; i++){
		if (stuarr[i].group === group)
			s.push(stuarr[i]);
	}
	studentRead(s);
	return s;
}

function studentMaxMark(stuarr, group){
	//let s = studentGroupFilter(stuarr, group);
	let ma = stuarr[0];
	let fl = 0;
	for (let i = 0; i < stuarr.length; i++){
		if (stuarr[i].group === group){
			if (fl === 0){
				ma = stuarr[i];
				fl = 1;
			}
			else if (stuarr[i].mark > ma.mark){
				ma = stuarr[i];
			}
		}
	}

	ma.show();
	return ma;
}

function studentNoMark(stuarr){
	let s = [];
	for (let i = 0; i < stuarr.length; i++){
		if (stuarr[i].mark === 0)
			s.push(stuarr[i]);
	}
	studentRead(s);
	return s;
}


let s1 = new Student("A", 1, 5);
let s2 = new Student("B", 2, 4);
let s3 = new Student("C", 3, 3);
let s5 = new Student("C", 5, 4);
let s4 = new Student("A", 4, 0);
let stuarr = [s1, s2, s3, s4, s5];

let count = 0;

count++;
console.log(count + ". All Student: ");
studentRead(stuarr);

count++;
console.log(count + ". Delete 3th student: ");
studentDel(stuarr, 2);
studentRead(stuarr);


count++;
console.log(count + ". Update 2nd student: ");
update(stuarr[1], "E", 4, 3);
studentRead(stuarr);

count++;
console.log(count + ". Studẻnts from group A: ");
studentGroupFilter(stuarr, "A");

count++;
console.log(count + ". Student with max MArk from group A: ");
studentMaxMark(stuarr, "A");

count++;
console.log(count + ". Student without mark: ");
studentNoMark(stuarr);