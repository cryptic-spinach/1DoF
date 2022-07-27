import { axisConfig, sliderConfig, trendlineConfig } from "./configs.js";

export function getTrendlineDisplay(myp5, stepper, trendline, point) {
    switch (stepper) {
      case 1:
        break;
      case 2:
        trendline.showVerticalDistance(myp5, point);
        break;
      case 3:
        trendline.showSquaredError(myp5, point);
        break;
      case 4:
        trendline.showPerpendicularDistance(myp5, point);
        break;
      case 5:
        trendline.showSquaredError(myp5, point);
        break;
    }
  }

  export function getTrendlineLabelDisplay(myp5, stepper, trendlineLabel) {
    switch (stepper) {
      case 1:
        trendlineLabel.showLabel(myp5, trendlineConfig.labelFill);
        break;
      case 2:
        break;
      case 3:
        break;
      case 4:
        break;
      case 5:
        break;
    }
  }

  export function getErrorCurveDisplay(myp5, stepper, errorCurveCloud, trendline, linearFitPoints, axes) {
    switch (stepper) {
      case 1:
        break;
      case 2:
        break;
      case 3:
        break;
      case 4:
        break;
      case 5:
        axes.show(myp5);
        errorCurveCloud.showAsCurve(myp5);
        errorCurveCloud.showFunctionValue(myp5, trendline, linearFitPoints);
        break;
    }
  }

  export function getSliderDisplay(myp5, stepper, slider) {
    switch (stepper) {
      case 1:
        break;
      case 2:

        break;
      case 3:

        break;
      case 4:

        break;
      case 5:

        break;
    }
  }