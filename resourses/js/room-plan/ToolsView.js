function ToolsView(toolState) {
    this.toolState = toolState;

    this.toolsDomIdsToIntIds = {
        "#room-plan-tool-wall": 0,
        "#room-plan-tool-wire": 1,
        "#room-plan-tool-door": 2,
        "#room-plan-tool-window": 3,
        "#room-plan-tool-floor": 4,
        "#room-plan-tool-sink": 5
    };

    this.intIdsToStyleDomId = [];
    this.intIdsToStyleDomId[0] = "#room-plan-style-wall";
    this.intIdsToStyleDomId[4] = "#room-plan-style-floor";

    this.styleItemDomIdsToIntIds = {
        "#room-plan-wall-style0": 0,
        "#room-plan-wall-style1": 1,
        "#room-plan-floor-style0": 0,
        "#room-plan-floor-style1": 1
    };
}
module.exports = ToolsView;

ToolsView.prototype.init = function () {
    this._initToolButtons();
    this._initModeButtons();
    this._initStyleItemButtons();
};

ToolsView.prototype._initToolButtons = function () {
    for (var domId in this.toolsDomIdsToIntIds) {
        if (this.toolsDomIdsToIntIds.hasOwnProperty(domId)) {
            this._registerToolEvent(domId, this.toolsDomIdsToIntIds[domId]);
        }
    }
};

ToolsView.prototype._initStyleItemButtons = function () {
    for (var domId in this.styleItemDomIdsToIntIds) {
        if (this.styleItemDomIdsToIntIds.hasOwnProperty(domId)) {
            this._registerStyleItemEvent(domId, this.styleItemDomIdsToIntIds[domId]);
        }
    }
};

ToolsView.prototype._registerToolEvent = function (domId, intId) {
    var self = this;
    $(domId).click(function () {
        self._changeActiveToolButton($(this));
        self.toolState.currentTool = self.toolState.tools[intId];
        if (self.intIdsToStyleDomId[intId]) {
            self._registerStyleItemEvent(self.intIdsToStyleDomId[intId], intId);
        }
    });
};

ToolsView.prototype._registerStyleItemEvent = function (domId, intId) {
    var self = this;
    $(domId).click(function () {
        self._changeActiveStyleItemButton($(this));
        self.toolState.currentTool.style = intId;
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

ToolsView.prototype._changeActiveStyleButton = function ($nextActive) {
    $(".app-tools-style--active").removeClass("app-tools-style--active").addClass("app-tools-style--inactive");
    $nextActive.removeClass("app-tools-style--inactive").addClass("app-tools-style--active");
};

ToolsView.prototype._changeActiveStyleItemButton = function ($nextActive) {
    $(".app-tools-style__item--active").removeClass("app-tools-style__item--active").addClass("app-tools-style__item--inactive");
    $nextActive.removeClass("app-tools-style__item--inactive").addClass("app-tools-style__item--active");
};
