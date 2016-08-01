var ListGroup = ReactBootstrap.ListGroup;
var ListGroupItem = ReactBootstrap.ListGroupItem;
var Fit = React.createClass({displayName: "fit",

  handleClick: function(e) {
    state = store.getState()['myReducer5'];
    for(var key in store.getState()['myReducer5'][0]) {
      store.dispatch(removeFit(key))
      document.getElementById(key + 'pm').innerHTML = '';
      document.getElementById(key).checked = false;
    }
    document.getElementById('rmvfit').innerHTML = '';
    document.getElementById('steps').innerHTML = '';
    document.getElementById('fitButtonDiv').innerHTML = '';
  },

  handlePhaseClick: function(e) {
    index = Number(e.target.innerHTML.split(" ")[1])
    store.dispatch(changeTab(index - 1));
  },

  handleClick2: function(e) {
    var x = document.getElementsByTagName('input');
    for(var i = 0; i < x.length; i++) {
      if(x[i].type === 'checkbox') {
        if(!document.getElementById(x[i].id).checked) {
          $('#' + x[i].id).click()
        }
      }
    }
  },

  handleChange2: function(e) {
    el = document.getElementById(e.target.id.replace('pm1', ''))
    store.dispatch(changePM(e.target.id.replace('pm1', ''), el.getAttribute('name'), el.getAttribute('data-phase'), el.getAttribute('data-row'), e.target.value));
  },

  handleChange3: function(e) {
    store.dispatch(changeSteps(e.target.value));
  },

  handleChange4: function(e) {
    store.dispatch(changeBurn(e.target.value));
  },

  handleChange: function(e) {
    if(e.target.checked) {
      if(document.getElementById('rmvfit').innerHTML === '') {
        ReactDOM.render(React.createElement('button', {className: 'btn', onClick: this.handleClick}, 'Remove all fits'), document.getElementById('rmvfit'));
      }
      if(document.getElementById('steps').innerHTML === '') {
        ReactDOM.render(React.createElement('span', null, 'Steps: ',
          React.createElement('input', {type: 'text', id: 'steps_input', placeholder: 5, style: {width: 40}, onChange: this.handleChange3}),
          React.createElement('span', {style: {marginLeft: 25}}, 'Burn: ',
            React.createElement('input', {type: 'text', id: 'burnin_input', placeholder: 0, style: {width: 40}, onChange: this.handleChange4})
          )
        ), document.getElementById('steps'))
      }
      if(document.getElementById('fitButtonDiv').innerHTML === '') {
        ReactDOM.render(React.createElement('button', {className: 'btn', onClick: handleOnClick2}, 'Fit'), document.getElementById('fitButtonDiv'));
      }
      store.dispatch(addFit(e.target.id))
      ReactDOM.render(React.createElement("span", null, "± ",
        React.createElement("input", {type: 'text', id:e.target.id+'pm1', style: {width: 25}, onChange: this.handleChange2})), document.getElementById(e.target.id+"pm")
      )
    }
    else {
      store.dispatch(removeFit(e.target.id))
      document.getElementById(e.target.id + 'pm').innerHTML = '';
    }
  },

  componentDidMount: function() {
    var x = document.getElementsByTagName('input');
    for(var i = 0; i < x.length; i++) {
      if(x[i].type === 'checkbox') {
        if(typeof store.getState()['myReducer5'][0][x[i].id] !== 'undefined') {
          x[i].checked = true
          ReactDOM.render(React.createElement("span", null, "± ",
            React.createElement("input", {type: 'text', id:x[i].id+'pm1', style: {width: 25}, onChange: this.handleChange2})), document.getElementById(x[i].id+"pm"))
          if(typeof store.getState()['myReducer5'][0][x[i].id]['pm'] !== 'undefined') {
            document.getElementById(x[i].id+'pm1').value = store.getState()['myReducer5'][0][x[i].id]['pm'];
          }
          if(document.getElementById('rmvfit').innerHTML === '') {
            ReactDOM.render(React.createElement('button', {className: 'btn', onClick: this.handleClick}, 'Remove all fits'), document.getElementById('rmvfit'));
          }
          if(document.getElementById('fitButtonDiv').innerHTML === '') {
            ReactDOM.render(React.createElement('button', {className: 'btn', onClick: handleOnClick2}, 'Fit'), document.getElementById('fitButtonDiv'));
          }
          if(document.getElementById('steps').innerHTML === '') {
            ReactDOM.render(React.createElement('span', null, 'Steps: ',
              React.createElement('input', {type: 'text', id: 'steps_input', placeholder: 5, style: {width: 40}, onChange: this.handleChange3}),
              React.createElement('span', {style: {marginLeft: 25}}, 'Burn: ',
                React.createElement('input', {type: 'text', id: 'burnin_input', placeholder: 0, style: {width: 40}, onChange: this.handleChange4})
              )
            ), document.getElementById('steps'))
            if(typeof store.getState()['myReducer5'][0]['steps'] !== 'undefined') {
              document.getElementById('steps_input').value = store.getState()['myReducer5'][0]['steps'];
            }
            if(typeof store.getState()['myReducer5'][0]['burn'] !== 'undefined') {
              document.getElementById('burnin_input').value = store.getState()['myReducer5'][0]['burn'];
            }
          }
        }
      }
    }
  },

  render: function() {
    state = store.getState();
    document.getElementById('inner').style.visibility = 'hidden';
		document.getElementById('below').style.visibility = 'hidden';
    document.getElementById('drop3').style.visibility = 'hidden';
    document.getElementById('mybtn').style.visibility = "hidden";
    var show_message = true
    var show_atom = [false]
    var show_inst = false
    var show_cell = [false]
    var show_phase = [false]
    var show_row = [[]]
    var red3 = state['myReducer3'][0]
    if(red3['scale'] !== '' || red3['u'] !== '' || red3['v'] !== '' || red3['w'] !== '' || red3['eta'] !== '' || red3['zero'] !== '') {
      show_message = false
      show_inst = true
    }
    for(var phase in state['myReducer4']['Phases']) {
      for(var t1 in state['myReducer4']['Phases'][phase][0]) {
        var temp = state['myReducer4']['Phases'][phase][0][t1]
        if(temp['x'] !== '' || temp['y'] !== '' || temp['z'] !== '' || temp['occupancy'] !== '' || temp['thermal'] !== '') {
          show_message = false
          show_atom[phase] = true
          show_phase[phase] = true
          if(show_row.length !== store.getState()['myReducer4']['Phases'].length) {
            show_row.push([])
          }
          show_row[phase][t1] = true
        }
        else {
          if(show_row.length !== store.getState()['myReducer4']['Phases'].length) {
            show_row.push([])
          }
          show_row[phase][t1] = false
        }
      }
      var temp2 = state['myReducer4']['Phases'][phase][1][0]
      if(temp2['a'] !== '' || temp2['b'] !== '' || temp2['c'] !== '' || temp2['alpha'] !== '' || temp2['beta'] !== '' || temp2['gamma'] !== '') {
        show_message = false
        show_cell[phase] = true
        show_phase[phase] = true
      }
    }
    return (
      React.createElement("div", {key: 'overall_div'},
        !show_message && React.createElement("span", {style: {textAlign: 'left'}, key: 'fitbtn_div'}, React.createElement("button", {className: 'btn', onClick: this.handleClick2}, 'Fit all parameters')),
        React.createElement("span", {style: {marginLeft: 10}, id: 'rmvfit'}),
        React.createElement("center", null,
          React.createElement(ListGroup, null,
            show_message && React.createElement(ListGroupItem, null, "Please enter atom, cell, and instrument information."),
            !show_message && React.createElement(ListGroupItem, null, "Check each parameter you want to fit."),
            show_inst && React.createElement(ListGroupItem, {id: 'inst_link'},
              React.createElement(Link,
                { to: "/bland/instrument/", style: {fontWeight: 'bold', fontSize: '16px', 'color': '#428bca'} },
                "Instrument"
              )
            ),
            show_inst && React.createElement(ListGroupItem, null,
              !!state['myReducer3'][0]['scale'] && React.createElement("span", {style: {marginRight: 30}},
                React.createElement("input", {style: {marginRight: 5}, 'data-row': '', 'data-phase': '', name: 'scale', type: 'checkbox', id:'scale', onChange:this.handleChange}),
                'Scale Factor: ' + state['myReducer3'][0]['scale'],
                React.createElement("span", {style: {marginLeft: 5}, id:'scale' + 'pm'})
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

                return (
                  React.createElement("div", {key: 'phase_div' + i},
                    show_phase[i] && React.createElement(ListGroupItem, {key: 'phase_label' + i},
                      React.createElement(Link,
        								{ to: "/bland/models/", style: {fontWeight: 'bold', fontSize: '16px', 'color': '#428bca'}, onClick: this.handlePhaseClick },
        								"Phase " + (i + 1)
        							)
                    ),
                    show_phase[i] && React.createElement(ListGroupItem, {key: 'idk' + i},
                      show_cell[i] && React.createElement(ListGroupItem, {style: {fontWeight: 'bold'}, key: 'cell_label' + i}, "Unit Cell"),
                      show_cell[i] && React.createElement(ListGroupItem, {key: 'cell_center' + i},
                        !!phase[1][0]['a'] && React.createElement("span", {key: 'a_check' + i, style: {marginRight: 30}},
                          React.createElement("input", {key: 'a_input', style: {marginRight: 5}, 'data-row': '', 'data-phase': i + 1, name: 'a', type: 'checkbox', id:'a' + (i + 1), onChange: this.handleChange}),
                          'a: ' + Number(phase[1][0]['a']).toFixed(4),
                          React.createElement("span", {key: 'a_pm' + i, style: {marginLeft: 5}, id:'a' + (i + 1) + 'pm'})
                        ),
                        !!phase[1][0]['b'] && React.createElement("span", {key: 'b_check' + i, style: {marginRight: 30}},
                          React.createElement("input", {key: 'b_input' + i, style: {marginRight: 5}, 'data-row': '', 'data-phase': (i + 1), name: 'b', type: 'checkbox', id:'b' + (i + 1), onChange: this.handleChange}),
                          'b: ' + Number(phase[1][0]['b']).toFixed(4),
                          React.createElement("span", {key: 'b_pm' + i, style: {marginLeft: 5}, id:'b' + (i + 1) + 'pm'})
                        ),
                        !!phase[1][0]['c'] && React.createElement("span", {key: 'c_check' + i, style: {marginRight: 30}},
                          React.createElement("input", {key: 'c_input' + i, style: {marginRight: 5}, 'data-row': '', 'data-phase': (i + 1), name: 'c', type: 'checkbox', id:'c' + (i + 1), onChange: this.handleChange}),
                          'c: ' + Number(phase[1][0]['c']).toFixed(4),
                          React.createElement("span", {key: 'c_pm' + i, style: {marginLeft: 5}, id:'c' + (i + 1) + 'pm'})
                        ),
                        !!phase[1][0]['alpha'] && React.createElement("span", {key: 'alpha_check' + i, style: {marginRight: 30}},
                          React.createElement("input", {key: 'alpha_input' + i, style: {marginRight: 5}, 'data-row': '', 'data-phase': (i + 1), name: 'alpha', type: 'checkbox', id:'alpha' + (i + 1), onChange: this.handleChange}),
                          'Alpha: ' + phase[1][0]['alpha'],
                          React.createElement("span", {key: 'alpha_pm' + i, style: {marginLeft: 5}, id:'alpha' + (i + 1) + 'pm'})
                        ),
                        !!phase[1][0]['beta'] && React.createElement("span", {key: 'beta_check' + i, style: {marginRight: 30}},
                          React.createElement("input", {key: 'beta_input' + i, style: {marginRight: 5}, 'data-row': '', 'data-phase': (i + 1), name: 'beta', type: 'checkbox', id:'beta' + (i + 1), onChange: this.handleChange}),
                          'Beta: ' + phase[1][0]['beta'],
                          React.createElement("span", {key: 'beta_pm' + i, style: {marginLeft: 5}, id:'beta' + (i + 1) + 'pm'})
                        ),
                        !!phase[1][0]['gamma'] && React.createElement("span", {key: 'gamma_check' + i},
                          React.createElement("input", {key: 'gamma_input' + i, style: {marginRight: 5}, 'data-row': '', 'data-phase': (i + 1), name: 'gamma', type: 'checkbox', id:'gamma' + (i + 1), onChange: this.handleChange}),
                          'Gamma: ' + phase[1][0]['gamma'],
                          React.createElement("span", {key: 'gamma_pm' + i, style: {marginLeft: 5}, id:'gamma' + (i + 1) + 'pm'})
                        )
                      ),
                      show_atom[i] && React.createElement(ListGroupItem, {style: {fontWeight: 'bold'}, key: 'atoms_label' + i}, "Atoms"),

                      show_atom[i] && React.createElement("div", null,
                        phase[0].map((row, j) => {
                          return (
                            show_row[i][j] && React.createElement(ListGroupItem, {key: 'rows_center' + i + j},
                              (row['label'] !== '') && React.createElement("span", {key: 'label_span' + i + j, style: {marginRight: 30}}, row['label']),
                              (row['x'] !== '') && React.createElement("span", {key: 'x_check' + i + j, style: {marginRight: 30}},
                                React.createElement("input", {key: 'x_input' + i + j, style: {marginRight: 5}, 'data-row': j, 'data-phase': (i + 1), name: 'x', type: 'checkbox', id:'row' + j + 'x' + (i + 1), onChange: this.handleChange}),
                                'x: ' + Number(row['x']).toFixed(4),
                                React.createElement("span", {key: 'x_pm' + i + j, style: {marginLeft: 5}, id:'row' + j + 'x' + (i + 1) + 'pm'})
                              ),
                              (row['y'] !== '') && React.createElement("span", {key: 'y_check' + i + j, style: {marginRight: 30}},
                                React.createElement("input", {key: 'y_input' + i + j, style: {marginRight: 5}, 'data-row': j, 'data-phase': (i + 1), name: 'y', type: 'checkbox', id:'row' + j + 'y' + (i + 1), onChange: this.handleChange}),
                                'y: ' + Number(row['y']).toFixed(4),
                                React.createElement("span", {key: 'y_pm' + i + j, style: {marginLeft: 5}, id:'row' + j + 'y' + (i + 1) + 'pm'})
                              ),
                              (row['z'] !== '') && React.createElement("span", {key: 'z_check' + i + j, style: {marginRight: 30}},
                                React.createElement("input", {key: 'z_input' + i + j, style: {marginRight: 5}, 'data-row': j, 'data-phase': (i + 1), name: 'z', type: 'checkbox', id:'row' + j + 'z' + (i + 1), onChange: this.handleChange}),
                                'z: ' + Number(row['z']).toFixed(4),
                                React.createElement("span", {key: 'z_pm' + i + j, style: {marginLeft: 5}, id:'row' + j + 'z' + (i + 1) + 'pm'})
                              ),
                              (row['occupancy'] !== '') && React.createElement("span", {key: 'occ_check' + i + j, style: {marginRight: 30}},
                                React.createElement("input", {key: 'occ_input' + i + j, style: {marginRight: 5}, 'data-row': j, 'data-phase': (i + 1), name: 'occupancy', type: 'checkbox', id:'row' + j + 'occupancy' + (i + 1), onChange: this.handleChange}),
                                'Occupancy: ' + Number(row['occupancy']).toFixed(1),
                                React.createElement("span", {key: 'occ_pm' + i + j, style: {marginLeft: 5}, id:'row' + j + 'occupancy' + (i + 1) + 'pm'})
                              ),
                              (row['thermal'] !== '') && React.createElement("span", {key: 'therm_check' + i + j},
                                React.createElement("input", {key: 'therm_input' + i + j, style: {marginRight: 5}, 'data-row': j, 'data-phase': (i + 1), name: 'thermal', type: 'checkbox', id:'row' + j + 'thermal' + (i + 1), onChange: this.handleChange}),
                                'B Iso: ' + row['thermal'],
                                React.createElement("span", {key: 'therm_pm' + i + j, style: {marginLeft: 5}, id:'row' + j + 'thermal' + (i + 1) + 'pm'})
                              )
                            )
                          )
                        })
                      )
                    )
                  )
                );
              })
            ),
            React.createElement("div", {id: 'steps', style: {marginTop: 30}})
          )
        ),
        React.createElement("div", {id: 'fitButtonDiv', style: {textAlign: 'right', marginRight: 15}})
      )
    );
  }
});
