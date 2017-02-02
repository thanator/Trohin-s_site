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
                cell.contents.add("wire");
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
