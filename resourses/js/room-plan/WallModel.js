var CellNeighborhood = require("./CellNeighborhood.js");


function WallModel() {
    this.cells = [];
}
module.exports = WallModel;

WallModel.prototype.addCell = function (cell) {
    this.cells.push(cell);
};

WallModel.prototype.removeCell = function (cell) {
    this.cells.splice(this.cells.indexOf(cell), 1);
};

WallModel.prototype.isCellLinkable = function (cell) {
    return this.isCellWithCoordsLinkable(cell.x, cell.y);
};

WallModel.prototype.isCellWithCoordsLinkable = function (x, y) {
    var neighborhood = this.getCellWithCoordsNeighborhood(x, y);
    if (neighborhood.hasNoNeighbors()) {
        return false;
    }
    if (neighborhood.left && neighborhood.up) {
        if (this.hasCellWithCoords(x - 1, y - 1)) {
            return false;
        }
    }
    if (neighborhood.right && neighborhood.up) {
        if (this.hasCellWithCoords(x + 1, y - 1)) {
            return false;
        }
    }
    if (neighborhood.left && neighborhood.down) {
        if (this.hasCellWithCoords(x - 1, y + 1)) {
            return false;
        }
    }
    if (neighborhood.right && neighborhood.down) {
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
    var neighborhood = new CellNeighborhood();
    for (var i = 0; i < this.cells.length; i++) {
        var cell = this.cells[i];
        var dx = cell.x - x;
        var dy = cell.y - y;
        if (dx == -1 && dy == 0) {
            neighborhood.left = cell;
        }
        if (dx == 1 && dy == 0) {
            neighborhood.right = cell;
        }
        if (dy == -1 && dx == 0) {
            neighborhood.up = cell;
        }
        if (dy == 1 && dx == 0) {
            neighborhood.down = cell;
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

WallModel.prototype.split = function () {
    var checkedCells = new Array(this.cells.length);

    var isCheckedAll = function () {
        return _.every(checkedCells, function (it) {
            return it === true;
        });
    }.bind(this);
    var getFirstUncheckedCell = function () {
        for (var i = 0; i < checkedCells.length; i++) {
            if (checkedCells[i] !== true) {
                return this.cells[i];
            }
        }
        return null;
    }.bind(this);
    var diffNew = function (was, now) {
        var result = _.clone(now);
        for (var i = 0; i < result.length; i++) {
            if (was[i] === true) {
                result[i] = false;
            }
        }
        return result;
    }.bind(this);

    var walls = [];
    while (!isCheckedAll()) {
        var oldCheckedCells = _.clone(checkedCells);

        var cell = getFirstUncheckedCell();
        this._cellDfs(cell.x, cell.y, checkedCells);

        var wall = new WallModel();
        var diff = diffNew(oldCheckedCells, checkedCells);
        for (var i = 0; i < diff.length; i++) {
            if (diff[i] === true) {
                wall.cells.push(this.cells[i]);
            }
        }

        walls.push(wall);
    }
    return walls;
};

WallModel.prototype.isOkay = function () {
    return this.cells.length <= 1 || (this._areAllCellsLinkedOkay() && this._isCellGraphOkay());
};

WallModel.prototype._areAllCellsLinkedOkay = function () {
    return _.every(this.cells, function (cell) {
        return this.isCellLinkable(cell);
    }.bind(this));
};

WallModel.prototype._isCellGraphOkay = function () {
    if (this.cells.length == 0) {
        return true;
    }
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
    if (neighborhood.up) {
        this._cellDfs(x, y - 1, checkedCells);
    }
    if (neighborhood.down) {
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
