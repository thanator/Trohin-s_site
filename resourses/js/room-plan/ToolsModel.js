var WallTool = require("./WallTool.js");
var WireTool = require("./WireTool.js");
var DoorTool = require("./DoorTool.js");
var WindowTool = require("./WindowTool.js");
var SinkTool = require("./SinkTool.js");


function ToolsModel(appState) {
    this.appState = appState;
    this.tools = [
        new WallTool(appState),
        new WireTool(appState),
        new DoorTool(appState),
        new WindowTool(appState),
        new SinkTool(appState)
    ];
    this.currentTool = this.tools[0];
    this.toolMode = "add";
}
module.exports = ToolsModel;
