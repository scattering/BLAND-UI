var Cell = React.createClass({displayName: 'component2',

    /*getInitialState : function(){
      var fakeRows = create2(1);
      return {rows :fakeRows};
    },*/

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

  	componentDidMount1: function() {
      document.getElementById('mybtn').style.visibility = "visible";
  		//store.subscribe(() => this.forceUpdate());
      store.subscribe(this.update);
  	},

    update: function() {
      if (this.isMounted()) {
        this.forceUpdate();
      }
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
    				break
    			case 'b':
    				if(Number.isNaN(Number(updatedRowData.updated.b))) {
    					alert('Please enter a number')
    					break
    				}
    				action = changeBee(updatedRowData.updated.b, i, tab)
    				break
    			case 'c':
    				if(Number.isNaN(Number(updatedRowData.updated.c))) {
    					alert('Please enter a number')
    					break
    				}
    				action = changeC(updatedRowData.updated.c, i, tab)
    				break
    			case 'alpha':
    				if(Number.isNaN(Number(updatedRowData.updated.alpha))) {
    						alert('Please enter a number')
    						break
    					}
    				action = changeAlpha(updatedRowData.updated.alpha, i, tab)
    				break
    			case 'beta':
    				if(Number.isNaN(Number(updatedRowData.updated.beta))) {
    					alert('Please enter a number')
    					break
    				}
    				action = changeBeta(updatedRowData.updated.beta, i, tab)
    				break
    			case 'gamma':
    				if(Number.isNaN(Number(updatedRowData.updated.gamma))) {
    					alert('Please enter a number')
    					break
    				}
    				action = changeGamma(updatedRowData.updated.gamma, i, tab)
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

    //handleMount: function() {
	     //document.getElementById('mybtn').style.visibility = "visible";
    //},

    render : function() {
      document.getElementById('inner').style.visibility = 'visible';
      document.getElementById('below').style.visibility = 'hidden';
      return (
      	//React.createElement("div", {id: 'main'},
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
                      componentDidMount: this.componentDidMount1()
                    })
                  /*React.createElement("div", {id: 'drop', style: { 'width': '300px', 'marginTop': '10px' }},
                    React.createElement(DropzoneComponent, {
                      config: componentConfig,
                      eventHandlers: eventHandlers,
                      djsConfig: djsConfig,
                      componentDidMount: this.componentDidMount2(),
                      //getDropzone: this.getDropzone()
                    })
                  )*/
      	//)
      );
    }
});


//document.getElementById('place').innerHTML += React.createElement("div", {id: 'drop', style: { 'width': '300px', 'marginTop': '10px'}})

/*ReactDOM.render(
  React.createElement("div", {id: 'lower'},
      React.createElement(DropzoneComponent,
      {
        config: componentConfig, eventHandlers: eventHandlers, djsConfig: djsConfig, componentDidMount: componentDidMount2()
      }),
      React.createElement("div", {id: 'lowest'}, 'Upload a .cif or .pcr file to fill in your unit cell and atomic information.')
), document.getElementById('inner'))*/
