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

  moveMouse();
}

function toSeconds (milliseconds) {
  return (milliseconds / 1000).toFixed(2);
}

function moveMouse() {
  let timestampKey = parseInt(sound.currentTime() * 1000).toString();
  if (hasMouseChange(timestampKey)) {
    console.log("Found!")
    let mouse = document.querySelector(".mouse-container");
    let mousePos = table[timestampKey];
  
    mouse.style.top = mousePos.y + "%";
    mouse.style.left = mousePos.x + "%";
  }
}

function hasMouseChange(timestampKey) {
  return table[timestampKey] != null;
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