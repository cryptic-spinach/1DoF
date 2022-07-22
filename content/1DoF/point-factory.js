import { trendlineConfig, axisConfig} from "./configs.js";
import { Point } from "./components.js";

export function generatePlotPoints(myp5, numberOfPoints) {
    let ret = []
  
    let m = trendlineConfig.mInit;
    let b = trendlineConfig.bInit;
    let errorRange = trendlineConfig.maxError;
  
    for (let i = 0; i < numberOfPoints; i++) {
      let xMin = - axisConfig.w/2;
      let xMax = axisConfig.w/2;
  
      let x = myp5.random(xMin, xMax);
      let y = myp5.random(m*x + b - errorRange, m*x + b + errorRange);
  
      x += axisConfig.x;
      y += axisConfig.y;
      
      let point = new Point(x, y);
      ret.push(point);
    }
  
    return ret;
  }

export function generateErrorCurvePoints() {
    let n = 600;
    let path = [];
    let a = 0.25;

    for (let x = -n/2; x < n/2; x++) {
        let y = a * x*x;
        path.push({"x": x, "y": y});
    }

    return path;
}