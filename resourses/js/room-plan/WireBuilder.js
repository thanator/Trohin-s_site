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
    d.wallView.renderWall();
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
    d.wallView.renderWall();
    return true;
};

WireBuilder.prototype.tryMoveWireStart = function (x, y) {
    var d = this.wallsCollection.findCellAndWall(x, y);
    if (d.cell == null || !d.cell.contents.has("wire")) {
        return false;
    }
    for (var i = 0; i < this.wallsCollection.walls.length; i++) {
        var wall = this.wallsCollection.walls[i];
        for (var j = 0; j < wall.cells.length; j++) {
            var cell = wall.cells[j];
            if (cell.contents.delete("wire-start")) {
                this.wallsCollection.wallViews.get(wall).renderWall();
                break;
            }
        }
    }
    d.cell.contents.add("wire-start");
    d.wallView.renderWall();
    return true;
};
