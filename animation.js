function preload() {
  sound = loadSound('assets/sepia-sky.mp3');
  table = loadTable('assets/mouse-recording.csv')
}

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight - 200);
  canvas.parent("sketch-container");
  controls_init();
}
  
function draw() {
  background(0);
  translate(windowWidth/2, windowHeight/2);
  scale(1, -1);
}