class Item {
  constructor(img, x, y, w, h) {
      this.img = img;
      this.x = x;
      this.y = y;
      this.w = w;
      this.h = h;
  }
  
  draw() {
    image(this.img, this.x, this.y, this.w, this.h);
  }
}

class Dynamic_Item extends Item {
  constructor(img, x, y, w, h) {
    super(img, x, y, w, h);
    this.rollover = false;
    this.dragging = false;
    this.offsetX = 0;
    this.offsetY = 0;
    this.angle = 0;
    this.dx = 0;
    this.dy = 0;
  }

  draw() {
    if (mouseX > this.x+10 && mouseX < this.x+this.w-10 && mouseY > this.y+10  && mouseY < this.y + this.h-10) {
      this.rollover = true;
    } else {
      this.rollover = false;
    }
    if (this.dragging) {
      this.x = mouseX + this.offsetX;
      this.y = mouseY + this.offsetY;
      push();
      translate(this.x+this.w/2+this.dx, this.y+this.h/2+this.dy);
      rotate(this.angle);
      image(this.img, -this.w/2-2.5, -this.h/2-2.5, this.w+5, this.h+5);
      pop();
    } else if (this.rollover) {
      image(this.img, this.x-1, this.y-1, this.w + 2, this.h + 2);
    } else {
      image(this.img, this.x, this.y, this.w, this.h);
    }
  }

  pressed() {
    if (mouseX > this.x+10 && mouseX < this.x+this.w-10 && mouseY > this.y+10  && mouseY < this.y + this.h-10) {
      this.dragging = true;
      this.offsetX = this.x - mouseX;
      this.offsetY = this.y - mouseY;
      return true;
    }
    return false;
  }

  released() {
    this.dragging = false;
  }
}

class Kitchen extends Item {
  constructor(kitchenClosedImg, kitchenOpenImg, x, y, w, h) {
    super(kitchenClosedImg, x, y, w, h);
    this.closedImg = kitchenClosedImg;
    this.openImg = kitchenOpenImg;
    this.isFridgeOpen = false;
  }

  draw() {
    if(this.isFridgeOpen) {
      this.img = kitchenOpenImg;
      super.draw();
    } else {
      this.img = kitchenClosedImg;
      super.draw();
    }
  }

  clicked() {
    if(mouseX > this.x+920 && mouseX < this.x+960  && mouseY > this.y+340 && mouseY < this.y+500 ) {
      this.isFridgeOpen = !this.isFridgeOpen;
    }
  }
}

class Sink extends Item {
  constructor(sinkOffImg, sinkOnImg, waterImg, x, y, w, h) {
    super(sinkOffImg, x, y, w, h);
    this.onImg = sinkOnImg;
    this.offImg = sinkOffImg;
    this.waterImg = waterImg;
    this.isOn = false;
  }

  draw() {
    if(this.isOn) {
      this.img = sinkOnImg;
      super.draw();
      push();
      tint(255, 126);
      image(this.waterImg, this.x+105, this.y+67, 28+2*cos(frameCount), 200+10*sin(frameCount));
      pop();
    } else {
      this.img = sinkOffImg;
      super.draw();
    }
  }

  clicked() {
    if(mouseX > this.x+20 && mouseX < this.x+60  && mouseY > this.y+120 && mouseY < this.y+155 ) {
      this.isOn = !this.isOn;
    }
  }
}

class Note extends Item {
  constructor(noteImg, steps, x, y, w, h) {
    super(noteImg, x, y, w, h);
    this.steps = steps;
  }

  draw() {
    super.draw();
    for(let i in steps) {
      fill(0);
      stroke(0);
      textFont('Comic Sans MS');
      textSize(15);
      text(steps[i], 1080, 160+i*30, 330, 600)
    }
    // strike through steps
    stroke('red');
    if(whiteRadish.isCleaned) {
      line(1080, 168, min(1080+textWidth(steps[0]), 1410), 168);
    }
    if(whiteRadish.isChopped) {
      line(1080, 198, min(1080+textWidth(steps[1]), 1410), 198);
    }
    if(whiteRadish.isInBox) {
      line(1080, 226, min(1080+textWidth(steps[2]), 1410), 226); 
    }
    if(box.hasSalt) {
      line(1080, 256, min(1080+textWidth(steps[3]), 1410), 256); 
    }
    if(box.hasSugar) {
      line(1080, 286, min(1080+textWidth(steps[4]), 1410), 286); 
    }
    if(timer1.isOver) {
      line(1080, 316, min(1080+textWidth(steps[5]), 1410), 316); 
    }
    if(box.hasWaterRemoved) {
      line(1080, 346, min(1080+textWidth(steps[6]), 1410), 346); 
    }
    if(box.hasVinegar) {
      line(1080, 376, min(1080+textWidth(steps[7]), 1410), 376); 
    }
    if(box.hasSoysauce) {
      line(1080, 406, min(1080+textWidth(steps[8]), 1410), 406); 
    }
    if(box.hasChili) {
      line(1080, 436, min(1080+textWidth(steps[9]), 1410), 436); 
    }
    if(box.hasWaterAdded) {
      line(1080, 466, min(1080+textWidth(steps[10]), 1410), 466); 
    }
    if(box.isCovered) {
      line(1080, 496, min(1080+textWidth(steps[11]), 1410), 496); 
    }
    if(timer2.isOver) {
      line(1080, 526, min(1080+textWidth(steps[12]), 1410), 526); 
    }
  }
}

class WhiteRadish extends Dynamic_Item {
  constructor(dirtyImg, cleanedImg, choppedImg, x, y, w, h) {
    super(dirtyImg, x, y, w, h);
    this.dirtyImg = dirtyImg;
    this.cleanedImg = cleanedImg;
    this.choppedImg = choppedImg;
    this.isCleaned = false;
    this.isChopped = false;
    this.isInBox = false;
  }

  draw() {
    if(this.isCleaned) {
      this.img = this.cleanedImg;
    }
    if(this.isChopped) {
      this.img = this.choppedImg;
    }
    if(!this.isInBox) {
      super.draw();
    }
  }

  pressed() {
    if(!this.isInBox) {
      super.pressed();
    }
  }

  released() {
    if(!this.isInBox) {
      super.released();
    }
  }
}

class Box extends Dynamic_Item {
  constructor(imgs, x, y, w, h) {
    super(imgs[0], x, y, w, h);
    this.imgs = imgs;
    this.hasWhiteRadish = false;
    this.hasSalt = false;
    this.hasSugar = false;
    this.isCovered = false;
    this.hasVinegar = false;
    this.hasSoysauce = false;
    this.hasChili = false;
    this.hasWater = false;
    this.hasWaterAdded = false;
    this.hasWaterRemoved = false;
    this.isRemovingWater = false;
    this.isInFridge = false;
  }

  draw(){
    if(this.isRemovingWater){
      this.angle = -PI*0.3;
      this.dy = 4*sin(frameCount/5);
    } else{
      this.angle = 0;
      this.dy = 0;
    }
    if(this.isCovered){
      this.img = this.imgs[6];
    } else {
      if(this.hasWhiteRadish){
        this.img = this.imgs[3];
        if(!this.hasWaterRemoved){
          if(this.hasSalt || this.hasSugar){
            this.img = this.imgs[4];
          }
          if(this.hasSalt && this.hasSugar){
            this.img = this.imgs[5];
          }
          if(this.hasWater){
            this.img = this.imgs[7];
          }
        }
        if(this.hasVinegar){
          this.img = this.imgs[8];
          if(this.hasSoysauce){
            this.img = this.imgs[9];
            if(this.hasChili){
              this.img = this.imgs[10];
              if(this.hasWaterAdded){
                this.img = this.imgs[11];
              }
            }
          }
        }
      } else{
        this.img = this.imgs[0];
      }
    }
    if(!this.isInFridge){
      super.draw();
    }
  }
}

class Seasoning extends Dynamic_Item {
  constructor(img, x, y, w, h) {
    super(img, x, y, w, h);
    this.isUsed = true;
  }

  draw() {
    if(this.isUsed) {
      this.dx = cos(frameCount/3);
      this.dy = 5*sin(frameCount/5);
      this.angle = -PI*0.8;
      super.draw();
    } else {
      this.angle = 0;
      super.draw();
    } 
  }
}

class Knife extends Dynamic_Item {
  constructor(img, x, y, w, h) {
    super(img, x, y, w, h);
    this.angle = -PI/3;
  }

  draw(){
    this.dy = 10*sin(frameCount/5);
    super.draw();
  }
}

class BoxCover extends Dynamic_Item {
  constructor(img, x, y, w, h) {
    super(img, x, y, w, h);
    this.isUsed = false;
  }

  draw(){
    if(!this.isUsed){
      super.draw();
    }
  }

  pressed() {
    if(!this.isUsed) {
      super.pressed();
    }
  }

  released() {
    if(!this.isUsed) {
      super.released();
    }
  }
}

class Timer {
  constructor(h, m, s, speed) {
    this.h = h;
    this.m = m;
    this.s = s;
    this.speed = speed;
    this.isRunning = false;
    this.isOver = false;
  }

  draw(){
    if(this.isRunning){
      this.s-=this.speed;
      if(this.m == 0 && this.h == 0 && this.s <= 0){
        this.isOver = true;
        this.isRunning = false;
      }
      if(this.s < 0){
        if(this.h > 0 || this.m > 0){
          this.s = 59;
          this.m--;
        }else{
          this.s = 0;
        }

      }
      if(this.m < 0){
        if(this.h > 0){
          this.m = 59;
          this.h--;
        }else{
          this.m = 0;
        }
      }
      let h,m,s;
      if(this.h < 10){
        h = '0'+str(this.h);
      }else{
        h = str(this.h);
      }
      if(this.m < 10){
        m = '0'+str(this.m);
      }else{
        m = str(this.m);
      }
      if(this.s < 10){
        s = '0'+str(this.s);
      }else{
        s = str(this.s);
      }
      push();
      fill(0);
      stroke(0);
      textFont(timerFont);
      textSize(50);
      textAlign(LEFT);
      text(h+":"+m+":"+s, 1160, 650);
      pop();
    }
  }
}