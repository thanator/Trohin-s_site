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
        this.wireBuilder.tryAddWire(Math.floor(x / WallView.cellWidth), Math.floor(y / WallView.cellHeight));
    }
};

WireTool.prototype.onMouseUp = function () {
    this.isMouseDown = false;
};
