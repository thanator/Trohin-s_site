var PIXI = require("pixi.js");
var WallView = require("./WallView.js");


function SinkView(model) {
    PIXI.Graphics.call(this);
    this.model = model;
    this.renderSink();
}
SinkView.prototype = Object.create(PIXI.Graphics);
SinkView.prototype.constructor = SinkView;
module.exports = SinkView;

SinkView.prototype.renderSink = function () {
    this.clear();
    this.beginFill(0xff00ff);
    this.drawRect(this.model.x * WallView.cellWidth + 4, this.model.y * WallView.cellHeight + 4, WallView.cellWidth - 8, WallView.cellHeight - 8);
    this.endFill();
};
