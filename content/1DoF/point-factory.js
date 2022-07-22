import { trendlineConfig, axisConfig} from "./configs.js";
import { Point } from "./components.js";

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