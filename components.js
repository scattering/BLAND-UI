var Toolbar = ReactDataGrid.Toolbar;

var atoms = [{id:0, title : 'H'}, {id:1, title : 'He'}, {id:2, title : 'Li'}, {id:3, title : 'Be'}];
var AutoCompleteEditor = ReactDataGrid.Editors.AutoComplete;
var AtomEditor = React.createElement(AutoCompleteEditor, {options: atoms});

var DropDownEditor = ReactDataGrid.Editors.DropDownEditor;

var valences = ['0', '1', '2', '3']
var ValenceEditor = React.createElement(DropDownEditor, {options: valences});

var isotopes = ['+1', '+2', '-1', '-2']
var IsotopeEditor = React.createElement(DropDownEditor, {options: isotopes});

var wyckoffs = ['Wyc 1', 'Wyc 2', 'Wyc 3']
var WyckoffEditor = React.createElement(DropDownEditor, {options: wyckoffs});

var therm = ['Isotropic', 'Anisotropic']
var ThermalEditor = React.createElement(DropDownEditor, {options: therm});


//function to retrieve a row for a given index
var rowGetter = function(i){
  return _rows[i];
};

//Columns definition
var columns = [
{
  key: 'label',
  name: 'Label',
  editable : true
},
{
  key: 'atom',
  name: 'Atom #',
  editor : AtomEditor
},
{
  key: 'valence',
  name: 'Valence',
  editor : ValenceEditor
},
{
  key: 'isotope',
  name: 'Isotope',
  editor : IsotopeEditor
},
{
  key: 'wyckoff',
  name: 'Wyckoff Position',
  editor : WyckoffEditor,
  width: 150
},
{
  key: 'x',
  name: 'x',
  editable : true,
  width: 40
},
{
	key: 'y',
	name: 'y',
	editable : true,
	width: 40
},
{
	key: 'z',
	name: 'z',
	editable : true,
	width: 40
},
{
  key: 'occupancy',
  name: 'Occupancy',
  editable : true
},
{
	key: 'thermal',
	name: 'B',
	editor : ThermalEditor
}
]