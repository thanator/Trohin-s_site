var WireBuilder = require("./WireBuilder.js");


function WireTool(appState) {
    this.appState = appState;
    this.wallBuilder = new WireBuilder(this.appState.wallsCollection);
}
module.exports = WireTool;

WireTool.prototype.onMouseDown = function () {
};

WireTool.prototype.onMouseMove = function (x, y) {
};

WireTool.prototype.onMouseUp = function () {
};
