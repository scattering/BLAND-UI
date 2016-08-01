var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var Link = ReactRouter.Link;
var IndexLink = ReactRouter.IndexLink;
var browserHistory = ReactRouter.browserHistory;
var IndexRoute = ReactRouter.IndexRoute;
var Navbar = ReactBootstrap.Navbar;
var Nav = ReactBootstrap.Nav;
var NavItem = ReactBootstrap.NavItem;

var MainLayout1 = React.createClass ({

	displayName: "MainLayout1",

	handleClick1: function(e) {
		document.getElementById('upload').style.visibility = 'visible';
		if(document.getElementById('mybtn').style.visibility === "visible") {
			document.getElementById('mybtn').style.visibility = "hidden";
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
				this.props.children
		);
	}
});

var Help = React.createClass({
  displayName: "Help",

  render: function render() {
		document.getElementById('inner').style.visibility = 'hidden';
		document.getElementById('below').style.visibility = 'hidden';
		document.getElementById('drop3').style.visibility = 'visible';
    return React.createElement("div", {style: {textAlign: 'center', fontSize: '20px'}},
			React.createElement("ul", {style: {display: 'inline-block', textAlign: 'left'}},
				React.createElement("li", null, "Create a crystal model and calculate intensity and structure factor spectra."),
				React.createElement("li", null, "Upload observed intensity data and get a graph of the residuals."),
				React.createElement("li", null, "Fit model to match observed data."),
				React.createElement("li", null, "Under instrument, choose mode, then upload data, fill in at least wavelength, u, v, w."),
				React.createElement("li", null, "Under model, upload a .cif file to fill in crystal model, or enter in parameters by hand."),
				React.createElement("li", null, "Press calculate to get structure factors."),
				React.createElement("li", null, "Under results, press button to show graphs."),
				React.createElement("li", null, "Under fit, give range to fit each parameter, then press fit to run."),
				React.createElement("li", null, "This will open a tab to monitor the status of the fit."),
				React.createElement("li", null, "Access this status page at any time, using the url of the page (http://localhost:8001/status/{token})."),
				React.createElement("li", null, "Save the updated parameters from that page, then upload the file below."),
				React.createElement("li", null, "When the fit finishes, save the plots generated.")
			),
			React.createElement('div', {id: 'upload', style: {'textAlign': 'center', width: '20%'}})
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
