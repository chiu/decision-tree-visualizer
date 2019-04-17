var config = {
        container: "#basic-example",
        levelSeparation: 200,
        connectors: {type: "curve", style: {"stroke-width": 5}},
        node: {HTMLclass: "nodeExample1"}
    }, node0 = {
        text: {
            gini: "gini:0.749",
            samples: "samples: 67",
            attribute: "attribute: milk <= 0.5",
            class_name: "class_name: Mammal",
            value: "value: [1, 13, 7, 9, 5, 28, 4]"
        }, connectors: {type: "curve", style: {"stroke-width": 13.4}}, image: "plots/gini0.png"
    }, node1 = {
        parent: node0,
        text: {
            gini: "gini: 0.776",
            samples: "samples: 39",
            attribute: "attribute: feathers <= 0.5",
            class_name: "class_name: Bird",
            value: "value: [1, 13, 7, 9, 5, 0, 4]"
        },
        connectors: {type: "curve", style: {"stroke-width": 7.8}},
        image: "plots/gini1.png"
    }, node2 = {
        parent: node1,
        text: {
            gini: "gini: 0.746",
            samples: "samples: 26",
            attribute: "attribute: fins <= 0.5",
            class_name: "class_name: Fish",
            value: "value: [1, 0, 7, 9, 5, 0, 4]"
        },
        connectors: {type: "curve", style: {"stroke-width": 5.2}},
        image: "plots/gini2.png"
    }, node3 = {
        parent: node2,
        text: {
            gini: "gini: 0.685",
            samples: "samples: 17",
            attribute: "attribute: backbone <= 0.5",
            class_name: "class_name: Bug",
            value: "value: [1, 0, 7, 0, 5, 0, 4]"
        },
        connectors: {type: "curve", style: {"stroke-width": 3.4}},
        image: "plots/gini3.png"
    }, node4 = {
        parent: node3,
        text: {
            gini: "gini: 0.486",
            samples: "samples: 12",
            attribute: "attribute: predator <= 0.5",
            class_name: "class_name: Bug",
            value: "value: [0, 0, 7, 0, 5, 0, 0]"
        },
        connectors: {type: "curve", style: {"stroke-width": 2.4}},
        image: "plots/gini4.png"
    }, node5 = {
        parent: node4,
        text: {
            gini: "gini: 0.0",
            samples: "samples: 6",
            attribute: "attribute: nan",
            class_name: "class_name: Bug",
            value: "value: [0, 0, 6, 0, 0, 0, 0]"
        },
        connectors: {type: "curve", style: {"stroke-width": 1.2}},
        image: "plots/gini5.png"
    }, node6 = {
        parent: node4,
        text: {
            gini: "gini: 0.278",
            samples: "samples: 6",
            attribute: "attribute: airborne <= 0.5",
            class_name: "class_name: Invertebrate",
            value: "value: [0, 0, 1, 0, 5, 0, 0]"
        },
        connectors: {type: "curve", style: {"stroke-width": 1.2}},
        image: "plots/gini6.png"
    }, node7 = {
        parent: node6,
        text: {
            gini: "gini: 0.0",
            samples: "samples: 5",
            attribute: "attribute: nan",
            class_name: "class_name: Invertebrate",
            value: "value: [0, 0, 0, 0, 5, 0, 0]"
        },
        connectors: {type: "curve", style: {"stroke-width": 1.0}},
        image: "plots/gini7.png"
    }, node8 = {
        parent: node6,
        text: {
            gini: "gini: 0.0",
            samples: "samples: 1",
            attribute: "attribute: nan",
            class_name: "class_name: Bug",
            value: "value: [0, 0, 1, 0, 0, 0, 0]"
        },
        connectors: {type: "curve", style: {"stroke-width": 0.2}},
        image: "plots/gini8.png"
    }, node9 = {
        parent: node3,
        text: {
            gini: "gini: 0.32",
            samples: "samples: 5",
            attribute: "attribute: tail <= 0.5",
            class_name: "class_name: Reptile",
            value: "value: [1, 0, 0, 0, 0, 0, 4]"
        },
        connectors: {type: "curve", style: {"stroke-width": 1.0}},
        image: "plots/gini9.png"
    }, node10 = {
        parent: node9,
        text: {
            gini: "gini: 0.0",
            samples: "samples: 1",
            attribute: "attribute: nan",
            class_name: "class_name: Amphibian",
            value: "value: [1, 0, 0, 0, 0, 0, 0]"
        },
        connectors: {type: "curve", style: {"stroke-width": 0.2}},
        image: "plots/gini10.png"
    }, node11 = {
        parent: node9,
        text: {
            gini: "gini: 0.0",
            samples: "samples: 4",
            attribute: "attribute: nan",
            class_name: "class_name: Reptile",
            value: "value: [0, 0, 0, 0, 0, 0, 4]"
        },
        connectors: {type: "curve", style: {"stroke-width": 0.8}},
        image: "plots/gini11.png"
    }, node12 = {
        parent: node2,
        text: {
            gini: "gini: 0.0",
            samples: "samples: 9",
            attribute: "attribute: nan",
            class_name: "class_name: Fish",
            value: "value: [0, 0, 0, 9, 0, 0, 0]"
        },
        connectors: {type: "curve", style: {"stroke-width": 1.8}},
        image: "plots/gini12.png"
    }, node13 = {
        parent: node1,
        text: {
            gini: "gini: 0.0",
            samples: "samples: 13",
            attribute: "attribute: nan",
            class_name: "class_name: Bird",
            value: "value: [0, 13, 0, 0, 0, 0, 0]"
        },
        connectors: {type: "curve", style: {"stroke-width": 2.6}},
        image: "plots/gini13.png"
    }, node14 = {
        parent: node0,
        text: {
            gini: "gini: 0.0",
            samples: "samples: 28",
            attribute: "attribute: nan",
            class_name: "class_name: Mammal",
            value: "value: [0, 0, 0, 0, 0, 28, 0]"
        },
        connectors: {type: "curve", style: {"stroke-width": 5.6}},
        image: "plots/gini14.png"
    },
    chart_config = [config, node0, node1, node2, node3, node4, node5, node6, node7, node8, node9, node10, node11, node12, node13, node14];