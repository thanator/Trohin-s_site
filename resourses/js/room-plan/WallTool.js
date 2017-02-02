var WallBuilder = require("./WallBuilder.js");


function WallTool(appState) {
    this.appState = appState;
    this.wallBuilder = new WallBuilder(this.appState.wallsCollection);
}
module.exports = WallTool;

WallTool.prototype.onMouseDown = function () {
    this.wallBuilder.beginNewWall();
};

WallTool.prototype.onMouseMove = function (x, y) {
    this.wallBuilder.tryAddCellWithScreenCoords(x, y);
};

WallTool.prototype.onMouseUp = function () {
    this.wallBuilder.endWall();
};
