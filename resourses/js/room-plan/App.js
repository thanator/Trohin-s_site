var PIXI = require("pixi.js");
var MainStageController = require("./MainStageController.js");
var AppState = require("./AppState.js");
var ToolsView = require("./ToolsView.js");
var GridBackground = require("./GridBackground.js");


function App() {
}
module.exports = App;

App.prototype.init = function () {
    this.pixiApp = new PIXI.Application(800, 600, {antialias: true, backgroundColor: 0xeeeeee});

    var $view = $(this.pixiApp.view);
    $(".app").replaceWith($view);
    $view.addClass("app");

    this.state = new AppState();

    var controller = new MainStageController(this.pixiApp.stage, this.pixiApp.renderer.plugins.interaction, this.state);
    controller.init();

    var toolsView = new ToolsView(this.state);
    toolsView.init();

    var gridBackground = new GridBackground(800, 600);
    this.pixiApp.stage.addChild(gridBackground);

    this.state.createStartEnvironment();
};
