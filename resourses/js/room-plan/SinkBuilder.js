var CellModel = require("./CellModel.js");
var SinkView = require("./SinkView.js");


function SinkBuilder(worldObjectsCollection) {
    this.worldObjectsCollection = worldObjectsCollection;
}
module.exports = SinkBuilder;

SinkBuilder.prototype.tryAddSink = function (x, y) {
    if (this.worldObjectsCollection.hasCell(x, y)) {
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
    if (cell == null || !cell.content.has("sink")) {
        return false;
    }
    this.worldObjectsCollection.removeCell(cell);
    return true;
};
