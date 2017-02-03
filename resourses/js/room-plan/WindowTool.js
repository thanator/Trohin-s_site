var WindowBuilder = require("./WindowBuilder.js");
var WallView = require("./WallView.js");


function WindowTool(appState) {
    this.appState = appState;
    this.windowBuilder = new WindowBuilder(this.appState.wallsCollection);
}
module.exports = WindowTool;

WindowTool.prototype.onMouseDown = function () {
};

WindowTool.prototype.onMouseMove = function () {
};

WindowTool.prototype.onMouseUp = function (x, y) {
    this.windowBuilder.tryAddWindow(Math.floor(x / WallView.cellWidth), Math.floor(y / WallView.cellHeight));
};
