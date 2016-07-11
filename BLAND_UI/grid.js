var Grid = onClickOutside(React.createClass({displayName: 'component',

    /*getInitialState : function(){
      var fakeRows = createRows(10);
      return {rows :fakeRows};
    },*/

    getColumns: function() {
      var clonedColumns = columns.slice();
  	  clonedColumns.map((col, idx) => {
        col.events = {
          onClick: function(ev, args) {
            var idx = args.idx;
            var rowIdx = args.rowIdx;
            this.refs.grid.openCellEditor(rowIdx, idx);
          }.bind(this)
        }
      })
      return clonedColumns;
    },

	componentDidMount: function() {
  	this.refs.grid.deselectCells();
	},

  //update: function() {
  //  if(this.isMounted()) {
  //    this.forceUpdate();
  //  }
  //},

    handleGridRowsUpdated : function(updatedRowData) {
      myState = store.getState()
      tab = myState['myReducer4']['Selected'];
      for (var i = updatedRowData.fromRow; i <= updatedRowData.toRow; i++) {

		switch(updatedRowData.cellKey) {
			case 'label':
				action = changeLabel(updatedRowData.updated.label, i, tab)
				break
			case 'atom':
				action = changeAtom(updatedRowData.updated.atom, i, tab)
				break
			/*case 'valence':
				action = changeValence(updatedRowData.updated.valence, i, tab)
				break
			case 'isotope':
				action = changeIsotope(updatedRowData.updated.isotope, i, tab)
				break*/
			//case 'wyckoff':
			//	action = changeWyckoff(updatedRowData.updated.wyckoff, i)
			//	break
			case 'x':
				if(Number.isNaN(Number(updatedRowData.updated.x))) {
					alert('Please enter a number')
					break
				}
				else if(Number(updatedRowData.updated.x) > 1 || Number(updatedRowData.updated.x) < 0) {
					alert('Please enter a number between 0 and 1')
					break
				}
				action = changeX(updatedRowData.updated.x, i, tab)
        store.dispatch(removeFit('row' + i + 'x' + (tab + 1)))
				break
			case 'y':
				if(Number.isNaN(Number(updatedRowData.updated.y))) {
					alert('Please enter a number')
					break
				}
				else if(Number(updatedRowData.updated.y) > 1 || Number(updatedRowData.updated.y) < 0) {
					alert('Please enter a number between 0 and 1')
					break
				}
				action = changeY(updatedRowData.updated.y, i, tab)
        store.dispatch(removeFit('row' + i + 'y' + (tab + 1)))
				break
			case 'z':
				if(Number.isNaN(Number(updatedRowData.updated.z))) {
					alert('Please enter a number')
					break
				}
				else if(Number(updatedRowData.updated.z) > 1 || Number(updatedRowData.updated.z) < 0) {
					alert('Please enter a number between 0 and 1')
					break
				}
				action = changeZ(updatedRowData.updated.z, i, tab)
        store.dispatch(removeFit('row' + i + 'z' + (tab + 1)))
				break
			case 'occupancy':
				if(Number.isNaN(Number(updatedRowData.updated.occupancy))) {
					alert('Please enter a number')
					break
				}
				else if(Number(updatedRowData.updated.occupancy) > 1 || Number(updatedRowData.updated.occupancy) < 0) {
					alert('Please enter a number between 0 and 1')
					break
				}
				action = changeOccupancy(updatedRowData.updated.occupancy, i, tab)
        store.dispatch(removeFit('row' + i + 'occupancy' + (tab + 1)))
				break
			case 'thermal':
        if(Number.isNaN(Number(updatedRowData.updated.thermal))) {
          alert('Please enter a number')
          break
        }
				action = changeB(updatedRowData.updated.thermal, i, tab)
        store.dispatch(removeFit('row' + i + 'thermal' + (tab + 1)))
				break
			default:
				action = doNothing()
		}
		store.dispatch(action)
      }
    },

    handleAddRow : function(e){
      var newRow = {
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
    		};
      myState = store.getState();
      tab = myState['myReducer4']['Selected'];
  		action = addRow(newRow, tab);
  		store.dispatch(action);
    },

    rowGetter : function(index){
      if (index < 0 || index > this.getSize()){
        return undefined;
      }
  	  const myState = store.getState();
      const tab = myState['myReducer4']['Selected'];
      //console.log('tab is ', tab)
  	  const real = myState['myReducer4']['Phases'][tab][0];
      return real[index];
    },

    handleClickOutside: function (e) {
      this.refs.grid.deselectCells();
    },

    getSize : function() {
	  const myState = store.getState()
    const tab = myState['myReducer4']['Selected'];
	  const real = myState['myReducer4']['Phases'][tab][0];
    return real.length;
    },

    handleMount: function() {
	     document.getElementById('mybtn').style.visibility = "visible";
    },


    render : function() {
        document.getElementById('inner').style.visibility = 'visible';
        document.getElementById('below').style.visibility = 'hidden';
        return (
              React.createElement(ReactDataGrid, {
                  ref: 'grid',
                  enableCellSelect: true,
                  columns: this.getColumns(),
                  rowGetter: this.rowGetter,
                  rowsCount: this.getSize(),
                  onGridRowsUpdated: this.handleGridRowsUpdated,
                  toolbar: React.createElement(Toolbar, {onAddRow: this.handleAddRow}),
                  rowHeight: 50,
                  minHeight: 358,
                  rowScrollTimeout: 200,
                  componentDidMount: this.handleMount(),
                })
        );
    }
}));
