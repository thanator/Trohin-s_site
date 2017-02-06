function CellNeighborhood() {
    this.left = null;
    this.right = null;
    this.up = null;
    this.down = null;
}
module.exports = CellNeighborhood;

CellNeighborhood.prototype.getNeighborsCount = function () {
    return (this.left != null) + (this.right != null) + (this.up != null) + (this.down != null);
};

CellNeighborhood.prototype.hasNeighbors = function () {
    return this.getNeighborsCount() != 0;
};

CellNeighborhood.prototype.hasNoNeighbors = function () {
    return this.getNeighborsCount() == 0;
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
    return this.getNeighborsCount() == 2 && !this.isLine();
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

CellNeighborhood.prototype.getNeighborhoodByContent = function (content) {
    var result = new CellNeighborhood();
    result.left = this.left != null && this.left.contents.has(content) ? this.left : null;
    result.right = this.right != null && this.right.contents.has(content) ? this.right : null;
    result.up = this.up != null && this.up.contents.has(content) ? this.up : null;
    result.down = this.down != null && this.down.contents.has(content) ? this.down : null;
    return result;
};

