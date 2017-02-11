var CellModel = require("./CellModel.js");
var FloorView = require("./FloorView.js");


function FloorBuilder(wallsCollection, worldObjectsCollection) {
    this.wallsCollection = wallsCollection;
    this.worldObjectsCollection = worldObjectsCollection;
}
module.exports = FloorBuilder;

FloorBuilder.prototype.tryAddFloor = function (x, y, style) {
    if (this.wallsCollection.hasCellWithCoords(x, y)) {
        return false;
    }
    if (this.worldObjectsCollection.hasCellWithCoords(x, y) && this.worldObjectsCollection.getCell(x, y).contents.has("floor")) {
        return false;
    }
    var cell = new CellModel(x, y);
    cell.contents.add("floor");
    cell.contentsData.set("floor-style", style);
    var view = new FloorView(cell, this.wallsCollection);
    this.worldObjectsCollection.addCell(cell, view);
    return true;
};

FloorBuilder.prototype.tryRemoveFloor = function (x, y) {
    var cell = this.worldObjectsCollection.getCell(x, y);
    if (cell == null || !cell.contents.has("floor")) {
        return false;
    }
    this.worldObjectsCollection.removeCell(cell);
    return true;
};
