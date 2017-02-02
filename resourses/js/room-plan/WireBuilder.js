function WireBuilder(wallsCollection) {
    this.wallsCollection = wallsCollection;
}
module.exports = WireBuilder;

WireBuilder.prototype.tryAddWire = function (x, y) {
    var done = false;
    for (var i = 0; i < this.wallsCollection.walls.length; i++) {
        var wall = this.wallsCollection.walls[i];
        for (var j = 0; j < wall.cells.length; j++) {
            var cell = wall.cells[j];
            if (cell.x == x && cell.y == y) {
                var hasConnection = false;
                for (var k = 0; k < wall.cells.length; k++) {
                    var otherCell = wall.cells[j];
                    var dx = Math.abs(otherCell.x - cell.x);
                    var dy = Math.abs(otherCell.y - cell.y);
                    if ((dx == 1 && dy == 0) || (dy == 1 && dx == 0)) {
                        if (otherCell.contents.has("wire")) {
                            hasConnection = true;
                            break;
                        }
                    }
                }
                if (hasConnection) {
                    cell.contents.add("wire");
                }
                done = true;
                break;
            }
        }
        if (done) {
            this.wallsCollection.wallViews[i][0].renderWall();
            break;
        }
    }
};
