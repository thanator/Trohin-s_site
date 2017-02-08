var WireBuilder = require("./WireBuilder.js");
var WallView = require("./WallView.js");


function WireTool(appState) {
    this.appState = appState;
    this.wireBuilder = new WireBuilder(this.appState.wallsCollection);
    this.isMouseDown = false;
}
module.exports = WireTool;

WireTool.prototype.onMouseDown = function () {
    this.isMouseDown = true;
};

WireTool.prototype.onMouseMove = function (x, y) {
    if (this.isMouseDown) {
        var cellX = Math.floor(x / WallView.cellWidth);
        var cellY = Math.floor(y / WallView.cellHeight);
        switch (this.appState.toolState.toolMode) {
            case "add":
                this.wireBuilder.tryAddWire(cellX, cellY);
                break;
            case "remove":
                this.wireBuilder.tryRemoveWire(cellX, cellY);
                break;
        }
    }
};

WireTool.prototype.onMouseUp = function () {
    this.isMouseDown = false;
};
