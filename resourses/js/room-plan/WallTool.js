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
    var cellX = Math.floor(x / WallView.cellWidth);
    var cellY = Math.floor(y / WallView.cellHeight);
    switch (this.appState.toolMode) {
        case "add":
            this.wallBuilder.tryAddCell(cellX, cellY);
            break;
        case "remove":
            this.wallBuilder.tryRemoveCell(cellX, cellY);
            break;
    }
};

WallTool.prototype.onMouseUp = function () {
    this.wallBuilder.endWall();
};
