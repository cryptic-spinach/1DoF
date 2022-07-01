function preload() {
  soundFormats('mp3');
  sound = loadSound('assets/sepia-sky.mp3');
  table = loadTable('assets/mouse-recording(13).csv')
}

function setup() {
  createCanvas(windowWidth, windowHeight - 200);
  controls_init();
}
  
function draw() {
  background(0);
  translate(windowWidth/2, windowHeight/2);
  scale(1, -1);
}