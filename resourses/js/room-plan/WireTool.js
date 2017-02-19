var WireBuilder = require("./WireBuilder.js");
var WallView = require("./WallView.js");


function WireTool(appState) {
    this.appState = appState;
    this.wireBuilder = new WireBuilder(this.appState.wallsCollection);
    this.isMovingWireStart = false;
    this.eventFnIsMovingWireStartChange = function () { };
    this.isMouseDown = false;
}
module.exports = WireTool;

WireTool.prototype.onMouseDown = function () {
    this.isMouseDown = true;
};

WireTool.prototype.onMouseMove = function (x, y) {
    if (this.isMouseDown && !this.isMovingWireStart) {
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

WireTool.prototype.onMouseUp = function (x, y) {
    this.isMouseDown = false;
    if (this.isMovingWireStart) {
        var cellX = Math.floor(x / WallView.cellWidth);
        var cellY = Math.floor(y / WallView.cellHeight);
        if (this.wireBuilder.tryMoveWireStart(cellX, cellY)) {
            this.isMovingWireStart = false;
            this.eventFnIsMovingWireStartChange(false);
        }
    }
};
