var Results = React.createClass({displayName: 'component4',

  onClick: function() {
    $("#plot1").empty();
    $("#plot2").empty();

    obsState = store.getState()['observedReducer'];
    calcState = store.getState()['calculatedReducer'];
    var data = []
    var data1 = []
    var j = 0
    var calculated = false
    var observed = false
    if(obsState.length === 3) {
      for(var i = 0; i < obsState[0].length; i++) {
        data.push([obsState[0][i], (obsState[1][i] - 219), {"yupper": (obsState[1][i]+obsState[2][i] - 219), "xupper": obsState[0][i], "ylower": (obsState[1][i]-obsState[2][i] - 219), "xlower": obsState[0][i]}]);
        j = 1
      }
      data = [[data]]
      observed = true
    }

    if(calcState.length !== 0) {

      if(obsState.length === 3) {
        for(var m = 0; m < calcState[0].length; m++) {
          data1.push([obsState[0][m], (obsState[1][m] - calcState[1][m] - 219)])
        }
        data1 = [[data1]]
        data[0].push([])
      }
      else {
        data.push([])
        data[0].push([])
      }
      for(var k = 0; k < calcState[0].length; k++) {
        data[0][j].push([calcState[0][k], calcState[1][k]])
      }

      calculated = true
    }

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
      plot1_html = $("#plot1").html();
      ReactDOM.render(React.createElement("button", {"id": "myCheck", className: 'btn', onClick: this.onSave1}, "Click to save graph"), document.getElementById('place'))
    }
    else {
      alert("No data to show!");
    }

    if(observed === true && calculated === true) {
      chart1 = xyChart({show_line: true, show_errorbars: true, ytransform: 'linear', legend: {show: true}, series: [{"label": "Residuals"}], axes: {xaxis: {label: "Two Theta"}, yaxis: {label: "Intensity"}}});
      c1 = d3.select("#plot2")
        .data(data1)
        .call(chart1);
      plot2_html = $("#plot2").html();
      ReactDOM.render(React.createElement("button", {"id": "myCheck2", className: 'btn', onClick: this.onSave2}, "Click to save residual plot"), document.getElementById('place2'))
    }
  },

  onSave1: function() {
    if(typeof chart !== "undefined") {
      print_plot(chart, 'plot.svg');
    }
    else {
      alert("No chart to save!");
    }
  },

  onSave2: function() {
    if(typeof chart1 !== "undefined") {
      print_plot(chart1, 'residual_plot.svg');
    }
    else {
      alert("No chart to save!");
    }
  },

  componentDidMount: function() {
    if(typeof plot1_html !== "undefined") {
      document.getElementById('plot1').innerHTML = plot1_html;
      ReactDOM.render(React.createElement("button", {"id": "myCheck", className: 'btn', onClick: this.onSave1}, "Click to save graph"), document.getElementById('place'))
    }
    if(typeof plot2_html !== "undefined") {
      document.getElementById('plot2').innerHTML = plot2_html;
      ReactDOM.render(React.createElement("button", {"id": "myCheck2", className: 'btn', onClick: this.onSave2}, "Click to save residual plot"), document.getElementById('place2'))
    }
  },

  render: function() {
    document.getElementById('inner').style.visibility = 'hidden';
		document.getElementById('below').style.visibility = 'hidden';
    document.getElementById('drop3').style.visibility = 'hidden';
    document.getElementById('mybtn').style.visibility = "visible";
    return (
      React.createElement("div", null,
        React.createElement("button", {id: 'results', className: 'btn', onClick: this.onClick},
          "Click for results."
        ),
        React.createElement("div", null,
          React.createElement("div", {id: 'place'}),
          React.createElement("div", {id: 'place2'})
        ),
        React.createElement("div", {id: 'plot1'}),
        React.createElement("div", {id: 'plot2'})
      )
    );
  }
});

var print_plot = function(chart, fileName) {
  var svg = chart.export_svg();
  var a = document.createElement("a");
  document.body.appendChild(a);
  a.style = "display: none";
  var serializer = new XMLSerializer();
  var svg_blob = new Blob([serializer.serializeToString(svg)],
                        {'type': "image/svg+xml"});
  var url = window.URL.createObjectURL(svg_blob);
  a.href = url;
  a.download = fileName;
  a.click();
  window.URL.revokeObjectURL(url);
}
