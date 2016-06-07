var Grid = React.createClass({displayName: 'component',

    getInitialState : function(){
      var fakeRows = createRows(11);
      return {rows :fakeRows};
    },
	
    getColumns: function() {
      var clonedColumns = columns.slice();
      clonedColumns[2].events = {
        onClick: function(ev, args) {
          var idx = args.idx;
          var rowIdx = args.rowIdx;
          this.refs.grid.openCellEditor(rowIdx, idx);
        }.bind(this)
      }

      return clonedColumns;
    },
	
	componentDidMount: function() {
		store.subscribe(() => this.forceUpdate());
	},
	
    handleGridRowsUpdated : function(updatedRowData) {

      for (var i = updatedRowData.fromRow; i <= updatedRowData.toRow; i++) {

		switch(updatedRowData.cellKey) {
			case 'label':
				action = changeLabel(updatedRowData.updated.label, i)
				break
			case 'atom':
				action = changeAtom(updatedRowData.updated.atom, i)
				break
			case 'valence':
				action = changeValence(updatedRowData.updated.valence, i)
				break
			case 'isotope':
				action = changeIsotope(updatedRowData.updated.isotope, i)
				break
			case 'wyckoff':
				action = changeWyckoff(updatedRowData.updated.wyckoff, i)
				break
			case 'x':
				if(Number.isNaN(Number(updatedRowData.updated.x))) {
					alert('Please enter a number')
					break
				}
				action = changeX(updatedRowData.updated.x, i)
				break
			case 'y':
				if(Number.isNaN(Number(updatedRowData.updated.y))) {
					alert('Please enter a number')
					break
				}
				action = changeY(updatedRowData.updated.y, i)
				break
			case 'z':
				if(Number.isNaN(Number(updatedRowData.updated.z))) {
					alert('Please enter a number')
					break
				}
				action = changeZ(updatedRowData.updated.z, i)
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
				action = changeOccupancy(updatedRowData.updated.occupancy, i)
				break
			case 'thermal':
				action = changeB(updatedRowData.updated.thermal, i)
				break
			default:
				action = doNothing()
		}
		
		store.dispatch(action)
      }
    },

    handleAddRow : function(e){
      var newRow = {
        value: e.newRowIndex,
        userStory: '',
        developer : '',
        epic : ''};
		action = addRow(newRow);
		store.dispatch(action);
    },

    getRowAt : function(index){
      if (index < 0 || index > this.getSize()){
        return undefined;
      }
	  const myState = store.getState()
      return myState[index];
    },

    getSize : function() {
	  const myState = store.getState()
      return myState.length;
    },
	

    render : function() {
      return (
            React.createElement(ReactDataGrid, {
              ref: 'grid',
              enableCellSelect: true,
              columns: this.getColumns(),
              rowGetter: this.getRowAt,
              rowsCount: this.getSize(),
              onGridRowsUpdated: this.handleGridRowsUpdated,
              toolbar: React.createElement(Toolbar, {onAddRow: this.handleAddRow}),		  
              rowHeight: 50,
              minHeight: 500,
              rowScrollTimeout: 200,
              })
      );
    }
});
ReactDOM.render(React.createElement(Grid, null), document.getElementById('content'))