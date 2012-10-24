var width = 960,
    height = 500,
    color = d3.scale.category20();

var treemap = d3.layout.treemap()
    .size([width, height])
    .padding(2)
    .sticky(true)
    .value(function(d) { if(d.size > 30000000) return d.size;});


//if(d.size > 30000000) {return d.size;} else {return 0;} });

var div = d3.select("#chart").append("div")
    .style("position", "relative")
    .style("width", width + "px")
    .style("height", height + "px");

d3.json("data_out.json", function(json) {
  div.data([json]).selectAll("div")
      .data(treemap.nodes)
    .enter().append("div")
      .attr("class", "cell")
      .style("background", function(d) { return d.children ? color(d.name): null; })
      .call(cell)
      .text(function(d) { return d.children ? null : d.name; })
        .style("font-size", function(d) {return d * 50+ "px";});
    


  d3.select("#all_years").on("click", function() {
    div.selectAll("div")
        .data(treemap.value(function(d) { return d.size; }))
      .transition()
        .duration(1500)
        .call(cell)
          .style("font-size", function(d) {return d * 50+ "px";});

    d3.select("#all_years").classed("active", true);
    d3.select("#count").classed("active", false);
  });

  d3.select("#count").on("click", function() {
    div.selectAll("div")
          .data(treemap.value(function(d) { if(d.size > 30000000) return d.size;}))
      .transition()
        .duration(1500)
        .call(cell)
          .style("font-size", function(d) {return d+ "px";});

    d3.select("#all_years").classed("active", false);
    d3.select("#count").classed("active", true);
  });
});

function cell() {
  this
	.style("left", function(d) { return d.x + "px"; })
	.style("top", function(d) { return d.y + "px"; })
	.style("height", function(d) { return Math.max(0, d.dy - 1) + "px";})

	.style("width", function(d) { return Math.max(0, d.dx - 1) + "px"; })
 


}
