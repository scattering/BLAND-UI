function handleOnClick() {
	const myState = store.getState();
	const checkTab1 = myState['myReducer'];
	const done = checkComplete(checkTab1, 9);
	const checkTab2 = myState['myReducer2'];
	const done2 = checkComplete(checkTab2, 7);
	const checkTab3 = myState['myReducer3'];
	const done3 = checkComplete(checkTab3, 9);
	var bad = false;
	if(done === 'incomplete row') {
		alert('Error, you have an ' + done);
		bad = true;
	}
	else if (done === 'no data') {
		alert('Error, you have input ' + done);
		bad = true;
	}
	if((done2 === 'incomplete row') || (done2 === 'no data')) {
		alert('Error, please complete the cell information on Tab #2');
		bad = true;
	}
	if((done3 === 'incomplete row') || (done3 === 'no data')) {
		alert('Error, please complete the cell information on Tab #3');
		bad = true;
	}
	if(bad === false) {
		console.log(done);
	
		const json = JSON.stringify(myState);
		
		xhr = new XMLHttpRequest();
		var url = "http://localhost:8001/polls/calc/";
		xhr.open("POST", url, true);
		xhr.responseType = 'text';
		xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
		xhr.onreadystatechange = function() {
			if (xhr.readyState == 4 && xhr.status == 200) {
				//console.log(xhr.responseText[0])
				//var json1 = JSON.parse(xhr.responseText[0]);
				//console.log(json1);
				console.log(xhr.responseText);
				alert(xhr.responseText)
			}
		}
		xhr.send(json);
		console.log(json);
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