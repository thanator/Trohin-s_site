var WallModel = require("./WallModel.js");
var WallView = require("./WallView.js");
var CellModel = require("./CellModel.js");


function WallBuilder(wallsCollection) {
    this.wallsCollection = wallsCollection;
}
module.exports = WallBuilder;

WallBuilder.prototype.beginNewWall = function () {
    this.wall = new WallModel();
    this.wallView = new WallView(this.wall);
    this.wallsCollection.addWall(this.wall, this.wallView);
};

WallBuilder.prototype.endWall = function () {
    this.wall = null;
    this.wallView = null;
};

WallBuilder.prototype.isBuilding = function () {
    return this.wall != null;
};

WallBuilder.prototype.tryAddCell = function (x, y) {
    if (this.isBuilding() && this._isCellOkWithThisWall(x, y) && this._isCellOkWithOtherWalls(x, y)) {
        var cell = new CellModel(x, y);
        this.wall.cells.push(cell);
        this._tryJoin();
        this.wallView.renderWall();
        return true;
    }
    return false;
};

WallBuilder.prototype.tryRemoveCell = function (x, y) {
    var d = this.wallsCollection.findCellAndWall(x, y);
    if (d.cell == null) {
        return false;
    }
    if (d.cell.contents.size != 0) {
        return false;
    }
    d.wall.cells.splice(d.wall.cells.indexOf(d.cell), 1);
    var newWalls = d.wall.split();
    if (newWalls.length <= 1) {
        d.wallViews[0].renderWall();
        return true;
    }
    this.wallsCollection.removeWall(d.wall);
    for (var i = 0; i < newWalls.length; i++) {
        var wall = newWalls[i];
        var wallView = new WallView(wall);
        this.wallsCollection.addWall(wall, wallView);
    }
    return true;
};

WallBuilder.prototype._isCellOkWithOtherWalls = function (x, y) {
    return _.every(this.wallsCollection.walls, function (wall) {
        return !wall.hasCellWithCoords(x, y);
    });
};

WallBuilder.prototype._isCellOkWithThisWall = function (x, y) {
    return this.wall.cells.length == 0 || this.wall.isCellWithCoordsLinkable(x, y);
};

WallBuilder.prototype._tryJoin = function () {
    for (var i = 0; i < this.wallsCollection.walls.length; i++) {
        var wall = this.wallsCollection.walls[i];
        if (wall == this.wall) {
            continue;
        }
        if (this.wall.tryJoin(wall)) {
            this.wallsCollection.removeWall(wall);
            break;
        }
    }
};