function DoorBuilder(wallsCollection) {
    this.wallsCollection = wallsCollection;
}
module.exports = DoorBuilder;

DoorBuilder.prototype.tryAddDoor = function (x, y) {
    var d = this.wallsCollection.findCellAndWall(x, y);
    if (d.cell == null) {
        return false;
    }
    var hasDoor = this._hasDoor(d.cell);
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
    if (this._hasDoor(cell0) || this._hasDoor(cell1) || this._hasDoor(cell2)) {
        return false;
    }
    this._createDoor(cell0, cell1, cell2);
    d.wallViews[0].renderWall();
    return true;
};

DoorBuilder.prototype.tryRemoveDoor = function (x, y) {
    var d = this.wallsCollection.findCellAndWall(x, y);
    if (d.cell == null) {
        return false;
    }
    var doorType = this._getDoorType(d.cell);
    if (doorType == null) {
        return false;
    }
    var neighborhood = d.wall.getCellNeighborhood(d.cell);
    switch (doorType) {
        case "door0":
            d.cell.contents.delete("door0");
            if (neighborhood.right) {
                d.wall.getCell(d.cell.x + 1, d.cell.y).contents.delete("door1");
                d.wall.getCell(d.cell.x + 2, d.cell.y).contents.delete("door2");
            } else if (neighborhood.down) {
                d.wall.getCell(d.cell.x, d.cell.y + 1).contents.delete("door1");
                d.wall.getCell(d.cell.x, d.cell.y + 2).contents.delete("door2");
            }
            break;

        case "door1":
            d.cell.contents.delete("door1");
            if (neighborhood.right) {
                d.wall.getCell(d.cell.x - 1, d.cell.y).contents.delete("door0");
                d.wall.getCell(d.cell.x + 1, d.cell.y).contents.delete("door2");
            } else if (neighborhood.down) {
                d.wall.getCell(d.cell.x, d.cell.y - 1).contents.delete("door0");
                d.wall.getCell(d.cell.x, d.cell.y + 1).contents.delete("door2");
            }
            break;

        case "door2":
            d.cell.contents.delete("door2");
            if (neighborhood.left) {
                d.wall.getCell(d.cell.x - 2, d.cell.y).contents.delete("door0");
                d.wall.getCell(d.cell.x - 1, d.cell.y).contents.delete("door1");
            } else if (neighborhood.up) {
                d.wall.getCell(d.cell.x, d.cell.y - 2).contents.delete("door0");
                d.wall.getCell(d.cell.x, d.cell.y - 1).contents.delete("door1");
            }
            break;
    }
    d.wallViews[0].renderWall();
    return true;
};

DoorBuilder.prototype._hasDoor = function (cell) {
    return _.some([0, 1, 2], function (i) {
        return cell.contents.has("door" + i);
    });
};

DoorBuilder.prototype._getDoorType = function (cell) {
    var i = _.find([0, 1, 2], function (i) {
        return cell.contents.has("door" + i);
    });
    if (i == null) {
        return null;
    }
    return "door" + i;
};

DoorBuilder.prototype._createDoor = function () {
    for (var i = 0; i < 3; i++) {
        arguments[i].contents.add("door" + i);
    }
};
