function MainStageController(appState, stage, interaction, screenSize) {
    this.appState = appState;
    this.stage = stage;
    this.interaction = interaction;
    this.screenSize = screenSize;
}
module.exports = MainStageController;

MainStageController.prototype.init = function () {
    this.interaction.on("mousedown", this._onMouseDown.bind(this));
    this.interaction.on("mousemove", this._onMouseMove.bind(this));
    this.interaction.on("mouseup", this._onMouseUp.bind(this));
    this.appState.wallsCollection.on("addWallView", this._onAddWallView.bind(this));
    this.appState.wallsCollection.on("removeWallView", this._onRemoveWallView.bind(this));
    this.appState.worldObjectsCollection.on("addCellView", this._onAddCellView.bind(this));
    this.appState.worldObjectsCollection.on("removeCellView", this._onRemoveCellView.bind(this));
};

MainStageController.prototype._onMouseDown = function (event) {
    var pos = this._getMousePos(event);
    this.appState.toolState.currentTool.onMouseDown(pos.x, pos.y);
};

MainStageController.prototype._onMouseMove = function (event) {
    var pos = this._getMousePos(event);
    if (pos.x < 0 || pos.x > this.screenSize.width || pos.y < 0 || pos.y > this.screenSize.height) {
        return;
    }
    this.appState.toolState.currentTool.onMouseMove(pos.x, pos.y);
};

MainStageController.prototype._onMouseUp = function (event) {
    var pos = this._getMousePos(event);
    this.appState.toolState.currentTool.onMouseUp(pos.x, pos.y);
};

MainStageController.prototype._onAddWallView = function (view) {
    this.stage.addChild(view);
};

MainStageController.prototype._onRemoveWallView = function (view) {
    this.stage.removeChild(view);
};

MainStageController.prototype._onAddCellView = function (view) {
    switch (view.__proto__.constructor.name) {
        case "FloorView":
            this.stage.addChildAt(view, 1);
            break;
        default:
            this.stage.addChild(view);
            break;
    }
};

MainStageController.prototype._onRemoveCellView = function (view) {
    this.stage.removeChild(view);
};

MainStageController.prototype._getMousePos = function (event) {
    return event.data.getLocalPosition(this.stage, undefined, this.interaction.mouse.global);
};
