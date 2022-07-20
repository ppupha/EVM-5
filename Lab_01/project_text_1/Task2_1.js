class Point{
	constructor(name, x, y){
		this.name = name;
		this.x = x;
		this.y = y;
	}

	show(is_print = 1){
		let msg = this.name + "(" + this.x + " , " + this.y + ")";
		if (is_print)
			console.log(msg);
		return msg;
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


class Segment{
	constructor(start, end){
		this.start = start;
		this.end = end
	}

	show(is_print = 1){
		let msg = "[ " + this.start.show(0) + " ; " + this.end.show(0) 
																+ " ]";
		if (is_print)
			console.log(msg);
		return msg;
	}

	len(){
		let p1 = this.start;
		let p2 = this.end;
		return Math.sqrt(Math.pow(p1.x - p2.x, 2) + 
											Math.pow(p1.y - p2.y, 2));
	}
}


class Triagle{
	constructor(p1, p2, p3){
		this.pA = p1;
		this.pB = p2;
		this.pC = p3;
		let AB = new Segment(this.pA, this.pB);
		let BC = new Segment(this.pB, this.pC);
		let AC = new Segment(this.pA, this.pC);
		this.a = BC.len();
		this.b = AC.len();
		this.c = AB.len();
	}

	check(){
		return (this.a + this.b > this.c && this.a + this.c > this.b && this.b + this.c > this.a);
	}

	perimeter(){
		return this.a + this.b + this.c;
	}

	area(){
		let p = (this.a + this.b + this.c) / 2
		return Math.sqrt(p * (p - this.a) * (p - this.b) * (p - this.c));
	}

	isRight(){
		if (Math.pow(this.a, 2) + Math.pow(this.b, 2) === Math.pow(this.c, 2))
			return 3;
		if (Math.pow(this.b, 2) + Math.pow(this.c, 2) === Math.pow(this.a, 2))
			return 1
		if (Math.pow(this.a, 2) + Math.pow(this.c, 2) === Math.pow(this.b, 2))
			return 2;
		return 0;
	}
}

let p1 = new Point("A", 0, 0);
let p2 = new Point("B", 3, 4);
let p3 = new Point("C", 3, 0);

let t1 = new Triagle(p1, p2, p3);
console.log("Area: " + t1.area());
console.log("Check Right Triagle: ");
if (t1.isRight()) console.log("True")
else console.log("False");


