var PIXI = require("pixi.js");


function WallView(model) {
    PIXI.Graphics.call(this);
    this.model = model;
    this.renderWall();
}
WallView.prototype = Object.create(PIXI.Graphics.prototype);
WallView.prototype.constructor = WallView;
module.exports = WallView;


WallView.cellWidth = 32;
WallView.cellHeight = 32;
WallView.cellWallSize = 12;


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
        this._renderCellContents(cell, x, y, w, h, wallSize, neighborhood);
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

WallView.prototype._renderCellContents = function (cell, x, y, w, h, wallSize, neighborhood) {
    cell.contents.forEach(function (content) {
        if (content != "wire") {
            this._renderCellContent(x, y, w, h, wallSize, content, neighborhood);
        }
    }.bind(this));
    if (cell.contents.has("wire")) {
        this._renderCellContent(x, y, w, h, wallSize, "wire", neighborhood);
    }
};

WallView.prototype._renderCellContent = function (x, y, w, h, wallSize, content, neighborhood) {
    switch (content) {
        case "wire":
            this._renderWire(x, y, w, h, wallSize, neighborhood);
            break;
        case "door0":
            this._renderDoor(0, x, y, w, h, wallSize, neighborhood);
            break;
        case "door1":
            this._renderDoor(1, x, y, w, h, wallSize, neighborhood);
            break;
        case "door2":
            this._renderDoor(2, x, y, w, h, wallSize, neighborhood);
            break;
        case "window0":
            this._renderWindow(0, x, y, w, h, wallSize, neighborhood);
            break;
        case "window1":
            this._renderWindow(1, x, y, w, h, wallSize, neighborhood);
            break;
        case "window2":
            this._renderWindow(2, x, y, w, h, wallSize, neighborhood);
            break;
    }
};

WallView.prototype._renderWire = function (x, y, w, h, wallSize, neighborhood) {
    this.beginFill(0xff0000);
    var centerX = x + w / 2;
    var centerY = y + h / 2;
    var s = wallSize / 4;
    var wireNeighborhood = neighborhood.getNeighborhoodByContent("wire");
    this.drawRect(centerX - s / 2, centerY - s / 2, s, s);
    if (wireNeighborhood.left) {
        this.drawRect(x, centerY - s / 2, w / 2, s);
    }
    if (wireNeighborhood.right) {
        this.drawRect(x + w / 2, centerY - s / 2, w / 2, s);
    }
    if (wireNeighborhood.up) {
        this.drawRect(centerX - s / 2, y, s, h / 2);
    }
    if (wireNeighborhood.down) {
        this.drawRect(centerX - s / 2, y + h / 2, s, h / 2);
    }
    this.endFill();
};

WallView.prototype._renderDoor = function (index, x, y, w, h, wallSize, neighborhood) {
    this._renderRectInWall(x, y, w, h, wallSize, neighborhood.up || neighborhood.down, index, 0xc76700, 0x7b3f00);
};

WallView.prototype._renderWindow = function (index, x, y, w, h, wallSize, neighborhood) {
    this._renderRectInWall(x, y, w, h, wallSize, neighborhood.up || neighborhood.down, index, 0xbfefff, 0x3bceff);
};

WallView.prototype._renderRectInWall = function (x, y, w, h, wallSize, isVerticalNeighborhood, index, color, borderColor) {
    var centerX = x + w / 2;
    var centerY = y + h / 2;
    var s = wallSize * 1.25;
    var borderSize = wallSize * 0.25;

    this.beginFill(color);
    switch (index) {
        case 0:
            if (isVerticalNeighborhood) {
                this.drawRect(centerX - s / 2, y + h * 0.25, s, h * 0.75);
            } else {
                this.drawRect(x + w * 0.25, centerY - s / 2, w * 0.75, s);
            }
            break;
        case 1:
            if (isVerticalNeighborhood) {
                this.drawRect(centerX - s / 2, y, s, h);
            } else {
                this.drawRect(x, centerY - s / 2, w, s);
            }
            break;
        case 2:
            if (isVerticalNeighborhood) {
                this.drawRect(centerX - s / 2, y, s, h * 0.75);
            } else {
                this.drawRect(x, centerY - s / 2, w * 0.75, s);
            }
            break;
    }
    this.endFill();

    this.beginFill(borderColor);
    switch (index) {
        case 0:
            if (isVerticalNeighborhood) {
                this.drawRect(centerX - s / 2, y + h * 0.25, s, borderSize);
                this.drawRect(centerX - s / 2, y + h * 0.25, borderSize, h * 0.75);
                this.drawRect(centerX + s / 2 - borderSize, y + h * 0.25, borderSize, h * 0.75);
            } else {
                this.drawRect(x + w * 0.25, centerY - s / 2, borderSize, s);
                this.drawRect(x + w * 0.25, centerY - s / 2, w * 0.75, borderSize);
                this.drawRect(x + w * 0.25, centerY + s / 2 - borderSize, w * 0.75, borderSize);
            }
            break;
        case 1:
            if (isVerticalNeighborhood) {
                this.drawRect(centerX - s / 2, y, borderSize, h);
                this.drawRect(centerX + s / 2 - borderSize, y, borderSize, h);
            } else {
                this.drawRect(x, centerY - s / 2, w, borderSize);
                this.drawRect(x, centerY + s / 2 - borderSize, w, borderSize);
            }
            break;
        case 2:
            if (isVerticalNeighborhood) {
                this.drawRect(centerX - s / 2, y + h * 0.75 - borderSize, s, borderSize);
                this.drawRect(centerX - s / 2, y, borderSize, h * 0.75);
                this.drawRect(centerX + s / 2 - borderSize, y, borderSize, h * 0.75);
            } else {
                this.drawRect(x + w * 0.75 - borderSize, centerY - s / 2, borderSize, s);
                this.drawRect(x, centerY - s / 2, w * 0.75, borderSize);
                this.drawRect(x, centerY + s / 2 - borderSize, w * 0.75, borderSize);
            }
            break;
    }
    this.endFill();
};
