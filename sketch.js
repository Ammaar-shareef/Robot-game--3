var robot,robot_idle,robot_shoot;
var enemy,enemy_run;
var invisground1,invisground2,invisground3,invisground4;
var bullet,bulletImg,bulletGroup;

var score = 0;
var life = 3;

function preload()
{
 
 robot_idle = loadAnimation("robot-1.png");
 robot_shoot = loadAnimation("robot-2.png");
 enemy_run = loadAnimation("enemy-1.png","enemy-2.png");
 bulletImg = loadImage("bullet.png");
}

function setup() 
{
  createCanvas(800,400);

  robot = createSprite(400,200,50,50);
  robot.addAnimation("run",robot_idle);
  robot.scale = 0.4;
  //robot.debug = true;
  robot.setCollider("circle",30,-150,120);
  robot.velocityY = 13;

  invisground1 = createSprite(400,410,800,20);
  invisground2 = createSprite(400,-10,800,20);
  invisground3 = createSprite(800,200,20,400);
  invisground3.visible = false;
  invisground4 = createSprite(0,200,20,400);
  invisground4.visible = false;

  bulletGroup = new Group();
  enemyGroup = new Group();

  enemy_run.frameDelay = 8;
}

function draw() 
{
  background("lightgrey");

  fill("white");
  stroke("black");
  textSize(19);
  text("Score: "+score,720,30);

  fill("white");
  stroke("red");
  textSize(19);
  text("Lives: "+life,600,30);
  
  robot.collide(invisground1);
  robot.collide(invisground2);
  robot.collide(invisground3);
  robot.collide(invisground4);

  if(bulletGroup.isTouching(enemyGroup)){
    enemyGroup.destroyEach();
    bulletGroup.destroyEach();
    score += 1;
  }

  if(enemyGroup.isTouching(robot)||enemyGroup.isTouching(invisground3)){
    enemyGroup.destroyEach();
    life -= 1;
  }
 
//movements and shoot
  if(keyDown(UP_ARROW)){
    robot.y = robot.y - 7;
  }

  if(keyDown(DOWN_ARROW)){
    robot.y = robot.y + 7;
  }

  if(keyDown(LEFT_ARROW)){
    robot.x = robot.x - 7;
  }

  if(keyDown(RIGHT_ARROW)){
    robot.x = robot.x + 7;
  }

  if(keyWentDown("space")){
    robot.addAnimation("shoot",robot_shoot);
    robot.changeAnimation("shoot");
  }
  if(keyWentUp("space")){
    shoot();
    robot.changeAnimation("run");
  }

//calling fucntions

  spawnEnemy();

  drawSprites();
}

function spawnEnemy()
{
if(frameCount % 100 === 0){
  enemy = createSprite(0,random(80,320),40,20);
  enemy.addAnimation("run-e",enemy_run);
  enemy.scale = 0.3;
  enemy.velocityX = (3 + score / 2);

  enemyGroup.add(enemy);
  enemy.lifetime = 260;
  //enemy.debug = true;
  enemy.setCollider("circle",0,0,100)
 }
}

function shoot()
{
  bullet = createSprite(robot.x,robot.y,40,20);
  bullet.addImage(bulletImg);
  bullet.scale = 0.05;
  bullet.velocityX = -5;
  
  bulletGroup.add(bullet);
  bullet.lifetime = 140;
  //bullet.debug = true;
}