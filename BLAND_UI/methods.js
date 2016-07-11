function handleOnClick() {
	const myState = store.getState();
	//const checkTab1 = myState['myReducer'];
	//const done = checkComplete(checkTab1, 9);
	//const checkTab2 = myState['myReducer2'];
	//const done2 = checkComplete(checkTab2, 7);
	//const checkTab3 = myState['myReducer3'];
	//const done3 = checkComplete(checkTab3, 9);
	/*for(i = 0; i < myState['myReducer4']['Phases'].length; i++) {

	}
	atoms[0] = '1'
	var bad = false;
	if(done === 'incomplete row') {
		alert('Error, you have an incomplete Atom.');
		bad = true;
	}
	else if (done === 'no data') {
		alert('Error, please input at least one Atom.');
		bad = true;
	}
	if((done2 === 'incomplete row') || (done2 === 'no data')) {
		alert('Error, please complete the Unit Cell information.');
		bad = true;
	}
	if((done3 === 'incomplete row') || (done3 === 'no data')) {
		alert('Error, please complete the Instrument information.');
		bad = true;
	}*/
	bad = false;
	if(bad === false) {
		//console.log(done);
		document.getElementById('mybtn').disabled = true;
		console.log(myState)
		send = myState
		send['tt'] = tt1;
		send['obs'] = obs;
		console.log(send)
		const json = JSON.stringify(send);

		xhr = new XMLHttpRequest();
		var url = "http://localhost:8001/bland/calc/";
		xhr.open("POST", url, true);
		xhr.responseType = 'text';
		xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
		xhr.onreadystatechange = function() {
			if (xhr.readyState == 4 && xhr.status == 200) {
				var json1 = JSON.parse(xhr.responseText);
				//console.log(json1);
				var myWindow = window.open("", "_blank", "height=750,width=1000");
				myWindow.document.write("<head><title>Results</title></head><p>Here are the results!</p><div id='new'></div>");
				var mod = 0
				var arr = []
				myWindow.document.getElementById("new").innerHTML = "&nbsp;h k l&nbsp; &emsp;Two Theta.Struct Fact<hr align='left' width=200/>"
				//console.log(data[0].length)

				if(data[0]) {
					j = 1;
				}
				else {
					j = 0;
					data = [data]
				}
				data[0].push([])
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
				console.log(data[0])
				calculated = true
				//console.log(json1[3].length)
				for(k = 0; k < json1[3].length; k++) {
					data[0][j].push([json1[3][k], json1[4][k]])
					if(data[0]) {
						data1.push([json1[3][k], (data[0][0][k][1] - json1[4][k])])
					}
				}
				data1 = [[data1]];
				//console.log(data)
			}
			document.getElementById('mybtn').disabled = false;
		}
		xhr.send(json);
		delete myState['tt']
		delete myState['obs']
		//console.log(json);
	}
}

function checkComplete(state, len) {
	var complete = false;
	for(i = 0; i < state.length; i++) {
		var row = state[i]
		var num_complete = checkRow(row);
		if(num_complete !== len) {
			if(num_complete !== 0) {
				return 'incomplete row';
			}
		}
		else {
			complete = true;
		}
	}
	if(complete === true) {
		return 'Good to go.';
	}
	else {
		return 'no data';
	}
}

function checkRow(row) {
	count = 0;
	for(var key in row) {
		if(row[key] !== '') {
			count += 1;
		}
	}
	return count;
}

function funClick() {
	num = 2;
}
