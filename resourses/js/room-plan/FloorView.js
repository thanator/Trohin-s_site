var PIXI = require("pixi.js");
var WallView = require("./WallView.js");


function FloorView(model, wallsCollection) {
    PIXI.Graphics.call(this);
    this.model = model;
    this.wallsCollection = wallsCollection;
    this.renderFloor();
}
FloorView.prototype = Object.create(PIXI.Graphics.prototype);
FloorView.prototype.constructor = FloorView;
module.exports = FloorView;

FloorView.prototype.renderFloor = function () {
    var x = this.model.x;
    var y = this.model.y;
    var cw = WallView.cellWidth;
    var ch = WallView.cellHeight;
    var neighborhood = this.wallsCollection.getCellNeighborhood(this.model);

    this.clear();
    this.beginFill(0xf09816);

    this.drawRect(x * cw, y * ch, cw, ch);

    if (neighborhood.left) {
        this.drawRect((x - 0.5) * cw, y * ch, cw / 2, ch);
    }
    if (neighborhood.right) {
        this.drawRect((x + 1) * cw, y * ch, cw / 2, ch);
    }
    if (neighborhood.up) {
        this.drawRect(x * cw, (y - 0.5) * ch, cw, ch / 2);
    }
    if (neighborhood.down) {
        this.drawRect(x * cw, (y + 1) * ch, cw, ch / 2);
    }

    if (neighborhood.left && neighborhood.up) {
        this.drawRect((x - 0.5) * cw, (y - 0.5) * ch, cw / 2, ch / 2);
    }
    if (neighborhood.right && neighborhood.up) {
        this.drawRect((x + 1) * cw, (y - 0.5) * ch, cw / 2, ch / 2);
    }
    if (neighborhood.left && neighborhood.down) {
        this.drawRect((x - 0.5) * cw, (y + 1) * ch, cw / 2, ch / 2);
    }
    if (neighborhood.right && neighborhood.down) {
        this.drawRect((x + 1) * cw, (y + 1) * ch, cw / 2, ch / 2);
    }

    this.endFill();
};
