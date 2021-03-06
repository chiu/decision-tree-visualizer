var treeData = [
    {
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
];


// ************** Generate the tree diagram	 *****************
var margin = {top: 20, right: 120, bottom: 20, left: 120},
    width = 3 * 960 - margin.right - margin.left,
    height = 3 * 500 - margin.top - margin.bottom;

var i = 0,
    duration = 750,
    root;

var tree = d3.layout.tree()
    .size([height, width]);

var diagonal = d3.svg.diagonal()
    .projection(function (d) {
        return [d.y, d.x];
    });

var svg = d3.select("body").append("svg")
    .attr("width", width + margin.right + margin.left)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

root = treeData[0];
root.x0 = height / 2;
root.y0 = 0;

update(root);

d3.select(self.frameElement).style("height", "500px");

function update(source) {

    // Compute the new tree layout.
    var nodes = tree.nodes(root).reverse(),
        links = tree.links(nodes);

    // Normalize for fixed-depth.
    nodes.forEach(function (d) {
        d.y = d.depth * 180;
    });

    // Update the nodes…
    var node = svg.selectAll("g.node")
        .data(nodes, function (d) {
            return d.id || (d.id = ++i);
        });

    // Enter any new nodes at the parent's previous position.
    var nodeEnter = node.enter().append("g")
        .attr("class", "node")
        .attr("transform", function (d) {
            return "translate(" + source.y0 + "," + source.x0 + ")";
        })
        .on("click", click)														//added mouseover function
        .on("mouseover", function (d) {
            var g = d3.select(this); // The node

            // Define the div for the tooltip
            // var div = g.append("div")
            //     .attr("class", "tooltip")
            //     .style("opacity", 50)
            //     .html("heya");

            // The class is used to remove the additional text later

            // adding class distribution bar charts
            var chart = g.append('svg')
                .style('fill', 'green')
                .classed('chart', true);

                // .style('opacity', 100);

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
        })
        .on("mouseout", function () {
            // Remove the info text on mouse out.
            d3.select(this).select('text.info').remove()
            d3.select(this).selectAll('rect').remove()
            d3.select(this).selectAll('g.axis').remove()
        });


    nodeEnter.append("circle")
        .attr('r', 100)
        .style("fill", function (d) {
            return d._children ? "lightsteelblue" : "#fff";
        });

    nodeEnter.append("text")
        .attr("x", function (d) {
            return d.children || d._children ? -13 : 13;
        })
        .attr("dy", ".35em")
        .attr("text-anchor", function (d) {
            return d.children || d._children ? "end" : "start";
        })
        .text(function (d) {
            return d.attribute + " samples: " + d.samples;
        })
        .style("fill-opacity", 1e-6);

    // Transition nodes to their new position.
    var nodeUpdate = node.transition()
        .duration(duration)
        .attr("transform", function (d) {
            return "translate(" + d.y + "," + d.x + ")";
        });

    // update affects circle size here
    nodeUpdate.select("circle")
        .attr("r", function (d) {
            return Math.sqrt(d.samples / Math.PI) * 10;
        })
        .style("fill", function (d) {
            return d._children ? "lightsteelblue" : "#fff";
        });

    nodeUpdate.select("text")
        .style("fill-opacity", 1);

    // Transition exiting nodes to the parent's new position.
    var nodeExit = node.exit().transition()
        .duration(duration)
        .attr("transform", function (d) {
            return "translate(" + source.y + "," + source.x + ")";
        })
        .remove();

    nodeExit.select("circle")
        .attr("r", 1e-6);

    nodeExit.select("text")
        .style("fill-opacity", 1e-6);

    // Update the links…
    var link = svg.selectAll("path.link")
        .data(links, function (d) {
            return d.target.id;
        });

    // Enter any new links at the parent's previous position.
    link.enter().insert("path", "g")
        .attr("class", "link")
        .attr("d", function (d) {
            var o = {x: source.x0, y: source.y0};
            return diagonal({source: o, target: o})
        })
        .style("stroke-width", function (d) {
            return (d.target.samples);
        });

    // Transition links to their new position.
    link.transition()
        .duration(duration)
        .attr("d", diagonal);

    // Transition exiting nodes to the parent's new position.
    link.exit().transition()
        .duration(duration)
        .attr("d", function (d) {
            var o = {x: source.x, y: source.y};
            return diagonal({source: o, target: o});
        })
        .remove();

    // Stash the old positions for transition.
    nodes.forEach(function (d) {
        d.x0 = d.x;
        d.y0 = d.y;
    });
}

// Toggle children on click.
function click(d) {
    if (d.children) {
        d._children = d.children;
        d.children = null;
    } else {
        d.children = d._children;
        d._children = null;
    }
    update(d);
}