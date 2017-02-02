var WallBuilder = require("./WallBuilder.js");
var WallView = require("./WallView.js");


function WallTool(appState) {
    this.appState = appState;
    this.wallBuilder = new WallBuilder(this.appState.wallsCollection);
}
module.exports = WallTool;

WallTool.prototype.onMouseDown = function () {
    this.wallBuilder.beginNewWall();
};

WallTool.prototype.onMouseMove = function (x, y) {
    this.wallBuilder.tryAddCell(Math.floor(x / WallView.cellWidth), Math.floor(y / WallView.cellHeight));
};

WallTool.prototype.onMouseUp = function () {
    this.wallBuilder.endWall();
};
