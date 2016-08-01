var Instrument = onClickOutside(React.createClass({displayName: 'component3',

    getColumns3: function() {
      var clonedColumns = columns3.slice();
      clonedColumns.map((col, idx) => {
        col.events = {
          onClick: function(ev, args) {
            var idx = args.idx;
            var rowIdx = args.rowIdx;
            this.refs.cell.openCellEditor(rowIdx, idx);
          }.bind(this)
        }
      })
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

  handleClickOutside: function (e) {
    this.refs.cell.deselectCells();
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
        store.dispatch(removeFit('scale'))
				break
			case 'wavelength':
				if(Number.isNaN(Number(updatedRowData.updated.wavelength))) {
					alert('Please enter a number')
					break
				}
				action = changeWavelength(updatedRowData.updated.wavelength, i)
        store.dispatch(removeFit('wavelength'))
				break
			case 'u':
				if(Number.isNaN(Number(updatedRowData.updated.u))) {
					alert('Please enter a number')
					break
				}
				action = changeU(updatedRowData.updated.u, i)
        store.dispatch(removeFit('u'))
				break
			case 'v':
				if(Number.isNaN(Number(updatedRowData.updated.v))) {
					alert('Please enter a number')
					break
				}
				action = changeV(updatedRowData.updated.v, i)
        store.dispatch(removeFit('v'))
				break
			case 'w':
				if(Number.isNaN(Number(updatedRowData.updated.w))) {
						alert('Please enter a number')
						break
					}
				action = changeW(updatedRowData.updated.w, i)
        store.dispatch(removeFit('w'))
				break
			case 'eta':
				if(Number.isNaN(Number(updatedRowData.updated.eta))) {
					alert('Please enter a number')
					break
				}
				action = changeEta(updatedRowData.updated.eta, i)
        store.dispatch(removeFit('eta'))
				break
			case 'zero':
				if(Number.isNaN(Number(updatedRowData.updated.zero))) {
					alert('Please enter a number')
					break
				}
				action = changeZero(updatedRowData.updated.zero, i)
        store.dispatch(removeFit('zero'))
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
      case 'mode':
        action = changeMode(updatedRowData.updated.mode, i)
        if(updatedRowData.updated.mode !== '') {
          document.getElementById("drop2").style.display = 'inline'
        }
        else {
          document.getElementById("drop2").style.display = 'none'
        }
        break
			default:
				action = doNothing()
		}
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
      document.getElementById('drop3').style.visibility = 'hidden';
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
}));
