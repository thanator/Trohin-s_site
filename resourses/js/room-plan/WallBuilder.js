var WallModel = require("./WallModel.js");
var WallView = require("./WallView.js");
var CellModel = require("./CellModel.js");


function WallBuilder() {
    this.wall = new WallModel();
    this.wallView = new WallView(this.wall);
}
module.exports = WallBuilder;

WallBuilder.prototype.tryAddCell = function (x, y) {
    if (this.wall.cells.length == 0 || this.wall.isCellWithCoordsLinkable(x, y)) {
        var cell = new CellModel(x, y);
        this.wall.cells.push(cell);
        this.wallView.renderWall();
    }
};