function preload() {
  sound = loadSound('assets/sepia-sky.mp3');
  table = loadTable('assets/mouse-recording.csv', 'csv', 'header');
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

function toSeconds (milliseconds) {
  return (milliseconds / 1000).toFixed(2);
}

function formatTableAsJson () {
  let ret = {};
  
  for (let i = 0; i < table.getRowCount(); i++) {
    let rowKey = table.rows[i].arr[0].toString();
    let rowX = table.rows[i].arr[1].toString();
    let rowY = table.rows[i].arr[2].toString();
    ret[rowKey] = {x: rowX, y: rowY};
  }
  return ret;
}