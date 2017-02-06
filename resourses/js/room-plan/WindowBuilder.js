function WindowBuilder(wallsCollection) {
    this.wallsCollection = wallsCollection;
}
module.exports = WindowBuilder;

WindowBuilder.prototype.tryAddWindow = function (x, y) {
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
    if (this._hasWindowOrDoor(cell0) || this._hasWindowOrDoor(cell1) || this._hasWindowOrDoor(cell2)) {
        return false;
    }
    this._createWindow(cell0, cell1, cell2);
    d.wallViews[0].renderWall();
    return true;
};

WindowBuilder.prototype.tryRemoveWindow = function (x, y) {
    var d = this.wallsCollection.findCellAndWall(x, y);
    if (d.cell == null) {
        return false;
    }
    var windowType = this._getWindowType(d.cell);
    if (windowType == null) {
        return false;
    }
    var neighborhood = d.wall.getCellNeighborhood(d.cell);
    switch (windowType) {
        case "window0":
            d.cell.contents.delete("window0");
            if (neighborhood.right) {
                d.wall.getCell(d.cell.x + 1, d.cell.y).contents.delete("window1");
                d.wall.getCell(d.cell.x + 2, d.cell.y).contents.delete("window2");
            } else if (neighborhood.down) {
                d.wall.getCell(d.cell.x, d.cell.y + 1).contents.delete("window1");
                d.wall.getCell(d.cell.x, d.cell.y + 2).contents.delete("window2");
            }
            break;

        case "window1":
            d.cell.contents.delete("window1");
            if (neighborhood.right) {
                d.wall.getCell(d.cell.x - 1, d.cell.y).contents.delete("window0");
                d.wall.getCell(d.cell.x + 1, d.cell.y).contents.delete("window2");
            } else if (neighborhood.down) {
                d.wall.getCell(d.cell.x, d.cell.y - 1).contents.delete("window0");
                d.wall.getCell(d.cell.x, d.cell.y + 1).contents.delete("window2");
            }
            break;

        case "window2":
            d.cell.contents.delete("window2");
            if (neighborhood.left) {
                d.wall.getCell(d.cell.x - 2, d.cell.y).contents.delete("window0");
                d.wall.getCell(d.cell.x - 1, d.cell.y).contents.delete("window1");
            } else if (neighborhood.up) {
                d.wall.getCell(d.cell.x, d.cell.y - 2).contents.delete("window0");
                d.wall.getCell(d.cell.x, d.cell.y - 1).contents.delete("window1");
            }
            break;
    }
    d.wallViews[0].renderWall();
    return true;
};

WindowBuilder.prototype._hasWindowOrDoor = function (cell) {
    return _.some([0, 1, 2], function (i) {
        return cell.contents.has("window" + i) || cell.contents.has("door" + i);
    });
};

WindowBuilder.prototype._getWindowType = function (cell) {
    var i = _.find([0, 1, 2], function (i) {
        return cell.contents.has("window" + i);
    });
    if (i == null) {
        return null;
    }
    return "window" + i;
};

WindowBuilder.prototype._createWindow = function () {
    for (var i = 0; i < 3; i++) {
        arguments[i].contents.add("window" + i);
    }
};
