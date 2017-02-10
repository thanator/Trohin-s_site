var WindowBuilder = require("./WindowBuilder.js");
var WallView = require("./WallView.js");


function WindowTool(appState) {
    this.appState = appState;
    this.windowBuilder = new WindowBuilder(this.appState.wallsCollection);
    this.style = 3;
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
            if (this._isStyleOk()) {
                this.windowBuilder.tryAddWindow(cellX, cellY, this._parseFloatStyle());
            }
            break;
        case "remove":
            this.windowBuilder.tryRemoveWindow(cellX, cellY);
            break;
    }
};

WindowTool.prototype._isStyleOk = function () {
    return !Number.isNaN(this._parseFloatStyle());
};

WindowTool.prototype._parseFloatStyle = function () {
    if (_.isString(this.style)) {
        return parseFloat(this.style.replace(",", "."));
    } else {
        return this.style;
    }
};
