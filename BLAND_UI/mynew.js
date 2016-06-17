var Tabs = ReactSimpleTabs;
var App = React.createClass({
	
  handleOnMount: function(selectedIndex, $selectedPanel, $selectedTabMenu) {
	  if(selectedIndex === 1) {
		  ReactDOM.render(React.createElement(Cell, null), document.getElementById('tab1'));
	  }
	  else if(selectedIndex === 2) {
		  ReactDOM.render(React.createElement(Grid, null), document.getElementById('tab2'));
	  }
	  else if(selectedIndex === 3) {
		  ReactDOM.render(React.createElement(Instrument, null), document.getElementById('tab3'));
	  }
  },
  
  handleAfterChange: function(selectedIndex, $selectedPanel, $selectedTabMenu) {
	if(selectedIndex === 1) {
		ReactDOM.render(React.createElement(Cell, null), document.getElementById('tab1'));
	}
	else if(selectedIndex === 2) {
		ReactDOM.render(React.createElement(Grid, null), document.getElementById('tab2'));
	}
	else if(selectedIndex === 3) {
		ReactDOM.render(React.createElement(Instrument, null), document.getElementById('tab3'));
	}
  },
  
  render: function() {
    return (
      React.createElement(Tabs, {tabActive: 1, onAfterChange: this.handleAfterChange, onMount: this.handleOnMount},
	  
        React.createElement(Tabs.Panel, {title:'Unit Cell'},
          React.createElement('h5', {}, 
			React.createElement('div', {id: 'tab1'})
		  )
		),
        React.createElement(Tabs.Panel, {title:'Atoms'},
          React.createElement('h5', {}, 
			React.createElement('div', {id: 'tab2'})
		  )
		),
		React.createElement(Tabs.Panel, {title:'Instrument'},
			React.createElement('h5', {},
				React.createElement('div', {id: 'tab3'})
			)
		)
	  )
    );
  }
});

ReactDOM.render(React.createElement(App, null), document.getElementById('content'));