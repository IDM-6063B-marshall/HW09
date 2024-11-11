let mCamera;

function preload() {
  mCamera = createCapture(VIDEO);
  mCamera.size();
  mCamera.hide();
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0, 0, 0);
  //image(mCamera, 0, 0);
  mCamera.loadPixels();
  noStroke();

  let rectDim = 4;
  noStroke();
  for (let y = 0; y < height; y += rectDim) {
    for (let x = 0; x < width; x += rectDim) {
      //displays the pixels across the whole screen
      let pixX = map(x, 0, width, 0, mCamera.width);
      let pixY = map(y, 0, height, 0, mCamera.height);
      let pixIdx = int(pixY) * mCamera.width + int(pixX);
      let p5Idx = 4 * pixIdx;

      let redVal = mCamera.pixels[p5Idx + 0];
      let greenVal = mCamera.pixels[p5Idx + 1];
      let blueVal = mCamera.pixels[p5Idx + 2];

      fill((redVal + greenVal + blueVal) / 3);
      let fillVal = (redVal + greenVal + blueVal) / 3;
      let dim = map(fillVal, 0, 255, 1, 20);
      //randomize X
      let rx = random(1, 20);
      //randomize Y
      let ry = random(1, 20);
      push();
      translate(x, y);
      rect(rx, ry, 1, dim);
      pop();
    }
  }
}
