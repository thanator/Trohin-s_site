var PIXI = require("pixi.js");
var AppState = require("./AppState.js");
var MainStageController = require("./MainStageController.js");
var GridBackground = require("./GridBackground.js");
var ToolsView = require("./ToolsView.js");
var PriceView = require("./PriceView.js");


function App() {
}
module.exports = App;

App.prototype.init = function () {
    this.pixiApp = new PIXI.Application(800, 600, {antialias: true, backgroundColor: 0xeeeeee});

    var $view = $(this.pixiApp.view);
    $(".app").replaceWith($view);
    $view.addClass("app");

    var gridBackground = new GridBackground(800, 600);
    this.pixiApp.stage.addChild(gridBackground);

    this.state = new AppState(this);

    var controller = new MainStageController(this.state, this.pixiApp.stage, this.pixiApp.renderer.plugins.interaction);
    controller.init();

    this.state.createStartEnvironment();

    var toolsView = new ToolsView(this.state);
    toolsView.init();

    var priceView = new PriceView(this.state.priceCalculator, this.pixiApp.renderer.plugins.interaction);
    priceView.init();
};
