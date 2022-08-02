import { canvasConfig, sliderConfig, axisConfig, palette, trendlineConfig, stepperButtonConfig, sliderLabelConfig, trendlineLabelConfig, styles, curveConfig, testPoint1Config, testPoint2Config } from "./configs.js";
import { controlsInit } from "./controls.js";
import { formatTableAsJson, showValue, showValues, sliderInit, positionButton} from "./helpers.js"
import { Point, Segment, Axes, PointCloud, Slider } from "./components.js";
import { getTrendlineDisplay, getTrendlineLabelDisplay, getErrorCurveDisplay, getSliderDisplay, getCoordinateLabelDisplay, getStaticCoordinateLabelDisplay } from "./stepper.js"
import { generateLinearFitPoints, generateErrorCurvePoints, hardcodeLinearFitPoints } from "./point-factory.js";

export let sketch_1DoF = myp5 => {
  myp5.slider;
  let linearFitPoints;
  let errorCurvePoints;
  myp5.originalTrendline;
  myp5.buttons;
  myp5.stepper;

  myp5.setup = () => {
    myp5.createCanvas(myp5.windowWidth - canvasConfig.trimX, myp5.windowHeight - canvasConfig.trimY);
  
    controlsInit();
    myp5.buttons = myp5.buttonsInit(myp5);
    myp5.slider = sliderInit(myp5);

    linearFitPoints = hardcodeLinearFitPoints(myp5);
    //linearFitPoints = generateLinearFitPoints(myp5, 5);
    errorCurvePoints = generateErrorCurvePoints(myp5, linearFitPoints);

    myp5.stepper = 1;


    let trendlineStart = new Point( - axisConfig.left + axisConfig.x - trendlineConfig.extraX, - axisConfig.down + trendlineConfig.yIntInit + axisConfig.y - trendlineConfig.extraY);
    let trendlineEnd   = new Point(  axisConfig.right + axisConfig.x + trendlineConfig.extraX,   axisConfig.up + trendlineConfig.yIntInit + axisConfig.y + trendlineConfig.extraX);
    myp5.originalTrendline = new Segment(trendlineStart, trendlineEnd);
  };

  myp5.draw = () => {
    myp5.background(palette.backgroundFill);
    myp5.translate((myp5.windowWidth - canvasConfig.trimX)/2, (myp5.windowHeight - canvasConfig.trimY)/2);
    myp5.scale(1, -1);
    myp5.angleMode(myp5.RADIANS);
    myp5.updateDOM();

    // Calculation
    let sliderLabel = new Point(sliderLabelConfig.x, sliderLabelConfig.y, "b = " + myp5.slider.value().toFixed(2))
    let trendlineLabel = new Point(trendlineLabelConfig.x, trendlineLabelConfig.y, "y = bx")

    let trendlineAxes = new Axes(axisConfig.x, axisConfig.y, axisConfig.right, axisConfig.up, axisConfig.left, axisConfig.down, "x", "y");
    let curveAxes = new Axes(-axisConfig.x, axisConfig.y, axisConfig.right, axisConfig.up, axisConfig.left, axisConfig.down, "b = " + myp5.slider.value().toFixed(2), "Error", axisConfig.horizontalLabelXOffset, axisConfig.horizontalLabelYOffset, axisConfig.verticalLabelXOffset - 33, axisConfig.verticalLabelYOffset);

    let trendlineStart = new Point( - axisConfig.left + axisConfig.x - trendlineConfig.extraX, - axisConfig.down + trendlineConfig.yIntInit + axisConfig.y - trendlineConfig.extraY);
    let trendlineEnd   = new Point(  axisConfig.right + axisConfig.x + trendlineConfig.extraX,   axisConfig.up + trendlineConfig.yIntInit + axisConfig.y + trendlineConfig.extraX);
    let trendline = new Segment(trendlineStart, trendlineEnd);

    trendline.rotateSegmentBySlope(myp5, myp5.slider.value());

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
    getSliderDisplay(myp5, myp5.stepper, myp5.slider, sliderLabel);
    getCoordinateLabelDisplay(myp5, myp5.stepper, trendline, linearFitCloud.points);
    getStaticCoordinateLabelDisplay(myp5, myp5.stepper, myp5.originalTrendline, linearFitCloud.points);
    
    // myp5.noLoop()
  };

  myp5.windowResized = () => {
    myp5.resizeCanvas(myp5.windowWidth - canvasConfig.trimX, myp5.windowHeight - canvasConfig.trimY);
    myp5.updateDOM();
  }

  myp5.updateDOM = () => {
    myp5.slider.position((myp5.windowWidth - canvasConfig.trimX)/2 + sliderConfig.x, (myp5.windowHeight - canvasConfig.trimY)/2 + sliderConfig.y);
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


  myp5.dashedLine = (X1,Y1,X2,Y2) => {
    myp5.push();
    let d = 5; //dashed line length
    let P1 = myp5.createVector(X1,Y1); //point 1
    let P2 = myp5.createVector(X2,Y2); //point 2
    let P21 = p5.Vector.sub(P2, P1); // P2 - P1. 
    let L = p5.Vector.mag(P21); // length of line
    let u = p5.Vector.mult(P21,1/L) //unit vector in direction of line
  
    myp5.stroke('White');
    myp5.strokeWeight(2);
  
  
    // Calculate n and s
    let n;
    let s;
    if (3*d > L) {
      if (d > L) {
        n = 1;
        d = L;
        s = 0;
      } else {
        n = 2;
        s = L-2*d;
      }
    } else {
      n = myp5.floor((L+d)/(2*d)); //number of dashes
      s = (L-n*d)/(n-1); //spacing distance
    }
  
    // Plot n lines
    for (let i = 1; i < n+1; i++) {
      let q1 = (i-1)*d+(i-1)*s;
      let q2 = i*d+(i-1)*s;
  
      let StartDash = p5.Vector.add(p5.Vector.mult(u,q1), P1);
      let EndDash = p5.Vector.add(p5.Vector.mult(u,q2),P1);
  
      let x1 = StartDash.x;
      let y1 = StartDash.y;

  
      let x2 = EndDash.x;
      let y2 = EndDash.y;

  
      myp5.line(x1,y1,x2,y2);
    }
    myp5.pop()
  }

};

// export let part_1DoF = new p5(sketch_1DoF, document.querySelector(".part-1DoF"));