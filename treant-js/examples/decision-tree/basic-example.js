var config = {
        container: "#basic-example",
        animateOnInit: true,
        node: {
            HTMLclass: "nodeExample1",
            collapsable: true,
            collapsed: true
        },
        animation: {
            nodeAnimation: "easeOutBounce",
            nodeSpeed: 700,
            connectorsAnimation: "bounce",
            connectorsSpeed: 700
        }
    },
    node0 = { text: { gini: "gini:0.759", samples: "samples: 101", attribute: "attribute: milk <= 0.5", class_name: "class_name: Bug", value: "value: [4, 20, 8, 13, 10, 41, 5]" }, connectors: { type: "curve", style: { "stroke-width": 20.2 } }, image: "plots/gini0.png" },
    node1 = { parent: node0, text: { gini: "gini: 0.785", samples: "samples: 60", attribute: "attribute: feathers <= 0.5", class_name: "class_name: Bird", value: "value: [4, 20, 8, 13, 10, 0, 5]" }, connectors: { type: "curve", style: { "stroke-width": 12.0 } }, image: "plots/gini1.png" },
    node2 = { parent: node1, text: { gini: "gini: 0.766", samples: "samples: 40", attribute: "attribute: fins <= 0.5", class_name: "class_name: Fish", value: "value: [4, 0, 8, 13, 10, 0, 5]" }, connectors: { type: "curve", style: { "stroke-width": 8.0 } }, collapsable: false, image: "plots/gini2.png" },
    node3 = { parent: node2, text: { gini: "gini: 0.719", samples: "samples: 27", attribute: "attribute: backbone <= 0.5", class_name: "class_name: Amphibian", value: "value: [4, 0, 8, 0, 10, 0, 5]" }, connectors: { type: "curve", style: { "stroke-width": 5.4 } }, image: "plots/gini3.png" },
    node4 = { parent: node3, text: { gini: "gini: 0.494", samples: "samples: 18", attribute: "attribute: airborne <= 0.5", class_name: "class_name: Amphibian", value: "value: [0, 0, 8, 0, 10, 0, 0]" }, connectors: { type: "curve", style: { "stroke-width": 3.6 } }, image: "plots/gini4.png" },
    node5 = { parent: node4, text: { gini: "gini: 0.278", samples: "samples: 12", attribute: "attribute: predator <= 0.5", class_name: "class_name: Amphibian", value: "value: [0, 0, 2, 0, 10, 0, 0]" }, connectors: { type: "curve", style: { "stroke-width": 2.4 } }, image: "plots/gini5.png" },
    node6 = { parent: node5, text: { gini: "gini: 0.5", samples: "samples: 4", attribute: "attribute: legs <= 3.0", class_name: "class_name: Reptile", value: "value: [0, 0, 2, 0, 2, 0, 0]" }, connectors: { type: "curve", style: { "stroke-width": 0.8 } }, image: "plots/gini6.png" },
    node7 = { parent: node6, text: { gini: "gini: 0.0", samples: "samples: 2", attribute: "attribute: nan", class_name: "class_name: Amphibian", value: "value: [0, 0, 0, 0, 2, 0, 0]" }, connectors: { type: "curve", style: { "stroke-width": 0.4 } }, image: "plots/gini7.png" },
    node8 = { parent: node6, text: { gini: "gini: 0.0", samples: "samples: 2", attribute: "attribute: nan", class_name: "class_name: Reptile", value: "value: [0, 0, 2, 0, 0, 0, 0]" }, connectors: { type: "curve", style: { "stroke-width": 0.4 } }, image: "plots/gini8.png" },
    node9 = { parent: node5, text: { gini: "gini: 0.0", samples: "samples: 8", attribute: "attribute: nan", class_name: "class_name: Amphibian", value: "value: [0, 0, 0, 0, 8, 0, 0]" }, connectors: { type: "curve", style: { "stroke-width": 1.6 } }, image: "plots/gini9.png" },
    node10 = { parent: node4, text: { gini: "gini: 0.0", samples: "samples: 6", attribute: "attribute: nan", class_name: "class_name: Reptile", value: "value: [0, 0, 6, 0, 0, 0, 0]" }, connectors: { type: "curve", style: { "stroke-width": 1.2 } }, image: "plots/gini10.png" },
    node11 = { parent: node3, text: { gini: "gini: 0.494", samples: "samples: 9", attribute: "attribute: aquatic <= 0.5", class_name: "class_name: Invertebrate", value: "value: [4, 0, 0, 0, 0, 0, 5]" }, connectors: { type: "curve", style: { "stroke-width": 1.8 } }, image: "plots/gini11.png" },
    node12 = { parent: node11, text: { gini: "gini: 0.0", samples: "samples: 4", attribute: "attribute: nan", class_name: "class_name: Invertebrate", value: "value: [0, 0, 0, 0, 0, 0, 4]" }, connectors: { type: "curve", style: { "stroke-width": 0.8 } }, image: "plots/gini12.png" },
    node13 = { parent: node11, text: { gini: "gini: 0.32", samples: "samples: 5", attribute: "attribute: breathes <= 0.5", class_name: "class_name: Mammal", value: "value: [4, 0, 0, 0, 0, 0, 1]" }, connectors: { type: "curve", style: { "stroke-width": 1.0 } }, image: "plots/gini13.png" },
    node14 = { parent: node13, text: { gini: "gini: 0.0", samples: "samples: 1", attribute: "attribute: nan", class_name: "class_name: Invertebrate", value: "value: [0, 0, 0, 0, 0, 0, 1]" }, connectors: { type: "curve", style: { "stroke-width": 0.2 } }, image: "plots/gini14.png" },
    node15 = { parent: node13, text: { gini: "gini: 0.0", samples: "samples: 4", attribute: "attribute: nan", class_name: "class_name: Mammal", value: "value: [4, 0, 0, 0, 0, 0, 0]" }, connectors: { type: "curve", style: { "stroke-width": 0.8 } }, image: "plots/gini15.png" },
    node16 = { parent: node2, text: { gini: "gini: 0.0", samples: "samples: 13", attribute: "attribute: nan", class_name: "class_name: Fish", value: "value: [0, 0, 0, 13, 0, 0, 0]" }, connectors: { type: "curve", style: { "stroke-width": 2.6 } }, image: "plots/gini16.png" },
    node17 = { parent: node1, text: { gini: "gini: 0.0", samples: "samples: 20", attribute: "attribute: nan", class_name: "class_name: Bird", value: "value: [0, 20, 0, 0, 0, 0, 0]" }, connectors: { type: "curve", style: { "stroke-width": 4.0 } }, image: "plots/gini17.png" },
    node18 = { parent: node0, text: { gini: "gini: 0.0", samples: "samples: 41", attribute: "attribute: nan", class_name: "class_name: Bug", value: "value: [0, 0, 0, 0, 0, 41, 0]" }, connectors: { type: "curve", style: { "stroke-width": 8.2 } }, image: "plots/gini18.png" },
    chart_config = [config, node0, node1, node2, node3, node4, node5, node6, node7, node8, node9, node10, node11, node12, node13, node14, node15, node16, node17, node18];