/*Напиши функцию создания генератора sequence(start, step). Она при вызове возвращает другую функцию-генератор, 
которая при каждом вызове дает число на 1 больше, и так до бесконечности. Начальное число, с которого начинать 
отсчет, и шаг, задается при создании генератора. Шаг можно не указывать, тогда он будет равен одному. 
Начальное значение по умолчанию равно 0. Генераторов можно создать сколько угодно.*/

function sequence(start, step) {
	start = start || 0;
	step = step || 1;
	start -= step; 
	
	return function() {
		return start += step;
	}
}

/*Также, нужна функция take(gen, x) которая вызвает функцию gen заданное число (x) раз и 
возвращает массив с результатами вызовов. Она нам пригодится для отладки:*/

function take(gen, x) {
	var arr = [];
	for (i = 0; i < x; i++) {
	arr.push( gen() );
	}
	return arr;
}

var gen2 = sequence(0, 2);
console.log(take(gen2, 5)); // [0, 2, 4, 6, 8 ]

/*Напиши функцию map(fn, array), которая принимает на вход функцию и массив, 
и обрабатывает каждый элемент массива этой функцией, возвращая новый массив.
Обрати внимание: функция не должна изменять переданный ей массив:*/

function  map(fn, array) {
	var newArray = [];
	for (var i = 0; i < array.length ; i++) {
		newArray.push(fn(array[i]));
	};
	return newArray;
}

/*Напиши функцию fmap(a, gen), которая принимает на вход 2 функции, a и gen, 
где gen — функция-генератор вроде той, что была в первом задании. fmap возвращает 
новую функцию-генератор, которая при каждом вызове берет следующее значение из gen 
и пропускает его через функцию a*/

function fmap(a, fn) {
	return function() {
		return a(fn.apply(null, arguments)); // javascript.ru/Function/apply
	}
}

/* Частичное применение (partial application) Напиши функцию partial(fn, a1, a2, ....), 
которая позволяет зафиксировать один или несколько аргументов функции*/

function partial(fn) {	
	//https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Array/slice
	var args = Array.prototype.slice.call(arguments);
	var args = args.slice(1);

	return function() {
		var args1 = Array.prototype.slice.call(arguments);
 		//https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Array/concat
 		var newArgs = args.concat(args1);
 		var x = fn.apply(null, newArgs);
		return x;
	}
}

function add(a, b) { return a + b; }
function mult(a, b, c, d) { return a * b * c * d; }

var add5 = partial(add, 5); // Мы получили функцию с 1 аргументом, которая прибавляет к любому числу 5

console.log(add5(2)); // 7
console.log(add5(10)); // 15
console.log(add5(8)); // 13

var mult23 = partial(mult, 2, 3); // мы зафиксировали первые 2 аргумента mult() как 2 и 3

console.log(mult23(4, 5)); // 2*3*4*5 = 120
console.log(mult23(1, 1)); // 2*3*1*1 = 6

/*Наша функция partial позволяет фиксировать только первые аргументы. Усовершенствуй ее, 
чтобы зафиксировать можно было любые аргументы, пропущенные аргументы обозначаются с помощью undefined. 
Обрати внимание, что теперь мы переименовали ее в partialAny, чтобы не путать с предыдущей:*/

function partialAny(fn) {	
    	//js6 = Js5 + for(i = 0; i < newArgs.length; i++){...}
        var args = Array.prototype.slice.call(arguments, 1);
     
    	return function() {
    		var argsArray = Array.prototype.slice.call(arguments);
     		var newArgs = args.concat(argsArray);
     		var j = 0;
     		for (var i = 0; i < newArgs.length; i++) {
     			if (newArgs[i] === undefined) {
     				newArgs[i] = arguments[j];
     				j++;
     			};
     		};
     		var x = fn.apply(null, newArgs);
    		return x;
    	}
    }


function test(a, b, c) { return 'a=' + a + ',b=' + b + ',c=' + c; }
var test1_3 = partialAny(test, 1, undefined, 3);
console.log(test1_3(5)); // a=1,b=5,c=3

/*напиши функцию bind, которая позволяет привязать контекст (значение this) к функции:*/
function bind(funct, newThis) {
    return function () {
        var args = [];
        for (var i = 0; i < arguments.length; i++) {
            args.push(arguments[i]); //через .push
        }
	    return funct.apply(newThis, args);
    }
}

window.x = 1;
var ctx = { x: 2 };

function testThis(a) { console.log("x=" + this.x + ", a=" + a); }
console.log(testThis(100)); // x=1, a=100
var boundFunction = bind(testThis, ctx);
console.log(boundFunction(100)); // x=2, a= 100

/*напиши функцию pluck, которая берет массив объектов и возвращает массив значений определенного поля:*/

function pluck(array, property) {
    var keys = [];
    for(var i=0; i < array.length; i++){
        keys.push(array[i][property]);
    }
    return keys;
}

var characters = [
  { 'name': 'barney', 'age': 36 },
  { 'name': 'fred', 'age': 40 }
];

console.log(pluck(characters, 'name')); // ['barney', 'fred']

/*напиши функцию filter, которая принимает функцию-предикат и массив. Возвращает она массив значений, 
для которых предикат вернет true.*/


function filter (arr, fn) {
	var newArr = [];

	for (var i = 0; i < arr.length; i++) {
		if (fn(arr[i])) {
			newArr.push(arr[i]);
		} 
	};
	return newArr;
}

var input = [1, 2, 3, 4, 5, 6];
function isEven(x) { return x % 2 == 0; } // проверяет на четность
console.log(filter(input, isEven)); // [2, 4, 6]

/*Напиши функцию, считающую число свойств в объекте:*/

function count(obj) {
        return Object.keys(obj).length;
}

/* напиши функцию, определяющую тип переменной. Результат должен быть одной из строк: 
'undefined', 'boolean' (для true/false), 'null', 'number', 'string', 'function', 'array', 'array-like', 
'object'*/

function defineType(data){
	var str = Object.prototype.toString.call(data);
	var cutStr = str.substring(8, str.length - 1);
	return cutStr;
}

/*Напиши функцию неглубокого копирования объектов и массивов.
Функция неглубокого копирования должна создавать новый массив/объект, 
и копировать в него элементы из старого. При этом сами элементы копируются по ссылке:*/

function shallowCopy(obj){
  var ObjectCopy = [];
  
  if(obj instanceof Date){
    return new Date(obj);
  }
  
  for(var key in obj) {
    ObjectCopy[key] = obj[key];
  }
  return ObjectCopy;
}


var a = { x: 1, y: 2, z: [1, 2, 3] };
var b = shallowCopy(a); // b — это отдельный объект
b.x = 10;
console.log(a.x); // 1

// Но a.z и b.z указывают на один и тот же массив: 
b.z.push(4);
console.log(a.z); // [1, 2, 3, 4]

var с = new Date(2014, 1, 1);
var d = shallowCopy(c);
d.setFullYear(2015);
console.log(c.getFullYear()); // 2014

/*Напиши функцию глубокого копирования объектов и массивов. Она должна делать не только копию переданного объекта/массива,
но и копии вложенных них объектов/массивов. Также, копироваться должны объекты Date*/

function deepCopy(obj){
 var ObjectCopy = [];
 
 if (obj instanceof Date) {
  return new Date(obj);
 }

 if (obj===null) {
 return null;
 }
 
 for (var key in obj) {
  if(typeof obj[key] == "object") {
   ObjectCopy[key] = deepCopy(obj[key]);
  }
  else {
  ObjectCopy[key] = obj[key];
  }
 }
return ObjectCopy;
}


var a = { x: 1, y: 2, z: [1, 2, 3], w: new Date(2014, 1, 1, 12, 0, 0) };
var b = deepCopy(a); // b — это отдельный объект
b.x = 10;
console.log(a.x); // 1

// a.z и b.z указывают на разные массивы: 
b.z.push(4);
console.log(a.z); // [1, 2, 3]

// a.w и b.w независимы друг от друга
b.w.setFullYear(2015);
console.log(a.w.getFullYear()); // 2014