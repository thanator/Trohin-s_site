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

WallBuilder.prototype.tryAddCellWithScreenCoords = function (x, y) {
    return this.tryAddCell(Math.floor(x / WallView.cellWidth), Math.floor(y / WallView.cellHeight));
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
        if (wall.tryJoin(this.wall)) {
            this.wallsCollection.removeWall(this.wall);
            this.wall = wall;
            this.wallView = this.wallsCollection.wallViews[i][0];
            break;
        }
    }
};