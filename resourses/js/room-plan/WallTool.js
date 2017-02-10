var WallBuilder = require("./WallBuilder.js");
var WallView = require("./WallView.js");


function WallTool(appState) {
    this.appState = appState;
    this.wallBuilder = new WallBuilder(this.appState.wallsCollection, this.appState.worldObjectsCollection);
    this.style = 0;
    this.isMouseDown = false;
}
module.exports = WallTool;

WallTool.prototype.onMouseDown = function () {
    this.isMouseDown = true;
    if (this.appState.toolState.toolMode == "add") {
        this.wallBuilder.beginNewWall();
    }
};

WallTool.prototype.onMouseMove = function (x, y) {
    if (!this.isMouseDown) {
        return;
    }
    this._create(x, y);
};

WallTool.prototype.onMouseUp = function (x, y) {
    this.isMouseDown = false;
    if (this.appState.toolState.toolMode == "add") {
        this.wallBuilder.endWall();
    }
    this._create(x, y);
};

WallTool.prototype._create = function (x, y) {
    var cellX = Math.floor(x / WallView.cellWidth);
    var cellY = Math.floor(y / WallView.cellHeight);
    switch (this.appState.toolState.toolMode) {
        case "add":
            this.wallBuilder.tryAddCell(cellX, cellY, style);
            break;
        case "remove":
            this.wallBuilder.tryRemoveCell(cellX, cellY);
            break;
    }
};
