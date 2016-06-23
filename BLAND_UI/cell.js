var componentDidMount2 = function() {
  state = store.getState()
  //if(state['myReducer4'][0]) {
    //document.getElementById('confirm').style.visibility = 'visible';
    //document.getElementById('btn2').style.visibility = 'visible';
  //}
  //console.log(state['myReducer4'])
  //console.log("hello world")
  //console.log(this)
  //drop = getDropzone()
  //console.log(drop)
}


var componentConfig = {
    //iconFiletypes: ['.gif', '.dat'],
    //showFiletypeIcon: false,
    postUrl: 'http://localhost:8001/polls/upload/'
};

var djsConfig = {
    addRemoveLinks: true,
    //acceptedFiles: "image/gif,application/plain",
    thumbnailWidth: '200px',
    uploadMultiple: false,
    maxFiles: 1
};

var callbackArray = [
    function(e) {
        console.log('Look Ma, I\'m a callback in an array!');
    },
    function(e) {
        console.log('Wooooow!');
    }
];

var simpleCallBack = function(f) {
    console.log('I\'m a simple callback');
};

var sending = function(f, xhr, formData) {
  //console.log('Huh')
  //console.log(f.name)
  formData.append('file_size', f.size)
  //xhr.setRequestHeader("Content-Type", "multipart/form-data");
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
      console.log('Success');
      //console.log(xhr.responseText)
      //console.log(xhr.responseText[0])
      var json1 = JSON.parse(xhr.responseText)
      //console.log(json1[0])
      spaceGroup = space[json1[0] - 1]
      a = json1[1][0]
      b = json1[1][1]
      c = json1[1][2]
      //console.log([a, b, c])
      alpha = json1[2][0]
      beta = json1[2][1]
      gamma = json1[2][2]
      store.dispatch(changeCell(spaceGroup, a, b, c, alpha, beta, gamma))
      //console.log([alpha,beta,gamma])
      //console.log(json1.length)
      console.log('between cell and grid')
      for(i = 3; i < json1.length; i++) {
          atm = json1[i]
          label = atm[0]
          element = atm[1]
          atomNum = atm[5]
          atom = atoms[atomNum - 1]
          valence = valences[0]
          isotope = isotopes[0]
          position = atm[2]
          x = position[0]
          y = position[1]
          z = position[2]
          occupancy = atm[3]
          thermal = atm[4]
          store.dispatch(changeWholeRow(label, atom, valence, isotope, x, y, z, occupancy, thermal, i - 3))
      }
    }
    else {
      console.log('Whoops');
      console.log(xhr.status);
    }
  }
}

var successCallBack = function(f, response) {
    console.log('Success!');
    //console.log(response)
    //action = addFile(f.name)
    //store.dispatch(action)
    state = store.getState()
    //my = state['myReducer4']
    //console.log(my)
    //console.log(document)
    document.getElementById('lowest').innerHTML = 'Your file has been uploaded'
}

var removeCallBack = function(f) {
  console.log('Removed');
  //action = removeFile()
  //store.dispatch(action)
  state = store.getState()
  //my = state['myReducer4']
  //console.log(my)
  //console.log(f)
  store.dispatch(changeCell('','','','','','',''));
  rows = store.getState()['myReducer'];
  for (var i = 0; i < rows.length; i++) {
    if(rows[i]['label'] !== '') {
      store.dispatch(changeWholeRow('','','','','','','','','', i))
    }
  }
  document.getElementById('lowest').innerHTML = 'Upload a .cif or .pcr file to fill in your unit cell and atomic information.'
  //document.getElementById('confirm').style.visibility = 'hidden'
  //document.getElementById('btn2').style.visibility = 'hidden'
}

var filesExceeded = function(f) {
    alert("Sorry, you can only add one file.");
}

var eventHandlers = {
    // All of these receive the event as first parameter:
    drop: callbackArray,
    dragstart: null,
    dragend: null,
    dragenter: null,
    dragover: null,
    dragleave: null,
    // All of these receive the file as first parameter:
    addedfile: simpleCallBack,
    removedfile: removeCallBack,
    thumbnail: null,
    error: null,
    processing: null,
    uploadprogress: null,
    sending: sending,
    success: successCallBack,
    complete: null,
    canceled: null,
    maxfilesreached: null,
    maxfilesexceeded: filesExceeded,
    // All of these receive a list of files as first parameter
    // and are only called if the uploadMultiple option
    // in djsConfig is true:
    processingmultiple: null,
    sendingmultiple: null,
    successmultiple: null,
    completemultiple: null,
    canceledmultiple: null,
    // Special Events
    totaluploadprogress: null,
    reset: null,
    queuecompleted: null
};

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

    comp: function() {
      state = store.getState()
      //if(state['myReducer4'][0] !== '') {
        //console.log(document)
        //document.getElementById('confirm').style.visibility = "visible";
        //document.getElementById('btn2').style.visibility = "visible"
      //}
      console.log("my name is drop")
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

    //handleMount: function() {
	     //document.getElementById('mybtn').style.visibility = "visible";
    //},

    render : function() {
      document.getElementById('inner').style.visibility = 'visible';
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

ReactDOM.render(
  React.createElement("div", {id: 'lower'},
      React.createElement(DropzoneComponent,
      {
        config: componentConfig, eventHandlers: eventHandlers, djsConfig: djsConfig, componentDidMount: componentDidMount2()
      }),
      React.createElement("div", {id: 'lowest'}, 'Upload a .cif or .pcr file to fill in your unit cell and atomic information.')
), document.getElementById('inner'))
