class scene{
    constructor(stageName){
        this.stage=new createjs.Stage(stageName);
        createjs.Ticker.setFPS(20);
        createjs.Ticker.addEventListener("tick", this.stage);
    }
    renderDecoration(){

    }
    addObject(parameters){
        this.stage.addChild(parameters);

    }
    get getInstance(){
        return this.stage;
    }

}

class cube{
    constructor(i,j,cubeSize){
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
        /*if (ext.animation.iammove == false) {
            if ((event.target.i == (ext.i - 1)) && (event.target.j == ext.j)) {
                ext.left();
            }
            if ((event.target.i == (ext.i + 1)) && (event.target.j == ext.j)) {
                ext.right();
            }
            if ((event.target.j == (ext.j - 1)) && (event.target.i == ext.i)) {
                ext.up();
            }
            if ((event.target.j == (ext.j + 1)) && (event.target.i == ext.i)) {
                ext.down();
            }
        }*/
    }

}

class cubes{
    constructor(rows, columns, stage, cubeSize){
        this.arr = [];
        this.cubeSize = cubeSize;
        this.stage = stage;
        for (var i = 0; i < columns; i++) {
            this.arr[i] = [];
            for (var j = 0; j < rows; j++) {
                this.arr[i][j] = new cube(i,j,this.cubeSize);
                //this.arr[i][j].setText = i * rows + (j);
                this.arr[i][j].setText = (i) +" "+(j) + " " + (i * rows + (j));
                stage.addChild(this.arr[i][j].parameters);
                stage.addChild(this.arr[i][j].title);
            }
        }
    }
    animate(level,queue){
        this.level = level.getArrayLevel;// [[10, 7], [5, 2], [1, 1], [0, 6], [13, 12], [11, 9], [7, 5], [3, 10], [2, 4], [14, 3], [15, 0], [9, 8], [12, 11], [8, 15], [4, 13], [6, 14]];
        //console.log(this.level);
        let lengthArray = this.level.length-1;
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
            createjs.Tween.get(this.arr[i][j].parameters, {loop: false})
                .to({x: toX}, 1000, createjs.Ease.getPowInOut(5))
                .to({y: toY}, 500, createjs.Ease.getPowInOut(2));
            createjs.Tween.get(this.arr[i][j].title, {loop: false})
                .to({x: toX}, 1000, createjs.Ease.getPowInOut(5))
                .to({y: toY + 10}, 500, createjs.Ease.getPowInOut(2));
        }
        //need animation
        createjs.Tween.get(this.stage.getChildByName("asd"), {loop: false})
            .to({x:100}, 2000, createjs.Ease.getPowInOut(5))
            .call(function () {
                    queue.next();
                    console.log(queue.getState);
            })
    }

}

class queue{
    constructor(){
        this.queue = ["human","bots","cubes"];
        this.index = 0;
    }
    get getState(){
        return this.queue[this.index];
    }

    next(){
        this.index = this.index+1;
        if (this.index>2){
            this.index = 0;
        }
        return this.index;
    }
}

class level{
    constructor(){
        this.currnet = 0;
        this.cubeRC = [];
        this.arrayLevel = [];
        this.cubeRC[0] = [6,2];
        this.cubeRC[1] = [4,4];
        this.cubeRC[2] = [3,3];
        this.arrayLevel[0] = [[10, 7], [7, 2], [2, 10]];
        //this.arrayLevel[0] = [[10, 7], [5, 2], [1, 1], [0, 6], [13, 12], [11, 9], [7, 5], [3, 10], [2, 4], [14, 3], [15, 0], [9, 8], [12, 11], [8, 15], [4, 13], [6, 14]];
        this.arrayLevel[1] = [[10, 7], [5, 2], [1, 1], [0, 6], [13, 12], [11, 9], [7, 5], [3, 10], [2, 4], [14, 3], [15, 0], [9, 8], [12, 11], [8, 15], [4, 13], [6, 14]];
        this.arrayLevel[2] = [[10, 7], [5, 2], [1, 1], [0, 6], [13, 12], [11, 9], [7, 5], [3, 10], [2, 4], [14, 3], [15, 0], [9, 8], [12, 11], [8, 15], [4, 13], [6, 14]];
    }
    get getCurrentLevel(){
        return this.currnet+1;
    }
    get getCubeRC(){
        return this.cubeRC[this.currnet];
    }
    get getArrayLevel(){
        return this.arrayLevel[this.currnet];
    }
    next(){
        this.currnet++;
        if (this.currnet>2){
            this.currnet = 0;
        }
        return this.currnet;
    }
}

function init() {
    //cube1 = new cube(2,2,30);
    instScene = new scene("thisCanvas");

    var circle = new createjs.Shape();
    circle.graphics.beginFill("Crimson").drawCircle(0, 0, 50);
    circle.name = 'asd';
    circle.x = 300;
    circle.y = 100;
    instScene.addObject(circle);

    instLevel = new level();
    instCubes = new cubes(instLevel.getCubeRC[0],instLevel.getCubeRC[1],instScene.getInstance,50);
    instQueue = new queue();
    //console.log(instQueue.getState);
    //instQueue.next();
    instCubes.animate(instLevel,instQueue);
    //console.log(instQueue.getState);

    //scene1.addObject(cube1.parameters);
}