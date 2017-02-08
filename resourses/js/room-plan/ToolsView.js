function ToolsView(toolState) {
    this.toolState = toolState;
    this.toolsDomIdsToIntIds = {
        "#room-plan-tool-wall": 0,
        "#room-plan-tool-wire": 1,
        "#room-plan-tool-door": 2,
        "#room-plan-tool-window": 3,
        "#room-plan-tool-sink": 4
    };
}
module.exports = ToolsView;

ToolsView.prototype.init = function () {
    this._initToolButtons();
    this._initModeButtons();
};

ToolsView.prototype._initToolButtons = function () {
    for (var domId in this.toolsDomIdsToIntIds) {
        if (this.toolsDomIdsToIntIds.hasOwnProperty(domId)) {
            this._registerToolEvent(domId, this.toolsDomIdsToIntIds[domId]);
        }
    }
};

ToolsView.prototype._registerToolEvent = function (domId, intId) {
    var self = this;
    $(domId).click(function () {
        self._changeActiveToolButton($(this));
        self.toolState.currentTool = self.toolState.tools[intId];
    });
};

ToolsView.prototype._initModeButtons = function () {
    var self = this;
    $("#room-plan-tool-mode-add").click(function () {
        self._changeActiveModeButton($(this));
        self.toolState.toolMode = "add";
    });
    $("#room-plan-tool-mode-remove").click(function () {
        self._changeActiveModeButton($(this));
        self.toolState.toolMode = "remove";
    });
};

ToolsView.prototype._changeActiveToolButton = function ($nextActive) {
    $(".app-tools__tool--active").removeClass("app-tools__tool--active").addClass("app-tools__tool--inactive");
    $nextActive.removeClass("app-tools__tool--inactive").addClass("app-tools__tool--active");
};

ToolsView.prototype._changeActiveModeButton = function ($nextActive) {
    $(".app-tools__mode--active").removeClass("app-tools__mode--active").addClass("app-tools__mode--inactive");
    $nextActive.removeClass("app-tools__mode--inactive").addClass("app-tools__mode--active");
};
