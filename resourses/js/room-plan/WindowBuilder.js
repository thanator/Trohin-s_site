function WindowBuilder(wallsCollection) {
    this.wallsCollection = wallsCollection;
}
module.exports = WindowBuilder;

WindowBuilder.prototype.tryAddWindow = function (x, y) {
    var done = false;
    for (var i = 0; i < this.wallsCollection.walls.length; i++) {
        var wall = this.wallsCollection.walls[i];
        for (var j = 0; j < wall.cells.length; j++) {
            var cell = wall.cells[j];
            if (cell.x == x && cell.y == y) {
                var hasWindow = this._hasWindow(cell);
                if (!hasWindow) {
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
                    if (!this._hasWindow(cell0) && !this._hasWindow(cell1) && !this._hasWindow(cell2)) {
                        this._createWindow(cell0, cell1, cell2);
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

WindowBuilder.prototype._hasWindow = function (cell) {
    return _.some([0, 1, 2], function (i) {
        return cell.contents.has("window" + i);
    });
};

WindowBuilder.prototype._createWindow = function () {
    for (var i = 0; i < 3; i++) {
        arguments[i].contents.add("window" + i);
    }
};
