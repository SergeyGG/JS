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
		
	/*getElementsByClassName - javascript.ru/unsorted/top-10-functions#8-getelementsbyclass*/	
		if(document.getElementsByClassName) {

			getElementsByClass = function(classList, node) {    
				return (node || document).getElementsByClassName(classList)
			}

		} else {

			getElementsByClass = function(classList, node) {			
				var node = node || document,
				list = node.getElementsByTagName('*'), 
				length = list.length,  
				classArray = classList.split(/\s+/), 
				classes = classArray.length, 
				result = [], i,j
				for(i = 0; i < length; i++) {
					for(j = 0; j < classes; j++)  {
						if(list[i].className.search('\\b' + classArray[j] + '\\b') != -1) {
							result.push(list[i])
							break
						}
					}
				}
	
				return result
			}
		}

		var elements = getElementsByClass('white');
		for (var i=0; i<elements.length; i++)  {
  			elements[i].className = elements[i].className.replace('white', 'green')
		}

		var elements = getElementsByClass('green');
		for (var i=0; i<elements.length; i++)  {
  			elements[i].className = elements[i].className.replace('green', 'white')
		}

		

	}
  
}
