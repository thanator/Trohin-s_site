var WallBuilder = require("./WallBuilder.js");
var WallView = require("./WallView.js");


function MainStageController(stage, interaction) {
    this.stage = stage;
    this.interaction = interaction;
}
module.exports = MainStageController;

MainStageController.prototype.init = function () {
    this.interaction.on("mousedown", this._onMouseDown.bind(this));
    this.interaction.on("mousemove", this._onMouseMove.bind(this));
    this.interaction.on("mouseup", this._onMouseUp.bind(this));
};

MainStageController.prototype._onMouseDown = function () {
    this.wallBuilder = new WallBuilder();
    this.stage.addChild(this.wallBuilder.wallView);
};

MainStageController.prototype._onMouseMove = function (event) {
    if (!this.wallBuilder) {
        return;
    }
    var pos = event.data.getLocalPosition(this.stage, undefined, this.interaction.mouse.global);
    pos.x = Math.floor(pos.x / WallView.cellWidth);
    pos.y = Math.floor(pos.y / WallView.cellHeight);
    this.wallBuilder.tryAddCell(pos.x, pos.y);
};

MainStageController.prototype._onMouseUp = function () {
    this.wallBuilder = null;
};
