 // javascript
var dataset = [4, 20, 8, 13, 10, 41, 5];

var svgWidth = 200; 
var svgHeight = 100
var barPadding = 5;
var barWidth = (svgWidth / dataset.length);


var svg = d3.select('svg')
    .attr("width", svgWidth)
    .attr("height", svgHeight);
    
var barChart = svg.selectAll("rect")
     .data(dataset)
    .enter()
    .append("rect")
    .attr("y", function(d) {
         return svgHeight - d
    })
    .attr("height", function(d) { 
        return d; 
    })
    .attr("width", barWidth - barPadding)
    .attr("transform", function (d, i) {
        var translate = [barWidth * i, 0]; 
        return "translate("+ translate +")";
    });
