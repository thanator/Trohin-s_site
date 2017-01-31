var PIXI = require("pixi.js");


function WallView(model) {
    PIXI.Graphics.apply(this, arguments);
    this.model = model;
    this.cellBorderSize = 4;
    this.renderWall();
}
WallView.prototype = Object.create(PIXI.Graphics.prototype);
module.exports = WallView;


WallView.prototype.renderWall = function () {
    for (var i = 0; i < this.model.cells.length; i++) {
        var cell = this.model.cells[i];
        var cellX = cell.x * cell.width;
        var cellY = cell.y * cell.height;

        this.beginFill(0xbbbbbb);
        this.drawRect(cellX, cellY, cell.width, cell.height);
        this.endFill();

        var neighborhood = this._getCellNeighborhood(cell.x, cell.y);
        this.beginFill(0xff700b);
        if (!neighborhood.left) {
            this.drawRect(cellX, cellY, this.cellBorderSize, cell.height);
        } else {
            this.drawRect(cellX, cellY, this.cellBorderSize, this.cellBorderSize);
            this.drawRect(cellX, cellY + cell.height - this.cellBorderSize, this.cellBorderSize, this.cellBorderSize);
        }
        if (!neighborhood.right) {
            this.drawRect(cellX + cell.width - this.cellBorderSize, cellY, this.cellBorderSize, cell.height);
        } else {
            this.drawRect(cellX + cell.width - this.cellBorderSize, cellY, this.cellBorderSize, this.cellBorderSize);
            this.drawRect(cellX + cell.width - this.cellBorderSize, cellY + cell.height - this.cellBorderSize, this.cellBorderSize, this.cellBorderSize);
        }
        if (!neighborhood.top) {
            this.drawRect(cellX, cellY, cell.width, this.cellBorderSize);
        } else {
            this.drawRect(cellX, cellY, this.cellBorderSize, this.cellBorderSize);
            this.drawRect(cellX + cell.width - this.cellBorderSize, cellY, this.cellBorderSize, this.cellBorderSize);
        }
        if (!neighborhood.bottom) {
            this.drawRect(cellX, cellY + cell.height - this.cellBorderSize, cell.width, this.cellBorderSize);
        } else {
            this.drawRect(cellX, cellY + cell.height - this.cellBorderSize, this.cellBorderSize, this.cellBorderSize);
            this.drawRect(cellX + cell.width - this.cellBorderSize, cellY + cell.height - this.cellBorderSize, this.cellBorderSize, this.cellBorderSize);
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
