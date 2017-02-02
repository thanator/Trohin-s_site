var Set = require('core-js/library/fn/set');

function CellModel(x, y) {
    this.x = x;
    this.y = y;
    this.contents = new Set();
}
module.exports = CellModel;
