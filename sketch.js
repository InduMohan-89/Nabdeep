var ninja;
var coin;
var score = 0;
var coinGroup, monsterGroup, gameOver;
var gameState =1;
function preload(){
  ninjaImg=loadAnimation("imagefolder2/ninja1.png","imagefolder2/ninja2.png","imagefolder2/ninja3.png","imagefolder2/ninja4.png","imagefolder2/ninja5.png","imagefolder2/ninja6.png")
bgImg =loadImage("imagefolder2/bg.png");
coinImg=loadImage("imagefolder2/goldCoin.png");
bgImg2 = loadImage("imagefolder2/bg.png");
monsterImg =loadImage("imagefolder2/mono.png");
  gameoverImg =loadImage("imagefolder2/gameover.png");

  jumpSound = loadSound("jump.mp3");
  dieSound = loadSound("die.mp3");
  
}




function setup() {
  createCanvas(1200,550);
  bgsprite= createSprite(600, 250, 1200, 1200);
  bgsprite.addImage(bgImg2);
  bgsprite.scale=1.4;
  bgsprite.velocityX=-1;
  console.log(bgImg2.width);

  ninja=createSprite(100,450,40,200);
  ninja.addAnimation("running",ninjaImg);
  edges=createEdgeSprites();
  
  invisiblesprite1=createSprite(632,145,170,10);
  invisiblesprite1.velocityX=-1;
  invisiblesprite1.visible = false;

 invisiblesprite2 = createSprite(1090,280,350,10);
 invisiblesprite2.velocityX=-1;
 invisiblesprite2.visible = false;

 invisiblesprite3 = createSprite(180,283,350,10);
 invisiblesprite3.velocityX=-1;
 invisiblesprite3.visible = false;

 /*invisiblesprite4 = createSprite(380,230,270,10);
 invisiblesprite4.velocityX=-1;*/ 

 gameOver = createSprite(450,250);
 gameOver.addImage(gameoverImg);
 gameOver.scale = 0.7;

 coinGroup = new Group();
 monsterGroup = new Group();
 
}

function draw() {
  background(255); 
 
  if(gameState === 1){
  //if(bgsprite.y<50){
  //bgsprite.y=100;
  //}
  if(keyDown("RIGHT_ARROW")){
    ninja.x=ninja.x+5
  }
  if(keyDown("LEFT_ARROW")){
    ninja.x=ninja.x-5
  }
  if(keyDown("space")){
    ninja.velocityY=-15;
    jumpSound.play();
  }
  ninja.velocityY=ninja.velocityY+0.8;
  ninja.collide(edges[3]);
  spawncoins();

if(bgsprite.x<0){
  bgsprite.x=957;
  invisiblesprite1.x=bgsprite.x+27;
  invisiblesprite2.x=bgsprite.x+485;
  invisiblesprite3.x=bgsprite.x-425;
  /*invisiblesprite4.x=bgsprite.x-310;*/
}

if(ninja.isTouching(invisiblesprite1) || ninja.isTouching(invisiblesprite2) || ninja.isTouching(invisiblesprite3)){
  ninja.velocityY = 0;
}

ninja.bounceOff(invisiblesprite1);
ninja.bounceOff(invisiblesprite2);
/*ninja.bounceOff(invisiblesprite3);*/

ninja.isTouching(coinGroup,removeCoin);
  ninja.isTouching(monsterGroup,removemonster);
spawnmonster();

gameOver.visible = false;

  }
  else if(gameState === 0){
    ninja.destroy();
    coinGroup.destroyEach();
    monsterGroup.destroyEach();
    bgsprite.velocityX = 0;
    gameOver.visible = true;
  }
  drawSprites();

  fill("yellow");
  textSize(20);
  text("SCORE:" + score, 900,50); 
}
function spawncoins(){
  if(frameCount%100=== 0){
    coin=createSprite(980,random(50,500),20,20);
    coin.velocityX=-3;
    coin.addImage(coinImg);
    coin.scale=0.1;
    coinGroup.add(coin);
  }
}
function removeCoin(ninja,coin){
  coin.remove();
  score = score+5;

}
function spawnmonster(){
  if(frameCount%600=== 0){
    monster=createSprite(980,random(50,500),50,50);
    monster.velocityX=-3;
    monster.addImage(monsterImg);
    monster.scale=0.2;
    monsterGroup.add(monster);
  }
}
function removemonster(ninja,monster){
  gameState = 0;
  //monster. addImage(gameoverImg);
dieSound.play();
}
