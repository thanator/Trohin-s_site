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

        this._renderCell(cell, x, y, w, h, wallSize, neighborhood);
    }
    for (var i = 0; i < this.model.cells.length; i++) {
        var cell = this.model.cells[i];

        var wallSize = WallView.cellWallSize;
        var w = WallView.cellWidth;
        var h = WallView.cellHeight;
        var x = cell.x * w;
        var y = cell.y * h;
        var neighborhood = this.model.getCellNeighborhood(cell);

        this._renderCellContents(cell, x, y, w, h, wallSize, neighborhood);
    }
};

WallView.prototype._renderCell = function (cell, x, y, w, h, s, neighborhood) {
    this.beginFill(this._getCellColor(cell));
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

WallView.prototype._getCellColor = function (cell) {
    switch (cell.contentsData.get("wall-style")) {
        case 0:
            return 0x34332c;
        case 1:
            return 0x464531;
    }
};

WallView.prototype._renderCellContents = function (cell, x, y, w, h, wallSize, neighborhood) {
    cell.contents.forEach(function (content) {
        if (content != "wire") {
            this._renderCellContent(cell, x, y, w, h, wallSize, content, neighborhood);
        }
    }.bind(this));
    if (cell.contents.has("wire")) {
        this._renderCellContent(cell, x, y, w, h, wallSize, "wire", neighborhood);
    }
};

WallView.prototype._renderCellContent = function (cell, x, y, w, h, wallSize, content, neighborhood) {
    switch (content) {
        case "wire":
            this._renderWire(x, y, w, h, wallSize, neighborhood);
            break;
        case "door":
            this._renderDoor(x, y, w, h, cell.contentsData.get("door-size"), wallSize, neighborhood);
            break;
        case "window":
            this._renderWindow(x, y, w, h, cell.contentsData.get("window-size"), wallSize, neighborhood);
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

WallView.prototype._renderDoor = function (x, y, w, h, thingSize, wallSize, neighborhood) {
    this._renderThingInWall(x, y, w, h, thingSize, wallSize, neighborhood.up || neighborhood.down, 0xc76700, 0x7b3f00);
};

WallView.prototype._renderWindow = function (x, y, w, h, thingSize, wallSize, neighborhood) {
    this._renderThingInWall(x, y, w, h, thingSize, wallSize, neighborhood.up || neighborhood.down, 0xbfefff, 0x3bceff);
};

WallView.prototype._renderThingInWall = function (x, y, w, h, thingSize, wallSize, isVerticalNeighborhood, color, borderColor) {
    var s = wallSize * 1.25;
    var borderSize = wallSize * 0.25;

    var centerX = x + w / 2;
    var centerY = y + h / 2;
    var leftX, rightX, upY, downY;
    if (isVerticalNeighborhood) {
        leftX = centerX - s / 2;
        rightX = centerX + s / 2;
        upY = centerY - (thingSize * h) / 2 + s / 2;
        downY = centerY + (thingSize * h) / 2 - s / 2;
    } else {
        leftX = centerX - (thingSize * w) / 2 + s / 2;
        rightX = centerX + (thingSize * w) / 2 - s / 2;
        upY = centerY - s / 2;
        downY = centerY + s / 2;
    }

    this.beginFill(color);
    this.drawRect(leftX, upY, rightX - leftX, downY - upY);
    this.endFill();

    this.beginFill(borderColor);
    this.drawRect(leftX, upY, borderSize, downY - upY);
    this.drawRect(leftX, upY, rightX - leftX, borderSize);
    this.drawRect(rightX - borderSize, upY, borderSize, downY - upY);
    this.drawRect(leftX, downY - borderSize, rightX - leftX, borderSize);
    this.endFill();
};
