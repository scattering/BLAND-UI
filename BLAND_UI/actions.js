const CHANGE_LABEL = 'CHANGE_LABEL'
const CHANGE_ATOM = 'CHANGE_ATOM'
const CHANGE_VALENCE = 'CHANGE_VALENCE'
const CHANGE_ISOTOPE = 'CHANGE_ISOTOPE'
//const CHANGE_WYCKOFF = 'CHANGE_WYCKOFF'
const CHANGE_X = 'CHANGE_X'
const CHANGE_Y = 'CHANGE_Y'
const CHANGE_Z = 'CHANGE_Z'
const CHANGE_OCCUPANCY = 'CHANGE_OCCUPANCY'
const CHANGE_B = 'CHANGE_B'
const ADD_ROW = 'ADD_ROW'
const CHANGE_WHOLE_ROW = 'CHANGE_WHOLE_ROW'
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

//function changeWyckoff(text, index) {
//	return {type: CHANGE_WYCKOFF, text, index}
//}

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
function changeWholeRow(label, atom, valence, isotope, x, y, z, occupancy, thermal, index) {
	return {type: CHANGE_WHOLE_ROW, label, atom, valence, isotope, x, y, z, occupancy, thermal, index}
}
function doNothing() {
	return {type: DO_NOTHING}
}



const CHANGE_SPACE = 'CHANGE_SPACE'
const CHANGE_A = 'CHANGE_A'
const CHANGE_BEE = 'CHANGE_BEE'
const CHANGE_C = 'CHANGE_C'
const CHANGE_ALPHA = 'CHANGE_ALPHA'
const CHANGE_BETA = 'CHANGE_BETA'
const CHANGE_GAMMA = 'CHANGE_GAMMA'
const CHANGE_CELL = 'CHANGE_CELL'

function changeSpace(text, index) {
	return {type: CHANGE_SPACE, text, index}
}
function changeA(number, index) {
	return {type: CHANGE_A, number, index}
}
function changeBee(number, index) {
	return {type: CHANGE_BEE, number, index}
}
function changeC(number, index) {
	return {type: CHANGE_C, number, index}
}
function changeAlpha(number, index) {
	return {type: CHANGE_ALPHA, number, index}
}
function changeBeta(number, index) {
	return {type: CHANGE_BETA, number, index}
}
function changeGamma(number, index) {
	return {type: CHANGE_GAMMA, number, index}
}
function changeCell(space, a, b, c, alpha, beta, gamma) {
	return {type: CHANGE_CELL, space, a, b, c, alpha, beta, gamma}
}


const CHANGE_SCALE = 'CHANGE_SCALE'
const CHANGE_WAVELENGTH = 'CHANGE_WAVELENGTH'
const CHANGE_U = 'CHANGE_U'
const CHANGE_V = 'CHANGE_V'
const CHANGE_W = 'CHANGE_W'
const CHANGE_ETA = 'CHANGE_ETA'
const CHANGE_ZERO = 'CHANGE_ZERO'
const CHANGE_TMIN = 'CHANGE_TMIN'
const CHANGE_TMAX = 'CHANGE_TMAX'

function changeScale(number, index) {
	return {type: CHANGE_SCALE, number, index}
}
function changeWavelength(number, index) {
	return {type: CHANGE_WAVELENGTH, number, index}
}
function changeU(number, index) {
	return {type: CHANGE_U, number, index}
}
function changeV(number, index) {
	return {type: CHANGE_V, number, index}
}
function changeW(number, index) {
	return {type: CHANGE_W, number, index}
}
function changeEta(number, index) {
	return {type: CHANGE_ETA, number, index}
}
function changeZero(number, index) {
	return {type: CHANGE_ZERO, number, index}
}
function changeTMin(number, index) {
	return {type: CHANGE_TMIN, number, index}
}
function changeTMax(number, index) {
	return {type: CHANGE_TMAX, number, index}
}


/*const ADD_FILE = 'ADD_FILE'
const REMOVE_FILE = 'REMOVE_FILE'
function addFile(obj) {
	return {type: ADD_FILE, obj}
}
function removeFile() {
	return {type: REMOVE_FILE}
}*/
