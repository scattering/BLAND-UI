var Results = React.createClass({displayName: 'component4',

  onClick: function() {
    $("#plot1").empty();
    $("#plot2").empty();
    console.log(data)
    if (data[0]) {
      if(observed === true && calculated === true) {
        chart = xyChart({show_line: true, show_errorbars: true, ytransform: 'linear', legend: {show: true}, series: [{"label": "Observed"}, {"label": "Calculated"}], axes: {xaxis: {label: "Two Theta"}, yaxis: {label: "Intensity"}}})
      }
      else if (calculated === true) {
        chart = xyChart({show_line: true, show_errorbars: true, ytransform: 'linear', legend: {show: true}, series: [{"label": "Calculated"}], axes: {xaxis: {label: "Two Theta"}, yaxis: {label: "Intensity"}}})
      }
      else if (observed === true) {
        chart = xyChart({show_line: true, show_errorbars: true, ytransform: 'linear', legend: {show: true}, series: [{"label": "Observed"}], axes: {xaxis: {label: "Two Theta"}, yaxis: {label: "Intensity"}}})
      }
      c = d3.select("#plot1")
        .data(data)
        .call(chart);
      thing123 = $("#plot1").html();
      ReactDOM.render(React.createElement("button", {"id": "myCheck", onClick: this.onSave1}, "Click to save graph"), document.getElementById('place'))
    }
    else {
      alert("No data to show!");
    }
    console.log(data1)
    if(observed === true && calculated === true) {
      chart1 = xyChart({show_line: true, show_errorbars: true, ytransform: 'linear', legend: {show: true}, series: [{"label": "Residuals"}], axes: {xaxis: {label: "Two Theta"}, yaxis: {label: "Intensity"}}});
      c1 = d3.select("#plot2")
        .data(data1)
        .call(chart1);
      thingy = $("#plot2").html();
      ReactDOM.render(React.createElement("button", {"id": "myCheck2", onClick: this.onSave2}, "Click to save residual plot"), document.getElementById('place2'))
    }
  },

  onSave1: function() {
    if(typeof chart !== "undefined") {
      chart.print_plot('plot.svg');
    }
    else {
      alert("No chart to save!");
    }
  },

  onSave2: function() {
    if(typeof chart1 !== "undefined") {
      chart1.print_plot('residual_plot.svg');
    }
    else {
      alert("No chart to save!");
    }
  },

  componentDidMount: function() {
    if(typeof thing123 !== "undefined") {
      console.log("try")
      document.getElementById('plot1').innerHTML = thing123;
      ReactDOM.render(React.createElement("button", {"id": "myCheck", className: 'btn', onClick: this.onSave1}, "Click to save graph"), document.getElementById('place'))
    }
    if(typeof thingy !== "undefined") {
      document.getElementById('plot2').innerHTML = thingy;
      ReactDOM.render(React.createElement("button", {"id": "myCheck2", className: 'btn', onClick: this.onSave2}, "Click to save redidual plot"), document.getElementById('place2'))
    }
  },

  render: function() {
    document.getElementById('inner').style.visibility = 'hidden';
		document.getElementById('below').style.visibility = 'hidden';
    document.getElementById('mybtn').style.visibility = "visible";
    //console.log(this.props)
    return (
      React.createElement("div", null,
        React.createElement("button", {id: 'results', className: 'btn', onClick: this.onClick},
          "Click for results."
        ),
        React.createElement("div", null,
          React.createElement("div", {id: 'place'}),
          React.createElement("div", {id: 'place2'})
          //React.createElement("button", {"id": "myCheck", onClick: this.onSave}, "Click to save graph")
        ),
        React.createElement("div", {id: 'plot1'}),
        React.createElement("div", {id: 'plot2'})
      )
    );
  }
});
