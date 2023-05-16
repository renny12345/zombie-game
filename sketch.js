var bg;
var bging
var player,shooterimg,shootingimg;
var zombieGroup,bulletGroup;
var bullet
var heart1
var heart2
var heart3
var heart1img,heart2img,heart3ing;
var score=0
var life=3
var bullets=70
var gameState="fight"
var win,lose,explosionSound;
function preload(){
  bging = loadImage("assets/bg.jpeg")
  shooterimg = loadImage("assets/shooter_2.png")
  shootingimg = loadImage("assets/shooter_3.png")
  zombieimg = loadImage("assets/zombie.png")
  heart1img = loadImage("assets/heart_1.png")
  heart2img = loadImage("assets/heart_2.png")
  heart3img = loadImage("assets/heart_3.png")
  win = loadSound("assets/win.mp3")
  lose = loadSound("assets/lose.mp3")
  explosionSound = loadSound("assets/explosion.mp3")
  }
  function setup(){
  createCanvas(windowWidth,windowHeight)
  //creating background sprite
  bg = createSprite(displayWidth/2,displayHeight/2,30,20)
  bg.addImage(bging)
  bg.scale=1.1
  //creathing player 
  player = createSprite(150,500,50,50)
  player.addImage(shooterimg)
  player.scale=0.3
  // creating zombieGroup
  zombieGroup=new Group();
  // creating bulletGroup
  bulletGroup=new Group();
  // creating a sprite of hearts 
  heart1 = createSprite(displayWidth-150,40,20,20)
  heart1.addImage("heart1",heart1img)
  heart1.scale = 0.4
  heart1.visbile = false

  heart2 = createSprite(displayWidth-100,40,20,20)
  heart2.addImage("heart2",heart2img)
  heart2.scale = 0.4
  heart2.visbile = false

  heart3 = createSprite(displayWidth-150,40,20,20)
  heart3.addImage("heart3",heart3img)
  heart3.scale = 0.4
  heart3.visbile = true
}


function draw(){
  background("green")

  if(gameState == "fight"){
    if(life == 3){
      heart3.visible = true
      heart1.visible = false
      heart2.visible = false
    }

    if(life == 2){
      heart3.visible = false
      heart1.visible = false
      heart2.visible = true
    }

    if(life == 1){
      heart3.visible = false
      heart1.visible = true
      heart2.visible = false
    }

    if(life == 0){
      gameState="lost"
    }

    if(score == 100){
      gameState="won"
      win.play()
    }
    
    if(keyDown("UP_ARROW") && player.y>55){
      player.y = player.y - 5
    }

    if(keyDown("DOWN_ARROW") && player.y<600){
     player.y = player.y + 5
    }
  
    // if space key is perresd then realsed the bullet and change the bullet to shooting 
    if(keyWentDown("SPACE")){
      player.addImage(shootingimg)
      bullet = createSprite(displayWidth-1150,player.y-30,20,10)
      bullet.velocityX = 20
      bullet.lifetime = 110
      bulletGroup.add(bullet)
      bullets = bullets-1
      explosionSound.play()
    }
    
    else if(keyWentUp("SPACE")){
      player.addImage(shooterimg)
    }
    if(bullets == 0){
      gameState="bullet"
      lose.play
    }
     
     //destory zombie when player thouches it
    if(zombieGroup.isTouching(player)){
      lose.play();
      for(var i=0;i<zombieGroup.length; i++){
      if(zombieGroup[i].isTouching(player)){
        zombieGroup[i].destroy()
        life=life-1
      }
      }
    }

    // destroy the zombie when bullet touches it
    if(bulletGroup.isTouching(zombieGroup)){
      for(var i=0;i<bulletGroup.length; i++){
        if(bulletGroup.isTouching(zombieGroup[i])){
          zombieGroup[i].destroy()
          bulletGroup.destroyEach()
          explosionSound.play()
          score = score+2
        }
      }
    }
    
    //calling function to create zombie
    enemy()

  }
  
  drawSprites()

  //display the score and remaning lives
  textSize(20)
  fill("white")
  text("Bullets = " + bullets,displayWidth-210,displayHeight/2-250)
  text("Score = " + score,displayWidth-200,displayHeight/2-220)
  text("Lives = " + life,displayWidth-200,displayHeight/2-280)
 
  //dispaly message lost
  if(gameState == "lost"){
    textSize(100)
    fill("red")
    text("YOU LOST :(",400,400)
    text("THANKS FOR PLAYING !! :)",50,500)
    zombieGroup.destroyEach()
    player.destroy()
  }
   
  //dispaly message lost
   if(gameState == "won"){
    textSize(100)
    fill("yellow")
    text("YOU WON !! :)",400,400)
    text("THANKS FOR PLAYING !! :)",50,500)
    zombieGroup.destroyEach()
    player.destroy()
  }
  
  //dispaly message lost
  if(gameState == "bullet"){
    textSize(100)
    fill("red")
    text("YOU RAN OUT OF BULLETS :(",400,400)
    text("THANKS FOR PLAYING !! :)",50.500)
    zombieGroup.destroyEach()
    player.destroy()
    bulletGroup.destroyEach()
  }
}

function enemy (){
  //to add delay of 50 frames 
  if(frameCount%50==0){
    zombie=createSprite(random(700,1200),random(100,500),50,50)
    zombie.addImage(zombieimg)
    zombie.scale=0.15
    zombie.velocityX=-3
    zombie.lifetime=400
    //adding group in the sprite
    zombieGroup.add(zombie)
  }
}