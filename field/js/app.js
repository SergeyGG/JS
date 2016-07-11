function tableCreate(){
    var body = document.body,
        tbl  = document.createElement('table');
    tbl.classList.add("table");
    
    for(var i = 0; i <= 10; i++){
        var tr = tbl.insertRow();
        for(var j = 0; j <= 10; j++){
            var td = tr.insertCell();
            td.classList.add("green");
        }
    }

    body.appendChild(tbl);
}

tableCreate();

window.onload = function() {
	var td = document.getElementsByTagName("td");
	for (var i = 0; i < td.length; i++) {
		td[i].onmousedown = changeColor;
	}

	function changeColor(event) {
	var td = event.target;
	td.classList.remove("green");
	td.classList.add("white");
	}

	change.onclick = function replaceClass() {


		

	}
  
}
