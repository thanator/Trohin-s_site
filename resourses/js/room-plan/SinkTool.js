var SinkBuilder = require("./SinkBuilder.js");
var WallView = require("./WallView.js");


function SinkTool(appState) {
    this.appState = appState;
    this.sinkBuilder = new SinkBuilder(this.appState.worldObjectsCollection);
}
module.exports = SinkTool;

SinkTool.prototype.onMouseDown = function () {
};

SinkTool.prototype.onMouseMove = function (x, y) {
};

SinkTool.prototype.onMouseUp = function () {
    var cellX = Math.floor(x / WallView.cellWidth);
    var cellY = Math.floor(y / WallView.cellHeight);
    switch (this.appState.toolState.toolMode) {
        case "add":
            this.sinkBuilder.tryAddSink(cellX, cellY);
            break;
        case "remove":
            this.sinkBuilder.tryRemoveSink(cellX, cellY);
            break;
    }
};
