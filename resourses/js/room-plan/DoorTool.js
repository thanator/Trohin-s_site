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
    this.doorBuilder.tryAddDoor(Math.floor(x / WallView.cellWidth), Math.floor(y / WallView.cellHeight));
};
