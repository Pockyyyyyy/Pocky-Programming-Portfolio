// image vars
let backgroundImg,
    kitchenClosedImg,
    kitchenOpenImg,
    noteImg,
    sinkOnImg,
    sinkOffImg,
    waterImg,
    knifeImg,
    cuttingBoardImg,
    boxImgs = [],
    boxCoverImg,
    saltImg,
    soySauceImg,
    sugarImg,
    vinegarImg,
    chiliImg,
    whiteRadishDirtyImg,
    whiteRadishCleanedImg,
    whiteRadishChoppedImg,
    resultImg;

let timerFont;

// item vars
let items = [], // list of item
    kitchen,
    note,
    sink,
    knife,
    cuttingBoard,
    box,
    boxCover,
    salt,
    soySauce,
    sugar,
    vinegar,
    chili,
    whiteRadish,
    timer1,
    timer2;

let isGameOver = false;

// recipe
let name = "Pickle White Radish",
    steps = ["Clean the white radish",
      "Cut the white radish into pieces",
      "Put the white radish pieces into a box",
      "Add salt into the box",
      "Add sugar into the box",
      "Wait for 30 mins",
      "Remove water from box",
      "Add vinegar into the box",
      "Add soysauce into the box",
      "Add chili into the box",
      "Add water into the box",
      "Cover the box with lid",
      "Put the box in fridge and wait for one night",
      "Finished and enjoy!"
    ];


function preload() {
  timerFont = loadFont('assets/digital.ttf');

  backgroundImg = loadImage('assets/background.PNG');
  kitchenClosedImg = loadImage('assets/kitchen_fridge_closed.PNG');
  kitchenOpenImg = loadImage('assets/kitchen_fridge_open.PNG');
  noteImg = loadImage('assets/note.PNG');
  sinkOnImg = loadImage('assets/sink_water.PNG');
  sinkOffImg = loadImage('assets/sink.PNG');
  waterImg = loadImage('assets/water.PNG');
  knifeImg = loadImage('assets/knife.PNG');
  cuttingBoardImg = loadImage('assets/cuttingboard.PNG');
  boxImgs.push(loadImage('assets/box.PNG'));
  boxImgs.push(loadImage('assets/box.PNG'));
  boxImgs.push(loadImage('assets/box.PNG')); // match pic number with index
  boxImgs.push(loadImage('assets/box_step_3.PNG'));
  boxImgs.push(loadImage('assets/box_step_4.PNG'));
  boxImgs.push(loadImage('assets/box_step_5.PNG'));
  boxImgs.push(loadImage('assets/box_step_6.PNG'));
  boxImgs.push(loadImage('assets/box_step_7.PNG'));
  boxImgs.push(loadImage('assets/box_step_8.PNG'));
  boxImgs.push(loadImage('assets/box_step_9.PNG'));
  boxImgs.push(loadImage('assets/box_step_10.PNG'));
  boxImgs.push(loadImage('assets/box_step_11.PNG'));
  boxCoverImg = loadImage('assets/boxcover.PNG');
  saltImg = loadImage('assets/salt.PNG');
  soySauceImg = loadImage('assets/soysauce.PNG');
  sugarImg = loadImage('assets/sugar.PNG');
  vinegarImg = loadImage('assets/vinegar.PNG');
  chiliImg = loadImage('assets/chili.PNG');
  whiteRadishDirtyImg = loadImage('assets/whiteradish_dirty.PNG');
  whiteRadishCleanedImg = loadImage('assets/whiteradish_clean.PNG');
  whiteRadishChoppedImg = loadImage('assets/whiteradish_chopped.PNG');
  resultImg = loadImage('assets/result.png');
}

function setup() {
  // createCanvas(1044, 788);
  createCanvas(1460, 788);
  // init items
  kitchen = new Kitchen(kitchenClosedImg, kitchenOpenImg, 10, 10, 1024, 768);
  note = new Note(noteImg, steps, 1034, 10, 416, 768);
  sink = new Sink(sinkOffImg, sinkOnImg, waterImg, 10, 280, 270, 360);
  cuttingBoard = new Item(cuttingBoardImg, 240, 320, 325, 220);
  box = new Box(boxImgs, 45, 155, 200, 140);
  boxCover = new BoxCover(boxCoverImg, 140, 220, 200, 120);
  knife = new Knife(knifeImg, 560, 300, 70, 160);
  salt = new Seasoning(saltImg, 440, 80, 90, 130);
  sugar = new Seasoning(sugarImg, 520, 60, 90, 130);
  soySauce = new Seasoning(soySauceImg, 340, 60, 90, 170);
  vinegar = new Seasoning(vinegarImg, 250, 70, 90, 170);
  chili = new Seasoning(chiliImg, 600, 40, 90, 130);
  whiteRadish = new WhiteRadish(whiteRadishDirtyImg, whiteRadishCleanedImg, whiteRadishChoppedImg, 500, 180, 200, 80);
  timer1 = new Timer(0, 30, 0, 4);
  timer2 = new Timer(12, 0, 0, 40);
  
  // add items to list
  items.push(knife);
  items.push(box);
  items.push(boxCover);
  items.push(salt);
  items.push(sugar);
  items.push(soySauce); 
  items.push(vinegar);
  items.push(chili);
  items.push(whiteRadish);
}

function draw() {
  // background
  background(220,120,60);
  // image(backgroundImg, 10, 10, 1024, 768);

  // step 1: wash white radish
  if (sink.isOn && 
      whiteRadish.x > sink.x-60 && whiteRadish.x < sink.x+60 && 
      whiteRadish.y > sink.y+120 && whiteRadish.y < sink.y+220 ){
    whiteRadish.isCleaned = true;
  }

  // step 2: chop white radish
  if (whiteRadish.isCleaned && knife.dragging && 
      knife.x > whiteRadish.x+20 && knife.x < whiteRadish.x+160 && 
      knife.y > whiteRadish.y-60 && knife.y < whiteRadish.y-20 ){
    whiteRadish.isChopped = true;
  }

  if (whiteRadish.isChopped && whiteRadish.dragging && 
      whiteRadish.x > box.x-20 && whiteRadish.x < box.x+80 && 
      whiteRadish.y > box.y-20 && whiteRadish.y < box.y+50 ){
    whiteRadish.isInBox = true;
    box.hasWhiteRadish = true;
  }

  if (box.hasWhiteRadish && !box.hasWaterRemoved && salt.dragging && 
      salt.x > box.x+20 && salt.x < box.x+120 && 
      salt.y > box.y-160 && salt.y < box.y-80){
    box.hasSalt = true;
  }

  if (box.hasWhiteRadish && !box.hasWaterRemoved && sugar.dragging && 
      sugar.x > box.x+20 && sugar.x < box.x+120 && 
      sugar.y > box.y-160 && sugar.y < box.y-80){
    box.hasSugar = true;
  }

  if (box.hasSalt && box.hasSugar && !timer1.isOver &&
      !sugar.dragging && !salt.dragging){
    timer1.isRunning = true;
  }

  if (box.hasSalt && box.hasSugar && timer1.isOver && !box.hasWaterRemoved){
    box.hasWater = true;
  }

  if (box.hasWater && box.dragging &&
      box.x > sink.x-10 && box.x < sink.x+80 && 
      box.y > sink.y && box.y < sink.y+120){
    box.isRemovingWater = true;
    box.hasWater = false;
    box.hasWaterRemoved = true;
  }

  if (!box.hasWater && box.dragging &&
      !(box.x > sink.x-10 && box.x < sink.x+80 && 
      box.y > sink.y && box.y < sink.y+120)){
    box.isRemovingWater = false;
  }

  if (box.hasWhiteRadish && box.hasWaterRemoved && vinegar.dragging && 
      vinegar.x > box.x+20 && vinegar.x < box.x+120 && 
      vinegar.y > box.y-160 && vinegar.y < box.y-80){
    box.hasVinegar = true;
  }

  if (box.hasVinegar && soySauce.dragging && 
      soySauce.x > box.x+20 && soySauce.x < box.x+120 && 
      soySauce.y > box.y-160 && soySauce.y < box.y-80){
    box.hasSoysauce = true;
  }

  if (box.hasSoysauce && chili.dragging && 
      chili.x > box.x+20 && chili.x < box.x+120 && 
      chili.y > box.y-160 && chili.y < box.y-80){
    box.hasChili = true;
  }

  if (box.hasChili && sink.isOn && box.dragging &&
      box.x > sink.x-10 && box.x < sink.x+80 && 
      box.y > sink.y+100 && box.y < sink.y+200){
    box.hasWaterAdded = true;
  }

  if (box.hasWaterAdded && boxCover.dragging &&
      boxCover.x > box.x-20 && boxCover.x < box.x+60 && 
      boxCover.y > box.y-40 && boxCover.y < box.y+20){
    box.isCovered = true;
    boxCover.isUsed = true;
  }

  if (box.isCovered && kitchen.isFridgeOpen && box.dragging &&
      box.x > 900 && box.x < 1000 && 
      box.y > 200 && box.y < 600){
    box.isInFridge = true;
    kitchen.isFridgeOpen = false;
    timer2.isRunning = true;
  }

  if(timer2.isOver){
    isGameOver = true;
  }

  // items
  if(!isGameOver){
    kitchen.draw();
    sink.draw();
    cuttingBoard.draw();
    box.draw();
    salt.draw();
    soySauce.draw();
    sugar.draw();
    vinegar.draw();
    chili.draw();
    whiteRadish.draw();
    boxCover.draw();
    knife.draw();
    note.draw();
    timer1.draw();
    timer2.draw();
    // put moving item on top
    for(let item of items) {
      if(item.dragging==true){
        item.draw();
        break;
      }
    }
  } else{
    note.draw();
    image(resultImg, 110, 90, 824, 618);
  }
}

function mousePressed(){
  if(knife.pressed()) return null;
  if(box.pressed()) return null;
  if(boxCover.pressed()) return null;
  if(salt.pressed()) return null;
  if(soySauce.pressed()) return null;
  if(sugar.pressed()) return null;
  if(vinegar.pressed()) return null;
  if(chili.pressed()) return null;
  if(whiteRadish.pressed()) return null;
}

function mouseReleased() {
  knife.released();
  box.released();
  boxCover.released();
  salt.released();
  soySauce.released();
  sugar.released();
  vinegar.released();
  chili.released();
  whiteRadish.released();
}

function mouseClicked() {
  kitchen.clicked();
  sink.clicked();
  // console.log(mouseX+" "+mouseY)
}

