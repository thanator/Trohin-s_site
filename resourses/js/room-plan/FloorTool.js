var FloorBuilder = require("./FloorBuilder.js");
var WallView = require("./WallView.js");


function FloorTool(appState) {
    this.appState = appState;
    this.floorBuilder = new FloorBuilder(this.appState.wallsCollection, this.appState.worldObjectsCollection);
    this.style = 0;
    this.isMouseDown = false;
}
module.exports = FloorTool;

FloorTool.prototype.onMouseDown = function () {
    this.isMouseDown = true;
};

FloorTool.prototype.onMouseMove = function (x, y) {
    if (!this.isMouseDown) {
        return false;
    }
    this._create(x, y);
};

FloorTool.prototype.onMouseUp = function (x, y) {
    this.isMouseDown = false;
    this._create(x, y);
};

FloorTool.prototype._create = function (x, y) {
    var cellX = Math.floor(x / WallView.cellWidth);
    var cellY = Math.floor(y / WallView.cellHeight);
    switch (this.appState.toolState.toolMode) {
        case "add":
            this.floorBuilder.tryAddFloor(cellX, cellY, this.style);
            break;
        case "remove":
            this.floorBuilder.tryRemoveFloor(cellX, cellY);
            break;
    }
};