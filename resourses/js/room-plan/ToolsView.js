function ToolsView(appState) {
    this.appState = appState;
    this.toolsDomIdsToIntIds = {
        "#app-tool-wall": 0,
        "#app-tool-wire": 1,
        "#app-tool-window": 2
    }
}
module.exports = ToolsView;

ToolsView.prototype.init = function () {
    for (var domId in this.toolsDomIdsToIntIds) {
        if (this.toolsDomIdsToIntIds.hasOwnProperty(domId)) {
            this._registerEvent(domId, this.toolsDomIdsToIntIds[domId]);
        }
    }
};

ToolsView.prototype._registerEvent = function (domId, intId) {
    var self = this;
    $(domId).click(function () {
        self._changeActiveButton($(this));
        self.appState.currentTool = self.appState.tools[intId];
    });
};

ToolsView.prototype._changeActiveButton = function ($nextActive) {
    var $active = $(".app-tools__item--active");
    var $inactive = $(".app-tools__item--inactive");

    $active.removeClass("app-tools__item--active");
    $inactive.removeClass("app-tools__item--inactive");

    $active.addClass("app-tools__item--inactive");
    $nextActive.addClass("app-tools__item--active");
};
