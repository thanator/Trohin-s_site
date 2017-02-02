var WallsCollection = require("./WallsCollection.js");
var WallTool = require("./WallTool.js");
var WireTool = require("./WireTool.js");


function AppState() {
    this.wallsCollection = new WallsCollection();
    this.tools = [
        new WallTool(this),
        new WireTool(this)
    ];
    this.currentTool = this.tools[0];
}
module.exports = AppState;