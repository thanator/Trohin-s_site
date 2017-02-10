function DoorBuilder(wallsCollection) {
    this.wallsCollection = wallsCollection;
}
module.exports = DoorBuilder;

DoorBuilder.prototype.tryAddDoor = function (x, y) {
    var d = this.wallsCollection.findCellAndWall(x, y);
    if (d.cell == null) {
        return false;
    }
    var hasDoor = this._hasWindowOrDoor(d.cell);
    if (hasDoor) {
        return false;
    }
    var neighborhood = d.wall.getCellNeighborhood(d.cell);
    var cell0 = null;
    var cell1 = d.cell;
    var cell2 = null;
    if (neighborhood.isVerticalLine()) {
        cell0 = neighborhood.up;
        cell2 = neighborhood.down;
        var cell0Neighborhood = d.wall.getCellNeighborhood(cell0);
        var cell2Neighborhood = d.wall.getCellNeighborhood(cell2);
        if (cell0Neighborhood.left || cell0Neighborhood.right || cell2Neighborhood.left || cell2Neighborhood.right) {
            return false;
        }
    } else if (neighborhood.isHorizontalLine()) {
        cell0 = neighborhood.left;
        cell2 = neighborhood.right;
        var cell0Neighborhood = d.wall.getCellNeighborhood(cell0);
        var cell2Neighborhood = d.wall.getCellNeighborhood(cell2);
        if (cell0Neighborhood.up || cell0Neighborhood.down || cell2Neighborhood.up || cell2Neighborhood.down) {
            return false;
        }
    } else {
        return false;
    }
    if (this._hasWindowOrDoor(cell0) || this._hasWindowOrDoor(cell1) || this._hasWindowOrDoor(cell2)) {
        return false;
    }
    cell1.contents.add("door");
    cell1.contentsData.set("door-size", 3);
    d.wallView.renderWall();
    return true;
};

DoorBuilder.prototype.tryRemoveDoor = function (x, y) {
    var d = this.wallsCollection.findCellAndWall(x, y);
    if (d.cell == null) {
        return false;
    }
    d.cell.contents.delete("door");
    d.cell.contentsData.delete("door-size");
    d.wallView.renderWall();
    return true;
};

DoorBuilder.prototype._hasWindowOrDoor = function (cell) {
    return cell.contents.has("window") || cell.contents.has("door");
};