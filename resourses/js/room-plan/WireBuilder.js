function WireBuilder(wallsCollection) {
    this.wallsCollection = wallsCollection;
}
module.exports = WireBuilder;

WireBuilder.prototype.tryAddWire = function (x, y) {
    var d = this.wallsCollection.findCellAndWall(x, y);
    if (d.cell == null) {
        return false;
    }
    var hasConnection = d.wall.getCellNeighborhood(d.cell).getNeighborhoodByContent("wire").hasNeighbors();
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
    var connectionsCount = d.wall.getCellNeighborhood(d.cell).getNeighborhoodByContent("wire").getNeighborsCount();
    if (connectionsCount != 1) {
        return false;
    }
    d.cell.contents.delete("wire");
    d.wallViews[0].renderWall();
    return true;
};
