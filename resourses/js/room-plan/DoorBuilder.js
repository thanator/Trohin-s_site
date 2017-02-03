function DoorBuilder(wallsCollection) {
    this.wallsCollection = wallsCollection;
}
module.exports = DoorBuilder;

DoorBuilder.prototype.tryAddDoor = function (x, y) {
    var done = false;
    for (var i = 0; i < this.wallsCollection.walls.length; i++) {
        var wall = this.wallsCollection.walls[i];
        for (var j = 0; j < wall.cells.length; j++) {
            var cell = wall.cells[j];
            if (cell.x == x && cell.y == y) {
                var hasDoor = this._hasDoor(cell);
                if (!hasDoor) {
                    var neighborhood = wall.getCellNeighborhood(cell);
                    var cell0 = null;
                    var cell1 = cell;
                    var cell2 = null;
                    if (neighborhood.isVerticalLine()) {
                        cell0 = neighborhood.up;
                        cell2 = neighborhood.down;
                        var cell0Neighborhood = wall.getCellNeighborhood(cell0);
                        var cell2Neighborhood = wall.getCellNeighborhood(cell2);
                        if (cell0Neighborhood.left || cell0Neighborhood.right || cell2Neighborhood.left || cell2Neighborhood.right) {
                            break;
                        }
                    } else if (neighborhood.isHorizontalLine()) {
                        cell0 = neighborhood.left;
                        cell2 = neighborhood.right;
                        var cell0Neighborhood = wall.getCellNeighborhood(cell0);
                        var cell2Neighborhood = wall.getCellNeighborhood(cell2);
                        if (cell0Neighborhood.up || cell0Neighborhood.down || cell2Neighborhood.up || cell2Neighborhood.down) {
                            break;
                        }
                    } else {
                        break;
                    }
                    if (!this._hasDoor(cell0) && !this._hasDoor(cell1) && !this._hasDoor(cell2)) {
                        this._createDoor(cell0, cell1, cell2);
                        done = true;
                    }
                }
                break;
            }
        }
        if (done) {
            this.wallsCollection.wallViews[i][0].renderWall();
            break;
        }
    }
};

DoorBuilder.prototype._hasDoor = function (cell) {
    return _.some([0, 1, 2], function (i) {
        return cell.contents.has("door" + i);
    });
};

DoorBuilder.prototype._createDoor = function () {
    for (var i = 0; i < 3; i++) {
        arguments[i].contents.add("door" + i);
    }
};
