function WallModel() {
    this.cells = [];
}
module.exports = WallModel;

WallModel.prototype.isCellLinkable = function (cell) {
    return this.isCellWithCoordsLinkable(cell.x, cell.y);
};

WallModel.prototype.isCellWithCoordsLinkable = function (x, y) {
    return _.some(this.cells, function (it) {
        var isLinkingOnXAxis = Math.abs(it.x - x) == 1;
        var isLinkingOnYAxis = Math.abs(it.y - y) == 1;
        return isLinkingOnXAxis != isLinkingOnYAxis; // xor
    });
};
