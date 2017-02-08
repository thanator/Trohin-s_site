var EventEmitter = require("eventemitter3");
var Map = require("core-js/library/fn/map");
var CellNeighborhood = require("./CellNeighborhood.js");


function WallsCollection() {
    EventEmitter.call(this);
    this.walls = [];
    this.wallViews = new Map();
}
WallsCollection.prototype = Object.create(EventEmitter.prototype);
WallsCollection.prototype.constructor = WallsCollection;
module.exports = WallsCollection;

WallsCollection.prototype.addWall = function (wall, view) {
    this.walls.push(wall);
    this.emit("addWall", wall);
    if (view != null) {
        this.addWallView(view);
    }
};

WallsCollection.prototype.addWallView = function (view) {
    this.wallViews.set(view.model, view);
    this.emit("addWallView", view);
};

WallsCollection.prototype.removeWall = function (wall) {
    if (this.wallViews.has(wall)) {
        this.removeWallView(this.wallViews.get(wall));
    }
    this.walls.splice(this.walls.indexOf(wall), 1);
    this.emit("removeWall", wall);
};

WallsCollection.prototype.removeWallView = function (view) {
    this.wallViews.delete(view.model);
    this.emit("removeWallView", view);
};

WallsCollection.prototype.findCellAndWall = function (x, y) {
    for (var i = 0; i < this.walls.length; i++) {
        var wall = this.walls[i];
        for (var j = 0; j < wall.cells.length; j++) {
            var cell = wall.cells[j];
            if (cell.x == x && cell.y == y) {
                return { cell: cell, wall: wall, wallView: this.wallViews.get(wall) };
            }
        }
    }
    return {};
};

WallsCollection.prototype.hasCell = function (cell) {
    return this.hasCellWithCoords(cell.x, cell.y);
};

WallsCollection.prototype.hasCellWithCoords = function (x, y) {
    return this.findCellAndWall(x, y).cell != null;
};

WallsCollection.prototype.getCellNeighborhood = function (cell) {
    return this.getCellWithCoordsNeighborhood(cell.x, cell.y);
};

WallsCollection.prototype.getCellWithCoordsNeighborhood = function (x, y) {
    var r = new CellNeighborhood();
    for (var i = 0; i < this.walls.length; i++) {
        var n = this.walls[i].getCellWithCoordsNeighborhood(x, y);
        if (n.left) {
            r.left = n.left;
        }
        if (n.right) {
            r.right = n.right;
        }
        if (n.up) {
            r.up = n.up;
        }
        if (n.down) {
            r.down = n.down;
        }
    }
    return r;
};