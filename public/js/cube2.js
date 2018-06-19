tweensComplete = 0;

class scene {
    constructor(stageName) {
        this.stage = new createjs.Stage(stageName);
        createjs.Ticker.setFPS(20);
        createjs.Ticker.addEventListener("tick", this.stage);
    }

    renderDecoration() {

    }

    addObject(parameters) {
        this.stage.addChild(parameters);

    }

    get getInstance() {
        return this.stage;
    }
    transform(x,y){
        console.log(x+" "+y);
        let width = 350;
        let height = 350;
        let xTransform = (width-(x*(60-2.5)))/2;
        let yTransform = (height-(y*(60-2.5)))/2;
        this.stage.setTransform(yTransform,xTransform);
    }
    drawDecoration(level){
        let cubeSize = 60;
        for (let i=-4;i<10;i++)
        {
            var cubDecor = new createjs.Shape();
            cubDecor.graphics.setStrokeStyle(0).beginStroke("#00FF00").beginFill("Green").drawRect(0, 0, cubeSize - 10, cubeSize - 10);
            cubDecor.x = i * cubeSize;
            cubDecor.y = (-1) * cubeSize;
            this.addObject(cubDecor);

            var cubDecor = new createjs.Shape();
            cubDecor.graphics.setStrokeStyle(0).beginStroke("#00FF00").beginFill("Green").drawRect(0, 0, cubeSize - 10, cubeSize - 10);
            cubDecor.x = i * cubeSize;
            cubDecor.y = ((level.getCubeRC[0])) * cubeSize;
            this.addObject(cubDecor);
        }
    }

}

class cube {
    constructor(i, j, cubeSize) {
        this.parameters = new createjs.Shape();
        this.parameters.graphics.setStrokeStyle(0).beginStroke("#00FF00").beginFill("Gray").drawRect(0, 0, cubeSize - 10, cubeSize - 10);
        this.parameters.x = i * cubeSize;
        this.parameters.y = j * cubeSize;
        this.parameters.i = i;
        this.parameters.j = j;
        this.parameters.on("click", this.handleInteraction);

        this.title = new createjs.Text("", "10px Arial", "#ff7700");
        this.title.x = i * cubeSize;
        this.title.y = j * cubeSize + 10;
        this.title.textBaseline = "alphabetic";
    }

    set setText(value) {
        this.title.text = value;
    }

    handleInteraction(event) {
        console.log("iam = " + event.target.i + " " + event.target.j);
        //console.log(instQueue.getState);
        if (instHuman.animation.iammove == false) {
            if (instQueue.getState == "human") {
                if ((event.target.i == (instHuman.i - 1)) && (event.target.j == instHuman.j)) {
                    instHuman.left();
                }
                if ((event.target.i == (instHuman.i + 1)) && (event.target.j == instHuman.j)) {
                    instHuman.right();
                }
                if ((event.target.j == (instHuman.j - 1)) && (event.target.i == instHuman.i)) {
                    instHuman.up();
                }
                if ((event.target.j == (instHuman.j + 1)) && (event.target.i == instHuman.i)) {
                    instHuman.down();
                }
            }
        }
    }

}

class cubes {
    constructor(rows, columns, stage, cubeSize) {
        this.arr = [];
        this.cubeSize = cubeSize;
        this.stage = stage;
        for (var i = 0; i < columns; i++) {
            this.arr[i] = [];
            for (var j = 0; j < rows; j++) {
                this.arr[i][j] = new cube(i, j, this.cubeSize);
                //this.arr[i][j].setText = i * rows + (j);
                this.arr[i][j].setText = (i) + " " + (j) + " " + (i * rows + (j));
                stage.addChild(this.arr[i][j].parameters);
                stage.addChild(this.arr[i][j].title);
            }
        }
    }

    animate(level, queue, player, bots) {
        if (queue.getState === "cubes") {
            var tempRoom = [];
            var temp = [];
            for (var i = 0; i < level.getCubeRC[0]; i++) {
                temp[i] = [];
                for (var j = 0; j < level.getCubeRC[1]; j++) {
                    temp[i][j] = new Object();
                }
            }

            var tempRoomB = [];
            for (cb = 0; cb <= level.getCountBots - 1; cb++) {
                tempRoomB[cb] = "";
            }

            this.level = level.getArrayLevel;// [[10, 7], [5, 2], [1, 1], [0, 6], [13, 12], [11, 9], [7, 5], [3, 10], [2, 4], [14, 3], [15, 0], [9, 8], [12, 11], [8, 15], [4, 13], [6, 14]];
            //console.log(this.level);
            let lengthArray = this.level.length - 1;
            for (var k = 0; k < this.level.length; k++) {
                var a = this.level[k][0];
                //console.log(a);
                var i = Math.trunc(a / (level.getCubeRC[0]));
                //console.log(i);
                var j = (a - i * level.getCubeRC[0]);

                var b = this.level[k][1];
                let numI = Math.trunc(b / (level.getCubeRC[0]));
                let numJ = (b - numI * level.getCubeRC[0]);
                let toX = numI * this.cubeSize;
                let toY = numJ * this.cubeSize;
                //console.log(toX + " " + toY);
                //console.log(i+" "+j);

                temp[numI][numJ] = this.arr[i][j];
                this.arr[i][j].parameters.i = numI;
                this.arr[i][j].parameters.j = numJ;

                if ((player.i == i) && (player.j == j)) {
                    //console.log("anim exti="+ext.i+" extj="+ext.j+ " i="+i+" j="+j);
                    tempRoom = b;
                    //console.log("set temp room = " + tempRoom);
                    createjs.Tween.get(player.getInstance)
                        .to({x: toX}, 1000, createjs.Ease.getPowInOut(5))
                        .to({y: toY}, 500, createjs.Ease.getPowInOut(2))
                }

                for (cb = 0; cb <= level.getCountBots - 1; cb++) {
                    if ((bots[cb].i == i) && (bots[cb].j == j)) {
                        //console.log("anim exti="+ext.i+" extj="+ext.j+ " i="+i+" j="+j);
                        tempRoomB[cb] = b;
                        //console.log("set temp room ext_bot= " + tempRoom[cb]);
                        createjs.Tween.get(bots[cb].getInstance)
                            .to({x: toX}, 1000, createjs.Ease.getPowInOut(5))
                            .to({y: toY}, 500, createjs.Ease.getPowInOut(2))
                    }
                }

                createjs.Tween.get(this.arr[i][j].parameters, {loop: false})
                    .to({x: toX}, 1000, createjs.Ease.getPowInOut(5))
                    .to({y: toY}, 500, createjs.Ease.getPowInOut(2));
                createjs.Tween.get(this.arr[i][j].title, {loop: false})
                    .to({x: toX}, 1000, createjs.Ease.getPowInOut(5))
                    .to({y: toY + 10}, 500, createjs.Ease.getPowInOut(2));
            }
            //need animation
            createjs.Tween.get(this.stage.getChildByName("asd"), {loop: false})
                .to({x: 100}, 2000, createjs.Ease.getPowInOut(5))
                .call(function () {
                    queue.next();
                    //console.log(queue.getState);
                })

            for (var k = 0; k < this.level.length; k++) {
                var b = this.level[k][1];
                let numI = Math.trunc(b / (level.getCubeRC[0]));
                let numJ = (b - numI * level.getCubeRC[0]);
                this.arr[numI][numJ] = temp[numI][numJ];

                if (b === tempRoom) {
                    //console.log("b=temproom " + b + "=" + tempRoom);
                    instHuman.room = b;
                    instHuman.i = numI;
                    instHuman.j = numJ;
                    //console.log(" res exti=" + instHuman.i + " extj=" + instHuman.j + " room=" + instHuman.room);
                }

                for (cb = 0; cb <= instLevel.getCountBots - 1; cb++) {
                    if (b === tempRoomB[cb]) {
                        //console.log("b=temproom " + b + "=" + tempRoomB[cb]);
                        bots[cb].room = b;
                        bots[cb].i = numI;
                        bots[cb].j = numJ;
                        console.log(" res exti=" + bots[cb].i + " extj=" + bots[cb].j + " room=" + bots[cb].room);
                    }
                }

            }
        }
    }

}

class queue {
    constructor() {
        this.queue = ["human", "bots", "cubes"];
        this.index = 0;
    }

    get getState() {
        return this.queue[this.index];
    }

    next() {
        this.index = this.index + 1;
        if (this.index > 2) {
            this.index = 0;
        }
        //console.log(this.queue[this.index]);
        return this.index;
    }
}

class level {
    constructor() {
        this.current = 1;
        this.cubeRC = [];
        this.positionPlayer = [];
        this.arrayLevel = [];
        this.countBots = [];
        this.positionBots = [];
        this.exit=[];

        /*this.exit[0]=[3,3];
        this.cubeRC[0] = [4, 4];
        this.positionPlayer[0] = [0, 0];
        this.countBots[0] = 1;
        this.positionBots[0] = [[0, 2], [2, 2]];
        this.arrayLevel[0] = [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8], [8, 0]];*/

        this.exit[0]=[2,2];
        this.cubeRC[0] = [3, 3];
        this.positionPlayer[0] = [0, 0];
        this.countBots[0] = 1;
        this.positionBots[0] = [[0, 2], [2, 2]];
        this.arrayLevel[0] = [[0, 1], [1, 0]];


        this.exit[1]=[3,2];
        this.cubeRC[1] = [3, 4];
        this.positionPlayer[1] = [0, 0];
        this.countBots[1] = 1;
        this.positionBots[1] = [[0, 2], [2, 2]];
        this.arrayLevel[1] = [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8], [8, 0]];

        this.exit[2]=[3,3];
        this.cubeRC[2] = [4, 4];
        this.positionPlayer[2] = [0, 0];
        this.countBots[2] = 1;
        this.positionBots[2] = [[0, 2], [2, 2]];
        this.arrayLevel[2] = [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8], [8, 0]];

        this.exit[3]=[3,3];
        this.cubeRC[3] = [4, 4];
        this.positionPlayer[3] = [0, 0];
        this.countBots[3] = 1;
        this.positionBots[3] = [[0, 2], [2, 2]];
        this.arrayLevel[3] = [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8], [8, 0]];

        this.exit[4]=[3,3];
        this.cubeRC[4] = [4, 4];
        this.positionPlayer[4] = [0, 0];
        this.countBots[4] = 1;
        this.positionBots[4] = [[0, 2], [2, 2]];
        this.arrayLevel[4] = [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8], [8, 0]];

        this.exit[5]=[3,3];
        this.cubeRC[5] = [4, 4];
        this.positionPlayer[5] = [0, 0];
        this.countBots[5] = 1;
        this.positionBots[5] = [[0, 2], [2, 2]];
        this.arrayLevel[5] = [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8], [8, 0]];
    }

    get getCurrentLevel() {
        return this.current + 1;
    }

    get getCubeRC() {
        return this.cubeRC[this.current];
    }

    get getPositionPlayer() {
        return this.positionPlayer[this.current];
    }

    get getArrayLevel() {
        return this.arrayLevel[this.current];
    }

    get getCountBots() {
        return this.countBots[this.current];
    }

    get getPositionBots() {
        return this.positionBots[this.current];
    }

    get getExit(){
        return this.exit[this.current];
    }
    next() {
        this.current++;
        if (this.current > 5) {
            this.current = 0;
        }
        return this.current;
    }
}

class bot {
    constructor(type, x, y, level, stage, queue) {
        this.queue = queue;
        this.lineFrame = 256;
        this.name = type;
        this.i = x;
        this.j = y;
        this.room = this.i + (this.j * level.getCubeRC[0]);

        this.data = {
            images: type == "human" ? ["human.png"] : ["bots.png"],
            //frames: {width:64, height:64},
            //frames: {width:64, height:64, count:9, regX: 0, regY:-128, spacing:0, margin:0},
            frames: [
                [0, this.lineFrame, 64, 64],
                [64, this.lineFrame, 64, 64],
                [128, this.lineFrame, 64, 64],
                [192, this.lineFrame, 64, 64],
                [256, this.lineFrame, 64, 64],
                [320, this.lineFrame, 64, 64],
                [384, this.lineFrame, 64, 64],
                [448, this.lineFrame, 64, 64],
                [512, this.lineFrame, 64, 64],
                [0, 512, 64, 64],
            ],
            framerate: 10,
            animations: {
                stand: 9,
                left: [0, 7],
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
        this.animation.setTransform(this.i * 60, this.j * 60, 0.6, 0.5, 0, 0, 0, -10, -20);

        this.animation.name = type;
        this.animation.iammove = false;
        //this.animation.gotoAndStop("left");
        stage.addObject(this.animation);
    }

    get getInstance() {
        return this.animation;
    }

    right() {
        this.animation.iammove = true;
        this.animation.gotoAndPlay("left")
        this.animation.setTransform(this.animation.x, this.animation.y, 0.6, 0.5, 0, 0, 0, -10, -20);
        var tween = createjs.Tween.get(this.animation, {loop: false})
            .to({x: this.animation.x + 60}, 1000, createjs.Ease.linear)
            .call(this.stopAnimation)
        this.i = this.i + 1;
        /*console.log("right = " + this.iammove);
        console.log("right exti=" + this.i + " extj=" + this.j);*/
    }

    left() {
        this.animation.iammove = true;
        this.animation.gotoAndPlay("left");
        this.animation.setTransform(this.animation.x, this.animation.y, -0.6, 0.5, 0, 0, 0, 70, -20);
        createjs.Tween.get(this.animation, {loop: false})
            .to({x: this.animation.x - 60}, 1000, createjs.Ease.linear)
            .call(this.stopAnimation)
        this.i = this.i - 1;
        //console.log("left exti=" + this.i + " extj=" + this.j);
    }

    up() {
        this.animation.iammove = true;
        //this.animation.gotoAndStop("left")
        //this.animation.setTransform(this.animation.x,this.animation.y,0.6,0.5,0,0,0,-10,-20);
        createjs.Tween.get(this.animation, {loop: false})
            .to({y: this.animation.y - 60}, 1000, createjs.Ease.linear)
            .call(this.stopAnimation)
        this.j = this.j - 1;
        //console.log("right exti=" + this.i + " extj=" + this.j);
    }

    down() {
        this.animation.iammove = true;
        //this.animation.gotoAndStop("left");
        //this.animation.setTransform(this.animation.x,this.animation.y,-0.6,0.5,0,0,0,70,-20);
        createjs.Tween.get(this.animation, {loop: false})
            .to({y: this.animation.y + 60}, 1000, createjs.Ease.linear)
            .call(this.stopAnimation)
        this.j = this.j + 1;
        //console.log("left exti=" + this.i + " extj=" + this.j);
    }

    stopAnimation(event) {
        event.target.gotoAndStop("stand");


        if (instQueue.getState == "human") {
            console.log(instHuman.i + " " + instLevel.getExit[0]+ " " +instHuman.j + " " +instLevel.getExit[1]);
            if (((instHuman.i ) == (instLevel.getExit[0]))&&((instHuman.j ) == (instLevel.getExit[1]))) {
                //instHuman.i = -1;
                //instHuman.j = -1;
                endLevel();
            }
            instHuman.animation.iammove = false;
            instQueue.next();
            botsTurns();
        }
        if (instQueue.getState == "bots") {
            tweensComplete++;
            let end = 0;
            console.log(tweensComplete + " " + instLevel.getCountBots);
            /*if (tweensComplete == instLevel.getCountBots) {
                for (cb = 0; cb <= instLevel.getCountBots - 1; cb++) {
                    bots[cb].animation.iammove==false;
                }
            }*/

            if (tweensComplete == instLevel.getCountBots+1) {

                for (cb = 0; cb <= instLevel.getCountBots - 1; cb++) {
                    //if (bots[cb].animation.iammove==false){
                        if ((instHuman.i == bots[cb].i) && (instHuman.j == bots[cb].j)) {
                            instHuman.i = -1;
                            instHuman.j = -1;
                            console.log("this");
                            end = 1;
                            endLevelLost();
                            break;
                        }
                    //}
                }

                if (end==0){
                instQueue.next();
                tweensComplete = 0;
                instCubes.animate(instLevel, instQueue, instHuman, bots);
                }
            }
        }
    }
}

function botsTurns() {
    if (instQueue.getState == "bots") {
        for (cb = 0; cb <= instLevel.getCountBots - 1; cb++) {
            if ((cb % 2) == 0) {
                oneTurn = false;
                if ((instHuman.i < bots[cb].i) && (oneTurn == false)) {
                    bots[cb].left();
                    oneTurn = true;
                }
                if ((instHuman.i > bots[cb].i) && (oneTurn == false)) {
                    bots[cb].right();
                    oneTurn = true;
                }
                if ((instHuman.j < bots[cb].j) && (oneTurn == false)) {
                    bots[cb].up();
                    oneTurn = true;
                }
                if ((instHuman.j > bots[cb].j) && (oneTurn == false)) {
                    bots[cb].down();
                    oneTurn = true;
                }
            }
            else {
                oneTurn = false;
                if ((instHuman.j < bots[cb].j) && (oneTurn == false)) {
                    bots[cb].up();
                    oneTurn = true;
                }
                if ((instHuman.j > bots[cb].j) && (oneTurn == false)) {
                    bots[cb].down();
                    oneTurn = true;
                }
                if ((instHuman.i < bots[cb].i) && (oneTurn == false)) {
                    bots[cb].left();
                    oneTurn = true;
                }
                if ((instHuman.i > bots[cb].i) && (oneTurn == false)) {
                    bots[cb].right();
                    oneTurn = true;
                }
            }
        }

    }
}

function endLevel() {
    //alert('You WIN!!!');
    instLevel.next();
    nextStage();
}

function endLevelLost() {
    //alert('You Lost!');
    lostStage();
}

function nextStage(){
    instScene.getInstance.removeAllChildren();
    title = new createjs.Text("next level "+instLevel.getCurrentLevel, "10px Arial", "#ff7700");
    title.x = 30;
    title.y = 30;
    title.textBaseline = "alphabetic";
    instScene.getInstance.on("stagemousedown", newInit);
    instScene.addObject(title)
}

function lostStage(){
    instScene.getInstance.removeAllChildren();
    title = new createjs.Text("level "+instLevel.getCurrentLevel+" lost", "10px Arial", "#ff7700");
    title.x = 30;
    title.y = 30;
    title.textBaseline = "alphabetic";
    instScene.getInstance.on("stagemousedown", newInit);
    instScene.addObject(title)
}

function newInit(evt){

    instScene.getInstance.removeAllChildren();

    instScene.transform(instLevel.getCubeRC[0], instLevel.getCubeRC[1]);
    instScene.drawDecoration(instLevel);
    tweensComplete = 0;
    var circle = new createjs.Shape();
    circle.graphics.beginFill("Crimson").drawCircle(0, 0, 50);
    circle.name = 'asd';
    circle.x = 300;
    circle.y = 100;
    instScene.addObject(circle);

    instCubes = new cubes(instLevel.getCubeRC[0], instLevel.getCubeRC[1], instScene.getInstance, 60);
    instQueue = new queue();
    //console.log(instQueue.getState);
    //instQueue.next();
    instHuman = new bot("human", instLevel.getPositionPlayer[0], instLevel.getPositionPlayer[1], instLevel, instScene, instQueue);

    //console.log(instLevel.getCountBots)
    bots = [];
    for (cb = 0; cb <= instLevel.getCountBots - 1; cb++) {
        //bots.push(new bot('bot' + cb ,2,2));
        bots[cb] = new bot("bot", instLevel.getPositionBots[cb][0], instLevel.getPositionBots[cb][1], instLevel, instScene, instQueue);
        //console.log(instLevel.getPositionBots[cb][0]);
    }
    evt.remove();
}

function init() {
    //cube1 = new cube(2,2,30);
    instScene = new scene("thisCanvas");
    instLevel = new level();
    title = new createjs.Text("now lets start (click)", "10px Arial", "#ff7700");
    title.x = 30;
    title.y = 30;
    title.textBaseline = "alphabetic";
    instScene.getInstance.on("stagemousedown", newInit);
    instScene.addObject(title)

}