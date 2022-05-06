var PLAY = 0;
var END = 1;
var gameState = PLAY;
var A1, A2,  restart, astro;
var ob1,ob2, ob3, ob4;
var obstacleGroup, obstacle;
var score=0;
var space, bgImage;


function preload(){
  
  bgImage = loadImage("bg1.png");
 A1= loadImage("A1.png")
A2= loadImage("A2.png")
 ob1 = loadImage("ob1.png");
ob2 = loadImage("ob2.png");
 ob3 = loadImage("ob3.png");
 ob4 = loadImage("ob4.png");
 restart = loadImage("restart.png");

}


function setup() {
  createCanvas(800,400);


  space = createSprite(400,100,400,20)
  space.addImage( bgImage);
  space.scale = 0.3;
  
 
  astro = createSprite(50,100,20,30);
  astro.scale = 0.5;
  astro.addImage(A1);

  restart = createSprite(550,140);
  restart.addImage(restart);
  restart.scale = 0.1;
  restart.visible = false;
 
  obstacleGroup = createGroup();
   
}


function draw() {
background(255);

drawSprites(); 
  
  if (gameState === PLAY){
   
     obstacles();

     space.velocityX=-3

     if(space.x<100) {
        space.x=400
     }
    
   score = score + Math.round(getFrameRate()/60);
  
  
    if(keyDown("space")&&astro.y >= 225) {
     astro.velocityY = -10; 
  
    }
     
    astro.velocityY =astro.velocityY + 0.8;
   
    if (astro.isTouching(obstacleGroup)){
       obstacleGroup.destroyEach();
        gameState = END;
    }
    
  }
  
  if (gameState === END){
  
   space.velocityX = 0;
   restart.x=camera.position.x;
    obstacleGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    restart.visible = true;
    astro.addImage(A2);
    astro.scale=0.5;
      
    fill("red")
    stroke("white")
    textSize(35);
    text("GAME OVER", 100,160);
   
    
    if(mousePressedOver(restart)) {
      obstacleGroup.destroyEach();
      restart.visible = false;
      astro.addImage(octoI);
      astro.scale=0.5;
      score = 0;
      gameState = PLAY;
           
    }
    
  }
 
  stroke("white");
  textSize(25);
  fill("magenta");
  text("Score:" + score,  camera.position.x,50);

}


function obstacles(){
  if (frameCount%120 === 0){
    
    obstacle = createSprite(camera.position.x+400,320,50,50);
    obstacle.scale = 0.4;
    obstacle.velocityX = -(6 + 3*score/100); 
 
    var rand = Math.round(random(1,4));
    switch(rand) {
      case 1: obstacle.addImage(ob1);
              break;
      case 2: obstacle.addImage(ob2);
              break;
      case 3: obstacle.addImage(ob3);
              break;
      case 4: obstacle.addImage(ob4);
              break;
      default: break;
    }
    obstacle.lifetime = 300;
    obstacleGroup.add(obstacle);
      
  }
}




