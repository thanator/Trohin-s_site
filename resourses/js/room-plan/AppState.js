var WallsCollection = require("./WallsCollection.js");
var WallTool = require("./WallTool.js");
var WireTool = require("./WireTool.js");
var DoorTool = require("./DoorTool.js");
var WindowTool = require("./WindowTool.js");
var WallModel = require("./WallModel.js");
var WallView = require("./WallView.js");
var CellModel = require("./CellModel.js");


function AppState() {
    this.wallsCollection = new WallsCollection();
    this.tools = [
        new WallTool(this),
        new WireTool(this),
        new DoorTool(this),
        new WindowTool(this)
    ];
    this.currentTool = this.tools[0];
    this.toolMode = "add";
}
module.exports = AppState;

AppState.prototype.createStartEnvironment = function () {
    var wall = new WallModel();

    for (var x = 20; x <= 24; x++) {
        wall.cells.push(new CellModel(x, 0));
    }
    for (var y = 1; y <= 7; y++) {
        wall.cells.push(new CellModel(24, y));
    }

    wall.getCell(24, 2).contents.add("door0");
    wall.getCell(24, 3).contents.add("door1");
    wall.getCell(24, 4).contents.add("door2");

    wall.getCell(23, 0).contents.add("wire");
    wall.getCell(24, 0).contents.add("wire");

    this.wallsCollection.addWall(wall, new WallView(wall));
};