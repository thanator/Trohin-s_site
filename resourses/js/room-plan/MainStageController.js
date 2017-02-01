var WallBuilder = require("./WallBuilder.js");


function MainStageController(stage, interaction) {
    this.stage = stage;
    this.interaction = interaction;
    this.wallBuilder = new WallBuilder();
}
module.exports = MainStageController;

MainStageController.prototype.init = function () {
    this.interaction.on("mousedown", this._onMouseDown.bind(this));
    this.interaction.on("mousemove", this._onMouseMove.bind(this));
    this.interaction.on("mouseup", this._onMouseUp.bind(this));
    this.wallBuilder.wallsCollection.on("addWallView", this._onAddWallView.bind(this));
    this.wallBuilder.wallsCollection.on("removeWallView", this._onRemoveWallView.bind(this));
};

MainStageController.prototype._onMouseDown = function () {
    this.wallBuilder.beginNewWall();
};

MainStageController.prototype._onMouseMove = function (event) {
    var pos = event.data.getLocalPosition(this.stage, undefined, this.interaction.mouse.global);
    this.wallBuilder.tryAddCellWithScreenCoords(pos.x, pos.y);
};

MainStageController.prototype._onMouseUp = function () {
    this.wallBuilder.endWall();
};

MainStageController.prototype._onAddWallView = function (view) {
    this.stage.addChild(view);
};

MainStageController.prototype._onRemoveWallView = function (view) {
    this.stage.removeChild(view);
};
