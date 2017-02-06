var PIXI = require("pixi.js");
var WallView = require("./WallView.js");


function GridBackground(screenWidth, screenHeight) {
    PIXI.Graphics.call(this);
    this.screenWidth = screenWidth;
    this.screenHeight = screenHeight;
    this.renderGrid();
}
GridBackground.prototype = Object.create(PIXI.Graphics.prototype);
GridBackground.prototype.constructor = GridBackground;
module.exports = GridBackground;

GridBackground.prototype.renderGrid = function () {
    this.clear();
    this.beginFill(0xdddddd);
    var cw = WallView.cellWidth;
    var ch = WallView.cellHeight;
    for (var x = 0; x < this.screenWidth / cw; x++) {
        for (var y = 0; y < this.screenHeight / ch; y++) {
            this.drawRect(x * cw - 1, y * ch - 1, cw, 1);
            this.drawRect(x * cw - 1, y * ch - 1, 1, ch);
            this.drawRect(x * cw + cw - 1, y * ch - 1, cw, 1);
            this.drawRect(x * cw - 1, y * ch + ch - 1, 1, ch);
        }
    }
    this.endFill();
};
