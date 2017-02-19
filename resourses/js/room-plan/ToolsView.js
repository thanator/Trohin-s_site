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
    this.intIdsToStyleDomId[1] = "#room-plan-style-wire";
    this.intIdsToStyleDomId[2] = "#room-plan-style-door";
    this.intIdsToStyleDomId[3] = "#room-plan-style-window";
    this.intIdsToStyleDomId[4] = "#room-plan-style-floor";

    this.styleItemDomIdsToStyleIntIds = {
        "#room-plan-wall-style0": 0,
        "#room-plan-wall-style1": 1,
        "#room-plan-floor-style0": 0,
        "#room-plan-floor-style1": 1
    };

    this.styleInputDomIds = [
        "#room-plan-door-size",
        "#room-plan-window-size"
    ];
}
module.exports = ToolsView;

ToolsView.prototype.init = function () {
    this._initToolButtons();
    this._initModeButtons();
    this._initStyleItemButtons();
    this._initStyleInputButtons();
};

ToolsView.prototype._initToolButtons = function () {
    for (var domId in this.toolsDomIdsToIntIds) {
        if (this.toolsDomIdsToIntIds.hasOwnProperty(domId)) {
            this._registerToolEvent(domId, this.toolsDomIdsToIntIds[domId]);
        }
    }
};

ToolsView.prototype._initStyleItemButtons = function () {
    for (var domId in this.styleItemDomIdsToStyleIntIds) {
        if (this.styleItemDomIdsToStyleIntIds.hasOwnProperty(domId)) {
            this._registerStyleItemEvent(domId, this.styleItemDomIdsToStyleIntIds[domId]);
        }
    }
};

ToolsView.prototype._initStyleInputButtons = function () {
    this.styleInputDomIds.forEach(function (domId) {
        this._registerStyleInputEvent(domId);
    }.bind(this));

    var self = this;
    $("#room-plan-wire-start").click(function () {
        self.toolState.currentTool.isMovingWireStart = !self.toolState.currentTool.isMovingWireStart;
        self.toolState.currentTool.eventFnIsMovingWireStartChange = function (value) {
            $(this).toggleClass("app-tools-style__toggle--active", value);
            $(this).toggleClass("app-tools-style__toggle--inactive", !value);
        }.bind(this);
        $(this).toggleClass("app-tools-style__toggle--active");
        $(this).toggleClass("app-tools-style__toggle--inactive");
    });
    $("#room-plan-wall-size").on("input change", function () {
        self.toolState.appState.wallHeight = $(this).val();
    });
};

ToolsView.prototype._registerToolEvent = function (domId, intId) {
    var self = this;
    $(domId).click(function () {
        self._changeActiveToolButton($(this));
        self.toolState.currentTool = self.toolState.tools[intId];
        self._changeActiveStyleButton($(self.intIdsToStyleDomId[intId]));
    });
};

ToolsView.prototype._registerStyleItemEvent = function (domId, intId) {
    var self = this;
    $(domId).click(function () {
        self._changeActiveStyleItemButton($(this), $(this).parent());
        self.toolState.currentTool.style = intId;
    });
};

ToolsView.prototype._registerStyleInputEvent = function (domId) {
    var self = this;
    $(domId).on("input change", function () {
        self.toolState.currentTool.style = $(this).val();
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

ToolsView.prototype._changeActiveStyleItemButton = function ($nextActive, $container) {
    $container.find(".app-tools-style__item--active").removeClass("app-tools-style__item--active").addClass("app-tools-style__item--inactive");
    $nextActive.removeClass("app-tools-style__item--inactive").addClass("app-tools-style__item--active");
};
