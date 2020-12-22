
var monkey , monkey_running, monkeyStopImg;

//var index = 0;

var Banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;

var backgroundImg;

var ground;

var survivalTime = 1;

function preload(){
  
  monkey_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  monkeyStopImg = loadImage("sprite_0.png");

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");

  backgroundImg = loadImage("Jungle.jpg");
 
}



function setup() {
  
  createCanvas(displayWidth, displayHeight);

  monkey = createSprite(displayWidth/2, displayHeight-35, 10, 10);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.25;
  monkey.velocityX = 12;
  //monkey.debug=true;
    
  ground = createSprite(displayWidth, displayHeight, displayWidth+25000, 15);
  ground.velocityX = -3;
    
  FoodGroup = createGroup();
  obstacleGroup = createGroup();
  
}


function draw() {
  
  background(backgroundImg);
  
  monkey.collide(ground);

  //index = index+1
  camera.position.x=monkey.x
  camera.position.y=displayHeight/2
   
  stroke("black");
  fill("black");
  textSize(20);
  survivalTime = Math.ceil( frameCount / frameRate() );
  text(" Survival Time: " + survivalTime, monkey.x+100, 150)
  
  if(ground.x < displayWidth){
    
    ground.x = ground.width/2;

  }  
  
  if(keyDown("space")&& monkey.y <=1005) {
        monkey.velocityY = -15;
  }
  
  monkey.velocityY = monkey.velocityY + 0.8;

  /*if(FoodGroup.isTouching(monkey)){

    Banana.hide()

  }*/
  
  if(obstacleGroup.isTouching(monkey)){
     
     textSize(25);
     text(" GAMEOVER " , 150, 100);

     //monkey.addImage("monkeyStopImg");
     
     ground.velocityX = 0;
     monkey.velocityY = 0;
     monkey.velocityX = 0; 
     
     //set lifetime of the game objects so that they are never destroyed
     obstacleGroup.setLifetimeEach(-1);
     FoodGroup.setLifetimeEach(-1);
     
     obstacleGroup.setVelocityXEach(0);
     FoodGroup.setVelocityXEach(0);    
    
}
  
  drawSprites();
  spawnBanana();
  spawnObstacle();
  
  
  
}

function spawnBanana() {
  
  //write code here to spawn the clouds
 if (frameCount % 125 === 0) {
   
    var Banana = createSprite(monkey.x+650,20,40,10);
    Banana.y = Math.round(random(450,550));
    Banana.addImage(bananaImage);
    Banana.scale = 0.15;
    //Banana.velocityX = -3;
    
     //assign lifetime to the variable
    Banana.lifetime = 52;
    
    //add each cloud to the group
    FoodGroup.add(Banana);
  }
  
}

function spawnObstacle() {
  
  //write code here to spawn the clouds
  if (frameCount % 250 === 0) {
    
    var Obstacle = createSprite(monkey.x+650,displayHeight-17,2,2);
    Obstacle.addImage(obstacleImage);
    Obstacle.scale = 0.30;
    //Obstacle.velocityX = -3;
    Obstacle.debug=true;
    //Obstacle.setCollider("rectangle", 50, 50, 250, 400);
    
     //assign lifetime to the variable
    Obstacle.lifetime = 650;
    
    obstacleGroup.add(Obstacle);
    
  }
  
}