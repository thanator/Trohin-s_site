var WallModel = require("./WallModel.js");
var WallView = require("./WallView.js");
var CellModel = require("./CellModel.js");


function WallBuilder(wallsCollection, worldObjectsCollection) {
    this.wallsCollection = wallsCollection;
    this.worldObjectsCollection = worldObjectsCollection;
}
module.exports = WallBuilder;

WallBuilder.prototype.beginNewWall = function (style) {
    this.wall = new WallModel();
    this.wallView = new WallView(this.wall);
    this.wallsCollection.addWall(this.wall, this.wallView);
    this.style = style;
};

WallBuilder.prototype.endWall = function () {
    this.wall = null;
    this.wallView = null;
};

WallBuilder.prototype.isBuilding = function () {
    return this.wall != null;
};

WallBuilder.prototype.tryAddCell = function (x, y, style) {
    if (this.isBuilding() && this._isCellOkWithThisWall(x, y) && this._isCellOkWithOther(x, y)) {
        var cell = new CellModel(x, y);
        cell.contents.add("wall-style" + style);
        this.wall.addCell(cell);
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
        d.wallView.renderWall();
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

WallBuilder.prototype._isCellOkWithOther = function (x, y) {
    return this.wallsCollection.hasCellWithCoords(x, y) && this.worldObjectsCollection.hasCellWithCoords(x, y);
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