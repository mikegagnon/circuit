/*class Circuit {
  constructor(width, height, x, y) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
  }
}*/

const TRADIUS = 50;

class TransistorGraphic {

    // Absolute x y coordinates
    constructor(strokeWidth) {
        this.x = 0;
        this.y = 0;
        this.strokeWidth = strokeWidth;
        this.width = TRADIUS * 2;
        this.height = TRADIUS * 2;
        this.radius = TRADIUS;
        this.draw();
    }

    draw() {

        this.container = new createjs.Container();

        const circle = new createjs.Shape();
        circle
            .graphics
            .setStrokeStyle(this.strokeWidth)
            .beginStroke("black")
            .drawCircle(this.radius, this.radius, this.radius);
        circle.x = this.x;
        circle.y = this.y;
        this.container.addChild(circle);

        const bar = new createjs.Shape();
        bar
            .graphics
            .setStrokeStyle(this.strokeWidth)
            .beginStroke("black")
            .moveTo(this.x + Math.floor(TRADIUS / 1.7), this.y + Math.floor(TRADIUS / 1.7))
            .lineTo(this.x + Math.floor(TRADIUS / 1.7), this.y + Math.floor(TRADIUS / 1.7 * 2.5))
            .endStroke();
        this.container.addChild(bar);

        const left = new createjs.Shape();
        left
            .graphics
            .setStrokeStyle(this.strokeWidth)
            .beginStroke("black")
            .moveTo(this.x, this.y + TRADIUS)
            .lineTo(this.x + Math.floor(TRADIUS / 1.7), this.y + TRADIUS)
            .endStroke();
        this.container.addChild(left);

        const top = new createjs.Shape();
        top
            .graphics
            .setStrokeStyle(this.strokeWidth)
            .beginStroke("black")
            .moveTo(this.x + Math.floor(TRADIUS / 1.7), this.y + Math.floor(TRADIUS / 1.7) + Math.floor(TRADIUS / 5))
            .lineTo(this.x + TRADIUS * 2, this.y)
            .endStroke();
        this.container.addChild(top);

        const bottom = new createjs.Shape();
        bottom
            .graphics
            .setStrokeStyle(this.strokeWidth)
            .beginStroke("black")
            .moveTo(this.x +  Math.floor(TRADIUS / 1.7), this.y + TRADIUS * 2 - (Math.floor(TRADIUS / 1.7) + Math.floor(TRADIUS / 5)))
            .lineTo(this.x + TRADIUS * 2, this.y + TRADIUS * 2)
            .endStroke();
        this.container.addChild(bottom);

        const arrow = new createjs.Shape();
        const size = TRADIUS / 3;
        const sides = 3;
        const angle = 30;
        arrow.graphics.beginFill("black").drawPolyStar(this.x + TRADIUS * 1.3, this.y + TRADIUS * 1.6, size, sides, 0, angle);
        this.container.addChild(arrow);

        /*const clone = this.container.clone(true);
        clone.x = 100;
        clone.y = 100;

        stage.addChild(this.container);
        stage.addChild(clone);

        this.container.x = 50;
        this.container.y = 50;*/
    }
}

class Circuit {
  constructor(width, height, canvasId, strokeWidth) {
    this.width = width;
    this.height = height;
    this.canvasId = canvasId;
    this.strokeWidth = strokeWidth;
    this.stage = new createjs.Stage(canvasId);

    this.transistorGraphic = new TransistorGraphic(this.strokeWidth)
    //this.stage.scale = 1/2;
  }

  /*addItem(item) {
    item.draw(this.strokeWidth);
  }*/
}

function main() {
    const STROKE_WIDTH = 1;
    const circuit1 = new Circuit(500, 300, "circuit-canvas-1", STROKE_WIDTH);
    //const t1 = new TransistorGraphic(10, 10);
    //circuit1.addItem(t1);

    const t = circuit1.transistorGraphic.container.clone(true);
    t.x = 100;
    t.y = 100;
    circuit1.stage.addChild(t);

    circuit1.stage.update();
}