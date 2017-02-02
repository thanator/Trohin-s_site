var PIXI = require("pixi.js");


function WallView(model) {
    PIXI.Graphics.apply(this, arguments);
    this.model = model;
    this.renderWall();
}
WallView.prototype = Object.create(PIXI.Graphics.prototype);
WallView.prototype.constructor = WallView;
module.exports = WallView;


WallView.cellWidth = 32;
WallView.cellHeight = 32;
WallView.cellBorderSize = 4;


WallView.prototype.renderWall = function () {
    for (var i = 0; i < this.model.cells.length; i++) {
        var cell = this.model.cells[i];

        var border = WallView.cellBorderSize;
        var w = WallView.cellWidth;
        var h = WallView.cellHeight;
        var x = cell.x * w;
        var y = cell.y * h;
        var neighborhood = this.model.getCellNeighborhood(cell);

        this._renderCellBackground(x, y, w, h);
        this._renderCellBorder(x, y, w, h, border, neighborhood);
        cell.contents.forEach(function (content) {
            this._renderCellContents(x, y, w, h, content, neighborhood);
        }.bind(this));
    }
};

WallView.prototype._renderCellBackground = function (x, y, w, h) {
    this.beginFill(0xbbcccc);
    this.drawRect(x, y, w, h);
    this.endFill();
};

WallView.prototype._renderCellBorder = function (x, y, w, h, border, neighborhood) {
    this.beginFill(0xff700b);
    if (!neighborhood.left) {
        this.drawRect(x, y, border, h);
    } else {
        this.drawRect(x, y, border, border);
        this.drawRect(x, y + h - border, border, border);
    }
    if (!neighborhood.right) {
        this.drawRect(x + w - border, y, border, h);
    } else {
        this.drawRect(x + w - border, y, border, border);
        this.drawRect(x + w - border, y + h - border, border, border);
    }
    if (!neighborhood.top) {
        this.drawRect(x, y, w, border);
    } else {
        this.drawRect(x, y, border, border);
        this.drawRect(x + w - border, y, border, border);
    }
    if (!neighborhood.bottom) {
        this.drawRect(x, y + h - border, w, border);
    } else {
        this.drawRect(x, y + h - border, border, border);
        this.drawRect(x + w - border, y + h - border, border, border);
    }
    this.endFill();
};

WallView.prototype._renderCellContents = function (x, y, w, h, content, neighborhood) {
    switch (content) {
        case "wire":
            this.beginFill(0xff0000);
            this.drawRect(x + w / 4, y + h / 4, w / 2, h / 2);
            this.endFill();
            break;
    }
};
