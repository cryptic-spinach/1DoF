export function getTrendlineDisplay(p5, stepper, trendline, point) {
    switch (stepper) {
      case 1:
        break;
      case 2:
        trendline.showVerticalDistance(p5, point);
        break;
      case 3:
        break;
      case 4:
        trendline.showPerpendicularDistance(p5, point);
        break;
      case 5:
    }
  }