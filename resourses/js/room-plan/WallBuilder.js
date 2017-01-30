var WallModel = require("./WallModel.js");
var CellModel = require("./CellModel.js");


function WallBuilder() {
    this.wall = new WallModel();
}
module.exports = WallBuilder;

WallBuilder.prototype.tryAddCell = function (x, y) {
    if (this.wall.isCellWithCoordsLinkable(x, y)) {
        var cell = new CellModel(x, y);
        // TODO: view
        this.wall.cells.push(cell);
    }
};