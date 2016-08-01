const CHANGE_LABEL = 'CHANGE_LABEL'
const CHANGE_ATOM = 'CHANGE_ATOM'
const CHANGE_X = 'CHANGE_X'
const CHANGE_Y = 'CHANGE_Y'
const CHANGE_Z = 'CHANGE_Z'
const CHANGE_OCCUPANCY = 'CHANGE_OCCUPANCY'
const CHANGE_B = 'CHANGE_B'
const ADD_ROW = 'ADD_ROW'
const CHANGE_WHOLE_ROW = 'CHANGE_WHOLE_ROW'
const DO_NOTHING = 'DO_NOTHING'

function changeLabel(text, index, tab) {
	return {type: CHANGE_LABEL, text, index, tab}
}

function changeAtom(text, index, tab) {
	return {type: CHANGE_ATOM, text, index, tab}
}

function changeValence(number, index, tab) {
	return {type: CHANGE_VALENCE, number, index, tab}
}
function changeIsotope(number, index, tab) {
	return {type: CHANGE_ISOTOPE, number, index, tab}
}

function changeX(number, index, tab) {
	return {type: CHANGE_X, number, index, tab}
}
function changeY(number, index, tab) {
	return {type: CHANGE_Y, number, index, tab}
}

function changeZ(number, index, tab) {
	return {type: CHANGE_Z, number, index, tab}
}

function changeOccupancy(number, index, tab) {
	return {type: CHANGE_OCCUPANCY, number, index, tab}
}
function changeB(text, index, tab) {
	return {type: CHANGE_B, text, index, tab}
}
function addRow(obj, tab) {
	return {type: ADD_ROW, obj, tab}
}
function changeWholeRow(label, atom, x, y, z, occupancy, thermal, index, tab) {
	return {type: CHANGE_WHOLE_ROW, label, atom, x, y, z, occupancy, thermal, index, tab}
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

function changeSpace(text, index, tab) {
	return {type: CHANGE_SPACE, text, index, tab}
}
function changeA(number, index, tab) {
	return {type: CHANGE_A, number, index, tab}
}
function changeBee(number, index, tab) {
	return {type: CHANGE_BEE, number, index, tab}
}
function changeC(number, index, tab) {
	return {type: CHANGE_C, number, index, tab}
}
function changeAlpha(number, index, tab) {
	return {type: CHANGE_ALPHA, number, index, tab}
}
function changeBeta(number, index, tab) {
	return {type: CHANGE_BETA, number, index, tab}
}
function changeGamma(number, index, tab) {
	return {type: CHANGE_GAMMA, number, index, tab}
}
function changeCell(space, a, b, c, alpha, beta, gamma, tab) {
	return {type: CHANGE_CELL, space, a, b, c, alpha, beta, gamma, tab}
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
const CHANGE_MODE = 'CHANGE_MODE'

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
function changeMode(text, index) {
	return {type: CHANGE_MODE, text, index}
}


const ADD_PHASE = 'ADD_PHASE'
const REMOVE_PHASE = 'REMOVE_PHASE'
const CHANGE_TAB = 'CHANGE_TAB'

function addPhase() {
	return {type: ADD_PHASE}
}
function removePhase(index) {
	return {type: REMOVE_PHASE, index}
}
function changeTab(index) {
	return {type: CHANGE_TAB, index}
}

const ADD_FIT = 'ADD_FIT'
const REMOVE_FIT = 'REMOVE_FIT'
const CHANGE_PM = 'CHANGE_PM'
const CHANGE_STEPS = 'CHANGE_STEPS'
const CHANGE_BURN = 'CHANGE_BURN'

function addFit(name, value) {
	return {type: ADD_FIT, name}
}
function removeFit(name) {
	return {type: REMOVE_FIT, name}
}
function changePM(id, name, phase, row, value) {
	return {type: CHANGE_PM, id, name, phase, row, value}
}
function changeSteps(number) {
	return {type: CHANGE_STEPS, number}
}
function changeBurn(number) {
	return {type: CHANGE_BURN, number}
}


const CHANGE_OBSERVED = 'CHANGED_OBSERVED'

function changeObserved(x, y, dy) {
	return {type: CHANGE_OBSERVED, x, y, dy}
}

const CHANGE_CALCULATED = 'CHANGE_CALCULATED'

function changeCalculated(x, y) {
	return {type: CHANGE_CALCULATED, x, y}
}
