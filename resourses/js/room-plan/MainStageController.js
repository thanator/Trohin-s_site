function MainStageController(appState, stage, interaction) {
    this.appState = appState;
    this.stage = stage;
    this.interaction = interaction;
}
module.exports = MainStageController;

MainStageController.prototype.init = function () {
    this.interaction.on("mousedown", this._onMouseDown.bind(this));
    this.interaction.on("mousemove", this._onMouseMove.bind(this));
    this.interaction.on("mouseup", this._onMouseUp.bind(this));
    this.appState.wallsCollection.on("addWallView", this._onAddWallView.bind(this));
    this.appState.wallsCollection.on("removeWallView", this._onRemoveWallView.bind(this));
};

MainStageController.prototype._onMouseDown = function (event) {
    var pos = this._getMousePos(event);
    this.appState.currentTool.onMouseDown(pos.x, pos.y);
};

MainStageController.prototype._onMouseMove = function (event) {
    var pos = this._getMousePos(event);
    this.appState.currentTool.onMouseMove(pos.x, pos.y);
};

MainStageController.prototype._onMouseUp = function (event) {
    var pos = this._getMousePos(event);
    this.appState.currentTool.onMouseUp(pos.x, pos.y);
};

MainStageController.prototype._onAddWallView = function (view) {
    this.stage.addChild(view);
};

MainStageController.prototype._onRemoveWallView = function (view) {
    this.stage.removeChild(view);
};

MainStageController.prototype._getMousePos = function (event) {
    return event.data.getLocalPosition(this.stage, undefined, this.interaction.mouse.global);
};
