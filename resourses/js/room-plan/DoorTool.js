var DoorBuilder = require("./DoorBuilder.js");
var WallView = require("./WallView.js");


function DoorTool(appState) {
    this.appState = appState;
    this.doorBuilder = new DoorBuilder(this.appState.wallsCollection);
    this.style = 3;
}
module.exports = DoorTool;

DoorTool.prototype.onMouseDown = function () {
};

DoorTool.prototype.onMouseMove = function () {
};

DoorTool.prototype.onMouseUp = function (x, y) {
    var cellX = Math.floor(x / WallView.cellWidth);
    var cellY = Math.floor(y / WallView.cellHeight);
    switch (this.appState.toolState.toolMode) {
        case "add":
            if (this._isStyleOk()) {
                this.doorBuilder.tryAddDoor(cellX, cellY, this._parseFloatStyle());
            }
            break;
        case "remove":
            this.doorBuilder.tryRemoveDoor(cellX, cellY);
            break;
    }
};

DoorTool.prototype._isStyleOk = function () {
    return !Number.isNaN(this._parseFloatStyle());
};

DoorTool.prototype._parseFloatStyle = function () {
    if (_.isString(this.style)) {
        return parseFloat(this.style.replace(",", "."));
    } else {
        return this.style;
    }
};
