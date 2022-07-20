class Point{
	constructor(name, x, y){
		this.name = name;
		this.x = x;
		this.y = y;
	}

	show(){
		console.log(this.name + "(" + this.x + " , " + this.y + ")");
	}

	xSetter(new_x){
		this.x = new_x;
	}

	ySetter(new_y){
		this.y = new_y;
	}

	nameSetter(new_name){
		this.name = new_name;
	}
}

function create(name, x, y){
	return new Point(name, x, y);
}

function update(p, new_name, new_x, new_y){
	stu.nameSetter(new_name);
	stu.xSetter(new_x);
	stu.ySetter(new_y);
}

function pointRead(parr){
	for (let i = 0; i < parr.length; i++){
		parr[i].show();
	}
}

function pointDel(parr, index){
	parr.splice(index, 1);
}


function distance(p1, p2){
	return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
}

function longestDis(parr){
	let maxx = 0.0;
	let res1;
	let res2; 
	for (let i = 0; i < parr.length; i++){
		for (let j = i + 1; j < parr.length; j++){
			if (distance(parr[i], parr[j]) > maxx){
				res1 = parr[i];
				res2 = parr[j];
				maxx = distance(parr[i], parr[j])
			}
		}
	}
	
	res1.show();
	res2.show();

}

function pointFilter(parr, p, dis){
	let res = [];
	for (let i = 0; i < parr.length; i++){
		if (distance(p, parr[i]) < dis){
			res.push(parr[i]);
		}
	}
	pointRead(res);
	return res;
}

function checkInRec(p, p1, p2){
	return (p1.x - p.x) * (p.x - p2.x) >= 0 && (p1.y - p.y) * (p.y - p2.y
																) >= 0;
}

function pointFilter2(parr, p1, p2){
	let res = [];
	for (let i = 0; i < parr.length; i++){
		if (checkInRec(parr[i], p1, p2)){
			res.push(parr[i]);
		}
	}

	pointRead(res);
	return res;
}

function f(p, a, b, c){
	return a * p.x + b * p.y + c;
}

function pointPos(parr){
	let top = 0, bot = 1, right = 2, left = 3, Ox = 0, Oy = 1;
	let pos = [];
	for (let i = 0; i < parr.length; i++){
		let p = parr[i];
		if (p.x > 0){
			if (p.y > 0) pos.push(1);
			else pos.push(4);
		}
		else{
			if (p.y > 0) pos.push(2);
			else pos.push(3)
		}
	}
	console.log("Higher than OX: ")
	for (let i = 0; i < parr.length; i++)
		if (pos[i] === 1 || pos[i] === 2)
			parr[i].show();

	console.log("Lower than OX: ")
	for (let i = 0; i < parr.length; i++)
		if (pos[i] === 3 || pos[i] === 4)
			parr[i].show();
}




let p1 = new Point("A", 0, 0);
let p2 = new Point("B", 1, 1);
let p3 = new Point("C", 5, 4);
let p4 = new Point("D", -5, -4);

let rec1 = new Point("I", -3, -3);
let rec2 = new Point("J", 3, 3);


let parr = [p1, p2, p3, p4];

let count = 0;

count++;
console.log(count + ". All Point: ");
pointRead(parr);

count++;
console.log(count + ". Longest distance: ");
longestDis(parr);

count++;
console.log(count + "distance < 2 from A: ");
pointFilter(parr, p1, 2);

count++;
console.log(count);
pointPos(parr);

count++;
console.log(count + ". Point in rec (-3, -3) (3, 3):");
pointFilter2(parr, rec1, rec2);