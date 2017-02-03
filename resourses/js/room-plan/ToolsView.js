function ToolsView(appState) {
    this.appState = appState;
    this.toolsDomIdsToIntIds = {
        "#app-tool-wall": 0,
        "#app-tool-wire": 1,
        "#app-tool-door": 2,
        "#app-tool-window": 3
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
        self.appState.currentTool = self.appState.tools[intId];
    });
};

ToolsView.prototype._initModeButtons = function () {
    var self = this;
    $("#app-tool-mode-add").click(function () {
        self._changeActiveModeButton($(this));
        self.appState.toolMode = "add";
    });
    $("#app-tool-mode-remove").click(function () {
        self._changeActiveModeButton($(this));
        self.appState.toolMode = "remove";
    });
};

ToolsView.prototype._changeActiveToolButton = function ($nextActive) {
    var $active = $(".app-tools__tool--active");
    var $inactive = $(".app-tools__tool--inactive");

    $active.removeClass("app-tools__tool--active");
    $inactive.removeClass("app-tools__tool--inactive");

    $active.addClass("app-tools__tool--inactive");
    $nextActive.addClass("app-tools__tool--active");
};

ToolsView.prototype._changeActiveModeButton = function ($nextActive) {
    var $active = $(".app-tools__mode--active");
    var $inactive = $(".app-tools__mode--inactive");

    $active.removeClass("app-tools__mode--active");
    $inactive.removeClass("app-tools__mode--inactive");

    $active.addClass("app-tools__mode--inactive");
    $nextActive.addClass("app-tools__mode--active");
};
