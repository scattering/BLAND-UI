var Fit = React.createClass({displayName: "fit",

  handleClick: function(e) {
    state = store.getState()['myReducer5'];
    for(var key in store.getState()['myReducer5'][0]) {
      console.log(key);
      store.dispatch(removeFit(key))
      document.getElementById(key + 'pm').innerHTML = '';
      document.getElementById(key).checked = false;
    }
    console.log(store.getState());
    document.getElementById('rmvfit').innerHTML = '';
  },

  handleChange2: function(e) {
    console.log(e)
    console.log(e.target.value);
    console.log(e.target.id.replace('pm', ''))
    console.log(document.getElementById(e.target.id.replace('pm1', '')))
    el = document.getElementById(e.target.id.replace('pm1', ''))
    store.dispatch(changePM(e.target.id.replace('pm1', ''), el.getAttribute('name'), el.getAttribute('data-phase'), el.getAttribute('data-row'), e.target.value));
    console.log(store.getState())
  },

  handleChange: function(e) {
    console.log(e.target.name, e.target.getAttribute('data-phase'), e.target.getAttribute('data-row'))
    if(e.target.checked) {
      if(document.getElementById('rmvfit').innerHTML === '') {
        ReactDOM.render(React.createElement('button', {onClick: this.handleClick}, 'Remove all fits'), document.getElementById('rmvfit'));
      }
      console.log(store.getState())
      store.dispatch(addFit(e.target.id))
      console.log(store.getState())
      console.log(e.target.id + 'pm')
      console.log(document.getElementById(e.target.id + 'pm'))
      ReactDOM.render(React.createElement("span", null, "± ",
        React.createElement("input", {type: 'text', id:e.target.id+'pm1', style: {width: 25}, onChange: this.handleChange2})), document.getElementById(e.target.id+"pm"))
    }
    else {
      store.dispatch(removeFit(e.target.id))
      console.log(store.getState())
      document.getElementById(e.target.id + 'pm').innerHTML = '';
    }
  },

  componentDidMount: function() {
    var x = document.getElementsByTagName('input');

    for(var i = 0; i < x.length; i++) {
      if(x[i].type === 'checkbox') {
        //console.log('foolish mortal')
        //console.log(x[i])
        if(typeof store.getState()['myReducer5'][0][x[i].id] !== 'undefined') {
          console.log('hit')
          console.log(x[i])
          x[i].checked = true
          ReactDOM.render(React.createElement("span", null, "± ",
            React.createElement("input", {type: 'text', id:x[i].id+'pm1', value: '', style: {width: 25}, onChange: this.handleChange2})), document.getElementById(x[i].id+"pm"))
          console.log(document.getElementById(x[i].id+'pm1'))
          document.getElementById(x[i].id+'pm1').value = store.getState()['myReducer5'][0][x[i].id]['pm'];
          if(document.getElementById('rmvfit').innerHTML === '') {
            ReactDOM.render(React.createElement('button', {onClick: this.handleClick}, 'Remove all fits'), document.getElementById('rmvfit'));
          }
        }
      }
    }
  },

  render: function() {
    console.log(store.getState());
    //store.dispatch(addFit('hello', 'world'))
    //console.log(store.getState()['myReducer4']['Phases'][0][1][0]['space'])
    state = store.getState();
    document.getElementById('inner').style.visibility = 'hidden';
		document.getElementById('below').style.visibility = 'hidden';
    console.log(typeof state['myReducer3'][0]['zero'])
    return (
      React.createElement("div", null,
        React.createElement("div", {id: 'rmvfit'}),
        !!state['myReducer3'][0]['scale'] && React.createElement("center", {style: {marginBottom: 15}}, "Instrument"),
        React.createElement("center", null,
          !!state['myReducer3'][0]['scale'] && React.createElement("span", {style: {marginRight: 30}},
            React.createElement("input", {style: {marginRight: 5}, 'data-row': '', 'data-phase': '', name: 'scale', type: 'checkbox', id:'scale', onChange:this.handleChange}),
            'Scale Factor: ' + state['myReducer3'][0]['scale'],
            React.createElement("span", {style: {marginLeft: 5}, id:'scale' + 'pm'})
          ),
          !!state['myReducer3'][0]['wavelength'] && React.createElement("span", {style: {marginRight: 30}},
            React.createElement("input", {style: {marginRight: 5}, 'data-row': '', 'data-phase': '', name: 'wavelength', type: 'checkbox', id:'wavelength', onChange: this.handleChange}),
            'Wavelength: ' + state['myReducer3'][0]['wavelength'],
            React.createElement("span", {style: {marginLeft: 5}, id:'wavelength' + 'pm'})
          ),
          !!state['myReducer3'][0]['u'] && React.createElement("span", {style: {marginRight: 30}},
            React.createElement("input", {style: {marginRight: 5}, 'data-row': '', 'data-phase': '', name: 'u', type: 'checkbox', id:'u', onChange: this.handleChange}),
            'u: ' + state['myReducer3'][0]['u'],
            React.createElement("span", {style: {marginLeft: 5}, id:'u' + 'pm'})
          ),
          !!state['myReducer3'][0]['v'] && React.createElement("span", {style: {marginRight: 30}},
            React.createElement("input", {style: {marginRight: 5}, 'data-row': '', 'data-phase': '', name: 'v', type: 'checkbox', id:'v', onChange: this.handleChange}),
            'v: ' + state['myReducer3'][0]['v'],
            React.createElement("span", {style: {marginLeft: 5}, id:'v' + 'pm'})
          ),
          !!state['myReducer3'][0]['w'] && React.createElement("span", {style: {marginRight: 30}},
            React.createElement("input", {style: {marginRight: 5}, 'data-row': '', 'data-phase': '', name: 'w', type: 'checkbox', id:'w', onChange: this.handleChange}),
            'w: ' + state['myReducer3'][0]['w'],
            React.createElement("span", {style: {marginLeft: 5}, id:'w' + 'pm'})
          ),
          !!state['myReducer3'][0]['eta'] && React.createElement("span", {style: {marginRight: 30}},
            React.createElement("input", {style: {marginRight: 5}, 'data-row': '', 'data-phase': '', name: 'eta', type: 'checkbox', id:'eta', onChange: this.handleChange}),
            'Eta: ' + state['myReducer3'][0]['eta'],
            React.createElement("span", {style: {marginLeft: 5}, id:'eta' + 'pm'})
          ),
          !!state['myReducer3'][0]['zero'] && React.createElement("span", {style: {marginRight: 30}},
            React.createElement("input", {style: {marginRight: 5}, 'data-row': '', 'data-phase': '', name: 'zero', type: 'checkbox', id:'zero', onChange: this.handleChange}),
            'Zero: ' + state['myReducer3'][0]['zero'],
            React.createElement("span", {style: {marginLeft: 5}, id:'zero' + 'pm'})
          )
        ),
        React.createElement("div", null,
          state['myReducer4']['Phases'].map((phase, i) => {
            console.log(phase[0])
            return (
              React.createElement("div", null,
                !!phase[1][0]['space'] && React.createElement("center", {style: {marginTop: 15}}, "Phase " + (i + 1)),
                !!phase[1][0]['space'] && React.createElement("center", {style: {marginTop: 15, marginBottom: 15}}, "Unit Cell"),
                React.createElement("center", null,
                  !!phase[1][0]['a'] && React.createElement("span", {style: {marginRight: 30}},
                    React.createElement("input", {style: {marginRight: 5}, 'data-row': '', 'data-phase': i + 1, name: 'a', type: 'checkbox', id:'a' + (i + 1), onChange: this.handleChange}),
                    'a: ' + Number(phase[1][0]['a']).toFixed(4),
                    React.createElement("span", {style: {marginLeft: 5}, id:'a' + (i + 1) + 'pm'})
                  ),
                  !!phase[1][0]['b'] && React.createElement("span", {style: {marginRight: 30}},
                    React.createElement("input", {style: {marginRight: 5}, 'data-row': '', 'data-phase': (i + 1), name: 'b', type: 'checkbox', id:'b' + (i + 1), onChange: this.handleChange}),
                    'b: ' + Number(phase[1][0]['b']).toFixed(4),
                    React.createElement("span", {style: {marginLeft: 5}, id:'b' + (i + 1) + 'pm'})
                  ),
                  !!phase[1][0]['c'] && React.createElement("span", {style: {marginRight: 30}},
                    React.createElement("input", {style: {marginRight: 5}, 'data-row': '', 'data-phase': (i + 1), name: 'c', type: 'checkbox', id:'c' + (i + 1), onChange: this.handleChange}),
                    'c: ' + Number(phase[1][0]['c']).toFixed(4),
                    React.createElement("span", {style: {marginLeft: 5}, id:'c' + (i + 1) + 'pm'})
                  ),
                  !!phase[1][0]['alpha'] && React.createElement("span", {style: {marginRight: 30}},
                    React.createElement("input", {style: {marginRight: 5}, 'data-row': '', 'data-phase': (i + 1), name: 'alpha', type: 'checkbox', id:'alpha' + (i + 1), onChange: this.handleChange}),
                    'Alpha: ' + phase[1][0]['alpha'],
                    React.createElement("span", {style: {marginLeft: 5}, id:'alpha' + (i + 1) + 'pm'})
                  ),
                  !!phase[1][0]['beta'] && React.createElement("span", {style: {marginRight: 30}},
                    React.createElement("input", {style: {marginRight: 5}, 'data-row': '', 'data-phase': (i + 1), name: 'beta', type: 'checkbox', id:'beta' + (i + 1), onChange: this.handleChange}),
                    'Beta: ' + phase[1][0]['beta'],
                    React.createElement("span", {style: {marginLeft: 5}, id:'beta' + (i + 1) + 'pm'})
                  ),
                  !!phase[1][0]['gamma'] && React.createElement("span", null,
                    React.createElement("input", {style: {marginRight: 5}, 'data-row': '', 'data-phase': (i + 1), name: 'gamma', type: 'checkbox', id:'gamma' + (i + 1), onChange: this.handleChange}),
                    'Gamma: ' + phase[1][0]['gamma'],
                    React.createElement("span", {style: {marginLeft: 5}, id:'gamma' + (i + 1) + 'pm'})
                  )
                ),
                !!phase[0][0]['label'] && React.createElement("center", {style: {marginTop: 15, marginBottom: 15}}, "Atoms"),
                !phase[0][0]['label'] && !phase[1][0]['space'] && !state['myReducer3'][0]['scale'] && React.createElement("center", null, "Please enter atom, cell, and instrument information."),
                React.createElement("div", null,
                  phase[0].map((row, j) => {
                    console.log(typeof row['occupancy'])
                    return (
                      React.createElement("center", null,
                        (row['label'] !== '') && React.createElement("span", {style: {marginRight: 30}}, row['label']),
                        (row['x'] !== '') && React.createElement("span", {style: {marginRight: 30}},
                          React.createElement("input", {style: {marginRight: 5}, 'data-row': j, 'data-phase': (i + 1), name: 'x', type: 'checkbox', id:'row' + j + 'x' + (i + 1), onChange: this.handleChange}),
                          'x: ' + Number(row['x']).toFixed(4),
                          React.createElement("span", {style: {marginLeft: 5}, id:'row' + j + 'x' + (i + 1) + 'pm'})
                        ),
                        (row['y'] !== '') && React.createElement("span", {style: {marginRight: 30}},
                          React.createElement("input", {style: {marginRight: 5}, 'data-row': j, 'data-phase': (i + 1), name: 'y', type: 'checkbox', id:'row' + j + 'y' + (i + 1), onChange: this.handleChange}),
                          'y: ' + Number(row['y']).toFixed(4),
                          React.createElement("span", {style: {marginLeft: 5}, id:'row' + j + 'y' + (i + 1) + 'pm'})
                        ),
                        (row['z'] !== '') && React.createElement("span", {style: {marginRight: 30}},
                          React.createElement("input", {style: {marginRight: 5}, 'data-row': j, 'data-phase': (i + 1), name: 'z', type: 'checkbox', id:'row' + j + 'z' + (i + 1), onChange: this.handleChange}),
                          'z: ' + Number(row['z']).toFixed(4),
                          React.createElement("span", {style: {marginLeft: 5}, id:'row' + j + 'z' + (i + 1) + 'pm'})
                        ),
                        (row['occupancy'] !== '') && React.createElement("span", {style: {marginRight: 30}},
                          React.createElement("input", {style: {marginRight: 5}, 'data-row': j, 'data-phase': (i + 1), name: 'occupancy', type: 'checkbox', id:'row' + j + 'occupancy' + (i + 1), onChange: this.handleChange}),
                          'Occupancy: ' + Number(row['occupancy']).toFixed(1),
                          React.createElement("span", {style: {marginLeft: 5}, id:'row' + j + 'occupancy' + (i + 1) + 'pm'})
                        ),
                        (row['thermal'] !== '') && React.createElement("span", null,
                          React.createElement("input", {style: {marginRight: 5}, 'data-row': j, 'data-phase': (i + 1), name: 'thermal', type: 'checkbox', id:'row' + j + 'thermal' + (i + 1), onChange: this.handleChange}),
                          'B Iso: ' + row['thermal'],
                          React.createElement("span", {style: {marginLeft: 5}, id:'row' + j + 'thermal' + (i + 1) + 'pm'})
                        )
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
