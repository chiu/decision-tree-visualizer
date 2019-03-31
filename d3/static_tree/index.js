//JSON object with the data
var treeData = {
    "name": "node0",
    "attribute": "milk <= 0.5",
    "parent": "null",
    "samples": 101,
    "distribution": [4, 20, 8, 13, 10, 41, 5],
    "children": [
        {
            "name": "Level 2: A",
            "attribute": "none; leaf",
            "parent": "Top Parent",
            "samples": 41,
            "distribution": [4, 20, 8, 13, 10, 0, 5],
        },
        {
            "name": "Level 2: B",
            "attribute": "feathers <= 0.5",
            "parent": "Top Level",
            "samples": 60,
            "distribution": [4, 20, 8, 13, 10, 41, 5],
            "children": [
                {
                    "name": "Son of A",
                    "attribute": "none; leaf",
                    "parent": "Level 2: A",
                    "samples": 20,
                    "distribution": [4, 0, 8, 13, 10, 0, 5],
                },
                {
                    "name": "Daughter of A",
                    "attribute": "fins <= 0.5",
                    "parent": "Level 2: A",
                    "samples": 40,
                    "distribution": [4, 0, 8, 0, 10, 0, 5],
                }
            ]
        }
    ]
}

// Create a svg canvas
var vis = d3.select("#viz").append("svg:svg")
    .attr("width", 400)
    .attr("height", 300)
    .append("svg:g")
    .attr("transform", "translate(40, 30)"); // shift everything to the right


// Add tooltip div
var div = d3.select("body").append("div")
    .attr("class", "tooltip")
    .html("<p>This is a SVG inside a tooltip:</p><div id='tipDiv'>hi</div>")
    .style("opacity", 1e-6);


// Create a tree "canvas"
var tree = d3.layout.tree()
    .size([300, 150]);

var diagonal = d3.svg.diagonal();

// Preparing the data for the tree layout, convert data into an array of nodes
var nodes = tree.nodes(treeData);
// Create an array with all the links
var links = tree.links(nodes);

console.log("Raw:")
console.log(treeData)
console.log("Nodes:")
console.log(nodes)
console.log("Links:")
console.log(links)

// Show me a link in raw and its path version
console.log(links[0])
console.log(diagonal(links[0]))

var link = vis.selectAll("pathlink")
    .data(links)
    .enter().append("svg:path")
    .attr("class", "link")
    .attr("d", diagonal);

var node = vis.selectAll("g.node")
    .data(nodes)
    .enter().append("svg:g")
    .attr("transform", function (d) {
        return "translate(" + d.x + "," + d.y + ")";
    });

// Add the dot at every node
node.append("svg:circle")
    .on("mouseover", mouseover)
    .on("click", click)
    .on("mousemove", function (d) {
        mousemove(d);
    })
    .on("mouseout", mouseout)
    .attr("fill", "red")
    .attr("r", 10);

node.append("svg:text")
    .attr("dx", 8)
    .attr("dy", 3)
    .text(function (d) {
        return d.attribute;
    });

function mouseover() {
    div.transition()
        .duration(300)
        .style("opacity", 1);
}


function click(d) {
    console.log("clicked");
    console.log("the name of this node is " + d.name);
    var this_node = d3.select(this);


    // if (!cbMed)
    //     this.$node.selectAll(".MEDICATION").classed('hideRect', true);
    // else
    //     this.$node.selectAll(".MEDICATION").classed('hideRect', false);
    console.log("this node class is " + this_node.classed("toggled_on"));
    if (!this_node.classed("toggled_on")) {
        console.log("inside toggle on");
        this_node.attr("class", "toggled_on");
        var div = d3.select("body").append("div")
            .attr("class", "attributetip")
            .html("\<img src=\"milk.png\" style=\"float:right;width:400px;height:2000px;\">");
    } else {
        console.log("inside toggle off");
        this_node.classed("toggled_on", false);
    }


}


function mousemove(d) {
    console.log("inside select");

    div
        .text("Info about " + d.name + ":" + d.info + "\n" + d.attribute)
        .attr("transform", "translate(0," + 5 + ")")
        .style("left", (d3.event.pageX) + "px")
        .style("top", (d3.event.pageY) + "px")
        .attr("class", "tooltip");

    var g = d3.select(".tooltip"); //
    var chart = g.append('svg')
        .classed('chart', true);

    var info = g.append('text')
        .classed('info', true)
        .attr('x', 20)
        .attr('y', 20)
        .text('distribution: ' + d.distribution.toString());


    var margin = 30;
    var width = 150;
    var height = 200;

    // var data = [4, 8, 15, 16, 23, 42];
    // document.getElementById("data").innerHTML = data;
    var data = d.distribution;
    var x = d3.scale.ordinal()
        .domain([0, 1, 2, 3, 4, 5, 6])
        .rangeBands([0, width]);

    var y = d3.scale.linear()
        .domain([0, 45])
        .range([height, 0]);

    chart.attr("width", width + 2 * margin)
        .attr("height", height + 10 * margin)
        .append("g")
        .attr("transform", "translate(" + margin + "," + margin + ")")
        .selectAll("rect")
        .data(data)
        .enter().append("rect")
        .attr("width", 19)
        .attr("height", function (d) {
            return height - y(d);
        })
        .attr("x", function (d, i) {
            console.log(i);
            return x(i);
        })
        .attr("y", function (d) {
            return y(d);
        });

    var x_names = d3.scale.ordinal()
        .domain(['Mammal', 'Bird', 'Reptile', 'Fish', 'Amphibian', 'Bug', 'Invertebrate'])
        .rangeBands([0, width]);

    var xAxis = d3.svg.axis()
        .scale(x_names)
        .orient("bottom")
        .ticks(6);

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")
        .ticks(5);

    chart.append("g")
        .attr("transform", "translate(" + margin + "," + (height + margin) + ")")
        .attr("class", "axis")
        .call(xAxis)
        .selectAll("text")
        .attr("y", 0)
        .attr("x", 9)
        .attr("dy", ".35em")
        .attr("transform", "rotate(90)")
        .style("text-anchor", "start");

    chart.append("g")
        .attr("transform", "translate(" + margin + "," + margin + ")")
        .attr("class", "axis")
        .call(yAxis);

    console.log("done");
    // .call(wrap, 40);
}


function mouseout() {
    div.transition()
        .duration(300)
        .style("opacity", 1e-6);
}