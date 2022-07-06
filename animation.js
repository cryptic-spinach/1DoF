function preload() {
  sound = loadSound('assets/sepia-sky.mp3');
  table = loadTable('data/mouse-recording.csv', 'csv', 'header');
}

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight - 200);
  canvas.parent("sketch-container");

  table = formatTableAsJson();
}
  
function draw() {
  background(0);
  translate(windowWidth/2, windowHeight/2);
  scale(1, -1);
}