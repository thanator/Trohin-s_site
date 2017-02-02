var WireBuilder = require("./WireBuilder.js");


function WireTool(appState) {
    this.name = "Провести проводку";
    this.appState = appState;
    this.wallBuilder = new WireBuilder(this.appState.wallsCollection);
}
module.exports = WireTool;
