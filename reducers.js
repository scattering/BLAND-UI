function createRows(numberOfRows){
  var _rows = [];
  for (var i = 1; i < numberOfRows; i++) {
    _rows.push({
      label: '',
      atom: '',
      wyckoff: '',
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

const initialState = createRows(11);
	
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
		case CHANGE_WYCKOFF:
			newProperty = {
				wyckoff: action.text
			}
			break
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