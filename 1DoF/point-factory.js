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
      
      let point = new Point(parseInt(x), parseInt(y), (i + 1).toString());
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

  // let pointData = [ { "x": 30, "y": 48, "label": "1" }, { "x": -164, "y": -75, "label": "2" }, { "x": -246, "y": -288, "label": "3" }, { "x": 91, "y": 149, "label": "4" }, { "x": 240, "y": 216, "label": "5" }, { "x": -117, "y": -44, "label": "6" }, { "x": 79, "y": 111, "label": "7" }, { "x": -130, "y": -199, "label": "8" }, { "x": 148, "y": 124, "label": "9" }];
  let pointData = [ { "x": 154, "y": 105, "label": "1" }, { "x": -109, "y": -39, "label": "2" }, { "x": 222, "y": 303, "label": "3" }, { "x": 24, "y": 70, "label": "4" }, { "x": -74, "y": -143, "label": "5" } ]
  pointData.forEach(p => {
    let point = new Point(p.x, p.y, p.label);
    ret.push(point);
  })

  return ret
}
