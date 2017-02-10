var Set = require("core-js/library/fn/set");
var Map = require("core-js/library/fn/map");

function CellModel(x, y) {
    this.x = x;
    this.y = y;
    this.contents = new Set();
    this.contentsData = new Map();
}
module.exports = CellModel;
