function setup(){
  createCanvas(800,800);
}

function draw(){

  background(238,180,34);

  fill(0,0,0);
  ellipse(320,300,500,400);

  fill(0,0,0);
  ellipse(450,400,500,700);

  translate(width / 2, height / 2);
  rotate(PI / 180 * 25);
  noStroke();
  fill(255,228,196);
  ellipse(-50,-50,400,500);

  fill(0,0,0);
  ellipse(-50,-210,300,200);

  rotate(PI / 180 * 5);
  fill(0,0,0);
  ellipse(-180,-50,100,10);

  rotate(PI / 180 * -35);
  fill(0,0,0);
  ellipse(70,-80,100,10);

  rotate(PI / 180 * 0);
  fill(0,0,0);
  ellipse(-130,-100,50,50);

  rotate(PI / 180 * 0);
  fill(0,0,0);
  ellipse(60,-40,50,50);

  rotate(PI / 180 * 10);
  fill(221,181,148);
  rect(-90,-50,50,130);

  rotate(PI / 180 * 10);
  fill(255,218,185);
  rect(-90,-50,50,130);

  rotate(PI / 180 * -20);
  fill(178,34,34);
  circle(-70,110,30,30);

}

