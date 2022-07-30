import { axisConfig, sliderConfig, trendlineConfig, sliderLabelConfig} from "./configs.js";

export function getTrendlineDisplay(myp5, stepper, trendline, point) {
    switch (stepper) {
      case 1:
        break;
      case 2:
        trendline.showVerticalDistance(myp5, point);
        break;
      case 3:
        trendline.showVerticalDistance(myp5, point);
        break;
      case 4:
        trendline.showSquaredError(myp5, point);
        break;
      case 5:
        trendline.showPerpendicularDistance(myp5, point);
        break;
      case 6:
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
      case 6:
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
        break;
      case 6:
        axes.show(myp5);
        errorCurveCloud.showAsCurve(myp5);
        errorCurveCloud.showFunctionValue(myp5, trendline, linearFitPoints);
        break;
    }
  }

  export function getSliderDisplay(myp5, stepper, slider, sliderLabel) {
    switch (stepper) {
      case 1:
        slider.style('opacity', '1');
        sliderLabel.showLabel(myp5, sliderLabelConfig.labelFill);
        break;
      case 2:
        slider.style('opacity', '1');
        sliderLabel.showLabel(myp5, sliderLabelConfig.labelFill);
        break;
      case 3:
        slider.style('opacity', '1');
        sliderLabel.showLabel(myp5, sliderLabelConfig.labelFill);
        break;
      case 4:
        slider.style('opacity', '1');
        sliderLabel.showLabel(myp5, sliderLabelConfig.labelFill);
        break;
      case 5:
        slider.style('opacity', '1');
        sliderLabel.showLabel(myp5, sliderLabelConfig.labelFill);
        break;
      case 6:
        slider.style('opacity', '0');
        break;
    }
  }



export function getCoordinateLabelDisplay(myp5, stepper, trendline, points) {
  switch (stepper) {
    case 1:
      break;
    case 2:
      break;
    case 3:
      points.forEach(p => {
        let needsFlip = trendline.getNeedsFlip(myp5, p);
        p.showCoordinates(myp5, needsFlip)
      });
      break;
    case 4:
      break;
    case 5:
      break;
    case 6:
      break;
  }
}
