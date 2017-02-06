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
WallView.cellWallSize = 8;


WallView.prototype.renderWall = function () {
    this.clear();
    for (var i = 0; i < this.model.cells.length; i++) {
        var cell = this.model.cells[i];

        var wallSize = WallView.cellWallSize;
        var w = WallView.cellWidth;
        var h = WallView.cellHeight;
        var x = cell.x * w;
        var y = cell.y * h;
        var neighborhood = this.model.getCellNeighborhood(cell);

        this._renderCell(x, y, w, h, wallSize, neighborhood);
        cell.contents.forEach(function (content) {
            this._renderCellContents(x, y, w, h, content, neighborhood);
        }.bind(this));
    }
};

WallView.prototype._renderCell = function (x, y, w, h, s, neighborhood) {
    this.beginFill(0x34332c);
    var centerX = x + w / 2;
    var centerY = y + h / 2;
    this.drawRect(centerX - s / 2, centerY - s / 2, s, s);
    if (neighborhood.left) {
        this.drawRect(x, centerY - s / 2, w / 2, s);
    }
    if (neighborhood.right) {
        this.drawRect(x + w / 2, centerY - s / 2, w / 2, s);
    }
    if (neighborhood.up) {
        this.drawRect(centerX - s / 2, y, s, h / 2);
    }
    if (neighborhood.down) {
        this.drawRect(centerX - s / 2, y + h / 2, s, h / 2);
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

        case "door0":
        case "door1":
        case "door2":
            this.beginFill(0x00ff00);
            this.drawRect(x + w / 4, y + h / 4, w / 2, h / 2);
            this.endFill();
            break;

        case "window0":
        case "window1":
        case "window2":
            this.beginFill(0x0000ff);
            this.drawRect(x + w / 4, y + h / 4, w / 2, h / 2);
            this.endFill();
            break;
    }
};
