function CellNeighborhood() {
    this.left = null;
    this.right = null;
    this.up = null;
    this.down = null;
}
module.exports = CellNeighborhood;

CellNeighborhood.prototype.neighborsCount = function () {
    return (this.left != null) + (this.right != null) + (this.up != null) + (this.down != null);
};

CellNeighborhood.prototype.hasNoNeighbors = function () {
    return this.neighborsCount() == 0;
};

CellNeighborhood.prototype.isVerticalLine = function () {
    return this.up != null && this.down != null && this.left == null && this.right == null;
};

CellNeighborhood.prototype.isHorizontalLine = function () {
    return this.left != null && this.right != null && this.up == null && this.down == null;
};

CellNeighborhood.prototype.isLine = function () {
    return this.isVerticalLine() || this.isHorizontalLine();
};

CellNeighborhood.prototype.isCorner = function () {
    return this.neighborsCount() == 2 && !this.isLine();
};

CellNeighborhood.prototype.toFullArray = function () {
    return [this.left, this.right, this.up, this.down];
};

CellNeighborhood.prototype.toArray = function () {
    var arr = [];
    this.toFullArray().forEach(function (it) {
        if (it != null) {
            arr.push(it);
        }
    });
    return arr;
};
