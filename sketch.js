var trex, trexAni, edges,trex_collided;
var ground, groundImg;
var invisibleGround;
var cloud, cloudImg,cloudGroup;
var obstacle,obstacleGroup;
var obstacle1,obstacle2,obstacle3,obstacle4,obstacle5,obstacle6;
var gameOver,restart,gameOverImg,restartImg;
var rand;
var score=0;
var PLAY=1;
var END=0;
var gameState = PLAY;

function preload() {
  trexAni = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  groundImg = loadImage("ground2.png");
  cloudImg = loadImage("cloud.png");
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png"); 
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
  trex_collided = loadImage("trex_collided.png");
}

function setup() {
  createCanvas(400, 400);
  trex = createSprite(50, 358, 10, 10);
  trex.addAnimation("running", trexAni);
  trex.addAnimation("collided",trex_collided);
  trex.scale = 0.5;


  ground = createSprite(200, 380, 400, 20);
  ground.addImage(groundImg);

  invisibleGround = createSprite(200, 385, 400, 5);
  invisibleGround.visible = false;

  cloudGroup = new Group();
  obstacleGroup = new Group();
  obstacleGroup.scale = 0.5;
  edges = createEdgeSprites();
  
  gameOver = createSprite(200,180,10,10);
  gameOver.addImage(gameOverImg);
  gameOver.visible = false;
  
  restart = createSprite(200,230,10,10);
  restart.addImage(restartImg);
  restart.scale=0.6;
  restart.visible = false;
  
}

function draw() {
  background(220);
  if(gameState == PLAY){
         score=score+Math.round(getFrameRate()/60);
           
       ground.velocityX = -(6+3*score/100);
    
       if (keyDown("space") && trex.y >= 300) {
        trex.velocityY = -14;
      }        
      trex.velocityY = trex.velocityY + 0.9;

      if (ground.x < 0) {
        ground.x = ground.width / 2;
      }  
      spawnObstacle();
      spawnCloud();
     if(obstacleGroup.isTouching(trex)){
       gameState = END;
     }
}
  else if(gameState == END){
    ground.velocityX = 0;
    trex.velocityX = 0;
    obstacleGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    cloudGroup.setVelocityXEach(0);
    cloudGroup.setLifetimeEach(-1);
    trex.changeAnimation("collided",trex_collided);
    restart.visible=true;
    gameOver.visible=true;
    if(mousePressedOver(restart)){
      reset();
    }
  }
  
  
  trex.collide(invisibleGround);
  textSize(20);
  text("Score:"+score,200,50);
  
  drawSprites();
}
function spawnCloud(){
  if(frameCount %100 === 0){
    cloud=createSprite(400,290,40,10);
    cloud.addImage(cloudImg);
    cloud.velocityX = -3;
    cloud.y=Math.round(random(50,290));
    cloud.lifetime=130;
    
    trex.depth=trex.depth+1;
    cloud.depth=trex.depth;
    cloudGroup.add(cloud);
  }
}
function spawnObstacle(){
  if(frameCount %120 === 0){
    obstacle=createSprite(400,365,10,10);
    obstacle.velocityX= -(6+score/100);
    obstacle.scale = 0.4;
    obstacleGroup.add(obstacle);
    obstacle.lifetime=140;
    rand=Math.round(random(1,6));
    switch(rand){
      case 1:obstacle.addImage(obstacle1);
             break;
      case 2:obstacle.addImage(obstacle2);
             break;
      case 3:obstacle.addImage(obstacle3);
             break;
      case 4:obstacle.addImage(obstacle4);
             break;
      case 5:obstacle.addImage(obstacle5);
             break;
      case 6:obstacle.addImage(obstacle6);
             break;
             
     default:break;    
    }
  }
}
function reset(){
   gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  obstacleGroup.destroyEach();
  cloudGroup.destroyEach();     
  trex.changeAnimation("running",trexAni);
  score = 0;
}