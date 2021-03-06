var Cell = onClickOutside(React.createClass({displayName: 'component2',

    getColumns2: function() {
        var clonedColumns = columns2.slice();
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

  	componentDidMount1: function() {
      document.getElementById('mybtn').style.visibility = "visible";
  	},

  handleClickOutside: function (e) {
    this.refs.cell.deselectCells();
  },

    handleGridRowsUpdated2 : function(updatedRowData) {
      state = store.getState();
      tab = state['myReducer4']['Selected']
      for (var i = updatedRowData.fromRow; i <= updatedRowData.toRow; i++) {

    		switch(updatedRowData.cellKey) {
    			case 'space':
    				action = changeSpace(updatedRowData.updated.space, i, tab)
    				break
    			case 'a':
    				if(Number.isNaN(Number(updatedRowData.updated.a))) {
    					alert('Please enter a number')
    					break
    				}
    				action = changeA(updatedRowData.updated.a, i, tab)
            store.dispatch(removeFit('a' + (tab + 1)))
    				break
    			case 'b':
    				if(Number.isNaN(Number(updatedRowData.updated.b))) {
    					alert('Please enter a number')
    					break
    				}
    				action = changeBee(updatedRowData.updated.b, i, tab)
            store.dispatch(removeFit('b' + (tab + 1)))
    				break
    			case 'c':
    				if(Number.isNaN(Number(updatedRowData.updated.c))) {
    					alert('Please enter a number')
    					break
    				}
    				action = changeC(updatedRowData.updated.c, i, tab)
            store.dispatch(removeFit('c' + (tab + 1)))
    				break
    			case 'alpha':
    				if(Number.isNaN(Number(updatedRowData.updated.alpha))) {
    						alert('Please enter a number')
    						break
    					}
    				action = changeAlpha(updatedRowData.updated.alpha, i, tab)
            store.dispatch(removeFit('alpha' + (tab + 1)))
    				break
    			case 'beta':
    				if(Number.isNaN(Number(updatedRowData.updated.beta))) {
    					alert('Please enter a number')
    					break
    				}
    				action = changeBeta(updatedRowData.updated.beta, i, tab)
            store.dispatch(removeFit('beta' + (tab + 1)))
    				break
    			case 'gamma':
    				if(Number.isNaN(Number(updatedRowData.updated.gamma))) {
    					alert('Please enter a number')
    					break
    				}
    				action = changeGamma(updatedRowData.updated.gamma, i, tab)
            store.dispatch(removeFit('gamma' + (tab + 1)))
    				break
    			default:
    				action = doNothing()
    		}
    		store.dispatch(action)
      }
    },

    rowGetter : function(index){
        if (index < 0 || index > this.getSize2()){
          return undefined;
        }
  	    const myState = store.getState();
        tab = myState['myReducer4']['Selected']
  	    const real = myState['myReducer4']['Phases'][tab][1];
        return real[index];
    },

    getSize2 : function() {
		    const myState = store.getState();
        tab = myState['myReducer4']['Selected']
  	    const real = myState['myReducer4']['Phases'][tab][1];
		    return real.length;
    },

    render : function() {
      document.getElementById('inner').style.visibility = 'visible';
      document.getElementById('below').style.visibility = 'hidden';
      return (
          React.createElement(ReactDataGrid, {
              ref: 'cell',
              enableCellSelect: true,
              columns: this.getColumns2(),
              rowGetter: this.rowGetter,
              rowsCount: this.getSize2(),
              onGridRowsUpdated: this.handleGridRowsUpdated2,
              onClickOutside: this.handleClickOutside,
              rowHeight: 50,
              minHeight: 108,
              rowScrollTimeout: 200,
              componentDidMount: this.componentDidMount1()
          })
      );
    }
}));
