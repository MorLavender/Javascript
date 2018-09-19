<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Title</title>

  <style>
    svg {
      background-color: #444455;
    }
    circle {
      fill: #339933;
      stroke: #ffffff;
    }
  </style>

  <script type="text/javascript" src="https://d3js.org/d3.v3.min.js"></script>
</head>

<body>
</body>

<script type="text/javascript">

  var data = [
    {"x": 50, "y": 50, "pulse": false},
    {"x": 150, "y": 50, "pulse": false},
    {"x": 100, "y": 150, "pulse": false}
  ];

  var svg = d3.select("body")
    .append("svg")
    .attr("width", 200)
    .attr("height", 200);

  var plot_area = svg
    .append("g")
    .attr("id", "plot-area")
    .attr("transform", "translate(0, 0)");

  var circles = plot_area.selectAll("circle").data(data);

  circles.enter()
    .append("circle")
    .attr("r", 8)
    .attr("cx", function(d) { return d.x; })
    .attr("cy", function(d) { return d.y; })
    .attr("stroke-width", 2);

  plot_area.selectAll("circle")
    .on("click", function(d) {
      d.pulse = !d.pulse;
      if (d.pulse) {
        var selected_circles = d3.select(this);
        pulsate(selected_circles);

      }
    });

  function pulsate(selection) {
    recursive_transitions();

    function recursive_transitions() {
      if (selection.data()[0].pulse) {
        selection.transition()
            .duration(400)
            .attr("stroke-width", 2)
            .attr("r", 8)
            .ease('sin-in')
            .transition()
            .duration(800)
            .attr('stroke-width', 3)
            .attr("r", 12)
            .ease('bounce-in')
            .each("end", recursive_transitions);
      } else {
        // transition back to normal
        selection.transition()
            .duration(200)
            .attr("r", 8)
            .attr("stroke-width", 2)
            .attr("stroke-dasharray", "1, 0");
      }
    }
  }

</script>

</html>
