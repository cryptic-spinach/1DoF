import { canvasConfig, sliderConfig, axisConfig, palette, trendlineConfig, stepperButtonConfig, sliderLabelConfig, trendlineLabelConfig, styles, curveConfig, testPoint1Config, testPoint2Config } from "./configs.js";
import { controlsInit } from "./controls.js";
import { formatTableAsJson, showValue, showValues, sliderInit, positionButton} from "./helpers.js"
import { Point, Segment, Axes, PointCloud, Slider } from "./components.js";
import { getTrendlineDisplay, getTrendlineLabelDisplay, getErrorCurveDisplay, getSliderDisplay } from "./stepper.js"
import { generateLinearFitPoints, generateErrorCurvePoints, hardcodeLinearFitPoints } from "./point-factory.js";

export let sketch_1DoF = myp5 => {
  let slider;
  let linearFitPoints;
  let errorCurvePoints;
  myp5.buttons;
  myp5.stepper;

  myp5.setup = () => {
    myp5.createCanvas(myp5.windowWidth - canvasConfig.trimX, myp5.windowHeight - canvasConfig.trimY);
  
    controlsInit();
    myp5.buttons = myp5.buttonsInit(myp5);
    slider = sliderInit(myp5);

    linearFitPoints = hardcodeLinearFitPoints(myp5);
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
    let curveAxes = new Axes(-axisConfig.x, axisConfig.y, axisConfig.right, axisConfig.up, axisConfig.left, axisConfig.down, "b = " + slider.value().toFixed(2), "E");

    let trendlineStart = new Point( - axisConfig.left + axisConfig.x - trendlineConfig.extraX, - axisConfig.down + trendlineConfig.yIntInit + axisConfig.y - trendlineConfig.extraY);
    let trendlineEnd   = new Point(  axisConfig.right + axisConfig.x + trendlineConfig.extraX,   axisConfig.up + trendlineConfig.yIntInit + axisConfig.y + trendlineConfig.extraX);
    let trendline = new Segment(trendlineStart, trendlineEnd);

    trendline.rotateSegmentBySlope(myp5, slider.value());

    let errorCurveCloud = new PointCloud(errorCurvePoints,  -axisConfig.x, axisConfig.y);
    let linearFitCloud = new PointCloud(linearFitPoints, axisConfig.x, axisConfig.y)

    // Display
    trendlineAxes.show(myp5);
    trendline.showAsTrendline(myp5, "#ffffff", 1.5, styles.segmentOpacity);


    linearFitCloud.points.forEach(p => {
      getTrendlineDisplay(myp5, myp5.stepper, trendline, p);
    });

    linearFitCloud.points.forEach(p => {
      p.show(myp5);
    });

    getTrendlineLabelDisplay(myp5, myp5.stepper, trendlineLabel);
    getErrorCurveDisplay(myp5, myp5.stepper, errorCurveCloud, trendline, linearFitPoints, curveAxes);
    getSliderDisplay(myp5, myp5.stepper, slider, sliderLabel);
    
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
  
  myp5.keyPressed = () => {
    if (myp5.keyCode == 80) {

      console.log(linearFitPoints);
    }
  }

  myp5.buttonsInit = () => {
    let ret = [];
    let cnv = document.querySelector(".part-1DoF")
  
    for (let i = 0; i < 6; i++) {
      let stepperButton = document.createElement("button");
      stepperButton.innerHTML = (i+1).toString();
      stepperButton.className = "stepper-buttons";
      positionButton(myp5, stepperButton, i)
      stepperButton.addEventListener("click", () => {
        myp5.stepper = i + 1;
      })
      cnv.appendChild(stepperButton);
      ret.push(stepperButton);
    }
  
    
    return ret;
  }
};

// export let part_1DoF = new p5(sketch_1DoF, document.querySelector(".part-1DoF"));