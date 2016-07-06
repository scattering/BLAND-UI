var Fit = React.createClass({displayName: "fit",

  render: function() {
    console.log(store.getState());
    //console.log(store.getState()['myReducer4']['Phases'][0][1][0]['space'])
    state = store.getState();
    document.getElementById('inner').style.visibility = 'hidden';
		document.getElementById('below').style.visibility = 'hidden';
    console.log(typeof state['myReducer3'][0]['zero'])
    return (
      React.createElement("div", null,
        React.createElement("center", {style: {marginBottom: 15}}, "Instrument"),
        React.createElement("center", null,
          !!state['myReducer3'][0]['scale'] && React.createElement("span", {style: {marginRight: 30}}, 'Scale Factor: ' + state['myReducer3'][0]['scale']),
          !!state['myReducer3'][0]['wavelength'] && React.createElement("span", {style: {marginRight: 30}}, 'Wavelength: ' + state['myReducer3'][0]['wavelength']),
          !!state['myReducer3'][0]['u'] && React.createElement("span", {style: {marginRight: 30}}, 'u: ' + state['myReducer3'][0]['u']),
          !!state['myReducer3'][0]['v'] && React.createElement("span", {style: {marginRight: 30}}, 'v: ' + state['myReducer3'][0]['v']),
          !!state['myReducer3'][0]['w'] && React.createElement("span", {style: {marginRight: 30}}, 'w: ' + state['myReducer3'][0]['w']),
          !!state['myReducer3'][0]['eta'] && React.createElement("span", {style: {marginRight: 30}}, 'Eta: ' + state['myReducer3'][0]['eta']),
          !!state['myReducer3'][0]['zero'] && React.createElement("span", {style: {marginRight: 30}}, 'Zero: ' + state['myReducer3'][0]['zero']),
          !!state['myReducer3'][0]['tmin'] &&  React.createElement("span", {style: {marginRight: 30}}, 'TMin: ' + state['myReducer3'][0]['tmin']),
          !!state['myReducer3'][0]['tmax'] && React.createElement("span", {style: {marginRight: 30}}, 'TMax: ' + state['myReducer3'][0]['tmax']),
          !!state['myReducer3'][0]['mode'] && React.createElement("span", null, 'Mode: ' + state['myReducer3'][0]['mode'])
        ),
        React.createElement("div", null,
          state['myReducer4']['Phases'].map((phase, i) => {
            console.log(phase[1][0])
            return (
              React.createElement("div", null,
                React.createElement("center", {style: {marginTop: 15}}, "Phase " + (i + 1)),
                React.createElement("center", {style: {marginTop: 15, marginBottom: 15}}, "Unit Cell"),
                React.createElement("center", null,
                  !!phase[1][0]['space'] && React.createElement("span", {style: {marginRight: 30}}, 'Space Group: ' + phase[1][0]['space']),
                  !!phase[1][0]['a'] && React.createElement("span", {style: {marginRight: 30}}, 'a: ' + phase[1][0]['a']),
                  !!phase[1][0]['b'] && React.createElement("span", {style: {marginRight: 30}}, 'b: ' + phase[1][0]['b']),
                  !!phase[1][0]['c'] && React.createElement("span", {style: {marginRight: 30}}, 'c: ' + phase[1][0]['c']),
                  !!phase[1][0]['alpha'] && React.createElement("span", {style: {marginRight: 30}}, 'Alpha: ' + phase[1][0]['alpha']),
                  !!phase[1][0]['beta'] && React.createElement("span", {style: {marginRight: 30}}, 'Beta: ' + phase[1][0]['beta']),
                  !!phase[1][0]['gamma'] && React.createElement("span", null, 'Gamma: ' + phase[1][0]['gamma'])
                ),
                React.createElement("center", {style: {marginTop: 15, marginBottom: 15}}, "Atoms"),
                React.createElement("div", null,
                  phase[0].map((row, i) => {
                    console.log(typeof row['occupancy'])
                    return (
                      React.createElement("center", null,
                        (row['label'] !== '') && React.createElement("span", {style: {marginRight: 30}}, 'Label: ' + row['label']),
                        (row['atom'] !== '') && React.createElement("span", {style: {marginRight: 30}}, 'Element: ' + row['atom']),
                        (row['x'] !== '') && React.createElement("span", {style: {marginRight: 30}}, 'x: ' + row['x']),
                        (row['y'] !== '') && React.createElement("span", {style: {marginRight: 30}}, 'y: ' + row['y']),
                        (row['z'] !== '') && React.createElement("span", {style: {marginRight: 30}}, 'z: ' + row['z']),
                        (row['occupancy'] !== '') && React.createElement("span", {style: {marginRight: 30}}, 'Occupancy: ' + row['occupancy']),
                        (row['thermal'] !== '') && React.createElement("span", null, 'B Iso: ' + row['thermal'])
                      )
                    )
                  })
                )
              )
            );
          })
        )
      )
    );
  }
});
