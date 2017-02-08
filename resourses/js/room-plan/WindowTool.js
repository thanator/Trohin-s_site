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
    var cellX = Math.floor(x / WallView.cellWidth);
    var cellY = Math.floor(y / WallView.cellHeight);
    switch (this.appState.toolState.toolMode) {
        case "add":
            this.windowBuilder.tryAddWindow(cellX, cellY);
            break;
        case "remove":
            this.windowBuilder.tryRemoveWindow(cellX, cellY);
            break;
    }
};
