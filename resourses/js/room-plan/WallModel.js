function WallModel() {
    this.cells = [];
}
module.exports = WallModel;

WallModel.prototype.isCellLinkable = function (cell) {
    return this.isCellWithCoordsLinkable(cell.x, cell.y);
};

WallModel.prototype.isCellWithCoordsLinkable = function (x, y) {
    return _.some(this.cells, function (it) {
        var dx = Math.abs(it.x - x);
        var dy = Math.abs(it.y - y);
        var isLinkingOnXAxis = dx == 1 && dy == 0;
        var isLinkingOnYAxis = dy == 1 && dx == 0;
        return isLinkingOnXAxis || isLinkingOnYAxis;
    });
};
