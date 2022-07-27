import { trendlineConfig, axisConfig, curveConfig, sliderConfig} from "./configs.js";
import { Point, PointCloud } from "./components.js";

export function generateLinearFitPoints(myp5, numberOfPoints) {
    let ret = []
  
    let m = trendlineConfig.slopeInit;
    let b = trendlineConfig.yIntInit;
    let errorRange = trendlineConfig.maxError;
  
    for (let i = 0; i < numberOfPoints; i++) {
      let xMin = - axisConfig.left;
      let xMax = axisConfig.right;
  
      let x = myp5.random(xMin, xMax);
      let y = myp5.random(m*x + b - errorRange, m*x + b + errorRange);
      
      let point = new Point(parseInt(x), parseInt(y));
      ret.push(point);
    }
  
    return ret;
  }

export function generateErrorCurvePoints(myp5, points) {
    let path = [];

    let qua  = points.map(p => p.x * p.x).reduce((partialSum, a) => partialSum + a, 0)     ;
    let lin  = points.map(p => p.x * p.y).reduce((partialSum, a) => partialSum + a, 0) * -2;
    let con  = points.map(p => p.y * p.y).reduce((partialSum, a) => partialSum + a, 0)     ;

    for (let b = sliderConfig.min; b < sliderConfig.max; b += 0.01) {
        let xPos = b;
        let yPos = (qua*b*b + lin*b + con);

        path.push({"x": xPos, "y": yPos});
    }

    return path;
}


export function hardcodeLinearFitPoints(myp5) {
  let ret = [];

  let pointData = [ { "x": 30, "y": 48, "label": "" }, { "x": -164, "y": -75, "label": "" }, { "x": -246, "y": -288, "label": "" }, { "x": 91, "y": 149, "label": "" }, { "x": 240, "y": 216, "label": "" }, { "x": -117, "y": -44, "label": "" }, { "x": 79, "y": 111, "label": "" }, { "x": -130, "y": -199, "label": "" }, { "x": 148, "y": 124, "label": "" }, { "x": -90, "y": -145, "label": "" } ];

  pointData.forEach(p => {
    let point = new Point(p.x, p.y);
    ret.push(point);
  })

  return ret
}
