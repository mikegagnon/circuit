/*class Circuit {
  constructor(width, height, x, y) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
  }
}*/
const LIGHT_ON_COLOR = "#f66";
const LIGHT_OFF_COLOR = "#fcc";
const TRADIUS = 30;
const STROKE_WIDTH = 1;
const DASH = 6;

class NotGate {
    constructor(tradius, strokeWidth, transistorGraphic, resistorGraphic, groundGraphic, useLights) {
        this.input = false;
        this.output = false;

        this.useLights = useLights;
        this.tradius = tradius;
        this.strokeWidth = strokeWidth;
        this.transistorGraphic = transistorGraphic;
        this.resistorGraphic = resistorGraphic;
        this.groundGraphic = groundGraphic;
        this.width = this.tradius * 8;
        this.height = this.tradius * 8;
        this.plusStrokeWidth = Math.floor(this.tradius / 7);
        this.bulbSize = 0.5;
        this.draw();
        //console.log(this.plusStrokeWidth);

        this.setInput(this.input)
    }

    setInput(value) {
        this.input = value;
        this.output = !value;

        if (this.input) {
            this.inputLight.fillCommand.style = LIGHT_ON_COLOR;
            this.outputLight.fillCommand.style = LIGHT_OFF_COLOR;
        } else {
            this.inputLight.fillCommand.style = LIGHT_OFF_COLOR;
            this.outputLight.fillCommand.style = LIGHT_ON_COLOR;
        }
    }

    getOutput() {
        return this.output;
    }

    draw() {
        this.container = new createjs.Container();

        const t = this.transistorGraphic.container.clone(true);
        t.x = Math.floor(this.width / 2) - this.tradius;
        t.y = Math.floor(this.height / 2) - this.tradius;
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
            .moveTo(Math.floor(this.width / 2) + this.tradius, Math.floor(this.height / 2) - this.tradius)
            .lineTo(Math.floor(this.width / 2) + this.tradius, Math.floor(this.height / 2) - this.tradius * 1.2)
            .endStroke();
        this.container.addChild(plusWire);

        const r1 = this.resistorGraphic.container.clone(true);
        r1.x = Math.floor(this.width / 2) + this.tradius - this.resistorGraphic.stepwidth;
        r1.y = Math.floor(this.height / 2) - this.tradius * 1.2 - this.resistorGraphic.height;
        this.container.addChild(r1);


        const plusWire2 = new createjs.Shape();
        plusWire2
            .graphics
            .setStrokeStyle(this.strokeWidth)
            .beginStroke("black")
            .moveTo(r1.x + this.resistorGraphic.stepwidth, r1.y)
            .lineTo(r1.x + this.resistorGraphic.stepwidth, r1.y - this.tradius * 0.4)
            .endStroke();
        this.container.addChild(plusWire2);

        //const plusLen = Math.floor(this.tradius / 2.5)

        const plusVertGapLen = (Math.floor(this.height / 2) - this.tradius * 2) - (Math.floor(this.height / 2) - this.tradius *2.2)
        console.log(this.plusStrokeWidth)

        const plusVert = new createjs.Shape();
        plusVert
            .graphics
            .setStrokeStyle(this.plusStrokeWidth)
            .beginStroke("black")
            .moveTo(Math.floor(this.width / 2) + this.tradius, plusVertGapLen * 4)//Math.floor(this.height / 2) - this.tradius *2.2)
            .lineTo(Math.floor(this.width / 2) + this.tradius, plusVertGapLen)
            .endStroke();
        this.container.addChild(plusVert);


        const plusHorz = new createjs.Shape();
        plusHorz
            .graphics
            .setStrokeStyle(this.plusStrokeWidth)
            .beginStroke("black")
            .moveTo(Math.floor(this.width / 2) + this.tradius - plusVertGapLen * 1.5, plusVertGapLen * 2.5)
            .lineTo(Math.floor(this.width / 2) + this.tradius + plusVertGapLen * 1.5, plusVertGapLen * 2.5)
            .endStroke();

        this.container.addChild(plusHorz);




        const inputWire1 = new createjs.Shape();
        inputWire1
            .graphics
            .setStrokeStyle(this.strokeWidth)
            .beginStroke("black")
            .moveTo(Math.floor(this.width / 2) - this.tradius, Math.floor(this.height / 2))
            .lineTo(Math.floor(this.width / 2) - this.tradius - Math.floor(this.tradius * 0.2), Math.floor(this.height / 2))
            .endStroke();
        this.container.addChild(inputWire1);

        const r2 = this.resistorGraphic.container.clone(true);
        r2.regX = this.resistorGraphic.width / 2;
        r2.regY = this.resistorGraphic.height / 2;
        r2.rotation = 90
        r2.x = this.resistorGraphic.height / 2;
        r2.y = this.resistorGraphic.width / 2;

        const r2wrap = new createjs.Container();
        r2wrap.addChild(r2);


        r2wrap.x = Math.floor(this.width / 2) - this.tradius - this.resistorGraphic.height - Math.floor(this.tradius * 0.2);
        r2wrap.y = Math.floor(this.height / 2) - Math.floor(this.resistorGraphic.width / 2);

        this.container.addChild(r2wrap);

        const inputWire2 = new createjs.Shape();
        inputWire2
            .graphics
            .setStrokeStyle(this.strokeWidth)
            .beginStroke("black")
            .moveTo(0, Math.floor(this.height / 2))
            .lineTo(r2wrap.x, Math.floor(this.height / 2))
            .endStroke();
        this.container.addChild(inputWire2);

        const g = this.groundGraphic.container.clone(true);
        g.x = Math.floor(this.width / 2) + this.tradius - Math.floor(this.groundGraphic.width / 2);
        g.y = Math.floor(this.height / 2) + this.tradius * 2;
        this.container.addChild(g);



        const gwire = new createjs.Shape();
        gwire
            .graphics
            .setStrokeStyle(this.strokeWidth)
            .beginStroke("black")
            .moveTo(t.x + this.tradius * 2, t.y + this.tradius * 2)
            .lineTo(t.x + this.tradius * 2, Math.floor(this.height / 2) + this.tradius * 2)
            .endStroke();
        this.container.addChild(gwire);



        const outwire = new createjs.Shape();
        outwire
            .graphics
            .setStrokeStyle(this.strokeWidth)
            .beginStroke("black")
            .moveTo(Math.floor(this.width / 2) + this.tradius, Math.floor(this.height / 2) - this.tradius)
            .lineTo(Math.floor(this.width / 2) + this.tradius + this.tradius, Math.floor(this.height / 2) )
            .lineTo(this.width, Math.floor(this.height / 2) )
            .endStroke();
        this.container.addChild(outwire);

        if (this.useLights) {
            this.inputLight = new Light(this.tradius, this.strokeWidth, this.bulbSize);

            const inLightWire = new createjs.Shape();
            inLightWire
                .graphics
                .setStrokeStyle(this.strokeWidth)
                .beginStroke("black")
                .moveTo(Math.floor(this.tradius * 0.2) + this.inputLight.radius, Math.floor(this.height / 2))
                .lineTo(Math.floor(this.tradius * 0.2) + this.inputLight.radius, Math.floor(this.height / 2) - this.inputLight.radius)
                .endStroke();
            this.container.addChild(inLightWire);

            this.inputLight.container.x = Math.floor(this.tradius * 0.2);
            this.inputLight.container.y = Math.floor(this.height / 2) - this.inputLight.radius * 2.5;
            this.container.addChild(this.inputLight.container);



            this.outputLight = new Light(this.tradius, this.strokeWidth, this.bulbSize);
            
            const outLightWire = new createjs.Shape();
            outLightWire
                .graphics
                .setStrokeStyle(this.strokeWidth)
                .beginStroke("black")
                .moveTo(this.width - this.outputLight.radius * 2 - Math.floor(this.tradius * 0.2) + this.inputLight.radius, Math.floor(this.height / 2))
                .lineTo(this.width - this.outputLight.radius * 2 - Math.floor(this.tradius * 0.2) + this.inputLight.radius, Math.floor(this.height / 2) - this.outputLight.radius)
                .endStroke();
            this.container.addChild(outLightWire);


            this.outputLight.container.x = this.width - this.outputLight.radius * 2 - Math.floor(this.tradius * 0.2);
            this.outputLight.container.y = Math.floor(this.height / 2) - this.outputLight.radius * 2.5;
            this.container.addChild(this.outputLight.container);
        }



        this.container.regX = this.width / 2;
        this.container.regY = this.width / 2;
        this.container.rotation = -90;
        const oldContainer = this.container;
        this.container = new createjs.Container();
        this.container.addChild(oldContainer);
        oldContainer.x = this.width / 2; 
        oldContainer.y = this.height / 2;



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


// circuit1.notGate.inputLight.fillCommand.style = "pink";
class Light {

    constructor(tradius, strokeWidth, size) {
        this.tradius = tradius;
        this.radius = Math.floor(this.tradius * size);
        this.strokeWidth = strokeWidth;
        this.size = size;
        this.draw();
    }

    draw() {
        this.container = new createjs.Container();
        this.bulb = new createjs.Shape();
        this.fillCommand = this.bulb
            .graphics
            .setStrokeStyle(this.strokeWidth)
            .beginStroke("black")
            .beginFill(LIGHT_ON_COLOR)
            .command;

        this.bulb.graphics
            .drawCircle(this.radius, this.radius, this.radius);
        this.container.addChild(this.bulb);
    }

}

class GroundGraphic {

    constructor(tradius, strokeWidth) {
        this.tradius = tradius;
        this.strokeWidth = strokeWidth;
        this.draw();
    }

    draw() {
        const stepwidth = Math.floor(this.tradius / 7);
        const gapheight = Math.floor(this.tradius / 7);

        this.stepwidth = stepwidth;
        this.gapheight = gapheight;
        this.width = stepwidth * 6;
        this.height = gapheight * 3;
        this.centerx = Math.floor(this.width / 2);
        const centerx = this.centerx

        this.container = new createjs.Container();


        /*const dash = DASH;
        const outline = new createjs.Shape();
        outline
            .graphics
            .beginStroke("gray")
            .setStrokeStyle(this.strokeWidth)
            .setStrokeDash([dash, dash], 0)
            .drawRect(0, 0, this.width, this.height);
        this.container.addChild(outline);*/
        


        const z1 = new createjs.Shape();
        z1
            .graphics
            .setStrokeStyle(this.strokeWidth)
            .beginStroke("black")
            .moveTo(0, 0)
            .lineTo(this.width, 0)
            .endStroke();
        this.container.addChild(z1);

        const z2 = new createjs.Shape();
        z2
            .graphics
            .setStrokeStyle(this.strokeWidth)
            .beginStroke("black")
            .moveTo(this.stepwidth, this.gapheight)
            .lineTo(this.width - this.stepwidth, this.gapheight)
            .endStroke();
        this.container.addChild(z2);

        const z3 = new createjs.Shape();
        z3
            .graphics
            .setStrokeStyle(this.strokeWidth)
            .beginStroke("black")
            .moveTo(this.stepwidth * 2 , this.gapheight * 2)
            .lineTo(this.width - this.stepwidth * 2, this.gapheight * 2)
            .endStroke();
        this.container.addChild(z3);
    }
}

class ResistorGraphic {

    constructor(tradius, strokeWidth) {
        this.tradius = tradius;
        this.strokeWidth = strokeWidth;
        this.draw();
    }

    draw() {
        const stepwidth = Math.floor(this.tradius / 4);
        const step = Math.floor(this.tradius * 2 / 15);
        const centerx = stepwidth;

        this.stepwidth = stepwidth;
        this.step = step;
        this.centerx = centerx;
        this.width = stepwidth * 2;
        this.height = step * 12;

        this.container = new createjs.Container();
       
        /*const dash = DASH;
        const outline = new createjs.Shape();
        outline
            .graphics
            .beginStroke("gray")
            .setStrokeStyle(this.strokeWidth)
            .setStrokeDash([dash, dash], 0)
            .drawRect(0, 0, this.width, this.height);
        this.container.addChild(outline);
        */



        const zig = new createjs.Shape();
        zig
            .graphics
            .setStrokeStyle(this.strokeWidth)
            .beginStroke("black")
            .moveTo(centerx, 0)
            .lineTo(centerx - stepwidth, step * 1)
            .lineTo(centerx + stepwidth, step * 3)
            .lineTo(centerx - stepwidth, step * 5)
            .lineTo(centerx + stepwidth, step * 7)
            .lineTo(centerx - stepwidth, step * 9)
            .lineTo(centerx + stepwidth, step * 11)
            .lineTo(centerx, step * 12)
            .endStroke();
        this.container.addChild(zig);
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
    this.resistorGraphic = new ResistorGraphic(this.tradius, this.strokeWidth);
    this.groundGraphic = new GroundGraphic(this.tradius, this.strokeWidth);

    //this.stage.scale = 1/2;
  }

  /*addItem(item) {
    item.draw(this.strokeWidth);
  }*/
}

class NotNotChip {
    constructor(tradius, strokeWidth) {
        this.input = false;
        this.outut = false;


        this.tradius = tradius;
        this.strokeWidth = strokeWidth;

        this.transistorGraphic = new TransistorGraphic(this.tradius, this.strokeWidth);
        this.resistorGraphic = new ResistorGraphic(this.tradius, this.strokeWidth);
        this.groundGraphic = new GroundGraphic(this.tradius, this.strokeWidth);
        
        this.container = new createjs.Container();
        this.notGate = new NotGate(this.tradius, this.strokeWidth, this.transistorGraphic, this.resistorGraphic, this.groundGraphic, true);
        this.notGate2 = new NotGate(this.tradius, this.strokeWidth, this.transistorGraphic, this.resistorGraphic, this.groundGraphic, true);

        const n = this.notGate.container.clone(true);
        n.x = 0;
        n.y = 100;
        this.container.addChild(n);

        const n2 = this.notGate2.container.clone(true);
        n2.x = 400;
        n2.y = 100;
        this.container.addChild(n2);

        this.setInput(this.input);
    }

    setInput(value) {
        this.input = value;
        this.notGate.setInput(value);
        this.notGate2.setInput(this.notGate.getOutput());
        this.output = this.notGate2.getOutput();
    }

    getOutput() {
        return this.output;
    }
}

const canvasId = "circuit-canvas-1";
const stage = new createjs.Stage(canvasId);
const notNotChip = new NotNotChip(TRADIUS, STROKE_WIDTH);
notNotChip.container.x = 100;
stage.addChild(notNotChip.container);
stage.update();


//let circuit1;
//function main() {

    //circuit1 = new Circuit(500, 300, "circuit-canvas-1", TRADIUS, STROKE_WIDTH);
    //const t1 = new TransistorGraphic(10, 10);
    //circuit1.addItem(t1);

    /*const t = circuit1.transistorGraphic.container.clone(true);
    t.x = 100;
    t.y = 100;
    //circuit1.stage.addChild(t);*/

    /*
    const n = circuit1.notGateGraphic.container.clone(true);
    n.x = 200;
    n.y = 100;
    circuit1.stage.addChild(n);

    const n2 = circuit1.notGateGraphic.container.clone(true);
    n2.x = 500;
    n2.y = 100;
    circuit1.stage.addChild(n2);*/

    //circuit1.stage.update();
//}