function MainStageController(stage, interaction, appState) {
    this.stage = stage;
    this.interaction = interaction;
    this.appState = appState;
}
module.exports = MainStageController;

MainStageController.prototype.init = function () {
    this.interaction.on("mousedown", this._onMouseDown.bind(this));
    this.interaction.on("mousemove", this._onMouseMove.bind(this));
    this.interaction.on("mouseup", this._onMouseUp.bind(this));
    this.appState.wallsCollection.on("addWallView", this._onAddWallView.bind(this));
    this.appState.wallsCollection.on("removeWallView", this._onRemoveWallView.bind(this));
};

MainStageController.prototype._onMouseDown = function () {
    this.appState.currentTool.onMouseDown();
};

MainStageController.prototype._onMouseMove = function (event) {
    var pos = event.data.getLocalPosition(this.stage, undefined, this.interaction.mouse.global);
    this.appState.currentTool.onMouseMove(pos.x, pos.y);
};

MainStageController.prototype._onMouseUp = function () {
    this.appState.currentTool.onMouseUp();
};

MainStageController.prototype._onAddWallView = function (view) {
    this.stage.addChild(view);
};

MainStageController.prototype._onRemoveWallView = function (view) {
    this.stage.removeChild(view);
};
