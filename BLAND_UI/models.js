/*var Models = React.createClass({displayName: 'models',
  render: function() {
    return (
      React.createElement("div", null,
        React.createElement("div", {style: {'marginBottom': '30px'}}, React.createElement(Cell, null)),
        React.createElement(Grid, null)
      )
    );
  }
})
*/

var Tabs = ReactTabs.Tabs;
var Tab = ReactTabs.Tab;
var TabPanel = ReactTabs.TabPanel;
var TabList = ReactTabs.TabList;

var Models = React.createClass({displayName: 'models',

  /*getInitialState: function() {
    return {
      selectedIndex: 0,
      tabs: [0],
    };
  },*/

  /*handleSelect: function(index, last) {
    console.log('Selected tab: ' + index + ', Last tab: ' + last);
  },*/

  addTab: function() {
    //console.log(store.getState()['myReducer4']['Selected'])
    /*len = this.state.tabs.length;
    this.state.tabs.push(len);
    this.setState({
      selectedIndex: this.state.tabs.length - 1,
    });*/
    store.dispatch(addPhase());
    store.dispatch(changeTab(store.getState()['myReducer4']['Phases'].length - 1));
    //console.log(store.getState()['myReducer4']['Selected']);
  },

  removeTab: function(index) {
    /*if(this.state.tabs.length > 1) {
      this.state.tabs.splice(index, 1);
      if(this.state.tabs.length > 0) {
        this.setState({
          selectedIndex: this.state.tabs.length - 1,
        });
      }
      this.forceUpdate();
      console.log(this.state);
    }*/
    //console.log(store.getState())
    store.dispatch(changeTab(0));
    store.dispatch(removePhase(index));
    //console.log(store.getState()['myReducer4']['Selected'])
  },

  componentDidMount: function() {
    store.subscribe(this.update);
  },

  update: function() {
    if(this.isMounted()) {
      this.forceUpdate();
    }
  },

  handleSelect: function(index, last) {
    //console.log("Selected " + index)
  //  console.log(store.getState())
    store.dispatch(changeTab(index));
  },

  render: function() {
    state = store.getState();
    myState = state['myReducer4']['Phases'];
    //console.log(state)
    return (
      React.createElement("div", null,
        React.createElement("p", null,
          React.createElement("button", {'id': 'addTab', 'className': "btn", onClick: this.addTab}, "+ Add Phase")
        ),
        React.createElement(Tabs, { onSelect: this.handleSelect, selectedIndex: store.getState()['myReducer4']['Selected'] },
          React.createElement(TabList, null,
            myState.map((tab, i) => {
              return (
                React.createElement(Tab, {key: i}, "Phase " + (i + 1), React.createElement("a", {style: {'marginLeft': '10px', 'color': '#428bca'}, href:"#", onClick: this.removeTab.bind(this, i)}, "✕"))
              );
            })
            /*React.createElement(Tab, null, "Foo"),
            React.createElement(Tab, null, "Bar"),
            React.createElement(Tab, null, "Baz")*/

          ),
          myState.map((tab, i) => {
            //console.log("hello world")
            return (
              React.createElement(TabPanel, {key:i},
                React.createElement("div", null,
                  React.createElement("div", {style: {marginTop: 30, 'fontWeight': 'bold', fontSize: 16, 'borderStyle': "solid solid none", "borderWidth": "2px 1px 1px 0px", "borderColor": "#ADB0B1 #e7eaec"}},
                    React.createElement("div", {style: {marginLeft: 8, marginTop: 1}}, "Unit Cell")
                  ),
                  React.createElement("div", {style: {'marginBottom': '30px'}}, React.createElement(Cell, null)),
                  React.createElement("div", {style: {'fontWeight': 'bold', fontSize: 16, 'borderStyle': "solid solid none", "borderWidth": "2px 1px 1px 0px", "borderColor": "#ADB0B1 #e7eaec"}},
                    React.createElement("div", {style: {marginLeft: 8, marginTop: 1}}, "Atoms")
                  ),
                  React.createElement(Grid, null)
                )
              )
            );
          })
          /*React.createElement(TabPanel, null,
            React.createElement("div", null, "Hello from Foo")
          ),
          React.createElement(TabPanel, null,
            React.createElement("div", null, "Hello from Bar")
          ),
          React.createElement(TabPanel, null,
            React.createElement("div", null, "Hello from Baz")
          )*/
        )
      )
    );
  }
})
