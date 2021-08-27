/*class Circuit {
  constructor(width, height, x, y) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
  }
}*/

const DASH = 6;

class NotGate {
    constructor(tradius, strokeWidth, transistorGraphic) {
        this.tradius = tradius;
        this.strokeWidth = strokeWidth;
        this.transistorGraphic = transistorGraphic;
        this.width = this.tradius * 4;
        this.height = this.tradius * 4;
        this.draw();
    }

    draw() {
        this.container = new createjs.Container();

        const t = this.transistorGraphic.container.clone(true);
        t.x = this.tradius;
        t.y = this.tradius;
        this.container.addChild(t);

        const dash = DASH;

        const outline = new createjs.Shape();
        outline
            .graphics
            .beginStroke("gray")
            .setStrokeStyle(this.strokeWidth)
            .setStrokeDash([dash, dash], 0)
            .drawRect(0, 0, this.width, this.height);
        this.container.addChild(outline);


        const plusWire = new createjs.Shape();
        plusWire
            .graphics
            .setStrokeStyle(this.strokeWidth)
            .beginStroke("black")
            .moveTo(this.tradius * 3, this.tradius)
            .lineTo(this.tradius * 3, Math.floor(this.tradius / 2))
            .endStroke();
        this.container.addChild(plusWire);

        //const plusLen = Math.floor(this.tradius / 2.5)

        const plusVert = new createjs.Shape();
        plusVert
            .graphics
            .setStrokeStyle(this.strokeWidth * 5)
            .beginStroke("black")
            .moveTo(this.tradius * 3, Math.floor(this.tradius / 2.5))
            .lineTo(this.tradius * 3, Math.floor(this.tradius / 10))
            .endStroke();
        this.container.addChild(plusVert);

        /*const plusHorz = new createjs.Shape();
        plusHorz
            .graphics
            .setStrokeStyle(this.strokeWidth * 2)
            .beginStroke("black")
            .moveTo(this.tradius * 3, Math.floor(this.tradius / 2.5))
            .lineTo(this.tradius * 3, 0)
            .endStroke();
        this.container.addChild(plusVert);*/
    }
}

class TransistorGraphic {

    // Absolute x y coordinates
    constructor(tradius, strokeWidth) {
        this.x = 0;
        this.y = 0;
        this.tradius = tradius;
        this.strokeWidth = strokeWidth;
        this.width = this.tradius * 2;
        this.height = this.tradius * 2;
        this.draw();
    }

    draw() {

        const TRADIUS = this.tradius;

        this.container = new createjs.Container();

        const circle = new createjs.Shape();
        circle
            .graphics
            .setStrokeStyle(this.strokeWidth)
            .beginStroke("black")
            .drawCircle(this.tradius, this.tradius, this.tradius);
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
  constructor(width, height, canvasId, tradius, strokeWidth) {
    this.width = width;
    this.height = height;
    this.canvasId = canvasId;
    this.tradius = tradius;
    this.strokeWidth = strokeWidth;
    this.stage = new createjs.Stage(canvasId);

    this.transistorGraphic = new TransistorGraphic(this.tradius, this.strokeWidth);
    this.notGate = new NotGate(this.tradius, this.strokeWidth, this.transistorGraphic);
    //this.stage.scale = 1/2;
  }

  /*addItem(item) {
    item.draw(this.strokeWidth);
  }*/
}

function main() {
    const TRADIUS = 50;
    const STROKE_WIDTH = 1;
    const circuit1 = new Circuit(500, 300, "circuit-canvas-1", TRADIUS, STROKE_WIDTH);
    //const t1 = new TransistorGraphic(10, 10);
    //circuit1.addItem(t1);

    const t = circuit1.transistorGraphic.container.clone(true);
    t.x = 100;
    t.y = 100;
    circuit1.stage.addChild(t);

    const n = circuit1.notGate.container.clone(true);
    n.x = 200;
    n.y = 200;
    circuit1.stage.addChild(n);

    circuit1.stage.update();
}