// original image, to use as reference for pixel colors
let oImg;

// display image, to modify and display on canvas
let mImg;

let slider;

function preload() {
  oImg = loadImage("../assets/mondriaan.jpg");
  mImg = loadImage("../assets/mondriaan.jpg");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  oImg.resize(0, height);
  mImg.resize(0, height);

  // Load pixel data from the original image
  oImg.loadPixels();

  // Slider to control yellowness
  slider = createSlider(80, 160, 80); 
  slider.position(10, 10);
  slider.size(150);

}

function isYellow(r, g, b, threshold) {
  let MONDRIAN_YELLOW = color(250, 200, 60);  

  //pulls the RGB values of mondrian yellow
  let redForYellow = red(MONDRIAN_YELLOW);
  let greenForYellow = green(MONDRIAN_YELLOW);
  let blueForYellow = blue(MONDRIAN_YELLOW);

  //poked around other code and was led to EUCLIDIAN DISTANCE; the alternate would be to 
  //calculate the absolute value between a given R/G/B value and the corresponding value for mondrian yellow
  let similarity = dist(r, g, b, redForYellow, greenForYellow, blueForYellow);

  // Pixel is considered yellow if the distance is less than the threshold
  return similarity < threshold;
}

function draw() {
  // Load pixel data from the display image for modification
  mImg.loadPixels();

  // Get the threshold value from the slider
  let similarityThreshold = slider.value();

  // Loop through each pixel in the original image
  for (let idx = 0; idx < oImg.pixels.length; idx += 4) {
    let redVal = oImg.pixels[idx + 0];
    let greenVal = oImg.pixels[idx + 1];
    let blueVal = oImg.pixels[idx + 2];
    let alphaVal = oImg.pixels[idx + 3];

    // Reference for other color definitions (Mondrian colors)
    let MONDRIAN_BLUE = color(5, 50, 110);
    let MONDRIAN_RED = color(240, 40, 30);

    let pixelIsRed = redVal > 2 * greenVal && redVal > 2 * blueVal && redVal > 128;
    let pixelIsBlue = blueVal > greenVal && blueVal > 2 * redVal && blueVal > 100;
    let pixelIsYellow = isYellow(redVal, greenVal, blueVal, similarityThreshold);

    push()
    if (pixelIsBlue) {
      mImg.pixels[idx + 0] = 228;   // Set Blue
      mImg.pixels[idx + 1] = 0;   // Set Green
      mImg.pixels[idx + 2] = 102;  // Set Red
    }
    pop()

    push()
    if (pixelIsRed) {
      mImg.pixels[idx + 0] = 3;  // Set Blue
      mImg.pixels[idx + 1] = 206;   // Set Green
      mImg.pixels[idx + 2] = 164;   // Set Red
    }
    pop()

    push()
    if (pixelIsYellow) {
      mImg.pixels[idx + 0] = 251;  // Set Blue
      mImg.pixels[idx + 1] = 77;  // Set Green
      mImg.pixels[idx + 2] = 61;    // Set Red
    }
    pop()
  }

  // update the modified pixel data in the display image and display
  mImg.updatePixels();
  image(mImg, 0, 0);
}
