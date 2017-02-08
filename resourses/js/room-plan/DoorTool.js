var DoorBuilder = require("./DoorBuilder.js");
var WallView = require("./WallView.js");


function DoorTool(appState) {
    this.appState = appState;
    this.doorBuilder = new DoorBuilder(this.appState.wallsCollection);
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
            this.doorBuilder.tryAddDoor(cellX, cellY);
            break;
        case "remove":
            this.doorBuilder.tryRemoveDoor(cellX, cellY);
            break;
    }
};
