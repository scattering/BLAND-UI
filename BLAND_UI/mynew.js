//var Tabs = ReactSimpleTabs;
/*var App = React.createClass({

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

ReactDOM.render(React.createElement(App, null), document.getElementById('content'));*/

var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var Link = ReactRouter.Link;
var IndexLink = ReactRouter.IndexLink;
var browserHistory = ReactRouter.browserHistory;
var IndexRoute = ReactRouter.IndexRoute;
var Navbar = ReactBootstrap.Navbar;
var Nav = ReactBootstrap.Nav;
var NavItem = ReactBootstrap.NavItem;

/*var MainLayout = React.createClass({
  displayName: "MainLayout",

  render: function render() {
    return React.createElement(
      "div",
      { className: "app" },
      React.createElement("header", { className: "primary-header" }),
      React.createElement(
        "aside",
        { className: "primary-aside" },
        React.createElement(
          "ul",
          null,
	  React.createElement(
            "li",
            null,
            React.createElement(
              Link,
              { to: "/bland/" },
              "Home"
            )
          ),
          React.createElement(
            "li",
            null,
            React.createElement(
              Link,
              { to: "/bland/cell/" },
              "Unit Cell"
            )
          ),
          React.createElement(
            "li",
            null,
            React.createElement(
              Link,
              { to: "/bland/grid/" },
              "Atoms"
            )
          ),
          React.createElement(
            "li",
            null,
            React.createElement(
              Link,
              { to: "/bland/instrument/" },
              "Instrument"
            )
          )
        )
      ),
      React.createElement(
        "main",
        null,
        this.props.children
      )
    );
  }
});*/


var MainLayout1 = React.createClass ({

	displayName: "MainLayout1",

	handleClick1: function(e) {
		if(document.getElementById('mybtn').style.visibility === "visible") {
			document.getElementById('mybtn').style.visibility = "hidden";
			//document.getElementById('fitbtn').style.visibility = "hidden";
		}
	},

	handleClick2: function(e) {
		if(document.getElementById('mybtn').style.visibility === "hidden") {
			document.getElementById('mybtn').style.visibility = "visible";
		}
	},

	handleClick3: function(e) {
		if(document.getElementById('mybtn').style.visibility === "hidden") {
			document.getElementById('mybtn').style.visibility = "visible";
		}
	},

	handleClick4: function(e) {
		if(document.getElementById('mybtn').style.visibility === "hidden") {
			document.getElementById('mybtn').style.visibility = "visible";
		}
	},

	render: function render() {

		return 	React.createElement("div", null,
				React.createElement(Navbar, null,
					React.createElement(Navbar.Header, null,
						React.createElement(Navbar.Brand, null,
							React.createElement(IndexLink,
								{ to: "/bland/", style: {'color': '#428bca'}, activeStyle: {'color': 'blue'}, onClick: this.handleClick1 },
								"Help"
							)
						)
					),
					React.createElement(Nav, { bsStyle: "tabs", pullLeft: false },
						React.createElement(NavItem, {eventKey: 1 },
							React.createElement(Link,
								{ to: "/bland/instrument/", style: {'color': '#428bca'}, activeStyle: {'color': 'blue'} },
								"Instrument"
							)
						),
						React.createElement(NavItem, {eventKey: 2},
							React.createElement(Link,
								{ to: "/bland/models/", style: {'color': '#428bca'}, activeStyle: {'color': 'blue'} },
								"Models"
							)
						),
						React.createElement(NavItem, {eventKey: 4},
							React.createElement(Link,
								{ to: "/bland/fit/", style: {'color': '#428bca'}, activeStyle: {'color': 'blue'} },
								"Fit"
							)
						),
						React.createElement(NavItem, {eventKey: 3},
							React.createElement(Link,
								{ to: "/bland/results/", style: {'color': '#428bca'}, activeStyle: {'color': 'blue'} },
								"Results"
							)
						)
					)
				),
				React.createElement("main", null, this.props.children)
		);
	}
});

var Help = React.createClass({
  displayName: "Help",

  render: function render() {
		document.getElementById('inner').style.visibility = 'hidden';
		document.getElementById('below').style.visibility = 'hidden';
    return React.createElement(
      "h1",
      {style: {'textAlign': 'center', 'verticalAlign': 'middle'} },
      "Home Page"
    );
  }
});

ReactDOM.render(React.createElement(
  Router,
  {history: browserHistory },
  React.createElement(
	Route,
	{ path: "/bland/", component: MainLayout1 },
	React.createElement(IndexRoute, { component: Help }),
	React.createElement(Route, { path: "/bland/instrument/", component: Instrument }),
	React.createElement(Route, { path: "/bland/models/", component: Models }),
	React.createElement(Route, {path: "/bland/fit/", component: Fit }),
	React.createElement(Route, {path: "/bland/results/", component: Results })
  )
), document.getElementById('content'));
