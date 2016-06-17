var Cell = React.createClass({displayName: 'component2',

    getInitialState : function(){
      var fakeRows = create2(1);
      return {rows :fakeRows};
    },
	
    getColumns2: function() {
      var clonedColumns = columns2.slice();
      clonedColumns[0].events = {
        onClick: function(ev, args) {
          var idx = args.idx;
          var rowIdx = args.rowIdx;
          this.refs.cell.openCellEditor(rowIdx, idx);
        }.bind(this)
      }
      return clonedColumns;
    },
	
	componentDidMount: function() {
		store.subscribe(() => this.forceUpdate());
	},
	
    handleGridRowsUpdated2 : function(updatedRowData) {

      for (var i = updatedRowData.fromRow; i <= updatedRowData.toRow; i++) {

		switch(updatedRowData.cellKey) {
			case 'space':
				action = changeSpace(updatedRowData.updated.space, i)
				break
			case 'a':
				if(Number.isNaN(Number(updatedRowData.updated.a))) {
					alert('Please enter a number')
					break
				}
				action = changeA(updatedRowData.updated.a, i)
				break
			case 'b':
				if(Number.isNaN(Number(updatedRowData.updated.b))) {
					alert('Please enter a number')
					break
				}
				action = changeBee(updatedRowData.updated.b, i)
				break
			case 'c':
				if(Number.isNaN(Number(updatedRowData.updated.c))) {
					alert('Please enter a number')
					break
				}
				action = changeC(updatedRowData.updated.c, i)
				break
			case 'alpha':
				if(Number.isNaN(Number(updatedRowData.updated.alpha))) {
						alert('Please enter a number')
						break
					}
				action = changeAlpha(updatedRowData.updated.alpha, i)
				break
			case 'beta':
				if(Number.isNaN(Number(updatedRowData.updated.beta))) {
					alert('Please enter a number')
					break
				}
				action = changeBeta(updatedRowData.updated.beta, i)
				break
			case 'gamma':
				if(Number.isNaN(Number(updatedRowData.updated.gamma))) {
					alert('Please enter a number')
					break
				}
				action = changeGamma(updatedRowData.updated.gamma, i)
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
	  const real = myState['myReducer2'];
      return real[index];
    },

    getSize2 : function() {
		const myState = store.getState();
		const real = myState['myReducer2'];
		return real.length;
    },
	
    render : function() {
      return (
            React.createElement(ReactDataGrid, {
              ref: 'cell',
              enableCellSelect: true,
              columns: this.getColumns2(),
              rowGetter: this.rowGetter,
              rowsCount: this.getSize2(),
              onGridRowsUpdated: this.handleGridRowsUpdated2,  
              rowHeight: 50,
              minHeight: 108,
              rowScrollTimeout: 200,
              })
      );
    }
});