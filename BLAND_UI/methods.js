function handleOnClick() {
		const myState = store.getState();
		send = myState
		const json = JSON.stringify(send);

		xhr = new XMLHttpRequest();
		var url = location.origin + "/bland/calc/";
		xhr.open("POST", url, true);
		xhr.responseType = 'text';
		xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
		xhr.onreadystatechange = function() {
			if (xhr.readyState == 4 && xhr.status == 200) {
					if(xhr.responseType === 'text') {
							var json1 = JSON.parse(xhr.responseText);
							var myWindow = window.open("", "_blank", "height=750,width=1000");
							myWindow.document.write("<head><title>Results</title></head><p>Here are the results!</p><div id='new'></div>");
							var mod = 0
							var arr = []
							myWindow.document.getElementById("new").innerHTML = "&nbsp;h k l&nbsp;&nbsp;&nbsp;Two Theta&nbsp;&nbsp;&nbsp;Struct Fact<hr align='left' width=200/>"

							for(i = 0; i < json1[1].length; i++) {
								hkl = json1[0][i];
								tt = json1[1][i].toPrecision(5);
								if(json1[2][i] > 10) {
									sF = json1[2][i].toFixed(11)
								}
								else {
									sF = json1[2][i].toFixed(12)
								}
								myWindow.document.getElementById("new").innerHTML += "(" + hkl + ")" + "&emsp;" + tt + "&emsp;" + sF + "<br/>";
							}
							store.dispatch(changeCalculated(json1[3], json1[4]))
				}
				document.getElementById('mybtn').disabled = false;
			}
		}
		xhr.send(json);
}

function handleOnClick2() {
	myState = store.getState()
	send = myState
	var go = true;
	if(Object.keys(myState['myReducer5'][0]).length === 0) {
		go = false;
		var reason = 'Error, no fitting parameters have been entered!'
	}
	for(var item in myState['myReducer5'][0]) {
		if(item !== 'steps' && item !== 'burn') {
			if(myState['myReducer5'][0][item]['pm'] === '' || typeof myState['myReducer5'][0][item]['pm'] === 'undefined') {
				go = false;
				var reason = 'Error, please enter the plus/minus for all parameters you have checked.';
			}
		}
	}

	if(go === true) {
		const json = JSON.stringify(send);

		xhr = new XMLHttpRequest();
		var url = location.origin + "/bland/fitting/";

		xhr.open("POST", url, true);
		xhr.responseType = "text"
		xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
		xhr.onreadystatechange = function() {
			if (xhr.readyState == 4 && xhr.status == 200) {
				alert('Your fit has started. Visit http://localhost:8001/status/' + xhr.responseText + " to view the status of your fit. A tab taking you to this site will open automatically.")
				window.open(location.origin + "/bland/status/" + xhr.responseText + "/", "height=750,width=1000,menubar=yes,toolbar=yes");
			}
		}
		xhr.send(json);
	}
	else {
		alert(reason);
	}
}
