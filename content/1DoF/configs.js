export let palette = { 
    backgroundFill: "#3d3d3d",

    pointStroke: "#42f595", 
    pointFill: "#000000",

    labelFill: "#1fced9",

    segmentFill: "#20c5c5",
};

export let projectionVecPalette = {
    uFill: "#05aaaa",
    vFill: "#d94343",
    wFill: "#f03c70",
    distFill: "#ffbe26",
}

export let projectionVecStyles = {
    weight: 2
}

export let styles = {
    pointRadius: 15,
    pointStrokeWeight: 3,

    labelTextSize: 35,
    labelOffsetX: 30,
    labelOffsetY: 0,
    
    segmentArrowSize: 15,
    segmentWeight: 3
}

export let canvasConfig = {
    trimX: 0,
    trimY: 0,
}

export let axisConfig = {
    x: -350,
    y: 0,
    w: 500,
    h: 500,
    size: 500,
    horizontalLabelXOffset: 20,
    horizontalLabelYOffset: 9,
    verticalLabelXOffset: -8,
    verticalLabelYOffset: -26,
}

export let axisPalette = {
    fill: "#20c5c5",
}

export let sliderConfig = { 
    x: 198, 
    y: -11,
    min: -Math.PI / 4,
    max: Math.PI / 4
}

export let trendlineConfig = {
    mInit: 1.5,
    bInit: 100,
    extraX: 0,
    extraY: 0,
    maxError: 100
}

export let debugConfig = {
    showValueX: 520,
    showValueY: 200,
    showValueSpacer: 200
}

export let distanceConfig = {
    showVertical: true
}