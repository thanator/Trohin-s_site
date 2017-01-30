var PIXI = require("pixi.js");


function WallView(model) {
    this.model = model;
    this.renderWall();
}
Object.assign(WallView.prototype, PIXI.Graphics.prototype);
module.exports = WallView;


WallView.prototype.renderWall = function () {
    // TODO
};
