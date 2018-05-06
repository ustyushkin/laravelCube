
// 3 -160
// 4 -85
// 5 -15
// 6 -75
// 7 -45
// 8 -40
var cubeSize = 60;
var countLine = 4;
var deltaX = -45;
var randomPosition = [];
var countBots = 4;
var bots = [];
var tempRoomB = [];
var stage = new createjs.Stage("thisCanvas");
var myMatrix = matrixArray(countLine,countLine,stage);
var functionListener1 = function(event) {iteration(countLine,countLine,stage,myMatrix)};
//var functionListener1 = iteration(countLine,countLine,stage,myMatrix);
var functionListener2 = function(event) {
  alert('Clicked');
};

function endLevel()
{
  alert('You WIN!!!');
}
function endLevelLost()
{
  alert('You Lost!');
}

function fillLevelArray()
{
  var arr = [];
  var fa = [];
  var sa = [];
  var maxRoom = countLine*countLine-1;
  for(var i=1; i<=(countLine*countLine); i++){

    firstEl = getRandomArbitary(0,maxRoom);
    while (fa.indexOf(firstEl)!=-1)
    {
      firstEl = getRandomArbitary(0,maxRoom);
    }
    fa.push(firstEl);

    secondEl = getRandomArbitary(0,maxRoom);
    while (sa.indexOf(secondEl)!=-1)
    {
      secondEl = getRandomArbitary(0,maxRoom);
    }
    sa.push(secondEl);

      temp = [firstEl,secondEl];
      arr.push(temp);

  }
  alert(arr);
  return arr;
}

//fillLevelArray();

function getRandomArbitary(min, max)
{
  return Math.round(Math.random() * (max - min) + min);
}

var tweensComplete = 0;
function stopAnimation(event){
  event.target.gotoAndStop("stand");

  for(cb=1;cb<=countBots;cb++)
  {
    if ((ext.i==bots[cb].i)&&(ext.j==bots[cb].j))
    {
      ext.i =-1;
      ext.j =-1;
      endLevelLost();
      break;
    }
  }

  if ((ext.i*countLine + ext.j) == (countLine*countLine)-1)
  {
    ext.i =-1;
    ext.j =-1;
    endLevel();
  }
  else
  {
    if (event.target.name=="human")
    {
      botsTurns();
    }
    if (event.target.name!="human")
    {
      tweensComplete++;
    }
    if(tweensComplete==countBots)
    {
      tweensComplete=0;
      iteration(countLine,countLine,stage,myMatrix);
    }
  }
}


var circle = new createjs.Shape();

var bot = function (value,x,y){
  this.lineFrame = 256;
  this.name = value;
  this.i = x;
  this.j = y;
  this.room = x+(y*countLine);
  this.init = function () {
    this.data = {
      images: value=="human"?["human.png"]:["bots.png"],
      //frames: {width:64, height:64},
      //frames: {width:64, height:64, count:9, regX: 0, regY:-128, spacing:0, margin:0},
      frames:[
      		[0,this.lineFrame,64,64],
      		[64,this.lineFrame,64,64],
      		[128,this.lineFrame,64,64],
      		[192,this.lineFrame,64,64],
      		[256,this.lineFrame,64,64],
      		[320,this.lineFrame,64,64],
      		[384,this.lineFrame,64,64],
      		[448,this.lineFrame,64,64],
      		[512,this.lineFrame,64,64],
          [0,512,64,64],
      ],
      framerate: 10,
      animations: {
          stand:9,
          left:[0,7],
          //jump:[6,8,"run"],
          speed: 0.1
      }
    }
    this.spriteSheet = new createjs.SpriteSheet(this.data);

    this.animation = new createjs.Sprite(this.spriteSheet);

    /*this.animation.filters = [new createjs.ColorFilter(0, 0, 1, 1, 0, 0, 255, 1)];
    this.animation.cache(1,1,512,512);*/

    this.animation.tint = 0xff00ff;

    this.animation.gotoAndStop("stand");
    //this.animation = new createjs.Sprite(spriteSheet, "stand");
    this.animation.setTransform(x*60,y*60,0.6,0.5,0,0,0,-10,-20);

    this.animation.name = value;
    this.animation.iammove = false;
    //this.animation.gotoAndStop("left");
    return this.animation;
  }
  this.getInstance = function (){
    return this.animation;
  }

  this.right = function(){
    this.animation.iammove = true;
    this.animation.gotoAndPlay("left")
    this.animation.setTransform(this.animation.x,this.animation.y,0.6,0.5,0,0,0,-10,-20);
    var tween = createjs.Tween.get(this.animation, {loop: false})
      .to({x: this.animation.x + 60}, 1000, createjs.Ease.linear)
      .call(stopAnimation)
    this.i = this.i + 1;
    console.log("right = "+this.iammove);
    console.log("right exti="+this.i+" extj="+this.j);
  }
  this.left = function(){
    this.animation.iammove = true;
    this.animation.gotoAndPlay("left");
    this.animation.setTransform(this.animation.x,this.animation.y,-0.6,0.5,0,0,0,70,-20);
    createjs.Tween.get(this.animation, {loop: false})
      .to({x: this.animation.x - 60}, 1000, createjs.Ease.linear)
      .call(stopAnimation)
    this.i = this.i - 1;
    console.log("left exti="+this.i+" extj="+this.j);
  }
  this.up = function(){
    this.animation.iammove = true;
    //this.animation.gotoAndStop("left")
    //this.animation.setTransform(this.animation.x,this.animation.y,0.6,0.5,0,0,0,-10,-20);
    createjs.Tween.get(this.animation, {loop: false})
      .to({y: this.animation.y - 60}, 1000, createjs.Ease.linear)
      .call(stopAnimation)
    this.j = this.j - 1;
    console.log("right exti="+this.i+" extj="+this.j);
  }
  this.down = function(){
    this.animation.iammove = true;
    //this.animation.gotoAndStop("left");
    //this.animation.setTransform(this.animation.x,this.animation.y,-0.6,0.5,0,0,0,70,-20);
    createjs.Tween.get(this.animation, {loop: false})
      .to({y: this.animation.y + 60}, 1000, createjs.Ease.linear)
      .call(stopAnimation)
    this.j = this.j + 1;
    console.log("left exti="+this.i+" extj="+this.j);
  }
}
var ext = new bot('human',0,0);


/*var ext_bot = new bot('bot1',2,2);
var ext_bot2 = new bot('bot2',3,3);*/

for(cb=1;cb<=countBots;cb++)
{
  //bots.push(new bot('bot' + cb ,2,2));
  bots[cb] = new bot('bot'+cb,getRandomArbitary(2,countLine-1),getRandomArbitary(2,countLine-1));
}

function handleInteraction(event) {
    console.log("iam = "+ ext.iammove);
    if (ext.animation.iammove == false){
      if ((event.target.i==(ext.i-1))&&(event.target.j==ext.j)){
        ext.left();
      }
      if ((event.target.i==(ext.i+1))&&(event.target.j==ext.j)){
        ext.right();
      }
      if ((event.target.j==(ext.j-1))&&(event.target.i==ext.i)){
        ext.up();
      }
      if ((event.target.j==(ext.j+1))&&(event.target.i==ext.i)){
        ext.down();
      }
    }
}

function drawDecoration()
{
  var g = new createjs.Graphics();
  g.setStrokeStyle(1);
  g.beginStroke("#000000");
  g.beginFill("red");
  g.drawCircle(0,0,30);
}

function init() {
  //stage.rotation = 20;
  stage.regX = deltaX;
  stage.regY = -60;
  drawDecoration();
  //stage.skewY = -30;
  /*var circle = new createjs.Shape();
  //var cube = new createjs.Shape();
  //cube.graphics.setStrokeStyle(1).beginStroke("#00FF00").drawRect(0, 0, 50, 50);
  circle.graphics.beginFill("Crimson").drawCircle(0, 0, 50);
  circle.name = 'asd';
  circle.x = 300;
  circle.y = 100;
  stage.addChild(circle);*/

  var infoText = new createjs.Text("x,y ", "10px Arial", "#ff7700");
  infoText.x = -50;
  infoText.y = -50;
  infoText.name = "infoText";
  infoText.textBaseline = "alphabetic";
  stage.addChild(infoText);
  /*stage.on("stagemousemove", function(evt) {д на жительство в Польше,
    console.log("stageX/Y: "+evt.stageX+","+evt.stageY); // always in bounds
    console.log("rawX/Y: "+evt.rawX+","+evt.rawY); // could be < 0, or > width/height
  });*/

  /*stage.on("stagemousedown", function(evt) {
    console.log("stageX/Y: "+evt.stageX+","+evt.stageY); // always in bounds
    //console.log("rawX/Y-----: "+evt.rawX+","+evt.rawY); // could be < 0, or > width/height
    human = stage.getChildByName('human');
    console.log("x-50: "+human.x+" x+50: "+human.x+ " x.click="+evt.stageX);
    console.log("y : "+human.y+" y_clixk: "+evt.stageY);
    if (((human.x+50)>evt.stageX)&&((human.x-50)<evt.stageX)){//&(human.y<evt.stageY)
      console.log("up");
    }
    else {
      console.log("not _up");
    }
    //stage.getChildByName('infoText').text = evt.rawX;
  });*/

  stage.addChild(ext.init());

  //stage.addChild(ext_bot.init());
  //stage.addChild(ext_bot2.init());
  for(cb=1;cb<=countBots;cb++)
  {
    stage.addChild(bots[cb].init());
    //bots.push(new bot('bot' + cb ,2,2));
  }

  //circle.addEventListener("click", functionListener1);

  createjs.Ticker.setFPS(20);
  createjs.Ticker.addEventListener("tick", stage);
  //testSprite();
}

function iteration(rows,columns,stage,arr){
  console.log("iteration");
  arr = arr.shuffle2();
}

function botsTurns()
{
  for(cb=1;cb<=countBots;cb++)
  {
    if ((cb%2)==0)
    {
      oneTurn = false;
      if ((ext.i<bots[cb].i)&&(oneTurn==false))
      {
        bots[cb].left();
        oneTurn=true;
      }
      if ((ext.i>bots[cb].i)&&(oneTurn==false))
      {
        bots[cb].right();
        oneTurn=true;
      }
      if ((ext.j<bots[cb].j)&&(oneTurn==false))
      {
        bots[cb].up();
        oneTurn=true;
      }
      if ((ext.j>bots[cb].j)&&(oneTurn==false))
      {
        bots[cb].down();
        oneTurn=true;
      }
    }
    else {
      oneTurn = false;
      if ((ext.j<bots[cb].j)&&(oneTurn==false))
      {
        bots[cb].up();
        oneTurn=true;
      }
      if ((ext.j>bots[cb].j)&&(oneTurn==false))
      {
        bots[cb].down();
        oneTurn=true;
      }
      if ((ext.i<bots[cb].i)&&(oneTurn==false))
      {
        bots[cb].left();
        oneTurn=true;
      }
      if ((ext.i>bots[cb].i)&&(oneTurn==false))
      {
        bots[cb].right();
        oneTurn=true;
      }
    }
  }
}

function matrixArray(rows,columns,stage){
  var arr = [];
  for(var i=0; i<rows; i++){
    arr[i] = [];
    for(var j=0; j<columns; j++){
      arr[i][j] = new Object();
      arr[i][j].cube = new createjs.Shape();

      arr[i][j].cube.graphics.setStrokeStyle(0).beginStroke("#00FF00").beginFill("Gray").drawRect(0, 0, cubeSize-10, cubeSize-10);
      arr[i][j].cube.x = i*cubeSize;
      arr[i][j].cube.y = j*cubeSize;
      arr[i][j].cube.i = i;
      arr[i][j].cube.j = j;
      arr[i][j].cube.on("click", handleInteraction);

      arr[i][j].messageCube = i*rows + (j);
      arr[i][j].text = new createjs.Text(arr[i][j].messageCube, "10px Arial", "#ff7700");
      arr[i][j].text.x = i*cubeSize;
      arr[i][j].text.y = j*cubeSize+10;
      arr[i][j].text.textBaseline = "alphabetic";

      stage.addChild(arr[i][j].cube);
      stage.addChild(arr[i][j].text);

      arr[i][j].cube.addEventListener("click", functionListener2);
    }
  }
  return arr;
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

Array.prototype.shuffle = function() {
  var arr = [[0,35],[1,5],[2,24],[15,19],[3,12],[9,22],[13,16],[6,4],[21,7],[11,20],[8,10],[23,14],[17,18]];
        for (var k = 0; k<arr.length; k++){
          //a = 7;
          a = arr[k][0];
          i = Math.trunc(a/(this.length));
          j = (a - i*this.length);
          b = arr[k][1];

          numI = Math.trunc(b/(this.length));
          numJ = (b - numI*this.length);
          createjs.Tween.get(this[i][j].cube, {loop: false})
            .to({x: this[numI][numJ].cube.x}, 1000, createjs.Ease.getPowInOut(5))
            .to({alpha: 1, y: this[numI][numJ].cube.y}, 500, createjs.Ease.getPowInOut(2))

          createjs.Tween.get(this[i][j].text, {loop: false})
            .to({x: this[numI][numJ].text.x}, 1000, createjs.Ease.getPowInOut(5))
            .to({alpha: 1, y: this[numI][numJ].text.y}, 500, createjs.Ease.getPowInOut(2))

          createjs.Tween.get(this[numI][numJ].cube, {loop: false})
             .to({x: this[i][j].cube.x}, 1000, createjs.Ease.getPowInOut(5))
             .to({alpha: 1, y: this[i][j].cube.y}, 500, createjs.Ease.getPowInOut(2))

          createjs.Tween.get(this[numI][numJ].text, {loop: false})
             .to({x: this[i][j].text.x}, 1000, createjs.Ease.getPowInOut(5))
             .to({alpha: 1, y: this[i][j].text.y}, 500, createjs.Ease.getPowInOut(2))
             .call(function() {
               stage.getChildByName('asd').addEventListener("click",functionListener1);
              })
        }
    return this;
}

Array.prototype.shuffle2 = function() {
  //var arr = [[0,10],[10,16],[16,0],[1,5],[5,2],[2,3],[3,4],[4,1],[21,33],[33,35],[35,21],[24,30],[30,31],[31,25],[25,24]];
  //var arr = [[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,7],[7,8],[8,9],[9,10],[10,11],[11,12],[12,13],[13,14],[14,0]];
  //var arr = [[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,7],[7,0]];
  //level 4x4
  //1
  //var arr = [[7,8],[3,4],[15,9],[11,14],[12,10],[10,1],[5,13],[13,3],[14,12],[1,7],[6,5],[9,2],[4,0],[0,11],[2,6],[8,15]]
  //1
  //var arr = [[3,7],[12,6],[9,11],[14,15],[2,9],[8,8],[7,5],[6,4],[13,13],[0,12],[4,14],[10,0],[11,2],[1,3],[5,1],[15,10]]
  //
  //var arr = [[6,14],[3,2],[1,4],[9,10],[10,0],[2,11],[13,3],[8,15],[5,6],[12,7],[11,12],[4,8],[0,5],[14,9],[7,13],[15,1]]

  //level 3x3
  //var arr = [[0,1],[1,2],[2,3],[3,7],[7,11],[11,15],[15,14],[14,13],[13,12],[12,8],[8,4],[4,0],[6,5],[5,9],[9,10],[10,6]];
  // latwe var arr = [[2,9],[8,3],[9,0],[11,2],[1,11],[12,1],[14,8],[4,5],[5,10],[10,12],[15,14],[3,4],[13,7],[7,6],[0,13],[6,15]]
  // var arr = [[8,3],[13,9],[10,6],[14,12],[7,10],[0,1],[15,13],[11,2],[5,11],[3,14],[12,4],[9,8],[1,7],[6,0],[4,5],[2,15]]
  //var arr = [[14,4],[2,12],[6,8],[11,6],[10,10],[5,13],[8,14],[0,7],[3,0],[4,2],[1,5],[9,9],[15,3],[13,11],[12,1],[7,15]]
  var arr = [[10,7],[5,2],[1,1],[0,6],[13,12],[11,9],[7,5],[3,10],[2,4],[14,3],[15,0],[9,8],[12,11],[8,15],[4,13],[6,14]]
  //var arr = fillLevelArray();

  tempRoom = "";
  var temp = [];
  for(var i=0; i<arr.length; i++){
    temp[i] = [];
    for(var j=0; j<arr.length; j++){
      temp[i][j] = new Object();
    }
  }

  tempRoom = "";
  for(cb=1;cb<=countBots;cb++)
  {
    tempRoomB[cb] = "";
  }
  //tempRoom1 = "";
  //tempRoom2 = "";
  for (var k = 0; k<arr.length; k++){
    //a = 7;
    a = arr[k][0];
    i = Math.trunc(a/(this.length));
    j = (a - i*this.length);

    b = arr[k][1];
    numI = Math.trunc(b/(this.length));
    numJ = (b - numI*this.length);
    toX = numI*cubeSize;
    toY = numJ*cubeSize;

    temp[numI][numJ] = this[i][j];
    this[i][j].cube.i=numI;
    this[i][j].cube.j=numJ;


    if ((ext.i==i)&&(ext.j==j)){
      //console.log("anim exti="+ext.i+" extj="+ext.j+ " i="+i+" j="+j);
      tempRoom = b;
      console.log("set temp room = "+tempRoom);
      createjs.Tween.get(ext.getInstance())
      .to({x: toX}, 1000, createjs.Ease.getPowInOut(5))
      .to({y: toY}, 500, createjs.Ease.getPowInOut(2))
    }

    for(cb=1;cb<=countBots;cb++)
    {
      if ((bots[cb].i==i)&&(bots[cb].j==j)){
        //console.log("anim exti="+ext.i+" extj="+ext.j+ " i="+i+" j="+j);
        tempRoomB[cb] = b;
        console.log("set temp room ext_bot= "+tempRoom[cb]);
        createjs.Tween.get(bots[cb].getInstance())
        .to({x: toX}, 1000, createjs.Ease.getPowInOut(5))
        .to({y: toY}, 500, createjs.Ease.getPowInOut(2))
      }
    }


    /*if ((ext_bot.i==i)&&(ext_bot.j==j)){
      //console.log("anim exti="+ext.i+" extj="+ext.j+ " i="+i+" j="+j);
      tempRoom1 = b;
      console.log("set temp room ext_bot= "+tempRoom);
      createjs.Tween.get(ext_bot.getInstance())
      .to({x: toX}, 1000, createjs.Ease.getPowInOut(5))
      .to({y: toY}, 500, createjs.Ease.getPowInOut(2))
    }

    if ((ext_bot2.i==i)&&(ext_bot2.j==j)){
      //console.log("anim exti="+ext.i+" extj="+ext.j+ " i="+i+" j="+j);
      tempRoom2 = b;
      console.log("set temp room ext_bot2= "+tempRoom);
      createjs.Tween.get(ext_bot2.getInstance())
      .to({x: toX}, 1000, createjs.Ease.getPowInOut(5))
      .to({y: toY}, 500, createjs.Ease.getPowInOut(2))
    }*/

    /*if (i==0){
      createjs.Tween.get(this[i][j].cube, {loop: false})
        //.to({scaleX: 0.8,scaleY: 0.8,regX:-3,regY:-3}, 1000, createjs.Ease.getPowInOut(5))
        .to({ x:  -60}, 1000, createjs.Ease.getPowInOut(5))
        //.to({ y:  -60}, 1000, createjs.Ease.getPowInOut(5))

        .to({x: toX}, 1000, createjs.Ease.getPowInOut(5))
        .to({y: toY}, 1000, createjs.Ease.getPowInOut(5))
        //.to({y: toY - 40}, 1000, createjs.Ease.getPowInOut(5))
        .to({alpha: 1, y: toY}, 500, createjs.Ease.getPowInOut(2))
    }
    else {
      createjs.Tween.get(this[i][j].cube, {loop: false})
        //.to({scaleX: 0.8,scaleY: 0.8,regX:-3,regY:-3}, 1000, createjs.Ease.getPowInOut(5))
        .to({ y: toY + 60}, 1000, createjs.Ease.getPowInOut(5))
        .to({x: toX}, 1000, createjs.Ease.getPowInOut(5))
        //.to({ x: toX - 60}, 1000, createjs.Ease.getPowInOut(5))
        //.to({y: toY - 40}, 1000, createjs.Ease.getPowInOut(5))
        .to({alpha: 1, y: toY}, 500, createjs.Ease.getPowInOut(2))
    }*/
    createjs.Tween.get(this[i][j].cube, {loop: false})
      //.to({scaleX: 0.8,scaleY: 0.8,regX:-3,regY:-3}, 1000, createjs.Ease.getPowInOut(5))
      .to({x: toX}, 1000, createjs.Ease.getPowInOut(5))
      //.to({ x: toX - 60}, 1000, createjs.Ease.getPowInOut(5))
      //.to({y: toY - 40}, 1000, createjs.Ease.getPowInOut(5))


      .to({y: toY}, 500, createjs.Ease.getPowInOut(2))




      //.to({scaleX: 1,scaleY: 1,regX:0,regY:0}, 500, createjs.Ease.getPowInOut(2))

    createjs.Tween.get(this[i][j].text, {loop: false})
      //.to({regX:-3,regY:-3}, 1000, createjs.Ease.getPowInOut(5))
      //.to({x: toX - 40}, 1000, createjs.Ease.getPowInOut(5))
      //.to({y: toY - 30}, 1000, createjs.Ease.getPowInOut(5))

      .to({x: toX}, 1000, createjs.Ease.getPowInOut(5))
      .to({y: toY+10}, 500, createjs.Ease.getPowInOut(2))
      //.to({regX:-3,regY:-12}, 1000, createjs.Ease.getPowInOut(2))
      .call(function() {
        ext.animation.iammove = false;

        if ((ext.i*countLine + ext.j) == (countLine*countLine)-1)
        {
          ext.i =-1;
          ext.j =-1;
          endLevel();
        }
       })

  }

  for (var k = 0; k<arr.length; k++){
    b = arr[k][1];
    numI = Math.trunc(b/(this.length));
    numJ = (b - numI*this.length);
    this[numI][numJ] = temp[numI][numJ];

    if (b===tempRoom){
      console.log("b=temproom "+b + "=" + tempRoom);
      ext.room=b;
      ext.i = numI;
      ext.j = numJ;
      console.log(" res exti="+ext.i+" extj="+ext.j+ " room=" +ext.room);
    }

    for(cb=1;cb<=countBots;cb++)
    {
      if (b===tempRoomB[cb]){
        console.log("b=temproom "+b + "=" + tempRoomB[cb]);
        bots[cb].room=b;
        bots[cb].i = numI;
        bots[cb].j = numJ;
        console.log(" res exti="+bots[cb].i+" extj="+bots[cb].j+ " room=" +bots[cb].room);
      }
    }

  }
  return this;
}
