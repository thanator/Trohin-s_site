function WindowBuilder(wallsCollection) {
    this.wallsCollection = wallsCollection;
}
module.exports = WindowBuilder;

WindowBuilder.prototype.tryAddWindow = function (x, y, style) {
    var d = this.wallsCollection.findCellAndWall(x, y);
    if (d.cell == null) {
        return false;
    }
    var hasWindow = this._hasWindowOrDoor(d.cell);
    if (hasWindow) {
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
    if (this._hasWindowOrDoor(cell1)) {
        return false;
    }
    cell1.contents.add("window");
    cell1.contentsData.set("window-size", style);
    d.wallView.renderWall();
    return true;
};

WindowBuilder.prototype.tryRemoveWindow = function (x, y) {
    var d = this.wallsCollection.findCellAndWall(x, y);
    if (d.cell == null) {
        return false;
    }
    d.cell.contents.delete("window");
    d.cell.contentsData.delete("window-size");
    d.wallView.renderWall();
    return true;
};

WindowBuilder.prototype._hasWindowOrDoor = function (cell) {
    return cell.contents.has("window") || cell.contents.has("door");
};