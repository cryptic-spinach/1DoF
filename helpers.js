import { axisControls, canvasConfig, sliderOffset } from "./configs.js";
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

  let m = 1;
  let b = 425;
  let errorRange = 50;

  for (let i = 0; i < numberOfPoints; i++) {
    let x = p5.random(axisControls.x - axisControls.w/2, axisControls.x + axisControls.w/2);
    let y = p5.random(m*x + b - errorRange, m*x + b + errorRange);
    let point = new Point(x, y);
    ret.push(point);
  }

  return ret;
}

export function slider_init(p5) {
  let ret;
  ret = p5.createSlider(-axisControls.h/2, axisControls.h/2, 0, 0.1);
  ret.position((p5.windowWidth - canvasConfig.trimX)/2 + sliderOffset.x, (p5.windowHeight - canvasConfig.trimY)/2 + sliderOffset.y);
  ret.style('width', '300px');
  return ret;
}

