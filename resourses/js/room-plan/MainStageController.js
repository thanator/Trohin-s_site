var PIXI = require("pixi.js");


function MainStageController(stage) {
    this.stage = stage;
}
module.exports = MainStageController;

MainStageController.prototype.init = function () {
    this.stage.interactive = true;
    this.stage.on("mousedown", this._onClick.bind(this));
};

MainStageController.prototype._onClick = function (event) {
    // TODO
};
