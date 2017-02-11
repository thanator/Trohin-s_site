var WallsCollection = require("./WallsCollection.js");
var WorldObjectsCollection = require("./WorldObjectsCollection.js");
var PriceCalculator = require("./PriceCalculator.js");
var WallModel = require("./WallModel.js");
var WallView = require("./WallView.js");
var CellModel = require("./CellModel.js");
var ToolsModel = require("./ToolsModel.js");
var FloorView = require("./FloorView.js");


function AppState(app) {
    this.app = app;
    this.wallsCollection = new WallsCollection();
    this.worldObjectsCollection = new WorldObjectsCollection();
    this.priceCalculator = new PriceCalculator(this.wallsCollection, this.worldObjectsCollection);
    this.toolState = new ToolsModel(this);
}
module.exports = AppState;

AppState.prototype.createStartEnvironment = function () {
    var wall = new WallModel();

    for (var x = 4; x <= 20; x++) {
        wall.addCell(new CellModel(x, 4));
        wall.addCell(new CellModel(x, 16));
    }
    for (var x = 14; x <= 19; x++) {
        wall.addCell(new CellModel(x, 9));
    }

    for (var y = 5; y <= 15; y++) {
        wall.addCell(new CellModel(4, y));
        wall.addCell(new CellModel(11, y));
        wall.addCell(new CellModel(20, y));
    }
    for (var y = 10; y <= 15; y++) {
        wall.addCell(new CellModel(14, y));
    }

    wall.getCell(20, 7).contents.add("door");
    wall.getCell(20, 7).contentsData.set("door-size", 3);

    wall.getCell(14, 14).contents.add("door");
    wall.getCell(14, 14).contentsData.set("door-size", 3);

    wall.getCell(11, 11).contents.add("door");
    wall.getCell(11, 11).contentsData.set("door-size", 3);

    wall.getCell(4, 13).contents.add("window");
    wall.getCell(4, 13).contentsData.set("window-size", 3);

    wall.getCell(7, 16).contents.add("window");
    wall.getCell(7, 16).contentsData.set("window-size", 3);

    for (var x = 16; x <= 20; x++) {
        wall.getCell(x, 4).contents.add("wire");
    }

    for (var i = 0; i < wall.cells.length; i++) {
        wall.cells[i].contentsData.set("wall-style", 0);
    }

    var shiftX = 6;
    var shiftY = 0;

    for (var i = 0; i < wall.cells.length; i++) {
        wall.cells[i].x += shiftX;
        wall.cells[i].y += shiftY;
    }

    if (wall.isOkay()) {
        this.wallsCollection.addWall(wall, new WallView(wall));
    } else {
        throw "start wall is not okay";
    }

    for (var x = 5; x <= 19; x++) {
        for (var y = 5; y <= 15; y++) {
            if (!wall.hasCellWithCoords(x + shiftX, y + shiftY)) {
                var cell = new CellModel(x + shiftX, y + shiftY);
                cell.contents.add("floor");
                cell.contentsData.set("floor-style", 0);
                var view = new FloorView(cell, this.wallsCollection);
                this.worldObjectsCollection.addCell(cell, view);
            }
        }
    }
};