function preload() {
  sound = loadSound('assets/sepia-sky.mp3');
  table = loadTable('data/mouse-recording.csv', 'csv', 'header');
}

function setup() {
  let canvas = createCanvas(windowWidth - canvasConfig.trimX, windowHeight - canvasConfig.trimY);
  canvas.parent("sketch-container");

  table = formatTableAsJson();
}
  
function draw() {
  background(0);
  translate((windowWidth - canvasConfig.trimX)/2, (windowHeight - canvasConfig.trimY)/2);
  scale(1, -1);

  let yAxisStart = new Point(-500, -300);
  let yAxisEnd = new Point(-500, 300);
  let yAxis = new Segment(yAxisStart, yAxisEnd);

  let xAxisStart = new Point(-550, -250);
  let xAxisEnd = new Point(450, -250);
  let xAxis = new Segment(xAxisStart, xAxisEnd);

  xAxis.showSlopeVec();
  yAxis.showSlopeVec();
}