var Toolbar = ReactDataGrid.Toolbar;
var DropDownEditor = ReactDataGrid.Editors.DropDownEditor;
//var AutoCompleteEditor = ReactDataGrid.Editors.AutoComplete;

//var atoms = [{id:0, title : 'H'}, {id:1, title : 'He'}, {id:2, title : 'Li'}, {id:3, title : 'Be'}];
/*var atoms = ['H', 'He', 'Li', 'Be', 'B', 'C', 'N', 'O', 'F', 'Ne', 'Na', 'Mg', 'Al', 'Si', 'P', 'S', 'Cl', 'Ar', 'K', 'Ca', 'Sc', 'Ti', 'V', 'Cr', 'Mn', 'Fe', 'Co', 'Ni', 
'Cu', 'Zn', 'Ga', 'Ge', 'As', 'Se', 'Br', 'Kr', 'Rb', 'Sr', 'Y', 'Zr', 'Nb', 'Mo', 'Tc', 'Ru', 'Rh', 'Pd', 'Ag', 'Cd', 'In', 'Sn', 'Sb', 'Te', 'I', 'Xe', 'Cs', 'Ba', 'La',
'Ce', 'Pr', 'Nd', 'Pm', 'Sm', 'Eu', 'Gd', 'Tb', 'Dy', 'Ho', 'Er', 'Tm', 'Yb', 'Lu', 'Hf', 'Ta', 'W', 'Re', 'Os', 'Ir', 'Pt', 'Au', 'Hg', 'Tl', 'Pb', 'Bi', 'Po', 'At', 'Rn',
'Fr', 'Ra', 'Ac', 'Th', 'Pa', 'U', 'Np', 'Pu', 'Am', 'Cm', 'Bk', 'Cf', 'Es', 'Fm', 'Md', 'No', 'Lr', 'Rf', 'Db', 'Sg', 'Bh', 'Hs', 'Mt', 'Ds', 'Rg', 'Cn', 'Nh', 'Fl', 'Mc',
'Lv', 'Ts', 'Og']*/
var atoms = ['1  |  H', '2  |  He', '3  |  Li', '4  |  Be', '5  |  B', '6  |  C', '7  |  N', '8  |  O', '9  |  F', '10  |  Ne', '11  |  Na', '12  |  Mg', '13  |  Al', 
'14  |  Si', '15  |  P', '16  |  S', '17  |  Cl', '18  |  Ar', '19  |  K', '20  |  Ca', '21  |  Sc', '22  |  Ti', '23  |  V', '24  |  Cr', '25  |  Mn', '26  |  Fe', 
'27  |  Co', '28  |  Ni', '29  |  Cu', '30  |  Zn', '31  |  Ga', '32  |  Ge', '33  |  As', '34  |  Se', '35  |  Br', '36  |  Kr', '37  |  Rb', '38  |  Sr', '39  |  Y', 
'40  |  Zr', '41  |  Nb', '42  |  Mo', '43  |  Tc', '44  |  Ru', '45  |  Rh', '46  |  Pd', '47  |  Ag', '48  |  Cd', '49  |  In', '50  |  Sn', '51  |  Sb', '52  |  Te', 
'53  |  I', '54  |  Xe', '55  |  Cs', '56  |  Ba', '57  |  La', '58  |  Ce', '59  |  Pr', '60  |  Nd', '61  |  Pm', '62  |  Sm', '63  |  Eu', '64  |  Gd', '65  |  Tb', 
'66  |  Dy', '67  |  Ho', '68  |  Er', '69  |  Tm', '70  |  Yb', '71  |  Lu', '72  |  Hf', '73  |  Ta', '74  |  W', '75  |  Re', '76  |  Os', '77  |  Ir', '78  |  Pt', 
'79  |  Au', '80  |  Hg', '81  |  Tl', '82  |  Pb', '83  |  Bi', '84  |  Po', '85  |  At', '86  |  Rn', '87  |  Fr', '88  |  Ra', '89  |  Ac', '90  |  Th', '91  |  Pa', 
'92  |  U', '93  |  Np', '94  |  Pu', '95  |  Am', '96  |  Cm', '97  |  Bk', '98  |  Cf', '99  |  Es', '100  |  Fm', '101  |  Md', '102  |  No', '103  |  Lr', '104  |  Rf', 
'105  |  Db', '106  |  Sg', '107  |  Bh', '108  |  Hs', '109  |  Mt', '110  |  Ds', '111  |  Rg', '112  |  Cn', '113  |  Nh', '114  |  Fl', '115  |  Mc', '116  |  Lv', 
'117  |  Ts', '118  |  Og']
var AtomEditor = React.createElement(DropDownEditor, {options: atoms});


var valences = ['0', '1', '2', '3']
var ValenceEditor = React.createElement(DropDownEditor, {options: valences});

var isotopes = ['+1', '+2', '-1', '-2']
var IsotopeEditor = React.createElement(DropDownEditor, {options: isotopes});

//var wyckoffs = ['Wyc 1', 'Wyc 2', 'Wyc 3']
//var WyckoffEditor = React.createElement(DropDownEditor, {options: wyckoffs});

var therm = ['Isotropic', 'Anisotropic']
var ThermalEditor = React.createElement(DropDownEditor, {options: therm});

var space = []
for(i = 0; i < 230; i++) {
	space[i] = "Space group " + (i+1);
}
var SpaceEditor = React.createElement(DropDownEditor, {options: space});

//function to retrieve a row for a given index
var rowGetter = function(i){
  return _rows[i];
};

//Columns definition
const columns = [
	{
	  key: 'label',
	  name: 'Label',
	  editable: true
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
	//{
	 // key: 'wyckoff',
	//  name: 'Wyckoff Position',
	 // editor : WyckoffEditor,
	//  width: 150
	//},
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

const columns2 = [
	{
		key: 'space',
		name: 'Space Group',
		editor: SpaceEditor
	},
	{
		key: 'a',
		name: 'a',
		editable: true
	},
	{
		key: 'b',
		name: 'b',
		editable: true
	},
	{
		key: 'c',
		name: 'c',
		editable: true
	},
	{
		key: 'alpha',
		name: 'Alpha',
		editable: true
	},
	{
		key: 'beta',
		name: 'Beta',
		editable: true
	},
	{
		key: 'gamma',
		name: 'Gamma',
		editable: true
	}
]

const columns3 = [
	{
		key: 'scale',
		name: 'Scale Factor',
		editable: true
	},
	{
		key: 'wavelength',
		name: 'Neutron Wavelength',
		editable: true
	},
	{
		key: 'u',
		name: 'u',
		editable: true,
		width: 100
	},
	{
		key: 'v',
		name: 'v',
		editable: true,
		width: 100
	},
	{
		key: 'w',
		name: 'w',
		editable: true,
		width: 100
	},
	{
		key: 'eta',
		name: 'Eta',
		editable: true
	},
	{
		key: 'zero',
		name: 'Zero Position',
		editable: true
	},
	{
		key: 'tmin',
		name: '2\u03B8 Min',
		editable: true
	},
	{
		key: 'tmax',
		name: '2\u03B8 Max',
		editable: true
	}
]