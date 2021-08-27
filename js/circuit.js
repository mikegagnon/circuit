/*class Circuit {
  constructor(width, height, x, y) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
  }
}*/

const TRADIUS = 200;

class TransistorGraphic {

    // Absolute x y coordinates
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = TRADIUS * 2;
        this.height = TRADIUS * 2;
        this.radius = TRADIUS;
    }

    draw(stage, strokeWidth) {
        const circle = new createjs.Shape();
        circle
            .graphics
            .setStrokeStyle(strokeWidth)
            .beginStroke("black")
            .drawCircle(this.radius, this.radius, this.radius);
        circle.x = this.x;
        circle.y = this.y;
        stage.addChild(circle);

        const bar = new createjs.Shape();
        bar
            .graphics
            .setStrokeStyle(strokeWidth)
            .beginStroke("black")
            .moveTo(this.x + Math.floor(TRADIUS / 1.7), this.y + Math.floor(TRADIUS / 1.7))
            .lineTo(this.x + Math.floor(TRADIUS / 1.7), this.y + Math.floor(TRADIUS / 1.7 * 2.5))
            .endStroke();
        stage.addChild(bar);

        const left = new createjs.Shape();
        left
            .graphics
            .setStrokeStyle(strokeWidth)
            .beginStroke("black")
            .moveTo(this.x, this.y + TRADIUS)
            .lineTo(this.x + Math.floor(TRADIUS / 1.7), this.y + TRADIUS)
            .endStroke();
        stage.addChild(left);

        const top = new createjs.Shape();
        top
            .graphics
            .setStrokeStyle(strokeWidth)
            .beginStroke("black")
            .moveTo(this.x + Math.floor(TRADIUS / 1.7), this.y + Math.floor(TRADIUS / 1.7) + Math.floor(TRADIUS / 5))
            .lineTo(this.x + TRADIUS * 2, this.y)
            .endStroke();
        stage.addChild(top);

        const bottom = new createjs.Shape();
        bottom
            .graphics
            .setStrokeStyle(strokeWidth)
            .beginStroke("black")
            .moveTo(this.x +  Math.floor(TRADIUS / 1.7), this.y + TRADIUS * 2 - (Math.floor(TRADIUS / 1.7) + Math.floor(TRADIUS / 5)))
            .lineTo(this.x + TRADIUS * 2, this.y + TRADIUS * 2)
            .endStroke();
        stage.addChild(bottom);

        const arrow = new createjs.Shape();
        const size = TRADIUS / 3;
        const sides = 3;
        const angle = 30;
        arrow.graphics.beginFill("black").drawPolyStar(this.x + TRADIUS * 1.3, this.y + TRADIUS * 1.6, size, sides, 0, angle);
        // arrow
        //     .graphics
        //     //.setStrokeStyle(strokeWidth)
        //     //.beginStroke("black")
        //     .beginPath()
        //     .moveTo(20, 20)
        //     .lineTo(30, 30)
        //     .lineTo(25, 25)
        //     .lineTo(20, 20)
        //     .closePath()
        //     .fillStyle("blue")
        //     .fill()
        //     //.endStroke();
        stage.addChild(arrow);
    }
}

class Circuit {
  constructor(width, height, canvasId, strokeWidth) {
    this.width = width;
    this.height = height;
    this.canvasId = canvasId;
    this.strokeWidth = strokeWidth;
    this.stage = new createjs.Stage(canvasId);
    //this.stage.scale = 1/2;
  }

  addItem(item) {
    item.draw(this.stage, this.strokeWidth);
  }
}

function main() {
    const STROKE_WIDTH = 1;
    const circuit1 = new Circuit(500, 300, "circuit-canvas-1", STROKE_WIDTH);
    const t1 = new TransistorGraphic(10, 10);
    circuit1.addItem(t1);
    circuit1.stage.update();
}