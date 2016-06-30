var Instrument = React.createClass({displayName: 'component3',

    /*getInitialState : function(){
      var fakeRows = create3(1);
      return {rows :fakeRows};
    },*/

    getColumns3: function() {
      var clonedColumns = columns3.slice();
      /*clonedColumns[0].events = {
        onClick: function(ev, args) {
          var idx = args.idx;
          var rowIdx = args.rowIdx;
		  console.log(this.refs)
          this.refs.cell.openCellEditor(rowIdx, idx);
        }.bind(this)
      }*/
      return clonedColumns;
    },

	componentDidMount: function() {
    document.getElementById('below').style.visibility = 'visible';
		store.subscribe(this.update);
	},

  update: function() {
    if(this.isMounted()) {
      this.forceUpdate();
    }
  },

    handleGridRowsUpdated3 : function(updatedRowData) {

      for (var i = updatedRowData.fromRow; i <= updatedRowData.toRow; i++) {

		switch(updatedRowData.cellKey) {
			case 'scale':
				if(Number.isNaN(Number(updatedRowData.updated.scale))) {
					alert('Please enter a number')
					break
				}
				action = changeScale(updatedRowData.updated.scale, i)
				break
			case 'wavelength':
				if(Number.isNaN(Number(updatedRowData.updated.wavelength))) {
					alert('Please enter a number')
					break
				}
				action = changeWavelength(updatedRowData.updated.wavelength, i)
				break
			case 'u':
				if(Number.isNaN(Number(updatedRowData.updated.u))) {
					alert('Please enter a number')
					break
				}
				action = changeU(updatedRowData.updated.u, i)
				break
			case 'v':
				if(Number.isNaN(Number(updatedRowData.updated.v))) {
					alert('Please enter a number')
					break
				}
				action = changeV(updatedRowData.updated.v, i)
				break
			case 'w':
				if(Number.isNaN(Number(updatedRowData.updated.w))) {
						alert('Please enter a number')
						break
					}
				action = changeW(updatedRowData.updated.w, i)
				break
			case 'eta':
				if(Number.isNaN(Number(updatedRowData.updated.eta))) {
					alert('Please enter a number')
					break
				}
				action = changeEta(updatedRowData.updated.eta, i)
				break
			case 'zero':
				if(Number.isNaN(Number(updatedRowData.updated.zero))) {
					alert('Please enter a number')
					break
				}
				action = changeZero(updatedRowData.updated.zero, i)
				break
			case 'tmin':
				if(Number.isNaN(Number(updatedRowData.updated.tmin))) {
					alert('Please enter a number')
					break
				}
				action = changeTMin(updatedRowData.updated.tmin, i)
				break
			case 'tmax':
				if(Number.isNaN(Number(updatedRowData.updated.tmax))) {
					alert('Please enter a number')
					break
				}
				action = changeTMax(updatedRowData.updated.tmax, i)
				break
			default:
				action = doNothing()
		}
		//console.log('hmm')
		store.dispatch(action)
      }
    },

    rowGetter : function(index){
      if (index < 0 || index > this.getSize3()){
        return undefined;
      }
	  const myState = store.getState();
	  const real = myState['myReducer3'];
    return real[index];
    },

    getSize3 : function() {
		const myState = store.getState();
	  const real = myState['myReducer3'];
		return real.length;
    },

    handleMount: function() {
	     document.getElementById('mybtn').style.visibility = "visible";
    },

    render : function() {
      document.getElementById('inner').style.visibility = 'hidden';
      document.getElementById('below').style.visibility = 'visible';
      return (
	    React.createElement(ReactDataGrid, {
	      ref: 'cell',
	      enableCellSelect: true,
	      columns: this.getColumns3(),
	      rowGetter: this.rowGetter,
	      rowsCount: this.getSize3(),
	      onGridRowsUpdated: this.handleGridRowsUpdated3,
	      rowHeight: 50,
	      minHeight: 108,
	      rowScrollTimeout: 200,
	      componentDidMount: this.handleMount(),
	      })
      );
    }
});
