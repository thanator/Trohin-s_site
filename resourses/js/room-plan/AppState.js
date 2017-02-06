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

    for (var x = 4; x <= 20; x++) {
        wall.cells.push(new CellModel(x, 4));
        wall.cells.push(new CellModel(x, 16));
    }
    for (var x = 14; x <= 19; x++) {
        wall.cells.push(new CellModel(x, 9));
    }

    for (var y = 5; y <= 15; y++) {
        wall.cells.push(new CellModel(4, y));
        wall.cells.push(new CellModel(11, y));
        wall.cells.push(new CellModel(20, y));
    }
    for (var y = 10; y <= 15; y++) {
        wall.cells.push(new CellModel(14, y));
    }

    wall.getCell(20, 6).contents.add("door0");
    wall.getCell(20, 7).contents.add("door1");
    wall.getCell(20, 8).contents.add("door2");

    wall.getCell(14, 13).contents.add("door0");
    wall.getCell(14, 14).contents.add("door1");
    wall.getCell(14, 15).contents.add("door2");

    wall.getCell(11, 10).contents.add("door0");
    wall.getCell(11, 11).contents.add("door1");
    wall.getCell(11, 12).contents.add("door2");

    wall.getCell(4, 12).contents.add("window0");
    wall.getCell(4, 13).contents.add("window1");
    wall.getCell(4, 14).contents.add("window2");

    wall.getCell(6, 16).contents.add("window0");
    wall.getCell(7, 16).contents.add("window1");
    wall.getCell(8, 16).contents.add("window2");

    for (var x = 16; x <= 20; x++) {
        wall.getCell(x, 4).contents.add("wire");
    }

    if (wall.isOkay()) {
        this.wallsCollection.addWall(wall, new WallView(wall));
    } else {
        console.error("start wall is not okay");
    }
};