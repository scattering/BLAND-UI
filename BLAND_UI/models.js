
var Tabs = ReactTabs.Tabs;
var Tab = ReactTabs.Tab;
var TabPanel = ReactTabs.TabPanel;
var TabList = ReactTabs.TabList;

var Models = React.createClass({displayName: 'models',

  addTab: function() {
    store.dispatch(addPhase());
    store.dispatch(changeTab(store.getState()['myReducer4']['Phases'].length - 1));
  },

  removeTab: function(index) {
    store.dispatch(changeTab(0));
    store.dispatch(removePhase(index));
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
    store.dispatch(changeTab(index));
  },

  render: function() {
    state = store.getState();
    myState = state['myReducer4']['Phases'];
    return (
      React.createElement("div", null,
        React.createElement("p", null,
          React.createElement("button", {'id': 'addTab', 'className': "btn", onClick: this.addTab}, "+ Add Phase")
        ),
        React.createElement(Tabs, { onSelect: this.handleSelect, selectedIndex: store.getState()['myReducer4']['Selected'] },
          React.createElement(TabList, null,
            myState.map((phase, i) => {
              return (
                React.createElement(Tab, {key: i}, "Phase " + (i + 1), React.createElement("a", {style: {'marginLeft': '10px', 'color': '#428bca'}, href:"#", onClick: this.removeTab.bind(this, i)}, "✕"))
              );
            })
          ),
          myState.map((phase, i) => {
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
        )
      )
    );
  }
})
