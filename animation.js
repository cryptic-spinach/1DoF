function preload() {
  sound = loadSound('assets/sepia-sky.mp3');
  table = loadTable('data/mouse-recording.csv', 'csv', 'header');
}

function setup() {
  let canvas = createCanvas(windowWidth - canvasConfig.trimX, windowHeight - canvasConfig.trimY);
  canvas.parent("sketch-container");

  controls_init();

  table = formatTableAsJson();
  points = generateRandomPoints(10);
}
  
function draw() {
  background(0);
  translate((windowWidth - canvasConfig.trimX)/2, (windowHeight - canvasConfig.trimY)/2);
  scale(1, -1);

  slider.position((windowWidth - canvasConfig.trimX)/2 + sliderOffset.x, (windowHeight - canvasConfig.trimY)/2 + sliderOffset.y);

  let testAxes = new Axes(axisControls.x, axisControls.y, axisControls.size, axisControls.size);
  testAxes.show();

  let trendlineStart = new Point(axisControls.x - axisControls.w/2, axisControls.y - axisControls.h/2 + slider.value());
  let trendlineEnd   = new Point(axisControls.x + axisControls.w/2, axisControls.y + axisControls.h/2 + slider.value());
  let trendline = new Segment(trendlineStart, trendlineEnd);

  trendline.showAsSegment("#ffffff", 1);

  points.forEach(p => p.show());

}