function WallModel() {
    this.cells = [];
}
module.exports = WallModel;

WallModel.prototype.isCellLinkable = function (cell) {
    return this.isCellWithCoordsLinkable(cell.x, cell.y);
};

WallModel.prototype.isCellWithCoordsLinkable = function (x, y) {
    var neighborhood = this.getCellWithCoordsNeighborhood(x, y);
    if (!neighborhood.left && !neighborhood.right && !neighborhood.top && !neighborhood.bottom) {
        return false;
    }
    if (neighborhood.left && neighborhood.top) {
        if (this.hasCellWithCoords(x - 1, y - 1)) {
            return false;
        }
    }
    if (neighborhood.right && neighborhood.top) {
        if (this.hasCellWithCoords(x + 1, y - 1)) {
            return false;
        }
    }
    if (neighborhood.left && neighborhood.bottom) {
        if (this.hasCellWithCoords(x - 1, y + 1)) {
            return false;
        }
    }
    if (neighborhood.right && neighborhood.bottom) {
        if (this.hasCellWithCoords(x + 1, y + 1)) {
            return false;
        }
    }
    return true;
};

WallModel.prototype.getCellNeighborhood = function (cell) {
    return this.getCellWithCoordsNeighborhood(cell.x, cell.y);
};

WallModel.prototype.getCellWithCoordsNeighborhood = function (x, y) {
    var neighborhood = { left: false, right: false, top: false, bottom: false };
    for (var i = 0; i < this.cells.length; i++) {
        var cell = this.cells[i];
        var dx = cell.x - x;
        var dy = cell.y - y;
        if (dx == -1 && dy == 0) {
            neighborhood.left = true;
        }
        if (dx == 1 && dy == 0) {
            neighborhood.right = true;
        }
        if (dy == -1 && dx == 0) {
            neighborhood.top = true;
        }
        if (dy == 1 && dx == 0) {
            neighborhood.bottom = true;
        }
    }
    return neighborhood;
};

WallModel.prototype.getCell = function (x, y) {
    return _.find(this.cells, function (it) {
        return it.x == x && it.y == y;
    });
};

WallModel.prototype.hasCell = function (cell) {
    return this.hasCellWithCoords(cell.x, cell.y);
};

WallModel.prototype.hasCellWithCoords = function (x, y) {
    return _.some(this.cells, function (it) {
        return it.x == x && it.y == y;
    });
};

WallModel.prototype.join = function (otherWall) {
    this.cells = _.concat(this.cells, otherWall.cells);
};

WallModel.prototype.tryJoin = function (otherWall) {
    var oldCells = this.cells;
    this.cells = _.concat(this.cells, otherWall.cells);
    if (!this.isOkay()) {
        this.cells = oldCells;
        return false;
    }
    return true;
};

WallModel.prototype.joinCopy = function (otherWall) {
    var newWall = new WallModel();
    newWall.cells = _.concat(this.cells, otherWall.cells);
};

WallModel.prototype.isOkay = function () {
    return this._areAllCellsLinkedOkay() && this._isCellGraphOkay();
};

WallModel.prototype._areAllCellsLinkedOkay = function () {
    return _.every(this.cells, function (cell) {
        return this.isCellLinkable(cell);
    }.bind(this));
};

WallModel.prototype._isCellGraphOkay = function () {
    var checkedCells = new Array(this.cells.length);
    this._cellDfs(this.cells[0].x, this.cells[0].y, checkedCells);
    return _.every(checkedCells, function (it) {
        return it === true;
    });
};

WallModel.prototype._cellDfs = function (x, y, checkedCells) {
    if (checkedCells[this._getCellIndex(x, y)] === true) {
        return;
    }
    checkedCells[this._getCellIndex(x, y)] = true;

    var neighborhood = this.getCellWithCoordsNeighborhood(x, y);
    if (neighborhood.left) {
        this._cellDfs(x - 1, y, checkedCells);
    }
    if (neighborhood.right) {
        this._cellDfs(x + 1, y, checkedCells);
    }
    if (neighborhood.top) {
        this._cellDfs(x, y - 1, checkedCells);
    }
    if (neighborhood.bottom) {
        this._cellDfs(x, y + 1, checkedCells);
    }
};

WallModel.prototype._getCellIndex = function (x, y) {
    for (var i = 0; i < this.cells.length; i++) {
        var cell = this.cells[i];
        if (cell.x == x && cell.y == y) {
            return i;
        }
    }
};
