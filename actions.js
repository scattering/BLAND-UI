const CHANGE_LABEL = 'CHANGE_LABEL'
const CHANGE_ATOM = 'CHANGE_ATOM'
const CHANGE_VALENCE = 'CHANGE_VALENCE'
const CHANGE_ISOTOPE = 'CHANGE_ISOTOPE'
const CHANGE_WYCKOFF = 'CHANGE_WYCKOFF'
const CHANGE_X = 'CHANGE_X'
const CHANGE_Y = 'CHANGE_Y'
const CHANGE_Z = 'CHANGE_Z'
const CHANGE_OCCUPANCY = 'CHANGE_OCCUPANCY'
const CHANGE_B = 'CHANGE_B'
const ADD_ROW = 'ADD_ROW'
const DO_NOTHING = 'DO_NOTHING'

function changeLabel(text, index) {
	return {type: CHANGE_LABEL, text, index}
}

function changeAtom(text, index) {
	return {type: CHANGE_ATOM, text, index}
}

function changeValence(number, index) {
	return {type: CHANGE_VALENCE, number, index}
}
function changeIsotope(number, index) {
	return {type: CHANGE_ISOTOPE, number, index}
}

function changeWyckoff(text, index) {
	return {type: CHANGE_WYCKOFF, text, index}
}

function changeX(number, index) {
	return {type: CHANGE_X, number, index}
}
function changeY(number, index) {
	return {type: CHANGE_Y, number, index}
}

function changeZ(number, index) {
	return {type: CHANGE_Z, number, index}
}

function changeOccupancy(number, index) {
	return {type: CHANGE_OCCUPANCY, number, index}
}
function changeB(text, index) {
	return {type: CHANGE_B, text, index}
}
function addRow(obj) {
	return {type: ADD_ROW, obj}
}
function doNothing() {
	return {type: DO_NOTHING}
}