import { axisConfig, canvasConfig, sliderConfig, trendlineConfig, debugConfig, stepperButtonConfig} from "./configs.js";
import { Point } from "./components.js"
import { part_1DoF } from "./animation.js"

export function toSeconds (milliseconds) {
    return (milliseconds / 1000).toFixed(2);
  }
  
export function formatTableAsJson (data) {
  let ret = {};

  for (let i = 0; i < data.getRowCount(); i++) {
    let rowKey = data.rows[i].arr[0].toString();
    let rowX = data.rows[i].arr[1].toString();
    let rowY = data.rows[i].arr[2].toString();
    ret[rowKey] = {x: rowX, y: rowY};
  }
  return ret;
}

export function generateRandomPoints(p5, numberOfPoints) {
  let ret = []

  let m = trendlineConfig.mInit;
  let b = trendlineConfig.bInit;
  let errorRange = trendlineConfig.maxError;

  for (let i = 0; i < numberOfPoints; i++) {
    let xMin = - axisConfig.w/2;
    let xMax = axisConfig.w/2;

    let x = p5.random(xMin, xMax);
    let y = p5.random(m*x + b - errorRange, m*x + b + errorRange);

    x += axisConfig.x;
    y += axisConfig.y;
    
    let point = new Point(x, y);
    ret.push(point);
  }

  return ret;
}

export function sliderInit(p5) {
  let ret;
  ret = p5.createSlider(sliderConfig.min, sliderConfig.max, 0, 0.01);
  ret.position((p5.windowWidth - canvasConfig.trimX)/2 + sliderConfig.x, (p5.windowHeight - canvasConfig.trimY)/2 + sliderConfig.y);
  ret.style('width', '300px');
  return ret;
}

export function buttonsInit(p5) {
  let ret = [];
  let cnv = document.querySelector(".part-1DoF")

  for (let i = 0; i < 5; i++) {
    let stepperButton = document.createElement("button");
    stepperButton.innerHTML = (i+1).toString();
    stepperButton.className = "stepper-buttons";
    positionButton(p5, stepperButton, i)
    stepperButton.addEventListener("click", () => {
      part_1DoF.stepper = i + 1;
    })
    cnv.appendChild(stepperButton);
    ret.push(stepperButton);
  }

  
  return ret;
}

export function positionButton(p5, button, index) {
  button.style.left = parseInt(stepperButtonConfig.x + (p5.windowWidth  - canvasConfig.trimX)/2 + 90 * index).toString() + "px";
  button.style.top  = parseInt(stepperButtonConfig.y + (p5.windowHeight - canvasConfig.trimY)/2             ).toString() + "px";
}


export function showValues(p5, pairs) {
  for (let i = 0; i < pairs.length; i++) {
    showValue(p5, pairs[i].key, pairs[i].value, i);
  }
}

export function showValue(p5, key, value, position = 0) {
  let keyPoint = new Point(debugConfig.showValueX, debugConfig.showValueY + position * 50, key);
  let valuePoint = new Point(debugConfig.showValueX + debugConfig.showValueSpacer, debugConfig.showValueY + position * 50, value);  
  keyPoint.showLabel(p5, "#ffffff");
  valuePoint.showLabel(p5, "#ffffff");
}