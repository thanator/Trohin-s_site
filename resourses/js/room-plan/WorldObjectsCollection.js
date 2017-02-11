var EventEmitter = require("eventemitter3");
var Map = require("core-js/library/fn/map");


function WorldObjectsCollection() {
    EventEmitter.call(this);
    this.cells = [];
    this.cellViews = new Map();
}
WorldObjectsCollection.prototype = Object.create(EventEmitter.prototype);
WorldObjectsCollection.prototype.constructor = WorldObjectsCollection;
module.exports = WorldObjectsCollection;


WorldObjectsCollection.prototype.addCell = function (cell, view) {
    this.cells.push(cell);
    this.emit("addCell", cell);
    if (view != null) {
        this.addCellView(view);
    }
};

WorldObjectsCollection.prototype.addCellView = function (view) {
    this.cellViews.set(view.model, view);
    this.emit("addCellView", view);
};

WorldObjectsCollection.prototype.removeCell = function (cell) {
    if (this.cellViews.has(cell)) {
        this.removeCellView(this.cellViews.get(cell));
    }
    this.cells.splice(this.cells.indexOf(cell), 1);
    this.emit("removeCell", cell);
};

WorldObjectsCollection.prototype.removeCellView = function (view) {
    this.cellViews.delete(view.model);
    this.emit("removeCellView", view);
};

WorldObjectsCollection.prototype.hasCell = function (cell) {
    return this.hasCellWithCoords(cell.x, cell.y);
};

WorldObjectsCollection.prototype.hasCellWithCoords = function (x, y) {
    return _.some(this.cells, function (cell) {
        return cell.x == x && cell.y == y;
    });
};

WorldObjectsCollection.prototype.getCell = function (x, y) {
    return _.find(this.cells, function (cell) {
        return cell.x == x && cell.y == y;
    });
};