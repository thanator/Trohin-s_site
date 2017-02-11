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
    this.screenSize = {width: 1023, height: 1535};

    this.pixiApp = new PIXI.Application(this.screenSize.width, this.screenSize.height, {antialias: true, backgroundColor: 0xeeeeee});

    var $view = $(this.pixiApp.view);
    $(".app").replaceWith($view);
    $view.addClass("app");

    var gridBackground = new GridBackground(this.screenSize.width, this.screenSize.height);
    this.pixiApp.stage.addChild(gridBackground);

    this.state = new AppState(this);

    var controller = new MainStageController(
        this.state, this.pixiApp.stage, this.pixiApp.renderer.plugins.interaction, this.screenSize);
    controller.init();

    this.state.createStartEnvironment();

    var toolsView = new ToolsView(this.state.toolState);
    toolsView.init();

    var priceView = new PriceView(this.state.priceCalculator, this.pixiApp.renderer.plugins.interaction);
    priceView.init();
};
