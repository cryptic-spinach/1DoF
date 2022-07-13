import { axisControls, canvasConfig, sliderOffset, trendlineConfig } from "./configs.js";
import { Point } from "./components.js"

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
  let b = trendlineConfig.bInit - axisControls.x;
  let errorRange = 50;

  for (let i = 0; i < numberOfPoints; i++) {
    let xMin = axisControls.x - axisControls.w/2;
    let xMax = axisControls.x + axisControls.w/2;

    let x = p5.random(xMin, xMax);
    let y = p5.random(m*x + b - errorRange, m*x + b + errorRange);
    let point = new Point(x, y);
    ret.push(point);
  }

  return ret;
}

export function sliderInit(p5) {
  let ret;
  ret = p5.createSlider(-p5.PI, p5.PI, 0, 0.1);
  ret.position((p5.windowWidth - canvasConfig.trimX)/2 + sliderOffset.x, (p5.windowHeight - canvasConfig.trimY)/2 + sliderOffset.y);
  ret.style('width', '300px');
  return ret;
}

