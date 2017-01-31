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

        var neighborhood = this._getCellNeighborhood(cell.x, cell.y);
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

WallView.prototype._getCellNeighborhood = function (x, y) {
    var neighborhood = { left: false, right: false, top: false, bottom: false };
    for (var i = 0; i < this.model.cells.length; i++) {
        var cell = this.model.cells[i];
        var dx = cell.x - x;
        var dy = cell.y - y;
        if (dx == -1 && dy == 0) {
            neighborhood.left = true;
        }
        if (dx == 1 && dy == 0) {
            neighborhood.right = true;
        }
        if (dy == -1 && dx == 0) {
            neighborhood.top = true;
        }
        if (dy == 1 && dx == 0) {
            neighborhood.bottom = true;
        }
    }
    return neighborhood;
};
