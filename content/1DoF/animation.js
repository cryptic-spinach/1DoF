import { canvasConfig, sliderConfig, axisConfig, palette, trendlineConfig, stepperButtonConfig, sliderLabelConfig, trendlineLabelConfig, styles, curveConfig, testPoint1Config, testPoint2Config } from "./configs.js";
import { controlsInit } from "./controls.js";
import { formatTableAsJson, showValue, showValues, sliderInit, buttonsInit, positionButton} from "./helpers.js"
import { Point, Segment, Axes, PointCloud, Slider } from "./components.js";
import { getTrendlineDisplay, getTrendlineLabelDisplay, getErrorCurveDisplay } from "./stepper.js"
import { generateLinearFitPoints, generateErrorCurvePoints } from "./point-factory.js";

export let sketch_1DoF = myp5 => {
  let sound;
  let table;
  let slider;
  let canvasSlider
  let linearFitPoints;
  let errorCurvePoints;
  let data;
  myp5.buttons;
  myp5.stepper;

  myp5.preload = () => {
    sound = myp5.loadSound('content/1DoF/assets/sepia-sky.mp3');
    data = myp5.loadTable('content/1DoF/assets/mouse-recording.csv', 'csv', 'header');
  }

  myp5.setup = () => {
    myp5.createCanvas(myp5.windowWidth - canvasConfig.trimX, myp5.windowHeight - canvasConfig.trimY);
  
    controlsInit();
    myp5.buttons = buttonsInit(myp5);
    slider = sliderInit(myp5);
    // canvasSlider = new Slider(- axisConfig.x, axisConfig.y, 1);
  
    table = formatTableAsJson(data);

    linearFitPoints = generateLinearFitPoints(myp5, 10);
    errorCurvePoints = generateErrorCurvePoints(myp5, linearFitPoints);

    myp5.stepper = 1;
  };

  myp5.draw = () => {
    myp5.background(palette.backgroundFill);
    myp5.translate((myp5.windowWidth - canvasConfig.trimX)/2, (myp5.windowHeight - canvasConfig.trimY)/2);
    myp5.scale(1, -1);
    myp5.angleMode(myp5.RADIANS);
    myp5.updateDOM();

    // Calculation
    let sliderLabel = new Point(sliderLabelConfig.x, sliderLabelConfig.y, "b")
    let trendlineLabel = new Point(trendlineLabelConfig.x, trendlineLabelConfig.y, "y = bx")

    let trendlineAxes = new Axes(axisConfig.x, axisConfig.y, axisConfig.right, axisConfig.up, axisConfig.left, axisConfig.down, "x", "y");
    let curveAxes = new Axes(-axisConfig.x, axisConfig.y, axisConfig.right, axisConfig.up, axisConfig.left, axisConfig.down, "b", "E");

    let trendlineStart = new Point( - axisConfig.left + axisConfig.x - trendlineConfig.extraX, - axisConfig.down + trendlineConfig.yIntInit + axisConfig.y - trendlineConfig.extraY);
    let trendlineEnd   = new Point(  axisConfig.right + axisConfig.x + trendlineConfig.extraX,   axisConfig.up + trendlineConfig.yIntInit + axisConfig.y + trendlineConfig.extraX);
    let trendline = new Segment(trendlineStart, trendlineEnd);

    trendline.rotateSegmentBySlope(myp5, slider.value());
    // trendline.rotateSegmentBySlope(myp5, canvasSlider.value);

    let errorCurveCloud = new PointCloud(errorCurvePoints,  -axisConfig.x, axisConfig.y);
    let linearFitCloud = new PointCloud(linearFitPoints, axisConfig.x, axisConfig.y)

    // Display
    errorCurveCloud.showAsCurve(myp5);

    trendlineAxes.show(myp5);
    trendline.showAsTrendline(myp5, "#ffffff", 1.5, styles.segmentOpacity);

    // curveAxes.show(myp5);

    linearFitCloud.points.forEach(p => {
      getTrendlineDisplay(myp5, myp5.stepper, trendline, p);
    });

    linearFitCloud.points.forEach(p => {
      p.show(myp5);
    });

    // sliderLabel.showLabel(myp5, sliderLabelConfig.labelFill);
    getTrendlineLabelDisplay(myp5, myp5.stepper, trendlineLabel);

    getErrorCurveDisplay(myp5, myp5.stepper, errorCurveCloud, trendline, linearFitPoints)
    // myp5.noLoop()
  };

  myp5.windowResized = () => {
    myp5.resizeCanvas(myp5.windowWidth - canvasConfig.trimX, myp5.windowHeight - canvasConfig.trimY);
    myp5.updateDOM();
  }

  myp5.updateDOM = () => {
    slider.position((myp5.windowWidth - canvasConfig.trimX)/2 + sliderConfig.x, (myp5.windowHeight - canvasConfig.trimY)/2 + sliderConfig.y);
    let i = 0;
    myp5.buttons.forEach(b => {
      positionButton(myp5, b, i);
      i++;
    })
  }
  
  // myp5.mousePressed = () => {
  //   let trueMouseX = (myp5.mouseX - myp5.windowWidth/2);
  //   let trueMouseY = -(myp5.mouseY - myp5.windowHeight/2);

  //   if (myp5.dist(canvasSlider.getSliderPosition(), axisConfig.y, trueMouseX, trueMouseY) < styles.pointRadius) 
  //   {
  //     canvasSlider.setSelected(true);
  //   }
  // }

  // myp5.mouseDragged = () => {
  //   let trueMouseX = (myp5.mouseX - myp5.windowWidth/2);
  //   let pos = canvasSlider.getSliderPosition();
  //   let min = -axisConfig.x - axisConfig.left;
  //   let max = -axisConfig.x + axisConfig.right;
  //   if (canvasSlider.selected && pos >= min && pos <= max) {
  //     canvasSlider.setValue(trueMouseX);
  //   }
  //   if (pos < min) {
  //     canvasSlider.setValue(min)
  //   }
  //   if (pos > max) {
  //     canvasSlider.setValue(max)
  //   }
  // }

  // myp5.mouseReleased = () => {
  //   canvasSlider.setSelected(false);
  // }
};

export let part_1DoF = new p5(sketch_1DoF, document.querySelector(".part-1DoF"));