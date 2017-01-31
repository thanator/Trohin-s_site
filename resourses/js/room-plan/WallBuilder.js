var WallModel = require("./WallModel.js");
var WallView = require("./WallView.js");
var CellModel = require("./CellModel.js");


function WallBuilder() {
    this.allWalls = [];
}
module.exports = WallBuilder;

WallBuilder.prototype.beginNewWall = function () {
    this.wall = new WallModel();
    this.wallView = new WallView(this.wall);
    this.allWalls.push(this.wall);
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
        this.wallView.renderWall();
        return true;
    }
    return false;
};

WallBuilder.prototype._isCellOkWithOtherWalls = function (x, y) {
    return !_.some(this.allWalls, function (wall) {
        return wall.hasCellWithCoords(x, y);
    });
};

WallBuilder.prototype._isCellOkWithThisWall = function (x, y) {
    return this.wall.cells.length == 0 || this.wall.isCellWithCoordsLinkable(x, y);
};