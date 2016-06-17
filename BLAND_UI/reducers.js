function createRows(numberOfRows){
  var _rows = [];
  for (var i = 0; i < numberOfRows; i++) {
    _rows.push({
      label: '',
      atom: '',
      //wyckoff: '',
      valence : '',
      isotope : '',
      x : '',
	  y : '',
	  z : '',
	  occupancy : '',
      thermal : ''
    });
  }
  return _rows;
}

function create2(numberOfRows) {
	var _rows = [];
	for (var i = 0; i < numberOfRows; i++) {
		_rows.push({
			space: '',
			a: '',
			b: '',
			c: '',
			alpha: '',
			beta: '',
			gamma: ''
		});
	}
	return _rows;
}

function create3(numberOfRows) {
	var _rows = [];
	for (var i = 0; i < numberOfRows; i++) {
		_rows.push({
			scale: '',
			wavelength: '',
			u: '',
			v: '',
			w: '',
			eta: '',
			zero: '',
			tmin: '',
			tmax: ''
		});
	}
	return _rows;
}

const initialState = createRows(10);
	
function myReducer(state = initialState, action) {
	
	switch(action.type) {
		case CHANGE_LABEL:
			newProperty = {
				label: action.text
			}
			break
		case CHANGE_ATOM:
			newProperty = {
				atom: action.text
			}
			break
		case CHANGE_VALENCE:
			newProperty = {
				valence: action.number
			}
			break
		case CHANGE_ISOTOPE:
			newProperty = {
				isotope: action.number
			}
			break
		//case CHANGE_WYCKOFF:
		//	newProperty = {
		//		wyckoff: action.text
		//	}
		//	break
		case CHANGE_X:
			newProperty = {
				x: action.number
			}
			break
		case CHANGE_Y:
			newProperty = {
				y: action.number
			}
			break
		case CHANGE_Z:
			newProperty = {
				z: action.number
			}
			break
		case CHANGE_OCCUPANCY:
			newProperty = {
				occupancy: action.number
			}
			break
		case CHANGE_B:
			newProperty = {
				thermal: action.text
			}
			break
		case ADD_ROW:
			var newState = state;
			var newRow = action.obj;
			var rows = React.addons.update(newState, {$push : [newRow]});
			return rows;
		default:
			return state
	}
	var rowToUpdate = state[action.index];
    var updatedRow = React.addons.update(rowToUpdate, {$merge: newProperty});
	var newState = state;
	newState[action.index] = updatedRow;
	return newState;
};

const initialState2 = create2(1);

function myReducer2(state = initialState2, action) {
	switch(action.type) {
		case CHANGE_SPACE:
			newProperty = {
				space: action.text
			}
			break
		case CHANGE_A:
			newProperty = {
				a: action.number
			}
			break
		case CHANGE_BEE:
			newProperty = {
				b: action.number
			}
			break
		case CHANGE_C:
			newProperty = {
				c: action.number
			}
			break
		case CHANGE_ALPHA:
			newProperty = {
				alpha: action.number
			}
			break
		case CHANGE_BETA:
			newProperty = {
				beta: action.number
			}
			break
		case CHANGE_GAMMA:
			newProperty = {
				gamma: action.number
			}
			break
		default:
			return state
	}
	var oldState = state[0];
	var updatedRow = React.addons.update(oldState, {$merge: newProperty});
	return [updatedRow];
}

const initialState3 = create3(1);

function myReducer3(state = initialState3, action) {
	switch(action.type) {
		case CHANGE_SCALE:
			newProperty = {
				scale: action.number
			}
			break
		case CHANGE_WAVELENGTH:
			newProperty = {
				wavelength: action.number
			}
			break
		case CHANGE_U:
			newProperty = {
				u: action.number
			}
			break
		case CHANGE_V:
			newProperty = {
				v: action.number
			}
			break
		case CHANGE_W:
			newProperty = {
				w: action.number
			}
			break
		case CHANGE_ETA:
			newProperty = {
				eta: action.number
			}
			break
		case CHANGE_ZERO:
			newProperty = {
				zero: action.number
			}
			break
		case CHANGE_TMIN:
			newProperty = {
				tmin: action.number
			}
			break
		case CHANGE_TMAX:
			newProperty = {
				tmax: action.number
			}
			break
		default:
			return state
	}
	var oldState = state[0];
	var updatedRow = React.addons.update(oldState, {$merge: newProperty});
	return [updatedRow];
}


var reducers = Redux.combineReducers({
	myReducer,
	myReducer2,
	myReducer3
})