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

  let testAxes = new Axes(axisControls.x, axisControls.y, axisControls.size, axisControls.size);
  testAxes.show();
}