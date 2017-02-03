function WireBuilder(wallsCollection) {
    this.wallsCollection = wallsCollection;
}
module.exports = WireBuilder;

WireBuilder.prototype.tryAddWire = function (x, y) {
    var d = this.wallsCollection.findCellAndWall(x, y);
    if (d.cell == null) {
        return false;
    }
    var hasConnection = _.some(d.wall.getCellNeighborhood(d.cell).toArray(), function (otherCell) {
        return otherCell.contents.has("wire");
    });
    if (!hasConnection) {
        return false;
    }
    d.cell.contents.add("wire");
    d.wallViews[0].renderWall();
    return true;
};

WireBuilder.prototype.tryRemoveWire = function (x, y) {
    var d = this.wallsCollection.findCellAndWall(x, y);
    if (d.cell == null) {
        return false;
    }
    var connections = _.filter(d.wall.getCellNeighborhood(d.cell).toArray(), function (otherCell) {
        return otherCell.contents.has("wire");
    });
    if (connections.length != 1) {
        return false;
    }
    d.cell.contents.delete("wire");
    d.wallViews[0].renderWall();
    return true;
};
