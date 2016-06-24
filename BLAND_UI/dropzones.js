var componentConfig1 = {
    iconFiletypes: ['.cif', '.cfl'],
    showFiletypeIcon: true,
    postUrl: 'http://localhost:8001/bland/upload/'
};

var djsConfig1 = {
    addRemoveLinks: true,
    thumbnailWidth: '200px',
    uploadMultiple: false,
    maxFiles: 1,
    dictDefaultMessage: "Upload a .cif or .cfl file for cell information."
};

var sending1 = function(f, xhr, formData) {
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
      console.log('Success');
      var json1 = JSON.parse(xhr.responseText)
      spaceGroup = space[json1[0] - 1]
      a = json1[1][0]
      b = json1[1][1]
      c = json1[1][2]
      alpha = json1[2][0]
      beta = json1[2][1]
      gamma = json1[2][2]
      store.dispatch(changeCell(spaceGroup, a, b, c, alpha, beta, gamma))
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

var successCallBack1 = function(f, response) {
    console.log('Success!');
}

var removeCallBack1 = function(f) {
  console.log('Removed');
  store.dispatch(changeCell('','','','','','',''));
  rows = store.getState()['myReducer'];
  for (var i = 0; i < rows.length; i++) {
    if(rows[i]['label'] !== '') {
      store.dispatch(changeWholeRow('','','','','','','','','', i))
    }
  }
}

var filesExceeded = function(f) {
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

ReactDOM.render(
  React.createElement("div", {id: 'drop1'},
      React.createElement(DropzoneComponent,
      {
        config: componentConfig1, eventHandlers: eventHandlers1, djsConfig: djsConfig1
      })
), document.getElementById('inner'))



var componentConfig2 = {
    iconFiletypes: ['.dat', '.txt'],
    showFiletypeIcon: true,
    postUrl: 'http://localhost:8001/bland/data/'
};

var djsConfig2 = {
    addRemoveLinks: true,
    thumbnailWidth: '200px',
    uploadMultiple: false,
    maxFiles: 1,
    dictDefaultMessage: "Upload a data file with observed data."
};

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
    error: null,
    processing: null,
    uploadprogress: null,
    sending: sending2,
    success: successCallBack2,
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

var sending2 = function(f, xhr, formData) {
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
        console.log("All groovy data");
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

ReactDOM.render(
  React.createElement("div", {id: 'drop2'},
      React.createElement(DropzoneComponent,
      {
        config: componentConfig2, eventHandlers: eventHandlers2, djsConfig: djsConfig2
      })
), document.getElementById('below'))
