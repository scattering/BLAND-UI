var Button = React.createClass( {
	render : function() {
      return (
            React.createElement(RaisedButton, {
              label: 'Calculate'
              })
      );
    }
});

/*ReactDOM.render(
	React.createElement(Button, null),
	document.getElementById('alignRight')
);*/