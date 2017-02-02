var PIXI = require("pixi.js");
var MainStageController = require("./MainStageController.js");
var AppState = require("./AppState.js");


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
};
