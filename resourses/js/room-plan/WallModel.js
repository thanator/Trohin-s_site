function WallModel() {
    this.cells = [];
}
module.exports = WallModel;

WallModel.prototype.isCellLinkable = function (cell) {
    return this.isCellWithCoordsLinkable(cell.x, cell.y);
};

WallModel.prototype.isCellWithCoordsLinkable = function (x, y) {
    var neighborhood = this.getCellWithCoordsNeighborhood(x, y);
    if ((neighborhood.left || neighborhood.right) && !(neighborhood.top || neighborhood.bottom)) {
        return true;
    }
    if ((neighborhood.top || neighborhood.bottom) && !(neighborhood.left || neighborhood.right)) {
        return true;
    }
    return false;
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

WallModel.prototype.hasCell = function (cell) {
    return this.hasCellWithCoords(cell.x, cell.y);
};

WallModel.prototype.hasCellWithCoords = function (x, y) {
    return _.some(this.cells, function (it) {
        return it.x == x && it.y == y;
    });
};
