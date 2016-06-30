var onLoad = function() {
  console.log("Hello wor!")
  chart = xyChart({show_line: true, show_errorbars: true, ytransform: 'log'})
  data = [{"title": "NTO149116: 700 mT, STO/NTO/STO/LSAT, NTO149", "type": "1d", "clear_existing": true, "data": [[[0.020011442133166402, 68.0, {"yupper": 76.761355820929154, "xupper": 0.020011442133166402, "ylower": 60.238644179070846, "xlower": 0.020011442133166402}], [0.021011070258514526, 57.0, {"yupper": 65.066372975210783, "xupper": 0.021011070258514526, "ylower": 49.933627024789224, "xlower": 0.021011070258514526}], [0.022010695383871869, 42.0, {"yupper": 49.0, "xupper": 0.022010695383871869, "ylower": 36.0, "xlower": 0.022010695383871869}], [0.023010317366368438, 37.0, {"yupper": 43.603277807866853, "xupper": 0.023010317366368438, "ylower": 31.396722192133147, "xlower": 0.023010317366368438}], [0.024012244647805742, 33.0, {"yupper": 39.266281297335397, "xupper": 0.024012244647805742, "ylower": 27.733718702664603, "xlower": 0.024012244647805742}], [0.025009551332627295, 22.0, {"yupper": 27.216990566028301, "xupper": 0.025009551332627295, "ylower": 17.783009433971699, "xlower": 0.025009551332627295}]], [[0.020011442133166402, 5.0, {"yupper": 7.7912878474779195, "xupper": 0.020011442133166402, "ylower": 3.2087121525220801, "xlower": 0.020011442133166402}], [0.021011070258514526, 3.0, {"yupper": 5.3027756377319948, "xupper": 0.021011070258514526, "ylower": 1.6972243622680054, "xlower": 0.021011070258514526}], [0.022010695383871869, 1.0, {"yupper": 2.6180339887498949, "xupper": 0.022010695383871869, "ylower": 0.3819660112501051, "xlower": 0.022010695383871869}], [0.023010317366368438, 5.0, {"yupper": 7.7912878474779195, "xupper": 0.023010317366368438, "ylower": 3.2087121525220801, "xlower": 0.023010317366368438}], [0.024012244647805742, 3.0, {"yupper": 5.3027756377319948, "xupper": 0.024012244647805742, "ylower": 1.6972243622680054, "xlower": 0.024012244647805742}], [0.025009551332627295, 2.0, {"yupper": 4.0, "xupper": 0.025009551332627295, "ylower": 1.0, "xlower": 0.025009551332627295}]], [[0.020011442133166402, 2.0, {"yupper": 4.0, "xupper": 0.020011442133166402, "ylower": 1.0, "xlower": 0.020011442133166402}], [0.021011070258514526, 4.0, {"yupper": 6.5615528128088307, "xupper": 0.021011070258514526, "ylower": 2.4384471871911697, "xlower": 0.021011070258514526}], [0.022010695383871869, 4.0, {"yupper": 6.5615528128088307, "xupper": 0.022010695383871869, "ylower": 2.4384471871911697, "xlower": 0.022010695383871869}], [0.023010317366368438, 0.0, {"yupper": 1.0, "xupper": 0.023010317366368438, "ylower": 0.0, "xlower": 0.023010317366368438}], [0.024012244647805742, 3.0, {"yupper": 5.3027756377319948, "xupper": 0.024012244647805742, "ylower": 1.6972243622680054, "xlower": 0.024012244647805742}], [0.025009551332627295, 1.0, {"yupper": 2.6180339887498949, "xupper": 0.025009551332627295, "ylower": 0.3819660112501051, "xlower": 0.025009551332627295}]], [[0.020011442133166402, 79.0, {"yupper": 88.402246907382434, "xupper": 0.020011442133166402, "ylower": 70.597753092617566, "xlower": 0.020011442133166402}], [0.021011070258514526, 65.0, {"yupper": 73.577747210701759, "xupper": 0.021011070258514526, "ylower": 57.422252789298241, "xlower": 0.021011070258514526}], [0.022010695383871869, 41.0, {"yupper": 47.922616289332566, "xupper": 0.022010695383871869, "ylower": 35.077383710667434, "xlower": 0.022010695383871869}], [0.023010317366368438, 31.0, {"yupper": 37.090169943749473, "xupper": 0.023010317366368438, "ylower": 25.909830056250527, "xlower": 0.023010317366368438}], [0.024012244647805742, 29.0, {"yupper": 34.908326913195985, "xupper": 0.024012244647805742, "ylower": 24.091673086804015, "xlower": 0.024012244647805742}], [0.025009551332627295, 25.0, {"yupper": 30.524937810560445, "xupper": 0.025009551332627295, "ylower": 20.475062189439555, "xlower": 0.025009551332627295}]]], "options": {"cursor": {"tooltipLocation": "se", "tooltipOffset": 0, "show": true}, "series": [{"label": "DOWN_DOWN"}, {"label": "UP_DOWN"}, {"label": "DOWN_UP"}, {"label": "UP_UP"}], "axes": {"xaxis": {"label": "q.z"}, "yaxis": {"label": "counter.liveROI"}}, "legend": {"placement": "se", "show": true}}, "metadata": {"temp": "199.513 K", "point": "24 of 324", "trajectory": "spec2", "experimentDesc": "", "experimentID": "21166", "instrument": "PBR", "participants": "kirby", "eta": "19:57 09/15/15", "pointTime": "13:09 09/15/15"}}]
  c = d3.select("#plot1")
    .data([data[0].data])
    .call(chart);
  chart
    .options(data[0].options)
    .update();
}

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
      spaceGroup = space[json2[0] - 1]
      a = json2[1][0]
      b = json2[1][1]
      c = json2[1][2]
      alpha = json2[2][0]
      beta = json2[2][1]
      gamma = json2[2][2]
      store.dispatch(changeCell(spaceGroup, a, b, c, alpha, beta, gamma, tab))
      select = tab;
      for(i = 3; i < json2.length; i++) {
          atm = json2[i]
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
          store.dispatch(changeWholeRow(label, atom, valence, isotope, x, y, z, occupancy, thermal, i - 3, tab))
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
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
        console.log("All groovy data");
        const json2 = JSON.parse(xhr.responseText);
        //data = []
        for(i = 0; i < json2[0].length; i++) {
          data.push([json2[0][i], json2[1][i], {"yupper": (json2[1][i]+json2[2][i]), "xupper": json2[0][i], "ylower": (json2[1][i]-json2[2][i]), "xlower": json2[0][i]}])
        }
        data = [[data]]
        //console.log(data)
        //console.log(json2);
        tt = json2[0];
        tMin = tt[0];
        tMax = tt[tt.length - 1];
        //console.log('min '+tMin+' max '+tMax);
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
