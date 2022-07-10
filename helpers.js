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

function generateRandomPoints(numberOfPoints) {
  let ret = []

  let m = 1;
  let b = 425;
  let errorRange = 50;

  for (let i = 0; i < numberOfPoints; i++) {
    let x = random(axisControls.x - axisControls.w/2, axisControls.x + axisControls.w/2);
    let y = random(m*x + b - errorRange, m*x + b + errorRange);
    let point = new Point(x, y);
    ret.push(point);
  }

  return ret;
}

