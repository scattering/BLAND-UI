function createRows(numberOfRows){
  var _rows = [];
  for (var i = 0; i < numberOfRows; i++) {
    _rows.push({
      label: '',
      atom: '',
      //wyckoff: '',
      //valence : '',
      //isotope : '',
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
			tmax: '',
      mode: ''
		});
	}
	return _rows;
}

const initialState = createRows(10);
const initialState01 = createRows(10);

/*function myReducer(state = initialState, action) {

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
    case CHANGE_WHOLE_ROW:
      var oldRow = state[action.index];
      newProp1 = {
        label: action.label
      }
      newProp2 = {
        atom: action.atom
      }
      newProp3 = {
        valence: action.valence
      }
      newProp4 = {
        isotope: action.isotope
      }
      newProp5 = {
        x: action.x
      }
      newProp6 = {
        y: action.y
      }
      newProp7 = {
        z: action.z
      }
      newProp8 = {
        occupancy: action.occupancy
      }
      newProp9 = {
        thermal: action.thermal
      }
      newrow1 = React.addons.update(oldRow, {$merge: newProp1});
      newrow2 = React.addons.update(newrow1, {$merge: newProp2});
      newrow3 = React.addons.update(newrow2, {$merge: newProp3});
      newrow4 = React.addons.update(newrow3, {$merge: newProp4});
      newrow5 = React.addons.update(newrow4, {$merge: newProp5});
      newrow6 = React.addons.update(newrow5, {$merge: newProp6});
      newrow7 = React.addons.update(newrow6, {$merge: newProp7});
      newrow8 = React.addons.update(newrow7, {$merge: newProp8});
      newrow9 = React.addons.update(newrow8, {$merge: newProp9});
      newState = state;
      newState[action.index] = newrow9;
      return newState;
		default:
			return state;
	}
	var rowToUpdate = state[action.index];
  var updatedRow = React.addons.update(rowToUpdate, {$merge: newProperty});
	var newState = state;
	newState[action.index] = updatedRow;
	return newState;
};*/

const initialState2 = create2(1);
const initialState02 = create2(1);

/*function myReducer2(state = initialState2, action) {
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
    case CHANGE_CELL:
      var oldState = state[0];
      newProp1 = {
        space: action.space
      }
      newProp2 = {
        a: action.a
      }
      newProp3 = {
        b: action.b
      }
      newProp4 = {
        c: action.c
      }
      newProp5 = {
        alpha: action.alpha
      }
      newProp6 = {
        beta: action.beta
      }
      newProp7 = {
        gamma: action.gamma
      }
      newrow1 = React.addons.update(oldState, {$merge: newProp1});
      newrow2 = React.addons.update(newrow1, {$merge: newProp2});
      newrow3 = React.addons.update(newrow2, {$merge: newProp3});
      newrow4 = React.addons.update(newrow3, {$merge: newProp4});
      newrow5 = React.addons.update(newrow4, {$merge: newProp5});
      newrow6 = React.addons.update(newrow5, {$merge: newProp6});
      newrow7 = React.addons.update(newrow6, {$merge: newProp7});
      return [newrow7];
		default:
			return state
	}
	var oldState = state[0];
	var updatedRow = React.addons.update(oldState, {$merge: newProperty});
	return [updatedRow];
}*/

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
    case CHANGE_MODE:
      newProperty = {
        mode: action.text
      }
      break
		default:
			return state
	}
	var oldState = state[0];
	var updatedRow = React.addons.update(oldState, {$merge: newProperty});
	return [updatedRow];
}

/*const initialState4 = []

function myReducer4(state = initialState4, action) {
  switch(action.type) {
    case ADD_FILE:
      //console.log(action.text)
      var oldState = state;
      oldState.push(action.obj);
      break
    case REMOVE_FILE:
      var oldState = [];
      break
    default:
      return state
  }
  return oldState
}*/


const initialState4 = {'Phases': [[createRows(6), create2(1)]], 'Selected': 0}

function myReducer4(state = initialState4, action) {
  switch(action.type) {
        case ADD_PHASE:
          newState = state;
          newState['Phases'].push([createRows(6), create2(1)]);
          return newState;
        case REMOVE_PHASE:
          newState = state;
          newState['Phases'].splice(action.index, 1);
          return newState;
        case CHANGE_TAB:
          newState = state;
          newState['Selected'] = action.index;
          return newState;
        case CHANGE_LABEL:
    			newProperty = {
    				label: action.text
    			}
          var rowToUpdate = state['Phases'][action.tab][0][action.index];
          var updatedRow = React.addons.update(rowToUpdate, {$merge: newProperty});
        	var newState = state;
        	newState['Phases'][action.tab][0][action.index] = updatedRow;
        	return newState;
    		case CHANGE_ATOM:
    			newProperty = {
    				atom: action.text
    			}
          var rowToUpdate = state['Phases'][action.tab][0][action.index];
          var updatedRow = React.addons.update(rowToUpdate, {$merge: newProperty});
        	var newState = state;
        	newState['Phases'][action.tab][0][action.index] = updatedRow;
        	return newState;
    		/*case CHANGE_VALENCE:
    			newProperty = {
    				valence: action.number
    			}
          var rowToUpdate = state['Phases'][action.tab][0][action.index];
          var updatedRow = React.addons.update(rowToUpdate, {$merge: newProperty});
        	var newState = state;
        	newState['Phases'][action.tab][0][action.index] = updatedRow;
        	return newState;
    		case CHANGE_ISOTOPE:
    			newProperty = {
    				isotope: action.number
    			}*/
          var rowToUpdate = state['Phases'][action.tab][0][action.index];
          var updatedRow = React.addons.update(rowToUpdate, {$merge: newProperty});
        	var newState = state;
        	newState['Phases'][action.tab][0][action.index] = updatedRow;
        	return newState;
    		//case CHANGE_WYCKOFF:
    		//	newProperty = {
    		//		wyckoff: action.text
    		//	}
    		//	break
    		case CHANGE_X:
    			newProperty = {
    				x: action.number
    			}
          var rowToUpdate = state['Phases'][action.tab][0][action.index];
          var updatedRow = React.addons.update(rowToUpdate, {$merge: newProperty});
        	var newState = state;
        	newState['Phases'][action.tab][0][action.index] = updatedRow;
        	return newState;
    		case CHANGE_Y:
    			newProperty = {
    				y: action.number
    			}
          var rowToUpdate = state['Phases'][action.tab][0][action.index];
          var updatedRow = React.addons.update(rowToUpdate, {$merge: newProperty});
        	var newState = state;
        	newState['Phases'][action.tab][0][action.index] = updatedRow;
        	return newState;
    		case CHANGE_Z:
    			newProperty = {
    				z: action.number
    			}
          var rowToUpdate = state['Phases'][action.tab][0][action.index];
          var updatedRow = React.addons.update(rowToUpdate, {$merge: newProperty});
        	var newState = state;
        	newState['Phases'][action.tab][0][action.index] = updatedRow;
        	return newState;
    		case CHANGE_OCCUPANCY:
    			newProperty = {
    				occupancy: action.number
    			}
          var rowToUpdate = state['Phases'][action.tab][0][action.index];
          var updatedRow = React.addons.update(rowToUpdate, {$merge: newProperty});
        	var newState = state;
        	newState['Phases'][action.tab][0][action.index] = updatedRow;
        	return newState;
    		case CHANGE_B:
    			newProperty = {
    				thermal: action.text
    			}
          var rowToUpdate = state['Phases'][action.tab][0][action.index];
          var updatedRow = React.addons.update(rowToUpdate, {$merge: newProperty});
        	var newState = state;
        	newState['Phases'][action.tab][0][action.index] = updatedRow;
        	return newState;
    		case ADD_ROW:
    			var oldState = state['Phases'][action.tab][0];
    			var newRow = action.obj;
    			var rows = React.addons.update(oldState, {$push : [newRow]});
          newState = state;
          newState['Phases'][action.tab][0] = rows;
    			return newState;
        case CHANGE_WHOLE_ROW:
          console.log(action)
          console.log(state['Phases'])
          var oldRow = state['Phases'][action.tab][0][action.index];
          //console.log('1');
          newProp1 = {
            label: action.label
          }
          newProp2 = {
            atom: action.atom
          }
          /*newProp3 = {
            valence: action.valence
          }
          newProp4 = {
            isotope: action.isotope
          }*/
          newProp5 = {
            x: action.x
          }
          newProp6 = {
            y: action.y
          }
          newProp7 = {
            z: action.z
          }
          newProp8 = {
            occupancy: action.occupancy
          }
          newProp9 = {
            thermal: action.thermal
          }
          //console.log('2');
          newrow1 = React.addons.update(oldRow, {$merge: newProp1});
          //console.log('3');
          newrow2 = React.addons.update(newrow1, {$merge: newProp2});
          //console.log('4');
          //newrow3 = React.addons.update(newrow2, {$merge: newProp3});
          //console.log('5');
          //newrow4 = React.addons.update(newrow3, {$merge: newProp4});
          //console.log('6');
          newrow5 = React.addons.update(newrow2, {$merge: newProp5});
          //console.log('7');
          newrow6 = React.addons.update(newrow5, {$merge: newProp6});
          //console.log('8');
          newrow7 = React.addons.update(newrow6, {$merge: newProp7});
          //console.log('9');
          newrow8 = React.addons.update(newrow7, {$merge: newProp8});
          //console.log('10');
          newrow9 = React.addons.update(newrow8, {$merge: newProp9});
          //console.log('11');
          newState = state;
          newState['Phases'][action.tab][0][action.index] = newrow9;
          //console.log('12');
          return newState;
        case CHANGE_SPACE:
    			newProperty = {
    				space: action.text
    			}
          var oldState = state
          var oldRow = state['Phases'][action.tab][1][0];
        	var updatedRow = React.addons.update(oldRow, {$merge: newProperty});
          oldState['Phases'][action.tab][1][0] = updatedRow;
        	return oldState;
    		case CHANGE_A:
    			newProperty = {
    				a: action.number
    			}
          var oldState = state
          var oldRow = state['Phases'][action.tab][1][0];
        	var updatedRow = React.addons.update(oldRow, {$merge: newProperty});
          oldState['Phases'][action.tab][1][0] = updatedRow;
        	return oldState;
    		case CHANGE_BEE:
    			newProperty = {
    				b: action.number
    			}
          var oldState = state
          var oldRow = state['Phases'][action.tab][1][0];
        	var updatedRow = React.addons.update(oldRow, {$merge: newProperty});
          oldState['Phases'][action.tab][1][0] = updatedRow;
        	return oldState;
    		case CHANGE_C:
    			newProperty = {
    				c: action.number
    			}
          var oldState = state
          var oldRow = state['Phases'][action.tab][1][0];
        	var updatedRow = React.addons.update(oldRow, {$merge: newProperty});
          oldState['Phases'][action.tab][1][0] = updatedRow;
        	return oldState;
    		case CHANGE_ALPHA:
    			newProperty = {
    				alpha: action.number
    			}
          var oldState = state
          var oldRow = state['Phases'][action.tab][1][0];
        	var updatedRow = React.addons.update(oldRow, {$merge: newProperty});
          oldState['Phases'][action.tab][1][0] = updatedRow;
        	return oldState;
    		case CHANGE_BETA:
    			newProperty = {
    				beta: action.number
    			}
          var oldState = state
          var oldRow = state['Phases'][action.tab][1][0];
        	var updatedRow = React.addons.update(oldRow, {$merge: newProperty});
          oldState['Phases'][action.tab][1][0] = updatedRow;
        	return oldState;
    		case CHANGE_GAMMA:
    			newProperty = {
    				gamma: action.number
    			}
          var oldState = state;
          var oldRow = state['Phases'][action.tab][1][0];
        	var updatedRow = React.addons.update(oldRow, {$merge: newProperty});
          oldState['Phases'][action.tab][1][0] = updatedRow;
        	return oldState;
        case CHANGE_CELL:
          oldState = state;
          var oldRow = state['Phases'][action.tab][1][0];
          newProp1 = {
            space: action.space
          }
          newProp2 = {
            a: action.a
          }
          newProp3 = {
            b: action.b
          }
          newProp4 = {
            c: action.c
          }
          newProp5 = {
            alpha: action.alpha
          }
          newProp6 = {
            beta: action.beta
          }
          newProp7 = {
            gamma: action.gamma
          }
          newrow1 = React.addons.update(oldRow, {$merge: newProp1});
          newrow2 = React.addons.update(newrow1, {$merge: newProp2});
          newrow3 = React.addons.update(newrow2, {$merge: newProp3});
          newrow4 = React.addons.update(newrow3, {$merge: newProp4});
          newrow5 = React.addons.update(newrow4, {$merge: newProp5});
          newrow6 = React.addons.update(newrow5, {$merge: newProp6});
          newrow7 = React.addons.update(newrow6, {$merge: newProp7});
          oldState['Phases'][action.tab][1][0] = newrow7;
          return oldState;
        default:
          return state
        }

  }

const initialState5 = [{}];

function myReducer5(state = initialState5, action) {
  switch(action.type) {
        case ADD_FIT:
          newState = state[0];
          newState[action.name] = {};
          return [newState];
        case REMOVE_FIT:
          newState = state[0];
          delete newState[action.name]
          return [newState];
        case CHANGE_PM:
        //console.log(state)
          newState = state[0];
          //console.log(newState)
          //console.log(action.value)
          newState[action.id]['name'] = action.name;
          newState[action.id]['phase'] = action.phase;
          newState[action.id]['row'] = action.row;
          newState[action.id]['pm'] = action.value;
          return [newState];
        case CHANGE_STEPS:
          newState = state[0];
          newState['steps'] = action.number;
          return [newState]
        default:
          return state;
    }
}

var reducers = Redux.combineReducers({
	myReducer3,
  myReducer4,
  myReducer5
})
