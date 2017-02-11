var CellModel = require("./CellModel.js");
var SinkView = require("./SinkView.js");


function SinkBuilder(wallsCollection, worldObjectsCollection) {
    this.wallsCollection = wallsCollection;
    this.worldObjectsCollection = worldObjectsCollection;
}
module.exports = SinkBuilder;

SinkBuilder.prototype.tryAddSink = function (x, y) {
    if (this.wallsCollection.hasCellWithCoords(x, y)) {
        return false;
    }
    if (this.worldObjectsCollection.hasCellWithCoords(x, y) && !this.worldObjectsCollection.getCell(x, y).contents.has("floor")) {
        return false;
    }
    var cell = new CellModel(x, y);
    cell.contents.add("sink");
    var view = new SinkView(cell);
    this.worldObjectsCollection.addCell(cell, view);
    return true;
};

SinkBuilder.prototype.tryRemoveSink = function (x, y) {
    var cell = this.worldObjectsCollection.getCell(x, y);
    if (cell == null || !cell.contents.has("sink")) {
        return false;
    }
    this.worldObjectsCollection.removeCell(cell);
    return true;
};
