import { trendlineConfig } from "./configs.js";

export function getTrendlineDisplay(p5, stepper, trendline, point) {
    switch (stepper) {
      case 1:
        break;
      case 2:
        trendline.showVerticalDistance(p5, point);
        break;
      case 3:
        trendline.showSquaredError(p5, point);
        break;
      case 4:
        trendline.showPerpendicularDistance(p5, point);
        break;
      case 5:
    }
  }

  export function getTrendlineLabelDisplay(p5, stepper, trendlineLabel) {
    switch (stepper) {
      case 1:
        trendlineLabel.showLabel(p5, trendlineConfig.labelFill);
        break;
      case 2:
        break;
      case 3:
        break;
      case 4:
        break;
      case 5:
    }
  }