export let palette = { 
    backgroundFill: "#3d3d3d",

    pointStroke: "#ff8700", 
    pointFill: "#000000",

    labelFill: "#1fced9",

    segmentFill: "#20c5c5",
};

export let projectionVecPalette = {
    uFill: "#05aaaa",
    vFill: "#d94343",
    wFill: "#f03c70",
    perpDistFill: "#ffffff",
}

export let projectionVecStyles = {
    weight: 1
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
}

export let sliderConfig = { 
    x: 198, 
    y: -11,
    min: -Math.PI / 4,
    max: Math.PI / 4
}

export let trendlineConfig = {
    mInit: 1,
    bInit: 0,
    extraX: 400,
    extraY: 400
}

export let debugConfig = {
    showValueX: 520,
    showValueY: 200,
    showValueSpacer: 200
}

export let distanceConfig = {
    showVertical: true
}