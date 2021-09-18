let length = 40, size = 10, HEIGHT = 800, WIDTH = 800;

function setup(){
    createCanvas(WIDTH,HEIGHT);
}

function draw() {
  background(0);
  fill(255);
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      if ((x + y) % 2 != 0) {
        let size2 = length+length*(mouseX+mouseY-HEIGHT)/HEIGHT;
        square(200+x*length, 200+y*length, size2);
        circle(200+x*length, 200+y*length, size2);
        square(180+x*length, 180+y*length, size2);
      }
    }
  }
}

