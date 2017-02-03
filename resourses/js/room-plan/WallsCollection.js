var EventEmitter = require("eventemitter3");


function WallsCollection() {
    EventEmitter.apply(this, arguments);
    this.walls = [];
    this.wallViews = [];
}
WallsCollection.prototype = Object.create(EventEmitter.prototype);
WallsCollection.prototype.constructor = WallsCollection;
module.exports = WallsCollection;

WallsCollection.prototype.addWall = function (wall, view) {
    this.walls.push(wall);
    this.wallViews.push([]);
    this.emit("addWall", wall);
    if (view != null) {
        this.addWallView(view);
    }
};

WallsCollection.prototype.addWallView = function (view) {
    this.wallViews[this.walls.indexOf(view.model)].push(view);
    this.emit("addWallView", view);
};

WallsCollection.prototype.removeWall = function (wall) {
    var i = this.walls.indexOf(wall);
    var views = this.wallViews[i];
    this.wallViews.splice(i, 1);
    views.forEach(function (view) {
        this.emit("removeWallView", view);
    }.bind(this));
    this.walls.splice(i, 1);
    this.emit("removeWall", wall, views);
};

WallsCollection.prototype.removeWallView = function (view) {
    var views = this.wallViews[this.walls.indexOf(view.model)];
    views.splice(views.indexOf(view), 1);
    this.emit("removeWallView", view);
};

WallsCollection.prototype.findCellAndWall = function (x, y) {
    for (var i = 0; i < this.walls.length; i++) {
        var wall = this.walls[i];
        for (var j = 0; j < wall.cells.length; j++) {
            var cell = wall.cells[j];
            if (cell.x == x && cell.y == y) {
                var wallViews = this.wallViews[i];
                return { cell: cell, wall: wall, wallViews: wallViews, i: i };
            }
        }
    }
    return {};
};