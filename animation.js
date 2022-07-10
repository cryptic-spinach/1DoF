function preload() {
  sound = loadSound('assets/sepia-sky.mp3');
  table = loadTable('data/mouse-recording.csv', 'csv', 'header');
}

function setup() {
  let canvas = createCanvas(windowWidth - canvasConfig.trimX, windowHeight - canvasConfig.trimY);
  canvas.parent("sketch-container");

  controls_init();

  table = formatTableAsJson();
}
  
function draw() {
  background(0);
  translate((windowWidth - canvasConfig.trimX)/2, (windowHeight - canvasConfig.trimY)/2);
  scale(1, -1);

  slider.position((windowWidth - canvasConfig.trimX)/2 + sliderOffset.x, (windowHeight - canvasConfig.trimY)/2 + sliderOffset.y);

  // let yAxisStart = new Point(0 + axisOffset.x, -200 + axisOffset.y);
  // let yAxisEnd = new Point(0 + axisOffset.x, 200 + axisOffset.y);
  // let yAxis = new Segment(yAxisStart, yAxisEnd);

  // let xAxisStart = new Point(-200 + axisOffset.x, 0 + axisOffset.y);
  // let xAxisEnd = new Point(200 + axisOffset.x, 0 + axisOffset.y);
  // let xAxis = new Segment(xAxisStart, xAxisEnd);

  // xAxis.showAsAxis();
  // yAxis.showAsAxis();

  let testAxes = new Axes(-300, 0, 400, 400);
  testAxes.show();


  let test1 = new Point(300, 0);
  test1.show();
  
  let test2 = new Point(-300, 0);
  test2.show();
}