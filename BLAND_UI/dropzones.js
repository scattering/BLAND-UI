var componentConfig1 = {
    iconFiletypes: ['.cif', '.cfl'],
    showFiletypeIcon: true,
    postUrl: location.origin + '/bland/upload/'
};

var djsConfig1 = {
    addRemoveLinks: true,
    thumbnailWidth: '200px',
    uploadMultiple: false,
    maxFiles: store.getState()['myReducer4']['Phases'].length,
    dictDefaultMessage: "Upload a .cif or .cfl file for cell information."
};

var sending1 = function(f, xhr, formData) {
  tab = store.getState()['myReducer4']['Selected']
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
      console.log('Success');
      var json2 = JSON.parse(xhr.responseText)
      if(json2[0] !== 0) {
        spaceGroup = space[json2[0]]
        a = json2[1][0]
        b = json2[1][1]
        c = json2[1][2]
        alpha = json2[2][0]
        beta = json2[2][1]
        gamma = json2[2][2]
        store.dispatch(changeCell(spaceGroup, a, b, c, alpha, beta, gamma, tab))
        store.dispatch(removeFit('a' + (tab + 1)))
        store.dispatch(removeFit('b' + (tab + 1)))
        store.dispatch(removeFit('c' + (tab + 1)))
        store.dispatch(removeFit('alpha' + (tab + 1)))
        store.dispatch(removeFit('beta' + (tab + 1)))
        store.dispatch(removeFit('gamma' + (tab + 1)))

        select = tab;
        state = store.getState()
        for(i = 3; i < json2.length; i++) {
            if((i - 3) >= state['myReducer4']['Phases'][tab][0].length) {
              var newRow = {
            		label: '',
            		atom: '',
            		x : '',
            		y : '',
            		z : '',
            		occupancy : '',
            		thermal : ''
        		  };
              store.dispatch(addRow(newRow, tab))
            }
            atm = json2[i]
            label = atm[0]
            element = atm[1]
            atomNum = atm[5]
            atom = atoms[atomNum]
            position = atm[2]
            x = position[0]
            y = position[1]
            z = position[2]
            occupancy = atm[3]
            thermal = atm[4]
            store.dispatch(changeWholeRow(label, atom, x, y, z, occupancy, thermal, i - 3, tab))
            store.dispatch(removeFit('row' + (i - 3) + 'x' + (tab + 1)))
            store.dispatch(removeFit('row' + (i - 3) + 'y' + (tab + 1)))
            store.dispatch(removeFit('row' + (i - 3) + 'z' + (tab + 1)))
            store.dispatch(removeFit('row' + (i - 3) + 'occupancy' + (tab + 1)))
            store.dispatch(removeFit('row' + (i - 3) + 'thermal' + (tab + 1)))

        }
        document.getElementById('drop1').childNodes[0].dropzone.files[tab]['selected'] = tab
      }
      else {
        alert('Invalid file, please upload a different file.')
        f['rem'] = true;
        document.getElementById('drop1').childNodes[0].dropzone.removeFile(f);
      }
    }
    else {
      console.log(xhr.status);
    }
  }
}

var successCallBack1 = function(f, response) {
    console.log('Success!');
}

var removeCallBack1 = function(f) {
  console.log('Removed');
  select = f.selected
  if(typeof f.rem === 'undefined') {
    store.dispatch(changeCell('','','','','','','', select));
    store.dispatch(removeFit('a' + (select + 1)))
    store.dispatch(removeFit('b' + (select + 1)))
    store.dispatch(removeFit('c' + (select + 1)))
    store.dispatch(removeFit('alpha' + (select + 1)))
    store.dispatch(removeFit('beta' + (select + 1)))
    store.dispatch(removeFit('gamma' + (select + 1)))

    rows = store.getState()['myReducer4']['Phases'][select][0];
    for (var i = 0; i < rows.length; i++) {
      if(rows[i]['label'] !== '') {
        store.dispatch(changeWholeRow('','','','','','','', i, select))
        store.dispatch(removeFit('row' + i + 'x' + (select + 1)))
        store.dispatch(removeFit('row' + i + 'y' + (select + 1)))
        store.dispatch(removeFit('row' + i + 'z' + (select + 1)))
        store.dispatch(removeFit('row' + i + 'occupancy' + (select + 1)))
        store.dispatch(removeFit('row' + i + 'thermal' + (select + 1)))
      }
    }
  }
  console.log(store.getState())
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
    postUrl: location.origin + '/bland/data/'
};

var djsConfig2 = {
    addRemoveLinks: true,
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
        //console.log(xhr.responseText)
        if(xhr.responseText === 'Sorry, this didn\'t work') {
          //console.log('caught')
          f['rem'] = true;
          document.getElementById('drop2').childNodes[0].dropzone.removeFile(f);
          alert('Sorry, the upload was unsuccessful. Please submit a different data file and/or mode.')
        }
        else if(xhr.responseText === 'Key error') {
          //console.log('caught')
          f['rem'] = true;
          document.getElementById('drop2').childNodes[0].dropzone.removeFile(f);
          alert('Sorry, the upload was unsuccessful. Please try uploading the file again.')
        }
        else {
          const json2 = JSON.parse(xhr.responseText);
          if(json2[0].length === 0 || json2[1].length === 0 || json2[2].length === 0) {
            //console.log('uncaught')
            f['rem'] = true;
            document.getElementById('drop2').childNodes[0].dropzone.removeFile(f);
            alert('Sorry, the upload was unsuccessful. Please submit a different data file and/or mode.')
          }
          else {
            var tt = json2[0];
            var obs = json2[1];
            var error = json2[2];
            store.dispatch(changeObserved(tt, obs, error))
            tMin = tt[0];
            tMax = tt[tt.length - 1];
            tab = store.getState()['myReducer4']['Selected']
            store.dispatch(changeTMin(tMin, 0, tab));
            store.dispatch(changeTMax(tMax, 0, tab));
          }
        }
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
    error: null,
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
  React.createElement("div", {style: {display: 'none'}, id: 'drop2'},
    React.createElement(DropzoneComponent,
    {
      config: componentConfig2, eventHandlers: eventHandlers2, djsConfig: djsConfig2
    })
), document.getElementById('below'))


var componentConfig3 = {
    iconFiletypes: ['.json'],
    showFiletypeIcon: true,
    postUrl: location.origin + '/bland/passing/'
};

var djsConfig3 = {
    addRemoveLinks: true,
    acceptedFiles: "application/json",
    uploadMultiple: false,
    maxFiles: 1,
    dictDefaultMessage: "Upload a parameter file from a previous fit."
};

var sending3 = function (f, xhr, formData) {
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
      var json = JSON.parse(xhr.responseText)
      var rows_dict = {}
      var other_dict = {}
      for(var it in json['param_list']) {
        var temp = json['param_list'][it].split(" ");
        var value = json['params'][it]
        if(temp.length === 3) {
          var label = temp[0]
          var field = temp[2]
          if(rows_dict.hasOwnProperty(label)) {
            rows_dict[label][field] = value
          }
          else {
            rows_dict[label] = {}
            rows_dict[label][field] = value
          }
        }
        else {
          var label = null
          var field = temp[0]
          other_dict[field] = value
        }
      }
      var idx = 0
      var existing = false
      var tab = store.getState()['myReducer4']['Selected'];
      for(var item in rows_dict) {
        for(var row in store.getState()['myReducer4']['Phases'][tab][0]) {
          if(store.getState()['myReducer4']['Phases'][tab][0][row]['label'] === item) {
            idx = row
            existing = true
          }
        }
        store.dispatch(changeLabel(item, idx, tab))
        for(var param in rows_dict[item]) {
          switch(param) {
          case 'x':
            store.dispatch(changeX(rows_dict[item][param], idx, tab))
            break
          case 'y':
            store.dispatch(changeY(rows_dict[item][param], idx, tab))
            break
          case 'z':
            store.dispatch(changeZ(rows_dict[item][param], idx, tab))
            break
          case 'occ':
            store.dispatch(changeOccupancy(rows_dict[item][param], idx, tab))
            break
          case 'B':
            store.dispatch(changeB(rows_dict[item][param], idx, tab))
            break
          default:
            break
          }
        }
        if(!existing) {
          idx += 1;
        }
      }
      for(var other in other_dict) {
        switch(other) {
          case 'a':
            store.dispatch(changeA(other_dict[other], 0, tab))
            break
          case 'b':
            store.dispatch(changeBee(other_dict[other], 0, tab))
            break
          case 'c':
            store.dispatch(changeC(other_dict[other], 0, tab))
            break
          case 'alpha':
            store.dispatch(changeAlpha(other_dict[other], 0, tab))
            break
          case 'beta':
            store.dispatch(changeBeta(other_dict[other], 0, tab))
            break
          case 'gamma':
            store.dispatch(changeGamma(other_dict[other], 0, tab))
            break
          case 'scale':
            store.dispatch(changeScale(other_dict[other], 0))
            break
          case 'zero':
            store.dispatch(changeZero(other_dict[other], 0))
            break
          case 'eta':
            store.dispatch(changeEta(other_dict[other], 0))
            break
          case 'u':
            store.dispatch(changeW(other_dict[other], 0))
            break
          case 'v':
            store.dispatch(changeV(other_dict[other], 0))
            break
          case 'w':
            store.dispatch(changeW(other_dict[other], 0))
            break
          default:
            break
        }
      }
    }
  }
}

var eventHandlers3 = {
    // All of these receive the event as first parameter:
    drop: null,
    dragstart: null,
    dragend: null,
    dragenter: null,
    dragover: null,
    dragleave: null,
    // All of these receive the file as first parameter:
    addedfile: null,
    removedfile: null,
    thumbnail: null,
    error: null,
    processing: null,
    uploadprogress: null,
    sending: sending3,
    success: null,
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

ReactDOM.render(React.createElement('div', {id: 'drop3', style: {visibility: 'hidden'}},
  React.createElement(DropzoneComponent,
    {
      config: componentConfig3, eventHandlers: eventHandlers3, djsConfig: djsConfig3
    })
), document.getElementById('upload'))
