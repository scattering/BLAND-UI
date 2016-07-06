var componentConfig1 = {
    iconFiletypes: ['.cif', '.cfl'],
    showFiletypeIcon: true,
    postUrl: 'http://localhost:8001/bland/upload/'
};

var djsConfig1 = {
    addRemoveLinks: true,
    thumbnailWidth: '200px',
    uploadMultiple: false,
    maxFiles: num,
    dictDefaultMessage: "Upload a .cif or .cfl file for cell information."
};

var sending1 = function(f, xhr, formData) {
  tab = store.getState()['myReducer4']['Selected']
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
      console.log('Success');
      var json2 = JSON.parse(xhr.responseText)
      console.log(json2)
      spaceGroup = space[json2[0] - 1]
      a = json2[1][0]
      b = json2[1][1]
      c = json2[1][2]
      alpha = json2[2][0]
      beta = json2[2][1]
      gamma = json2[2][2]
      store.dispatch(changeCell(spaceGroup, a, b, c, alpha, beta, gamma, tab))
      select = tab;
      state = store.getState()
      console.log(state['myReducer4']['Phases'][tab][0].length)
      for(i = 3; i < json2.length; i++) {
          if((i - 3) >= state['myReducer4']['Phases'][tab][0].length) {
            //console.log('pre add row')
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
            //console.log('pre dispatch')
            store.dispatch(addRow(newRow, tab))
            //console.log('adding row')
          }
          atm = json2[i]
          label = atm[0]
          element = atm[1]
          atomNum = atm[5]
          atom = atoms[atomNum - 1]
          //valence = valences[0]
          //isotope = isotopes[0]
          position = atm[2]
          x = position[0]
          y = position[1]
          z = position[2]
          occupancy = atm[3]
          thermal = atm[4]
          //console.log('changing row')
          store.dispatch(changeWholeRow(label, atom, x, y, z, occupancy, thermal, i - 3, tab))
          //console.log('finished row')
      }
    }
    else {
      console.log('Whoops');
      console.log(xhr.status);
    }
  }
}

var successCallBack1 = function(f, response) {
    console.log('Success!');
}

var removeCallBack1 = function(f) {
  console.log('Removed');
  //tab = store.getState()['myReducer4']['Selected']
  store.dispatch(changeCell('','','','','','','', select));
  rows = store.getState()['myReducer4']['Phases'][select][0];
  for (var i = 0; i < rows.length; i++) {
    if(rows[i]['label'] !== '') {
      store.dispatch(changeWholeRow('','','','','','','','','', i, select))
    }
  }
}

var filesExceeded1 = function(f) {
    alert("Sorry, you can only add one file.");
}

var eventHandlers1 = {
    // All of these receive the event as first parameter:
    drop: null,
    dragstart: null,
    dragend: null,
    dragenter: null,
    dragover: null,
    dragleave: null,
    // All of these receive the file as first parameter:
    addedfile: null,
    removedfile: removeCallBack1,
    thumbnail: null,
    error: null,
    processing: null,
    uploadprogress: null,
    sending: sending1,
    success: successCallBack1,
    complete: null,
    canceled: null,
    maxfilesreached: null,
    maxfilesexceeded: filesExceeded1,
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

ReactDOM.render(
  React.createElement("div", {id: 'drop1'},
      React.createElement(DropzoneComponent,
      {
        config: componentConfig1, eventHandlers: eventHandlers1, djsConfig: djsConfig1
      })
), document.getElementById('inner'));



var componentConfig2 = {
    iconFiletypes: ['.dat', '.txt'],
    showFiletypeIcon: true,
    postUrl: 'http://localhost:8001/bland/data/'
};

var djsConfig2 = {
    addRemoveLinks: true,
    //thumbnailWidth: '200px',
    uploadMultiple: false,
    maxFiles: 1,
    dictDefaultMessage: "Upload a data file with observed data."
};

var filesExceeded2 = function(f) {
    alert("Sorry, you can only add one file.");
}

var sending2 = function(f, xhr, formData) {
  console.log("sending")
  state = store.getState();
  mode = state['myReducer3'][0]['mode'];
  formData.append('mode', mode);
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
        console.log("All groovy data");
        const json2 = JSON.parse(xhr.responseText);
        //data = []
        for(i = 0; i < json2[0].length; i++) {
          data.push([json2[0][i], (json2[1][i] - 219), {"yupper": (json2[1][i]+json2[2][i] - 219), "xupper": json2[0][i], "ylower": (json2[1][i]-json2[2][i] - 219), "xlower": json2[0][i]}])
        }
        data = [[data]]
        observed = true
        //console.log(data)
        console.log(json2);
        tt = json2[0];
        tMin = tt[0];
        tMax = tt[tt.length - 1];
        console.log('min '+tMin+' max '+tMax);
        tab = store.getState()['myReducer4']['Selected']
        store.dispatch(changeTMin(tMin, 0, tab));
        store.dispatch(changeTMax(tMax, 0, tab));
    }
    else {
      console.log("Status is " + xhr.status)
    }
  }
}

var successCallBack2 = function(f, response) {
    console.log('Success! data');
}

var removeCallBack2 = function(f) {
  console.log('Removed data');
  store.dispatch(changeTMin('', 0));
  store.dispatch(changeTMax('', 0))
  //store.dispatch(changeCell('','','','','','',''));
  //rows = store.getState()['myReducer'];
  //for (var i = 0; i < rows.length; i++) {
    //if(rows[i]['label'] !== '') {
      //store.dispatch(changeWholeRow('','','','','','','','','', i))
    //}
  //}
}

var errorHandle = function(f, errorMessage, xhr) {
  console.log('Error is ' + errorMessage + '. Status is ' + xhr.status)
}

var eventHandlers2 = {
    // All of these receive the event as first parameter:
    drop: null,
    dragstart: null,
    dragend: null,
    dragenter: null,
    dragover: null,
    dragleave: null,
    // All of these receive the file as first parameter:
    addedfile: null,
    removedfile: removeCallBack2,
    thumbnail: null,
    error: errorHandle,
    processing: null,
    uploadprogress: null,
    sending: sending2,
    success: successCallBack2,
    complete: null,
    canceled: null,
    maxfilesreached: null,
    maxfilesexceeded: filesExceeded2,
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

ReactDOM.render(
  React.createElement("div", {id: 'drop2'},
    React.createElement(DropzoneComponent,
    {
      config: componentConfig2, eventHandlers: eventHandlers2, djsConfig: djsConfig2
    })
), document.getElementById('below'))
