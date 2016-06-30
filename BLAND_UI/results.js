var Results = React.createClass({displayName: 'component4',

  onClick: function() {
    $("#plot1").empty();
    console.log(data)
    dat = [[data[0][2], data[0][1], data[0][0]]]
    dat[0][2].pop()
    console.log(dat)
    if (data[0]) {
      chart = xyChart({show_line: true, show_errorbars: true, ytransform: 'linear'})
      c = d3.select("#plot1")
        .data(dat)
        .call(chart);
      //console.log("Hello world")
      /*if(document.getElementById('myCheck').checked === true) {
        chart.print_plot('my_image.svg')
      }*/
      //console.log("plot1 is")
      thing123 = $("#plot1").html();
      //console.log("this didn't work")
      ReactDOM.render(React.createElement("button", {"id": "myCheck", onClick: this.onSave}, "Click to save graph"), document.getElementById('place'))
    }
    else {
      alert("No data to show!");
    }
  },

  onSave: function() {
    //console.log(typeof chart)
    if(typeof chart !== "undefined") {
      chart.print_plot('my_image.svg');
    }
    else {
      alert("No chart to save!")
    }
  },

  componentDidMount: function() {
    //console.log('mounting')
    //console.log(store.getState())
    if(typeof thing123 !== "undefined") {
      console.log("try")
      document.getElementById('plot1').innerHTML = thing123;
      ReactDOM.render(React.createElement("button", {"id": "myCheck", onClick: this.onSave}, "Click to save graph"), document.getElementById('place'))
    }
  },

  render: function() {
    document.getElementById('inner').style.visibility = 'hidden';
		document.getElementById('below').style.visibility = 'hidden';
    //console.log(this.props)
    return (
      React.createElement("div", null,
        React.createElement("button", {id: 'results', onClick: this.onClick},
          "Click for results."
        ),
        React.createElement("div", null,
          React.createElement("div", {id: 'place'})
          //React.createElement("button", {"id": "myCheck", onClick: this.onSave}, "Click to save graph")
        ),
        React.createElement("div", {id: 'plot1'})
      )
    );
  }
});

//ReactDOM.render(React.createElement("div", {id: "plot1"}), document)
/*document.getElementById('results').addEventListener('click', function() {
  if(data[0]) {
    chart = xyChart({show_line: true, show_errorbars: true, ytransform: 'linear'})
    c = d3.select("#plot1")
      .data([data[0].data])
      .call(chart);
    console.log('Plotted');
  }
  else {
    alert('No data to plot!');
  }
}, false);
*/
