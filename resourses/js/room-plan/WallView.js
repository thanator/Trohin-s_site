var PIXI = require("pixi.js");


function WallView(model) {
    PIXI.Graphics.apply(this, arguments);
    this.model = model;
    this.renderWall();
}
WallView.prototype = Object.create(PIXI.Graphics.prototype);
module.exports = WallView;


WallView.cellWidth = 32;
WallView.cellHeight = 32;
WallView.cellBorderSize = 4;


WallView.prototype.renderWall = function () {
    for (var i = 0; i < this.model.cells.length; i++) {
        var cell = this.model.cells[i];
        var w = WallView.cellWidth;
        var h = WallView.cellHeight;
        var x = cell.x * w;
        var y = cell.y * h;
        var b = WallView.cellBorderSize;

        this.beginFill(0xbbcccc);
        this.drawRect(x, y, w, h);
        this.endFill();

        var neighborhood = this.model.getCellNeighborhood(cell);
        this.beginFill(0xff700b);
        if (!neighborhood.left) {
            this.drawRect(x, y, b, h);
        } else {
            this.drawRect(x, y, b, b);
            this.drawRect(x, y + h - b, b, b);
        }
        if (!neighborhood.right) {
            this.drawRect(x + w - b, y, b, h);
        } else {
            this.drawRect(x + w - b, y, b, b);
            this.drawRect(x + w - b, y + h - b, b, b);
        }
        if (!neighborhood.top) {
            this.drawRect(x, y, w, b);
        } else {
            this.drawRect(x, y, b, b);
            this.drawRect(x + w - b, y, b, b);
        }
        if (!neighborhood.bottom) {
            this.drawRect(x, y + h - b, w, b);
        } else {
            this.drawRect(x, y + h - b, b, b);
            this.drawRect(x + w - b, y + h - b, b, b);
        }
        this.endFill();
    }
};

