function preload() {
  soundFormats('mp3');
  sound = loadSound('assets/sepia-sky.mp3');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  controls_init();
}
  
function draw() {
  background(0);
  translate(windowWidth/2, windowHeight/2);
  scale(1, -1);
}