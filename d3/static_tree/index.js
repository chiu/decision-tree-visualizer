//JSON object with the data
var treeData = {
    "name": "node0",
    "left_edge": "False",
    "right_edge": "True",
    "attribute": "milk <= 0.5",
    "samples": 67,
    "distribution": [28, 13, 9, 7, 5, 4, 1],
    "children": [
        {
            "name": "node1",
            "attribute": "feathers <= 0.5",
            "parent": 0,
            "samples": 39,
            "distribution": [0, 13, 9, 7, 5, 4, 1],
            "children": [
                {
                    "name": "node2",
                    "attribute": "fins <= 0.5",
                    "parent": 1,
                    "samples": 26,
                    "distribution": [0, 0, 9, 7, 5, 4, 1],
                    "children": [{
                        "name": "node3",
                        "attribute": "backbone <= 0.5",
                        "parent": 2,
                        "samples": 17,
                        "distribution": [0, 0, 0, 7, 5, 4, 1],
                        "children": [
                            {
                                "name": "node4",
                                "attribute": "predator <= 0.5",
                                "parent": 3,
                                "samples": 12,
                                "distribution": [0, 0, 0, 7, 5, 0, 0],
                                "children": [
                                    {
                                        "name": "node5",
                                        "attribute": "nan",
                                        "parent": 4,
                                        "samples": 6,
                                        "distribution": [0, 0, 0, 6, 0, 0, 0],
                                    },
                                    {
                                        "name": "node6",
                                        "attribute": "airborne <= 0.5",
                                        "parent": 4,
                                        "samples": 6,
                                        "distribution": [0, 0, 0, 1, 5, 0, 0],
                                        "children": ['7', '8']
                                    },
                                ]
                            }, {
                                "name": "node9",
                                "attribute": "tail <= 0.5",
                                "parent": 3,
                                "samples": 5,
                                "distribution": [0, 0, 0, 0, 0, 4, 1],
                                "children": ['10', '11']
                            },
                        ]
                    }, {
                        "name": "node12",
                        "attribute": "nan",
                        "parent": 2,
                        "samples": 9,
                        "distribution": [0, 0, 9, 0, 0, 0, 0],
                    }]
                }, {
                    "name": "node13",
                    "attribute": "nan",
                    "parent": 1,
                    "samples": 13,
                    "distribution": [0, 13, 0, 0, 0, 0, 0],
                },]
        },
        {
            "name": "node14",
            "attribute": "nan",
            "parent": 0,
            "samples": 28,
            "distribution": [28, 0, 0, 0, 0, 0, 0],
        },
    ]
};


// var linkData = [
// {source: "node0", target: "node18"},
// {source: "node0", target: "node1"}
// ];

// Create a svg canvas
var vis = d3.select("#viz").append("svg:svg")
    .attr("width", 1200)
    .attr("height", 1200)
    .append("svg:g")
    .attr("transform", "translate(40, 30)"); // shift everything to the right


// Add tooltip div
var div = d3.select("body").append("div")
    .attr("class", "tooltip")
    .html("<p>This is a SVG inside a tooltip:</p><div id='tipDiv'>hi</div>")
    .style("opacity", 1e-6);

// Create a tree "canvas"
var tree = d3.layout.tree()
    .size([600, 600]);

var diagonal = d3.svg.diagonal();

// Preparing the data for the tree layout, convert data into an array of nodes
var nodes = tree.nodes(treeData);
console.log(nodes);
// Create an array with all the links

// var links_try = linkData;
// console.log("links try is ");
// console.log(links_try);
var links = tree.links(nodes);
console.log("actual links are " + links);

console.log("Raw:");
console.log(treeData);
console.log("Nodes:");
console.log(nodes);
console.log("Links:");
console.log(links);

// Show me a link in raw and its path version
console.log(links[0]);
console.log(diagonal(links[0]));

var link = vis.selectAll("pathlink")
    .data(links)
    .enter().append("svg:path")
    .attr("class", "link")
    .attr("d", diagonal)
    .style("stroke", 'lightgrey')
    .style("stroke-width", function (d) {
        return (d.target.samples)
    });

var node = vis.selectAll("g.node")
    .data(nodes)
    .enter().append("svg:g")
    .attr("transform", function (d) {
        return "translate(" + d.x + "," + d.y + ")";
    });

// Add the dot at every node
node.append("svg:rect")
    .on("mouseover", mouseover)
    .on("click", click)
    .on("mousemove", function (d) {
        mousemove(d);
    })
    .on("mouseout", mouseout)
    .attr("fill", "blue")
    .attr("height", 30)
    .attr("width", function (d) {
        return d.samples;
    })
    .attr("transform", function (d) {
        return "translate(-" + d.samples / 2 + "," + 0 + ")";
    });

node.append("text")
    .attr("dx", -20)
    .attr("dy", -10)
    .attr('color', 'white')
    .text(function (d) {
        return d.name
    });

node.append("text")
    .attr("dx", -20)
    .attr("dy", 60)
    .text(function (d) {
        return d.attribute;
    });

node.append("text")
    .attr("dx", -90)
    .attr("dy", 100)
    .text(function (d) {
        return d.left_edge;
    });

node.append("text")
    .attr("dx", 50)
    .attr("dy", 100)
    .text(function (d) {
        return d.right_edge;
    });


function mouseover() {
    div.transition()
        .duration(300)
        .style("opacity", 1);
}


function click(d) {

    d3.selectAll("rect").attr("style", "outline: 0px;");
    console.log("d.name is " + d.name);
    let this_node = d3.select(this);
    // this_node.attr('class', 'toggled_on');
    this_node.attr("style", "outline: 5px solid orange;");
    console.log("class is " + this_node.attr("class"));
    // console.log("class is " + this_node.attr("class") == "toggled_on");

    var div = d3.select("body").append("div")
        .attr("class", "attributetip")
        .html("\<img src=\"python_plots/" + d.name + ".png\" style=\"float:right;width:400px;height:2500px;\">");

    //this_node.style("outline", "solid 10px orange");

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
    var rect_colors = ['#db5f57', '#dbd057', '#75db57', '#57dbaa', '#579bdb', '#8557db', '#db57c0'];
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
        })
        .attr("fill", function (d, i) {
            return rect_colors[i];
        });

    var x_names = d3.scale.ordinal()
        .domain(['Mammal', 'Bird', 'Fish', 'Bug', 'Invertebrate', 'Reptile', 'Amphibian'])
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
        .attr("y", 15)
        .attr("x", 0)
        .attr("dy", ".35em")
        .attr("transform", "rotate(45)")
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